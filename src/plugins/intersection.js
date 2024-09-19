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
      exec (gObject, {expr, evalExpr, data}) {
        const ratio = evalExpr(expr, data);
        gObject.intersection(ratio);
      }
    });
  }
}

export default install;