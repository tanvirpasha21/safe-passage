import { useState } from 'react';
import ev from '../styles/EnterpriseVisa.module.css';

/**
 * LeadCaptureModal
 *
 * Props:
 *   title       — modal heading
 *   subtitle    — description text below heading
 *   ctaLabel    — submit button label
 *   successText — body text shown after submission
 *   successCta  — { label, href } | null — if set, show a link button after success
 *   onSuccess   — callback fired after successful submission (to start the next step)
 *   onClose     — callback fired when the modal is dismissed
 *   source      — string sent to the API to identify which page triggered the lead
 */
export default function LeadCaptureModal({
  title       = 'Before you continue',
  subtitle    = 'Share a few quick details so we can follow up with personalised guidance on your Innovator Founder Visa journey.',
  ctaLabel    = 'Continue →',
  successText = 'Your details have been saved.',
  successCta  = null,
  onSuccess   = null,
  onClose,
  source      = 'SafePassage',
}) {
  const [form, setForm]       = useState({ name: '', email: '', phone: '', businessName: '' });
  const [submitting, setSub]  = useState(false);
  const [error, setError]     = useState('');
  const [done, setDone]       = useState(false);

  const up = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      setError('Please fill in your name, email and phone number.');
      return;
    }
    setSub(true);
    try {
      await fetch('/api/mvp-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source }),
      });
      setDone(true);
      if (onSuccess) onSuccess(form);
    } catch {
      setError('Something went wrong — please try again.');
    } finally {
      setSub(false);
    }
  };

  return (
    <div
      className={ev.modalOverlay}
      onClick={e => { if (e.target === e.currentTarget && onClose) onClose(); }}
    >
      <div className={ev.modalCard} role="dialog" aria-modal="true" aria-labelledby="lead-modal-title">
        {onClose && (
          <button className={ev.modalClose} onClick={onClose} aria-label="Close">✕</button>
        )}

        {done ? (
          <div className={ev.modalSuccess}>
            <span className={ev.modalSuccessIcon}>🎉</span>
            <div className={ev.modalSuccessTitle}>You are all set!</div>
            <div className={ev.modalSuccessText}>{successText}</div>
            {successCta && (
              <a
                href={successCta.href}
                target="_blank"
                rel="noopener noreferrer"
                className={ev.modalSuccessBtn}
              >
                {successCta.label}
              </a>
            )}
          </div>
        ) : (
          <>
            <div className={ev.modalTag}>Free Tool — No Registration Required</div>
            <div id="lead-modal-title" className={ev.modalTitle}>{title}</div>
            <div className={ev.modalSub}>{subtitle}</div>

            <form className={ev.modalForm} onSubmit={handleSubmit} noValidate>
              <div className={ev.modalField}>
                <label className={ev.modalLabel} htmlFor="lm-name">Your Full Name</label>
                <input
                  id="lm-name"
                  className={ev.modalInput}
                  type="text"
                  placeholder="e.g. Priya Sharma"
                  value={form.name}
                  onChange={e => up('name', e.target.value)}
                  autoComplete="name"
                  required
                />
              </div>

              <div className={ev.modalField}>
                <label className={ev.modalLabel} htmlFor="lm-email">Email Address</label>
                <input
                  id="lm-email"
                  className={ev.modalInput}
                  type="email"
                  placeholder="e.g. priya@example.com"
                  value={form.email}
                  onChange={e => up('email', e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>

              <div className={ev.modalField}>
                <label className={ev.modalLabel} htmlFor="lm-phone">
                  Phone Number{' '}
                  <span style={{ fontWeight: 400, color: 'var(--muted)', fontSize: '0.72rem' }}>
                    (with country code)
                  </span>
                </label>
                <input
                  id="lm-phone"
                  className={ev.modalInput}
                  type="tel"
                  placeholder="e.g. +44 7911 123456"
                  value={form.phone}
                  onChange={e => up('phone', e.target.value)}
                  autoComplete="tel"
                  required
                />
              </div>

              <div className={ev.modalField}>
                <label className={ev.modalLabel} htmlFor="lm-biz">
                  Business Name
                  <span className={ev.modalOptional}>(optional — if you already have one)</span>
                </label>
                <input
                  id="lm-biz"
                  className={ev.modalInput}
                  type="text"
                  placeholder="e.g. TechStart Ltd"
                  value={form.businessName}
                  onChange={e => up('businessName', e.target.value)}
                  autoComplete="organization"
                />
              </div>

              {error && <div className={ev.modalError}>{error}</div>}

              <button type="submit" className={ev.modalSubmit} disabled={submitting}>
                {submitting ? 'Saving…' : ctaLabel}
              </button>
            </form>

            <div className={ev.modalDisclaimer}>
              Your details are stored securely and never shared with third parties.
              By continuing you agree to be contacted about your Innovator Founder Visa journey.
            </div>
          </>
        )}
      </div>
    </div>
  );
}
