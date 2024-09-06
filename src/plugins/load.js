import { isFunction } from "../helpers/types.js";

const cache = {};

const getSVG = async (gObject, src) => {
  if (!cache[src]) {
    const res = await fetch(src);
    if (res.status === 200) {
      cache[src] = await res.text();
    }
  }
  if (cache[src]) {
    gObject.content(cache[src]);
    return gObject.querySelector('svg');
  }
  return null;
}

const getContent = async (src) => {
  if (!cache[src]) {
    const res = await fetch(src);
    if (res.status === 200) {
      cache[src] = await res.text();
    }
  }
  return cache[src];
}

const delayExecution = (src) => {
  const commands = [];
  const proxy    = new Proxy(
    function () {
      return commands;
    },
    {
      get (target, command) {
        if (command === Symbol.toPrimitive) {
          return () => src;
        }
        if (command === 'then') {
          return (resolve) => resolve(proxy);
        }
        return (...args) => {
          commands.push({command, args});
          return proxy;
        }
      }
    }
  )
  return proxy;
}

const gLoad = {
  name : 'g-load',
  execute (gObject, {expression, evalExpression, data}) {
    const context = {
      ...data,
      $$ : {
        url (source) {
          return delayExecution(source);
        }
      }
    };
    const res     = evalExpression(expression, context);
    getSVG(gObject, res).then(svg => {
      if (svg) {
        if (isFunction(res)) {
          const commands = res();
          commands.forEach(step => {
            svg[step.command](step.args);
          })
        }
      }
      gObject.dispatchEvent(new Event('load', {bubbles : true}));
    });
  }
};

const gContent = {
  name : 'g-content',
  execute (gObject, {expression, evalExpression, data}) {
    const context = {
      ...data,
      $$ : {
        url (source) {
          return getContent(source);
        },
      }
    };
    const result  = evalExpression(expression, context);
    if (typeof result === 'object' && result.then) {
      result.then(result => {
        gObject.content(result);
        gObject.dispatchEvent(new Event('load', {bubbles : true}));
      });
    } else {
      gObject.content(result);
      gObject.dispatchEvent(new Event('load', {bubbles : true}));
    }
  }
};

function install (setup) {

  // Add template directive
  if (setup.extendTemplate) {
    setup.extendTemplate.defineDirective(gLoad);
    setup.extendTemplate.defineDirective(gContent)
  }
}

export default install;