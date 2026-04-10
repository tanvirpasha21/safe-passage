import { useState } from 'react';
import LeadCaptureModal from '../../../components/LeadCaptureModal';

const MVP_URL = 'https://www.voidstudiotech.co.uk/mvp-validator';

// ── 3 Visa Criteria ───────────────────────────────────────────────────────────
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

// ── Real Endorsing Bodies ──────────────────────────────────────────────────────
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
    note: "Envestors is FCA-regulated and one of the UK's most established equity crowdfunding and EIS/SEIS investment networks. Their endorsement carries significant credibility with UKVI.",
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
      { stage: 'Initial endorsement', fee: '£1,000 (+VAT if UK resident)' },
      { stage: '12 & 24-month checks', fee: '£1,000 (+VAT) — covers both' },
      { stage: 'ILR endorsement letter', fee: '£1,000 (+VAT)' },
    ],
    process: [
      'Complete online application form and register your interest on their website',
      'Receive personalised email with instructions to upload documents and pay',
      'Application reviewed by an assigned experienced assessor (28-day period)',
      'Due diligence: fund verification, personal screening check, online interview',
      'Receive endorsement letter (valid 3 months) or written reasons for refusal',
      'One free review of decision if application is unsuccessful',
    ],
    best: 'Broad range of sectors. Particularly active in tech, healthcare, education, sustainability, and B2B services. Clear 28-day timeline makes planning easier.',
    note: 'Innovator International specialises exclusively in the Innovator Founder Visa endorsement route. Their guidance documentation (Application Pack v3.5) is among the most detailed available. You as the applicant MUST submit — third parties cannot apply on your behalf.',
    contact: 'innovatorinternational.co.uk',
  },
];

// ── AML/KYC Documents Required ───────────────────────────────────────────────
const REQUIRED_DOCS = [
  { doc: 'Passport copy', note: 'Valid passport, all pages scanned clearly — required by all endorsing bodies for AML/KYC.' },
  { doc: 'Business plan, financial projections & CV', note: 'Can be combined in one document. Typically 10–30 pages. Must cover all three criteria: Innovative, Viable, Scalable. CV must demonstrate direct relevance to the proposed business.' },
  { doc: 'Bank statement (proof of funds)', note: 'Evidence you have access to the funds required to deliver the project. Must show sufficient capital for business operations and personal living costs.' },
  { doc: '2 professional reference letters', note: 'Must be from professional email addresses (e.g., company.co.uk) — not Gmail, Hotmail, or personal addresses. Envestors reject personal email references.' },
  { doc: 'Degree certificates / qualifications', note: 'Relevant academic or professional qualifications demonstrating the capability to execute your idea.' },
  { doc: 'Proof of address', note: 'Recent utility bill or bank statement required for AML/KYC compliance by all endorsing bodies.' },
  { doc: 'Supporting evidence of demand', note: 'MVP demo, proof of concept, LOIs, pilot results, contracts, or client interest letters. The more tangible, the stronger your case.' },
  { doc: 'Awards, press, or prior venture documents', note: 'Relevant prior achievements significantly strengthen your application — especially evidence of prior innovation or commercial success.' },
];

