import { useState, useMemo } from 'react';
import PathwayPage, { SolicitorSection } from '../../../components/PathwayPage';
import styles from '../../../styles/Pathway.module.css';
import sStyles from '../../../styles/StudentVisa.module.css';
import { getPageTranslations } from '../../../lib/i18n';

const COUNTRY_DATA = {
  afghanistan: {
    name: 'Afghanistan',
    flag: '🇦🇫',
    refusalRate: 'N/A',
    trend: 'suspended',
    status: 'suspended',
    statusLabel: 'Severely Restricted',
    mainIssues: [
      'UK Embassy in Kabul closed since August 2021 — you cannot submit biometrics in Afghanistan',
      'Biometric enrolment must be done at a UK Visa Application Centre in a third country (Pakistan, UAE, Turkey)',
      'Taliban-issued documents (passports, education certificates) are not recognised by UKVI as reliable',
      'Student visa is theoretically available but practically extremely difficult without third-country presence',
      'Most Afghans entitled to UK protection should apply via ARAP (if ex-MOD staff) or ACRS resettlement — not student route',
    ],
    tips: [
      'If you are already in a third country (Pakistan, Iran, UAE), you can apply from there — the student route is still open to Afghan nationals',
      'Chevening and Commonwealth scholarships explicitly welcome Afghan applicants — a fully-funded scholarship bypasses most document credibility concerns',
      'If you worked with UK/NATO forces, ARAP is the correct route — not student visa',
      'Contact the British Council Afghanistan for scholarship guidance — they maintain active support for Afghan students',
      'Gather all educational records you have — original certificates, grade transcripts, school letters — even if issued before 2021',
    ],
    scholarships: [
      'Chevening Scholarship (open to Afghan nationals — British Council manages)',
      'Commonwealth Scholarship (open to Afghan nationals)',
      'CARA (Council for At-Risk Academics) — for Afghan academics and researchers',
      'University-specific Afghan emergency scholarships (many Russell Group universities have them)',
    ],
    visaFee: '£490 (must apply from third country)',
    ihs: '£776/year',
    englishTest: 'IELTS 5.5–6.5 (must sit in operating test centre — not available in Afghanistan)',
    processingTime: 'Highly variable — 8–20 weeks',
    dependants: 'Not allowed for undergrad/taught postgrad',
    positiveNote: 'Hundreds of Afghan students are studying in UK universities right now — many arrived via scholarships and third-country applications. The route is hard but not closed. Chevening and CARA have specifically prioritised Afghan academics and students at risk.',
  },
  cameroon: {
    name: 'Cameroon',
    flag: '🇨🇲',
    refusalRate: '43%',
    trend: 'up',
    status: 'high-scrutiny',
    statusLabel: 'High Scrutiny',
    mainIssues: [
      'One of the highest student visa refusal rates globally — UKVI has flagged Cameroon for enhanced scrutiny',
      'Financial evidence is the primary refusal reason — very strong proof of funds required',
      'Ongoing Anglophone Crisis (armed conflict in NW/SW regions) affects document availability and verification',
      'UKVI scrutinises whether the genuine student test is met — chosen institution and course must make clear sense',
      'Some Cameroonian applicants found to be using student visas as a route to remain economically — this has increased general scrutiny',
    ],
    tips: [
      'Apply from Yaoundé or Douala VAC — ensure your biometric appointment is booked well in advance',
      'Financial evidence must be impeccable: 28+ days of consistent bank balance, with source clearly explained',
      'Choose a well-ranked UKVI-licensed institution that clearly matches your academic background',
      'Provide a very strong personal statement — link your specific degree choice to a named employer or career path in Cameroon',
      'Consider applying for Chevening — Cameroon has a dedicated Chevening programme and a funded place transforms your visa prospects',
    ],
    scholarships: [
      'Chevening Scholarship (dedicated Cameroon programme)',
      'Commonwealth Scholarship',
      'British Council Cameroon — study opportunities',
      'French-speaking options: Campus France scholarships for Francophone Cameroonians',
    ],
    visaFee: '£490',
    ihs: '£776/year',
    englishTest: 'IELTS 6.0 (Anglophone applicants); IELTS or B2/C1 French test (Francophone)',
    processingTime: '8–16 weeks',
    dependants: 'Not allowed for undergrad/taught postgrad',
    positiveNote: 'Despite high refusal rates, well-prepared Cameroonian applicants with strong financial evidence and a funded scholarship place succeed regularly. A Chevening scholarship almost guarantees approval and covers all costs.',
  },
  myanmar: {
    name: 'Myanmar',
    flag: '🇲🇲',
    refusalRate: 'Variable',
    trend: 'suspended',
    status: 'suspended',
    statusLabel: 'Severely Restricted',
    mainIssues: [
      'Military coup (February 2021) — UK does not recognise the military junta (SAC) as the legitimate government',
      'Passports and educational documents issued by the SAC military government may face credibility challenges at UKVI',
      'UK Embassy in Yangon operates with significantly reduced capacity — appointment availability is limited',
      'Civil war conditions mean some applicants cannot safely travel internally to reach Yangon for biometrics',
      'Bank documentation is problematic — Myanmar banking system largely cut off from international verification',
    ],
    tips: [
      'If you have a pre-2021 passport, use it — pre-coup documents are more credible',
      'If you are already outside Myanmar (Thailand, Malaysia, Singapore), apply from there — do not return just to apply',
      'Get your academic certificates authenticated before leaving Myanmar if possible',
      'Chevening actively supports Myanmar scholars at risk — contact the British Council Myanmar team',
      'The Chevening Myanmar programme specifically targets civil society leaders, journalists, and academics facing risk under the junta',
    ],
    scholarships: [
      'Chevening Scholarship — Myanmar (specifically supports those at risk from military rule)',
      'Commonwealth Scholarship',
      'CARA — for Myanmar academics under threat',
      'Open Society Foundations scholarship for Myanmar activists and scholars',
    ],
    visaFee: '£490 (biometrics at Yangon VAC or third country)',
    ihs: '£776/year',
    englishTest: 'IELTS 5.5–6.5',
    processingTime: '8–20 weeks (highly variable)',
    dependants: 'Not allowed for undergrad/taught postgrad',
    positiveNote: 'UK universities have specifically created emergency scholarship places for Myanmar students affected by the coup. Many Myanmar scholars are studying in the UK right now via Chevening and institutional emergency funding. This route exists — it just requires careful preparation.',
  },
  sudan: {
    name: 'Sudan',
    flag: '🇸🇩',
    refusalRate: 'N/A',
    trend: 'suspended',
    status: 'suspended',
    statusLabel: 'Severely Restricted',
    mainIssues: [
      'UK Embassy in Khartoum was evacuated and suspended operations in April 2023 due to civil war between SAF and RSF',
      'No in-country biometric enrolment is possible — applications must be submitted from a third country',
      'Civil war (ongoing since April 2023) has displaced over 8 million people — document availability is severely affected',
      'Banking system severely disrupted — financial evidence is extremely difficult to obtain in standard form',
      'Millions of Sudanese are now in Egypt, Chad, South Sudan, or Ethiopia — apply from wherever you are',
    ],
    tips: [
      'If you are already outside Sudan, apply for your student visa from that country — Egypt, UAE, and Kenya all have UK VACs',
      'Contact your UK university directly — many have created emergency hardship funds and deferral policies for Sudanese students',
      'The British Council Sudan programme continues remotely — they can advise on scholarship applications',
      'Chevening Sudan is still open — a funded place dramatically simplifies the application despite the crisis',
      'If you face persecution in the conflict, consider whether asylum or humanitarian protection is a more appropriate route than student visa',
    ],
    scholarships: [
      'Chevening Scholarship — Sudan (still accepting applications)',
      'Commonwealth Scholarship',
      'CARA — for Sudanese academics at risk',
      'University emergency funds — contact admissions directly and explain your situation',
    ],
    visaFee: '£490 (must apply from outside Sudan)',
    ihs: '£776/year',
    englishTest: 'IELTS 5.5–6.5 (must sit outside Sudan)',
    processingTime: 'Highly variable — 10–20+ weeks',
    dependants: 'Not allowed for undergrad/taught postgrad',
    positiveNote: 'Despite the crisis, UK universities are actively trying to support Sudanese students. Many have emergency scholarship funds, deferral policies, and direct contact points for students affected by the conflict. Reach out to the international office of your chosen university directly — explain your situation honestly.',
  },
  nigeria: {
    name: 'Nigeria',
    flag: '🇳🇬',
    refusalRate: '38%',
    trend: 'up',
    status: 'high-scrutiny',
    statusLabel: 'High Scrutiny',
    mainIssues: ['High refusal rate due to financial evidence concerns', 'UKVI requires very strong proof of funds (bank statements 28+ days)', 'Strong ties to home country required — job, property, family'],
    tips: ['Use a UK-regulated bank account or parent\'s verifiable funds', 'Obtain a detailed sponsor letter with bank statements notarised', 'Show evidence of property ownership or family commitments in Nigeria', 'Apply Chevening or Commonwealth — funded places have near-zero refusals'],
    scholarships: ['Chevening Scholarship (full-funded)', 'Commonwealth Scholarship', 'British Council Nigeria grants', 'Shell Nigeria scholarship for STEM'],
    visaFee: '£490 (outside UK)',
    ihs: '£776/year',
    englishTest: 'IELTS 5.5–6.5 (institution-dependent)',
    processingTime: '6–12 weeks (expect longer)',
    dependants: 'Not allowed for undergrad/taught postgrad',
    positiveNote: 'Nigeria produces some of the highest-achieving international students in the UK. Russell Group universities actively recruit Nigerian students. A funded place removes nearly all visa barriers.',
  },
  bangladesh: {
    name: 'Bangladesh',
    flag: '🇧🇩',
    refusalRate: '29%',
    trend: 'stable',
    status: 'moderate-scrutiny',
    statusLabel: 'Moderate Scrutiny',
    mainIssues: ['Financial evidence must show genuine, sustained savings — not recently deposited lump sums', 'English language scores sometimes below institution minimums', 'UKVI scrutinises intent to return after studies'],
    tips: ['Maintain funds in the same account for at least 28 days before applying', 'Use IELTS Academic — minimum 6.0 for most universities', 'A strong personal statement explaining career plans in Bangladesh post-graduation strengthens application', 'Chevening is highly competitive but very achievable for Bangladeshi applicants'],
    scholarships: ['Chevening Scholarship', 'Commonwealth Scholarship', 'British Council Bangladesh', 'UKRI scholarships for PhD students'],
    visaFee: '£490 (outside UK)',
    ihs: '£776/year',
    englishTest: 'IELTS 6.0–6.5',
    processingTime: '4–8 weeks',
    dependants: 'Not allowed for undergrad/taught postgrad',
    positiveNote: 'Many Bangladeshi graduates at UK universities go on to prestigious careers globally. The Graduate Route gives 2 years to find skilled employment after your degree.',
  },
  pakistan: {
    name: 'Pakistan',
    flag: '🇵🇰',
    refusalRate: '41%',
    trend: 'up',
    status: 'high-scrutiny',
    statusLabel: 'High Scrutiny',
    mainIssues: ['Highest refusal rates among South Asian applicants', 'Financial evidence heavily scrutinised — UKVI looks for source of funds, not just amount', 'Any inconsistency in documents can lead to refusal', 'Must show strong ties to Pakistan (employment prospects, family, property)'],
    tips: ['Provide full source-of-funds explanation — salary slips, business income, property valuations', 'Use a professional immigration adviser (OISC regulated) to review your application before submission', 'Consider applying with a full scholarship to remove financial scrutiny entirely', 'Appeal is possible if refused — success rate improving with proper legal representation'],
    scholarships: ['Chevening Scholarship (full-funded)', 'Commonwealth Scholarship', 'HEC-British Council scholarships', 'Aga Khan Foundation scholarships'],
    visaFee: '£490 (outside UK)',
    ihs: '£776/year',
    englishTest: 'IELTS 6.0–6.5',
    processingTime: '6–14 weeks',
    dependants: 'Not allowed for undergrad/taught postgrad',
    positiveNote: 'Pakistan has produced outstanding researchers and professionals who have gone through the UK student route. Full scholarships bypass financial scrutiny almost entirely.',
  },
  india: {
    name: 'India',
    flag: '🇮🇳',
    refusalRate: '12%',
    trend: 'down',
    status: 'standard',
    statusLabel: 'Standard Processing',
    mainIssues: ['Generally lower refusal rates', 'English language requirements usually met easily', 'Competition for top universities is very high'],
    tips: ['Apply early — popular courses fill up fast', 'IITians and other top graduates attract institutional scholarships', 'The Graduate Route is heavily used by Indian graduates — plan for it from the start'],
    scholarships: ['Chevening Scholarship', 'Commonwealth Scholarship', 'GREAT scholarships', 'INLAKS Shivdasani Foundation'],
    visaFee: '£490 (outside UK)',
    ihs: '£776/year',
    englishTest: 'IELTS 6.0–6.5 (often waived for English-medium schools)',
    processingTime: '3–5 weeks',
    dependants: 'Not allowed for undergrad/taught postgrad (PhD exempt)',
    positiveNote: 'India is the UK\'s largest source of international students. Indian graduates are among the most successful users of the Graduate Route, transitioning to Skilled Worker visas at high rates.',
  },
  ghana: {
    name: 'Ghana',
    flag: '🇬🇭',
    refusalRate: '34%',
    trend: 'stable',
    status: 'high-scrutiny',
    statusLabel: 'High Scrutiny',
    mainIssues: ['Financial evidence is the main refusal reason', 'UKVI requires clear paper trail for funds — especially if sponsored by a third party', 'Must show genuine academic intent'],
    tips: ['If sponsored by employer or family member, provide a detailed sponsorship letter with their financial evidence', 'Apply for Chevening — Ghana has strong alumni representation', 'Show academic progression and career plan for returning to Ghana'],
    scholarships: ['Chevening Scholarship (strong Ghanaian cohort)', 'Commonwealth Scholarship', 'British Council Ghana'],
    visaFee: '£490 (outside UK)',
    ihs: '£776/year',
    englishTest: 'IELTS 5.5–6.5',
    processingTime: '5–10 weeks',
    dependants: 'Not allowed for undergrad/taught postgrad',
    positiveNote: 'Ghana has a well-established community of UK graduates who return and build careers at home and across Africa. A UK degree carries significant professional weight in Ghana.',
  },
  nepal: {
    name: 'Nepal',
    flag: '🇳🇵',
    refusalRate: '22%',
    trend: 'stable',
    status: 'moderate-scrutiny',
    statusLabel: 'Moderate Scrutiny',
    mainIssues: ['Financial evidence must be genuine and clearly sourced', 'Some applicants choose institutions primarily for visa access rather than academic fit — UKVI is alert to this', 'English test scores sometimes below requirement'],
    tips: ['Choose a reputable, UKVI-licensed institution with good track record', 'IELTS minimum 6.0 for most universities — prepare thoroughly', 'Demonstrate clear academic and career reason for choosing UK over closer options'],
    scholarships: ['Chevening Scholarship', 'Commonwealth Scholarship', 'UKRI PhD funding'],
    visaFee: '£490 (outside UK)',
    ihs: '£776/year',
    englishTest: 'IELTS 6.0',
    processingTime: '4–8 weeks',
    dependants: 'Not allowed for undergrad/taught postgrad',
    positiveNote: 'Nepal\'s graduate community in the UK is growing rapidly. Many Nepali students use the Graduate Route to gain international work experience before returning home with enhanced skills.',
  },
  china: {
    name: 'China',
    flag: '🇨🇳',
    refusalRate: '9%',
    trend: 'down',
    status: 'standard',
    statusLabel: 'Standard Processing',
    mainIssues: ['Low overall refusal rate', 'Academic document verification sometimes takes longer', 'English test scores are the most common rejection reason'],
    tips: ['IELTS or TOEFL — aim high (6.5+) for competitive programmes', 'Strong academic transcript from Chinese university is a significant asset', 'Apply well ahead — Chinese applicants are high-volume and processing slots fill early'],
    scholarships: ['Chinese Government Scholarship (for studying in UK)', 'British Council China programmes', 'Institutional scholarships from Russell Group universities'],
    visaFee: '£490 (outside UK)',
    ihs: '£776/year',
    englishTest: 'IELTS 6.0–7.0',
    processingTime: '3–5 weeks',
    dependants: 'Not allowed for undergrad/taught postgrad (PhD exempt)',
    positiveNote: 'China is among the top 3 sources of international students in the UK. Chinese graduates enjoy some of the highest employment rates post-graduation.',
  },
  srilanka: {
    name: 'Sri Lanka',
    flag: '🇱🇰',
    refusalRate: '19%',
    trend: 'stable',
    status: 'moderate-scrutiny',
    statusLabel: 'Moderate Scrutiny',
    mainIssues: ['Financial evidence needs to be consistent and clearly sourced', 'Must demonstrate intention to return after studies'],
    tips: ['Strong family and community ties in Sri Lanka help demonstrate intention to return', 'Chevening is open to Sri Lankan nationals and is highly competitive', 'English is widely spoken — ensure test score meets specific institution requirement'],
    scholarships: ['Chevening Scholarship', 'Commonwealth Scholarship', 'British Council Sri Lanka'],
    visaFee: '£490 (outside UK)',
    ihs: '£776/year',
    englishTest: 'IELTS 5.5–6.5',
    processingTime: '4–6 weeks',
    dependants: 'Not allowed for undergrad/taught postgrad',
    positiveNote: 'Sri Lankan graduates in the UK are known for academic excellence. A significant proportion of Sri Lankan UK graduates go on to leadership roles in medicine, technology, and finance.',
  },
  vietnam: {
    name: 'Vietnam',
    flag: '🇻🇳',
    refusalRate: '15%',
    trend: 'down',
    status: 'standard',
    statusLabel: 'Standard Processing',
    mainIssues: ['Financial documentation translation must be certified', 'English test scores — preparation is key'],
    tips: ['Have all financial documents officially translated', 'IELTS minimum 6.0 — many Vietnamese students take preparation courses', 'Vietnam-UK Alumni network is strong — connecting with them can help with UK university selection'],
    scholarships: ['Chevening Scholarship', 'Commonwealth Scholarship', 'GREAT scholarships for Vietnam'],
    visaFee: '£490 (outside UK)',
    ihs: '£776/year',
    englishTest: 'IELTS 6.0',
    processingTime: '3–6 weeks',
    dependants: 'Not allowed for undergrad/taught postgrad',
    positiveNote: 'Vietnam has one of the fastest-growing groups of UK international students. The UK-Vietnam trade relationship means UK graduates are highly valued by businesses operating in both countries.',
  },
  kenya: {
    name: 'Kenya',
    flag: '🇰🇪',
    refusalRate: '26%',
    trend: 'stable',
    status: 'moderate-scrutiny',
    statusLabel: 'Moderate Scrutiny',
    mainIssues: ['Financial evidence — source of funds must be explained clearly', 'Academic and career purpose must be convincing'],
    tips: ['Kenya\'s English-medium education system is a real asset — emphasise this', 'British Council Kenya and Chevening have strong Kenyan applicant cohorts', 'Demonstrate how your UK degree benefits your Kenyan career — employers in Kenya value UK qualifications highly'],
    scholarships: ['Chevening Scholarship (strong Kenya cohort)', 'Commonwealth Scholarship', 'British Council Kenya'],
    visaFee: '£490 (outside UK)',
    ihs: '£776/year',
    englishTest: 'IELTS 6.0 (often waived for English-medium schools)',
    processingTime: '4–8 weeks',
    dependants: 'Not allowed for undergrad/taught postgrad',
    positiveNote: 'Kenya has a proud tradition of sending outstanding students to UK universities. Kenyan graduates are in high demand in East African and international business, development, and medicine.',
  },
};

