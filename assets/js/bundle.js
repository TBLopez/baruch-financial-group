/* ------------------------------------------------------------------
   AUTO-GENERATED FILE — do not edit.
   Source: assets/js/*.js   Rebuild: node build.js
   ------------------------------------------------------------------ */
(function () {
'use strict';
var __mods = {};
function __def(name, factory) { __mods[name] = factory(); }
function __req(name) {
  if (!__mods[name]) throw new Error('module not loaded: ' + name);
  return __mods[name];
}
__def("data", function () {
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

const FIRM = {
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
const BRAND = {
  org: 'BARUCH COLLEGE FINANCIAL GROUP',
  orgTitle: 'Baruch College Financial Group',
  contact: 'baruchfinancialgroup@gmail.com · NVC, 55 Lexington Ave',
};

/* Where the student-managed fund is allocated — the "at a glance" band. */
const AUM_BREAKDOWN = [
  { label: 'Equities', value: 1.35, unit: 'M', note: 'Core, dividend and small-cap sleeves' },
  { label: 'Fixed income', value: 620, unit: 'K', note: 'Treasury ladder and short-duration credit' },
  { label: 'Alternatives', value: 430, unit: 'K', note: 'REITs, commodities and a satellite sleeve' },
];

/* --------------------------------------------------------- hero carousel
   Three sections — the front-page carousel the brief asked for.           */
const SLIDES = [
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
  {
    id: 'member',
    eyebrow: 'Section 04 — Member of the Week',
    nav: 'Member',
    navSub: 'This week’s spotlight',
    title: 'Meet <em>Jordan Rivera</em>.',
    lede:
      'Jordan joined as a first-year with no finance background and is now a fund analyst. This term she led the qualifier-winning pitch team, mentored four first-years through analyst training, and wrote the sector note behind the committee’s newest position.',
    ctas: [
      { label: 'Nominate someone', href: 'events.html', style: 'brass' },
      { label: 'See past spotlights', href: 'media.html?tag=Speaker', style: 'ghost-inv' },
    ],
    art: 'art-b',
    member: {
      name: 'Jordan Rivera',
      role: 'Junior · Equity research analyst',
      photo: 'assets/member-jordan.svg',
      points: [
        'Led the qualifier-winning pitch team',
        'Mentors four first-year analysts',
        'Authored the Q3 sector note',
      ],
    },
  },
];

/* ------------------------------------------------------------- resources */
const CATEGORIES = ['Education', 'Investing', 'Competition', 'Careers', 'Outreach'];
const AUDIENCES = ['First-years', 'Sophomores', 'Juniors', 'Seniors', 'All members', 'Non-majors'];

const PROGRAMS = [
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
const SAMPLE_MEDIA = [
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
const INSIGHTS = [
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

/* --------------------------------------------------------- event calendar
   The Events tab. Each entry has an ISO date, a time and a location; the
   "Upcoming / Past" filter is derived from the date, not stored.           */
const EVENT_CATEGORIES = ['Speaker', 'Workshop', 'Competition', 'Recruiting', 'Social', 'Market Update'];

const EVENTS = [
  {
    id: 'analyst-orientation',
    title: 'Analyst training orientation',
    category: 'Workshop',
    date: '2026-09-15',
    time: '7:00pm – 8:30pm',
    location: 'NVC, Room 14-220',
    audience: 'First-years',
    desc: 'The welcome session for the autumn cohort: what the eight weeks look like, how problem sets are marked, and the Bloomberg certification in week six.',
  },
  {
    id: 'fall-mixer',
    title: 'Fall kickoff mixer',
    category: 'Social',
    date: '2026-09-22',
    time: '6:30pm – 8:00pm',
    location: 'NVC, Room 14-220',
    audience: 'All members',
    desc: 'Pizza, a tour of the fund, and sign-ups for the pitch competition and mentorship matching.',
  },
  {
    id: 'dcf-workshop',
    title: 'Workshop: build a DCF from scratch',
    category: 'Workshop',
    date: '2026-09-29',
    time: '7:00pm – 9:00pm',
    location: 'NVC, Room 14-220',
    audience: 'All members',
    desc: 'Week five of analyst training, open to everyone: unlevered free cash flow, WACC and terminal value, built live in Excel.',
  },
  {
    id: 'pitch-deadline',
    title: 'Stock pitch competition — registration closes',
    category: 'Competition',
    date: '2026-10-06',
    time: '11:59pm',
    location: 'Online',
    audience: 'All students',
    desc: 'Last day to register. Teams of up to three, any major, no membership required. $2,500 prize pool.',
  },
  {
    id: 'guest-speaker',
    title: 'Guest speaker: breaking into IB from a non-target',
    category: 'Speaker',
    date: '2026-10-08',
    time: '6:00pm – 7:30pm',
    location: 'Mason Hall, Room 118',
    audience: 'All members',
    desc: 'An alumnus in M&A covers what actually matters when recruiting from a non-target, and the mistakes that sink most applicants.',
  },
  {
    id: 'recruiting-panel',
    title: 'Recruiting timeline panel',
    category: 'Recruiting',
    date: '2026-10-20',
    time: '6:30pm – 8:00pm',
    location: 'NVC, Room 14-220',
    audience: 'Juniors & seniors',
    desc: 'Alumni walk through the 2027 recruiting calendar: applications, networking, superdays and offer timelines.',
  },
  {
    id: 'fund-review',
    title: 'Fund update: what the committee changed this quarter',
    category: 'Market Update',
    date: '2026-11-12',
    time: '7:00pm – 8:00pm',
    location: 'NVC, Room 14-220',
    audience: 'All members',
    desc: 'Two exits, one new position, and why we trimmed the alternatives sleeve — the quarterly review, open to all members.',
  },
];

return { FIRM, BRAND, AUM_BREAKDOWN, SLIDES, CATEGORIES, AUDIENCES, PROGRAMS, SAMPLE_MEDIA, INSIGHTS, EVENT_CATEGORIES, EVENTS };
});

__def("theme-meta", function () {
/* GENERATED by tools/build-themes.mjs — do not edit. */
const THEME_META = [
  {
    "id": "ivory",
    "label": "Ivory & Navy",
    "blurb": "Institutional and calm. Serif headlines, brass accents, soft depth. The safe choice for trustees, faculty and alumni.",
    "mode": "light",
    "swatch": [
      "#F7F5F1",
      "#C08E3C",
      "#04101F"
    ]
  },
  {
    "id": "atlas",
    "label": "Atlas",
    "blurb": "Modern academic. Grotesque headlines, hairline rules, square corners, cobalt accent, dense grid. Reads like a design-forward university.",
    "mode": "light",
    "swatch": [
      "#FFFFFF",
      "#1B4DFF",
      "#08080A"
    ]
  },
  {
    "id": "terrace",
    "label": "Terrace",
    "blurb": "Warm editorial. Cream paper, terracotta and forest, large serif type, flat surfaces and rule lines. Human and literary.",
    "mode": "light",
    "swatch": [
      "#FBF6EC",
      "#B4522F",
      "#13251B"
    ]
  },
  {
    "id": "nightfall",
    "label": "Nightfall",
    "blurb": "Dark and product-like. Mint accent, rounded panels, soft glow. The one students tend to pick.",
    "mode": "dark",
    "swatch": [
      "#0B0F17",
      "#3ED6A4",
      "#05070C"
    ]
  },
  {
    "id": "varsity",
    "label": "Varsity",
    "blurb": "Loud and collegiate. Crimson on charcoal, heavy weights, big radii, chunky shadows. School-spirit energy for recruiting season.",
    "mode": "light",
    "swatch": [
      "#F7F7FA",
      "#C8102E",
      "#0C0C10"
    ]
  }
];

return { THEME_META };
});

__def("site", function () {
/* ==========================================================================
   site.js — shared chrome, helpers, motion
   ========================================================================== */

/* ------------------------------------------------------------------ icons */
const ICONS = {
  play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.14v13.72a1 1 0 0 0 1.53.85l10.72-6.86a1 1 0 0 0 0-1.7L9.53 4.29A1 1 0 0 0 8 5.14Z"/></svg>',
  pause: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4.5" width="4" height="15" rx="1.2"/><rect x="14" y="4.5" width="4" height="15" rx="1.2"/></svg>',
  arrowRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  arrowLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>',
  chevronDown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>',
  download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12M7 11l5 5 5-5M4 20h16"/></svg>',
  film: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M7 4v16M17 4v16M3 12h18M3 8h4M3 16h4M17 8h4M17 16h4"/></svg>',
  expand: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9V4h5M20 15v5h-5M20 9V4h-5M4 15v5h5"/></svg>',
  compress: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4v5H4M15 20v-5h5M15 4v5h5M9 20v-5H4"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M6 3h7l5 5v13H6z"/><path d="M13 3v5h5"/></svg>',
};

/* ---------------------------------------------------------------- helpers */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const fmtTime = (s) => {
  if (!isFinite(s) || s < 0) s = 0;
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = Math.floor(s % 60);
  return h
    ? `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
    : `${m}:${String(sec).padStart(2, '0')}`;
};

const fmtDate = (ts) =>
  new Date(ts).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });

const debounce = (fn, ms = 220) => {
  let t;
  return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); };
};

const prefersReduced = () => {
  try {
    return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches === true;
  } catch {
    return false;
  }
};

/* ----------------------------------------------------------------- toasts */
function toast(title, body = '', kind = 'ok') {
  let host = $('.toasts');
  if (!host) {
    host = document.createElement('div');
    host.className = 'toasts';
    document.body.appendChild(host);
  }
  const ico = kind === 'err' ? ICONS.close : ICONS.check;
  const node = document.createElement('div');
  node.className = `toast ${kind === 'err' ? 'err' : ''}`;
  node.setAttribute('role', 'status');
  node.innerHTML = `${ico}<div><b>${esc(title)}</b>${body ? `<span>${esc(body)}</span>` : ''}</div>`;
  host.appendChild(node);
  setTimeout(() => {
    node.classList.add('out');
    setTimeout(() => node.remove(), 320);
  }, kind === 'err' ? 5200 : 3400);
}

/* ------------------------------------------------------------------ chrome */
const {FIRM} = __req('data');
const NAV = [
  { href: 'index.html', label: 'Home' },
  { href: 'events.html', label: 'Events' },
  { href: 'media.html', label: 'Media' },
  { href: 'resources.html', label: 'Resources' },
];

const LOGO = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 19V7.5L8.5 13 12 6l3.5 7L21 7.5V19"/><path d="M3 19h18"/></svg>`;

function mountChrome(page, { overHero = false } = {}) {
  const links = NAV.map(
    (n) => `<a class="nav-link ${n.href === page ? 'active' : ''}" href="${n.href}">${n.label}</a>`
  ).join('');

  const header = document.createElement('header');
  header.className = `header ${overHero ? 'over-hero' : ''}`;
  header.innerHTML = `
    <div class="wrap header-inner">
      <a class="brand" href="index.html" aria-label="${esc(FIRM.name)} — home">
        <span class="brand-mark">${LOGO}</span>
        <span class="brand-text">
          <span class="brand-name">Baruch College</span>
          <span class="brand-sub">Financial Group</span>
        </span>
      </a>
      <nav class="nav" aria-label="Primary">${links}</nav>
      <div class="header-actions">
        <a class="btn sm ${overHero ? 'ghost-inv' : 'ghost'}" href="resources.html?id=analyst-training">Join the programme</a>
        <button class="burger" aria-label="Menu" aria-expanded="false">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
        </button>
      </div>
    </div>
    <div class="mobile-nav" id="mobileNav">
      ${NAV.map((n) => `<a href="${n.href}" class="${n.href === page ? 'active' : ''}">${n.label}</a>`).join('')}
      <a href="resources.html?id=analyst-training">Join the programme</a>
    </div>`;

  document.body.prepend(header);

  const burger = $('.burger', header);
  const mnav = $('#mobileNav', header);
  burger.addEventListener('click', () => {
    const open = mnav.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(open));
  });

  const onScroll = () => header.classList.toggle('is-stuck', window.scrollY > (overHero ? 40 : 6));
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  renderFooter();
}

function renderFooter() {
  const f = document.createElement('footer');
  f.className = 'footer';
  f.innerHTML = `
    <div class="wrap">
      <div class="footer-grid">
        <div class="footer-about">
          <a class="brand" href="index.html">
            <span class="brand-mark">${LOGO}</span>
            <span class="brand-text"><span class="brand-name">Baruch College</span><span class="brand-sub">Financial Group</span></span>
          </a>
          <p>A student-run financial organisation at ${esc(FIRM.school)}. Open to every major, funded by alumni, and managing a real allocation of the college endowment.</p>
          <div style="margin-top:18px"><span class="poc-flag">Proof of concept — illustrative data only</span></div>
        </div>
        <div><h5>The group</h5><ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="index.html#approach">How we work</a></li>
          <li><a href="resources.html">All programmes</a></li>
          <li><a href="resources.html?id=analyst-training">Join the programme</a></li>
        </ul></div>
        <div><h5>Media</h5><ul>
          <li><a href="media.html">Video library</a></li>
          <li><a href="media.html?tag=Market+Update">Market recaps</a></li>
          <li><a href="media.html?tag=Workshop">Workshop recordings</a></li>
          <li><a href="media.html?tag=Speaker">Guest speakers</a></li>
        </ul></div>
        <div><h5>Contact</h5><ul>
          <li><a href="mailto:baruchfinancialgroup@gmail.com">baruchfinancialgroup@gmail.com</a></li>
          <li><a href="#">Tuesdays 7pm<br>NVC · 55 Lexington Ave</a></li>
          <li><a href="#">@baruchfinance · member portal</a></li>
        </ul></div>
      </div>
      <div class="footer-base">
        <span>© ${new Date().getFullYear()} ${esc(FIRM.name)}. Sample site for evaluation purposes.</span>
        <span>Not investment advice · No member data · Built as a local prototype</span>
      </div>
    </div>`;
  document.body.appendChild(f);
}

/* ------------------------------------------------------------ reveal/anim */
function initReveal(root = document) {
  const items = $$('.reveal', root);
  if (!items.length) return;
  if (prefersReduced()) { items.forEach((i) => i.classList.add('in')); return; }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
  );
  items.forEach((i) => io.observe(i));
}

function countUp(el, to, { dur = 1400, decimals = 0, prefix = '', suffix = '' } = {}) {
  if (prefersReduced()) {
    el.textContent = prefix + to.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
    return;
  }
  const t0 = performance.now();
  const tick = (t) => {
    const p = Math.min(1, (t - t0) / dur);
    const eased = 1 - Math.pow(1 - p, 3);
    const v = to * eased;
    el.textContent = prefix + v.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function initCounters(root = document) {
  const nodes = $$('[data-count]', root);
  if (!nodes.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      countUp(el, parseFloat(el.dataset.count), {
        decimals: parseInt(el.dataset.decimals || '0', 10),
        prefix: el.dataset.prefix || '',
        suffix: el.dataset.suffix || '',
      });
      io.unobserve(el);
    });
  }, { threshold: 0.4 });
  nodes.forEach((n) => io.observe(n));
}

/* --------------------------------------------------------------- generic */
/** Trap-based focus helper for overlays. */
function lockScroll(on) {
  document.body.classList.toggle('no-scroll', on);
}

/** Deterministic gradient poster — fallback for media entries without a YouTube thumbnail. */
function gradientPoster(seed, label = '') {
  let h = 0;
  for (let i = 0; i < String(seed).length; i++) h = (h * 31 + String(seed).charCodeAt(i)) % 360;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 270">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="hsl(${h} 46% 22%)"/>
        <stop offset="1" stop-color="hsl(${(h + 42) % 360} 38% 9%)"/>
      </linearGradient>
    </defs>
    <rect width="480" height="270" fill="url(#g)"/>
    <g fill="none" stroke="rgba(255,255,255,.14)">
      ${Array.from({ length: 7 }, (_, i) => `<circle cx="360" cy="135" r="${28 + i * 30}"/>`).join('')}
    </g>
    <text x="30" y="238" font-family="Georgia,serif" font-size="30" fill="rgba(255,255,255,.30)">${String(label).slice(0, 22)}</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

return { ICONS, $, $$, esc, fmtTime, fmtDate, debounce, prefersReduced, toast, mountChrome, initReveal, countUp, initCounters, lockScroll, gradientPoster };
});

__def("theme", function () {
/* ==========================================================================
   theme.js — the visual-style switcher
   Reads the saved choice, keeps <html data-theme> in sync, and renders a
   floating dock so a reviewer can flip between looks on any page.
   ========================================================================== */

const {$, esc, toast} = __req('site');
const {THEME_META} = __req('theme-meta');
const THEME_KEY = 'bcfg.theme';
const DEFAULT_THEME = THEME_META[0].id;

const isTheme = (id) => THEME_META.some((t) => t.id === id);

function currentTheme() {
  const id = document.documentElement.dataset.theme;
  return isTheme(id) ? id : DEFAULT_THEME;
}

function applyTheme(id, { persist = true, silent = false } = {}) {
  if (!isTheme(id)) return;
  document.documentElement.dataset.theme = id;
  try { if (persist) localStorage.setItem(THEME_KEY, id); } catch { /* ignore */ }

  // keep ?theme= in the URL so a style can be linked or shared
  try {
    const url = new URL(location.href);
    if (url.searchParams.get('theme') !== id) {
      url.searchParams.set('theme', id);
      history.replaceState(null, '', url);
    }
  } catch { /* ignore */ }

  try {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      const hero = getComputedStyle(document.documentElement).getPropertyValue('--hero-base').trim();
      if (hero) meta.setAttribute('content', hero);
    }
  } catch { /* ignore */ }

  document.querySelectorAll('[data-pick]').forEach((el) => {
    const on = el.dataset.pick === id;
    el.setAttribute('aria-checked', String(on));
    el.classList.toggle('is-on', on);
  });

  if (!silent) {
    const meta = THEME_META.find((t) => t.id === id);
    toast(meta.label, 'Style applied across the whole site.');
  }
}

/** Floating swatch dock. */
function mountThemeDock() {
  if ($('.theme-dock')) return;

  const active = currentTheme();
  const dock = document.createElement('div');
  dock.className = 'theme-dock';
  dock.innerHTML = `
    <span class="dock-label">Style</span>
    <div class="dock-swatches" role="radiogroup" aria-label="Visual style">
      ${THEME_META.map((t) => `
        <button class="sw" role="radio" data-pick="${t.id}"
                aria-checked="${t.id === active}" title="${esc(t.label)} — ${esc(t.blurb)}"
                aria-label="${esc(t.label)}">
          <span class="sw-chip" aria-hidden="true"
                style="background:linear-gradient(135deg, ${t.swatch[0]} 0 46%, ${t.swatch[1]} 46% 72%, ${t.swatch[2]} 72% 100%)"></span>
          <span class="sw-name">${esc(t.label.split(' ')[0])}</span>
        </button>`).join('')}
    </div>
    <a class="dock-link" href="themes.html">Compare all</a>`;

  document.body.appendChild(dock);

  dock.addEventListener('click', (e) => {
    const b = e.target.closest('[data-pick]');
    if (!b) return;
    applyTheme(b.dataset.pick);
  });

  // arrow-key navigation inside the radio group
  dock.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const btns = [...dock.querySelectorAll('[data-pick]')];
    const i = btns.indexOf(document.activeElement);
    if (i < 0) return;
    e.preventDefault();
    const next = btns[(i + (e.key === 'ArrowRight' ? 1 : -1) + btns.length) % btns.length];
    next.focus();
    applyTheme(next.dataset.pick);
  });
}

return { currentTheme, applyTheme, mountThemeDock };
});

__def("pdf", function () {
const {BRAND} = __req('data');
/* ==========================================================================
   pdf.js — dependency-free PDF writer
   Produces real, openable PDFs (Helvetica, multi-page, word-wrapped) from
   the program data. No libraries, no network — works from file://.
   ========================================================================== */

const PAGE_W = 612;      // US Letter, points
const PAGE_H = 792;
const M = 56;            // margin
const CONTENT_W = PAGE_W - M * 2;

const INK = [0.078, 0.129, 0.184];
const MUTED = [0.455, 0.518, 0.604];
const BRASS = [0.753, 0.588, 0.353];
const NAVY = [0.027, 0.102, 0.184];
const RULE = [0.86, 0.87, 0.89];

/* ASCII-only sanitiser: PDF strings here are written with WinAnsi literals. */
function ascii(s) {
  return String(s ?? '')
    .replace(/[\u2018\u2019\u201A\u201B]/g, "'")
    .replace(/[\u201C\u201D\u201E]/g, '"')
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/\u2026/g, '...')
    .replace(/[\u00B7\u2022]/g, '*')
    .replace(/\u00A0/g, ' ')
    .replace(/[^\x20-\x7E]/g, '')
    .replace(/\s+/g, ' ');
}

function pdfEscape(s) {
  return s.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

/* Helvetica metric approximation — good enough for wrapping and layout. */
function textWidth(s, size, bold) {
  const k = bold ? 0.552 : 0.505;
  let w = 0;
  for (const ch of s) {
    if ('iljItfr.,;:!|\'`'.includes(ch)) w += size * 0.28;
    else if ('MWmw@'.includes(ch)) w += size * 0.85;
    else if (ch === ' ') w += size * 0.28;
    else w += size * k;
  }
  return w;
}

function wrapText(text, size, bold, maxWidth) {
  const words = ascii(text).split(' ').filter((w) => w.length);
  const lines = [];
  let line = '';
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (textWidth(test, size, bold) <= maxWidth) {
      line = test;
    } else {
      if (line) lines.push(line);
      if (textWidth(word, size, bold) > maxWidth) {
        // hard-break a very long token
        let chunk = '';
        for (const ch of word) {
          if (textWidth(chunk + ch, size, bold) > maxWidth) { lines.push(chunk); chunk = ch; }
          else chunk += ch;
        }
        line = chunk;
      } else {
        line = word;
      }
    }
  }
  if (line) lines.push(line);
  return lines.length ? lines : [''];
}

/**
 * Build a PDF.
 * @param {object} doc
 * @param {string} doc.title
 * @param {string} [doc.subtitle]
 * @param {string} [doc.footer]
 * @param {Array}  doc.blocks  — see BLOCK handling below
 * @returns {Blob}
 */
function buildPdf(doc) {
  const pages = [];
  let ops = [];
  let y = 0;

  const color = (c) => `${c[0]} ${c[1]} ${c[2]} rg`;
  const text = (str, { size = 10.5, bold = false, c = INK, x = M, gap = 0 } = {}) => {
    if (str === '') { y -= size * 0.6; return; }
    ops.push(`BT ${color(c)} /${bold ? 'F2' : 'F1'} ${size} Tf ${x} ${y.toFixed(2)} Td (${pdfEscape(str)}) Tj ET`);
    y -= size * 1.32 + gap;
  };
  const rule = (c = RULE, h = 0.7, gapAfter = 12, x = M, w = CONTENT_W) => {
    ops.push(`${color(c)} ${x} ${(y - h).toFixed(2)} ${w} ${h} re f`);
    y -= h + gapAfter;
  };
  const rect = (x, yy, w, h, c) => ops.push(`${color(c)} ${x} ${yy} ${w} ${h} re f`);

  const startPage = () => {
    ops = [];
    y = PAGE_H - M;
    pages.push(ops);
  };

  const need = (h) => {
    if (y - h < M + 34) startPage();
  };

  /* ---------------------------------------------------------- page 1 head */
  startPage();
  // header band
  rect(0, PAGE_H - 104, PAGE_W, 104, NAVY);
  rect(0, PAGE_H - 108, PAGE_W, 4, BRASS);
  ops.push(`BT ${color([1, 1, 1])} /F2 9 Tf ${M} ${PAGE_H - 46} Td (${pdfEscape(ascii(doc.org || BRAND.org))}) Tj ET`);
  ops.push(`BT ${color(BRASS)} /F1 8 Tf ${M} ${PAGE_H - 60} Td (${pdfEscape(ascii(doc.kicker || 'PROGRAM FACT SHEET'))}) Tj ET`);
  {
    const lines = wrapText(doc.title, 20, true, CONTENT_W);
    let hy = PAGE_H - 84;
    lines.slice(0, 2).forEach((l) => {
      ops.push(`BT ${color([1, 1, 1])} /F2 20 Tf ${M} ${hy} Td (${pdfEscape(l)}) Tj ET`);
      hy -= 23;
    });
  }
  y = PAGE_H - 138;

  if (doc.subtitle) {
    wrapText(doc.subtitle, 11, false, CONTENT_W).forEach((l) => text(l, { size: 11, c: MUTED, gap: 1 }));
    y -= 8;
  }
  if (doc.metaLine) {
    text(doc.metaLine, { size: 8.8, c: MUTED, gap: 6 });
  }
  rule([0.88, 0.89, 0.90], 0.8, 20);

  /* -------------------------------------------------------------- blocks */
  for (const b of doc.blocks || []) {
    switch (b.type) {
      case 'h2': {
        need(56);
        y -= 8;
        text(ascii(b.text).toUpperCase(), { size: 9.2, bold: true, c: BRASS, gap: 3 });
        rule([0.90, 0.91, 0.92], 0.6, 12);
        break;
      }
      case 'p': {
        const lines = wrapText(b.text, 10.5, false, CONTENT_W);
        need(lines.length * 14 + 6);
        lines.forEach((l) => text(l, { size: 10.5, c: INK, gap: 2.6 }));
        y -= 4;
        break;
      }
      case 'bullet': {
        const lines = wrapText(b.text, 10.5, false, CONTENT_W - 16);
        need(lines.length * 14 + 2);
        ops.push(`${color(BRASS)} ${M + 1} ${(y + 1.6).toFixed(2)} 3.4 3.4 re f`);
        lines.forEach((l, i) => text(l, { size: 10.5, c: INK, x: M + 16, gap: i === lines.length - 1 ? 4.4 : 2.6 }));
        break;
      }
      case 'kv': {
        const pairs = b.items || [];
        const rows = [];
        pairs.forEach((p) => {
          const left = wrapText(p.k, 9.6, true, 150);
          const right = wrapText(p.v, 10.5, false, CONTENT_W - 172);
          rows.push({ left, right, h: Math.max(left.length, right.length) * 13.6 + 9 });
        });
        rows.forEach((r) => {
          need(r.h + 4);
          const top = y;
          r.left.forEach((l, i) => {
            ops.push(`BT ${color(MUTED)} /F2 9.6 Tf ${M} ${(top - i * 13.6).toFixed(2)} Td (${pdfEscape(l)}) Tj ET`);
          });
          r.right.forEach((l, i) => {
            ops.push(`BT ${color(INK)} /F1 10.5 Tf ${M + 172} ${(top - i * 13.6).toFixed(2)} Td (${pdfEscape(l)}) Tj ET`);
          });
          y = top - r.h;
          rule([0.93, 0.935, 0.94], 0.5, 6);
        });
        y -= 4;
        break;
      }
      case 'table': {
        const cols = b.columns || [];
        const widths = b.widths || cols.map(() => CONTENT_W / cols.length);
        need(24);
        let x = M;
        cols.forEach((c, i) => {
          ops.push(`BT ${color(MUTED)} /F2 8.6 Tf ${x} ${y.toFixed(2)} Td (${pdfEscape(ascii(c).toUpperCase())}) Tj ET`);
          x += widths[i];
        });
        y -= 6;
        rule([0.85, 0.86, 0.88], 0.7, 10);
        (b.rows || []).forEach((row) => {
          const cells = row.map((cell, i) => wrapText(cell, 10, false, widths[i] - 10));
          const h = Math.max(...cells.map((c) => c.length)) * 13.4 + 9;
          need(h);
          const top = y;
          x = M;
          cells.forEach((lines, i) => {
            lines.forEach((l, j) => {
              ops.push(`BT ${color(INK)} /F1 10 Tf ${x} ${(top - j * 13.4).toFixed(2)} Td (${pdfEscape(l)}) Tj ET`);
            });
            x += widths[i];
          });
          y = top - h;
          rule([0.92, 0.925, 0.93], 0.5, 0);
        });
        y -= 6;
        break;
      }
      case 'space':
        y -= b.h || 12;
        break;
      case 'note': {
        const lines = wrapText(b.text, 9.4, false, CONTENT_W - 24);
        const h = lines.length * 12.6 + 20;
        need(h);
        rect(M, y - h + 10, CONTENT_W, h, [0.972, 0.953, 0.902]);
        ops.push(`${color(BRASS)} ${M} ${(y - h + 10).toFixed(2)} 2.6 ${h.toFixed(2)} re f`);
        let ny = y - 2;
        lines.forEach((l) => {
          ops.push(`BT ${color([0.42, 0.32, 0.13])} /F1 9.4 Tf ${M + 14} ${ny.toFixed(2)} Td (${pdfEscape(l)}) Tj ET`);
          ny -= 12.6;
        });
        y = y - h - 4;
        break;
      }
      default:
        break;
    }
  }

  /* ------------------------------------------------------------ footers */
  const total = pages.length; // used for the “Page n of m” footer
  pages.forEach((pageOps, i) => {
    const foot = `${ascii(doc.footer || 'Illustrative sample content - not investment advice.')}`;
    pageOps.push(`BT ${color(MUTED)} /F1 7.6 Tf ${M} 42 Td (${pdfEscape(foot)}) Tj ET`);
    const pn = `Page ${i + 1} of ${total}`;
    const w = textWidth(pn, 7.6, false);
    pageOps.push(`BT ${color(MUTED)} /F1 7.6 Tf ${(PAGE_W - M - w).toFixed(2)} 42 Td (${pdfEscape(pn)}) Tj ET`);
    pageOps.push(`${color([0.88, 0.89, 0.90])} ${M} 54 ${CONTENT_W} 0.6 re f`);
    pageOps.push(`${color(NAVY)} ${M} 54 46 2 re f`);
    pageOps.push(`${color(BRASS)} ${M + 46} 54 ${(CONTENT_W - 46).toFixed(2)} 2 re f`);
  });

  /* ------------------------------------------------------ object assembly */
  const pageCount = pages.length;
  const F1 = 3, F2 = 4, firstPage = 5;
  const objs = [];
  objs[1] = `<< /Type /Catalog /Pages 2 0 R >>`;
  const kids = pages.map((_, i) => `${firstPage + i * 2} 0 R`).join(' ');
  objs[2] = `<< /Type /Pages /Kids [${kids}] /Count ${pageCount} >>`;
  objs[F1] = `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>`;
  objs[F2] = `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>`;

  pages.forEach((pageOps, i) => {
    const pn = firstPage + i * 2;
    const cn = pn + 1;
    const stream = pageOps.join('\n');
    objs[pn] =
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] ` +
      `/Resources << /Font << /F1 ${F1} 0 R /F2 ${F2} 0 R >> >> /Contents ${cn} 0 R >>`;
    objs[cn] = `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`;
  });

  // Info dictionary is object N+1, written in the same pass so the xref stays valid.
  const infoNum = objs.length;
  objs[infoNum] = `<< /Title (${pdfEscape(ascii(doc.title))}) /Producer (Baruch College Financial Group prototype) >>`;
  const objCount = objs.length; // objects are numbered 1 .. objCount-1

  let out = `%PDF-1.4\n%\xE2\xE3\xCF\xD3\n`;
  const offsets = [];
  for (let i = 1; i < objCount; i++) {
    offsets[i] = out.length;
    out += `${i} 0 obj\n${objs[i]}\nendobj\n`;
  }
  const xrefStart = out.length;
  let xref = `xref\n0 ${objCount}\n0000000000 65535 f \n`;
  for (let i = 1; i < objCount; i++) {
    xref += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
  }
  out += `${xref}trailer\n<< /Size ${objCount} /Root 1 0 R /Info ${infoNum} 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`;

  const bytes = new Uint8Array(out.length);
  for (let i = 0; i < out.length; i++) bytes[i] = out.charCodeAt(i) & 0xff;
  return new Blob([bytes], { type: 'application/pdf' });
}

/* ------------------------------------------------------- fact-sheet build */
function programFactSheet(program, org = BRAND.org) {
  const blocks = [
    { type: 'p', text: program.summary },
    { type: 'h2', text: 'At a glance' },
    {
      type: 'kv',
      items: [
        { k: 'Program category', v: program.category },
        { k: 'Designed for', v: program.audience },
        { k: 'Enrolment status', v: program.status },
        { k: 'Fee structure', v: program.fee },
        { k: 'Minimum', v: program.minimum },
        { k: 'Typical horizon', v: program.horizon },
      ],
    },
    { type: 'h2', text: 'What the programme covers' },
    ...program.highlights.map((h) => ({ type: 'bullet', text: h })),
    { type: 'h2', text: 'Delivery schedule' },
    { type: 'table', columns: ['Stage', 'What happens'], widths: [110, CONTENT_W - 110], rows: program.timeline.map((t) => [t.when, t.what]) },
    { type: 'h2', text: 'Frequently asked' },
    ...program.faqs.flatMap((f) => [
      { type: 'p', text: f.q },
      { type: 'p', text: f.a },
    ]),
    { type: 'space', h: 6 },
    {
      type: 'note',
      text:
        'Illustrative prototype content generated for evaluation only. Figures, fees and schedules are sample data and do not constitute an offer, advice, or a solicitation.',
    },
  ];

  return buildPdf({
    org,
    kicker: 'PROGRAM FACT SHEET',
    title: program.title,
    subtitle: `${program.category} · ${program.audience}`,
    metaLine: `Generated ${new Date().toLocaleString()}  ·  Reference ${program.id.toUpperCase()}`,
    footer: `${org}  ·  ${BRAND.contact}`,
    blocks,
  });
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

/* --------------------------------------------------- lightweight XLS/CSV */
function buildCsv(rows, filename = 'export.csv') {
  const csv = rows
    .map((r) => r.map((c) => `"${String(c ?? '').replace(/"/g, '""')}"`).join(','))
    .join('\r\n');
  return new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' });
}

return { buildPdf, programFactSheet, downloadBlob, buildCsv };
});

