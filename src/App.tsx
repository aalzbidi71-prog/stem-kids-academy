import React, { useState } from "react";
import { Language, StudentProject } from "./types";
import { COURSE_PATHS, STUDENT_PROJECTS, PRICING_PLANS, TESTIMONIALS, FAQ_ITEMS } from "./data";
import StudentProjectSandbox from "./components/StudentProjectSandbox";
import StemMascotAI from "./components/StemMascotAI";
import PricingCalculator from "./components/PricingCalculator";
import GiraffeMascot from "./components/GiraffeMascot";
import {
  Menu,
  X,
  Phone,
  Mail,
  CheckCircle,
  HelpCircle,
  Sparkles,
  Users,
  MessageCircle,
  GraduationCap,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Cpu,
  Bookmark,
  ExternalLink,
  Laptop,
  Lock,
  Trophy,
  ShieldCheck,
  CreditCard,
  Globe,
  Code2,
  Terminal,
  Crown,
  Award,
  Lightbulb,
  Languages,
  Target,
  Calculator,
  Star
} from "lucide-react";

export default function App() {
  const [lang, setLang] = useState<Language>("ar");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Active student project ID
  const [activeProjId, setActiveProjId] = useState("proj_1");
  const activeProject = STUDENT_PROJECTS.find((p) => p.id === activeProjId) || STUDENT_PROJECTS[0];

  // Liked projects list tracker
  const [likedProjects, setLikedProjects] = useState<string[]>([]);
  const handleLikeProject = (id: string) => {
    if (likedProjects.includes(id)) {
      setLikedProjects((prev) => prev.filter((item) => item !== id));
    } else {
      setLikedProjects((prev) => [...prev, id]);
    }
  };

  // FAQ Expanded list tracker
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>("faq_1");
  const toggleFaq = (id: string) => {
    setExpandedFaqId(expandedFaqId === id ? null : id);
  };

  // Academic Tracks Tabbed Interface State (math, english, programming, skills)
  const [activeTrackId, setActiveTrackId] = useState<string>("math");

  // Modern Checkout Modal State - CRO Feature!
  const [checkoutPlan, setCheckoutPlan] = useState<typeof PRICING_PLANS[0] | null>(null);
  const [paymentStep, setPaymentStep] = useState<"form" | "loading" | "success">("form");
  const [billingCycle, setBillingCycle] = useState<"quarterly" | "yearly">("quarterly");
  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0); // in percent
  const [promoApplied, setPromoApplied] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVV, setCardCVV] = useState("");

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.toUpperCase() === "STEM10" || promoCode === "ستيم10") {
      setPromoDiscount(10);
      setPromoApplied(true);
    } else {
      alert(lang === "ar" ? "كوبون الخصم غير صحيح أو منتهي الصلاحية!" : "Invalid or expired promo code!");
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentStep("loading");
    setTimeout(() => {
      setPaymentStep("success");
    }, 2000);
  };

  const handleOpenCheckout = (planOrId: string | typeof PRICING_PLANS[0], calculatedPrice?: number) => {
    let selectedPlan;
    if (typeof planOrId === "string") {
      selectedPlan = PRICING_PLANS.find(p => p.id === planOrId);
    } else {
      selectedPlan = planOrId;
    }

    if (selectedPlan) {
      if (calculatedPrice !== undefined) {
        selectedPlan = {
          ...selectedPlan,
          priceAr: `${calculatedPrice} ريال`,
          priceEn: `${calculatedPrice} SAR`,
        };
      }
      setCheckoutPlan(selectedPlan);
      setPaymentStep("form");
      setPromoApplied(false);
      setPromoCode("");
      setPromoDiscount(0);
      setCardNumber("");
      setCardHolder("");
      setCardExpiry("");
      setCardCVV("");
    }
  };

  // Navigation Links definition
  const navLinks = [
    { titleAr: "الرئيسية", titleEn: "Home", href: "#" },
    { titleAr: "المسارات", titleEn: "STEM Tracks", href: "#tracks" },
    { titleAr: "منهجية Live", titleEn: "Live Method", href: "#why-stem" },
    { titleAr: "مختبر المشاريع", titleEn: "Interactive Sandbox", href: "#projects" },
    { titleAr: "المستشار الذكي", titleEn: "Smart Chat Advisor", href: "#ai-assistant" },
    { titleAr: "الباقات", titleEn: "Subscription Tiers", href: "#plans" },
    { titleAr: "الأسئلة", titleEn: "FAQ", href: "#faq" },
  ];

  const handleLangToggle = () => {
    setLang(lang === "ar" ? "en" : "ar");
  };

  return (
    <div
      className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased overflow-x-hidden"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      {/* 1. Header / Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-pink-100/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Brand area */}
          <a href="#" className="flex items-center gap-2 group">
            <img 
              src="/input_file_3.png" 
              className="h-12 sm:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
              alt={lang === "ar" ? "منصة ستيم التعليمية" : "STEM Platform Logo"}
              referrerPolicy="no-referrer"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-5 text-sm font-bold text-gray-600">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="hover:text-pink-600 transition-colors px-1 py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-pink-500 after:transition-all pointer-events-auto"
              >
                {lang === "ar" ? link.titleAr : link.titleEn}
              </a>
            ))}
          </nav>

          {/* Call to Actions & Lang Switcher */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Lang Switcher Button */}
            <button
              type="button"
              onClick={handleLangToggle}
              className="bg-white border border-pink-100 hover:bg-pink-50/50 text-gray-700 hover:text-slate-900 px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 focus:outline-none cursor-pointer text-right lg:text-left"
            >
              <Globe size={14} className="text-pink-500 shrink-0" />
              <span>{lang === "ar" ? "EN" : "AR"}</span>
            </button>

            {/* Support Number */}
            <a
              href="https://wa.me/966500000000"
              target="_blank"
              rel="noreferrer noopener"
              className="text-emerald-700 hover:text-emerald-800 font-bold text-xs flex items-center gap-1 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100"
            >
              <Phone size={13} />
              <span>{lang === "ar" ? "تواصل واتساب" : "WhatsApp Support"}</span>
            </a>

            {/* Enroll CTA */}
            <a
              href="#plans"
              className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white transition-all font-black text-xs py-3 px-6 rounded-2xl flex items-center gap-1.5 shadow-md hover:shadow-lg hover:-translate-y-0.5 transform tracking-wider pointer-events-auto"
            >
              <span>{lang === "ar" ? "اشترك الآن" : "Enroll Today"}</span>
              {lang === "ar" ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
            </a>
          </div>

          {/* Mobile menu controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={handleLangToggle}
              className="bg-pink-50/50 border border-pink-100 text-pink-700 px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer"
            >
              {lang === "ar" ? "EN" : "عربي"}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 w-full bg-white border-b border-pink-100 p-6 space-y-4 shadow-xl z-50 animate-fade-in relative">
            <div className="flex flex-col gap-3 font-semibold text-gray-700 text-sm">
              {navLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-pink-500 transition-colors pointer-events-auto"
                >
                  {lang === "ar" ? link.titleAr : link.titleEn}
                </a>
              ))}
            </div>
            
            <div className="h-px bg-pink-100/50 my-4" />

            <div className="flex flex-col gap-3 text-xs font-bold">
              <a
                href="#plans"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-2xl shadow pointer-events-auto"
              >
                {lang === "ar" ? "اشترك الآن بالباقات" : "Explore Pricing Plans"}
              </a>
              <a
                href="https://wa.me/966500000000"
                target="_blank"
                rel="noreferrer noopener"
                className="w-full text-center py-2.5 rounded-2xl border border-emerald-200 bg-emerald-50 text-emerald-700 flex items-center justify-center gap-1.5"
              >
                <Phone size={14} />
                {lang === "ar" ? "الاستفسار عبر الواتساب" : "Direct WhatsApp Support"}
              </a>
            </div>
          </div>
        )}
      </header>

      {/* 2. Hero Section */}
      <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24 bg-gradient-to-b from-amber-50 via-white to-slate-50">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Text details column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-right">
              
              {/* Badge item */}
              <div className="inline-flex items-center gap-1.5 bg-pink-500/10 text-pink-600 px-4 py-1.5 rounded-full text-xs font-black font-sans tracking-wide">
                <Sparkles size={13} className="text-pink-500 fill-pink-500 animate-bounce" />
                <span>{lang === "ar" ? "تعلم مباشر للأطفال بهوية زرافة ستيم" : "Live, playful STEM learning for kids"}</span>
              </div>

              {/* Title display */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-950 tracking-tight leading-tight font-sans">
                {lang === "ar" ? (
                  <>
                    منصة ستيم التعليمية{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-600 to-amber-500 block sm:inline">
                      بثقة ومتعة
                    </span>
                  </>
                ) : (
                  <>
                    STEM Educational Platform:{"  "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-600 to-amber-500 block sm:inline">
                      21st Century Skills
                    </span>
                  </>
                )}
              </h1>

              {/* Subtitle description */}
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-sans max-w-2xl mx-auto lg:mx-0">
                {lang === "ar"
                  ? "حصص مباشرة ومسارات قصيرة تساعد الطفل على فهم الرياضيات، اللغة، البرمجة، والتفكير العلمي بتجربة مرئية لطيفة وواضحة."
                  : "We inspire today's minds to craft tomorrow's capabilities. Engaging live Zoom classrooms, custom pathways, and interactive logic coaching."}
              </p>

              {/* CTA buttons group */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <a
                  href="#plans"
                  className="w-full sm:w-auto text-center bg-gradient-to-r from-pink-500 via-rose-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-black text-sm py-4 px-10 rounded-2xl shadow-xl hover:shadow-pink-500/25 transition-all hover:-translate-y-0.5 transform tracking-wider pointer-events-auto"
                >
                  {lang === "ar" ? "احجز مقعد الطفل" : "Enroll Now"}
                </a>

                <a
                  href="#tracks"
                  className="w-full sm:w-auto text-center bg-white border border-pink-100 hover:bg-pink-50/40 text-gray-700 font-bold text-sm py-4 px-8 rounded-2xl shadow transition-colors pointer-events-auto"
                >
                  {lang === "ar" ? "استكشف المسارات" : "Explore Academic Tracks"}
                </a>
              </div>

              {/* Highlight metrics */}
              <div className="grid grid-cols-3 gap-4 pt-6 text-center lg:text-right">
                <div className="bg-white/80 p-3 rounded-2xl border border-pink-50">
                  <span className="text-2xl sm:text-3xl font-black text-gray-950 font-mono block text-pink-600">98%</span>
                  <span className="text-xs text-gray-500 font-medium">
                    {lang === "ar" ? "رضا الأسر" : "Parent Satisfaction"}
                  </span>
                </div>
                <div className="bg-white/80 p-3 rounded-2xl border border-pink-50">
                  <span className="text-2xl sm:text-3xl font-black text-gray-950 font-mono block text-amber-600">350+</span>
                  <span className="text-xs text-gray-500 font-medium">
                    {lang === "ar" ? "نشاط وتحدي" : "Interactive Exercises"}
                  </span>
                </div>
                <div className="bg-white/80 p-3 rounded-2xl border border-pink-50">
                  <span className="text-2xl sm:text-3xl font-black text-gray-950 font-mono block text-pink-600">1:4</span>
                  <span className="text-xs text-gray-500 font-medium">
                    {lang === "ar" ? "طلاب لكل مجموعة" : "Max Ratio (1:4)"}
                  </span>
                </div>
              </div>

            </div>

            {/* Illustration column - strategically houses the mascot and interactive specs */}
            <div className="lg:col-span-5 relative flex justify-center items-center">
              
              {/* Outer decorative soft color ring */}
              <div className="w-72 h-72 sm:w-96 sm:h-96 bg-yellow-400/10 rounded-full absolute -rotate-12 blur-md" />

              {/* Hero visual panel with mascot pose */}
              <div className="relative w-full max-w-sm bg-white rounded-3xl border border-pink-100/60 shadow-2xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
                
                {/* Clean child-friendly header tagline without mock console indicators */}
                <div className="flex justify-between items-center text-xs font-bold text-pink-600">
                  <span className="tracking-widest uppercase font-mono">{lang === "ar" ? "أكاديمية ستيم التفاعلية" : "STEM LIVE ACADEMY"}</span>
                  <Sparkles size={14} className="animate-pulse text-yellow-500" />
                </div>

                {/* Placing Mascot in pose 1 "Greeting Giraffe" */}
                <div className="flex-1 flex flex-col justify-center items-center relative z-10 py-6">
                  
                  {/* Glowing core light behind customized mascot */}
                  <div className="absolute w-40 h-40 bg-yellow-400/25 blur-3xl rounded-full"></div>

                  {/* High quality mascot container */}
                  <div className="relative transform hover:scale-105 transition-all duration-300">
                    <GiraffeMascot pose={1} className="w-52 h-52 drop-shadow-2xl" />
                    
                    {/* Tiny visual bubble greeting in Arabic */}
                    <div className="absolute -top-6 -right-10 bg-gradient-to-br from-pink-500 to-rose-500 text-white font-black text-xs px-3 py-1.5 rounded-2xl shadow-lg border-2 border-white transform rotate-3 flex items-center gap-1">
                      <span>{lang === "ar" ? "أهلاً بالعباقرة!" : "Hi, smart children!"}</span>
                      <Sparkles size={11} className="animate-pulse" />
                    </div>
                  </div>

                </div>

                {/* Sub text badge bottom of hero card */}
                <div className="flex justify-between items-center text-xs font-bold text-gray-800 relative z-10 pt-4 border-t border-pink-50">
                  <span className="flex items-center gap-1 text-emerald-600">
                    <CheckCircle size={13} className="text-emerald-500" />
                    {lang === "ar" ? "حصص تفاعلية مباشرة عبر زووم" : "Live Zoom tutoring"}
                  </span>
                  <span className="text-pink-600 font-extrabold">
                    {lang === "ar" ? "تطوير حسي ومادي" : "Aesthetic Learning"}
                  </span>
                </div>

                {/* Dynamic micro floating badge illustrating child success */}
                <div className="absolute bottom-16 right-4 bg-white text-slate-800 px-3.5 py-2 rounded-xl text-[10px] font-bold shadow-md border border-pink-100/50 flex items-center gap-1 animate-pulse">
                  <Trophy size={12} className="text-yellow-500" />
                  <span>{lang === "ar" ? "منهج تفاعلي جذاب" : "Active Syllabus"}</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. SECTION 2: WHAT WE OFFER / ACADEMIC TRACKS (تبويبات تفاعلية للمسارات) */}
      <section className="py-20 bg-white border-y border-pink-50" id="tracks">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-extrabold text-pink-600 uppercase tracking-widest block font-mono">
              {lang === "ar" ? "المحتوى الأكاديمي والمسارات المعتمدة" : "UNIFIED STEM FRAMEWORK"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-990 leading-tight">
              {lang === "ar" ? "مساراتنا الدراسية التفاعلية المخصصة للأطفال" : "Discover Our Advanced Multi-Track Curricula"}
            </h2>
            <p className="text-slate-600 text-sm font-sans">
              {lang === "ar"
                ? "قسّمنا المناهج في منصة ستيم بطرق جاذبة وتفاعلية للغاية. اضغط على أي تبويب بالأسفل لاستكشاف تفاصيل المسار!"
                : "Explore our dynamic pathways designed directly by academic advisors to ensure maximum conversion under fun models."}
            </p>
          </div>

          {/* Interactive tabs bar */}
          <div className="flex bg-slate-100 p-1.5 rounded-2xl max-w-4xl mx-auto mb-10 overflow-x-auto gap-2 text-xs md:text-sm font-bold shadow-inner">
            
            {/* Tab 1: Math */}
            <button
              type="button"
              onClick={() => setActiveTrackId("math")}
              className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTrackId === "math"
                  ? "bg-white text-gray-900 shadow-sm border border-yellow-200"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <Calculator size={16} className="text-yellow-500 shrink-0" />
              <span>{lang === "ar" ? "مسار الحساب الذهني" : "Math & Logic"}</span>
            </button>

            {/* Tab 2: English */}
            <button
              type="button"
              onClick={() => setActiveTrackId("english")}
              className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTrackId === "english"
                  ? "bg-white text-gray-900 shadow-sm border border-pink-200"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <Languages size={17} className="text-pink-500 shrink-0" />
              <span>{lang === "ar" ? "مسار اللغة الإنجليزية" : "English Phonics"}</span>
            </button>

            {/* Tab 3: Programming (Ready!) */}
            <button
              type="button"
              onClick={() => setActiveTrackId("programming")}
              className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTrackId === "programming"
                  ? "bg-white text-gray-900 shadow-sm border border-indigo-200"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <Code2 size={16} className="text-indigo-500 shrink-0" />
              <span>{lang === "ar" ? "مسار البرمجة للأطفال" : "Coding & Games"}</span>
            </button>

            {/* Tab 4: Soft Skills (Locked - Coming Soon) */}
            <button
              type="button"
              onClick={() => setActiveTrackId("skills")}
              className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap relative ${
                activeTrackId === "skills"
                  ? "bg-white text-gray-900 shadow-sm border border-pink-200"
                  : "text-gray-450 hover:text-gray-900"
              }`}
            >
              <Lock size={12} className="text-gray-400" />
              <span>{lang === "ar" ? "المهارات الناعمة" : "Soft Skills"}</span>
              <span className="absolute -top-2.5 right-1.5 bg-pink-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase scale-85">
                {lang === "ar" ? "قريباً" : "Soon"}
              </span>
            </button>

          </div>

          {/* Tab content panel */}
          <div className="max-w-5xl mx-auto bg-gradient-to-br from-slate-50 to-white rounded-3xl p-6 sm:p-10 border border-pink-100 shadow-xl">
            
            {/* Active math track */}
            {activeTrackId === "math" && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-8 space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="bg-yellow-105 text-yellow-805 text-[10px] font-black px-3 py-1 rounded-full tracking-wide uppercase">{lang === "ar" ? "متاح حالياً ومسجل" : "Active Registration Available"}</span>
                    <span className="text-xs text-gray-550 font-semibold flex items-center gap-1">
                      <Users size={13} className="text-pink-500 shrink-0" />
                      <span>{lang === "ar" ? "للأعمار: 5 - 12 سنة" : "Ages 5-12"}</span>
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-black text-gray-900 leading-tight">
                    {lang === "ar" ? "مسار الرياضيات والحساب الذهني العملي" : "Applied Mental Arithmetic & Abacus Logic"}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans">
                    {lang === "ar"
                      ? "نوجه الطفل لتجاوز جمود الأرقام ومخاوف الحساب بالاعتماد على التخيل الصوري والعداد الياباني سوروبان. يكتسب الطفل سرعة مذهلة في الجمع والطرح التراكمي وتتحسن قوة ذاكرته بمقدار 4 أضعاف في أول 30 يوماً."
                      : "We guide the child to cross the calculation barrier using abacus visualization techniques. They secure robust mental math speed."}
                  </p>

                  <div className="space-y-3.5 pt-2">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">{lang === "ar" ? "المهارات والدروس الأساسية في المسار:" : "Core Curriculum Milestones:"}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-700">
                      <div className="flex gap-2 items-center">
                        <span className="text-emerald-550 font-bold">✓</span>
                        <span>{lang === "ar" ? "فهم الأرقام وتصميم علاقاتها البصرية" : "Mental abacus coordinates"}</span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <span className="text-emerald-550 font-bold">✓</span>
                        <span>{lang === "ar" ? "تعديل تقنيات الضرب التخيلي السريع" : "Visual speed arithmetic exercises"}</span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <span className="text-emerald-550 font-bold">✓</span>
                        <span>{lang === "ar" ? "حل الألغاز التراكمية في ثوانٍ" : "Double-digit mental checks"}</span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <span className="text-emerald-550 font-bold">✓</span>
                        <span>{lang === "ar" ? "رفع معدل التركيز والذاكرة الصورية" : "Sensory and focus empowerment"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex gap-4">
                    <a href="#plans" className="bg-pink-500 hover:bg-pink-650 text-white font-bold text-xs py-3 px-6 rounded-xl shadow cursor-pointer transition-transform">
                      {lang === "ar" ? "سجل طفلك في هذا المسار" : "Enroll Child In Math Today"}
                    </a>
                  </div>
                </div>

                <div className="md:col-span-4 flex flex-col items-center p-6 bg-yellow-50/40 rounded-2xl border border-yellow-100 shadow-premium">
                  <GiraffeMascot pose={2} className="w-36 h-36 drop-shadow-md mb-2" />
                  <span className="text-[10px] text-amber-800 font-bold text-center block">
                    {lang === "ar" ? "الزرافة تقرأ كتابًا وتتخيل الأرقام" : "Giraffe reading and imagining numbers"}
                  </span>
                </div>
              </div>
            )}

            {/* Active english track */}
            {activeTrackId === "english" && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-8 space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="bg-pink-105 text-pink-805 text-[10px] font-black px-3 py-1 rounded-full tracking-wide uppercase">{lang === "ar" ? "متاح حالياً ومسجل" : "Active Registration Available"}</span>
                    <span className="text-xs text-gray-550 font-semibold flex items-center gap-1">
                      <Users size={13} className="text-pink-500 shrink-0" />
                      <span>{lang === "ar" ? "للأعمار: 6 - 12 سنة" : "Ages 6-12"}</span>
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-black text-gray-900 leading-tight">
                    {lang === "ar" ? "مسار اللغة الإنجليزية والطلاقة الصوتية" : "Modern English Phonics & Public Speaking"}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans">
                    {lang === "ar"
                      ? "نركّز على كسر الخوف الطبيعي والتردد عند التكلم بالإنجليزية لدى الأطفال عبر ميثودولوجيا فونوغرافية (Phonics) حسية وعالمية. يكتسب طفلك مخارج الأحرف واللفظ السليم ويغوص بحكايات كرتونية مبهجة ليتعلم محادثة الطلاقة بوعي."
                      : "Construct conversational confidence using Phonics strategies. Interactive stories and small group zoom classes."}
                  </p>

                  <div className="space-y-3.5 pt-2">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">{lang === "ar" ? "المهارات والدروس الأساسية في هذا المسار:" : "Core Curriculum Milestones:"}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-700">
                      <div className="flex gap-2 items-center">
                        <span className="text-emerald-555 font-bold">✓</span>
                        <span>{lang === "ar" ? "مخارج الأحرف السليمة (Classic Phonics)" : "Phonograms & vowel matching"}</span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <span className="text-emerald-555 font-bold">✓</span>
                        <span>{lang === "ar" ? "إلقاء القصص القصيرة بثقة شجاعة" : "Short story narration with ease"}</span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <span className="text-emerald-555 font-bold">✓</span>
                        <span>{lang === "ar" ? "حوارات ونقاشات تفاعلية حية دورية" : "Interactive live discussions with zoom peers"}</span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <span className="text-emerald-555 font-bold">✓</span>
                        <span>{lang === "ar" ? "بناء حصيلة تزيد عن 800 كلمة نموذجية" : "A vocabulary bank of 800+ words"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <a href="#plans" className="bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs py-3 px-6 rounded-xl shadow cursor-pointer transition-colors">
                      {lang === "ar" ? "سجل طفلك في هذا المسار" : "Enroll Child In English"}
                    </a>
                  </div>
                </div>

                <div className="md:col-span-4 flex flex-col items-center p-6 bg-pink-50/40 rounded-2xl border border-pink-100 shadow-premium">
                  <GiraffeMascot pose={2} className="w-36 h-36 drop-shadow-md mb-2" />
                  <span className="text-[10px] text-pink-850 font-bold text-center block">
                    {lang === "ar" ? "الزرافة تراجع مفردات الأحرف واللفظ السليم" : "Giraffe practicing phonics and novel words"}
                  </span>
                </div>
              </div>
            )}

            {/* Active programming track */}
            {activeTrackId === "programming" && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-8 space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="bg-indigo-105 text-indigo-805 text-[10px] font-black px-3 py-1 rounded-full tracking-wide uppercase">{lang === "ar" ? "متاح حالياً ومسجل" : "Active Registration Available"}</span>
                    <span className="text-xs text-gray-550 font-semibold flex items-center gap-1">
                      <Users size={13} className="text-pink-500 shrink-0" />
                      <span>{lang === "ar" ? "للأعمار: 6 - 15 سنة" : "Ages 6-15"}</span>
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-black text-gray-900 leading-tight">
                    {lang === "ar" ? "مسار البرمجة وصناعة الألعاب والذكاء الاصطناعي" : "Coding, Game Development & AI Path"}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-gray-655 leading-relaxed font-sans">
                    {lang === "ar"
                      ? "نقل الطفل من مستهلك للتكنولوجيا إلى صانع ومبتكر لها! يبدأ المسار بأساسيات التفكير البرمجي التفاعلي والسحب والإفلات، تدريجياً وبمتعة يتدرج الطفل حتى يكتب الأكواد الحقيقية بلغة بايثون Python ويصنع نماذج ذكاء اصطناعي قوية تُنمّي تفكيره الرياضي والمنطقي."
                      : "Convert your child from a technology consumer into a tech creator! Kids progress from visual blocks in Scratch to full text programming via Python and design real smart AI classifiers."}
                  </p>

                  <div className="space-y-3.5 pt-2">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">{lang === "ar" ? "المهارات والدروس الأساسية في هذا المسار:" : "Core Curriculum Milestones:"}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-700">
                      <div className="flex gap-2 items-center">
                        <span className="text-indigo-600 font-bold">✓</span>
                        <span>{lang === "ar" ? "التفكير الخوارزمي والمشروط وحلقات التكرار" : "Algorithmic thinking and variables"}</span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <span className="text-indigo-600 font-bold">✓</span>
                        <span>{lang === "ar" ? "برمجة ألعاب كاملة ومحاكاتها على Scratch" : "2D Game development in Scratch"}</span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <span className="text-indigo-600 font-bold">✓</span>
                        <span>{lang === "ar" ? "كتابة شيفرات بايثون الحقيقية للتطبيقات" : "Real text Python script writing"}</span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <span className="text-indigo-600 font-bold">✓</span>
                        <span>{lang === "ar" ? "تدريب الذكاء الاصطناعي للتعرف البصري والبيانات" : "Training Machine Learning filters"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <a href="#plans" className="bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs py-3 px-6 rounded-xl shadow cursor-pointer transition-colors">
                      {lang === "ar" ? "سجل طفلك في هذا المسار" : "Enroll Child In Coding"}
                    </a>
                  </div>
                </div>

                <div className="md:col-span-4 flex flex-col items-center p-6 bg-indigo-50/40 rounded-2xl border border-indigo-100 shadow-premium">
                  <GiraffeMascot pose={3} className="w-36 h-36 drop-shadow-md mb-2" />
                  <span className="text-[10px] text-indigo-850 font-bold text-center block">
                    {lang === "ar" ? "الزرافة تبرمج بحماس وتدير الكود" : "Giraffe programming on her laptop with logic"}
                  </span>
                </div>
              </div>
            )}

            {/* Active skills track (Soft Skills) - Locked */}
            {activeTrackId === "skills" && (
              <div className="text-center py-10 space-y-4">
                <Lock size={44} className="mx-auto text-pink-400 animate-bounce" />
                <h4 className="text-xl font-bold text-gray-900">
                  {lang === "ar" ? "مسار المهارات الناعمة لتطوير السلوك والذكاء الوجداني (قريباً)" : "Soft Skills & Adaptive Leadership Path (Coming Soon)"}
                </h4>
                <p className="text-xs text-gray-500 max-w-lg mx-auto leading-relaxed font-sans">
                  {lang === "ar"
                    ? "بناء ثقة الطفل وجينات القيادة النادرة! سيتعلم طفلك مهارات التقديم والخطابة الممتازة أمام الجمهور، التفكير الإبداعي والتبادل القيادي لحل المشكلات المعقدة والعمل بإيجابية داخل الفريق."
                    : "Unlocking children's inner voice and leadership charisma! Includes visual public speaking drills, problem parsing and team brainstorming."}
                </p>
                <div className="inline-flex bg-pink-50 border border-pink-100 px-4 py-2 rounded-xl text-xs font-bold text-pink-700 items-center gap-1.5">
                  <Users size={13} className="text-pink-500 shrink-0" />
                  <span>{lang === "ar" ? "للأعمار: 7 - 15 سنة" : "Target: Ages 7-15"}</span>
                </div>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* 4. SECTION 3: THE LIVE METHOD & EMOTIONAL VALUES (ميثودولوجيا حصص زووم التفاعلية) */}
      <section className="py-20 bg-slate-50" id="why-stem">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Mascot column - strategically houses Pose 4 and Pose 5 in borderless minimalist cards */}
            <div className="lg:col-span-5 flex flex-col gap-6 w-full max-w-md mx-auto">
              
              {/* Card 1: Pose 4 - Running with a Football Giraffe */}
              <div className="relative bg-white p-6 rounded-2xl border border-pink-100 shadow-premium hover:shadow-premium-hover transition-all duration-300 text-center select-none">
                <div className="absolute -top-3 right-6 bg-pink-500 text-white font-black text-[8px] px-3 py-1 rounded-full uppercase tracking-wider">
                  {lang === "ar" ? "حصص تفاعلية" : "ACTIVE LIVE STUDY"}
                </div>
                <GiraffeMascot pose={4} className="w-36 h-36 drop-shadow-lg mx-auto mb-3" />
                <h4 className="text-sm font-black text-gray-900 mb-1">
                  {lang === "ar" ? "نشاط وحركة ومنافسة مبهجة" : "Interactive Energy & Active Play"}
                </h4>
                <p className="text-[11px] text-gray-500 font-medium leading-relaxed font-sans">
                  {lang === "ar" 
                    ? "تأخذ زرافة ستيم النشطة بأيدي الأطفال للتحدي والمشاركة وإضفاء جو حماسي تفاعلي لايف في زووم." 
                    : "The energetic sporty giraffe triggers active physical and digital gameplay to keep kids focused."}
                </p>
              </div>

              {/* Card 2: Pose 5 - Scientific Explorer Giraffe (Parent Features) */}
              <div className="relative bg-white p-6 rounded-2xl border border-pink-100 shadow-premium hover:shadow-premium-hover transition-all duration-300 text-center select-none">
                <div className="absolute -top-3 left-6 bg-amber-400 text-slate-950 font-black text-[8px] px-3 py-1 rounded-full uppercase tracking-wider">
                  {lang === "ar" ? "تقارير وتحليل للأهالي" : "PARENT FEATURES & REPORTING"}
                </div>
                <GiraffeMascot pose={5} className="w-36 h-36 drop-shadow-lg mx-auto mb-3" />
                <h4 className="text-sm font-black text-gray-900 mb-1">
                  {lang === "ar" ? "تقارير ذكائية دقيقة مدعومة بالعلوم" : "Scientific Analytics & Support"}
                </h4>
                <p className="text-[11px] text-gray-500 font-medium leading-relaxed font-sans">
                  {lang === "ar" 
                    ? "تقوم الزرافة العالمة بتحليل تفاعل طفلك وقياس تفكيره الرياضي والمنطقي وموافاتكم بتقارير دقيقة شهرياً وبشهادات." 
                    : "The scientific explorer draft evaluates student logic capabilities, delivering formal diagnostics and certifications."}
                </p>
              </div>

            </div>

            {/* Grid checklist details */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-black text-pink-600 uppercase tracking-widest block font-mono">
                {lang === "ar" ? "ميثودولوجيا الفصل الدراسي التفاعلي" : "THE ZOOMEAN EXPERIENCE"}
              </span>

              <h2 className="text-3xl font-black text-gray-900 leading-tight">
                {lang === "ar" ? "كيف تبني ميثودولوجيا ستيم ثقة عريضة لدى طفلك؟" : "How does the live Zoom classroom structure work?"}
              </h2>

              <p className="text-sm text-gray-600 leading-relaxed font-sans">
                {lang === "ar"
                  ? "لا نقدم مجرد كورس مسجل بارد! فصولنا حية وتفاعلية عبر زووم، تحت إشراف أفضل الخبراء التربويين في المملكة. نراقب استجابات الطفل ونقيس قدراته بدقة ليرتقي معنوياً وفكرياً."
                  : "We completely reject flat standard video playlists. All sessions are 100% face-to-face active Zoom lessons targeting core capabilities."}
              </p>

              {/* Feature Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 text-xs">
                
                {/* Feature 1 */}
                <div className="bg-white p-5 rounded-2xl border border-pink-50 shadow-inner space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-base">
                    <MessageCircle size={16} />
                  </div>
                  <h4 className="font-extrabold text-gray-950">
                    {lang === "ar" ? "حصص لايف تفاعلية (Live)" : "100% Small Zoom Groups"}
                  </h4>
                  <p className="text-gray-500 leading-relaxed font-sans">
                    {lang === "ar" ? "يتفاعل الطفل مع أقرانه والمعلم مباشرة لكسر حواجز التردد الطبيعي." : "We maintain a strict maximum limit of 4 students per class to secure precise attention."}
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="bg-white p-5 rounded-2xl border border-pink-50 shadow-inner space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-yellow-100 text-yellow-800 flex items-center justify-center font-bold text-base">
                    <Cpu size={16} />
                  </div>
                  <h4 className="font-extrabold text-gray-950">
                    {lang === "ar" ? "التقرير التحفيزي الملون" : "Beautiful Action Reports"}
                  </h4>
                  <p className="text-gray-500 leading-relaxed font-sans">
                    {lang === "ar" ? "نرسل لك تقريراً تفاعلياً دورياً عن ذكاء طفلك وتفاعله الصادق." : "Comprehensive diagnostic feedback highlighting logic growth, memory score and active traits."}
                  </p>
                </div>

                {/* Feature 3 */}
                <div className="bg-white p-5 rounded-2xl border border-pink-50 shadow-inner space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-base">
                    <Trophy size={16} />
                  </div>
                  <h4 className="font-extrabold text-gray-950">
                    {lang === "ar" ? "الشهادة التقديرية الممتازة" : "Official STEM Certification"}
                  </h4>
                  <p className="text-gray-500 leading-relaxed font-sans">
                    {lang === "ar" ? "يحصل طفلك على شهادة فخرية بنهاية كل كورس ترفع معنوياته للأبد." : "A stunning personalized physical/electronic completion certificate to make them proud evermore."}
                  </p>
                </div>

                {/* Feature 4 */}
                <div className="bg-white p-5 rounded-2xl border border-pink-50 shadow-inner space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-base">
                    <Users size={16} />
                  </div>
                  <h4 className="font-extrabold text-gray-950">
                    {lang === "ar" ? "خصوصية وتكامل تربوي حسي" : "Extremely Secure Environment"}
                  </h4>
                  <p className="text-gray-500 leading-relaxed font-sans">
                    {lang === "ar" ? "نهتم بالآداب السلوكية وقياس النمو الاجتماعي والنفسي للبطل." : "Child safety and secure video classrooms monitored heavily by certified specialists."}
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 5. Kids Projects Sandbox (صندوق مشاريع وألعاب العباقرة الصغار) */}
      <section className="py-20 bg-white" id="projects">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold text-pink-600 uppercase tracking-widest block font-mono">
              {lang === "ar" ? "إنجازات الطلاب التفاعلية الحقيقية" : "KIDS MASTERPIECE SANDBOX"}
            </span>
            <h3 className="text-3xl sm:text-4xl font-black text-slate-950 leading-tight">
              {lang === "ar" ? "مشاريع برمجية حية صنعها طلابنا بأنفسهم" : "Coded Live By Our Young Wizards!"}
            </h3>
            <p className="text-slate-650 text-sm font-sans">
              {lang === "ar"
                ? "اضغط على أي مشروع بالأسفل لتشغيله في صندوق المحاكاة التفاعلية، ومتابعة كيف يتعلم طفلنا الكود والحساب الحسي!"
                : "Select any student project on the right to trigger its logic right inside our live interactive simulation engine."}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Sidebar list selection */}
            <div className="lg:col-span-4 flex flex-col justify-between">
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
                  {lang === "ar" ? "اختر أحد مشاريع الطلاب للمعاينة والتحدي:" : "Select student project to compile:"}
                </h4>
                <div className="space-y-2">
                  {STUDENT_PROJECTS.map((proj) => (
                    <button
                      key={proj.id}
                      type="button"
                      onClick={() => setActiveProjId(proj.id)}
                      className={`w-full p-4 rounded-2xl border text-left transition-all text-sm block flex items-center justify-between pointer-events-auto cursor-pointer ${
                        activeProjId === proj.id
                          ? "bg-slate-900 border-slate-900 text-white shadow-lg scale-102"
                          : "bg-white border-gray-200 hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                          {proj.iconType === "game" && <Laptop size={16} className={activeProjId === proj.id ? "text-slate-900" : "text-pink-500"} />}
                          {proj.iconType === "ai" && <Cpu size={16} className={activeProjId === proj.id ? "text-slate-900" : "text-indigo-500"} />}
                          {proj.iconType === "animation" && <Sparkles size={16} className={activeProjId === proj.id ? "text-slate-900" : "text-amber-500"} />}
                          {proj.iconType === "calculator" && <Calculator size={16} className={activeProjId === proj.id ? "text-slate-900" : "text-emerald-500"} />}
                        </div>
                        <div>
                          <span className="font-bold block text-sm">
                            {lang === "ar" ? proj.titleAr : proj.titleEn}
                          </span>
                          <span className="text-xs text-gray-400 block mt-0.5">
                            {lang === "ar" ? `صنع بواسطة البطل ${proj.creatorAr}` : `By ${proj.creatorEn}`}
                          </span>
                        </div>
                      </div>
                      {activeProjId === proj.id && (
                        <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-ping"></span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-2xl p-4 mt-6 text-xs text-amber-850">
                <p className="font-extrabold mb-1 flex items-center gap-1.5">
                  <Lightbulb size={13} className="text-yellow-650 shrink-0 animate-pulse" />
                  <span>{lang === "ar" ? "كيف نُنشئ هذه الإبداعات؟" : "What is behind their creativity?"}</span>
                </p>
                <p className="leading-relaxed font-sans">
                  {lang === "ar"
                    ? "يتدرب الأطفال في الأكاديمية على توجيه الأفكار وتحويل المسائل الرياضية أو المفردات اللفظية إلى برامج مرئية وسيناريوهات منطقية متكاملة تلامس تفكيرهم الحقيقي."
                    : "Every student builds, tests, and publishes their projects live inside the STEM portal during standard courses."}
                </p>
              </div>
            </div>

            {/* Simulated Sandbox component on the right */}
            <div className="lg:col-span-8 h-full">
              <StudentProjectSandbox
                project={activeProject}
                lang={lang}
                onLike={handleLikeProject}
                liked={likedProjects.includes(activeProject.id)}
              />
            </div>

          </div>

        </div>
      </section>

      {/* 6. AI Lab Arena Section (الذكاء الاصطناعي ومساعد زرافة ستيم الباسمة) */}
      <section className="py-20 bg-linear-to-b from-indigo-950 to-pink-950 text-white relative" id="ai-assistant">
        
        {/* Glow decals background */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-yellow-500/10 blur-3xl opacity-35 rounded-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-500/10 blur-3xl opacity-35 rounded-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Copy side */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="inline-flex items-center gap-1.5 bg-yellow-400/20 text-yellow-300 px-4 py-1.5 rounded-full text-xs font-black">
                <Sparkles size={12} className="text-yellow-300" />
                <span>{lang === "ar" ? "تفاعل ذكائي تجريبي مدهش" : "On-Server Real intelligence"}</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight font-sans">
                {lang === "ar"
                  ? "حاور زرافة ستيم الباسمة ذات الفيونكة الزرقاء!"
                  : "Chat with the smiling STEM Giraffe companion!"}
              </h3>

              <p className="text-sm text-gray-200 leading-relaxed font-sans">
                {lang === "ar"
                  ? "جرب الذكاء الاصطناعي التفاعلي المدمج (مدعوم بنموذج Gemini الحقيقي) ليريك كيف تلامس زافتنا عقول الأطفال وتجيب على استفسارات أولياء الأمور فورا!"
                  : "Experience our integrated playground. Chat with STEM Giraffe, our AI-driven agent running on server-side queries."}
              </p>

              {/* Steps indicators */}
              <div className="space-y-4 text-xs font-black font-sans">
                <div className="flex gap-3 items-start p-3 rounded-2xl bg-indigo-900/40 border border-indigo-800/40 shadow-sm">
                  <span className="p-1 px-2.5 bg-indigo-950 rounded-xl text-yellow-400 font-mono">1</span>
                  <div>
                    <span>{lang === "ar" ? "مرشد المسارات (Pathfinder):" : "Academic Pathfinder Mode:"}</span>
                    <p className="text-[11px] text-gray-300 font-medium leading-relaxed mt-0.5">
                      {lang === "ar" ? "اسأله عن برامج الجمع والطرح وحساب كفالة الباقات والأعمار المناسبة." : "Ask about class plans, mental calculation exercises and age fit guidelines."}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start p-3 rounded-2xl bg-indigo-900/40 border border-indigo-800/40 shadow-sm">
                  <span className="p-1 px-2.5 bg-indigo-950 rounded-xl text-yellow-400 font-mono">2</span>
                  <div>
                    <span>{lang === "ar" ? "صانع الألغاز والعد (Challenger):" : "STEM Quiz Challenge Mode:"}</span>
                    <p className="text-[11px] text-gray-300 font-medium leading-relaxed mt-0.5">
                      {lang === "ar" ? "يصيغ حزورة أرقام ذكية مبهجة ومسائل سهلة مخصصة لترقية ذكاء طفلك." : "Generates clean logic math/phonetic puzzles guiding kids step-by-step."}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start p-3 rounded-2xl bg-indigo-900/40 border border-indigo-800/40 shadow-sm">
                  <span className="p-1 px-2.5 bg-indigo-950 rounded-xl text-yellow-400 font-mono">3</span>
                  <div>
                    <span>{lang === "ar" ? "موصّل العلوم البسيط (Explainer):" : "Super Simple Concept Explainer:"}</span>
                    <p className="text-[11px] text-gray-300 font-medium leading-relaxed mt-0.5">
                      {lang === "ar" ? "يقدم قصصاً وحكايات بديعة لشرح قواعد الحساب والمفردات اللغوية بطلاقة." : "Explains vocabulary, abacus and phonics logic with child-suitable stories."}
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Chatbot container */}
            <div className="lg:col-span-7">
              <StemMascotAI lang={lang} />
            </div>

          </div>

        </div>
      </section>

      {/* 7. SECTION 4: INTEGRATED PRICING MATRIX (جدول باقات خطط الاشتراك والدفع) */}
      <section className="py-20 bg-white" id="plans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-black text-pink-600 uppercase tracking-widest block font-mono">
              {lang === "ar" ? "استثمار ذكي يثمر لمدى العمر" : "SIMPLE TRANSPARENT INVESTMENT"}
            </span>
            <h3 className="text-3xl sm:text-4xl font-black text-gray-905 leading-tight">
              {lang === "ar" ? "خطط اشتراك مدروسة بأعلى عائد تربوي للأم والطفل" : "Flexible Subscription Plans to Match Budget"}
            </h3>
            <p className="text-slate-600 text-sm font-sans">
              {lang === "ar"
                ? "اختر الباقة المثلى وسجل طفلك اليوم في المسارات التفاعلية. نوفر ضماناً متكاملاً وخصماً استثنائياً للعائلات."
                : "Select your desired block cycle. Fully responsive checkout flows inside our SAR payment matrix."}
            </p>
          </div>

          {/* Pricing cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 items-stretch">
            {PRICING_PLANS.map((plan) => {
              const isPopular = plan.id === "starter_6m" || plan.id === "premium_avg"; // middle tier popular highlight
              return (
                <div
                  key={plan.id}
                  className={`rounded-3xl p-6 sm:p-8 border flex flex-col justify-between transition-all scale-100 relative ${
                    isPopular
                      ? "bg-gradient-to-br from-slate-900 to-indigo-950 text-white border-indigo-950 shadow-2xl md:-translate-y-2 scale-102"
                      : "bg-white text-gray-800 border-pink-100 shadow-sm"
                  }`}
                >
                  {isPopular && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-yellow-400 text-slate-950 text-[10px] font-black uppercase px-4 py-1.5 rounded-full tracking-wider z-10 shadow-md flex items-center gap-1">
                      <Sparkles size={10} className="fill-slate-950 animate-pulse" />
                      <span>{lang === "ar" ? "الباقة المفضلة كفاءة وسعراً" : "BEST VALUE CHOICE"}</span>
                    </span>
                  )}

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-black">{lang === "ar" ? plan.nameAr : plan.nameEn}</h4>
                      <p className="text-[11px] text-gray-400 mt-1 font-bold uppercase tracking-wider font-mono">
                        {plan.id.toUpperCase()}_CYCLE
                      </p>
                    </div>

                    <div className="flex items-baseline">
                      <span className="text-3xl sm:text-4xl font-black text-yellow-400 font-mono">
                        {lang === "ar" ? plan.priceAr : plan.priceEn}
                      </span>
                      <span className={`text-xs ml-1.5 font-bold ${isPopular ? "text-slate-300" : "text-gray-500"}`}>
                        / {lang === "ar" ? plan.periodAr : plan.periodEn}
                      </span>
                    </div>

                    <div className={`p-3.5 rounded-xl text-xs font-black leading-relaxed flex items-center gap-1.5 ${isPopular ? "bg-indigo-900/60 text-yellow-300 border border-indigo-800/40" : "bg-pink-50 text-pink-900 border border-pink-100"}`}>
                      <HelpCircle size={14} className="shrink-0 text-pink-500" />
                      <span>{lang === "ar" ? plan.sessionsAr : plan.sessionsEn}</span>
                    </div>

                    {/* Features list */}
                    <div className="space-y-3 pt-2">
                      <h5 className="text-[10px] font-black uppercase tracking-wider text-gray-400">
                        {lang === "ar" ? "تفاصيل ما تحتويه باقتك:" : "WHAT IS INCLUDED:"}
                      </h5>
                      <div className="space-y-2.5">
                        {(lang === "ar" ? plan.featuresAr : plan.featuresEn).map((feat, idx) => (
                          <div key={idx} className="flex gap-2.5 items-start text-xs">
                            <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[9px] shrink-0 mt-0.5">
                              ✓
                            </span>
                            <span className={`${isPopular ? "text-gray-300" : "text-slate-650"} leading-relaxed`}>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Pricing Action Subscription button - Triggers direct mockup modal! */}
                  <div className="pt-8">
                    <button
                      type="button"
                      onClick={() => handleOpenCheckout(plan.id)}
                      className={`w-full py-4 px-4 font-black text-xs tracking-wider rounded-xl text-center block transition-all shadow-md cursor-pointer ${
                        isPopular
                          ? "bg-yellow-400 hover:bg-yellow-500 text-slate-950 hover:shadow-lg focus:outline-none"
                          : "bg-pink-500 hover:bg-pink-650 text-white hover:bg-pink-650"
                      }`}
                    >
                      {lang === "ar" ? "اشترك الآن" : "Subscribe Now"}
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Pricing Calculator interactive tool embedded nicely */}
          <div className="pt-6">
            <PricingCalculator plans={PRICING_PLANS} lang={lang} onOpenCheckout={handleOpenCheckout} />
          </div>

        </div>
      </section>

      {/* 8. SECTION 5: SOCIAL PROOF (آراء وتجارب العائلات والمشاهير) */}
      <section className="py-20 bg-slate-50 border-t border-pink-100/40" id="students">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold text-pink-600 uppercase tracking-widest block font-mono">
              {lang === "ar" ? "ثقة وتجارب عائلية نعتز ببرمجتها" : "TESTIMONIAL CAROUSEL"}
            </span>
            <h3 className="text-3xl sm:text-4xl font-black text-gray-950 leading-tight">
              {lang === "ar" ? "ماذا تقول الأمهات وآباء العباقرة عن مسار ستيم؟" : "Parents Celebrating True STEM Milestones"}
            </h3>
            <p className="text-slate-600 text-sm font-sans">
              {lang === "ar"
                ? "ثقة نادرة نالتها المنصة من العائلات في مدن المملكة والخليج. اقرأ تجارب تحول أولادهم الحقيقي:"
                : "Real Saudi and GCC families reviews reflecting significant mental calculations, public speaking and logical improvements."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((test) => (
              <div
                key={test.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-md flex flex-col justify-between hover:shadow-xl transition-all duration-300"
              >
                <div className="space-y-4">
                  {/* Rating Stars */}
                  <div className="flex gap-1 text-yellow-400 font-sans">
                    {Array.from({ length: test.rating }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-xs text-slate-650 italic leading-relaxed font-sans">
                    “{lang === "ar" ? test.quoteAr : test.quoteEn}”
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-6 border-t border-pink-50 mt-6 shrink-0">
                  <img
                    src={test.avatar}
                    alt={lang === "ar" ? test.nameAr : test.nameEn}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-full object-cover border-2 border-pink-100"
                  />
                  <div>
                    <span className="font-extrabold text-xs text-gray-900 block">
                      {lang === "ar" ? test.nameAr : test.nameEn}
                    </span>
                    <span className="text-[10px] text-pink-600 font-bold block">
                      {lang === "ar" ? test.childNameAr : test.childNameEn}
                    </span>
                    <span className="text-[9px] text-gray-400 block mt-0.5">
                      {lang === "ar" ? test.roleAr : test.roleEn}
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. FAQ Section (الأسئلة المتكررة والتفاصيل الفنية) */}
      <section className="py-20 bg-white" id="faq">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold text-pink-600 uppercase tracking-widest block font-sans">
              {lang === "ar" ? "استفسارات أولياء الأمور وحلولها" : "COMMON QUERIES RESOLVED"}
            </span>
            <h3 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight">
              {lang === "ar" ? "الأسئلة المتكررة حول أكاديمية ستيم" : "Common STEM Platforms FAQ"}
            </h3>
            <p className="text-slate-660 text-sm">
              {lang === "ar"
                ? "إجابات كافية ووافية بخصوص المدة، كيفية العمل بالحاسوب أو الآي باد، وطرق المتابعة."
                : "A brief look at our zoom operations, soroban equipment parameters and WhatsApp updates."}
            </p>
          </div>

          <div className="space-y-4 font-sans">
            {FAQ_ITEMS.map((faq) => {
              const isOpen = expandedFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-slate-50 border border-pink-100/50 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full text-left font-black text-xs sm:text-sm text-gray-900 py-4 px-5 flex justify-between items-center bg-transparent cursor-pointer pointer-events-auto"
                  >
                    <span className="text-gray-950 text-left">
                      {lang === "ar" ? faq.questionAr : faq.questionEn}
                    </span>
                    <span className="p-1.5 rounded-lg bg-pink-100/50 text-pink-700 text-xs shrink-0 ml-2">
                      {isOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1.5 text-xs text-gray-500 leading-relaxed border-t border-pink-100/40 animate-fade-in whitespace-pre-line">
                      {lang === "ar" ? faq.answerAr : faq.answerEn}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 10. Call to Action (استمارة وقسيمة الختام المبهجة) */}
      <section className="py-20 bg-gradient-to-br from-pink-500 via-rose-500 to-amber-500 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 blur-3xl rounded-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <h3 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            {lang === "ar" ? "أهّلي طفلك لمهارات القرن الجديد والتميز الأكاديمي!" : "Equip your child with future mental accuracy today!"}
          </h3>
          <p className="text-sm font-semibold max-w-2xl mx-auto leading-relaxed text-white/90">
            {lang === "ar"
              ? "اشتركي الآن في باقة ستيم وحققي لطفل ميزة تنافسية نادرة في الحساب الذهني التخيلي وطلاقة الحوار التفاعلي."
              : "Let's establish a smart active learning cycle starting with safe quarterly or annual bundles."}
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#plans"
              className="w-full sm:w-auto text-center bg-slate-900 hover:bg-slate-950 text-white font-black text-sm py-4 px-10 rounded-2xl shadow-2xl transition-all flex items-center justify-center gap-2"
            >
              <Target size={15} className="text-yellow-400 animate-pulse shrink-0" />
              <span>{lang === "ar" ? "اشترك الآن بالباقة" : "Enroll & Subscribe Today"}</span>
            </a>
            <a
              href="https://wa.me/966500000000"
              target="_blank"
              rel="noreferrer noopener"
              className="w-full sm:w-auto text-center bg-white/10 hover:bg-white/20 text-white font-black text-sm py-4 px-8 rounded-2xl transition-all border border-white/20 flex items-center justify-center gap-2"
            >
              <Phone size={15} />
              {lang === "ar" ? "تواصل معنا مباشرة" : "Call WhatsApp Line"}
            </a>
          </div>
        </div>
      </section>

      {/* 11. Footer */}
      <footer className="bg-slate-950 text-white pt-20 pb-10 border-t border-indigo-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 text-xs text-gray-400">
            
            {/* Branding detail */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="bg-white p-1 rounded-2xl shadow-md inline-block">
                  <img 
                    src="/input_file_3.png" 
                    className="h-12 w-auto object-contain" 
                    alt={lang === "ar" ? "منصة ستيم التعليمية" : "STEM Platform Logo"}
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <p className="leading-relaxed font-sans">
                {lang === "ar"
                  ? "منصة تعليمية ترفيهية حية تفاعلية لتزويد أطفالنا بذكاء القرن الجديد والتغلب على فوبيا الأرقام والتردد الصوتي."
                  : "Empowering children aged 5 to 12 to cross the logic arithmetic barrier using live premium zoom class matrices."}
              </p>
              
              {/* Contacts */}
              <div className="space-y-3.5 pt-2 text-xs">
                <div className="flex gap-2 items-center text-gray-300">
                  <Phone size={13} className="text-pink-400" />
                  <a href="https://wa.me/966500000000" target="_blank" rel="noreferrer" className="font-mono hover:text-pink-400">
                    +966 50 000 0000 ({lang === "ar" ? "واتساب المملكة" : "WhatsApp Support"})
                  </a>
                </div>
                <div className="flex gap-2 items-center text-gray-300">
                  <Mail size={13} className="text-pink-400" />
                  <a href="mailto:info@robopanda.tech" className="font-mono hover:text-pink-400">
                    support@stem.tech
                  </a>
                </div>
              </div>

            </div>

            {/* Quick links */}
            <div className="space-y-4">
              <h4 className="text-xs font-black text-gray-200 uppercase tracking-widest">
                {lang === "ar" ? "أقسام الأكاديمية" : "Academy Sections"}
              </h4>
              <ul className="space-y-2.5 font-medium font-sans">
                <li><a href="#tracks" className="hover:text-pink-400 transition-colors">{lang === "ar" ? "المسارات التعليمية" : "Learning Paths"}</a></li>
                <li><a href="#projects" className="hover:text-pink-400 transition-colors">{lang === "ar" ? "صندوق مشاريع الأطفال" : "Students Interactive Work"}</a></li>
                <li><a href="#ai-assistant" className="hover:text-pink-400 transition-colors">{lang === "ar" ? "مستشار زرافة ستيم الذكي" : "AI Advisor Lab"}</a></li>
                <li><a href="#plans" className="hover:text-pink-400 transition-colors">{lang === "ar" ? "باقات الدراسة والاشتراكات" : "Pricing Models"}</a></li>
              </ul>
            </div>

            {/* Categories */}
            <div className="space-y-4">
              <h4 className="text-xs font-black text-gray-200 uppercase tracking-widest">
                {lang === "ar" ? "السن الفكري المستهدف" : "Target Categories"}
              </h4>
              <ul className="space-y-2.5 font-medium font-sans">
                <li><a href="#tracks" className="hover:text-pink-400 transition-colors">{lang === "ar" ? "برنامج التأسيس الحركي (5-7 سنوات)" : "Foundry Years (Ages 5-7)"}</a></li>
                <li><a href="#tracks" className="hover:text-pink-400 transition-colors">{lang === "ar" ? "برنامج الحساب السريع (8-10 سنوات)" : "Active Soroban Arithmetic (8-10)"}</a></li>
                <li><a href="#tracks" className="hover:text-pink-400 transition-colors">{lang === "ar" ? "الطلاقة الإنجليزية ومهارات الإلقاء (6-12 سنة)" : "English Phonics & Speech (6-12)"}</a></li>
              </ul>
            </div>

            {/* Credibility Decal */}
            <div className="space-y-4">
              <h4 className="text-xs font-black text-gray-200 uppercase tracking-widest">
                {lang === "ar" ? "الأكاديمية التربوية الآمنة" : "Certified Security Compliance"}
              </h4>
              <div className="p-4 bg-slate-900 rounded-2xl border border-indigo-950 space-y-2.5 text-[11px] text-gray-300">
                <p className="leading-relaxed font-sans">
                  {lang === "ar"
                    ? "كافة المواد ومعطيات الفصول التعليمية مشفرة بالكامل SSL ومؤمنة، وخاضعة لمتابعة ومراجعة المشرفين المعتمدين."
                    : "STEM Platform implements 256-bit SSL encryption. Safe web classrooms with strict child confidentiality."}
                </p>
                <div className="flex gap-2 items-center text-[10px] text-pink-500 font-bold uppercase tracking-wider font-mono">
                  <span>● SSL SECURE CONTEXT</span>
                </div>
              </div>
            </div>

          </div>

          <div className="h-px bg-slate-900 mb-8" />

          {/* Copyrights and terms */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-sans">
            <p className="text-center sm:text-left">
              © 2026 أكاديمية ستيم التفاعلية للأطفال | STEM Platform. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-pink-400">{lang === "ar" ? "نهج الخصوصية والأمان" : "Privacy Guidelines"}</a>
              <a href="https://join.robopanda.tech/" target="_blank" rel="noreferrer noopener" className="hover:text-pink-400 flex items-center gap-1">
                <span>{lang === "ar" ? "استمارة التسجيل" : "Register Form"}</span>
                <ExternalLink size={11} />
              </a>
            </div>
          </div>

        </div>
      </footer>

      {/* --- CRO DETAILED DIRECT CHECKOUT PAYMENTS MODAL --- */}
      {checkoutPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl border border-pink-100/60 max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-pink-50 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 bg-yellow-400 rounded-xl flex items-center justify-center">
                  <GraduationCap size={16} className="text-slate-950 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="font-black text-sm text-slate-900 leading-none">
                    {lang === "ar" ? "إتمام وتأكيد حجز مقعد طفلك" : "Confirm Seat Registration"}
                  </h4>
                  <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider font-mono block mt-1">
                    STEM SECURE PAYGATE
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setCheckoutPlan(null)}
                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 flex items-center justify-center cursor-pointer"
                aria-label="Close Checkout"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Body Scroll Container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {paymentStep === "form" && (
                <>
                  {/* Selected Plan Recap Card */}
                  <div className="bg-gradient-to-br from-indigo-950 to-slate-900 text-white rounded-2xl p-5 border border-indigo-900/40">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="text-[9px] font-black uppercase text-pink-400 tracking-widest block mb-1">
                          {lang === "ar" ? "الباقة المطلوبة" : "SELECTED MATRIX TIER"}
                        </span>
                        <h5 className="text-base font-black text-yellow-300">
                          {lang === "ar" ? checkoutPlan.nameAr : checkoutPlan.nameEn}
                        </h5>
                      </div>
                      <span className="font-mono text-lg font-black text-white bg-white/10 px-3 py-1 rounded-lg">
                        {lang === "ar" ? checkoutPlan.priceAr : checkoutPlan.priceEn}
                      </span>
                    </div>

                    <div className="text-xs text-slate-300 leading-relaxed font-sans border-t border-white/10 pt-2 flex items-center gap-1.5">
                      <Sparkles size={12} className="text-yellow-400 shrink-0" />
                      <span>{lang === "ar" ? checkoutPlan.sessionsAr : checkoutPlan.sessionsEn}</span>
                    </div>
                  </div>

                  {/* Form input section */}
                  <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                    
                    {/* Basic Parent Data */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block text-gray-600 font-bold mb-1">
                          {lang === "ar" ? "اسم ولي الأمر الكريم:" : "Parent Name:"}
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full bg-slate-50 border border-gray-200 focus:border-pink-500 rounded-xl p-2.5 text-gray-950 font-medium"
                          placeholder={lang === "ar" ? "مثال: فاطمة المطيري" : "e.g., Jane Done"}
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 font-bold mb-1">
                          {lang === "ar" ? "اسم البطل الصقر وعمره:" : "Child Name & Age:"}
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full bg-slate-50 border border-gray-200 focus:border-pink-500 rounded-xl p-2.5 text-gray-950 font-medium"
                          placeholder={lang === "ar" ? "مثال: هتان - 8 سنوات" : "e.g., Ryan, 8yo"}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block text-gray-600 font-bold mb-1">
                          {lang === "ar" ? "رقم الجوال لتلقي التقرير (واتساب):" : "WhatsApp Number:"}
                        </label>
                        <input
                          type="tel"
                          required
                          defaultValue="+966 "
                          className="w-full bg-slate-50 border border-gray-200 focus:border-pink-500 rounded-xl p-2.5 text-gray-950 font-mono font-bold"
                          placeholder="+966 5..."
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 font-bold mb-1">
                          {lang === "ar" ? "مخاوف أو رغبات تفضيلية بالطفل:" : "Specific concerns/interests:"}
                        </label>
                        <input
                          type="text"
                          className="w-full bg-slate-50 border border-gray-200 focus:border-pink-500 rounded-xl p-2.5 text-gray-950 font-medium"
                          placeholder={lang === "ar" ? "مثال: تحسين النطق بالإنجليزية" : "e.g. loves visual structures"}
                        />
                      </div>
                    </div>

                    {/* Promo Code interactive field */}
                    <div className="bg-yellow-50/50 p-3 rounded-xl border border-yellow-100 text-xs">
                      <label className="block text-amber-800 font-bold mb-1 text-[11px]">
                        {lang === "ar" ? "هل لديك كوبون خصم؟ جرب إدخال 'STEM10' للحصول على خصم 10%:" : "Have a promo code? Enter 'STEM10' for 10% off:"}
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          className="flex-1 bg-white border border-gray-300 rounded-lg p-1.5 font-mono text-center font-bold"
                          placeholder="STEM10"
                        />
                        <button
                          type="button"
                          onClick={handleApplyPromo}
                          className="bg-slate-900 hover:bg-slate-950 text-white font-bold px-4 rounded-lg cursor-pointer"
                        >
                          {lang === "ar" ? "تطبيق الكوبون" : "Apply"}
                        </button>
                      </div>
                      {promoApplied && (
                        <p className="text-[10px] text-emerald-700 font-bold mt-1.5 animate-bounce">
                          ✓ {lang === "ar" ? `تم التطبيق! تم خصم 10% بنجاح على الفاتورة.` : `Succesfully applied! 10% discount detected.`}
                        </p>
                      )}
                    </div>

                    {/* Simulated payment gateway inputs */}
                    <div className="space-y-3.5 pt-2 border-t border-gray-150">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                        <CreditCard size={14} className="text-pink-500" />
                        <span>{lang === "ar" ? "بيانات بطاقة مدى أو الفيزا الآمنة:" : "SECURE BILLING DECAY DETAILS:"}</span>
                      </div>

                      <div className="text-xs">
                        <label className="block text-gray-600 font-bold mb-1">
                          {lang === "ar" ? "رقم البطاقة (مدى / فيزا / ماستركارد):" : "Card Number (Mada/Visa):"}
                        </label>
                        <input
                          type="text"
                          required
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim())}
                          maxLength={19}
                          className="w-full bg-slate-50 border border-gray-200 focus:border-pink-500 rounded-xl p-2.5 text-gray-950 font-mono font-bold text-center"
                          placeholder="4000 1234 5678 9010"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="block text-gray-600 font-bold mb-1">
                            {lang === "ar" ? "تاريخ الانتهاء المطبوع:" : "Expiry Date:"}
                          </label>
                          <input
                            type="text"
                            required
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            maxLength={5}
                            className="w-full bg-slate-50 border border-gray-200 focus:border-pink-500 rounded-xl p-2.5 text-gray-950 font-mono text-center font-bold"
                            placeholder="MM/YY"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-600 font-bold mb-1">
                            {lang === "ar" ? "الرقم السري (CVV):" : "Security Code (CVV):"}
                          </label>
                          <input
                            type="password"
                            required
                            value={cardCVV}
                            onChange={(e) => setCardCVV(e.target.value)}
                            maxLength={3}
                            className="w-full bg-slate-50 border border-gray-200 focus:border-pink-500 rounded-xl p-2.5 text-gray-950 font-mono text-center font-bold"
                            placeholder="***"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Total billing checkout recap */}
                    <div className="bg-slate-50 p-4 rounded-2xl border border-pink-100 flex justify-between items-center text-xs font-sans">
                      <div>
                        <span className="text-gray-400 block">{lang === "ar" ? "القيمة الكلية للدفعة بالريال:" : "Total SAR cost to debit:"}</span>
                        {promoApplied ? (
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-lg font-black text-slate-900 font-mono">
                              {(parseInt(checkoutPlan.priceAr) * 0.9).toFixed(0)} {lang === "ar" ? "ريال سعودي" : "SAR"}
                            </span>
                            <span className="text-gray-400 font-mono line-through text-[11px]">
                              {checkoutPlan.priceAr} {lang === "ar" ? "ريال" : "SAR"}
                            </span>
                          </div>
                        ) : (
                          <span className="text-lg font-black text-slate-900 font-mono block mt-0.5">
                            {checkoutPlan.priceAr} {lang === "ar" ? "ريال سعودي" : "SAR"}
                          </span>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="text-emerald-600 font-bold block">✓ {lang === "ar" ? "مدى 100% مؤمن" : "Secure Connection"}</span>
                        <span className="text-[10px] text-gray-450 block">{lang === "ar" ? "لاخصم تلقائي متكرر" : "One-time debit"}</span>
                      </div>
                    </div>

                    <p className="text-[10px] text-center text-gray-400 leading-relaxed font-sans mt-2 flex items-center justify-center gap-1">
                      <Lock size={10} className="shrink-0 text-gray-400" />
                      <span>{lang === "ar" ? "بالنقر على زر الإرسال، فإنك توافق على سياسة شفرة خصوصية الطفل وتأمين حضور الفصول." : "By clicking complete payment, you confirm that you want to register of your child on our live interactive dashboard."}</span>
                    </p>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-pink-500 via-rose-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-black py-4 rounded-2xl shadow-xl transition-all hover:scale-102 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <ShieldCheck size={16} className="text-white shrink-0" />
                      <span>{lang === "ar" ? "تأكيد الدفع وحجز المقعد بنجاح" : "Confirm secure payment & compile seat"}</span>
                    </button>

                  </form>
                </>
              )}

              {paymentStep === "loading" && (
                <div className="py-20 text-center space-y-4">
                  <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <h4 className="text-lg font-black text-slate-900 font-sans">
                    {lang === "ar" ? "جاري معالجة وتأمين حجز مقعدك بالبنك..." : "Connecting node to secure banking gateways..."}
                  </h4>
                  <p className="text-xs text-gray-400 font-mono">
                    {lang === "ar" ? "رمز التفويض مرجعي: 8852-B" : "AUTHORIZATION_REF: 8852-B"}
                  </p>
                </div>
              )}

              {paymentStep === "success" && (
                <div className="py-12 text-center space-y-6">
                  <div className="flex flex-col items-center justify-center">
                    <GiraffeMascot pose={6} className="w-44 h-44 drop-shadow-xl mb-1 animate-pulse" />
                    <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-md shadow-xs -mt-5 relative z-10 font-bold">
                      ✓
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-2xl font-black text-slate-900 font-sans">
                      {lang === "ar" ? "تهانينا الحارة! تم حجز مقعد البطل بنجاح" : "Seat successfully compiled & certified!"}
                    </h4>
                    <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
                      {lang === "ar"
                        ? "شكراً لثقتكم الغالية! تم ترحيل تفاصيل ورسم الباقة، وسيصلكم اتصال ترحيبي وتفاصيل فصل زووم التفاعلي خلال ساعة عبر الواتساب."
                        : "Thank you for joining our STEM family! Live Zoom coordinates and a welcome invitation are dispatching via WhatsApp."}
                    </p>
                  </div>

                  {/* PDF Receipt decos */}
                  <div className="bg-slate-50 border border-emerald-100 rounded-2xl p-4 max-w-sm mx-auto text-xs space-y-2 font-mono text-left">
                    <div className="flex justify-between border-b border-gray-150 pb-2">
                      <span className="font-bold font-sans">{lang === "ar" ? "تاريخ العملية:" : "Timestamp:"}</span>
                      <span>2026-06-02</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-150 pb-2">
                      <span className="font-bold font-sans">{lang === "ar" ? "حساب الباقة المعافدة:" : "Compiled Product:"}</span>
                      <span>{checkoutPlan.nameEn}</span>
                    </div>
                    <div className="flex justify-between pb-2">
                      <span className="font-bold font-sans">{lang === "ar" ? "الحالة التراكمية:" : "Payment System Status:"}</span>
                      <span className="text-emerald-600 font-bold">SECURE_SETTLED_SUCCESS</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setCheckoutPlan(null)}
                    className="bg-slate-900 hover:bg-slate-950 text-white font-bold text-xs py-3 px-8 rounded-xl cursor-pointer"
                  >
                    {lang === "ar" ? "رائع! العودة للموقع" : "Return to Landing Page"}
                  </button>
                </div>
              )}

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
