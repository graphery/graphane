import defineComponent from './component.js';

(typeof gobalThis !== 'undefined' ? globalThis : window).defineComponent = defineComponent;