// ============================================
// GHOST//ACADEMY — Stripe Payment Integration
// ============================================

let stripe, cardElement, selectedPlan;

function initStripe() {
  if (!GHOST_CONFIG.stripe.publicKey.startsWith('pk_')) return;
  stripe = Stripe(GHOST_CONFIG.stripe.publicKey);
  const elements = stripe.elements({
    appearance: {
      theme: 'night',
      variables: {
        colorPrimary: '#00e5ff',
        colorBackground: '#070d14',
        colorText: '#c8d8e8',
        colorDanger: '#ff2d55',
        fontFamily: 'Share Tech Mono, monospace',
        borderRadius: '8px',
      }
    }
  });
  cardElement = elements.create('card', {
    style: {
      base: { color: '#c8d8e8', fontFamily: 'Share Tech Mono, monospace', fontSize: '14px', '::placeholder': { color: '#3a5470' } },
      invalid: { color: '#ff2d55' }
    }
  });
  if (document.getElementById('card-element')) {
    cardElement.mount('#card-element');
    cardElement.on('change', e => {
      document.getElementById('card-errors').textContent = e.error ? e.error.message : '';
    });
  }
}

function openPayModal(planId) {
  selectedPlan = GHOST_CONFIG.stripe.plans.find(p => p.id === planId);
  if (!selectedPlan) return;
  document.getElementById('modalPlanName').textContent = 'GHOST//' + selectedPlan.name;
  document.getElementById('modalPrice').innerHTML = `€${selectedPlan.price}<span style="font-size:14px;color:var(--text-dim)">/${selectedPlan.period}</span>`;
  document.getElementById('payAlert').innerHTML = '';
  document.getElementById('payModal').classList.add('open');
  if (!stripe) initStripe();
}

function closeModal() {
  document.getElementById('payModal').classList.remove('open');
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('stripe-form');
  if (!form) return;

  // Try to load Stripe.js dynamically
  if (!window.Stripe) {
    const s = document.createElement('script');
    s.src = 'https://js.stripe.com/v3/';
    s.onload = initStripe;
    document.head.appendChild(s);
  } else {
    initStripe();
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('payBtn');
    const alertEl = document.getElementById('payAlert');
    const email = document.getElementById('payEmail').value;

    if (!stripe || !cardElement) {
      alertEl.innerHTML = `<div class="alert alert-error" style="margin-bottom:16px;">
        ⚠️ Stripe non configuré. Ajoute ta clé dans js/config.js
      </div>`;
      return;
    }

    btn.disabled = true;
    btn.textContent = 'TRAITEMENT EN COURS...';
    alertEl.innerHTML = '';

    try {
      // En production : appelle ton backend pour créer un PaymentIntent
      // Ici on simule pour la démo GitHub Pages
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: { email }
      });

      if (error) throw new Error(error.message);

      // Envoie paymentMethod.id + selectedPlan.priceId au backend si configuré.
      // Sinon, on simule le succès pour la démo (GitHub Pages).
      const checkoutUrl = GHOST_CONFIG.stripe.checkoutUrl;
      if (checkoutUrl) {
        const res = await fetch(checkoutUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            paymentMethodId: paymentMethod.id,
            priceId: selectedPlan.priceId,
            email
          })
        });

        let data = {};
        try { data = await res.json(); } catch { /* réponse non-JSON */ }

        if (!res.ok || data.error) {
          throw new Error(data.error || `Erreur backend (${res.status})`);
        }

        // Gère une éventuelle authentification 3D Secure renvoyée par le backend.
        if (data.requiresAction && data.clientSecret) {
          const { error: confirmError } = await stripe.confirmCardPayment(data.clientSecret);
          if (confirmError) throw new Error(confirmError.message);
        }
      }

      // Enregistre l'accès (issu du backend en production, simulé pour la démo).
      localStorage.setItem('ga_access', JSON.stringify({
        plan: selectedPlan.id,
        email,
        ts: Date.now(),
        token: btoa(email + ':' + selectedPlan.id + ':' + Date.now())
      }));

      alertEl.innerHTML = `<div class="alert alert-success" style="margin-bottom:16px;">
        ✓ Accès activé ! Redirection en cours...
      </div>`;

      setTimeout(() => { window.location.href = 'platform.html'; }, 1500);

    } catch (err) {
      alertEl.innerHTML = `<div class="alert alert-error" style="margin-bottom:16px;">
        ✗ ${err.message}
      </div>`;
      btn.disabled = false;
      btn.textContent = '🔒 PAYER ET ACCÉDER →';
    }
  });

  // Close on overlay click
  document.getElementById('payModal')?.addEventListener('click', e => {
    if (e.target.id === 'payModal') closeModal();
  });
});

// Check access
function checkAccess() {
  const access = localStorage.getItem('ga_access');
  if (!access) return false;
  try {
    const data = JSON.parse(access);
    // Lifetime = toujours valide
    if (data.plan === 'plan_lifetime') return true;
    // Mensuel = vérifie 30 jours
    const diff = Date.now() - data.ts;
    return diff < 30 * 24 * 60 * 60 * 1000;
  } catch { return false; }
}

function getAccessPlan() {
  try { return JSON.parse(localStorage.getItem('ga_access'))?.plan || null; }
  catch { return null; }
}
