import { getPrimaryContactEmail } from '@/config/contact';

const privacyContactEmail = getPrimaryContactEmail();

export const therapyPracticeLegalContent = {
  pageTitle: 'Privacy & Legal Notice',
  pageDescription:
    'Privacy notice and basic legal information for the Ateleia website and contact form.',
  heading: 'Privacy & Legal Notice',
  introduction:
    'This page explains how Ateleia handles personal data submitted through this website and outlines the basic legal terms that apply to its content.',
  sections: [
    {
      title: '1. Data controller',
      paragraphs: ['Ateleia operates this website and acts as the controller for personal data submitted through its contact form.'],
    },
    {
      title: '2. Data collected',
      paragraphs: [
        'When you use the contact form, the website may collect your full name, email address, message content, and your confirmation that you consent to be contacted.',
      ],
    },
    {
      title: '3. Purpose and legal basis',
      paragraphs: [
        'This data is used only to review and respond to your inquiry, arrange follow-up communication, and protect the site from spam or abusive submissions.',
        'The legal basis is the data subject’s request for pre-contractual communication and the legitimate interest of responding to contact requests.',
      ],
    },
    {
      title: '4. Processors and delivery services',
      paragraphs: [
        'Form submissions are delivered through Form.taxi, which acts as a technical processor for contact-form delivery.',
      ],
    },
    {
      title: '5. Retention',
      paragraphs: [
        'Messages are retained only for as long as necessary to review, respond to, and reasonably follow up on the original inquiry.',
      ],
    },
    {
      title: '6. Your rights',
      paragraphs: [
        'You may request access, correction, or deletion of personal data connected to your inquiry by writing to the privacy contact below.',
        'You may also contact the competent data protection authority if you believe your data has been handled improperly.',
      ],
    },
    {
      title: '7. Cookies and analytics',
      paragraphs: [
        'At this stage, this website does not describe any analytics or advertising stack as part of this notice. If that changes, this page should be updated before such tooling is used.',
      ],
    },
    {
      title: '8. Intellectual property and credits',
      paragraphs: [
        'Website design, copy, and branding remain protected. Third-party artwork or assets are credited where required, including on the dedicated credits page.',
      ],
    },
    {
      title: '9. Privacy contact',
      paragraphs: [`Privacy requests can be sent to ${privacyContactEmail}.`],
    },
    {
      title: '10. Updates',
      paragraphs: [
        'This notice may be updated as the website, contact workflow, or legal requirements change.',
      ],
    },
  ],
} as const;
