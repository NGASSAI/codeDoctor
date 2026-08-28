export declare const CODE_DOCTOR_RULES: readonly [{
    readonly code: "JS-001";
    readonly title: "Utilisation de == au lieu de ===";
    readonly category: "JAVASCRIPT";
    readonly severity: "MOYENNE";
    readonly explanation: "L'opérateur == effectue une conversion implicite des types avant la comparaison.";
    readonly cause: "La comparaison utilise l'égalité faible au lieu de l'égalité stricte.";
    readonly howToFind: "Recherchez les opérateurs == et != dans les conditions.";
    readonly fixHint: "Utilisez === et !== lorsque vous souhaitez comparer la valeur et le type.";
    readonly beforeCode: `if (age == "18") {
  console.log("Majeur");
}`;
    readonly afterCode: `if (age === 18) {
  console.log("Majeur");
}`;
}, {
    readonly code: "JS-002";
    readonly title: "Affectation utilisée dans une condition";
    readonly category: "JAVASCRIPT";
    readonly severity: "CRITIQUE";
    readonly explanation: "L'opérateur = affecte une valeur alors qu'une condition nécessite généralement une comparaison.";
    readonly cause: "Une affectation a été utilisée à la place de === ou d'un autre opérateur de comparaison.";
    readonly howToFind: "Vérifiez les conditions if, while et autres expressions conditionnelles contenant =.";
    readonly fixHint: "Utilisez l'opérateur de comparaison approprié.";
    readonly beforeCode: `if (age = 18) {
  console.log("Majeur");
}`;
    readonly afterCode: `if (age === 18) {
  console.log("Majeur");
}`;
}, {
    readonly code: "JS-003";
    readonly title: "Variable utilisée avant sa déclaration";
    readonly category: "JAVASCRIPT";
    readonly severity: "CRITIQUE";
    readonly explanation: "Une variable déclarée avec let ou const ne peut pas être utilisée avant son initialisation.";
    readonly cause: "Le code accède à une variable située dans sa zone temporelle morte.";
    readonly howToFind: "Cherchez les utilisations de variables placées avant leur déclaration.";
    readonly fixHint: "Déclarez et initialisez la variable avant sa première utilisation.";
    readonly beforeCode: `console.log(nom);

const nom = "CodeDoctor";`;
    readonly afterCode: `const nom = "CodeDoctor";

console.log(nom);`;
}, {
    readonly code: "JS-004";
    readonly title: "Variable potentiellement non définie";
    readonly category: "JAVASCRIPT";
    readonly severity: "CRITIQUE";
    readonly explanation: "Une variable qui n'existe pas dans la portée courante provoquera une erreur au moment de son utilisation.";
    readonly cause: "Le nom de la variable est incorrect, oublié ou hors de portée.";
    readonly howToFind: "Vérifiez l'orthographe et la portée de chaque variable utilisée.";
    readonly fixHint: "Déclarez la variable ou utilisez le nom réellement déclaré.";
    readonly beforeCode: `const utilisateur = "Alice";

console.log(utilisateurNom);`;
    readonly afterCode: `const utilisateur = "Alice";

console.log(utilisateur);`;
}, {
    readonly code: "JS-005";
    readonly title: "Redéclaration incorrecte d'une variable let ou const";
    readonly category: "JAVASCRIPT";
    readonly severity: "CRITIQUE";
    readonly explanation: "Une variable déclarée avec let ou const ne peut pas être déclarée une seconde fois dans la même portée.";
    readonly cause: "Le même identifiant est déclaré plusieurs fois dans la même portée.";
    readonly howToFind: "Recherchez plusieurs déclarations let ou const portant le même nom.";
    readonly fixHint: "Supprimez la déclaration inutile ou choisissez un autre identifiant.";
    readonly beforeCode: `const nom = "Alice";
const nom = "Bob";`;
    readonly afterCode: `let nom = "Alice";
nom = "Bob";`;
}, {
    readonly code: "JS-006";
    readonly title: "Utilisation inutile de var";
    readonly category: "JAVASCRIPT";
    readonly severity: "FAIBLE";
    readonly explanation: "var possède des règles de portée différentes de let et const et peut rendre le comportement du code moins prévisible.";
    readonly cause: "Le code utilise une ancienne déclaration de variable alors qu'une déclaration moderne est possible.";
    readonly howToFind: "Recherchez les déclarations utilisant var.";
    readonly fixHint: "Préférez const lorsque la variable n'est pas réassignée et let lorsqu'elle doit l'être.";
    readonly beforeCode: `var nom = "Alice";`;
    readonly afterCode: `const nom = "Alice";`;
}, {
    readonly code: "JS-007";
    readonly title: "Constante réassignée";
    readonly category: "JAVASCRIPT";
    readonly severity: "CRITIQUE";
    readonly explanation: "Une variable déclarée avec const ne peut pas recevoir une nouvelle valeur.";
    readonly cause: "Le code tente de réassigner une constante.";
    readonly howToFind: "Cherchez une affectation ultérieure sur une variable déclarée avec const.";
    readonly fixHint: "Utilisez let si la variable doit être réassignée.";
    readonly beforeCode: `const compteur = 0;

compteur = compteur + 1;`;
    readonly afterCode: `let compteur = 0;

compteur = compteur + 1;`;
}, {
    readonly code: "JS-008";
    readonly title: "Accès à une propriété d'une valeur potentiellement null";
    readonly category: "JAVASCRIPT";
    readonly severity: "CRITIQUE";
    readonly explanation: "Accéder directement à une propriété d'une valeur null ou undefined provoque une erreur d'exécution.";
    readonly cause: "Le code suppose que l'objet existe toujours.";
    readonly howToFind: "Identifiez les accès aux propriétés de données provenant d'une source incertaine.";
    readonly fixHint: "Validez la valeur ou utilisez l'accès optionnel lorsque cela est approprié.";
    readonly beforeCode: `const nom = utilisateur.nom;`;
    readonly afterCode: `const nom = utilisateur?.nom;`;
}, {
    readonly code: "JS-009";
    readonly title: "Confusion entre null et undefined";
    readonly category: "JAVASCRIPT";
    readonly severity: "FAIBLE";
    readonly explanation: "null et undefined représentent des situations différentes et doivent être utilisés de manière cohérente.";
    readonly cause: "Le code mélange les conventions de représentation d'une valeur absente.";
    readonly howToFind: "Vérifiez les tests et affectations utilisant null et undefined.";
    readonly fixHint: "Choisissez une convention cohérente selon le contrat de votre fonction ou API.";
    readonly beforeCode: `if (utilisateur === null) {
  return;
}

const utilisateurCourant =
  chercherUtilisateur();`;
    readonly afterCode: `const utilisateurCourant =
  chercherUtilisateur();

if (utilisateurCourant == null) {
  return;
}`;
}, {
    readonly code: "JS-010";
    readonly title: "Utilisation dangereuse d'une propriété sans vérification";
    readonly category: "JAVASCRIPT";
    readonly severity: "MOYENNE";
    readonly explanation: "Une donnée externe peut ne pas avoir la structure attendue.";
    readonly cause: "Le code fait confiance à une structure qui n'est pas garantie.";
    readonly howToFind: "Analysez les données provenant d'une API, d'un formulaire ou du stockage navigateur.";
    readonly fixHint: "Validez la structure avant d'utiliser les propriétés.";
    readonly beforeCode: `const nom = reponse.data.user.name;`;
    readonly afterCode: `const nom = reponse?.data?.user?.name;`;
}, {
    readonly code: "JS-011";
    readonly title: "Fonction déclarée mais jamais appelée";
    readonly category: "JAVASCRIPT";
    readonly severity: "FAIBLE";
    readonly explanation: "Une fonction déclarée ne s'exécute pas automatiquement.";
    readonly cause: "Le code définit la fonction mais ne l'invoque jamais.";
    readonly howToFind: "Vérifiez les fonctions qui ne possèdent aucun appel.";
    readonly fixHint: "Appelez la fonction au moment où son comportement est nécessaire.";
    readonly beforeCode: `function afficherMessage() {
  console.log("Bonjour");
}`;
    readonly afterCode: `function afficherMessage() {
  console.log("Bonjour");
}

afficherMessage();`;
}, {
    readonly code: "JS-012";
    readonly title: "Code placé après un return";
    readonly category: "JAVASCRIPT";
    readonly severity: "MOYENNE";
    readonly explanation: "Une fonction quitte son exécution dès qu'elle rencontre return.";
    readonly cause: "Une instruction a été placée après un retour définitif.";
    readonly howToFind: "Recherchez les instructions situées après return dans le même bloc.";
    readonly fixHint: "Déplacez le code avant return ou supprimez-le s'il est inutile.";
    readonly beforeCode: `function calculer() {
  return 10;

  console.log("Impossible");
}`;
    readonly afterCode: `function calculer() {
  console.log("Calcul effectué");

  return 10;
}`;
}, {
    readonly code: "JS-013";
    readonly title: "Paramètre manquant lors d'un appel de fonction";
    readonly category: "JAVASCRIPT";
    readonly severity: "MOYENNE";
    readonly explanation: "Une fonction peut recevoir undefined lorsqu'un argument obligatoire n'est pas fourni.";
    readonly cause: "L'appelant ne respecte pas le contrat attendu par la fonction.";
    readonly howToFind: "Comparez la signature de la fonction avec chacun de ses appels.";
    readonly fixHint: "Fournissez l'argument requis ou définissez une valeur par défaut.";
    readonly beforeCode: `function saluer(nom) {
  console.log(nom.toUpperCase());
}

saluer();`;
    readonly afterCode: `function saluer(nom = "Utilisateur") {
  console.log(nom.toUpperCase());
}

saluer();`;
}, {
    readonly code: "JS-014";
    readonly title: "Mutation directe d'un tableau";
    readonly category: "JAVASCRIPT";
    readonly severity: "MOYENNE";
    readonly explanation: "La mutation directe peut provoquer des effets de bord lorsque le tableau est partagé.";
    readonly cause: "Une méthode mutante modifie directement la référence originale.";
    readonly howToFind: "Recherchez push, pop, splice, shift et unshift dans les données partagées.";
    readonly fixHint: "Créez une nouvelle collection lorsque l'immutabilité est requise.";
    readonly beforeCode: `const utilisateurs = ["Alice"];

utilisateurs.push("Bob");`;
    readonly afterCode: `const utilisateurs = ["Alice"];

const nouveauxUtilisateurs = [
  ...utilisateurs,
  "Bob",
];`;
}, {
    readonly code: "JS-015";
    readonly title: "Mutation directe d'un objet";
    readonly category: "JAVASCRIPT";
    readonly severity: "MOYENNE";
    readonly explanation: "Modifier directement un objet partagé peut créer des effets de bord.";
    readonly cause: "La référence existante est modifiée au lieu de créer une nouvelle valeur.";
    readonly howToFind: "Recherchez les affectations directes de propriétés sur des objets partagés.";
    readonly fixHint: "Utilisez une copie avec l'opérateur spread lorsque l'immutabilité est nécessaire.";
    readonly beforeCode: `utilisateur.nom = "Alice";`;
    readonly afterCode: `const utilisateurMisAJour = {
  ...utilisateur,
  nom: "Alice",
};`;
}, {
    readonly code: "JS-016";
    readonly title: "Mauvaise utilisation de forEach pour produire une valeur";
    readonly category: "JAVASCRIPT";
    readonly severity: "FAIBLE";
    readonly explanation: "forEach est destiné à parcourir une collection et ne retourne pas le tableau transformé.";
    readonly cause: "Le développeur attend une valeur de retour de forEach.";
    readonly howToFind: "Vérifiez les affectations utilisant le résultat d'un forEach.";
    readonly fixHint: "Utilisez map pour transformer une collection.";
    readonly beforeCode: `const noms = utilisateurs.forEach(
  (utilisateur) => utilisateur.nom
);`;
    readonly afterCode: `const noms = utilisateurs.map(
  (utilisateur) => utilisateur.nom
);`;
}, {
    readonly code: "JS-017";
    readonly title: "Utilisation incorrecte de map pour un simple effet de bord";
    readonly category: "JAVASCRIPT";
    readonly severity: "FAIBLE";
    readonly explanation: "map doit normalement servir à produire une nouvelle collection.";
    readonly cause: "map est utilisé uniquement pour exécuter une action.";
    readonly howToFind: "Recherchez les map dont le résultat n'est jamais utilisé.";
    readonly fixHint: "Utilisez forEach lorsqu'aucune nouvelle collection n'est nécessaire.";
    readonly beforeCode: `utilisateurs.map((utilisateur) => {
  console.log(utilisateur.nom);
});`;
    readonly afterCode: `utilisateurs.forEach((utilisateur) => {
  console.log(utilisateur.nom);
});`;
}, {
    readonly code: "JS-018";
    readonly title: "Index de tableau utilisé sans vérifier son existence";
    readonly category: "JAVASCRIPT";
    readonly severity: "MOYENNE";
    readonly explanation: "Un index peut pointer vers undefined lorsque la position n'existe pas.";
    readonly cause: "Le code suppose que l'élément est toujours présent.";
    readonly howToFind: "Identifiez les accès directs à des positions de tableau provenant d'une source variable.";
    readonly fixHint: "Vérifiez l'élément avant de l'utiliser.";
    readonly beforeCode: `const utilisateur = utilisateurs[index];

console.log(utilisateur.nom);`;
    readonly afterCode: `const utilisateur = utilisateurs[index];

if (!utilisateur) {
  return;
}

console.log(utilisateur.nom);`;
}, {
    readonly code: "JS-019";
    readonly title: "Promise non attendue avec await";
    readonly category: "JAVASCRIPT";
    readonly severity: "CRITIQUE";
    readonly explanation: "Une Promise non attendue peut entraîner l'utilisation prématurée de données encore indisponibles.";
    readonly cause: "La fonction asynchrone est appelée sans await ou sans traitement de sa Promise.";
    readonly howToFind: "Recherchez les appels de fonctions async dont le résultat est utilisé directement.";
    readonly fixHint: "Utilisez await dans une fonction async ou .then() lorsque cela correspond au besoin.";
    readonly beforeCode: `const utilisateurs = obtenirUtilisateurs();

console.log(utilisateurs.length);`;
    readonly afterCode: `const utilisateurs =
  await obtenirUtilisateurs();

console.log(utilisateurs.length);`;
}, {
    readonly code: "JS-020";
    readonly title: "Erreur Promise non gérée";
    readonly category: "JAVASCRIPT";
    readonly severity: "CRITIQUE";
    readonly explanation: "Une Promise rejetée doit être correctement traitée.";
    readonly cause: "Le code lance une opération asynchrone sans gestion de son rejet.";
    readonly howToFind: "Recherchez les appels async sans await, catch ou gestion équivalente.";
    readonly fixHint: "Ajoutez try/catch ou catch selon le contexte.";
    readonly beforeCode: `obtenirUtilisateurs();`;
    readonly afterCode: `try {
  await obtenirUtilisateurs();
} catch (error) {
  console.error(error);
}`;
}, {
    readonly code: "JS-021";
    readonly title: "Utilisation incorrecte de try/catch";
    readonly category: "JAVASCRIPT";
    readonly severity: "MOYENNE";
    readonly explanation: "Un try/catch doit entourer l'opération susceptible de générer l'erreur.";
    readonly cause: "L'opération dangereuse est exécutée en dehors du bloc try.";
    readonly howToFind: "Vérifiez que les opérations async ou susceptibles d'échouer sont réellement dans try.";
    readonly fixHint: "Placez l'opération concernée dans le bloc try.";
    readonly beforeCode: `const resultat = await charger();

try {
  console.log(resultat);
} catch (error) {
  console.error(error);
}`;
    readonly afterCode: `try {
  const resultat = await charger();
  console.log(resultat);
} catch (error) {
  console.error(error);
}`;
}, {
    readonly code: "JS-022";
    readonly title: "Oubli du mot-clé await dans une fonction async";
    readonly category: "JAVASCRIPT";
    readonly severity: "MOYENNE";
    readonly explanation: "Sans await, une fonction async retourne une Promise au lieu de la valeur finale.";
    readonly cause: "Le développeur traite une Promise comme si elle contenait immédiatement le résultat.";
    readonly howToFind: "Identifiez les appels async dont la valeur est utilisée directement.";
    readonly fixHint: "Ajoutez await si le résultat doit être obtenu avant de poursuivre.";
    readonly beforeCode: `async function charger() {
  const utilisateur = obtenirUtilisateur();

  return utilisateur.nom;
}`;
    readonly afterCode: `async function charger() {
  const utilisateur =
    await obtenirUtilisateur();

  return utilisateur.nom;
}`;
}, {
    readonly code: "JS-023";
    readonly title: "Exécution séquentielle inutile de tâches indépendantes";
    readonly category: "JAVASCRIPT";
    readonly severity: "FAIBLE";
    readonly explanation: "Des opérations indépendantes peuvent parfois être exécutées en parallèle.";
    readonly cause: "Chaque Promise attend la précédente alors qu'elles ne dépendent pas les unes des autres.";
    readonly howToFind: "Recherchez plusieurs await indépendants exécutés l'un après l'autre.";
    readonly fixHint: "Utilisez Promise.all lorsque les opérations peuvent réellement être parallélisées.";
    readonly beforeCode: `const utilisateurs =
  await chargerUtilisateurs();

const experiences =
  await chargerExperiences();`;
    readonly afterCode: `const [
  utilisateurs,
  experiences,
] = await Promise.all([
  chargerUtilisateurs(),
  chargerExperiences(),
]);`;
}, {
    readonly code: "JS-024";
    readonly title: "Fonction async appelée sans gestion d'erreur";
    readonly category: "JAVASCRIPT";
    readonly severity: "MOYENNE";
    readonly explanation: "Une fonction async peut rejeter sa Promise et doit être traitée par son appelant lorsque cela est nécessaire.";
    readonly cause: "Le rejet de la Promise est ignoré.";
    readonly howToFind: "Identifiez les appels async dans des contextes où une erreur doit être affichée ou journalisée.";
    readonly fixHint: "Ajoutez await dans try/catch ou .catch().";
    readonly beforeCode: `chargerProfil();`;
    readonly afterCode: `try {
  await chargerProfil();
} catch (error) {
  afficherErreur(error);
}`;
}, {
    readonly code: "JS-025";
    readonly title: "Condition toujours vraie";
    readonly category: "JAVASCRIPT";
    readonly severity: "CRITIQUE";
    readonly explanation: "Une condition constante peut empêcher certaines branches du programme de fonctionner.";
    readonly cause: "La condition contient une valeur constante ou une expression incorrecte.";
    readonly howToFind: "Analysez les valeurs et expressions utilisées dans if et while.";
    readonly fixHint: "Corrigez la condition afin qu'elle dépende réellement de la donnée attendue.";
    readonly beforeCode: `if (true) {
  afficherUtilisateur();
} else {
  afficherErreur();
}`;
    readonly afterCode: `if (utilisateurConnecte) {
  afficherUtilisateur();
} else {
  afficherErreur();
}`;
}, {
    readonly code: "JS-026";
    readonly title: "Boucle potentiellement infinie";
    readonly category: "JAVASCRIPT";
    readonly severity: "CRITIQUE";
    readonly explanation: "Une boucle qui ne modifie jamais sa condition de sortie peut ne jamais se terminer.";
    readonly cause: "La variable contrôlant la boucle n'est pas correctement mise à jour.";
    readonly howToFind: "Vérifiez la condition et la progression de la variable de boucle.";
    readonly fixHint: "Assurez-vous que chaque itération rapproche la boucle de sa condition d'arrêt.";
    readonly beforeCode: `let i = 0;

while (i < 10) {
  console.log(i);
}`;
    readonly afterCode: `let i = 0;

while (i < 10) {
  console.log(i);
  i++;
}`;
}, {
    readonly code: "JS-027";
    readonly title: "return prématuré dans une boucle";
    readonly category: "JAVASCRIPT";
    readonly severity: "MOYENNE";
    readonly explanation: "return quitte toute la fonction et pas seulement l'itération courante.";
    readonly cause: "return a été utilisé alors que continue ou une autre logique était nécessaire.";
    readonly howToFind: "Examinez les return placés à l'intérieur des boucles.";
    readonly fixHint: "Utilisez continue lorsque vous souhaitez seulement passer à l'itération suivante.";
    readonly beforeCode: `for (const utilisateur of utilisateurs) {
  if (!utilisateur.actif) {
    return;
  }

  envoyerEmail(utilisateur);
}`;
    readonly afterCode: `for (const utilisateur of utilisateurs) {
  if (!utilisateur.actif) {
    continue;
  }

  envoyerEmail(utilisateur);
}`;
}, {
    readonly code: "JS-028";
    readonly title: "Opérateur logique utilisé incorrectement";
    readonly category: "JAVASCRIPT";
    readonly severity: "MOYENNE";
    readonly explanation: "Une mauvaise combinaison de && et || peut produire une condition différente de celle attendue.";
    readonly cause: "La logique booléenne n'a pas été correctement structurée.";
    readonly howToFind: "Décomposez chaque partie de la condition et vérifiez sa table logique.";
    readonly fixHint: "Utilisez des parenthèses pour rendre explicitement la priorité logique.";
    readonly beforeCode: `if (admin || utilisateurActif && premium) {
  afficher();
}`;
    readonly afterCode: `if (
  admin ||
  (utilisateurActif && premium)
) {
  afficher();
}`;
}, {
    readonly code: "TS-001";
    readonly title: "Utilisation excessive de any";
    readonly category: "TYPESCRIPT";
    readonly severity: "MOYENNE";
    readonly explanation: "any désactive une grande partie de la vérification statique de TypeScript.";
    readonly cause: "Le développeur contourne le système de typage.";
    readonly howToFind: "Recherchez les paramètres, variables et retours explicitement typés avec any.";
    readonly fixHint: "Utilisez un type précis ou unknown lorsque le type est réellement inconnu.";
    readonly beforeCode: `function afficher(data: any) {
  console.log(data.nom);
}`;
    readonly afterCode: `interface Utilisateur {
  nom: string;
}

function afficher(data: Utilisateur) {
  console.log(data.nom);
}`;
}, {
    readonly code: "TS-002";
    readonly title: "Paramètre de fonction non typé";
    readonly category: "TYPESCRIPT";
    readonly severity: "MOYENNE";
    readonly explanation: "Un paramètre non typé réduit la sécurité et la lisibilité du code TypeScript.";
    readonly cause: "Le type attendu n'est pas explicitement défini.";
    readonly howToFind: "Recherchez les paramètres sans annotation de type.";
    readonly fixHint: "Ajoutez le type correspondant.";
    readonly beforeCode: `function additionner(a, b) {
  return a + b;
}`;
    readonly afterCode: `function additionner(
  a: number,
  b: number
): number {
  return a + b;
}`;
}, {
    readonly code: "TS-003";
    readonly title: "Retour de fonction non typé";
    readonly category: "TYPESCRIPT";
    readonly severity: "FAIBLE";
    readonly explanation: "Le type de retour explicite peut documenter le contrat d'une fonction importante.";
    readonly cause: "Le contrat de sortie est laissé entièrement à l'inférence.";
    readonly howToFind: "Identifiez les fonctions publiques ou métier dont le retour mérite d'être documenté.";
    readonly fixHint: "Ajoutez une annotation de retour lorsque cela améliore le contrat.";
    readonly beforeCode: `function calculerTotal(prix: number) {
  return prix * 1.2;
}`;
    readonly afterCode: `function calculerTotal(
  prix: number
): number {
  return prix * 1.2;
}`;
}, {
    readonly code: "TS-004";
    readonly title: "Interface préférable pour une structure réutilisée";
    readonly category: "TYPESCRIPT";
    readonly severity: "FAIBLE";
    readonly explanation: "Une interface améliore la réutilisation et la lisibilité d'une structure d'objet.";
    readonly cause: "Une même structure est répétée directement dans plusieurs signatures.";
    readonly howToFind: "Recherchez des objets possédant plusieurs fois les mêmes propriétés.";
    readonly fixHint: "Créez une interface réutilisable.";
    readonly beforeCode: `function afficher(
  utilisateur: {
    nom: string;
    age: number;
  }
) {
  console.log(utilisateur.nom);
}`;
    readonly afterCode: `interface Utilisateur {
  nom: string;
  age: number;
}

function afficher(
  utilisateur: Utilisateur
) {
  console.log(utilisateur.nom);
}`;
}, {
    readonly code: "TS-005";
    readonly title: "unknown préférable à any pour une donnée inconnue";
    readonly category: "TYPESCRIPT";
    readonly severity: "MOYENNE";
    readonly explanation: "unknown oblige à vérifier une valeur avant de l'utiliser.";
    readonly cause: "any est utilisé pour contourner une donnée dont le type n'est pas encore connu.";
    readonly howToFind: "Cherchez les données externes déclarées en any.";
    readonly fixHint: "Utilisez unknown puis effectuez les vérifications nécessaires.";
    readonly beforeCode: `function traiter(data: any) {
  console.log(data.nom);
}`;
    readonly afterCode: `function traiter(data: unknown) {
  if (
    typeof data === "object" &&
    data !== null &&
    "nom" in data
  ) {
    console.log(data.nom);
  }
}`;
}, {
    readonly code: "TS-006";
    readonly title: "Non-null assertion utilisée sans garantie";
    readonly category: "TYPESCRIPT";
    readonly severity: "CRITIQUE";
    readonly explanation: "L'opérateur ! indique à TypeScript qu'une valeur existe alors que cette garantie peut être fausse à l'exécution.";
    readonly cause: "Le développeur force le compilateur à ignorer une possibilité de null ou undefined.";
    readonly howToFind: "Recherchez les opérateurs ! placés après des valeurs potentiellement absentes.";
    readonly fixHint: "Vérifiez réellement la valeur avant de l'utiliser.";
    readonly beforeCode: `const element =
  document.getElementById("app")!;

element.innerHTML = "Bonjour";`;
    readonly afterCode: `const element =
  document.getElementById("app");

if (!element) {
  throw new Error("Élément introuvable.");
}

element.innerHTML = "Bonjour";`;
}, {
    readonly code: "TS-007";
    readonly title: "Type union non vérifié";
    readonly category: "TYPESCRIPT";
    readonly severity: "MOYENNE";
    readonly explanation: "Une valeur possédant plusieurs types possibles doit être correctement discriminée avant utilisation.";
    readonly cause: "Le code utilise directement une valeur union sans narrowing.";
    readonly howToFind: "Cherchez les opérations incompatibles avec tous les membres de l'union.";
    readonly fixHint: "Utilisez typeof, in, instanceof ou un discriminant adapté.";
    readonly beforeCode: `function afficher(
  valeur: string | number
) {
  return valeur.toUpperCase();
}`;
    readonly afterCode: `function afficher(
  valeur: string | number
) {
  if (typeof valeur === "string") {
    return valeur.toUpperCase();
  }

  return valeur.toString();
}`;
}, {
    readonly code: "TS-008";
    readonly title: "Enum ou union non respecté";
    readonly category: "TYPESCRIPT";
    readonly severity: "MOYENNE";
    readonly explanation: "Les valeurs métier doivent respecter les types définis par le domaine.";
    readonly cause: "Une valeur arbitraire est utilisée à la place d'une valeur autorisée.";
    readonly howToFind: "Comparez les valeurs reçues avec le type ou l'union autorisée.";
    readonly fixHint: "Validez et limitez les valeurs aux membres prévus.";
    readonly beforeCode: `type Statut =
  "ACTIVE" | "INACTIVE";

const statut: Statut = "SUPPRIME";`;
    readonly afterCode: `type Statut =
  "ACTIVE" | "INACTIVE";

const statut: Statut = "ACTIVE";`;
}, {
    readonly code: "REACT-001";
    readonly title: "Mutation directe du state";
    readonly category: "REACT";
    readonly severity: "CRITIQUE";
    readonly explanation: "Les props et le state React doivent être traités comme des valeurs immuables.";
    readonly cause: "Le state est modifié directement au lieu d'utiliser son setter.";
    readonly howToFind: "Recherchez les affectations directes sur une variable provenant de useState.";
    readonly fixHint: "Utilisez toujours le setter fourni par useState.";
    readonly beforeCode: `const [count, setCount] = useState(0);

count = count + 1;`;
    readonly afterCode: `const [count, setCount] = useState(0);

setCount(count + 1);`;
}, {
    readonly code: "REACT-002";
    readonly title: "Mutation directe d'un tableau dans le state";
    readonly category: "REACT";
    readonly severity: "CRITIQUE";
    readonly explanation: "Modifier directement un tableau contenu dans le state peut empêcher React de détecter correctement le changement.";
    readonly cause: "Une méthode mutante modifie la référence existante.";
    readonly howToFind: "Recherchez push, pop, splice, shift ou unshift sur une valeur du state.";
    readonly fixHint: "Créez un nouveau tableau puis utilisez le setter.";
    readonly beforeCode: `const [items, setItems] =
  useState<string[]>([]);

items.push("React");`;
    readonly afterCode: `const [items, setItems] =
  useState<string[]>([]);

setItems((anciens) => [
  ...anciens,
  "React",
]);`;
}, {
    readonly code: "REACT-003";
    readonly title: "Mutation directe d'un objet dans le state";
    readonly category: "REACT";
    readonly severity: "CRITIQUE";
    readonly explanation: "Les objets contenus dans le state doivent être remplacés plutôt que modifiés directement.";
    readonly cause: "La référence de l'objet existant est conservée.";
    readonly howToFind: "Recherchez les affectations de propriétés sur les objets stockés dans le state.";
    readonly fixHint: "Créez une nouvelle copie avec le spread operator.";
    readonly beforeCode: `utilisateur.nom = "Alice";`;
    readonly afterCode: `setUtilisateur((ancien) => ({
  ...ancien,
  nom: "Alice",
}));`;
}, {
    readonly code: "REACT-004";
    readonly title: "useEffect utilisé pour une valeur dérivée";
    readonly category: "REACT";
    readonly severity: "MOYENNE";
    readonly explanation: "Une valeur calculable directement depuis les props ou le state ne nécessite généralement pas d'effet.";
    readonly cause: "useEffect est utilisé comme mécanisme de calcul au lieu de synchroniser un système externe.";
    readonly howToFind: "Cherchez les effets qui font uniquement setState à partir d'autres états.";
    readonly fixHint: "Calculez directement la valeur pendant le rendu lorsque c'est possible.";
    readonly beforeCode: `const [nom, setNom] = useState("");

const [majuscule, setMajuscule] =
  useState("");

useEffect(() => {
  setMajuscule(nom.toUpperCase());
}, [nom]);`;
    readonly afterCode: `const [nom, setNom] = useState("");

const majuscule = nom.toUpperCase();`;
}, {
    readonly code: "REACT-005";
    readonly title: "Hook utilisé conditionnellement";
    readonly category: "REACT";
    readonly severity: "CRITIQUE";
    readonly explanation: "Les Hooks React doivent être appelés dans le même ordre à chaque rendu.";
    readonly cause: "Un Hook est placé dans une condition, une boucle ou après un retour conditionnel.";
    readonly howToFind: "Recherchez useState, useEffect ou d'autres Hooks dans des if, boucles ou fonctions imbriquées.";
    readonly fixHint: "Appelez toujours les Hooks au niveau supérieur du composant.";
    readonly beforeCode: `if (connecte) {
  useEffect(() => {
    chargerProfil();
  }, []);
}`;
    readonly afterCode: `useEffect(() => {
  if (connecte) {
    chargerProfil();
  }
}, [connecte]);`;
}, {
    readonly code: "REACT-006";
    readonly title: "Hook placé après un return conditionnel";
    readonly category: "REACT";
    readonly severity: "CRITIQUE";
    readonly explanation: "Un rendu conditionnel avant un Hook peut modifier l'ordre des Hooks entre deux rendus.";
    readonly cause: "Le composant retourne avant d'appeler certains Hooks.";
    readonly howToFind: "Vérifiez les return placés avant les Hooks.";
    readonly fixHint: "Placez tous les Hooks avant les retours conditionnels.";
    readonly beforeCode: `if (!utilisateur) {
  return null;
}

const [nom, setNom] =
  useState("");`;
    readonly afterCode: `const [nom, setNom] =
  useState("");

if (!utilisateur) {
  return null;
}`;
}, {
    readonly code: "REACT-007";
    readonly title: "Absence de key stable dans une liste";
    readonly category: "REACT";
    readonly severity: "MOYENNE";
    readonly explanation: "React utilise key pour identifier les éléments d'une liste entre les rendus.";
    readonly cause: "Les éléments retournés par map ne possèdent pas de clé stable.";
    readonly howToFind: "Recherchez les map qui retournent des éléments JSX sans key.";
    readonly fixHint: "Utilisez un identifiant stable et unique provenant de la donnée.";
    readonly beforeCode: `utilisateurs.map((utilisateur) => (
  <div>
    {utilisateur.nom}
  </div>
))`;
    readonly afterCode: `utilisateurs.map((utilisateur) => (
  <div key={utilisateur.id}>
    {utilisateur.nom}
  </div>
))`;
}, {
    readonly code: "REACT-008";
    readonly title: "Index utilisé comme key pour une liste dynamique";
    readonly category: "REACT";
    readonly severity: "MOYENNE";
    readonly explanation: "L'index peut devenir instable lorsque des éléments sont ajoutés, supprimés ou réordonnés.";
    readonly cause: "L'index ne représente pas nécessairement l'identité de l'élément.";
    readonly howToFind: "Recherchez key={index} dans les listes modifiables.";
    readonly fixHint: "Utilisez l'identifiant stable de l'élément.";
    readonly beforeCode: `items.map((item, index) => (
  <Item key={index} item={item} />
))`;
    readonly afterCode: `items.map((item) => (
  <Item key={item.id} item={item} />
))`;
}, {
    readonly code: "REACT-009";
    readonly title: "Effet avec dépendance manquante";
    readonly category: "REACT";
    readonly severity: "CRITIQUE";
    readonly explanation: "Un effet utilisant une valeur réactive doit généralement déclarer cette valeur dans ses dépendances.";
    readonly cause: "La liste de dépendances ne reflète pas les valeurs utilisées par l'effet.";
    readonly howToFind: "Analysez les variables provenant des props, du state ou du scope du composant utilisées dans l'effet.";
    readonly fixHint: "Ajoutez les dépendances nécessaires ou restructurez l'effet.";
    readonly beforeCode: `useEffect(() => {
  chargerUtilisateur(userId);
}, []);`;
    readonly afterCode: `useEffect(() => {
  chargerUtilisateur(userId);
}, [userId]);`;
}, {
    readonly code: "REACT-010";
    readonly title: "Effet provoquant potentiellement une boucle de rendu";
    readonly category: "REACT";
    readonly severity: "CRITIQUE";
    readonly explanation: "Un effet qui modifie une valeur dont il dépend peut provoquer des rendus répétés.";
    readonly cause: "Le state modifié par l'effet déclenche à nouveau l'effet.";
    readonly howToFind: "Vérifiez les setState exécutés dans les effets et leurs dépendances.";
    readonly fixHint: "Supprimez l'effet inutile ou corrigez les dépendances et la logique.";
    readonly beforeCode: `useEffect(() => {
  setCount(count + 1);
}, [count]);`;
    readonly afterCode: `useEffect(() => {
  setCount(1);
}, []);`;
}, {
    readonly code: "REACT-011";
    readonly title: "Effet sans nettoyage pour une ressource externe";
    readonly category: "REACT";
    readonly severity: "MOYENNE";
    readonly explanation: "Les abonnements, timers et listeners doivent être nettoyés lorsque le composant est démonté.";
    readonly cause: "Le composant crée une ressource qui continue de vivre après son démontage.";
    readonly howToFind: "Recherchez addEventListener, setInterval, subscriptions ou WebSocket sans cleanup.";
    readonly fixHint: "Retournez une fonction de nettoyage depuis useEffect.";
    readonly beforeCode: `useEffect(() => {
  window.addEventListener(
    "resize",
    actualiser
  );
}, []);`;
    readonly afterCode: `useEffect(() => {
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
}, []);`;
}, {
    readonly code: "REACT-012";
    readonly title: "setState utilisé avec une ancienne valeur dans plusieurs mises à jour";
    readonly category: "REACT";
    readonly severity: "MOYENNE";
    readonly explanation: "Lorsque la nouvelle valeur dépend de l'ancienne, la forme fonctionnelle du setter est plus sûre.";
    readonly cause: "Le code utilise une fermeture pouvant contenir une ancienne valeur.";
    readonly howToFind: "Recherchez plusieurs mises à jour ou des mises à jour dépendant du state précédent.";
    readonly fixHint: "Utilisez setState(previous => next).";
    readonly beforeCode: `setCount(count + 1);
setCount(count + 1);`;
    readonly afterCode: `setCount((ancien) => ancien + 1);
setCount((ancien) => ancien + 1);`;
}, {
    readonly code: "REACT-013";
    readonly title: "Effet utilisé pour répondre directement à une action utilisateur";
    readonly category: "REACT";
    readonly severity: "FAIBLE";
    readonly explanation: "Une action provoquée directement par un clic ou une soumission doit généralement être traitée dans son gestionnaire.";
    readonly cause: "Un useEffect est utilisé comme intermédiaire alors que l'événement est déjà disponible.";
    readonly howToFind: "Cherchez des effets déclenchés uniquement par un état représentant un événement ponctuel.";
    readonly fixHint: "Déplacez la logique dans le gestionnaire de l'événement lorsque cela est approprié.";
    readonly beforeCode: `useEffect(() => {
  if (envoye) {
    afficherMessage();
  }
}, [envoye]);`;
    readonly afterCode: `function soumettre() {
  envoyerFormulaire();
  afficherMessage();
}`;
}, {
    readonly code: "HTTP-001";
    readonly title: "Mauvaise méthode HTTP pour l'opération";
    readonly category: "HTTP";
    readonly severity: "MOYENNE";
    readonly explanation: "La méthode HTTP doit correspondre à l'intention de l'opération.";
    readonly cause: "Une méthode de lecture, création, modification ou suppression est utilisée incorrectement.";
    readonly howToFind: "Comparez l'action métier avec la méthode HTTP utilisée.";
    readonly fixHint: "GET pour récupérer, POST pour créer, PUT/PATCH pour modifier et DELETE pour supprimer.";
    readonly beforeCode: `fetch("/api/utilisateurs", {
  method: "GET",
  body: JSON.stringify(utilisateur),
});`;
    readonly afterCode: `fetch("/api/utilisateurs", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(utilisateur),
});`;
}, {
    readonly code: "HTTP-002";
    readonly title: "Absence de vérification de response.ok";
    readonly category: "HTTP";
    readonly severity: "MOYENNE";
    readonly explanation: "fetch ne rejette pas automatiquement sa Promise pour les réponses HTTP 4xx ou 5xx.";
    readonly cause: "Le code suppose qu'une Promise résolue signifie que la requête HTTP a réussi.";
    readonly howToFind: "Recherchez fetch suivi directement de response.json sans vérification du statut.";
    readonly fixHint: "Vérifiez response.ok ou response.status avant de traiter les données.";
    readonly beforeCode: `const response = await fetch("/api/users");

const data = await response.json();`;
    readonly afterCode: `const response = await fetch("/api/users");

if (!response.ok) {
  throw new Error("Erreur HTTP");
}

const data = await response.json();`;
}, {
    readonly code: "HTTP-003";
    readonly title: "Mauvais code de statut HTTP";
    readonly category: "HTTP";
    readonly severity: "MOYENNE";
    readonly explanation: "Le statut HTTP doit représenter correctement le résultat de l'opération.";
    readonly cause: "Le serveur retourne un statut générique ou inadapté.";
    readonly howToFind: "Vérifiez la correspondance entre le résultat métier et le code HTTP.";
    readonly fixHint: "Utilisez les statuts HTTP adaptés au contexte.";
    readonly beforeCode: `return res.status(200).json({
  erreur: "Utilisateur introuvable",
});`;
    readonly afterCode: `return res.status(404).json({
  erreur: "Utilisateur introuvable",
});`;
}, {
    readonly code: "HTTP-004";
    readonly title: "Création de ressource sans statut approprié";
    readonly category: "HTTP";
    readonly severity: "FAIBLE";
    readonly explanation: "Une ressource créée avec succès peut être signalée explicitement par un statut adapté.";
    readonly cause: "Le serveur utilise systématiquement 200.";
    readonly howToFind: "Examinez les endpoints POST créant une nouvelle ressource.";
    readonly fixHint: "Utilisez 201 lorsque la création d'une ressource est réussie.";
    readonly beforeCode: `return res.status(200).json({
  utilisateur,
});`;
    readonly afterCode: `return res.status(201).json({
  utilisateur,
});`;
}, {
    readonly code: "HTTP-005";
    readonly title: "Corps JSON envoyé sans Content-Type";
    readonly category: "HTTP";
    readonly severity: "MOYENNE";
    readonly explanation: "Le serveur doit pouvoir savoir que le corps de la requête contient du JSON.";
    readonly cause: "Le header Content-Type n'est pas envoyé.";
    readonly howToFind: "Cherchez JSON.stringify utilisé sans Content-Type application/json.";
    readonly fixHint: "Ajoutez le header approprié.";
    readonly beforeCode: `fetch("/api/users", {
  method: "POST",
  body: JSON.stringify(data),
});`;
    readonly afterCode: `fetch("/api/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
});`;
}, {
    readonly code: "HTTP-006";
    readonly title: "Endpoint sensible sans authentification";
    readonly category: "HTTP";
    readonly severity: "CRITIQUE";
    readonly explanation: "Une ressource privée doit vérifier l'identité de l'utilisateur.";
    readonly cause: "La route est accessible sans middleware d'authentification.";
    readonly howToFind: "Examinez les routes manipulant des données privées.";
    readonly fixHint: "Ajoutez une authentification côté serveur et vérifiez l'utilisateur.";
    readonly beforeCode: `router.get(
  "/mon-profil",
  obtenirProfil
);`;
    readonly afterCode: `router.get(
  "/mon-profil",
  authentificationMiddleware,
  obtenirProfil
);`;
}, {
    readonly code: "API-001";
    readonly title: "Données utilisateur non validées";
    readonly category: "API";
    readonly severity: "CRITIQUE";
    readonly explanation: "Les données provenant du client ne doivent jamais être considérées comme fiables.";
    readonly cause: "req.body, req.params ou req.query sont utilisés directement.";
    readonly howToFind: "Recherchez les données entrantes utilisées sans validation.";
    readonly fixHint: "Validez les données avant toute opération métier ou base de données.";
    readonly beforeCode: `const { email } = req.body;

await creerUtilisateur(email);`;
    readonly afterCode: `const donnees =
  schemaUtilisateur.parse(req.body);

await creerUtilisateur(donnees.email);`;
}, {
    readonly code: "API-002";
    readonly title: "Erreur interne exposée au client";
    readonly category: "API";
    readonly severity: "CRITIQUE";
    readonly explanation: "Les détails internes d'une erreur ne doivent pas être exposés au client.";
    readonly cause: "L'objet Error ou sa stack est directement renvoyé.";
    readonly howToFind: "Recherchez error, error.message ou error.stack dans les réponses HTTP.";
    readonly fixHint: "Journalisez les détails côté serveur et retournez un message contrôlé.";
    readonly beforeCode: `catch (error) {
  return res.status(500).json({
    error,
  });
}`;
    readonly afterCode: `catch (error) {
  console.error(error);

  return res.status(500).json({
    erreur: "Une erreur interne est survenue.",
  });
}`;
}, {
    readonly code: "API-003";
    readonly title: "Route utilisant une donnée d'identité fournie par le client";
    readonly category: "API";
    readonly severity: "CRITIQUE";
    readonly explanation: "Un utilisateur authentifié ne doit pas pouvoir choisir arbitrairement l'identifiant utilisateur utilisé pour une opération privée.";
    readonly cause: "Le serveur fait confiance à userId provenant du body ou des paramètres.";
    readonly howToFind: "Recherchez userId dans req.body pour des opérations authentifiées.";
    readonly fixHint: "Utilisez l'identité provenant du middleware d'authentification.";
    readonly beforeCode: `const { userId } = req.body;

await obtenirProfil(userId);`;
    readonly afterCode: `const userId = req.utilisateurId;

await obtenirProfil(userId);`;
}, {
    readonly code: "API-004";
    readonly title: "Absence de contrôle d'autorisation";
    readonly category: "API";
    readonly severity: "CRITIQUE";
    readonly explanation: "Être authentifié ne signifie pas automatiquement avoir le droit d'effectuer une action.";
    readonly cause: "Le serveur vérifie l'identité mais pas les permissions.";
    readonly howToFind: "Examinez les routes administratives ou les ressources appartenant à un autre utilisateur.";
    readonly fixHint: "Ajoutez une vérification de rôle ou de propriété.";
    readonly beforeCode: `authentificationMiddleware,
supprimerUtilisateur`;
    readonly afterCode: `authentificationMiddleware,
adminMiddleware,
supprimerUtilisateur`;
}, {
    readonly code: "API-005";
    readonly title: "Absence de gestion d'une ressource inexistante";
    readonly category: "API";
    readonly severity: "MOYENNE";
    readonly explanation: "Une ressource inexistante doit être traitée explicitement.";
    readonly cause: "Le service peut retourner null mais le contrôleur poursuit son traitement.";
    readonly howToFind: "Vérifiez les résultats de findUnique, findFirst ou équivalents.";
    readonly fixHint: "Retournez une réponse 404 lorsque la ressource n'existe pas.";
    readonly beforeCode: `const utilisateur =
  await obtenirUtilisateur(id);

return res.json({
  utilisateur: utilisateur.nom,
});`;
    readonly afterCode: `const utilisateur =
  await obtenirUtilisateur(id);

if (!utilisateur) {
  return res.status(404).json({
    erreur: "Utilisateur introuvable.",
  });
}

return res.json({
  utilisateur,
});`;
}, {
    readonly code: "API-006";
    readonly title: "Absence de limitation d'une entrée volumineuse";
    readonly category: "API";
    readonly severity: "MOYENNE";
    readonly explanation: "Les entrées excessivement volumineuses peuvent consommer inutilement les ressources du serveur.";
    readonly cause: "Aucune limite n'est appliquée aux données entrantes.";
    readonly howToFind: "Vérifiez les endpoints recevant du code, du texte ou des fichiers.";
    readonly fixHint: "Définissez une taille maximale adaptée au besoin métier.";
    readonly beforeCode: `const { code } = req.body;

await analyser(code);`;
    readonly afterCode: `const { code } = req.body;

if (
  typeof code !== "string" ||
  code.length > 20000
) {
  return res.status(413).json({
    erreur: "Entrée trop volumineuse.",
  });
}

await analyser(code);`;
}, {
    readonly code: "API-007";
    readonly title: "Opération sensible sans rate limiting";
    readonly category: "API";
    readonly severity: "MOYENNE";
    readonly explanation: "Les endpoints sensibles peuvent être abusés par des requêtes répétées.";
    readonly cause: "Aucune limitation n'est appliquée aux opérations coûteuses ou sensibles.";
    readonly howToFind: "Examinez les routes de connexion, réinitialisation, analyse IA et autres opérations coûteuses.";
    readonly fixHint: "Ajoutez un mécanisme de rate limiting adapté.";
    readonly beforeCode: `router.post(
  "/analyser",
  analyserCode
);`;
    readonly afterCode: `router.post(
  "/analyser",
  rateLimitMiddleware,
  analyserCode
);`;
}, {
    readonly code: "API-008";
    readonly title: "Données sensibles enregistrées dans les logs";
    readonly category: "API";
    readonly severity: "CRITIQUE";
    readonly explanation: "Les mots de passe, tokens et autres secrets ne doivent pas apparaître dans les logs.";
    readonly cause: "Un objet complet contenant des informations sensibles est journalisé.";
    readonly howToFind: "Recherchez console.log(req.body), console.log(token) ou des logs d'objets d'authentification.";
    readonly fixHint: "Journalisez uniquement les informations nécessaires et masquez les secrets.";
    readonly beforeCode: `console.log("Requête:", req.body);`;
    readonly afterCode: `console.log("Requête reçue:", {
  email: req.body.email,
});`;
}, {
    readonly code: "HTML-001";
    readonly title: "Image sans attribut alt";
    readonly category: "HTML_CSS";
    readonly severity: "MOYENNE";
    readonly explanation: "L'attribut alt fournit une alternative textuelle utile notamment pour l'accessibilité.";
    readonly cause: "L'image a été ajoutée sans description alternative.";
    readonly howToFind: "Recherchez les balises img sans alt.";
    readonly fixHint: "Ajoutez un texte alternatif pertinent ou un alt vide pour une image purement décorative.";
    readonly beforeCode: `<img src="/photo.jpg" />`;
    readonly afterCode: `<img
  src="/photo.jpg"
  alt="Photo de profil"
/>`;
}, {
    readonly code: "HTML-002";
    readonly title: "Bouton sans type explicite dans un formulaire";
    readonly category: "HTML_CSS";
    readonly severity: "FAIBLE";
    readonly explanation: "Un bouton dans un formulaire peut être interprété comme un bouton submit si son type n'est pas explicite.";
    readonly cause: "L'attribut type est absent.";
    readonly howToFind: "Recherchez les button présents dans les formulaires sans type.";
    readonly fixHint: "Utilisez type=\"button\" ou type=\"submit\" explicitement.";
    readonly beforeCode: `<button onClick={ouvrirMenu}>
  Menu
</button>`;
    readonly afterCode: `<button
  type="button"
  onClick={ouvrirMenu}
>
  Menu
</button>`;
}, {
    readonly code: "HTML-003";
    readonly title: "Input sans label accessible";
    readonly category: "HTML_CSS";
    readonly severity: "MOYENNE";
    readonly explanation: "Un champ de formulaire doit avoir une étiquette compréhensible et associée.";
    readonly cause: "Le champ est uniquement identifié visuellement par son placeholder.";
    readonly howToFind: "Recherchez les input sans label associé.";
    readonly fixHint: "Ajoutez un label et associez-le à l'input.";
    readonly beforeCode: `<input
  type="email"
  placeholder="Email"
/>`;
    readonly afterCode: `<label htmlFor="email">
  Adresse email
</label>

<input
  id="email"
  type="email"
  placeholder="Email"
/>`;
}, {
    readonly code: "HTML-004";
    readonly title: "Utilisation d'un div comme bouton";
    readonly category: "HTML_CSS";
    readonly severity: "MOYENNE";
    readonly explanation: "Les éléments interactifs doivent utiliser les éléments HTML prévus lorsque cela est possible.";
    readonly cause: "Un div est utilisé pour simuler un bouton.";
    readonly howToFind: "Recherchez des onClick sur div ou span pour des actions utilisateur.";
    readonly fixHint: "Utilisez un élément button pour une action.";
    readonly beforeCode: `<div onClick={supprimer}>
  Supprimer
</div>`;
    readonly afterCode: `<button
  type="button"
  onClick={supprimer}
>
  Supprimer
</button>`;
}, {
    readonly code: "HTML-005";
    readonly title: "Hiérarchie de titres incohérente";
    readonly category: "HTML_CSS";
    readonly severity: "FAIBLE";
    readonly explanation: "Une structure de titres cohérente améliore la compréhension du document et son accessibilité.";
    readonly cause: "Les niveaux de titres sont sautés sans raison structurelle.";
    readonly howToFind: "Analysez l'ordre h1, h2, h3, etc.";
    readonly fixHint: "Organisez les titres selon la hiérarchie réelle du contenu.";
    readonly beforeCode: `<h1>Profil</h1>
<h4>Expériences</h4>`;
    readonly afterCode: `<h1>Profil</h1>
<h2>Expériences</h2>`;
}, {
    readonly code: "HTML-006";
    readonly title: "Formulaire sans gestion explicite de soumission";
    readonly category: "HTML_CSS";
    readonly severity: "MOYENNE";
    readonly explanation: "Une application interactive doit contrôler la soumission du formulaire lorsque celle-ci est gérée côté client.";
    readonly cause: "Le formulaire laisse le navigateur effectuer son comportement par défaut.";
    readonly howToFind: "Vérifiez les formulaires React sans onSubmit.";
    readonly fixHint: "Utilisez onSubmit et preventDefault lorsque la soumission est gérée côté application.";
    readonly beforeCode: `<form>
  <input name="email" />
</form>`;
    readonly afterCode: `<form
  onSubmit={(event) => {
    event.preventDefault();
    envoyerFormulaire();
  }}
>
  <input name="email" />
</form>`;
}, {
    readonly code: "HTML-007";
    readonly title: "Texte de placeholder utilisé comme seule étiquette";
    readonly category: "HTML_CSS";
    readonly severity: "FAIBLE";
    readonly explanation: "Un placeholder disparaît lorsque l'utilisateur commence à saisir et ne remplace pas correctement un label.";
    readonly cause: "Le champ ne possède pas d'étiquette persistante.";
    readonly howToFind: "Cherchez les champs possédant un placeholder mais aucun label.";
    readonly fixHint: "Ajoutez un label visible ou correctement masqué pour l'accessibilité.";
    readonly beforeCode: `<input placeholder="Votre nom" />`;
    readonly afterCode: `<label htmlFor="nom">
  Nom
</label>

<input
  id="nom"
  placeholder="Votre nom"
/>`;
}, {
    readonly code: "HTML-008";
    readonly title: "Lien utilisé pour une action";
    readonly category: "HTML_CSS";
    readonly severity: "FAIBLE";
    readonly explanation: "Un lien sert à naviguer alors qu'un bouton sert à déclencher une action.";
    readonly cause: "La sémantique HTML ne correspond pas au comportement.";
    readonly howToFind: "Recherchez les a ou liens utilisés uniquement pour exécuter une fonction.";
    readonly fixHint: "Utilisez button pour les actions et a pour la navigation.";
    readonly beforeCode: `<a href="#" onClick={ouvrirMenu}>
  Menu
</a>`;
    readonly afterCode: `<button
  type="button"
  onClick={ouvrirMenu}
>
  Menu
</button>`;
}, {
    readonly code: "HTML-009";
    readonly title: "Contenu pouvant provoquer un débordement horizontal";
    readonly category: "HTML_CSS";
    readonly severity: "FAIBLE";
    readonly explanation: "Un contenu non adaptable peut dépasser la largeur de l'écran sur mobile.";
    readonly cause: "Une largeur fixe ou un contenu non cassable est utilisé.";
    readonly howToFind: "Testez la page sur des écrans étroits et recherchez les largeurs fixes excessives.";
    readonly fixHint: "Utilisez des dimensions flexibles et gérez les contenus longs.";
    readonly beforeCode: `.conteneur {
  width: 1200px;
}`;
    readonly afterCode: `.conteneur {
  width: 100%;
  max-width: 1200px;
}`;
}, {
    readonly code: "HTML-010";
    readonly title: "Image non responsive";
    readonly category: "HTML_CSS";
    readonly severity: "FAIBLE";
    readonly explanation: "Une image plus large que son conteneur peut provoquer un débordement.";
    readonly cause: "La largeur de l'image n'est pas limitée par son conteneur.";
    readonly howToFind: "Testez les images sur les petits écrans.";
    readonly fixHint: "Utilisez une largeur maximale de 100% lorsque le contexte le nécessite.";
    readonly beforeCode: `.photo {
  width: 800px;
}`;
    readonly afterCode: `.photo {
  width: 100%;
  max-width: 800px;
}`;
}, {
    readonly code: "API-009";
    readonly title: "Réponse API non normalisée";
    readonly category: "API";
    readonly severity: "FAIBLE";
    readonly explanation: "Des réponses incohérentes rendent le frontend plus difficile à maintenir.";
    readonly cause: "Chaque endpoint utilise une structure différente pour les mêmes concepts.";
    readonly howToFind: "Comparez les réponses des endpoints similaires.";
    readonly fixHint: "Définissez une convention cohérente pour les données, erreurs et métadonnées.";
    readonly beforeCode: `return res.json({
  data: utilisateur,
});`;
    readonly afterCode: `return res.status(200).json({
  succes: true,
  utilisateur,
});`;
}, {
    readonly code: "API-010";
    readonly title: "Absence de validation d'un paramètre d'URL";
    readonly category: "API";
    readonly severity: "MOYENNE";
    readonly explanation: "Les paramètres d'URL doivent être validés avant leur utilisation.";
    readonly cause: "req.params est transmis directement au service.";
    readonly howToFind: "Recherchez les identifiants provenant directement des paramètres d'URL.";
    readonly fixHint: "Vérifiez le format et la validité du paramètre.";
    readonly beforeCode: `const id = req.params.id;

await supprimer(id);`;
    readonly afterCode: `const id = req.params.id;

if (!id || typeof id !== "string") {
  return res.status(400).json({
    erreur: "Identifiant invalide.",
  });
}

await supprimer(id);`;
}, {
    readonly code: "API-011";
    readonly title: "Validation insuffisante d'une pagination";
    readonly category: "API";
    readonly severity: "MOYENNE";
    readonly explanation: "Une pagination doit empêcher des valeurs négatives ou excessivement grandes.";
    readonly cause: "page et limite sont utilisées sans bornes.";
    readonly howToFind: "Vérifiez les paramètres page, limit ou limite.";
    readonly fixHint: "Définissez une valeur minimale et une limite maximale.";
    readonly beforeCode: `const limite =
  Number(req.query.limite);`;
    readonly afterCode: `const limiteDemandee =
  Number(req.query.limite);

const limite =
  Math.min(
    Math.max(limiteDemandee || 20, 1),
    100
  );`;
}, {
    readonly code: "API-012";
    readonly title: "Donnée utilisateur utilisée directement dans une réponse HTML";
    readonly category: "API";
    readonly severity: "CRITIQUE";
    readonly explanation: "Une donnée utilisateur non contrôlée peut introduire une vulnérabilité lorsqu'elle est injectée dans du HTML.";
    readonly cause: "Le serveur ou le frontend insère directement une valeur non fiable.";
    readonly howToFind: "Recherchez les données utilisateur injectées dans du HTML sans échappement ou contrôle.";
    readonly fixHint: "Utilisez l'échappement fourni par le framework et évitez l'injection HTML non nécessaire.";
    readonly beforeCode: `element.innerHTML =
  utilisateur.nom;`;
    readonly afterCode: `element.textContent =
  utilisateur.nom;`;
}, {
    readonly code: "JS-029";
    readonly title: "Variable déclarée mais jamais utilisée";
    readonly category: "JAVASCRIPT";
    readonly severity: "FAIBLE";
    readonly explanation: "Une variable inutilisée augmente le bruit et peut indiquer une logique abandonnée.";
    readonly cause: "Une ancienne variable a été conservée après une modification.";
    readonly howToFind: "Recherchez les déclarations dont la valeur n'est jamais utilisée.";
    readonly fixHint: "Supprimez la variable ou utilisez-la réellement.";
    readonly beforeCode: `const resultat = calculer();

console.log("Terminé");`;
    readonly afterCode: `calculer();

console.log("Terminé");`;
}, {
    readonly code: "JS-030";
    readonly title: "Code dupliqué";
    readonly category: "JAVASCRIPT";
    readonly severity: "FAIBLE";
    readonly explanation: "La duplication augmente le coût de maintenance et le risque d'incohérences.";
    readonly cause: "Une même logique est répétée dans plusieurs endroits.";
    readonly howToFind: "Identifiez les blocs ayant la même responsabilité et le même comportement.";
    readonly fixHint: "Extraire la logique commune dans une fonction ou un module.";
    readonly beforeCode: `const total1 =
  prix1 + prix1 * 0.2;

const total2 =
  prix2 + prix2 * 0.2;`;
    readonly afterCode: `function calculerTTC(prix: number) {
  return prix + prix * 0.2;
}

const total1 = calculerTTC(prix1);
const total2 = calculerTTC(prix2);`;
}, {
    readonly code: "JS-031";
    readonly title: "Fonction trop chargée";
    readonly category: "JAVASCRIPT";
    readonly severity: "FAIBLE";
    readonly explanation: "Une fonction qui gère plusieurs responsabilités devient difficile à tester et maintenir.";
    readonly cause: "Plusieurs responsabilités métier sont regroupées dans la même fonction.";
    readonly howToFind: "Identifiez les fonctions qui valident, transforment, enregistrent et présentent les données en même temps.";
    readonly fixHint: "Séparez les responsabilités en fonctions ou services spécialisés.";
    readonly beforeCode: `function creerUtilisateur(data) {
  // validation
  // transformation
  // sauvegarde
  // email
  // réponse HTTP
}`;
    readonly afterCode: `function creerUtilisateur(data) {
  const donnees =
    validerUtilisateur(data);

  const utilisateur =
    enregistrerUtilisateur(donnees);

  envoyerEmailBienvenue(utilisateur);

  return utilisateur;
}`;
}, {
    readonly code: "JS-032";
    readonly title: "Valeur magique répétée";
    readonly category: "JAVASCRIPT";
    readonly severity: "FAIBLE";
    readonly explanation: "Une valeur métier répétée rend le code plus difficile à comprendre et modifier.";
    readonly cause: "Une constante importante est écrite directement à plusieurs endroits.";
    readonly howToFind: "Cherchez les mêmes nombres ou chaînes représentant une règle métier.";
    readonly fixHint: "Définissez une constante explicite.";
    readonly beforeCode: `if (tentatives >= 3) {
  bloquer();
}

if (tentatives === 3) {
  notifier();
}`;
    readonly afterCode: `const LIMITE_TENTATIVES = 3;

if (tentatives >= LIMITE_TENTATIVES) {
  bloquer();
}

if (tentatives === LIMITE_TENTATIVES) {
  notifier();
}`;
}];
//# sourceMappingURL=codeDoctorRules.d.ts.map