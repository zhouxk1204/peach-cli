// 插件的注册
import { Command, program } from 'commander';

type CommandFn = (program: Command) => Command

export const registerCommand = (commandFunction: CommandFn) => {
    // 添加指令
    program.addCommand(commandFunction(program));
}