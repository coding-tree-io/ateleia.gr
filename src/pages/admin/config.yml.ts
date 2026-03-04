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

  const yaml = `${backendConfig}

publish_mode: simple
media_folder: public/images/uploads
public_folder: ${escapeYamlScalar(`${import.meta.env.BASE_URL}images/uploads`)}
${authConfig}

site_url: ${escapeYamlScalar(siteRootUrl)}
display_url: ${escapeYamlScalar(siteRootUrl)}
logo_url: ${escapeYamlScalar(logoUrl)}
editor:
  preview: false

collections:
  - name: services
    label: Υπηρεσίες
    label_singular: Υπηρεσία
    description: Επεξεργασία των κάρτων υπηρεσιών της αρχικής σελίδας.
    folder: src/data/services
    create: false
    delete: false
    extension: json
    format: json
    identifier_field: title
    summary: "{{title}}"
    fields:
      - { label: Σειρά εμφάνισης, name: order, widget: number, value_type: int, min: 0 }
      - { label: Τίτλος, name: title, widget: string }
      - { label: Περιγραφή, name: description, widget: text }
      - label: Ιδανικό για
        name: idealFor
        widget: list
        summary: "{{fields.value}}"
        field: { label: Σημείο, name: value, widget: string }
      - { label: Μορφή, name: format, widget: string, required: false }
      - { label: Διάρκεια, name: duration, widget: string, required: false }
      - label: Τι να περιμένετε
        name: whatToExpect
        widget: list
        summary: "{{fields.value}}"
        field: { label: Σημείο, name: value, widget: string }
`;

  return new Response(yaml, {
    headers: {
      'Content-Type': 'text/yaml; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
};
