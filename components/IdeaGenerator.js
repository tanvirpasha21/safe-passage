import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import s from '../styles/IdeaGenerator.module.css';

// Guard against the key being undefined during any pre-render phase
const stripePromise =
  typeof window !== 'undefined' && process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
    : null;

const SECTORS = [
  'Artificial Intelligence & Machine Learning',
  'Health Tech & Digital Health',
  'FinTech & Financial Services',
  'EdTech & Future of Learning',
  'Clean Energy & Sustainability',
  'AgriTech & Food Innovation',
  'Cybersecurity',
  'Advanced Manufacturing & Deep Tech',
  'Retail Tech & E-commerce',
  'PropTech & Construction',
  'LegalTech',
  'Media, Content & Creative Industries',
  'Logistics & Supply Chain',
  'Social Impact & GovTech',
  'Other (describe in motivation field)',
];

// ── Step 1: Profile Form ───────────────────────────────────────────────────
function ProfileForm({ onNext }) {
  const [form, setForm] = useState({ sector: '', degree: '', motivation: '' });
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!form.sector) e.sector = 'Please select a sector.';
    if (!form.degree.trim() || form.degree.trim().length < 5)
      e.degree = 'Please describe your academic background (min 5 characters).';
    if (!form.motivation.trim() || form.motivation.trim().length < 20)
      e.motivation = 'Please describe your motivation (min 20 characters).';
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    onNext(form);
  }

  return (
    <form className={s.profileForm} onSubmit={handleSubmit} noValidate>
      <div className={s.formHeader}>
        <span className={s.formStep}>Step 1 of 3</span>
        <h2 className={s.formTitle}>Tell us about yourself</h2>
        <p className={s.formSub}>
          Your profile is the foundation. The more specific you are, the more
          tailored and actionable your business ideas will be.
        </p>
      </div>

      <div className={s.fieldGroup}>
        <label className={s.label} htmlFor="sector">
          Which sector have you been working in?
          <span className={s.required}>*</span>
        </label>
        <select
          id="sector"
          className={`${s.select} ${errors.sector ? s.inputError : ''}`}
          value={form.sector}
          onChange={(e) => setForm({ ...form, sector: e.target.value })}
        >
          <option value="">Select your primary sector…</option>
          {SECTORS.map((sec) => (
            <option key={sec} value={sec}>{sec}</option>
          ))}
        </select>
        {errors.sector && <span className={s.errorMsg}>{errors.sector}</span>}
      </div>

      <div className={s.fieldGroup}>
        <label className={s.label} htmlFor="degree">
          What is your academic / degree background?
          <span className={s.required}>*</span>
        </label>
        <input
          id="degree"
          type="text"
          className={`${s.input} ${errors.degree ? s.inputError : ''}`}
          placeholder="e.g. BSc Computer Science, MBA, MSc Biomedical Engineering"
          value={form.degree}
          onChange={(e) => setForm({ ...form, degree: e.target.value })}
        />
        {errors.degree && <span className={s.errorMsg}>{errors.degree}</span>}
      </div>

      <div className={s.fieldGroup}>
        <label className={s.label} htmlFor="motivation">
          What is your motivation and vision for your future business?
          <span className={s.required}>*</span>
        </label>
        <textarea
          id="motivation"
          className={`${s.textarea} ${errors.motivation ? s.inputError : ''}`}
          rows={4}
          placeholder="Describe what problems you want to solve, who you want to help, your values, and any early ideas you have (even rough ones)."
          value={form.motivation}
          onChange={(e) => setForm({ ...form, motivation: e.target.value })}
        />
        <span className={s.charCount}>{form.motivation.length} characters</span>
        {errors.motivation && <span className={s.errorMsg}>{errors.motivation}</span>}
      </div>

      <div className={s.formFooter}>
        <button type="submit" className={s.primaryBtn}>
          Continue to payment →
        </button>
        <p className={s.footerNote}>
          You will be charged <strong>£10.00</strong> before ideas are generated.
          This is a one-time, non-refundable fee per session.
        </p>
      </div>
    </form>
  );
}

