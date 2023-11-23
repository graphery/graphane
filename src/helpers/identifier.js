export function isValidIdentifier(identifier) {
  try {
    new Function(`const ${identifier} = 0`);
    return true;
  } catch (e) {
    return false;
  }
}