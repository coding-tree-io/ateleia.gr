import { useState, type ComponentProps } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type ContactFormLabels = {
  name: string;
  email: string;
  message: string;
  consent: string;
  submit: string;
  required: string;
  submitting: string;
};

type ContactFormPlaceholders = {
  name: string;
  email: string;
  message: string;
};

type ContactFormMessages = {
  invalid: string;
  pending: string;
  success: string;
  error: string;
  unavailable: string;
};

type ContactFormProps = {
  formEndpoint: string;
  recipientEmail: string;
  subject: string;
  privacyNote: string;
  formLabels: ContactFormLabels;
  formPlaceholders: ContactFormPlaceholders;
  formMessages: ContactFormMessages;
};

type ContactFormSubmitEvent = Parameters<NonNullable<ComponentProps<'form'>['onSubmit']>>[0];

type SubmissionStatus =
  | {
      tone: 'pending' | 'success' | 'error';
      message: string;
    }
  | null;

const statusToneClassNameMap = {
  pending: 'therapy-form-status-message-pending',
  success: 'therapy-form-status-message-success',
  error: 'therapy-form-status-message-error',
} as const;

export function ContactForm({
  formEndpoint,
  recipientEmail,
  subject,
  privacyNote,
  formLabels,
  formPlaceholders,
  formMessages,
}: ContactFormProps) {
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasConfiguredEndpoint = formEndpoint.length > 0;

  async function handleSubmit(event: ContactFormSubmitEvent) {
    const formElement = event.currentTarget;

    if (!hasConfiguredEndpoint) {
      event.preventDefault();
      setSubmissionStatus({ tone: 'error', message: formMessages.unavailable });
      return;
    }

    if (!formElement.checkValidity()) {
      event.preventDefault();
      formElement.reportValidity();
      setSubmissionStatus({ tone: 'error', message: formMessages.invalid });
      return;
    }

    event.preventDefault();

    const formData = new FormData(formElement);
    if (formData.get('_honey')) {
      return;
    }

    setIsSubmitting(true);
    setSubmissionStatus({ tone: 'pending', message: formMessages.pending });

    try {
      const response = await fetch(formEndpoint, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      const responseData = await response.clone().json().catch(() => null);

      if (response.ok && responseData?.success !== false) {
        formElement.reset();
        setSubmissionStatus({ tone: 'success', message: formMessages.success });
      } else {
        setSubmissionStatus({
          tone: 'error',
          message: responseData?.message || responseData?.error_msg || formMessages.error,
        });
      }
    } catch {
      setSubmissionStatus({ tone: 'error', message: formMessages.error });
    } finally {
      setIsSubmitting(false);
    }
  }

  function clearSubmissionStatus() {
    if (!submissionStatus || isSubmitting) {
      return;
    }

    setSubmissionStatus(null);
  }

  const statusToneClassName = submissionStatus ? statusToneClassNameMap[submissionStatus.tone] : '';

  return (
    <div className="therapy-form-shell">
      <form
        className="space-y-5"
        action={hasConfiguredEndpoint ? formEndpoint : undefined}
        method="POST"
        acceptCharset="UTF-8"
        onInput={clearSubmissionStatus}
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="_subject" value={subject} />
        <input type="hidden" name="_honey" value="" />

        <div className="space-y-2">
          <label
            htmlFor="contact-name"
            className="therapy-form-field-label"
          >
            {formLabels.name}
          </label>
          <Input
            id="contact-name"
            name="name"
            autoComplete="name"
            minLength={2}
            required
            placeholder={formPlaceholders.name}
            className="therapy-form-field-control"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="contact-email"
            className="therapy-form-field-label"
          >
            {formLabels.email}
          </label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder={formPlaceholders.email}
            className="therapy-form-field-control"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="contact-message"
            className="therapy-form-field-label"
          >
            {formLabels.message}
          </label>
          <Textarea
            id="contact-message"
            name="message"
            minLength={10}
            maxLength={1000}
            required
            placeholder={formPlaceholders.message}
            className="therapy-form-field-control min-h-32"
          />
        </div>

        <label className="therapy-form-consent-row">
          <input
            type="checkbox"
            name="consent"
            required
            className="peer sr-only"
          />
          <span className="therapy-form-consent-checkbox-shell" aria-hidden="true">
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M5.5 12.5 10 17l8.5-9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="therapy-form-consent-copy">
            <span className="therapy-form-consent-required-label">{formLabels.required}</span>
            <span className="therapy-form-consent-text">{formLabels.consent}</span>
          </span>
        </label>

        {!hasConfiguredEndpoint ? (
          <p className="therapy-form-unavailable-note">
            {formMessages.unavailable}{' '}
            <a
              href={`mailto:${recipientEmail}`}
              className="font-semibold text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary"
            >
              {recipientEmail}
            </a>
          </p>
        ) : null}

        <Button
          type="submit"
          disabled={isSubmitting || !hasConfiguredEndpoint}
          className="therapy-primary-call-to-action w-full text-base"
        >
          {isSubmitting ? formLabels.submitting : formLabels.submit}
        </Button>
      </form>

      <p className={`therapy-form-status-message ${statusToneClassName}`} role="status" aria-live="polite">
        {submissionStatus?.message ?? ' '}
      </p>

      <p className="therapy-form-privacy-note">
        {privacyNote}
      </p>
    </div>
  );
}
