const path                   = require('path');
const fs                     = require('fs').promises;
const build                  = require('esbuild').build;
const optimizeTemplateString = require('./optimizeTemplateString.js');

async function pack (from, to, packagejson, options) {

  console.log(options);

  //-------------------------------------------------------
  // Original size
  //-------------------------------------------------------
  let prev = (await fs.readFile(to)).toString();
  !options.silence && console.log('                 previous size:', prev.length);

  //-------------------------------------------------------
  // Open to file
  //-------------------------------------------------------
  let fromFile = (await fs.stat(from));
  !options.silence && console.log('                 original size:', fromFile.size);

  //-------------------------------------------------------
  // Build from file
  //-------------------------------------------------------
  await build({
    entryPoints : [from],
    outfile     : to,
    minify      : true,
    bundle      : true,
    format      : options.module ? 'esm' : 'iife',
    external    : options.exclude ? options.exclude : undefined,
    sourcemap   : options.map ? 'linked' : '',
    drop        : ['debugger']
  });

  //-------------------------------------------------------
  // Open to file
  //-------------------------------------------------------
  let content = (await fs.readFile(to)).toString();
  !options.silence && console.log('           size after minimize:', content.length);

  if (!options.map) {

    //-------------------------------------------------------
    // Add name and version
    //-------------------------------------------------------
    packagejson = packagejson || './package.json';
    const pck   = require(path.resolve(process.cwd(), packagejson));
    content     = `/* ${ pck.name }${ pck.version ? ` - ${ pck.version }` : '' } */ ` + content;
    !options.silence && console.log('          size after commented:', content.length);

    //-------------------------------------------------------
    // Processing file
    //-------------------------------------------------------

    // Optimize template string
    content = optimizeTemplateString(content);
    !options.silence && console.log('after template string optimize:', content.length);

    // Optimize const to let
    content = content.replace(/const /g, 'let ');
    !options.silence && console.log('  after replace const with let:', content.length);

    // Remove lines
    content = content.replace(/\n/g, ' ');
    !options.silence && console.log('         after end line remove:', content.length);

    // Remove IIFF argument
    content = content.replace('.call(this || window, (window.__wpcc = window.__wpcc || {}))', '()');
    content = content.replace('function(__wpcc)', '() => ');
    console.log('    after IIFF argument remove:', content.length);

    // Remove spaces
    content = content.replace(/\s{2,}/g, ' ');
    content = content.trim();
    !options.silence && console.log('            after space remove:', content.length);

    //-------------------------------------------------------
    // Write to file
    //-------------------------------------------------------
    await fs.writeFile(to, content);

  }

  // Compare size
  !options.silence && console.log('                    difference:', content.length - prev.length);

  // Last message
  !options.silence && console.log(`
file ${ to } written
`);

}

module.exports = pack;