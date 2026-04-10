/**
 * GET /api/test-webhook
 * Hit this URL in your browser to check:
 *   1. Is GOOGLE_SHEET_WEBHOOK configured?
 *   2. Can the Apps Script be reached?
 *   3. Does it write a test row to the sheet?
 *
 * Remove or restrict this endpoint once everything is working.
 */
export default async function handler(req, res) {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK;

  if (!webhookUrl) {
    return res.status(200).json({
      ok: false,
      problem: 'GOOGLE_SHEET_WEBHOOK env var is not set',
      fix: 'Add GOOGLE_SHEET_WEBHOOK to your Vercel environment variables (Project Settings → Environment Variables), then redeploy.',
    });
  }

  if (webhookUrl.includes('REPLACE_WITH_YOUR_SCRIPT_ID')) {
    return res.status(200).json({
      ok: false,
      problem: 'GOOGLE_SHEET_WEBHOOK still contains the placeholder URL',
      fix: 'Deploy the Apps Script (see innovator_founder/google-apps-script.js for instructions) and replace the placeholder with the real Web App URL.',
    });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      redirect: 'follow',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'TEST — SafePassage Webhook Check',
        email: 'test@safepassage.check',
        phone: '+00000000000',
        businessName: '— automated test —',
        source: 'test-webhook endpoint',
      }),
    });

    const text = await response.text();

    return res.status(200).json({
      ok: response.ok,
      webhookStatus: response.status,
      webhookResponse: text,
      message: response.ok
        ? '✅ Webhook reached — check your Google Sheet for a TEST row.'
        : '❌ Webhook responded but with an error status.',
    });
  } catch (err) {
    return res.status(200).json({
      ok: false,
      problem: 'fetch to webhook threw an error',
      error: err.message,
      fix: 'Check the Apps Script URL is correct and the deployment is set to "Anyone" access.',
    });
  }
}
