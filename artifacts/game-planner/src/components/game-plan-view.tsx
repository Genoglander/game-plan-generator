import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n";
import { type GamePlan } from "@workspace/api-client-react";

interface GamePlanViewProps {
  plan: GamePlan;
}

export function GamePlanView({ plan }: GamePlanViewProps) {
  const { designDoc, taskList, technicalChallenges, weeklyPlan } = plan;
  const { t, lang } = useI18n();

  const priorityLabel = (p: string) => {
    const key = p.toLowerCase();
    if (key === "high") return t("priorityHigh");
    if (key === "medium") return t("priorityMedium");
    return t("priorityLow");
  };

  const difficultyLabel = (d: string) => {
    const key = d.toLowerCase();
    if (key === "hard") return t("difficultyHard");
    if (key === "medium") return t("difficultyMedium");
    return t("difficultyEasy");
  };

  const dayLabel = (day: number) =>
    lang === "zh"
      ? `${t("day")} ${day} ${t("daySuffix")}`
      : `${t("day")} ${day}${t("daySuffix")}`;

  return (
    <div id="game-plan-export" className="space-y-8 w-full p-2">

      {/* 01 — Design Doc */}
      <section className="animate-fade-in" style={{ animationDelay: "0ms" }}>
        <h2 className="text-2xl font-black uppercase tracking-tight mb-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white text-lg">01</div>
          {t("section1")}
          <span className="text-muted-foreground font-mono text-sm ml-2 font-normal">DESIGN_DOC</span>
        </h2>
        <Card className="border-2 border-border shadow-[6px_6px_0px_0px_hsl(var(--border))] rounded-xl overflow-hidden">
          <div className="bg-primary/10 border-b-2 border-border p-6">
            <h3 className="text-3xl font-black text-foreground mb-2">{designDoc.title}</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="font-mono uppercase">{designDoc.genre}</Badge>
              {designDoc.platforms.map((p, i) => (
                <Badge key={i} variant="outline" className="font-mono uppercase border-2">{p}</Badge>
              ))}
            </div>
          </div>
          <CardContent className="p-6 space-y-6">
            <div>
              <h4 className="font-bold text-muted-foreground uppercase text-sm mb-2">{t("concept")}</h4>
              <p className="text-lg font-medium leading-relaxed">{designDoc.concept}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-muted-foreground uppercase text-sm mb-2">{t("coreLoop")}</h4>
                <p className="text-base bg-muted/50 p-4 rounded-lg border border-border">{designDoc.coreLoop}</p>
              </div>
              <div>
                <h4 className="font-bold text-muted-foreground uppercase text-sm mb-2">{t("targetAudience")}</h4>
                <p className="text-base bg-muted/50 p-4 rounded-lg border border-border">{designDoc.targetAudience}</p>
              </div>
            </div>
            {designDoc.features && designDoc.features.length > 0 && (
              <div>
                <h4 className="font-bold text-muted-foreground uppercase text-sm mb-2">{t("keyFeatures")}</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {designDoc.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary mt-1">✦</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* 02 — Task List */}
      <section className="animate-fade-in" style={{ animationDelay: "150ms" }}>
        <h2 className="text-2xl font-black uppercase tracking-tight mb-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-secondary flex items-center justify-center text-white text-lg">02</div>
          {t("section2")}
          <span className="text-muted-foreground font-mono text-sm ml-2 font-normal">TASK_LIST</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {taskList.map((task) => (
            <Card key={task.id} className="border-2 border-border shadow-[4px_4px_0px_0px_hsl(var(--border))] hover:shadow-[6px_6px_0px_0px_hsl(var(--secondary)/0.3)] transition-all">
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <Badge variant="outline" className="font-mono bg-background border-2">{task.category}</Badge>
                  <Badge
                    className={`font-bold ${
                      task.priority.toLowerCase() === "high"
                        ? "bg-destructive text-destructive-foreground"
                        : task.priority.toLowerCase() === "medium"
                        ? "bg-amber-500 text-white"
                        : "bg-emerald-500 text-white"
                    }`}
                  >
                    {priorityLabel(task.priority)}
                  </Badge>
                </div>
                <h4 className="font-bold text-lg mb-2">{task.title}</h4>
                {task.description && (
                  <p className="text-sm text-muted-foreground mb-4">{task.description}</p>
                )}
                <div className="flex items-center text-sm font-mono text-muted-foreground mt-auto pt-4 border-t border-border">
                  <span className="bg-muted px-2 py-1 rounded">
                    {t("estHours")} {task.estimatedHours}{t("estSuffix")}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 03 — Technical Challenges */}
      <section className="animate-fade-in" style={{ animationDelay: "300ms" }}>
        <h2 className="text-2xl font-black uppercase tracking-tight mb-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-destructive flex items-center justify-center text-white text-lg">03</div>
          {t("section3")}
          <span className="text-muted-foreground font-mono text-sm ml-2 font-normal">TECH_CHALLENGES</span>
        </h2>
        <div className="space-y-4">
          {technicalChallenges.map((challenge, i) => (
            <div
              key={i}
              className="bg-card border-2 border-border rounded-xl p-6 shadow-[4px_4px_0px_0px_hsl(var(--border))] relative overflow-hidden group hover:border-destructive/50 transition-colors"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-destructive" />
              <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-4">
                <h3 className="text-xl font-bold">{challenge.title}</h3>
                <Badge
                  variant="outline"
                  className={`font-mono border-2 ${
                    challenge.difficulty.toLowerCase() === "hard"
                      ? "border-destructive text-destructive"
                      : challenge.difficulty.toLowerCase() === "medium"
                      ? "border-amber-500 text-amber-600"
                      : "border-emerald-500 text-emerald-600"
                  }`}
                >
                  {difficultyLabel(challenge.difficulty)}
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-muted-foreground uppercase">{t("problem")}</span>
                  <p className="text-sm p-3 bg-muted/30 rounded border border-border">{challenge.description}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-accent uppercase">{t("solution")}</span>
                  <p className="text-sm p-3 bg-accent/10 text-accent-foreground rounded border border-accent/20">{challenge.solution}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 04 — Weekly Plan */}
      <section className="animate-fade-in" style={{ animationDelay: "450ms" }}>
        <h2 className="text-2xl font-black uppercase tracking-tight mb-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-accent flex items-center justify-center text-accent-foreground text-lg">04</div>
          {t("section4")}
          <span className="text-muted-foreground font-mono text-sm ml-2 font-normal">WEEKLY_PLAN</span>
        </h2>
        <div className="relative border-l-4 border-border ml-4 md:ml-6 space-y-8 py-4">
          {weeklyPlan.map((dayPlan, i) => (
            <div key={i} className="relative pl-6 md:pl-8">
              <div className="absolute w-6 h-6 rounded-full bg-background border-4 border-accent -left-[15px] top-1 z-10" />
              <div className="bg-card border-2 border-border rounded-xl p-5 shadow-[4px_4px_0px_0px_hsl(var(--border))] hover:translate-x-1 transition-transform">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4 border-b border-border pb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-black text-xl text-accent">{dayLabel(dayPlan.day)}</span>
                    <span className="font-bold text-lg">{dayPlan.label}</span>
                  </div>
                  <Badge variant="secondary" className="font-mono bg-accent/20 text-accent-foreground border border-accent/30">
                    {t("milestone")}: {dayPlan.milestone}
                  </Badge>
                </div>
                <ul className="space-y-2">
                  {dayPlan.tasks.map((task, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm font-medium">
                      <div className="w-4 h-4 rounded-sm border-2 border-muted mt-0.5 flex-shrink-0" />
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
