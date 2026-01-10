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
import { isValidFramework, isValidVariant } from "../../utils/validate";

export const createProjectCommand = () => {
  return new Command("create")
    .argument("[project-name]")
    .option("-f, --framework <framework>", "framework")
    .option("-t, --variant <variant>", "variant")
    .option("-r, --remote <remote>", "remote template")
    .description("Create a new project from template")
    .helpOption("-h, --help", "Display help for a command")
    .action(async (projectName: string, option: CreateCommandOption) => {

      if (!projectName) {
        const defaultName = 'peach-project';
        const res = await prompts({
          type: "text",
          name: "name",
          message: "Project name:",
          initial: defaultName,  
        })
        projectName = res.name || defaultName;
      }

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

      if (!framework || !isValidFramework(framework)) {
        // 选择框架
        const response = await prompts({
          type: "select",
          name: "framework",
          message: "Select a framework:",
          choices: frameworkList.map((f) => ({
            title: f,
            value: f,
          })),
        });
        framework = response.framework;
      }

      if (!variant || !isValidVariant(variant)) {
        // 选择框架
        const response = await prompts({
          type: "select",
          name: "variant",
          message: "Select a variant:",
          choices: variantList.map((v) => ({
            title: v,
            value: v,
          })),
        });
        variant = response.variant;
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
    message: "Install dependencies and start now?",
    initial: true
  });

  if(!shouldInstall){
    consolaInstance.log(pc.yellow("You can install dependencies later by running npm/yarn/pnpm install"));
    return;
  }

  const { packageManager } = await prompts({
    type: "select",
    name: "packageManager",
    message: "Select a package manager:",
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
    spinner.succeed(pc.green("Dependencies installed successfully"));
    if (packageManager === "yarn") {
      await execa(packageManager, ["dev"], { cwd: projectPath, stdio: "inherit" });
    } else {
      await execa(packageManager, ["run", "dev"], { cwd: projectPath, stdio: "inherit" });
    }
  } catch (err) {
    spinner.fail(pc.red("❌ Failed to install dependencies"));
    console.error(err);
  }
}