/* ==========================================================================
   data.js — local content model (no network, file:// safe)
   All copy for the site lives here. Swap these values to re-skin the whole
   prototype for a different organisation.

   Structure mirrors the three reference sites:
     · NB.com      → 3-section hero carousel + "at a glance" figure band
     · Aptus ETFs  → dated Media entries with embedded players
     · Aptus Fin.  → programme cards with full detail + downloadable documents
     · Amara       → warm editorial voice, figures that count up
   ========================================================================== */

export const FIRM = {
  name: 'Baruch College Financial Group',
  short: 'BCFG',
  school: 'Baruch College',
  tagline: 'Learn the markets. Run real money. Graduate ready.',
  founded: 2009,
  fund: 2.4,              // student-managed fund, $ millions
  fundAsOf: 'Fall 2026',
  members: 240,
  alumni: 1900,
  placement: 94,          // % of seniors with a finance offer at graduation
  partnerFirms: 61,
};

/* Used in the generated PDFs/CSV/DOC headers and footers. */
export const BRAND = {
  org: 'BARUCH COLLEGE FINANCIAL GROUP',
  orgTitle: 'Baruch College Financial Group',
  contact: 'baruchfinancialgroup@gmail.com · NVC, 55 Lexington Ave',
};

/* Where the student-managed fund is allocated — the "at a glance" band. */
export const AUM_BREAKDOWN = [
  { label: 'Equities', value: 1.35, unit: 'M', note: 'Core, dividend and small-cap sleeves' },
  { label: 'Fixed income', value: 620, unit: 'K', note: 'Treasury ladder and short-duration credit' },
  { label: 'Alternatives', value: 430, unit: 'K', note: 'REITs, commodities and a satellite sleeve' },
];

/* --------------------------------------------------------- hero carousel
   Three sections — the front-page carousel the brief asked for.           */
export const SLIDES = [
  {
    id: 'learn',
    eyebrow: 'Section 01 — Learn',
    nav: 'Learn',
    navSub: 'Workshops, certifications, training',
    title: 'Everything the core curriculum <em>leaves out</em>.',
    lede:
      'Eight-week analyst training, weekly workshops and certification prep — taught by upperclassmen and alumni, not by a textbook. Open to every major, no application, no fee.',
    ctas: [
      { label: 'See the training programme', href: 'resources.html?id=analyst-training', style: 'brass' },
      { label: 'Watch a workshop', href: 'media.html?tag=Workshop', style: 'ghost-inv' },
    ],
    art: 'art-a',
    cards: [
      { label: 'Workshops per semester', value: '24', suffix: '' },
      { label: 'Members trained in 2025–26', value: '240', suffix: '' },
      { label: 'Certification pass rate', value: '92', suffix: '%' },
    ],
    cardFoot: 'Figures from the group’s 2025–26 annual report.',
  },
  {
    id: 'invest',
    eyebrow: 'Section 02 — Invest',
    nav: 'Invest',
    navSub: 'The student-managed fund',
    title: 'Real capital. Real mandate. Real <em>accountability</em>.',
    lede:
      'A $2.4M allocation from the endowment, managed entirely by students. Every position needs a written thesis, a risk case and a committee vote — and the portfolio is reported to the trustees each semester.',
    ctas: [
      { label: 'How the fund works', href: 'resources.html?id=student-fund', style: 'brass' },
      { label: 'Read the research', href: 'media.html?tag=Market+Update', style: 'ghost-inv' },
    ],
    art: 'art-b',
    cards: [
      { label: 'Student-managed allocation', value: '2.4', suffix: 'M' },
      { label: 'Analysts this year', value: '18', suffix: '' },
      { label: 'Positions under coverage', value: '46', suffix: '' },
    ],
    cardFoot: 'Endowment allocation as of Fall 2026. Past performance is not indicative.',
  },
  {
    id: 'launch',
    eyebrow: 'Section 03 — Launch',
    nav: 'Launch',
    navSub: 'Careers, mentors, alumni',
    title: 'Graduate with a track record, not just a <em>transcript</em>.',
    lede:
      'Ninety-four percent of our seniors hold a finance offer at graduation. Alumni mentors, mock interviews, resume reviews and a case-competition team that travels — the network starts the day you join.',
    ctas: [
      { label: 'Mentorship programme', href: 'resources.html?id=mentorship', style: 'brass' },
      { label: 'Alumni panel recordings', href: 'media.html?tag=Careers', style: 'ghost-inv' },
    ],
    art: 'art-c',
    cards: [
      { label: 'Alumni network', value: '1,900', suffix: '' },
      { label: 'Seniors placed at graduation', value: '94', suffix: '%' },
      { label: 'Partner firms', value: '61', suffix: '' },
    ],
    cardFoot: 'Class of 2026 outcomes survey, 71 respondents.',
  },
];

