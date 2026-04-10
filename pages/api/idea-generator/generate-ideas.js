import Stripe from 'stripe';
import Anthropic from '@anthropic-ai/sdk';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Fetch UKRI funding opportunities pages for up-to-date context
async function fetchUKRIContext() {
  const urls = [
    'https://www.ukri.org/opportunity/page/2/',
    'https://www.ukri.org/councils/innovate-uk/',
  ];

  const results = await Promise.allSettled(
    urls.map(async (url) => {
      const res = await fetch(url, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (compatible; SafePassageBot/1.0; +https://safepassage.co.uk)',
          Accept: 'text/html',
        },
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
      const html = await res.text();
      // Strip HTML tags and collapse whitespace — keep first 4000 chars to stay within token limits
      return html
        .replace(/<script[\s\S]*?<\/script>/gi, '')
        .replace(/<style[\s\S]*?<\/style>/gi, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s{2,}/g, ' ')
        .trim()
        .slice(0, 4000);
    })
  );

  return results
    .filter((r) => r.status === 'fulfilled')
    .map((r, i) => `[UKRI Source ${i + 1}]\n${r.value}`)
    .join('\n\n');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { paymentIntentId, profile } = req.body;

  if (!paymentIntentId || !profile) {
    return res.status(400).json({ error: 'Missing paymentIntentId or profile' });
  }

  // ── Verify payment succeeded ──────────────────────────────────────────────
  let paymentIntent;
  try {
    paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
  } catch (err) {
    console.error('[generate-ideas] Stripe retrieve error:', err);
    return res.status(400).json({ error: 'Could not verify payment' });
  }

  if (paymentIntent.status !== 'succeeded') {
    return res.status(402).json({ error: `Payment not completed (status: ${paymentIntent.status})` });
  }

  // ── Fetch UKRI context ────────────────────────────────────────────────────
  let ukriContext = '';
  try {
    ukriContext = await fetchUKRIContext();
  } catch (err) {
    console.error('[generate-ideas] UKRI fetch error:', err);
    // Non-fatal — proceed without live UKRI data
    ukriContext = 'UKRI data temporarily unavailable. Use your general knowledge of UK government investment priorities in 2024-2026.';
  }

  // ── Build Claude prompt ───────────────────────────────────────────────────
  const systemPrompt = `You are a world-class startup idea strategist and UK innovation consultant.
Your role is to generate highly personalised, commercially viable, and government-backed business ideas for founders applying for the UK Innovator Founder Visa.

All ideas must satisfy the UK Home Office IVS criteria: Innovative (genuinely novel, not a copy), Viable (credible path to UK revenue), and Scalable (UK job creation + international growth potential).

You have access to current UKRI (UK Research and Innovation / Innovate UK) funding priorities and investment focus areas. Use these to inform which ideas align with where the UK government is actively deploying capital.

Respond ONLY with a valid JSON object — no markdown, no explanation, just the JSON.`;

  const userPrompt = `Generate a personalised business idea report for a UK Innovator Founder Visa applicant.

APPLICANT PROFILE:
- Current professional sector: ${profile.sector}
- Academic background / degree field: ${profile.degree}
- Future motivation & interests: ${profile.motivation}

LIVE UKRI INVESTMENT CONTEXT (scraped from ukri.org):
${ukriContext}

Generate exactly this JSON structure:

{
  "applicantSummary": "A 2-3 sentence personalised summary of why this applicant's background positions them well for UK innovation",

  "mainIdeas": [
    {
      "id": 1,
      "title": "Concise idea title",
      "tagline": "One-line hook",
      "sector": "Primary sector name",
      "innovationScore": 85,
      "viabilityScore": 80,
      "scalabilityScore": 88,
      "whyInnovative": "2-3 sentences explaining what makes this genuinely novel in the UK market",
      "whyViable": "2-3 sentences on revenue model, target customers, and path to profitability",
      "whyScalable": "2-3 sentences on UK job creation plan and international expansion path",
      "marketOpportunity": "Specific UK market size / opportunity in concrete terms",
      "revenueModel": "How the business makes money — specific model name (SaaS, marketplace, licensing, etc.) with pricing approach",
      "targetCustomers": "Specific customer segments with concrete examples",
      "competitiveAdvantage": "What makes this defensible and hard to copy",
      "ukGovernmentAlignment": "Which specific UKRI / Innovate UK priority areas or funding programmes this aligns with",
      "founderFit": "Why this specific applicant's background makes them credible to build this",
      "year1Milestones": ["Milestone 1", "Milestone 2", "Milestone 3"],
      "estimatedStartupCost": "£X,000 – £Y,000",
      "fundingRoutes": ["Route 1", "Route 2"],
      "endorsingBodyStrength": "Strong/Moderate/Good — brief reason why endorsing bodies would view this favourably",
      "risks": ["Key risk 1", "Key risk 2"],
      "overallVerdict": "3-4 sentence executive summary of why this idea is worthy of the Innovator Founder Visa"
    }
  ],

  "adjacentIdeas": [
    {
      "id": 1,
      "title": "Adjacent field idea title",
      "tagline": "One-line hook",
      "adjacentField": "Name of the adjacent sector",
      "whyUKGovernmentCares": "Specific reason the UK government / UKRI is investing heavily in this area right now",
      "connectionToProfile": "How this applicant's existing skills transfer into this adjacent field",
      "opportunity": "3-4 sentences on the business opportunity and why it fits the Innovator Founder Visa criteria",
      "keyChallenge": "The main skill or knowledge gap the applicant would need to address"
    }
  ],

  "reportSummary": "A 4-5 sentence overall summary concluding why these ideas, combined with this applicant's profile, represent a strong and differentiated Innovator Founder Visa application"
}

Requirements:
- mainIdeas: exactly 3 ideas, highly tailored to the applicant's background
- adjacentIdeas: exactly 2 ideas from adjacent fields where UK government investment is highest
- All scores are integers between 60 and 98
- Be specific — avoid generic phrases like "technology platform" or "software solution"
- Reference real UKRI programmes, Innovate UK competitions, or UK government sector strategies where possible
- Ideas must be realistic for a first-time UK founder with this background`;

  // ── Call Claude API ───────────────────────────────────────────────────────
  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 8000,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    });

    const rawText = message.content[0]?.text || '';
    console.log('[generate-ideas] Raw response (first 300 chars):', rawText.slice(0, 300));

    // Extract JSON — find the outermost { ... } block robustly,
    // handling any preamble text or markdown fences Claude may add
    let ideas;
    try {
      const firstBrace = rawText.indexOf('{');
      const lastBrace = rawText.lastIndexOf('}');
      if (firstBrace === -1 || lastBrace === -1) {
        throw new Error('No JSON object found in response');
      }
      const jsonText = rawText.slice(firstBrace, lastBrace + 1);
      ideas = JSON.parse(jsonText);
    } catch (parseErr) {
      console.error('[generate-ideas] JSON parse failed:', parseErr.message);
      console.error('[generate-ideas] Full raw response:', rawText);
      return res.status(500).json({ error: 'AI returned invalid format — please try again' });
    }

    return res.status(200).json({ ideas, generatedAt: new Date().toISOString() });
  } catch (err) {
    console.error('[generate-ideas] Claude API error:', err);
    return res.status(500).json({ error: err.message || 'AI generation failed — please try again' });
  }
}
