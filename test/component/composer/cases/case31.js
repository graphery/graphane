export const title       = '31) g-on with expression';
export const description = `Use the g-on directive with an expression`;

export default `<g-composer style="width: 100px">
  <svg viewBox="0 0 100 100" id="svg">
    <circle id="run" 
            cx="50"
            cy="50"
            r="50"
            fill="red"
            g-on:click="$.svg.querySelector('text').content('ok').x(44)"/>
    <text x="36" 
          y="53"
          g-on:click="$.svg.querySelector('text').content('ok').x(44)">click</text>
  </svg>
</g-composer>
`;
