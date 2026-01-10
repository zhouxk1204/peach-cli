import { execSync } from "child_process";
import { Command } from "commander";
import gradient from "gradient-string";
import os from "os";
import pc from "picocolors";
import { version } from "../../../package.json";
import { consolaInstance } from "../../utils/logger";

// Gradient colors for ASCII Art (Vice style)
const VICE_GRADIENT = ["#1d82e4", "#7660c5", "#c4496c"];

function getPnpmVersion(): string {
  try {
    return execSync("pnpm -v", { encoding: "utf-8" }).trim();
  } catch {
    return "Not installed";
  }
}

export const infoCommand = () => {
  return new Command("info")
    .description("display peach-cli information")
    .action(() => {
      // Print gradient ASCII logo
      consolaInstance.log(
        gradient(VICE_GRADIENT, { interpolation: "hsv" }).multiline(
          `
 ███          ███████████  ██████████   █████████     █████████  █████   █████
▒▒▒███       ▒▒███▒▒▒▒▒███▒▒███▒▒▒▒▒█  ███▒▒▒▒▒███   ███▒▒▒▒▒███▒▒███   ▒▒███ 
  ▒▒▒███      ▒███    ▒███ ▒███  █ ▒  ▒███    ▒███  ███     ▒▒▒  ▒███    ▒███ 
    ▒▒▒███    ▒██████████  ▒██████    ▒███████████ ▒███          ▒███████████ 
     ███▒     ▒███▒▒▒▒▒▒   ▒███▒▒█    ▒███▒▒▒▒▒███ ▒███          ▒███▒▒▒▒▒███ 
   ███▒       ▒███         ▒███ ▒   █ ▒███    ▒███ ▒▒███     ███ ▒███    ▒███ 
 ███▒         █████        ██████████ █████   █████ ▒▒█████████  █████   █████
▒▒▒          ▒▒▒▒▒        ▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒   ▒▒▒▒▒   ▒▒▒▒▒▒▒▒▒  ▒▒▒▒▒   ▒▒▒▒▒ 
`
        )
      );

      // CLI title
      consolaInstance.log(pc.green(pc.bold(`\n🍑 Peach CLI v${version}`)));
      consolaInstance.log(pc.gray("----------------------------------\n"));

      // System information
      consolaInstance.log(pc.cyan("Node:"), pc.white(process.version));
      consolaInstance.log(pc.yellow("pnpm:"), pc.white(getPnpmVersion()));
      consolaInstance.log(
        pc.blue("OS:"),
        pc.white(`${os.type()} ${os.release()} (${os.arch()})`)
      );
      consolaInstance.log(
        pc.green("GitHub:"),
        pc.underline(pc.blue("https://github.com/zhouxk1204/peach-cli"))
      );

      // // Supported frameworks
      // consolaInstance.log(pc.bold("\nSupported frameworks:"));
      // consolaInstance.log("  -", pc.blue("vue3"));
      // consolaInstance.log("  -", pc.blue("react"));

      // // Supported languages
      // consolaInstance.log(pc.bold("\nSupported languages:"));
      // consolaInstance.log("  -", pc.blue("JavaScript"));
      // consolaInstance.log("  -", pc.blue("TypeScript"));

      // // Supported styling options
      // consolaInstance.log(pc.bold("\nSupported styling options:"));
      // consolaInstance.log("  -", pc.blue("CSS"));
      // consolaInstance.log("  -", pc.blue("SCSS"));
      // consolaInstance.log("  -", pc.blue("TailwindCSS"));
    });
};
