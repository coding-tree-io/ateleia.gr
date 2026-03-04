import type { APIRoute } from 'astro';

export const prerender = true;

const defaultRepository = 'coding-tree-io/ateleia.gr';
const defaultBranch = 'main';
const defaultDecapBridgeBaseUrl = 'https://auth.decapbridge.com';
const defaultDecapBridgeAuthEndpoint = '/sites/1731d52f-3a01-4de9-8c6f-98598c438922/pkce';
const defaultDecapBridgeAuthTokenEndpoint = '/sites/1731d52f-3a01-4de9-8c6f-98598c438922/token';
const defaultDecapBridgeGatewayUrl = 'https://gateway.decapbridge.com';
const defaultLogoUrl = 'https://decapbridge.com/decapcms-with-bridge.svg';
const localBackendPort = '8082';
const localCmsPort = '4322';

function ensureTrailingSlash(value: string): string {
  return value.endsWith('/') ? value : `${value}/`;
}

function resolveSiteRootUrl(): string {
  const configuredSiteUrl = import.meta.env.DECAP_SITE_URL?.trim();
  if (!import.meta.env.DEV && configuredSiteUrl) {
    return ensureTrailingSlash(configuredSiteUrl);
  }

  const siteOrigin = import.meta.env.DEV ? `http://localhost:${localCmsPort}` : import.meta.env.SITE;
  return ensureTrailingSlash(new URL(import.meta.env.BASE_URL, siteOrigin).toString());
}

function escapeYamlScalar(value: string): string {
  return JSON.stringify(value);
}

