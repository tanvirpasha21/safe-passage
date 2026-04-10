/**
 * GET /api/test-webhook
 * Hit this in your browser to verify email sending is working.
 * Sends a test email to tanvir@voidstudiotech.co.uk.
 * Remove or restrict this once confirmed working.
 */
import { Resend } from 'resend';

export default async function handler(req, res) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return res.status(200).json({
      ok: false,
      problem: 'RESEND_API_KEY env var is not set',
      fix: 'Add RESEND_API_KEY to Vercel → Project Settings → Environment Variables, then redeploy.',
    });
  }

  const resend = new Resend(apiKey);

  try {
    const { data, error } = await resend.emails.send({
      from: 'SafePassage Leads <onboarding@resend.dev>',
      to: 'tanvir@voidstudiotech.co.uk',
      subject: 'SafePassage — Test Email ✅',
      html: '<p>This is a test email from your SafePassage lead capture. If you see this, email sending is working correctly.</p>',
    });

    if (error) throw error;

    return res.status(200).json({
      ok: true,
      message: '✅ Test email sent — check tanvir@voidstudiotech.co.uk inbox.',
      resendId: data?.id,
    });
  } catch (err) {
    return res.status(200).json({
      ok: false,
      problem: 'Resend API call failed',
      error: err.message,
      fix: 'Check that your RESEND_API_KEY is correct and active at resend.com/api-keys',
    });
  }
}
