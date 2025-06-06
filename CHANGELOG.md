# Change Log

## 1.0.1 (2025-04-01)

- Fixed a bug when `data.$distinc('key')` is called twice with different keys.
- Added `lib/component.js` with `defineComponent()` function for create a Web Component from 
  `g-composer` content.
- Change the local `tools/workbench/` for `graphane-workbench` package.
- Change the local `tools/packer/` for `graphane-packer` package.

## 1.0.0 (2025-01-02)

- First stable version.
- Reorganized the content of the `dist` folder.
- Optimized code.

## 1.0.0-beta.8 (2024-12-19)

- Added `observer.dark` plugin.
- Removed the undocumented feature that allowed `g-for="n of obj"`.
- Added support for iterating over object members using `g-for="(value, key) in obj"`.
- Added support for iterating a numeric range with `g-for="n in 10"`, generating `1,2,3,4,5,6,7,8,9,10`.
- Maintained support for `g-for="n of 10"`, generating `0,1,2,3,4,5,6,7,8,9`.
- Maintained support for `g-for="n of arr"` to iterate over arrays.
- Added support for conditional objects within an array in the `g-bind` of `class` attribute. 
- Added `$$.element` and `$$.attribute` helpers in `g-bind`.
- Refactored `$$.currentValue()` in `g-bind` for the `style` attribute, now returns an object, 
  and for the `class` attribute, now returns an array.
- Added `$$.element` as a helper in `g-content`.
- Fixed a bug when `g-if` and `g-for` are in the same element in that order and the `g-if` condition 
  changes.

## 1.0.0-beta.7 (2024-11-04)

- BREAKING CHANGE: Split `shapes` plugin into: 
  - `shapes`: `polar2cartersian()`, `arc()`, `barArc()`, and `circleSlice()`.
  - `shapes.extra`: `regularPolygon()`, `strart()`, and `circle()`.
- Added `spiral()` to `shapes.extra` plugin.
- Added `shapes` plugin into `g-composer` core.

## 1.0.0-beta.6 (2024-10-21)

- Added data helpers with slice functionality: `data.$sumBefore(idx [,prop])`, 
  `data.$minBefore(idx [,prop])`, `data.$maxBefore(idx [,prop])`, `data.$avgBefore(idx [,prop])`,
  `data.$distincBefore(idx [,prop])`, and `data.$countBefore(idx [,prop])`.

## 1.0.0-beta.5 (2024-10-14)

- BREAKING CHANGE: Until now, `<defs g-for="">` was used to create a list of items. Now the behavior
  of `<defs g-for=“”>` is to generate a list of invisible `<defs>`, not a list of visible `<g>`.
  To create a list of items you must use `<g g-for="">`.
- Added complete support to `g-for` and `g-bind` in the same element. In each iteration over the
  `g-for` is evaluated the `g-bind`. 
- Added support to `g-for` and `g-if` in the same element in this order. The oposite precedence 
  (`g-if` before than `g-for`) is not supported.
- Fixed possible side effects in the execution of directives inside `g-if` blocks evaluated as 
  false. The evaluation of other directives inside a false `g-if` block is now bypassed.
- Fixed the default SVG size when the `viewBox` is dynamically defined.
- Fixed the error event triggering. An event was fired for each error. Now a single event is sent
  with all errors in an array.

## 1.0.0-beta.4 (2024-10-02)

- Added the `.value` property and `value` attribute to `g-composer`. This `value` is a shortcut to
  `.data={value: v}`.
- Added the `.version` property to `g-composer`, it allows easy access to the version information of 
  the Composer instance.
- Error detection and error messages have been improved.
- Fixed a Proxy error when a primitive `data` is returned.
- Update attribute assignment for camelCase properties.
- The code is optimized to reduce size and increase speed.

## 1.0.0-beta.3 (2024-09-16)

- Fixed catastrophic backtracking in regex checks when wrong data is processed.
- Added support for simple data (datum), i.e. `data`, in addition to objects and arrays, can be a 
  simple number, string or boolean value.
- Added `CONTRIBUTING.md` and `CODE_OF_CONDUCT.md`.

## 1.0.0-beta.2 (2024-09-08)

- BREAKING CHANGE: `$$()` in `g-content` directive is renamed to `$$.currentValue()`.
- Added `$$.fromURL()` in `g-content` directive for load external resources.
- Added `$$.currentContent()` in `g-content` directive for get the current content.
- The `g-load` directive plugin has been removed, as this function is integrated in `g-content`.
- Refactored the template engine's directive storage to ensure that there is only one handler per directive.
- Improve `README.md`.

## 1.0.0-beta.1 (2024-09-05)

- First beta version.

## 0.1.0-alpha.12 (2024-09-03)

- Fix an error with `g-bind` with camelcase attributes as `viewBox`.

## 0.1.0-alpha.11 (2024-08-26)

- Improve `g-for` and `g-if` directives.
- Rewrite `.source()` and `.toSource()` for the new internal reference comment (`<!-- ref -->`).

## 0.1.0-alpha.10 (2024-08-02)

- Added the `.toSource()` plugin to get a formal SVG format.
- Fixed `.source()` with template engine and `defs g-for` elements.

## 0.1.0-alpha.9 (2024-01-23)

- Improve the handling error in `g-composer` and the SVG Template Engine.
- Added `g-object` directive from Object Plugin.
- Fixed error in Firefox when the SVG and `g-composer` don't have `width` or `height` values.

## 0.1.0-alpha.8 (2024-01-12)

- Fixed error loading plugin from `g-composer`.
- Fixed error building plugins.

## 0.1.0-alpha.7 (2024-01-06)

