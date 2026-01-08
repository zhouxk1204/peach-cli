// 插件的注册
import { Command, program } from 'commander';

type CommandFn = () => Command

export const registerCommand = (commandFunction: CommandFn) => {
    // 添加指令
    program.addCommand(commandFunction());
}