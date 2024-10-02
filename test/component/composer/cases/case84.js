export const title       = '84) value property';
export const description = `component.value=10`;

export function script () {
  const component = document.querySelector('g-composer');
  component.value = 10;
}

export default `<g-composer value="0">
  <svg viewBox="0 0 110 110">
    <title g-content="console.log(data.value)"></title>
    <defs g-for="n of value">
      <circle :cx="n * (100 / value) + 10" 
              :cy="n * (100 / value) + 10" 
              :r="100 / (value * 2)"
              fill="orange"/>
    </defs>
    <text x="50" y="50" dominant-baseline="middle" text-anchor="middle"
          g-content="value">test</text>
  </svg>
</g-composer>
`;