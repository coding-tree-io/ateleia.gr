import { therapyPracticeWebsiteContent } from '@/content/therapy-practice-website-content';
import { AbstractFace, OrganicDivider } from '@/components/decorative/ArtShapes';
import { ParallaxLayer } from '@/components/decorative/ParallaxLayer';
import { Card } from '@/components/ui/card';
import { createProjectRelativeUrl } from '@/config/site-branding';

function createContentImageUrl(source: string): string {
  const trimmedSource = source.trim();

  if (!trimmedSource) {
    return '';
  }

  if (/^(?:https?:|data:|blob:)/.test(trimmedSource)) {
    return trimmedSource;
  }

  const baseUrl = import.meta.env.BASE_URL;
  const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const normalizedBasePath = normalizedBaseUrl.replace(/^\/+/, '');
  const normalizedSource = trimmedSource.replace(/^\/+/, '').replace(/^public\//, '');
  const projectRelativeSource = normalizedSource.startsWith(normalizedBasePath)
    ? normalizedSource.slice(normalizedBasePath.length)
    : normalizedSource;

  return createProjectRelativeUrl(projectRelativeSource);
}

export function About() {
  const { about } = therapyPracticeWebsiteContent;
  const portraitSource = about.portrait?.src?.trim() ?? '';
  const portraitImageUrl = portraitSource ? createContentImageUrl(portraitSource) : '';
  const portraitCaption = about.portrait?.caption?.trim() ?? '';
  const portraitAlt = about.portrait?.alt?.trim() || portraitCaption || about.title;
  const layoutClassName = portraitImageUrl
    ? 'therapy-section-content-width therapy-about-layout therapy-about-layout--with-portrait'
    : 'therapy-section-content-width therapy-about-layout';

  return (
    <section id="about" className="therapy-section-shell">
      <ParallaxLayer speed={0.16} className="absolute -left-8 top-4 w-[170px] opacity-45 md:-left-20 md:top-2 md:w-[440px] md:opacity-100">
        <AbstractFace />
      </ParallaxLayer>

      <div className={layoutClassName}>
        <div className="therapy-about-heading-block">
          <h2 className="therapy-section-heading">
            {about.title}
          </h2>

          <OrganicDivider className="my-8 h-4 w-40 md:w-44" />
        </div>

        {portraitImageUrl ? (
          <Card asChild className="therapy-about-portrait-frame">
            <figure>
              <img
                src={portraitImageUrl}
                alt={portraitAlt}
                width={1066}
                height={1600}
                loading="lazy"
                decoding="async"
                className="therapy-about-portrait-image"
              />
              {portraitCaption ? (
                <figcaption className="therapy-about-portrait-caption">{portraitCaption}</figcaption>
              ) : null}
            </figure>
          </Card>
        ) : null}

        <div className="therapy-about-bio">
          {about.bio.map((paragraph, index) => (
            <p
              key={`${index}-${paragraph.slice(0, 24)}`}
              className="therapy-section-paragraph"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <aside className="therapy-about-insight-stack">
          <Card
            asChild
            className="therapy-surface-paper-card therapy-about-quote-card"
          >
            <blockquote>
              «{about.pullQuote}»
            </blockquote>
          </Card>

          <Card asChild className="therapy-surface-soft-card therapy-about-approach-card">
            <div>
              <h3 className="font-serif text-2xl font-semibold text-foreground">{about.approach.title}</h3>
              <p className="therapy-section-supporting-copy mt-4">
                {about.approach.description}
              </p>
            </div>
          </Card>
        </aside>
      </div>
    </section>
  );
}
