"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTML_CSS_EXERCISES = void 0;
exports.HTML_CSS_EXERCISES = [
    {
        title: "Formulaire de connexion inaccessible",
        category: "HTML_CSS",
        difficulty: "MOYEN",
        buggyCode: `
<form>
  <input type="email" placeholder="Email">
  <input type="password" placeholder="Mot de passe">
  <button>Connexion</button>
</form>
`,
        hint1: "Un utilisateur de lecteur d'écran doit savoir à quoi correspond chaque champ.",
        hint2: "Le placeholder ne remplace pas un label accessible.",
        hint3: "Ajoute des labels correctement associés aux champs avec for et id.",
        solution: `
<form>
  <div>
    <label for="email">Adresse e-mail</label>
    <input
      id="email"
      name="email"
      type="email"
      autocomplete="email"
    >
  </div>

  <div>
    <label for="password">Mot de passe</label>
    <input
      id="password"
      name="password"
      type="password"
      autocomplete="current-password"
    >
  </div>

  <button type="submit">Connexion</button>
</form>
`,
        keywords: [
            "html",
            "accessibility",
            "form",
            "label",
            "input",
            "aria",
        ],
    },
    {
        title: "Navigation mobile qui déborde de l'écran",
        category: "HTML_CSS",
        difficulty: "MOYEN",
        buggyCode: `
<nav class="navbar">
  <div class="logo">CodeDoctor</div>

  <div class="links">
    <a href="/">Accueil</a>
    <a href="/exercices">Exercices</a>
    <a href="/experiences">Expériences</a>
    <a href="/profil">Mon profil</a>
  </div>
</nav>

<style>
.navbar {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.links {
  display: flex;
  gap: 30px;
}
</style>
`,
        hint1: "La navigation fonctionne sur ordinateur mais peut dépasser sur un petit écran.",
        hint2: "Il faut adapter la disposition lorsque la largeur de l'écran diminue.",
        hint3: "Utilise une media query et transforme les liens en colonne sur mobile.",
        solution: `
<nav class="navbar">
  <div class="logo">CodeDoctor</div>

  <div class="links">
    <a href="/">Accueil</a>
    <a href="/exercices">Exercices</a>
    <a href="/experiences">Expériences</a>
    <a href="/profil">Mon profil</a>
  </div>
</nav>

<style>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 20px;
}

.links {
  display: flex;
  gap: 30px;
}

@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .links {
    flex-direction: column;
    gap: 12px;
  }
}
</style>
`,
        keywords: [
            "css",
            "responsive",
            "mobile",
            "media-query",
            "flexbox",
            "navbar",
        ],
    },
    {
        title: "Cartes de dashboard avec des hauteurs incohérentes",
        category: "HTML_CSS",
        difficulty: "DIFFICILE",
        buggyCode: `
<section class="dashboard-cards">
  <article class="card">
    <h2>Exercices terminés</h2>
    <p>12</p>
  </article>

  <article class="card">
    <h2>Progression</h2>
    <p>75%</p>
    <small>Continue comme ça !</small>
  </article>

  <article class="card">
    <h2>Score</h2>
    <p>840</p>
  </article>
</section>

<style>
.dashboard-cards {
  display: flex;
  gap: 20px;
}

.card {
  width: 250px;
  padding: 20px;
  border: 1px solid #ddd;
}
</style>
`,
        hint1: "Les cartes n'ont pas toutes la même hauteur.",
        hint2: "Le conteneur Flexbox peut contrôler l'alignement des éléments enfants.",
        hint3: "Utilise align-items: stretch et laisse les cartes occuper l'espace disponible.",
        solution: `
<section class="dashboard-cards">
  <article class="card">
    <h2>Exercices terminés</h2>
    <p>12</p>
  </article>

  <article class="card">
    <h2>Progression</h2>
    <p>75%</p>
    <small>Continue comme ça !</small>
  </article>

  <article class="card">
    <h2>Score</h2>
    <p>840</p>
  </article>
</section>

<style>
.dashboard-cards {
  display: flex;
  align-items: stretch;
  gap: 20px;
}

.card {
  flex: 1;
  min-width: 0;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
</style>
`,
        keywords: [
            "css",
            "flexbox",
            "dashboard",
            "cards",
            "layout",
            "responsive",
        ],
    },
    {
        title: "Image de profil déformée",
        category: "HTML_CSS",
        difficulty: "MOYEN",
        buggyCode: `
<div class="profile">
  <img
    src="/images/user.jpg"
    alt="Photo de profil"
  >
</div>

<style>
.profile {
  width: 150px;
  height: 150px;
}

.profile img {
  width: 100%;
  height: 100%;
}
</style>
`,
        hint1: "L'image peut avoir un ratio différent de celui du conteneur.",
        hint2: "Forcer width et height peut déformer l'image.",
        hint3: "Utilise object-fit pour conserver le ratio tout en remplissant le conteneur.",
        solution: `
<div class="profile">
  <img
    src="/images/user.jpg"
    alt="Photo de profil"
  >
</div>

<style>
.profile {
  width: 150px;
  height: 150px;
  overflow: hidden;
  border-radius: 50%;
}

.profile img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}
</style>
`,
        keywords: [
            "css",
            "image",
            "object-fit",
            "responsive",
            "profile",
            "aspect-ratio",
        ],
    },
    {
        title: "Bouton impossible à cliquer sur mobile",
        category: "HTML_CSS",
        difficulty: "MOYEN",
        buggyCode: `
<div class="actions">
  <button class="primary">Valider</button>
  <button class="secondary">Annuler</button>
</div>

<style>
.actions {
  display: flex;
  gap: 5px;
}

button {
  padding: 5px;
  font-size: 12px;
}
</style>
`,
        hint1: "Un élément interactif doit être suffisamment grand pour être utilisé facilement au doigt.",
        hint2: "Le problème vient de la taille et de l'espacement des boutons.",
        hint3: "Augmente le padding et rends les boutons flexibles sur mobile.",
        solution: `
<div class="actions">
  <button class="primary" type="button">Valider</button>
  <button class="secondary" type="button">Annuler</button>
</div>

<style>
.actions {
  display: flex;
  gap: 12px;
}

button {
  min-height: 44px;
  padding: 10px 18px;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
}

@media (max-width: 480px) {
  .actions {
    flex-direction: column;
  }

  button {
    width: 100%;
  }
}
</style>
`,
        keywords: [
            "css",
            "mobile",
            "button",
            "responsive",
            "accessibility",
            "ux",
        ],
    },
    {
        title: "Contenu masqué qui reste inaccessible",
        category: "HTML_CSS",
        difficulty: "DIFFICILE",
        buggyCode: `
<section class="exercise">
  <h2>Solution</h2>

  <div class="solution">
    <p>La bonne réponse est d'utiliser flexbox.</p>
  </div>
</section>

<style>
.solution {
  visibility: hidden;
}

.solution:hover {
  visibility: visible;
}
</style>
`,
        hint1: "Le contenu est caché mais la logique d'affichage dépend du survol.",
        hint2: "Un utilisateur mobile ne peut pas utiliser hover de la même manière.",
        hint3: "Utilise une solution accessible basée sur un élément interactif comme details/summary.",
        solution: `
<section class="exercise">
  <details>
    <summary>Afficher la solution</summary>

    <div class="solution">
      <p>
        La bonne réponse est d'utiliser flexbox.
      </p>
    </div>
  </details>
</section>

<style>
details {
  margin-top: 20px;
}

summary {
  cursor: pointer;
  font-weight: 600;
}

.solution {
  margin-top: 12px;
}
</style>
`,
        keywords: [
            "html",
            "css",
            "accessibility",
            "details",
            "summary",
            "hover",
        ],
    },
    {
        title: "Layout principal cassé par une largeur fixe",
        category: "HTML_CSS",
        difficulty: "DIFFICILE",
        buggyCode: `
<div class="layout">
  <aside class="sidebar">
    Menu
  </aside>

  <main class="content">
    <h1>Dashboard CodeDoctor</h1>
    <p>Bienvenue dans votre espace.</p>
  </main>
</div>

<style>
.layout {
  display: flex;
}

.sidebar {
  width: 300px;
}

.content {
  width: 1000px;
  padding: 30px;
}
</style>
`,
        hint1: "La largeur totale peut dépasser celle de la fenêtre.",
        hint2: "Le contenu principal ne doit pas imposer une largeur fixe.",
        hint3: "Utilise flex: 1 et min-width: 0 pour permettre au contenu de s'adapter.",
        solution: `
<div class="layout">
  <aside class="sidebar">
    Menu
  </aside>

  <main class="content">
    <h1>Dashboard CodeDoctor</h1>
    <p>Bienvenue dans votre espace.</p>
  </main>
</div>

<style>
.layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 300px;
  flex-shrink: 0;
}

.content {
  flex: 1;
  min-width: 0;
  padding: 30px;
}
</style>
`,
        keywords: [
            "css",
            "flexbox",
            "layout",
            "sidebar",
            "overflow",
            "responsive",
        ],
    },
    {
        title: "Z-index inefficace sur une modal",
        category: "HTML_CSS",
        difficulty: "DIFFICILE",
        buggyCode: `
<header class="header">
  Navigation
</header>

<main>
  Contenu de la page
</main>

<div class="modal">
  <div class="modal-content">
    <h2>Confirmation</h2>
    <button>Fermer</button>
  </div>
</div>

<style>
.header {
  position: relative;
  z-index: 9999;
}

.modal {
  position: fixed;
  inset: 0;
  z-index: 10;
  background: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background: white;
  width: 400px;
  margin: 100px auto;
  padding: 30px;
}
</style>
`,
        hint1: "La modal possède un z-index inférieur à celui du header.",
        hint2: "Une modal doit généralement apparaître au-dessus du reste de l'interface.",
        hint3: "Corrige la hiérarchie des couches avec un z-index cohérent.",
        solution: `
<header class="header">
  Navigation
</header>

<main>
  Contenu de la page
</main>

<div class="modal">
  <div class="modal-content">
    <h2>Confirmation</h2>
    <button type="button">Fermer</button>
  </div>
</div>

<style>
.header {
  position: relative;
  z-index: 10;
}

.modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  padding: 20px;
  background: rgba(0, 0, 0, 0.5);
}

.modal-content {
  width: min(400px, 100%);
  padding: 30px;
  background: white;
  border-radius: 10px;
}
</style>
`,
        keywords: [
            "css",
            "z-index",
            "modal",
            "position",
            "stacking-context",
            "overlay",
        ],
    },
    {
        title: "Formulaire qui déborde sur petit écran",
        category: "HTML_CSS",
        difficulty: "DIFFICILE",
        buggyCode: `
<form class="register">
  <div class="row">
    <input type="text" placeholder="Prénom">
    <input type="text" placeholder="Nom">
  </div>

  <input
    type="email"
    placeholder="Adresse e-mail"
  >

  <button type="submit">
    Créer mon compte
  </button>
</form>

<style>
.register {
  width: 600px;
  padding: 30px;
}

.row {
  display: flex;
  gap: 20px;
}

input {
  width: 300px;
  padding: 15px;
}
</style>
`,
        hint1: "La largeur fixe de 600px n'est pas adaptée aux smartphones.",
        hint2: "Les deux champs de la ligne peuvent également dépasser.",
        hint3: "Utilise max-width: 100%, box-sizing et une media query.",
        solution: `
<form class="register">
  <div class="row">
    <input type="text" placeholder="Prénom">
    <input type="text" placeholder="Nom">
  </div>

  <input
    type="email"
    placeholder="Adresse e-mail"
  >

  <button type="submit">
    Créer mon compte
  </button>
</form>

<style>
.register {
  width: 600px;
  max-width: 100%;
  box-sizing: border-box;
  padding: 30px;
}

.row {
  display: flex;
  gap: 20px;
}

input {
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  padding: 15px;
}

.row input {
  flex: 1;
}

@media (max-width: 600px) {
  .register {
    padding: 20px;
  }

  .row {
    flex-direction: column;
  }
}
</style>
`,
        keywords: [
            "css",
            "responsive",
            "form",
            "mobile",
            "flexbox",
            "box-sizing",
        ],
    },
    {
        title: "Hiérarchie HTML incorrecte pour une page de documentation",
        category: "HTML_CSS",
        difficulty: "MOYEN",
        buggyCode: `
<div class="documentation">
  <h1>Guide JavaScript</h1>

  <h3>Variables</h3>
  <p>Les variables permettent de stocker des données.</p>

  <h2>Fonctions</h2>
  <p>Les fonctions permettent de réutiliser du code.</p>

  <h4>Paramètres</h4>
  <p>Une fonction peut recevoir des paramètres.</p>
</div>
`,
        hint1: "Les titres doivent représenter la structure logique du document.",
        hint2: "Un h3 ne devrait pas être utilisé directement avant un h2.",
        hint3: "Réorganise les niveaux h1, h2 et h3 selon la hiérarchie réelle.",
        solution: `
<main class="documentation">
  <h1>Guide JavaScript</h1>

  <section>
    <h2>Variables</h2>
    <p>
      Les variables permettent de stocker des données.
    </p>
  </section>

  <section>
    <h2>Fonctions</h2>
    <p>
      Les fonctions permettent de réutiliser du code.
    </p>

    <section>
      <h3>Paramètres</h3>
      <p>
        Une fonction peut recevoir des paramètres.
      </p>
    </section>
  </section>
</main>
`,
        keywords: [
            "html",
            "semantic-html",
            "headings",
            "accessibility",
            "seo",
            "structure",
        ],
    },
];
//# sourceMappingURL=htmlCss.js.map