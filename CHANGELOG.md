# Change Log

## 0.1.0-alpha.6 (xx/xx/2023)

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
- Fixed the `width` behaviour when not defined by SVG or component size.
- Fixed an error with decimal values as `g-for="n of 10.1"`.
- Fixed an error with load plugin and its internal cache.
- Removed `--internal-width` CSS variable.
- Removed support for `hidden` attribute in `g-component`.
- Refactor the array operators.

## 0.1.0-alpha.5 (21/11/2023)

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

## 0.1.0-alpha.4 (08/11/2023)

- BREAKING CHANGE: Renamed `g-template` as `g-composer`!
- BREAKING CHANGE: Redesigned plugin model!
- Added support for `transform` pseudo functions like `transform.scale().translate()`.
- Improved support for `d` path pseudo functions like `d.M().L()`.
- Refactored `d.regularPolygon()` in the shape plugin.
- Redesigned and refactored `d.arc()` in the shape plugin.
- Redesigned and refactored `d.barArc()` in the shape plugin.
- Added `d.circleSlice()` to the shape plugin.
- Optimized the lengths of the shape plugin with only four decimal places.

## 0.1.0-alpha.3 (26/10/2023)

- Added special function `data()` in `script type="method"` for normalize and transform data before
  the rendering.
- Created export for core.
- Added named export in core-viewport.
- Moved CSS_PROP from constructor to prototype in core.
- Added direction to `d.arc()` shape plugin.
- Updated develop dependencies.

## 0.1.0-alpha.2 (18/10/2023)

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

## 0.1.0-alpha.1 (30/09/2023)

- Initial version.