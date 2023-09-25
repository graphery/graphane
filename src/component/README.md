![graphane](../../assets/img/graphane.svg)

# Base class for Graphane web components

This is the base class for all components of Graphery. This class, and some utilities that includes,
allow you to define *Web Components* simplified, hiding some complexities of the construction of
this kind of component and to make easier and more efficient the development of new components.

## Table of Contents

- [Create a component from Base](#create-a-component-from-base)
- [Component life cycle](#component-life-cycle)
- [Attributes](#attributes)
- [Properties without attribute mirror](#properties-without-attribute-mirror)
- [Private information](#private-information)
- [Local DOM](#local-dom)
- [Resize](#resize)
- [CSS Custom property](#css-custom-property)
- [Manages advanced life cycle](#manages-advanced-life-cycle)
- [Create component without interface](#create-component-without-interface)
- [Quick reference](#quick-reference)

## Create a component from Base

To inherit from class `Base` you need:

- Import the class `Base`, a special Symbol with name `RENDER` and `define` function from the base
  module.
- Create a new class extended from `Base`.
- Define to `[RENDER]` method, where usually create to graph into the `shadowRoot`.
- Register the new component with `define(Class).tag('tagname')`;

<!-- example1.html -->

```js
import { Base, RENDER, define } from '../component/base.js';

class MyComponent extends Base {
  constructor () {
    super();
  }

  [RENDER] () {
    this.shadowRoot.innerHTML = `
        <svg viewBox="0 0 200 100" width="200" height="100">
          <ellipse cx="100" cy="50" rx="100" ry="50" fill="blue"/>
        </svg>`;
  }
}

define(MyComponent)
  .tag('my-component');
```

As a result of executing this code, we can use a new component of Graphery with the
name `g-my-component`:

```html

<g-my-component></g-my-component>
```

In this example we have inserted a simple ellipse with an SVG tag, but Graphery allows any type of
content to create their graphics, from HTML, to Canvas, passing by the SVG format. Any content
supported by modern browsers can be inserted inside the Shadow DOM of the component, even other web
components.

**Note*: all components of Graphery beginning with `g-`. This prefix is not must be passed to the
function `define().tag()`.

## Component life cycle

### Constructor

Each time you create an instance of the component occurs to call to the constructor of our class.
This constructor must always call `super();` so that you can to properly call the constructor of the
base class. In this constructor normally we will only make the configuration jobs, and we should not
use it to build the component display.

### Render method

When it is necessary to visualize the component calls the method `[ RENDER ]`. In this method is
where we will build the structure of a display component, typically by writing the content of the
Shadow DOM (`this.shadowRoot`). It is recommended that this method be used only to create the stable
structure of the component, which does not change when data is changed of the component.

### Refresh method

Once you have created the basic outline of the component is called internally the method
`[REFRESH ]` that is used to update the content. This method is used to update the content of the
component.

**Note**: *This way of expressing the name of the method `[ RENDER ]` and `[REFRESH ]` is using what
is called destructuring with a symbol we have imported the class. Although it may seem a little
strange, is not nothing peculiar in this way to call our method and allow you to Base identify our
methods.*

<!-- example2.html -->

```js
  import {
  Base,
  RENDER, REFRESH,
  define
} from '../component/base.js';

class MyComponent extends Base {
  constructor () {
    super();
    this.label = 'Hello Graphery'
  }

  [RENDER] () {
    this.shadowRoot.innerHTML = `
        <svg viewBox="0 0 200 100" width="200" height="100">
          <ellipse cx="100" cy="50" rx="100" ry="50" fill="blue"/>
          <text x="50%" y="50%" text-anchor="middle" fill="white"
            dy="0.3em" font-size="20"></text>
        </svg>`;
  }

  [REFRESH] () {
    this.shadowRoot.querySelector('text').innerHTML = this.label;
  }
}

define(MyComponent)
  .tag('my-component');
```

### Events emitted in the life cycle

During the life cycle of the component, it is launching a series of events that indicate the steps
by which it is happening. In particular, emit the events:

- `ready` when the component has been instantiated and has run the sti constructor.
- `render` when the component you've built its basic display.
- `refresh` when the component has updated its content.
- `update` when the component content is updated (can be launched multiple times)

<!-- example3.html -->

```html

<g-my-new-component id="component"></g-my-new-component>
<pre id="result"></pre>
<script>
  const result    = document.querySelector('#result');
  const component = document.querySelector('#component');
  component.addEventListener('ready', () => result.innerHTML += 'ready event\n');
  component.addEventListener('render', () => result.innerHTML += 'render event\n');
  component.addEventListener('refresh', () => result.innerHTML += 'refresh event\n');
  component.addEventListener('update', () => result.innerHTML += 'update event\n');
</script>
```

## Attributes

To define attributes in our component, we must use the function auxiliary
`define().attribute()` that we will import the module from the case Base.

<!-- example4.html -->

```js
import {
  Base,
  RENDER, REFRESH,
  define
} from '../component/base.js';
```

Eleven is the class defined, then we must call this function with the configuration information of
the attribute:

```js
define(MyComponent)
  .attribute({name : 'label', type : 'string', value : 'Hello Graphery', posUpdate : REFRESH});
```

As a result of this call, our component will have an attribute `label` and to property mirror with
the name `.label`. Any change in the attribute will be reflected in the property. An update into the
property only updates the attribute if it has been created explicitly.

An important element in defining the attributes is `posUpdate`. This key allows you to define, that
occurs after you change the value of this attribute. In the above example we have
indicated `REFRESH`, that is to say, that will be called update method of the component. You can
also include `RENDER` for to force the full display of the component, for example, by a change of
settings.

**Note**: if the name of the attribute has hyphen (`-`) the name of theproperty will be configured
in the format *lowerCamelCase*, that is to say, `my-data` will property mirror `.myData`.

In this example we can see how to change the property and the attribute of the component and how it
launches the event `refresh` automatically.

<!-- example4.html -->

```html

<script type="module">
  import {
    Base,
    RENDER, REFRESH,
    define
  } from '../component/base.js';

  class MyComponent extends Base {

    [RENDER] () {
      this.shadowRoot.innerHTML = `
        <svg viewBox="0 0 200 100" width="200" height="100">
          <ellipse cx="100" cy="50" rx="100" ry="50" fill="blue"/>
          <text x="50%" y="50%" text-anchor="middle" fill="white" dy="0.2em" font-size="20"></text>
        </svg>`;
    }

    [REFRESH] () {
      this.shadowRoot.querySelector('text').innerHTML = this.label;
    }
  }

  define(MyComponent)
    .attribute({name : 'label', type : 'string', value : '', posUpdate : REFRESH})
    .tag('my-component');
</script>

<g-my-component id="component" label="Hello Graphery"></g-my-component>
<button id="updateProperty">update by property</button>
<button id="updateAttribute">update by attribute</button>

<pre id="result"></pre>

<script>
  const component       = document.querySelector('#component');
  const result          = document.querySelector('#result');
  const updateProperty  = document.querySelector('#updateProperty');
  const updateAttribute = document.querySelector('#updateAttribute');

  component.addEventListener('ready', () => result.innerHTML += 'ready event\n');
  component.addEventListener('render', () => result.innerHTML += 'render event\n');
  component.addEventListener('refresh', () => result.innerHTML += 'refresh event\n');
  component.addEventListener('update', () => result.innerHTML += 'update event\n');

  updateProperty.addEventListener('click', () => {
    if (component.label === 'Hello Graphery') {
      component.label = 'Bye bye';
    } else {
      component.label = 'Hello Graphery';
    }
  });

  updateAttribute.addEventListener('click', () => {
    if (component.getAttribute('label') === 'Hello Graphery') {
      component.setAttribute('label', 'Bye bye');
    } else {
      component.setAttribute('label', 'Hello Graphery');
    }
  });
</script>
```

The attributes can be of type `boolean` (appear or not in the component), contain data of a basic
type (`string`, `number`) or to handle two complex types managed directly by the
class `Base` (`array` and `object`):

- `array` or **Lists of values**, expressed as comma-separated values in the attribute (for
  example, `attr="a, b, c, d"`), which are converted into a
  `Array` in the property (for example, `["a", "b", "b", "d"]`) and vice versa.

- `object` or **Format key:value**, is similar to the format of the attribute
  `style`, that is to say entries `key: value;` separated by `;`. These values will be converted to
  an object in the property (for example: `attr="name:
  Peter; age: 30;"` will become `{name: "Peter", age : 30}`, and vice versa. These objects may not
  be nested, and only accepted properties in the first level.

For more information about the options for creating attributes, see the reference
about [`define().attribute()`](#defineklassattributeattributedescriptor-function)

## Properties without attribute mirror

In some cases we want to define properties without an attribute mirror. In these cases we can use
the usual mechanisms of the Javascript to create properties
(with getter/setter or the constructor with `this`), but `Base` offers us the
function `define().property()` which operates in a manner very similar to
`define().attribute()` and that simplifies quite this operation.

<!-- example5.html -->

```js
  define(MyComponent)
  .property({name : 'value', type : 'number', value : 0, posUpdate : REFRESH});
```

For more information about the options for creating properties, see the reference
about [`define().property()`](#defineklasspropertypropertydescriptor-function)

## Private information

The data that has been defined by properties and/or attributes has been included in a private
context that we can access directly by a simple symbol named
`CONTEXT` includes into `this` (as `this [CONTEXT]`). This shortcut is especially important when we
don't want a collateral effect when you directly change a property and it's preferable to change the
internal state of the component.

<!-- example6.html -->

```js
  import {
  Base,
  RENDER, REFRESH, CONTEXT,
  define
} from '../component/base.js';

class MyComponent extends Base {
  constructor () {
    super();
    const ctx = this [CONTEXT];
    ctx.value = Math.round(Math.random() * 1000);
  }

  [RENDER] () {
    this.shadowRoot.innerHTML = `
        <svg viewBox="0 0 200 100" width="200" height="100">
          <ellipse cx="100" cy="50" rx="100" ry="50" fill="blue"/>
          <text x="50%" y="50%" text-anchor="middle" fill="white" dy="0.4em" font-size="40"></text>
        </svg>`;
  }

  [REFRESH] () {
    const ctx = this [CONTEXT];

    this.shadowRoot.querySelector('text').innerHTML = ctx.value;
  }
}

define(MyComponent)
  .attribute({name : 'value', type : 'number', value : 0, posUpdate : REFRESH})
  .tag('my-component');
```

## Local DOM

In some cases, the configuration of the component can be complex, and the attributes will not be
sufficient to declarative configure the behavior. In these cases, it is useful to use the Local DOM
as a mechanism for providing information and configuration to the component.

In the first place, we can use the usual mechanisms of management of the local DOM,
like `<slots></slot>`, with and without name, or the methods to handle the content of the local DOM.

<!-- example7.html -->

```js
  import {
  Base,
  RENDER, REFRESH, CHANGE,
  define
} from '../component/base.js';

class MyComponent extends Base {

  [RENDER] () {
    const text                = this.querySelector('label').innerHTML;
    this.shadowRoot.innerHTML = `
        <svg viewBox="0 0 200 100" width="200" height="100">
          <ellipse cx="100" cy="50" rx="100" ry="50" fill="blue"/>
          <foreignObject x="0" y="0" width="200" height="100"
            style="color: white; text-align: center; font-size: 1.8em; line-height: 3.5em;">
            <slot></slot>
          </foreignObject>
        </svg>`;
  }

}

define(MyComponent).tag('my-component');
```

Now, the contents of the local DOM will be inserted automatically into the
`<slot></slot>`.

```html

<g-my-component id="component">
  <label><b><i>Number</i>:</b> <span id="num">0</span></label>
</g-my-component>
```

The class `Base` offers us the possibility to observe any change of the local DOM in a basic way. We
need to import the symbol `CHANGE` and create a method with that symbol as name. This method will be
invoked every time when is changed the local DOM content.

<!-- example8.html -->

```js
  import {
  Base,
  RENDER, CHANGE,
  define
} from '../component/base.js';

class MyComponent extends Base {

  [RENDER] () {
    const text                = this.querySelector('label').innerHTML;
    this.shadowRoot.innerHTML = `
        <svg viewBox="0 0 200 100" width="200" height="100">
          <ellipse cx="100" cy="50" rx="100" ry="50" fill="blue"/>
          <foreignObject x="0" y="0" width="200" height="100"
            style="color: white; text-align: center; font-size: 1.8em; line-height: 3.5em;">
            ${ text }
          </foreignObject>
        </svg>`;
  }

  [CHANGE] (mutation) {
    const foreignObject     = this.shadowRoot.querySelector('foreignObject');
    const label             = this.querySelector('label');
    foreignObject.innerHTML = label.innerHTML;
  }
}

define(MyComponent).tag('my-component');
```

### Collection to manage the Local DOM

We can define a collection of elements to be included in the local DOM of our component as a
mechanism for configuration management:

<!-- example9.html -->

```html

<g-my-component id="component">
  <g-child value="10"></g-child>
  <g-child value="20"></g-child>
</g-my-component>
```

With the helper function `define().collection()` we can create a property for manage the collection
of elements in the light DOM. With this function, we'll create a property in our component that
allows us to view, edit, and add elements without manipulating directly the DOM.

```js
  import {
  Base,
  RENDER, REFRESH, CHANGE,
  define
} from '../component/base.js';

class MyComponentData extends Base {
}

define(MyComponentData)
  .attribute({name : 'value', type : 'number', value : 0})
  .tag('data');

class MyComponent extends Base {

  [RENDER] () {
    this.shadowRoot.innerHTML = `
        <svg viewBox="0 0 200 100" width="200" height="100">
          <ellipse cx="100" cy="50" rx="100" ry="50" fill="blue"/>
          <text x="50%" y="50%" text-anchor="middle" fill="white" dy="0.2em" font-size="20"></text>
        </svg>`;
  }

  [REFRESH] () {
    let result = 0;
    for (let id in this.values) {
      result += parseInt(this.values[id].value);
    }
    const text     = this.shadowRoot.querySelector('text');
    text.innerHTML = result.toString();
  }

  [CHANGE] (mutation) {
    this [REFRESH]();
  }
}

define(MyComponent)
  .collection({name : 'values', tag : 'g-child', properties : ['value']})
  .tag('my-component');
```

## Resize

Sometimes it is important to know when has changed the size of the component to be able to adjust
the content to the new size. This management can be easier if we import the symbol `RESIZE` and
create a new method with this symbol. That method will be invoked when the size of the component has
changed.

<!-- example10.html -->

```js
  import {
  Base,
  RENDER, RESIZE,
  define
} from '../component/base.js';


class MyComponent extends Base {

  [RENDER] () {
    this.shadowRoot.innerHTML = `
        <style>
          :host { display: block;}
        </style>
        <svg viewBox="0 0 200 100" width="100%" height="100">
          <ellipse cx="100" cy="50" rx="100" ry="50" fill="blue"/>
          <text x="50%" y="50%" text-anchor="middle" fill="white" dy="0.2em" font-size="20">
            ${ this.label }
          </text>
        </svg>`;
  }

  [RESIZE] (width, height) {
    const svg = this.shadowRoot.querySelector('svg');
    svg.setAttribute('height', width / 2);
  }
}

define(MyComponent)
  .attribute({name : 'label', type : 'string', value : '', posUpdate : RENDER})
  .tag('my-component');
```

The `[ RESIZE ]` method receive as parameters:

- width - The new width
- height - The new height
- widthDiff - the difference between last width and current width
- heightDiff - the difference between last height and current height

## CSS Custom property

You can define a CSS Properties with `define().style()`. After this definition is possible to use
the methods:

- `this.getCSSProperties()`: Get the list of CSS Properties
- `this.getCSSPropertyValue`: Get a CSS Property Value  (current or default value)

<!-- example13.html -->

```js
  import {
  Base,
  define,
  RENDER
} from '../component/base.js';


class MyComponent extends Base {

  [RENDER] () {
    this.shadowRoot.innerHTML = `
            <style>
            :host {
                display: block;
                width: 64px;
                height: 64px;
                background-color: ${ this.getCSSProperty('bg-color') };
            }
            </style>
        `;
  }

}

define(MyComponent)
  .style({name : 'bg-color', syntax : '<color>', initialValue : 'white'})
  .tag('my-component');
```

The user can define `--g-bg-color` as a CSS variable to define the component background color.

**Note**: the `--g-` prefix is included automatically when a CSS custom property is defined
by `.style()`.

## Manages advanced life cycle

In some situations, it's possible that the cycle of life as it is defined may not be suitable. In
these cases, we can modify the behavior of the life cycle with a few hooks.

We can prevent the component from rendering or updating by changing the `.ready`
value to `false`. Until the property has a `true` value there will be no updates of the interface.

When we need to run the method `[ RENDER ]` without immediately running `[
REFRESH ]` we can return `false` in the method `[ RENDER ]`. If you later want to run `[ REFRESH ]`
we have to pass the parameter `true` to indicate that this is a call forced.

In this example delays the execution of `[ RENDER ]` until the method asynchronous `load()` get data
from a remote server.


<!-- example11.html -->

```js
  import {
  Base,
  RENDER, REFRESH, CONTEXT,
  define
} from '../component/base.js';


class MyComponent extends Base {

  constructor () {
    super();
    this.load();
  }

  async load () {
    const ctx      = this [CONTEXT];
    const URL      = `https://httpbin.org/delay/${ ctx.delay }?label=hello%20Graphery`;
    const response = await fetch(URL);
    const data     = await response.json();
    ctx.label      = data.args.label;
    this[REFRESH](true);
  }

  [RENDER] () {
    this.shadowRoot.innerHTML = `
        <svg viewBox="0 0 200 100" width="200" height="100">
          <ellipse cx="100" cy="50" rx="100" ry="50" fill="blue"/>
          <text x="50%" y="50%" text-anchor="middle" fill="white" dy="0.2em" font-size="20">loading...
          </text>
        </svg>`;
    return false;
  }

  [REFRESH] () {
    const ctx      = this [CONTEXT];
    const text     = this.shadowRoot.querySelector('text');
    text.innerHTML = ctx.label;
  }
}

define(MyComponent)
  .attribute({name : 'delay', type : 'number', value : 1, posUpdate : 'load'})
  .tag('my-component');
```

## Create component without the user interface

In some cases, we need to create a Web Component without a user interface, for example, for access
to data or other kind of configuration. In these cases the `Base` class is too big, and we can
use `Simple`, a very small Web Component class without life cicle and other features related with
the user interface.

You can use `define().attribute()`, `define().property()` and `define().tag()` with classes inherit
from `Simple`, but you cannot use ~~`define().style()`~~.

<!-- example12.html -->

```js
  import {
  Simple,
  define,
  CONTEXT
} from '../component/simple.js';

class MyComponent extends Simple {

  constructor () {
    super();
    this.load();
  }

  async load () {
    const ctx      = this [CONTEXT];
    const URL      = `https://httpbin.org/delay/${ ctx.delay }?label=hello%20Graphery`;
    const response = await fetch(URL);
    const data     = await response.text();
    const ref      = document.querySelector(ctx.ref);
    ref.innerHTML  = data;
  }

}

define(MyComponent)
  .attribute({name : 'delay', type : 'number', value : 1, posUpdate : 'load'})
  .attribute({name : 'ref', type : 'string', value : ''})
  .tag('my-component');
```

## Quick reference

- [Base :`class`](#base-class)
- [RENDER :`Symbol`](#render-symbol)
- [REFRESH :`Symbol`](#refresh-symbol)
- [CHANGE :`Symbol`](#change-symbol)
- [RESIZE :`Symbol`](#resize-symbol)
- [CONTEXT :`Symbol`](#context-symbol)
- [define(klass) :`function`](#defineklass-function)
  - [.attribute(attributeDescriptor) :`function`](#defineklassattributeattributedescriptor-function)
  - [.property(propertyDescriptor) :`function`](#defineklasspropertypropertydescriptor-function)
  - [.collection(options) :`function`](#defineklasscollectionoptions-function)
  - [.style(styleDescription) :`function`](#defineklassstylecsspropertydescriptor-function)
  - [.tag(name) :`function`](#defineklasstagname-function)
- [Simple :`class`](#simple-class)

## Base :`class`

Base class for Graphery Web Component.

```js
import { Base } from '../component/base.js';

class X extends Base {

}
```

**Events**:

| Event     | Description                             |
|:----------|:----------------------------------------|
| `ready`   | fire when the component is ready        |
| `render`  | fire when the component is rendered     |
| `refresh` | fire when the component is refresh      |
| `update`  | fire when the componente is changed     |
| `resize`  | fire when the component size is changed |

**Properties**

| Name    | Type      | Default | Description                         |
|:--------|:----------|:--------|:------------------------------------|
| `ready` | `boolean` | `false` | It's true if the component is ready |

**Methods**

| Method                | Type                                     | Description                                         |
|-----------------------|------------------------------------------|-----------------------------------------------------|
| `fireEvent`           | `(event: string, detail?: string): void` | Fire an event                                       |
| `getCSSProperties`    | `(): array<string>`                      | Get the list of CSS Properties                      |
| `getCSSPropertyValue` | `(CSSPropertyName: string): string`      | Get a CSS Property Value (current or default value) |

### RENDER :`Symbol`

Symbol used for define the render method into the class inherited from Base. This method is called
when the component is created and when some property is changed and RENDER is define as pos update
action.

```js
import { Base, RENDER } from '../component/base.js';

class X extends Base {
  [RENDER] () {
    /* ... */
  }
}
```

### REFRESH :`Symbol`

Symbol used for define the refresh method into the class inherited from Base. This method is called
when the component is rendered and when some property is changed and REFRESH is define as pos update
action.

```js
import { Base, REFRESH } from '../component/base.js';

class X extends Base {
  [REFRESH] () {
    /* ... */
  }
}
```

### CHANGE :`Symbol`

Symbol used for define the refresh method into the class inherited from Base. This method is called
when the component is rendered and when some property is changed and REFRESH is define as pos update
action.

```js
import { Base, CHANGE } from '../component/base.js';

class X extends Base {
  [CHANGE] (mutations) {
    /* ... */
  }
}
```

### RESIZE :`Symbol`

Symbol used for define the resize method into the class inherited from Base. This method is called
when the component is resized.

```js
import { Base, RESIZE } from '../component/base.js';

class X extends Base {
  [RESIZE] (width, height, widthDiff, heightDiff) {
    /* ... */
  }
}
```

### CONTEXT :`Symbol`

Symbol used for define a private context used with `this [ CONTEXT ]`.

```js
import { Base, CONTEXT } from '../component/base.js';

class X extends Base {
  constructor () {
    super();
    const ctx = this[CONTEXT];
    /* ... */
  }
}
```

### define(Klass) :`function`

Extend the class as a component.

| Param   | Type    | Description                     |
|:--------|:--------|:--------------------------------|
| `klass` | `class` | Class for this custom component |

Return a `define object` with these methods:

#### define(klass).attribute(attributeDescriptor) :`function`

Defines an attribute and its property into the class

| Param                 | Type                  | Description                                 |
|:----------------------|:----------------------|:--------------------------------------------|
| `attributeDescriptor` | `attributeDescriptor` | options into a `attributeDescriptor` object |

```js
import { Base, define } from '../component/base.js';

class X extends Base {
}

define(base)
  .attribute({name : 'value', type : 'string', value : ''});
```

Return a `define object` for method chaining.

##### attributeDescriptor :`Object`

Attribute descriptor used into `defineAttribute()` function.

**Properties**

| Name               | Type                               | Description                                                                                                            |
|:-------------------|:-----------------------------------|:-----------------------------------------------------------------------------------------------------------------------|
| `name`             | `string`                           | Attribute name.                                                                                                        |
| `[propertyName]`   | `string`                           | Property name associated with this attribute. If it's omitted a default name is generated with a camel case structure. |
| `[type]`           | `string`                           | Specific type (boolean, number, string, function, object, array').                                                     |
| `[value]`          | `\*`                               | Default value.                                                                                                         |
| `[get]`            | `function`                         | Get accessor method.                                                                                                   |
| `[set]`            | `function`                         | Set accessor method.                                                                                                   |
| `[preUpdate]`      | `function` \| `string` \| `symbol` | Callback or method reference to be called previously to update.                                                        |
| `[posUpdate]`      | `function` \| `string` \| `symbol` | Callback or method reference to be called after update.                                                                |
| `[posUpdateEvent]` | `string`                           | Event name fired after the update.                                                                                     |

#### define(klass).property(propertyDescriptor) :`function`

You define a property into the class

| Param                | Type                 | Description                                |
|:---------------------|:---------------------|:-------------------------------------------|
| `propertyDescriptor` | `propertyDescriptor` | options into a `propertyDescriptor` object |

```js
import { Base, define } from '../component/base.js';

class X extends Base {
}

defineProperty(X, {name : 'value', type : 'string', value : ''});
```

Return a `define object` for method chaining.

##### propertyDescriptor :`Object`

Property descriptor is used into `defineProperty()` function.

| Name               | Type                               | Description                                                        |
|:-------------------|:-----------------------------------|:-------------------------------------------------------------------|
| `name`             | `string`                           | Property name                                                      |
| `[value]`          | `\*`                               | Default value                                                      |
| `[attribute]`      | `string`                           | The Associated attribute name                                      |
| `[type]`           | `string`                           | Specific type (boolean, number, string, function, object, array'). |
| `[preUpdate]`      | `function` \| `string` \| `symbol` | Callback or method to call previously to update                    |
| `[posUpdate]`      | `function` \| `string` \| `symbol` | Callback or method reference to call after update                  |
| `[posUpdateEvent]` | `string`                           | Event name fired after update                                      |

#### define(klass).collection(options) :`function`

You define a collection from a child custom tag. The collection has this
structure: `klassObj.<name>.<element_id> = {property: value, property: value, ...}`

`options` must have this properties:

| Member       | Type             | Description                                               |
|:-------------|:-----------------|:----------------------------------------------------------|
| `name`       | `string`         | collection name                                           |
| `tag`        | `string`         | child custom tag observed into the light DOM              |
| `properties` | `array.<string>` | list of properties names to the includes into each object |

Return a `define object` for method chaining.

#### define(klass).style(cssPropertyDescriptor) :`function`

You define a CSS variable and registre this if the browser support this kind of registration.

`cssPropertyDescriptor` can have these properties:

| Member         | Type      | Description                   |
|:---------------|:----------|:------------------------------|
| `name`         | `string`  | style variable name           |
| `syntax`       | `string`  | syntax of the custom property |
| `initialValue` | `string`  | initial value                 |
| `inherits`     | `boolean` | inherit flag                  |

Return a `define object` for method chaining.

##### define(klass).tag(name) :`function`

You define a Custom Component

| Param  | Type     | Description                          |
|:-------|:---------|:-------------------------------------|
| `name` | `string` | Custom tag name, without `g-` prefix |

```js
import { Base, define } from '../component/base.js';

class X extends Base {
}

define(X)
  .tag('tagname');
```

Return a `define object` for method chaining.

### Simple :`class`

Simple class for Graphery Web Component without the user interface.

```js
import { Simple } from '../../component/simple.js';

class X extends Simple {

}
```

**Events**:

| Event    | Description                         |
|:---------|:------------------------------------|
| `update` | fire when the componente is changed |

**Methods**

| Method      | Type                                    | Description   |
|-------------|-----------------------------------------|---------------|
| `fireEvent` | `(event: string, detail: object): void` | Fire an event |

**Hooks**

`[CHANGE]` and `this[CONTEXT]` are available on Simple class.

**Definition**

`define()`, `define().attribute()`, `define().property()`, `define().tag()` work with `Simple` class
too.

./
