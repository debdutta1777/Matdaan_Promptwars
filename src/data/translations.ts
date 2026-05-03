export type LangCode = "en" | "hi" | "ta" | "bn" | "mr" | "te";

export const LANGUAGES: { code: LangCode; label: string; native: string }[] = [
  { code: "en", label: "English", native: "English" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
  { code: "ta", label: "Tamil", native: "தமிழ்" },
  { code: "bn", label: "Bengali", native: "বাংলা" },
  { code: "mr", label: "Marathi", native: "मराठी" },
  { code: "te", label: "Telugu", native: "తెలుగు" },
];

export type Translation = {
  // Quick facts section
  factsKicker: string;
  factsHeading: string;
  factsSub: string;
  seeWalkthrough: string;
  facts: { kicker: string; title: string; desc: string }[];

  // Eligibility quiz
  quizKicker: string;
  quizHeading: string;
  quizSub: string;
  qAge: string;
  qCitizen: string;
  qResident: string;
  yes: string;
  no: string;
  eligibleTitle: string;
  eligibleDesc: string;
  eligibleCta: string;
  notEligibleTitle: string;
  notEligibleDesc: string;
  notEligibleCta: string;

  // FAQ
  faqKicker: string;
  faqHeading: string;
  faqSubBefore: string;
  faqSubLink: string;
  faqSubAfter: string;
  faqs: { q: string; a: string }[];
};

const en: Translation = {
  factsKicker: "/ 02 Essentials",
  factsHeading: "Quick facts at a glance",
  factsSub: "The bare minimum every first-time voter should know — bookmark these.",
  seeWalkthrough: "See full walkthrough",
  facts: [
    { kicker: "Age", title: "18+", desc: "Minimum age to vote in any Indian election — Lok Sabha, Vidhan Sabha or local body." },
    { kicker: "ID", title: "EPIC", desc: "Your Voter ID card, issued by the Election Commission of India. Download the e-EPIC anytime." },
    { kicker: "Apps", title: "NVSP", desc: "Register, update or check status — online at voters.eci.gov.in or via the Voter Helpline app." },
    { kicker: "Booth", title: "Know yours", desc: "Your polling booth is decided by your registered address. Find it on voters.eci.gov.in." },
  ],

  quizKicker: "/ 03 Quick check",
  quizHeading: "Are you eligible to vote?",
  quizSub: "Three questions. Ten seconds. Find out instantly whether you can register today.",
  qAge: "Are you 18 or older (by 1st January this year)?",
  qCitizen: "Are you a citizen of India?",
  qResident: "Do you live in the constituency where you want to register?",
  yes: "Yes",
  no: "No",
  eligibleTitle: "You're eligible! 🎉",
  eligibleDesc: "Next step: register with Form 6 on voters.eci.gov.in.",
  eligibleCta: "Start registering",
  notEligibleTitle: "Not quite yet",
  notEligibleDesc: "You need all three to register as a voter. Check the walkthrough for special cases (NRI voters, service voters, etc.).",
  notEligibleCta: "Learn more",

  faqKicker: "/ 04 Common questions",
  faqHeading: "First-timer FAQ",
  faqSubBefore: "The questions almost every new voter asks. Need more? ",
  faqSubLink: "Ask the AI assistant",
  faqSubAfter: ".",
  faqs: [
    { q: "I just turned 18. Can I vote in the next election?", a: "Yes — but you must first be registered. Apply via Form 6 on voters.eci.gov.in or the Voter Helpline app. Registration must be completed before the electoral roll closes for that election." },
    { q: "I lost my Voter ID. What do I do?", a: "You can download the e-EPIC (a digital copy of your Voter ID) for free from voters.eci.gov.in using your EPIC number or Form reference. For a physical replacement, file Form 002." },
    { q: "Can I vote without a Voter ID card?", a: "Yes — as long as your name is on the electoral roll, you can vote using any approved alternate photo ID: Aadhaar, PAN, passport, driving licence, MGNREGA card, bank passbook with photo, etc." },
    { q: "What is NOTA?", a: "NOTA stands for 'None of the Above'. It's the last button on the EVM and lets you vote without choosing any candidate. Your turnout is recorded but doesn't go to anyone." },
    { q: "Can I vote from a different city?", a: "No. You can only vote at the polling booth where you're registered. If you've moved, update your address using Form 8 before the roll closes." },
  ],
};

const hi: Translation = {
  factsKicker: "/ 02 ज़रूरी बातें",
  factsHeading: "एक नज़र में मुख्य तथ्य",
  factsSub: "हर नए मतदाता को कम-से-कम इतना तो पता होना चाहिए — इन्हें सहेज लें।",
  seeWalkthrough: "पूरा मार्गदर्शन देखें",
  facts: [
    { kicker: "आयु", title: "18+", desc: "किसी भी भारतीय चुनाव — लोकसभा, विधानसभा या स्थानीय निकाय — में मतदान की न्यूनतम आयु।" },
    { kicker: "पहचान", title: "EPIC", desc: "भारत निर्वाचन आयोग द्वारा जारी आपका मतदाता पहचान-पत्र। e-EPIC कभी भी डाउनलोड करें।" },
    { kicker: "ऐप", title: "NVSP", desc: "voters.eci.gov.in या Voter Helpline ऐप पर पंजीकरण, अपडेट या स्थिति जाँचें।" },
    { kicker: "बूथ", title: "अपना जानें", desc: "आपका मतदान केंद्र आपके पंजीकृत पते से तय होता है। voters.eci.gov.in पर देखें।" },
  ],

  quizKicker: "/ 03 तुरंत जाँच",
  quizHeading: "क्या आप मतदान के योग्य हैं?",
  quizSub: "तीन सवाल। दस सेकंड। तुरंत जानें कि आप आज पंजीकरण कर सकते हैं या नहीं।",
  qAge: "क्या आप 18 वर्ष या उससे अधिक के हैं (इस वर्ष 1 जनवरी तक)?",
  qCitizen: "क्या आप भारत के नागरिक हैं?",
  qResident: "क्या आप उसी निर्वाचन क्षेत्र में रहते हैं जहाँ पंजीकरण करना चाहते हैं?",
  yes: "हाँ",
  no: "नहीं",
  eligibleTitle: "आप योग्य हैं! 🎉",
  eligibleDesc: "अगला कदम: voters.eci.gov.in पर फॉर्म 6 भरकर पंजीकरण करें।",
  eligibleCta: "पंजीकरण शुरू करें",
  notEligibleTitle: "अभी नहीं",
  notEligibleDesc: "मतदाता पंजीकरण के लिए तीनों शर्तें ज़रूरी हैं। विशेष मामलों (NRI, सेवा मतदाता आदि) के लिए मार्गदर्शन देखें।",
  notEligibleCta: "और जानें",

  faqKicker: "/ 04 सामान्य सवाल",
  faqHeading: "नए मतदाताओं के सवाल",
  faqSubBefore: "लगभग हर नए मतदाता के सवाल। और जानना है? ",
  faqSubLink: "AI सहायक से पूछें",
  faqSubAfter: "।",
  faqs: [
    { q: "मैं अभी 18 का हुआ हूँ। क्या अगले चुनाव में मतदान कर सकता हूँ?", a: "हाँ — लेकिन पहले पंजीकरण ज़रूरी है। voters.eci.gov.in या Voter Helpline ऐप पर फॉर्म 6 भरें। पंजीकरण उस चुनाव के लिए मतदाता सूची बंद होने से पहले पूरा होना चाहिए।" },
    { q: "मेरा मतदाता पहचान-पत्र खो गया है। क्या करूँ?", a: "आप EPIC संख्या या फॉर्म रेफ़रेंस से voters.eci.gov.in पर मुफ़्त में e-EPIC (डिजिटल कॉपी) डाउनलोड कर सकते हैं। नया भौतिक कार्ड चाहिए तो फॉर्म 002 भरें।" },
    { q: "क्या मतदाता पहचान-पत्र के बिना वोट दे सकते हैं?", a: "हाँ — यदि आपका नाम मतदाता सूची में है, तो आप किसी भी मान्य फोटो पहचान (आधार, पैन, पासपोर्ट, ड्राइविंग लाइसेंस, मनरेगा कार्ड, फोटो वाली बैंक पासबुक आदि) से मतदान कर सकते हैं।" },
    { q: "NOTA क्या है?", a: "NOTA का अर्थ है 'इनमें से कोई नहीं'। यह EVM पर आख़िरी बटन है — किसी भी उम्मीदवार को वोट दिए बिना अपनी उपस्थिति दर्ज कराने का तरीक़ा।" },
    { q: "क्या मैं किसी दूसरे शहर से वोट दे सकता हूँ?", a: "नहीं। आप केवल उसी मतदान केंद्र पर वोट दे सकते हैं जहाँ आप पंजीकृत हैं। यदि आप शिफ़्ट हुए हैं, तो सूची बंद होने से पहले फॉर्म 8 से पता अपडेट करें।" },
  ],
};

const ta: Translation = {
  factsKicker: "/ 02 அடிப்படை",
  factsHeading: "சுருக்கமான முக்கிய தகவல்கள்",
  factsSub: "ஒவ்வொரு புதிய வாக்காளரும் தெரிந்துகொள்ள வேண்டிய அடிப்படை — இவற்றை சேமித்து வைக்கவும்.",
  seeWalkthrough: "முழு வழிகாட்டியை காண",
  facts: [
    { kicker: "வயது", title: "18+", desc: "எந்த இந்திய தேர்தலிலும் — மக்களவை, சட்டமன்றம் அல்லது உள்ளாட்சி — வாக்களிக்க குறைந்தபட்ச வயது." },
    { kicker: "அடையாளம்", title: "EPIC", desc: "இந்திய தேர்தல் ஆணையம் வழங்கும் உங்கள் வாக்காளர் அடையாள அட்டை. e-EPIC எப்போது வேண்டுமானாலும் பதிவிறக்கம் செய்யலாம்." },
    { kicker: "செயலி", title: "NVSP", desc: "voters.eci.gov.in அல்லது Voter Helpline செயலி வழியாக பதிவு, புதுப்பிப்பு அல்லது நிலை சரிபார்க்கவும்." },
    { kicker: "மையம்", title: "உங்களுடையது", desc: "உங்கள் வாக்குச்சாவடி உங்கள் பதிவு செய்யப்பட்ட முகவரியால் தீர்மானிக்கப்படுகிறது. voters.eci.gov.in-ல் கண்டறியவும்." },
  ],

  quizKicker: "/ 03 விரைவு சோதனை",
  quizHeading: "நீங்கள் வாக்களிக்க தகுதியானவரா?",
  quizSub: "மூன்று கேள்விகள். பத்து வினாடிகள். இன்றே பதிவு செய்ய முடியுமா என உடனே அறியவும்.",
  qAge: "நீங்கள் 18 வயது அல்லது அதற்கு மேல் (இந்த ஆண்டு ஜனவரி 1 வரை) உள்ளீர்களா?",
  qCitizen: "நீங்கள் இந்தியக் குடிமகனா?",
  qResident: "நீங்கள் பதிவு செய்ய விரும்பும் தொகுதியில் வசிக்கிறீர்களா?",
  yes: "ஆம்",
  no: "இல்லை",
  eligibleTitle: "நீங்கள் தகுதியானவர்! 🎉",
  eligibleDesc: "அடுத்த படி: voters.eci.gov.in-ல் படிவம் 6 மூலம் பதிவு செய்யவும்.",
  eligibleCta: "பதிவைத் தொடங்கு",
  notEligibleTitle: "இன்னும் இல்லை",
  notEligibleDesc: "வாக்காளராக பதிவு செய்ய மூன்றும் தேவை. சிறப்பு வழக்குகளுக்கு (NRI, சேவை வாக்காளர் போன்றவை) வழிகாட்டியை பார்க்கவும்.",
  notEligibleCta: "மேலும் அறிக",

  faqKicker: "/ 04 பொதுவான கேள்விகள்",
  faqHeading: "புதியவருக்கான கே.கே.வி.",
  faqSubBefore: "ஏறக்குறைய ஒவ்வொரு புதிய வாக்காளரும் கேட்கும் கேள்விகள். மேலும் வேண்டுமா? ",
  faqSubLink: "AI உதவியாளரிடம் கேளுங்கள்",
  faqSubAfter: ".",
  faqs: [
    { q: "நான் இப்போதுதான் 18 ஆனேன். அடுத்த தேர்தலில் வாக்களிக்க முடியுமா?", a: "ஆம் — ஆனால் முதலில் பதிவு செய்ய வேண்டும். voters.eci.gov.in அல்லது Voter Helpline செயலியில் படிவம் 6 பூர்த்தி செய்யவும். வாக்காளர் பட்டியல் மூடப்படும் முன் பதிவு முடிக்கப்பட வேண்டும்." },
    { q: "என் வாக்காளர் அட்டை தொலைந்தது. என்ன செய்வது?", a: "EPIC எண் அல்லது படிவ குறிப்பு மூலம் voters.eci.gov.in-ல் இலவசமாக e-EPIC பதிவிறக்கம் செய்யலாம். உடல் ரீதியான மாற்றுக்கு படிவம் 002 சமர்ப்பிக்கவும்." },
    { q: "வாக்காளர் அட்டை இல்லாமல் வாக்களிக்க முடியுமா?", a: "ஆம் — உங்கள் பெயர் வாக்காளர் பட்டியலில் இருந்தால், அங்கீகரிக்கப்பட்ட எந்த மாற்று புகைப்பட அடையாளமும் (ஆதார், PAN, பாஸ்போர்ட், ஓட்டுநர் உரிமம், MGNREGA அட்டை, புகைப்படத்துடன் வங்கி பாஸ்புத்தகம் போன்றவை) போதும்." },
    { q: "NOTA என்றால் என்ன?", a: "NOTA என்பது 'மேற்கண்ட எவருமில்லை'. EVM-ல் கடைசி பொத்தான் — எந்த வேட்பாளரையும் தேர்ந்தெடுக்காமல் வாக்கு பதிவு செய்யலாம்." },
    { q: "வேறு நகரத்திலிருந்து வாக்களிக்க முடியுமா?", a: "முடியாது. நீங்கள் பதிவு செய்த வாக்குச்சாவடியில் மட்டுமே வாக்களிக்க முடியும். இடம் மாறியிருந்தால், பட்டியல் மூடப்படும் முன் படிவம் 8 மூலம் முகவரியை புதுப்பிக்கவும்." },
  ],
};

const bn: Translation = {
  factsKicker: "/ ০২ অপরিহার্য",
  factsHeading: "এক নজরে মূল তথ্য",
  factsSub: "প্রতিটি নতুন ভোটারের জানা উচিত এই ন্যূনতম তথ্যগুলি — সংরক্ষণ করুন।",
  seeWalkthrough: "সম্পূর্ণ গাইড দেখুন",
  facts: [
    { kicker: "বয়স", title: "১৮+", desc: "যেকোনো ভারতীয় নির্বাচনে — লোকসভা, বিধানসভা বা স্থানীয় সংস্থা — ভোট দেওয়ার ন্যূনতম বয়স।" },
    { kicker: "পরিচয়", title: "EPIC", desc: "ভারতের নির্বাচন কমিশন প্রদত্ত আপনার ভোটার পরিচয়পত্র। যেকোনো সময় e-EPIC ডাউনলোড করুন।" },
    { kicker: "অ্যাপ", title: "NVSP", desc: "voters.eci.gov.in বা Voter Helpline অ্যাপের মাধ্যমে নিবন্ধন, আপডেট বা স্ট্যাটাস দেখুন।" },
    { kicker: "বুথ", title: "নিজেরটা জানুন", desc: "আপনার ভোটকেন্দ্র নিবন্ধিত ঠিকানার ভিত্তিতে নির্ধারিত। voters.eci.gov.in-এ খুঁজুন।" },
  ],

  quizKicker: "/ ০৩ দ্রুত যাচাই",
  quizHeading: "আপনি কি ভোট দিতে যোগ্য?",
  quizSub: "তিনটি প্রশ্ন। দশ সেকেন্ড। আজই নিবন্ধন করতে পারবেন কিনা জানুন।",
  qAge: "আপনার বয়স কি ১৮ বা তার বেশি (এই বছরের ১লা জানুয়ারির মধ্যে)?",
  qCitizen: "আপনি কি ভারতের নাগরিক?",
  qResident: "যে কেন্দ্রে নিবন্ধন করতে চান, সেখানে কি বসবাস করেন?",
  yes: "হ্যাঁ",
  no: "না",
  eligibleTitle: "আপনি যোগ্য! 🎉",
  eligibleDesc: "পরবর্তী ধাপ: voters.eci.gov.in-এ ফর্ম ৬ পূরণ করে নিবন্ধন করুন।",
  eligibleCta: "নিবন্ধন শুরু করুন",
  notEligibleTitle: "এখনও নয়",
  notEligibleDesc: "ভোটার নিবন্ধনের জন্য তিনটি শর্তই পূরণ হওয়া আবশ্যক। বিশেষ ক্ষেত্রে (NRI, সার্ভিস ভোটার) গাইড দেখুন।",
  notEligibleCta: "আরও জানুন",

  faqKicker: "/ ০৪ সাধারণ প্রশ্ন",
  faqHeading: "নতুনদের প্রশ্ন",
  faqSubBefore: "প্রায় প্রতিটি নতুন ভোটারের প্রশ্ন। আরও দরকার? ",
  faqSubLink: "AI সহকারীকে জিজ্ঞাসা করুন",
  faqSubAfter: "।",
  faqs: [
    { q: "আমি সবেমাত্র ১৮ হয়েছি। পরের নির্বাচনে কি ভোট দিতে পারব?", a: "হ্যাঁ — তবে আগে নিবন্ধন করতে হবে। voters.eci.gov.in বা Voter Helpline অ্যাপে ফর্ম ৬ পূরণ করুন। ভোটার তালিকা বন্ধ হওয়ার আগে নিবন্ধন সম্পন্ন হতে হবে।" },
    { q: "ভোটার কার্ড হারিয়েছি। কী করব?", a: "EPIC নম্বর বা ফর্ম রেফারেন্স দিয়ে voters.eci.gov.in থেকে বিনামূল্যে e-EPIC ডাউনলোড করুন। শারীরিক প্রতিস্থাপনের জন্য ফর্ম ০০২ জমা দিন।" },
    { q: "ভোটার কার্ড ছাড়া কি ভোট দেওয়া যায়?", a: "হ্যাঁ — যদি আপনার নাম ভোটার তালিকায় থাকে, তাহলে অনুমোদিত যেকোনো বিকল্প ফটো আইডি (আধার, PAN, পাসপোর্ট, ড্রাইভিং লাইসেন্স, MGNREGA কার্ড, ছবি সহ ব্যাঙ্ক পাসবুক) দিয়ে ভোট দিতে পারবেন।" },
    { q: "NOTA কী?", a: "NOTA মানে 'উপরের কেউ নয়'। EVM-এর শেষ বোতাম — কোনো প্রার্থীকে ভোট না দিয়েই উপস্থিতি নথিভুক্ত করার উপায়।" },
    { q: "অন্য শহর থেকে কি ভোট দিতে পারি?", a: "না। শুধুমাত্র যেখানে নিবন্ধিত সেই ভোটকেন্দ্রেই ভোট দিতে পারবেন। স্থানান্তরিত হলে, তালিকা বন্ধ হওয়ার আগে ফর্ম ৮ দিয়ে ঠিকানা আপডেট করুন।" },
  ],
};

const mr: Translation = {
  factsKicker: "/ ०२ आवश्यक",
  factsHeading: "एका नजरेत मुख्य तथ्ये",
  factsSub: "प्रत्येक नवीन मतदाराला माहीत असावीत अशी किमान माहिती — जतन करा.",
  seeWalkthrough: "संपूर्ण मार्गदर्शन पहा",
  facts: [
    { kicker: "वय", title: "१८+", desc: "कोणत्याही भारतीय निवडणुकीत — लोकसभा, विधानसभा किंवा स्थानिक स्वराज्य — मतदानासाठी किमान वय." },
    { kicker: "ओळख", title: "EPIC", desc: "भारत निवडणूक आयोगाने जारी केलेले तुमचे मतदार ओळखपत्र. e-EPIC कधीही डाउनलोड करा." },
    { kicker: "अॅप", title: "NVSP", desc: "voters.eci.gov.in किंवा Voter Helpline अॅपवर नोंदणी, अद्यतन किंवा स्थिती तपासा." },
    { kicker: "बूथ", title: "तुमचा ओळखा", desc: "तुमचे मतदान केंद्र तुमच्या नोंदणीकृत पत्त्यावरून ठरते. voters.eci.gov.in वर शोधा." },
  ],

  quizKicker: "/ ०३ झटपट तपासणी",
  quizHeading: "तुम्ही मतदानासाठी पात्र आहात का?",
  quizSub: "तीन प्रश्न. दहा सेकंद. आजच नोंदणी करू शकता का ते लगेच जाणून घ्या.",
  qAge: "तुम्ही १८ किंवा त्याहून अधिक वयाचे आहात का (या वर्षी १ जानेवारीपर्यंत)?",
  qCitizen: "तुम्ही भारताचे नागरिक आहात का?",
  qResident: "जिथे नोंदणी करायची आहे त्या मतदारसंघात तुम्ही राहता का?",
  yes: "होय",
  no: "नाही",
  eligibleTitle: "तुम्ही पात्र आहात! 🎉",
  eligibleDesc: "पुढचा टप्पा: voters.eci.gov.in वर फॉर्म ६ भरून नोंदणी करा.",
  eligibleCta: "नोंदणी सुरू करा",
  notEligibleTitle: "अद्याप नाही",
  notEligibleDesc: "मतदार म्हणून नोंदणीसाठी तिन्ही अटी आवश्यक आहेत. विशेष प्रकरणांसाठी (NRI, सेवा मतदार) मार्गदर्शन पहा.",
  notEligibleCta: "अधिक जाणून घ्या",

  faqKicker: "/ ०४ सामान्य प्रश्न",
  faqHeading: "नवीन मतदारांचे प्रश्न",
  faqSubBefore: "जवळपास प्रत्येक नवीन मतदार विचारतो असे प्रश्न. अधिक हवे? ",
  faqSubLink: "AI सहाय्यकाला विचारा",
  faqSubAfter: ".",
  faqs: [
    { q: "मी नुकताच १८ झालो. पुढच्या निवडणुकीत मतदान करू शकतो का?", a: "होय — पण प्रथम नोंदणी आवश्यक आहे. voters.eci.gov.in किंवा Voter Helpline अॅपवर फॉर्म ६ भरा. त्या निवडणुकीसाठी मतदार यादी बंद होण्यापूर्वी नोंदणी पूर्ण व्हावी." },
    { q: "माझे मतदार ओळखपत्र हरवले आहे. काय करावे?", a: "EPIC क्रमांक किंवा फॉर्म संदर्भ वापरून voters.eci.gov.in वरून मोफत e-EPIC डाउनलोड करा. भौतिक बदलासाठी फॉर्म ००२ भरा." },
    { q: "मतदार ओळखपत्राशिवाय मतदान करता येते का?", a: "होय — तुमचे नाव मतदार यादीत असल्यास, मान्य पर्यायी फोटो ओळख (आधार, PAN, पासपोर्ट, ड्रायव्हिंग लायसन्स, MGNREGA कार्ड, फोटोसह बँक पासबुक) वापरून मतदान करू शकता." },
    { q: "NOTA म्हणजे काय?", a: "NOTA म्हणजे 'वरीलपैकी कोणीही नाही'. EVM वरील शेवटचे बटण — कोणत्याही उमेदवाराला मत न देता तुमची उपस्थिती नोंदवण्याचा मार्ग." },
    { q: "दुसऱ्या शहरातून मतदान करता येते का?", a: "नाही. तुम्ही जिथे नोंदणीकृत आहात त्याच मतदान केंद्रावर मतदान करू शकता. स्थलांतर केले असल्यास, यादी बंद होण्यापूर्वी फॉर्म ८ ने पत्ता अद्यतनित करा." },
  ],
};

const te: Translation = {
  factsKicker: "/ 02 ముఖ్యమైనవి",
  factsHeading: "ఒక చూపులో ముఖ్య విషయాలు",
  factsSub: "ప్రతి కొత్త ఓటరుకు తెలిసి ఉండాల్సిన కనీస సమాచారం — వీటిని సేవ్ చేసుకోండి.",
  seeWalkthrough: "పూర్తి గైడ్ చూడండి",
  facts: [
    { kicker: "వయస్సు", title: "18+", desc: "ఏ భారతీయ ఎన్నికలో అయినా — లోక్‌సభ, శాసనసభ లేదా స్థానిక సంస్థ — ఓటు వేయడానికి కనీస వయస్సు." },
    { kicker: "గుర్తింపు", title: "EPIC", desc: "భారత ఎన్నికల సంఘం జారీ చేసిన మీ ఓటరు గుర్తింపు కార్డు. e-EPIC ఎప్పుడైనా డౌన్‌లోడ్ చేసుకోండి." },
    { kicker: "యాప్", title: "NVSP", desc: "voters.eci.gov.in లేదా Voter Helpline యాప్ ద్వారా నమోదు, నవీకరణ లేదా స్థితి తనిఖీ చేయండి." },
    { kicker: "బూత్", title: "మీది తెలుసుకోండి", desc: "మీ పోలింగ్ కేంద్రం మీ నమోదిత చిరునామా ద్వారా నిర్ణయించబడుతుంది. voters.eci.gov.in లో చూడండి." },
  ],

  quizKicker: "/ 03 త్వరిత తనిఖీ",
  quizHeading: "మీరు ఓటు వేయడానికి అర్హులా?",
  quizSub: "మూడు ప్రశ్నలు. పది సెకన్లు. ఈరోజే నమోదు చేసుకోగలరో లేదో వెంటనే తెలుసుకోండి.",
  qAge: "మీరు 18 సంవత్సరాలు లేదా అంతకంటే ఎక్కువ (ఈ సంవత్సరం జనవరి 1 నాటికి) ఉన్నారా?",
  qCitizen: "మీరు భారత పౌరులా?",
  qResident: "నమోదు చేసుకోవాలనుకుంటున్న నియోజకవర్గంలో మీరు నివసిస్తున్నారా?",
  yes: "అవును",
  no: "కాదు",
  eligibleTitle: "మీరు అర్హులు! 🎉",
  eligibleDesc: "తదుపరి దశ: voters.eci.gov.in లో ఫారం 6 తో నమోదు చేసుకోండి.",
  eligibleCta: "నమోదు ప్రారంభించండి",
  notEligibleTitle: "ఇంకా కాదు",
  notEligibleDesc: "ఓటరుగా నమోదు చేసుకోవడానికి మూడూ అవసరం. ప్రత్యేక సందర్భాలకు (NRI, సర్వీస్ ఓటరు) గైడ్ చూడండి.",
  notEligibleCta: "మరింత తెలుసుకోండి",

  faqKicker: "/ 04 సాధారణ ప్రశ్నలు",
  faqHeading: "కొత్తవారి ప్రశ్నలు",
  faqSubBefore: "దాదాపు ప్రతి కొత్త ఓటరు అడిగే ప్రశ్నలు. మరిన్ని కావాలా? ",
  faqSubLink: "AI సహాయకుడిని అడగండి",
  faqSubAfter: ".",
  faqs: [
    { q: "నేను ఇప్పుడే 18 అయ్యాను. తదుపరి ఎన్నికలలో ఓటు వేయగలనా?", a: "అవును — కానీ ముందు నమోదు అవసరం. voters.eci.gov.in లేదా Voter Helpline యాప్‌లో ఫారం 6 పూరించండి. ఆ ఎన్నికల కోసం ఓటరు జాబితా మూసివేయడానికి ముందు నమోదు పూర్తి కావాలి." },
    { q: "నా ఓటరు కార్డు పోయింది. ఏం చేయాలి?", a: "EPIC నంబర్ లేదా ఫారం రిఫరెన్స్ ఉపయోగించి voters.eci.gov.in నుండి ఉచితంగా e-EPIC డౌన్‌లోడ్ చేసుకోండి. భౌతిక భర్తీకి ఫారం 002 సమర్పించండి." },
    { q: "ఓటరు కార్డు లేకుండా ఓటు వేయవచ్చా?", a: "అవును — మీ పేరు ఓటరు జాబితాలో ఉంటే, ఆమోదించబడిన ఏదైనా ప్రత్యామ్నాయ ఫోటో ID (ఆధార్, PAN, పాస్‌పోర్ట్, డ్రైవింగ్ లైసెన్స్, MGNREGA కార్డ్, ఫోటోతో బ్యాంక్ పాస్‌బుక్) ఉపయోగించి ఓటు వేయవచ్చు." },
    { q: "NOTA అంటే ఏమిటి?", a: "NOTA అంటే 'వీటిలో ఎవరూ కాదు'. EVM పై చివరి బటన్ — ఏ అభ్యర్థికీ ఓటు వేయకుండా మీ హాజరును నమోదు చేసుకునే మార్గం." },
    { q: "మరో నగరం నుండి ఓటు వేయవచ్చా?", a: "కాదు. మీరు నమోదు చేసుకున్న పోలింగ్ కేంద్రంలో మాత్రమే ఓటు వేయగలరు. మారినట్లయితే, జాబితా మూసివేయడానికి ముందు ఫారం 8 ద్వారా చిరునామాను నవీకరించండి." },
  ],
};

export const TRANSLATIONS: Record<LangCode, Translation> = { en, hi, ta, bn, mr, te };
