import {
  Base, define,
  RENDER, CONTEXT, FIRE_EVENT, CHANGE
}                         from '../core/base.js';
import {
  STRING, OBJECT, jsStr2obj, csvStr2obj, isLikeObject, isLikeArray, isFunction, isArray
}                         from '../helpers/types.js';
import intersection       from "../core/intersection.js";
import gSVG               from '../lib/gsvg.js';
import render             from '../plugins/template.engine.js';
import { debounceMethod } from "../helpers/functions.js";
import { getFunctions }   from "../helpers/function.create.js";
import { operations }     from "../helpers/array.operations.js";
import { clone }          from "../helpers/objects.js";

const composerPlugin = (setup) => {
  setup.extendSetup({
    extendComposer (extension) {
      isFunction(extension) ?
        extension(Composer.prototype) :
        Object.assign(Composer.prototype, extension);
    }
  })
};

gSVG.install(render)
    .install(composerPlugin);

const NAME        = 'composer';
const UPDATE      = 'update';
const SVG         = 'svg';        // Keep in lowercase for Safari
const METHODS     = 'methods';
const CONFIG      = 'config';
const DATA        = 'data';
const SRC         = '-src';
const queryScript = (kind) => `script[type=${ kind }],g-script[type=${ kind }]`;
const isNotSize   = (size) => !size || size.baseVal?.value === 0;


/**
 * Class representing a Graphane Composer.
 * @fires 'load' - This event fires when the component load the external resources.
 * @fires 'update' - This event fires when the component update the content.
 * @property {object} svg - Return the gSVG object for the graph.
 * @property {boolean} [isRendering] - It's true if the component is rendering.
 * @property {boolean} [loaded] - It's true if the component is loaded.
 */
export default class Composer extends Base {

  /**
   * Installs the given plugin.
   * @param {Object|Function} svgPlugin - The plugin to install.
   */
  static install (svgPlugin) {
    gSVG.install(svgPlugin);
  }

  #svg        = null;
  #loaded     = false;
  #errors     = [];
  isRendering = false;


