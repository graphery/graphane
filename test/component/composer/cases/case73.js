export const title       = '73) datum: property (string)';
export const description = `component.data="hello"`;

export function script () {
  const component = document.querySelector('g-composer');
  component.data  = "hello";
}

export default `<g-composer>
  <svg viewBox="0 0 110 110">
    <text x="50" y="50" dominant-baseline="middle" text-anchor="middle"
          g-content="data">test</text>
  </svg>
</g-composer>
`;