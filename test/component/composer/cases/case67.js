export const title       = '67) datum: attribute';
export const description = `data="10"`;

export default `<g-composer data="10">
  <svg viewBox="0 0 110 110">
    <g g-for="n of data">
      <circle :cx="n * (100 / data) + 10" 
              :cy="n * (100 / data) + 10" 
              :r="100 / (data * 2)"
              fill="orange"/>
    </g>
    <text x="50" y="50" dominant-baseline="middle" text-anchor="middle"
          g-content="data">test</text>
  </svg>
</g-composer>
`;