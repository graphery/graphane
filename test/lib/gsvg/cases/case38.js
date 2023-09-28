// 38) call to gSVG() with null

export const description = `
special case when call to gSVG with null
`;

export function script () {
  const r          = gSVG(null);
  const result     = document.querySelector('#result');
  result.innerHTML = `gSVG(null) = ${r}`;
}

export default `<pre id="result"></pre>`;
