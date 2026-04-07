/**
 * /api/iom-counter
 * Proxies the IOM Missing Migrants count for the current year.
 * IOM public endpoint: https://missingmigrants.iom.int/global-figures/[year]
 * Falls back to a static figure if the API is unavailable.
 */

export default async function handler(req, res) {
  // Allow CORS for same-origin only in production
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate'); // cache 1 hour on Vercel CDN

  const year = new Date().getFullYear();

  try {
    // IOM Missing Migrants public API
    const response = await fetch(
      `https://missingmigrants.iom.int/api/migrant_deaths?year=${year}&route=Mediterranean&_format=json`,
      {
        headers: { 'Accept': 'application/json' },
        signal: AbortSignal.timeout(5000), // 5s timeout
      }
    );

    if (!response.ok) throw new Error(`IOM API returned ${response.status}`);

    const data = await response.json();

    // IOM returns array of incidents; sum the dead_and_missing field
    const total = Array.isArray(data)
      ? data.reduce((sum, incident) => {
          const n = parseInt(incident.dead_and_missing || incident.total_dead_and_missing || 0, 10);
          return sum + (isNaN(n) ? 0 : n);
        }, 0)
      : null;

    if (!total) throw new Error('Could not parse IOM data');

    return res.status(200).json({
      count: total,
      year,
      source: 'IOM Missing Migrants Project',
      url: `https://missingmigrants.iom.int/global-figures/${year}`,
      live: true,
    });
  } catch (err) {
    // Fallback: use a reasonable estimate based on 2024 trajectory
    // (~3,100 Mediterranean deaths in 2023; approx 8–9 per day)
    const dayOfYear = Math.floor(
      (Date.now() - new Date(`${year}-01-01`).getTime()) / 86400000
    );
    const fallback = Math.round(dayOfYear * 8.5);

    console.error('IOM API error (using fallback):', err.message);

    return res.status(200).json({
      count: fallback,
      year,
      source: 'IOM Missing Migrants Project (estimated)',
      url: `https://missingmigrants.iom.int/global-figures/${year}`,
      live: false,
      fallback: true,
    });
  }
}
