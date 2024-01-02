const EVENT_IN  = 'intersection.enter';
const EVENT_OUT = 'intersection.exit';
const OBSERVER  = Symbol();
const options   = {
  "root"       : null,
  "rootMargin" : "0px",
  "threshold"  : Array(21).fill(0).map((x, y) => y * 0.05)
};


// intersection
export function intersection (ratio) {
  let intersected = false;
  if (this[OBSERVER]) {
    this[OBSERVER].disconnect();
  }
  this[OBSERVER] = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio >= ratio) {
        if (!intersected) {
          intersected = true;
          this.dispatchEvent(new CustomEvent(
            EVENT_IN,
            {bubbles : true, cancelable : true, composed : true}
          ));
        }
      } else {
        intersected = false;
        this.dispatchEvent(new CustomEvent(
          EVENT_OUT,
          {bubbles : true, cancelable : true, composed : true}
        ));
      }
    });
  }, options);
  this[OBSERVER].observe(this._el || this);
}

export default intersection;