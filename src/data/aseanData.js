export const ASEAN_COUNTRIES = [
  { code: 'ALL', name: 'All ASEAN', flag: '🌏' },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾', focalAgency: 'MyStartup Cradle / MDEC' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', focalAgency: 'Enterprise Singapore / Startup SG' },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩', focalAgency: 'Kemenparekraf / Kominfo' },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭', focalAgency: 'NIA (National Innovation Agency)' },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳', focalAgency: 'NIC (National Innovation Center)' },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭', focalAgency: 'QBO Innovation Hub / DTI' },
];

export const SAMPLE_CERTIFICATES = [
  {
    id: 'my-cert-1',
    name: 'EcoLogix AI Solutions Sdn Bhd',
    country: 'Malaysia',
    countryCode: 'MY',
    regNumber: '202401048821 (1568212-A)',
    authority: 'Suruhanjaya Syarikat Malaysia (SSM)',
    certType: 'Certificate of Incorporation (Section 17 - Act 777)',
    incorpDate: '14 February 2024',
    sector: 'Artificial Intelligence & CleanTech',
    directors: ['Ahmad Thaqif bin Zulkifli (Founder & CEO)', 'Elena Tan Li Wei (Co-Founder & CTO)'],
    address: 'Level 14, Mercu 2, KL Eco City, 59200 Kuala Lumpur',
    stage: 'Early Stage / Seed',
    readinessScore: 94,
    previewUrl: '/certificates/ssm-malaysia-cert.svg',
    downloadUrl: '/certificates/ssm-malaysia-cert.svg',
    description: 'Autonomous carbon optimization platform leveraging open-weight AI for ASEAN manufacturing and logistics.',
    founderAnalysis: {
      team: 'Ahmad Thaqif (CEO) & Elena Tan (CTO)',
      equity: '100% Malaysian Shareholding (51%+ local quota verified)',
      strengths: 'Deep technical AI model deployment capabilities; compliant with MOSTI & Cradle fund governance guidelines.',
      readiness: 'Exempt from local corporate audit as qualified small entity; eligible for single-window ASEAN soft landing.'
    },
    talentNeeds: [
      { role: 'Senior AI / LLM Engineer', location: 'Malaysia / Remote', match: 'Farhan Azman (98% match in pool)' },
      { role: 'VP Regional Growth & GTM', location: 'Singapore / Regional', match: 'Stephanie Lim (94% match in pool)' },
      { role: 'Edge AI Firmware Engineer', location: 'Vietnam / ASEAN', match: 'Mai Nguyen Thao (89% match in pool)' }
    ],
    fundingEligibility: {
      flagshipGrant: 'Cradle CIP Spark & CIP Sprint (MOSTI)',
      amount: 'Up to RM 600,000 (100% Equity-Free)',
      timeline: 'Fast-track application ready via verified SSM number',
      vcPipeline: ['East Ventures Seed X', '500 Southeast Asia III', 'Odra Venture AI Fellowship']
    },
    opportunityCorridors: [
      'DOJO Coworking Reciprocal Access (KL & Singapore)',
      'Sunway iLabs Super Accelerator Pilot Validation',
      'MDEC DE Rantau Foreign Tech Talent Visa Sponsorship'
    ]
  },
  {
    id: 'sg-cert-2',
    name: 'PayNexa Global Pte. Ltd.',
    country: 'Singapore',
    countryCode: 'SG',
    regNumber: '202339842M',
    authority: 'Accounting and Corporate Regulatory Authority (ACRA)',
    certType: 'ACRA Business Profile & Certificate of Good Standing',
    incorpDate: '08 November 2023',
    sector: 'FinTech & Cross-Border B2B Payments',
    directors: ['Marcus Chen (Managing Director)', 'Nurul Huda binti Ismail (CTO)'],
    address: '71 Ayer Rajah Crescent, #04-12, Singapore 139951',
    stage: 'Pre-Series A',
    readinessScore: 97,
    previewUrl: '/certificates/acra-singapore-cert.svg',
    downloadUrl: '/certificates/acra-singapore-cert.svg',
    description: 'Instant settlement gateway connecting local instant payment rails (DuitNow, PayNow, BI-FAST, PromptPay).',
    founderAnalysis: {
      team: 'Marcus Chen (CEO, ex-Grab) & Nurul Huda (CTO, ex-GovTech)',
      equity: 'Singaporean & Malaysian co-founding syndicate',
      strengths: 'Dual-jurisdiction founding team with proven financial regulatory compliance across MAS and Bank Negara Malaysia.',
      readiness: 'High cross-border execution readiness; pre-cleared for regional bilateral sandbox trials.'
    },
    talentNeeds: [
      { role: 'Cross-Border Compliance Officer', location: 'Singapore', match: 'ACRA & MAS Certified Lead' },
      { role: 'High-Throughput Go/Backend Engineer', location: 'Indonesia / VN', match: 'Dimas Wicaksono (91% match in pool)' },
      { role: 'Enterprise Account Executive', location: 'Malaysia / Indo', match: 'Available in ASEAN Directory' }
    ],
    fundingEligibility: {
      flagshipGrant: 'Startup SG Founder & Enterprise Development Grant (EDG)',
      amount: 'S$ 50,000 to S$ 250,000 (Non-dilutive)',
      timeline: 'Eligible for immediate ESG endorsement',
      vcPipeline: ['Insignia Ventures', 'Wavemaker Partners', '500 Southeast Asia']
    },
    opportunityCorridors: [
      'Antler Southeast Asia Cohort Acceleration',
      'PayNow - DuitNow Cross-Border Settlement Corridor',
      'Aspire / Sleek Regional Entity Corporate Suite'
    ]
  },
  {
    id: 'id-cert-3',
    name: 'PT Nusantara Agro Digital',
    country: 'Indonesia',
    countryCode: 'ID',
    regNumber: '0220309142851 (NIB)',
    authority: 'Kementerian Investasi / BKPM - AHU RI',
    certType: 'Nomor Induk Berusaha (NIB) & SK Kemenkumham',
    incorpDate: '22 May 2024',
    sector: 'AgriTech & Rural Supply Chain',
    directors: ['Budi Santoso (Direktur Utama)', 'Rian Pratama (Komisaris)'],
    address: 'Gedung Cyber 2, Lt. 18, Jl. HR Rasuna Said, Jakarta Selatan 12950',
    stage: 'Seed Stage',
    readinessScore: 89,
    previewUrl: '/certificates/ahu-indonesia-cert.svg',
    downloadUrl: '/certificates/ahu-indonesia-cert.svg',
    description: 'AI-driven soil diagnostics and farm yield forecasting serving smallholders across Sumatra and Java.',
    founderAnalysis: {
      team: 'Budi Santoso (Agri Domain Lead) & Rian Pratama (Operations)',
      equity: '100% Local Indonesian PMDN (Perseroan Terbatas)',
      strengths: 'Deep on-the-ground rural distribution network with verified NIB under OSS RBA system.',
      readiness: 'Ready for cross-border joint venture (PT PMA) and Malaysian export expansion.'
    },
    talentNeeds: [
      { role: 'Computer Vision & Edge Model Specialist', location: 'Regional', match: 'Mai Nguyen Thao (89% match)' },
      { role: 'React Native Offline-First Engineer', location: 'Indonesia / MY', match: 'Dimas Wicaksono (91% match)' }
    ],
    fundingEligibility: {
      flagshipGrant: 'Kemenparekraf Baparekraf Scale-Up & Indigo Telkom',
      amount: 'Rp 500M - Rp 1.5B Pilot Capital',
      timeline: 'Open intake via National Innovation Hub',
      vcPipeline: ['East Ventures Seed X', 'Alpha JWC Founder Studio', 'AC Ventures']
    },
    opportunityCorridors: [
      'Alpha JWC Ventures EIR & Founder Studio',
      'Cross-Border Soft Landing in Malaysia for Agri-Trade',
      'DOJO Hub Jakarta - KL Bilateral Exchange'
    ]
  }
];

