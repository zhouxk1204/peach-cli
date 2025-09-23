// 入口文件
import { program } from 'commander';
// 导入命令模块，确保命令被注册
import './commands';  

export const runCli = async () => {
    program.parse(process.argv);
};