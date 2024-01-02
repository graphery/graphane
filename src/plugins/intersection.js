import intersection from "../helpers/intersection.js";

export function svgPlugin (setup) {
  // Update gSVGObject
  setup.extendInstance({
    intersection
  });
  // Add directive
  if (setup.extendTemplate) {
    setup.extendTemplate.defineDirective({
      name : 'g-intersection',
      execute (gObject, {expression, evalExpression, data}) {
        const ratio = evalExpression(expression, data);
        gObject.intersection(ratio);
      }
    });
  }
}