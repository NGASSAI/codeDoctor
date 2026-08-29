"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TYPESCRIPT_EXERCISES = void 0;
exports.TYPESCRIPT_EXERCISES = [
    {
        title: "Réponse API insuffisamment typée",
        category: "TYPESCRIPT",
        difficulty: "MOYEN",
        buggyCode: `
async function getUser(id: string) {
  const response = await fetch(\`/api/users/\${id}\`);
  const user = await response.json();

  return user;
}

async function displayUser(id: string) {
  const user = await getUser(id);

  console.log(user.name);
  console.log(user.email);
}
`,
        hint1: "TypeScript ne connaît pas réellement la structure retournée par l'API.",
        hint2: "Créer une interface permet de décrire précisément la réponse attendue.",
        hint3: "Utilise un type User et vérifie les données avant de les utiliser.",
        solution: `
interface User {
  id: string;
  name: string;
  email: string;
}

async function getUser(id: string): Promise<User> {
  const response = await fetch(\`/api/users/\${id}\`);

  if (!response.ok) {
    throw new Error("Utilisateur introuvable");
  }

  const user: unknown = await response.json();

  if (
    typeof user !== "object" ||
    user === null ||
    !("id" in user) ||
    !("name" in user) ||
    !("email" in user)
  ) {
    throw new Error("Réponse API invalide");
  }

  return user as User;
}

async function displayUser(id: string) {
  const user = await getUser(id);

  console.log(user.name);
  console.log(user.email);
}
`,
        keywords: ["typescript", "interface", "api", "unknown", "typing"],
    },
    {
        title: "Propriété optionnelle mal gérée",
        category: "TYPESCRIPT",
        difficulty: "MOYEN",
        buggyCode: `
interface User {
  id: string;
  name: string;
  avatar?: string;
}

function getAvatarUrl(user: User) {
  return user.avatar.toUpperCase();
}
`,
        hint1: "avatar est marqué comme optionnel.",
        hint2: "Une propriété optionnelle peut être undefined.",
        hint3: "Prévois une valeur par défaut ou vérifie son existence.",
        solution: `
interface User {
  id: string;
  name: string;
  avatar?: string;
}

function getAvatarUrl(user: User) {
  return user.avatar?.toUpperCase() ?? "/default-avatar.png";
}
`,
        keywords: ["optional-property", "undefined", "typescript", "nullish"],
    },
    {
        title: "Union type mal discriminé",
        category: "TYPESCRIPT",
        difficulty: "DIFFICILE",
        buggyCode: `
type ApiResult =
  | {
      success: true;
      data: string[];
    }
  | {
      success: false;
      error: string;
    };

function handleResult(result: ApiResult) {
  console.log(result.data.length);
}
`,
        hint1: "Les deux variantes de ApiResult ne possèdent pas les mêmes propriétés.",
        hint2: "success est le discriminant de l'union.",
        hint3: "Teste success avant d'accéder à data.",
        solution: `
type ApiResult =
  | {
      success: true;
      data: string[];
    }
  | {
      success: false;
      error: string;
    };

function handleResult(result: ApiResult) {
  if (result.success) {
    console.log(result.data.length);
    return;
  }

  console.error(result.error);
}
`,
        keywords: ["union", "discriminated-union", "narrowing", "typescript"],
    },
    {
        title: "Générique incorrect pour une fonction API",
        category: "TYPESCRIPT",
        difficulty: "DIFFICILE",
        buggyCode: `
async function request<T>(url: string): Promise<T> {
  const response = await fetch(url);

  return response.json();
}

interface Product {
  id: string;
  name: string;
  price: number;
}

async function getProducts() {
  const products = await request<Product>("/api/products");

  products.forEach((product) => {
    console.log(product.name);
  });
}
`,
        hint1: "Le type générique décrit le résultat complet.",
        hint2: "L'API retourne ici plusieurs produits.",
        hint3: "Le type fourni doit représenter un tableau de Product.",
        solution: `
async function request<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Erreur API");
  }

  return response.json() as Promise<T>;
}

interface Product {
  id: string;
  name: string;
  price: number;
}

async function getProducts() {
  const products = await request<Product[]>("/api/products");

  products.forEach((product) => {
    console.log(product.name);
  });
}
`,
        keywords: ["generics", "api", "array", "typescript", "type-safety"],
    },
    {
        title: "Enum inutile pour les rôles utilisateur",
        category: "TYPESCRIPT",
        difficulty: "FACILE",
        buggyCode: `
enum UserRole {
  ADMIN,
  USER,
  MODERATOR
}

function canDeleteUser(role: UserRole) {
  return role === UserRole.ADMIN;
}

const role = 0;

console.log(canDeleteUser(role));
`,
        hint1: "Le nombre 0 n'est pas très explicite pour représenter un rôle.",
        hint2: "Les rôles peuvent être représentés directement par des chaînes.",
        hint3: "Utilise une union de littéraux ou un enum string.",
        solution: `
type UserRole = "ADMIN" | "USER" | "MODERATOR";

function canDeleteUser(role: UserRole): boolean {
  return role === "ADMIN";
}

const role: UserRole = "ADMIN";

console.log(canDeleteUser(role));
`,
        keywords: ["union", "literal-types", "roles", "typescript", "enum"],
    },
    {
        title: "Erreur de typage avec Object.keys",
        category: "TYPESCRIPT",
        difficulty: "DIFFICILE",
        buggyCode: `
interface Settings {
  theme: string;
  language: string;
  notifications: boolean;
}

function printSettings(settings: Settings) {
  Object.keys(settings).forEach((key) => {
    console.log(settings[key]);
  });
}
`,
        hint1: "Object.keys retourne généralement des chaînes de caractères.",
        hint2: "Toutes les chaînes ne sont pas forcément des clés valides de Settings.",
        hint3: "Utilise keyof pour indiquer à TypeScript que la clé appartient à Settings.",
        solution: `
interface Settings {
  theme: string;
  language: string;
  notifications: boolean;
}

function printSettings(settings: Settings) {
  (Object.keys(settings) as Array<keyof Settings>).forEach((key) => {
    console.log(settings[key]);
  });
}
`,
        keywords: ["object-keys", "keyof", "typescript", "indexing"],
    },
    {
        title: "Fonction de transformation non typée",
        category: "TYPESCRIPT",
        difficulty: "MOYEN",
        buggyCode: `
function formatProducts(products: any[]) {
  return products.map((product) => ({
    id: product.id,
    label: product.name,
    price: product.price
  }));
}
`,
        hint1: "any désactive une grande partie de la protection de TypeScript.",
        hint2: "Décris la structure d'un produit entrant.",
        hint3: "Décris également la structure du résultat retourné.",
        solution: `
interface Product {
  id: string;
  name: string;
  price: number;
}

interface FormattedProduct {
  id: string;
  label: string;
  price: number;
}

function formatProducts(
  products: Product[]
): FormattedProduct[] {
  return products.map((product) => ({
    id: product.id,
    label: product.name,
    price: product.price
  }));
}
`,
        keywords: ["any", "interface", "mapping", "typescript", "type-safety"],
    },
    {
        title: "Catch avec une erreur inconnue",
        category: "TYPESCRIPT",
        difficulty: "MOYEN",
        buggyCode: `
async function saveProfile() {
  try {
    await fetch("/api/profile", {
      method: "POST"
    });
  } catch (error) {
    console.log(error.message);
  }
}
`,
        hint1: "En TypeScript strict, une erreur capturée n'est pas forcément une instance d'Error.",
        hint2: "Le type de error doit être vérifié avant d'utiliser message.",
        hint3: "Utilise instanceof Error.",
        solution: `
async function saveProfile() {
  try {
    const response = await fetch("/api/profile", {
      method: "POST"
    });

    if (!response.ok) {
      throw new Error("Impossible de sauvegarder le profil");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
      return;
    }

    console.log("Erreur inconnue");
  }
}
`,
        keywords: ["unknown", "error", "catch", "typescript", "strict"],
    },
    {
        title: "Paramètre générique trop permissif",
        category: "TYPESCRIPT",
        difficulty: "DIFFICILE",
        buggyCode: `
function getProperty<T>(object: T, key: string) {
  return object[key];
}

const user = {
  id: "u1",
  name: "Jean",
  email: "jean@example.com"
};

const name = getProperty(user, "name");
`,
        hint1: "Une chaîne quelconque ne garantit pas qu'elle est une clé de T.",
        hint2: "keyof permet d'obtenir les clés valides d'un type.",
        hint3: "Ajoute un second paramètre générique contraint par keyof T.",
        solution: `
function getProperty<T, K extends keyof T>(
  object: T,
  key: K
): T[K] {
  return object[key];
}

const user = {
  id: "u1",
  name: "Jean",
  email: "jean@example.com"
};

const name = getProperty(user, "name");
`,
        keywords: ["generics", "keyof", "extends", "typescript", "type-safe"],
    },
    {
        title: "Type de retour incohérent",
        category: "TYPESCRIPT",
        difficulty: "MOYEN",
        buggyCode: `
function getUserName(userId: string): string {
  const users = [
    { id: "1", name: "Jean" },
    { id: "2", name: "Marie" }
  ];

  const user = users.find((user) => user.id === userId);

  return user?.name;
}
`,
        hint1: "find peut ne trouver aucun utilisateur.",
        hint2: "Dans ce cas, le résultat est undefined.",
        hint3: "Le type de retour doit refléter cette possibilité ou fournir une valeur par défaut.",
        solution: `
function getUserName(userId: string): string | undefined {
  const users = [
    { id: "1", name: "Jean" },
    { id: "2", name: "Marie" }
  ];

  const user = users.find((user) => user.id === userId);

  return user?.name;
}
`,
        keywords: ["find", "undefined", "return-type", "strict", "typescript"],
    },
];
//# sourceMappingURL=typescript.js.map