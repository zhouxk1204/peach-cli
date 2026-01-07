import { execSync } from "child_process";
import { Command } from "commander";
import gradient from "gradient-string";
import os from "os";
import pc from "picocolors";
import { version } from "../../../package.json";
import { consolaInstance } from "../../utils/logger";

// ASCII Art for CLI logo
// const ASCII_ART = `
//  ███          ███████████  ██████████   █████████     █████████  █████   █████
// ▒▒▒███       ▒▒███▒▒▒▒▒███▒▒███▒▒▒▒▒█  ███▒▒▒▒▒███   ███▒▒▒▒▒███▒▒███   ▒▒███
//   ▒▒▒███      ▒███    ▒███ ▒███  █ ▒  ▒███    ▒███  ███     ▒▒▒  ▒███    ▒███
//     ▒▒▒███    ▒██████████  ▒██████    ▒███████████ ▒███          ▒███████████
//      ███▒     ▒███▒▒▒▒▒▒   ▒███▒▒█    ▒███▒▒▒▒▒███ ▒███          ▒███▒▒▒▒▒███
//    ███▒       ▒███         ▒███ ▒   █ ▒███    ▒███ ▒▒███     ███ ▒███    ▒███
//  ███▒         █████        ██████████ █████   █████ ▒▒█████████  █████   █████
// ▒▒▒          ▒▒▒▒▒        ▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒   ▒▒▒▒▒   ▒▒▒▒▒▒▒▒▒  ▒▒▒▒▒   ▒▒▒▒▒
// `;

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
export const infoCommand = (program: Command) => {
  return program
    .command("info")
    .description("Display Peach CLI information")
    .action(() => {
      // Print gradient ASCII logo
      consolaInstance.info(
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
      consolaInstance.info(pc.green(pc.bold(`\n🍑 Peach CLI v${version}`)));
      consolaInstance.info(pc.gray("------------------------\n"));

      // System information
      consolaInstance.info(pc.cyan("Node.js:"), pc.white(process.version));
      consolaInstance.info(pc.cyan("Pnpm:"), pc.white(getPnpmVersion()));
      consolaInstance.info(
        pc.cyan("OS:"),
        pc.white(`${os.type()} ${os.release()} (${os.arch()})\n`)
      );

      // Supported frameworks
      consolaInstance.info(pc.bold("Supported frameworks:"));
      consolaInstance.info("  -", pc.blue("vue3"));
      consolaInstance.info("  -", pc.blue("react"));

      // Supported languages
      consolaInstance.info(pc.bold("\nSupported languages:"));
      consolaInstance.info("  -", pc.blue("JavaScript"));
      consolaInstance.info("  -", pc.blue("TypeScript"));

      // Supported styling options
      consolaInstance.info(pc.bold("\nSupported styling options:"));
      consolaInstance.info("  -", pc.blue("CSS"));
      consolaInstance.info("  -", pc.blue("SCSS"));
      consolaInstance.info("  -", pc.blue("TailwindCSS"));

      // Additional info
      consolaInstance.info(pc.bold("\nMore information:"));
      consolaInstance.info(
        "  GitHub:",
        pc.underline(pc.blue("https://github.com/zhouxk1204/peach-cli"))
      );
      consolaInstance.info("");
    });
};
