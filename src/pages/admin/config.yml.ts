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
  const siteGlobalFields = `
      - name: site-global
        label: 01 · Ονομα site, SEO & μενού
        description: Ονομα site, Google, μενού και footer.
        file: src/data/site-global.json
        fields:
          - label: Google & κοινοποίηση
            name: seo
            widget: object
            fields:
              - { label: Τίτλος καρτέλας / Google, name: pageTitle, widget: string, hint: "Εμφανίζεται: browser tab και αποτελέσματα αναζήτησης." }
              - { label: Περιγραφή για Google, name: pageDescription, widget: text, hint: "Εμφανίζεται: meta description και social snippet." }
              - { label: Τίτλος κοινοποίησης, name: openGraphTitle, widget: string, hint: "Εμφανίζεται: preview όταν μοιράζεστε το site." }
              - { label: Περιγραφή κοινοποίησης, name: openGraphDescription, widget: text, hint: "Εμφανίζεται: κείμενο preview σε apps και social links." }
          - { label: Ονομα που φαίνεται στο site, name: brandName, widget: string, hint: "Εμφανίζεται: header, footer και metadata." }
          - { label: Υπότιτλος κάτω από το όνομα, name: brandSubtitle, widget: string, hint: "Εμφανίζεται: δίπλα στο brand στο header και στο mobile menu." }
          - label: Μενού
            name: navigation
            widget: object
            fields:
              - { label: Κείμενο μενού για «Τι είναι», name: whatIs, widget: string, pattern: ['^.{1,32}$', "Χρησιμοποιήστε έως 32 χαρακτήρες για να χωράει στο μενού."], hint: "Σύντομη ετικέτα. Εμφανίζεται: header, mobile menu και footer." }
              - { label: Κείμενο μενού για «Σε ποιους απευθύνεται», name: whoIsItFor, widget: string, pattern: ['^.{1,32}$', "Χρησιμοποιήστε έως 32 χαρακτήρες για να χωράει στο μενού."], hint: "Σύντομη ετικέτα. Εμφανίζεται: header, mobile menu και footer." }
              - { label: Κείμενο μενού για «Σχετικά», name: about, widget: string, pattern: ['^.{1,32}$', "Χρησιμοποιήστε έως 32 χαρακτήρες για να χωράει στο μενού."], hint: "Σύντομη ετικέτα. Εμφανίζεται: header, mobile menu και footer." }
              - { label: Κείμενο μενού για «Υπηρεσίες», name: services, widget: string, pattern: ['^.{1,32}$', "Χρησιμοποιήστε έως 32 χαρακτήρες για να χωράει στο μενού."], hint: "Σύντομη ετικέτα. Εμφανίζεται: header, mobile menu και footer." }
              - { label: Κείμενο μενού για «Επικοινωνία», name: contact, widget: string, pattern: ['^.{1,32}$', "Χρησιμοποιήστε έως 32 χαρακτήρες για να χωράει στο μενού."], hint: "Σύντομη ετικέτα. Εμφανίζεται: header, mobile menu και footer." }
          - label: Footer
            name: footer
            widget: object
            fields:
              - { label: Πρώτη γραμμή footer, name: copyright, widget: string, required: false, hint: "Εμφανίζεται: πρώτη γραμμή στο κάτω μέρος του site." }
              - { label: Δεύτερη γραμμή footer, name: rightsReserved, widget: string, hint: "Εμφανίζεται: δεύτερη γραμμή στο κάτω μέρος του site." }
              - { label: Κείμενο συνδέσμου «Credits», name: creditsLabel, widget: string, hint: "Εμφανίζεται: σύνδεσμος credits στο footer." }
              - { label: Κείμενο συνδέσμου «Legal», name: legalLabel, widget: string, hint: "Εμφανίζεται: σύνδεσμος legal στο footer." }`;
  const heroFields = `
      - name: hero
        label: 01 · Κορυφή αρχικής
        description: Τίτλος, κείμενο και κουμπιά της πρώτης οθόνης.
        file: src/data/hero.json
        fields:
          - { label: Κύριος τίτλος στην κορυφή, name: headline, widget: string, hint: "Εμφανίζεται: ο μεγαλύτερος τίτλος της αρχικής σελίδας." }
          - { label: Κείμενο κάτω από τον τίτλο, name: subheadline, widget: text, hint: "Εμφανίζεται: ακριβώς κάτω από τον κύριο τίτλο." }
          - { label: Κείμενο πρώτου κουμπιού, name: primaryCta, widget: string, hint: "Εμφανίζεται: το βασικό κόκκινο κουμπί του hero." }
          - { label: Κείμενο δεύτερου κουμπιού, name: secondaryCta, widget: string, hint: "Εμφανίζεται: το δεύτερο κουμπί δίπλα στο βασικό CTA." }
          - { label: Μικρή ετικέτα στη δεξιά κάρτα, name: spotlightEyebrow, widget: string, hint: "Εμφανίζεται: μικρό overline στο δεξί πλαίσιο του hero." }`;
  const whatIsFields = `
      - name: what-is
        label: 02 · Τι είναι
        description: Η πρώτη επεξηγηματική ενότητα μετά το hero.
        file: src/data/what-is.json
        fields:
          - { label: Τίτλος ενότητας, name: title, widget: string, hint: "Εμφανίζεται: τίτλος της ενότητας αμέσως μετά το hero." }
          - label: Απόσπασμα που ξεχωρίζει
            name: pullQuote
            widget: object
            fields:
              - { label: Κείμενο αποσπάσματος, name: text, widget: text, hint: "Εμφανίζεται: σε quote styling στην αριστερή στήλη." }
              - { label: Μικρή υπογραφή κάτω από το απόσπασμα, name: attribution, widget: string, hint: "Εμφανίζεται: ακριβώς κάτω από το απόσπασμα." }
          - label: Παράγραφοι
            name: paragraphs
            widget: list
            label_singular: Παράγραφος
            collapsed: true
            summary: "{{fields.value}}"
            hint: "Εμφανίζεται: το κύριο κείμενο της ενότητας."
            field: { label: Παράγραφος, name: value, widget: text }
          - { label: Μικρή ετικέτα του κάτω πλαισίου, name: practiceNoteLabel, widget: string, hint: "Εμφανίζεται: πριν από το πρακτικό πλαίσιο στο τέλος της ενότητας." }
          - { label: Κείμενο μέσα στο κάτω πλαίσιο, name: practiceNote, widget: text, hint: "Εμφανίζεται: μέσα στο βοηθητικό πλαίσιο της ενότητας." }`;
  const whoIsItForFields = `
      - name: who-is-it-for
        label: 03 · Σε ποιους απευθύνεται
        description: Η σύντομη λίστα κοινού της ενότητας.
        file: src/data/who-is-it-for.json
        fields:
          - { label: Τίτλος ενότητας, name: title, widget: string, hint: "Εμφανίζεται: τίτλος της ενότητας κοινού." }
          - label: Σημεία
            name: items
            widget: list
            label_singular: Σημείο
            collapsed: true
            summary: "{{fields.value}}"
            hint: "Εμφανίζεται: η λίστα της ενότητας."
            field: { label: Κείμενο, name: value, widget: text }`;
  const aboutFields = `
      - name: about
        label: 04 · Σχετικά
        description: Βιογραφικό κείμενο και κάρτα προσέγγισης.
        file: src/data/about.json
        fields:
          - { label: Τίτλος ενότητας, name: title, widget: string, hint: "Εμφανίζεται: κύριος τίτλος της ενότητας." }
          - label: Φωτογραφία θεραπεύτριας
            name: portrait
            widget: object
            required: false
            collapsed: false
            hint: "Εμφανίζεται: δίπλα στο βιογραφικό κείμενο της ενότητας."
            fields:
              - { label: Αρχείο εικόνας, name: src, widget: image, required: false, choose_url: false, hint: "Ανεβάστε ή επιλέξτε τη φωτογραφία που θα εμφανίζεται στη σελίδα." }
              - { label: Περιγραφή για αναγνώστες οθόνης, name: alt, widget: string, required: false, hint: "Σύντομη περιγραφή της φωτογραφίας, για προσβασιμότητα." }
              - { label: Λεζάντα κάτω από τη φωτογραφία, name: caption, widget: string, required: false, hint: "Προαιρετικό μικρό κείμενο κάτω από τη φωτογραφία." }
          - { label: Απόσπασμα που ξεχωρίζει, name: pullQuote, widget: text, hint: "Εμφανίζεται: ως κεντρικό απόσπασμα πριν από τα βιογραφικά κείμενα." }
          - label: Παράγραφοι
            name: bio
            widget: list
            label_singular: Παράγραφος
            collapsed: true
            summary: "{{fields.value}}"
            hint: "Εμφανίζεται: το κύριο βιογραφικό κείμενο."
            field: { label: Παράγραφος, name: value, widget: text }
          - label: Κάρτα θεραπευτικής προσέγγισης
            name: approach
            widget: object
            fields:
              - { label: Τίτλος κάρτας, name: title, widget: string, hint: "Εμφανίζεται: μικρός τίτλος της κάρτας δεξιά." }
              - { label: Κείμενο κάρτας, name: description, widget: text, hint: "Εμφανίζεται: μέσα στην κάρτα προσέγγισης." }`;
  const servicesFields = `
      - name: services
        label: 01 · Υπηρεσίες
        description: Κάρτες υπηρεσιών και συχνές ερωτήσεις.
        file: src/data/services.json
        fields:
          - { label: Τίτλος ενότητας, name: title, widget: string, hint: "Εμφανίζεται: κύριος τίτλος της ενότητας υπηρεσιών." }
          - { label: Μικρή ετικέτα πριν από το κοινό κάθε υπηρεσίας, name: audienceLabel, widget: string, hint: "Εμφανίζεται: πριν από τη λίστα «Ιδανικό για» σε κάθε κάρτα." }
          - { label: Μικρή ετικέτα πριν από το βοηθητικό πλαίσιο, name: expectationsLabel, widget: string, hint: "Εμφανίζεται: πάνω από το πλαίσιο «Τι να περιμένετε» σε κάθε κάρτα." }
          - { label: Τίτλος συχνών ερωτήσεων, name: frequentlyAskedQuestionsTitle, widget: string, hint: "Εμφανίζεται: πάνω από το FAQ στο τέλος της ενότητας." }
          - label: Ερωτήσεις
            name: frequentlyAskedQuestions
            widget: list
            label_singular: Ερώτηση
            summary: "{{fields.question}}"
            hint: "Εμφανίζεται: το FAQ στο τέλος της ενότητας."
            collapsed: true
            fields:
              - { label: Ερώτηση, name: question, widget: string, hint: "Εμφανίζεται: τίτλος του accordion item." }
              - { label: Απάντηση, name: answer, widget: text, hint: "Εμφανίζεται: όταν ο επισκέπτης ανοίγει την ερώτηση." }
          - label: Υπηρεσίες
            name: services
            widget: list
            label_singular: Υπηρεσία
            summary: "{{fields.title}}"
            hint: "Εμφανίζεται: οι κάρτες υπηρεσιών με τη σειρά που ορίζετε εδώ."
            collapsed: true
            fields:
              - { label: Τίτλος κάρτας, name: title, widget: string, hint: "Εμφανίζεται: τίτλος της κάρτας υπηρεσίας." }
              - { label: Περιγραφή κάρτας, name: description, widget: text, hint: "Εμφανίζεται: ακριβώς κάτω από τον τίτλο." }
              - { label: Μορφή συνεδρίας (προαιρετικό), name: format, widget: string, required: false, hint: "Εμφανίζεται: σύντομη πληροφορία μέσα στην κάρτα." }
              - { label: Διάρκεια συνεδρίας (προαιρετικό), name: duration, widget: string, required: false, hint: "Εμφανίζεται: δίπλα στη μορφή συνεδρίας." }
              - label: Περιπτώσεις
                name: idealFor
                widget: list
                label_singular: Περίπτωση
                required: false
                collapsed: true
                summary: "{{fields.value}}"
                hint: "Εμφανίζεται: κάτω από το «Ιδανικό για»."
                field: { label: Κείμενο, name: value, widget: string }
              - label: Στοιχεία
                name: whatToExpect
                widget: list
                label_singular: Στοιχείο
                required: false
                collapsed: true
                summary: "{{fields.value}}"
                hint: "Εμφανίζεται: στο πλαίσιο «Τι να περιμένετε»."
                field: { label: Κείμενο, name: value, widget: string }`;
  const announcementsFields = `
      - name: announcements
        label: 02 · Νέα & ανακοινώσεις
        description: Μικρές ενημερώσεις που εμφανίζονται χαμηλά στην αρχική.
        file: src/data/announcements.json
        fields:
          - { label: Τίτλος ενότητας, name: title, widget: string, hint: "Εμφανίζεται: κύριος τίτλος της ενότητας ανακοινώσεων." }
          - { label: Εισαγωγικό κείμενο, name: intro, widget: text, hint: "Εμφανίζεται: ακριβώς κάτω από τον τίτλο της ενότητας." }
          - label: Ετικέτες τύπων
            name: kindLabels
            widget: object
            fields:
              - { label: Badge για εργαστήριο, name: workshop, widget: string, hint: "Εμφανίζεται: επάνω στις κάρτες εργαστηρίων." }
              - { label: Badge για ομάδα, name: group, widget: string, hint: "Εμφανίζεται: επάνω στις κάρτες ομάδων." }
              - { label: Badge για ανακοίνωση, name: announcement, widget: string, hint: "Εμφανίζεται: επάνω στις γενικές ανακοινώσεις." }
          - label: Κάρτες
            name: announcements
            widget: list
            label_singular: Ανακοίνωση
            summary: "{{fields.title}}"
            hint: "Εμφανίζεται: οι κάρτες ανακοινώσεων της αρχικής."
            collapsed: true
            fields:
              - { label: Τίτλος κάρτας, name: title, widget: string, hint: "Εμφανίζεται: τίτλος της κάρτας ανακοίνωσης." }
              - { label: Σύντομη περιγραφή, name: summary, widget: text, hint: "Εμφανίζεται: βασικό κείμενο μέσα στην κάρτα." }
              - label: Τύπος ανακοίνωσης
                name: kind
                widget: select
                options:
                  - { label: Βιωματικό εργαστήριο, value: workshop }
                  - { label: Ομάδα, value: group }
                  - { label: Ανακοίνωση, value: announcement }
              - { label: Μικρή χρονική ένδειξη (προαιρετικό), name: dateLabel, widget: string, required: false, hint: "Εμφανίζεται: πάνω από την κάρτα, π.χ. Μάιος 2026." }
              - { label: Κείμενο μικρού συνδέσμου (προαιρετικό), name: callToActionLabel, widget: string, required: false, hint: "Εμφανίζεται: μικρό CTA στο κάτω μέρος της κάρτας." }
              - { label: Προορισμός συνδέσμου (προαιρετικό), name: callToActionHref, widget: string, required: false, hint: "Π.χ. #contact ή πλήρης διεύθυνση." }
              - { label: Δημοσιευμένο, name: isPublished, widget: boolean, default: true, required: false }`;
  const contactFields = `
      - name: contact
        label: 01 · Στοιχεία επικοινωνίας & φόρμα
        description: Στοιχεία επικοινωνίας και κείμενα φόρμας.
        file: src/data/contact.json
        fields:
          - { label: Τίτλος ενότητας, name: title, widget: string, hint: "Εμφανίζεται: τίτλος της ενότητας επικοινωνίας." }
          - { label: Περιγραφή κάτω από τον τίτλο, name: description, widget: text, hint: "Εμφανίζεται: ακριβώς κάτω από τον τίτλο της ενότητας." }
          - { label: Μικρή σημείωση χρόνου απάντησης, name: availabilityNote, widget: text, hint: "Εμφανίζεται: δίπλα στη φόρμα." }
          - { label: Σύντομη ενημέρωση απορρήτου, name: privacyNote, widget: text, hint: "Εμφανίζεται: κάτω από τη φόρμα." }
          - label: Στοιχεία
            name: contactItems
            widget: list
            label_singular: Στοιχείο
            summary: "{{fields.label}}: {{fields.value}}"
            hint: "Εμφανίζεται: η λίστα επικοινωνίας."
            collapsed: true
            fields:
              - { label: Μικρός τίτλος, name: label, widget: string, hint: "Εμφανίζεται: πριν από το κείμενο του στοιχείου." }
              - { label: Ορατό κείμενο, name: value, widget: string, hint: "Εμφανίζεται: ως το βασικό κείμενο του στοιχείου." }
              - { label: Σύνδεσμος, name: href, widget: string, hint: "Π.χ. mailto:example@example.com ή tel:+30..." }
          - label: Ετικέτες φόρμας
            name: formLabels
            widget: object
            fields:
              - { label: Ετικέτα πεδίου ονόματος, name: name, widget: string, hint: "Εμφανίζεται: πάνω από το πεδίο ονόματος." }
              - { label: Ετικέτα πεδίου email, name: email, widget: string, hint: "Εμφανίζεται: πάνω από το πεδίο email." }
              - { label: Ετικέτα πεδίου μηνύματος, name: message, widget: string, hint: "Εμφανίζεται: πάνω από το πεδίο μηνύματος." }
              - { label: Κείμενο συναίνεσης, name: consent, widget: text, hint: "Εμφανίζεται: δίπλα στο checkbox συναίνεσης." }
              - { label: Κείμενο κουμπιού αποστολής, name: submit, widget: string, hint: "Εμφανίζεται: πάνω στο κουμπί submit." }
              - { label: Κείμενο όσο στέλνει, name: submitting, widget: string, hint: "Εμφανίζεται: όσο η φόρμα στέλνει το μήνυμα." }
          - label: Placeholders φόρμας
            name: formPlaceholders
            widget: object
            fields:
              - { label: Placeholder ονόματος, name: name, widget: string, hint: "Εμφανίζεται: μέσα στο πεδίο ονόματος." }
              - { label: Placeholder email, name: email, widget: string, hint: "Εμφανίζεται: μέσα στο πεδίο email." }
              - { label: Placeholder μηνύματος, name: message, widget: string, hint: "Εμφανίζεται: μέσα στο πεδίο μηνύματος." }
          - label: Μηνύματα φόρμας
            name: formMessages
            widget: object
            fields:
              - { label: Μήνυμα για λάθος συμπλήρωση, name: invalid, widget: text, hint: "Εμφανίζεται: όταν λείπουν ή είναι λάθος τα υποχρεωτικά πεδία." }
              - { label: Μήνυμα αναμονής, name: pending, widget: text, hint: "Εμφανίζεται: όσο η αποστολή εκτελείται." }
              - { label: Μήνυμα επιτυχίας, name: success, widget: text, hint: "Εμφανίζεται: μετά από επιτυχημένη αποστολή." }
              - { label: Μήνυμα αποτυχίας, name: error, widget: text, hint: "Εμφανίζεται: αν η αποστολή αποτύχει." }
              - { label: Μήνυμα μη διαθέσιμης φόρμας, name: unavailable, widget: text, hint: "Εμφανίζεται: όταν το endpoint αποστολής δεν είναι διαθέσιμο." }`;
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
  - name: site-foundation
    label: 01 · Σταθερά στοιχεία site
    description: "Οσα εμφανίζονται σε όλο το site."
    files:
${siteGlobalFields}
  - name: homepage-sections
    label: 02 · Ροή αρχικής σελίδας
    description: "Οι βασικές ενότητες της αρχικής."
    files:
${heroFields}
${whatIsFields}
${whoIsItForFields}
${aboutFields}
  - name: practice-content
    label: 03 · Υπηρεσίες & ανακοινώσεις
    description: "Οι επαναλαμβανόμενες κάρτες της αρχικής."
    files:
${servicesFields}
${announcementsFields}
  - name: contact-form
    label: 04 · Επικοινωνία & φόρμα
    description: "Επικοινωνία και φόρμα."
    files:
${contactFields}
`;

  return new Response(yaml, {
    headers: {
      'Content-Type': 'text/yaml; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
};
