import { ArrowUpRight } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import type { TherapyAnnouncement } from '@/content/announcements';
import { therapyPracticeWebsiteContent } from '@/content/therapy-practice-website-content';

type AnnouncementsProps = {
  announcements: TherapyAnnouncement[];
};

type AnnouncementCardProps = {
  announcement: TherapyAnnouncement;
};

const kindLabelByAnnouncementKind = (
  kindLabels: typeof therapyPracticeWebsiteContent.announcementsSection.kindLabels,
  announcementKind: TherapyAnnouncement['kind'],
): string => {
  switch (announcementKind) {
    case 'workshop':
      return kindLabels.workshop;
    case 'group':
      return kindLabels.group;
    default:
      return kindLabels.announcement;
  }
};

const kindBadgeClassByAnnouncementKind = (announcementKind: TherapyAnnouncement['kind']): string => {
  switch (announcementKind) {
    case 'workshop':
      return 'therapy-announcements-kind-badge-workshop';
    case 'group':
      return 'therapy-announcements-kind-badge-group';
    default:
      return '';
  }
};

function AnnouncementCard({ announcement }: AnnouncementCardProps) {
  const { kindLabels } = therapyPracticeWebsiteContent.announcementsSection;
  const shouldRenderCallToAction = Boolean(announcement.callToActionLabel && announcement.callToActionHref);

  return (
    <Card asChild className="therapy-announcements-card group">
      <article>
        <div className="therapy-announcements-meta-row">
          {announcement.dateLabel ? (
            <p className="therapy-announcements-date-label">{announcement.dateLabel}</p>
          ) : (
            <span aria-hidden="true" />
          )}
          <Badge
            variant="secondary"
            className={`therapy-announcements-kind-badge ${kindBadgeClassByAnnouncementKind(announcement.kind)}`}
          >
            {kindLabelByAnnouncementKind(kindLabels, announcement.kind)}
          </Badge>
        </div>

        <h3 className="therapy-announcements-title">{announcement.title}</h3>
        <p className="therapy-announcements-summary">{announcement.summary}</p>

        {shouldRenderCallToAction ? (
          <a href={announcement.callToActionHref} className="therapy-announcements-link">
            <span>{announcement.callToActionLabel}</span>
            <ArrowUpRight className="size-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        ) : null}
      </article>
    </Card>
  );
}

export function Announcements({ announcements }: AnnouncementsProps) {
  if (announcements.length === 0) {
    return null;
  }

  const { announcementsSection } = therapyPracticeWebsiteContent;
  const hasSingleAnnouncement = announcements.length === 1;

  return (
    <section id="announcements" className="therapy-section-shell">
      <div className="therapy-section-content-width">
        <div className="max-w-2xl">
          <h2 className="therapy-announcements-heading">{announcementsSection.title}</h2>
          <p className="therapy-announcements-intro mt-3">{announcementsSection.intro}</p>
        </div>

        <div className={hasSingleAnnouncement ? 'mt-8 max-w-2xl' : 'mt-8 grid gap-4 md:grid-cols-2 md:gap-5'}>
          {announcements.map((announcement) => (
            <AnnouncementCard key={announcement.id} announcement={announcement} />
          ))}
        </div>
      </div>
    </section>
  );
}
