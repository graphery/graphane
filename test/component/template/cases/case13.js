export const title       = '13) render with script type="data" embebed';
export const description = 'Use the render template with an external data loaded with script type="data".';

export default `<g-template src="/test/component/template/assets/circles.svg">
  <script type="data" src="/test/component/template/assets/circles.csv"></script>
</g-template>
`