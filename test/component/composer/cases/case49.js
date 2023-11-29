export const title       = '49) SVG size undefined';
export const description = 'component size use the SVG viewBox size';

export default `
<g-composer>
   <svg viewBox="0 0 100 100">
     <rect x="0" y="0" width="100" height="100" fill="red"/>
   </svg>
</g-composer>
`;