export const ASEAN_OPPORTUNITIES = [
  // FUNDING & GRANTS
  {
    id: 'fund-1',
    title: 'CIP Spark & CIP Sprint Grant',
    category: 'Funding',
    subCategory: 'Government Grant',
    country: 'MY',
    countryName: 'Malaysia',
    provider: 'Cradle Fund / MyStartup',
    amount: 'Up to RM 600,000 (Equity-Free)',
    deadline: 'Rolling / Open Q4',
    description: 'Conditional grant by Ministry of Science, Technology and Innovation (MOSTI) helping early-stage tech startups validate and scale commercial solutions.',
    eligibility: ['Registered in Malaysia (Sdn Bhd)', 'Min 51% Malaysian equity', 'Tech/Innovation-driven product'],
    badge: 'Gov Equity-Free',
    featured: true,
    url: 'https://cradle.com.my'
  },
  {
    id: 'fund-2',
    title: 'Startup SG Founder Grant',
    category: 'Funding',
    subCategory: 'Venture Building Grant',
    country: 'SG',
    countryName: 'Singapore',
    provider: 'Enterprise Singapore',
    amount: 'S$ 50,000 grant + Matching',
    deadline: 'Quarterly Cohorts',
    description: 'Provides mentorship and startup capital grant to first-time entrepreneurs with innovative, scalable business models.',
    eligibility: ['Singapore-registered company', 'At least 30% local shareholding', 'Innovative tech component'],
    badge: 'Flagship SG Grant',
    featured: true,
    url: 'https://www.startupsg.gov.sg'
  },
  {
    id: 'fund-3',
    title: 'East Ventures Seed Fund X',
    category: 'Funding',
    subCategory: 'Venture Capital',
    country: 'ID',
    countryName: 'Indonesia & ASEAN',
    provider: 'East Ventures',
    amount: '$250K - $1.5M',
    deadline: 'Always Open',
    description: 'Pioneer Indonesian venture fund backing bold founders across Southeast Asia from seed to growth.',
    eligibility: ['High-growth potential', 'Addressing ASEAN market friction', 'Strong founding team'],
    badge: 'Top Regional VC',
    featured: true,
    url: 'https://east.vc'
  },
  {
    id: 'fund-4',
    title: '500 Southeast Asia III',
    category: 'Funding',
    subCategory: 'Venture Capital',
    country: 'ALL',
    countryName: 'Pan-ASEAN',
    provider: '500 Global',
    amount: '$150K - $500K Initial Check',
    deadline: 'Rolling',
    description: 'Early-stage vehicle supporting founders in Southeast Asia with deep operational mentorship and global network.',
    eligibility: ['Pre-seed to Seed', 'Scalable software or tech model', 'Expanding across ASEAN'],
    badge: 'Global Network',
    featured: false,
    url: 'https://500.co/southeast-asia'
  },
  {
    id: 'fund-5',
    title: 'NIA Startup Voucher & Innovation Connext',
    category: 'Funding',
    subCategory: 'Government Subsidy',
    country: 'TH',
    countryName: 'Thailand',
    provider: 'National Innovation Agency (NIA)',
    amount: 'Up to 1.5M THB',
    deadline: 'Annual Cohort',
    description: 'Financial support for deep-tech prototypes, product certifications, and cross-border commercialization.',
    eligibility: ['Thai registered entity or joint venture', 'Deep-tech / GreenTech focus'],
    badge: 'Innovation Voucher',
    featured: false,
    url: 'https://nia.or.th'
  },

  // PROGRAMMES & ACCELERATORS
  {
    id: 'prog-1',
    title: 'Antler Southeast Asia Cohort',
    category: 'Programmes',
    subCategory: 'Day Zero Accelerator',
    country: 'SG',
    countryName: 'Singapore & Regional',
    provider: 'Antler Global',
    amount: '$125K for 10% equity + Stipend',
    deadline: 'Next Cohort: Jan 2027',
    description: 'Brings together founders, technologists, and domain experts to build fast, validate concepts, and co-found venture-scale startups.',
    eligibility: ['Individual builders or existing early teams', 'Full-time commitment'],
    badge: 'Intensive Cohort',
    featured: true,
    url: 'https://www.antler.co'
  },
  {
    id: 'prog-2',
    title: 'Sunway iLabs Super Accelerator',
    category: 'Programmes',
    subCategory: 'Corporate Accelerator',
    country: 'MY',
    countryName: 'Malaysia',
    provider: 'Sunway Group & MDEC',
    amount: 'RM 100K Pilot Funding + Market Access',
    deadline: 'Applications close end of month',
    description: '4-month intensive programme offering market validation with Sunway’s 13 business divisions and regional partners.',
    eligibility: ['Smart Cities, FinTech, AgriTech, HealthTech', 'Working MVP with initial traction'],
    badge: 'Corporate Pilot',
    featured: true,
    url: 'https://innovationlabs.sunway.edu.my'
  },
  {
    id: 'prog-3',
    title: 'Alpha JWC Ventures Founder Studio',
    category: 'Programmes',
    subCategory: 'Venture Studio',
    country: 'ID',
    countryName: 'Indonesia',
    provider: 'Alpha JWC',
    amount: 'Dedicated Seed Check + EIR Support',
    deadline: 'Rolling Intake',
    description: 'Hands-on institutional support from Indonesia’s premier venture capital firm to build category champions.',
    eligibility: ['Tech founders targeting the Indonesian or regional ASEAN consumer/enterprise market'],
    badge: 'Venture Studio',
    featured: false,
    url: 'https://alphajwc.com'
  },
  {
    id: 'prog-4',
    title: 'Vietnam National Innovation Center (NIC) Global Launch',
    category: 'Programmes',
    subCategory: 'Soft Landing & Acceleration',
    country: 'VN',
    countryName: 'Vietnam',
    provider: 'Ministry of Planning and Investment (MPI) Vietnam',
    amount: 'Subsidized Co-working + Tax Incentives',
    deadline: 'Biannual',
    description: 'Gateway for foreign and local startups to establish R&D centers, pilot testing, and venture links inside NIC Hoa Lac Hi-tech Park.',
    eligibility: ['AI, Semiconductor, Smart Manufacturing startups'],
    badge: 'National Innovation',
    featured: false,
    url: 'https://nic.gov.vn'
  },

  // PARTNERS & EXPANSION
  {
    id: 'part-1',
    title: 'ASEAN Cross-Border Soft Landing Corridor',
    category: 'Partners',
    subCategory: 'Market Expansion',
    country: 'ALL',
    countryName: 'MY, SG, ID, TH, VN',
    provider: 'Startup ASEAN Alliance & DOJO Coworking',
    amount: 'Reciprocal Workspaces + Legal Concierge',
    deadline: 'Immediate Access',
    description: 'Bilateral soft-landing programme providing verified startups with free hot-desking, expedited company registration, and local banking introductions.',
    eligibility: ['Verified ASEAN Incorporation Certificate', 'Expanding to at least 1 other ASEAN market'],
    badge: 'Fast-Track Entry',
    featured: true,
    url: 'https://startupasean.org'
  },
  {
    id: 'part-2',
    title: 'MDEC DE Rantau Digital Nomad & Talent Hub',
    category: 'Partners',
    subCategory: 'Talent & Relocation',
    country: 'MY',
    countryName: 'Malaysia',
    provider: 'Malaysia Digital Economy Corporation',
    amount: 'DE Rantau Pass (3 to 12 months renewable)',
    deadline: 'Year-round',
    description: 'Attract foreign digital talent and tech entrepreneurs to establish operations in Malaysia with simplified visa requirements.',
    eligibility: ['Foreign tech workers, founders, software contractors'],
    badge: 'Talent Visa',
    featured: false,
    url: 'https://mdec.my/derantau'
  },
  {
    id: 'part-3',
    title: 'Sleek & Aspire Cross-Border Financial Suite',
    category: 'Partners',
    subCategory: 'Corporate Services',
    country: 'SG',
    countryName: 'Singapore & Region',
    provider: 'Sleek / Aspire ASEAN',
    amount: 'Free Multi-Currency Account + $1,000 Credits',
    deadline: 'Special Hackathon Offer',
    description: 'Instant corporate entity setup, secretarial, accounting, and multi-currency business accounts for fast-growing ASEAN founders.',
    eligibility: ['Registered tech startups in ASEAN'],
    badge: 'Banking & Legal',
    featured: false,
    url: 'https://aspireapp.com'
  }
];

