import Link from 'next/link';
import PathwayPage, { SolicitorSection } from '../../../components/PathwayPage';
import styles from '../../../styles/Pathway.module.css';
import ev from '../../../styles/EnterpriseVisa.module.css';

// ── 3 Visa Criteria (Innovative, Viable, Scalable — per Home Office / endorsing body guidance) ──
const CRITERIA = [
  {
    icon: '💡',
    title: 'Innovative',
    desc: 'Your business idea must be genuinely new and different — not a copy of an existing business model. It must bring something original to the market: a new product, service, process, or approach that is demonstrably different from what is already available.',
    bullets: [
      'Clear unique selling point (USP) with evidence of differentiation',
      'Not replicable by a well-resourced competitor without significant effort',
      'Founder directly involved in the innovative element — not outsourced',
      'IP strategy or protectable advantage (patent, trade secret, network effect)',
    ],
    req: 'Genuinely original — not a copy of an existing model',
  },
  {
    icon: '✅',
    title: 'Viable',
    desc: 'Your business must have a credible path to revenue and profitability in the UK market. Endorsing bodies look for evidence of real demand, a founder with relevant skills, and a realistic financial plan backed by data.',
    bullets: [
      'Market research demonstrating genuine UK demand for your product/service',
      'Founder background and skills directly relevant to the business',
      'Clear funding source and evidence of sufficient capital',
      'Proof of demand: LOIs, pilot customers, contracts, or early revenue',
      'Realistic Year 1–3 financial projections including cash flow',
    ],
    req: 'Evidence-based plan with credible path to profitability',
  },
  {
    icon: '📈',
    title: 'Scalable',
    desc: 'Your business must have genuine growth potential beyond a local or lifestyle operation. You need a clear plan for creating UK jobs, reaching national scale, and expanding into international markets.',
    bullets: [
      'Plan to create UK-based full-time jobs (with timeline and specific roles)',
      'National UK expansion strategy',
      'International growth plan naming specific target markets',
      'Milestone-based roadmap for Years 1, 2, and 3',
      'Evidence of scalable revenue model (not purely services/time-for-money)',
    ],
    req: 'UK job creation + national and international growth plan',
  },
];

// ── Real Endorsing Bodies (from documents) ──────────────────────────────────
const ENDORSE_BODIES = [
  {
    icon: '🏦',
    name: 'Envestors',
    type: 'FCA-Regulated Investment Network',
    location: 'London, UK',
    clients: '367+ clients across the UK',
    timeline: '4–6 weeks assessment',
    fees: [
      { stage: 'Initial endorsement', fee: '£1,000' },
      { stage: '12-month check', fee: '£500' },
      { stage: '24-month check', fee: '£500' },
      { stage: 'ILR endorsement letter', fee: '£1,000' },
    ],
    process: [
      'Submit enquiry form and initial documents via Envestors portal',
      'Pay initial endorsement fee of £1,000 (non-refundable)',
      'Submit full business plan (10–25 pages recommended)',
      'Attend interview or pitch session with Envestors team',
      'Receive decision: endorsement letter issued within 4–6 weeks',
    ],
    best: 'Businesses with an investment component, fintech, consumer, or property-adjacent startups. Strong ecosystem connections and investor introduction network.',
    note: 'Envestors is FCA-regulated and one of the UK\'s most established equity crowdfunding and EIS/SEIS investment networks. Their endorsement carries significant credibility with UKVI.',
    contact: 'envestors.co.uk',
  },
  {
    icon: '🌍',
    name: 'Innovator International',
    type: 'Specialist Immigration Endorsement Body',
    location: 'UK',
    clients: '30+ years combined sector experience',
    timeline: '28-day assessment period',
    fees: [
      { stage: 'Initial endorsement', fee: '£1,000' },
      { stage: '12-month check', fee: '£1,000' },
      { stage: '24-month check', fee: '£1,000' },
      { stage: 'ILR endorsement letter', fee: '£1,000' },
    ],
    process: [
      'Complete online application form and upload all required documents',
      'Pay assessment fee of £1,000',
      'Application reviewed against all three Innovator Founder Visa criteria (IVS)',
      '28-day assessment period with possible clarification requests',
      'Committee review and endorsement decision',
      'Endorsement letter issued (valid 3 months) or written reasons for refusal',
    ],
    best: 'Broad range of sectors. Particularly active in tech, healthcare, education, sustainability, and B2B services. Clear 28-day timeline makes planning easier.',
    note: 'Innovator International specialises exclusively in the Innovator Founder Visa endorsement route. Their guidance documentation is among the most detailed available for applicants.',
    contact: 'innovatorinternational.co.uk',
  },
];

