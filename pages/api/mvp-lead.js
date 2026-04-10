import { createClient } from '@supabase/supabase-js';

/**
 * POST /api/mvp-lead
 * Inserts a lead capture form submission into the Supabase `leads` table.
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

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY   // service role — server-side only, never sent to browser
  );

  const { error } = await supabase
    .from('leads')
    .insert({
      name,
      email,
      phone,
      business_name: businessName || null,
      source: source || 'SafePassage',
    });

  if (error) {
    console.error('[mvp-lead] Supabase insert error:', error.message);
    // Still return success to the user — don't block their flow over a DB issue
    return res.status(200).json({ success: true, warn: error.message });
  }

  console.log('[mvp-lead] lead saved:', name, email, source);
  return res.status(200).json({ success: true });
}
