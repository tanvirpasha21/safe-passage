import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/ComeHome.module.css';
import { getPageTranslations } from '../lib/i18n';

const COUNTRY_OPPORTUNITIES = [
  {
    country: 'Bangladesh',
    flag: '🇧🇩',
    gdpGrowth: '6.5%',
    sectors: ['Garment & textile tech', 'IT & software (Dhaka tech hub)', 'Fintech & mobile banking', 'Agri-tech', 'Healthcare'],
    investExample: {
      amount: '৳15,00,000 (≈ £10,500)',
      what: 'Small factory unit in Gazipur, or franchise outlet in Dhaka, or 3-bedroom apartment in Sylhet generating rental income',
    },
    returnSalary: '৳80,000–1,50,000/month for returning professionals',
    ukEquivalent: 'Same buying power as £3,500–6,500/month in UK terms',
    note: 'Bangladesh is one of the fastest-growing economies in Asia. The government offers tax holidays and incentives for returning diaspora entrepreneurs under the "Probashi" programme.',
  },
  {
    country: 'Nigeria',
    flag: '🇳🇬',
    gdpGrowth: '3.4%',
    sectors: ['Fintech (Africa\'s largest fintech hub)', 'Oil & gas tech', 'Agriculture & food processing', 'Film & creative industries (Nollywood)', 'Telecoms & infrastructure'],
    investExample: {
      amount: '₦10,000,000 (≈ £5,000)',
      what: 'Franchise outlet in Lagos or Abuja, small-scale poultry or fish farm, or a professional consultancy office',
    },
    returnSalary: '₦500,000–1,500,000/month for experienced professionals',
    ukEquivalent: 'Equivalent lifestyle to earning £4,000–10,000/month in UK cost terms',
    note: 'Lagos is Africa\'s largest city and commercial capital. Nigeria has more fintech unicorns than any other African country. Nigerian diaspora remittances exceed $20bn/year — returning with skills multiplies that impact.',
  },
  {
    country: 'Kenya',
    flag: '🇰🇪',
    gdpGrowth: '5.6%',
    sectors: ['Tech & innovation (Silicon Savannah)', 'Renewable energy', 'Agriculture & food exports', 'Tourism & hospitality', 'Financial services'],
    investExample: {
      amount: 'KES 1,500,000 (≈ £8,500)',
      what: 'Tech startup seed capital in Nairobi, small hotel or guesthouse in Mombasa, or agricultural land in Rift Valley',
    },
    returnSalary: 'KES 200,000–500,000/month for returning professionals',
    ukEquivalent: 'Comfortable upper-middle-class lifestyle — equivalent to £5,000+/month in UK terms',
    note: 'Nairobi is East Africa\'s business hub and home to M-Pesa, the world\'s most successful mobile money platform. Kenya\'s innovation ecosystem is world-class.',
  },
  {
    country: 'Ghana',
    flag: '🇬🇭',
    gdpGrowth: '4.8%',
    sectors: ['Mining & resources', 'Cocoa & agriculture', 'Tourism & real estate', 'Financial services', 'Oil & gas'],
    investExample: {
      amount: 'GHS 120,000 (≈ £7,500)',
      what: 'Studio apartment in Accra for rental income, small agri-processing unit, or travel/tour agency',
    },
    returnSalary: 'GHS 15,000–40,000/month for experienced professionals',
    ukEquivalent: 'Solid middle-class life with domestic help, car, and home ownership',
    note: 'Ghana has one of the most stable democracies in Africa. The "Year of Return" initiative actively encourages diaspora investment and return. English-speaking, low corruption index for the region.',
  },
  {
    country: 'Ethiopia',
    flag: '🇪🇹',
    gdpGrowth: '7.2%',
    sectors: ['Manufacturing & textiles', 'Coffee & agriculture exports', 'Construction & real estate', 'Tourism', 'Aviation (Ethiopian Airlines hub)'],
    investExample: {
      amount: 'ETB 600,000 (≈ £4,000)',
      what: 'Coffee export micro-business, small manufacturing unit in industrial parks, or tourism guest house in Addis Ababa',
    },
    returnSalary: 'ETB 50,000–150,000/month for returning professionals',
    ukEquivalent: 'Upper-class lifestyle with affordable domestic help, vehicle, and owned housing',
    note: 'Ethiopia is one of the fastest-growing economies in the world. The government offers significant incentives for diaspora investors including duty-free imports of capital goods and land lease concessions.',
  },
  {
    country: 'Pakistan',
    flag: '🇵🇰',
    gdpGrowth: '3.0%',
    sectors: ['IT & software exports (fastest growing)', 'Textiles & manufacturing', 'Agriculture & food', 'Construction & real estate', 'Freelance tech (Pakistan is in global top 5)'],
    investExample: {
      amount: 'PKR 2,500,000 (≈ £6,800)',
      what: 'Apartment in Lahore or Islamabad, freelance IT agency, or import/export business leveraging UK contacts',
    },
    returnSalary: 'PKR 300,000–800,000/month for experienced professionals',
    ukEquivalent: 'Upper-class lifestyle — cook, driver, spacious home, children in top private schools',
    note: 'Pakistan\'s IT export sector grew 26% in 2023. Freelancers in Pakistan earn in dollars and pounds while spending in rupees — one of the highest effective living standards in Asia for tech workers.',
  },
];