/* ------------------------------------------------------------- resources */
export const CATEGORIES = ['Education', 'Investing', 'Competition', 'Careers', 'Outreach'];
export const AUDIENCES = ['First-years', 'Sophomores', 'Juniors', 'Seniors', 'All members', 'Non-majors'];

export const PROGRAMS = [
  {
    id: 'analyst-training',
    title: 'Analyst Training Programme',
    category: 'Education',
    audience: 'First-years',
    status: 'Open',
    featured: true,
    summary:
      'An eight-week autumn programme that takes you from “what is a bond” to building a three-statement model. No application, no dues, no prior finance coursework.',
    fee: 'Free',
    minimum: 'None',
    horizon: '8 weeks (Sept–Nov)',
    highlights: [
      'Three-statement modelling, DCF and comparable-company analysis',
      'Weekly problem sets marked by upperclassmen with written feedback',
      'Bloomberg terminal certification built into week six',
      'Direct feeder into the student-managed fund and pitch competition',
    ],
    timeline: [
      { when: 'Week 1–2', what: 'Accounting foundations and financial statements' },
      { when: 'Week 3–4', what: 'Forecasting and building a three-statement model' },
      { when: 'Week 5–6', what: 'Valuation: DCF, comps and precedent transactions' },
      { when: 'Week 7–8', what: 'Capstone: full pitch to the investment committee' },
    ],
    documents: [
      { name: 'Analyst training syllabus — autumn cohort', type: 'pdf' },
      { name: 'Session schedule and room assignments', type: 'pdf' },
      { name: 'Problem set answer key (instructors)', type: 'xls' },
    ],
    faqs: [
      { q: 'Do I need to be a finance major?', a: 'No. Roughly 40% of each cohort comes from economics, computer science, engineering or the sciences. The programme assumes no prior finance coursework.' },
      { q: 'What is the time commitment?', a: 'One 90-minute session per week plus about two hours of problem sets. Weeks three and seven run longer.' },
      { q: 'Does it cost anything?', a: 'No. Materials and the Bloomberg certification fee are covered by the group’s alumni fund.' },
    ],
    video: 'Workshop',
  },
  {
    id: 'student-fund',
    title: 'Student-Managed Fund',
    category: 'Investing',
    audience: 'Juniors',
    status: 'Enrolling',
    featured: true,
    summary:
      'The flagship programme: a $2.4M endowment allocation managed by students across three sleeves, with a written investment process and semesterly reporting to the trustees.',
    fee: 'Free (stipend eligible)',
    minimum: 'Training programme completed',
    horizon: '2 semesters',
    highlights: [
      'Sector coverage assigned for a full academic year — you own your names',
      'Every position requires a written thesis, risk case and committee vote',
      'Live portfolio reporting to the endowment trustees each semester',
      'Stipend for the two portfolio managers and the risk officer',
    ],
    timeline: [
      { when: 'Sept', what: 'Applications, interviews and sector assignments' },
      { when: 'Oct–Nov', what: 'Coverage build-out and first pitches' },
      { when: 'Dec', what: 'Semester review with the trustees' },
      { when: 'Feb–Apr', what: 'Rebalance, second cycle of pitches' },
    ],
    documents: [
      { name: 'Investment policy statement', type: 'pdf' },
      { name: 'Pitch template and thesis rubric', type: 'doc' },
      { name: 'Sector coverage tracker', type: 'xls' },
    ],
    faqs: [
      { q: 'How many analysts are taken each year?', a: 'Eighteen, split across the three sleeves. Applications open the first week of September.' },
      { q: 'Do students actually make the trades?', a: 'Yes. Trades settle through the college’s custodian on the committee’s authorisation; no faculty member can override a vote.' },
      { q: 'Is there a minimum GPA?', a: 'A 3.0 cumulative. We weight the written pitch more heavily than the transcript.' },
    ],
    video: 'Market Update',
  },
  {
    id: 'pitch-competition',
    title: 'Annual Stock Pitch Competition',
    category: 'Competition',
    audience: 'Non-majors',
    status: 'Open',
    featured: true,
    summary:
      'Open to every undergraduate: a five-page written thesis and a ten-minute pitch, judged by alumni working in equity research and asset management. Cash prize and a fast track into the fund.',
    fee: 'Free',
    minimum: 'None',
    horizon: 'Annual (November)',
    highlights: [
      'Open to all majors and all years — no membership required',
      'Judged by alumni from research, asset management and hedge funds',
      '$2,500 prize pool plus a guaranteed fund interview for finalists',
      'Written feedback on every submission that clears the first round',
    ],
    timeline: [
      { when: 'Oct 6', what: 'Registration closes' },
      { when: 'Oct 27', what: 'Written thesis submission' },
      { when: 'Nov 8', what: 'First round — 24 advance' },
      { when: 'Nov 20', what: 'Finals in Mason Hall' },
    ],
    documents: [
      { name: 'Competition rules and judging rubric', type: 'pdf' },
      { name: 'Pitch deck template', type: 'doc' },
      { name: '2025 winning thesis — anonymised', type: 'pdf' },
    ],
    faqs: [
      { q: 'Can I enter as a team?', a: 'Teams of up to three, or solo. Teams of three must split the written submission into clearly attributed sections.' },
      { q: 'What counts as a valid idea?', a: 'Any listed equity above $250M market cap, long or short, with a twelve-month horizon.' },
    ],
    video: 'Competition',
  },
  {
    id: 'mentorship',
    title: 'Alumni Mentorship Programme',
    category: 'Careers',
    audience: 'Sophomores',
    status: 'Enrolling',
    summary:
      'One-to-one pairing with an alumnus working in a field you want to enter, structured around six conversations across the academic year rather than an open-ended chat.',
    fee: 'Free',
    minimum: 'Active membership',
    horizon: 'Full academic year',
    highlights: [
      'Matched on stated interest, not on seniority — you pick the sector',
      'Six structured conversation prompts so it never stalls after the first call',
      'Resume review, mock interviews and offer-negotiation practice',
      'Alumni mentors are spread across IB, S&T, asset management, consulting and fintech',
    ],
    timeline: [
      { when: 'Sept', what: 'Mentee applications and interest survey' },
      { when: 'Oct', what: 'Matching and introductions' },
      { when: 'Nov–Apr', what: 'Six structured conversations' },
      { when: 'May', what: 'Programme review and re-matching' },
    ],
    documents: [
      { name: 'Mentorship handbook and conversation guide', type: 'pdf' },
      { name: 'Mentee interest survey', type: 'xls' },
      { name: 'Mock interview question bank', type: 'pdf' },
    ],
    faqs: [
      { q: 'What if my mentor and I do not click?', a: 'Tell the programme lead. Re-matching is routine and never held against you.' },
      { q: 'Can I be a mentor as an alumnus?', a: 'Yes — we need about 120 mentors a year and usually recruit 150 alumni across five sectors.' },
    ],
    video: 'Careers',
  },
  {
    id: 'certification',
    title: 'Certification Prep — BMC & CFA Level I',
    category: 'Education',
    audience: 'All members',
    status: 'Open',
    summary:
      'Subsidised Bloomberg Market Concepts certification and a CFA Level I study group running weekly from February, with the mock exam series and registration fees covered.',
    fee: 'Subsidised (32% of cost)',
    minimum: 'Active membership',
    horizon: 'Semester-long',
    highlights: [
      'Bloomberg Market Concepts fully covered and proctored on campus',
      'CFA Level I registration partly reimbursed on a passing result',
      'Three full mock exams with cohort percentile ranking',
      'Ethics and quant study groups led by members who have already passed',
    ],
    timeline: [
      { when: 'Jan', what: 'Enrolment and diagnostic assessment' },
      { when: 'Feb–Apr', what: 'Weekly study group and mocks' },
      { when: 'May', what: 'Exam window and results review' },
    ],
    documents: [
      { name: 'Study plan and weekly topic map', type: 'pdf' },
      { name: 'Mock exam score tracker', type: 'xls' },
    ],
    faqs: [
      { q: 'Is the CFA reimbursement conditional?', a: 'Yes — you are reimbursed 40% on registering and a further 60% when you pass Level I.' },
    ],
    video: 'Workshop',
  },
  {
    id: 'outreach',
    title: 'Financial Literacy Outreach',
    category: 'Outreach',
    audience: 'All members',
    status: 'Open',
    summary:
      'Volunteers teach budgeting, credit and compound interest at four local high schools and run a free tax-filing clinic on campus each March.',
    fee: 'Volunteer',
    minimum: 'None',
    horizon: 'Rolling, ~2 hrs/month',
    highlights: [
      'Four partner high schools, roughly 600 students reached each year',
      'Ready-made lesson plans — no preparation required from volunteers',
      'Campus tax clinic files about 300 returns each season',
      'Counts toward the college’s community engagement certificate',
    ],
    timeline: [
      { when: 'Sept', what: 'Volunteer sign-up and training' },
      { when: 'Oct–Apr', what: 'School visits, roughly monthly' },
      { when: 'March', what: 'Free tax-filing clinic on campus' },
    ],
    documents: [
      { name: 'Outreach lesson plans and slide decks', type: 'pdf' },
      { name: 'Volunteer scheduling sheet', type: 'xls' },
      { name: 'Tax clinic intake form', type: 'pdf' },
    ],
    faqs: [
      { q: 'Do I need to be certified?', a: 'For the tax clinic, yes — we run the IRS VITA certification in January. For school visits, no training beyond the group session.' },
    ],
    video: 'Outreach',
  },
  {
    id: 'wifi',
    title: 'Women in Finance Initiative',
    category: 'Careers',
    audience: 'All members',
    status: 'Open',
    summary:
      'A dedicated track of speaker events, peer circles and recruiting preparation for women entering finance, run by members with dedicated alumni support.',
    fee: 'Free',
    minimum: 'None',
    horizon: 'Year-round',
    highlights: [
      'Six speaker events a year with women in senior finance roles',
      'Peer circles capped at eight so every voice is heard',
      'Interview prep targeted at the firms where members are actually recruiting',
      'Alumni sponsor pool of 40+ across banking, markets and asset management',
    ],
    timeline: [
      { when: 'Sept', what: 'Kick-off and peer circle matching' },
      { when: 'Oct–Apr', what: 'Speaker series and recruiting workshops' },
      { when: 'May', what: 'End-of-year networking dinner' },
    ],
    documents: [
      { name: 'Programme overview and speaker archive', type: 'pdf' },
      { name: 'Recruiting timeline by firm type', type: 'pdf' },
    ],
    faqs: [
      { q: 'Is it open to members of any gender?', a: 'Events are open to all members. Peer circles are reserved for women and non-binary members.' },
    ],
    video: 'Careers',
  },
  {
    id: 'case-team',
    title: 'Case Competition Team',
    category: 'Competition',
    audience: 'Juniors',
    status: 'Pilot',
    summary:
      'The travelling team: four members selected by tryout to represent Baruch at regional and national case competitions each spring.',
    fee: 'Free (travel covered)',
    minimum: 'Tryout',
    horizon: 'Spring semester',
    highlights: [
      'Travel and accommodation fully funded by the alumni association',
      'Weekly scrimmages against a faculty-judged panel',
      'Dedicated presentation and slide-craft coaching',
      'Six competitions across the region in 2026',
    ],
    timeline: [
      { when: 'Nov', what: 'Open tryout — case crack in 90 minutes' },
      { when: 'Dec', what: 'Squad selection and role assignment' },
      { when: 'Feb–Apr', what: 'Competition season' },
    ],
    documents: [
      { name: 'Tryout case and judging criteria', type: 'pdf' },
      { name: 'Competition calendar and travel policy', type: 'pdf' },
    ],
    faqs: [
      { q: 'Can first-years try out?', a: 'Yes, though the squad skews junior. First-years usually try out for the reserve slot.' },
    ],
    video: 'Competition',
  },
];

