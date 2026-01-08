import { createCommand, program } from "commander";
import pkg from '../../package.json';
import { infoCommand } from "./info/index";
import { registerCommand } from "./register-command";
import { create } from "./create";
// -v
program
  .name('peach-cli')
  .version(pkg.version, '-v, --version', 'Display version information')
  // .addHelpText(
  //   'beforeAll',
  //   picocolors.green('\n🍑 Peach CLI - Efficient frontend project scaffolding tool\n')
  // )
  // .addHelpText(
  //   'afterAll',
  //   picocolors.yellow('\nFor more information, visit https://github.com/zhouxk1204/peach-cli\n')
  // );

  
// register info command
registerCommand(infoCommand);
registerCommand(create);
