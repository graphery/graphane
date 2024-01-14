export const title       = '38) $$.function with transform';
export const description = `move path elements`;

export default `<g-composer style="width: 100px">
  <svg viewBox="0 0 100 100" id="svg">
    <path fill="none" stroke="#D80000" stroke-width="2" 
      d="M42.5,4.35L55,26L42.5,47.65L17.5,47.65L5,26L17.5,4.35Z"/>
    <path fill="none" stroke="#00D800" stroke-width="2" 
      d="M42.5,4.35L55,26L42.5,47.65L17.5,47.65L5,26L17.5,4.35Z"
      :transform="$$.translate(41,24)"/>
    <path fill="none" stroke="#0000D8" stroke-width="2" 
      d="M42.5,4.35L55,26L42.5,47.65L17.5,47.65L5,26L17.5,4.35Z"
      :transform="$$.translate(0,48).rotate(60,30,26)"/>
  </svg>
</g-composer>
`;