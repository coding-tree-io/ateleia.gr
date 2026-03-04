/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_CONTACT_FORM_ENDPOINT?: string;
  readonly DECAP_REPOSITORY?: string;
  readonly DECAP_BRANCH?: string;
  readonly DECAP_SITE_URL?: string;
  readonly DECAP_LOGO_URL?: string;
  readonly DECAPBRIDGE_BASE_URL?: string;
  readonly DECAPBRIDGE_AUTH_ENDPOINT?: string;
  readonly DECAPBRIDGE_AUTH_TOKEN_ENDPOINT?: string;
  readonly DECAPBRIDGE_GATEWAY_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
