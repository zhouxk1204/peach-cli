import { Command, program } from 'commander';

export const registCommand = (commandFunction: () => Command) => {
    program.addCommand(commandFunction());
}