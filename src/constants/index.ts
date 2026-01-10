import pc from "picocolors";
import { Formatter } from "picocolors/types";
import { Framework, Variant } from "../types/index.type";

export const frameworkList = ["Vue", "React", "Vanilla"] as const;
export const variantList = ["TypeScript", "JavaScript"] as const;

export const variantMap: Record<Variant, string> = {
  TypeScript: "ts",
  JavaScript: "js",
};

export const frameworkMap: Record<Framework, string> = {
  Vue: "vue",
  React: "react",
  Vanilla: "vanilla",
};

export const reverseFrameworkMap = Object.fromEntries(
  Object.entries(frameworkMap).map(([k, v]) => [v, k])
) as Record<string, Framework>;

export const frameworkIcon: Record<Framework, { icon: string; color: Formatter }> = {
  Vue: {
    icon: "🌿",
    color: pc.green,
  },
  React: {
    icon: "⚛️ ",
    color: pc.magenta,
  },
  Vanilla: {
    icon: "📜",
    color: pc.yellow,
  },
};
