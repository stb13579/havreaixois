"use client";

import { useState } from "react";
import type { Metadata } from "next";
import Link from "next/link";

type Lang = "en" | "fr";

export default function PrivacyPolicyPage() {
  const [lang, setLang] = useState<Lang>("en");

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-amber-50">
      {/* Header */}
      <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/90 border-b border-slate-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            <Link href="/" className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-2xl bg-gradient-to-tr from-rose-300 to-amber-200 shadow-inner" />
              <span className="font-semibold tracking-tight">Le Havre Aixois</span>
            </Link>
            <div className="flex items-center gap-4">
              {/* Language Toggle */}
              <div className="inline-flex items-center rounded-xl border border-slate-300 bg-white p-1 text-xs">
                <button
                  onClick={() => setLang("en")}
                  className={`px-2 py-1 rounded-lg ${lang === "en" ? "bg-slate-900 text-white" : "hover:bg-slate-100"}`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLang("fr")}
                  className={`px-2 py-1 rounded-lg ${lang === "fr" ? "bg-slate-900 text-white" : "hover:bg-slate-100"}`}
                >
                  FR
                </button>
              </div>
              <Link
                href="/"
                className="text-sm text-slate-600 hover:text-rose-600 transition"
              >
                ← {lang === "en" ? "Back to Home" : "Retour à l'accueil"}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        {lang === "en" ? <EnglishContent /> : <FrenchContent />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white/80 py-8 mt-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row text-sm text-slate-500">
            <p>© {new Date().getFullYear()} Le Havre Aixois · Aix‑en‑Provence, France</p>
            <Link href="/" className="hover:text-rose-600 transition">
              {lang === "en" ? "Return to Home" : "Retour à l'accueil"}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function EnglishContent() {
  return (
    <article className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-h1:text-4xl prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-p:text-slate-600 prose-li:text-slate-600 prose-a:text-rose-600 prose-a:no-underline hover:prose-a:underline">
      <h1>Privacy Policy</h1>
      <p>
        <strong>Effective date:</strong> November 12, 2025<br />
        <strong>Website:</strong> <a href="https://lehavreaixois.com">https://lehavreaixois.com</a><br />
        <strong>Data Controller:</strong> Shaun Brown<br />
        <strong>Contact:</strong> <a href="mailto:info@lehavreaixois.com">info@lehavreaixois.com</a>
      </p>

      <h2>1. Purpose of this Policy</h2>
      <p>
        This Privacy Policy explains how we collect, use, and protect your personal data when you visit LeHavreAixois.com, 
        contact us via our form, or otherwise communicate with us. We comply with the General Data Protection Regulation 
        (EU) 2016/679 (GDPR) and French data-protection laws.
      </p>

      <h2>2. Data Controller</h2>
      <p>
        The data controller for this website is:<br />
        <strong>Shaun Brown</strong><br />
        Email: <a href="mailto:info@lehavreaixois.com">info@lehavreaixois.com</a><br />
        Based in France
      </p>

      <h2>3. Data We Collect</h2>
      <p>We collect and process the following personal data:</p>
      <ul>
        <li>
          <strong>Contact form submissions:</strong> name, email address, message content, and any other details you 
          voluntarily provide.
        </li>
        <li>
          <strong>Analytics data:</strong> anonymized usage information such as pages visited, browser type, and session 
          duration (via Google Analytics).
        </li>
        <li>
          <strong>Email correspondence:</strong> if you contact us directly by email, we may retain the exchange for 
          follow-up purposes.
        </li>
      </ul>
      <p>
        We do not collect payment information on this website, as bookings are processed externally (e.g., Airbnb, VRBO).
      </p>

      <h2>4. Purpose and Legal Basis for Processing</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-4 py-2 text-left">Purpose</th>
              <th className="border border-slate-300 px-4 py-2 text-left">Legal basis</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-300 px-4 py-2">Responding to your inquiries and managing communication</td>
              <td className="border border-slate-300 px-4 py-2">Article 6(1)(b) – Necessary for pre-contractual measures</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-4 py-2">Website operation and improvement through analytics</td>
              <td className="border border-slate-300 px-4 py-2">Article 6(1)(a) – Consent (given via cookie banner)</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-4 py-2">Legal compliance (tax, safety, or communication record-keeping)</td>
              <td className="border border-slate-300 px-4 py-2">Article 6(1)(c) – Legal obligation</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>5. Data Storage and Retention</h2>
      <ul>
        <li>Contact form messages and email correspondence are retained for up to 12 months, unless further communication requires longer retention.</li>
        <li>{`Google Analytics data is retained according to Google's default settings (typically 14 months).`}</li>
        <li>{`Data is securely stored on Railway's EU-based servers (Amsterdam).`}</li>
      </ul>

      <h2>6. Data Sharing</h2>
      <p>We do not sell or share your personal data for marketing purposes.</p>
      <p>Your data may be shared only with:</p>
      <ul>
        <li><strong>Hosting provider:</strong> Railway (EU-based)</li>
        <li><strong>Google LLC:</strong> for analytics purposes under EU Standard Contractual Clauses</li>
        <li><strong>Google Apps Script:</strong> for contact form processing</li>
        <li><strong>Booking platforms:</strong> Airbnb, VRBO (when you use their services)</li>
      </ul>

      <h2>7. Cookies and Tracking</h2>
      <p>This website uses cookies to ensure functionality and gather analytics information.</p>
      <p>Types of cookies used:</p>
      <ul>
        <li><strong>Essential cookies:</strong> required for website functionality (consent preferences).</li>
        <li><strong>Analytics cookies (Google Analytics):</strong> help us understand how visitors use the site. These are placed only after you give consent through the cookie banner.</li>
      </ul>
      <p>
        {`You can manage your cookie preferences at any time by clicking "Cookie Settings" in the footer of our website.`}
      </p>

      <h2>8. Your Rights under the GDPR</h2>
      <p>You have the following rights:</p>
      <ul>
        <li><strong>Right to access:</strong> request a copy of your personal data</li>
        <li><strong>Right to rectification:</strong> correct inaccurate data</li>
        <li><strong>Right to erasure:</strong> request deletion of your data</li>
        <li><strong>Right to restrict processing:</strong> limit how we use your data</li>
        <li><strong>Right to data portability:</strong> receive your data in a machine-readable format</li>
        <li><strong>Right to object:</strong> object to processing based on legitimate interests</li>
        <li><strong>Right to withdraw consent:</strong> change your cookie preferences anytime</li>
        <li><strong>Right to lodge a complaint:</strong> file a complaint with the CNIL (French data protection authority)</li>
      </ul>
      <p>
        To exercise these rights, contact us at <a href="mailto:info@lehavreaixois.com">info@lehavreaixois.com</a>.<br />
        You can also file a complaint with the CNIL: <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">www.cnil.fr</a>
      </p>

      <h2>9. Data Security</h2>
      <p>
        We use encryption (HTTPS) and restricted administrative access to protect your data. We implement appropriate 
        technical and organizational measures to ensure data security.
      </p>

      <h2>10. Transfers Outside the EU</h2>
      <p>
        {`Analytics data processed by Google LLC may be transferred outside the EU. These transfers are protected under Google's Standard Contractual Clauses (SCCs) approved by the European Commission.`}
      </p>

      <h2>11. Updates to This Policy</h2>
      <p>
        We may update this policy from time to time. The latest version will always be available on this page with the 
        effective date indicated at the top.
      </p>

      <h2>12. Contact</h2>
      <p>
        If you have any questions about this privacy policy or our data practices, please contact us at:<br />
        <a href="mailto:info@lehavreaixois.com">info@lehavreaixois.com</a>
      </p>
    </article>
  );
}

function FrenchContent() {
  return (
    <article className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-h1:text-4xl prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-p:text-slate-600 prose-li:text-slate-600 prose-a:text-rose-600 prose-a:no-underline hover:prose-a:underline">
      <h1>Politique de confidentialité</h1>
      <p>
        <strong>{`Date d'entrée en vigueur :`}</strong> 12 novembre 2025<br />
        <strong>Site :</strong> <a href="https://lehavreaixois.com">https://lehavreaixois.com</a><br />
        <strong>Responsable du traitement :</strong> Shaun Brown<br />
        <strong>Contact :</strong> <a href="mailto:info@lehavreaixois.com">info@lehavreaixois.com</a>
      </p>

      <h2>1. Objet de cette politique</h2>
      <p>
        La présente politique explique comment nous collectons, utilisons et protégeons vos données personnelles lorsque 
        vous visitez LeHavreAixois.com ou nous contactez. Nous respectons le RGPD (UE 2016/679) et la législation française.
      </p>

      <h2>2. Responsable du traitement</h2>
      <p>
        <strong>Shaun Brown</strong><br />
        Email : <a href="mailto:info@lehavreaixois.com">info@lehavreaixois.com</a><br />
        Basé en France
      </p>

      <h2>3. Données collectées</h2>
      <ul>
        <li>
          <strong>Formulaire de contact :</strong> nom, e-mail, message et toute autre information fournie volontairement.
        </li>
        <li>
          <strong>Données analytiques :</strong> données anonymisées via Google Analytics (pages vues, type de navigateur, 
          durée de session).
        </li>
        <li>
          <strong>Correspondance e-mail :</strong> conservée uniquement pour assurer le suivi des échanges.
        </li>
      </ul>
      <p>
        {`Aucune donnée de paiement n'est collectée sur ce site. Les réservations se font sur des plateformes tierces (Airbnb, VRBO).`}
      </p>

      <h2>4. Finalités et bases légales</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-4 py-2 text-left">Finalité</th>
              <th className="border border-slate-300 px-4 py-2 text-left">Base légale</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-300 px-4 py-2">Répondre à vos demandes</td>
              <td className="border border-slate-300 px-4 py-2">Article 6(1)(b) – Nécessité précontractuelle</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-4 py-2">{`Statistiques d'audience`}</td>
              <td className="border border-slate-300 px-4 py-2">Article 6(1)(a) – Consentement</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-4 py-2">Obligations légales</td>
              <td className="border border-slate-300 px-4 py-2">Article 6(1)(c) – Obligation légale</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>5. Durée de conservation</h2>
      <ul>
        <li>{`Messages et e-mails : jusqu'à 12 mois.`}</li>
        <li>Données Google Analytics : 14 mois (paramètres par défaut).</li>
        <li>{`Données hébergées sur les serveurs Railway dans l'UE (Amsterdam).`}</li>
      </ul>

      <h2>6. Partage des données</h2>
      <p>Nous ne vendons ni ne partageons vos données personnelles à des fins marketing.</p>
      <p>Les données peuvent être partagées uniquement avec :</p>
      <ul>
        <li><strong>Railway :</strong> {`hébergeur du site (basé dans l'UE)`}</li>
        <li><strong>Google LLC :</strong> {`outil d'analyse, sous clauses contractuelles types UE`}</li>
        <li><strong>Google Apps Script :</strong> traitement des formulaires de contact</li>
        <li><strong>Plateformes de réservation :</strong> Airbnb, VRBO (lorsque vous utilisez leurs services)</li>
      </ul>

      <h2>7. Cookies et outils de mesure</h2>
      <p>Ce site utilise des cookies nécessaires et analytiques.</p>
      <p>Types de cookies :</p>
      <ul>
        <li><strong>Cookies essentiels :</strong> requis pour le fonctionnement du site (préférences de consentement).</li>
        <li><strong>Cookies analytiques (Google Analytics) :</strong> {`ne sont déposés qu'après consentement explicite via la bannière cookies.`}</li>
      </ul>
      <p>
        {`Vous pouvez gérer vos préférences de cookies à tout moment en cliquant sur "Cookie Settings" dans le pied de page.`}
      </p>

      <h2>8. Vos droits</h2>
      <p>Vous disposez des droits suivants :</p>
      <ul>
        <li><strong>{`Droit d'accès :`}</strong> demander une copie de vos données personnelles</li>
        <li><strong>Droit de rectification :</strong> corriger les données inexactes</li>
        <li><strong>{`Droit d'effacement :`}</strong> demander la suppression de vos données</li>
        <li><strong>Droit de limitation :</strong> {`limiter l'utilisation de vos données`}</li>
        <li><strong>Droit de portabilité :</strong> recevoir vos données dans un format lisible</li>
        <li><strong>{`Droit d'opposition :`}</strong> {`vous opposer au traitement basé sur l'intérêt légitime`}</li>
        <li><strong>Droit de retrait du consentement :</strong> modifier vos préférences de cookies à tout moment</li>
        <li><strong>Droit de réclamation :</strong> déposer une plainte auprès de la CNIL</li>
      </ul>
      <p>
        Contact : <a href="mailto:info@lehavreaixois.com">info@lehavreaixois.com</a><br />
        Réclamation possible auprès de la CNIL : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">www.cnil.fr</a>
      </p>

      <h2>9. Sécurité des données</h2>
      <p>
        Données protégées par chiffrement HTTPS et accès restreint. Nous mettons en œuvre des mesures techniques et 
        organisationnelles appropriées pour garantir la sécurité des données.
      </p>

      <h2>10. Transferts hors UE</h2>
      <p>
        Les données Google Analytics peuvent être transférées hors UE. Ces transferts sont protégés par les Clauses 
        Contractuelles Types (SCC) de Google approuvées par la Commission européenne.
      </p>

      <h2>11. Mises à jour</h2>
      <p>
        {`Cette politique peut être modifiée à tout moment. La version la plus récente est disponible sur cette page avec la date d'entrée en vigueur indiquée en haut.`}
      </p>

      <h2>12. Contact</h2>
      <p>
        Toute question concernant cette politique ou nos pratiques en matière de données :<br />
        <a href="mailto:info@lehavreaixois.com">info@lehavreaixois.com</a>
      </p>
    </article>
  );
}
