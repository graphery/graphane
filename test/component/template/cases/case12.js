export const title       = '12) viewport-once-class';
export const description = 'A class can be defined when the intersection occurs once.';

export default `<div style="width: 100px; height: 100px; overflow-y: scroll; overflow-x: hidden; border: 1px solid grey; text-align: center">
  <g-template src="/test/component/template/assets/check.svg" viewport-ratio="0.5" viewport-once-class="red" style="width: 50px; margin-top: 120px;"></g-template>
</div>`