const cache          = new Map();
const functionRegExp = /^\s*function\s*(\w*)/gm;

export function createFunction (args, code) {
  const key = `${ args.join(',') } ${ code }`;
  if (cache.has(key)) {
    return cache.get(key);
  }
  const fn = new Function(...args, code);
  cache.set(key, fn);
  return fn;
}

export function getFunctions (globals, code) {
  const names = [...code.matchAll(functionRegExp)].map(x => x[1]);
  const fn    = createFunction(Object.keys(globals), `${ code }
  
    return {${ names.map(n => `${ n }: typeof ${ n } === 'function' ? ${ n } : undefined`) }};
  `);
  return fn(...Object.values(globals));
}