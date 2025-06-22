# 📱 Expense Tracker - Application de Gestion Financière

**Expense Tracker** est une application mobile complète qui vous permet de prendre le contrôle total de vos finances. Suivez vos dépenses, gérez vos abonnements, analysez vos habitudes financières et planifiez votre budget - le tout dans une interface intuitive et élégante.

---

## 🌟 Fonctionnalités Clés

### 💰 Gestion des Transactions
- Ajout, modification et suppression de **dépenses** ou **revenus**
- **16 catégories** prédéfinies (nourriture, transport, divertissement, etc.)
- Historique détaillé avec **date**, **montant**, et **catégorie**
- Calcul **en temps réel du solde actuel**

### 📅 Suivi des Abonnements
- Ajout et gestion d’**abonnements récurrents** (mensuels, annuels…)
- **Calendrier interactif** avec rappels visuels pour les paiements à venir
- Ajout d’**images personnalisées**
- Alertes sur les **échéances imminentes**

### 📊 Tableaux de Bord & Statistiques
- Graphiques **camembert** pour visualisation par catégories
- Comparaison **revenus vs dépenses**
- Synthèses mensuelles et filtrage dynamique
- **Exportation JSON** des données financières (à venir)

### 🔐 Sécurité Avancée
- Authentification robuste avec **Clerk**
- Vérification par **email (OTP sécurisé)**
- **Protection des sessions** et rate limiting avec Redis
- Respect de la confidentialité des données

### 🎨 UX/UI Premium
- Choix entre **8 thèmes personnalisables**
- Animations fluides & transitions douces
- Interface réactive et tactile pensée mobile
- Feedback instantané pour chaque action


### 🏆 Points Forts
- **UI/UX intuitive** : Navigation fluide avec animations
- **Code maintenable** : Architecture modulaire bien organisée
- **Performance optimisée** : Chargement parallèle des données
- **Sécurité renforcée** : Authentification robuste + rate limiting
- **Extensible** : Conception permettant d'ajouter facilement de nouvelles fonctionnalités

---

## 📱 Écrans de l'Application

| Écran | Fonctionnalités |
|-------|-----------------|
| **Landing Page** | Présentation des fonctionnalités |
| **Authentification** | Inscription, Connexion, Vérification email |
| **Transactions** | Solde actuel, Accès rapide aux transactions en fonction des Catégories |
| **Abonnements** | Liste des abonnements |
| **Calendrier** | Vue mensuelle, Paiements récurrents |
| **Analytics** | Graphiques, Totaux, Filtres |
| **Ajout de transaction** | Montant, Type, Catégorie, Date |
| **Ajout d'abonnement** | Nom, Fréquence, Montant, Image |

---

## ⚙️ Architecture Technique

```mermaid
  graph LR
  subgraph Client
    A[📱 Client Mobile]
  end

  subgraph Backend
    B[🧠 API Node.js]
    E[🚦 Upstash Redis]
  end

  subgraph Services_Externes
    D[📸 Cloudinary]
  end

  subgraph Base_de_données
    C[🗄️ PostgreSQL]
    F[(Stockage : Transactions, Abonnements, URLs images)]
  end

  A --> B
  B -- "Requêtes API" --> C
  C -- "Réponses API JSON & Middleware" --> B
  B --> D
  B -- "Rate Limiting" --> E
  D --> C
  C --> F

```

### 🖥️ Frontend (React Native)
- Framework : **React Native + Expo**
- Navigation : **Expo Router**
- State Management : **Hooks personnalisés** (`useTransactions`, `useSubscriptions`)
- Graphiques : **React Native Chart Kit**
- Authentification : **Clerk**
- Gestion des médias : **Expo Image Picker**

### 🧰  Backend (Node.js)
- Serveur : **Express.js**
- Base de données : **PostgreSQL** via NeonDB
- Stockage images : **Cloudinary**
- Rate Limiting : **Upstash Redis**
- Documentation API : **Swagger**

## 🏠 Hébergement Back-End
**Hébergement facile** : Hébergement backend sur GitHub

## 🚀 Déploiement
**Déploiement facile** : Hébergement backend sur Render

---