/* ---------------------------------------------------------- media library
   Curated sessions — real YouTube embeds. Titles, channels and durations are
   shown in the Media tab. Swap the youtubeId values to publish the group's
   own recordings. Thumbnails are pulled automatically from YouTube.        */
export const SAMPLE_MEDIA = [
  {
    id: 'seed-1',
    title: 'How does the stock market work?',
    tag: 'Onboarding',
    kind: 'Fundamentals',
    duration: 270,
    published: '2026-09-08',
    author: 'TED-Ed',
    platform: 'youtube',
    youtubeId: 'p7HKvqRI_Bo',
    desc: 'The five-minute explainer every new member watches in week one — what a stock actually is, and how the market connects companies to investors.',
  },
  {
    id: 'seed-2',
    title: 'Build a DCF model in Excel',
    tag: 'Workshop',
    kind: 'Workshop',
    duration: 964,
    published: '2026-09-24',
    author: 'Corporate Finance Institute',
    platform: 'youtube',
    youtubeId: 'CfkFFk-r9aA',
    desc: 'Week five of analyst training, step by step: unlevered free cash flow, WACC and terminal value, built live in Excel.',
  },
  {
    id: 'seed-3',
    title: 'How to invest for beginners — index funds explained',
    tag: 'Market Update',
    kind: 'Investing',
    duration: 571,
    published: '2026-10-02',
    author: 'Wise Investor Middle East',
    platform: 'youtube',
    youtubeId: 'EgAoP1uGYfE',
    desc: 'Why low-cost index funds anchor the core sleeve, and the simple framework we teach members for getting started.',
  },
  {
    id: 'seed-4',
    title: 'Breaking into investment banking from a non-target',
    tag: 'Speaker',
    kind: 'Speaker',
    duration: 989,
    published: '2026-10-15',
    author: 'Wall Street Mastermind',
    platform: 'youtube',
    youtubeId: 'V9Bw9AVET78',
    desc: 'A guest-session favourite: what actually matters when recruiting from a non-target, and the mistakes that sink most applicants.',
  },
  {
    id: 'seed-5',
    title: 'Stock pitch competition — 2nd place (full pitch)',
    tag: 'Competition',
    kind: 'Competition',
    duration: 909,
    published: '2026-04-18',
    author: 'Young Investors Society',
    platform: 'youtube',
    youtubeId: '4Wj1y_0n6aU',
    desc: 'A complete student pitch that placed second globally — watch it before you register for ours.',
  },
  {
    id: 'seed-6',
    title: 'How to get into investment banking — full blueprint',
    tag: 'Careers',
    kind: 'Careers',
    duration: 2148,
    published: '2026-02-11',
    author: 'Haaris Zamir, CFA',
    platform: 'youtube',
    youtubeId: 'ukYjkrdpeB4',
    desc: 'The alumni-panel companion: a complete recruiting blueprint, step by step, even without a finance degree.',
  },
];

/* ------------------------------------------------------------ research rail */
export const INSIGHTS = [
  {
    kicker: 'Fund update',
    title: 'What the committee changed this quarter',
    blurb: 'Two exits, one new position, and why we trimmed the alternatives sleeve.',
    read: '6 min',
    tag: 'Market Update',
  },
  {
    kicker: 'Training',
    title: 'Valuation, from first principles',
    blurb: 'The DCF workshop, recorded end to end — free cash flow to terminal value.',
    read: '18 min',
    tag: 'Workshop',
  },
  {
    kicker: 'Careers',
    title: 'Networking without being transactional',
    blurb: 'Five alumni on what actually works when you have no contacts yet.',
    read: '12 min',
    tag: 'Careers',
  },
];
