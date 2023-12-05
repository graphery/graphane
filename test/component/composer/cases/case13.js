export const title       = '13) render with script type="data" embebed';
export const description = 'Use the render template with an external data loaded with script type="data".';

export default `<g-composer svg-src="/test/component/composer/assets/circles.svg" style="width: 100px">
  <script type="data" src="/test/component/composer/assets/circles.csv"></script>
</g-composer>
`