export const title       = '25) use $.min(), $.max(), $.avg(), $.count()';
export const description = `Render with a template than use $ methods`;

export default `<g-composer style="width: 100px">
  <svg viewBox="0 0 100 100" id="svg">
    <line x1="0" 
          y1="99" 
          x2="100" 
          y2="100" 
          stroke-width="1" 
          stroke="black"/>
    <g g-for="n of data.$count()">
      <line :x1="(n * 20) + 10" 
            :x2="(n * 20) + 10" 
            y1="95" 
            y2="100" 
            stroke-width="1" 
            stroke="black"/>
      <circle :cx="(n * 20) + 10" 
              cy="50" 
              r="10" 
              :fill="data.$min('value') === data[n].value ? 
                       'red' : 
                       data.$max('value') === data[n].value ? 
                         'green' : 
                         color(data, data[n].value) "/>
    </g>
  </svg>
  <script type="data">[
    {name: 'two', value: 2},
    {name: 'one', value: 1},
    {name: 'five', value: 5},
    {name: 'four', value: 4},
    {name: 'three', value: 3},
  ]</script>
  <script type="methods">
    function color(data, value) {
      if (value < data.$avg('value')) {
        return 'grey';
      }
      return 'blue';
    }
  </script>
</g-composer>
`;