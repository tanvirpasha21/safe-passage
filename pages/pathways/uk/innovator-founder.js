import PathwayPage, { SolicitorSection } from '../../../components/PathwayPage';
import styles from '../../../styles/Pathway.module.css';
import ev from '../../../styles/EnterpriseVisa.module.css';

const CRITERIA = [
  {
    icon: '🆕',
    title: 'New',
    desc: 'Your business must not be already trading. You are starting from scratch — a pre-revenue or pre-launch idea. You cannot join an existing company and use it for this visa.',
    req: 'No existing trading history',
  },
  {
    icon: '💡',
    title: 'Innovative',
    desc: 'Your idea must be genuinely original — demonstrably different from anything already on the market. Copycat models, common services (restaurant, salon, agency), or ideas without clear differentiation will not be endorsed.',
    req: 'Original — different from existing market',
  },
  {
    icon: '📈',
    title: 'Viable',
    desc: 'Your business plan must show a credible path to revenue and profitability. Endorsing bodies look for market research, customer validation evidence, realistic financial projections, and an understanding of your competitors.',
    req: 'Credible plan with evidence of demand',
  },
  {
    icon: '🌍',
    title: 'Scalable',
    desc: 'Your plan must explicitly include job creation in the UK and expansion into national and international markets. A lifestyle business or purely local venture will not meet this criterion — you need a growth strategy.',
    req: 'Job creation + national/international expansion plan',
  },
];

const ENDORSE_TYPES = [
  {
    icon: '🚀',
    type: 'Startup Accelerators',
    examples: 'Techstars UK, Founders Factory, Barclays Eagle Labs',
    best: 'Early-stage tech, consumer, and fintech startups with high growth potential',
    note: 'Strong ecosystem connections, mentoring, and often investor introductions alongside the endorsement. Most suitable for product-led businesses targeting large markets.',
  },
  {
    icon: '🎓',
    type: 'University & Research Bodies',
    examples: 'University innovation hubs across the UK (Russell Group and others)',
    best: 'Deep-tech, biotech, research-to-market, and academic founder ventures',
    note: 'Particularly strong for businesses with a technology or science foundation. Often have specialist sector expertise (AI, health tech, clean tech).',
  },
  {
    icon: '🏦',
    type: 'Investment & Finance Networks',
    examples: 'BGF, British Business Investments, UKBAA angel networks',
    best: 'Businesses raising investment alongside immigration support',
    note: 'Can open investor introduction pathways. Best for founders with a strong financial model and ready to raise a seed round.',
  },
  {
    icon: '🏛️',
    type: 'Government-Backed Programme',
    examples: 'UK Global Entrepreneurs Programme (Department for Business & Trade)',
    best: 'Founders with an established track record internationally, seeking to expand into the UK',
    note: 'The Global Entrepreneurs Programme (GEP) is directly verified by the UK government. It is specifically approved for the Innovator Founder Visa and offers significant support for scaling internationally.',
  },
];

const PROGRESS_CHECKS = [
  {
    icon: '📋',
    timing: 'Initial Endorsement',
    fee: '£1,000',
    when: 'Before you apply',
    what: 'Your endorsing body evaluates your business plan against the four criteria: new, innovative, viable, scalable. This usually involves a written submission and an interview or pitch.',
    outcome: 'Required before visa application — you cannot apply without this letter',
  },
  {
    icon: '🗓️',
    timing: '12-Month Check',
    fee: '£500',
    when: '~12 months after visa granted',
    what: 'A meeting with your endorsing body to show meaningful progress. Evidence can include: company registration, contracts or customers, product development milestones, grants received, team hires, or revenue.',
    outcome: 'Endorsement withdrawal if no genuine progress — visa can be cut short',
  },
  {
    icon: '✅',
    timing: '24-Month Check',
    fee: '£500',
    when: '~24 months after visa granted',
    what: 'Final structured review before you can apply to settle. Must show continued business development and progression toward viability and scalability targets set in your original plan.',
    outcome: 'Positive outcome required before settlement application at 3 years',
  },
];

const MVP_DIMENSIONS = [
  'Problem–market fit',
  'Market size & readiness',
  'Traction evidence',
  'Technical viability',
  'Team capability',
  'Scalability potential',
];

