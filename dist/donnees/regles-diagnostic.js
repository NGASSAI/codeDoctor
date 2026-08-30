"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REGLES_DIAGNOSTIC = void 0;
const client_1 = require("../generated/prisma/client");
exports.REGLES_DIAGNOSTIC = [
    // ============================================================
    // JAVASCRIPT
    // ============================================================
    {
        code: "JS001",
        title: "Variable utilisée avant sa déclaration",
        category: client_1.Category.JAVASCRIPT,
        severity: client_1.Severity.CRITIQUE,
        explanation: "Une variable déclarée avec let ou const ne peut pas être utilisée avant sa déclaration.",
        cause: "Les variables let et const sont placées dans la temporal dead zone avant leur déclaration.",
        howToFind: "Recherchez une utilisation d'une variable avant la ligne où elle est déclarée.",
        fixHint: "Déclarez la variable avant toute utilisation.",
        beforeCode: `console.log(nom);

const nom = "Jean";`,
        afterCode: `const nom = "Jean";

console.log(nom);`,
    },
    {
        code: "JS002",
        title: "Valeur potentiellement undefined",
        category: client_1.Category.JAVASCRIPT,
        severity: client_1.Severity.MOYENNE,
        explanation: "Une valeur peut être undefined au moment où le programme tente de l'utiliser.",
        cause: "Une recherche, une fonction ou un accès à une propriété peut ne retourner aucune valeur.",
        howToFind: "Vérifiez les résultats de find(), les propriétés optionnelles et les fonctions pouvant retourner undefined.",
        fixHint: "Vérifiez l'existence de la valeur avant de l'utiliser.",
        beforeCode: `const utilisateur = utilisateurs.find(
  (u) => u.id === id
);

console.log(utilisateur.nom);`,
        afterCode: `const utilisateur = utilisateurs.find(
  (u) => u.id === id
);

if (!utilisateur) {
  throw new Error("Utilisateur introuvable");
}

console.log(utilisateur.nom);`,
    },
    {
        code: "JS003",
        title: "Comparaison non stricte",
        category: client_1.Category.JAVASCRIPT,
        severity: client_1.Severity.MOYENNE,
        explanation: "L'opérateur == peut provoquer une conversion implicite des types.",
        cause: "JavaScript effectue une conversion automatique lors de certaines comparaisons avec == ou !=.",
        howToFind: "Recherchez les opérateurs == et !=.",
        fixHint: "Utilisez === et !== lorsque la valeur et le type doivent être comparés.",
        beforeCode: `if (age == "18") {
  console.log("Majeur");
}`,
        afterCode: `if (age === 18) {
  console.log("Majeur");
}`,
    },
    {
        code: "JS004",
        title: "Promise non gérée",
        category: client_1.Category.JAVASCRIPT,
        severity: client_1.Severity.MOYENNE,
        explanation: "Une opération asynchrone peut échouer sans que son erreur soit correctement traitée.",
        cause: "Une Promise est utilisée sans await, catch ou mécanisme équivalent de gestion d'erreur.",
        howToFind: "Identifiez les appels asynchrones dont les erreurs ne sont pas traitées.",
        fixHint: "Utilisez try/catch avec await ou ajoutez un .catch().",
        beforeCode: `fetch("/api/users")
  .then((response) => response.json());`,
        afterCode: `try {
  const response = await fetch("/api/users");

  if (!response.ok) {
    throw new Error("Erreur HTTP");
  }

  const users = await response.json();
} catch (error) {
  console.error(error);
}`,
    },
    {
        code: "JS005",
        title: "Mutation involontaire d'un tableau",
        category: client_1.Category.JAVASCRIPT,
        severity: client_1.Severity.MOYENNE,
        explanation: "Le tableau original est directement modifié.",
        cause: "Des méthodes comme push(), pop(), sort() ou splice() modifient directement le tableau.",
        howToFind: "Recherchez les modifications directes de tableaux partagés.",
        fixHint: "Créez une copie du tableau lorsque l'immuabilité est nécessaire.",
        beforeCode: `const utilisateurs = ["A", "B"];

utilisateurs.push("C");`,
        afterCode: `const utilisateurs = ["A", "B"];

const nouveauxUtilisateurs = [
  ...utilisateurs,
  "C",
];`,
    },
    {
        code: "JS006",
        title: "Condition incorrecte",
        category: client_1.Category.JAVASCRIPT,
        severity: client_1.Severity.CRITIQUE,
        explanation: "Une condition logique peut toujours être vraie à cause d'une mauvaise expression.",
        cause: "Une valeur littérale utilisée directement avec || est considérée comme vraie.",
        howToFind: "Vérifiez les conditions utilisant plusieurs opérateurs || et &&.",
        fixHint: "Comparez explicitement chaque valeur avec la variable concernée.",
        beforeCode: `const role = "USER";

if (role === "ADMIN" || "USER") {
  console.log("Administrateur");
}`,
        afterCode: `const role = "USER";

if (role === "ADMIN" || role === "USER") {
  console.log("Utilisateur autorisé");
}`,
    },
    {
        code: "JS007",
        title: "Assignation utilisée à la place d'une comparaison",
        category: client_1.Category.JAVASCRIPT,
        severity: client_1.Severity.CRITIQUE,
        explanation: "Un opérateur d'assignation (=) est utilisé dans une condition, ce qui modifie la valeur au lieu de la comparer.",
        cause: "Une confusion entre = (assignation) et === (comparaison) dans une condition if/while.",
        howToFind: "Recherchez un opérateur = seul dans une condition if ou while.",
        fixHint: "Utilisez === pour comparer les valeurs.",
        beforeCode: `if (statut = "actif") {
  console.log("Actif");
}`,
        afterCode: `if (statut === "actif") {
  console.log("Actif");
}`,
    },
    {
        code: "JS008",
        title: "Boucle potentiellement infinie",
        category: client_1.Category.JAVASCRIPT,
        severity: client_1.Severity.CRITIQUE,
        explanation: "Une boucle while(true) ne contient aucune instruction break détectable.",
        cause: "La condition de sortie de la boucle n'est jamais atteinte.",
        howToFind: "Vérifiez la présence d'un break dans une boucle while(true) ou for(;;).",
        fixHint: "Ajoutez une condition de sortie claire (break ou condition de boucle).",
        beforeCode: `while (true) {
  traiterElement();
}`,
        afterCode: `while (true) {
  const termine = traiterElement();

  if (termine) {
    break;
  }
}`,
    },
    // ============================================================
    // TYPESCRIPT
    // ============================================================
    {
        code: "TS001",
        title: "Utilisation excessive de any",
        category: client_1.Category.TYPESCRIPT,
        severity: client_1.Severity.MOYENNE,
        explanation: "Le type any désactive une partie importante de la vérification statique de TypeScript.",
        cause: "Une valeur est déclarée avec any alors qu'un type plus précis pourrait être utilisé.",
        howToFind: "Recherchez les variables, paramètres ou retours explicitement typés any.",
        fixHint: "Définissez un type précis ou utilisez unknown lorsque le type est réellement inconnu.",
        beforeCode: `function afficherUtilisateur(
  utilisateur: any
) {
  console.log(utilisateur.nom);
}`,
        afterCode: `interface Utilisateur {
  nom: string;
}

function afficherUtilisateur(
  utilisateur: Utilisateur
) {
  console.log(utilisateur.nom);
}`,
    },
    {
        code: "TS002",
        title: "Valeur undefined non vérifiée",
        category: client_1.Category.TYPESCRIPT,
        severity: client_1.Severity.MOYENNE,
        explanation: "Une valeur optionnelle est utilisée comme si elle existait toujours.",
        cause: "La valeur peut être undefined selon son type.",
        howToFind: "Cherchez les propriétés optionnelles et les résultats pouvant être undefined.",
        fixHint: "Vérifiez la valeur avant utilisation ou fournissez une valeur par défaut.",
        beforeCode: `interface User {
  name?: string;
}

function afficher(user: User) {
  console.log(user.name.toUpperCase());
}`,
        afterCode: `interface User {
  name?: string;
}

function afficher(user: User) {
  if (!user.name) {
    return;
  }

  console.log(user.name.toUpperCase());
}`,
    },
    {
        code: "TS003",
        title: "Propriété inexistante sur un type",
        category: client_1.Category.TYPESCRIPT,
        severity: client_1.Severity.CRITIQUE,
        explanation: "Une propriété utilisée n'existe pas dans le type déclaré.",
        cause: "Le nom de propriété utilisé dans le code ne correspond pas au type.",
        howToFind: "Comparez la propriété utilisée avec la définition de l'interface ou du type.",
        fixHint: "Utilisez la propriété correcte ou modifiez le type si nécessaire.",
        beforeCode: `interface User {
  name: string;
}

const user: User = {
  name: "Jean",
};

console.log(user.email);`,
        afterCode: `interface User {
  name: string;
}

const user: User = {
  name: "Jean",
};

console.log(user.name);`,
    },
    // ============================================================
    // REACT
    // ============================================================
    {
        code: "RE001",
        title: "Clé manquante dans une liste React",
        category: client_1.Category.REACT,
        severity: client_1.Severity.MOYENNE,
        explanation: "Chaque élément d'une liste React doit posséder une clé stable.",
        cause: "React utilise les clés pour identifier les éléments entre les différents rendus.",
        howToFind: "Recherchez les appels map() qui retournent des éléments sans prop key.",
        fixHint: "Utilisez un identifiant stable et unique comme clé.",
        beforeCode: `{users.map((user) => (
  <div>{user.name}</div>
))}`,
        afterCode: `{users.map((user) => (
  <div key={user.id}>
    {user.name}
  </div>
))}`,
    },
    {
        code: "RE002",
        title: "Dépendance manquante dans useEffect",
        category: client_1.Category.REACT,
        severity: client_1.Severity.MOYENNE,
        explanation: "L'effet utilise une valeur extérieure qui n'est pas représentée dans ses dépendances.",
        cause: "Le tableau de dépendances ne représente pas toutes les valeurs utilisées par l'effet.",
        howToFind: "Identifiez les props, états et valeurs extérieures utilisés dans useEffect.",
        fixHint: "Ajoutez les dépendances nécessaires ou restructurez l'effet.",
        beforeCode: `useEffect(() => {
  chargerUtilisateur(userId);
}, []);`,
        afterCode: `useEffect(() => {
  chargerUtilisateur(userId);
}, [userId]);`,
    },
    {
        code: "RE003",
        title: "État dérivé recalculé inutilement dans useEffect",
        category: client_1.Category.REACT,
        severity: client_1.Severity.MOYENNE,
        explanation: "Une valeur directement dérivable des props ou du state ne nécessite généralement pas un state supplémentaire.",
        cause: "setState() est utilisé dans un effet pour calculer une valeur déjà disponible pendant le rendu.",
        howToFind: "Recherchez les useEffect qui calculent immédiatement une valeur à partir d'autres valeurs.",
        fixHint: "Calculez directement la valeur pendant le rendu lorsque cela est possible.",
        beforeCode: `const [nomComplet, setNomComplet] =
  useState("");

useEffect(() => {
  setNomComplet(firstName + " " + lastName);
}, [firstName, lastName]);`,
        afterCode: `const nomComplet =
  firstName + " " + lastName;`,
    },
    {
        code: "RE004",
        title: "Hook React utilisé conditionnellement",
        category: client_1.Category.REACT,
        severity: client_1.Severity.CRITIQUE,
        explanation: "Les Hooks React doivent être appelés dans le même ordre à chaque rendu.",
        cause: "Un Hook est appelé dans une condition, une boucle ou une fonction imbriquée.",
        howToFind: "Vérifiez si useState, useEffect ou un Hook personnalisé est appelé après une condition ou dans une boucle.",
        fixHint: "Placez les Hooks au niveau supérieur du composant.",
        beforeCode: `if (isLoggedIn) {
  const [user, setUser] = useState(null);
}`,
        afterCode: `const [user, setUser] = useState(null);

if (!isLoggedIn) {
  return null;
}`,
    },
    {
        code: "RE005",
        title: "Effet sans nettoyage (fuite mémoire potentielle)",
        category: client_1.Category.REACT,
        severity: client_1.Severity.CRITIQUE,
        explanation: "Un timer ou un écouteur d'événement est créé dans useEffect sans être nettoyé.",
        cause: "La fonction de nettoyage (return) de useEffect est absente.",
        howToFind: "Cherchez setInterval, setTimeout ou addEventListener dans un useEffect sans clearInterval/clearTimeout/removeEventListener en retour.",
        fixHint: "Retournez une fonction de nettoyage dans useEffect.",
        beforeCode: `useEffect(() => {
  const id = setInterval(rafraichir, 1000);
}, []);`,
        afterCode: `useEffect(() => {
  const id = setInterval(rafraichir, 1000);

  return () => clearInterval(id);
}, []);`,
    },
    // ============================================================
    // HTTP
    // ============================================================
    {
        code: "HTTP001",
        title: "Mauvais code de statut HTTP",
        category: client_1.Category.HTTP,
        severity: client_1.Severity.MOYENNE,
        explanation: "La réponse HTTP utilise un code qui ne représente pas correctement la situation.",
        cause: "Le serveur utilise un statut générique au lieu d'un statut correspondant à la situation.",
        howToFind: "Analysez le statut HTTP retourné selon la nature de l'opération.",
        fixHint: "Utilisez le code HTTP correspondant réellement à la situation.",
        beforeCode: `return res.status(200).json({
  erreur: "Utilisateur introuvable"
});`,
        afterCode: `return res.status(404).json({
  erreur: "Utilisateur introuvable"
});`,
    },
    {
        code: "HTTP002",
        title: "Mauvaise méthode HTTP",
        category: client_1.Category.HTTP,
        severity: client_1.Severity.MOYENNE,
        explanation: "La méthode HTTP ne correspond pas à l'opération réalisée.",
        cause: "Une opération de lecture, création, modification ou suppression utilise une méthode inadaptée.",
        howToFind: "Comparez l'intention de la requête avec GET, POST, PUT, PATCH et DELETE.",
        fixHint: "Utilisez la méthode HTTP correspondant à l'opération.",
        beforeCode: `app.get("/users", (req, res) => {
  const user = req.body;
});`,
        afterCode: `app.post("/users", (req, res) => {
  const user = req.body;
});`,
    },
    // ============================================================
    // API
    // ============================================================
    {
        code: "API001",
        title: "Entrée utilisateur non validée",
        category: client_1.Category.API,
        severity: client_1.Severity.CRITIQUE,
        explanation: "Les données reçues par l'API sont utilisées sans validation.",
        cause: "Le serveur fait confiance directement aux données envoyées par le client.",
        howToFind: "Examinez req.body, req.params et req.query avant leur utilisation.",
        fixHint: "Validez systématiquement les données côté serveur.",
        beforeCode: `const { email } = req.body;

await creerUtilisateur(email);`,
        afterCode: `const { email } = req.body;

if (
  typeof email !== "string" ||
  !email.includes("@")
) {
  return res.status(400).json({
    erreur: "Adresse email invalide.",
  });
}

await creerUtilisateur(email);`,
    },
    {
        code: "API002",
        title: "Erreur serveur non gérée",
        category: client_1.Category.API,
        severity: client_1.Severity.CRITIQUE,
        explanation: "Une opération asynchrone peut échouer sans être correctement interceptée.",
        cause: "Le contrôleur ne possède pas de mécanisme de gestion des exceptions.",
        howToFind: "Identifiez les opérations await exécutées sans try/catch ou middleware d'erreur.",
        fixHint: "Gérez les exceptions et retournez une réponse API cohérente.",
        beforeCode: `app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();

  res.json(users);
});`,
        afterCode: `app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();

    return res.json(users);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      erreur: "Erreur interne du serveur.",
    });
  }
});`,
    },
    {
        code: "API003",
        title: "Donnée sensible exposée dans la réponse",
        category: client_1.Category.API,
        severity: client_1.Severity.CRITIQUE,
        explanation: "La réponse API retourne des informations qui ne devraient pas être accessibles au client.",
        cause: "L'objet complet provenant de la base de données est retourné sans filtrage.",
        howToFind: "Examinez les objets ORM directement retournés par les contrôleurs.",
        fixHint: "Sélectionnez explicitement les propriétés autorisées dans la réponse.",
        beforeCode: `const utilisateur =
  await prisma.user.findUnique({
    where: { id },
  });

return res.json(utilisateur);`,
        afterCode: `const utilisateur =
  await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      displayName: true,
    },
  });

return res.json(utilisateur);`,
    },
    {
        code: "API004",
        title: "Injection SQL potentielle",
        category: client_1.Category.API,
        severity: client_1.Severity.CRITIQUE,
        explanation: "Une requête SQL est construite par concaténation directe d'une variable utilisateur.",
        cause: "La valeur n'est pas passée en paramètre lié (prepared statement).",
        howToFind: "Recherchez une requête SQL construite avec des template strings incluant une variable.",
        fixHint: "Utilisez des requêtes paramétrées ou un ORM avec échappement automatique.",
        beforeCode: `const resultat = await db.query(\`SELECT * FROM users WHERE email = '\${email}'\`);`,
        afterCode: `const resultat = await db.query("SELECT * FROM users WHERE email = $1", [email]);`,
    },
    {
        code: "SEC001",
        title: "Secret ou clé API en dur dans le code",
        category: client_1.Category.API,
        severity: client_1.Severity.CRITIQUE,
        explanation: "Une clé secrète ou un mot de passe apparaît directement dans le code source.",
        cause: "Les identifiants sensibles ne sont pas externalisés dans des variables d'environnement.",
        howToFind: "Recherchez des chaînes assignées à des variables comme apiKey, secret ou password.",
        fixHint: "Déplacez la valeur dans une variable d'environnement (process.env).",
        beforeCode: `const apiKey = "sk_live_abcdef123456789";`,
        afterCode: `const apiKey = process.env.API_KEY;`,
    },
    // ============================================================
    // HTML / CSS
    // ============================================================
    {
        code: "HC001",
        title: "Éléments HTML incorrectement imbriqués",
        category: client_1.Category.HTML_CSS,
        severity: client_1.Severity.MOYENNE,
        explanation: "Certains éléments HTML ne peuvent pas être placés directement à l'intérieur d'autres éléments.",
        cause: "La structure HTML ne respecte pas les règles d'imbrication.",
        howToFind: "Vérifiez les relations entre les éléments parents et enfants.",
        fixHint: "Utilisez une structure HTML valide.",
        beforeCode: `<p>
  <div>Contenu</div>
</p>`,
        afterCode: `<div>
  <p>Contenu</p>
</div>`,
    },
    {
        code: "HC002",
        title: "Image sans attribut alt",
        category: client_1.Category.HTML_CSS,
        severity: client_1.Severity.FAIBLE,
        explanation: "Une image informative devrait fournir une alternative textuelle.",
        cause: "L'attribut alt est absent.",
        howToFind: "Recherchez les balises img sans attribut alt.",
        fixHint: "Ajoutez une description pertinente dans l'attribut alt.",
        beforeCode: `<img src="/photo.jpg" />`,
        afterCode: `<img
  src="/photo.jpg"
  alt="Portrait de l'utilisateur"
/>`,
    },
];
//# sourceMappingURL=regles-diagnostic.js.map