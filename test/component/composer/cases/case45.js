export const title       = '45) helper data.$... object data';
export const description = 'helper data with objects';

export default `
<g-composer style="width:350px">
  <svg viewBox="0 0 350 200">
    <text x="0" y="12">data.$min('val'):       <tspan g-content="data.$min('val')">     </tspan></text>
    <text x="0" y="30">data.$max('val'):       <tspan g-content="data.$max('val')">     </tspan></text>
    <text x="0" y="48">data.$count('val'):     <tspan g-content="data.$count('val')">   </tspan></text>
    <text x="0" y="66">data.$sum('val'):       <tspan g-content="data.$sum('val')">     </tspan></text>
    <text x="0" y="84">data.$avg('val'):       <tspan g-content="data.$avg('val')">     </tspan></text>
    <text x="0" y="102">data.$distinct('val'): <tspan g-content="data.$distinct('val')"></tspan></text>
  
    <text x="0" y="138">data.filter(x => x.val < 4).map(x => x.val * 2): 
      <tspan g-content="data.filter(x => x.val < 4).map(x => x.val * 2)"></tspan>
    </text>
  </svg>
  <script type="data">[
      {val: 0}, {val: 1}, {val: 2}, {val: 3}, {val: 4}, {val: 5},
      {val: 6}, {val: 7}, {val: 8}, {val: 9}, {val: 10}, {val: 10}
  ]</script>
</g-composer>
`;
