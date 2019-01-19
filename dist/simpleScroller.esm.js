function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

/**
 * Lightweight IntersectionObserver Wrapper
 */
var Scroller =
/*#__PURE__*/
function () {
  function Scroller() {
    _classCallCheck(this, Scroller);

    this.requiredSetupOptions = ['query'];
    this.intersectionObserverOptions = ['root', 'rootMargin', 'threshold'];
    this.options = {};
  }

  _createClass(Scroller, [{
    key: "onEnterCb",
    value: function onEnterCb() {}
  }, {
    key: "onExitCb",
    value: function onExitCb() {}
  }, {
    key: "setup",
    value: function setup() {
      var _this = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.requiredSetupOptions.forEach(function (opt) {
        if (options[opt] == undefined) {
          throw Error("".concat(opt, " option is required"));
        }
      });
      this.query = options.query;
      this.entries = document.querySelectorAll(this.query);
      this.intersectionObserverOptions.forEach(function (opt) {
        if (options[opt]) {
          _this.options[opt] = options[opt];
        }
      });
      return this;
    }
  }, {
    key: "onEnter",
    value: function onEnter(cb) {
      this.onEnterCb = cb;
      return this;
    }
  }, {
    key: "onExit",
    value: function onExit(cb) {
      this.onExitCb = cb;
      return this;
    }
  }, {
    key: "listen",
    value: function listen() {
      var _this2 = this;

      var ready = false,
          previousYOffset = Number.MIN_VALUE;

      var handleIntersection = function handleIntersection(entries) {
        var direction = window.pageYOffset < previousYOffset ? 'up' : 'down',
            meta = {
          direction: direction
        };
        previousYOffset = window.pageYOffset;
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            _this2.onEnterCb(entry.target, meta);
          } else if (ready) {
            _this2.onExitCb(entry.target, meta);
          }
        });
        ready = true;
      };

      this.io = new IntersectionObserver(handleIntersection, this.options);
      this.entries.forEach(function (entry) {
        _this2.io.observe(entry);
      });
      return this;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _this3 = this;

      this.entries.forEach(function (entry) {
        _this3.io.unobserve(entry);
      });
      return this;
    }
  }]);

  return Scroller;
}();

export default Scroller;
