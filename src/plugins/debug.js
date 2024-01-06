const NAME     = 'gSVG debug -';
const ELEMENTS = {
  a                   : [
    'animate', 'animateMotion', 'animateTransform',
    'circle', 'clipPath', 'defs',
    'desc', 'discard', 'ellipse',
    'filter', 'foreignObject', 'g',
    'image', 'line', 'linearGradient',
    'marker', 'mask', 'metadata',
    'mpath', 'path', 'pattern',
    'polygon', 'polyline', 'radialGradient',
    'rect', 'set', 'stop',
    'style', 'svg', 'switch',
    'symbol', 'text', 'title',
    'use', 'view'
  ],
  animate             : ['desc', 'metadata', 'title'],
  animateMotion       : ['desc', 'metadata', 'mpath', 'title'],
  animateTransform    : ['desc', 'metadata', 'title'],
  circle              : [
    'animate', 'animateMotion', 'animateTransform', 'desc', 'discard',
    'metadata', 'mpath', 'set', 'title'
  ],
  clipPath            : [
    'animate', 'animateMotion',
    'animateTransform', 'circle',
    'desc', 'discard',
    'ellipse', 'line',
    'metadata', 'mpath',
    'path', 'polygon',
    'polyline', 'rect',
    'set', 'text',
    'title', 'use'
  ],
  defs                : [
    'a', 'animate', 'animateMotion',
    'animateTransform', 'circle', 'clipPath',
    'defs', 'desc', 'discard',
    'ellipse', 'filter', 'foreignObject',
    'g', 'image', 'line',
    'linearGradient', 'marker', 'mask',
    'metadata', 'mpath', 'path',
    'pattern', 'polygon', 'polyline',
    'radialGradient', 'rect', 'set',
    'stop', 'style', 'svg',
    'switch', 'symbol', 'text',
    'title', 'use', 'view'
  ],
  desc                : [],
  discard             : ['desc', 'metadata', 'title'],
  ellipse             : [
    'animate',
    'animateMotion',
    'animateTransform',
    'desc',
    'discard',
    'metadata',
    'mpath',
    'set',
    'title'
  ],
  feBlend             : ['animate', 'set'],
  feColorMatrix       : ['animate', 'set'],
  feComponentTransfer : ['feFuncA', 'feFuncB', 'feFuncG', 'feFuncR'],
  feComposite         : ['animate', 'set'],
  feConvolveMatrix    : ['animate', 'set'],
  feDiffuseLighting   : ['desc', 'metadata', 'title'],
  feDisplacementMap   : ['animate', 'set'],
  feDistantLight      : ['animate', 'set'],
  feDropShadow        : ['animate', 'set'],
  feFlood             : ['animate', 'set'],
  feFuncA             : ['animate', 'set'],
  feFuncB             : ['animate', 'set'],
  feFuncG             : ['animate', 'set'],
  feFuncR             : ['animate', 'set'],
  feGaussianBlur      : ['animate', 'set'],
  feImage             : ['animate', 'animateTransform', 'set'],
  feMerge             : ['feMergeNode'],
  feMergeNode         : ['animate', 'set'],
  feMorphology        : ['animate', 'set'],
  feOffset            : ['animate', 'set'],
  fePointLight        : ['animate', 'set'],
  feSpecularLighting  : ['desc', 'metadata', 'title'],
  feSpotLight         : ['animate', 'set'],
  feTile              : ['animate', 'set'],
  feTurbulence        : ['animate', 'set'],
  filter              : [
    'animate', 'desc',
    'feBlend', 'feColorMatrix',
    'feComponentTransfer', 'feComposite',
    'feConvolveMatrix', 'feDiffuseLighting',
    'feDisplacementMap', 'feDropShadow',
    'feFlood', 'feFuncA',
    'feFuncB', 'feFuncG',
    'feFuncR', 'feGaussianBlur',
    'feImage', 'feMerge',
    'feMergeNode', 'feMorphology',
    'feOffset', 'feSpecularLighting',
    'feTile', 'feTurbulence',
    'metadata', 'set',
    'title'
  ],
  foreignObject       : [],
  g                   : [
    'a', 'animate', 'animateMotion',
    'animateTransform', 'circle', 'clipPath',
    'defs', 'desc', 'discard',
    'ellipse', 'filter', 'foreignObject',
    'g', 'image', 'line',
    'linearGradient', 'marker', 'mask',
    'metadata', 'mpath', 'path',
    'pattern', 'polygon', 'polyline',
    'radialGradient', 'rect', 'set',
    'stop', 'style', 'svg',
    'switch', 'symbol', 'text',
    'title', 'use', 'view'
  ],
  image               : [
    'animate',
    'animateMotion',
    'animateTransform',
    'desc',
    'discard',
    'metadata',
    'mpath',
    'set',
    'title'
  ],
  line                : [
    'animate',
    'animateMotion',
    'animateTransform',
    'desc',
    'discard',
    'metadata',
    'mpath',
    'set',
    'title'
  ],
  linearGradient      : [
    'animate',
    'animateTransform',
    'desc',
    'metadata',
    'set',
    'stop',
    'title'
  ],
  marker              : [
    'a', 'animate', 'animateMotion',
    'animateTransform', 'circle', 'clipPath',
    'defs', 'desc', 'discard',
    'ellipse', 'filter', 'foreignObject',
    'g', 'image', 'line',
    'linearGradient', 'marker', 'mask',
    'metadata', 'mpath', 'path',
    'pattern', 'polygon', 'polyline',
    'radialGradient', 'rect', 'set',
    'stop', 'style', 'svg',
    'switch', 'symbol', 'text',
    'title', 'use', 'view'
  ],
  mask                : [
    'a', 'animate', 'animateMotion',
    'animateTransform', 'circle', 'clipPath',
    'defs', 'desc', 'discard',
    'ellipse', 'filter', 'foreignObject',
    'g', 'image', 'line',
    'linearGradient', 'marker', 'mask',
    'metadata', 'mpath', 'path',
    'pattern', 'polygon', 'polyline',
    'radialGradient', 'rect', 'set',
    'stop', 'style', 'svg',
    'switch', 'symbol', 'text',
    'title', 'use', 'view'
  ],
  metadata            : [],
  mpath               : ['desc', 'metadata', 'title'],
  path                : [
    'animate',
    'animateMotion',
    'animateTransform',
    'desc',
    'discard',
    'metadata',
    'mpath',
    'set',
    'title'
  ],
  pattern             : [
    'a', 'animate', 'animateMotion',
    'animateTransform', 'circle', 'clipPath',
    'defs', 'desc', 'discard',
    'ellipse', 'filter', 'foreignObject',
    'g', 'image', 'line',
    'linearGradient', 'marker', 'mask',
    'metadata', 'mpath', 'path',
    'pattern', 'polygon', 'polyline',
    'radialGradient', 'rect', 'set',
    'stop', 'style', 'svg',
    'switch', 'symbol', 'text',
    'title', 'use', 'view'
  ],
  polygon             : [
    'animate',
    'animateMotion',
    'animateTransform',
    'desc',
    'discard',
    'metadata',
    'mpath',
    'set',
    'title'
  ],
  polyline            : [
    'animate',
    'animateMotion',
    'animateTransform',
    'desc',
    'discard',
    'metadata',
    'mpath',
    'set',
    'title'
  ],
  radialGradient      : [
    'animate',
    'animateTransform',
    'desc',
    'metadata',
    'set',
    'stop',
    'title'
  ],
  rect                : [
    'animate',
    'animateMotion',
    'animateTransform',
    'desc',
    'discard',
    'metadata',
    'mpath',
    'set',
    'title'
  ],
  set                 : ['desc', 'metadata', 'title'],
  stop                : ['animate', 'set'],
  style               : [],
  svg                 : [
    'a', 'animate', 'animateMotion',
    'animateTransform', 'circle', 'clipPath',
    'defs', 'desc', 'discard',
    'ellipse', 'filter', 'foreignObject',
    'g', 'image', 'line',
    'linearGradient', 'marker', 'mask',
    'metadata', 'mpath', 'path',
    'pattern', 'polygon', 'polyline',
    'radialGradient', 'rect', 'set',
    'stop', 'style', 'svg',
    'switch', 'symbol', 'text',
    'title', 'use', 'view'
  ],
  switch              : [
    'a', 'animate',
    'animateMotion', 'animateTransform',
    'circle', 'desc',
    'discard', 'ellipse',
    'foreignObject', 'g',
    'image', 'line',
    'metadata', 'mpath',
    'path', 'polygon',
    'polyline', 'rect',
    'set', 'svg',
    'switch', 'text',
    'title', 'use'
  ],
  symbol              : [
    'a', 'animate', 'animateMotion',
    'animateTransform', 'circle', 'clipPath',
    'defs', 'desc', 'discard',
    'ellipse', 'filter', 'foreignObject',
    'g', 'image', 'line',
    'linearGradient', 'marker', 'mask',
    'metadata', 'mpath', 'path',
    'pattern', 'polygon', 'polyline',
    'radialGradient', 'rect', 'set',
    'stop', 'style', 'svg',
    'switch', 'symbol', 'text',
    'title', 'use', 'view'
  ],
  text                : [
    'a', 'animate',
    'animateMotion', 'animateTransform',
    'desc', 'discard',
    'metadata', 'mpath',
    'set', 'text',
    'textPath', 'title',
    'tspan'
  ],
  textPath            : [
    'a', 'animate',
    'desc', 'metadata',
    'set', 'title',
    'tspan'
  ],
  title               : [],
  tspan               : [
    'a', 'animate',
    'desc', 'metadata',
    'set', 'title',
    'tspan'
  ],
  use                 : [
    'animate',
    'animateMotion',
    'animateTransform',
    'desc',
    'discard',
    'metadata',
    'mpath',
    'set',
    'title'
  ],
  view                : ['desc', 'metadata', 'title']
};

