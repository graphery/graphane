const cache         = new Map();
const functionName  = /function\s+([\p{L}\p{Nl}$_][\p{L}\p{Nl}$_\p{Mn}\p{Mc}\p{Nd}\p{Pc}]*)\s*\(/gmu;
const AsyncFunction = (async function () {
}).constructor;

export function createFunction (args, code, async = false) {
  const key = `${ args.join(',') } ${ code }`;
  if (cache.has(key)) {
    return cache.get(key);
  }
  const fn = new (async ? AsyncFunction : Function)(...args, code);
  cache.set(key, fn);
  return fn;
}


export function getFunctions (globals, code) {
  const names = [...code.matchAll(functionName)].map(x => x[1]);
  const fn    = createFunction(Object.keys(globals), `${ code };
  
    return {${ names.map(n => `${ n }: typeof ${ n } === 'function' ? ${ n } : undefined`) }};
  `);
  return fn(...Object.values(globals));
}