export const title       = '2) g-content with text';
export const description = 'include content into a &lt;text>&lt;/text>';

export async function script () {
  const svg = gSVG(document.querySelector('#svg'));
  await svg.render({
    title : 'hello world'
  });
  document.querySelector('#change').addEventListener('input', async function () {
    await svg.render({title: this.value});
  })
  document.querySelector('#result').innerHTML = sourceFormat(svg.source());

}

export default `<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px">
  <text x="0" y="50" g-content="title"></text>
</svg>
<p>
 <input type="text" id="change" value="hello world">
</p>
</div>
<pre id="result"></pre>`;
