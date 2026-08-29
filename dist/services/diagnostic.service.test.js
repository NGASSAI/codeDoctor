"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const client_1 = require("../generated/prisma/client");
const diagnostic_service_1 = require("./diagnostic.service");
(0, vitest_1.describe)("Moteur de diagnostic CodeDoctor", () => {
    (0, vitest_1.describe)("JavaScript", () => {
        (0, vitest_1.it)("détecte JS001 - variable utilisée avant déclaration", async () => {
            const code = `
        console.log(nom);
        const nom = "Jean";
      `;
            const resultats = await (0, diagnostic_service_1.diagnostiquerCode)(code, client_1.Category.JAVASCRIPT);
            (0, vitest_1.expect)(resultats.some((r) => r.code === "JS001")).toBe(true);
        });
        (0, vitest_1.it)("détecte JS002 - valeur potentiellement undefined", async () => {
            const code = `
        const utilisateur = utilisateurs.find(
          (u) => u.id === id
        );

        console.log(utilisateur.nom);
      `;
            const resultats = await (0, diagnostic_service_1.diagnostiquerCode)(code, client_1.Category.JAVASCRIPT);
            (0, vitest_1.expect)(resultats.some((r) => r.code === "JS002")).toBe(true);
        });
        (0, vitest_1.it)("détecte JS003 - comparaison non stricte", async () => {
            const code = `
        const age = 18;

        if (age == "18") {
          console.log("Majeur");
        }
      `;
            const resultats = await (0, diagnostic_service_1.diagnostiquerCode)(code, client_1.Category.JAVASCRIPT);
            (0, vitest_1.expect)(resultats.some((r) => r.code === "JS003")).toBe(true);
        });
        (0, vitest_1.it)("détecte JS004 - Promise non gérée", async () => {
            const code = `
        fetch("/api/users")
          .then((response) => response.json());
      `;
            const resultats = await (0, diagnostic_service_1.diagnostiquerCode)(code, client_1.Category.JAVASCRIPT);
            (0, vitest_1.expect)(resultats.some((r) => r.code === "JS004")).toBe(true);
        });
        (0, vitest_1.it)("détecte JS005 - mutation involontaire", async () => {
            const code = `
        const utilisateurs = ["A", "B"];
        utilisateurs.push("C");
      `;
            const resultats = await (0, diagnostic_service_1.diagnostiquerCode)(code, client_1.Category.JAVASCRIPT);
            (0, vitest_1.expect)(resultats.some((r) => r.code === "JS005")).toBe(true);
        });
        (0, vitest_1.it)("détecte JS006 - condition incorrecte", async () => {
            const code = `
        const role = "USER";

        if (role === "ADMIN" || "USER") {
          console.log("Administrateur");
        }
      `;
            const resultats = await (0, diagnostic_service_1.diagnostiquerCode)(code, client_1.Category.JAVASCRIPT);
            (0, vitest_1.expect)(resultats.some((r) => r.code === "JS006")).toBe(true);
        });
        (0, vitest_1.it)("ne détecte pas JS003 avec une comparaison stricte", async () => {
            const code = `
        const age = 18;

        if (age === 18) {
          console.log("Majeur");
        }
      `;
            const resultats = await (0, diagnostic_service_1.diagnostiquerCode)(code, client_1.Category.JAVASCRIPT);
            (0, vitest_1.expect)(resultats.some((r) => r.code === "JS003")).toBe(false);
        });
    });
    (0, vitest_1.describe)("TypeScript", () => {
        (0, vitest_1.it)("détecte TS001 - utilisation de any", async () => {
            const code = `
        function afficherUtilisateur(
          utilisateur: any
        ) {
          console.log(utilisateur.nom);
        }
      `;
            const resultats = await (0, diagnostic_service_1.diagnostiquerCode)(code, client_1.Category.TYPESCRIPT);
            (0, vitest_1.expect)(resultats.some((r) => r.code === "TS001")).toBe(true);
        });
        (0, vitest_1.it)("détecte TS002 - valeur potentiellement undefined", async () => {
            const code = `
        interface User {
          name?: string;
        }

        function afficher(user: User) {
          console.log(user.name.toUpperCase());
        }
      `;
            const resultats = await (0, diagnostic_service_1.diagnostiquerCode)(code, client_1.Category.TYPESCRIPT);
            (0, vitest_1.expect)(resultats.some((r) => r.code === "TS002")).toBe(true);
        });
        (0, vitest_1.it)("détecte TS003 - propriété inexistante", async () => {
            const code = `
        interface User {
          name: string;
        }

        const user: User = {
          name: "Jean",
        };

        console.log(user.email);
      `;
            const resultats = await (0, diagnostic_service_1.diagnostiquerCode)(code, client_1.Category.TYPESCRIPT);
            (0, vitest_1.expect)(resultats.some((r) => r.code === "TS003")).toBe(true);
        });
    });
    (0, vitest_1.describe)("React", () => {
        (0, vitest_1.it)("détecte RE001 - clé manquante", async () => {
            const code = `
        {users.map((user) => (
          <div>
            {user.name}
          </div>
        ))}
      `;
            const resultats = await (0, diagnostic_service_1.diagnostiquerCode)(code, client_1.Category.REACT);
            (0, vitest_1.expect)(resultats.some((r) => r.code === "RE001")).toBe(true);
        });
        (0, vitest_1.it)("détecte RE002 - dépendance manquante", async () => {
            const code = `
        useEffect(() => {
          chargerUtilisateur(userId);
        }, []);
      `;
            const resultats = await (0, diagnostic_service_1.diagnostiquerCode)(code, client_1.Category.REACT);
            (0, vitest_1.expect)(resultats.some((r) => r.code === "RE002")).toBe(true);
        });
        (0, vitest_1.it)("détecte RE003 - état dérivé dans useEffect", async () => {
            const code = `
        useEffect(() => {
          setNomComplet(firstName + " " + lastName);
        }, [firstName, lastName]);
      `;
            const resultats = await (0, diagnostic_service_1.diagnostiquerCode)(code, client_1.Category.REACT);
            (0, vitest_1.expect)(resultats.some((r) => r.code === "RE003")).toBe(true);
        });
        (0, vitest_1.it)("détecte RE004 - Hook conditionnel", async () => {
            const code = `
        if (isLoggedIn) {
          const [user, setUser] = useState(null);
        }
      `;
            const resultats = await (0, diagnostic_service_1.diagnostiquerCode)(code, client_1.Category.REACT);
            (0, vitest_1.expect)(resultats.some((r) => r.code === "RE004")).toBe(true);
        });
    });
    (0, vitest_1.describe)("HTTP", () => {
        (0, vitest_1.it)("détecte HTTP001 - mauvais statut HTTP", async () => {
            const code = `
        return res.status(200).json({
          erreur: "Utilisateur introuvable"
        });
      `;
            const resultats = await (0, diagnostic_service_1.diagnostiquerCode)(code, client_1.Category.HTTP);
            (0, vitest_1.expect)(resultats.some((r) => r.code === "HTTP001")).toBe(true);
        });
        (0, vitest_1.it)("détecte HTTP002 - mauvaise méthode HTTP", async () => {
            const code = `
        app.get("/users", (req, res) => {
          const user = req.body;
        });
      `;
            const resultats = await (0, diagnostic_service_1.diagnostiquerCode)(code, client_1.Category.HTTP);
            (0, vitest_1.expect)(resultats.some((r) => r.code === "HTTP002")).toBe(true);
        });
    });
    (0, vitest_1.describe)("API", () => {
        (0, vitest_1.it)("détecte API001 - entrée non validée", async () => {
            const code = `
        const { email } = req.body;

        await creerUtilisateur(email);
      `;
            const resultats = await (0, diagnostic_service_1.diagnostiquerCode)(code, client_1.Category.API);
            (0, vitest_1.expect)(resultats.some((r) => r.code === "API001")).toBe(true);
        });
        (0, vitest_1.it)("détecte API002 - erreur serveur non gérée", async () => {
            const code = `
        app.get("/users", async (req, res) => {
          const users = await prisma.user.findMany();

          res.json(users);
        });
      `;
            const resultats = await (0, diagnostic_service_1.diagnostiquerCode)(code, client_1.Category.API);
            (0, vitest_1.expect)(resultats.some((r) => r.code === "API002")).toBe(true);
        });
        (0, vitest_1.it)("détecte API003 - donnée sensible exposée", async () => {
            const code = `
        const utilisateur =
          await prisma.user.findUnique({
            where: { id },
          });

        return res.json(utilisateur);
      `;
            const resultats = await (0, diagnostic_service_1.diagnostiquerCode)(code, client_1.Category.API);
            (0, vitest_1.expect)(resultats.some((r) => r.code === "API003")).toBe(true);
        });
    });
    (0, vitest_1.describe)("HTML / CSS", () => {
        (0, vitest_1.it)("détecte HC001 - mauvaise imbrication HTML", async () => {
            const code = `
        <p>
          <div>Contenu</div>
        </p>
      `;
            const resultats = await (0, diagnostic_service_1.diagnostiquerCode)(code, client_1.Category.HTML_CSS);
            (0, vitest_1.expect)(resultats.some((r) => r.code === "HC001")).toBe(true);
        });
        (0, vitest_1.it)("détecte HC002 - image sans alt", async () => {
            const code = `
        <img src="/photo.jpg" />
      `;
            const resultats = await (0, diagnostic_service_1.diagnostiquerCode)(code, client_1.Category.HTML_CSS);
            (0, vitest_1.expect)(resultats.some((r) => r.code === "HC002")).toBe(true);
        });
        (0, vitest_1.it)("ne détecte pas HC002 avec alt", async () => {
            const code = `
        <img
          src="/photo.jpg"
          alt="Portrait de l'utilisateur"
        />
      `;
            const resultats = await (0, diagnostic_service_1.diagnostiquerCode)(code, client_1.Category.HTML_CSS);
            (0, vitest_1.expect)(resultats.some((r) => r.code === "HC002")).toBe(false);
        });
    });
});
//# sourceMappingURL=diagnostic.service.test.js.map