// ── Step 2: Payment (inner form — inside Elements) ─────────────────────────
const CARD_STYLE = {
  style: {
    base: {
      color: '#e8eaed',
      fontFamily: 'Inter, system-ui, sans-serif',
      fontSize: '15px',
      '::placeholder': { color: 'rgba(255,255,255,0.3)' },
    },
    invalid: { color: '#f87171' },
  },
};

function PaymentForm({ profile, clientSecret, onSuccess, onBack }) {
  const stripe = useStripe();
  const elements = useElements();
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState('');
  const [cardReady, setCardReady] = useState(false);

  async function handlePay(e) {
    e.preventDefault();
    if (!stripe || !elements) return;
    setPaying(true);
    setError('');

    const cardElement = elements.getElement(CardElement);
    const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      { payment_method: { card: cardElement } }
    );

    if (confirmError) {
      setError(confirmError.message || 'Payment failed. Please try again.');
      setPaying(false);
      return;
    }

    if (paymentIntent?.status === 'succeeded') {
      onSuccess(paymentIntent.id);
    } else {
      setError('Payment did not complete. Please try again.');
      setPaying(false);
    }
  }

  return (
    <form className={s.paymentForm} onSubmit={handlePay}>
      <div className={s.formHeader}>
        <span className={s.formStep}>Step 2 of 3</span>
        <h2 className={s.formTitle}>Secure payment — £10.00</h2>
        <p className={s.formSub}>
          Your payment unlocks one session of personalised idea generation.
          You will receive 3 tailored ideas + 2 adjacent field opportunities
          with a full downloadable report.
        </p>
      </div>

      <div className={s.paymentSummaryBox}>
        <div className={s.paymentSummaryRow}>
          <span>Profile sector</span>
          <strong>{profile.sector}</strong>
        </div>
        <div className={s.paymentSummaryRow}>
          <span>Academic background</span>
          <strong>{profile.degree}</strong>
        </div>
        <div className={s.paymentSummaryDivider} />
        <div className={s.paymentSummaryRow}>
          <span>Idea Generator — 1 session</span>
          <strong className={s.priceTag}>£10.00</strong>
        </div>
      </div>

      <div className={s.stripeElementWrapper}>
        <div className={s.cardLabel}>Card details</div>
        <div className={s.cardElementBox}>
          <CardElement
            options={CARD_STYLE}
            onReady={() => setCardReady(true)}
            onChange={(e) => { if (e.error) setError(e.error.message); else setError(''); }}
          />
        </div>
      </div>

      {error && <div className={s.paymentError}>{error}</div>}

      <div className={s.paymentActions}>
        <button
          type="button"
          className={s.secondaryBtn}
          onClick={onBack}
          disabled={paying}
        >
          ← Back
        </button>
        <button
          type="submit"
          className={s.primaryBtn}
          disabled={paying || !stripe || !cardReady}
        >
          {paying ? (
            <>
              <span className={s.spinner} /> Processing…
            </>
          ) : (
            'Pay £10.00 & Generate Ideas'
          )}
        </button>
      </div>

      <p className={s.stripeNote}>
        Payments are processed securely by Stripe. SafePassage never stores your
        card details. This charge will appear as &ldquo;SafePassage&rdquo; on
        your statement.
      </p>
    </form>
  );
}

