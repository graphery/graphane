const esprima = require('esprima-next');

module.exports = function optimizeTemplateString (source) {
  try {
    debugger;
    const ast       = esprima.parseModule(source, {range : true});
    const templates = findTemplateLiteral(ast);
    return buildSource(source, templates);
  } catch (err) {
    console.error(err);
    return source;
  }
};

function findTemplateLiteral (obj) {
  const result = [];
  (function search (obj) {
    if (obj.type === 'TemplateLiteral') {
      result.push(obj.range);
    } else {
      for (let prop in obj) {
        if (typeof obj[prop] === 'object' && obj[prop] !== null) {
          search(obj[prop]);
        }
      }
    }
  })(obj);
  return result;
}

function buildSource (source, templates) {
  let idx    = 0;
  let target = '';
  for (let range of templates) {
    target += source.substring(idx, range[0]);
    idx                   = range[1];
    let template          = source.substring(range[0], range[1]);
    let templateOptimized = optimizeTemplateString(template);
    target += templateOptimized;
  }
  target += source.substring(idx);
  return target;
}

function optimizeTemplateString (template) {
  return template.replace(/\s\s+/g, ' ').replace(/>\s</g, '><').trim();
}