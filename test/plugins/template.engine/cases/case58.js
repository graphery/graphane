export const title       = '58) g-bind && g-content $$ helpers';
export const description = '$$.element, $$.attribute, and $$.currentValue(); $$.element and $$.currentContent()';

export function script () {
  const svg = gSVG(document.querySelector('#svg'));
  svg.render({});
  document.querySelector('#result').innerHTML = sourceFormat(svg.source());
}

export default `<svg id="svg" viewBox="0 0 200 200" width="200" height="200">
  <circle cx="100" cy="100" r="100" fill="blue" 
    g-bind:r="$$.currentValue() / 2" 
    g-bind:stroke="$$.attribute === 'stroke' ? 'red' : 'blue'"
    g-bind:stroke-width="$$.element.cx() / 10"/>
  <text g-bind:x="$$.element.parent().querySelector('circle').cx()" 
        g-bind:y="$$.element.parent().querySelector('circle').cy()"
        dominant-baseline="middle"
        text-anchor="middle"
        fill="white"
        g-content="$$.currentContent() === 'x' && $$.element.tagName() === 'text' ? 'hello' : ''">x</text>
</svg>
<pre id="result"></pre>`;
