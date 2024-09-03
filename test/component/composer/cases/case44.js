export const title       = '44) helper data.$... simple data';
export const description = 'helper data with integers';

export default `
<g-composer style="width:350px">
  <svg viewBox="0 0 350 200">
    <text x="0" y="12">data.$min():       <tspan g-content="data.$min()"></tspan>     </text>
    <text x="0" y="30">data.$max():       <tspan g-content="data.$max()"></tspan>     </text>
    <text x="0" y="48">data.$count():     <tspan g-content="data.$count()"></tspan>   </text>
    <text x="0" y="66">data.$sum():       <tspan g-content="data.$sum()"></tspan>     </text>
    <text x="0" y="84">data.$avg():       <tspan g-content="data.$avg()"></tspan>     </text>
    <text x="0" y="102">data.$distinct(): <tspan g-content="data.$distinct()"></tspan></text>
    
    <text x="0" y="138">data.filter(x => x < 4).map(x => x * 2): 
      <tspan g-content="data.filter(x => x < 4).map(x => x * 2)"></tspan>
    </text>
  </svg>
  <script type="data">[ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]</script>
</g-composer>`;
