import { Educator } from '../types';

export const initialEducators: Educator[] = [
  {
    id: 'ahsan-rahman',
    name: 'Ahsan Rahman',
    professionalName: 'Ahsan Rahman (Concept Physics)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    verified: true,
    rating: 4.9,
    reviewCount: 86,
    location: 'Dhaka (Dhanmondi / Online)',
    experience: 7,
    subjects: ['Physics', 'Mathematics', 'Calculus', 'Mechanics', 'HSC Preparation', 'Admission Preparation'],
    qualifications: ['BSc in Electrical & Electronic Engineering (BUET)', 'Former Teaching Fellow, Prep Academy'],
    teachingFormats: ['1-on-1', 'Batch classes'],
    priceMin: 600,
    priceMax: 1200,
    availableThisWeek: true,
    description: 'Specializes in HSC physics and mathematics with a concept-first teaching approach. Over 700 students guided to public universities.',
    bio: 'I believe rote memorization is the enemy of true physics mastery. Over 7 years of full-time mentoring, I have designed structured intuitive frameworks for Newtonian mechanics, electrodynamics, and differential calculus that break down even the most daunting admission problems into manageable visual first-principles.',
    teachingPhilosophy: 'Concepts before equations. I use interactive simulations, physical models, and structured derivation pathways so students understand the "why" before tackling the "how".',
    whoITeach: 'High school students (HSC 1st & 2nd year), Engineering aspirants (BUET / CKET), and college students wanting rock-solid foundations.',
    timeline: [
      {
        period: '2021 — Present',
        role: 'Lead Mentor & Academic Consultant',
        institution: 'Pirate Chai & Independent Practice',
        description: 'Mentoring 150+ students annually across 1-on-1 personalized tracks and intensive batch workshops.'
      },
      {
        period: '2019 — 2021',
        role: 'Senior Physics Instructor',
        institution: 'Udvash Engineering Care',
        description: 'Taught core mechanics and electricity batches; authored problem sets and concept notes.'
      },
      {
        period: '2016 — 2019',
        role: 'Peer Mentor & Laboratory Assistant',
        institution: 'EEE Dept, BUET',
        description: 'Conducted problem-solving recitations for undergraduate engineering physics and calculus.'
      }
    ],
    portfolio: [
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80'
    ],
    schedule: [
      { day: 'Monday', status: 'Available', timeSlots: ['4:00 PM', '6:00 PM', '8:00 PM'] },
      { day: 'Tuesday', status: 'Available', timeSlots: ['5:00 PM', '7:30 PM'] },
      { day: 'Wednesday', status: 'Available', timeSlots: ['4:00 PM', '8:00 PM'] },
      { day: 'Thursday', status: 'Limited', timeSlots: ['6:30 PM'] },
      { day: 'Friday', status: 'Available', timeSlots: ['10:00 AM', '3:00 PM', '7:00 PM'] },
      { day: 'Saturday', status: 'Available', timeSlots: ['9:00 AM', '4:00 PM', '8:00 PM'] },
      { day: 'Sunday', status: 'Unavailable', timeSlots: [] }
    ],
    reviews: [
      {
        id: 'r1',
        studentName: 'Nafisa Ahmed',
        rating: 5.0,
        date: '3 days ago',
        subject: 'HSC Physics Mechanics',
        text: 'Ahsan bhai explains difficult concepts in a way that finally makes them feel simple. His rotational mechanics notes alone saved my midterm exam!'
      },
      {
        id: 'r2',
        studentName: 'Rafi Al-Hasan',
        rating: 5.0,
        date: '2 weeks ago',
        subject: 'Calculus & Vectors',
        text: 'Best mentor I had in 2 years. Very patient, never rushes through questions, and always provides real-life analogies before diving into formulas.'
      },
      {
        id: 'r3',
        studentName: 'Tasnim Jahan',
        rating: 4.8,
        date: '1 month ago',
        subject: 'Admission Physics',
        text: 'Structured problem sets and clear homework feedback. He helped me spot my recurring calculation mistakes in thermodynamics.'
      }
    ]
  },
  {
    id: 'nafisa-kamal',
    name: 'Dr. Nafisa Kamal',
    professionalName: 'Dr. Nafisa Kamal (Organic & Medical Bio)',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    verified: true,
    rating: 4.95,
    reviewCount: 112,
    location: 'Dhaka (Gulshan / Online)',
    experience: 8,
    subjects: ['Biology', 'Chemistry', 'Medical Admission', 'Organic Chemistry', 'HSC Preparation'],
    qualifications: ['MBBS (Dhaka Medical College)', 'Gold Medalist in Biochemistry & Physiology'],
    teachingFormats: ['1-on-1', 'Batch classes'],
    priceMin: 800,
    priceMax: 1600,
    availableThisWeek: true,
    description: 'DMC graduate specializing in Medical Admission Biology and Chemistry. Focuses on memory retention systems and diagram mastery.',
    bio: 'Cracking medical admission tests requires both conceptual clarity and high-speed recall. Having gone through DMC myself with top marks, I teach students active recall systems, mnemonics that actually stick, and how to conquer botanical taxonomy and human physiology effortlessly.',
    teachingPhilosophy: 'Visual memory triggers combined with rigorous question-bank drills. Every class ends with a 10-minute speed quiz to reinforce retainability.',
    whoITeach: 'Aspiring medical college candidates, HSC students aiming for A+ in Biology/Chemistry.',
    timeline: [
      {
        period: '2020 — Present',
        role: 'Faculty Mentor in Medical Sciences',
        institution: 'Pirate Chai & DMC Clinical Mentors',
        description: 'Guided 340+ students into government medical colleges across Bangladesh.'
      },
      {
        period: '2018 — 2020',
        role: 'Lead Biology Specialist',
        institution: 'Unmesh Medical Care',
        description: 'Curated the nationwide mock question banks for human physiology and genetics.'
      }
    ],
    portfolio: [
      'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80'
    ],
    schedule: [
      { day: 'Monday', status: 'Available', timeSlots: ['7:00 PM', '9:00 PM'] },
      { day: 'Tuesday', status: 'Available', timeSlots: ['6:00 PM', '8:00 PM'] },
      { day: 'Wednesday', status: 'Limited', timeSlots: ['8:30 PM'] },
      { day: 'Thursday', status: 'Available', timeSlots: ['7:00 PM'] },
      { day: 'Friday', status: 'Available', timeSlots: ['9:30 AM', '3:00 PM', '6:00 PM'] },
      { day: 'Saturday', status: 'Available', timeSlots: ['11:00 AM', '5:00 PM'] },
      { day: 'Sunday', status: 'Available', timeSlots: ['7:00 PM'] }
    ],
    reviews: [
      {
        id: 'r4',
        studentName: 'Sumaiya Karim',
        rating: 5.0,
        date: '5 days ago',
        subject: 'Medical Biology',
        text: 'Nafisa Apu made human physiology my favorite subject! Her visual flowcharts are pure gold.'
      }
    ]
  },
  {
    id: 'tanvir-hossain',
    name: 'Tanvir Hossain',
    professionalName: 'Tanvir Hossain (IELTS 8.5 & Academic English)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    verified: true,
    rating: 4.88,
    reviewCount: 94,
    location: 'Dhaka (Uttara / Online)',
    experience: 6,
    subjects: ['English', 'IELTS', 'Writing', 'Speaking', 'University Admission'],
    qualifications: ['MA in Applied Linguistics (University of Dhaka)', 'IELTS Overall Band 8.5 (L9, R9, W8, S8.5)', 'CELTA Certified'],
    teachingFormats: ['1-on-1', 'Batch classes'],
    priceMin: 700,
    priceMax: 1400,
    availableThisWeek: true,
    description: 'Certified IELTS instructor specializing in Academic Writing Task 2 and Fluency & Pronunciation for Band 7.5+ aspirants.',
    bio: 'Too many candidates get stuck at Band 6.5 because of template-based answers. In my sessions, we discard robotic formulas and build authentic, coherent academic arguments with natural lexical variety and cohesive phrasing.',
    teachingPhilosophy: 'Live personalized writing surgery and mock oral assessments with immediate criterion-by-criterion breakdown.',
    whoITeach: 'Graduates aiming for overseas scholarships, immigration applicants, and university students.',
    timeline: [
      {
        period: '2019 — Present',
        role: 'Senior IELTS Trainer',
        institution: 'Pirate Chai Academic English Wing',
        description: 'Successfully coached 400+ test-takers to achieve their target band scores.'
      }
    ],
    portfolio: [
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80'
    ],
    schedule: [
      { day: 'Monday', status: 'Available', timeSlots: ['5:00 PM', '7:00 PM'] },
      { day: 'Tuesday', status: 'Available', timeSlots: ['6:00 PM', '8:30 PM'] },
      { day: 'Wednesday', status: 'Available', timeSlots: ['5:00 PM', '7:00 PM'] },
      { day: 'Thursday', status: 'Available', timeSlots: ['6:00 PM'] },
      { day: 'Friday', status: 'Available', timeSlots: ['10:00 AM', '4:00 PM', '8:00 PM'] },
      { day: 'Saturday', status: 'Limited', timeSlots: ['7:00 PM'] },
      { day: 'Sunday', status: 'Unavailable', timeSlots: [] }
    ],
    reviews: [
      {
        id: 'r5',
        studentName: 'Zubair Anwar',
        rating: 5.0,
        date: '1 week ago',
        subject: 'IELTS Writing Task 2',
        text: 'From 6.0 in writing to 7.5 in 6 weeks! His essay review feedback is remarkably precise.'
      }
    ]
  },
  {
    id: 'sadia-karim',
    name: 'Sadia Karim',
    professionalName: 'Sadia Karim (Pure & Applied Mathematics)',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    verified: true,
    rating: 4.92,
    reviewCount: 78,
    location: 'Dhaka (Mirpur / Online)',
    experience: 5,
    subjects: ['Mathematics', 'HSC Preparation', 'SSC', 'Calculus', 'Trigonometry'],
    qualifications: ['BSc & MSc in Mathematics (University of Dhaka, First Class 1st)', 'National Math Olympiad Alumni Trainer'],
    teachingFormats: ['1-on-1', 'Batch classes'],
    priceMin: 500,
    priceMax: 1000,
    availableThisWeek: true,
    description: 'Renowned for demystifying Calculus, Coordinate Geometry, and Trigonometry for SSC & HSC board toppers.',
    bio: 'Mathematics is an art of seeing patterns. I specialize in taking students who are genuinely frightened of calculus and algebra, and giving them the structural intuition that turns math into their highest-scoring paper.',
    teachingPhilosophy: 'Step-by-step logic without shortcuts until the baseline intuition is crystalline.',
    whoITeach: 'SSC, HSC, and first-year university mathematics students.',
    timeline: [
      {
        period: '2020 — Present',
        role: 'Math Specialist & Mentor',
        institution: 'Pirate Chai',
        description: 'Taught over 500 board examinees with a 98% A+ rate.'
      }
    ],
    portfolio: [
      'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80'
    ],
    schedule: [
      { day: 'Monday', status: 'Available', timeSlots: ['4:00 PM', '6:00 PM'] },
      { day: 'Tuesday', status: 'Available', timeSlots: ['5:00 PM', '7:00 PM'] },
      { day: 'Wednesday', status: 'Available', timeSlots: ['4:00 PM', '6:00 PM'] },
      { day: 'Thursday', status: 'Available', timeSlots: ['5:00 PM', '8:00 PM'] },
      { day: 'Friday', status: 'Available', timeSlots: ['9:00 AM', '3:00 PM'] },
      { day: 'Saturday', status: 'Available', timeSlots: ['10:00 AM', '5:00 PM'] },
      { day: 'Sunday', status: 'Limited', timeSlots: ['6:00 PM'] }
    ],
    reviews: [
      {
        id: 'r6',
        studentName: 'Anika Tabassum',
        rating: 5.0,
        date: '2 weeks ago',
        subject: 'HSC Higher Math',
        text: 'Sadia Apu made Integration feel so intuitive! Her notes are the best resource for board exams.'
      }
    ]
  },
  {
    id: 'farhan-kabir',
    name: 'Farhan Kabir',
    professionalName: 'Farhan Kabir (Software Engineer & CS Educator)',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    verified: true,
    rating: 4.96,
    reviewCount: 65,
    location: 'Dhaka (Banani / Online)',
    experience: 9,
    subjects: ['Programming', 'ICT', 'Python', 'Web Development', 'Computer Science', 'Data Structures'],
    qualifications: ['BSc in CSE (BUET)', 'Senior Software Engineer at leading tech multinational', 'ICPC Regional Finalist'],
    teachingFormats: ['1-on-1', 'Batch classes'],
    priceMin: 800,
    priceMax: 1800,
    availableThisWeek: true,
    description: 'Industry engineer teaching clean code, practical Python, modern Web Development, and HSC ICT with interactive labs.',
    bio: 'Computer science should be taught through code you can actually run and build with. Whether you need an A+ in HSC ICT or want to build production full-stack web applications and land tech internships, I teach real-world programming fundamentals.',
    teachingPhilosophy: 'No theoretical lecturing without building something that compiles. Pair programming and clean architecture from day one.',
    whoITeach: 'HSC ICT students, college coders, career switchers, and university freshmen in CSE.',
    timeline: [
      {
        period: '2022 — Present',
        role: 'Tech Lead & Mentor',
        institution: 'Pirate Chai Tech Academy',
        description: 'Mentoring aspiring software developers and university freshmen.'
      },
      {
        period: '2017 — 2022',
        role: 'Senior Software Engineer',
        institution: 'Global Tech Corp',
        description: 'Architecting distributed systems and training junior engineers.'
      }
    ],
    portfolio: [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80'
    ],
    schedule: [
      { day: 'Monday', status: 'Available', timeSlots: ['8:00 PM', '10:00 PM'] },
      { day: 'Tuesday', status: 'Available', timeSlots: ['8:00 PM', '10:00 PM'] },
      { day: 'Wednesday', status: 'Available', timeSlots: ['8:00 PM'] },
      { day: 'Thursday', status: 'Available', timeSlots: ['9:00 PM'] },
      { day: 'Friday', status: 'Available', timeSlots: ['4:00 PM', '8:00 PM'] },
      { day: 'Saturday', status: 'Available', timeSlots: ['11:00 AM', '7:00 PM'] },
      { day: 'Sunday', status: 'Limited', timeSlots: ['8:00 PM'] }
    ],
    reviews: [
      {
        id: 'r7',
        studentName: 'Mushfiqur Rahman',
        rating: 5.0,
        date: '3 weeks ago',
        subject: 'Python & Web Basics',
        text: 'Farhan bhai helped me build my first full-stack application from scratch in just 4 weeks. Unbelievable clarity!'
      }
    ]
  },
  {
    id: 'mehedi-hasan',
    name: 'Mehedi Hasan',
    professionalName: 'Mehedi Hasan (Business Math & IBA Admission)',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80',
    verified: true,
    rating: 4.85,
    reviewCount: 52,
    location: 'Dhaka (Online)',
    experience: 5,
    subjects: ['Economics', 'Accounting', 'Mathematics', 'University Admission', 'SAT'],
    qualifications: ['BBA (IBA, University of Dhaka)', 'Chartered Accountancy Finalist'],
    teachingFormats: ['1-on-1', 'Batch classes'],
    priceMin: 700,
    priceMax: 1300,
    availableThisWeek: false,
    description: 'IBA graduate with deep expertise in BBA/MBA admission test preparation, business analytics, and microeconomics.',
    bio: 'Cracking IBA requires lightning-fast mental math and analytical rigor. My program trains students in speed techniques, data sufficiency, and critical reasoning that give an unmatched competitive edge.',
    teachingPhilosophy: 'Targeted timing drills and cognitive shortcuts for high-stakes business school tests.',
    whoITeach: 'IBA aspirants, BBA students, and students preparing for SAT Quant & Verbal.',
    timeline: [
      {
        period: '2021 — Present',
        role: 'Admission Strategist',
        institution: 'Pirate Chai Business Wing',
        description: 'Mentored 80+ candidates who secured seats at IBA (DU, JU, and BUP).'
      }
    ],
    portfolio: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'
    ],
    schedule: [
      { day: 'Monday', status: 'Limited', timeSlots: ['7:00 PM'] },
      { day: 'Tuesday', status: 'Limited', timeSlots: ['7:00 PM'] },
      { day: 'Wednesday', status: 'Available', timeSlots: ['6:00 PM', '8:30 PM'] },
      { day: 'Thursday', status: 'Available', timeSlots: ['7:00 PM'] },
      { day: 'Friday', status: 'Available', timeSlots: ['10:00 AM', '5:00 PM'] },
      { day: 'Saturday', status: 'Available', timeSlots: ['2:00 PM', '8:00 PM'] },
      { day: 'Sunday', status: 'Unavailable', timeSlots: [] }
    ],
    reviews: [
      {
        id: 'r8',
        studentName: 'Tahsin Chowdhury',
        rating: 5.0,
        date: '1 month ago',
        subject: 'IBA Admission Math',
        text: 'His quantitative shortcuts cut my test-solving time in half. Highly recommended!'
      }
    ]
  },
  {
    id: 'tasnim-rahman',
    name: 'Tasnim Rahman',
    professionalName: 'Tasnim Rahman (Organic & Inorganic Chemistry)',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    verified: true,
    rating: 4.91,
    reviewCount: 69,
    location: 'Dhaka (Mohammadpur / Online)',
    experience: 6,
    subjects: ['Chemistry', 'HSC Preparation', 'Organic Chemistry', 'SSC', 'Admission Preparation'],
    qualifications: ['BSc & MS in Applied Chemistry (DU)', 'Research Fellow, BCSIR'],
    teachingFormats: ['1-on-1', 'Batch classes'],
    priceMin: 550,
    priceMax: 1100,
    availableThisWeek: true,
    description: 'Simplifies organic reaction mechanisms and periodic properties using modular flashcards and problem-solving flowcharts.',
    bio: 'Many students treat organic chemistry like a phonebook to memorize. Once you understand electron density, leaving groups, and nucleophilic attack pathways, organic chemistry becomes as logical as geometry.',
    teachingPhilosophy: 'Electron-pushing arrow formalism and mechanism-driven problem solving.',
    whoITeach: 'HSC examinees, university admission test candidates, and O/A Level Chemistry students.',
    timeline: [
      {
        period: '2020 — Present',
        role: 'Lead Chemistry Educator',
        institution: 'Pirate Chai',
        description: 'Author of the widely acclaimed "Mechanism Master" visual study guide.'
      }
    ],
    portfolio: [
      'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80'
    ],
    schedule: [
      { day: 'Monday', status: 'Available', timeSlots: ['5:00 PM', '7:00 PM'] },
      { day: 'Tuesday', status: 'Available', timeSlots: ['5:00 PM', '7:30 PM'] },
      { day: 'Wednesday', status: 'Available', timeSlots: ['6:00 PM'] },
      { day: 'Thursday', status: 'Available', timeSlots: ['4:00 PM', '7:00 PM'] },
      { day: 'Friday', status: 'Available', timeSlots: ['11:00 AM', '4:00 PM'] },
      { day: 'Saturday', status: 'Available', timeSlots: ['10:00 AM', '6:00 PM'] },
      { day: 'Sunday', status: 'Unavailable', timeSlots: [] }
    ],
    reviews: [
      {
        id: 'r9',
        studentName: 'Rayan Chowdhury',
        rating: 5.0,
        date: '2 weeks ago',
        subject: 'Organic Chemistry',
        text: 'Organic was my weakest subject until I started 1-on-1 sessions with Tasnim Apu. Mechanisms make sense now!'
      }
    ]
  },
  {
    id: 'arif-mahmud',
    name: 'Arif Mahmud',
    professionalName: 'Arif Mahmud (SAT & GRE Quant Specialist)',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    verified: true,
    rating: 4.97,
    reviewCount: 104,
    location: 'Dhaka (Online)',
    experience: 10,
    subjects: ['SAT', 'Mathematics', 'Economics', 'University Admission'],
    qualifications: ['MSc in Financial Mathematics (LSE)', 'SAT Math 800/800 Scorer', '10 Years Mentorship Experience'],
    teachingFormats: ['1-on-1'],
    priceMin: 1200,
    priceMax: 2500,
    availableThisWeek: true,
    description: 'Top-tier SAT Quant & Advanced Mathematics coach for students targeting Ivy League and US Top 50 universities.',
    bio: 'Achieving a perfect 800 on Digital SAT Math requires zero careless errors and the ability to immediately recognize Desmos-assisted speed opportunities. I coach serious college-bound students on speed, trap avoidance, and advanced functions.',
    teachingPhilosophy: 'Pristine error-log analysis. We catalog every single miss into knowledge gap vs trap vs calculation error.',
    whoITeach: 'High school students taking Digital SAT, ACT, and undergraduate math.',
    timeline: [
      {
        period: '2016 — Present',
        role: 'Global Test Prep Consultant',
        institution: 'Pirate Chai Global Scholars',
        description: 'Helped 120+ students achieve 1500+ on the SAT with over $12M in combined scholarship offers.'
      }
    ],
    portfolio: [
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80'
    ],
    schedule: [
      { day: 'Monday', status: 'Available', timeSlots: ['7:00 PM', '9:00 PM'] },
      { day: 'Tuesday', status: 'Available', timeSlots: ['8:00 PM'] },
      { day: 'Wednesday', status: 'Available', timeSlots: ['7:00 PM', '9:00 PM'] },
      { day: 'Thursday', status: 'Limited', timeSlots: ['8:30 PM'] },
      { day: 'Friday', status: 'Available', timeSlots: ['3:00 PM', '7:00 PM'] },
      { day: 'Saturday', status: 'Available', timeSlots: ['10:00 AM', '4:00 PM', '8:00 PM'] },
      { day: 'Sunday', status: 'Available', timeSlots: ['6:00 PM'] }
    ],
    reviews: [
      {
        id: 'r10',
        studentName: 'Shahrin Ahmed',
        rating: 5.0,
        date: '1 week ago',
        subject: 'Digital SAT Math',
        text: 'Arif Sir took my score from 690 to 790 in two months! His Desmos tricks are unbelievable.'
      }
    ]
  },
  {
    id: 'nabila-islam',
    name: 'Nabila Islam',
    professionalName: 'Nabila Islam (SSC & HSC Biology)',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80',
    verified: true,
    rating: 4.87,
    reviewCount: 45,
    location: 'Chittagong / Online',
    experience: 4,
    subjects: ['Biology', 'SSC', 'HSC Preparation'],
    qualifications: ['BSc in Biotechnology & Genetic Engineering (SUST)', 'Gold Medalist'],
    teachingFormats: ['1-on-1', 'Batch classes'],
    priceMin: 500,
    priceMax: 900,
    availableThisWeek: true,
    description: 'Passionate about Genetics, Molecular Biology, and Botany. Uses 3D cell models and concise exam revision notes.',
    bio: 'Biology is the code of life. I help young scholars grasp difficult botanical classifications and animal diversity with vivid visual aids and easy diagram sketching techniques needed for board exams.',
    teachingPhilosophy: 'Active drawing and diagram mastery. If you can sketch it accurately in 60 seconds, you own the concept.',
    whoITeach: 'SSC and HSC science group students.',
    timeline: [
      {
        period: '2022 — Present',
        role: 'Biology Instructor',
        institution: 'Pirate Chai',
        description: 'Mentoring over 300 students annually across live interactive batch classes.'
      }
    ],
    portfolio: [
      'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80'
    ],
    schedule: [
      { day: 'Monday', status: 'Available', timeSlots: ['4:00 PM', '6:00 PM'] },
      { day: 'Tuesday', status: 'Available', timeSlots: ['5:00 PM'] },
      { day: 'Wednesday', status: 'Available', timeSlots: ['4:00 PM', '6:30 PM'] },
      { day: 'Thursday', status: 'Available', timeSlots: ['6:00 PM'] },
      { day: 'Friday', status: 'Available', timeSlots: ['9:00 AM', '3:00 PM'] },
      { day: 'Saturday', status: 'Available', timeSlots: ['11:00 AM', '5:00 PM'] },
      { day: 'Sunday', status: 'Unavailable', timeSlots: [] }
    ],
    reviews: [
      {
        id: 'r11',
        studentName: 'Fariha Noor',
        rating: 5.0,
        date: '3 weeks ago',
        subject: 'HSC Genetics',
        text: 'Her Mendel law and DNA replication diagrams were identical to what came in our board exam!'
      }
    ]
  },
  {
    id: 'samiul-hasan',
    name: 'Samiul Hasan',
    professionalName: 'Samiul Hasan (Accounting & Business Studies)',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    verified: true,
    rating: 4.82,
    reviewCount: 39,
    location: 'Dhaka (Online)',
    experience: 5,
    subjects: ['Accounting', 'Economics', 'HSC Preparation', 'SSC'],
    qualifications: ['BBA & MBA in Accounting & Information Systems (DU)', 'ACCA Affiliate'],
    teachingFormats: ['1-on-1', 'Batch classes'],
    priceMin: 500,
    priceMax: 1000,
    availableThisWeek: true,
    description: 'Accounting made systematic through double-entry flowcharts, cash flow mastery, and financial statement analysis.',
    bio: 'Accounting is not about blindly cramming rules; it is the universal language of commerce. I break down balance sheets, depreciation equations, and cost accounting so students get full 100/100 marks on board papers.',
    teachingPhilosophy: 'Ledger debit-credit intuition first, followed by speed solving past papers under timed conditions.',
    whoITeach: 'Commerce stream students of SSC, HSC, and first-year BBA.',
    timeline: [
      {
        period: '2021 — Present',
        role: 'Commerce Lead Mentor',
        institution: 'Pirate Chai',
        description: 'Taught over 350 commerce students with exemplary board results.'
      }
    ],
    portfolio: [
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80'
    ],
    schedule: [
      { day: 'Monday', status: 'Available', timeSlots: ['5:00 PM', '7:00 PM'] },
      { day: 'Tuesday', status: 'Available', timeSlots: ['6:00 PM', '8:00 PM'] },
      { day: 'Wednesday', status: 'Available', timeSlots: ['5:00 PM', '7:00 PM'] },
      { day: 'Thursday', status: 'Available', timeSlots: ['6:00 PM'] },
      { day: 'Friday', status: 'Available', timeSlots: ['10:00 AM', '4:00 PM'] },
      { day: 'Saturday', status: 'Available', timeSlots: ['9:00 AM', '3:00 PM'] },
      { day: 'Sunday', status: 'Limited', timeSlots: ['7:00 PM'] }
    ],
    reviews: [
      {
        id: 'r12',
        studentName: 'Ahnaf Tanvir',
        rating: 5.0,
        date: '1 month ago',
        subject: 'HSC Accounting',
        text: 'Financial statements used to be terrifying. Samiul Sir explained the ledger adjustments so clearly!'
      }
    ]
  },
  {
    id: 'rafi-ahmed',
    name: 'Rafi Ahmed',
    professionalName: 'Rafi Ahmed (O/A Level Pure Physics)',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
    verified: false,
    rating: 4.79,
    reviewCount: 31,
    location: 'Dhaka (Baridhara / Online)',
    experience: 4,
    subjects: ['Physics', 'Mathematics', 'HSC Preparation'],
    qualifications: ['BSc in Mechanical Engineering (IUT)', 'Edexcel A* Star in Physics & Further Maths'],
    teachingFormats: ['1-on-1'],
    priceMin: 700,
    priceMax: 1300,
    availableThisWeek: true,
    description: 'Specializes in Cambridge & Edexcel O/A Level Physics and HSC mechanics with past paper surgery.',
    bio: 'Physics is intuitive when demonstrated through mechanical models. I provide rigorous past-paper topical drills with exact mark scheme guidelines so no marks are lost on vague wording.',
    teachingPhilosophy: 'Targeting mark-scheme phrasing and experimental physics questions.',
    whoITeach: 'O Level, A Level, and English Medium HSC students.',
    timeline: [
      {
        period: '2022 — Present',
        role: 'Physics Tutor',
        institution: 'Pirate Chai',
        description: 'Mentoring 60+ English medium and HSC students.'
      }
    ],
    portfolio: [
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80'
    ],
    schedule: [
      { day: 'Monday', status: 'Available', timeSlots: ['4:00 PM', '6:00 PM'] },
      { day: 'Tuesday', status: 'Available', timeSlots: ['5:00 PM', '7:00 PM'] },
      { day: 'Wednesday', status: 'Limited', timeSlots: ['6:00 PM'] },
      { day: 'Thursday', status: 'Available', timeSlots: ['5:00 PM'] },
      { day: 'Friday', status: 'Available', timeSlots: ['2:00 PM', '6:00 PM'] },
      { day: 'Saturday', status: 'Available', timeSlots: ['10:00 AM', '4:00 PM'] },
      { day: 'Sunday', status: 'Unavailable', timeSlots: [] }
    ],
    reviews: [
      {
        id: 'r13',
        studentName: 'Zafir Khan',
        rating: 4.8,
        date: '2 weeks ago',
        subject: 'A Level Mechanics',
        text: 'Very thorough explanations on circular motion and gravitation.'
      }
    ]
  },
  {
    id: 'nusrat-jahan',
    name: 'Nusrat Jahan',
    professionalName: 'Nusrat Jahan (English Grammar & Creative Writing)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    verified: true,
    rating: 4.93,
    reviewCount: 57,
    location: 'Dhaka (Online)',
    experience: 7,
    subjects: ['English', 'Writing', 'HSC Preparation', 'SSC', 'University Admission'],
    qualifications: ['BA & MA in English Literature (DU)', 'Ex-Faculty, Scholastica'],
    teachingFormats: ['1-on-1', 'Batch classes'],
    priceMin: 600,
    priceMax: 1200,
    availableThisWeek: true,
    description: 'Transforming HSC English 1st & 2nd paper prep into engaging literature discussions and flawless grammatical writing.',
    bio: 'Most students struggle with HSC English modifiers, preposition collocations, and essay composition because grammar is taught as detached rules. I teach grammar through active sentence rewriting, rhythm, and clarity.',
    teachingPhilosophy: 'Sentence architecture and rhetorical clarity. Every lesson features live composition critique.',
    whoITeach: 'School and college examinees preparing for board exams and DU "D" / "B" Unit admission tests.',
    timeline: [
      {
        period: '2019 — Present',
        role: 'English Academic Director',
        institution: 'Pirate Chai',
        description: 'Mentored over 650 students with outstanding board distinctions.'
      }
    ],
    portfolio: [
      'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80'
    ],
    schedule: [
      { day: 'Monday', status: 'Available', timeSlots: ['4:00 PM', '6:00 PM'] },
      { day: 'Tuesday', status: 'Available', timeSlots: ['5:00 PM', '7:00 PM'] },
      { day: 'Wednesday', status: 'Available', timeSlots: ['4:00 PM', '6:00 PM'] },
      { day: 'Thursday', status: 'Available', timeSlots: ['5:00 PM'] },
      { day: 'Friday', status: 'Available', timeSlots: ['10:00 AM', '3:00 PM'] },
      { day: 'Saturday', status: 'Available', timeSlots: ['11:00 AM', '5:00 PM'] },
      { day: 'Sunday', status: 'Unavailable', timeSlots: [] }
    ],
    reviews: [
      {
        id: 'r14',
        studentName: 'Lamia Farzana',
        rating: 5.0,
        date: '3 weeks ago',
        subject: 'HSC English 2nd Paper',
        text: 'Nusrat madam made modifiers and right forms of verbs foolproof. Scored 94 in my pre-tests!'
      }
    ]
  }
];
