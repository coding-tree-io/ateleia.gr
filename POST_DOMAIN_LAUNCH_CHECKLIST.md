# Post-Domain Launch Checklist

These items should be completed once the final production domain is known and ready to use.

- [ ] Finalize SEO after the real domain is available
  - Update canonical origin in `src/config/site-metadata.ts`
  - Switch temporary `noindex, nofollow` off
  - Recheck `robots.txt`, sitemap, canonical tags, and structured data on the live domain

- [ ] Reconfigure Form.taxi for the final domain
  - Confirm the Form.taxi form is configured for the production domain
  - Reconfirm delivery inbox and any allowed-origin/domain settings
  - Update `.env.example` and `.github/workflows/pages.yml` if the endpoint changes

- [ ] Reconfigure DecapBridge for the final domain
  - Update site URL / login URL assumptions in DecapBridge
  - Reconfirm the production admin URL and authentication flow
  - Recheck any domain-specific values used by `src/pages/admin/config.yml.ts`
