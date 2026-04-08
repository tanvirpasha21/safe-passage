import { useState } from 'react';
import PathwayPage, { SolicitorSection } from '../../../components/PathwayPage';
import styles from '../../../styles/Pathway.module.css';
import ev from '../../../styles/EnterpriseVisa.module.css';

/* ─────────────────────────────────────────────
   SECTOR DATA — sourced from GOV.UK guidance
───────────────────────────────────────────── */
const SECTORS = {
  digital: {
    id: 'digital',
    label: '💻 Digital Technology',
    endorserTitle: 'Endorsed by',
    endorsers: [
      {
        name: 'Tech Nation (via DCMS)',
        scope: 'Digital technology, AI, fintech, gaming, cybersecurity',
        detail: 'Tech Nation is the primary endorsing body for digital technology. It covers founders, executives, engineers, data scientists, and product leaders working in product-led technology companies.',
      },
    ],
    talentCriteria: [
      'Recognised as a leading talent in digital technology in the last 5 years',
      'Founded or held a senior executive role at a product-led technology company',
      'Made innovative contributions in new digital technology fields as an employee',
      'Made significant technical, commercial, or entrepreneurial contributions',
      'Published or endorsed research in peer-reviewed journals',
      'Made contributions to the sector outside of work (mentoring, open source, industry groups)',
    ],
    promiseCriteria: [
      'Recognised as potential future talent in digital technology',
      'Typically fewer than 5 years of professional experience',
      'Demonstrates clear leadership potential through skills and early achievements',
      'Has worked in or around a product-led technology company',
      'Shows ambition to contribute to the UK tech sector specifically',
    ],
    evidence: [
      'CV — maximum 3 A4 pages, typed',
      '3 recommendation letters from established experts who have known your work for 12+ months',
      'Letters must address your achievements, your UK contribution plans, and your future work intentions',
      'Proof of connection to a technology company (if applicable)',
      'Maximum 10 supporting documents demonstrating eligibility criteria',
    ],
    talentSettlement: '3 years',
    promiseSettlement: '5 years',
    notes: 'Tech Nation reviews applications on a rolling basis. There is no quota. Processing takes 5–8 weeks. Applicants may apply for the endorsement and visa simultaneously.',
  },
  research: {
    id: 'research',
    label: '🔬 Research & Academia',
    endorserTitle: 'Endorsed by one of',
    endorsers: [
      {
        name: 'Royal Society',
        scope: 'Science and medicine',
        detail: 'The Royal Society endorses outstanding scientists and researchers. Appropriate for those who have made significant contributions to natural sciences or medicine.',
      },
      {
        name: 'British Academy',
        scope: 'Humanities and social sciences',
        detail: 'The British Academy endorses leading scholars in humanities, social sciences, economics, law, politics, and cultural studies.',
      },
      {
        name: 'Royal Academy of Engineering',
        scope: 'Engineering and technology',
        detail: 'Covers engineering disciplines including mechanical, civil, chemical, electrical, aerospace, and emerging technology engineering.',
      },
      {
        name: 'UK Research and Innovation (UKRI)',
        scope: 'Research with approved UK funding body connections',
        detail: 'UKRI endorses researchers who have received grants from approved UK research councils (EPSRC, MRC, BBSRC, AHRC, etc.) or who have strong collaborative ties with UK research institutions.',
      },
    ],
    talentCriteria: [
      'Established leader in your field — recognised internationally',
      'Holder of prestigious prizes or fellowships in your discipline',
      'Significant funding secured in the past 10 years from reputable sources',
      'Demonstrated leadership of research teams or programmes',
      'Substantial publication record with significant citation impact',
    ],
    promiseCriteria: [
      'Early-career researcher with strong future leadership potential',
      'Held a prestigious early-career fellowship or secured competitive funding',
      'Received early-career prizes or awards recognising emerging talent',
      'Made significant contributions relative to career stage',
      'Demonstrated ability to develop independent research directions',
    ],
    evidence: [
      'CV — maximum 3 A4 pages, typed, including career and publication history',
      'Mandatory recommendation letter from an eminent person based in the UK',
      'Letter must address how you demonstrate talent/promise and how you would benefit the UK research landscape',
      'For Exceptional Talent: an additional assessment letter from a senior UK organisation representative',
      'Evidence of funding, prizes, fellowships, publications, and citations',
    ],
    talentSettlement: '3 years',
    promiseSettlement: '5 years',
    notes: 'Each endorsing body (Royal Society, British Academy, RAE, UKRI) has its own application portal and assessment process. You apply to the body most relevant to your discipline. Processing typically takes 5–8 weeks.',
  },
  arts: {
    id: 'arts',
    label: '🎭 Arts & Culture',
    endorserTitle: 'Endorsed by (matched to discipline)',
    endorsers: [
      {
        name: 'Arts Council England',
        scope: 'Arts, dance, literature, music, theatre, visual arts',
        detail: 'Arts Council England is the primary endorser for practitioners in the performing and visual arts. The broadest-scope arts body covering the majority of disciplines.',
      },
      {
        name: 'Royal Institute of British Architects (RIBA)',
        scope: 'Architecture',
        detail: 'RIBA endorses architects with exceptional talent or promise. International projects, awards, and published work are key evidence factors.',
      },
      {
        name: 'British Fashion Council',
        scope: 'Fashion design',
        detail: 'The BFC endorses fashion designers of international standing or with clear exceptional promise. Evidence typically includes collections shown internationally and industry recognition.',
      },
      {
        name: 'PACT (Producers Alliance for Cinema and Television)',
        scope: 'Film and television',
        detail: 'PACT endorses film and TV professionals — directors, producers, writers, and key creatives. Projects screened at international festivals or broadcast on major platforms are strong evidence.',
      },
    ],
    talentCriteria: [
      'Typically at least 5 years of professional experience in your discipline',
      'Substantial record of work across at least 2 countries',
      'International media recognition, reviews, or critical acclaim',
      'Prizes, awards, or nominations at recognised industry level',
      'Exhibitions, performances, or screenings at established venues internationally',
      'Significant sales or commercial success in your field',
    ],
    promiseCriteria: [
      'Usually at least 3 years of professional experience',
      'Developing record of work across at least 1 country',
      'Early career recognition — prizes, reviews, or commissions',
      'Evidence of emerging reputation in your discipline',
      'Clear trajectory toward exceptional talent over the next few years',
    ],
    evidence: [
      '3 recommendation letters from established experts (max 3 pages each)',
      'Up to 10 pieces of supporting evidence (max 2 pages each) — all from the last 5 years',
      'Typed CV covering career history and key achievements',
      'Evidence must demonstrate at least 2 of: international media recognition, prizes, exhibitions/performances, or significant sales',
      'Specific evidence requirements vary by discipline — check the GOV.UK guidance for your field',
    ],
    talentSettlement: '3 years',
    promiseSettlement: '5 years',
    notes: 'Arts applications are assessed by the endorsing body matching your discipline. An architecture application goes to RIBA; a fashion designer applies to the British Fashion Council. You do not choose — the system routes you automatically based on your field.',
  },
};

