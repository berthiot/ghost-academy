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
    publicKey: 'pk_test_REMPLACE_PAR_TA_CLE_STRIPE',
    // Plans disponibles (crée-les dans Stripe Dashboard → Products)
    plans: [
      {
        id: 'plan_starter',
        name: 'STARTER',
        priceId: 'price_REMPLACE_ID_STRIPE',
        price: 29,
        currency: 'EUR',
        period: 'mois',
        features: ['3 modules', 'Quiz interactifs', 'Terminal simulé', 'Support email'],
        highlight: false,
      },
      {
        id: 'plan_elite',
        name: 'ELITE',
        priceId: 'price_REMPLACE_ID_STRIPE_2',
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
        priceId: 'price_REMPLACE_ID_STRIPE_3',
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
    // Change ce mot de passe !
    password: 'ghost2024',
    // Email pour recevoir les notifications de vente
    notifEmail: 'toi@email.com',
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
