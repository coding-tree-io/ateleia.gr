import { getCollection } from 'astro:content';

export type TherapyAnnouncementKind = 'workshop' | 'group' | 'announcement';

export type TherapyAnnouncement = {
  id: string;
  title: string;
  summary: string;
  kind: TherapyAnnouncementKind;
  isPublished: boolean;
  dateLabel?: string;
  callToActionLabel?: string;
  callToActionHref?: string;
};

export async function getAnnouncements(): Promise<TherapyAnnouncement[]> {
  const announcements = await getCollection('announcements');

  return announcements
    .filter(({ data }) => data.isPublished)
    .sort((left, right) => left.data.id.localeCompare(right.data.id, 'en'))
    .map(({ data }) => {
      const announcement: TherapyAnnouncement = {
        id: data.id,
        title: data.title,
        summary: data.summary,
        kind: data.kind,
        isPublished: data.isPublished,
      };

      if (data.dateLabel) {
        announcement.dateLabel = data.dateLabel;
      }

      if (data.callToActionLabel) {
        announcement.callToActionLabel = data.callToActionLabel;
      }

      if (data.callToActionHref) {
        announcement.callToActionHref = data.callToActionHref;
      }

      return announcement;
    });
}
