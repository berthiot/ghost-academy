// ============================================
// GHOST//ACADEMY — CONFIGURATION CENTRALE
// Modifie ce fichier pour personnaliser tout
// ============================================

const GHOST_CONFIG = {

  // ── SITE ──────────────────────────────────
  site: {
    name: 'GHOST//ACADEMY',
    tagline: 'Devenez un hacker d\'élite',
    url: 'https://TON_USERNAME.github.io/ghost-academy',
    email: 'contact@ghostacademy.io',
    logo: 'GHOST<span style="color:#ff2d55">//</span>ACADEMY',
  },

  // ── STRIPE ────────────────────────────────
  // 1. Va sur dashboard.stripe.com
  // 2. Developers → API Keys → Publishable key
  stripe: {
    publicKey: 'pk_live_51PQmEOK8S2adJvU9lFXcPdRDa2PoQxaI9K5hZFyY9orOkgts6QXpRMxHU1EoabcHdmQ9NiJVUOdxvPumueI0UhV600HqaMPdkg',
    // Endpoint backend qui crée le PaymentIntent / abonnement.
    // Laisse vide ('') pour utiliser la simulation de démo (GitHub Pages).
    // Exemple : '/api/checkout' (Netlify Functions, Vercel, etc.)
    checkoutUrl: '',
    // Plans disponibles (crée-les dans Stripe Dashboard → Products)
    plans: [
      {
        id: 'plan_starter',
        name: 'STARTER',
        priceId: 'price_1TrtdiK8S2adJvU9UbK7NmVN',
        price: 29,
        currency: 'EUR',
        period: 'mois',
        features: ['3 modules', 'Quiz interactifs', 'Terminal simulé', 'Support email'],
        highlight: false,
      },
      {
        id: 'plan_elite',
        name: 'ELITE',
        priceId: 'price_1TrtfIK8S2adJvU9eg8Sd5kJ',
        price: 79,
        currency: 'EUR',
        period: 'mois',
        features: ['Tous les modules', 'Ghost AI illimité', 'Vidéos HD', 'Discord privé', 'Certif. d\'excellence', 'Mises à jour à vie'],
        highlight: true,
        badge: 'POPULAIRE',
      },
      {
        id: 'plan_lifetime',
        name: 'LIFETIME',
        priceId: 'price_1TrtttK8S2adJvU9tZqWh2k6',
        price: 299,
        currency: 'EUR',
        period: 'unique',
        features: ['Accès à vie', 'Tous les modules futurs', 'Ghost AI illimité', 'Coaching 1:1 (1h)', 'Badge Elite GitHub'],
        highlight: false,
      }
    ]
  },

  // ── ADMIN ─────────────────────────────────
  admin: {
    // Empreinte SHA-256 du mot de passe admin (jamais le mot de passe en clair).
    // Mot de passe actuel = "ghost2024" — CHANGE-LE !
    // Pour générer une nouvelle empreinte, en terminal :
    //   printf '%s' 'TON_NOUVEAU_MOT_DE_PASSE' | sha256sum
    // puis colle le résultat ci-dessous.
    passwordHash: '7ebc246d65879fc088a640720ace3ca5affcc38f68218ae11f6ea39f82c7a2b7',
    // Email pour recevoir les notifications de vente
    notifEmail: 'toi@email.com',
  },

  // ── PAIEMENT ──────────────────────────────
  payment: {
    // false = le contenu n'est PAS verrouillé (accès libre à tous les modules).
    //         Les prix et le paiement Stripe restent affichés : c'est un
    //         soutien optionnel, pas une barrière.
    // true  = le paiement redevient obligatoire pour débloquer les modules.
    //         (à activer le jour où tu monétises pour de vrai)
    gateContent: false,
  },

  // ── DONATION ──────────────────────────────
  donation: {
    enabled: true,
    // Colle ton lien de don ici (Ko-fi, Buy Me a Coffee, PayPal.me...).
    // Tant que c'est vide, le bouton de don reste masqué.
    url: '',
    label: '☕ Soutenir le projet',
  },

  // ── ACCÈS CONTENU ─────────────────────────
  // Modules accessibles sans paiement
  freeModules: ['module-00'],

  // ── SOCIAL / COMMUNAUTÉ ───────────────────
  social: {
    discord: 'https://discord.gg/TON_SERVEUR',
    github: 'https://github.com/TON_USERNAME',
    twitter: 'https://twitter.com/TON_COMPTE',
  },
};

// Export pour utilisation dans les autres fichiers
if (typeof module !== 'undefined') module.exports = GHOST_CONFIG;
