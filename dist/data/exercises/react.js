"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REACT_EXERCISES = void 0;
exports.REACT_EXERCISES = [
    {
        title: "Boucle infinie avec useEffect",
        category: "REACT",
        difficulty: "MOYEN",
        buggyCode: `
import { useEffect, useState } from "react";

function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/profile")
      .then((response) => response.json())
      .then((data) => setUser(data));
  }, [user]);

  return <div>{user?.name}</div>;
}
`,
        hint1: "Observe la dépendance utilisée par useEffect.",
        hint2: "Chaque modification de user provoque un nouveau rendu.",
        hint3: "Le fetch modifie user, qui relance ensuite l'effet.",
        solution: `
import { useEffect, useState } from "react";

interface User {
  name: string;
}

function UserProfile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch("/api/profile")
      .then((response) => response.json())
      .then((data: User) => setUser(data));
  }, []);

  return <div>{user?.name}</div>;
}
`,
        keywords: [
            "react",
            "useEffect",
            "useState",
            "infinite-loop",
            "dependencies",
        ],
    },
    {
        title: "Mise à jour d'état basée sur une ancienne valeur",
        category: "REACT",
        difficulty: "MOYEN",
        buggyCode: `
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  function incrementThreeTimes() {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  }

  return (
    <>
      <p>{count}</p>
      <button onClick={incrementThreeTimes}>
        +3
      </button>
    </>
  );
}
`,
        hint1: "React peut regrouper plusieurs mises à jour d'état.",
        hint2: "Les trois appels utilisent la même valeur de count.",
        hint3: "Utilise la forme fonctionnelle de setState.",
        solution: `
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  function incrementThreeTimes() {
    setCount((current) => current + 1);
    setCount((current) => current + 1);
    setCount((current) => current + 1);
  }

  return (
    <>
      <p>{count}</p>
      <button onClick={incrementThreeTimes}>
        +3
      </button>
    </>
  );
}
`,
        keywords: [
            "react",
            "useState",
            "functional-update",
            "state",
            "batching",
        ],
    },
    {
        title: "Clé incorrecte dans une liste",
        category: "REACT",
        difficulty: "FACILE",
        buggyCode: `
function UserList({ users }) {
  return (
    <ul>
      {users.map((user, index) => (
        <li key={index}>
          {user.name}
        </li>
      ))}
    </ul>
  );
}
`,
        hint1: "L'index n'est pas toujours une identité stable.",
        hint2: "Que se passe-t-il si un utilisateur est supprimé ou déplacé ?",
        hint3: "Utilise l'identifiant unique de chaque utilisateur.",
        solution: `
interface User {
  id: string;
  name: string;
}

function UserList({ users }: { users: User[] }) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.name}
        </li>
      ))}
    </ul>
  );
}
`,
        keywords: [
            "react",
            "key",
            "list",
            "rendering",
            "performance",
        ],
    },
    {
        title: "Formulaire contrôlé incorrectement",
        category: "REACT",
        difficulty: "MOYEN",
        buggyCode: `
import { useState } from "react";

function LoginForm() {
  const [email, setEmail] = useState();

  return (
    <form>
      <input
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />

      <button type="submit">
        Connexion
      </button>
    </form>
  );
}
`,
        hint1: "Observe la valeur initiale de email.",
        hint2: "Un input contrôlé doit avoir une valeur cohérente dès le premier rendu.",
        hint3: "Initialise email avec une chaîne vide.",
        solution: `
import { useState } from "react";

function LoginForm() {
  const [email, setEmail] = useState("");

  return (
    <form>
      <input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />

      <button type="submit">
        Connexion
      </button>
    </form>
  );
}
`,
        keywords: [
            "react",
            "form",
            "controlled-input",
            "useState",
            "input",
        ],
    },
    {
        title: "Requête asynchrone après démontage du composant",
        category: "REACT",
        difficulty: "DIFFICILE",
        buggyCode: `
import { useEffect, useState } from "react";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          {product.name}
        </li>
      ))}
    </ul>
  );
}
`,
        hint1: "La requête peut continuer même si le composant n'est plus affiché.",
        hint2: "Une requête fetch peut être annulée.",
        hint3: "Utilise AbortController et nettoie l'effet.",
        solution: `
import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
}

function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      try {
        const response = await fetch("/api/products", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Erreur lors du chargement");
        }

        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        console.error(error);
      }
    }

    loadProducts();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          {product.name}
        </li>
      ))}
    </ul>
  );
}
`,
        keywords: [
            "react",
            "useEffect",
            "fetch",
            "AbortController",
            "cleanup",
            "async",
        ],
    },
    {
        title: "Props modifiées directement",
        category: "REACT",
        difficulty: "MOYEN",
        buggyCode: `
function UserCard({ user }) {
  function promoteUser() {
    user.role = "ADMIN";
  }

  return (
    <div>
      <h2>{user.name}</h2>

      <p>{user.role}</p>

      <button onClick={promoteUser}>
        Promouvoir
      </button>
    </div>
  );
}
`,
        hint1: "Les props sont en lecture seule.",
        hint2: "Modifier directement user ne déclenche pas de mise à jour React.",
        hint3: "L'état doit être géré par le composant parent.",
        solution: `
interface User {
  id: string;
  name: string;
  role: "USER" | "ADMIN";
}

interface UserCardProps {
  user: User;
  onPromote: (userId: string) => void;
}

function UserCard({ user, onPromote }: UserCardProps) {
  return (
    <div>
      <h2>{user.name}</h2>

      <p>{user.role}</p>

      <button onClick={() => onPromote(user.id)}>
        Promouvoir
      </button>
    </div>
  );
}
`,
        keywords: [
            "react",
            "props",
            "immutability",
            "state",
            "component",
        ],
    },
    {
        title: "Calcul coûteux exécuté à chaque rendu",
        category: "REACT",
        difficulty: "DIFFICILE",
        buggyCode: `
import { useState } from "react";

function ProductSearch({ products }) {
  const [query, setQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className={darkMode ? "dark" : "light"}>
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      <button onClick={() => setDarkMode(!darkMode)}>
        Changer le thème
      </button>

      {filteredProducts.map((product) => (
        <p key={product.id}>{product.name}</p>
      ))}
    </div>
  );
}
`,
        hint1: "Changer darkMode provoque également un rendu.",
        hint2: "Le filtrage peut devenir coûteux avec une grande liste.",
        hint3: "useMemo permet de mémoriser le résultat dépendant de query et products.",
        solution: `
import { useMemo, useState } from "react";

interface Product {
  id: string;
  name: string;
}

interface ProductSearchProps {
  products: Product[];
}

function ProductSearch({ products }: ProductSearchProps) {
  const [query, setQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.toLowerCase();

    return products.filter((product) =>
      product.name.toLowerCase().includes(normalizedQuery)
    );
  }, [products, query]);

  return (
    <div className={darkMode ? "dark" : "light"}>
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      <button onClick={() => setDarkMode((value) => !value)}>
        Changer le thème
      </button>

      {filteredProducts.map((product) => (
        <p key={product.id}>{product.name}</p>
      ))}
    </div>
  );
}
`,
        keywords: [
            "react",
            "useMemo",
            "performance",
            "render",
            "optimization",
        ],
    },
    {
        title: "État du chargement absent",
        category: "REACT",
        difficulty: "MOYEN",
        buggyCode: `
import { useEffect, useState } from "react";

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((response) => response.json())
      .then(setData);
  }, []);

  return (
    <section>
      <h1>Dashboard</h1>
      <p>Total : {data.total}</p>
    </section>
  );
}
`,
        hint1: "Au premier rendu, data vaut null.",
        hint2: "Le composant doit gérer plusieurs états : chargement, succès et erreur.",
        hint3: "Ajoute loading et error avant d'afficher les données.",
        solution: `
import { useEffect, useState } from "react";

interface DashboardData {
  total: number;
}

function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);

        const response = await fetch("/api/dashboard");

        if (!response.ok) {
          throw new Error("Impossible de charger le dashboard");
        }

        const result: DashboardData = await response.json();
        setData(result);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Une erreur est survenue"
        );
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p>Erreur : {error}</p>;
  }

  if (!data) {
    return <p>Aucune donnée.</p>;
  }

  return (
    <section>
      <h1>Dashboard</h1>
      <p>Total : {data.total}</p>
    </section>
  );
}
`,
        keywords: [
            "react",
            "loading",
            "error",
            "useEffect",
            "api",
            "async",
        ],
    },
    {
        title: "État dérivé inutile",
        category: "REACT",
        difficulty: "MOYEN",
        buggyCode: `
import { useEffect, useState } from "react";

function Cart({ items }) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(
      items.reduce((sum, item) => sum + item.price, 0)
    );
  }, [items]);

  return <p>Total : {total} €</p>;
}
`,
        hint1: "total peut être calculé directement à partir de items.",
        hint2: "Stocker une valeur calculable dans un state crée une synchronisation supplémentaire.",
        hint3: "Calcule total directement pendant le rendu.",
        solution: `
interface CartItem {
  id: string;
  price: number;
}

function Cart({ items }: { items: CartItem[] }) {
  const total = items.reduce(
    (sum, item) => sum + item.price,
    0
  );

  return <p>Total : {total} €</p>;
}
`,
        keywords: [
            "react",
            "derived-state",
            "useEffect",
            "state",
            "render",
        ],
    },
    {
        title: "Event handler exécuté immédiatement",
        category: "REACT",
        difficulty: "FACILE",
        buggyCode: `
function DeleteButton({ onDelete }) {
  return (
    <button onClick={onDelete()}>
      Supprimer
    </button>
  );
}
`,
        hint1: "Observe les parenthèses après onDelete.",
        hint2: "React attend une fonction comme gestionnaire d'événement.",
        hint3: "Passe une fonction qui appellera onDelete au clic.",
        solution: `
function DeleteButton({
  onDelete,
}: {
  onDelete: () => void;
}) {
  return (
    <button onClick={() => onDelete()}>
      Supprimer
    </button>
  );
}
`,
        keywords: [
            "react",
            "event-handler",
            "onClick",
            "callback",
            "function",
        ],
    },
];
//# sourceMappingURL=react.js.map