__def("home", function () {
/* ==========================================================================
   home.js — front-page carousel (3 sections), AUM band, insights rail
   ========================================================================== */

const {ICONS, $, $$, esc, prefersReduced, initReveal, initCounters, countUp, mountChrome} = __req('site');
const {SLIDES, AUM_BREAKDOWN, FIRM, INSIGHTS, PROGRAMS} = __req('data');
const {mountThemeDock} = __req('theme');
const DURATION = 8500; // ms per slide

/* ------------------------------------------------------------ hero markup */
function heroMarkup() {
  const slides = SLIDES.map((s, i) => `
    <div class="hero-slide ${i === 0 ? 'is-active' : ''}" data-slide="${i}" role="group"
         aria-roledescription="slide" aria-label="${esc(s.nav)} — slide ${i + 1} of ${SLIDES.length}"
         ${i === 0 ? '' : 'aria-hidden="true"'}>
      <div class="hero-art ${s.art}">
        <div class="art-layer art-grid"></div>
        <div class="art-layer">
          <svg class="art-rings" viewBox="0 0 600 600" aria-hidden="true">
            ${Array.from({ length: 9 }, (_, k) =>
              `<circle cx="300" cy="300" r="${52 + k * 30}" stroke-opacity="${(0.55 - k * 0.05).toFixed(2)}"/>`).join('')}
          </svg>
        </div>
      </div>
    </div>`).join('');

  const copies = SLIDES.map((s, i) => `
    <div class="hero-slide ${i === 0 ? 'is-active' : ''}" data-copy="${i}">
      <div class="hero-inner">
        <div class="hero-copy">
          <p class="eyebrow on-dark h-anim">${esc(s.eyebrow)}</p>
          <h1 class="h-anim">${s.title}</h1>
          <p class="hero-lede h-anim">${esc(s.lede)}</p>
          <div class="hero-cta h-anim">
            ${s.ctas.map((c) => `<a class="btn ${c.style}" href="${c.href}">${esc(c.label)}${ICONS.arrowRight}</a>`).join('')}
          </div>
        </div>
        ${slideAside(s)}
      </div>
    </div>`).join('');

  const tabs = SLIDES.map((s, i) => `
    <button class="hero-tab ${i === 0 ? 'is-active' : ''}" data-tab="${i}" role="tab"
            aria-selected="${i === 0}" aria-controls="slide-${i}">
      <span class="hero-tab-num">0${i + 1}</span>
      <span class="hero-tab-label">${esc(s.nav)}</span>
      <span class="hero-tab-sub">${esc(s.navSub)}</span>
      <span class="bar" aria-hidden="true"><i></i></span>
    </button>`).join('');

  return `
    <div class="hero-slides" aria-hidden="true">${slides}</div>
    <div class="hero-copies">${copies}</div>
    <div class="hero-tabs">
      <div class="hero-tabs-inner">
        <div style="display:contents" role="tablist" aria-label="Homepage sections">${tabs}</div>
        <div class="hero-nav">
          <button class="hero-arrow" data-dir="-1" aria-label="Previous section">${ICONS.arrowLeft}</button>
          <button class="hero-arrow" data-dir="1" aria-label="Next section">${ICONS.arrowRight}</button>
          <button class="hero-toggle" data-toggle aria-label="Pause carousel">${ICONS.pause}</button>
        </div>
      </div>
    </div>`;
}

/* Right-hand hero panel: the "at a glance" figures, or — for the Member of
   the Week slide — a photo card with a short list of what they have done. */
function slideAside(s) {
  if (s.member) {
    return `
    <aside class="hero-card hero-member" aria-label="Member of the week">
      <div class="member-photo"><img src="${esc(s.member.photo)}" alt="Portrait of ${esc(s.member.name)}" loading="lazy"></div>
      <div class="member-body">
        <p class="hero-card-title">Member of the week</p>
        <h3 class="member-name">${esc(s.member.name)}</h3>
        <p class="member-role">${esc(s.member.role)}</p>
        <ul class="member-points">
          ${s.member.points.map((p) => `<li>${ICONS.check}<span>${esc(p)}</span></li>`).join('')}
        </ul>
      </div>
    </aside>`;
  }
  return `
    <aside class="hero-card" aria-label="${esc(s.nav)} key figures">
      <p class="hero-card-title">${esc(s.nav)} — at a glance</p>
      <div class="kpis">
        ${s.cards.map((k) => `
          <div class="kpi">
            <span class="kpi-label">${esc(k.label)}</span>
            <span class="kpi-val" data-val="${esc(k.value)}" data-suffix="${esc(k.suffix)}">0${esc(k.suffix)}</span>
          </div>`).join('')}
      </div>
      <p class="hero-card-foot">${esc(s.cardFoot)}</p>
    </aside>`;
}

/* -------------------------------------------------------------- carousel */
function initCarousel(root) {
  const artSlides = $$('.hero-slide[data-slide]', root);
  const copySlides = $$('.hero-slide[data-copy]', root);
  const tabs = $$('.hero-tab', root);
  const toggle = $('[data-toggle]', root);
  const progressWrap = root;

  let index = 0;
  let playing = !prefersReduced();
  let timer = null;
  let visible = true;

  const animateValues = (i) => {
    $$('.kpi-val', copySlides[i]).forEach((el) => {
      const raw = el.dataset.val;
      const suffix = el.dataset.suffix || '';
      const num = parseFloat(String(raw).replace(/,/g, ''));
      if (isNaN(num)) { el.textContent = raw + suffix; return; }
      const decimals = (String(raw).split('.')[1] || '').length;
      countUp(el, num, { dur: 1100, decimals, suffix });
    });
  };

  const restartBar = () => {
    root.classList.remove('is-running');
    void root.offsetWidth; // force reflow so the CSS animation replays
    if (playing) root.classList.add('is-running');
  };

  function go(next, { user = false } = {}) {
    const n = (next + SLIDES.length) % SLIDES.length;
    if (n === index && user) restartBar();
    artSlides.forEach((el, i) => {
      const on = i === n;
      el.classList.toggle('is-active', on);
      el.setAttribute('aria-hidden', String(!on));
    });
    copySlides.forEach((el, i) => el.classList.toggle('is-active', i === n));
    tabs.forEach((el, i) => {
      const on = i === n;
      el.classList.toggle('is-active', on);
      el.setAttribute('aria-selected', String(on));
    });
    index = n;
    animateValues(n);
    restartBar();
    schedule();
  }

  function schedule() {
    clearTimeout(timer);
    if (!playing || !visible) return;
    timer = setTimeout(() => go(index + 1), DURATION + 60);
  }

  root.style.setProperty('--slide-duration', `${DURATION}ms`);

  tabs.forEach((t) =>
    t.addEventListener('click', () => { go(Number(t.dataset.tab), { user: true }); }
  ));
  $$('[data-dir]', root).forEach((b) =>
    b.addEventListener('click', () => go(index + Number(b.dataset.dir), { user: true }))
  );

  toggle?.addEventListener('click', () => {
    playing = !playing;
    root.classList.toggle('is-paused', !playing);
    toggle.innerHTML = playing ? ICONS.pause : ICONS.play;
    toggle.setAttribute('aria-label', playing ? 'Pause carousel' : 'Play carousel');
    if (playing) { restartBar(); schedule(); }
    else { clearTimeout(timer); root.classList.remove('is-running'); }
  });

  // pause on hover (mouse only — touch pointers fire enter/leave on tap)
  root.addEventListener('pointerenter', (e) => {
    if (e.pointerType !== 'mouse') return;
    root.classList.add('is-paused');
    clearTimeout(timer);
  });
  root.addEventListener('pointerleave', (e) => {
    if (e.pointerType !== 'mouse') return;
    root.classList.remove('is-paused');
    if (playing) { restartBar(); schedule(); }
  });

  // pause while the hero is off-screen or the tab is hidden
  const section = root.closest('.hero');
  if ('IntersectionObserver' in window && section) {
    new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (!visible) { clearTimeout(timer); root.classList.remove('is-running'); }
      else if (playing) { restartBar(); schedule(); }
    }, { threshold: 0.2 }).observe(section);
  }
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { clearTimeout(timer); root.classList.remove('is-running'); }
    else if (playing) { restartBar(); schedule(); }
  });

  // keyboard
  document.addEventListener('keydown', (e) => {
    if (document.querySelector('.player-overlay.open')) return;
    const tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
    if (e.key === 'ArrowRight') go(index + 1, { user: true });
    if (e.key === 'ArrowLeft') go(index - 1, { user: true });
  });

  // touch swipe
  let sx = 0, sy = 0, tracking = false;
  root.addEventListener('touchstart', (e) => {
    const t = e.changedTouches[0];
    sx = t.clientX; sy = t.clientY; tracking = true;
  }, { passive: true });
  root.addEventListener('touchend', (e) => {
    if (!tracking) return;
    tracking = false;
    const t = e.changedTouches[0];
    const dx = t.clientX - sx, dy = t.clientY - sy;
    if (Math.abs(dx) > 46 && Math.abs(dx) > Math.abs(dy)) go(index + (dx < 0 ? 1 : -1), { user: true });
  }, { passive: true });

  animateValues(0);
  restartBar();
  schedule();
}

