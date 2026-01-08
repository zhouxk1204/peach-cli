import { Command } from "commander";
import { execa } from "execa";
import ora from "ora";
import path from "path";
import pc from "picocolors";
import prompts from "prompts";
import { frameworkList, variantList } from "../../constants";
import { CreateCommandOption } from "../../types/index.type";
import { loadTemplate } from "../../utils/load";
import { consolaInstance } from "../../utils/logger";
import { isValidateFramework, isValidateVariant } from "../../utils/validate";

export const create = () => {
  return new Command("create")
    .argument("<project-name>")
    .option("-f, --framework <framework>", "framework")
    .option("-t, --variant <variant>", "variant")
    .option("-r, --remote <remote>", "remote template")
    .description("create a new project")
    .helpOption("-h, --help", "display help for command")
    .action(async (projectName: string, option: CreateCommandOption) => {
      let { framework, variant, remote } = option;

      if (remote) {
        // 加载模板
        await loadTemplate({
          remote,
          projectName
        });

        await installDependencies(projectName);
        return;
      }

      if (!framework || isValidateFramework(framework)) {
        // 选择框架
        const response = await prompts({
          type: "select",
          name: "framework",
          message: "Select a framework",
          choices: frameworkList.map((f) => ({
            title: f,
            value: f,
          })),
        });
        framework = response.framework;
      } else {
        consolaInstance.log(`Framework ${framework} is not supported`);
      }

      if (!variant || isValidateVariant(variant)) {
        // 选择框架
        const response = await prompts({
          type: "select",
          name: "variant",
          message: "Please select a variant",
          choices: variantList.map((v) => ({
            title: v,
            value: v,
          })),
        });
        variant = response.variant;
      } else {
        consolaInstance.log(`Variant ${variant} is not supported`);
      }

      // 加载模板
      await loadTemplate({
        projectName,
        framework,
        variant,
      });

      await installDependencies(projectName);
    });
};

const installDependencies = async (projectName: string) => {
  const projectPath = path.join(process.cwd(), projectName);

  const {shouldInstall} = await prompts({
    type: 'confirm',
    name: "shouldInstall",
    message: "Do you want to install dependencies now?",
    initial: true
  });

  if(!shouldInstall){
    consolaInstance.log(pc.yellow("You can install dependencies later by running npm/yarn/pnpm install"));
    return;
  }

  const { packageManager } = await prompts({
    type: "select",
    name: "packageManager",
    message: "Select a package manager",
    choices: [
      { title: "npm", value: "npm" },
      { title: "yarn", value: "yarn" },
      { title: "pnpm", value: "pnpm" },
    ],
    initial: 0,
  });

  const spinner = ora(`Installing dependencies with ${packageManager}...`).start();
  try {
    if (packageManager === "yarn") {
      await execa(packageManager, [], { cwd: projectPath, stdio: "ignore" });
    } else {
      await execa(packageManager, ["install"], { cwd: projectPath, stdio: "ignore" });
    }
    spinner.succeed(pc.green("Dependencies installed successfully ✅"));
  } catch (err) {
    spinner.fail(pc.red("Failed to install dependencies ❌"));
    console.error(err);
  }
  consolaInstance.log(pc.green("Next steps:"));
  consolaInstance.log(pc.green(`  cd ${projectName}`));
  consolaInstance.log(pc.green(`  ${packageManager}run dev`));
}