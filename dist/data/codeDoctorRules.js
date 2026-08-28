"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CODE_DOCTOR_RULES = void 0;
const client_1 = require("../generated/prisma/client");
exports.CODE_DOCTOR_RULES = [
    // ============================================================
    // JAVASCRIPT — VARIABLES / TYPES / CONDITIONS
    // ============================================================
    {
        code: "JS-001",
        title: "Utilisation de == au lieu de ===",
        category: client_1.Category.JAVASCRIPT,
        severity: client_1.Severity.MOYENNE,
        explanation: "L'opérateur == effectue une conversion implicite des types avant la comparaison.",
        cause: "La comparaison utilise l'égalité faible au lieu de l'égalité stricte.",
        howToFind: "Recherchez les opérateurs == et != dans les conditions.",
        fixHint: "Utilisez === et !== lorsque vous souhaitez comparer la valeur et le type.",
        beforeCode: `if (age == "18") {
  console.log("Majeur");
}`,
        afterCode: `if (age === 18) {
  console.log("Majeur");
}`,
    },
    {
        code: "JS-002",
        title: "Affectation utilisée dans une condition",
        category: client_1.Category.JAVASCRIPT,
        severity: client_1.Severity.CRITIQUE,
        explanation: "L'opérateur = affecte une valeur alors qu'une condition nécessite généralement une comparaison.",
        cause: "Une affectation a été utilisée à la place de === ou d'un autre opérateur de comparaison.",
        howToFind: "Vérifiez les conditions if, while et autres expressions conditionnelles contenant =.",
        fixHint: "Utilisez l'opérateur de comparaison approprié.",
        beforeCode: `if (age = 18) {
  console.log("Majeur");
}`,
        afterCode: `if (age === 18) {
  console.log("Majeur");
}`,
    },
    {
        code: "JS-003",
        title: "Variable utilisée avant sa déclaration",
        category: client_1.Category.JAVASCRIPT,
        severity: client_1.Severity.CRITIQUE,
        explanation: "Une variable déclarée avec let ou const ne peut pas être utilisée avant son initialisation.",
        cause: "Le code accède à une variable située dans sa zone temporelle morte.",
        howToFind: "Cherchez les utilisations de variables placées avant leur déclaration.",
        fixHint: "Déclarez et initialisez la variable avant sa première utilisation.",
        beforeCode: `console.log(nom);

const nom = "CodeDoctor";`,
        afterCode: `const nom = "CodeDoctor";

console.log(nom);`,
    },
    {
        code: "JS-004",
        title: "Variable potentiellement non définie",
        category: client_1.Category.JAVASCRIPT,
        severity: client_1.Severity.CRITIQUE,
        explanation: "Une variable qui n'existe pas dans la portée courante provoquera une erreur au moment de son utilisation.",
        cause: "Le nom de la variable est incorrect, oublié ou hors de portée.",
        howToFind: "Vérifiez l'orthographe et la portée de chaque variable utilisée.",
        fixHint: "Déclarez la variable ou utilisez le nom réellement déclaré.",
        beforeCode: `const utilisateur = "Alice";

console.log(utilisateurNom);`,
        afterCode: `const utilisateur = "Alice";

console.log(utilisateur);`,
    },
    {
        code: "JS-005",
        title: "Redéclaration incorrecte d'une variable let ou const",
        category: client_1.Category.JAVASCRIPT,
        severity: client_1.Severity.CRITIQUE,
        explanation: "Une variable déclarée avec let ou const ne peut pas être déclarée une seconde fois dans la même portée.",
        cause: "Le même identifiant est déclaré plusieurs fois dans la même portée.",
        howToFind: "Recherchez plusieurs déclarations let ou const portant le même nom.",
        fixHint: "Supprimez la déclaration inutile ou choisissez un autre identifiant.",
        beforeCode: `const nom = "Alice";
const nom = "Bob";`,
        afterCode: `let nom = "Alice";
nom = "Bob";`,
    },
    {
        code: "JS-006",
        title: "Utilisation inutile de var",
        category: client_1.Category.JAVASCRIPT,
        severity: client_1.Severity.FAIBLE,
        explanation: "var possède des règles de portée différentes de let et const et peut rendre le comportement du code moins prévisible.",
        cause: "Le code utilise une ancienne déclaration de variable alors qu'une déclaration moderne est possible.",
        howToFind: "Recherchez les déclarations utilisant var.",
        fixHint: "Préférez const lorsque la variable n'est pas réassignée et let lorsqu'elle doit l'être.",
        beforeCode: `var nom = "Alice";`,
        afterCode: `const nom = "Alice";`,
    },
    {
        code: "JS-007",
        title: "Constante réassignée",
        category: client_1.Category.JAVASCRIPT,
        severity: client_1.Severity.CRITIQUE,
        explanation: "Une variable déclarée avec const ne peut pas recevoir une nouvelle valeur.",
        cause: "Le code tente de réassigner une constante.",
        howToFind: "Cherchez une affectation ultérieure sur une variable déclarée avec const.",
        fixHint: "Utilisez let si la variable doit être réassignée.",
        beforeCode: `const compteur = 0;

compteur = compteur + 1;`,
        afterCode: `let compteur = 0;

compteur = compteur + 1;`,
    },
    {
        code: "JS-008",
        title: "Accès à une propriété d'une valeur potentiellement null",
        category: client_1.Category.JAVASCRIPT,
        severity: client_1.Severity.CRITIQUE,
        explanation: "Accéder directement à une propriété d'une valeur null ou undefined provoque une erreur d'exécution.",
        cause: "Le code suppose que l'objet existe toujours.",
        howToFind: "Identifiez les accès aux propriétés de données provenant d'une source incertaine.",
        fixHint: "Validez la valeur ou utilisez l'accès optionnel lorsque cela est approprié.",
        beforeCode: `const nom = utilisateur.nom;`,
        afterCode: `const nom = utilisateur?.nom;`,
    },
    {
        code: "JS-009",
        title: "Confusion entre null et undefined",
        category: client_1.Category.JAVASCRIPT,
        severity: client_1.Severity.FAIBLE,
        explanation: "null et undefined représentent des situations différentes et doivent être utilisés de manière cohérente.",
        cause: "Le code mélange les conventions de représentation d'une valeur absente.",
        howToFind: "Vérifiez les tests et affectations utilisant null et undefined.",
        fixHint: "Choisissez une convention cohérente selon le contrat de votre fonction ou API.",
        beforeCode: `if (utilisateur === null) {
  return;
}

const utilisateurCourant =
  chercherUtilisateur();`,
        afterCode: `const utilisateurCourant =
  chercherUtilisateur();

if (utilisateurCourant == null) {
  return;
}`,
    },
    {
        code: "JS-010",
        title: "Utilisation dangereuse d'une propriété sans vérification",
        category: client_1.Category.JAVASCRIPT,
        severity: client_1.Severity.MOYENNE,
        explanation: "Une donnée externe peut ne pas avoir la structure attendue.",
        cause: "Le code fait confiance à une structure qui n'est pas garantie.",
        howToFind: "Analysez les données provenant d'une API, d'un formulaire ou du stockage navigateur.",
        fixHint: "Validez la structure avant d'utiliser les propriétés.",
        beforeCode: `const nom = reponse.data.user.name;`,
        afterCode: `const nom = reponse?.data?.user?.name;`,
    },
    // ============================================================
    // JAVASCRIPT — FONCTIONS / TABLEAUX / OBJETS
    // ============================================================
    {
        code: "JS-011",
        title: "Fonction déclarée mais jamais appelée",
        category: client_1.Category.JAVASCRIPT,
        severity: client_1.Severity.FAIBLE,
        explanation: "Une fonction déclarée ne s'exécute pas automatiquement.",
        cause: "Le code définit la fonction mais ne l'invoque jamais.",
        howToFind: "Vérifiez les fonctions qui ne possèdent aucun appel.",
        fixHint: "Appelez la fonction au moment où son comportement est nécessaire.",
        beforeCode: `function afficherMessage() {
  console.log("Bonjour");
}`,
        afterCode: `function afficherMessage() {
  console.log("Bonjour");
}

afficherMessage();`,
    },
    {
        code: "JS-012",
        title: "Code placé après un return",
        category: client_1.Category.JAVASCRIPT,
        severity: client_1.Severity.MOYENNE,
        explanation: "Une fonction quitte son exécution dès qu'elle rencontre return.",
        cause: "Une instruction a été placée après un retour définitif.",
        howToFind: "Recherchez les instructions situées après return dans le même bloc.",
        fixHint: "Déplacez le code avant return ou supprimez-le s'il est inutile.",
        beforeCode: `function calculer() {
  return 10;

  console.log("Impossible");
}`,
        afterCode: `function calculer() {
  console.log("Calcul effectué");

  return 10;
}`,
    },
    {
        code: "JS-013",
        title: "Paramètre manquant lors d'un appel de fonction",
        category: client_1.Category.JAVASCRIPT,
        severity: client_1.Severity.MOYENNE,
        explanation: "Une fonction peut recevoir undefined lorsqu'un argument obligatoire n'est pas fourni.",
        cause: "L'appelant ne respecte pas le contrat attendu par la fonction.",
        howToFind: "Comparez la signature de la fonction avec chacun de ses appels.",
        fixHint: "Fournissez l'argument requis ou définissez une valeur par défaut.",
        beforeCode: `function saluer(nom) {
  console.log(nom.toUpperCase());
}

saluer();`,
        afterCode: `function saluer(nom = "Utilisateur") {
  console.log(nom.toUpperCase());
}

saluer();`,
    },
    {
        code: "JS-014",
        title: "Mutation directe d'un tableau",
        category: client_1.Category.JAVASCRIPT,
        severity: client_1.Severity.MOYENNE,
        explanation: "La mutation directe peut provoquer des effets de bord lorsque le tableau est partagé.",
        cause: "Une méthode mutante modifie directement la référence originale.",
        howToFind: "Recherchez push, pop, splice, shift et unshift dans les données partagées.",
        fixHint: "Créez une nouvelle collection lorsque l'immutabilité est requise.",
        beforeCode: `const utilisateurs = ["Alice"];

utilisateurs.push("Bob");`,
        afterCode: `const utilisateurs = ["Alice"];

const nouveauxUtilisateurs = [
  ...utilisateurs,
  "Bob",
];`,
    },
    {
        code: "JS-015",
        title: "Mutation directe d'un objet",
        category: client_1.Category.JAVASCRIPT,
        severity: client_1.Severity.MOYENNE,
        explanation: "Modifier directement un objet partagé peut créer des effets de bord.",
        cause: "La référence existante est modifiée au lieu de créer une nouvelle valeur.",
        howToFind: "Recherchez les affectations directes de propriétés sur des objets partagés.",
        fixHint: "Utilisez une copie avec l'opérateur spread lorsque l'immutabilité est nécessaire.",
        beforeCode: `utilisateur.nom = "Alice";`,
        afterCode: `const utilisateurMisAJour = {
  ...utilisateur,
  nom: "Alice",
};`,
    },
    {
        code: "JS-016",
        title: "Mauvaise utilisation de forEach pour produire une valeur",
        category: client_1.Category.JAVASCRIPT,
        severity: client_1.Severity.FAIBLE,
        explanation: "forEach est destiné à parcourir une collection et ne retourne pas le tableau transformé.",
        cause: "Le développeur attend une valeur de retour de forEach.",
        howToFind: "Vérifiez les affectations utilisant le résultat d'un forEach.",
        fixHint: "Utilisez map pour transformer une collection.",
        beforeCode: `const noms = utilisateurs.forEach(
  (utilisateur) => utilisateur.nom
);`,
        afterCode: `const noms = utilisateurs.map(
  (utilisateur) => utilisateur.nom
);`,
    },
    {
        code: "JS-017",
        title: "Utilisation incorrecte de map pour un simple effet de bord",
        category: client_1.Category.JAVASCRIPT,
        severity: client_1.Severity.FAIBLE,
        explanation: "map doit normalement servir à produire une nouvelle collection.",
        cause: "map est utilisé uniquement pour exécuter une action.",
        howToFind: "Recherchez les map dont le résultat n'est jamais utilisé.",
        fixHint: "Utilisez forEach lorsqu'aucune nouvelle collection n'est nécessaire.",
        beforeCode: `utilisateurs.map((utilisateur) => {
  console.log(utilisateur.nom);
});`,
        afterCode: `utilisateurs.forEach((utilisateur) => {
  console.log(utilisateur.nom);
});`,
    },
    {
        code: "JS-018",
        title: "Index de tableau utilisé sans vérifier son existence",
        category: client_1.Category.JAVASCRIPT,
        severity: client_1.Severity.MOYENNE,
        explanation: "Un index peut pointer vers undefined lorsque la position n'existe pas.",
        cause: "Le code suppose que l'élément est toujours présent.",
        howToFind: "Identifiez les accès directs à des positions de tableau provenant d'une source variable.",
        fixHint: "Vérifiez l'élément avant de l'utiliser.",
        beforeCode: `const utilisateur = utilisateurs[index];

console.log(utilisateur.nom);`,
        afterCode: `const utilisateur = utilisateurs[index];

if (!utilisateur) {
  return;
}

console.log(utilisateur.nom);`,
    },
    // ============================================================
    // JAVASCRIPT — ASYNCHRONE / PROMESSES
    // ============================================================
    {
        code: "JS-019",
        title: "Promise non attendue avec await",
        category: client_1.Category.JAVASCRIPT,
        severity: client_1.Severity.CRITIQUE,
        explanation: "Une Promise non attendue peut entraîner l'utilisation prématurée de données encore indisponibles.",
        cause: "La fonction asynchrone est appelée sans await ou sans traitement de sa Promise.",
        howToFind: "Recherchez les appels de fonctions async dont le résultat est utilisé directement.",
        fixHint: "Utilisez await dans une fonction async ou .then() lorsque cela correspond au besoin.",
        beforeCode: `const utilisateurs = obtenirUtilisateurs();

console.log(utilisateurs.length);`,
        afterCode: `const utilisateurs =
  await obtenirUtilisateurs();

console.log(utilisateurs.length);`,
    },
    {
        code: "JS-020",
        title: "Erreur Promise non gérée",
        category: client_1.Category.JAVASCRIPT,
        severity: client_1.Severity.CRITIQUE,
        explanation: "Une Promise rejetée doit être correctement traitée.",
        cause: "Le code lance une opération asynchrone sans gestion de son rejet.",
        howToFind: "Recherchez les appels async sans await, catch ou gestion équivalente.",
        fixHint: "Ajoutez try/catch ou catch selon le contexte.",
        beforeCode: `obtenirUtilisateurs();`,
        afterCode: `try {
  await obtenirUtilisateurs();
} catch (error) {
  console.error(error);
}`,
    },
    {
        code: "JS-021",
        title: "Utilisation incorrecte de try/catch",
        category: client_1.Category.JAVASCRIPT,
        severity: client_1.Severity.MOYENNE,
        explanation: "Un try/catch doit entourer l'opération susceptible de générer l'erreur.",
        cause: "L'opération dangereuse est exécutée en dehors du bloc try.",
        howToFind: "Vérifiez que les opérations async ou susceptibles d'échouer sont réellement dans try.",
        fixHint: "Placez l'opération concernée dans le bloc try.",
        beforeCode: `const resultat = await charger();

try {
  console.log(resultat);
} catch (error) {
  console.error(error);
}`,
        afterCode: `try {
  const resultat = await charger();
  console.log(resultat);
} catch (error) {
  console.error(error);
}`,
    },
    {
        code: "JS-022",
        title: "Oubli du mot-clé await dans une fonction async",
        category: client_1.Category.JAVASCRIPT,
        severity: client_1.Severity.MOYENNE,
        explanation: "Sans await, une fonction async retourne une Promise au lieu de la valeur finale.",
        cause: "Le développeur traite une Promise comme si elle contenait immédiatement le résultat.",
        howToFind: "Identifiez les appels async dont la valeur est utilisée directement.",
        fixHint: "Ajoutez await si le résultat doit être obtenu avant de poursuivre.",
        beforeCode: `async function charger() {
  const utilisateur = obtenirUtilisateur();

  return utilisateur.nom;
}`,
        afterCode: `async function charger() {
  const utilisateur =
    await obtenirUtilisateur();

  return utilisateur.nom;
}`,
    },
    {
        code: "JS-023",
        title: "Exécution séquentielle inutile de tâches indépendantes",
        category: client_1.Category.JAVASCRIPT,
        severity: client_1.Severity.FAIBLE,
        explanation: "Des opérations indépendantes peuvent parfois être exécutées en parallèle.",
        cause: "Chaque Promise attend la précédente alors qu'elles ne dépendent pas les unes des autres.",
        howToFind: "Recherchez plusieurs await indépendants exécutés l'un après l'autre.",
        fixHint: "Utilisez Promise.all lorsque les opérations peuvent réellement être parallélisées.",
        beforeCode: `const utilisateurs =
  await chargerUtilisateurs();

const experiences =
  await chargerExperiences();`,
        afterCode: `const [
  utilisateurs,
  experiences,
] = await Promise.all([
  chargerUtilisateurs(),
  chargerExperiences(),
]);`,
    },
    {
        code: "JS-024",
        title: "Fonction async appelée sans gestion d'erreur",
        category: client_1.Category.JAVASCRIPT,
        severity: client_1.Severity.MOYENNE,
        explanation: "Une fonction async peut rejeter sa Promise et doit être traitée par son appelant lorsque cela est nécessaire.",
        cause: "Le rejet de la Promise est ignoré.",
        howToFind: "Identifiez les appels async dans des contextes où une erreur doit être affichée ou journalisée.",
        fixHint: "Ajoutez await dans try/catch ou .catch().",
        beforeCode: `chargerProfil();`,
        afterCode: `try {
  await chargerProfil();
} catch (error) {
  afficherErreur(error);
}`,
    },
    // ============================================================
    // JAVASCRIPT — CONDITIONS / BOUCLES / LOGIQUE
    // ============================================================
    {
        code: "JS-025",
        title: "Condition toujours vraie",
        category: client_1.Category.JAVASCRIPT,
        severity: client_1.Severity.CRITIQUE,
        explanation: "Une condition constante peut empêcher certaines branches du programme de fonctionner.",
        cause: "La condition contient une valeur constante ou une expression incorrecte.",
        howToFind: "Analysez les valeurs et expressions utilisées dans if et while.",
        fixHint: "Corrigez la condition afin qu'elle dépende réellement de la donnée attendue.",
        beforeCode: `if (true) {
  afficherUtilisateur();
} else {
  afficherErreur();
}`,
        afterCode: `if (utilisateurConnecte) {
  afficherUtilisateur();
} else {
  afficherErreur();
}`,
    },
    {
        code: "JS-026",
        title: "Boucle potentiellement infinie",
        category: client_1.Category.JAVASCRIPT,
        severity: client_1.Severity.CRITIQUE,
        explanation: "Une boucle qui ne modifie jamais sa condition de sortie peut ne jamais se terminer.",
        cause: "La variable contrôlant la boucle n'est pas correctement mise à jour.",
        howToFind: "Vérifiez la condition et la progression de la variable de boucle.",
        fixHint: "Assurez-vous que chaque itération rapproche la boucle de sa condition d'arrêt.",
        beforeCode: `let i = 0;

while (i < 10) {
  console.log(i);
}`,
        afterCode: `let i = 0;

while (i < 10) {
  console.log(i);
  i++;
}`,
    },
    {
        code: "JS-027",
        title: "return prématuré dans une boucle",
        category: client_1.Category.JAVASCRIPT,
        severity: client_1.Severity.MOYENNE,
        explanation: "return quitte toute la fonction et pas seulement l'itération courante.",
        cause: "return a été utilisé alors que continue ou une autre logique était nécessaire.",
        howToFind: "Examinez les return placés à l'intérieur des boucles.",
        fixHint: "Utilisez continue lorsque vous souhaitez seulement passer à l'itération suivante.",
        beforeCode: `for (const utilisateur of utilisateurs) {
  if (!utilisateur.actif) {
    return;
  }

  envoyerEmail(utilisateur);
}`,
        afterCode: `for (const utilisateur of utilisateurs) {
  if (!utilisateur.actif) {
    continue;
  }

  envoyerEmail(utilisateur);
}`,
    },
    {
        code: "JS-028",
        title: "Opérateur logique utilisé incorrectement",
        category: client_1.Category.JAVASCRIPT,
        severity: client_1.Severity.MOYENNE,
        explanation: "Une mauvaise combinaison de && et || peut produire une condition différente de celle attendue.",
        cause: "La logique booléenne n'a pas été correctement structurée.",
        howToFind: "Décomposez chaque partie de la condition et vérifiez sa table logique.",
        fixHint: "Utilisez des parenthèses pour rendre explicitement la priorité logique.",
        beforeCode: `if (admin || utilisateurActif && premium) {
  afficher();
}`,
        afterCode: `if (
  admin ||
  (utilisateurActif && premium)
) {
  afficher();
}`,
    },
    // ============================================================
    // TYPESCRIPT
    // ============================================================
    {
        code: "TS-001",
        title: "Utilisation excessive de any",
        category: client_1.Category.TYPESCRIPT,
        severity: client_1.Severity.MOYENNE,
        explanation: "any désactive une grande partie de la vérification statique de TypeScript.",
        cause: "Le développeur contourne le système de typage.",
        howToFind: "Recherchez les paramètres, variables et retours explicitement typés avec any.",
        fixHint: "Utilisez un type précis ou unknown lorsque le type est réellement inconnu.",
        beforeCode: `function afficher(data: any) {
  console.log(data.nom);
}`,
        afterCode: `interface Utilisateur {
  nom: string;
}

function afficher(data: Utilisateur) {
  console.log(data.nom);
}`,
    },
    {
        code: "TS-002",
        title: "Paramètre de fonction non typé",
        category: client_1.Category.TYPESCRIPT,
        severity: client_1.Severity.MOYENNE,
        explanation: "Un paramètre non typé réduit la sécurité et la lisibilité du code TypeScript.",
        cause: "Le type attendu n'est pas explicitement défini.",
        howToFind: "Recherchez les paramètres sans annotation de type.",
        fixHint: "Ajoutez le type correspondant.",
        beforeCode: `function additionner(a, b) {
  return a + b;
}`,
        afterCode: `function additionner(
  a: number,
  b: number
): number {
  return a + b;
}`,
    },
    {
        code: "TS-003",
        title: "Retour de fonction non typé",
        category: client_1.Category.TYPESCRIPT,
        severity: client_1.Severity.FAIBLE,
        explanation: "Le type de retour explicite peut documenter le contrat d'une fonction importante.",
        cause: "Le contrat de sortie est laissé entièrement à l'inférence.",
        howToFind: "Identifiez les fonctions publiques ou métier dont le retour mérite d'être documenté.",
        fixHint: "Ajoutez une annotation de retour lorsque cela améliore le contrat.",
        beforeCode: `function calculerTotal(prix: number) {
  return prix * 1.2;
}`,
        afterCode: `function calculerTotal(
  prix: number
): number {
  return prix * 1.2;
}`,
    },
    {
        code: "TS-004",
        title: "Interface préférable pour une structure réutilisée",
        category: client_1.Category.TYPESCRIPT,
        severity: client_1.Severity.FAIBLE,
        explanation: "Une interface améliore la réutilisation et la lisibilité d'une structure d'objet.",
        cause: "Une même structure est répétée directement dans plusieurs signatures.",
        howToFind: "Recherchez des objets possédant plusieurs fois les mêmes propriétés.",
        fixHint: "Créez une interface réutilisable.",
        beforeCode: `function afficher(
  utilisateur: {
    nom: string;
    age: number;
  }
) {
  console.log(utilisateur.nom);
}`,
        afterCode: `interface Utilisateur {
  nom: string;
  age: number;
}

function afficher(
  utilisateur: Utilisateur
) {
  console.log(utilisateur.nom);
}`,
    },
    {
        code: "TS-005",
        title: "unknown préférable à any pour une donnée inconnue",
        category: client_1.Category.TYPESCRIPT,
        severity: client_1.Severity.MOYENNE,
        explanation: "unknown oblige à vérifier une valeur avant de l'utiliser.",
        cause: "any est utilisé pour contourner une donnée dont le type n'est pas encore connu.",
        howToFind: "Cherchez les données externes déclarées en any.",
        fixHint: "Utilisez unknown puis effectuez les vérifications nécessaires.",
        beforeCode: `function traiter(data: any) {
  console.log(data.nom);
}`,
        afterCode: `function traiter(data: unknown) {
  if (
    typeof data === "object" &&
    data !== null &&
    "nom" in data
  ) {
    console.log(data.nom);
  }
}`,
    },
    {
        code: "TS-006",
        title: "Non-null assertion utilisée sans garantie",
        category: client_1.Category.TYPESCRIPT,
        severity: client_1.Severity.CRITIQUE,
        explanation: "L'opérateur ! indique à TypeScript qu'une valeur existe alors que cette garantie peut être fausse à l'exécution.",
        cause: "Le développeur force le compilateur à ignorer une possibilité de null ou undefined.",
        howToFind: "Recherchez les opérateurs ! placés après des valeurs potentiellement absentes.",
        fixHint: "Vérifiez réellement la valeur avant de l'utiliser.",
        beforeCode: `const element =
  document.getElementById("app")!;

element.innerHTML = "Bonjour";`,
        afterCode: `const element =
  document.getElementById("app");

if (!element) {
  throw new Error("Élément introuvable.");
}

element.innerHTML = "Bonjour";`,
    },
    {
        code: "TS-007",
        title: "Type union non vérifié",
        category: client_1.Category.TYPESCRIPT,
        severity: client_1.Severity.MOYENNE,
        explanation: "Une valeur possédant plusieurs types possibles doit être correctement discriminée avant utilisation.",
        cause: "Le code utilise directement une valeur union sans narrowing.",
        howToFind: "Cherchez les opérations incompatibles avec tous les membres de l'union.",
        fixHint: "Utilisez typeof, in, instanceof ou un discriminant adapté.",
        beforeCode: `function afficher(
  valeur: string | number
) {
  return valeur.toUpperCase();
}`,
        afterCode: `function afficher(
  valeur: string | number
) {
  if (typeof valeur === "string") {
    return valeur.toUpperCase();
  }

  return valeur.toString();
}`,
    },
    {
        code: "TS-008",
        title: "Enum ou union non respecté",
        category: client_1.Category.TYPESCRIPT,
        severity: client_1.Severity.MOYENNE,
        explanation: "Les valeurs métier doivent respecter les types définis par le domaine.",
        cause: "Une valeur arbitraire est utilisée à la place d'une valeur autorisée.",
        howToFind: "Comparez les valeurs reçues avec le type ou l'union autorisée.",
        fixHint: "Validez et limitez les valeurs aux membres prévus.",
        beforeCode: `type Statut =
  "ACTIVE" | "INACTIVE";

const statut: Statut = "SUPPRIME";`,
        afterCode: `type Statut =
  "ACTIVE" | "INACTIVE";

const statut: Statut = "ACTIVE";`,
    },
    // ============================================================
    // REACT — STATE / PROPS / RENDU
    // ============================================================
    {
        code: "REACT-001",
        title: "Mutation directe du state",
        category: client_1.Category.REACT,
        severity: client_1.Severity.CRITIQUE,
        explanation: "Les props et le state React doivent être traités comme des valeurs immuables.",
        cause: "Le state est modifié directement au lieu d'utiliser son setter.",
        howToFind: "Recherchez les affectations directes sur une variable provenant de useState.",
        fixHint: "Utilisez toujours le setter fourni par useState.",
        beforeCode: `const [count, setCount] = useState(0);

count = count + 1;`,
        afterCode: `const [count, setCount] = useState(0);

setCount(count + 1);`,
    },
    {
        code: "REACT-002",
        title: "Mutation directe d'un tableau dans le state",
        category: client_1.Category.REACT,
        severity: client_1.Severity.CRITIQUE,
        explanation: "Modifier directement un tableau contenu dans le state peut empêcher React de détecter correctement le changement.",
        cause: "Une méthode mutante modifie la référence existante.",
        howToFind: "Recherchez push, pop, splice, shift ou unshift sur une valeur du state.",
        fixHint: "Créez un nouveau tableau puis utilisez le setter.",
        beforeCode: `const [items, setItems] =
  useState<string[]>([]);

items.push("React");`,
        afterCode: `const [items, setItems] =
  useState<string[]>([]);

setItems((anciens) => [
  ...anciens,
  "React",
]);`,
    },
    {
        code: "REACT-003",
        title: "Mutation directe d'un objet dans le state",
        category: client_1.Category.REACT,
        severity: client_1.Severity.CRITIQUE,
        explanation: "Les objets contenus dans le state doivent être remplacés plutôt que modifiés directement.",
        cause: "La référence de l'objet existant est conservée.",
        howToFind: "Recherchez les affectations de propriétés sur les objets stockés dans le state.",
        fixHint: "Créez une nouvelle copie avec le spread operator.",
        beforeCode: `utilisateur.nom = "Alice";`,
        afterCode: `setUtilisateur((ancien) => ({
  ...ancien,
  nom: "Alice",
}));`,
    },
    {
        code: "REACT-004",
        title: "useEffect utilisé pour une valeur dérivée",
        category: client_1.Category.REACT,
        severity: client_1.Severity.MOYENNE,
        explanation: "Une valeur calculable directement depuis les props ou le state ne nécessite généralement pas d'effet.",
        cause: "useEffect est utilisé comme mécanisme de calcul au lieu de synchroniser un système externe.",
        howToFind: "Cherchez les effets qui font uniquement setState à partir d'autres états.",
        fixHint: "Calculez directement la valeur pendant le rendu lorsque c'est possible.",
        beforeCode: `const [nom, setNom] = useState("");

const [majuscule, setMajuscule] =
  useState("");

useEffect(() => {
  setMajuscule(nom.toUpperCase());
}, [nom]);`,
        afterCode: `const [nom, setNom] = useState("");

const majuscule = nom.toUpperCase();`,
    },
    {
        code: "REACT-005",
        title: "Hook utilisé conditionnellement",
        category: client_1.Category.REACT,
        severity: client_1.Severity.CRITIQUE,
        explanation: "Les Hooks React doivent être appelés dans le même ordre à chaque rendu.",
        cause: "Un Hook est placé dans une condition, une boucle ou après un retour conditionnel.",
        howToFind: "Recherchez useState, useEffect ou d'autres Hooks dans des if, boucles ou fonctions imbriquées.",
        fixHint: "Appelez toujours les Hooks au niveau supérieur du composant.",
        beforeCode: `if (connecte) {
  useEffect(() => {
    chargerProfil();
  }, []);
}`,
        afterCode: `useEffect(() => {
  if (connecte) {
    chargerProfil();
  }
}, [connecte]);`,
    },
    {
        code: "REACT-006",
        title: "Hook placé après un return conditionnel",
        category: client_1.Category.REACT,
        severity: client_1.Severity.CRITIQUE,
        explanation: "Un rendu conditionnel avant un Hook peut modifier l'ordre des Hooks entre deux rendus.",
        cause: "Le composant retourne avant d'appeler certains Hooks.",
        howToFind: "Vérifiez les return placés avant les Hooks.",
        fixHint: "Placez tous les Hooks avant les retours conditionnels.",
        beforeCode: `if (!utilisateur) {
  return null;
}

const [nom, setNom] =
  useState("");`,
        afterCode: `const [nom, setNom] =
  useState("");

if (!utilisateur) {
  return null;
}`,
    },
    {
        code: "REACT-007",
        title: "Absence de key stable dans une liste",
        category: client_1.Category.REACT,
        severity: client_1.Severity.MOYENNE,
        explanation: "React utilise key pour identifier les éléments d'une liste entre les rendus.",
        cause: "Les éléments retournés par map ne possèdent pas de clé stable.",
        howToFind: "Recherchez les map qui retournent des éléments JSX sans key.",
        fixHint: "Utilisez un identifiant stable et unique provenant de la donnée.",
        beforeCode: `utilisateurs.map((utilisateur) => (
  <div>
    {utilisateur.nom}
  </div>
))`,
        afterCode: `utilisateurs.map((utilisateur) => (
  <div key={utilisateur.id}>
    {utilisateur.nom}
  </div>
))`,
    },
    {
        code: "REACT-008",
        title: "Index utilisé comme key pour une liste dynamique",
        category: client_1.Category.REACT,
        severity: client_1.Severity.MOYENNE,
        explanation: "L'index peut devenir instable lorsque des éléments sont ajoutés, supprimés ou réordonnés.",
        cause: "L'index ne représente pas nécessairement l'identité de l'élément.",
        howToFind: "Recherchez key={index} dans les listes modifiables.",
        fixHint: "Utilisez l'identifiant stable de l'élément.",
        beforeCode: `items.map((item, index) => (
  <Item key={index} item={item} />
))`,
        afterCode: `items.map((item) => (
  <Item key={item.id} item={item} />
))`,
    },
    {
        code: "REACT-009",
        title: "Effet avec dépendance manquante",
        category: client_1.Category.REACT,
        severity: client_1.Severity.CRITIQUE,
        explanation: "Un effet utilisant une valeur réactive doit généralement déclarer cette valeur dans ses dépendances.",
        cause: "La liste de dépendances ne reflète pas les valeurs utilisées par l'effet.",
        howToFind: "Analysez les variables provenant des props, du state ou du scope du composant utilisées dans l'effet.",
        fixHint: "Ajoutez les dépendances nécessaires ou restructurez l'effet.",
        beforeCode: `useEffect(() => {
  chargerUtilisateur(userId);
}, []);`,
        afterCode: `useEffect(() => {
  chargerUtilisateur(userId);
}, [userId]);`,
    },
    {
        code: "REACT-010",
        title: "Effet provoquant potentiellement une boucle de rendu",
        category: client_1.Category.REACT,
        severity: client_1.Severity.CRITIQUE,
        explanation: "Un effet qui modifie une valeur dont il dépend peut provoquer des rendus répétés.",
        cause: "Le state modifié par l'effet déclenche à nouveau l'effet.",
        howToFind: "Vérifiez les setState exécutés dans les effets et leurs dépendances.",
        fixHint: "Supprimez l'effet inutile ou corrigez les dépendances et la logique.",
        beforeCode: `useEffect(() => {
  setCount(count + 1);
}, [count]);`,
        afterCode: `useEffect(() => {
  setCount(1);
}, []);`,
    },
    {
        code: "REACT-011",
        title: "Effet sans nettoyage pour une ressource externe",
        category: client_1.Category.REACT,
        severity: client_1.Severity.MOYENNE,
        explanation: "Les abonnements, timers et listeners doivent être nettoyés lorsque le composant est démonté.",
        cause: "Le composant crée une ressource qui continue de vivre après son démontage.",
        howToFind: "Recherchez addEventListener, setInterval, subscriptions ou WebSocket sans cleanup.",
        fixHint: "Retournez une fonction de nettoyage depuis useEffect.",
        beforeCode: `useEffect(() => {
  window.addEventListener(
    "resize",
    actualiser
  );
}, []);`,
        afterCode: `useEffect(() => {
  window.addEventListener(
    "resize",
    actualiser
  );

  return () => {
    window.removeEventListener(
      "resize",
      actualiser
    );
  };
}, []);`,
    },
    {
        code: "REACT-012",
        title: "setState utilisé avec une ancienne valeur dans plusieurs mises à jour",
        category: client_1.Category.REACT,
        severity: client_1.Severity.MOYENNE,
        explanation: "Lorsque la nouvelle valeur dépend de l'ancienne, la forme fonctionnelle du setter est plus sûre.",
        cause: "Le code utilise une fermeture pouvant contenir une ancienne valeur.",
        howToFind: "Recherchez plusieurs mises à jour ou des mises à jour dépendant du state précédent.",
        fixHint: "Utilisez setState(previous => next).",
        beforeCode: `setCount(count + 1);
setCount(count + 1);`,
        afterCode: `setCount((ancien) => ancien + 1);
setCount((ancien) => ancien + 1);`,
    },
    {
        code: "REACT-013",
        title: "Effet utilisé pour répondre directement à une action utilisateur",
        category: client_1.Category.REACT,
        severity: client_1.Severity.FAIBLE,
        explanation: "Une action provoquée directement par un clic ou une soumission doit généralement être traitée dans son gestionnaire.",
        cause: "Un useEffect est utilisé comme intermédiaire alors que l'événement est déjà disponible.",
        howToFind: "Cherchez des effets déclenchés uniquement par un état représentant un événement ponctuel.",
        fixHint: "Déplacez la logique dans le gestionnaire de l'événement lorsque cela est approprié.",
        beforeCode: `useEffect(() => {
  if (envoye) {
    afficherMessage();
  }
}, [envoye]);`,
        afterCode: `function soumettre() {
  envoyerFormulaire();
  afficherMessage();
}`,
    },
    // ============================================================
    // HTTP
    // ============================================================
    {
        code: "HTTP-001",
        title: "Mauvaise méthode HTTP pour l'opération",
        category: client_1.Category.HTTP,
        severity: client_1.Severity.MOYENNE,
        explanation: "La méthode HTTP doit correspondre à l'intention de l'opération.",
        cause: "Une méthode de lecture, création, modification ou suppression est utilisée incorrectement.",
        howToFind: "Comparez l'action métier avec la méthode HTTP utilisée.",
        fixHint: "GET pour récupérer, POST pour créer, PUT/PATCH pour modifier et DELETE pour supprimer.",
        beforeCode: `fetch("/api/utilisateurs", {
  method: "GET",
  body: JSON.stringify(utilisateur),
});`,
        afterCode: `fetch("/api/utilisateurs", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(utilisateur),
});`,
    },
    {
        code: "HTTP-002",
        title: "Absence de vérification de response.ok",
        category: client_1.Category.HTTP,
        severity: client_1.Severity.MOYENNE,
        explanation: "fetch ne rejette pas automatiquement sa Promise pour les réponses HTTP 4xx ou 5xx.",
        cause: "Le code suppose qu'une Promise résolue signifie que la requête HTTP a réussi.",
        howToFind: "Recherchez fetch suivi directement de response.json sans vérification du statut.",
        fixHint: "Vérifiez response.ok ou response.status avant de traiter les données.",
        beforeCode: `const response = await fetch("/api/users");

const data = await response.json();`,
        afterCode: `const response = await fetch("/api/users");

if (!response.ok) {
  throw new Error("Erreur HTTP");
}

const data = await response.json();`,
    },
    {
        code: "HTTP-003",
        title: "Mauvais code de statut HTTP",
        category: client_1.Category.HTTP,
        severity: client_1.Severity.MOYENNE,
        explanation: "Le statut HTTP doit représenter correctement le résultat de l'opération.",
        cause: "Le serveur retourne un statut générique ou inadapté.",
        howToFind: "Vérifiez la correspondance entre le résultat métier et le code HTTP.",
        fixHint: "Utilisez les statuts HTTP adaptés au contexte.",
        beforeCode: `return res.status(200).json({
  erreur: "Utilisateur introuvable",
});`,
        afterCode: `return res.status(404).json({
  erreur: "Utilisateur introuvable",
});`,
    },
    {
        code: "HTTP-004",
        title: "Création de ressource sans statut approprié",
        category: client_1.Category.HTTP,
        severity: client_1.Severity.FAIBLE,
        explanation: "Une ressource créée avec succès peut être signalée explicitement par un statut adapté.",
        cause: "Le serveur utilise systématiquement 200.",
        howToFind: "Examinez les endpoints POST créant une nouvelle ressource.",
        fixHint: "Utilisez 201 lorsque la création d'une ressource est réussie.",
        beforeCode: `return res.status(200).json({
  utilisateur,
});`,
        afterCode: `return res.status(201).json({
  utilisateur,
});`,
    },
    {
        code: "HTTP-005",
        title: "Corps JSON envoyé sans Content-Type",
        category: client_1.Category.HTTP,
        severity: client_1.Severity.MOYENNE,
        explanation: "Le serveur doit pouvoir savoir que le corps de la requête contient du JSON.",
        cause: "Le header Content-Type n'est pas envoyé.",
        howToFind: "Cherchez JSON.stringify utilisé sans Content-Type application/json.",
        fixHint: "Ajoutez le header approprié.",
        beforeCode: `fetch("/api/users", {
  method: "POST",
  body: JSON.stringify(data),
});`,
        afterCode: `fetch("/api/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
});`,
    },
    {
        code: "HTTP-006",
        title: "Endpoint sensible sans authentification",
        category: client_1.Category.HTTP,
        severity: client_1.Severity.CRITIQUE,
        explanation: "Une ressource privée doit vérifier l'identité de l'utilisateur.",
        cause: "La route est accessible sans middleware d'authentification.",
        howToFind: "Examinez les routes manipulant des données privées.",
        fixHint: "Ajoutez une authentification côté serveur et vérifiez l'utilisateur.",
        beforeCode: `router.get(
  "/mon-profil",
  obtenirProfil
);`,
        afterCode: `router.get(
  "/mon-profil",
  authentificationMiddleware,
  obtenirProfil
);`,
    },
    // ============================================================
    // API / BACKEND
    // ============================================================
    {
        code: "API-001",
        title: "Données utilisateur non validées",
        category: client_1.Category.API,
        severity: client_1.Severity.CRITIQUE,
        explanation: "Les données provenant du client ne doivent jamais être considérées comme fiables.",
        cause: "req.body, req.params ou req.query sont utilisés directement.",
        howToFind: "Recherchez les données entrantes utilisées sans validation.",
        fixHint: "Validez les données avant toute opération métier ou base de données.",
        beforeCode: `const { email } = req.body;

await creerUtilisateur(email);`,
        afterCode: `const donnees =
  schemaUtilisateur.parse(req.body);

await creerUtilisateur(donnees.email);`,
    },
    {
        code: "API-002",
        title: "Erreur interne exposée au client",
        category: client_1.Category.API,
        severity: client_1.Severity.CRITIQUE,
        explanation: "Les détails internes d'une erreur ne doivent pas être exposés au client.",
        cause: "L'objet Error ou sa stack est directement renvoyé.",
        howToFind: "Recherchez error, error.message ou error.stack dans les réponses HTTP.",
        fixHint: "Journalisez les détails côté serveur et retournez un message contrôlé.",
        beforeCode: `catch (error) {
  return res.status(500).json({
    error,
  });
}`,
        afterCode: `catch (error) {
  console.error(error);

  return res.status(500).json({
    erreur: "Une erreur interne est survenue.",
  });
}`,
    },
    {
        code: "API-003",
        title: "Route utilisant une donnée d'identité fournie par le client",
        category: client_1.Category.API,
        severity: client_1.Severity.CRITIQUE,
        explanation: "Un utilisateur authentifié ne doit pas pouvoir choisir arbitrairement l'identifiant utilisateur utilisé pour une opération privée.",
        cause: "Le serveur fait confiance à userId provenant du body ou des paramètres.",
        howToFind: "Recherchez userId dans req.body pour des opérations authentifiées.",
        fixHint: "Utilisez l'identité provenant du middleware d'authentification.",
        beforeCode: `const { userId } = req.body;

await obtenirProfil(userId);`,
        afterCode: `const userId = req.utilisateurId;

await obtenirProfil(userId);`,
    },
    {
        code: "API-004",
        title: "Absence de contrôle d'autorisation",
        category: client_1.Category.API,
        severity: client_1.Severity.CRITIQUE,
        explanation: "Être authentifié ne signifie pas automatiquement avoir le droit d'effectuer une action.",
        cause: "Le serveur vérifie l'identité mais pas les permissions.",
        howToFind: "Examinez les routes administratives ou les ressources appartenant à un autre utilisateur.",
        fixHint: "Ajoutez une vérification de rôle ou de propriété.",
        beforeCode: `authentificationMiddleware,
supprimerUtilisateur`,
        afterCode: `authentificationMiddleware,
adminMiddleware,
supprimerUtilisateur`,
    },
    {
        code: "API-005",
        title: "Absence de gestion d'une ressource inexistante",
        category: client_1.Category.API,
        severity: client_1.Severity.MOYENNE,
        explanation: "Une ressource inexistante doit être traitée explicitement.",
        cause: "Le service peut retourner null mais le contrôleur poursuit son traitement.",
        howToFind: "Vérifiez les résultats de findUnique, findFirst ou équivalents.",
        fixHint: "Retournez une réponse 404 lorsque la ressource n'existe pas.",
        beforeCode: `const utilisateur =
  await obtenirUtilisateur(id);

return res.json({
  utilisateur: utilisateur.nom,
});`,
        afterCode: `const utilisateur =
  await obtenirUtilisateur(id);

if (!utilisateur) {
  return res.status(404).json({
    erreur: "Utilisateur introuvable.",
  });
}

return res.json({
  utilisateur,
});`,
    },
    {
        code: "API-006",
        title: "Absence de limitation d'une entrée volumineuse",
        category: client_1.Category.API,
        severity: client_1.Severity.MOYENNE,
        explanation: "Les entrées excessivement volumineuses peuvent consommer inutilement les ressources du serveur.",
        cause: "Aucune limite n'est appliquée aux données entrantes.",
        howToFind: "Vérifiez les endpoints recevant du code, du texte ou des fichiers.",
        fixHint: "Définissez une taille maximale adaptée au besoin métier.",
        beforeCode: `const { code } = req.body;

await analyser(code);`,
        afterCode: `const { code } = req.body;

if (
  typeof code !== "string" ||
  code.length > 20000
) {
  return res.status(413).json({
    erreur: "Entrée trop volumineuse.",
  });
}

await analyser(code);`,
    },
    {
        code: "API-007",
        title: "Opération sensible sans rate limiting",
        category: client_1.Category.API,
        severity: client_1.Severity.MOYENNE,
        explanation: "Les endpoints sensibles peuvent être abusés par des requêtes répétées.",
        cause: "Aucune limitation n'est appliquée aux opérations coûteuses ou sensibles.",
        howToFind: "Examinez les routes de connexion, réinitialisation, analyse IA et autres opérations coûteuses.",
        fixHint: "Ajoutez un mécanisme de rate limiting adapté.",
        beforeCode: `router.post(
  "/analyser",
  analyserCode
);`,
        afterCode: `router.post(
  "/analyser",
  rateLimitMiddleware,
  analyserCode
);`,
    },
    {
        code: "API-008",
        title: "Données sensibles enregistrées dans les logs",
        category: client_1.Category.API,
        severity: client_1.Severity.CRITIQUE,
        explanation: "Les mots de passe, tokens et autres secrets ne doivent pas apparaître dans les logs.",
        cause: "Un objet complet contenant des informations sensibles est journalisé.",
        howToFind: "Recherchez console.log(req.body), console.log(token) ou des logs d'objets d'authentification.",
        fixHint: "Journalisez uniquement les informations nécessaires et masquez les secrets.",
        beforeCode: `console.log("Requête:", req.body);`,
        afterCode: `console.log("Requête reçue:", {
  email: req.body.email,
});`,
    },
    // ============================================================
    // HTML / CSS
    // ============================================================
    {
        code: "HTML-001",
        title: "Image sans attribut alt",
        category: client_1.Category.HTML_CSS,
        severity: client_1.Severity.MOYENNE,
        explanation: "L'attribut alt fournit une alternative textuelle utile notamment pour l'accessibilité.",
        cause: "L'image a été ajoutée sans description alternative.",
        howToFind: "Recherchez les balises img sans alt.",
        fixHint: "Ajoutez un texte alternatif pertinent ou un alt vide pour une image purement décorative.",
        beforeCode: `<img src="/photo.jpg" />`,
        afterCode: `<img
  src="/photo.jpg"
  alt="Photo de profil"
/>`,
    },
    {
        code: "HTML-002",
        title: "Bouton sans type explicite dans un formulaire",
        category: client_1.Category.HTML_CSS,
        severity: client_1.Severity.FAIBLE,
        explanation: "Un bouton dans un formulaire peut être interprété comme un bouton submit si son type n'est pas explicite.",
        cause: "L'attribut type est absent.",
        howToFind: "Recherchez les button présents dans les formulaires sans type.",
        fixHint: "Utilisez type=\"button\" ou type=\"submit\" explicitement.",
        beforeCode: `<button onClick={ouvrirMenu}>
  Menu
</button>`,
        afterCode: `<button
  type="button"
  onClick={ouvrirMenu}
>
  Menu
</button>`,
    },
    {
        code: "HTML-003",
        title: "Input sans label accessible",
        category: client_1.Category.HTML_CSS,
        severity: client_1.Severity.MOYENNE,
        explanation: "Un champ de formulaire doit avoir une étiquette compréhensible et associée.",
        cause: "Le champ est uniquement identifié visuellement par son placeholder.",
        howToFind: "Recherchez les input sans label associé.",
        fixHint: "Ajoutez un label et associez-le à l'input.",
        beforeCode: `<input
  type="email"
  placeholder="Email"
/>`,
        afterCode: `<label htmlFor="email">
  Adresse email
</label>

<input
  id="email"
  type="email"
  placeholder="Email"
/>`,
    },
    {
        code: "HTML-004",
        title: "Utilisation d'un div comme bouton",
        category: client_1.Category.HTML_CSS,
        severity: client_1.Severity.MOYENNE,
        explanation: "Les éléments interactifs doivent utiliser les éléments HTML prévus lorsque cela est possible.",
        cause: "Un div est utilisé pour simuler un bouton.",
        howToFind: "Recherchez des onClick sur div ou span pour des actions utilisateur.",
        fixHint: "Utilisez un élément button pour une action.",
        beforeCode: `<div onClick={supprimer}>
  Supprimer
</div>`,
        afterCode: `<button
  type="button"
  onClick={supprimer}
>
  Supprimer
</button>`,
    },
    {
        code: "HTML-005",
        title: "Hiérarchie de titres incohérente",
        category: client_1.Category.HTML_CSS,
        severity: client_1.Severity.FAIBLE,
        explanation: "Une structure de titres cohérente améliore la compréhension du document et son accessibilité.",
        cause: "Les niveaux de titres sont sautés sans raison structurelle.",
        howToFind: "Analysez l'ordre h1, h2, h3, etc.",
        fixHint: "Organisez les titres selon la hiérarchie réelle du contenu.",
        beforeCode: `<h1>Profil</h1>
<h4>Expériences</h4>`,
        afterCode: `<h1>Profil</h1>
<h2>Expériences</h2>`,
    },
    {
        code: "HTML-006",
        title: "Formulaire sans gestion explicite de soumission",
        category: client_1.Category.HTML_CSS,
        severity: client_1.Severity.MOYENNE,
        explanation: "Une application interactive doit contrôler la soumission du formulaire lorsque celle-ci est gérée côté client.",
        cause: "Le formulaire laisse le navigateur effectuer son comportement par défaut.",
        howToFind: "Vérifiez les formulaires React sans onSubmit.",
        fixHint: "Utilisez onSubmit et preventDefault lorsque la soumission est gérée côté application.",
        beforeCode: `<form>
  <input name="email" />
</form>`,
        afterCode: `<form
  onSubmit={(event) => {
    event.preventDefault();
    envoyerFormulaire();
  }}
>
  <input name="email" />
</form>`,
    },
    {
        code: "HTML-007",
        title: "Texte de placeholder utilisé comme seule étiquette",
        category: client_1.Category.HTML_CSS,
        severity: client_1.Severity.FAIBLE,
        explanation: "Un placeholder disparaît lorsque l'utilisateur commence à saisir et ne remplace pas correctement un label.",
        cause: "Le champ ne possède pas d'étiquette persistante.",
        howToFind: "Cherchez les champs possédant un placeholder mais aucun label.",
        fixHint: "Ajoutez un label visible ou correctement masqué pour l'accessibilité.",
        beforeCode: `<input placeholder="Votre nom" />`,
        afterCode: `<label htmlFor="nom">
  Nom
</label>

<input
  id="nom"
  placeholder="Votre nom"
/>`,
    },
    {
        code: "HTML-008",
        title: "Lien utilisé pour une action",
        category: client_1.Category.HTML_CSS,
        severity: client_1.Severity.FAIBLE,
        explanation: "Un lien sert à naviguer alors qu'un bouton sert à déclencher une action.",
        cause: "La sémantique HTML ne correspond pas au comportement.",
        howToFind: "Recherchez les a ou liens utilisés uniquement pour exécuter une fonction.",
        fixHint: "Utilisez button pour les actions et a pour la navigation.",
        beforeCode: `<a href="#" onClick={ouvrirMenu}>
  Menu
</a>`,
        afterCode: `<button
  type="button"
  onClick={ouvrirMenu}
>
  Menu
</button>`,
    },
    // ============================================================
    // HTML / CSS — RESPONSIVE / AFFICHAGE
    // ============================================================
    {
        code: "HTML-009",
        title: "Contenu pouvant provoquer un débordement horizontal",
        category: client_1.Category.HTML_CSS,
        severity: client_1.Severity.FAIBLE,
        explanation: "Un contenu non adaptable peut dépasser la largeur de l'écran sur mobile.",
        cause: "Une largeur fixe ou un contenu non cassable est utilisé.",
        howToFind: "Testez la page sur des écrans étroits et recherchez les largeurs fixes excessives.",
        fixHint: "Utilisez des dimensions flexibles et gérez les contenus longs.",
        beforeCode: `.conteneur {
  width: 1200px;
}`,
        afterCode: `.conteneur {
  width: 100%;
  max-width: 1200px;
}`,
    },
    {
        code: "HTML-010",
        title: "Image non responsive",
        category: client_1.Category.HTML_CSS,
        severity: client_1.Severity.FAIBLE,
        explanation: "Une image plus large que son conteneur peut provoquer un débordement.",
        cause: "La largeur de l'image n'est pas limitée par son conteneur.",
        howToFind: "Testez les images sur les petits écrans.",
        fixHint: "Utilisez une largeur maximale de 100% lorsque le contexte le nécessite.",
        beforeCode: `.photo {
  width: 800px;
}`,
        afterCode: `.photo {
  width: 100%;
  max-width: 800px;
}`,
    },
    // ============================================================
    // API / DONNÉES / ROBUSTESSE
    // ============================================================
    {
        code: "API-009",
        title: "Réponse API non normalisée",
        category: client_1.Category.API,
        severity: client_1.Severity.FAIBLE,
        explanation: "Des réponses incohérentes rendent le frontend plus difficile à maintenir.",
        cause: "Chaque endpoint utilise une structure différente pour les mêmes concepts.",
        howToFind: "Comparez les réponses des endpoints similaires.",
        fixHint: "Définissez une convention cohérente pour les données, erreurs et métadonnées.",
        beforeCode: `return res.json({
  data: utilisateur,
});`,
        afterCode: `return res.status(200).json({
  succes: true,
  utilisateur,
});`,
    },
    {
        code: "API-010",
        title: "Absence de validation d'un paramètre d'URL",
        category: client_1.Category.API,
        severity: client_1.Severity.MOYENNE,
        explanation: "Les paramètres d'URL doivent être validés avant leur utilisation.",
        cause: "req.params est transmis directement au service.",
        howToFind: "Recherchez les identifiants provenant directement des paramètres d'URL.",
        fixHint: "Vérifiez le format et la validité du paramètre.",
        beforeCode: `const id = req.params.id;

await supprimer(id);`,
        afterCode: `const id = req.params.id;

if (!id || typeof id !== "string") {
  return res.status(400).json({
    erreur: "Identifiant invalide.",
  });
}

await supprimer(id);`,
    },
    {
        code: "API-011",
        title: "Validation insuffisante d'une pagination",
        category: client_1.Category.API,
        severity: client_1.Severity.MOYENNE,
        explanation: "Une pagination doit empêcher des valeurs négatives ou excessivement grandes.",
        cause: "page et limite sont utilisées sans bornes.",
        howToFind: "Vérifiez les paramètres page, limit ou limite.",
        fixHint: "Définissez une valeur minimale et une limite maximale.",
        beforeCode: `const limite =
  Number(req.query.limite);`,
        afterCode: `const limiteDemandee =
  Number(req.query.limite);

const limite =
  Math.min(
    Math.max(limiteDemandee || 20, 1),
    100
  );`,
    },
    {
        code: "API-012",
        title: "Donnée utilisateur utilisée directement dans une réponse HTML",
        category: client_1.Category.API,
        severity: client_1.Severity.CRITIQUE,
        explanation: "Une donnée utilisateur non contrôlée peut introduire une vulnérabilité lorsqu'elle est injectée dans du HTML.",
        cause: "Le serveur ou le frontend insère directement une valeur non fiable.",
        howToFind: "Recherchez les données utilisateur injectées dans du HTML sans échappement ou contrôle.",
        fixHint: "Utilisez l'échappement fourni par le framework et évitez l'injection HTML non nécessaire.",
        beforeCode: `element.innerHTML =
  utilisateur.nom;`,
        afterCode: `element.textContent =
  utilisateur.nom;`,
    },
    // ============================================================
    // QUALITÉ / MAINTENABILITÉ JAVASCRIPT
    // ============================================================
    {
        code: "JS-029",
        title: "Variable déclarée mais jamais utilisée",
        category: client_1.Category.JAVASCRIPT,
        severity: client_1.Severity.FAIBLE,
        explanation: "Une variable inutilisée augmente le bruit et peut indiquer une logique abandonnée.",
        cause: "Une ancienne variable a été conservée après une modification.",
        howToFind: "Recherchez les déclarations dont la valeur n'est jamais utilisée.",
        fixHint: "Supprimez la variable ou utilisez-la réellement.",
        beforeCode: `const resultat = calculer();

console.log("Terminé");`,
        afterCode: `calculer();

console.log("Terminé");`,
    },
    {
        code: "JS-030",
        title: "Code dupliqué",
        category: client_1.Category.JAVASCRIPT,
        severity: client_1.Severity.FAIBLE,
        explanation: "La duplication augmente le coût de maintenance et le risque d'incohérences.",
        cause: "Une même logique est répétée dans plusieurs endroits.",
        howToFind: "Identifiez les blocs ayant la même responsabilité et le même comportement.",
        fixHint: "Extraire la logique commune dans une fonction ou un module.",
        beforeCode: `const total1 =
  prix1 + prix1 * 0.2;

const total2 =
  prix2 + prix2 * 0.2;`,
        afterCode: `function calculerTTC(prix: number) {
  return prix + prix * 0.2;
}

const total1 = calculerTTC(prix1);
const total2 = calculerTTC(prix2);`,
    },
    {
        code: "JS-031",
        title: "Fonction trop chargée",
        category: client_1.Category.JAVASCRIPT,
        severity: client_1.Severity.FAIBLE,
        explanation: "Une fonction qui gère plusieurs responsabilités devient difficile à tester et maintenir.",
        cause: "Plusieurs responsabilités métier sont regroupées dans la même fonction.",
        howToFind: "Identifiez les fonctions qui valident, transforment, enregistrent et présentent les données en même temps.",
        fixHint: "Séparez les responsabilités en fonctions ou services spécialisés.",
        beforeCode: `function creerUtilisateur(data) {
  // validation
  // transformation
  // sauvegarde
  // email
  // réponse HTTP
}`,
        afterCode: `function creerUtilisateur(data) {
  const donnees =
    validerUtilisateur(data);

  const utilisateur =
    enregistrerUtilisateur(donnees);

  envoyerEmailBienvenue(utilisateur);

  return utilisateur;
}`,
    },
    {
        code: "JS-032",
        title: "Valeur magique répétée",
        category: client_1.Category.JAVASCRIPT,
        severity: client_1.Severity.FAIBLE,
        explanation: "Une valeur métier répétée rend le code plus difficile à comprendre et modifier.",
        cause: "Une constante importante est écrite directement à plusieurs endroits.",
        howToFind: "Cherchez les mêmes nombres ou chaînes représentant une règle métier.",
        fixHint: "Définissez une constante explicite.",
        beforeCode: `if (tentatives >= 3) {
  bloquer();
}

if (tentatives === 3) {
  notifier();
}`,
        afterCode: `const LIMITE_TENTATIVES = 3;

if (tentatives >= LIMITE_TENTATIVES) {
  bloquer();
}

if (tentatives === LIMITE_TENTATIVES) {
  notifier();
}`,
    },
];
//# sourceMappingURL=codeDoctorRules.js.map