// ── AML/KYC Documents Required ───────────────────────────────────────────────
const REQUIRED_DOCS = [
  { doc: 'Passport copy', note: 'Valid passport, all pages scanned clearly — required by all endorsing bodies for AML/KYC.' },
  { doc: 'CV / Résumé', note: 'Highlight experience directly relevant to the proposed business. Include achievements and outcomes, not just job titles.' },
  { doc: 'Business plan', note: 'Typically 10–30 pages. Must cover all three criteria: Innovative, Viable, Scalable. Include market research, competitive analysis, and scaling strategy.' },
  { doc: 'Financial projections (Year 1–3)', note: 'Must include a cash flow forecast. Envestors specifically require a detailed Year 1 financial plan. Show your assumptions.' },
  { doc: 'Bank statement', note: 'Evidence you can fund your business operations and personal living costs while building the business.' },
  { doc: '2 professional reference letters', note: 'Must be from professional email addresses (e.g., company.co.uk) — not Gmail, Hotmail, or personal addresses. Envestors reject personal email references.' },
  { doc: 'Degree certificates / qualifications', note: 'Relevant academic or professional qualifications demonstrating the capability to execute your idea.' },
  { doc: 'Proof of address', note: 'Recent utility bill or bank statement required for AML/KYC compliance by all endorsing bodies.' },
  { doc: 'Supporting evidence of demand', note: 'MVP demo, proof of concept, LOIs, pilot results, contracts, or client interest letters. The more tangible, the stronger your case.' },
  { doc: 'Awards, press, or prior venture documents', note: 'Relevant prior achievements significantly strengthen your application — especially evidence of prior innovation or commercial success.' },
];

// ── Progress Checks (4 stages — Initial + 12m + 24m + ILR) ──────────────────
const PROGRESS_CHECKS = [
  {
    icon: '📋',
    timing: 'Initial Endorsement',
    fee: '£1,000',
    when: 'Before visa application',
    what: 'Your endorsing body evaluates your business plan against all three criteria: Innovative, Viable, Scalable. This involves a written submission and usually an interview or pitch. Your endorsement letter is valid for 3 months — you must apply for the visa within that window.',
    outcome: 'Required before visa application — no endorsement letter = no application',
  },
  {
    icon: '🗓️',
    timing: '12-Month Check',
    fee: '£500 (Envestors) / £1,000 (Innovator International)',
    when: '~12 months after visa granted',
    what: 'A structured review with your endorsing body showing meaningful progress. Evidence: company registration at Companies House, contracts or early customers, product milestones, grants received, team hires, or revenue. The bar is progress, not perfection.',
    outcome: 'Endorsement withdrawal if no genuine progress — your visa can be curtailed',
  },
  {
    icon: '✅',
    timing: '24-Month Check',
    fee: '£500 (Envestors) / £1,000 (Innovator International)',
    when: '~24 months after visa granted',
    what: 'Final structured review before you can apply to settle. Must show continued development and progress toward the viability and scalability targets in your original plan. Endorsing bodies assess against the same IVS criteria as the initial assessment.',
    outcome: 'Positive endorsement required before ILR application at 3 years',
  },
  {
    icon: '🏠',
    timing: 'ILR Endorsement Letter',
    fee: '£1,000',
    when: 'At 3 years — before ILR application',
    what: 'To apply for Indefinite Leave to Remain (ILR / settlement), you need a final endorsement letter from your endorsing body confirming you have met the settlement criteria. You must satisfy at least 2 of the 7 settlement criteria listed below.',
    outcome: 'Required for ILR application — confirms 3 years of genuine business activity',
  },
];

