import { copy, readJson, remove, writeJson } from "fs-extra";
import { downloadTemplate } from "giget";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { frameworkMap, variantMap } from "../constants";
import { Framework, Variant } from "../types/index.type";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export type LoadLocalTemplateOption = {
  remote?: undefined;
  projectName: string;
  variant: Variant;
  framework: Framework;
};

export type LoadRemoteTemplateOption = {
  remote: string;
  projectName: string;
  variant?: never;
  framework?: never;
};

export type LoadTemplateOption = LoadLocalTemplateOption | LoadRemoteTemplateOption;

export const loadTemplate = async (option: LoadTemplateOption) => {
  const { remote } = option;

  if (remote) {
    return await loadRemoteTemplate(option as LoadRemoteTemplateOption);
  } else {
    return await loadLocalTemplate(option as LoadLocalTemplateOption);
  }
};

const loadLocalTemplate = async (option: LoadLocalTemplateOption) => {
  const { projectName, variant, framework } = option;

  // 找到templatePath
  const templatePath = path.join(
    __dirname,
    "..",
    "templates",
    `template-${frameworkMap[framework]}-${variantMap[variant]}`
  );

  // 拷贝到cli执行下面的路径process.cwd
  await copy(templatePath, `${process.cwd()}/${projectName}`);
  // update package.json
  await updatePackageJson(projectName);
};

const loadRemoteTemplate = async (option: LoadRemoteTemplateOption) => {
  const { projectName, remote } = option;

  const cliPath = process.cwd();
  // 解压后的目录路径
  const { dir } = await downloadTemplate(
    remote ?? "",
    {
      dir: `${cliPath}/.temp`,
    }
  );

  await copy(dir, `${cliPath}/${projectName}`);
  await updatePackageJson(projectName);

  // 删除模板
  await remove(dir);
};

const updatePackageJson = async (projectName: string) => {
  const projectRootPath = `${process.cwd()}/${projectName}`;
  const originalPackageJson = await readJson(`${projectRootPath}/package.json`);

  await writeJson(
    `${projectRootPath}/package.json`,
    {
      ...originalPackageJson,
      name: projectName,
      version: "1.0.0",
    },
    { spaces: 2 }
  );
};
