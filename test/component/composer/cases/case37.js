export const title       = '37) $$.function with d';
export const description = `Add path definition with functions`;

export default `<g-composer style="width: 100px">
  <svg viewBox="0 0 100 100" id="svg">
    <path fill="none" stroke="#D80000" stroke-width="2" 
      :d="$$.M(42.5,4.35).L(55,26).L(42.5,47.65).L(17.5,47.65).L(5,26).L(17.5,4.35).Z()"/>
    <path fill="none" stroke="#00D800" stroke-width="2" 
      :d="$$.M(83.5,28.35).L(96,50).L(83.5,71.65).L(58.5,71.65).L(46,50).L(58.5,28.35).Z()"/>
    <path fill="none" stroke="#0000D8" stroke-width="2" 
      :d="$$.M(42.5,52.35).L(55,74).L(42.5,95.65).L(17.5,95.65).L(5,74).L(17.5,52.35).Z()"/>
  </svg>
</g-composer>
`;