  /**
   * Logs an error message and triggers the 'error' event.
   * @param {string} message - The error message.
   * @param {string} scope - The scope in which the error occurred.
   * @param {string} [code=''] - Additional code related to the error. (Optional)
   * @return {void}
   */
  #error (message, scope = '', code = '') {
    const errMsg = `${ message }${ scope ? ` in ${ scope }` : '' }\n${ code }`;
    this.#errors.push(errMsg);
    console.warn(`Graphane Composer - Error:\n${ errMsg }`);
    this[FIRE_EVENT]('error', errMsg);
  }

  /**
   * Fetches the content from the specified URL.
   * @param {string} url - The URL to fetch data from.
   * @throws {Error} If the fetch request failed or the status code is not 200.
   * @returns {Promise<string>} A promise that resolves to the fetched content as text.
   */
  async #fetch (url) {
    const res = await fetch(url)
    if (res.status !== 200) {
      throw new Error(`${ res.statusText } (${ res.status }): ${ res.url }`);
    }
    return res.text();
  }

  /**
   * Loads plugins.
   * @private
   * @returns {Promise<void>} - A promise that resolves when all plugins are loaded.
   */
  async #loadPlugins () {
    const plugins = [...this.querySelectorAll(queryScript('plugin'))];
    for (let plugin of plugins) {
      const src = plugin.getAttribute('src');
      if (src) {
        const url = new URL(src, document.location.href);
        try {
          const lib = await import(url.href);
          if (lib?.default) {
            gSVG.install(lib.default);
          }
        } catch (err) {
          this.#error(err.message, 'plugin', url);
        }
      }
    }
  }

  /**
   * Loads an SVG into the element's content area.
   * @private
   * @returns {Promise<boolean>} A promise that resolves to true if SVG loading is successful, or false otherwise.
   */
  async #loadSVG () {
    const ctx             = this [CONTEXT];
    this.#svg             = null;
    ctx.content.innerHTML = '';
    if (ctx.svgSrc) {
      try {
        ctx.content.innerHTML = await this.#fetch(ctx.svgSrc);
      } catch (err) {
        this.#error(err.message, SVG, ctx.svgSrc);
      }
    } else {
      const template = this.querySelector('template')?.content || this.querySelector(SVG);
      if (template) {
        ctx.content.append(template.cloneNode(true));
      }
    }
    const svg = ctx.content.querySelector(SVG);
    if (svg) {
      this.#svg = gSVG(svg);
      if (isNotSize(this.#svg.width()) && isNotSize(this.#svg.height())) {
        this.#svg.width('100%');
        this.#svg.height('100%');
      }
    }
    return true;
  }

  async #loadScript (kind, reviver) {
    const ctx = this[CONTEXT];
    const key = kind + 'Src';
    const el  = this.querySelector(queryScript(kind));
    if (el) {
      ctx[key] = el.getAttribute('src');
    }
    let content = '';
    try {
      content = ctx[key] ? await this.#fetch(ctx[key]) : el?.textContent;
      if (content) {
        ctx[kind] = reviver(content);
      }
    } catch (err) {
      this.#error(err.message, kind, content);
    }
  }

  /**
   * Load methods.
   * @return {Promise<void>} A Promise that resolves once the methods are loaded.
   */
  #loadMethods () {
    return this.#loadScript(METHODS, (content) => getFunctions({$ : this}, content));
  }

  /**
   * Loads the configuration.
   * @private
   * @return {Promise<void>} A promise that resolves after loading the configuration.
   */
  #loadConfig () {
    return this.#loadScript(CONFIG, jsStr2obj);
  }

  /**
   * Loads the data.
   * @private
   * @returns {Promise<void>} A promise that resolves when the data is loaded.
   */
  #loadData () {
    return this.#loadScript(DATA, (content) => isLikeObject(content) || isLikeArray(content) ?
      jsStr2obj(content) :
      csvStr2obj(content));
  }

  constructor () {
    super();
    const ctx                 = this [CONTEXT];
    // language=HTML
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display : inline-block;
          width   : max-content;
          height  : max-content;
        }
      </style>
      <span id="content"></span>
    `;
    ctx.content               = this.shadowRoot.querySelector('#content');
  }

  /**
   * Render method
   * private
   */
  [RENDER] () {
    return !this.load();
  }

  /**
   * Handles changes to the mutations.
   *
   * @async
   * @param {Array} mutations - The mutations to be handled.
   * @returns {boolean} - True if the mutations were successfully handled, false otherwise.
   */
  async [CHANGE] (mutations) {
    const promises = [];
    for (let mutation of mutations) {
      const target = mutation.target;
      if (target === this && !mutation.attributeName) {
        return this.load();
      }
      if (target.tagName.toLowerCase() === SVG) {
        promises.push(this.#loadSVG());
      } else if (target.tagName === 'SCRIPT') {
        const load = {
          data    : this.#loadData,
          methods : this.#loadMethods,
          config  : this.#loadConfig
        }[target.type.toLowerCase()];
        if (load) {
          promises.push(load());
        }
      }
    }
    if (promises.length) {
      await Promise.all(promises);
      return this.update();
    }
  }

  /**
   * Loads necessary resources and initializes the component.
   *
   * @returns {Promise<boolean|void>} A promise that resolves to true if the loading is successful, or false if an error occurs.
   */
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
      this[FIRE_EVENT]('load');

    } catch (err) {
      return false;
    }

    // Call to update
    return this.update(true);

  }

  /**
   * Updates the SVG if rendering is not in progress, unless when forced parameter is set to true.
   * If update is allowed, it clones the current data object, performs operations on it, and then renders the SVG.
   * @param {boolean} [forced=false] - Determines whether the update should be forced even if rendering is in progress.
   * @return {Promise<void>} - A promise that resolves once the SVG is rendered.
   */
  async update (forced = false) {
    if (this.isRendering && !forced) {
      return;
    }
    if (this.#svg) {
      this.rendered    = false;
      this.isRendering = true;
      const ctx        = this [CONTEXT];
      const data       = operations(
        ctx.methods?.data ?
          ctx.methods.data(clone(ctx.data)) :
          clone(ctx.data)
      );
      const renderCtx  = {
        ...ctx.methods,
        ...(isArray(data) ? {} : data),
        data,
        $ : this
      };
      await this.#svg.render(renderCtx, this.#error.bind(this));
      this.isRendering = false;
      this.rendered    = true;
    }
  }

  /**
   * Returns the SVG object associated with this instance.
   * @returns {object} The SVG object.
   */
  get [SVG] () {
    return this.#svg;
  }

  /**
   * Retrieves the loaded status of the resource.
   * @returns {boolean} The loaded status of the resource.
   */
  get loaded () {
    return this.#loaded;
  }

  /**
   * Retrieves the list of errors.
   *
   * @return {Array} An array containing the errors.
   */
  get errors() {
    return [...this.#errors];
  }

}

Composer.prototype.update = debounceMethod(Composer.prototype.update, 1)

// Define the component
define(Composer)
  .extension(intersection)
  .attribute({name : SVG + SRC, type : STRING, value : '', posUpdate : RENDER})
  .attribute({name : DATA, type : OBJECT, value : [], posUpdate : UPDATE})
  .attribute({name : DATA + SRC, type : STRING, posUpdate : RENDER})
  .property({name : METHODS, type : OBJECT, value : {}, posUpdate : UPDATE})
  .attribute({name : METHODS + SRC, type : STRING, posUpdate : RENDER})
  .attribute({name : CONFIG, type : OBJECT, value : {}, posUpdate : UPDATE})
  .attribute({name : CONFIG + SRC, type : STRING, posUpdate : RENDER})
  .tag(NAME);
