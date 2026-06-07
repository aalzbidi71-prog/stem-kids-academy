import { useState, useId } from "react";
import { PricingPlan, Language } from "../types";
import { Calculator, Check, ShoppingBag, Sparkles } from "lucide-react";

interface PricingCalculatorProps {
  plans: PricingPlan[];
  lang: Language;
  onOpenCheckout: (plan: PricingPlan, calculatedPrice: number) => void;
}

export default function PricingCalculator({ plans, lang, onOpenCheckout }: PricingCalculatorProps) {
  const [selectedPlanId, setSelectedPlanId] = useState("intermediate");
  const [numKids, setNumKids] = useState(1);
  const [billingPeriod, setBillingPeriod] = useState<"standard" | "annual">("standard"); // Standard vs Annual (Annual grants 20% discount!)
  const [addPhysicalBox, setAddPhysicalBox] = useState(false);

  const selectedPlan = plans.find((p) => p.id === selectedPlanId) || plans[0] || { priceNum: 800, nameAr: "الباقة المتوسطة", nameEn: "Intermediate Pack", id: "intermediate" };
  const kidsInputId = useId();

  // Price calculations
  const calculateTotals = () => {
    let basePriceNum = selectedPlan.priceNum;

    // Billing frequency multiplier/discount
    let frequencyDiscount = 0;
    if (billingPeriod === "annual" && basePriceNum > 0) {
      frequencyDiscount = basePriceNum * 0.2; // 20% annual discount
    }

    const priceAfterFreq = basePriceNum - frequencyDiscount;
    let subtotal = priceAfterFreq * numKids;

    // Kids volume discount
    let kidsDiscountRatio = 0;
    if (numKids === 2) {
      kidsDiscountRatio = 0.1; // 10% off for 2 kids
    } else if (numKids >= 3) {
      kidsDiscountRatio = 0.15; // 15% off for 3+ kids
    }

    const familyDiscountVal = subtotal * kidsDiscountRatio;
    let total = subtotal - familyDiscountVal;

    // Add physical exercise workbook boxes (50 SAR per kid)
    const boxCost = addPhysicalBox ? 50 * numKids : 0;
    total += boxCost;

    return {
      subtotal: basePriceNum * numKids,
      frequencyDiscount: frequencyDiscount * numKids,
      familyDiscount: familyDiscountVal,
      boxCost: boxCost,
      finalTotal: total,
    };
  };

  const results = calculateTotals();

  return (
    <div id="pricing-calculator" className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-pink-100 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-6 border-b border-gray-150 pb-4">
        <div className="p-2.5 bg-yellow-100 rounded-xl text-yellow-600">
          <Calculator size={22} className="text-yellow-600 animate-pulse" />
        </div>
        <div>
          <h4 className="text-lg font-bold text-gray-900 font-sans">
            {lang === "ar" ? "حاسبة خطط الاشتراك التفاعلية" : "Interactive Subscription Calculator"}
          </h4>
          <p className="text-xs text-gray-500">
            {lang === "ar"
              ? "قم بتخصيص عدد أطفالك، فترة الدفع والمزايا التفضيلية لحساب التكلفة الفورية الشفافة"
              : "Customize number of children, billing period & workbook addons to calculate immediate transparent costs"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Settings Column */}
        <div className="md:col-span-12 lg:col-span-7 space-y-6">
          
          {/* Step 1: Select Plan */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5">
              {lang === "ar" ? "1. حدد باقة الدراسة الأساسية:" : "1. Choose Core Study Plan:"}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {plans.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPlanId(p.id)}
                  className={`p-3 rounded-2xl border text-right transition-all relative overflow-hidden flex flex-col justify-between h-24 ${
                    selectedPlanId === p.id
                      ? "bg-amber-50 border-amber-450 shadow-md ring-1 ring-amber-500/20"
                      : "bg-white border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-xs font-bold text-gray-900 block truncate">
                    {lang === "ar" ? p.nameAr : p.nameEn}
                  </span>
                  <div className="mt-1">
                    <span className="text-sm font-black text-amber-650 block">
                      {lang === "ar" ? p.priceAr : p.priceEn}
                    </span>
                    <span className="text-[10px] text-gray-400 block truncate">
                      {lang === "ar" ? p.periodAr : p.periodEn}
                    </span>
                  </div>
                  {selectedPlanId === p.id && (
                    <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[8px]">
                      ✓
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Number of Children */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor={kidsInputId} className="block text-xs font-bold text-gray-500 uppercase tracking-wider">
                {lang === "ar" ? "2. عدد الأطفال المراد تسجيلهم:" : "2. Number of Children:"}
              </label>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                {numKids === 2 && (lang === "ar" ? "خصم أخوة 10%!" : "10% Family Discount!")}
                {numKids >= 3 && (lang === "ar" ? "خصم عائلي مذهل 15%!" : "15% Sibling Discount!")}
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setNumKids(Math.max(1, numKids - 1))}
                className="w-10 h-10 rounded-lg bg-gray-100 border hover:bg-gray-200 text-gray-700 font-bold active:scale-95 text-lg cursor-pointer"
              >
                -
              </button>
              <input
                id={kidsInputId}
                type="number"
                min="1"
                max="10"
                value={numKids}
                onChange={(e) => setNumKids(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 h-10 border border-gray-350 rounded-lg text-center font-mono font-bold text-gray-950"
              />
              <button
                onClick={() => setNumKids(Math.min(10, numKids + 1))}
                className="w-10 h-10 rounded-lg bg-gray-100 border hover:bg-gray-200 text-gray-700 font-bold active:scale-95 text-lg cursor-pointer"
              >
                +
              </button>
              <span className="text-xs text-gray-400">
                {lang === "ar" ? "خصم إضافي للأخوة لتحفيزهم سوياً وتشجيعهم" : "Encouraging siblings to learn together!"}
              </span>
            </div>
          </div>

          {/* Step 3: Billing frequency */}
          {selectedPlan.priceNum > 0 && (
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">
                {lang === "ar" ? "3. تفضيل الدفع وفترات التوفير الدراسي:" : "3. Choose Billing Cycle:"}
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setBillingPeriod("standard")}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                    billingPeriod === "standard"
                      ? "bg-slate-900 border-slate-900 text-white font-bold"
                      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {lang === "ar" ? "دفع قياسي (بدون التزام)" : "Standard Pay"}
                </button>
                <button
                  type="button"
                  onClick={() => setBillingPeriod("annual")}
                  className={`p-3 rounded-2xl border text-center transition-all relative overflow-hidden cursor-pointer ${
                    billingPeriod === "annual"
                      ? "bg-slate-900 border-slate-900 text-white font-bold"
                      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <span className="absolute top-0 right-0 bg-amber-400 text-slate-950 font-black text-[7px] px-1.5 py-0.5 uppercase tracking-wider">
                    -20% خصم
                  </span>
                  {lang === "ar" ? "دفع مسبق (توفير 20%)" : "Prepaid Annual (-20%)"}
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Add physical boxes addon */}
          <div className="pt-2">
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={addPhysicalBox}
                onChange={() => setAddPhysicalBox(!addPhysicalBox)}
                className="w-4 h-4 accent-amber-500 cursor-pointer"
              />
              <div>
                <span className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                  <ShoppingBag size={13} className="text-amber-500" />
                  {lang === "ar" ? "أرغب بإضافة كرتونة مستلزمات الأنشطة والكتب الملموسة والشهادات المطبوعة (+50 ر.س للطفل):" : "Add physical printed workbook box & medal elements (+50 SAR/student):"}
                </span>
                <p className="text-[10px] text-gray-400">
                  {lang === "ar"
                    ? "علبة مادية جذابة تحتوي على أوراق تلوين مخصصة، أنشطة لوحية، وشهادات مع كارت تهنئة ترسل لعنوانكم مجاناً"
                    : "Premium physical kit with printed activity charts, colorful decals, and formal completion documents delivered free."}
                </p>
              </div>
            </label>
          </div>

        </div>

        {/* Invoice Summary column */}
        <div className="md:col-span-12 lg:col-span-5 bg-pink-50/45 rounded-2xl p-6 border border-pink-100/50 flex flex-col justify-between">
          <div>
            <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
              {lang === "ar" ? "ملفات الفاتورة المفصلة" : "Billing Details Summary"}
            </h5>

            <div className="space-y-3.5 divide-y divide-gray-250/50 text-xs text-gray-600">
              
              <div className="flex justify-between font-medium">
                <span>
                  {lang === "ar" ? `باقة: ${selectedPlan.nameAr}` : `Plan: ${selectedPlan.nameEn}`}
                  <span className="text-[10px] text-gray-400 block mt-0.5">
                    {numKids} {lang === "ar" ? "أطفال" : "students"} x {selectedPlan.priceNum} {lang === "ar" ? "ر.س" : "SAR"}
                  </span>
                </span>
                <span className="font-mono font-semibold">
                  {results.subtotal} {lang === "ar" ? "ر.س" : "SAR"}
                </span>
              </div>

              {results.frequencyDiscount > 0 && (
                <div className="flex justify-between text-emerald-650 pt-2.5 font-bold">
                  <span className="flex items-center gap-1">
                    <Sparkles size={11} className="text-emerald-500" />
                    {lang === "ar" ? "خصم الدفع السنوي المسبق (20%):" : "Prepaid Annual Disc (20%):"}
                  </span>
                  <span className="font-mono">
                    -{results.frequencyDiscount} {lang === "ar" ? "ر.س" : "SAR"}
                  </span>
                </div>
              )}

              {results.familyDiscount > 0 && (
                <div className="flex justify-between text-emerald-650 pt-2.5 font-bold">
                  <span className="flex items-center gap-1">
                    <Sparkles size={11} className="text-emerald-500" />
                    {lang === "ar" ? "خصم الأشقاء العائلي المتكامل:" : "Family Siblings Discount:"}
                  </span>
                  <span className="font-mono">
                    -{results.familyDiscount.toFixed(0)} {lang === "ar" ? "ر.س" : "SAR"}
                  </span>
                </div>
              )}

              {results.boxCost > 0 && (
                <div className="flex justify-between pt-2.5 font-medium">
                  <span>{lang === "ar" ? "صندوق العلوم والأنشطة المطبوع الملموس:" : "Printed Physical Craft Box:"}</span>
                  <span className="font-mono font-semibold">
                    +{results.boxCost} {lang === "ar" ? "ر.س" : "SAR"}
                  </span>
                </div>
              )}

            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex justify-between items-baseline mb-4">
              <span className="text-sm font-bold text-gray-900">{lang === "ar" ? "التكلفة الإجمالية الدورية:" : "Final Combined Cost:"}</span>
              <div className="text-right">
                <span className="text-2xl font-black text-amber-500 font-mono">
                  {results.finalTotal.toFixed(0)}
                </span>
                <span className="text-xs text-slate-800 font-bold ml-1">{lang === "ar" ? "ر.س" : " SAR"}</span>
                <p className="text-[9px] text-gray-400 uppercase font-mono tracking-wider mt-0.5">
                  {billingPeriod === "annual" ? (lang === "ar" ? "بكل دورة دفع مسبقة" : "per prepaid cycle") : (lang === "ar" ? "لكل باقة" : "per plan term")}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onOpenCheckout(selectedPlan as PricingPlan, results.finalTotal)}
              className="w-full text-center bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-1.5 shadow transition-all active:scale-95 cursor-pointer hover:shadow-lg font-sans"
            >
              <Check size={16} />
              {lang === "ar" ? "اشترك الآن وسجل طفلك" : "Enroll & Pay Now"}
            </button>
            <span className="text-[10px] text-gray-400 text-center block mt-2">
              {lang === "ar" ? "بوابات دفع آمنة 100% مع ضمان فخر الطفل وتطوره" : "Secure localized payment gateways & 100% satisfaction guarantee."}
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}
