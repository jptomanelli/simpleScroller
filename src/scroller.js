/**
 * Lightweight IntersectionObserver Wrapper
 */
export default class Scroller {

  constructor() {
    this.requiredSetupOptions = ['query'];
    this.intersectionObserverOptions = ['root', 'rootMargin', 'threshold'];
    this.options = {};
  }

  onEnterCb() {}
  onExitCb() {}

  setup(options = {}) {
    this.requiredSetupOptions.forEach(opt => {
      if (options[opt] == undefined) {
        throw Error(`${opt} option is required`);
      }
    });

    this.query = options.query;
    this.entries = document.querySelectorAll(this.query);

    this.intersectionObserverOptions.forEach(opt => {
      if (options[opt]) {
        this.options[opt] = options[opt];
      }
    });

    return this;
  }

  onEnter(cb) {
    this.onEnterCb = cb;
    return this;
  }

  onExit(cb) {
    this.onExitCb = cb;
    return this;
  }

  listen() {
    let ready = false,
      previousYOffset = Number.MIN_VALUE;

    const handleIntersection = entries => {
      const direction = window.pageYOffset < previousYOffset ? 'up' : 'down',
        meta = {
          direction: direction
        };
      previousYOffset = window.pageYOffset;
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.onEnterCb(entry.target, meta);
        } else if (ready) {
          this.onExitCb(entry.target, meta);
        }
      });
      ready = true;
    };

    this.io = new IntersectionObserver(handleIntersection, this.options);

    this.entries.forEach(entry => {
      this.io.observe(entry);
    });

    return this;
  }

  destroy() {
    this.entries.forEach(entry => {
      this.io.unobserve(entry);
    });

    return this;
  }

}