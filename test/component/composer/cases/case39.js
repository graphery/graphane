export const title       = '39) shape plugin';
export const description = `Add shape.extra plugin externally`;

export default `<g-composer style="width: 100px">
  <svg viewBox="0 0 100 100" id="svg">
    <path fill="none" stroke="#D80000" stroke-width="2" 
      :d="$$.regularPolygon(30, 26, 25, 6, 30)"/>
    <path fill="none" stroke="#00D800" stroke-width="2" 
      :d="$$.regularPolygon(71, 50, 25, 6, 30)"/>
    <path fill="none" stroke="#0000D8" stroke-width="2" 
      :d="$$.regularPolygon(30, 74, 25, 6, 30)"/>
  </svg>
  <script type="plugin" src="/src/plugins/shapes.extra.js"></script>
</g-composer>
`;