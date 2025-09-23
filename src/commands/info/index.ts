import { execSync } from "child_process";
import { Command } from "commander";
import gradient from 'gradient-string';
import os from "os";
import pc from "picocolors";

// ASCII Art for CLI logo
const ASCII_ART = `
 ███          ███████████  ██████████   █████████     █████████  █████   █████
▒▒▒███       ▒▒███▒▒▒▒▒███▒▒███▒▒▒▒▒█  ███▒▒▒▒▒███   ███▒▒▒▒▒███▒▒███   ▒▒███ 
  ▒▒▒███      ▒███    ▒███ ▒███  █ ▒  ▒███    ▒███  ███     ▒▒▒  ▒███    ▒███ 
    ▒▒▒███    ▒██████████  ▒██████    ▒███████████ ▒███          ▒███████████ 
     ███▒     ▒███▒▒▒▒▒▒   ▒███▒▒█    ▒███▒▒▒▒▒███ ▒███          ▒███▒▒▒▒▒███ 
   ███▒       ▒███         ▒███ ▒   █ ▒███    ▒███ ▒▒███     ███ ▒███    ▒███ 
 ███▒         █████        ██████████ █████   █████ ▒▒█████████  █████   █████
▒▒▒          ▒▒▒▒▒        ▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒   ▒▒▒▒▒   ▒▒▒▒▒▒▒▒▒  ▒▒▒▒▒   ▒▒▒▒▒ 
`;

// Gradient colors for ASCII Art (Vice style)
const VICE_GRADIENT = ["#1d82e4", "#7660c5", "#c4496c"];

/**
 * Returns the pnpm version installed in the system
 */
function getPnpmVersion(): string {
  try {
    return execSync("pnpm -v", { encoding: "utf-8" }).trim();
  } catch {
    return "Not installed";
  }
}

/**
 * Creates the 'info' command for Peach CLI
 */
export const infoCommand = () => {
  return new Command("info")
    .description("Display Peach CLI information")
    .action(() => {
      // Print gradient ASCII logo
      console.log(
        gradient(VICE_GRADIENT, { interpolation: "hsv" }).multiline(ASCII_ART)
      );

      // CLI title
      console.log(pc.green(pc.bold("\n🍑 Peach CLI v1.0.0")));
      console.log(pc.gray("------------------------\n"));

      // System information
      console.log(pc.cyan("Node.js:"), pc.white(process.version));
      console.log(pc.cyan("Pnpm:"), pc.white(getPnpmVersion()));
      console.log(pc.cyan("OS:"), pc.white(`${os.type()} ${os.release()} (${os.arch()})\n`));

      // Supported frameworks
      console.log(pc.bold("Supported frameworks:"));
      console.log("  -", pc.blue("vue3"));
      console.log("  -", pc.blue("react"));

      // Supported languages
      console.log(pc.bold("\nSupported languages:"));
      console.log("  -", pc.blue("JavaScript"));
      console.log("  -", pc.blue("TypeScript"));

      // Supported styling options
      console.log(pc.bold("\nSupported styling options:"));
      console.log("  -", pc.blue("CSS"));
      console.log("  -", pc.blue("SCSS"));
      console.log("  -", pc.blue("TailwindCSS"));

      // Additional info
      console.log(pc.bold("\nMore information:"));
      console.log("  GitHub:", pc.underline(pc.blue("https://github.com/zhouxk1204/peach-cli")));
      console.log("");
    });
};