export default function InnovatorFounder() {
  return (
    <PathwayPage
      meta={{
        title: 'Innovator Founder Visa 2026 — Start a Business in the UK',
        description: 'Full guide to the UK Innovator Founder Visa — endorsing bodies, four business criteria, progress checks, fees, and how to build an endorsable startup.',
      }}
      breadcrumbs={[
        { href: '/pathways/uk', label: 'UK Pathways' },
        { href: '/pathways/uk/innovator-founder', label: 'Innovator Founder Visa' },
      ]}
      hero={{
        icon: '🚀',
        tag: 'Business-Based · Updated April 2026',
        title: 'UK <em>Innovator Founder</em> Visa',
        sub: 'If you have a genuinely innovative business idea, the Innovator Founder Visa lets you start and build that business in the UK legally — with no employer required. You are the founder. After 3 years of real progress, you can apply for permanent residence.',
      }}
      facts={[
        { label: 'Visa fee (outside UK)', value: '£1,357', color: 'Warning' },
        { label: 'Endorsement fee', value: '£1,000', color: 'Warning' },
        { label: 'Duration', value: '3 years (renewable)', color: 'Green' },
        { label: 'Settlement', value: 'After 3 years', color: 'Green' },
      ]}
      sidebar={
        <>
          <div className={styles.sideCard}>
            <div className={styles.sideCardTitle}>Total Cost Estimate</div>
            {[
              ['Visa fee (outside UK)', '£1,357'],
              ['Endorsement fee', '£1,000'],
              ['12-month check', '£500'],
              ['24-month check', '£500'],
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
          <strong>This is not a general business visa.</strong> The Innovator Founder Visa is specifically
          for genuinely disruptive, scalable startup ideas. Common service businesses — restaurants,
          cleaning companies, generic agencies — will not receive endorsement. If you have a real
          innovation, this visa provides one of the most direct routes to UK permanent residence.
        </p>
      </div>

      {/* 4 Business Criteria */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>Core Requirements</span>
        <h2 className={styles.sectionTitle}>The 4 criteria your idea must meet</h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
          Your endorsing body assesses your business against all four of these criteria. You must clearly satisfy
          every one — not just some. A strong business plan is essential before you approach any endorsing body.
        </p>
        <div className={ev.criteriaGrid}>
          {CRITERIA.map((c, i) => (
            <div key={i} className={ev.criteriaCard}>
              <span className={ev.criteriaIcon}>{c.icon}</span>
              <div className={ev.criteriaTitle}>{c.title}</div>
              <div className={ev.criteriaDesc}>{c.desc}</div>
              <span className={ev.criteriaReq}>{c.req}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Endorsing Bodies */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>Endorsement</span>
        <h2 className={styles.sectionTitle}>Finding an endorsing body</h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '1rem' }}>
          Endorsing bodies are organisations approved by the UK government to assess your business idea. You
          must approach them — they do not approach you. The complete current list is published on
          GOV.UK and is updated regularly.
          <a
            href="https://www.gov.uk/government/publications/endorsing-bodies-innovator-founder-and-scale-up-visas"
            target="_blank" rel="noopener noreferrer"
            style={{ color: 'var(--safe)', marginLeft: '0.3rem' }}
          >
            View the official list →
          </a>
        </p>
        <div className={ev.endorseGrid}>
          {ENDORSE_TYPES.map((e, i) => (
            <div key={i} className={ev.endorseCard}>
              <span className={ev.endorseIcon}>{e.icon}</span>
              <div className={ev.endorseTitle}>{e.type}</div>
              <div className={ev.endorseExamples}>{e.examples}</div>
              <div className={ev.endorseBest}><strong>Best for:</strong> {e.best}</div>
              <div className={ev.endorseNote}>{e.note}</div>
            </div>
          ))}
        </div>
        <div className={styles.alertBox} style={{ marginTop: '1.25rem' }}>
          <span className={styles.alertIcon}>ℹ️</span>
          <p className={styles.alertText}>
            <strong>Only use approved bodies.</strong> An endorsement from an unapproved organisation
            will not be accepted by UKVI and your visa application will be refused. Always verify that
            the body appears on the official GOV.UK list before paying any fees. The endorsement fee is
            typically £1,000 but varies by body.
          </p>
        </div>
      </div>

      {/* MVP Validator — Void Studio */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>Prepare Your Application</span>
        <h2 className={styles.sectionTitle}>Validate your idea before approaching an endorsing body</h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
          Endorsing bodies receive many applications and reject the majority. Before spending £1,000 on a formal
          endorsement assessment, experienced founders stress-test their idea against the four visa criteria first.
          One free tool available for this is the <strong>MVP Validator</strong> by Void Studio.
        </p>
        <div className={ev.mvpBox}>
          <div className={ev.mvpTag}>Free Tool — Third-Party Service</div>
          <div className={ev.mvpTitle}>
            MVP Validator by <em>Void Studio</em>
          </div>
          <p className={ev.mvpDesc}>
            An AI-powered assessment that evaluates your startup idea across six dimensions. You receive
            a personalised scorecard, a 300-word strategic report, and three actionable recommendations —
            all in around 10 minutes. Free, confidential, and no registration required.
          </p>

          <div className={ev.mvpDimensions}>
            {MVP_DIMENSIONS.map((d, i) => (
              <div key={i} className={ev.mvpDimension}>{d}</div>
            ))}
          </div>

          <div className={ev.mvpStats}>
            {[
              ['150+', 'Startups assessed'],
              ['10 min', 'Average completion'],
              ['Free', 'No payment needed'],
              ['Instant', 'Results delivered'],
            ].map(([num, label]) => (
              <div key={label} className={ev.mvpStat}>
                <span className={ev.mvpStatNum}>{num}</span>
                <span className={ev.mvpStatLabel}>{label}</span>
              </div>
            ))}
          </div>

          <div className={ev.mvpTestimonial}>
            <div className={ev.mvpTestimonialText}>
              "The validator gave me clarity I couldn&apos;t get from 10 advisor meetings. It pinpointed
              exactly where I was hand-waving and what to focus on next."
            </div>
            <div className={ev.mvpTestimonialCredit}>
              Sarah Chen, Founder — LogisticsAI (raised £500k seed)
            </div>
          </div>

          <div className={ev.mvpCtaRow}>
            <a
              href="https://www.voidstudiotech.co.uk/mvp-validator"
              target="_blank"
              rel="noopener noreferrer"
              className={ev.mvpCtaBtn}
            >
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
            <div className={ev.mvpCompany}>
              Void Studio · AI Automation &amp; Software · 50+ projects delivered · voidstudiotech.co.uk
            </div>
          </div>
        </div>
      </div>

      {/* Application Steps */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>Step by Step</span>
        <h2 className={styles.sectionTitle}>How to apply</h2>
        <div className={styles.steps}>
          {[
            {
              title: 'Develop and document your business idea',
              desc: 'Write a clear business plan demonstrating all four criteria: new, innovative, viable, scalable. Include market research, financial projections, competitive analysis, and your scaling strategy. This document is what the endorsing body reviews.',
            },
            {
              title: 'Choose and approach an endorsing body',
              desc: 'Research the official GOV.UK list of approved endorsing bodies. Select one whose focus area matches your business sector (tech, health, consumer, etc.). Contact them directly — most have an online application form. Fees are typically £1,000.',
            },
            {
              title: 'Endorsement assessment',
              desc: 'The endorsing body evaluates your business plan — usually via written submission and an interview or pitch. If they are satisfied, they issue an endorsement letter valid for 3 months. This letter is required to apply for the visa.',
            },
            {
              title: 'Apply for your visa online',
              desc: 'Apply on GOV.UK within 3 months of receiving your endorsement letter. Pay the visa fee (£1,357 from outside UK or £1,693 to extend/switch inside UK) plus the Immigration Health Surcharge (£1,035/year per person).',
            },
            {
              title: 'Arrive and build your business',
              desc: 'Once in the UK, register your company at Companies House, open a business bank account, and begin building. You have 3 years on your initial visa — with 12-month and 24-month checks along the way.',
            },
            {
              title: 'Apply to settle after 3 years',
              desc: 'After 3 years of genuine progress — demonstrated through the 12 and 24-month checks — apply for Indefinite Leave to Remain (ILR). After 1 year of ILR, you can apply for British citizenship.',
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

      {/* Progress Checks */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>Ongoing Requirements</span>
        <h2 className={styles.sectionTitle}>The 3-year progress check framework</h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
          Unlike most work visas, the Innovator Founder Visa has built-in accountability. Your endorsing body
          monitors your business progress and can withdraw endorsement — cutting short your visa — if you
          are not building a real business. These checks cost <strong>£500 each</strong>.
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

      {/* What you cannot do */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>Restrictions</span>
        <h2 className={styles.sectionTitle}>What this visa does not allow</h2>
        <ul className={styles.reqList}>
          {[
            'You cannot access most welfare benefits or public funds.',
            'You cannot work as a professional sportsperson or sports coach.',
            'You cannot use this visa to run a business you did not found (you must be a founder, not an employee or acquirer).',
            'You cannot apply if you are currently in the UK on a Visitor visa, Short-term Student visa, or Seasonal Worker visa.',
            'Your visa can be cut short if your endorsing body withdraws your endorsement at any check.',
          ].map((r, i) => (
            <li key={i} className={styles.reqItem}>
              <span style={{ color: 'var(--danger)', fontWeight: 700 }}>✕</span>
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent changes */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>Latest Updates</span>
        <h2 className={styles.sectionTitle}>Key changes 2023–2026</h2>
        <div className={styles.changeCards}>
          {[
            {
              date: '2023 — Innovator Founder replaced Innovator Visa',
              title: 'No minimum investment requirement removed',
              desc: 'The old Innovator Visa required £50,000 of investment. The Innovator Founder Visa removed this requirement entirely — making the route accessible to bootstrapped founders with strong ideas, not just those with investor backing.',
            },
            {
              date: '2024 — Settlement route confirmed',
              title: '3-year settlement pathway maintained',
              desc: 'Settlement after 3 years (rather than 5 as with Skilled Worker) was confirmed for the Innovator Founder route, making it one of the fastest routes to UK permanent residence for eligible founders.',
            },
            {
              date: 'March 2026 — GEP endorsement confirmed',
              title: 'Global Entrepreneurs Programme specifically approved',
              desc: 'GOV.UK confirmed the Global Entrepreneurs Programme (run by the Department for Business and Trade) as an approved endorsing body specifically for the Innovator Founder Visa — particularly relevant for internationally experienced founders.',
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
          guarantees approval before reviewing your business. If someone is offering to &quot;secure&quot;
          your endorsement for a fee — this is a scam and the endorsement will be fraudulent, causing
          your visa to be refused or revoked. Always use the official GOV.UK endorsing bodies list.
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
