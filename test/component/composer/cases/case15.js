//
export const title       = '15) render with template';
export const description = 'Use the render template with template and script type="data"';

export default `<g-composer>
  <template>
   <svg viewBox="0 0 100 100" id="svg">
    <defs g-for="value of data">
        <circle   :cx="value.cx"
                  :cy="value.cy"
                    r="25"
                :fill="value.color">
        </circle>
    </defs>
    <text x="50" y="12">circles</text>
    </svg>
  </template>
  <script src="/test/component/composer/assets/circles.csv" type="data"></script>
</g-composer>
`;