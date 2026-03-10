// 入口文件
import { program } from "commander";
// 导入命令模块，确保命令被注册
import "./commands";

export const runCli = () => {
  const args = process.argv.slice(2);
  
  // 如果没有参数，或者第一个参数不是已知命令，默认执行 create 命令
  // 这样支持 `pnpm create peach` 或 `pnpm create peach my-app` 直接创建项目
  if (args.length === 0 || (!['create', 'list', 'info', '-v', '--version', '-h', '--help'].includes(args[0]))) {
    // 将参数插入 create 命令
    process.argv.splice(2, 0, 'create');
  }
  
  program.parse(process.argv);
};
