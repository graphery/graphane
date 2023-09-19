const fs = require('fs');
module.exports = function getName (fileLoc) {
  const content = fs.readFileSync (fileLoc).toString ();
  return content.substring (0, content.indexOf ('\n')).trim ().substring (2).trim ();
}