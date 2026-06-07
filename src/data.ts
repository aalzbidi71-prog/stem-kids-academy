import { CoursePath, StudentProject, PricingPlan, Testimonial, FAQItem } from "./types";

export const COURSE_PATHS: CoursePath[] = [
  {
    id: "math",
    titleAr: "مسار الرياضيات والحساب الذهني",
    titleEn: "Mathematics & Mental Arithmetic",
    agesAr: "5 - 12 سنة",
    agesEn: "5 - 12 Years Old",
    descriptionAr: "تأسيس معنوي مذهل للحس العددي وقدرات التخيل الدماغي! يتعلم الطفل فيه الحساب الذهني بطرق بصرية ملموسة ومرحة (مثل السوروبان والعداد الخيالي)، مع تدريب مكثف على الجمع، الطرح، الضرب، والقسمة بطرق ترفع مستوى التركيز والسرعة لديه بنسبة عالية.",
    descriptionEn: "Highly interactive child-ready math foundations! Kids grasp deep numerical sense, visual estimation, and rapid abacus calculations via interactive games and visual maps, building core speed.",
    color: "emerald",
    iconName: "Calculator",
    isActive: true,
    giraffePose: 1, // Will be overridden or styled based on logo
    useMainLogo: true, // Specific instructions: Show "Giraffe reading a book" here (from input_file_1.png!)
    modulesAr: [
      "تأسيس الحس العددي وفهم دلالات الأرقام والأوزان هندسياً",
      "الحساب الذهني المبتكر والسريع (طرق السوروبان والأصابع الفعالة)",
      "تقنيات الجمع والطرح الفوري عبر التخيل الدماغي النشط",
      "تمكين مهارات الضرب السريع، القسمة الأساسية، والتقدير المنطقي للحسابات",
      "حل المسائل والألغاز الرياضية وسلاسل التفكير التحليلي والأنماط"
    ],
    modulesEn: [
      "Spatial & Numerical Sense Foundation with visual quantities",
      "Mental Abacus Arithmetic: visualizing standard beads for speed",
      "Intuitive Rapid Addition & Subtraction without writing blocks",
      "Empowering Multiplication, Division, Estimation, and Fractions",
      "Logic Puzzles, Patterns, and Multi-Step Math Dilemmas"
    ],
    skillsAr: ["الحساب السريع", "التركيز البصري", "سلاسل الأنماط", "حب الرياضيات"],
    skillsEn: ["Rapid Math", "Visual Concentration", "Logic Patterns", "Math Appreciation"]
  },
  {
    id: "english",
    titleAr: "مسار اللغة الإنجليزية للمبتدئين",
    titleEn: "English Vocabulary & Conversation",
    agesAr: "6 - 12 سنة",
    agesEn: "6 - 12 Years Old",
    descriptionAr: "كسر حاجز الخوف والتحدث بطلاقة وتلقائية! يكتسب الأطفال مفردات يومية هامة، وقواعد التحدث البسيطة لتركيب الجمل بطريقة طبيعية غير معقدة، مدعومة بحصص محادثة شجاعة حية عبر زووم، والتمكين التام لمهارات القراءة والتهجئة السليمة بالصوتيات الحيوية (Phonics).",
    descriptionEn: "Conquering public speaking barriers in English! Young learners acquire core vocabulary, dynamic grammar, and phonetic awareness (Phonics) through interactive conversational zoom classes.",
    color: "amber",
    iconName: "MessageCircle",
    isActive: true,
    giraffePose: 3, // Smiling greeting giraffe (Pose 3 from input_file_0.png)
    modulesAr: [
      "بناء رصيد هائل من الكلمات والصفات والأسماء وصياغة الأفعال المصورة",
      "القواعد الحيوية المبسطة لتركيب الجمل والتعبير التلقائي السليم",
      "مهارات التهجئة الحديثة، مخارج الحروف، وصوتيات الفونكس (Syllables & Phonics)",
      "تكوين فقرات وصفية قصيرة باللغة الإنجليزية لإبهار الوالدين والزملاء",
      "فصول محادثة تفاعلية تفوقية حية بوجوه باسمة وتدريبات واثقة"
    ],
    modulesEn: [
      "Robust Vocabulary Prototyping: action verb lists & colorful adjectives",
      "Conversational Grammar Mastery (Speaking automatically without stress)",
      "Accurate Phonics, Syllables, letter blends, and reading fluency",
      "Building short narrative presentations describing drawings and toys",
      "Zoom Friendly Speaking circles focusing on confidence & correct outputs"
    ],
    skillsAr: ["تحدث واثق", "التهجئة السمعية", "تركيب جمل صحيحة", "الجرأة في النطق"],
    skillsEn: ["Confident Speaking", "Acoustic Phonics", "Correct Sentences", "Spontaneous Dialogue"]
  },
  {
    id: "programming",
    titleAr: "مسار البرمجة وصناعة الألعاب",
    titleEn: "Coding & Game Development",
    agesAr: "6 - 15 سنة",
    agesEn: "6 - 15 Years Old",
    descriptionAr: "تصميم البرامج الحقيقية والتحليق بالخوارزميات! مسار مستقبلي متكامل ومثبت مجهرياً يبدأ من منصة البرمجة الصورية ويتدرج للبرمجة النصية بلغة بايثون والذكاء الاصطناعي، ليرتقي الطفل من مجرد مستهلك للأجهزة إلى مبرمج ومبدع يصمم ألعابه بيده.",
    descriptionEn: "The digital magic of visual elements, loops, and conditional structures, moving to writing official Python syntax and training real smart machine learning classifiers.",
    color: "indigo",
    iconName: "Cpu",
    isActive: true, // No longer locked! Fully ready!
    giraffePose: 1, // Sitting on laptop (Pose 1 from input_file_0.png)
    modulesAr: [
      "تأسيس الخوارزميات والتسلسل والتحكم الشرطي والتكرار (Loops) بطرق مرئية",
      "تصميم قصص تفاعلية وألعاب حاسوبية ذكية على Scratch 3 و PictoBlox",
      "صياغة الكود الحقيقي بلغة بايثون Python الأساسية لتطوير تطبيقات تفاعلية",
      "تدريب نماذج الذكاء الاصطناعي للتيميز الذكي للصور والألوان والأصوات وتطوير البرامج",
      "بناء ألعاب ثنائية الأبعاد والسيطرة الكاملة على فيزيائيتها وتفاعلها"
    ],
    modulesEn: [
      "Spatial & Algorithmic Foundations: sequential control, variables, and branches",
      "Game Engineering & Logic: Scratch 3 & PictoBlox sprite development",
      "Writing clean scripts in Python language syntax for standalone apps",
      "Training custom AI models on images, sound cues, and webcam objects",
      "Designing responsive 2D games and managing complete canvas physics"
    ],
    skillsAr: ["التفكير الخوارزمي", "تصميم الألعاب", "برمجة بايثون", "الذكاء الاصطناعي"],
    skillsEn: ["Algorithmic Flow", "Game Crafting", "Python Programming", "Machine Learning"]
  },
  {
    id: "skills",
    titleAr: "مسار المهارات الناعمة (قريباً)",
    titleEn: "Soft Skills & Leadership (Future Horizon)",
    agesAr: "7 - 15 سنة",
    agesEn: "7 - 15 Years Old",
    descriptionAr: "شحذ المهارات القيادية والاجتماعية الهامة لعالم الغد! يركز هذا المسار المستقبلي على تطوير قدرات التفكير الناقد بأساليب ممتعة، والابتكار الحر، ومهارات العرض والتواصل الإيجابي مع الآخرين، ليكون طفلك شخصية مبدعة وقادرة على القيادة والتعاون ضمن فريق.",
    descriptionEn: "Cultivating leadership, creative expression, and analytical prowess. Children learn to deconstruct logic in teams, articulate thoughts clearly, and present their ideas eagerly.",
    color: "purple",
    iconName: "GraduationCap",
    isActive: false, // Locked state in ui
    giraffePose: 4, // Wearing science goggles with chemistry flask (Pose 4 from input_file_0.png)
    modulesAr: [
      "التفكير الناقد والمنطقي وحل المشكلات الحياتية بطرق تحليلية غير مألوفة",
      "أدوات التواصل الفعال والإلقاء الممتع ومخاطبة الجمهور مع طي حاجز التردد",
      "صناعة الابتكار وتصنيع مشاريع يدوية وتفكيك وفهم الاختراعات والعلوم من حولنا",
      "القيادة، إدارة المجموعات، والعمل الجماعي بتبادل الأدوار لتربية روح المبادرة الرياضي"
    ],
    modulesEn: [
      "Critical thinking loops, questioning techniques, and structural issue solving",
      "Creative verbal pitches: expressing innovative concepts directly & clearly avoiding shyness",
      "Open innovation structures: thinking out-of-the-box and assembling conceptual gears",
      "Interactive teamwork challenges, project co-ownership, and emotional leadership"
    ],
    skillsAr: ["التفكير الناقد", "التواصل الخارق", "الابتكار المفتوح", "القيادة والتعاون"],
    skillsEn: ["Critical Thinking", "Stellar Communication", "Open Innovation", "Cooperative Leadership"]
  }
];

