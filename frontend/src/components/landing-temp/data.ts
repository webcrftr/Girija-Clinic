import { Service, Doctor, Testimonial, Stat } from './types';

export const CLINIC_STATS: Stat[] = [
  {
    id: 'stat-1',
    label: 'Clinical Experience',
    value: 24,
    suffix: '+ Yrs',
    desc: 'Delivering uncompromised excellence in patient care.'
  },
  {
    id: 'stat-2',
    label: 'Senior Consultants',
    value: 12,
    suffix: '',
    desc: 'Board-certified specialists from leading medical institutes.'
  },
  {
    id: 'stat-3',
    label: 'Diagnostic Accuracy',
    value: 99.8,
    suffix: '%',
    desc: 'Powered by 2026 ultra-high-definition imaging and mapping.'
  },
  {
    id: 'stat-4',
    label: 'Patient Satisfaction',
    value: 4.9,
    suffix: '/5.0',
    desc: 'Consistently rated 5 stars by over 12,000+ patients.'
  }
];

export const CLINIC_SERVICES: Service[] = [
  {
    id: 'srv-1',
    title: 'Precision Cardiology & Diagnostics',
    shortDesc: 'State-of-the-art non-invasive cardiac screening, telemetry, and customized prevention protocols designed by Dr. Prasad.',
    longDesc: 'Our flagship cardiovascular division combines advanced telemetry, premium echo-cardiography, and genomic metabolic profiling to construct a high-resolution map of your vascular health. This enables early intervention years before symptoms arise, keeping your heart functioning at peak efficiency.',
    iconName: 'Heart',
    category: 'clinical',
    duration: '45 - 90 mins',
    priceEstimate: '$240 - $450',
    features: [
      'Advanced 12-lead electrocardiography (ECG)',
      'High-definition color Doppler echocardiogram',
      'Continuous 24-hour ambulatory Holter monitoring',
      'Personalized cardiovascular risk assessment report',
      'Direct consulting session with Dr. Girija V. Prasad'
    ]
  },
  {
    id: 'srv-2',
    title: 'Longevity & Cellular Wellness',
    shortDesc: 'Evidence-based preventive programs targeting metabolic optimization, cell health, and systemic longevity.',
    longDesc: 'Designed by Dr. Adrian Sterling, this innovative specialty focuses on the cellular drivers of aging. By evaluating metabolic markers, oxidative stress, and inflammatory indicators, we design custom therapies to slow cellular aging, boost cognitive clarity, and restore sustained physical energy.',
    iconName: 'Sparkles',
    category: 'preventive',
    duration: '60 mins',
    priceEstimate: '$300 - $600',
    features: [
      'Comprehensive metabolic and biomarker screening',
      'Mitochondrial function & oxidative stress index',
      'Personalized cellular rejuvenation counseling',
      'Tailored nutritional and lifestyle medical blueprints',
      'Bi-annual progress tracing and optimization'
    ]
  },
  {
    id: 'srv-3',
    title: 'Advanced Executive Screening',
    shortDesc: 'A fast-tracked, exhaustive healthcare evaluation designed to fit the demanding schedules of modern leaders.',
    longDesc: 'An elite, comprehensive physical and diagnostic examination packaged into a seamless half-day experience. Your screening includes absolute access to our premium lounge, dedicated patient concierge, high-definition diagnostics, and a same-day clinical roadmap.',
    iconName: 'Shield',
    category: 'preventive',
    duration: '3 - 4 hours',
    priceEstimate: '$1,200',
    features: [
      'Full body molecular-metabolic screening',
      'Advanced pulmonary function diagnostics',
      'Arterial stiffness and vascular compliance analysis',
      'Nutritionist-designed executive wellness roadmap',
      'Private luxury clinic suite access'
    ]
  },
  {
    id: 'srv-4',
    title: 'Surgical Consultancy & Referrals',
    shortDesc: 'Expert pre-surgical evaluation, second-opinion counseling, and priority routing to world-class medical centers.',
    longDesc: 'Navigate complex medical choices with complete confidence. Our medical board conducts deep review of surgical recommendations, provides independent medical-grade second opinions, and connects you with world-leading specialized surgical centers when intervention is necessary.',
    iconName: 'GitPullRequest',
    category: 'specialty',
    duration: '45 mins',
    priceEstimate: '$150 - $300',
    features: [
      'Independent diagnostic and case reviews',
      'Comprehensive risk-benefit analysis',
      'Pre-operative physiological fitness clearance',
      'Direct integration with global medical specialists',
      'Personalized post-surgical recovery planning'
    ]
  },
  {
    id: 'srv-5',
    title: 'High-Resolution Diagnostic Imaging',
    shortDesc: 'Ultra-precise multi-slice ultrasound, digital radiography, and visual scans interpreted by leading radiologist Dr. Cho.',
    longDesc: 'Using the latest 2026 solid-state imaging arrays, our diagnostics deliver ultra-high contrast imagery of deep tissues and organs with minimal patient strain. Every scan is cross-examined and interpreted with pristine precision by Dr. Cho to uncover subtle clinical details.',
    iconName: 'Layers',
    category: 'diagnostic',
    duration: '30 - 60 mins',
    priceEstimate: '$180 - $400',
    features: [
      'High-definition musculoskeletal & abdominal ultrasound',
      'Low-dose high-resolution digital chest radiography',
      'Non-invasive carotid and femoral duplex scans',
      'AI-assisted diagnostic verification protocols',
      'Secure high-fidelity digital image portal'
    ]
  },
  {
    id: 'srv-6',
    title: 'Family Medicine & Preventive Care',
    shortDesc: 'Continuous, comprehensive primary care for all life stages, focusing on health defense and everyday vitality.',
    longDesc: 'We believe family medicine is the cornerstone of lifelong vitality. Our primary care model offers personalized health tracking, custom seasonal immunizations, and rapid diagnostic support for acute conditions. We treat you as an individual, not just a symptom.',
    iconName: 'Activity',
    category: 'clinical',
    duration: '30 mins',
    priceEstimate: '$80 - $150',
    features: [
      'Continuous health monitoring and yearly baselines',
      'Acute illness assessment and tailored recovery',
      'Chronic metabolic condition management',
      'Routine and specialized health defense plans',
      'Same-day express care for registered patients'
    ]
  }
];