/* ------------------------------------------------------------- sections */
function renderAumBand() {
  const host = $('#aumBand');
  if (!host) return;
  host.innerHTML = `
    <div class="wrap">
      <div class="stat-band reveal">
        <div class="stat-cell">
          <div class="count">$<span data-count="${FIRM.fund}" data-decimals="1">0</span><span class="suffix">M</span></div>
          <div class="lbl">Student-managed fund<br><span class="tiny">Allocation from the ${esc(FIRM.school)} endowment · ${esc(FIRM.fundAsOf)}</span></div>
        </div>
        ${AUM_BREAKDOWN.map((a) => `
          <div class="stat-cell">
            <div class="count">$${a.unit === 'K' ? '<span data-count="' + a.value + '">0</span>' : '<span data-count="' + a.value + '" data-decimals="1">0</span>'}<span class="suffix">${a.unit}</span></div>
            <div class="lbl">${esc(a.label)}<br><span class="tiny">${esc(a.note)}</span></div>
          </div>`).join('')}
      </div>
    </div>`;
}

function renderInsights() {
  const host = $('#insightRail');
  if (!host) return;
  host.innerHTML = INSIGHTS.map((it, i) => `
    <a class="card hoverable card-pad reveal d${i + 1}" href="media.html?tag=${encodeURIComponent(it.tag)}">
      <span class="pill">${esc(it.kicker)}</span>
      <h3 style="margin-top:16px">${esc(it.title)}</h3>
      <p>${esc(it.blurb)}</p>
      <div class="v-meta" style="margin-top:18px">
        ${ICONS.film}<span>Recording · ${esc(it.read)}</span>
      </div>
      <div style="margin-top:16px" class="link-arrow">Open in media library ${ICONS.arrowRight}</div>
    </a>`).join('');
}

