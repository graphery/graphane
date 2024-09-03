export const title       = '20) svg g-bind';
export const description = 'Render with g-bind on svg element';

export default `<g-composer>
  <svg id="svg" 
       :viewBox="\`0 0 \${(data.length + 1) * 25} \${(data.length + 1) * 25}\`" 
       :style="{
         width: ((data.length + 1) * 25) + 'px', 
         height: ((data.length + 1) * 25) + 'px'
       }" 
       style="border: 1px solid black">
    <defs g-for="(value, idx) of data">
      <circle :id = '"circle_" + idx'
              :cx = "(idx + 1) * 25" 
              :cy = "(idx + 1) * 25"
            :fill = "value.color"
                r = "25"></circle>
     <text g-content = "idx" 
                  :x = "((idx + 1) * 25) - 3" 
                  :y = "((idx + 1) * 25) + 6"
                fill = "white"></text>
    </defs>
  </svg>
  <script type="data">
    "color"
    "red"
    "green"
    "blue"
    "orange"
  </script>
</g-composer>
`;