export const GET: APIRoute = () => {
  const isLocalDevelopment = import.meta.env.DEV;
  const siteRootUrl = resolveSiteRootUrl();
  const branch = import.meta.env.DECAP_BRANCH?.trim() || defaultBranch;
  const repository = import.meta.env.DECAP_REPOSITORY?.trim() || defaultRepository;
  const baseUrl = import.meta.env.DECAPBRIDGE_BASE_URL?.trim() || defaultDecapBridgeBaseUrl;
  const authEndpoint =
    import.meta.env.DECAPBRIDGE_AUTH_ENDPOINT?.trim() || defaultDecapBridgeAuthEndpoint;
  const authTokenEndpoint =
    import.meta.env.DECAPBRIDGE_AUTH_TOKEN_ENDPOINT?.trim() || defaultDecapBridgeAuthTokenEndpoint;
  const gatewayUrl = import.meta.env.DECAPBRIDGE_GATEWAY_URL?.trim() || defaultDecapBridgeGatewayUrl;
  const logoUrl = import.meta.env.DECAP_LOGO_URL?.trim() || defaultLogoUrl;
  const backendConfig = isLocalDevelopment
    ? `# Local development uses the Decap proxy server. No DecapBridge login is required.
backend:
  name: proxy
  proxy_url: ${escapeYamlScalar(`http://127.0.0.1:${localBackendPort}/api/v1`)}
  branch: ${escapeYamlScalar(branch)}`
    : `# Production uses DecapBridge PKCE.
backend:
  name: git-gateway
  repo: ${escapeYamlScalar(repository)}
  branch: ${escapeYamlScalar(branch)}
  auth_type: pkce
  base_url: ${escapeYamlScalar(baseUrl)}
  auth_endpoint: ${escapeYamlScalar(authEndpoint)}
  auth_token_endpoint: ${escapeYamlScalar(authTokenEndpoint)}
  gateway_url: ${escapeYamlScalar(gatewayUrl)}

  # See who did what (optional)
  commit_messages:
    create: "Create {{collection}} \\"{{slug}}\\" - {{author-name}} <{{author-login}}> via DecapBridge"
    update: "Update {{collection}} \\"{{slug}}\\" - {{author-name}} <{{author-login}}> via DecapBridge"
    delete: "Delete {{collection}} \\"{{slug}}\\" - {{author-name}} <{{author-login}}> via DecapBridge"
    uploadMedia: "Upload \\"{{path}}\\" - {{author-name}} <{{author-login}}> via DecapBridge"
    deleteMedia: "Delete \\"{{path}}\\" - {{author-name}} <{{author-login}}> via DecapBridge"
    openAuthoring: "Message {{message}} - {{author-name}} <{{author-login}}> via DecapBridge"`;
  const authConfig = isLocalDevelopment
    ? ''
    : `

# PKCE identity mapping (recommended)
auth:
  email_claim: email
  first_name_claim: first_name
  last_name_claim: last_name
  avatar_url_claim: avatar_url`;
  const siteContentFields = `
      - name: site-content
        label: Περιεχόμενο ιστοσελίδας
        description: Επεξεργασία του βασικού κειμενικού περιεχομένου της αρχικής σελίδας, της πλοήγησης και του footer.
        file: src/data/site-content.json
        fields:
          - label: SEO
            name: seo
            widget: object
            fields:
              - { label: Τίτλος σελίδας, name: pageTitle, widget: string, hint: Ο τίτλος που εμφανίζεται στον browser και στα αποτελέσματα αναζήτησης. }
              - { label: Περιγραφή σελίδας, name: pageDescription, widget: text, hint: Η βασική meta περιγραφή της αρχικής σελίδας. }
              - { label: Open Graph τίτλος, name: openGraphTitle, widget: string, hint: Ο τίτλος που εμφανίζεται όταν η σελίδα κοινοποιείται. }
              - { label: Open Graph περιγραφή, name: openGraphDescription, widget: text, hint: Η περιγραφή για κοινοποιήσεις και social previews. }
          - { label: Όνομα brand, name: brandName, widget: string, hint: Χρησιμοποιείται στην κεφαλίδα, στο footer και στα metadata. }
          - { label: Υπότιτλος brand, name: brandSubtitle, widget: string, hint: Εμφανίζεται δίπλα στο λογότυπο και στο κινητό μενού. }
          - label: Πλοήγηση
            name: navigation
            widget: object
            fields:
              - { label: Σύνδεσμος «Τι είναι», name: whatIs, widget: string }
              - { label: Σύνδεσμος «Σε ποιους απευθύνεται», name: whoIsItFor, widget: string }
              - { label: Σύνδεσμος «Σχετικά», name: about, widget: string }
              - { label: Σύνδεσμος «Υπηρεσίες», name: services, widget: string }
              - { label: Σύνδεσμος «Επικοινωνία», name: contact, widget: string }
          - label: Hero
            name: hero
            widget: object
            fields:
              - { label: Κεντρικός τίτλος, name: headline, widget: string }
              - { label: Εισαγωγικό κείμενο, name: subheadline, widget: text }
              - { label: Κύριο κουμπί, name: primaryCta, widget: string }
              - { label: Δευτερεύον κουμπί, name: secondaryCta, widget: string }
              - { label: Ετικέτα κάρτας, name: spotlightEyebrow, widget: string, hint: Το μικρό overline στην κάρτα δεξιά του hero. }
          - label: Ενότητα «Τι είναι»
            name: whatIs
            widget: object
            fields:
              - { label: Τίτλος ενότητας, name: title, widget: string }
              - label: Απόσπασμα
                name: pullQuote
                widget: object
                fields:
                  - { label: Κείμενο αποσπάσματος, name: text, widget: text }
                  - { label: Υπογραφή αποσπάσματος, name: attribution, widget: string }
              - label: Παράγραφοι
                name: paragraphs
                widget: list
                label_singular: Παράγραφος
                collapsed: true
                summary: "{{fields.value}}"
                hint: Κάθε παράγραφος εμφανίζεται ως ξεχωριστό κείμενο στη δεξιά στήλη.
                field: { label: Παράγραφος, name: value, widget: text }
              - { label: Ετικέτα πρακτικής σημείωσης, name: practiceNoteLabel, widget: string }
              - { label: Κείμενο πρακτικής σημείωσης, name: practiceNote, widget: text }
          - label: Ενότητα «Σε ποιους απευθύνεται»
            name: whoIsItFor
            widget: object
            fields:
              - { label: Τίτλος ενότητας, name: title, widget: string }
              - label: Στοιχεία λίστας
                name: items
                widget: list
                label_singular: Στοιχείο
                collapsed: true
                summary: "{{fields.value}}"
                field: { label: Στοιχείο, name: value, widget: text }
          - label: Ενότητα «Σχετικά»
            name: about
            widget: object
            fields:
              - { label: Τίτλος ενότητας, name: title, widget: string }
              - { label: Απόσπασμα, name: pullQuote, widget: text }
              - label: Παράγραφοι βιογραφικού
                name: bio
                widget: list
                label_singular: Παράγραφος
                collapsed: true
                summary: "{{fields.value}}"
                field: { label: Παράγραφος, name: value, widget: text }
              - label: Θεραπευτική προσέγγιση
                name: approach
                widget: object
                fields:
                  - { label: Τίτλος κάρτας, name: title, widget: string }
                  - { label: Περιγραφή κάρτας, name: description, widget: text }
          - label: Ενότητα υπηρεσιών
            name: servicesSection
            widget: object
            fields:
              - { label: Τίτλος ενότητας, name: title, widget: string }
              - { label: Ετικέτα κοινού, name: audienceLabel, widget: string, hint: Εμφανίζεται πριν από τη λίστα κοινού σε κάθε κάρτα υπηρεσίας. }
              - { label: Ετικέτα προσδοκιών, name: expectationsLabel, widget: string, hint: Εμφανίζεται στο βοηθητικό πλαίσιο κάθε κάρτας υπηρεσίας. }
              - { label: Τίτλος FAQ, name: frequentlyAskedQuestionsTitle, widget: string }
              - label: Συχνές ερωτήσεις
                name: frequentlyAskedQuestions
                widget: list
                label_singular: Ερώτηση
                summary: "{{fields.question}}"
                collapsed: true
                fields:
                  - { label: Ερώτηση, name: question, widget: string }
                  - { label: Απάντηση, name: answer, widget: text }
          - label: Ενότητα επικοινωνίας
            name: contact
            widget: object
            fields:
              - { label: Τίτλος ενότητας, name: title, widget: string }
              - { label: Περιγραφή, name: description, widget: text }
              - { label: Σημείωση διαθεσιμότητας, name: availabilityNote, widget: text }
              - { label: Σημείωση απορρήτου, name: privacyNote, widget: text }
              - label: Στοιχεία επικοινωνίας
                name: contactItems
                widget: list
                label_singular: Στοιχείο
                summary: "{{fields.label}}: {{fields.value}}"
                collapsed: true
                fields:
                  - { label: Ετικέτα, name: label, widget: string }
                  - { label: Τιμή, name: value, widget: string }
                  - { label: Σύνδεσμος, name: href, widget: string, hint: Π.χ. mailto:example@example.com ή tel:+30... }
              - label: Ετικέτες φόρμας
                name: formLabels
                widget: object
                fields:
                  - { label: Πεδίο ονόματος, name: name, widget: string }
                  - { label: Πεδίο email, name: email, widget: string }
                  - { label: Πεδίο μηνύματος, name: message, widget: string }
                  - { label: Κείμενο συναίνεσης, name: consent, widget: text }
                  - { label: Κουμπί αποστολής, name: submit, widget: string }
                  - { label: Ετικέτα υποχρεωτικού πεδίου, name: required, widget: string }
                  - { label: Κείμενο κατά την αποστολή, name: submitting, widget: string }
              - label: Placeholders φόρμας
                name: formPlaceholders
                widget: object
                fields:
                  - { label: Placeholder ονόματος, name: name, widget: string }
                  - { label: Placeholder email, name: email, widget: string }
                  - { label: Placeholder μηνύματος, name: message, widget: string }
              - label: Μηνύματα φόρμας
                name: formMessages
                widget: object
                fields:
                  - { label: Μη έγκυρη αποστολή, name: invalid, widget: text }
                  - { label: Κατάσταση αναμονής, name: pending, widget: text }
                  - { label: Επιτυχής αποστολή, name: success, widget: text }
                  - { label: Αποτυχία αποστολής, name: error, widget: text }
                  - { label: Μη διαθέσιμη φόρμα, name: unavailable, widget: text }
          - label: Footer
            name: footer
            widget: object
            fields:
              - { label: Κείμενο πνευματικών δικαιωμάτων, name: copyright, widget: string, required: false }
              - { label: Κείμενο «δικαιώματα», name: rightsReserved, widget: string }
              - { label: Ετικέτα «Credits», name: creditsLabel, widget: string }
              - { label: Ετικέτα «Legal», name: legalLabel, widget: string }`;

  const yaml = `${backendConfig}

publish_mode: simple
media_folder: public/images/uploads
public_folder: ${escapeYamlScalar(`${import.meta.env.BASE_URL}images/uploads`)}
${authConfig}

site_url: ${escapeYamlScalar(siteRootUrl)}
display_url: ${escapeYamlScalar(siteRootUrl)}
logo_url: ${escapeYamlScalar(logoUrl)}
editor:
  preview: true

collections:
  - name: homepage
    label: Αρχική σελίδα
    files:
${siteContentFields}
      - name: services
        label: Υπηρεσίες
        description: Επεξεργασία των καρτών υπηρεσιών της αρχικής σελίδας.
        file: src/data/services.json
        fields:
          - label: ΥΠΗΡΕΣΙΕΣ
            name: services
            widget: list
            label_singular: Υπηρεσία
            summary: "{{fields.title}}"
            hint: Προσθέστε, αφαιρέστε ή αλλάξτε τη σειρά των καρτών υπηρεσιών όπως θα εμφανιστούν στην αρχική σελίδα.
            collapsed: true
            fields:
              - {
                  label: Τίτλος,
                  name: title,
                  widget: string,
                  hint: Ο τίτλος που εμφανίζεται στην κάρτα της υπηρεσίας.
                }
              - {
                  label: Περιγραφή,
                  name: description,
                  widget: text,
                  hint: Σύντομη περιγραφή της υπηρεσίας.
                }
              - {
                  label: Μορφή,
                  name: format,
                  widget: string,
                  required: false,
                  hint: Προαιρετικό, π.χ. Δια ζώσης ή διαδικτυακά.
                }
              - {
                  label: Διάρκεια,
                  name: duration,
                  widget: string,
                  required: false,
                  hint: Προαιρετικό, π.χ. 50 λεπτά ανά συνεδρία.
                }
              - label: Σε ποιους απευθύνεται
                name: idealFor
                widget: list
                label_singular: Στοιχείο
                collapsed: true
                summary: "{{fields.value}}"
                hint: Προσθέστε σύντομα στοιχεία που περιγράφουν σε ποιους ανθρώπους απευθύνεται η υπηρεσία.
                field: { label: Στοιχείο, name: value, widget: string }
              - label: Τι να περιμένετε
                name: whatToExpect
                widget: list
                label_singular: Στοιχείο
                required: false
                collapsed: true
                summary: "{{fields.value}}"
                hint: Προαιρετικά στοιχεία που εμφανίζονται στο βοηθητικό πλαίσιο στο κάτω μέρος της κάρτας.
                field: { label: Στοιχείο, name: value, widget: string }
`;

  return new Response(yaml, {
    headers: {
      'Content-Type': 'text/yaml; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
};