const CLASSLIST = [
  'length',
  'value',
  'item',
  'contains',
  'add',
  'remove',
  'replace',
  'supports',
  'toggle',
  'entries',
  'forEach',
  'keys',
  'values'
];

const EXTRA = [
  'class', 'add', 'addBefore'
]

const D           = [
  'M', 'm',
  'A', 'a',
  'C', 'c', 'S', 's',
  'L', 'l', 'H', 'h', 'V', 'v',
  'Q', 'q', 'T', 't',
  'Z', 'z'
];
const DEBUG_NONE  = 0;
const DEBUG_ERROR = 1
const DEBUG_ALL   = 2;

const toCamel                = name => name.replace(/_([a-z0-9])/g, (x, y) => y.toUpperCase());
const isValidAttribute       = (element, name) => toCamel(name) in element ||
                                                  toCamel(name) in getComputedStyle(element);
const isValidElement         = (parent, child) => ELEMENTS[parent]?.includes(child);
const isValidMethod          = (element, f, extensions) => {
  const tag   = element.el.tagName;
  const proto = Object.getPrototypeOf(element);
  return (
    f.indexOf('style.') === 0 ?
      isValidAttribute(element.el, f.substring(6)) :
      f.indexOf('classList.') === 0 ?
        isValidClassListMethod(tag, f.substring(10)) :
        f.indexOf('d.') === 0 ?
          isValidPathD(proto, tag, f.substring(2)) || extensions.includes(f) :
          proto[f] || isValidAttribute(element.el, f) || EXTRA.includes(f) || extensions.includes(f)
  );
};
const isValidClassListMethod = (tag, f) => !!CLASSLIST.includes(f);
const isValidPathD           = (proto, tag, f) => !!(D.includes(f) || (proto._d && proto._d[f]));

