# GHOST//ACADEMY 🎯
> Plateforme e-learning cybersécurité — hébergée sur GitHub Pages

## 🚀 Déploiement en 5 minutes

### 1. Fork / Clone ce repo
```bash
git clone https://github.com/TON_USERNAME/ghost-academy.git
cd ghost-academy
```

### 2. Configure Stripe
Dans `js/config.js`, remplace :
```js
STRIPE_PUBLIC_KEY: 'pk_live_VOTRE_CLE_STRIPE'
```

### 3. Active GitHub Pages
- Settings → Pages → Source → `main` branch → `/root`
- Ton site sera live sur : `https://TON_USERNAME.github.io/ghost-academy`

### 4. Ajouter un module
- Va sur `admin/index.html` (en local ou via un tunnel)
- Clique "Nouveau Module"
- Remplis le formulaire (titre, description, vidéo YouTube/Vimeo, quiz)
- Exporte → copie dans `data/modules.json` → push sur GitHub

## 📁 Structure du projet
```
ghost-academy/
├── index.html          ← Landing page (public)
├── platform.html       ← Plateforme élève (après paiement)
├── admin/
│   └── index.html      ← Dashboard admin
├── js/
│   ├── config.js       ← Clés API, prix, config
│   ├── stripe.js       ← Paiement
│   ├── platform.js     ← Logique plateforme
│   └── admin.js        ← Logique admin
├── css/
│   └── ghost.css       ← Design system complet
├── data/
│   └── modules.json    ← Tous tes modules (éditable)
└── README.md
```

## 💳 Stripe Setup
1. Crée un compte sur stripe.com
2. Récupère ta clé publique (`pk_live_...`)
3. Crée un produit avec un prix dans le dashboard Stripe
4. Récupère le `price_id` et mets-le dans `js/config.js`

## 🎓 Ajouter des modules
Format dans `data/modules.json` :
```json
{
  "id": "module-01",
  "title": "Reconnaissance & OSINT",
  "tag": "MODULE 01",
  "description": "...",
  "duration": "2h30",
  "level": "Débutant",
  "video": "https://youtube.com/embed/VIDEO_ID",
  "locked": false,
  "lessons": [...],
  "quiz": [...]
}
```

## 🔐 Accès Admin
URL : `/admin/index.html`
Mot de passe par défaut : `ghost2024` (à changer dans `js/config.js`)
