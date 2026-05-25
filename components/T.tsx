"use client";
import { useLanguage } from "./LanguageProvider";

// Simple translation component — use in any page/component
// <T en="Hello" zh="你好" />
export default function T({ en, zh }: { en: string; zh: string }) {
  const { lang } = useLanguage();
  return <>{lang === 'zh' ? zh : en}</>;
}
