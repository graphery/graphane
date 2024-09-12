export const title       = '69) datum: script';
export const description = `&lt;script type="data">10&lt;/script>`;

export default `<g-composer>
  <svg viewBox="0 0 110 110">
    <defs g-for="n of data">
      <circle :cx="n * (100 / data) + 10" 
              :cy="n * (100 / data) + 10" 
              :r="100 / (data * 2)"
              fill="orange"/>
    </defs>
    <text x="50" y="50" dominant-baseline="middle" text-anchor="middle"
          g-content="data">test</text>
  </svg>
  <script type="data">
    10
  </script>
</g-composer>
`;