export const title       = '46) data mutation do not change $.data';
export const description = 'the template data mutation';

export default `
<g-composer style="width:350px">
  <svg viewBox="0 0 350 200">
    <text x="0" y="12">data[0] (initial): <tspan g-content="data[0]"></tspan></text>
    <text x="0" y="30">data[0] (change): <tspan g-content="data[0] = 2"></tspan></text>
    <text x="0" y="48">data[0] (final):  <tspan g-content="data[0]"></tspan></text>

    <text x="0" y="66">$.data[0] (initial): <tspan g-content="$.data[0]"></tspan></text>
  </svg>
  <script type="data">[1,2,3]</script>
</g-composer>
`;
