export const title       = '2) g-content';
export const description = 'source code with g-conten in a &lt;text>&lt;/text>';

export function script () {
  const svg = gSVG(document.querySelector('#svg'));
  svg.render({
    title : 'hello world'
  });
  document.querySelector('#change').addEventListener('input', async function () {
    svg.render({title: this.value});
    document.querySelector('#result').innerHTML = sourceFormat(svg.toSource());
  });
  document.querySelector('#result').innerHTML = sourceFormat(svg.toSource());
}

export default `<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px">
  <text x="0" y="50" g-content="title"></text>
</svg>
<p>
 <input type="text" id="change" value="hello world">
</p>
</div>
<pre id="result"></pre>`;
