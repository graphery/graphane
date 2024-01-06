import intersection from "../helpers/intersection.js";

function install (setup) {

  // Update gSVGObject
  setup.extendInstance({
    intersection
  });

  // Add template directive
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

export default install;