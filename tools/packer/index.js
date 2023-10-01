const pack                   = require ('./pack.js');
const commander              = require ('commander');
const program                = new commander.Command ();
program
  .version ('1.0.0')
  .command ('build <from> <to> [parckage.json]', {isDefault : true})
  .option ('-m, --module', 'build a ES module')
  .option ('-e, --exclude <module...>', 'exclude module from the bundle')
  .action (pack);
program.parse(process.argv);