- BREAKING CHANGE: the attribute `viewport-ratio` is now `intersection-ratio`.
- BREAKING CHANGE: the attribute `viewport-class` is now `intersection-class`.
- BREAKING CHANGE: the attribute `viewport-once-class` is now `intersection-once-class`.
- BREAKING CHANGE: the event `enterViewport` is now `intersection.enter`.
- BREAKING CHANGE: the event `exitViewport` is now `intersection.exit`.
- BREAKING CHANGE: plugins now export a default function.
- BREAKING CHANGE: removed `script` distribution files.
- Added `.intersection(ratio)` and events `intersection.enter`/`intersection.exit` to the SVG
  library.
- Added `g-intersection="ratio"` and events `intersection.enter`/`intersection.exit` to the SVG
  Template Engine.
- Add event `load` and improve event `render` in `g-composer`.
- Added static `install()` method in `g-composer` for load plugins.
- Update plugins script for call to `g-composer.install()`.
- Added `module` distribution folder and files.
- Refactored `animateTo`.
- Fixed errors in `animateTo` with FireFox.
- Fixed a bug with Safari and the 'SVG' selector (uppercase).

## 0.1.0-alpha.6 (2023-12-31)

- Added `$$()` in the `g-bind` directive to get the current value of the attribute.
- Added reloading of the component when the Light DOM changes.
- Improved the code resulting of running `.animateTo()` or `$$.dynamic()` with `transform=rotate()`.
- Improved Javascript identifier validation in template directives.
- Improved error description in console messages.
- Improved CSV format support.
- Refactor and renamed `keep-aspect` plugin to `non-scaling-size`. As a result:
  - `g-keep-aspect` custom directive is now `g-non-scaling-size`.
  - `.keepAspect()` method is now `nonScalingSize()`.
  - `.keepAspect('stroke')` method is deprecated and must be used the standard
    attribute `vector-effect="non-scaling-stroke"`.
- Fixed errors with `animateTo` in Firefox.
- Fixed the `width` behaviour when not defined by SVG or component size.
- Fixed an error with decimal values as `g-for="n of 10.1"`.
- Fixed an error with load plugin and its internal cache.
- Removed `--internal-width` CSS variable.
- Removed support for `hidden` attribute in `g-component`.
- Refactor the array operators.

## 0.1.0-alpha.5 (2023-11-21)

- BREAKING CHANGE: the `d` attribute is reset when the `.d` object is obtained.
- BREAKING CHANGE: the `$.min()`, `$.max()` and other data helpers was change to `data.$min()`,
  `data.$max()`, etc.
- BREAKING CHANG: renamed `$.dynamic()` to `$$.dynamic()` in `g-bind` directive.
- Added `render` event on SVG when the engine processes the template.
- Added `isRendereing` property to `true` when the composer is processing the template.
- Added `attach` event when an element is added to the SVG.
- Added `.parents()` method to the SVG library to obtain an array with all the parent elements.
- Added `.top()` method to the SVG library to obtain the top parent element.
- Added observe-resize plugin:
  - `.observeResize()` method to the SVG library.
  - `resize` event on SVG element.
- Added keep-aspect plugin:
  - `g-keep-aspect` custom directive to the template engine.
  - `.keepAspect()` method.
- Added load plugin:
- `g-load` custom directive to the template engine.
- `load` event.
- Change the object observer behavior, now it doesn't launch the callback when the property is
  updated with the previous value.
- Refactored `.add()` and `.addBefore()` methods.
- Refactored `d` and `transform` handler.
- Fixed debug plugin with new `.add()` and `.addBefore()` methods.
- Fixed an error with SVG library and Promises.
- Fixed an SVG library bug with `.content()` and `innerHTML()` when including tags ending in `/>`.
- Removed support for the ancient plugin model (deprecated).

## 0.1.0-alpha.4 (2023-11-08)

- BREAKING CHANGE: Renamed `g-template` as `g-composer`!
- BREAKING CHANGE: Redesigned plugin model!
- Added support for `transform` pseudo functions like `transform.scale().translate()`.
- Improved support for `d` path pseudo functions like `d.M().L()`.
- Refactored `d.regularPolygon()` in the shape plugin.
- Redesigned and refactored `d.arc()` in the shape plugin.
- Redesigned and refactored `d.barArc()` in the shape plugin.
- Added `d.circleSlice()` to the shape plugin.
- Optimized the lengths of the shape plugin with only four decimal places.

## 0.1.0-alpha.3 (2023-10-26)

- Added special function `data()` in `script type="method"` for normalize and transform data before
  the rendering.
- Created export for core.
- Added named export in core-viewport.
- Moved CSS_PROP from constructor to prototype in core.
- Added direction to `d.arc()` shape plugin.
- Updated develop dependencies.

## 0.1.0-alpha.2 (2023-18-10)

- Renamed `$.animate()` to `$.dynamic()` in `g-bind` directive.
- Added support for keyframes in `$.dynamic()`.s
- Removed event 'load' and added event 'init' than is launch only one way per template.
- The event handler called from `g-on` recibe as this the SVG element wrapped by the gSVG library.
- The `g-on` directive support to call methods with and without parameters.
- The `g-on` directive support expressions.
- The `g-on` directive support lazy load methods.
- Template attribute `src` renamed as `svg-src`.
- Added support for function names with unicode characters into script type methods.
- Fixed a bug with anonymous functions into script type methods.
- Fixed a bug with several updates of `$.data`.
- Fixed a bug with remove previous event listener in `g-on`.
- Fixed a bug when data has line return with Windows format.
- Fixed a bug with `height` and `width` values and `animateTo()`.

## 0.1.0-alpha.1 (2023-09-30)

- Initial version.