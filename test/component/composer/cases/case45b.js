export const title       = `45b) helper data.$distinct('key') called twice`;
export const description = 'helper data with objects';

export default `
<g-composer style="width:350px">
  <svg viewBox="0 0 350 200">
    <text x="0" y="20">data.$distinct('val'): <tspan g-content="data.$distinct('a')"></tspan></text>
    <text x="0" y="40">data.$distinct('val'): <tspan g-content="data.$distinct('b')"></tspan></text>
  
  </svg>
  <script type="data">[
      {a: 0}, {a: 1}, {a: 2}, {a: 3}, {a: 4}, {a: 5},
      {b: 6}, {b: 7}, {b: 8}, {b: 9}, {b: 10}, {b: 10}
  ]</script>
</g-composer>
`;
