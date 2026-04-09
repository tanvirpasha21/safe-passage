import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import s from '../../styles/BusinessPlanBuilder.module.css';

// ── Step definitions ──────────────────────────────────────────────────────────
const STEPS = [
  { id: 'basics',     label: 'Overview',    icon: '🏢' },
  { id: 'innovation', label: 'Innovation',  icon: '💡' },
  { id: 'viability',  label: 'Viability',   icon: '✅' },
  { id: 'scalability',label: 'Scalability', icon: '📈' },
  { id: 'market',     label: 'Market',      icon: '🎯' },
  { id: 'people',     label: 'People',      icon: '👥' },
  { id: 'financials', label: 'Financials',  icon: '💰' },
  { id: 'documents',  label: 'Documents',   icon: '📋' },
];

const DOCS = [
  { id: 'passport',    label: 'Passport copy (scanned)', note: 'All endorsing bodies require a clear, valid passport copy.' },
  { id: 'cv',          label: 'CV / Résumé demonstrating relevant expertise', note: 'Highlight achievements directly relevant to your proposed business.' },
  { id: 'bizplan',     label: 'Business plan document', note: 'Innovator International recommend ~30 pages covering all IVS criteria.' },
  { id: 'financials',  label: 'Financial projections (Year 1–3)', note: 'Must include cash flow. Envestors require a Year 1 detailed financial plan.' },
  { id: 'bankstmt',    label: 'Bank statement as proof of available funds', note: 'Evidence you can fund business operations and your own living costs.' },
  { id: 'references',  label: '2 reference letters from professional organisations', note: 'Envestors: references must come from professional email addresses — not Gmail, Hotmail, etc.' },
  { id: 'certs',       label: 'Degree certificates / qualifications', note: 'Relevant academic or professional qualifications.' },
  { id: 'address',     label: 'Proof of address (utility bill or bank statement)', note: 'Required for AML/KYC compliance.' },
  { id: 'evidence',    label: 'Supporting evidence: MVP demo, proof of concept, pilot results', note: 'Contracts, letters of intent, client interest, partnerships — anything proving demand.' },
  { id: 'awards',      label: 'Awards, achievements, or prior business venture documents', note: 'Relevant prior success strengthens your case significantly.' },
];

// ── Empty form state ──────────────────────────────────────────────────────────
const EMPTY = {
  businessName: '', sector: '', stage: '', country: '', summary: '',
  usp: '', targetCustomer: '', competition: '', replicability: '', founderRole: '', ipStrategy: '',
  marketResearch: '', founderBackground: '', fundingAmount: '', fundingSource: '', proofOfDemand: '',
  ukGrowthPlan: '', internationalPlan: '', jobCreationTimeline: '', jobsIn3Years: '', milestones: '',
  marketSize: '', routeToMarket: '', revenueModel: '', salesStrategy: '',
  team: '', skills: '', operationalPlan: '', partnerships: '',
  y1Revenue: '', y1Costs: '', y2Revenue: '', y2Costs: '', y3Revenue: '', y3Costs: '',
  fundingBreakdown: '', contingency: '',
  docs: [],
};

// ── RAG scoring ───────────────────────────────────────────────────────────────
function scoreField(val, green = 150, amber = 50) {
  const l = (val || '').trim().length;
  return l >= green ? 'green' : l >= amber ? 'amber' : 'red';
}
function areaRag(scores) {
  const reds = scores.filter(s => s === 'red').length;
  const greens = scores.filter(s => s === 'green').length;
  if (reds >= Math.ceil(scores.length / 2)) return 'red';
  if (greens >= Math.ceil(scores.length * 0.7)) return 'green';
  return 'amber';
}
function assess(d) {
  const inn = [scoreField(d.usp), scoreField(d.targetCustomer), scoreField(d.replicability), scoreField(d.founderRole)];
  const via = [scoreField(d.marketResearch), scoreField(d.founderBackground), d.fundingAmount ? 'green' : 'red', scoreField(d.proofOfDemand)];
  const sca = [scoreField(d.ukGrowthPlan), scoreField(d.internationalPlan), parseInt(d.jobsIn3Years) >= 1 ? 'green' : 'red', scoreField(d.milestones)];
  const mkt = [scoreField(d.marketSize), scoreField(d.routeToMarket), scoreField(d.salesStrategy)];
  const fin = [parseFloat(d.y1Revenue) > 0 ? 'green' : 'red', parseFloat(d.y2Revenue) > 0 ? 'amber' : 'red', scoreField(d.fundingBreakdown), scoreField(d.contingency)];
  const all = [...inn, ...via, ...sca, ...mkt, ...fin];
  const pct = Math.round((all.filter(x => x === 'green').length / all.length) * 100);
  return {
    innovation: areaRag(inn), viability: areaRag(via),
    scalability: areaRag(sca), market: areaRag(mkt), financials: areaRag(fin),
    pct,
  };
}

const RAG_META = {
  red: { label: 'Needs Work', dot: '🔴' },
  amber: { label: 'Developing', dot: '🟡' },
  green: { label: 'Strong', dot: '🟢' },
};

