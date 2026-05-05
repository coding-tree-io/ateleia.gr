# Post-Domain Launch Checklist

These items should be completed once the final production domain is known and ready to use.

- [x] Finalize baseline SEO after the real domain is available
  - Canonical origin is `https://ateleiatherapy.gr`
  - Production `index, follow` is enabled
  - Sitemap is filtered to public indexable pages only
  - Homepage structured data includes `WebSite`, service-area `LocalBusiness`, therapist `Person`, and `FAQPage`
  - Remaining manual check: validate the deployed URL in Google Search Console / Rich Results Test after deployment

- [ ] Reconfigure Form.taxi for the final domain
  - Confirm the Form.taxi form is configured for the production domain
  - Reconfirm delivery inbox and any allowed-origin/domain settings
  - Update `.env.example` and `.github/workflows/pages.yml` if the endpoint changes

- [ ] Reconfigure DecapBridge for the final domain
  - Update site URL / login URL assumptions in DecapBridge
  - Reconfirm the production admin URL and authentication flow
  - Recheck any domain-specific values used by `src/pages/admin/config.yml.ts`