## 🧠 Points Forts
- ✅ **Multiplateforme (iOS / Android)**
- 🔒 **Authentification sécurisée (Clerk + OTP)**
- 📲 **Interface fluide avec Expo**
- 🧩 **Architecture modulaire facile à maintenir**
- 📉 **Visualisation intuitive des données**
- ⚡ **Performance optimisée**
- 🧪 **Tests sur appareil réel**
- 💡 **Prise en main facile même pour débutant React Native**

---

## Configuration
1. **Cloner le dépôt** :
```bash
git clone https://github.com/Maxime015/expense-tracker.git
cd expense-tracker
```

2. **Configurer l'environnement** :
Créez un fichier `.env` dans le dossier backend/ avec ce contenu :
```bash
DATABASE_URL="postgres://user:password@host/database"
CLOUDINARY_CLOUD_NAME="votre-cloud"
CLOUDINARY_API_KEY="votre-api-key"
CLOUDINARY_API_SECRET="votre-api-secret"
API_URL="http://localhost:5001" #Change l'url localhost par celui de la base de données déployée sur Render
```

Modifier un fichier `api.js` dans le dossier `mobile/constants` en changeant l'url localhost par celui de la base de données déployée sur Render :
```bash
API_URL="http://localhost:5001"
```

Créez un fichier `.env` dans le dossier mobile/ avec ce contenu :
```bash
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY="Your-Clerk-API-KEY"
```

3. **Installer les dépendances :** :
```bash
# Backend
cd backend
npm install

# Frontend
cd mobile
npm install
```

4. **Démarrer les services :** :
```bash
# Démarrer le backend
cd back_end
npm run dev

# Dans un nouveau terminal, démarrer le frontend
cd mobile
npx expo start
```

---

## 👾 📂 Structure des Fichiers
1. **Back-End**
```plaintext
└── src
    ├── config/
    │   ├── cloudinary.js
    │   ├── cron.js
    │   ├── db.js
    │   └── upstash.js
    ├── controllers/
    │   ├── subscriptionController.js
    │   └── transactionController.js
    ├── middleware/
    │   └── rateLimiter.js
    ├── routes/
    │   ├── subscriptionsRoute.js
    │   └── transactionsRoute.js
    ├── server.js
    └── swagger.yaml
```

2. **Front-End**
```plaintext
└── app/
    ├── _layout.jsx
    ├── (auth)/
    │   ├── _layout.jsx
    │   ├── landing.jsx
    │   ├── sign-in.jsx
    │   └── sign-up.jsx
    ├── (root)/
    │   ├── _layout.jsx
    │   ├── analytics.jsx
    │   ├── calendar.jsx
    │   ├── create.jsx
    │   ├── index.jsx
    │   ├── insert.jsx
    │   └── subscription.jsx
    └── ...
assets/
components/
constants/
hooks/
lib/
.env.local
app.json
```
---

## 📸 Screenshots

<div style="display: flex; justify-content: space-between; gap: 10px; flex-wrap: wrap;">

  <img src="./screenshots/a.jpg" style="width: 32%; margin-bottom: 10px;" />
  <img src="./screenshots/b.jpg" style="width: 32%; margin-bottom: 10px;" />
  <img src="./screenshots/c.jpg" style="width: 32%; margin-bottom: 10px;" />

  <img src="./screenshots/d.jpg" style="width: 32%; margin-bottom: 10px;" />
  <img src="./screenshots/e.jpg" style="width: 32%; margin-bottom: 10px;" />
  <img src="./screenshots/ef.jpg" style="width: 32%; margin-bottom: 10px;" />

  <img src="./screenshots/f.jpg" style="width: 32%; margin-bottom: 10px;" />
  <img src="./screenshots/g.jpg" style="width: 32%; margin-bottom: 10px;" />
  <img src="./screenshots/h.jpg" style="width: 32%; margin-bottom: 10px;" />

  <img src="./screenshots/i.jpg" style="width: 32%; margin-bottom: 10px;" />
  <img src="./screenshots/j.jpg" style="width: 32%; margin-bottom: 10px;" />
  <img src="./screenshots/k.jpg" style="width: 32%; margin-bottom: 10px;" />

  <img src="./screenshots/l.jpg" style="width: 32%; margin-bottom: 10px;" />
  <img src="./screenshots/m.jpg" style="width: 32%; margin-bottom: 10px;" />
  <img src="./screenshots/n.jpg" style="width: 32%; margin-bottom: 10px;" />

</div>