const RAG_GUIDANCE = {
  innovation: {
    red: ['USP is too vague or not clearly differentiated', 'Replicability risks not addressed — assessors will probe this', 'Founder role in innovation must be direct and hands-on (outsourcing the innovative element is usually disqualifying)'],
    amber: ['Some differentiation shown but needs sharper evidence', 'Explain WHY competitors cannot easily copy your approach', 'Be specific about your R&D process and intellectual property'],
    green: ['Clear, defensible USP with barrier to replication', 'Founder directly involved in innovation design and implementation', 'Target market well defined with articulated benefit over alternatives'],
  },
  viability: {
    red: ['No market research presented — this is a common rejection reason', 'Funding source or amount not clarified', 'Founder background not linked to the specific business sector'],
    amber: ['Market research is surface-level — needs primary research or specific data', 'Proof of demand needs strengthening (LOIs, pilot users, contracts)', 'Explain specifically how your skills match this business'],
    green: ['Market research includes evidence of genuine demand in the UK', 'Founder has relevant skills and prior relevant experience', 'Funding source is clear, credible, and sufficient'],
  },
  scalability: {
    red: ['No UK job creation plan — this is a core visa requirement', 'No international expansion strategy', 'Milestones are vague or missing — assessors compare future plans at checkpoint reviews'],
    amber: ['Job creation plan exists but timeline or numbers need clarity', 'International plan is aspirational but lacks specific target markets', 'Milestones need to be more specific and time-bound'],
    green: ['Clear job creation plan with timeline and specific UK roles', 'International growth plan with named target markets', 'Milestones are specific, time-bound, and credible'],
  },
  market: {
    red: ['Market size not quantified — assessors expect UK and global TAM estimates', 'Route to market is unclear', 'No sales strategy beyond "build it and they will come"'],
    amber: ['Market size stated but sources not cited', 'Route to market exists but customer acquisition cost not considered', 'Sales targets set but conversion assumptions need more rigour'],
    green: ['Market size well-researched with cited sources', 'Clear route to market with realistic CAC assumptions', 'Sales strategy shows capability to scale customer acquisition'],
  },
  financials: {
    red: ['Year 1 revenue projections missing — this is a mandatory requirement for Envestors', 'Funding breakdown not explained', 'No contingency plan for low revenue scenarios'],
    amber: ['Revenue projections present but assumptions not explained', 'Cost structure needs more detail', 'Contingency plan is brief — expand on how you would adapt'],
    green: ['3-year projections with clear assumptions', 'Funding breakdown explains main cost drivers', 'Contingency plan shows business can survive lower revenue scenarios'],
  },
};

// ── Helper components ─────────────────────────────────────────────────────────
function Field({ label, hint, children }) {
  return (
    <div className={s.formGroup}>
      <label className={s.formLabel}>{label}</label>
      {hint && <span className={s.formHint}>{hint}</span>}
      {children}
    </div>
  );
}

