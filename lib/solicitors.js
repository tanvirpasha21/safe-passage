/**
 * Authorised legal help database.
 *
 * UK organisations: SRA-regulated solicitors OR OISC-registered advisers OR government-funded charities only.
 * EU organisations: UNHCR-affiliated, national bar-registered, or government-funded legal aid only.
 *
 * Fields:
 *  id           — unique slug
 *  name         — display name
 *  type         — 'free' | 'paid' | 'search-tool'
 *  regulation   — regulator and reference
 *  caseTypes    — which pathway types this org covers
 *  regions      — which geographies this org covers
 *  desc         — short description
 *  phone        — contact number (optional)
 *  email        — contact email (optional)
 *  website      — URL
 *  languages    — languages spoken (optional)
 *  helpline     — boolean, true if free helpline available
 *  verified     — 'SRA' | 'OISC' | 'Charity' | 'Gov' | 'UNHCR' | 'EU'
 */

export const SOLICITORS = [
  /* ─────────────────────────────────────────
     UK — FREE / CHARITY
  ───────────────────────────────────────── */
  {
    id: 'migrant-help',
    name: 'Migrant Help',
    type: 'free',
    regulation: 'Government-funded — Home Office contract',
    verified: 'Gov',
    caseTypes: ['asylum', 'resettlement', 'humanitarian'],
    regions: ['uk', 'england', 'scotland', 'wales', 'northern-ireland'],
    desc: 'The main government-funded free advice service for asylum seekers in the UK. Covers the entire asylum process, appeals, and asylum support. 24/7 helpline.',
    phone: '0808 801 0503',
    website: 'https://www.migranthelpuk.org',
    languages: ['English', 'Arabic', 'Tigrinya', 'Somali', 'Dari', 'Pashto'],
    helpline: true,
  },
  {
    id: 'refugee-council',
    name: 'Refugee Council',
    type: 'free',
    regulation: 'Registered Charity — No. 1014576',
    verified: 'Charity',
    caseTypes: ['asylum', 'resettlement', 'family', 'humanitarian'],
    regions: ['uk', 'england', 'wales'],
    desc: 'The UK\'s largest refugee charity. Provides legal advice, casework support, and integration assistance. Specialist services for women, children, and LGBTQ+ refugees.',
    phone: '0808 196 7272',
    email: 'info@refugeecouncil.org.uk',
    website: 'https://www.refugeecouncil.org.uk',
    languages: ['English', 'Arabic', 'French', 'Tigrinya', 'Somali'],
    helpline: true,
  },
  {
    id: 'asylum-aid',
    name: 'Asylum Aid',
    type: 'free',
    regulation: 'Registered Charity — No. 328729 | OISC Level 3',
    verified: 'Charity',
    caseTypes: ['asylum', 'humanitarian'],
    regions: ['uk', 'england'],
    desc: 'Specialist free legal representation for people seeking asylum and protection. Handles complex asylum cases, appeals, and judicial review.',
    phone: '020 7354 9631',
    email: 'info@asylumaid.org.uk',
    website: 'https://asylumaid.org.uk',
    languages: ['English', 'Arabic', 'French'],
    helpline: false,
  },
  {
    id: 'refugee-action',
    name: 'Refugee Action',
    type: 'free',
    regulation: 'Registered Charity — No. 1099497 | OISC registered',
    verified: 'Charity',
    caseTypes: ['asylum', 'resettlement', 'family'],
    regions: ['uk', 'england'],
    desc: 'Free immigration legal advice services for refugees and asylum seekers. Offices in London, Manchester, Birmingham, Leeds, Bristol, Liverpool, and Plymouth.',
    phone: '020 7952 1511',
    website: 'https://www.refugee-action.org.uk',
    languages: ['English', 'Arabic', 'Dari', 'Pashto', 'Tigrinya', 'Somali', 'French'],
    helpline: false,
  },
  {
    id: 'aire-centre',
    name: 'AIRE Centre',
    type: 'free',
    regulation: 'Registered Charity — No. 1090030',
    verified: 'Charity',
    caseTypes: ['asylum', 'family', 'humanitarian', 'skilled-worker'],
    regions: ['uk', 'england'],
    desc: 'Advice on Individual Rights in Europe. Specialist legal charity covering EU law, human rights, and immigration. Handles cases before the European Court of Human Rights.',
    phone: '020 7831 4276',
    website: 'https://www.airecentre.org',
    languages: ['English', 'French', 'Spanish', 'Portuguese'],
    helpline: false,
  },
  {
    id: 'citizens-advice',
    name: 'Citizens Advice',
    type: 'free',
    regulation: 'Registered Charity — No. 279057',
    verified: 'Charity',
    caseTypes: ['asylum', 'skilled-worker', 'student', 'family', 'resettlement', 'humanitarian'],
    regions: ['uk', 'england', 'wales', 'scotland'],
    desc: 'Free, confidential immigration advice at over 900 local offices across England, Wales and Scotland. Good for initial advice on any immigration matter.',
    phone: '0800 144 8848',
    website: 'https://www.citizensadvice.org.uk/immigration/',
    languages: ['English', 'Welsh'],
    helpline: true,
  },
  {
    id: 'coram-clc',
    name: 'Coram Children\'s Legal Centre',
    type: 'free',
    regulation: 'Registered Charity — No. 1092117 | OISC Level 3',
    verified: 'Charity',
    caseTypes: ['asylum', 'family', 'resettlement'],
    regions: ['uk', 'england'],
    desc: 'Specialist free legal advice for children and young people. Covers child asylum claims, age disputes, unaccompanied asylum seeking children (UASC), and family reunion.',
    phone: '0300 330 5485',
    website: 'https://www.childrenslegalcentre.com',
    languages: ['English', 'Arabic', 'Dari', 'Somali'],
    helpline: true,
  },
  {
    id: 'legal-action-group',
    name: 'Immigration Law Practitioners\' Association (ILPA)',
    type: 'free',
    regulation: 'Professional Association — members are SRA-regulated',
    verified: 'SRA',
    caseTypes: ['asylum', 'skilled-worker', 'student', 'family', 'resettlement', 'humanitarian'],
    regions: ['uk', 'england', 'scotland', 'wales', 'northern-ireland'],
    desc: 'ILPA is the professional body for immigration lawyers in the UK. Their website has a directory of specialist immigration law members and resources for finding regulated advice.',
    website: 'https://www.ilpa.org.uk/resources/find-a-member',
    languages: ['English'],
    helpline: false,
  },
  {
    id: 'freedom-from-torture',
    name: 'Freedom from Torture',
    type: 'free',
    regulation: 'Registered Charity — No. 1000340',
    verified: 'Charity',
    caseTypes: ['asylum', 'humanitarian'],
    regions: ['uk', 'england', 'scotland'],
    desc: 'Provides medical, psychological, and legal support to survivors of torture. Expert medical documentation for asylum claims (medico-legal reports). Free legal advice.',
    phone: '020 7697 7777',
    website: 'https://www.freedomfromtorture.org',
    languages: ['English', 'Arabic', 'Somali', 'Tigrinya', 'Dari', 'Pashto'],
    helpline: false,
  },
  {
    id: 'law-centres-network',
    name: 'Law Centres Network',
    type: 'free',
    regulation: 'Network of SRA-regulated Law Centres',
    verified: 'SRA',
    caseTypes: ['asylum', 'skilled-worker', 'student', 'family', 'humanitarian'],
    regions: ['uk', 'england', 'wales', 'scotland', 'northern-ireland'],
    desc: 'Network of 40+ Law Centres across the UK providing free legal advice including immigration and asylum. Staffed by qualified solicitors and barristers.',
    website: 'https://www.lawcentres.org.uk/find-a-law-centre',
    languages: ['English', 'Multiple languages via interpreter'],
    helpline: false,
  },
  {
    id: 'jcwi',
    name: 'Joint Council for the Welfare of Immigrants (JCWI)',
    type: 'free',
    regulation: 'Registered Charity — No. 1171408 | OISC Level 3',
    verified: 'Charity',
    caseTypes: ['asylum', 'skilled-worker', 'family', 'humanitarian'],
    regions: ['uk', 'england'],
    desc: 'Policy and legal advice charity. Provides free direct legal services to individuals with immigration issues. Strong expertise in family and asylum cases.',
    phone: '020 7251 8708',
    website: 'https://www.jcwi.org.uk',
    languages: ['English', 'Arabic'],
    helpline: false,
  },
  {
    id: 'scottish-refugee-council',
    name: 'Scottish Refugee Council',
    type: 'free',
    regulation: 'Registered Charity — No. SC008639 | OISC registered',
    verified: 'Charity',
    caseTypes: ['asylum', 'resettlement', 'family', 'humanitarian'],
    regions: ['uk', 'scotland'],
    desc: 'Free legal advice and support for refugees and asylum seekers in Scotland. Offices in Glasgow and Edinburgh.',
    phone: '0141 248 9799',
    website: 'https://www.scottishrefugeecouncil.org.uk',
    languages: ['English', 'Arabic', 'Dari', 'Somali', 'Tigrinya'],
    helpline: false,
  },
  {
    id: 'wales-refugee-council',
    name: 'Welsh Refugee Council (Oasis)',
    type: 'free',
    regulation: 'Registered Charity — No. 1105023 | OISC registered',
    verified: 'Charity',
    caseTypes: ['asylum', 'resettlement', 'family'],
    regions: ['uk', 'wales'],
    desc: 'Free legal advice and support for refugees and asylum seekers in Wales. Offices in Cardiff, Swansea, and Newport.',
    phone: '029 2048 9800',
    website: 'https://wrc.wales',
    languages: ['English', 'Welsh', 'Arabic'],
    helpline: false,
  },

  /* ─────────────────────────────────────────
     UK — OFFICIAL SEARCH TOOLS (paid/regulated)
  ───────────────────────────────────────── */
  {
    id: 'law-society-search',
    name: 'Law Society — Find a Solicitor',
    type: 'search-tool',
    regulation: 'SRA-regulated (Solicitors Regulation Authority)',
    verified: 'SRA',
    caseTypes: ['asylum', 'skilled-worker', 'student', 'family', 'resettlement', 'humanitarian'],
    regions: ['uk', 'england', 'wales'],
    desc: 'The official register of all SRA-regulated immigration solicitors in England and Wales. Search by your location and "immigration" specialism to find regulated paid solicitors near you.',
    website: 'https://solicitors.lawsociety.org.uk/',
    helpline: false,
  },
  {
    id: 'gov-oisc-search',
    name: 'Gov.uk — Find an OISC Immigration Adviser',
    type: 'search-tool',
    regulation: 'OISC-registered (Office of the Immigration Services Commissioner)',
    verified: 'OISC',
    caseTypes: ['asylum', 'skilled-worker', 'student', 'family', 'resettlement', 'humanitarian'],
    regions: ['uk', 'england', 'scotland', 'wales', 'northern-ireland'],
    desc: 'Official government directory of OISC-registered immigration advisers (Levels 1–3). These are NOT solicitors but are legally authorised to give immigration advice. Only use advisers listed here.',
    website: 'https://www.gov.uk/find-an-immigration-adviser',
    helpline: false,
  },
  {
    id: 'law-society-scotland',
    name: 'Law Society of Scotland — Find a Solicitor',
    type: 'search-tool',
    regulation: 'Law Society of Scotland regulated',
    verified: 'SRA',
    caseTypes: ['asylum', 'skilled-worker', 'student', 'family', 'resettlement', 'humanitarian'],
    regions: ['scotland'],
    desc: 'Official directory of regulated solicitors in Scotland. Search by area and "immigration and asylum" specialism.',
    website: 'https://www.lawscot.org.uk/find-a-solicitor/',
    helpline: false,
  },
  {
    id: 'law-society-ni',
    name: 'Law Society of Northern Ireland',
    type: 'search-tool',
    regulation: 'Law Society of Northern Ireland regulated',
    verified: 'SRA',
    caseTypes: ['asylum', 'skilled-worker', 'student', 'family', 'resettlement', 'humanitarian'],
    regions: ['northern-ireland'],
    desc: 'Official directory of regulated solicitors in Northern Ireland.',
    website: 'https://www.lawsoc-ni.org/solicitors',
    helpline: false,
  },

  /* ─────────────────────────────────────────
     EU / INTERNATIONAL
  ───────────────────────────────────────── */
  {
    id: 'unhcr-help',
    name: 'UNHCR — Find Help',
    type: 'free',
    regulation: 'United Nations — UNHCR',
    verified: 'UNHCR',
    caseTypes: ['asylum', 'resettlement', 'humanitarian'],
    regions: ['eu', 'uk', 'international'],
    desc: 'Locate the nearest UNHCR office for free protection advice, registration, and referral to legal aid. Essential first step for resettlement.',
    website: 'https://www.unhcr.org/get-help',
    helpline: true,
  },
  {
    id: 'ecre-members',
    name: 'ECRE — Member Organisations',
    type: 'free',
    regulation: 'European Council on Refugees and Exiles',
    verified: 'EU',
    caseTypes: ['asylum', 'resettlement', 'family', 'humanitarian'],
    regions: ['eu'],
    desc: '100+ national legal aid and asylum support organisations across all EU countries. Find the authorised organisation in your specific EU country.',
    website: 'https://ecre.org/members/',
    helpline: false,
  },
  {
    id: 'euaa-support',
    name: 'EUAA — Asylum Support',
    type: 'free',
    regulation: 'EU Agency for Asylum (EUAA)',
    verified: 'EU',
    caseTypes: ['asylum', 'humanitarian'],
    regions: ['eu'],
    desc: 'Official EU agency providing information on national asylum procedures and legal assistance in every EU member state.',
    website: 'https://euaa.europa.eu/asylum-support',
    helpline: false,
  },
  {
    id: 'aida-database',
    name: 'AIDA — Asylum Information Database',
    type: 'free',
    regulation: 'ECRE-managed legal database',
    verified: 'EU',
    caseTypes: ['asylum', 'humanitarian', 'family'],
    regions: ['eu'],
    desc: 'Country-by-country legal guides on asylum procedures, reception, detention, and legal aid across 23 European countries. Use to find legal help in your specific EU country.',
    website: 'https://asylumineurope.org',
    helpline: false,
  },
  {
    id: 'picum',
    name: 'PICUM',
    type: 'free',
    regulation: 'Registered EU NGO',
    verified: 'EU',
    caseTypes: ['humanitarian', 'family'],
    regions: ['eu'],
    desc: 'Platform for International Cooperation on Undocumented Migrants. Provides resources and referrals to legal support across Europe.',
    website: 'https://picum.org/resources/',
    helpline: false,
  },
  {
    id: 'germany-bamf',
    name: 'Germany — BAMF Legal Aid',
    type: 'free',
    regulation: 'German Federal Government (BAMF)',
    verified: 'Gov',
    caseTypes: ['asylum', 'resettlement', 'humanitarian'],
    regions: ['eu'],
    desc: 'The German Federal Office for Migration and Refugees (BAMF) provides free initial legal counselling for asylum seekers in Germany through accredited organisations.',
    website: 'https://www.bamf.de/EN/Themen/AsylFluechtlingsschutz/AblaufAsylverfahrens/ablaufasylverfahrens-node.html',
    helpline: false,
  },
  {
    id: 'france-ofpra',
    name: 'France — OFPRA & Legal Aid',
    type: 'free',
    regulation: 'French Republic — OFPRA',
    verified: 'Gov',
    caseTypes: ['asylum', 'humanitarian'],
    regions: ['eu'],
    desc: 'France\'s asylum authority OFPRA provides information on procedures. Legal aid (aide juridictionnelle) is available for asylum applicants at CNDA (appeal body). OFII provides reception support.',
    website: 'https://www.ofpra.gouv.fr/en',
    helpline: false,
  },
];