// ── Settlement Criteria (need 2 of 7 at ILR stage) ─────────────────────────
const SETTLEMENT_CRITERIA = [
  {
    num: 1,
    title: '£50,000 investment secured',
    desc: 'At least £50,000 of investment from a third party into your UK-registered business. This was the minimum investment for the old Innovator Visa — for settlement under the Innovator Founder Visa it is one of 7 criteria (you only need 2).',
  },
  {
    num: 2,
    title: 'Doubled customer base',
    desc: 'Your active customer count has at least doubled since initial endorsement — demonstrating genuine commercial traction and demand for your product or service.',
  },
  {
    num: 3,
    title: 'IP rights or R&D investment',
    desc: 'You have applied for or been granted intellectual property rights (patent, trademark, registered design), or you have invested significantly in research and development for your business.',
  },
  {
    num: 4,
    title: '£1 million annual revenue',
    desc: 'Your UK business has achieved at least £1 million in annual revenue. This criterion evidences full commercial viability and scale.',
  },
  {
    num: 5,
    title: '£500,000 in export revenue',
    desc: 'At least £500,000 in export revenue with at least £100,000 generated from a single overseas market — demonstrating real international commercial reach.',
  },
  {
    num: 6,
    title: '10 settled UK workers employed',
    desc: 'Your business has created and currently employs at least 10 full-time equivalent UK-settled workers — directly evidencing the scalability and job creation criteria.',
  },
  {
    num: 7,
    title: '5 resident worker jobs at £25,000+',
    desc: 'Your business employs at least 5 full-time UK resident workers earning at least £25,000 per year each — a quality-of-employment metric ensuring meaningful job creation.',
  },
];

// ── Business Plan Self-Check (from Innovator International progression guide) ─
const RAG_SELFCHECK = [
  { area: 'Innovation', question: 'Can you clearly explain what makes your idea different from anything on the market today — in one sentence?' },
  { area: 'Replicability', question: 'If a well-funded competitor tried to copy your idea tomorrow, what stops them from doing so within 12 months?' },
  { area: 'Viability', question: 'Do you have documented evidence of demand — letters of intent, pilot users, or paying customers — before your endorsement application?' },
  { area: 'Scalability', question: 'Does your business plan name specific UK job roles, a headcount timeline, and at least two international target markets?' },
  { area: 'Founder Fit', question: 'Does your CV and background directly demonstrate why you — and not someone else — are best placed to build this specific business?' },
];