const MONEY_COMPARISON = [
  {
    amount: '£5,000',
    context: 'Typical smuggler advance payment',
    inUK: 'About 3.5 months of a shared room in London',
    atHome: 'Down payment on a house plot in many African and South Asian countries',
  },
  {
    amount: '£10,000',
    context: 'Mid-range smuggler fee',
    inUK: 'Less than 7 months rent for a room in Birmingham',
    atHome: 'Build or buy a 2–3 bedroom house outright in rural Bangladesh, Ghana, Ethiopia',
  },
  {
    amount: '£15,000',
    context: 'High-end smuggler fee (Mediterranean route)',
    inUK: 'One year rent on a modest flat outside London, nothing saved',
    atHome: 'Start a small business, own a car, and still have savings — in Nigeria, Kenya, or Pakistan',
  },
  {
    amount: '£30,000',
    context: 'Total cost some families spend for one person to migrate irregularly',
    inUK: 'Two years in basic accommodation, working minimum wage, sending very little home',
    atHome: 'Fund a whole family for 5+ years, build a home, start a business, send children to private school',
  },
];

const REALITY_CHECKS = [
  {
    myth: 'Streets paved with gold',
    reality: 'Minimum wage after tax is about £1,800/month. After a shared room (£900), council tax (£100), food (£250), phone/transport (£200) — you have £350 left. Nothing to send home.',
    icon: '💷',
  },
  {
    myth: 'Easy to get a good job with any degree',
    reality: 'Without UK work experience and a UK network, most immigrants spend their first 2–5 years in warehouse, delivery, or care work — regardless of qualifications. Credential recognition takes years.',
    icon: '💼',
  },
  {
    myth: 'NHS = free world-class healthcare',
    reality: 'NHS GP appointments take 3–6 weeks. Mental health referrals: 1–2 years. Dental NHS appointments are almost impossible to book in most cities. You pay full price for prescriptions.',
    icon: '🏥',
  },
  {
    myth: 'The weather is fine',
    reality: "November to March: grey, cold, dark by 4pm. Seasonal depression affects a huge proportion of the immigrant population. The sun you are used to does not exist in the UK winter. This sounds minor — it is not.",
    icon: '🌧️',
  },
  {
    myth: 'You can bring your family easily',
    reality: 'Family reunification for non-EU/UK spouses now requires earning £29,000+/year (rising to £38,700 by 2025). Many migrants are separated from spouses and children for 5–10 years.',
    icon: '👨‍👩‍👧',
  },
  {
    myth: 'Citizenship in 5 years',
    reality: "Indefinite Leave to Remain costs £2,885 per person. Citizenship adds another £1,630+. For a family of 4 that's over £18,000 — just in fees — plus legal costs. Many are still applying after 10+ years.",
    icon: '🛂',
  },
];

