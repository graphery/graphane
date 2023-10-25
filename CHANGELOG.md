# Change Log

## 0.1.0-alpha.3 (xx/xx/2023)

- Added special function `data()` in `script type="method"` for normalize and transform data before
  the rendering.
- Added direction to arc shape function.
- Created a general export for core, and a packaging process for publication.
- Added named export in core/viewport.
- Moved CSS_PROP from constructor to prototype in core.
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