import { Resend } from 'resend';

/**
 * POST /api/mvp-lead
 * Receives lead data from any LeadCaptureModal and emails it to
 * tanvir@voidstudiotech.co.uk via Resend.
 *
 * Body: { name, email, phone, businessName?, source? }
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, businessName, source } = req.body || {};

  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Name, email and phone number are required.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[mvp-lead] RESEND_API_KEY env var is not set');
    return res.status(200).json({ success: true, warn: 'email_not_configured' });
  }

  const resend = new Resend(apiKey);
  const now = new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' });

  try {
    const { error } = await resend.emails.send({
      from: 'SafePassage Leads <onboarding@resend.dev>',
      to: 'tanvir@voidstudiotech.co.uk',
      replyTo: email,
      subject: `New Lead: ${name} — ${source || 'SafePassage'}`,
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:24px;background:#f9f9f9;border-radius:10px;">
          <div style="background:#0b2e56;border-radius:8px;padding:20px 24px;margin-bottom:20px;">
            <h2 style="color:#2a9d8f;margin:0 0 4px;font-size:18px;">New Innovator Founder Lead</h2>
            <p style="color:#aaa;margin:0;font-size:13px;">${source || 'SafePassage'} · ${now}</p>
          </div>

          <table style="width:100%;border-collapse:collapse;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.08);">
            ${row('Name', name)}
            ${row('Email', `<a href="mailto:${email}" style="color:#2a9d8f;">${email}</a>`)}
            ${row('Phone', phone)}
            ${row('Business Name', businessName || '—')}
            ${row('Source', source || '—')}
          </table>

          <p style="font-size:12px;color:#999;margin-top:20px;text-align:center;">
            SafePassage · tanvir@voidstudiotech.co.uk · Hit reply to respond directly to this lead.
          </p>
        </div>
      `,
    });

    if (error) throw error;

    console.log('[mvp-lead] email sent to tanvir@voidstudiotech.co.uk for lead:', name);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('[mvp-lead] Resend error:', err);
    return res.status(200).json({ success: true, warn: 'email_failed' });
  }
}

function row(label, value) {
  return `
    <tr style="border-bottom:1px solid #f0f0f0;">
      <td style="padding:12px 16px;font-size:13px;color:#888;font-weight:600;width:36%;white-space:nowrap;">${label}</td>
      <td style="padding:12px 16px;font-size:14px;color:#222;">${value}</td>
    </tr>
  `;
}