export default function InnovatorFounder() {
  return (
    <PathwayPage
      meta={{
        title: 'Innovator Founder Visa 2026 — Start a Business in the UK',
        description: 'Complete guide to the UK Innovator Founder Visa — real endorsing body details (Envestors, Innovator International), 3 business criteria, settlement criteria, fees, and business plan builder.',
      }}
      breadcrumbs={[
        { href: '/pathways/uk', label: 'UK Pathways' },
        { href: '/pathways/uk/innovator-founder', label: 'Innovator Founder Visa' },
      ]}
      hero={{
        icon: '🚀',
        tag: 'Business-Based · Updated April 2026',
        title: 'UK <em>Innovator Founder</em> Visa',
        sub: 'If you have a genuinely innovative, scalable business idea, the Innovator Founder Visa lets you start and build that business in the UK — no employer required. After 3 years of demonstrated progress and endorsing body approval, you can apply for permanent residence.',
      }}
      facts={[
        { label: 'Visa fee (outside UK)', value: '£1,357', color: 'Warning' },
        { label: 'Initial endorsement fee', value: '£1,000', color: 'Warning' },
        { label: 'Duration', value: '3 years (renewable)', color: 'Green' },
        { label: 'Settlement', value: 'After 3 years', color: 'Green' },
      ]}
      sidebar={
        <>
          <div className={styles.sideCard}>
            <div className={styles.sideCardTitle}>Total Cost Estimate</div>
            {[
              ['Visa fee (outside UK)', '£1,357'],
              ['Initial endorsement', '£1,000'],
              ['12-month check', '£500–£1,000'],
              ['24-month check', '£500–£1,000'],
              ['ILR endorsement letter', '£1,000'],
              ['IHS surcharge', '£1,035/yr per person'],
              ['Minimum savings', '£1,270 (28 days)'],
            ].map(([l, v]) => (
              <div key={l} className={styles.factRow}>
                <span className={styles.factLabel}>{l}</span>
                <span className={styles.factVal}>{v}</span>
              </div>
            ))}
          </div>
          <div className={styles.sideCard}>
            <div className={styles.sideCardTitle}>What you can do</div>
            {[
              ['Run businesses', '✓ Multiple'],
              ['Be a director', '✓ Yes'],
              ['Work for others', '✓ RQF Level 3+ roles'],
              ['Bring family', '✓ Partner & children'],
              ['Settle permanently', '✓ After 3 years'],
            ].map(([l, v]) => (
              <div key={l} className={styles.factRow}>
                <span className={styles.factLabel}>{l}</span>
                <span className={styles.factVal} style={{ color: 'var(--safe)' }}>{v}</span>
              </div>
            ))}
          </div>
          <div className={styles.sideCard}>
            <div className={styles.sideCardTitle}>Official Links</div>
            {[
              ['Apply: Innovator Founder Visa', 'https://www.gov.uk/innovator-founder-visa'],
              ['Find an approved endorsing body', 'https://www.gov.uk/government/publications/endorsing-bodies-innovator-founder-and-scale-up-visas'],
              ['Endorsement criteria guidance', 'https://www.gov.uk/innovator-founder-visa/your-business'],
              ['UK Global Entrepreneurs Programme', 'https://www.gov.uk/guidance/global-entrepreneur-programme'],
            ].map(([label, href]) => (
              <div key={label} style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border)' }}>
                <a href={href} target="_blank" rel="noopener noreferrer" className={styles.solicitorLink}>{label} →</a>
              </div>
            ))}
          </div>
        </>
      }
    >
      {/* Alert */}
      <div className={styles.alertBox}>
        <span className={styles.alertIcon}>🚀</span>
        <p className={styles.alertText}>
          <strong>This is not a general business visa.</strong> The Innovator Founder Visa is for
          genuinely disruptive, scalable startup ideas. Restaurants, cleaning companies, generic
          agencies, and copycat services will not receive endorsement. Your idea must be
          Innovative, Viable, and Scalable — not just one of the three.
        </p>
      </div>

      {/* ── 3 Business Criteria ────────────────────────────────────────────────── */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>Core Requirements</span>
        <h2 className={styles.sectionTitle}>The 3 criteria your business must meet</h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
          Every endorsing body assesses your application against the same three Home Office criteria.
          You must satisfy all three — a strong score on one does not compensate for failure on another.
          The Home Office guidance uses the acronym <strong>IVS: Innovative, Viable, Scalable</strong>.
        </p>
        <div className={ev.criteriaGrid}>
          {CRITERIA.map((c, i) => (
            <div key={i} className={ev.criteriaCard}>
              <span className={ev.criteriaIcon}>{c.icon}</span>
              <div className={ev.criteriaTitle}>{c.title}</div>
              <div className={ev.criteriaDesc}>{c.desc}</div>
              <ul style={{ margin: '0.5rem 0 0.75rem', padding: '0 0 0 0.1rem', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {c.bullets.map((b, j) => (
                  <li key={j} style={{ fontSize: '0.78rem', color: 'var(--muted)', display: 'flex', gap: '0.4rem', alignItems: 'flex-start', lineHeight: 1.5 }}>
                    <span style={{ color: 'var(--safe)', fontWeight: 700, flexShrink: 0, marginTop: '0.05rem' }}>·</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <span className={ev.criteriaReq}>{c.req}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Business Plan Builder CTA ─────────────────────────────────────────── */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>Free Tool</span>
        <h2 className={styles.sectionTitle}>Build your business plan for endorsement</h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
          We built a step-by-step Business Plan Builder specifically for the Innovator Founder Visa.
          It covers every area endorsing bodies assess — Envestors and Innovator International — with
          a live RAG readiness score showing exactly where your plan needs more work before you pay
          the £1,000 endorsement fee.
        </p>
        <div style={{
          background: 'linear-gradient(135deg, rgba(11,46,86,0.7) 0%, rgba(7,9,15,0.4) 100%)',
          border: '1px solid rgba(42,157,143,0.35)',
          borderRadius: '14px',
          padding: '2rem',
        }}>
          <div style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--safe)', background: 'rgba(42,157,143,0.08)', border: '1px solid rgba(42,157,143,0.25)', borderRadius: '2px', padding: '0.25rem 0.7rem', display: 'inline-block', marginBottom: '1rem' }}>
            Free Tool — No Registration Required
          </div>
          <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.2rem, 2.5vw, 1.55rem)', fontWeight: 800, color: 'var(--white)', marginBottom: '0.75rem', lineHeight: 1.3 }}>
            SafePassage <em style={{ color: 'var(--safe)', fontStyle: 'normal' }}>Business Plan Builder</em>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, marginBottom: '1.5rem', maxWidth: '700px' }}>
            An 8-step interactive wizard that guides you through every section of your business plan —
            from your USP and market research to financial projections and settlement criteria evidence.
            Your plan auto-saves locally. When complete, see your overall endorsement readiness score
            across all five IVS assessment areas with specific improvement guidance.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.65rem', marginBottom: '1.5rem' }}>
            {[
              '8-step structured wizard',
              'Innovation & USP analysis',
              'Viability evidence checklist',
              'Scalability & jobs roadmap',
              'Year 1–3 financial projections',
              'Document readiness tracker',
              'RAG endorsement score',
              'Auto-save to browser',
            ].map((f, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '6px', padding: '0.65rem 0.85rem', fontSize: '0.78rem', color: 'var(--light)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: 'var(--safe)', fontWeight: 700 }}>✓</span>
                {f}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link href="/tools/business-plan-builder" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--safe)', color: '#fff', padding: '0.75rem 1.6rem', borderRadius: '4px', fontWeight: 700, fontSize: '0.88rem', textDecoration: 'none' }}>
              📝 Start your business plan →
            </Link>
          </div>
          <div style={{ marginTop: '1rem', fontSize: '0.72rem', color: 'var(--muted)', lineHeight: 1.5 }}>
            Your plan is stored entirely in your browser — nothing is sent to our servers. This tool does not
            constitute a formal endorsement assessment or legal advice.
          </div>
        </div>
      </div>

      {/* ── Endorsed Bodies: Envestors & Innovator International ─────────────── */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>Endorsing Bodies</span>
        <h2 className={styles.sectionTitle}>Real endorsing body profiles</h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '1rem' }}>
          Below are two of the most active and detailed endorsing bodies in the UK market. Both are on
          the official GOV.UK approved list. Each has a different fee structure, assessment timeline, and
          sector focus — choosing the right one can significantly affect your chances of success.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {ENDORSE_BODIES.map((eb, i) => (
            <div key={i} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '1.6rem' }}>{eb.icon}</span>
                <div>
                  <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--white)' }}>{eb.name}</div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--safe)' }}>{eb.type}</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                {[eb.location, eb.clients, eb.timeline].map((tag, j) => (
                  <span key={j} style={{ fontSize: '0.73rem', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: '3px', padding: '0.2rem 0.55rem', color: 'var(--light)' }}>{tag}</span>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1rem' }}>
                <div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.5rem' }}>Fee Structure</div>
                  {eb.fees.map((f, j) => (
                    <div key={j} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.3rem 0', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: '0.83rem' }}>
                      <span style={{ color: 'var(--muted)' }}>{f.stage}</span>
                      <span style={{ fontWeight: 700, color: 'var(--warning)' }}>{f.fee}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.5rem' }}>Assessment Process</div>
                  {eb.process.map((step, j) => (
                    <div key={j} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', marginBottom: '0.35rem', fontSize: '0.8rem', color: 'var(--light)', lineHeight: 1.5 }}>
                      <span style={{ background: 'rgba(42,157,143,0.15)', color: 'var(--safe)', borderRadius: '3px', padding: '0.1rem 0.4rem', fontSize: '0.68rem', fontWeight: 700, flexShrink: 0, marginTop: '0.15rem' }}>{j + 1}</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--light)', lineHeight: 1.6, marginBottom: '0.5rem' }}>
                <strong style={{ color: 'var(--white)' }}>Best for:</strong> {eb.best}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.55, borderTop: '1px solid var(--border)', paddingTop: '0.65rem', fontStyle: 'italic' }}>
                {eb.note}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.alertBox} style={{ marginTop: '1.25rem' }}>
          <span className={styles.alertIcon}>ℹ️</span>
          <p className={styles.alertText}>
            <strong>Always verify the official list.</strong> There are 30+ approved endorsing bodies
            on GOV.UK — Envestors and Innovator International are two examples. Only apply to bodies
            on the current official list. An endorsement from a non-approved body will cause your visa
            to be refused.{' '}
            <a href="https://www.gov.uk/government/publications/endorsing-bodies-innovator-founder-and-scale-up-visas" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--safe)' }}>
              View the full list →
            </a>
          </p>
        </div>
      </div>

      {/* ── Documents Required for Endorsement ──────────────────────────────── */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>AML / KYC Requirements</span>
        <h2 className={styles.sectionTitle}>Documents required to apply to an endorsing body</h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '1rem' }}>
          All endorsing bodies are required to conduct Anti-Money Laundering (AML) and Know Your
          Customer (KYC) checks before accepting an application. The following documents are required
          by both Envestors and Innovator International.
        </p>
        <div className={ev.evidenceList}>
          {REQUIRED_DOCS.map((d, i) => (
            <div key={i} className={ev.evidenceItem}>
              <span className={ev.evidenceNum}>{i + 1}</span>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--white)', fontSize: '0.85rem', marginBottom: '0.2rem' }}>{d.doc}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.55 }}>{d.note}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Application Steps ──────────────────────────────────────────────── */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>Step by Step</span>
        <h2 className={styles.sectionTitle}>How to apply</h2>
        <div className={styles.steps}>
          {[
            {
              title: 'Build and stress-test your business plan',
              desc: 'Write a business plan that clearly evidences all three IVS criteria: Innovative, Viable, Scalable. Include market research, competitor analysis, financial projections (Year 1–3 with cash flow), job creation timeline, and scaling strategy. Use the SafePassage Business Plan Builder to check your readiness score before submitting to any endorsing body.',
            },
            {
              title: 'Gather all supporting documents',
              desc: 'Collect your passport, CV, proof of address, bank statements, professional reference letters (from professional email addresses — not Gmail/Hotmail), degree certificates, and any evidence of market demand (LOIs, pilot results, contracts). All endorsing bodies are required to complete AML/KYC checks.',
            },
            {
              title: 'Choose and approach an endorsing body',
              desc: 'Research the GOV.UK approved list and select a body that matches your sector. Envestors is strong for investment-linked and consumer businesses (4–6 weeks, £1,000 initial fee). Innovator International offers a 28-day assessment period (£1,000 initial fee). Both assess against the same Home Office criteria.',
            },
            {
              title: 'Complete the endorsement assessment',
              desc: 'Submit your application and documents. Both Envestors and Innovator International require a business plan submission followed by an interview or written Q&A. If endorsed, you receive a letter valid for 3 months — this letter is your visa application trigger.',
            },
            {
              title: 'Apply for your visa on GOV.UK',
              desc: 'Apply within 3 months of receiving your endorsement letter. Pay the visa fee (£1,357 from outside UK or £1,693 to switch/extend inside UK) plus the Immigration Health Surcharge (£1,035/year per person). You must show £1,270 in savings held for 28 days.',
            },
            {
              title: 'Build your business and complete progress checks',
              desc: 'Register at Companies House, open a UK business bank account, and build. Your endorsing body will check your progress at 12 months and 24 months. Evidence meaningful progress at each check — the bar is real activity, not a specific revenue threshold.',
            },
            {
              title: 'Apply to settle after 3 years',
              desc: 'After 3 years, get a final endorsement letter from your endorsing body (£1,000) confirming you have met at least 2 of the 7 settlement criteria (see below). Then apply for Indefinite Leave to Remain (ILR). After 1 year of ILR you can apply for British citizenship.',
            },
          ].map((step, i) => (
            <div key={i} className={styles.step}>
              <div className={styles.stepNum}>{i + 1}</div>
              <div className={styles.stepContent}>
                <div className={styles.stepTitle}>{step.title}</div>
                <div className={styles.stepDesc}>{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Progress Check Framework ──────────────────────────────────────────── */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>Ongoing Requirements</span>
        <h2 className={styles.sectionTitle}>The 4-stage endorsement framework</h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
          Unlike most UK visas, the Innovator Founder route has built-in accountability. Your endorsing body
          monitors your progress and can withdraw endorsement — curtailing your visa — if you are not
          genuinely building a business. Plan for four fee-paying touchpoints over 3 years.
        </p>
        <div className={ev.checksGrid}>
          {PROGRESS_CHECKS.map((check, i) => (
            <div key={i} className={ev.checkCard}>
              <div className={ev.checkTiming}>{check.icon} {check.timing}</div>
              <span className={ev.checkFee}>{check.fee}</span>
              <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginBottom: '0.5rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{check.when}</div>
              <div className={ev.checkWhat}>{check.what}</div>
              <div className={ev.checkOutcome}>{check.outcome}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Settlement Criteria (2 of 7) ──────────────────────────────────────── */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>Permanent Residence</span>
        <h2 className={styles.sectionTitle}>Settlement criteria — meet any 2 of these 7</h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
          At the 3-year ILR stage, your endorsing body confirms you have met at least 2 of the 7
          settlement criteria below. You do not need to meet all 7 — but you must meet at least 2,
          and your endorsing body must be satisfied that your business has been genuinely active.
          Plan which 2–3 criteria are most realistic for your business type from day one.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {SETTLEMENT_CRITERIA.map((sc, i) => (
            <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px', padding: '1rem 1.2rem' }}>
              <div style={{ background: 'rgba(42,157,143,0.15)', color: 'var(--safe)', borderRadius: '50%', width: '2rem', height: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 800, flexShrink: 0, marginTop: '0.1rem' }}>{sc.num}</div>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--white)', fontSize: '0.9rem', marginBottom: '0.3rem' }}>{sc.title}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.6 }}>{sc.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.alertBox} style={{ marginTop: '1.25rem' }}>
          <span className={styles.alertIcon}>💡</span>
          <p className={styles.alertText}>
            <strong>Plan your ILR criteria from day one.</strong> Most bootstrapped founders target criteria
            2 (doubled customers), 3 (IP rights), or 7 (5 jobs at £25k+). Investment-backed founders
            often target criteria 1 (£50k investment) or 4 (£1M revenue). Choose your criteria early
            and document your progress against them throughout.
          </p>
        </div>
      </div>

      {/* ── Business Plan Self-Check ──────────────────────────────────────────── */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>Pre-Application Check</span>
        <h2 className={styles.sectionTitle}>5 questions to ask before approaching an endorsing body</h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '1rem' }}>
          These five questions are adapted from the Innovator International progression guide and
          reflect the real assessment criteria used by endorsing bodies. If you cannot answer any of
          these confidently, work on that area before submitting a £1,000 endorsement application.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {RAG_SELFCHECK.map((q, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start', background: 'rgba(255,255,255,0.025)', border: '1px solid var(--border)', borderRadius: '8px', padding: '0.9rem 1.1rem' }}>
              <div style={{ background: 'rgba(42,157,143,0.12)', color: 'var(--safe)', fontSize: '0.68rem', fontWeight: 700, borderRadius: '3px', padding: '0.2rem 0.5rem', letterSpacing: '0.06em', textTransform: 'uppercase', flexShrink: 0, marginTop: '0.1rem' }}>{q.area}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--light)', lineHeight: 1.6 }}>{q.question}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MVP Validator */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>Third-Party Tool</span>
        <h2 className={styles.sectionTitle}>Validate your idea before approaching an endorsing body</h2>
        <div className={ev.mvpBox}>
          <div className={ev.mvpTag}>Free Tool — Third-Party Service</div>
          <div className={ev.mvpTitle}>
            MVP Validator by <em>Void Studio</em>
          </div>
          <p className={ev.mvpDesc}>
            An AI-powered assessment that evaluates your startup idea across six dimensions: problem–market fit,
            market size, traction evidence, technical viability, team capability, and scalability potential.
            Receive a personalised scorecard and strategic report in around 10 minutes. Free, confidential,
            no registration required.
          </p>
          <div className={ev.mvpDimensions}>
            {['Problem–market fit', 'Market size & readiness', 'Traction evidence', 'Technical viability', 'Team capability', 'Scalability potential'].map((d, i) => (
              <div key={i} className={ev.mvpDimension}>{d}</div>
            ))}
          </div>
          <div className={ev.mvpCtaRow}>
            <a href="https://www.voidstudiotech.co.uk/mvp-validator" target="_blank" rel="noopener noreferrer" className={ev.mvpCtaBtn}>
              🧪 Validate your MVP free →
            </a>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <div className={ev.mvpDisclaimer}>
              Void Studio is an independent company based at Caerphilly Business Park, Wales, UK
              (Company Reg. 10730211, England &amp; Wales). Using the MVP Validator does not constitute
              or replace a formal endorsement assessment. SafePassage has no commercial relationship
              with Void Studio — this is listed as a freely available founder resource only.
            </div>
          </div>
        </div>
      </div>

      {/* ── Restrictions ──────────────────────────────────────────────────────── */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>Restrictions</span>
        <h2 className={styles.sectionTitle}>What this visa does not allow</h2>
        <ul className={styles.reqList}>
          {[
            'You cannot access most welfare benefits or public funds.',
            'You cannot work as a professional sportsperson or sports coach.',
            'You cannot use this visa for a business you did not found — you must be the founder, not an employee or acquirer.',
            'You cannot apply if currently in the UK on a Visitor visa, Short-term Student visa, or Seasonal Worker visa.',
            'Your visa can be curtailed if your endorsing body withdraws endorsement at any progress check.',
            'You cannot receive an endorsement from a body not on the official GOV.UK approved list — such an endorsement is worthless.',
          ].map((r, i) => (
            <li key={i} className={styles.reqItem}>
              <span style={{ color: 'var(--danger)', fontWeight: 700 }}>✕</span>
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Recent changes ─────────────────────────────────────────────────────── */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>Latest Updates</span>
        <h2 className={styles.sectionTitle}>Key changes 2023–2026</h2>
        <div className={styles.changeCards}>
          {[
            {
              date: '2023 — Innovator Founder replaced Innovator Visa',
              title: 'Minimum investment requirement removed',
              desc: 'The old Innovator Visa required £50,000 of upfront investment. The Innovator Founder Visa removed this barrier entirely — making the route accessible to bootstrapped founders. The £50,000 figure now appears only as one of 7 optional ILR criteria, not a visa requirement.',
            },
            {
              date: '2023 — Criteria updated',
              title: '4 criteria reduced to 3 (IVS)',
              desc: 'The old Innovator Visa assessed ideas as New, Innovative, Viable, and Scalable. The Innovator Founder Visa removes "New" as a separate criterion — the three criteria are now Innovative, Viable, and Scalable. The "New" element is folded into the innovation assessment.',
            },
            {
              date: '2024 — Settlement route confirmed',
              title: '3-year settlement pathway maintained',
              desc: 'Settlement after 3 years was confirmed for the Innovator Founder route — one of the fastest routes to UK permanent residence. Applicants need endorsement confirmation of at least 2 of 7 settlement criteria, not completion of a full 5-year Skilled Worker pathway.',
            },
          ].map((c, i) => (
            <div key={i} className={styles.changeCard}>
              <div className={styles.changeDate}>{c.date}</div>
              <div className={styles.changeTitle}>{c.title}</div>
              <div className={styles.changeDesc}>{c.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.warningBox}>
        <span className={styles.alertIcon}>⚠️</span>
        <div className={styles.warningText}>
          <strong>Do not pay for a guaranteed endorsement.</strong> No legitimate endorsing body
          guarantees approval before reviewing your business plan and conducting a proper assessment.
          Anyone offering to &quot;secure&quot; your endorsement for a fee is running a scam — a fraudulent
          endorsement letter will result in visa refusal and may result in a ban. Always use the
          official GOV.UK endorsing bodies list and verify your body appears on it before paying anything.
        </div>
      </div>

      <SolicitorSection
        caseTypeSlug="skilled-worker"
        region="uk"
        title="Find a Regulated Immigration Solicitor for Innovator Founder Visa"
      />
    </PathwayPage>
  );
}
