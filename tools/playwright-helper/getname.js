import fs from 'fs';

export default async function getname (fileLoc) {
  const imp = await import(`file:${fileLoc}`);
  if (imp.title) {
    return imp.title;
  }
  const content = (await fs.promises.readFile (fileLoc)).toString ();
  return content.substring (0, content.indexOf ('\n')).trim ().substring (2).trim ();
}