/* ─────────────────────────────────────────
   HELPER FUNCTIONS
───────────────────────────────────────── */

export const CASE_TYPES = [
  { value: 'all', label: 'All case types' },
  { value: 'asylum', label: 'Asylum & Protection' },
  { value: 'resettlement', label: 'Resettlement' },
  { value: 'skilled-worker', label: 'Skilled Worker / Work Visa' },
  { value: 'student', label: 'Student Visa' },
  { value: 'family', label: 'Family Reunification' },
  { value: 'humanitarian', label: 'Humanitarian Visa' },
];

export const REGIONS = [
  { value: 'all', label: 'All regions' },
  { value: 'uk', label: 'United Kingdom (all)' },
  { value: 'england', label: 'England' },
  { value: 'scotland', label: 'Scotland' },
  { value: 'wales', label: 'Wales' },
  { value: 'northern-ireland', label: 'Northern Ireland' },
  { value: 'eu', label: 'European Union' },
  { value: 'international', label: 'International / Worldwide' },
];

export const COST_FILTERS = [
  { value: 'all', label: 'All (free & paid)' },
  { value: 'free', label: 'Free / Charity only' },
  { value: 'search-tool', label: 'Find a paid solicitor' },
];

export function filterSolicitors({ caseType = 'all', region = 'all', cost = 'all' }) {
  return SOLICITORS.filter(s => {
    const matchCase = caseType === 'all' || s.caseTypes.includes(caseType);
    const matchRegion = region === 'all' || s.regions.includes(region) || s.regions.includes('international');
    const matchCost = cost === 'all' || s.type === cost;
    return matchCase && matchRegion && matchCost;
  });
}

// Legacy exports for backwards compatibility with pathway pages
export const UK_FREE_HELP = SOLICITORS.filter(s => s.type === 'free' && s.regions.includes('uk'));
export const UK_FIND_SOLICITOR = SOLICITORS.filter(s => s.type === 'search-tool' && s.regions.includes('uk'));
export const EU_FREE_HELP = SOLICITORS.filter(s => s.type === 'free' && s.regions.includes('eu'));
