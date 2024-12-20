const REF                = Symbol();
const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

function observeDark (install) {
  this[REF]  = this[REF] || {};
  const html = document.documentElement;
  const body = document.body;

  const darkMode = (dark) => dark ?
    this.classList.add('dark', 'dark-mode') :
    this.classList.remove('dark', 'dark-mode');

  const darkModeListener = (event) => darkMode(event.matches);
  this[REF].listener     = darkModeListener;
  const observer         = new MutationObserver((mutationsList) => {
    for (let mutation of mutationsList) {
      if (mutation.attributeName === 'class') {
        if (mutation.target.classList.contains('dark-mode') ||
            mutation.target.classList.contains('dark')) {
          darkMode(true);
        } else {
          darkMode(false);
        }
      }
    }
  });
  this[REF].observer     = observer;

  if (install) {
    darkModeMediaQuery.addEventListener('change', darkModeListener);
    darkModeListener(darkModeMediaQuery);
    observer.observe(html, {attributes : true});
    observer.observe(body, {attributes : true});
    darkMode(
      html.classList.contains('dark-mode') ||
      html.classList.contains('dark') ||
      body.classList.contains('dark-mode') ||
      body.classList.contains('dark')
    );

  } else {
    darkModeMediaQuery.removeEventListener('change', this[REF].listener);
    this[REF].observer.disconnect();
    delete this[REF];
  }
}

function install (setup) {

  // Add composer extension
  if (setup.extendComposer) {
    setup.extendComposer((prototype) => {
      const {ONCONNECT, ONDISCONNECT} = prototype.constructor;
      prototype[ONCONNECT].push(function () {
        console.log('connect');
        observeDark.call(this, true);
      })
      prototype[ONDISCONNECT].push(function () {
        console.log('disconnect');
        observeDark.call(this, false);
      })
    });
  }

}

export default install;