export const ASEAN_TALENTS = [
  {
    id: 'tal-1',
    name: 'Farhan Azman',
    title: 'Senior AI / LLM Engineer',
    country: 'Malaysia',
    countryCode: 'MY',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    skills: ['PyTorch', 'Gemma 2 / vLLM', 'FastAPI', 'LangChain', 'Docker'],
    experience: '5 years exp • Ex-Grab & AI FinTech lead',
    availability: 'Open to Co-Founder / Lead AI Role',
    hourlyRate: '$45/hr or Equity',
    matchScore: 98,
    bio: 'Specializes in quantized open-weight LLMs, agentic workflows, and deploying edge AI models across ASEAN mobile devices.'
  },
  {
    id: 'tal-2',
    name: 'Stephanie Lim',
    title: 'VP of Growth & Regional GTM',
    country: 'Singapore',
    countryCode: 'SG',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    skills: ['B2B Sales', 'Market Expansion', 'Cross-Border Partnerships', 'Product Marketing'],
    experience: '7 years exp • Led market entry in ID & VN',
    availability: 'Fractional Head of Growth / Advisory',
    hourlyRate: '$65/hr',
    matchScore: 94,
    bio: 'Helped 3 Series-A startups expand from SG to Malaysia and Indonesia. Deep contacts with regional enterprise buyers.'
  },
  {
    id: 'tal-3',
    name: 'Dimas Wicaksono',
    title: 'Full Stack & Mobile Engineer',
    country: 'Indonesia',
    countryCode: 'ID',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    skills: ['React Native', 'Node.js', 'Go', 'PostgreSQL', 'Tailwind'],
    experience: '4 years exp • Ex-Gojek Ecosystem Builder',
    availability: 'Full-time Remote across ASEAN',
    hourlyRate: '$30/hr',
    matchScore: 91,
    bio: 'Passionate about building high-throughput payment and mobile commerce systems resilient to flaky rural mobile connections.'
  },
  {
    id: 'tal-4',
    name: 'Mai Nguyen Thao',
    title: 'Data & Computer Vision Researcher',
    country: 'Vietnam',
    countryCode: 'VN',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    skills: ['Computer Vision', 'YOLOv10', 'TensorFlow', 'Document OCR', 'Edge AI'],
    experience: '3 years exp • Hanoi University AI Lab',
    availability: 'Contract / Co-founder',
    hourlyRate: '$35/hr',
    matchScore: 89,
    bio: 'Researched automated identity verification and official registry certificate OCR parsing using multimodal vision models.'
  }
];

