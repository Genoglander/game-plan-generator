import { useI18n, type Language } from "@/lib/i18n";

const LANGS: { code: Language; label: string }[] = [
  { code: "zh", label: "中" },
  { code: "ja", label: "日" },
  { code: "en", label: "EN" },
];

export function LangSwitcher() {
  const { lang, setLang } = useI18n();

  return (
    <div className="flex items-center gap-1 bg-muted/60 border border-border rounded-lg p-1 font-mono">
      {LANGS.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          className={`px-3 py-1 rounded-md text-sm font-bold tracking-wide transition-all duration-150 ${
            lang === code
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground hover:bg-background"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
