import type * as CookieConsent from 'vanilla-cookieconsent';

export const cookieConsentConfig: CookieConsent.CookieConsentConfig = {
  // Enable development mode for testing (set to false in production)
  // guiOptions: {
  //   consentModal: {
  //     layout: 'box inline',
  //     position: 'bottom left',
  //   },
  // },

  categories: {
    necessary: {
      enabled: true,  // Always enabled (required for site functionality)
      readOnly: true,  // Users cannot disable necessary cookies
    },
    analytics: {
      enabled: false,  // Disabled by default, requires user consent
      autoClear: {
        cookies: [
          {
            name: /^(_ga|_gid)/,  // Clear Google Analytics cookies if consent is withdrawn
          },
        ],
      },
    },
  },

  language: {
    default: 'en',
    autoDetect: 'browser',
    
    translations: {
      en: {
        consentModal: {
          title: 'Cookie Preferences',
          description:
            'We use cookies to enhance your browsing experience and analyze website traffic. You can choose which cookies to accept.',
          acceptAllBtn: 'Accept All',
          acceptNecessaryBtn: 'Reject All',
          showPreferencesBtn: 'Manage Preferences',
        },
        preferencesModal: {
          title: 'Cookie Preferences Center',
          acceptAllBtn: 'Accept All',
          acceptNecessaryBtn: 'Reject All',
          savePreferencesBtn: 'Save Preferences',
          closeIconLabel: 'Close',
          sections: [
            {
              title: 'Cookie Usage',
              description:
                'We use cookies to ensure the basic functionalities of the website and to enhance your online experience. You can choose for each category to opt-in/out whenever you want.',
            },
            {
              title: 'Strictly Necessary Cookies',
              description:
                'These cookies are essential for the proper functioning of the website. Without these cookies, the website would not work properly.',
              linkedCategory: 'necessary',
            },
            {
              title: 'Analytics Cookies',
              description:
                'These cookies collect information about how you use the website, which pages you visited and which links you clicked on. All of the data is anonymized and cannot be used to identify you.',
              linkedCategory: 'analytics',
              cookieTable: {
                headers: {
                  name: 'Cookie',
                  domain: 'Domain',
                  description: 'Description',
                  expiration: 'Expiration',
                },
                body: [
                  {
                    name: '_ga',
                    domain: 'lehavreaixois.com',
                    description: 'Used to distinguish users for Google Analytics',
                    expiration: '2 years',
                  },
                  {
                    name: '_gid',
                    domain: 'lehavreaixois.com',
                    description: 'Used to distinguish users for Google Analytics',
                    expiration: '24 hours',
                  },
                ],
              },
            },
            {
              title: 'More Information',
              description:
                'For any queries in relation to our policy on cookies and your choices, please <a href="#contact">contact us</a>. Read our full <a href="/privacy">Privacy Policy</a>.',
            },
          ],
        },
      },
      fr: {
        consentModal: {
          title: 'Préférences de Cookies',
          description:
            'Nous utilisons des cookies pour améliorer votre expérience de navigation et analyser le trafic du site. Vous pouvez choisir quels cookies accepter.',
          acceptAllBtn: 'Tout Accepter',
          acceptNecessaryBtn: 'Tout Rejeter',
          showPreferencesBtn: 'Gérer les Préférences',
        },
        preferencesModal: {
          title: 'Centre de Préférences des Cookies',
          acceptAllBtn: 'Tout Accepter',
          acceptNecessaryBtn: 'Tout Rejeter',
          savePreferencesBtn: 'Sauvegarder les Préférences',
          closeIconLabel: 'Fermer',
          sections: [
            {
              title: 'Utilisation des Cookies',
              description:
                'Nous utilisons des cookies pour garantir les fonctionnalités de base du site web et améliorer votre expérience en ligne. Vous pouvez choisir pour chaque catégorie d\'activer/désactiver à tout moment.',
            },
            {
              title: 'Cookies Strictement Nécessaires',
              description:
                'Ces cookies sont essentiels au bon fonctionnement du site web. Sans ces cookies, le site web ne fonctionnerait pas correctement.',
              linkedCategory: 'necessary',
            },
            {
              title: 'Cookies Analytiques',
              description:
                'Ces cookies collectent des informations sur la façon dont vous utilisez le site web, quelles pages vous avez visitées et sur quels liens vous avez cliqué. Toutes les données sont anonymisées et ne peuvent pas être utilisées pour vous identifier.',
              linkedCategory: 'analytics',
              cookieTable: {
                headers: {
                  name: 'Cookie',
                  domain: 'Domaine',
                  description: 'Description',
                  expiration: 'Expiration',
                },
                body: [
                  {
                    name: '_ga',
                    domain: 'lehavreaixois.com',
                    description: 'Utilisé pour distinguer les utilisateurs pour Google Analytics',
                    expiration: '2 ans',
                  },
                  {
                    name: '_gid',
                    domain: 'lehavreaixois.com',
                    description: 'Utilisé pour distinguer les utilisateurs pour Google Analytics',
                    expiration: '24 heures',
                  },
                ],
              },
            },
            {
              title: 'Plus d\'Informations',
              description:
                'Pour toute question concernant notre politique en matière de cookies et vos choix, veuillez <a href="#contact">nous contacter</a>. Lisez notre <a href="/privacy">Politique de Confidentialité</a> complète.',
            },
          ],
        },
      },
    },
  },
};
