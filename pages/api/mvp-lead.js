/**
 * POST /api/mvp-lead
 * Receives lead data from any LeadCaptureModal and writes it to
 * Google Sheets via the Apps Script Web App webhook.
 *
 * Body: { name, email, phone, businessName?, source? }
 *
 * NOTE: Google Apps Script Web Apps always issue a redirect on POST.
 * redirect: 'follow' is required — without it Node fetch silently drops the write.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, businessName, source } = req.body || {};

  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Name, email and phone number are required.' });
  }

  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK;
  if (!webhookUrl) {
    console.error('[mvp-lead] GOOGLE_SHEET_WEBHOOK env var is not set');
    // Return success so the user flow is not blocked, but log clearly
    return res.status(200).json({ success: true, warn: 'webhook_not_configured' });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      redirect: 'follow',          // ← CRITICAL: Apps Script redirects POST requests
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, businessName, source }),
    });

    const text = await response.text();
    console.log('[mvp-lead] webhook status:', response.status, '| body:', text);

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('[mvp-lead] webhook error:', err.message);
    // Still return success — don't block the user if Sheets is unreachable
    return res.status(200).json({ success: true, warn: 'webhook_failed' });
  }
}
