import { Translations } from "./en"

// eng to ban type: https://www.google.com/intl/bn/inputtools/try/
const ar: Translations = {
  common: {
    ok: "نعم",
    cancel: "حذف",
    back: "خلف",
    logOut: "تسجيل خروج",
  },
  homeScreen: {
    voice: "এখনই কথা বলুন",
    learning: "শেখার বিষয়বস্তু",
    ls: "লাইভ স্ট্রিম",
    lsBtn: "লাইভে যাও!",
  },
  accountScreen: {
    position: "অবস্থান:",
    skill: "দক্ষতা",
    logNHistory: "ইন্সটা টক লগ এবং বিজ্ঞপ্তি",
    loadBtn: "আরও দেখুন",
  },
  chatScreen: {
    search: "চ্যাট খুঁজুন...",
    instaChat: "ইন্সটা চ্যাট",
    instaMsg: "ব্যবহারকারীদের সাথে চ্যাটিং শুরু করুন",
    friends: "বন্ধুরা",
  },
  chatReqScreen: {
    request: "রিকুয়েস্টেড",
    instruction: " • একসেপ্ট করতে রিপ্লে করুন",
  },
  leaderBoardScreen: {
    searchPlaceholder: "Search user...",
  },
  welcomeScreen: {
    postscript:
      "ربما لا يكون هذا هو الشكل الذي يبدو عليه تطبيقك مالم يمنحك المصمم هذه الشاشات وشحنها في هذه الحالة",
    readyForLaunch: "تطبيقك تقريبا جاهز للتشغيل",
    exciting: "اوه هذا مثير",
    letsGo: "لنذهب",
  },
  errorScreen: {
    title: "هناك خطأ ما",
    friendlySubtitle:
      "هذه هي الشاشة التي سيشاهدها المستخدمون في عملية الانتاج عند حدوث خطأ. سترغب في تخصيص هذه الرسالة ( الموجودة في 'ts.en/i18n/app') وربما التخطيط ايضاً ('app/screens/ErrorScreen'). إذا كنت تريد إزالة هذا بالكامل، تحقق من 'app/app.tsp' من اجل عنصر <ErrorBoundary>.",
    reset: "اعادة تعيين التطبيق",
    traceTitle: "خطأ من مجموعة %{name}",
  },
  emptyStateComponent: {
    generic: {
      heading: "فارغة جداً....حزين",
      content: "لا توجد بيانات حتى الآن. حاول النقر فوق الزر لتحديث التطبيق او اعادة تحميله.",
      button: "لنحاول هذا مرّة أخرى",
    },
  },
  errors: {
    invalidEmail: "عنوان البريد الالكتروني غير صالح",
  },
  loginScreen: {
    signIn: "تسجيل الدخول",
    enterDetails:
      ".ادخل التفاصيل الخاصة بك ادناه لفتح معلومات سرية للغاية. لن تخمن ابداً ما الذي ننتظره. او ربما ستفعل انها انها ليست علم الصواريخ",
    emailFieldLabel: "البريد الالكتروني",
    passwordFieldLabel: "كلمة السر",
    emailFieldPlaceholder: "ادخل بريدك الالكتروني",
    passwordFieldPlaceholder: "كلمة السر هنا فائقة السر",
    tapToSignIn: "انقر لتسجيل الدخول!",
    hint: "(: تلميح: يمكنك استخدام اي عنوان بريد الكتروني وكلمة السر المفضلة لديك",
  },
}

export default ar
