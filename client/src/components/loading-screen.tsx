import React, { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";

const STEPS_ZH = [
  "正在解析游戏点子...",
  "构建世界观设定...",
  "规划核心玩法循环...",
  "分配开发任务...",
  "评估技术难点...",
  "排列一周计划...",
  "整理企划书...",
];

const STEPS_JA = [
  "ゲームアイデアを解析中...",
  "世界観を構築中...",
  "コアゲームループを設計中...",
  "開発タスクを割り当て中...",
  "技術的課題を評価中...",
  "週間スケジュールを組み立て中...",
  "企画書を整理中...",
];

const STEPS_EN = [
  "Parsing your game idea...",
  "Building the world concept...",
  "Designing the core game loop...",
  "Assigning development tasks...",
  "Evaluating technical challenges...",
  "Assembling the weekly schedule...",
  "Finalizing the design document...",
];

export function LoadingScreen() {
  const { lang } = useI18n();
  const steps = lang === "zh" ? STEPS_ZH : lang === "ja" ? STEPS_JA : STEPS_EN;

  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [dots, setDots] = useState("");

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((s) => (s + 1) % steps.length);
    }, 1400);

    const progressInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 92) return p;
        return p + Math.random() * 3;
      });
    }, 200);

    const dotsInterval = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "" : d + "."));
    }, 400);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
      clearInterval(dotsInterval);
    };
  }, [steps.length]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm">
      <div className="w-full max-w-md mx-auto px-6 space-y-8">

        <div className="flex justify-center">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
            <div
              className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary"
              style={{ animation: "spin 1s linear infinite" }}
            />
            <div
              className="absolute inset-2 rounded-full border-4 border-transparent border-b-accent"
              style={{ animation: "spin 1.5s linear infinite reverse" }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-5 h-5 rounded-full bg-primary animate-pulse" />
            </div>
          </div>
        </div>

        <div className="text-center space-y-1 min-h-[3rem]">
          <p
            key={currentStep}
            className="text-lg font-bold text-foreground transition-all duration-300"
            style={{ animation: "fadeInUp 0.4s ease" }}
          >
            {steps[currentStep]}
          </p>
          <p className="font-mono text-sm text-muted-foreground">
            AI{dots}
          </p>
        </div>

        <div className="space-y-2">
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
              style={{ width: `${Math.min(progress, 92)}%` }}
            />
          </div>
          <div className="flex justify-between font-mono text-xs text-muted-foreground">
            <span>0%</span>
            <span>{Math.round(Math.min(progress, 92))}%</span>
            <span>100%</span>
          </div>
        </div>

        <div className="flex justify-center gap-2">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === currentStep
                  ? "bg-primary scale-125"
                  : i < currentStep
                  ? "bg-primary/40"
                  : "bg-muted"
              }`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
