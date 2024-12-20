export const title       = '93) g-bind class and style with function and $$';
export const description = 'evaluate g-bind attributes class and style with a function and $$ parameter';

export default `
<g-composer>
  <template>
    <svg viewBox="0 0 100 100">
      <style>
        .test {
          fill: red
        }
        .test2 {
          fill: green;
        }
      </style>
      <circle cx="50" cy="50" r="40"
        class="test test2"
        :class="classes($$)"
        style="stroke: blue; stroke-width:2"
        :style="styles($$)"/>
    </svg>
  </template>
  <script type="methods">
    function classes($$) {
      if ($$.element.tagName() !== 'circle') {
        throw new Error('not a circle');
      }
      if ($$.attribute !== 'class') {
        throw new Error('not a class attribute');
      }
      if ($$.currentValue().includes('test2')) {
        return {test2: false} 
      }
    }
    function styles($$) {
      if ($$.element.tagName() !== 'circle') {
        throw new Error('not a circle');
      }
      if ($$.attribute !== 'style') {
        throw new Error('not a class attribute');
      }
      if ($$.currentValue().stroke === 'blue') {
        return {stroke: 'orange'}
      }
    }
  </script>
</g-composer>
`;