export const CLINIC_DOCTORS: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Girija V. Prasad',
    role: 'Medical Director & Founder',
    specialty: 'Clinical & Preventive Cardiology',
    education: 'MD (Cardiology) — Harvard Medical School',
    experience: '24 Years of Excellence',
    bio: 'Dr. Girija V. Prasad founded Girija Clinic with a vision to merge clinical precision with patient-centric luxury. Having served as Chief Resident at Massachusetts General Hospital and later leading elite clinical research, she has dedicated her career to diagnosing and preventing cardiovascular conditions years before clinical presentation.',
    image: '/src/assets/images/hero_doctor_1784608778507.jpg',
    rating: 4.9,
    reviewsCount: 420,
    availability: ['Mon', 'Tue', 'Wed', 'Thu'],
    languages: ['English', 'Hindi', 'Malayalam']
  },
  {
    id: 'doc-2',
    name: 'Dr. Adrian Sterling',
    role: 'Chief of Preventive Medicine',
    specialty: 'Metabolic Optimization & Longevity',
    education: 'MD, PhD — Johns Hopkins School of Medicine',
    experience: '15 Years of Excellence',
    bio: 'Dr. Sterling is a globally recognized specialist in biological aging mechanisms. His medical work at Girija Clinic bridges modern endocrinology and cellular biology, developing bespoke longevity profiles and nutrition therapies that boost daily vitality and protect cognitive health long-term.',
    image: '/src/assets/images/doctor_adrian_1784608814813.jpg',
    rating: 4.9,
    reviewsCount: 310,
    availability: ['Tue', 'Wed', 'Thu', 'Fri'],
    languages: ['English', 'German']
  },
  {
    id: 'doc-3',
    name: 'Dr. Evelyn Cho',
    role: 'Lead Diagnostic Specialist',
    specialty: 'Advanced Radiography & Imaging',
    education: 'MD — Stanford School of Medicine',
    experience: '12 Years of Excellence',
    bio: 'Dr. Evelyn Cho is renowned for her skill in diagnostic ultrasonography and advanced imaging mapping. She is highly passionate about non-invasive detection, ensuring that patient scans are read with absolute fidelity and transformed into clear, actionable medical maps.',
    image: '/src/assets/images/doctor_evelyn_1784608830316.jpg',
    rating: 4.8,
    reviewsCount: 285,
    availability: ['Mon', 'Wed', 'Fri'],
    languages: ['English', 'Korean', 'Mandarin']
  }
];

export const CLINIC_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Marcus Vance',
    role: 'Managing Partner, Vance Advisory Group',
    rating: 5,
    text: 'The Executive Health Screening at Girija Clinic is unmatched. The efficiency was incredible, but more importantly, Dr. Prasad\'s deep-dive cardiology counsel identified cardiovascular patterns that other physicals simply glossed over. The clinical level of care here feels genuinely bespoke.',
    date: 'June 18, 2026',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120',
    verified: true,
    treatment: 'Executive Health Screening'
  },
  {
    id: 'test-2',
    name: 'Elena Rostova',
    role: 'Principal Architect & Designer',
    rating: 5,
    text: 'Dr. Sterling completely reshaped my daily life. I came in suffering from chronic mid-day fatigue and metabolic fog. Through their Cellular Wellness assessment and custom biological plan, I\'ve restored a level of physical energy and focus I thought was long gone. The clinic itself is a minimalist masterpiece.',
    date: 'July 05, 2026',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120&h=120',
    verified: true,
    treatment: 'Longevity & Cellular Wellness'
  },
  {
    id: 'test-3',
    name: 'Siddharth Mehta',
    role: 'Director of Technology',
    rating: 5,
    text: 'Dr. Evelyn Cho\'s diagnostics are stellar. I needed a complex duplex ultrasound, and the care, comfort, and state-of-the-art imaging systems they used made me feel incredibly secure. Dr. Cho explained every wave and detail of the scan in real-time. Extremely professional and reassuring.',
    date: 'May 24, 2026',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120&h=120',
    verified: true,
    treatment: 'High-Resolution Diagnostic Imaging'
  }
];
