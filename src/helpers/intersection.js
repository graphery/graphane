const EVENT_IN  = 'intersection.enter';
const EVENT_OUT = 'intersection.exit';
const OBSERVER  = Symbol();


// intersection
export function intersection (ratio) {
  const event = (kind) => this.dispatchEvent(new CustomEvent(
    kind,
    {bubbles : true, cancelable : true, composed : true}
  ));
  let intersected = false;
  if (this[OBSERVER]) {
    this[OBSERVER].disconnect();
  }
  this[OBSERVER] = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio >= ratio) {
        if (!intersected) {
          intersected = true;
          event(EVENT_IN);
        }
      } else {
        intersected = false;
        event(EVENT_OUT);
      }
    });
  }, {
    "root"       : null,
    "rootMargin" : "0px",
    "threshold"  : Array(21).fill(0).map((x, y) => y * 0.05)
  });
  this[OBSERVER].observe(this._el || this);
}

export default intersection;