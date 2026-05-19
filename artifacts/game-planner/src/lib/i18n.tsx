import React, { createContext, useContext, useState } from "react";

export type Language = "zh" | "ja" | "en";

export const translations = {
  zh: {
    systemOnline: "系统在线 // V1.0",
    title: "游戏企划生成器",
    subtitle: "输入一句游戏点子，AI 自动生成完整企划书、任务清单与开发计划。",
    inputLabel: "输入游戏点子",
    inputPlaceholder: "例如：一款赛博朋克农场模拟器，玩家种植霓虹农作物来还清企业债务……",
    generating: "生成中...",
    generateBtn: "生成企划书",
    toastRequiredTitle: "请输入内容",
    toastRequiredDesc: "请先输入一个游戏点子。",
    toastErrorTitle: "生成失败",
    toastErrorDesc: "无法生成企划，请重试。",
    statusSuccess: "状态：生成成功",
    regenerate: "重新生成",
    section1: "企划书",
    section2: "制作任务清单",
    section3: "技术难点",
    section4: "一周开发计划",
    concept: "游戏概念",
    coreLoop: "核心循环",
    targetAudience: "目标受众",
    keyFeatures: "主要特性",
    problem: "问题描述",
    solution: "解决方案",
    day: "第",
    daySuffix: "天",
    milestone: "里程碑",
    estHours: "预计",
    estSuffix: "小时",
    priorityHigh: "高优先级",
    priorityMedium: "中优先级",
    priorityLow: "低优先级",
    difficultyHard: "困难",
    difficultyMedium: "中等",
    difficultyEasy: "简单",
    exportMd: "导出 Markdown",
    exportPng: "导出 PNG",
    exporting: "导出中...",
  },
  ja: {
    systemOnline: "システム起動 // V1.0",
    title: "ゲーム企画ジェネレーター",
    subtitle: "ゲームのアイデアを入力すると、AIが企画書・タスクリスト・開発計画を自動生成します。",
    inputLabel: "ゲームアイデアを入力",
    inputPlaceholder: "例：ネオン作物を育てて企業の借金を返済するサイバーパンク農場シミュレーター…",
    generating: "生成中...",
    generateBtn: "企画書を生成",
    toastRequiredTitle: "入力が必要です",
    toastRequiredDesc: "ゲームのアイデアを入力してください。",
    toastErrorTitle: "エラー",
    toastErrorDesc: "生成に失敗しました。もう一度お試しください。",
    statusSuccess: "ステータス：生成成功",
    regenerate: "再生成",
    section1: "企画書",
    section2: "制作タスクリスト",
    section3: "技術的課題",
    section4: "一週間開発計画",
    concept: "コンセプト",
    coreLoop: "コアループ",
    targetAudience: "ターゲット層",
    keyFeatures: "主な特徴",
    problem: "問題",
    solution: "解決策",
    day: "Day",
    daySuffix: "",
    milestone: "マイルストーン",
    estHours: "見積",
    estSuffix: "時間",
    priorityHigh: "高",
    priorityMedium: "中",
    priorityLow: "低",
    difficultyHard: "難しい",
    difficultyMedium: "普通",
    difficultyEasy: "簡単",
    exportMd: "Markdown 出力",
    exportPng: "PNG 出力",
    exporting: "出力中...",
  },
  en: {
    systemOnline: "SYSTEM ONLINE // V1.0",
    title: "Game Plan Generator",
    subtitle: "Turn your game concept into a complete, structured development plan in seconds.",
    inputLabel: "Input Game Idea",
    inputPlaceholder: "e.g. A cyberpunk farming simulator where you grow neon crops to pay off your corporate debt...",
    generating: "Generating Plan...",
    generateBtn: "Generate Game Plan",
    toastRequiredTitle: "Input required",
    toastRequiredDesc: "Please enter a game idea first.",
    toastErrorTitle: "Error",
    toastErrorDesc: "Failed to generate game plan. Please try again.",
    statusSuccess: "STATUS: SUCCESS",
    regenerate: "Regenerate",
    section1: "Design Doc",
    section2: "Task List",
    section3: "Technical Challenges",
    section4: "Weekly Dev Plan",
    concept: "Concept",
    coreLoop: "Core Loop",
    targetAudience: "Target Audience",
    keyFeatures: "Key Features",
    problem: "Problem",
    solution: "Solution",
    day: "DAY",
    daySuffix: "",
    milestone: "Milestone",
    estHours: "EST:",
    estSuffix: "h",
    priorityHigh: "HIGH",
    priorityMedium: "MEDIUM",
    priorityLow: "LOW",
    difficultyHard: "HARD",
    difficultyMedium: "MEDIUM",
    difficultyEasy: "EASY",
    exportMd: "Export Markdown",
    exportPng: "Export PNG",
    exporting: "Exporting...",
  },
} satisfies Record<Language, Record<string, string>>;

export type TranslationKey = keyof typeof translations.en;

interface I18nContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("zh");

  const t = (key: TranslationKey): string => {
    return translations[lang][key] ?? translations.en[key] ?? key;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
