import { Command } from "commander";
import prompts from "prompts";
import { frameworkList, variantList } from "../../constants";
import { CreateCommandOption } from "../../types/index.type";
import { consolaInstance } from "../../utils/logger";
import { isValidateFramework, isValidateVariant } from "../../utils/validate";
export const create = (program: Command) => {
  return program
    .createCommand("create")
    .argument("<project-name>")
    .option("-f, --framework <framework>", "framework")
    .option("-t, --variant <variant>", "variant")
    .option("-r, --remote", "remote template")
    .description("create a new project")
    .helpOption("-h, --help", "display help for command")
    .action(async (projectName: string, option: CreateCommandOption) => {
      let { framework, variant, remote } = option;

      if (remote) {
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
    });
};