export default function GlobalTalent() {
  const [activeSector, setActiveSector] = useState('digital');
  const sector = SECTORS[activeSector];

  return (
    <PathwayPage
      meta={{
        title: 'Global Talent Visa 2026 — Leaders in Tech, Research & Arts',
        description: 'Full guide to the UK Global Talent Visa — all endorsing bodies, Exceptional Talent vs Promise criteria, evidence requirements, fees, and settlement timelines.',
      }}
      breadcrumbs={[
        { href: '/pathways/uk', label: 'UK Pathways' },
        { href: '/pathways/uk/global-talent', label: 'Global Talent Visa' },
      ]}
      hero={{
        icon: '🌟',
        tag: 'Talent-Based · Updated April 2026',
        title: 'UK <em>Global Talent</em> Visa',
        sub: 'For individuals who are leaders — or potential future leaders — in digital technology, research and academia, or arts and culture. No job offer required. No business idea required. Just exceptional talent, or the clear promise of it.',
      }}
      facts={[
        { label: 'Endorsement fee', value: '£561', color: 'Warning' },
        { label: 'Visa fee', value: '£205', color: 'Green' },
        { label: 'Duration', value: 'Up to 5 years', color: 'Green' },
        { label: 'Settlement', value: '3–5 years', color: 'Green' },
      ]}
      sidebar={
        <>
          <div className={styles.sideCard}>
            <div className={styles.sideCardTitle}>Full Cost Breakdown</div>
            {[
              ['Endorsement fee', '£561'],
              ['Visa application fee', '£205'],
              ['Prize route (flat fee)', '£766'],
              ['Partner / each child', '£766 each'],
              ['IHS surcharge', '£1,035/yr per person'],
              ['Expedited decision', 'Additional fee available'],
            ].map(([l, v]) => (
              <div key={l} className={styles.factRow}>
                <span className={styles.factLabel}>{l}</span>
                <span className={styles.factVal}>{v}</span>
              </div>
            ))}
          </div>
          <div className={styles.sideCard}>
            <div className={styles.sideCardTitle}>Settlement Timeline</div>
            {[
              ['Exceptional Talent', '3 years'],
              ['Exceptional Promise', '5 years'],
              ['Dependants', 'Apply separately'],
              ['Prize route', '3 years'],
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
              ['Apply: Global Talent Visa', 'https://www.gov.uk/global-talent'],
              ['Digital Technology (Tech Nation)', 'https://www.gov.uk/global-talent-digital-technology'],
              ['Research & Academia', 'https://www.gov.uk/global-talent-researcher-academic'],
              ['Arts & Culture', 'https://www.gov.uk/global-talent-arts-culture'],
              ['Eligible prizes list', 'https://www.gov.uk/government/publications/global-talent-visa-prestigious-prizes'],
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
        <span className={styles.alertIcon}>🌟</span>
        <p className={styles.alertText}>
          <strong>No job offer needed. No business plan needed.</strong> The Global Talent Visa is
          purely based on who you are and what you have achieved. If you are a recognised leader (or
          a high-potential early-career talent) in tech, research, or arts — this is the most
          prestigious and flexible route to the UK. It also has one of the fastest settlement tracks.
        </p>
      </div>

      {/* Talent vs Promise */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>Two Tracks</span>
        <h2 className={styles.sectionTitle}>Exceptional Talent vs Exceptional Promise</h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
          There are two categories. <strong>Exceptional Talent</strong> is for recognised leaders with an
          established body of work. <strong>Exceptional Promise</strong> is for early-career talent showing
          clear potential. Both lead to a visa — but the settlement timeline differs.
        </p>
        <div className={ev.comparisonTable}>
          <div className={`${ev.comparisonCol} ${ev.comparisonColTalent}`}>
            <div className={ev.comparisonColTitle}>Exceptional Talent</div>
            <div className={ev.comparisonColHead}>The Recognised Leader</div>
            <ul className={ev.comparisonList}>
              {[
                'Established, internationally recognised track record',
                'Typically 5+ years of senior professional experience',
                'Demonstrable impact — awards, funding, publications, exhibitions',
                'Your work is known outside your immediate network',
                'You have shaped your field, not just participated in it',
              ].map((item, i) => (
                <li key={i} className={ev.comparisonItem}>
                  <span className={ev.comparisonCheck}>✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className={ev.comparisonSettlement}>⏱ Settlement after 3 years</div>
          </div>
          <div className={`${ev.comparisonCol} ${ev.comparisonColPromise}`}>
            <div className={ev.comparisonColTitle}>Exceptional Promise</div>
            <div className={ev.comparisonColHead}>The Future Leader</div>
            <ul className={ev.comparisonList}>
              {[
                'Early-career professional with strong upward trajectory',
                'Typically 3–5 years of professional experience',
                'Emerging recognition — early prizes, fellowships, notable projects',
                'Your potential is clear, even if your impact is still developing',
                'Ambition to become a leader in your field within the UK',
              ].map((item, i) => (
                <li key={i} className={ev.comparisonItem}>
                  <span className={ev.comparisonCheck}>✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className={ev.comparisonSettlement}>⏱ Settlement after 5 years</div>
          </div>
        </div>
      </div>

      {/* Sector selector + criteria */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>Endorsing Bodies by Sector</span>
        <h2 className={styles.sectionTitle}>Choose your field to see the relevant endorsing body</h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
          You must be endorsed by the body that covers your discipline. Select your sector below to see
          the endorsing bodies, their exact criteria, and the evidence you need to prepare.
        </p>

        {/* Sector tabs */}
        <div className={ev.sectorTabs}>
          {Object.values(SECTORS).map(s => (
            <button
              key={s.id}
              className={`${ev.sectorTab} ${activeSector === s.id ? ev.sectorTabActive : ''}`}
              onClick={() => setActiveSector(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Sector content */}
        <div key={activeSector} className={ev.sectorContent}>

          {/* Endorsing bodies for this sector */}
          <div style={{ marginBottom: '1.75rem' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: '0.75rem' }}>
              {sector.endorserTitle}:
            </div>
            <div className={ev.endorserGrid}>
              {sector.endorsers.map((e, i) => (
                <div key={i} className={ev.endorserCard}>
                  <div className={ev.endorserName}>{e.name}</div>
                  <div className={ev.endorserScope}>{e.scope}</div>
                  <div className={ev.endorserDetail}>{e.detail}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Talent vs Promise criteria for this sector */}
          <div className={ev.comparisonTable} style={{ marginBottom: '1.75rem' }}>
            <div className={`${ev.comparisonCol} ${ev.comparisonColTalent}`}>
              <div className={ev.comparisonColTitle}>Exceptional Talent criteria</div>
              <div className={ev.comparisonColHead}>Leader-level requirements</div>
              <ul className={ev.comparisonList}>
                {sector.talentCriteria.map((item, i) => (
                  <li key={i} className={ev.comparisonItem}>
                    <span className={ev.comparisonCheck}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className={ev.comparisonSettlement}>Settlement after {sector.talentSettlement}</div>
            </div>
            <div className={`${ev.comparisonCol} ${ev.comparisonColPromise}`}>
              <div className={ev.comparisonColTitle}>Exceptional Promise criteria</div>
              <div className={ev.comparisonColHead}>Early-career requirements</div>
              <ul className={ev.comparisonList}>
                {sector.promiseCriteria.map((item, i) => (
                  <li key={i} className={ev.comparisonItem}>
                    <span className={ev.comparisonCheck}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className={ev.comparisonSettlement}>Settlement after {sector.promiseSettlement}</div>
            </div>
          </div>

          {/* Evidence required */}
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--white)', marginBottom: '0.6rem' }}>
              Evidence required for {sector.label.split(' ').slice(1).join(' ')} applications:
            </div>
            <div className={ev.evidenceList}>
              {sector.evidence.map((e, i) => (
                <div key={i} className={ev.evidenceItem}>
                  <span className={ev.evidenceNum}>{i + 1}</span>
                  <span>{e}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          {sector.notes && (
            <div className={styles.alertBox} style={{ marginTop: '1.25rem', background: 'rgba(42,157,143,0.04)', borderColor: 'rgba(42,157,143,0.15)' }}>
              <span className={styles.alertIcon}>ℹ️</span>
              <p className={styles.alertText}>{sector.notes}</p>
            </div>
          )}
        </div>
      </div>

      {/* Prize route */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>Alternative Route</span>
        <h2 className={styles.sectionTitle}>The prize route — no endorsement needed</h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '1rem' }}>
          If you have won a specific prestigious prize listed by the Home Office, you can apply directly
          for the visa without going through an endorsement process. The prize must appear on the official
          named list — prizes by the same institutions that are not on the list do not qualify.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div className={styles.sideCard} style={{ flex: '1 1 260px', margin: 0 }}>
            <div className={styles.sideCardTitle}>Prize route fee</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--safe)', margin: '0.5rem 0' }}>£766</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Single payment — no separate endorsement fee</div>
          </div>
          <div className={styles.sideCard} style={{ flex: '1 1 260px', margin: 0 }}>
            <div className={styles.sideCardTitle}>Settlement via prize</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--safe)', margin: '0.5rem 0' }}>3 years</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Prize route holders settle as Exceptional Talent</div>
          </div>
        </div>
        <div style={{ marginTop: '1rem' }}>
          <a
            href="https://www.gov.uk/government/publications/global-talent-visa-prestigious-prizes"
            target="_blank" rel="noopener noreferrer"
            className={styles.solicitorLink}
            style={{ display: 'inline-block', marginTop: '0.5rem' }}
          >
            View the full list of eligible prizes on GOV.UK →
          </a>
        </div>
      </div>

      {/* Application steps */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>Step by Step</span>
        <h2 className={styles.sectionTitle}>How to apply</h2>
        <div className={styles.steps}>
          {[
            {
              title: 'Determine your track and endorsing body',
              desc: 'Identify whether you qualify as Exceptional Talent or Exceptional Promise, and which endorsing body covers your field. Review their specific criteria carefully — each body has slightly different evidence requirements.',
            },
            {
              title: 'Build your evidence package',
              desc: 'Prepare your CV (max 3 A4 pages), 3 recommendation letters from established experts, and up to 10 supporting documents. Letters must be from people who have known your work for 12+ months and can speak to your achievements and UK contribution plans.',
            },
            {
              title: 'Apply for endorsement (£561)',
              desc: 'Submit your endorsement application to the relevant body (Tech Nation, Royal Society, British Academy, RAE, UKRI, Arts Council England, RIBA, British Fashion Council, or PACT). Pay the £561 endorsement fee. Decision typically takes 5–8 weeks.',
            },
            {
              title: 'Apply for the visa (£205)',
              desc: 'Once endorsed, apply for the visa on GOV.UK. You can apply for endorsement and visa simultaneously — this is permitted and saves time. Pay the £205 visa fee plus the Immigration Health Surcharge (£1,035/year per person).',
            },
            {
              title: 'Arrive and build in the UK',
              desc: 'Your initial visa lasts up to 5 years and is fully flexible — you can work for any employer, run your own company, change roles, and take sabbaticals. There are no restrictions on employer or job role.',
            },
            {
              title: 'Extend and apply to settle',
              desc: 'After 3 years (Exceptional Talent) or 5 years (Exceptional Promise), apply for Indefinite Leave to Remain (ILR). You must show you earned money in your field during your stay. After ILR, apply for British citizenship after 1 year.',
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

      {/* Processing times */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>Timelines & Fees</span>
        <h2 className={styles.sectionTitle}>Decision times and full cost breakdown</h2>
        <div className={styles.changeCards}>
          {[
            {
              date: 'Endorsement stage',
              title: '5–8 weeks',
              desc: 'Fee: £561. Paid to the Home Office. Processing by the endorsing body typically takes 5–8 weeks from submission. There is no quota — applications are assessed continuously year-round.',
            },
            {
              date: 'Visa stage (outside UK)',
              title: '3 weeks',
              desc: 'Fee: £205 (plus IHS surcharge of £1,035/year per person). Applied on GOV.UK after endorsement. Identity verification via UK Immigration ID Check app or biometric appointment at a VAC.',
            },
            {
              date: 'Visa stage (inside UK)',
              title: '8 weeks',
              desc: 'For extending or switching from another visa inside the UK. Same fee structure. Expedited processing is available for an additional fee if you need a faster decision.',
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

      {/* What you can do */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>Visa Rights</span>
        <h2 className={styles.sectionTitle}>What the Global Talent Visa allows</h2>
        <ul className={styles.reqList}>
          {[
            'Work for any employer in the UK — no sponsorship or job offer needed.',
            'Be self-employed, run your own company, or freelance.',
            'Change jobs, sectors, or roles freely with no visa implications.',
            'Take sabbaticals or study periods — full flexibility.',
            'Bring your partner and children (they apply separately at £766 each).',
            'Apply to settle permanently after 3 years (Exceptional Talent) or 5 years (Exceptional Promise).',
            'Extend your visa in 1–5 year increments with no maximum total.',
          ].map((r, i) => (
            <li key={i} className={styles.reqItem}>
              <span className={styles.reqCheck}>✓</span>
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.warningBox}>
        <span className={styles.alertIcon}>⚠️</span>
        <div className={styles.warningText}>
          <strong>You must earn money in your field to renew.</strong> When extending the visa,
          UKVI requires proof that you have been working in the talent area that earned your
          endorsement — you cannot simply live in the UK without practising your field. Maintain
          records of your work, clients, publications, or employment throughout your stay.
        </div>
      </div>

      <SolicitorSection
        caseTypeSlug="skilled-worker"
        region="uk"
        title="Find a Regulated Solicitor for Your Global Talent Application"
      />
    </PathwayPage>
  );
}
