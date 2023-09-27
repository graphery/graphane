// guide-readme-02 - Graphane SVG

export function script () {
  const svg = gSVG().width('100px').height('100px');
  const rect = svg.add('rect').x(10).y(10).width(90).height(90).fill('#f06');
  svg.attachTo('#show');
}

export default `<div id="show"></div>`;