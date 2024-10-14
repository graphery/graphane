export const title       = '47) g-content with $$.fromURL()';
export const description = 'load external SVGs and embed them';

export default `
<g-composer style="width:350px">
   <svg viewBox="0 0 100 100">
     <defs>
       <g g-for="r of data">
         <g g-content="$$.fromURL(r.image)" @load="load(this, r)" ></g>
       </g>
     </defs>
     <g g-for="col of 10">
       <g g-for="row of 10">
         <use g-bind:href="'#' + (row * 10 + col < data[0].value ? data[0].id : data[1].id)"
              g-bind:x="col * 10" 
              g-bind:y="row * 10"/>
       </g>
     </g>
   </svg>
   <script type="data">[
     {id: 'dog', image: '/test/component/composer/assets/dog.svg', value: 55, color: 'chocolate'},
     {id: 'cat', image: '/test/component/composer/assets/cat.svg', value: 35, color: 'darkslategray'}
   ]</script>
   <script type="methods">
   function load(el, r) {
     el.querySelector('svg').width(10).height(10).id(r.id);
     el.querySelector('path').style.fill(r.color);
   }
   </script>
</g-composer>
`;
