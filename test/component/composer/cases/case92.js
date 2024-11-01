export const title       = '92) g-if side effect';
export const description = 'evaluate g-bind when it is false';

export default `
<g-composer>
  <template>
    <svg viewBox="0 0 100 100">
      <g g-for="n of value">
        <circle
          g-if="n % 2 === 0"
          :cx="(n + 1) * 5"
          :cy="(n + 1) * 5"
          :r="(n + 1) * 5"
          fill="none"
          stroke="orange"
          stroke-width="1"
          g-content="add()"/>
      </g>
      <text x="50" y="50" alignment-baseline="middel" text-anchor="middle" 
        g-content="get()"></text>
    </svg>
  </template>
  <script type="data">
    {value: 10}
  </script>
  <script type="methods">
    let total = 0;
    function add() {
      total++;
    }
    function get() {
      return total;
    }
  </script>
</g-composer>
`;