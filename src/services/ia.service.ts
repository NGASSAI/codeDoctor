import Groq from "groq-sdk";
import { enregistrerTokensIA } from "./quota.service";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

interface AnalyserCodeParams {
  code: string;
  langage: string;
  erreur?: string;
  utilisateurId: string;
  dateJour: string;
}

export async function analyserCode({
  code,
  langage,
  erreur,
  utilisateurId,
  dateJour,
}: AnalyserCodeParams) {
  const prompt = `
Tu es CodeDoctor, un assistant expert en développement logiciel.

Tu dois analyser du code fourni par un développeur de manière
professionnelle, précise et pratique.

LANGAGE :
${langage}

CODE :
\`\`\`${langage}
${code}
\`\`\`

ERREUR ÉVENTUELLE :
${erreur || "Aucune erreur fournie."}

Ta réponse doit obligatoirement respecter cette structure :

1. DIAGNOSTIC
Explique précisément le problème détecté.

2. CAUSE
Explique pourquoi le problème se produit.

3. CORRECTION
Donne le code corrigé complet.

4. EXPLICATION
Explique clairement les modifications effectuées.

5. CONSEIL
Donne un conseil professionnel permettant d'éviter ce problème
à l'avenir.

Règles importantes :
- Ne prétends pas qu'un problème existe si le code est correct.
- Ne modifie pas inutilement le code.
- Respecte le langage utilisé.
- Privilégie les bonnes pratiques professionnelles.
- Ne donne pas une réponse académique vague.
- Si plusieurs problèmes existent, classe-les par importance.
`;

  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-120b",
    temperature: 0.2,
    messages: [
      {
        role: "system",
        content:
          "Tu es CodeDoctor, un expert senior en programmation et revue de code.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const tokensUtilises = completion.usage?.total_tokens ?? 0;

  await enregistrerTokensIA(
    utilisateurId,
    dateJour,
    tokensUtilises
  );

  return (
    completion.choices[0]?.message?.content ??
    "Aucune analyse n'a été générée."
  );
}