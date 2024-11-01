const TAG      = '_$tag';
const CHILDREN = '_$children'


const getObject         = (el) => ({
  [TAG]      : getTag(el),
  [CHILDREN] : getChildren(el), ...getAttributes(el)
});
const setObject         = (el, obj) => {
  setAttributes(el, obj);
  setChildren(el, obj);
}
const getAttributes     = (el) => el.getAttributeNames()
                                    .reduce((o, k) => {
                                      o[k] = el[k]();
                                      return o;
                                    }, {});
const getAttributeNames = (obj) => Object.keys(obj)
                                         .filter(k => ![TAG, CHILDREN].includes(k))
const setAttributes     = (el, obj) => getAttributeNames(obj).forEach(k => el[k](obj[k]));
const getTag            = (el) => el.tagName()
                                    .toLowerCase();
const getChildren       = (el) => el.children()
                                    .map(child => getObject(child));
const setChildren       = (el, obj) => (obj[CHILDREN] || []).forEach(child => {
  const n = el.append(child[TAG]);
  getAttributeNames(child).forEach(k => n[k](child[k]));
  setChildren(n, child);
})


function install (setup) {

  // Add template directive
  if (setup.extendTemplate) {
    setup.extendTemplate.defineDirective({
      name : 'g-object',
      exec (gObject, {expr, evalExpr, data}) {
        gObject.fromObject(evalExpr(expr, data));
      }
    });
  }

  setup.extendInstance({
    toObject () {
      return getObject(this);
    },
    fromObject (obj) {
      return setObject(this, obj);
    }
  });
}

export default install;