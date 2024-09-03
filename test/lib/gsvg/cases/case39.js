// 39) call to add() with null

export const description = `
special case when call to gSVG with null
`;

export function script () {
  const r          = gSVG().add(null);
  const result     = document.querySelector('#result');
  result.innerHTML = `gSVG().add(null) = ${r}`;
}

export default `<pre id="result"></pre>`;
