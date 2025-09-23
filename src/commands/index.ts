import { program } from "commander";
import picocolors from "picocolors";
import pkg from '../../package.json';
import { infoCommand } from "./info/index";
import { registCommand } from "./regist-command";
// -v
program
  .name('peach-cli')
  .version(pkg.version, '-v, --version', 'Display version information')
  .addHelpText(
    'beforeAll',
    picocolors.green('\n🍑 Peach CLI - Efficient frontend project scaffolding tool\n')
  )
  .addHelpText(
    'afterAll',
    picocolors.yellow('\nFor more information, visit https://github.com/zhouxk1204/peach-cli\n')
  );

  
// regist info command
registCommand(infoCommand);