function Textarea({ value, onChange, placeholder, tall }) {
  return (
    <textarea
      className={`${s.formTextarea} ${tall ? s.formTextareaTall : ''}`}
      value={value} onChange={e => onChange(e.target.value)}
      placeholder={placeholder || 'Write your answer here…'}
      rows={tall ? 6 : 4}
    />
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function BusinessPlanBuilder() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(EMPTY);
  const [review, setReview] = useState(false);
  const [saved, setSaved] = useState(false);

  const up = (field, val) => setData(d => ({ ...d, [field]: val }));
  const pct = review ? 100 : Math.round(((step) / STEPS.length) * 100);

  // Persist to localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('sp_bizplan');
      if (stored) setData(JSON.parse(stored));
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem('sp_bizplan', JSON.stringify(data));
      setSaved(true);
      const t = setTimeout(() => setSaved(false), 1500);
      return () => clearTimeout(t);
    } catch {}
  }, [data]);

  const toggleDoc = (id) => {
    setData(d => ({
      ...d,
      docs: d.docs.includes(id) ? d.docs.filter(x => x !== id) : [...d.docs, id],
    }));
  };

  const score = assess(data);
  const ragClass = (r) => r === 'green' ? s.ragGreen : r === 'amber' ? s.ragAmber : s.ragRed;

  const reset = () => {
    if (confirm('Clear all your progress? This cannot be undone.')) {
      setData(EMPTY);
      setStep(0);
      setReview(false);
      localStorage.removeItem('sp_bizplan');
    }
  };

  return (
    <>
      <Head>
        <title>Business Plan Builder — Innovator Founder Visa | SafePassage</title>
        <meta name="description" content="Build a business plan structured for the UK Innovator Founder Visa endorsement process. Covers Innovation, Viability and Scalability criteria used by Envestors and Innovator International." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={s.wrap}>
        {/* Top bar */}
        <div className={s.topBar}>
          <Link href="/pathways/uk/innovator-founder" className={s.topLogo}>
            Safe<span>Passage</span>
          </Link>
          <div className={s.topBadge}>Business Plan Builder</div>
          <div className={s.saveBadge}>
            {saved && <><span className={s.saveDot} />Draft saved</>}
            {!saved && <span style={{ opacity: 0.4 }}>Auto-saved</span>}
          </div>
        </div>

        {/* Progress bar */}
        <div className={s.progressBar}>
          <div className={s.progressFill} style={{ width: `${pct}%` }} />
        </div>

        {/* Review screen */}
        {review ? (
          <div className={s.reviewWrap}>
            <div className={s.reviewHeader}>
              <div className={s.stepTag}>Readiness Assessment</div>
              <div className={s.reviewTitle}>Your Business Plan Score</div>
              <p className={s.reviewSub}>
                Based on how well you&apos;ve addressed the criteria used by <strong>Envestors</strong> and
                <strong> Innovator International</strong> — two Home Office-approved endorsing bodies.
                Scores above 70% correlate with plans that progress to formal endorsement assessment.
              </p>
              <div className={s.overallScore}>
                <span className={s.overallNum}>{score.pct}%</span>
                <span className={s.overallLabel}>Overall Readiness</span>
              </div>
            </div>

            {/* RAG cards */}
            <div className={s.ragGrid}>
              {[
                { key: 'innovation', area: 'Innovation' },
                { key: 'viability', area: 'Viability' },
                { key: 'scalability', area: 'Scalability' },
                { key: 'market', area: 'Market & Sales' },
                { key: 'financials', area: 'Financial Plan' },
              ].map(({ key, area }) => {
                const r = score[key];
                const m = RAG_META[r];
                const tips = RAG_GUIDANCE[key][r];
                return (
                  <div key={key} className={`${s.ragCard} ${ragClass(r)}`}>
                    <div className={s.ragStatus}>{m.dot} {m.label}</div>
                    <div className={s.ragArea}>{area}</div>
                    <div className={s.ragPoints}>
                      {tips.map((t, i) => <div key={i} className={s.ragPoint}>{t}</div>)}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Document readiness */}
            <div className={s.docReadiness}>
              <div className={s.docCount}>{data.docs.length}/{DOCS.length}</div>
              <div className={s.docLabel}>
                documents ready — {data.docs.length < 5 ? 'collect remaining documents before approaching an endorsing body' : data.docs.length < 9 ? 'almost there — check remaining items' : 'documents checklist complete'}
              </div>
            </div>

            {/* Business summary */}
            <div className={s.summaryCard}>
              <div className={s.summaryTitle}>Business Overview</div>
              {[
                ['Business Name', data.businessName],
                ['Sector', data.sector],
                ['Stage', data.stage],
                ['Country Applying From', data.country],
                ['Business Description', data.summary],
              ].map(([k, v]) => (
                <div key={k} className={s.summaryRow}>
                  <span className={s.summaryKey}>{k}</span>
                  <span className={`${s.summaryVal} ${!v ? s.summaryEmpty : ''}`}>{v || 'Not filled in'}</span>
                </div>
              ))}
            </div>

            <div className={s.summaryCard}>
              <div className={s.summaryTitle}>Innovation Summary</div>
              {[
                ['USP', data.usp],
                ['Target Customer', data.targetCustomer],
                ['Why Hard to Replicate', data.replicability],
                ['Founder\'s Role in Innovation', data.founderRole],
                ['IP Strategy', data.ipStrategy],
              ].map(([k, v]) => (
                <div key={k} className={s.summaryRow}>
                  <span className={s.summaryKey}>{k}</span>
                  <span className={`${s.summaryVal} ${!v ? s.summaryEmpty : ''}`}>{v || 'Not filled in'}</span>
                </div>
              ))}
            </div>

            <div className={s.summaryCard}>
              <div className={s.summaryTitle}>Financial Projections</div>
              {[
                ['Year 1 Revenue', data.y1Revenue ? `£${Number(data.y1Revenue).toLocaleString()}` : ''],
                ['Year 1 Costs', data.y1Costs ? `£${Number(data.y1Costs).toLocaleString()}` : ''],
                ['Year 2 Revenue', data.y2Revenue ? `£${Number(data.y2Revenue).toLocaleString()}` : ''],
                ['Year 2 Costs', data.y2Costs ? `£${Number(data.y2Costs).toLocaleString()}` : ''],
                ['Year 3 Revenue', data.y3Revenue ? `£${Number(data.y3Revenue).toLocaleString()}` : ''],
                ['Year 3 Costs', data.y3Costs ? `£${Number(data.y3Costs).toLocaleString()}` : ''],
              ].map(([k, v]) => (
                <div key={k} className={s.summaryRow}>
                  <span className={s.summaryKey}>{k}</span>
                  <span className={`${s.summaryVal} ${!v ? s.summaryEmpty : ''}`}>{v || '—'}</span>
                </div>
              ))}
            </div>

            <div className={s.disclaimer}>
              <strong>This is a preparation tool, not an official endorsement.</strong> Scores reflect how completely you&apos;ve addressed the criteria used by Home Office-approved endorsing bodies. A high score here does not guarantee endorsement — each endorsing body assesses applications individually and has their own standards. All endorsement fees are non-refundable. Always apply to an endorsing body on the{' '}
              <a href="https://www.gov.uk/government/publications/endorsing-bodies-innovator-founder-and-scale-up-visas" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--safe)' }}>official GOV.UK list</a>.
            </div>

            <div className={s.reviewActions}>
              <button className={s.btnPrint} onClick={() => window.print()}>Print / Save as PDF</button>
              <button className={s.btnEdit} onClick={() => { setReview(false); setStep(0); }}>Edit Answers</button>
              <Link href="/pathways/uk/innovator-founder" className={s.btnEdit} style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>← Back to Visa Guide</Link>
            </div>
          </div>
        ) : (
          <>
            {/* Step indicator */}
            <div className={s.stepRow}>
              {STEPS.map((st, i) => (
                <div key={st.id} style={{ display: 'flex', alignItems: 'center' }}>
                  <div className={s.stepItem}>
                    <div
                      className={`${s.stepDot} ${i === step ? s.stepDotActive : i < step ? s.stepDotDone : ''}`}
                      onClick={() => i < step && setStep(i)}
                      title={st.label}
                    >
                      {i < step ? '✓' : i + 1}
                    </div>
                    <span className={`${s.stepLabel} ${i === step ? s.stepLabelActive : ''}`}>{st.label}</span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`${s.stepConnector} ${i < step ? s.stepConnectorDone : ''}`} />
                  )}
                </div>
              ))}
            </div>

            {/* Step 0 — Business Overview */}
            {step === 0 && (
              <div className={s.card}>
                <div className={s.cardInner}>
                  <span className={s.stepTag}>Step 1 of 8 — Business Overview</span>
                  <h1 className={s.stepTitle}>Tell us about your business</h1>
                  <p className={s.stepSub}>
                    This is the foundation of your plan. Endorsing bodies want a clear, concise overview before
                    diving into the detail. <strong>Be honest</strong> — this tool exposes weaknesses so you can
                    strengthen them before spending £1,000 on a formal assessment.
                  </p>
                  <Field label="Business / Project Name">
                    <input className={s.formInput} value={data.businessName} onChange={e => up('businessName', e.target.value)} placeholder="e.g. NovaMed AI" />
                  </Field>
                  <div className={s.formRowTwo}>
                    <Field label="Business Sector">
                      <select className={s.formSelect} value={data.sector} onChange={e => up('sector', e.target.value)}>
                        <option value="">Select sector…</option>
                        <option>Tech / Software</option>
                        <option>HealthTech / MedTech</option>
                        <option>FinTech</option>
                        <option>CleanTech / Sustainability</option>
                        <option>EdTech</option>
                        <option>FoodTech / AgriTech</option>
                        <option>E-commerce / Consumer</option>
                        <option>Professional Services</option>
                        <option>Manufacturing / Engineering</option>
                        <option>Creative / Media</option>
                        <option>Other</option>
                      </select>
                    </Field>
                    <Field label="Current Stage">
                      <select className={s.formSelect} value={data.stage} onChange={e => up('stage', e.target.value)}>
                        <option value="">Select stage…</option>
                        <option>Idea stage — pre-MVP</option>
                        <option>MVP built — pre-revenue</option>
                        <option>Early revenue (under £50k)</option>
                        <option>Revenue generating (£50k+)</option>
                      </select>
                    </Field>
                  </div>
                  <Field label="Country You Are Applying From" hint="Where you currently live/reside">
                    <input className={s.formInput} value={data.country} onChange={e => up('country', e.target.value)} placeholder="e.g. Nigeria, India, UAE…" />
                  </Field>
                  <Field label="Business Description (2–3 sentences)" hint="What does your business do, who does it serve, and what problem does it solve? Envestors use this as the first filter.">
                    <Textarea value={data.summary} onChange={v => up('summary', v)} placeholder="e.g. NovaMed AI is a diagnostic platform that uses machine learning to detect early-stage sepsis in hospital ICUs, reducing mortality rates by up to 40%. We serve NHS trusts and private hospitals across the UK and Middle East." />
                  </Field>
                </div>
                <div className={s.navRow}>
                  <span className={s.stepCounter}>Step 1 / 8</span>
                  <button className={s.btnNext} onClick={() => setStep(1)}>Next: Innovation →</button>
                </div>
              </div>
            )}

            {/* Step 1 — Innovation */}
            {step === 1 && (
              <div className={s.card}>
                <div className={s.cardInner}>
                  <span className={s.stepTag}>Step 2 of 8 — Innovation Criteria</span>
                  <h1 className={s.stepTitle}>Prove your idea is genuinely innovative</h1>
                  <p className={s.stepSub}>
                    Both Envestors and Innovator International assess innovation on: <strong>clear USP, barriers to replication, and the founder&apos;s direct role</strong>. Outsourcing the innovative component to a third party is usually disqualifying. Be specific — vague claims are routinely rejected.
                  </p>
                  <Field
                    label="What makes your product/service unique vs. existing solutions?"
                    hint="Innovator International: 'What are the unique differentiators of this proposition compared to current or alternative solutions?' — Be specific, not generic."
                  >
                    <Textarea tall value={data.usp} onChange={v => up('usp', v)} placeholder="e.g. Unlike existing diagnostic tools that require lab cultures taking 48+ hours, our AI system analyses blood biomarker patterns in real-time (under 4 minutes) with 94% sensitivity for early sepsis — validated in a 2,000-patient trial at King's College Hospital…" />
                  </Field>
                  <Field
                    label="Who is your target customer and how do they benefit over alternatives?"
                    hint="Innovator International: 'Who is the target client base for this proposition, and how do they benefit over existing solutions?'"
                  >
                    <Textarea value={data.targetCustomer} onChange={v => up('targetCustomer', v)} placeholder="e.g. NHS ICU clinicians and hospital procurement teams. Current solutions miss 30% of early sepsis cases. Our platform reduces time-to-treatment by 6 hours, cutting 7-day mortality by an estimated 40% and saving NHS trusts £8,000 per avoided ICU escalation…" />
                  </Field>
                  <Field
                    label="Why is your idea hard to replicate without significant R&D or specialist knowledge?"
                    hint="Innovator International: 'Could the proposition be easily replicated by other parties without requiring additional R&D or upskilling?' — This is a critical question. Weak answers here are a common rejection reason."
                  >
                    <Textarea value={data.replicability} onChange={v => up('replicability', v)} placeholder="e.g. The predictive model required 3 years of training on 50,000 anonymised NHS patient records under a research MOU with King's College London. Replicating this requires both the proprietary dataset and deep domain expertise in haematology biomarker interpretation — neither of which is publicly available…" />
                  </Field>
                  <Field
                    label="What is YOUR direct role in developing, designing and implementing this innovation?"
                    hint="Innovator International: 'What is the role of the founder in the research, design and implementation of the innovative component?' — You must be the primary innovator. Applicants who outsource the core innovation are typically rejected."
                  >
                    <Textarea value={data.founderRole} onChange={v => up('founderRole', v)} placeholder="e.g. I designed the biomarker selection algorithm and led all 3 phases of clinical validation. I have a PhD in Clinical AI from UCL and 6 years prior experience as an NHS intensivist. I personally coded the core model — we use an external agency only for the mobile UI layer…" />
                  </Field>
                  <Field
                    label="Intellectual Property strategy"
                    hint="How will you protect your innovation? Patent pending, trade secrets, copyright, proprietary data?"
                  >
                    <input className={s.formInput} value={data.ipStrategy} onChange={e => up('ipStrategy', e.target.value)} placeholder="e.g. Patent application filed (UK IPO ref: GB2024/XXXXX) for biomarker selection method. Core model weights protected as trade secret. Training dataset owned under MOU." />
                  </Field>
                </div>
                <div className={s.navRow}>
                  <button className={s.btnBack} onClick={() => setStep(0)}>← Back</button>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span className={s.stepCounter}>Step 2 / 8</span>
                    <button className={s.btnNext} onClick={() => setStep(2)}>Next: Viability →</button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2 — Viability */}
            {step === 2 && (
              <div className={s.card}>
                <div className={s.cardInner}>
                  <span className={s.stepTag}>Step 3 of 8 — Viability Criteria</span>
                  <h1 className={s.stepTitle}>Show your business can succeed</h1>
                  <p className={s.stepSub}>
                    Viability covers three things: <strong>market demand exists</strong>, <strong>you have the skills to deliver</strong>, and <strong>you have or can access sufficient funding</strong>. Envestors specifically require a Year 1 cash flow plan. No funding = likely refusal.
                  </p>
                  <Field
                    label="What market research have you done to confirm credible demand?"
                    hint="Innovator International: 'What research has the applicant performed to clarify that there is credible demand for this proposition?' — Primary research (interviews, pilots, surveys) is far stronger than secondary (Google, reports)."
                  >
                    <Textarea tall value={data.marketResearch} onChange={v => up('marketResearch', v)} placeholder="e.g. Conducted 47 structured interviews with NHS procurement leads across 12 trusts. 38/47 confirmed active pain point with existing diagnostic delay. Pilot at GSTT in 2023 showed 94% clinician satisfaction. UK sepsis market estimated at £420M/year (Sepsis Research UK, 2023). No UK-based AI diagnostic competitor exists in this specific niche…" />
                  </Field>
                  <Field
                    label="What evidence do you have of actual demand? (customers, LOIs, contracts, pilot users)"
                    hint="Assessors want tangible proof — signed pilot agreements, letters of intent, purchase orders, or paying customers carry significantly more weight than surveys."
                  >
                    <Textarea value={data.proofOfDemand} onChange={v => up('proofOfDemand', v)} placeholder="e.g. 2 signed pilot MoUs with GSTT and Royal Free Hospital. 1 Letter of Intent for £75,000 annual SaaS contract pending NHS procurement approval. 3 paying early-access customers (private hospitals) at £2,500/month each…" />
                  </Field>
                  <Field
                    label="What relevant skills, experience and industry knowledge do you bring?"
                    hint="Innovator International: 'Does the applicant have a skill set suitable for the development and ongoing management of the proposition?' — Link your background directly to this specific business."
                  >
                    <Textarea value={data.founderBackground} onChange={v => up('founderBackground', v)} placeholder="e.g. PhD in Clinical AI (UCL, 2018). 6 years as NHS intensivist. Led AI research at DeepMind Health for 2 years. Published 14 peer-reviewed papers on sepsis biomarkers. Led a team of 8 engineers. Previously co-founded a health data company (exited 2021, £1.2M)…" />
                  </Field>
                  <div className={s.formRowTwo}>
                    <Field label="How much funding do you have access to?" hint="Envestors require proof of funds (bank statement)">
                      <select className={s.formSelect} value={data.fundingAmount} onChange={e => up('fundingAmount', e.target.value)}>
                        <option value="">Select amount…</option>
                        <option>Under £10,000</option>
                        <option>£10,000–£50,000</option>
                        <option>£50,000–£100,000</option>
                        <option>£100,000–£250,000</option>
                        <option>£250,000–£500,000</option>
                        <option>Over £500,000</option>
                      </select>
                    </Field>
                    <Field label="Source of funding">
                      <select className={s.formSelect} value={data.fundingSource} onChange={e => up('fundingSource', e.target.value)}>
                        <option value="">Select source…</option>
                        <option>Personal savings</option>
                        <option>Investment already secured</option>
                        <option>Bank / business loan</option>
                        <option>Family funding</option>
                        <option>Mix of sources</option>
                        <option>To be raised (fundraising in progress)</option>
                      </select>
                    </Field>
                  </div>
                </div>
                <div className={s.navRow}>
                  <button className={s.btnBack} onClick={() => setStep(1)}>← Back</button>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span className={s.stepCounter}>Step 3 / 8</span>
                    <button className={s.btnNext} onClick={() => setStep(3)}>Next: Scalability →</button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3 — Scalability */}
            {step === 3 && (
              <div className={s.card}>
                <div className={s.cardInner}>
                  <span className={s.stepTag}>Step 4 of 8 — Scalability Criteria</span>
                  <h1 className={s.stepTitle}>Show you can grow and create UK jobs</h1>
                  <p className={s.stepSub}>
                    Scalability is non-negotiable for the Innovator Founder Visa. You must show a <strong>credible path to UK job creation</strong> and <strong>national/international market expansion</strong>. Envestors&apos; settlement criteria requires at least 5–10 UK jobs and £1M+ revenue. Plan backwards from those targets.
                  </p>
                  <Field
                    label="How will you establish and grow your business within the UK?"
                    hint="Innovator International: 'How will the project establish itself and grow within the UK (including recruitment)?' Include specific markets, channels, and hiring plans."
                  >
                    <Textarea tall value={data.ukGrowthPlan} onChange={v => up('ukGrowthPlan', v)} placeholder="e.g. Year 1: focus on London and South East NHS trusts (200+ within our target radius). Hire 1 clinical sales rep (NHS background) and 1 ML engineer. Year 2: expand to North West and Midlands regions. Year 3: national NHS framework agreement application. Target: 50 trust deployments at £3,000/month each = £1.8M ARR…" />
                  </Field>
                  <Field
                    label="Which international markets will you enter, and how?"
                    hint="Innovator International: 'How will the project establish itself and grow internationally (including recruitment)?' Be specific about target countries and your entry strategy."
                  >
                    <Textarea value={data.internationalPlan} onChange={v => up('internationalPlan', v)} placeholder="e.g. Year 2: enter UAE and Saudi Arabia through existing MoH relationship from prior role. Year 3: US market via FDA 510(k) submission (in progress). Have identified 2 US distribution partners. EU: CE marking already planned for Year 2 to access German hospital market…" />
                  </Field>
                  <div className={s.formRowTwo}>
                    <Field label="When will you hire your first UK employee?">
                      <select className={s.formSelect} value={data.jobCreationTimeline} onChange={e => up('jobCreationTimeline', e.target.value)}>
                        <option value="">Select timeline…</option>
                        <option>Within 6 months of arriving</option>
                        <option>Within 12 months</option>
                        <option>Within 18 months</option>
                        <option>Within 24 months</option>
                        <option>Year 3 onwards</option>
                      </select>
                    </Field>
                    <Field label="How many UK jobs created by end of Year 3?" hint="Settlement requires minimum 5 resident or 10 settled worker jobs (Envestors)">
                      <input className={s.formInput} type="number" min="0" value={data.jobsIn3Years} onChange={e => up('jobsIn3Years', e.target.value)} placeholder="e.g. 8" />
                    </Field>
                  </div>
                  <Field
                    label="Key 3-year milestones"
                    hint="Be specific and time-bound. Innovator International will compare future visa checkpoints and ILR applications against what you write here — so be realistic, not optimistic."
                  >
                    <Textarea tall value={data.milestones} onChange={v => up('milestones', v)} placeholder="Year 1: Complete clinical validation. Sign 5 pilot contracts. Hire 2 FTEs. Revenue £30k.&#10;Year 2: Launch commercial SaaS. 20 paying NHS trusts. Hire 5 FTEs. Revenue £250k.&#10;Year 3: UK national framework. 50 trusts. Hire 8 FTEs total. Revenue £900k. Begin US FDA submission." />
                  </Field>
                </div>
                <div className={s.navRow}>
                  <button className={s.btnBack} onClick={() => setStep(2)}>← Back</button>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span className={s.stepCounter}>Step 4 / 8</span>
                    <button className={s.btnNext} onClick={() => setStep(4)}>Next: Market →</button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4 — Market & Sales */}
            {step === 4 && (
              <div className={s.card}>
                <div className={s.cardInner}>
                  <span className={s.stepTag}>Step 5 of 8 — Market & Sales</span>
                  <h1 className={s.stepTitle}>Define your market and how you will win it</h1>
                  <p className={s.stepSub}>
                    Innovator International assess: <em>working knowledge of the market</em>, <em>evidence of genuine need</em>, and <em>a clear, achievable route to market</em>. Cite data sources. Quantify your target market.
                  </p>
                  <Field
                    label="What is the size of your target market?"
                    hint="Include UK TAM (Total Addressable Market), SAM (Serviceable) and SOM (Obtainable). Cite sources. Assessors look for evidence you understand the real opportunity — not just 'the global market is £500bn'."
                  >
                    <Textarea value={data.marketSize} onChange={v => up('marketSize', v)} placeholder="e.g. UK sepsis diagnostic market: £420M annually (Sepsis Research UK 2023). NHS spends £2.7bn/year on sepsis treatment. Our addressable market (ICU-focused AI diagnostics): £85M. Year 3 realistic share: ~2% = £1.7M. Global TAM $4.8bn (Grand View Research 2024)…" />
                  </Field>
                  <div className={s.formRowTwo}>
                    <Field label="Revenue model">
                      <select className={s.formSelect} value={data.revenueModel} onChange={e => up('revenueModel', e.target.value)}>
                        <option value="">Select model…</option>
                        <option>SaaS / Annual subscription</option>
                        <option>Transaction / Commission fees</option>
                        <option>Product / Hardware sales</option>
                        <option>Licensing fees</option>
                        <option>Service / Consultancy fees</option>
                        <option>Freemium with premium upgrade</option>
                        <option>Advertising</option>
                        <option>Mix of revenue streams</option>
                      </select>
                    </Field>
                    <Field label="Primary sales channel">
                      <input className={s.formInput} value={data.salesStrategy && data.salesStrategy.split('—')[0]} onChange={e => up('salesChannel', e.target.value)} placeholder="e.g. Direct B2B, partnerships, online…" />
                    </Field>
                  </div>
                  <Field
                    label="What is your route to market? How will you acquire customers?"
                    hint="Innovator International: 'Do you have a clear and achievable route to market, including capability to identify, develop and achieve sales targets as your business grows?'"
                  >
                    <Textarea value={data.routeToMarket} onChange={v => up('routeToMarket', v)} placeholder="e.g. Primary channel: direct outreach to NHS ICU Clinical Directors via clinical network (I have existing relationships with 23 ICU leads). Secondary: NHS Supply Chain procurement framework listing (Year 2). Supported by conference presence at ESICM and UKACES annual meetings. Customer acquisition cost estimated at £4,200 per trust (3 months sales cycle)…" />
                  </Field>
                  <Field
                    label="How will you scale sales as the business grows?"
                    hint="Show you understand the transition from founder-led sales to a repeatable sales process."
                  >
                    <Textarea value={data.salesStrategy} onChange={v => up('salesStrategy', v)} placeholder="e.g. Year 1: founder-led sales (I personally lead all deals). Year 2: hire 1 clinical sales rep with NHS procurement background. Year 3: 2 sales reps + SDR. Target conversion rate 25% from demo to close. Year 2 pipeline target: 80 qualified leads…" />
                  </Field>
                </div>
                <div className={s.navRow}>
                  <button className={s.btnBack} onClick={() => setStep(3)}>← Back</button>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span className={s.stepCounter}>Step 5 / 8</span>
                    <button className={s.btnNext} onClick={() => setStep(5)}>Next: People →</button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5 — People & Operations */}
            {step === 5 && (
              <div className={s.card}>
                <div className={s.cardInner}>
                  <span className={s.stepTag}>Step 6 of 8 — People & Operations</span>
                  <h1 className={s.stepTitle}>Team, skills and how the business runs</h1>
                  <p className={s.stepSub}>
                    Assessors ask: <em>Do you have relevant skills to make this a success?</em> and <em>is there a sufficient growth plan for recruitment?</em> List every person involved and be honest about skill gaps.
                  </p>
                  <Field label="Describe your team — who is involved and what are their roles?">
                    <Textarea value={data.team} onChange={v => up('team', v)} placeholder="e.g. Founder (me): clinical AI, product development. Co-founder [Name]: software engineering (10 yrs). Advisory board: Prof. [Name] (ICU medicine, UCL); [Name] (former NHS Chief Digital Officer). External: UI/UX agency for front-end only (not core innovation)…" />
                  </Field>
                  <Field
                    label="What skills do you have and what gaps exist? How will you fill them?"
                    hint="Innovator International: 'Do you have relevant skills and experience, and is there a sufficient growth plan for recruitment of more people into the business?'"
                  >
                    <Textarea value={data.skills} onChange={v => up('skills', v)} placeholder="e.g. Strong: clinical domain expertise, ML/AI, academic research. Gap: enterprise sales — hiring clinical sales rep Q3 Year 1. Gap: regulatory affairs — engaging CRO consultant until we can hire in-house (Year 2). Gap: finance — accountant on retainer; CFO hire planned Year 2…" />
                  </Field>
                  <Field
                    label="Operational plan — how will the business run day-to-day?"
                    hint="Innovator International: 'Do you have a plan to achieve objectives within the timeframe? Include technical development plan, required resources, partnerships, growth/scaling strategy.'"
                  >
                    <Textarea value={data.operationalPlan} onChange={v => up('operationalPlan', v)} placeholder="e.g. Q1: complete NHS data governance agreements. Q2: launch beta at GSTT ICU. Q3: ISO 13485 certification process begins. Q4: first commercial deployment. Development methodology: 2-week agile sprints. Cloud infrastructure: AWS (HIPAA/NHS DSP Toolkit compliant). Data: all patient data stored in UK-only AWS regions…" />
                  </Field>
                  <Field label="Key partnerships, suppliers, or strategic relationships">
                    <Textarea value={data.partnerships} onChange={v => up('partnerships', v)} placeholder="e.g. King's College London: research MoU (data access). AWS Healthcare: HIPAA-compliant hosting partner. Synnovis: laboratory data integration partner. NHS Supply Chain: framework application submitted…" />
                  </Field>
                </div>
                <div className={s.navRow}>
                  <button className={s.btnBack} onClick={() => setStep(4)}>← Back</button>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span className={s.stepCounter}>Step 6 / 8</span>
                    <button className={s.btnNext} onClick={() => setStep(6)}>Next: Financials →</button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 6 — Financials */}
            {step === 6 && (
              <div className={s.card}>
                <div className={s.cardInner}>
                  <span className={s.stepTag}>Step 7 of 8 — Financial Plan</span>
                  <h1 className={s.stepTitle}>3-year financial projections</h1>
                  <p className={s.stepSub}>
                    Envestors require a <strong>Year 1 detailed financial plan including cash flow</strong>. Innovator International assess: <em>can the business meet its financial requirements?</em> and <em>are assumptions realistic?</em> Be conservative — assessors compare future checkpoint performance against these numbers.
                  </p>
                  {[
                    { year: 'Year 1', rev: 'y1Revenue', cost: 'y1Costs' },
                    { year: 'Year 2', rev: 'y2Revenue', cost: 'y2Costs' },
                    { year: 'Year 3', rev: 'y3Revenue', cost: 'y3Costs' },
                  ].map(({ year, rev, cost }) => {
                    const r = parseFloat(data[rev]) || 0;
                    const c = parseFloat(data[cost]) || 0;
                    const net = r - c;
                    return (
                      <div key={year} className={s.financeSection}>
                        <div className={s.financeYear}>{year}</div>
                        <div className={s.formRow}>
                          <Field label="Revenue (£)">
                            <input className={s.formInput} type="number" min="0" value={data[rev]} onChange={e => up(rev, e.target.value)} placeholder="0" />
                          </Field>
                          <Field label="Total Costs (£)">
                            <input className={s.formInput} type="number" min="0" value={data[cost]} onChange={e => up(cost, e.target.value)} placeholder="0" />
                          </Field>
                          <Field label="Net Profit / Loss">
                            <input className={s.formInput} value={r || c ? `£${net.toLocaleString()}` : ''} readOnly style={{ color: net >= 0 ? 'var(--safe)' : '#e74c3c', fontWeight: 700 }} placeholder="Auto-calculated" />
                          </Field>
                        </div>
                      </div>
                    );
                  })}
                  <Field
                    label="Funding breakdown — main cost drivers and how you will fund the business"
                    hint="Innovator International: 'Does the business demonstrate how it will meet all financial requirements, including contingency?'"
                  >
                    <Textarea value={data.fundingBreakdown} onChange={v => up('fundingBreakdown', v)} placeholder="e.g. Year 1 costs: salaries £85k (me + 1 hire), AWS hosting £12k, regulatory consulting £18k, marketing/conferences £8k, office/legal £7k = £130k total. Funded by £100k personal savings + £50k UKRI Innovate UK grant (applied, decision Jan 2025)…" />
                  </Field>
                  <Field
                    label="Contingency plan — what if revenue is lower than forecast?"
                    hint="Assessors want to see you've thought about downside scenarios. This shows business maturity."
                  >
                    <Textarea value={data.contingency} onChange={v => up('contingency', v)} placeholder="e.g. If Year 1 revenue is 50% of forecast: reduce AWS spend by migrating to lower-tier instances (saves £6k). Delay hiring by 6 months (saves £35k). Extend personal runway to 24 months with £40k personal savings reserve. At 20% of forecast: apply for SBRI Healthcare funding (£100k NHS grant available for this application)…" />
                  </Field>
                </div>
                <div className={s.navRow}>
                  <button className={s.btnBack} onClick={() => setStep(5)}>← Back</button>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span className={s.stepCounter}>Step 7 / 8</span>
                    <button className={s.btnNext} onClick={() => setStep(7)}>Next: Documents →</button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 7 — Documents */}
            {step === 7 && (
              <div className={s.card}>
                <div className={s.cardInner}>
                  <span className={s.stepTag}>Step 8 of 8 — Documents Checklist</span>
                  <h1 className={s.stepTitle}>Are your supporting documents ready?</h1>
                  <p className={s.stepSub}>
                    Both Envestors and Innovator International require these documents before they will assess your application. Tick everything you have ready. <strong>Do not approach an endorsing body without completing your document pack</strong> — the fee is non-refundable.
                  </p>
                  <div className={s.checkGrid}>
                    {DOCS.map(doc => {
                      const checked = data.docs.includes(doc.id);
                      return (
                        <div
                          key={doc.id}
                          className={`${s.checkItem} ${checked ? s.checkItemChecked : ''}`}
                          onClick={() => toggleDoc(doc.id)}
                        >
                          <div className={`${s.checkBox} ${checked ? s.checkBoxChecked : ''}`}>
                            {checked && '✓'}
                          </div>
                          <div>
                            <div className={s.checkLabel}>{doc.label}</div>
                            <div className={s.checkNote}>{doc.note}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className={s.navRow}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <button className={s.btnBack} onClick={() => setStep(6)}>← Back</button>
                    <button className={s.btnReset} onClick={reset}>Clear all</button>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span className={s.stepCounter}>{data.docs.length}/{DOCS.length} docs ready</span>
                    <button className={s.btnReview} onClick={() => setReview(true)}>View Assessment →</button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