function renderFeaturedPrograms() {
  const host = $('#featuredPrograms');
  if (!host) return;
  const list = PROGRAMS.filter((p) => p.featured).slice(0, 3);
  host.innerHTML = list.map((p, i) => `
    <a class="card hoverable card-pad reveal d${i + 1}" href="resources.html?id=${encodeURIComponent(p.id)}">
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <span class="pill ${p.status === 'Open' ? 'ok' : 'warn'}"><span class="dot"></span>${esc(p.status)}</span>
        <span class="pill slate">${esc(p.category)}</span>
      </div>
      <h3 style="margin-top:16px">${esc(p.title)}</h3>
      <p>${esc(p.summary)}</p>
      <div class="meta-row" style="display:flex;gap:8px;flex-wrap:wrap;margin-top:18px">
        <span class="meta-item"><span class="k">Fee</span><span class="v">${esc(p.fee)}</span></span>
        <span class="meta-item"><span class="k">Minimum</span><span class="v">${esc(p.minimum)}</span></span>
      </div>
      <div style="margin-top:18px" class="link-arrow">Programme detail ${ICONS.arrowRight}</div>
    </a>`).join('');
}

/* ------------------------------------------------------------------- boot */
function bootHome() {
  mountChrome('index.html', { overHero: true });
  mountThemeDock();
  const hero = $('#heroCarousel');
  if (hero) {
    hero.className = 'hero';
    hero.innerHTML = heroMarkup();
    initCarousel(hero);
  }
  renderAumBand();
  renderInsights();
  renderFeaturedPrograms();
  initReveal();
  initCounters();
}