export default function ComeHome({ pt }) {
  return (
    <>
      <Head>
        <title>{pt.meta.title} | SafePassage</title>
        <meta name="description" content={pt.meta.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={styles.page}>
        {/* ── Top bar ── */}
        <nav className={styles.topBar}>
          <Link href="/" className={styles.logo}>Safe<span>Passage</span></Link>
          <div className={styles.topBarLinks}>
            <Link href="/#think" className={styles.topBarLink}>Think First</Link>
            <Link href="/pathways/uk" className={styles.topBarLink}>UK Pathways</Link>
            <Link href="/pathways/eu" className={styles.topBarLink}>EU Pathways</Link>
            <Link href="/solicitors" className={styles.topBarLink}>Find Legal Help</Link>
          </div>
        </nav>

        {/* ── Hero ── */}
        <section className={styles.hero}>
          <div className={styles.heroBg} />
          <div className={styles.heroInner}>
            <div className={styles.heroTag}>{pt.heroTag}</div>
            <h1 className={styles.heroTitle} dangerouslySetInnerHTML={{ __html: pt.heroTitle }} />
            <p className={styles.heroSub}>{pt.heroSub}</p>
            <div className={styles.heroCtas}>
              <a href="#money" className={styles.ctaBtn}>See the comparison →</a>
              <a href="#reality" className={styles.ctaBtnOutline}>The UK reality</a>
            </div>
          </div>
        </section>

        {/* ── Money comparison ── */}
        <section id="money" className={styles.section}>
          <div className={styles.container}>
            <span className={styles.sectionLabel}>The Real Numbers</span>
            <h2 className={styles.sectionTitle} dangerouslySetInnerHTML={{ __html: pt.moneyTitle }} />
            <p className={styles.sectionLead}>{pt.moneyLead}</p>
            <div className={styles.comparisonGrid}>
              {MONEY_COMPARISON.map((item, i) => (
                <div key={i} className={styles.compCard}>
                  <div className={styles.compAmount}>{item.amount}</div>
                  <div className={styles.compContext}>{item.context}</div>
                  <div className={styles.compRow}>
                    <div className={styles.compBad}>
                      <div className={styles.compLabel}>🇬🇧 In the UK this buys:</div>
                      <div className={styles.compText}>{item.inUK}</div>
                    </div>
                    <div className={styles.compVs}>VS</div>
                    <div className={styles.compGood}>
                      <div className={styles.compLabel}>🏠 At home it buys:</div>
                      <div className={styles.compText}>{item.atHome}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Reality checks ── */}
        <section id="reality" className={styles.section + ' ' + styles.sectionDark}>
          <div className={styles.container}>
            <span className={styles.sectionLabel}>Before You Go</span>
            <h2 className={styles.sectionTitle} dangerouslySetInnerHTML={{ __html: pt.mythsTitle }} />
            <p className={styles.sectionLead}>{pt.mythsLead}</p>
            <div className={styles.mythGrid}>
              {REALITY_CHECKS.map((item, i) => (
                <div key={i} className={styles.mythCard}>
                  <div className={styles.mythIcon}>{item.icon}</div>
                  <div className={styles.mythLabel}>Myth: "{item.myth}"</div>
                  <div className={styles.mythReality}>{item.reality}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Country opportunities ── */}
        <section id="opportunities" className={styles.section}>
          <div className={styles.container}>
            <span className={styles.sectionLabel}>Your Country Is Growing</span>
            <h2 className={styles.sectionTitle} dangerouslySetInnerHTML={{ __html: pt.opportunitiesTitle }} />
            <p className={styles.sectionLead}>{pt.opportunitiesLead}</p>
            <div className={styles.countryGrid}>
              {COUNTRY_OPPORTUNITIES.map((c, i) => (
                <div key={i} className={styles.countryCard}>
                  <div className={styles.countryHeader}>
                    <span className={styles.countryFlag}>{c.flag}</span>
                    <div>
                      <div className={styles.countryName}>{c.country}</div>
                      <div className={styles.countryGdp}>GDP growth: <strong>{c.gdpGrowth}</strong> annually</div>
                    </div>
                  </div>

                  <div className={styles.countrySection}>
                    <div className={styles.countrySectionTitle}>Growing sectors:</div>
                    <div className={styles.sectorList}>
                      {c.sectors.map((s, j) => (
                        <span key={j} className={styles.sectorTag}>{s}</span>
                      ))}
                    </div>
                  </div>

                  <div className={styles.investBox}>
                    <div className={styles.investTitle}>With {c.investExample.amount} you could:</div>
                    <div className={styles.investText}>{c.investExample.what}</div>
                  </div>

                  <div className={styles.salaryRow}>
                    <div className={styles.salaryItem}>
                      <div className={styles.salaryLabel}>Return professional salary</div>
                      <div className={styles.salaryVal}>{c.returnSalary}</div>
                    </div>
                    <div className={styles.salaryItem}>
                      <div className={styles.salaryLabel}>UK equivalent purchasing power</div>
                      <div className={styles.salaryVal + ' ' + styles.salaryGreen}>{c.ukEquivalent}</div>
                    </div>
                  </div>

                  <div className={styles.countryNote}>{c.note}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Legal path CTA ── */}
        <section className={styles.ctaSection}>
          <div className={styles.container}>
            <div className={styles.ctaBox}>
              <div className={styles.ctaBoxInner}>
                <span className={styles.ctaIcon}>🎓</span>
                <h2 className={styles.ctaTitle}>{pt.ctaTitle}</h2>
                <p className={styles.ctaSub}>{pt.ctaSub}</p>
                <div className={styles.ctaBtns}>
                  <Link href="/pathways/uk/student" className={styles.ctaBtn}>UK Student Visa Guide →</Link>
                  <Link href="/pathways/uk" className={styles.ctaBtnOutline}>All UK Pathways</Link>
                  <Link href="/pathways/eu" className={styles.ctaBtnOutline}>All EU Pathways</Link>
                </div>
              </div>
              <div className={styles.ctaScholarships}>
                <div className={styles.schTitle}>Free scholarships — apply now</div>
                {[
                  ['Chevening Scholarship', 'Full tuition + living costs + flights — UK govt funded', 'https://www.chevening.org'],
                  ['Commonwealth Scholarship', 'Full funding for citizens of Commonwealth countries', 'https://cscuk.fcdo.gov.uk/'],
                  ['GREAT Scholarships', 'Partial scholarships at top UK universities', 'https://www.britishcouncil.org/study-work-abroad/in-uk/great-scholarships'],
                  ['DAAD (Germany)', 'Free or funded study in Germany — English programmes available', 'https://www.daad.de/en/'],
                ].map(([name, desc, url]) => (
                  <a key={name} href={url} target="_blank" rel="noopener noreferrer" className={styles.schLink}>
                    <div className={styles.schName}>{name}</div>
                    <div className={styles.schDesc}>{desc}</div>
                    <span className={styles.schArrow}>→</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className={styles.footer}>
          <Link href="/" className={styles.footerLogo}>Safe<span>Passage</span></Link>
          <p className={styles.footerText}>
            This page presents publicly available economic data and real cost-of-living figures.
            It is intended to help people make informed decisions — not to discourage legitimate migration
            or asylum seeking. If you face persecution or danger, legal pathways exist and are free to access.
          </p>
          <Link href="/" className={styles.footerBack}>← Back to SafePassage home</Link>
        </footer>
      </div>
    </>
  );
}

export async function getServerSideProps({ locale }) {
  const pt = getPageTranslations(locale, 'come-home');
  return { props: { pt } };
}
