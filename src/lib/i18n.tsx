import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type SupportedLocale = "en" | "hi" | "gu";

type Translations = Record<SupportedLocale, Record<string, string>>;

const translations: Translations = {
  en: {
    app_name: "NagarSewa",
    tagline: "Service • Community • Improvement",
    continue: "Continue",
    join_tagline: "Join thousands of citizens making real change happen",
    welcome_back: "Welcome Back",
    signin_subtitle: "Sign in to access NagarSewa",
    username: "Username",
    email: "Email",
    mobile: "Mobile number",
    password: "Password",
    signing_in: "Signing In...",
    sign_in: "Sign In",
    or_continue_with: "or continue with",
    back_to_landing: "← Back to Landing",
    csc_connect: "Digital Seva Connect",
    google: "Google",
    github: "GitHub",
    language: "Language",
  },
  hi: {
    app_name: "नगरसेवा",
    tagline: "सेवा • समुदाय • सुधार",
    continue: "जारी रखें",
    join_tagline: "हज़ारों नागरिकों से जुड़ें और बदलाव लाएँ",
    welcome_back: "वापसी पर स्वागत है",
    signin_subtitle: "नगरसेवा तक पहुँचने के लिए साइन इन करें",
    username: "उपयोगकर्ता नाम",
    email: "ईमेल",
    mobile: "मोबाइल नंबर",
    password: "पासवर्ड",
    signing_in: "साइन इन किया जा रहा है...",
    sign_in: "साइन इन",
    or_continue_with: "या जारी रखें",
    back_to_landing: "← लैंडिंग पर वापस जाएँ",
    csc_connect: "डिजिटल सेवा कनेक्ट",
    google: "गूगल",
    github: "गिटहब",
    language: "भाषा",
  },
  gu: {
    app_name: "નગરસેવા",
    tagline: "સેવા • સમુદાય • સુધાર",
    continue: "ચાલુ રાખો",
    join_tagline: "હજારો નાગરિકો સાથે જોડાઓ અને બદલાવ લાવો",
    welcome_back: "પાછા આવવા બદલ સ્વાગત છે",
    signin_subtitle: "નગરસેવા ઍક્સેસ કરવા સાઇન ઇન કરો",
    username: "વપરાશકર્તા નામ",
    email: "ઇમેઇલ",
    mobile: "મોબાઇલ નંબર",
    password: "પાસવર્ડ",
    signing_in: "સાઇન ઇન થઈ રહ્યું છે...",
    sign_in: "સાઇન ઇન",
    or_continue_with: "અથવા ચાલુ રાખો",
    back_to_landing: "← લેન્ડિંગ પર પાછા જાઓ",
    csc_connect: "ડિજિટલ સેવા કનેક્ટ",
    google: "ગુગલ",
    github: "ગિથબ",
    language: "ભાષા",
  },
};

interface I18nContextValue {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export const I18nProvider = ({ children }: { children: React.ReactNode }) => {
  const [locale, setLocaleState] = useState<SupportedLocale>(() => {
    const stored = localStorage.getItem("nagarSevaLocale") as SupportedLocale | null;
    return stored || "en";
  });

  const setLocale = useCallback((l: SupportedLocale) => {
    setLocaleState(l);
    localStorage.setItem("nagarSevaLocale", l);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("nagarSevaLocale") as SupportedLocale | null;
    if (stored && stored !== locale) setLocaleState(stored);
  }, []);

  const t = useCallback(
    (key: string) => translations[locale][key] ?? translations.en[key] ?? key,
    [locale]
  );

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
};

export const supportedLocales: { code: SupportedLocale; label: string }[] = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिंदी" },
  { code: "gu", label: "ગુજરાતી" },
];