const STATUS_COLORS = {
  'standard': '#2a9d8f',
  'moderate-scrutiny': '#e9c46a',
  'high-scrutiny': '#e76f51',
  'suspended': '#e63946',
};

export default function UKStudent({ pt }) {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const filtered = useMemo(() => {
    if (!search.trim()) return Object.values(COUNTRY_DATA);
    const q = search.toLowerCase();
    return Object.values(COUNTRY_DATA).filter(c => c.name.toLowerCase().includes(q));
  }, [search]);

  const country = selected ? COUNTRY_DATA[selected] : null;

  return (
    <PathwayPage
      meta={{ title: pt.meta.title, description: pt.meta.description }}
      breadcrumbs={[
        { href: '/pathways/uk', label: 'UK Pathways' },
        { href: '/pathways/uk/student', label: 'Student Visa' },
      ]}
      hero={{
        icon: '🎓',
        tag: pt.hero.tag,
        title: pt.hero.title,
        sub: pt.hero.sub,
      }}
      facts={[
        { label: pt.facts[0].label, value: pt.facts[0].value, color: 'Warning' },
        { label: pt.facts[1].label, value: pt.facts[1].value, color: 'Green' },
        { label: pt.facts[2].label, value: pt.facts[2].value, color: 'Green' },
        { label: pt.facts[3].label, value: pt.facts[3].value, color: 'Green' },
      ]}
      sidebar={
        <>
          <div className={styles.sideCard}>
            <div className={styles.sideCardTitle}>Quick Facts</div>
            {[
              ['Visa fee (outside UK)', '£490'],
              ['IHS surcharge', '£776/year'],
              ['Minimum funds (London)', '£1,334/month'],
              ['Part-time work', '20 hrs/week (term)'],
              ['Full-time work', 'Holidays only'],
              ['Dependants', 'PhD/govt-sponsored only'],
            ].map(([l, v]) => (
              <div key={l} className={styles.factRow}>
                <span className={styles.factLabel}>{l}</span>
                <span className={styles.factVal}>{v}</span>
              </div>
            ))}
          </div>
          <div className={styles.sideCard}>
            <div className={styles.sideCardTitle}>Scholarships</div>
            {[
              ['Chevening Scholarships', 'https://www.chevening.org'],
              ['Commonwealth Scholarships', 'https://cscuk.fcdo.gov.uk/'],
              ['British Council Grants', 'https://www.britishcouncil.org/study-work-abroad'],
              ['GREAT Scholarships', 'https://www.britishcouncil.org/study-work-abroad/in-uk/great-scholarships'],
            ].map(([label, href]) => (
              <div key={label} style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border)' }}>
                <a href={href} target="_blank" rel="noopener noreferrer" className={styles.solicitorLink}>{label} →</a>
              </div>
            ))}
          </div>
          <div className={styles.sideCard}>
            <div className={styles.sideCardTitle}>Official Links</div>
            {[
              ['Student Visa (gov.uk)', 'https://www.gov.uk/student-visa'],
              ['Graduate Route', 'https://www.gov.uk/graduate-visa'],
              ['UCAS', 'https://www.ucas.com'],
              ['UKVI-licensed sponsors', 'https://www.gov.uk/government/publications/register-of-licensed-sponsors-students'],
            ].map(([label, href]) => (
              <div key={label} style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border)' }}>
                <a href={href} target="_blank" rel="noopener noreferrer" className={styles.solicitorLink}>{label} →</a>
              </div>
            ))}
          </div>
        </>
      }
    >
      {/* ── Country search tool ── */}
      <div className={sStyles.countryTool}>
        <div className={sStyles.countryToolHeader}>
          <span className={sStyles.toolIcon}>🔍</span>
          <div>
            <div className={sStyles.toolTitle}>Find Your Country — Personalised Guidance</div>
            <div className={sStyles.toolSub}>See refusal rates, specific requirements, and tips tailored to your nationality</div>
          </div>
        </div>
        <div className={sStyles.searchRow}>
          <input
            className={sStyles.searchInput}
            type="text"
            placeholder="Type your country (e.g. Nigeria, Bangladesh, Pakistan...)"
            value={search}
            onChange={e => { setSearch(e.target.value); setSelected(null); }}
          />
          {search && (
            <button className={sStyles.clearBtn} onClick={() => { setSearch(''); setSelected(null); }}>✕</button>
          )}
        </div>

        {/* Country grid */}
        {!selected && (
          <div className={sStyles.countryGrid}>
            {filtered.map(c => (
              <button
                key={c.name}
                className={sStyles.countryChip}
                style={{ borderColor: STATUS_COLORS[c.status] + '55' }}
                onClick={() => { setSelected(Object.keys(COUNTRY_DATA).find(k => COUNTRY_DATA[k].name === c.name)); setSearch(c.name); }}
              >
                <span className={sStyles.chipFlag}>{c.flag}</span>
                <span className={sStyles.chipName}>{c.name}</span>
                <span className={sStyles.chipRefusal} style={{ color: STATUS_COLORS[c.status] }}>
                  {c.refusalRate} refusal
                </span>
              </button>
            ))}
            {filtered.length === 0 && (
              <div className={sStyles.noResult}>
                No country found for "{search}". General guidance applies — see the main steps below.
              </div>
            )}
          </div>
        )}

        {/* Country detail panel */}
        {country && (
          <div className={sStyles.countryPanel}>
            <div className={sStyles.panelHeader}>
              <span className={sStyles.panelFlag}>{country.flag}</span>
              <div>
                <div className={sStyles.panelName}>{country.name}</div>
                <span
                  className={sStyles.statusBadge}
                  style={{ background: STATUS_COLORS[country.status] + '22', color: STATUS_COLORS[country.status], borderColor: STATUS_COLORS[country.status] + '55' }}
                >
                  {country.statusLabel}
                </span>
              </div>
              <div className={sStyles.refusalBlock}>
                <div className={sStyles.refusalRate} style={{ color: STATUS_COLORS[country.status] }}>{country.refusalRate}</div>
                <div className={sStyles.refusalLabel}>Refusal rate</div>
              </div>
              <button className={sStyles.backBtn} onClick={() => { setSelected(null); setSearch(''); }}>← Change country</button>
            </div>

            {/* Tabs */}
            <div className={sStyles.tabs}>
              {['overview', 'tips', 'scholarships', 'facts'].map(tab => (
                <button
                  key={tab}
                  className={`${sStyles.tab} ${activeTab === tab ? sStyles.tabActive : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {{ overview: 'Main Issues', tips: 'Tips & Strategy', scholarships: 'Scholarships', facts: 'Visa Facts' }[tab]}
                </button>
              ))}
            </div>

            {country.status === 'suspended' && (
              <div className={sStyles.suspendedAlert}>
                <span>🚨</span>
                <div>
                  <strong>UK Embassy suspended / severely restricted in {country.name}</strong>
                  <p>Normal student visa processing is not possible from inside this country. You must apply from a third country. Read the details below carefully.</p>
                </div>
              </div>
            )}

            <div className={sStyles.tabContent}>
              {activeTab === 'overview' && (
                <>
                  <div className={sStyles.positiveNote}>{country.positiveNote}</div>
                  <div className={sStyles.issueTitle}>{country.status === 'suspended' ? `Key barriers for ${country.name} applicants:` : `Common reasons for refusal from ${country.name}:`}</div>
                  <ul className={sStyles.issueList}>
                    {country.mainIssues.map((issue, i) => (
                      <li key={i} className={sStyles.issueItem}>
                        <span className={sStyles.issueIcon}>⚠</span> {issue}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {activeTab === 'tips' && (
                <ul className={sStyles.tipList}>
                  {country.tips.map((tip, i) => (
                    <li key={i} className={sStyles.tipItem}>
                      <span className={sStyles.tipCheck}>✓</span> {tip}
                    </li>
                  ))}
                </ul>
              )}
              {activeTab === 'scholarships' && (
                <ul className={sStyles.schList}>
                  {country.scholarships.map((s, i) => (
                    <li key={i} className={sStyles.schItem}>🎓 {s}</li>
                  ))}
                  <li className={sStyles.schNote}>
                    A fully-funded scholarship eliminates financial scrutiny entirely — it is the single most powerful thing you can do to improve your visa prospects.
                  </li>
                </ul>
              )}
              {activeTab === 'facts' && (
                <div className={sStyles.factGrid}>
                  {[
                    ['Visa Fee', country.visaFee],
                    ['IHS Surcharge', country.ihs],
                    ['English Test', country.englishTest],
                    ['Processing Time', country.processingTime],
                    ['Dependants', country.dependants],
                  ].map(([label, value]) => (
                    <div key={label} className={sStyles.factItem}>
                      <div className={sStyles.factItemLabel}>{label}</div>
                      <div className={sStyles.factItemValue}>{value}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ── Alert ── */}
      <div className={styles.alertBox}>
        <span className={styles.alertIcon}>🎓</span>
        <p className={styles.alertText}>
          <strong>Education is one of the most powerful legal routes.</strong> A UK degree from a
          Russell Group or recognised university opens doors globally. Chevening and Commonwealth
          scholarships cover full tuition and living costs — <strong>completely free</strong>. Apply
          for scholarships first before worrying about fees.
        </p>
      </div>

      {/* ── April 2026 updates ── */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>April 2026 Updates</span>
        <h2 className={styles.sectionTitle}>What changed — and what it means for you</h2>
        <div className={styles.changeCards}>
          <div className={`${styles.changeCard} ${styles.warn}`}>
            <div className={styles.changeDate}>April 2026</div>
            <div className={styles.changeTitle}>Genuine Student Test — strengthened</div>
            <div className={styles.changeDesc}>
              UKVI has doubled down on the Genuine Student assessment. Caseworkers are instructed to
              scrutinise applications from high-refusal countries more carefully, looking at: whether the
              chosen course makes sense for the applicant's background, whether the institution is
              well-matched (not just the lowest-entry provider), and whether the applicant has realistic
              plans after study. A strong personal statement linking your degree choice to a clear career
              goal is now more important than ever.
            </div>
          </div>
          <div className={`${styles.changeCard} ${styles.warn}`}>
            <div className={styles.changeDate}>January 2024 — Still in Force 2026</div>
            <div className={styles.changeTitle}>Dependant ban for undergrad and taught postgrad</div>
            <div className={styles.changeDesc}>
              Undergraduate and taught Master's students cannot bring dependant family members.
              Only PhD (research doctorate) and government-sponsored students are exempt. This rule
              remains fully in force in April 2026. If you have children or a spouse, this must be
              factored into your plans carefully — or you consider a PhD route or sponsored programme.
            </div>
          </div>
          <div className={styles.changeCard}>
            <div className={styles.changeDate}>2025–2026</div>
            <div className={styles.changeTitle}>Graduate Route — confirmed and retained</div>
            <div className={styles.changeDesc}>
              After a full Migration Advisory Committee review, the Graduate Route was retained in full.
              Bachelor's and Master's graduates get 2 years. PhD graduates get 3 years. You can work
              for any employer in any role at any salary. This is one of the most valuable post-study
              work routes in the world — use it to transition to a Skilled Worker visa.
            </div>
          </div>
          <div className={styles.changeCard}>
            <div className={styles.changeDate}>2025</div>
            <div className={styles.changeTitle}>ETA — Electronic Travel Authorisation for visa-exempt nationalities</div>
            <div className={styles.changeDesc}>
              UK ETA is now required for many nationalities previously exempt from pre-travel checks
              (GCC countries, some others). This is separate from the Student Visa but affects short
              pre-enrolment visits. Check if your nationality requires an ETA at gov.uk/guidance/electronic-travel-authorisation.
            </div>
          </div>
          <div className={styles.changeCard}>
            <div className={styles.changeDate}>2024–2026</div>
            <div className={styles.changeTitle}>English language — approved test list updated</div>
            <div className={styles.changeDesc}>
              UKVI updated the Secure English Language Tests (SELT) list. Approved tests include:
              IELTS (Academic), TOEFL iBT, Cambridge B2 First/C1 Advanced, PTE Academic, and
              Trinity College London ISE. Check the current approved list on gov.uk — some previously
              accepted tests were removed. Always verify before booking your test.
            </div>
          </div>
        </div>
      </div>

      {/* ── Eligibility ── */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>Eligibility</span>
        <h2 className={styles.sectionTitle}>Who can apply</h2>
        <ul className={styles.reqList}>
          {[
            'You have an unconditional offer from a UKVI-licensed educational institution (university, college, or language school).',
            'You have a Confirmation of Acceptance for Studies (CAS) reference number from your institution.',
            'You can show you have enough money to pay course fees and living costs for the first 9 months (or full duration if shorter).',
            'You meet the English language requirement — usually IELTS Academic 5.5–7.0 depending on the course and level.',
            'You are aged 16 or over (under 18s have additional safeguarding requirements).',
            'You have a genuine intention to study — not to use the student route as a back door to work or settle long-term.',
          ].map((r, i) => (
            <li key={i} className={styles.reqItem}>
              <span className={styles.reqCheck}>✓</span>
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Steps ── */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>Step by Step</span>
        <h2 className={styles.sectionTitle}>How to get a Student Visa</h2>
        <div className={styles.steps}>
          {[
            {
              title: 'Apply to a UK university or college',
              desc: 'Use UCAS (ucas.com) for undergraduate courses. Apply directly to universities for postgraduate courses. Ensure the institution is on the UKVI Register of Student Sponsors — only licensed sponsors can issue a CAS. Apply for scholarships at the same time — Chevening, Commonwealth, and GREAT scholarships can cover everything.',
            },
            {
              title: 'Receive your offer and CAS',
              desc: 'Once accepted unconditionally, your institution issues a Confirmation of Acceptance for Studies (CAS) — a unique reference number. It includes your course details, start date, and fees. Do not apply for your visa until you have this.',
            },
            {
              title: 'Prepare your financial evidence',
              desc: 'You must show bank statements covering the visa fee, IHS surcharge, and living costs (£1,334/month in London, £1,023/month elsewhere) for the first 9 months of study. Funds must be held in your (or your parent\'s) account for at least 28 consecutive days before your application.',
            },
            {
              title: 'Apply online — up to 6 months before course starts',
              desc: 'Apply at gov.uk/student-visa. Pay the £490 fee plus the Immigration Health Surcharge (£776/year of study). You will need: your CAS, financial evidence, valid passport, English test certificate, and a personal statement. Apply no more than 6 months before your course start date.',
            },
            {
              title: 'Attend a biometric appointment',
              desc: 'Book at a UK Visa Application Centre (UKVASC) in your country. Provide fingerprints and a photograph. Processing normally takes 3–6 weeks; allow 10–14 weeks from high-scrutiny countries. Do not book non-refundable travel until your visa is confirmed.',
            },
            {
              title: 'Arrive and collect your BRP',
              desc: 'Your visa lets you enter the UK up to 1 month before your course start date. Collect your Biometric Residence Permit (BRP) from a designated Post Office within 10 days of arrival. Register with your university, open a UK bank account, and register with a GP.',
            },
            {
              title: 'Apply for the Graduate Route after graduation',
              desc: 'Once you complete your degree, apply for the Graduate Route visa (£822 fee): 2 years for Bachelor\'s/Master\'s, 3 years for PhD. Work in any job for any employer. From there, many graduates switch to a Skilled Worker Visa and build a long-term future in the UK — legally and securely.',
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

      {/* ── Financial evidence box ── */}
      <div className={styles.warningBox}>
        <span className={styles.alertIcon}>💰</span>
        <div className={styles.warningText}>
          <strong>Financial evidence is the most common refusal reason.</strong> Your funds must be in
          your account (or your sponsor's account) for 28 consecutive days before you apply. A sudden
          large deposit — especially from an unknown source — is a red flag for UKVI. Start saving and
          documenting funds months before your application.
        </div>
      </div>

      <SolicitorSection
        caseTypeSlug="student"
        region="uk"
        title={pt.solicitorTitle}
      />
    </PathwayPage>
  );
}

export async function getServerSideProps({ locale }) {
  const pt = getPageTranslations(locale, 'uk-student');
  return { props: { pt } };
}