// ── Step 3: Loading ────────────────────────────────────────────────────────
function LoadingScreen() {
  const steps = [
    { icon: '🔍', text: 'Scanning live UKRI investment opportunities…' },
    { icon: '📊', text: 'Analysing Innovate UK funding priorities for 2025–2026…' },
    { icon: '🧠', text: 'Matching your profile against UK market gaps…' },
    { icon: '💡', text: 'Generating your 3 personalised business ideas…' },
    { icon: '📈', text: 'Building full viability and scalability reports…' },
    { icon: '✅', text: 'Finalising your 2 adjacent field opportunities…' },
  ];
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={s.loadingScreen}>
      <div className={s.loadingOrb} />
      <h2 className={s.loadingTitle}>Generating your personalised ideas</h2>
      <p className={s.loadingSub}>
        This takes 15–30 seconds. Please do not close this window.
      </p>
      <div className={s.loadingSteps}>
        {steps.map((step, i) => (
          <div
            key={i}
            className={`${s.loadingStep} ${
              i < activeStep ? s.loadingStepDone : i === activeStep ? s.loadingStepActive : ''
            }`}
          >
            <span className={s.loadingStepIcon}>{step.icon}</span>
            <span className={s.loadingStepText}>{step.text}</span>
            {i < activeStep && <span className={s.loadingCheck}>✓</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Step 4: Results ────────────────────────────────────────────────────────
function ScorePill({ label, score, color }) {
  return (
    <div className={s.scorePill} style={{ '--score-color': color }}>
      <div
        className={s.scoreBar}
        style={{ width: `${score}%`, background: color }}
      />
      <span className={s.scoreLabel}>{label}</span>
      <span className={s.scoreValue}>{score}</span>
    </div>
  );
}

function IdeaCard({ idea, index }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={s.ideaCard}>
      <div className={s.ideaCardHeader}>
        <span className={s.ideaNum}>Idea {idea.id}</span>
        <span className={s.ideaSector}>{idea.sector}</span>
      </div>
      <h3 className={s.ideaTitle}>{idea.title}</h3>
      <p className={s.ideaTagline}>{idea.tagline}</p>

      <div className={s.scoreRow}>
        <ScorePill label="Innovation" score={idea.innovationScore} color="#2a9d8f" />
        <ScorePill label="Viability" score={idea.viabilityScore} color="#3b82f6" />
        <ScorePill label="Scalability" score={idea.scalabilityScore} color="#8b5cf6" />
      </div>

      <div className={s.ideaHighlights}>
        <div className={s.highlight}>
          <span className={s.highlightIcon}>💰</span>
          <div>
            <div className={s.highlightLabel}>Revenue Model</div>
            <div className={s.highlightValue}>{idea.revenueModel}</div>
          </div>
        </div>
        <div className={s.highlight}>
          <span className={s.highlightIcon}>🎯</span>
          <div>
            <div className={s.highlightLabel}>Market Opportunity</div>
            <div className={s.highlightValue}>{idea.marketOpportunity}</div>
          </div>
        </div>
        <div className={s.highlight}>
          <span className={s.highlightIcon}>🏛️</span>
          <div>
            <div className={s.highlightLabel}>UK Gov. Alignment</div>
            <div className={s.highlightValue}>{idea.ukGovernmentAlignment}</div>
          </div>
        </div>
        <div className={s.highlight}>
          <span className={s.highlightIcon}>🛡️</span>
          <div>
            <div className={s.highlightLabel}>Competitive Advantage</div>
            <div className={s.highlightValue}>{idea.competitiveAdvantage}</div>
          </div>
        </div>
      </div>

      <button
        className={s.expandBtn}
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? 'Hide full report ▲' : 'View full report ▼'}
      </button>

      {expanded && (
        <div className={s.expandedReport}>
          <ReportSection icon="💡" title="Why it's Innovative" content={idea.whyInnovative} />
          <ReportSection icon="✅" title="Why it's Viable" content={idea.whyViable} />
          <ReportSection icon="📈" title="Why it's Scalable" content={idea.whyScalable} />
          <ReportSection icon="👤" title="Founder Fit" content={idea.founderFit} />
          <ReportSection icon="🎯" title="Target Customers" content={idea.targetCustomers} />

          <div className={s.reportBlock}>
            <div className={s.reportBlockTitle}>📅 Year 1 Milestones</div>
            <ul className={s.milestoneList}>
              {idea.year1Milestones?.map((m, i) => (
                <li key={i} className={s.milestoneItem}>
                  <span className={s.milestoneDot} />
                  {m}
                </li>
              ))}
            </ul>
          </div>

          <div className={s.reportRow2}>
            <div className={s.reportBlock}>
              <div className={s.reportBlockTitle}>💸 Est. Startup Cost</div>
              <div className={s.reportBlockVal}>{idea.estimatedStartupCost}</div>
            </div>
            <div className={s.reportBlock}>
              <div className={s.reportBlockTitle}>🏦 Funding Routes</div>
              <ul className={s.tagList}>
                {idea.fundingRoutes?.map((f, i) => (
                  <li key={i} className={s.tag}>{f}</li>
                ))}
              </ul>
            </div>
            <div className={s.reportBlock}>
              <div className={s.reportBlockTitle}>📋 Endorsement Strength</div>
              <div className={s.reportBlockVal}>{idea.endorsingBodyStrength}</div>
            </div>
          </div>

          <div className={s.reportBlock}>
            <div className={s.reportBlockTitle}>⚠️ Key Risks</div>
            <ul className={s.riskList}>
              {idea.risks?.map((r, i) => (
                <li key={i} className={s.riskItem}>{r}</li>
              ))}
            </ul>
          </div>

          <div className={s.verdictBox}>
            <div className={s.verdictTitle}>Overall Verdict</div>
            <p className={s.verdictText}>{idea.overallVerdict}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function ReportSection({ icon, title, content }) {
  return (
    <div className={s.reportSection}>
      <div className={s.reportSectionTitle}>
        {icon} {title}
      </div>
      <p className={s.reportSectionContent}>{content}</p>
    </div>
  );
}

function AdjacentCard({ idea }) {
  return (
    <div className={s.adjacentCard}>
      <div className={s.adjacentHeader}>
        <span className={s.adjacentBadge}>Adjacent Field {idea.id}</span>
        <span className={s.adjacentField}>{idea.adjacentField}</span>
      </div>
      <h4 className={s.adjacentTitle}>{idea.title}</h4>
      <p className={s.adjacentTagline}>{idea.tagline}</p>
      <div className={s.adjacentDetail}>
        <div className={s.adjacentDetailRow}>
          <span className={s.adjacentDetailLabel}>Why UK Gov. Invests Here</span>
          <p className={s.adjacentDetailVal}>{idea.whyUKGovernmentCares}</p>
        </div>
        <div className={s.adjacentDetailRow}>
          <span className={s.adjacentDetailLabel}>Your Transfer Advantage</span>
          <p className={s.adjacentDetailVal}>{idea.connectionToProfile}</p>
        </div>
        <div className={s.adjacentDetailRow}>
          <span className={s.adjacentDetailLabel}>The Opportunity</span>
          <p className={s.adjacentDetailVal}>{idea.opportunity}</p>
        </div>
        <div className={s.adjacentDetailRow}>
          <span className={s.adjacentDetailLabel}>Key Challenge</span>
          <p className={s.adjacentDetailVal}>{idea.keyChallenge}</p>
        </div>
      </div>
    </div>
  );
}

function ResultsScreen({ ideas, profile, generatedAt, onDownload }) {
  const [downloaded, setDownloaded] = useState(false);

  function handleDownload() {
    onDownload();
    setDownloaded(true);
  }

  return (
    <div className={s.resultsScreen}>
      {/* Download warning banner */}
      <div className={s.downloadWarning}>
        <span className={s.warningIcon}>⚠️</span>
        <div>
          <strong>Download your report before leaving this page.</strong> This session is
          tied to your one-time payment. If you close or refresh this page without
          downloading, you will need to pay again to regenerate your ideas.
        </div>
        <button
          className={`${s.downloadBtn} ${downloaded ? s.downloadBtnDone : ''}`}
          onClick={handleDownload}
        >
          {downloaded ? '✓ Downloaded' : '⬇ Download Report (PDF)'}
        </button>
      </div>

      {/* Applicant summary */}
      <div className={s.applicantSummaryBox}>
        <div className={s.applicantSummaryTag}>Your Profile Analysis</div>
        <p className={s.applicantSummaryText}>{ideas.applicantSummary}</p>
        <div className={s.applicantMeta}>
          <span>Sector: <strong>{profile.sector}</strong></span>
          <span>Background: <strong>{profile.degree}</strong></span>
          <span className={s.generatedAt}>Generated {new Date(generatedAt).toLocaleString('en-GB')}</span>
        </div>
      </div>

      {/* Main 3 ideas */}
      <div className={s.sectionHeader}>
        <span className={s.sectionTag}>Primary Recommendations</span>
        <h3 className={s.sectionHeading}>Your 3 Personalised Business Ideas</h3>
        <p className={s.sectionDesc}>
          Each idea is scored against the UK Home Office IVS criteria (Innovative,
          Viable, Scalable) and aligned with current UKRI / Innovate UK investment priorities.
        </p>
      </div>

      <div className={s.ideasGrid}>
        {ideas.mainIdeas?.map((idea, i) => (
          <IdeaCard key={idea.id} idea={idea} index={i} />
        ))}
      </div>

      {/* Adjacent field ideas */}
      <div className={s.sectionHeader} style={{ marginTop: '3rem' }}>
        <span className={s.sectionTag} style={{ background: 'rgba(139,92,246,0.1)', color: '#a78bfa', borderColor: 'rgba(139,92,246,0.25)' }}>
          Adjacent Opportunities
        </span>
        <h3 className={s.sectionHeading}>2 Adjacent Fields the UK Government is Investing In</h3>
        <p className={s.sectionDesc}>
          These ideas are outside your primary sector but leverage your transferable skills.
          UK government investment in these areas makes them particularly strong candidates
          for Innovate UK funding alongside your Innovator Founder Visa application.
        </p>
      </div>

      <div className={s.adjacentGrid}>
        {ideas.adjacentIdeas?.map((idea) => (
          <AdjacentCard key={idea.id} idea={idea} />
        ))}
      </div>

      {/* Report summary */}
      <div className={s.reportSummaryBox}>
        <div className={s.reportSummaryTag}>Report Summary</div>
        <p className={s.reportSummaryText}>{ideas.reportSummary}</p>
      </div>

      {/* Final CTA */}
      <div className={s.finalCta}>
        <div className={s.finalCtaInner}>
          <h4 className={s.finalCtaTitle}>Ready to build your business plan?</h4>
          <p className={s.finalCtaDesc}>
            Now you have your ideas, the next step is to turn the strongest one into
            a full Innovator Founder Visa business plan. Use our free 8-step Business
            Plan Builder to structure your plan against all IVS criteria.
          </p>
          <div className={s.finalCtaBtns}>
            <a
              href="/tools/business-plan-builder"
              className={s.primaryBtn}
            >
              📝 Start Business Plan Builder →
            </a>
            <button className={s.outlineBtn} onClick={handleDownload}>
              ⬇ Download This Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Download helper — generates printable HTML report ─────────────────────
function generateReportHTML(ideas, profile, generatedAt) {
  const now = new Date(generatedAt).toLocaleString('en-GB');

  const ideaHTML = (ideas.mainIdeas || [])
    .map(
      (idea) => `
    <div style="border:1px solid #ddd;border-radius:8px;padding:24px;margin-bottom:24px;page-break-inside:avoid;">
      <div style="display:flex;gap:12px;align-items:center;margin-bottom:8px;">
        <span style="background:#e8f5f3;color:#1a7a6e;border-radius:4px;padding:3px 10px;font-size:12px;font-weight:700;">IDEA ${idea.id}</span>
        <span style="background:#f0f4ff;color:#3b5bdb;border-radius:4px;padding:3px 10px;font-size:12px;">${idea.sector}</span>
      </div>
      <h2 style="margin:0 0 6px;font-size:20px;color:#111;">${idea.title}</h2>
      <p style="margin:0 0 16px;color:#555;font-style:italic;">${idea.tagline}</p>
      <div style="display:flex;gap:16px;margin-bottom:20px;">
        <div style="flex:1;background:#f8f9fa;border-radius:6px;padding:12px;text-align:center;">
          <div style="font-size:22px;font-weight:800;color:#1a7a6e;">${idea.innovationScore}</div>
          <div style="font-size:11px;color:#666;text-transform:uppercase;">Innovation</div>
        </div>
        <div style="flex:1;background:#f8f9fa;border-radius:6px;padding:12px;text-align:center;">
          <div style="font-size:22px;font-weight:800;color:#3b82f6;">${idea.viabilityScore}</div>
          <div style="font-size:11px;color:#666;text-transform:uppercase;">Viability</div>
        </div>
        <div style="flex:1;background:#f8f9fa;border-radius:6px;padding:12px;text-align:center;">
          <div style="font-size:22px;font-weight:800;color:#7c3aed;">${idea.scalabilityScore}</div>
          <div style="font-size:11px;color:#666;text-transform:uppercase;">Scalability</div>
        </div>
      </div>
      <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
        <tr><td style="padding:8px;border:1px solid #eee;font-size:12px;color:#555;width:30%;font-weight:600;">Revenue Model</td><td style="padding:8px;border:1px solid #eee;font-size:13px;">${idea.revenueModel}</td></tr>
        <tr><td style="padding:8px;border:1px solid #eee;font-size:12px;color:#555;font-weight:600;background:#fafafa;">Market Opportunity</td><td style="padding:8px;border:1px solid #eee;font-size:13px;background:#fafafa;">${idea.marketOpportunity}</td></tr>
        <tr><td style="padding:8px;border:1px solid #eee;font-size:12px;color:#555;font-weight:600;">Target Customers</td><td style="padding:8px;border:1px solid #eee;font-size:13px;">${idea.targetCustomers}</td></tr>
        <tr><td style="padding:8px;border:1px solid #eee;font-size:12px;color:#555;font-weight:600;background:#fafafa;">Competitive Advantage</td><td style="padding:8px;border:1px solid #eee;font-size:13px;background:#fafafa;">${idea.competitiveAdvantage}</td></tr>
        <tr><td style="padding:8px;border:1px solid #eee;font-size:12px;color:#555;font-weight:600;">UK Gov. Alignment</td><td style="padding:8px;border:1px solid #eee;font-size:13px;">${idea.ukGovernmentAlignment}</td></tr>
        <tr><td style="padding:8px;border:1px solid #eee;font-size:12px;color:#555;font-weight:600;background:#fafafa;">Est. Startup Cost</td><td style="padding:8px;border:1px solid #eee;font-size:13px;background:#fafafa;">${idea.estimatedStartupCost}</td></tr>
        <tr><td style="padding:8px;border:1px solid #eee;font-size:12px;color:#555;font-weight:600;">Funding Routes</td><td style="padding:8px;border:1px solid #eee;font-size:13px;">${(idea.fundingRoutes || []).join(' · ')}</td></tr>
      </table>
      <h4 style="margin:0 0 6px;font-size:13px;font-weight:700;color:#333;">Why it's Innovative</h4>
      <p style="margin:0 0 12px;font-size:13px;color:#444;line-height:1.6;">${idea.whyInnovative}</p>
      <h4 style="margin:0 0 6px;font-size:13px;font-weight:700;color:#333;">Why it's Viable</h4>
      <p style="margin:0 0 12px;font-size:13px;color:#444;line-height:1.6;">${idea.whyViable}</p>
      <h4 style="margin:0 0 6px;font-size:13px;font-weight:700;color:#333;">Why it's Scalable</h4>
      <p style="margin:0 0 12px;font-size:13px;color:#444;line-height:1.6;">${idea.whyScalable}</p>
      <h4 style="margin:0 0 6px;font-size:13px;font-weight:700;color:#333;">Founder Fit</h4>
      <p style="margin:0 0 12px;font-size:13px;color:#444;line-height:1.6;">${idea.founderFit}</p>
      <h4 style="margin:0 0 8px;font-size:13px;font-weight:700;color:#333;">Year 1 Milestones</h4>
      <ul style="margin:0 0 12px;padding-left:20px;">${(idea.year1Milestones || []).map((m) => `<li style="font-size:13px;color:#444;margin-bottom:4px;">${m}</li>`).join('')}</ul>
      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:6px;padding:16px;margin-top:16px;">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:#166534;margin-bottom:6px;">OVERALL VERDICT</div>
        <p style="margin:0;font-size:13px;color:#166534;line-height:1.6;">${idea.overallVerdict}</p>
      </div>
      <div style="margin-top:12px;background:#fef9e7;border:1px solid #fde68a;border-radius:6px;padding:12px;">
        <div style="font-size:11px;font-weight:700;color:#92400e;margin-bottom:4px;">KEY RISKS</div>
        <ul style="margin:0;padding-left:20px;">${(idea.risks || []).map((r) => `<li style="font-size:12px;color:#92400e;margin-bottom:2px;">${r}</li>`).join('')}</ul>
      </div>
    </div>`
    )
    .join('');

  const adjHTML = (ideas.adjacentIdeas || [])
    .map(
      (idea) => `
    <div style="border:1px solid #e9d5ff;border-radius:8px;padding:20px;margin-bottom:16px;background:#faf5ff;page-break-inside:avoid;">
      <div style="display:flex;gap:10px;align-items:center;margin-bottom:8px;">
        <span style="background:#ede9fe;color:#6d28d9;border-radius:4px;padding:3px 10px;font-size:11px;font-weight:700;">ADJACENT FIELD ${idea.id}</span>
        <span style="font-size:13px;font-weight:700;color:#5b21b6;">${idea.adjacentField}</span>
      </div>
      <h3 style="margin:0 0 4px;font-size:17px;color:#1e1b4b;">${idea.title}</h3>
      <p style="margin:0 0 12px;font-style:italic;color:#6d28d9;font-size:13px;">${idea.tagline}</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        <div><div style="font-size:11px;font-weight:700;color:#6d28d9;text-transform:uppercase;margin-bottom:4px;">Why UK Gov. Invests Here</div><p style="margin:0;font-size:12px;color:#444;line-height:1.6;">${idea.whyUKGovernmentCares}</p></div>
        <div><div style="font-size:11px;font-weight:700;color:#6d28d9;text-transform:uppercase;margin-bottom:4px;">Your Transfer Advantage</div><p style="margin:0;font-size:12px;color:#444;line-height:1.6;">${idea.connectionToProfile}</p></div>
        <div style="grid-column:span 2"><div style="font-size:11px;font-weight:700;color:#6d28d9;text-transform:uppercase;margin-bottom:4px;">The Opportunity</div><p style="margin:0;font-size:12px;color:#444;line-height:1.6;">${idea.opportunity}</p></div>
        <div style="grid-column:span 2;background:#fff;border:1px solid #ddd6fe;border-radius:4px;padding:10px;"><div style="font-size:11px;font-weight:700;color:#7c3aed;text-transform:uppercase;margin-bottom:4px;">Key Challenge</div><p style="margin:0;font-size:12px;color:#444;">${idea.keyChallenge}</p></div>
      </div>
    </div>`
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>SafePassage Idea Generator Report — ${now}</title>
<style>
  @media print { body { margin: 0; } .no-print { display: none; } }
  body { font-family: Arial, Helvetica, sans-serif; color: #222; max-width: 900px; margin: 0 auto; padding: 32px 24px; }
</style>
</head>
<body>
  <div style="border-bottom:3px solid #2a9d8f;padding-bottom:20px;margin-bottom:28px;">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;">
      <div>
        <div style="font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#2a9d8f;margin-bottom:6px;">SafePassage · Innovator Founder Visa</div>
        <h1 style="margin:0 0 4px;font-size:26px;color:#111;">Personalised Business Idea Report</h1>
        <p style="margin:0;color:#666;font-size:13px;">Generated: ${now}</p>
      </div>
      <div style="text-align:right;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:6px;padding:12px 16px;">
        <div style="font-size:11px;color:#166534;font-weight:600;text-transform:uppercase;margin-bottom:4px;">Confidential</div>
        <div style="font-size:12px;color:#333;">For personal use only</div>
      </div>
    </div>
  </div>

  <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:8px;padding:20px;margin-bottom:28px;">
    <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:#0369a1;margin-bottom:8px;">Applicant Profile</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px;">
      <div><span style="font-size:12px;color:#64748b;">Sector:</span> <strong style="font-size:13px;">${profile.sector}</strong></div>
      <div><span style="font-size:12px;color:#64748b;">Degree:</span> <strong style="font-size:13px;">${profile.degree}</strong></div>
    </div>
    <div><span style="font-size:12px;color:#64748b;">Motivation:</span> <p style="margin:4px 0 0;font-size:13px;line-height:1.6;color:#334155;">${profile.motivation}</p></div>
  </div>

  <div style="background:#f8f9fa;border-left:4px solid #2a9d8f;padding:16px 20px;margin-bottom:28px;border-radius:0 6px 6px 0;">
    <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:#2a9d8f;margin-bottom:6px;">Profile Analysis</div>
    <p style="margin:0;font-size:13px;color:#444;line-height:1.7;">${ideas.applicantSummary}</p>
  </div>

  <h2 style="font-size:20px;border-bottom:1px solid #eee;padding-bottom:10px;margin-bottom:20px;color:#111;">Your 3 Personalised Business Ideas</h2>
  ${ideaHTML}

  <h2 style="font-size:20px;border-bottom:1px solid #e9d5ff;padding-bottom:10px;margin-bottom:20px;color:#1e1b4b;margin-top:32px;">2 Adjacent Field Opportunities</h2>
  ${adjHTML}

  <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:20px;margin-top:28px;">
    <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:#166534;margin-bottom:8px;">Report Summary</div>
    <p style="margin:0;font-size:14px;color:#166534;line-height:1.7;">${ideas.reportSummary}</p>
  </div>

  <div style="margin-top:28px;border-top:1px solid #eee;padding-top:16px;font-size:11px;color:#999;">
    This report was generated by SafePassage using AI and live UKRI data. It does not constitute legal, immigration, or financial advice.
    Always consult a regulated immigration solicitor regarding your specific visa circumstances.
    SafePassage · safepassage.co.uk
  </div>
</body>
</html>`;
}

// ── Payment wrapper (provides Stripe Elements context) ─────────────────────
// CardElement does not require clientSecret at the Elements level —
// it is only passed to stripe.confirmCardPayment() inside PaymentForm.
function PaymentWrapper({ profile, clientSecret, onSuccess, onBack }) {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm
        profile={profile}
        clientSecret={clientSecret}
        onSuccess={onSuccess}
        onBack={onBack}
      />
    </Elements>
  );
}

// ── Main exported component ────────────────────────────────────────────────
export default function IdeaGenerator() {
  const [step, setStep] = useState('profile'); // profile | payment | loading | results | error
  const [profile, setProfile] = useState(null);
  const [clientSecret, setClientSecret] = useState('');
  const [paymentIntentId, setPaymentIntentId] = useState('');
  const [ideas, setIdeas] = useState(null);
  const [generatedAt, setGeneratedAt] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // ── Warn before unload on results screen ──────────────────────────────
  useEffect(() => {
    if (step !== 'results') return;
    const handler = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [step]);

  async function handleProfileNext(profileData) {
    setProfile(profileData);
    setErrorMsg('');

    try {
      const res = await fetch('/api/idea-generator/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile: profileData }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to initialise payment');
      setClientSecret(data.clientSecret);
      setStep('payment');
    } catch (err) {
      setErrorMsg(err.message || 'Could not initialise payment. Please try again.');
    }
  }

  async function handlePaymentSuccess(piId) {
    setPaymentIntentId(piId);
    setStep('loading');

    try {
      const res = await fetch('/api/idea-generator/generate-ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentIntentId: piId, profile }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Idea generation failed');
      setIdeas(data.ideas);
      setGeneratedAt(data.generatedAt);
      setStep('results');
    } catch (err) {
      setErrorMsg(err.message || 'Failed to generate ideas. Please contact support with your payment reference.');
      setStep('error');
    }
  }

  function handleDownload() {
    if (!ideas || !profile) return;
    const html = generateReportHTML(ideas, profile, generatedAt);
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `safepassage-idea-report-${Date.now()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <div className={s.wrapper}>
      {step === 'profile' && (
        <>
          {errorMsg && (
            <div className={s.globalError}>
              <span>⚠️</span> {errorMsg}
            </div>
          )}
          <ProfileForm onNext={handleProfileNext} />
        </>
      )}

      {step === 'payment' && clientSecret && (
        <PaymentWrapper
          profile={profile}
          clientSecret={clientSecret}
          onSuccess={handlePaymentSuccess}
          onBack={() => setStep('profile')}
        />
      )}

      {step === 'loading' && <LoadingScreen />}

      {step === 'results' && ideas && (
        <ResultsScreen
          ideas={ideas}
          profile={profile}
          generatedAt={generatedAt}
          onDownload={handleDownload}
        />
      )}

      {step === 'error' && (
        <div className={s.errorScreen}>
          <span className={s.errorScreenIcon}>⚠️</span>
          <h3 className={s.errorScreenTitle}>Something went wrong</h3>
          <p className={s.errorScreenMsg}>{errorMsg}</p>
          <p className={s.errorScreenNote}>
            Your payment of £10.00 was taken (Payment ref:{' '}
            <code>{paymentIntentId}</code>). Please email{' '}
            <a href="mailto:tanvir@voidstudiotech.co.uk">tanvir@voidstudiotech.co.uk</a>{' '}
            with this reference and we will resolve it within 1 business day.
          </p>
          <button className={s.primaryBtn} onClick={() => { setStep('profile'); setErrorMsg(''); }}>
            Try again
          </button>
        </div>
      )}
    </div>
  );
}
