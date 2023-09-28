// 40) set and get a custom Symbol

export const description = `
add and check a custom Symbol property into a gSVGObject
`;

export function script () {
  const symbol     = Symbol();
  const svg        = gSVG();
  svg[symbol]      = 'checked';
  const result     = document.querySelector('#result');
  result.innerHTML = `svg[symbol] = ${svg[symbol]}`;
}

export default `<pre id="result"></pre>`;
