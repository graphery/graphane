# ![Graphane](./assets/img/graphane.png)

See the complete documentation at [graphane.dev](https://graphane.dev/) and many editable examples
at [playground.graphane.dev](https://playground.graphane.dev/).

Graphane is a free and open-source **data visualization low-level microframework** designed to
facilitate the creation of custom, dynamic and interactive visualizations. Graphane offers 
**flexibility in designs**, allowing creators to make unique aesthetic visualizations that are far 
from becoming monotonous charts seen everywhere.

Graphane is composed of:

- **A web component** for combining:
  - **SVG** markup template with directives.
  - **Data** in JSON or CSV formats.
  - **Methods**, optionally, to handle interactivity and data transformation.

This is a basic example:

![example](assets%2Fimg%2Fexample.png)
  
```html
<g-composer id="example-starter">
  <template>
    <svg viewBox="0 0 200 100" width="200px" height="100px">
      <g stroke-width="12" stroke-linecap="round">
        <defs g-for="(record, index) of data">
          <line x1="22"
                g-bind:x2="record.value"
                g-bind:y1="index * 20 + 30"
                g-bind:y2="index * 20 + 30"
                g-bind:stroke="record.color"/>
        </defs>
      </g>
    </svg>
  </template>
  <script type="data">[ 
    { color: "#D80000", value: 130 }, 
    { color: "#00D800", value: 170 }, 
    { color: "#0000D8", value: 100 }, 
  ]
  </script>
</g-composer>
```

Graphane is based on SVG and directives, defining a **declarative way** to build **data-driven**
graphics. This approach allows centering the effort on the design in a very natural form. Designers
and developers achieve technical efficiency and gain the means to communicate their data story to
their audience effectively.

In addition, Graphane has a **smooth rendering** and **optimal performance** with a **tiny 
overhead**. It is not just a tool but a complete system that includes specially designed mechanisms 
to update the visualization efficiently when data are changed. Graphane maintains high runtime 
performance without the need for pre-compilation processes.

## Load

To start, you must load Graphane on your HTML page. This is done by adding a `script` tag pointing
to the Graphane file. 

You can use the CDN directly:

```html
<script src="https://cdn.graphery.online/graphane/1.0.0/composer.js"></script>
```

You can install locally the Graphane package with:

```bash
npm i graphane
```

## Authors and acknowledgment

The initial version has been created by Graphery. Thanks to collaborators and friends for their 
support and help. If you have any questions or need support, feel free to reach out.

## Contributing

We appreciate any contributions to the project! Whether it's reporting bugs, suggesting new
features, or submitting pull requests, your input is valuable.

## License

GRAPHANE is licensed under the MIT License. See the [LICENSE](LICENSE.md) file for more details.

