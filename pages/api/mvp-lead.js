/**
 * POST /api/mvp-lead
 * Receives lead data from any LeadCaptureModal and writes it to
 * Google Sheets via the Apps Script Web App webhook.
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

  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK;
  if (!webhookUrl) {
    console.error('GOOGLE_SHEET_WEBHOOK env var is not set');
    return res.status(200).json({ success: true });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, businessName, source }),
    });

    if (!response.ok) {
      throw new Error(`Webhook responded with ${response.status}`);
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('mvp-lead webhook error:', err);
    return res.status(200).json({ success: true });
  }
}
