export const title       = '14) render with template and script type="data" embebed';
export const description = 'Use the render template with template and script type="data"';

export default `<g-composer>
  <template>
    <svg viewBox="0 0 100 100" id="svg" width="100">
      <g g-for="value of data">
          <circle   :cx="value.cx"
                    :cy="value.cy"
                      r="25"
                  :fill="value.color">
          </circle>
      </g>
      <text x="50" y="12">circles</text>
    </svg>
  </template>
  <script type="data" src="/test/component/composer/assets/circles.csv"></script>
</g-composer>
`;