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
