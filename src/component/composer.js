import {
  Base, define,
  RENDER, CONTEXT, FIRE_EVENT
}                         from '../core/base.js';
import {
  STRING, OBJECT, isString, jsStr2obj, csvStr2obj, isLikeObject, isLikeArray
}                         from '../helpers/types.js';
import viewport           from "../core/viewport.js";
import gSVG               from '../lib/gsvg.js';
import animateTo          from '../lib/plugins/gsvg.animateto.js';
import render             from '../lib/plugins/gsvg.template.engine.js';
import { debounceMethod } from "../helpers/functions.js";
import { getFunctions }   from "../helpers/function.create.js";

gSVG.install(animateTo)
    .install(render);

const NAME           = 'composer';
const SVG            = 'svg';
const INTERNAL_WIDTH = '--internal-width';
const UPDATE         = 'update';
const queryScript    = (kind) => `script[type=${ kind }],g-script[type=${ kind }]`;

/**
 * gy-svg class
 * @element gy-svg
 */
export default class Composer extends Base {

  #svg    = null;
  #loaded = false;

  async #fetch (url) {
    const res = await fetch(url)
    if (res.status !== 200) {
      throw new Error(`${ res.statusText } (${ res.status }): ${ res.url }`);
    }
    return res.text();
  }

  async #loadPlugins () {
    const plugins = [...this.querySelectorAll(queryScript('plugin'))];
    for (let plugin of plugins) {
      const src = plugin.getAttribute('src');
      if (src) {
        const lib = (await import(src)).default;
        gSVG.install(lib);
      }
    }
  }

  async #loadSVG () {
    const ctx             = this [CONTEXT];
    this.#svg             = null;
    ctx.content.innerHTML = '';

    if (ctx.svgSrc) {
      ctx.content.innerHTML = await this.#fetch(ctx.svgSrc);
    } else {
      const template = this.querySelector('template')?.content || this.querySelector(SVG);
      if (template) {
        ctx.content.append(template.cloneNode(true));
      }
    }
    const svg = ctx.content.querySelector(SVG);
    if (svg) {
      this.#svg     = gSVG(svg);
      const viewBox = this.#svg.viewBox();
      const width   = isString(viewBox) ? viewBox.split(/\s|;/)[3] : 0;
      this.shadowRoot.host.style.setProperty(INTERNAL_WIDTH, `${ width || 250 }px`);
    }
    return true;
  }

  async #loadScript (kind) {
    const ctx = this[CONTEXT];
    const key = kind + 'Src';
    const el  = this.querySelector(queryScript(kind));
    if (el) {
      ctx[key] = el.getAttribute('src');
    }
    if (ctx[key]) {
      return this.#fetch(ctx[key]);
    }
    return el?.textContent;
  }

  async #loadMethods () {
    const content = await this.#loadScript('methods');
    if (content) {
      this [CONTEXT].methods = getFunctions({$ : this}, content);
    }
  }

  async #loadConfig () {
    const content = await this.#loadScript('config');
    if (content) {
      this [CONTEXT].config = jsStr2obj(content);
    }
  }

  async #loadData () {
    const content = await this.#loadScript('data');
    if (content) {
      this [CONTEXT].data = isLikeObject(content) || isLikeArray(content) ?
        jsStr2obj(content) :
        csvStr2obj(content);
    }
  }

  constructor () {
    super();
    const ctx                 = this [CONTEXT];
    // language=HTML
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display : inline-block;
          width   : var(--internal-width, 250px);
          height  : auto;
        }

        :host([hidden]) {
          display : none;
        }
      </style>
      <span id="content"></span>
    `;
    ctx.content               = this.shadowRoot.querySelector('#content');
  }

  /**
   * Render method
   * @private
   */
  async [RENDER] () {

    // Load
    await this.load();

  }

  async load () {
    try {

      this.#loaded = false;

      // Plugins
      await this.#loadPlugins();

      await Promise.all([
        // SVG
        this.#loadSVG(),
        // Config
        this.#loadConfig(),
        // Methods
        this.#loadMethods(),
        // Data
        this.#loadData()
      ]);

      this.#loaded = true;

    } catch (err) {
      console.error(err.message);
      this[FIRE_EVENT]('error', err.message);
      return false;
    }

    // Call to update
    this.update(true);

  }

  update (forced = false) {
    if (!this.rendered && !forced) {
      return;
    }
    if (this.#svg) {
      this.rendered   = false;
      const ctx       = this [CONTEXT];
      const renderCtx = {
        ...ctx.methods,
        data : ctx.methods.data ? ctx.methods.data(ctx.data) : ctx.data,
        $    : {config : ctx.config, svg : this.#svg}
      };
      this.#svg.render(renderCtx);
      this.rendered = true;
    }
  }

  get svg () {
    return this.#svg;
  }

  get loaded () {
    return this.#loaded;
  }

}

Composer.prototype.update = debounceMethod(Composer.prototype.update, 1)

// Define the component
define(Composer)
  .extension(viewport)
  .attribute({name : 'svg-src', type : STRING, value : '', posUpdate : RENDER})
  .attribute({name : 'data', type : OBJECT, value : [], posUpdate : UPDATE})
  .attribute({name : 'data-src', type : STRING, posUpdate : RENDER})
  .property({name : 'methods', type : OBJECT, value : {}, posUpdate : UPDATE})
  .attribute({name : 'methods-src', type : STRING, posUpdate : RENDER})
  .attribute({name : 'config', type : OBJECT, value : {}, posUpdate : UPDATE})
  .attribute({name : 'config-src', type : STRING, posUpdate : RENDER})
  .tag(NAME);