// ── Progress Checks ───────────────────────────────────────────────────────────
const PROGRESS_CHECKS = [
  {
    icon: '📋',
    timing: 'Initial Endorsement',
    fee: '£1,000',
    when: 'Before visa application',
    what: 'Your endorsing body evaluates your business plan against all three criteria: Innovative, Viable, Scalable. This involves a written submission, due diligence checks, and usually an online interview. Your endorsement letter is valid for 3 months — you must apply for the visa within that window.',
    outcome: 'Required before visa application — no endorsement letter = no application',
  },
  {
    icon: '🗓️',
    timing: '12-Month Check',
    fee: '£500 (Envestors) / £1,000 (II, covers 12m + 24m)',
    when: '~12 months after visa granted',
    what: 'A structured review with your endorsing body showing meaningful progress. Evidence: company registration at Companies House, contracts or early customers, product milestones, grants received, team hires, or revenue. The bar is progress, not perfection.',
    outcome: 'Endorsement withdrawal if no genuine progress — your visa can be curtailed',
  },
  {
    icon: '✅',
    timing: '24-Month Check',
    fee: '£500 (Envestors) / included above (II)',
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

// ── Settlement Criteria (need 2 of 7 at ILR stage) ──────────────────────────
const SETTLEMENT_CRITERIA = [
  { num: 1, title: '£50,000 investment secured', desc: 'At least £50,000 of investment from a third party into your UK-registered business. This was the minimum for the old Innovator Visa — now just one of 7 ILR criteria (you only need 2).' },
  { num: 2, title: 'Doubled customer base', desc: 'Your active customer count has at least doubled since initial endorsement — demonstrating genuine commercial traction and demand for your product or service.' },
  { num: 3, title: 'IP rights or R&D investment', desc: 'You have applied for or been granted intellectual property rights (patent, trademark, registered design), or you have invested significantly in research and development.' },
  { num: 4, title: '£1 million annual revenue', desc: 'Your UK business has achieved at least £1 million in annual revenue — evidencing full commercial viability and scale.' },
  { num: 5, title: '£500,000 in export revenue', desc: 'At least £500,000 in export revenue with at least £100,000 generated from a single overseas market — demonstrating real international commercial reach.' },
  { num: 6, title: '10 settled UK workers employed', desc: 'Your business has created and currently employs at least 10 full-time equivalent UK-settled workers — directly evidencing the scalability and job creation criteria.' },
  { num: 7, title: '5 resident worker jobs at £25,000+', desc: 'Your business employs at least 5 full-time UK resident workers earning at least £25,000 per year each — a quality-of-employment metric ensuring meaningful job creation.' },
];

// ── Business Plan Self-Check ──────────────────────────────────────────────────
const RAG_SELFCHECK = [
  { area: 'Innovation', question: 'Can you clearly explain what makes your idea different from anything on the market today — in one sentence?' },
  { area: 'Replicability', question: 'If a well-funded competitor tried to copy your idea tomorrow, what stops them from doing so within 12 months?' },
  { area: 'Viability', question: 'Do you have documented evidence of demand — letters of intent, pilot users, or paying customers — before your endorsement application?' },
  { area: 'Scalability', question: 'Does your business plan name specific UK job roles, a headcount timeline, and at least two international target markets?' },
  { area: 'Founder Fit', question: 'Does your CV and background directly demonstrate why you — and not someone else — are best placed to build this specific business?' },
];

// ── Business Plan 19-Section Structure ───────────────────────────────────────
const BP_SECTIONS = [
  {
    num: 1, title: 'Executive Summary', mandatory: true,
    desc: 'A concise overview of your entire business plan — typically 1–2 pages. Written last, but placed first. Summarises your idea, the market opportunity, your financial highlights, and why you and your team are best placed to deliver it.',
    tip: 'Endorsing bodies often read this first to form an initial impression. Make your USP and IVS fit crystal clear within the first paragraph. If the assessor cannot understand your value proposition by the end of page 1, that is a red flag.',
  },
  {
    num: 2, title: 'Description of Products and/or Services', mandatory: true,
    desc: 'Exactly what you are selling — the product or service, how it works, what problem it solves, and for whom. Include pricing model, development stage, and any technical detail relevant to the innovation.',
    tip: 'Avoid jargon. Describe your product as if explaining it to an intelligent non-expert. If an assessor cannot understand your product in 5 minutes, that raises immediate concerns about innovation clarity.',
  },
  {
    num: 3, title: 'How Your Business Meets the IVS Criteria', mandatory: true,
    desc: 'A dedicated section explicitly addressing Innovative, Viable, and Scalable — using the Home Office language. Do not assume the assessor will infer these from other sections. State them directly and evidence each criterion.',
    tip: "This is the most important narrative section for endorsement. Use the exact IVS language. Reference specific elements of your plan that evidence each criterion. Many rejections happen because this section is implicit rather than explicit.",
  },
  {
    num: 4, title: 'Research & Development Activity', mandatory: true,
    desc: 'Highlight your R&D work in relation to the core innovation proposition. Include what you have already built, tested, or researched. Reference any IP protections, patents pending, or trade secrets. Show that the innovative element is not purely theoretical.',
    tip: 'Endorsing bodies want to see that you have done real work — not just an idea. Include evidence of prototype testing, user research, technical validation, or market experiments. Link your R&D to your IVS section.',
  },
  {
    num: 5, title: 'Market Analysis', mandatory: true,
    desc: 'The size of your target market (TAM/SAM/SOM), trends driving demand, and your specific target customer profile. Must include UK market data — not just global figures. Cite credible, dated sources.',
    tip: "Avoid lazy market sizing (e.g. 'the global market is $500bn so if we get 1% that's $5bn'). Show bottom-up thinking: how many UK customers exist, what they pay, and how you reach them. Primary research beats secondary research.",
  },
  {
    num: 6, title: 'Competitor Analysis', mandatory: true,
    desc: 'At least 4–5 named competitors with a structured comparison of features, pricing, strengths, and weaknesses versus your offer. A feature comparison table is strongly recommended. Identify what your competitors lack that your product addresses.',
    tip: "Both Envestors and Innovator International scrutinise this heavily. Claiming 'we have no competitors' is an immediate credibility issue. Name real companies, use specific features, and explain why customers will choose you.",
  },
  {
    num: 7, title: 'Staff Profile and Recruitment Strategy', mandatory: true,
    desc: 'Current team members — their roles, relevant experience, and specific contribution. Your recruitment plan: what roles you will hire, when, at what salary, and how you will attract talent. Directly linked to your scalability and job creation criteria.',
    tip: 'For ILR, you may need to have created UK jobs. Plan your recruitment timeline against your financial projections from day one. Include job titles, salary ranges, and hiring timelines by year.',
  },
  {
    num: 8, title: 'Marketing and Sales Strategy', mandatory: true,
    desc: 'How you will reach customers and convert them to paying users. Include channels (digital, partnerships, direct sales), customer acquisition cost (CAC), conversion assumptions, and a sales pipeline model.',
    tip: "Vague plans like 'we will use social media and word of mouth' are not credible. Specify platforms, target CPL/CPA, conversion rates, and your sales cycle length. Show you understand the economics of acquiring your specific customer.",
  },
  {
    num: 9, title: 'SWOT Analysis', mandatory: true,
    desc: 'Structured assessment of Strengths, Weaknesses, Opportunities, and Threats. Should be honest and specific — generic SWOTs undermine credibility. Each quadrant should contain at least 3–4 substantive points with mitigation strategies for threats/weaknesses.',
    tip: 'Your weaknesses and threats sections are often more important to assessors than strengths. Showing self-awareness about risks — and clear mitigation plans — builds confidence in you as a founder more than a flattering SWOT does.',
  },
  {
    num: 10, title: 'Investment Strategy and Funding Requirement', mandatory: true,
    desc: 'How much capital you need, what you will use it for (broken down by category), and where it is coming from (personal funds, external investment, grants). Timeline for deployment. Must be backed by documentary evidence.',
    tip: 'Be specific about your funding source. Personal savings must be evidenced by bank statements. Third-party investment requires documentation. Endorsing bodies verify this during AML/KYC due diligence — vague funding claims will fail.',
  },
  {
    num: 11, title: 'Revenue & Cost of Sales Forecast', mandatory: true,
    desc: 'Detailed revenue projections for Year 1, 2, and 3, linked directly to customer acquisition numbers. Show your assumptions: how many customers you expect to acquire each month, at what price, with what churn rate. Cost of sales itemised separately.',
    tip: 'Revenue projections without acquisition assumptions are not credible. Show your unit economics: CAC, LTV, gross margin, and monthly run rate trajectory. If your projections show Year 1 revenue without explaining how you get your first 10 customers, that is a gap.',
  },
  {
    num: 12, title: 'Cash Flow Forecast', mandatory: true,
    desc: 'Monthly cash flow for Year 1 (at minimum), showing opening balance, receipts, payments, and closing balance each month. This demonstrates that your business will not run out of cash before becoming viable.',
    tip: 'Explicitly required by both Envestors and Innovator International. A cash flow that goes deeply negative without a clear funding injection plan raises serious viability concerns. Show exactly when you need capital and from where.',
  },
  {
    num: 13, title: 'Annual Profit & Loss Forecast', mandatory: true,
    desc: 'P&L statement for Year 1, 2, and 3 showing revenue, cost of sales, gross profit, operating expenses, and net profit/loss. Should reconcile with the cash flow and balance sheet.',
    tip: 'Consistency is key — your P&L, cash flow, and balance sheet must tell a coherent financial story. Inconsistencies between documents are a significant red flag and suggest the founder does not understand their own financials.',
  },
  {
    num: 14, title: 'Balance Sheet Forecast', mandatory: true,
    desc: 'Projected balance sheet at the end of Year 1, 2, and 3, showing assets, liabilities, and equity. Should reflect any investments received, capital expenditure, and accumulated losses.',
    tip: "Many applicants overlook the balance sheet. Endorsing bodies use it to assess long-term financial health and your understanding of business finance. If you are unsure how to complete this, use Innovator International's Excel template as a starting point.",
  },
  {
    num: 15, title: 'Forecasted Stock Levels', mandatory: false,
    desc: 'If your business sells physical products: forecast of stock holdings by period. Shows how you will manage inventory, working capital, and supply chain timing. Linked to your cash flow and cost of sales.',
    tip: "Only applicable to product businesses. If you are a pure services or SaaS business, clearly state this section is not applicable. Don't leave it blank — explain why.",
  },
  {
    num: 16, title: 'Forecasted Advertising/Marketing Expenditure', mandatory: true,
    desc: 'A breakdown of planned marketing and advertising spend by channel and period across Year 1–3. Should link to your customer acquisition projections and be consistent with your marketing strategy section.',
    tip: 'Show that your marketing budget is proportionate to your customer acquisition targets. Spending £500/month to acquire 500 customers requires clear justification. Include cost-per-acquisition assumptions by channel.',
  },
  {
    num: 17, title: 'Forecasted Fixed Asset Schedule', mandatory: true,
    desc: 'Any significant capital purchases (equipment, IP, vehicles, software licences) planned over the 3-year forecast period, with cost, useful life, and depreciation treatment. Feeds into the balance sheet.',
    tip: 'For most digital/service businesses this will be minimal. For hardware or manufacturing businesses, this is critical. Show you have planned your capital expenditure and understand how it affects cash flow.',
  },
  {
    num: 18, title: 'Forecasted Staff Costs', mandatory: true,
    desc: 'Detailed staff cost projections including gross salaries, employer National Insurance contributions (13.8% above the secondary threshold of ~£9,100/yr), and employer pension contributions (3% minimum auto-enrolment). Must align with your recruitment strategy.',
    tip: 'Many applicants underestimate UK payroll costs. Remember: NI adds ~14% on top of gross salary, plus pension contributions. A £30,000 salary costs approximately £34,500–£35,000+ per year to the business. Include all planned hires year by year.',
  },
  {
    num: 19, title: 'Appendices (including CVs)', mandatory: true,
    desc: 'Supporting evidence including CVs for all key team members, letters of intent, pilot results, market research data, technical diagrams, patents, contracts, awards, press coverage, and any other documents referenced in the main body.',
    tip: 'CVs must demonstrate direct relevance to the proposed business. Highlight specific achievements and outcomes — not just job titles. Include anything that evidences demand, capability, or prior success. Quality over quantity.',
  },
];

// ── Financial Requirements ────────────────────────────────────────────────────
const FINANCIAL_REQS = [
  {
    icon: '📊',
    title: 'Cash Flow Forecast (Monthly)',
    mandatory: true,
    desc: 'Month-by-month cash flow for Year 1, quarterly for Year 2–3. Shows receipts, payments, and closing cash balance each period.',
    detail: 'Opening balance → monthly receipts → monthly payments → closing balance. Must show when your business becomes cash-flow positive and how any negative periods are funded.',
  },
  {
    icon: '📈',
    title: 'Annual Profit & Loss Forecast',
    mandatory: true,
    desc: 'Revenue, cost of sales, gross profit, operating expenses, EBITDA, and net profit/loss for Year 1, 2, and 3.',
    detail: 'Show your gross margin trajectory and the period in which you reach operational breakeven. Must reconcile with your cash flow.',
  },
  {
    icon: '⚖️',
    title: 'Balance Sheet Forecast',
    mandatory: true,
    desc: 'Projected assets, liabilities, and equity at end of Year 1, 2, and 3. Must be consistent with your P&L and cash flow.',
    detail: 'Reflects capital raised, accumulated losses, tangible and intangible assets, and long-term financial health of the business.',
  },
  {
    icon: '💷',
    title: 'Revenue Forecast with Acquisition Assumptions',
    mandatory: true,
    desc: 'Revenue projections broken down by customers acquired, average contract/order value, and churn/retention rate. Must show how you reach your Year 1 and Year 3 targets.',
    detail: 'Unit economics: CAC, LTV, gross margin per customer, payback period. Link this to your marketing budget and sales strategy sections.',
  },
  {
    icon: '👥',
    title: 'Staff Cost Schedule',
    mandatory: true,
    desc: 'Gross salaries, employer National Insurance (13.8% on earnings above ~£9,100/yr), employer pension (3%+), and other employee costs per role.',
    detail: 'A £30,000 salary costs ~£34,500+ to employ. Include each hire by name or role, start date, and salary. Must align with your recruitment strategy.',
  },
  {
    icon: '📣',
    title: 'Marketing & Advertising Expenditure',
    mandatory: true,
    desc: 'Planned spend by channel (paid digital, content, PR, events, partnerships) and period. Must tie directly to your customer acquisition projections.',
    detail: 'Show your cost-per-acquisition assumptions. How many leads does £1,000 of advertising generate? What is your conversion rate? Make the numbers coherent.',
  },
  {
    icon: '🏗️',
    title: 'Fixed Asset Schedule',
    mandatory: true,
    desc: 'Capital purchases planned over 3 years — equipment, IP, software licences, office fit-out — with cost, useful life, and depreciation method.',
    detail: 'For SaaS/digital businesses this is often minimal. For hardware or manufacturing it is critical. Must feed into your balance sheet and cash flow.',
  },
  {
    icon: '📦',
    title: 'Stock Level Forecast',
    mandatory: false,
    desc: 'If selling physical products: projected inventory levels by period, linked to sales forecast and supplier lead times.',
    detail: 'Include working capital requirements for stock holding. Only applicable to product businesses — state clearly if not applicable to your model.',
  },
];

// ── ILR Progress Assessment (from Innovator International Progression Guide) ──
const ILR_PROGRESS_FACTORS = [
  {
    question: 'What is the state of development of your Innovation?',
    critical: false,
    red: 'Not yet complete — innovation still in development, not commercially launched',
    amber: 'Recently launched — commercial activity has started but limited traction',
    green: 'Securing good revenue — innovation is generating meaningful commercial income',
  },
  {
    question: "What is your last year's income vs your original forecast?",
    critical: false,
    red: '<20% of your Year 1/2 forecast — significantly below expectations',
    amber: '20–50% of forecast — below expectations but some traction demonstrated',
    green: '50%+ of forecast — on or reasonably near your original projections',
  },
  {
    question: 'Does your progress reflect the time you have had on your Visa?',
    critical: true,
    red: 'Highly questionable — output does not justify the visa period granted',
    amber: 'More should have been achieved given the time and resources available',
    green: 'Achievements genuinely reflect the time and resources committed',
  },
  {
    question: 'Is your project sustainable (with resources available for scaling)?',
    critical: true,
    red: 'Insufficient resources available to continue and scale the business',
    amber: 'Questionable — resources are available but sustainability is at risk',
    green: 'Wholly sustainable without reliance on external investment or funding',
  },
  {
    question: 'Is your proposition still scalable?',
    critical: true,
    red: 'No — business model is no longer scalable or has fundamentally changed without approval',
    amber: 'Maybe — scalability is possible but requires significant further development',
    green: 'Yes — well on its way, with clear evidence of national/international growth trajectory',
  },
];

// ─────────────────────────────────────────────────────────────────────────────

export default function InnovatorFounder() {
  const [mvpOpen, setMvpOpen] = useState(false);

  return (
    <>
    {mvpOpen && (
      <LeadCaptureModal
        title="Before you start your validation"
        subtitle="Share a few quick details so we can follow up with personalised guidance on your Innovator Founder Visa journey."
        ctaLabel="Continue to MVP Validator →"
        successText="Your details have been saved. Click below to start your free MVP validation — it takes around 10 minutes."
        successCta={{ label: '🧪 Start MVP Validator →', href: MVP_URL }}
        onClose={() => setMvpOpen(false)}
        source="Innovator Founder Page — MVP Validator"
      />
    )}
    <PathwayPage
      meta={{
        title: 'Innovator Founder Visa 2026 — Complete Guide | SafePassage',
        description: 'Complete guide to the UK Innovator Founder Visa — 19-section business plan structure, financial requirements, endorsing body details, ILR path, and free tools.',
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
              ['24-month check', '£500 (included above for II)'],
              ['ILR endorsement letter', '£1,000'],
              ['IHS surcharge', '£1,035/yr per person'],
              ['Minimum savings required', '£1,270 (28 days)'],
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
            <div className={styles.sideCardTitle}>Quick Navigation</div>
            {[
              ['Business Plan Guide', '#business-plan-guide'],
              ['Financial Requirements', '#financial-requirements'],
              ['Endorsing Bodies', '#endorsing-bodies'],
              ['Application Steps', '#application-steps'],
              ['Path to ILR', '#path-to-ilr'],
              ['Contact & Support', '#contact'],
            ].map(([label, href]) => (
              <div key={label} style={{ padding: '0.4rem 0', borderBottom: '1px solid var(--border)' }}>
                <a href={href} className={styles.solicitorLink}>{label} ↓</a>
              </div>
            ))}
          </div>
          <div className={styles.sideCard}>
            <div className={styles.sideCardTitle}>Official Links</div>
            {[
              ['Apply: Innovator Founder Visa', 'https://www.gov.uk/innovator-founder-visa'],
              ['Find an approved endorsing body', 'https://www.gov.uk/government/publications/endorsing-bodies-innovator-founder-and-scale-up-visas'],
              ['Endorsement criteria guidance', 'https://www.gov.uk/innovator-founder-visa/your-business'],
            ].map(([label, href]) => (
              <div key={label} style={{ padding: '0.4rem 0', borderBottom: '1px solid var(--border)' }}>
                <a href={href} target="_blank" rel="noopener noreferrer" className={styles.solicitorLink}>{label} →</a>
              </div>
            ))}
          </div>
        </>
      }
    >
      {/* ── Alert ──────────────────────────────────────────────────────────────── */}
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
                    <span style={{ color: 'var(--safe)', fontWeight: 700, flexShrink: 0 }}>·</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <span className={ev.criteriaReq}>{c.req}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Business Plan 19-Section Guide ─────────────────────────────────────── */}
      <div id="business-plan-guide" className={styles.section}>
        <span className={styles.sectionLabel}>Business Plan Guide</span>
        <h2 className={styles.sectionTitle}>The 19-section business plan structure</h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '0.75rem' }}>
          Your business plan is the most critical document in your Innovator Founder Visa application.
          All endorsing bodies require a <strong>narrative section</strong> plus <strong>minimum 3-year financial projections</strong>.
          The structure below follows the official endorsing body guidance (Innovator International Application Pack v3.5 &amp; Business Plan Tips).
          Click any section to expand the assessor tip.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', fontSize: '0.75rem', marginBottom: '1rem', alignItems: 'center' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ background: 'rgba(42,157,143,0.1)', border: '1px solid rgba(42,157,143,0.25)', color: 'var(--safe)', borderRadius: '3px', padding: '0.1rem 0.4rem', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Required</span>
            Mandatory section
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', color: 'var(--muted)', borderRadius: '3px', padding: '0.1rem 0.4rem', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>If applicable</span>
            Include if relevant to your business model
          </span>
        </div>
        <div className={ev.bpGrid}>
          {BP_SECTIONS.map((s) => (
            <details key={s.num} className={ev.bpItem}>
              <summary className={ev.bpSummary}>
                <span className={ev.bpNum}>{String(s.num).padStart(2, '0')}</span>
                <span className={ev.bpTitle}>{s.title}</span>
                <span className={s.mandatory ? ev.bpRequired : ev.bpOptional}>
                  {s.mandatory ? 'Required' : 'If applicable'}
                </span>
              </summary>
              <div className={ev.bpBody}>
                <div className={ev.bpDesc}>{s.desc}</div>
                <div className={ev.bpTip}>
                  <span className={ev.bpTipLabel}>Assessor tip:</span> {s.tip}
                </div>
              </div>
            </details>
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
        <div style={{ background: 'linear-gradient(135deg, rgba(11,46,86,0.7) 0%, rgba(7,9,15,0.4) 100%)', border: '1px solid rgba(42,157,143,0.35)', borderRadius: '14px', padding: '2rem', marginBottom: '1.25rem' }}>
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

        {/* ── MVP Validator (near business plan) ────────────────────────────────── */}
        <div className={ev.mvpBox}>
          <div className={ev.mvpTag}>Validate Your Idea First — Free Tool</div>
          <div className={ev.mvpTitle}>
            MVP Validator by <em>Void Studio</em>
          </div>
          <p className={ev.mvpDesc}>
            Before building a full business plan, validate whether your idea is genuinely endorsement-ready.
            This AI-powered assessment evaluates your startup idea across six dimensions: problem–market fit,
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
            <button onClick={() => setMvpOpen(true)} className={ev.mvpCtaBtn} style={{ border: 'none', cursor: 'pointer' }}>
              🧪 Validate your MVP free →
            </button>
            <span style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>Takes ~10 minutes · No registration</span>
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

      {/* ── Financial Requirements ─────────────────────────────────────────────── */}
      <div id="financial-requirements" className={styles.section}>
        <span className={styles.sectionLabel}>Financial Requirements</span>
        <h2 className={styles.sectionTitle}>Financial projections: what you must submit</h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '1rem' }}>
          Every Innovator Founder Visa application requires a minimum <strong>3-year financial projection package</strong>.
          These are not optional extras — missing or inconsistent financials are one of the most common
          reasons for endorsement refusal. Below is a breakdown of each required financial document,
          what it must contain, and specific assessor tips.
        </p>
        <div className={styles.alertBox} style={{ marginBottom: '1.25rem' }}>
          <span className={styles.alertIcon}>📊</span>
          <p className={styles.alertText}>
            <strong>Excel templates available.</strong> Innovator International provide Excel templates
            for both goods and service businesses as part of their Application Pack. Use these as a
            structural starting point — but populate them with your own realistic, assumption-backed
            projections. Generic or placeholder numbers will be identified and challenged during assessment.
          </p>
        </div>
        <div className={ev.finGrid}>
          {FINANCIAL_REQS.map((r, i) => (
            <div key={i} className={ev.finCard}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.4rem' }}>
                <span style={{ fontSize: '1.4rem' }}>{r.icon}</span>
                <div>
                  <div className={ev.finTitle}>{r.title}</div>
                  <span className={r.mandatory ? ev.finRequired : ev.finOptional}>
                    {r.mandatory ? 'Required' : 'If applicable'}
                  </span>
                </div>
              </div>
              <div className={ev.finDesc}>{r.desc}</div>
              <div className={ev.finDetail}>{r.detail}</div>
            </div>
          ))}
        </div>
        <div className={styles.alertBox} style={{ marginTop: '1.25rem' }}>
          <span className={styles.alertIcon}>💡</span>
          <p className={styles.alertText}>
            <strong>Consistency is everything.</strong> Your P&L, cash flow, and balance sheet must tell a
            coherent, reconciled financial story. Assessors look specifically for internal inconsistencies —
            revenue in the P&L that does not match the cash flow, or staff costs that do not match your
            recruitment plan. Always cross-check all three documents before submitting.
          </p>
        </div>
      </div>

      {/* ── Endorsing Bodies ─────────────────────────────────────────────────────── */}
      <div id="endorsing-bodies" className={styles.section}>
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
          Customer (KYC) checks before accepting an application. You, as the applicant, <strong>must submit your own application</strong> — third parties cannot do this on your behalf.
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

      {/* ── Application Steps ──────────────────────────────────────────────────── */}
      <div id="application-steps" className={styles.section}>
        <span className={styles.sectionLabel}>Step by Step</span>
        <h2 className={styles.sectionTitle}>How to apply</h2>
        <div className={styles.steps}>
          {[
            {
              title: 'Validate your idea and build your business plan',
              desc: 'Use the MVP Validator to check your idea is genuinely endorsement-ready. Then write a business plan using the 19-section structure above, clearly evidencing all three IVS criteria. Use the SafePassage Business Plan Builder to check your RAG readiness score before submitting to any endorsing body.',
            },
            {
              title: 'Complete your financial projections',
              desc: 'Build all required financial documents: 3-year cash flow (monthly Year 1), P&L, balance sheet, staff costs, marketing expenditure, and revenue forecast with acquisition assumptions. Use the Financial Requirements section above as your checklist. Cross-check all three documents for consistency.',
            },
            {
              title: 'Gather all supporting documents',
              desc: 'Collect your passport, CV, proof of address, bank statements, professional reference letters (from professional email addresses — not Gmail/Hotmail), degree certificates, and any evidence of market demand (LOIs, pilot results, contracts, MVP demo). All endorsing bodies run AML/KYC checks.',
            },
            {
              title: 'Choose and approach an endorsing body',
              desc: 'Research the GOV.UK approved list and select a body that matches your sector. Envestors is strong for investment-linked and consumer businesses (4–6 weeks, £1,000). Innovator International has a 28-day assessment period (£1,000). Both assess against the same Home Office IVS criteria.',
            },
            {
              title: 'Complete the endorsement assessment',
              desc: 'Submit your application and documents. Your endorsing body will review, conduct due diligence (fund verification, personal screening, online interview), and issue a decision. If endorsed, you receive a letter valid for 3 months — your visa application window.',
            },
            {
              title: 'Apply for your visa on GOV.UK',
              desc: 'Apply within 3 months of receiving your endorsement letter. Pay the visa fee (£1,357 from outside UK) plus the Immigration Health Surcharge (£1,035/year per person). You must show £1,270 in savings held for 28 consecutive days.',
            },
            {
              title: 'Build your business and complete progress checks',
              desc: 'Register at Companies House as a director, open a UK business bank account, and build. Your endorsing body will check your progress at 12 months and 24 months. Evidence meaningful, IVS-aligned progress at each check — endorsement can be withdrawn if you are not genuinely building.',
            },
            {
              title: 'Apply to settle after 3 years (ILR)',
              desc: 'After 3 years, get a final endorsement letter from your endorsing body (£1,000) confirming you have met at least 2 of the 7 settlement criteria. Then apply for Indefinite Leave to Remain (ILR) on GOV.UK. After 1 year of ILR you can apply for British citizenship.',
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
          settlement criteria below. You do not need all 7 — but you must meet at least 2, and your
          endorsing body must be satisfied your business has been genuinely active.
          <strong> Plan which 2–3 criteria are most realistic for your business type from day one.</strong>
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
            often target criteria 1 (£50k investment) or 4 (£1M revenue). Choose early and document
            your progress against them throughout the 3 years.
          </p>
        </div>
      </div>

      {/* ── Path to ILR: Progress Assessment ──────────────────────────────────── */}
      <div id="path-to-ilr" className={styles.section}>
        <span className={styles.sectionLabel}>Path to ILR</span>
        <h2 className={styles.sectionTitle}>What your endorsing body checks before endorsing your ILR</h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '1rem' }}>
          Before you can apply for Indefinite Leave to Remain at the 3-year mark, your endorsing body
          must confirm you have made significant progress. Innovator International uses a structured
          <strong> 5-factor RED / AMBER / GREEN assessment</strong>. If either of the first two factors are RED,
          strong extenuating circumstances are required to proceed. If any of the last three are RED,
          the endorsement is refused — immediately.
        </p>
        <div className={styles.alertBox} style={{ marginBottom: '1.25rem', borderColor: 'rgba(239,68,68,0.25)' }}>
          <span className={styles.alertIcon}>⚠️</span>
          <p className={styles.alertText}>
            <strong>Your business must be SUSTAINABLE at ILR stage</strong> — income plus investment must
            exceed your costs, with no dependence on external funding for salaries. The innovative aspect
            of your proposition must be responsible for a significant portion of your income.
            The business must still be registered, trading, and showing clear progress beyond your last endorsement.
          </p>
        </div>
        <div className={ev.ilrTable}>
          {ILR_PROGRESS_FACTORS.map((f, i) => (
            <div key={i} className={`${ev.ilrRow} ${f.critical ? ev.ilrRowCritical : ''}`}>
              <div className={ev.ilrQuestion}>
                {f.critical && <span className={ev.ilrCriticalBadge}>Auto-refuse if RED</span>}
                <div style={{ fontWeight: 700, color: 'var(--white)', fontSize: '0.88rem', lineHeight: 1.5 }}>{f.question}</div>
              </div>
              <div className={ev.ilrRed}><span className={ev.ilrDot} style={{ background: '#ef4444' }} />{f.red}</div>
              <div className={ev.ilrAmber}><span className={ev.ilrDot} style={{ background: '#f59e0b' }} />{f.amber}</div>
              <div className={ev.ilrGreen}><span className={ev.ilrDot} style={{ background: '#22c55e' }} />{f.green}</div>
            </div>
          ))}
        </div>

        <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--white)', margin: '2rem 0 0.75rem' }}>
          Evidence your endorsing body expects at ILR stage
        </h3>
        <div className={ev.ilrSteps}>
          {[
            {
              label: 'Companies House registration',
              desc: 'You must be listed as a director or member of your UK-registered business. Your endorsing body checks Companies House directly.',
            },
            {
              label: 'Active trading evidence',
              desc: 'Summary of sales and purchases over the last 12 months, sample invoices, and annual accounts — demonstrating the business is alive and trading.',
            },
            {
              label: 'Income from innovation',
              desc: "A significant portion of your revenue must come from your innovative product or service — not from unrelated consulting or other side income. The majority of your activity must come from the innovative element that was endorsed.",
            },
            {
              label: 'Progress report vs original plan',
              desc: 'A structured comparison between your originally endorsed business plan milestones and what you have actually achieved. Progress must reflect the time granted on your visa.',
            },
            {
              label: 'Day-to-day management involvement',
              desc: 'Evidence that you are personally involved in running and developing the business — not a passive investor or absent founder. This can include team communications, product decisions, client contracts, and operational records.',
            },
            {
              label: 'Settlement criteria evidence (2 of 7)',
              desc: 'Documentary evidence for whichever 2 settlement criteria you are claiming — investor reports, customer growth data, IP filings, export invoices, payroll records, or revenue accounts.',
            },
          ].map((item, i) => (
            <div key={i} className={ev.ilrStep}>
              <div className={ev.ilrStepNum}>{i + 1}</div>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--white)', fontSize: '0.88rem', marginBottom: '0.2rem' }}>{item.label}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--white)', margin: '2rem 0 0.75rem' }}>
          After endorsement: the ILR application process
        </h3>
        <div className={ev.ilrSteps}>
          {[
            { label: 'Receive final endorsement letter (£1,000)', desc: 'Your endorsing body issues a letter confirming 3 years of genuine business activity and that you meet at least 2 of the 7 settlement criteria. Valid for 3 months.' },
            { label: 'Apply for ILR on GOV.UK', desc: 'Submit ILR application under the Innovator Founder route. Pay the ILR fee (£2,885 as of 2026 — check GOV.UK for current rates). The application is processed by UKVI, not your endorsing body.' },
            { label: 'Biometric enrollment', desc: 'Attend a UK Visa and Immigration service point to provide biometrics. Or use the UK Visas: ID Check app if eligible.' },
            { label: 'ILR granted — 1 year to naturalisation', desc: 'Once ILR is granted, you have Indefinite Leave to Remain — no time limit on your stay. After 1 further year of residence, you may apply for British citizenship (naturalisation), subject to meeting residency and language requirements.' },
          ].map((item, i) => (
            <div key={i} className={ev.ilrStep}>
              <div className={ev.ilrStepNum}>{i + 1}</div>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--white)', fontSize: '0.88rem', marginBottom: '0.2rem' }}>{item.label}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Business Plan Self-Check ──────────────────────────────────────────── */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>Pre-Application Check</span>
        <h2 className={styles.sectionTitle}>5 questions to ask before approaching an endorsing body</h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '1rem' }}>
          These five questions are adapted from the Innovator International progression guide and
          reflect the real assessment criteria used by endorsing bodies. If you cannot answer any of
          these confidently, work on that area before submitting a £1,000 non-refundable application.
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
            'Third parties cannot submit your application to an endorsing body on your behalf — you must apply personally.',
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
              date: '2024–2026 — Application Pack updated',
              title: 'Innovator International Application Pack v3.5 published',
              desc: 'Updated guidance for the assessment process, due diligence requirements, and team founder applications. Key addition: third parties confirmed unable to submit on applicant\'s behalf. VAT now applicable to endorsement fees for UK residents.',
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

      {/* ── Contact & Support ─────────────────────────────────────────────────── */}
      <div id="contact" className={styles.section}>
        <span className={styles.sectionLabel}>Expert Support</span>
        <h2 className={styles.sectionTitle}>Need help with your Innovator Founder Visa?</h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
          Have questions about your business plan, choosing the right endorsing body, your financial projections,
          or the ILR progression requirements? Get in touch for guidance on your Innovator Founder Visa journey.
        </p>
        <div className={ev.contactBox}>
          <div className={ev.contactIcon}>✉️</div>
          <div>
            <div className={ev.contactTitle}>Free Business guidance &amp; support</div>
            <div className={ev.contactDesc}>
              Whether you are just starting to think about the Innovator Founder Visa or are midway through
              your endorsement application, reach out for practical, no-jargon guidance. We can help you
              understand the requirements, review your approach, or point you to the right resources.
            </div>
            <a href="mailto:tanvir@voidstudiotech.co.uk" className={ev.contactEmail}>
              tanvir@voidstudiotech.co.uk
            </a>
            <div className={ev.contactNote}>
              Response within 1–2 business days. This is not a formal immigration advice service —
              for regulated legal advice on your specific visa circumstances, please consult a
              regulated immigration solicitor (see below).
            </div>
          </div>
        </div>
      </div>

      <SolicitorSection
        caseTypeSlug="skilled-worker"
        region="uk"
        title="Find a Regulated Immigration Solicitor for Innovator Founder Visa"
      />
    </PathwayPage>
    </>
  );
}