export const STUDENT_PROJECTS: StudentProject[] = [
  {
    id: "proj_1",
    titleAr: "بطل الحساب الذهني الخارق",
    titleEn: "Mental Math Speed run",
    creatorAr: "زياد الشمري",
    creatorEn: "Ziyad Al-Shammari",
    age: 9,
    pathId: "math",
    descriptionAr: "تطبيق ممتع صممه بطلنا زياد يتحدى فيه المستخدمين لحل 10 مسائل للجمع والطرح التراكمي في 15 ثانية فقط! التطبيق يقوم بقياس ذكاء اللاعب واعتلاء صدارة النتائج.",
    descriptionEn: "A math flash game challenged parents to solve 10 cumulative addition/subtraction questions in less than 15 seconds. Coded with visual cards.",
    tagsAr: ["حساب ذهني", "حاسبة تفاعلية", "ألعاب منطق"],
    tagsEn: ["Mental Math", "Interactive Screen", "Logic Game"],
    likes: 184,
    iconType: "calculator",
    codeSnippet: `// Math Challenge Loop
let currentScore = 0;
let timer = 15;
function checkAnswer(userAnswer) {
  if (userAnswer === correctAnswer) {
    currentScore += 10;
    generateNextRound();
  }
}`
  },
  {
    id: "proj_3",
    titleAr: "تطبيق القاموس المصور اللفظي",
    titleEn: "Vocalized Pic-Dictionary",
    creatorAr: "جود الحربي",
    creatorEn: "Joud Al-Harbi",
    age: 11,
    pathId: "english",
    descriptionAr: "بابتكار استثنائي، صممت جود لوحة ناطقة تحتوي على حيوانات ومهن يومية، بضغط الأزرار تسمع الطفل النطق السليم للكلمة مصحوباً بفقرة وصفية ملهمة ومبهجة.",
    descriptionEn: "Coordinated action-button triggers to vocalize accurate pronunciations of everyday words paired with illustrative pictures and sentences.",
    tagsAr: ["لغات وصوتيات", "أزرار تفاعلية", "تحدث ونطق"],
    tagsEn: ["Phonics Speak", "Interactive Cards", "Visual Audio"],
    likes: 247,
    iconType: "ai",
    codeSnippet: `// Word speaker on tap
const audioMap = {
  giraffe: "The giraffe with a blue bowtie is reading a book!",
  laptop: "I am coding future tracks on my laptop."
};
function onCardTap(word) {
  playVoiceFile(audioMap[word]);
  highlightCardUI(word);
}`
  },
  {
    id: "proj_2",
    titleAr: "مغامرة الزرافة والنجوم السحرية",
    titleEn: "Giraffe Star Chase adventure",
    creatorAr: "سعود القحطاني",
    creatorEn: "Saud Al-Qahtani",
    age: 8,
    pathId: "math",
    descriptionAr: "نموذج بانت لقصة كرتونية مبهجة تتجاوز فيها الزرافة الباسمة عقبات برية وتقوم بجمع الأرقام الفردية لتأكل العشب اللذيذ وتصل لبيت المعرفة.",
    descriptionEn: "A spatial visual simulator where the mascot jumping across platforms collecting odd numbers to open the golden knowledge locks.",
    tagsAr: ["تصميم وتحريك", "قصة تفاعلية", "أعداد فردية"],
    tagsEn: ["Visual Animation", "Interactive Story", "Odd Numbers"],
    likes: 156,
    iconType: "animation",
    codeSnippet: `// Catch number logic
onCollision(mascot, numberNode) {
  if (numberNode.value % 2 !== 0) {
    playCatchEffect();
    mascot.score += 100;
    numberNode.destroy();
  } else {
    playOuchSound();
  }
}`
  },
  {
    id: "proj_4",
    titleAr: "حاسبة مصروف الأسبوع الذكية",
    titleEn: "Weekly Allowance Planner",
    creatorAr: "لينا العتيبي",
    creatorEn: "Lina Al-Otaibi",
    age: 10,
    pathId: "math",
    descriptionAr: "تطبيق مبسط يساعد الصغار على تخطيط مصروفهم الأسبوعي وتقسيمه بين التوفير، الهدايا، وشراء الكتب، مما يرسخ لديهم ذكاء الادخار المالي والتفكير السليم.",
    descriptionEn: "Utilizes structured loops to assist children to budget their weekly allowance between saving targets, sharing deeds, and technical reading assets.",
    tagsAr: ["ألعاب مالية", "حاسبة منطقية", "مصروف الطفل"],
    tagsEn: ["Financial Logic", "Smart Calculator", "Child Savings"],
    likes: 129,
    iconType: "calculator",
    codeSnippet: `// Allowance Calculator
function distributeAllowance(allowance) {
  let savings = allowance * 0.4;
  let charity = allowance * 0.1;
  let spendable = allowance * 0.5;
  return { savings, charity, spendable };
}`
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "starter",
    nameAr: "باقة مبتدئ (3 أشهر)",
    nameEn: "Starter Pack (3 Months)",
    priceAr: "500 ر.س",
    priceEn: "500 SAR",
    priceNum: 500,
    periodAr: "لكل 3 أشهر",
    periodEn: "for 3 months",
    sessionsAr: "12 حصة تفاعلية مباشرة (حصة بالأسبوع)",
    sessionsEn: "12 interactive live classes (1/week)",
    featuresAr: [
      "12 حصة مباشرة وجهاً لوجه عبر زووم (Live) مع مدربين متخصصين",
      "تقرير دوري شهري ومفصل لمستوى وأداء الطفل يرسل لولي الأمر",
      "شهادة متميزة ومعنوية وبطولة فخرية لتثمين فكره وإعداده",
      "تأسيس قوي لثقة الطفل والتغلب على مخاوف المشاركة",
      "حقيبة رقمية للأوراق الملونة وأوراق العمل التطبيقية المنزلية"
    ],
    featuresEn: [
      "12 live interactive 1-on-1/micro classes over Zoom",
      "Monthly comprehensive performance and strength reports for parents",
      "Official completion Certificate & moral badge to boost self-esteem",
      "Solid support system helping kids talk and express thoughts clearly",
      "Activity printables and downloadable interactive workbook slides"
    ]
  },
  {
    id: "intermediate",
    nameAr: "الباقة المتوسطة (6 أشهر)",
    nameEn: "Intermediate Pack (6 Months)",
    priceAr: "800 ر.س",
    priceEn: "800 SAR",
    priceNum: 800,
    periodAr: "لكل 6 أشهر",
    periodEn: "for 6 months",
    sessionsAr: "24 حصة مباشرة (حصتان بالأسبوع للتسريع البطيء)",
    sessionsEn: "24 interactive live classes (2/week alternative)",
    isPopular: true,
    featuresAr: [
      "24 حصة تفاعلية مباشرة ومحفزة عبر زووم",
      "تقارير دورية شهرية مستمرة ترسل لوالدي الطفل على الواتساب",
      "شهادة إتمام معتمدة وبطولة معنوية لكل مستوى دراسي ينهيه الطفل",
      "متابعة دورية فردية لتذليل معضلات النطق والعد الذهني الحسي",
      "أوراق مخصصة مطبوعة تفاعلية، مع أولوية حضور حصص المراجعة الأسبوعية",
      "دخول مجتمعات ستيم الطلابية الآمنة لتبادل الأفكار الملهمة"
    ],
    featuresEn: [
      "24 highly engaging live classes with passionate educators",
      "Comprehensive monthly learning indexes sent directly via WhatsApp",
      "Official signed Level Certificates and cognitive badges of honor",
      "Tailored focus to adjust pronunciation patterns or mental arithmetic speed",
      "Printed activity sheets and premium priority reservation access",
      "Access to secure STEM student forums to show off homework achievements"
    ]
  },
  {
    id: "professional",
    nameAr: "باقة الاحترافي المميّز (سنة كاملة)",
    nameEn: "Professional Champion (Full Year)",
    priceAr: "1200 ر.س",
    priceEn: "1200 SAR",
    priceNum: 1200,
    periodAr: "العضوية السنوية الكاملة",
    periodEn: "full academic year membership",
    sessionsAr: "48 حصة مباشرة حيوية شاملة للمسار بأكمله",
    sessionsEn: "48 live interactive classes for maximum progress",
    featuresAr: [
      "48 حصة تفاعلية مباشرة وممتازة تغطي المنهج الرياضي أو اللغوي التام",
      "متابعة دورية وهاتفية شاملة ومخطط نجاح مخصص ومكالمة لولي الأمر أساسية",
      "شهادة متميزة ودرع تفوق معنوي وهدايا تشجيعية ترسل لعنوانكم",
      "أوراق عمل مطبوعة ومستلزمات دراسية ملموسة تصلك لباب المنزل مجاناً",
      "أولوية قصوى لحجز واختيار الأوقات المريحة والمدربين المفضلين للطفل",
      "دخول دائم لجميع تحديات وورش عمل العباقرة ومسابقات المنصة الإضافية"
    ],
    featuresEn: [
      "48 complete live classes building full technical & cognitive mastery",
      "Comprehensive parent progress reviews & strategic milestone planning calls",
      "Premium Honor Certificate, wooden success medal shipped to your city",
      "Complimentary printed activities & physical homework folders delivered free",
      "Absolute priority to lock desirable schedules & match top-rated tutors",
      "Unlimited free entry to extra seasonal STEM hacking arenas & logic quizzes"
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test_1",
    nameAr: "أم أحمد (غادة الشهري)",
    nameEn: "Ghada Al-Shehri (Ahmad's Mother)",
    quoteAr: "الحمد لله، ابني أحمد (8 سنوات) تحول من كونه مستهلكاً لاهياً يعشق شاشات الألعاب فقط، إلى طالب يبحث بشغف عن حلول المسائل الحسابية ويفوق أقرانه بالسرعة والتخيل الرياضي! معلمة الرياضيات صبورة وتتفنن في تشجيع الطفل وتثمين فكره، والشهادة المعنوية والتقرير الشهري زادا ثقة ابني بنفسه بشكل لا يصدق.",
    quoteEn: "My 8-year-old son Ahmad turned from a passive gamer to an eager math explorer! The live Zoom lessons are beautifully crafted, and the teachers celebrate every little win. The printable charts and certificate changed Ahmed's confidence completely.",
    roleAr: "الرياض، المملكة العربية السعودية",
    roleEn: "Riyadh, Saudi Arabia",
    childNameAr: "والدة الطفل أحمد - مسار الحساب الذهني",
    childNameEn: "Mother of Ahmad - Mental Math Path",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    id: "test_2",
    nameAr: "أ. فيصل بن سعد",
    nameEn: "Faisal Bin Saad",
    quoteAr: "كولي أمر ومعلم، كنت قلقاً للغاية من تعثر ابني ريان (10 سنوات) في التعبير باللغة الإنجليزي ومخارج الكلمات، لكنه بعد انضمامه لمنصة ستيم تبخر الخوف تماماً! أصبح لديه طلاقة وقدرة شجاعة للحديث مع أقرانه بلا تردد. التقارير التي تصلنا أسبوعياً واضحة وعززت تواصلنا المستمر مع طاقم المنصة المميز.",
    quoteEn: "We were worried about Rayan's English speaking confidence. After starting the Zoom conversation path, his fears dissolved in the first 3 classes! He speaks naturally, writes short sentences, and loves showing off his accent.",
    roleAr: "جدة، المملكة العربية السعودية",
    roleEn: "Jeddah, Saudi Arabia",
    childNameAr: "والد البطل ريان - مسار المحادثة اللغوية",
    childNameEn: "Father of Rayan - Conversation Path",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    id: "test_3",
    nameAr: "أ. نورة العتيبي",
    nameEn: "Noura Al-Otaibi",
    quoteAr: "ابنتي جود تحب الزرافة والرسومات المصاحبة، فالحصص التفاعلية بمجموعات صغيرة تمكنها من الشرح والتعبير وأخذ حيزها الكامل دون الشعور بالإحراج كمجموعات المدرسة الضخمة. المنطق ممتع والرياضيات أصبحت شغفها الأول! ننتظر بفارغ الصبر بدء مسار البرمجة وحلقات القرن الـ 21 معهم.",
    quoteEn: "Joud loves the friendly giraffe companion! Tiny classes mean she gets to talk, solve riddles, and receive praise. She looks forward to her classes all week, and her grades in school have climbed significantly.",
    roleAr: "الدمام، المملكة العربية السعودية",
    roleEn: "Dammam, Saudi Arabia",
    childNameAr: "والدة المبدعة جود - مسار الرياضيات التطبيقية",
    childNameEn: "Mother of Joud - Applied Math Path",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80"
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: "faq_1",
    questionAr: "كيف يحضر الطفل الحصص والدروس التعليمية؟",
    questionEn: "How do children attend the live sessions?",
    answerAr: "الحصص تفاعلية ومباشرة (Live) 100% مع معلمين متخصصين، وتُبث في مواعيد مرنة ومريحة ومحددة مسبقاً عبر تطبيق زووم (Zoom). يتواصل فيها المدرب وجهاً لوجه مع الطلاب ويمارسون الألعاب والتفكير معاً بكفاءة وتفاعل شديد.",
    answerEn: "Sessions are 100% live and interactive with specialized child-ready educators, conducted weekly in comfortable pre-selected slots via Zoom. Tutors speak directly with kids, practice live mental math/speech, and enjoy collaborative logic puzzles."
  },
  {
    id: "faq_2",
    questionAr: "هل الأسعار المعلنة شاملة لجميع المواد والمسارات؟",
    questionEn: "Does the pricing cover all courses and paths?",
    answerAr: "الأسعار مبسطة وواضحة جداً وخالية من الرسوم الخفية! نعم، السعر المحدد للباقة الواحدة يشمل التغطية الكاملة وحضور جميع حصص المسار المختار (سواء مسار الرياضيات والحساب الذهني، أو مسار اللغة الإنجليزية للمبتدئين)، مع تذليل التقارير والشهادات بلا رسوم إضافية.",
    answerEn: "Yes, our prices represent complete cost transparency. The selected tier covers all class credits, continuous WhatsApp progress briefings, level-completion certificates, and printable sheets for your chosen path without any hidden extras."
  },
  {
    id: "faq_3",
    questionAr: "ما هو عدد الأطفال المتواجدين في المجموعة والحصة الواحدة؟",
    questionEn: "What is the maximum group size for class circles?",
    answerAr: "من أجل تأمين اهتمام فائق وتأسيس مجهري سليم وعلمي، نقوم بتقسيم الطلاب في مجموعات ميكرو متجانسة لا تتعدى 4 أطفال فقط في الحصة الواحدة! هذا يضمن للمعلم السماع لكل طفل بدقة واحترام وتدعيم نقاط تميزه الفردية.",
    answerEn: "To guarantee peak focus and customized development, our groups are kept extremely tiny, capped at a maximum of 4 children per class! Tutors can interact individually, listen to every word, and give accurate psychological guidance."
  },
  {
    id: "faq_4",
    questionAr: "ما هي الأجهزة التي يحتاجها طفلي للبدء؟",
    questionEn: "What devices do we need to prepare compile classes?",
    answerAr: "كل ما يحتاجه البطل الصغير هو جهاز كمبيوتر (عادي أو محمول لابتوب) أو جهاز آيباد/تابلت مزود بكاميرا وميكروفون متصل بشبكة إنترنت مستقرة. لا حاجة لشراء برامج أو معدات باهظة، فمدخلنا تفاعلي ويبدأ بكل بساطة بمشاركة الشاشات المتداولة.",
    answerEn: "Your child only needs a desktop computer, laptop, or an iPad/tablet equipped with a functional built-in camera, microphone, and a stable internet connection. No expensive hardware or software is requested to join our circles."
  },
  {
    id: "faq_5",
    questionAr: "كيف تساعد التقارير والبطولات المعنوية في تطور نفسية الطفل؟",
    questionEn: "How do milestone certificates boost my child's psyche?",
    answerAr: "نحن نركز بقوة على النمو النفسي للطفل! في نهاية كل مرحلة، نمنح شهادة إتمام وبطولة معنوية جذابة، ومعها تقرير أداء أسبوعي ملون لولي الأمر. هذا التقدير المستمر يعزز ثقة طفلك في المدرسة، ويربط التعلم بالفخر الداخلي والسلوك البهيج.",
    answerEn: "We place heavy emphasis on child emotional mechanics! Level completion certificates, monthly praise reports, and moral champion metrics show kids that their hard work is valued, transforming study into pure confidence and school pride."
  }
];