export const CROSS_BORDER_CHECKLIST = {
  MY_TO_SG: [
    { step: 'ACRA Incorp / Branch', status: 'Pending', detail: 'Incorporate Singapore Pte. Ltd. or register foreign branch via BizFile.' },
    { step: 'Cross-Border Tax Clearance', status: 'Ready', detail: 'Utilize Malaysia-Singapore Double Taxation Avoidance (DTA) treaty.' },
    { step: 'Banking & FX Rails', status: 'Recommended', detail: 'Set up multi-currency account with PayNow-DuitNow cross-border settlement.' },
    { step: 'Grants Application', status: 'Eligible', detail: 'Apply for Startup SG Network and Enterprise Development Grant (EDG).' }
  ],
  DEFAULT: [
    { step: 'Legal Entity Registry', status: 'Verified', detail: 'Valid certificate detected and registered in national registry.' },
    { step: 'ASEAN Startup Passport', status: 'Unlocked', detail: 'Eligible for reciprocal incubation, soft-landing visas, and partner credits.' },
    { step: 'Regional Venture Matching', status: 'Active', detail: 'Profile submitted to ASEAN Seed Angel Network and VC Syndicates.' },
    { step: 'Cross-Border Talent Hiring', status: 'Ready', detail: 'Access verified remote technical talent pools across Malaysia, SG, ID, and VN.' }
  ]
};