if (document.body.dataset.page === 'home') bootHome();

return { bootHome };
});

__def("media", function () {
/* ==========================================================================
   media.js — Media tab (curated, read-only)
   A library of recorded sessions (YouTube embeds) with search, tag filters,
   sort, and an inline player + playlist. There is no upload: this is the
   group's own published library, not a place for visitors to add files.
   ========================================================================== */

const {ICONS, $, esc, fmtTime, fmtDate, debounce, initReveal, lockScroll, gradientPoster, mountChrome} = __req('site');
const {mountThemeDock} = __req('theme');
const {SAMPLE_MEDIA} = __req('data');
/* ================================================================ state == */
const ALL = 'All';
const state = { filtered: [], query: '', tag: 'All', sort: 'newest' };

/* ------------------------------------------------------------ media utils */
const ytThumb = (id) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
const isYouTube = (m) => !!(m && m.platform === 'youtube' && m.youtubeId);
/* Thumbnail for a media card: YouTube gets its CDN image; anything else
   falls back to a provided `thumb`, then to a generated gradient poster. */
function thumbFor(m) {
  if (isYouTube(m)) return ytThumb(m.youtubeId);
  if (m.thumb) return m.thumb;
  return gradientPoster(m.title, m.kind || '');
}

/* The whole catalogue is the seeded set from data.js — nothing is added at
   runtime, so the library is identical for every visitor. */
function library() {
  return SAMPLE_MEDIA.map((s) => ({
    ...s,
    ts: new Date(s.published || Date.now()).getTime(),
  }));
}

function applyFilters() {
  const q = state.query.trim().toLowerCase();
  const list = library().filter((m) => {
    if (state.tag !== ALL && m.tag !== state.tag) return false;
    if (!q) return true;
    return `${m.title} ${m.desc || ''} ${m.tag} ${m.author || ''} ${m.kind || ''}`
      .toLowerCase().includes(q);
  });

  const by = {
    newest: (a, b) => b.ts - a.ts,
    oldest: (a, b) => a.ts - b.ts,
    title: (a, b) => a.title.localeCompare(b.title),
    longest: (a, b) => (b.duration || 0) - (a.duration || 0),
    shortest: (a, b) => (a.duration || 0) - (b.duration || 0),
  };
  list.sort(by[state.sort] || by.newest);
  state.filtered = list;
}

function tags() {
  const set = new Set(library().map((m) => m.tag).filter(Boolean));
  return [ALL, ...[...set].sort()];
}

/* ============================================================== rendering */
function renderChips() {
  const host = $('#tagChips');
  if (!host) return;
  host.innerHTML = tags()
    .map((t) => `<button class="chip ${t === state.tag ? 'is-on' : ''}" data-tag="${esc(t)}">${esc(t)}</button>`)
    .join('');
}

function cardHtml(m, i) {
  const poster = thumbFor(m);
  const when = m.published ? fmtDate(new Date(m.published).getTime()) : '';
  return `
    <article class="v-card" style="animation-delay:${Math.min(i * 45, 320)}ms">
      <button class="v-thumb" data-play="${esc(m.id)}" aria-label="Play ${esc(m.title)}">
        <img src="${esc(poster)}" alt="" loading="lazy" onerror="this.style.display='none'">
        <span class="fallback" aria-hidden="true">${esc((m.kind || 'M')[0])}</span>
        <span class="scrim"></span>
        <span class="v-badge yt">YouTube</span>
        <span class="v-dur">${m.duration ? fmtTime(m.duration) : '—:—'}</span>
        <span class="v-play"><span class="ring">${ICONS.play}</span></span>
      </button>
      <div class="v-body">
        <h3>${esc(m.title)}</h3>
        <div class="v-meta">
          <span class="pill slate">${esc(m.tag || 'General')}</span>
          ${when ? `<span>${esc(when)}</span>` : ''}
          ${m.author ? `<span>· ${esc(m.author)}</span>` : ''}
        </div>
        <p class="v-desc">${esc(m.desc || 'No description provided.')}</p>
      </div>
    </article>`;
}

function renderGrid() {
  const host = $('#mediaGrid');
  const countLbl = $('#mediaCount');
  if (!host) return;
  applyFilters();
  if (countLbl) countLbl.textContent = `${state.filtered.length} session${state.filtered.length === 1 ? '' : 's'}`;

  if (!state.filtered.length) {
    host.innerHTML = `
      <div class="empty">
        <h3>No sessions match that filter</h3>
        <p>Try clearing the search box or choosing another tag.</p>
      </div>`;
    return;
  }
  host.innerHTML = state.filtered.map(cardHtml).join('');
}

/* ================================================================= player ==
   YouTube-only: the stage is a YouTube iframe; the custom scrub/controls are
   not needed because YouTube supplies its own player chrome.               */
const player = { el: null, list: [], index: 0 };

function ensurePlayer() {
  if (player.el) return player.el;

  const el = document.createElement('div');
  el.className = 'player-overlay';
  el.innerHTML = `
    <div class="player-shell" role="dialog" aria-modal="true" aria-label="Video player">
      <div class="player-main">
        <div class="player-stage">
          <iframe class="yt-frame" title="YouTube player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen></iframe>
        </div>
        <div class="player-titlebar">
          <div style="min-width:0">
            <h2 data-t>—</h2>
            <div class="v-meta" data-m></div>
          </div>
          <div style="margin-left:auto;display:flex;align-items:center;gap:10px;flex:none">
            <a class="btn sm ghost-inv" data-watch target="_blank" rel="noopener">Watch on YouTube
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M9 7h8v8"/></svg>
            </a>
            <button class="pbtn" data-a="full" title="Fullscreen (F)" aria-label="Fullscreen">${ICONS.expand}</button>
            <button class="pbtn" data-a="close" title="Close (Esc)" aria-label="Close">${ICONS.close}</button>
          </div>
        </div>
      </div>
      <aside class="player-side">
        <header><h3>Up next</h3><span data-upnext>0</span></header>
        <div class="playlist"></div>
      </aside>
    </div>`;
  document.body.appendChild(el);
  player.el = el;
  wirePlayer();
  return el;
}

function wirePlayer() {
  const el = player.el;

  el.addEventListener('click', (e) => {
    const a = e.target.closest('[data-a]');
    if (a) {
      if (a.dataset.a === 'close') closePlayer();
      else if (a.dataset.a === 'full') toggleFull();
      return;
    }
    if (e.target.closest('.pl-item')) {
      load(Number(e.target.closest('.pl-item').dataset.i), true);
    }
  });

  document.addEventListener('fullscreenchange', () => {
    $('[data-a="full"]', el).innerHTML = document.fullscreenElement ? ICONS.compress : ICONS.expand;
  });

  document.addEventListener('keydown', (e) => {
    if (!el.classList.contains('open')) return;
    if (e.key === 'Escape') { if (!document.fullscreenElement) closePlayer(); return; }
    if (e.key === 'ArrowRight') load((player.index + 1) % player.list.length, true);
    if (e.key === 'ArrowLeft') load((player.index - 1 + player.list.length) % player.list.length, true);
  });
}

const noop = () => {};

function toggleFull() {
  const el = player.el;
  if (!document.fullscreenElement) {
    (el.requestFullscreen?.() || el.webkitRequestFullscreen?.())?.catch?.(noop);
  } else {
    document.exitFullscreen?.();
  }
}

function load(i, autoplay = false) {
  player.index = i;
  const m = player.list[i];
  if (!m) return;

  const yt = $('.yt-frame', player.el);
  yt.src = `https://www.youtube-nocookie.com/embed/${m.youtubeId}?autoplay=${autoplay ? 1 : 0}&rel=0&modestbranding=1&playsinline=1`;

  $('[data-t]', player.el).textContent = m.title;
  $('[data-m]', player.el).innerHTML = [
    '<span class="pill ok"><span class="dot"></span>YouTube</span>',
    `<span>${esc(m.tag || 'General')}</span>`,
    m.duration ? `<span>· ${fmtTime(m.duration)}</span>` : '',
    m.published ? `<span>· ${esc(fmtDate(new Date(m.published).getTime()))}</span>` : '',
    m.author ? `<span>· ${esc(m.author)}</span>` : '',
  ].join(' ');

  const watch = $('[data-watch]', player.el);
  if (watch) watch.href = `https://www.youtube.com/watch?v=${m.youtubeId}`;

  paintPlaylist();
}

function paintPlaylist() {
  const host = $('.playlist', player.el);
  if (!host) return;
  $('[data-upnext]', player.el).textContent = `${player.list.length} session${player.list.length === 1 ? '' : 's'}`;
  host.innerHTML = player.list.map((m, i) => `
    <button class="pl-item ${i === player.index ? 'is-current' : ''}" data-i="${i}">
      <span class="pt">
        <img src="${esc(thumbFor(m))}" alt="" loading="lazy" onerror="this.style.display='none'">
        <span class="fallback" aria-hidden="true">${esc((m.kind || 'M')[0])}</span>
      </span>
      <span style="min-width:0">
        <h4>${esc(m.title)}</h4>
        <span class="s">${m.duration ? fmtTime(m.duration) : '—'} · ${esc(m.tag || 'General')}</span>
      </span>
    </button>`).join('');
  const cur = host.querySelector('.is-current');
  cur?.scrollIntoView?.({ block: 'nearest' });
}

function openPlayer(id) {
  ensurePlayer();
  player.list = state.filtered.length ? state.filtered : library();
  const i = Math.max(0, player.list.findIndex((m) => m.id === id));
  player.el.classList.add('open');
  lockScroll(true);
  load(i, true);
}

function closePlayer() {
  if (!player.el) return;
  const yt = $('.yt-frame', player.el);
  if (yt) yt.removeAttribute('src');
  player.el.classList.remove('open');
  lockScroll(false);
}

/* ================================================================= wiring */
function wire() {
  $('#mediaSearch')?.addEventListener('input', debounce((e) => {
    state.query = e.target.value;
    renderGrid();
  }, 180));

  $('#tagChips')?.addEventListener('click', (e) => {
    const b = e.target.closest('[data-tag]');
    if (!b) return;
    state.tag = b.dataset.tag;
    renderChips();
    renderGrid();
  });

  $('#sortBy')?.addEventListener('change', (e) => { state.sort = e.target.value; renderGrid(); });

  $('#mediaGrid')?.addEventListener('click', (e) => {
    const play = e.target.closest('[data-play]');
    if (play) openPlayer(play.dataset.play);
  });
}

/* =================================================================== boot */
function bootMedia() {
  mountChrome('media.html');
  mountThemeDock();

  const params = new URLSearchParams(location.search);
  if (params.get('tag')) state.tag = params.get('tag');
  if (params.get('q')) {
    state.query = params.get('q');
    const s = $('#mediaSearch');
    if (s) s.value = state.query;
  }

  renderChips();
  renderGrid();
  wire();
  initReveal();
}

if (document.body.dataset.page === 'media') bootMedia();

return { bootMedia };
});

