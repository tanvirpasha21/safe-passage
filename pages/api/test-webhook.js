import { createClient } from '@supabase/supabase-js';

/**
 * GET /api/test-webhook
 * Inserts a test row into the `leads` table and returns the result.
 * Open in your browser to verify the Supabase connection is working.
 * Remove this endpoint once confirmed.
 */
export default async function handler(req, res) {
  const url    = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const svcKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !svcKey) {
    return res.status(200).json({
      ok: false,
      problem: 'NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env var is missing',
      fix: 'Add both vars to Vercel → Project Settings → Environment Variables, then redeploy.',
    });
  }

  const supabase = createClient(url, svcKey);

  const { data, error } = await supabase
    .from('leads')
    .insert({
      name: 'TEST — SafePassage Connection Check',
      email: 'test@safepassage.check',
      phone: '+00000000000',
      business_name: '— automated test —',
      source: 'test-webhook endpoint',
    })
    .select();

  if (error) {
    return res.status(200).json({
      ok: false,
      problem: error.message,
      hint: error.hint || null,
      fix: error.message.includes('does not exist')
        ? 'The `leads` table does not exist yet. Run the SQL in the Supabase dashboard (see README or chat instructions).'
        : 'Check your Supabase project is active and the service role key is correct.',
    });
  }

  return res.status(200).json({
    ok: true,
    message: '✅ Supabase connection working — test row inserted into `leads` table.',
    inserted: data,
  });
}