function origin () {
  try {
    throw new Error('myError');
  } catch (e) {
    const stack = e.stack.split('\n');
    stack.shift();
    stack.shift();
    stack.shift();
    stack.shift();
    stack.shift();
    return stack.join('\n').trim();
  }
}

function toString (args) {
  return args.map(value => JSON.stringify(value, converter)).join(', ');
}

function converter (key, val) {
  if (typeof val === 'function') {
    return `[function ${ val.name }]`;
  } else if (typeof val === 'object' && Object.getPrototypeOf(val) !== Object.prototype) {
    return val.toString();
  }
  return val;
}

const LOGGER = Symbol('svg.debug logger');

function install (setup) {
  // Update gSVG
  setup.extendConstructor(
    {
      debugLevel (level) {
        this.DEBUG_LEVEL = level;
      },
      debugLogger (v) {
        this[LOGGER] = v;
      },
      get DEBUG_NONE () {
        return DEBUG_NONE;
      },
      get DEBUG_ERROR () {
        return DEBUG_ERROR;
      },
      get DEBUG_ALL () {
        return DEBUG_ALL;
      },
      [LOGGER] : console
    }
  );
  // preCall
  setup.beforeEveryCall(
    (lib, wrapped, prop, args, extensions = []) => {
      if (lib.DEBUG_LEVEL === DEBUG_NONE) {
        return;
      }
      const log   = lib[LOGGER].log || lib[LOGGER].info || lib[LOGGER].warn;
      const error = lib[LOGGER].error;
      if (wrapped === null) {
        if (lib.DEBUG_LEVEL >= DEBUG_ALL) {
          log(`${ NAME } call gSVG( ${ toString(args) } )`);
        }
        return;
      }
      const tag = wrapped.el.tagName;
      if (!isValidMethod(wrapped, prop, extensions)) {
        return error(`${ NAME } unknown method ${ tag }.${ prop }() ${ origin() }`);
      }
      if (prop === 'add' && !isValidElement(tag, args[0])) {
        return error(`${ NAME } invalid element ${ tag }.${ prop }( '${ args[0] }' ) ${ origin() }`);
      }
      if (lib.DEBUG_LEVEL >= DEBUG_ALL) {
        log(`${ NAME } call ${ tag }.${ prop }( ${ toString(args) } )`);
      }
    }
  );
}


export default install;