__def("resources", function () {
/* ==========================================================================
   resources.js — Resources tab / program catalogue
   · Faceted filtering (category, audience, status) + search + sort
   · Expandable program detail: highlights, delivery schedule, documents, FAQ
   · Document downloads are GENERATED in the browser (real PDF / CSV / DOC)
   ========================================================================== */

const {ICONS, $, esc, debounce, toast, initReveal, lockScroll, mountChrome} = __req('site');
const {mountThemeDock} = __req('theme');
const {PROGRAMS, CATEGORIES, AUDIENCES, BRAND} = __req('data');
const {buildPdf, buildCsv, downloadBlob, programFactSheet} = __req('pdf');
const state = {
  q: '',
  cat: 'All',
  aud: 'All',
  status: 'All',
  sort: 'featured',
  open: new Set(),
};

const STATUSES = ['Open', 'Enrolling', 'Pilot'];

/* ------------------------------------------------------------- filtering */
function match(p) {
  if (state.cat !== 'All' && p.category !== state.cat) return false;
  if (state.aud !== 'All' && p.audience !== state.aud) return false;
  if (state.status !== 'All' && p.status !== state.status) return false;
  if (!state.q) return true;
  const q = state.q.toLowerCase();
  const hay = [
    p.title, p.summary, p.category, p.audience, p.status, p.fee, p.minimum, p.horizon,
    ...p.highlights, ...p.faqs.flatMap((f) => [f.q, f.a]),
    ...p.documents.map((d) => d.name),
  ].join(' ').toLowerCase();
  return hay.includes(q);
}

function currentList() {
  const list = PROGRAMS.filter(match);
  const sorters = {
    featured: (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || a.title.localeCompare(b.title),
    title: (a, b) => a.title.localeCompare(b.title),
    fee: (a, b) => a.fee.localeCompare(b.fee),
    status: (a, b) => STATUSES.indexOf(a.status) - STATUSES.indexOf(b.status) || a.title.localeCompare(b.title),
  };
  return list.sort(sorters[state.sort] || sorters.featured);
}

const countBy = (key, value) => PROGRAMS.filter((p) => p[key] === value).length;

/* -------------------------------------------------------------- rail UI */
function renderRail() {
  const catHost = $('#catList');
  const audHost = $('#audList');
  const statusHost = $('#statusList');
  if (!catHost) return;

  const item = (key, value, count, isOn) => `
    <button class="rail-item ${isOn ? 'is-on' : ''}" data-${key}="${esc(value)}"
            aria-pressed="${isOn}">
      <span>${esc(value)}</span><span class="n">${count}</span>
    </button>`;

  catHost.innerHTML =
    item('cat', 'All', PROGRAMS.length, state.cat === 'All') +
    CATEGORIES.map((c) => item('cat', c, countBy('category', c), state.cat === c)).join('');

  audHost.innerHTML =
    item('aud', 'All', PROGRAMS.length, state.aud === 'All') +
    AUDIENCES.map((a) => item('aud', a, countBy('audience', a), state.aud === a)).join('');

  statusHost.innerHTML =
    item('status', 'All', PROGRAMS.length, state.status === 'All') +
    STATUSES.map((s) => item('status', s, countBy('status', s), state.status === s)).join('');
}

/* ------------------------------------------------------------ program UI */
const statusPill = (s) =>
  `<span class="pill ${s === 'Open' ? 'ok' : s === 'Enrolling' ? 'warn' : 'slate'}"><span class="dot"></span>${esc(s)}</span>`;

function faqHtml(p) {
  return p.faqs.map((f, i) => `
    <div class="faq-item" data-faq="${i}">
      <button class="faq-q" aria-expanded="false">${esc(f.q)}${ICONS.plus}</button>
      <div class="faq-a"><div><p>${esc(f.a)}</p></div></div>
    </div>`).join('');
}

function programHtml(p) {
  const open = state.open.has(p.id);
  return `
    <article class="program ${open ? 'open' : ''}" data-pid="${esc(p.id)}" id="program-${esc(p.id)}">
      <button class="program-main" data-toggle-p="${esc(p.id)}" aria-expanded="${open}">
        <div style="min-width:0">
          <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
            ${statusPill(p.status)}
            <span class="pill slate">${esc(p.category)}</span>
            ${p.featured ? '<span class="pill">Most requested</span>' : ''}
          </div>
          <h3>${esc(p.title)}</h3>
          <p class="summary">${esc(p.summary)}</p>
          <div class="meta-row">
            <div class="meta-item"><span class="k">Fee</span><span class="v">${esc(p.fee)}</span></div>
            <div class="meta-item"><span class="k">Minimum</span><span class="v">${esc(p.minimum)}</span></div>
            <div class="meta-item"><span class="k">Horizon</span><span class="v">${esc(p.horizon)}</span></div>
            <div class="meta-item"><span class="k">Designed for</span><span class="v">${esc(p.audience)}</span></div>
          </div>
        </div>
        <div class="program-side">
          <span class="chev" aria-hidden="true">${ICONS.chevronDown}</span>
          <span class="tiny muted" style="white-space:nowrap">${p.documents.length} documents</span>
        </div>
      </button>

      <div class="program-detail">
        <div>
          <div class="detail-inner">
            <div class="detail-grid">
              <div>
                <div class="detail-block">
                  <h4>What the programme covers</h4>
                  <ul class="hl-list">
                    ${p.highlights.map((h) => `<li>${ICONS.check}<span>${esc(h)}</span></li>`).join('')}
                  </ul>
                </div>
                <div class="detail-block">
                  <h4>Delivery schedule</h4>
                  <ul class="timeline">
                    ${p.timeline.map((t) => `
                      <li><span class="dot"><i></i></span>
                        <span><strong>${esc(t.when)}</strong><span>${esc(t.what)}</span></span>
                      </li>`).join('')}
                  </ul>
                </div>
                <div class="detail-block">
                  <h4>Frequently asked</h4>
                  <div class="faq">${faqHtml(p)}</div>
                </div>
              </div>

              <div>
                <div class="detail-block">
                  <h4>Programme documents</h4>
                  <div class="doc-list">
                    ${p.documents.map((d, i) => `
                      <button class="doc" data-doc="${esc(p.id)}" data-i="${i}">
                        <span class="ft ft-${esc(d.type)}">${esc(d.type.toUpperCase())}</span>
                        <span style="min-width:0">
                          <span class="nm">${esc(d.name)}</span>
                          <span class="sz">Generated on download</span>
                        </span>
                        <span class="dl">${ICONS.download}</span>
                      </button>`).join('')}
                  </div>
                </div>

                <div class="detail-block">
                  <h4>Related media</h4>
                  <a class="doc" href="media.html?tag=${encodeURIComponent(p.video)}">
                    <span class="ft ft-doc">${ICONS.film}</span>
                    <span style="min-width:0">
                      <span class="nm">Watch: ${esc(p.video)} collection</span>
                      <span class="sz">Opens the media library, pre-filtered</span>
                    </span>
                    <span class="dl">${ICONS.arrowRight}</span>
                  </a>
                </div>
              </div>
            </div>

            <div class="detail-cta">
              <button class="btn brass" data-factsheet="${esc(p.id)}">${ICONS.doc} Download fact sheet (PDF)</button>
              <button class="btn ghost" data-pack="${esc(p.id)}">${ICONS.download} Download all ${p.documents.length} documents</button>
              <button class="btn ghost" data-request="${esc(p.id)}">Request a call about this programme</button>
            </div>
          </div>
        </div>
      </div>
    </article>`;
}

function renderList() {
  const host = $('#programList');
  const count = $('#resultCount');
  if (!host) return;
  const list = currentList();
  if (count) {
    count.textContent = state.q || state.cat !== 'All' || state.aud !== 'All' || state.status !== 'All'
      ? `${list.length} of ${PROGRAMS.length} programmes shown`
      : `${PROGRAMS.length} programmes in the catalogue`;
  }

  if (!list.length) {
    host.innerHTML = `
      <div class="empty">
        <h3>No programmes match those filters</h3>
        <p>Loosen a filter or clear the search box to see the full catalogue.</p>
        <div style="margin-top:18px"><button class="btn ghost" data-reset>Reset all filters</button></div>
      </div>`;
    return;
  }
  host.innerHTML = list.map(programHtml).join('');
}

/* ------------------------------------------------------- document export */
function docAsText(p, doc) {
  return [
    `${p.title} — ${doc.name}`,
    '='.repeat(72),
    '',
    `Category:   ${p.category}`,
    `Audience:   ${p.audience}`,
    `Status:     ${p.status}`,
    `Fee:        ${p.fee}`,
    `Minimum:    ${p.minimum}`,
    `Horizon:    ${p.horizon}`,
    '',
    'OVERVIEW',
    p.summary,
    '',
    'HIGHLIGHTS',
    ...p.highlights.map((h, i) => `  ${i + 1}. ${h}`),
    '',
    'DELIVERY SCHEDULE',
    ...p.timeline.map((t) => `  ${t.when.padEnd(14)} ${t.what}`),
    '',
    'FREQUENTLY ASKED',
    ...p.faqs.flatMap((f) => [`  Q: ${f.q}`, `  A: ${f.a}`, '']),
    '',
    `Generated ${new Date().toLocaleString()} — illustrative sample content, not investment advice.`,
  ].join('\n');
}

function docAsPdf(p, doc) {
  const isSheet = /comparison|worksheet|matrix|modelling|tracker|checklist/i.test(doc.name);
  const blocks = [
    { type: 'p', text: `Document: ${doc.name}. Prepared for the ${p.title} programme (${p.category} · ${p.audience}).` },
    { type: 'h2', text: 'Purpose of this document' },
    {
      type: 'p',
      text: isSheet
        ? 'This working document is supplied as a structured worksheet. Populate it with client-specific figures before use; it is designed to sit alongside the programme fact sheet.'
        : 'This reference document summarises the programme terms, scope and delivery obligations of the engagement described above.',
    },
    { type: 'h2', text: 'Programme terms' },
    {
      type: 'kv',
      items: [
        { k: 'Fee', v: p.fee },
        { k: 'Minimum', v: p.minimum },
        { k: 'Horizon', v: p.horizon },
        { k: 'Status', v: p.status },
      ],
    },
    { type: 'h2', text: 'Scope' },
    ...p.highlights.map((h) => ({ type: 'bullet', text: h })),
    { type: 'h2', text: 'Schedule' },
    { type: 'table', columns: ['Stage', 'Activity'], widths: [110, 390], rows: p.timeline.map((t) => [t.when, t.what]) },
    { type: 'space', h: 8 },
    { type: 'note', text: 'Sample document auto-generated by the prototype site. Replace with approved compliance-reviewed collateral before any external use.' },
  ];
  return buildPdf({
    org: BRAND.org,
    kicker: 'PROGRAMME DOCUMENT',
    title: doc.name,
    subtitle: `${p.title} · ${p.status}`,
    metaLine: `Generated ${new Date().toLocaleString()}`,
    footer: `${BRAND.orgTitle} · ${BRAND.contact}`,
    blocks,
  });
}

function docAsCsv(p, doc) {
  const rows = [
    ['Programme', p.title],
    ['Document', doc.name],
    ['Category', p.category],
    ['Audience', p.audience],
    ['Status', p.status],
    ['Fee', p.fee],
    ['Minimum', p.minimum],
    ['Horizon', p.horizon],
    [],
    ['Stage', 'Activity'],
    ...p.timeline.map((t) => [t.when, t.what]),
    [],
    ['Highlight'],
    ...p.highlights.map((h) => [h]),
    [],
    ['Question', 'Answer'],
    ...p.faqs.map((f) => [f.q, f.a]),
  ];
  return buildCsv(rows);
}

function docAsWord(p, doc) {
  const html = `<!DOCTYPE html><html xmlns:o="urn:schemas-microsoft-com:office:office"
    xmlns:w="urn:schemas-microsoft-com:office:word"><head><meta charset="utf-8">
    <title>${esc(doc.name)}</title></head><body style="font-family:Georgia,serif">
    <h1>${esc(doc.name)}</h1>
    <p><strong>${esc(p.title)}</strong> — ${esc(p.category)} · ${esc(p.audience)} · ${esc(p.status)}</p>
    <p>${esc(p.summary)}</p>
    <h2>Scope</h2><ul>${p.highlights.map((h) => `<li>${esc(h)}</li>`).join('')}</ul>
    <h2>Schedule</h2><table border="1" cellpadding="6" cellspacing="0">
      <tr><th align="left">Stage</th><th align="left">Activity</th></tr>
      ${p.timeline.map((t) => `<tr><td>${esc(t.when)}</td><td>${esc(t.what)}</td></tr>`).join('')}
    </table>
    <h2>Frequently asked</h2>
    ${p.faqs.map((f) => `<p><strong>${esc(f.q)}</strong><br>${esc(f.a)}</p>`).join('')}
    <p style="font-size:9pt;color:#666">Generated ${new Date().toLocaleString()} — illustrative sample content.</p>
    </body></html>`;
  return new Blob(['\uFEFF' + html], { type: 'application/msword' });
}

function fileBase(p, doc) {
  const clean = (s) => s.replace(/[^\w\s-]+/g, '').trim().replace(/\s+/g, '_');
  return `${clean(p.title)}_${clean(doc.name)}`;
}

function downloadDoc(p, i) {
  const doc = p.documents[i];
  if (!doc) return;
  const base = fileBase(p, doc);
  try {
    if (doc.type === 'pdf') downloadBlob(docAsPdf(p, doc), `${base}.pdf`);
    else if (doc.type === 'xls') downloadBlob(docAsCsv(p, doc), `${base}.csv`);
    else if (doc.type === 'doc') downloadBlob(docAsWord(p, doc), `${base}.doc`);
    // Fallback for an unrecognised doc.type — export as plain text rather than fail silently.
    else downloadBlob(new Blob([docAsText(p, doc)], { type: 'text/plain' }), `${base}.txt`);
    toast('Document generated', `${doc.name} — built in your browser.`);
  } catch (err) {
    console.error(err);
    toast('Could not generate that document', '', 'err');
  }
}

function downloadAll(p) {
  // One combined PDF: cover + each document as its own section.
  const blocks = [
    { type: 'p', text: p.summary },
    { type: 'h2', text: 'Documents in this pack' },
    ...p.documents.map((d, i) => ({ type: 'bullet', text: `${i + 1}. ${d.name} (${d.type.toUpperCase()})` })),
    { type: 'h2', text: 'Programme scope' },
    ...p.highlights.map((h) => ({ type: 'bullet', text: h })),
    { type: 'h2', text: 'Delivery schedule' },
    { type: 'table', columns: ['Stage', 'Activity'], widths: [110, 390], rows: p.timeline.map((t) => [t.when, t.what]) },
    { type: 'h2', text: 'Frequently asked' },
    ...p.faqs.flatMap((f) => [{ type: 'p', text: f.q }, { type: 'p', text: f.a }]),
    { type: 'note', text: 'Combined programme pack auto-generated by the prototype. Illustrative content only.' },
  ];
  const blob = buildPdf({
    org: BRAND.org,
    kicker: 'PROGRAMME PACK',
    title: p.title,
    subtitle: `${p.category} · ${p.audience} · ${p.status}`,
    metaLine: `Generated ${new Date().toLocaleString()} · Reference ${p.id.toUpperCase()}`,
    footer: `${BRAND.orgTitle} · ${BRAND.contact}`,
    blocks,
  });
  downloadBlob(blob, `${p.title.replace(/[^\w\s-]+/g, '').replace(/\s+/g, '_')}_pack.pdf`);
  toast('Programme pack generated', `${p.documents.length + 1} documents merged into one PDF.`);
}

/* --------------------------------------------------------------- request */
function requestModal(p) {
  const scrim = document.createElement('div');
  scrim.className = 'modal-scrim';
  scrim.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true" aria-label="Request a call">
      <h3>Request a call</h3>
      <p>Tell us where to reach you and we will follow up about <strong>${esc(p.title)}</strong>. This prototype does not send anything anywhere — it just demonstrates the flow.</p>
      <div class="field"><label for="rqName">Name</label><input id="rqName" placeholder="Alex Morgan"></div>
      <div class="field"><label for="rqEmail">Email</label><input id="rqEmail" type="email" placeholder="alex@example.com"></div>
      <div class="field"><label for="rqWhen">Preferred time</label>
        <select id="rqWhen"><option>Mornings (8–11)</option><option>Midday (11–2)</option><option>Afternoons (2–5)</option></select>
      </div>
      <div class="modal-actions">
        <button class="btn ghost" data-x>Cancel</button>
        <button class="btn brass" data-ok>Request call</button>
      </div>
    </div>`;
  document.body.appendChild(scrim);
  requestAnimationFrame(() => scrim.classList.add('open'));
  lockScroll(true);

  const close = () => {
    scrim.classList.remove('open');
    lockScroll(false);
    setTimeout(() => scrim.remove(), 300);
    document.removeEventListener('keydown', onEsc);
  };
  const onEsc = (e) => { if (e.key === 'Escape') close(); };
  document.addEventListener('keydown', onEsc);
  scrim.addEventListener('click', (e) => { if (e.target === scrim) close(); });
  $('[data-x]', scrim).addEventListener('click', close);
  $('[data-ok]', scrim).addEventListener('click', () => {
    const email = $('#rqEmail', scrim).value.trim();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast('Enter a valid email', 'We need somewhere to send the confirmation.', 'err');
      return;
    }
    close();
    toast('Request noted (demo)', `No data left this machine. In production this would book a slot for ${p.title}.`);
  });
  setTimeout(() => $('#rqName', scrim)?.focus(), 60);
}

/* ---------------------------------------------------------------- wiring */
function wire() {
  $('#programList')?.addEventListener('click', (e) => {
    const toggle = e.target.closest('[data-toggle-p]');
    if (toggle) {
      const id = toggle.dataset.toggleP;
      const card = toggle.closest('.program');
      const open = card.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      if (open) state.open.add(id); else state.open.delete(id);
      return;
    }

    const doc = e.target.closest('[data-doc]');
    if (doc) {
      const p = PROGRAMS.find((x) => x.id === doc.dataset.doc);
      if (p) downloadDoc(p, Number(doc.dataset.i));
      return;
    }

    const fact = e.target.closest('[data-factsheet]');
    if (fact) {
      const p = PROGRAMS.find((x) => x.id === fact.dataset.factsheet);
      if (p) {
        downloadBlob(programFactSheet(p), `${p.title.replace(/[^\w\s-]+/g, '').replace(/\s+/g, '_')}_fact_sheet.pdf`);
        toast('Fact sheet generated', 'A real PDF, written by the browser — no server involved.');
      }
      return;
    }

    const pack = e.target.closest('[data-pack]');
    if (pack) {
      const p = PROGRAMS.find((x) => x.id === pack.dataset.pack);
      if (p) downloadAll(p);
      return;
    }

    const req = e.target.closest('[data-request]');
    if (req) {
      const p = PROGRAMS.find((x) => x.id === req.dataset.request);
      if (p) requestModal(p);
      return;
    }

    const faqQ = e.target.closest('.faq-q');
    if (faqQ) {
      const item = faqQ.closest('.faq-item');
      const open = item.classList.toggle('open');
      faqQ.setAttribute('aria-expanded', String(open));
      return;
    }

    if (e.target.closest('[data-reset]')) resetFilters();
  });

  $('#catList')?.addEventListener('click', (e) => pick(e, 'cat'));
  $('#audList')?.addEventListener('click', (e) => pick(e, 'aud'));
  $('#statusList')?.addEventListener('click', (e) => pick(e, 'status'));

  $('#programSearch')?.addEventListener('input', debounce((e) => {
    state.q = e.target.value;
    renderList();
  }, 170));

  $('#programSort')?.addEventListener('change', (e) => {
    state.sort = e.target.value;
    renderList();
  });

  $('#resetBtn')?.addEventListener('click', resetFilters);
}

function pick(e, key) {
  const b = e.target.closest(`[data-${key}]`);
  if (!b) return;
  state[key] = b.dataset[key];
  renderRail();
  renderList();
  syncUrl();
}

function resetFilters() {
  state.q = '';
  state.cat = 'All';
  state.aud = 'All';
  state.status = 'All';
  const s = $('#programSearch');
  if (s) s.value = '';
  renderRail();
  renderList();
  syncUrl();
}

function syncUrl() {
  const p = new URLSearchParams();
  if (state.cat !== 'All') p.set('cat', state.cat);
  if (state.aud !== 'All') p.set('aud', state.aud);
  if (state.status !== 'All') p.set('status', state.status);
  if (state.q) p.set('q', state.q);
  const qs = p.toString();
  try {
    history.replaceState(null, '', qs ? `?${qs}` : location.pathname);
  } catch { /* file:// or sandboxed contexts can refuse this — filters still work */ }
}

/* ------------------------------------------------------------------ boot */
function bootResources() {
  mountChrome('resources.html');
  mountThemeDock();
  const params = new URLSearchParams(location.search);
  if (params.get('cat') && CATEGORIES.includes(params.get('cat'))) state.cat = params.get('cat');
  if (params.get('aud') && AUDIENCES.includes(params.get('aud'))) state.aud = params.get('aud');
  if (params.get('status') && STATUSES.includes(params.get('status'))) state.status = params.get('status');
  if (params.get('q')) {
    state.q = params.get('q');
    const s = $('#programSearch');
    if (s) s.value = state.q;
  }
  const openId = params.get('id');
  if (openId && PROGRAMS.some((p) => p.id === openId)) state.open.add(openId);

  renderRail();
  renderList();
  wire();
  initReveal();

  if (openId) {
    requestAnimationFrame(() => {
      document.getElementById(`program-${openId}`)?.scrollIntoView?.({ block: 'center', behavior: 'smooth' });
    });
  }
}

if (document.body.dataset.page === 'resources') bootResources();

return { bootResources };
});

__def("events", function () {
/* ==========================================================================
   events.js — Events tab (calendar)
   A chronological event list that reuses the Resources layout: a filter rail
   (category + upcoming/past), a search box, a sort control, and a card list.
   ========================================================================== */

const {$, esc, debounce, initReveal, mountChrome} = __req('site');
const {mountThemeDock} = __req('theme');
const {EVENTS, EVENT_CATEGORIES} = __req('data');
const ALL = 'All';
const state = { q: '', cat: 'All', when: 'upcoming', sort: 'soonest' };

/* ------------------------------------------------------------ date utils */
const todayIso = () => new Date().toISOString().slice(0, 10);
const isPast = (e) => e.date < todayIso();
const dayNum = (iso) => iso.slice(8, 10);
const monthLabel = (iso) =>
  new Date(iso + 'T12:00:00').toLocaleDateString('en-US', { month: 'short' }).toUpperCase();

/* Filter + sort the catalogue from data.js. "Soonest" puts future events
   first; "latest" inverts it. The past/upcoming split derives from the date. */
function applyFilters() {
  const q = state.q.trim().toLowerCase();
  const list = EVENTS.filter((e) => {
    if (state.cat !== ALL && e.category !== state.cat) return false;
    if (state.when === 'upcoming' && isPast(e)) return false;
    if (state.when === 'past' && !isPast(e)) return false;
    if (!q) return true;
    return `${e.title} ${e.desc} ${e.category} ${e.location} ${e.audience}`
      .toLowerCase().includes(q);
  });
  const dir = state.sort === 'soonest' ? 1 : -1;
  return list.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0) * dir);
}

/* -------------------------------------------------------------- rail UI */
function renderRail() {
  const catHost = $('#evCatList');
  const whenHost = $('#evWhenList');
  if (!catHost) return;

  const countCat = (c) => EVENTS.filter((e) => e.category === c).length;
  const upcoming = EVENTS.filter((e) => !isPast(e)).length;
  const past = EVENTS.filter((e) => isPast(e)).length;

  const item = (key, value, label, count, isOn) => `
    <button class="rail-item ${isOn ? 'is-on' : ''}" data-${key}="${esc(value)}" aria-pressed="${isOn}">
      <span>${esc(label)}</span><span class="n">${count}</span>
    </button>`;

  catHost.innerHTML =
    item('cat', ALL, 'All categories', EVENTS.length, state.cat === ALL) +
    EVENT_CATEGORIES.map((c) => item('cat', c, c, countCat(c), state.cat === c)).join('');

  whenHost.innerHTML =
    item('when', 'upcoming', 'Upcoming', upcoming, state.when === 'upcoming') +
    item('when', 'past', 'Past', past, state.when === 'past') +
    item('when', 'all', 'All', EVENTS.length, state.when === 'all');
}

/* ----------------------------------------------------------- event card */
function cardHtml(e) {
  const past = isPast(e);
  return `
    <article class="card event-card">
      <div class="event-date" aria-hidden="true">
        <span class="event-day">${dayNum(e.date)}</span>
        <span class="event-month">${monthLabel(e.date)}</span>
      </div>
      <div class="event-body">
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <span class="pill slate">${esc(e.category)}</span>
          <span class="pill ${past ? 'warn' : 'ok'}">${past ? 'Past' : 'Upcoming'}</span>
        </div>
        <h3>${esc(e.title)}</h3>
        <p class="event-meta">
          <span>${esc(e.time)}</span><span>·</span><span>${esc(e.location)}</span><span>·</span><span>${esc(e.audience)}</span>
        </p>
        <p class="event-desc">${esc(e.desc)}</p>
      </div>
    </article>`;
}

function renderList() {
  const host = $('#eventList');
  const count = $('#evCount');
  if (!host) return;
  const list = applyFilters();
  if (count) count.textContent = `${list.length} of ${EVENTS.length} events`;
  if (!list.length) {
    host.innerHTML = `
      <div class="empty">
        <h3>No events match those filters</h3>
        <p>Loosen a filter or clear the search box to see the full calendar.</p>
        <div style="margin-top:18px"><button class="btn ghost" data-reset>Reset all filters</button></div>
      </div>`;
    return;
  }
  host.innerHTML = list.map(cardHtml).join('');
}

/* --------------------------------------------------------------- wiring */
function pick(e, key) {
  const b = e.target.closest(`[data-${key}]`);
  if (!b) return;
  state[key] = b.dataset[key];
  renderRail();
  renderList();
}

function resetFilters() {
  state.q = '';
  state.cat = ALL;
  state.when = 'upcoming';
  const s = $('#evSearch');
  if (s) s.value = '';
  renderRail();
  renderList();
}

function wire() {
  $('#evSearch')?.addEventListener('input', debounce((e) => {
    state.q = e.target.value;
    renderList();
  }, 170));

  $('#evCatList')?.addEventListener('click', (e) => pick(e, 'cat'));
  $('#evWhenList')?.addEventListener('click', (e) => pick(e, 'when'));

  $('#evSort')?.addEventListener('change', (e) => { state.sort = e.target.value; renderList(); });

  $('#eventList')?.addEventListener('click', (e) => {
    if (e.target.closest('[data-reset]')) resetFilters();
  });

  $('#evReset')?.addEventListener('click', resetFilters);
}

/* ------------------------------------------------------------------- boot */
function bootEvents() {
  mountChrome('events.html');
  mountThemeDock();
  renderRail();
  renderList();
  wire();
  initReveal();
}

if (document.body.dataset.page === 'events') bootEvents();

return { bootEvents };
});

__def("gallery", function () {
/* ==========================================================================
   gallery.js — themes.html
   Live, scrollable previews of every look, scaled from a real 1440px render
   of index.html so what you see is the actual site, not a mockup.
   ========================================================================== */

const {$, $$, esc, toast, mountChrome} = __req('site');
const {THEME_META} = __req('theme-meta');
const {applyTheme, currentTheme, mountThemeDock} = __req('theme');
const PREVIEW_W = 1440;
const PREVIEW_H = 980;

function card(t, i) {
  return `
    <article class="theme-card reveal d${Math.min(i, 4)}" data-theme-card="${t.id}">
      <div class="frame-wrap">
        <iframe src="index.html?theme=${t.id}" title="${esc(t.label)} preview"
                loading="lazy" scrolling="no" tabindex="-1" aria-hidden="true"></iframe>
        <a class="frame-hit" href="index.html?theme=${t.id}" aria-label="Open the site in ${esc(t.label)}"></a>
      </div>
      <div class="theme-info">
        <div class="theme-info-head">
          <h3>${esc(t.label)}</h3>
          <span class="pill slate">${t.mode === 'dark' ? 'Dark' : 'Light'}</span>
        </div>
        <p>${esc(t.blurb)}</p>
        <div class="swatch-row" aria-hidden="true">
          ${t.swatch.map((c) => `<span class="swatch-dot" style="background:${c}"></span>`).join('')}
        </div>
        <div class="theme-actions">
          <a class="btn sm brass" href="index.html?theme=${t.id}">Open this style</a>
          <button class="btn sm ghost" data-use="${t.id}">Use it here</button>
        </div>
      </div>
    </article>`;
}

/** Scale each 1440px iframe down to whatever width its frame currently is. */
function fitFrames() {
  $$('.frame-wrap').forEach((wrap) => {
    const f = wrap.querySelector('iframe');
    if (!f) return;
    const s = wrap.clientWidth / PREVIEW_W;
    f.style.width = `${PREVIEW_W}px`;
    f.style.height = `${PREVIEW_H}px`;
    f.style.transform = `scale(${s})`;
    wrap.style.height = `${Math.round(PREVIEW_H * s)}px`;
  });
}

function bootGallery() {
  const host = $('#themeGallery');
  if (!host) return;

  host.innerHTML = THEME_META.map(card).join('');

  host.addEventListener('click', (e) => {
    const use = e.target.closest('[data-use]');
    if (!use) return;
    e.preventDefault();
    applyTheme(use.dataset.use);
    host.querySelectorAll('.theme-card').forEach((c) => {
      c.classList.toggle('is-current', c.dataset.themeCard === use.dataset.use);
    });
  });

  const markCurrent = (id) => {
    host.querySelectorAll('.theme-card').forEach((c) => {
      c.classList.toggle('is-current', c.dataset.themeCard === id);
    });
  };
  markCurrent(currentTheme());

  fitFrames();
  addEventListener('resize', () => requestAnimationFrame(fitFrames));
  // re-fit once the iframes have actually painted
  addEventListener('load', () => requestAnimationFrame(fitFrames));
  [120, 400, 900].forEach((ms) => setTimeout(fitFrames, ms));

  $('#stageNote')?.addEventListener('click', (e) => {
    const b = e.target.closest('[data-open]');
    if (!b) return;
    e.preventDefault();
    window.open(`index.html?theme=${b.dataset.open}`, '_blank', 'noopener');
  });

  // keep the "Use it here" state in sync when the dock is used
  document.addEventListener('click', (e) => {
    const sw = e.target.closest('.theme-dock [data-pick]');
    if (sw) markCurrent(sw.dataset.pick);
  });

  if (!THEME_META.length) toast('No themes found', `Run node tools/build-themes.mjs`, 'err');
}

if (document.body.dataset.page === 'themes') {
  mountChrome('themes.html');
  mountThemeDock();
  bootGallery();
}

return { bootGallery };
});
})();
