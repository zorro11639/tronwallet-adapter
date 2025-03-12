;
(function () {
  var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17, _templateObject18, _templateObject19, _templateObject20, _templateObject21, _templateObject22, _templateObject23, _templateObject24, _templateObject25, _templateObject26, _templateObject27, _templateObject28, _templateObject29, _templateObject30, _templateObject31, _templateObject32, _templateObject33, _templateObject34, _templateObject35, _templateObject36, _templateObject37, _templateObject38, _templateObject39, _templateObject40, _templateObject41, _templateObject42, _templateObject43, _templateObject44, _templateObject45, _templateObject46, _templateObject47, _templateObject48, _templateObject49, _templateObject50, _templateObject51, _templateObject52, _templateObject53, _templateObject54, _templateObject55, _templateObject56, _templateObject57, _templateObject58, _templateObject59, _templateObject60, _templateObject61, _templateObject62, _templateObject63, _templateObject64, _templateObject65, _templateObject66, _templateObject67, _templateObject68, _templateObject69, _templateObject70, _templateObject71, _templateObject72, _templateObject73, _templateObject74, _templateObject75, _templateObject76, _templateObject77, _templateObject78, _templateObject79, _templateObject80, _templateObject81, _templateObject82, _templateObject83, _templateObject84, _templateObject85, _templateObject86, _templateObject87, _templateObject88, _templateObject89, _templateObject90, _templateObject91, _templateObject92, _templateObject93, _templateObject94, _templateObject95, _templateObject96, _templateObject97, _templateObject98, _templateObject99, _templateObject100, _templateObject101, _templateObject102, _templateObject103, _templateObject104, _templateObject105, _templateObject106, _templateObject107, _templateObject108, _templateObject109, _templateObject110, _templateObject111, _templateObject112, _templateObject113, _templateObject114, _templateObject115, _templateObject116, _templateObject117, _templateObject118, _templateObject119, _templateObject120, _templateObject121, _templateObject122, _templateObject123, _templateObject124, _templateObject125, _templateObject126, _templateObject127, _templateObject128, _templateObject129, _templateObject130;
  function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
  function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
  function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
  function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
  function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
  function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
  function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
  function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
  function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
  function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
  function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
  function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
  function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
  function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
  function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
  function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
  function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
  function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
  function _wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return _wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return _construct(t, arguments, _getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, t); }, _wrapNativeSuper(t); }
  function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
  function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
  function _isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
  function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
  function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
  function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n4 = 0, F = function F() {}; return { s: F, n: function n() { return _n4 >= r.length ? { done: !0 } : { done: !1, value: r[_n4++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
  function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
  function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
  function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
  function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
  function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  System.register(['./index-legacy-DacG0kYD.js'], function (exports, module) {
    'use strict';

    var getDefaultExportFromCjs, se$1, ne$1, T$3, a$3, y$2, p$2, oe$1, te$1, R$2;
    return {
      setters: [function (module) {
        getDefaultExportFromCjs = module.g;
        se$1 = module.s;
        ne$1 = module.n;
        T$3 = module.T;
        a$3 = module.a;
        y$2 = module.y;
        p$2 = module.p;
        oe$1 = module.o;
        te$1 = module.t;
        R$2 = module.R;
      }],
      execute: function execute() {
        var _t$litHtmlVersions;
        /**
         * @license
         * Copyright 2019 Google LLC
         * SPDX-License-Identifier: BSD-3-Clause
         */
        var t$4 = window,
          e$6 = t$4.ShadowRoot && (void 0 === t$4.ShadyCSS || t$4.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype,
          s$4 = Symbol(),
          n$6 = new WeakMap();
        var o$5 = /*#__PURE__*/function () {
          function o(t, e, n) {
            _classCallCheck(this, o);
            if (this._$cssResult$ = true, n !== s$4) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
            this.cssText = t, this.t = e;
          }
          return _createClass(o, [{
            key: "styleSheet",
            get: function get() {
              var t = this.o;
              var s = this.t;
              if (e$6 && void 0 === t) {
                var _e2 = void 0 !== s && 1 === s.length;
                _e2 && (t = n$6.get(s)), void 0 === t && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), _e2 && n$6.set(s, t));
              }
              return t;
            }
          }, {
            key: "toString",
            value: function toString() {
              return this.cssText;
            }
          }]);
        }();
        var r$3 = function r$3(t) {
            return new o$5("string" == typeof t ? t : t + "", void 0, s$4);
          },
          i$4 = function i$4(t) {
            for (var _len = arguments.length, e = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              e[_key - 1] = arguments[_key];
            }
            var n = 1 === t.length ? t[0] : e.reduce(function (e, s, n) {
              return e + function (t) {
                if (true === t._$cssResult$) return t.cssText;
                if ("number" == typeof t) return t;
                throw Error("Value passed to 'css' function must be a 'css' function result: " + t + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
              }(s) + t[n + 1];
            }, t[0]);
            return new o$5(n, t, s$4);
          },
          S$3 = function S$3(s, n) {
            e$6 ? s.adoptedStyleSheets = n.map(function (t) {
              return t instanceof CSSStyleSheet ? t : t.styleSheet;
            }) : n.forEach(function (e) {
              var n = document.createElement("style"),
                o = t$4.litNonce;
              void 0 !== o && n.setAttribute("nonce", o), n.textContent = e.cssText, s.appendChild(n);
            });
          },
          c$3 = e$6 ? function (t) {
            return t;
          } : function (t) {
            return t instanceof CSSStyleSheet ? function (t) {
              var e = "";
              var _iterator = _createForOfIteratorHelper(t.cssRules),
                _step;
              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  var _s = _step.value;
                  e += _s.cssText;
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
              return r$3(e);
            }(t) : t;
          };

        /**
         * @license
         * Copyright 2017 Google LLC
         * SPDX-License-Identifier: BSD-3-Clause
         */
        var s$3;
        var e$5 = window,
          r$2 = e$5.trustedTypes,
          h$3 = r$2 ? r$2.emptyScript : "",
          o$4 = e$5.reactiveElementPolyfillSupport,
          n$5 = {
            toAttribute: function toAttribute(t, i) {
              switch (i) {
                case Boolean:
                  t = t ? h$3 : null;
                  break;
                case Object:
                case Array:
                  t = null == t ? t : JSON.stringify(t);
              }
              return t;
            },
            fromAttribute: function fromAttribute(t, i) {
              var s = t;
              switch (i) {
                case Boolean:
                  s = null !== t;
                  break;
                case Number:
                  s = null === t ? null : Number(t);
                  break;
                case Object:
                case Array:
                  try {
                    s = JSON.parse(t);
                  } catch (t) {
                    s = null;
                  }
              }
              return s;
            }
          },
          a$2 = function a$2(t, i) {
            return i !== t && (i == i || t == t);
          },
          l$4 = {
            attribute: true,
            type: String,
            converter: n$5,
            reflect: false,
            hasChanged: a$2
          },
          d$2 = "finalized";
        var u$2 = /*#__PURE__*/function (_HTMLElement) {
          function u() {
            var _this;
            _classCallCheck(this, u);
            _this = _callSuper(this, u), _this._$Ei = new Map(), _this.isUpdatePending = false, _this.hasUpdated = false, _this._$El = null, _this._$Eu();
            return _this;
          }
          _inherits(u, _HTMLElement);
          return _createClass(u, [{
            key: "_$Eu",
            value: function _$Eu() {
              var _this2 = this;
              var t;
              this._$E_ = new Promise(function (t) {
                return _this2.enableUpdating = t;
              }), this._$AL = new Map(), this._$Eg(), this.requestUpdate(), null === (t = this.constructor.h) || void 0 === t || t.forEach(function (t) {
                return t(_this2);
              });
            }
          }, {
            key: "addController",
            value: function addController(t) {
              var i, s;
              (null !== (i = this._$ES) && void 0 !== i ? i : this._$ES = []).push(t), void 0 !== this.renderRoot && this.isConnected && (null === (s = t.hostConnected) || void 0 === s || s.call(t));
            }
          }, {
            key: "removeController",
            value: function removeController(t) {
              var i;
              null === (i = this._$ES) || void 0 === i || i.splice(this._$ES.indexOf(t) >>> 0, 1);
            }
          }, {
            key: "_$Eg",
            value: function _$Eg() {
              var _this3 = this;
              this.constructor.elementProperties.forEach(function (t, i) {
                _this3.hasOwnProperty(i) && (_this3._$Ei.set(i, _this3[i]), delete _this3[i]);
              });
            }
          }, {
            key: "createRenderRoot",
            value: function createRenderRoot() {
              var t;
              var s = null !== (t = this.shadowRoot) && void 0 !== t ? t : this.attachShadow(this.constructor.shadowRootOptions);
              return S$3(s, this.constructor.elementStyles), s;
            }
          }, {
            key: "connectedCallback",
            value: function connectedCallback() {
              var t;
              void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), null === (t = this._$ES) || void 0 === t || t.forEach(function (t) {
                var i;
                return null === (i = t.hostConnected) || void 0 === i ? void 0 : i.call(t);
              });
            }
          }, {
            key: "enableUpdating",
            value: function enableUpdating(t) {}
          }, {
            key: "disconnectedCallback",
            value: function disconnectedCallback() {
              var t;
              null === (t = this._$ES) || void 0 === t || t.forEach(function (t) {
                var i;
                return null === (i = t.hostDisconnected) || void 0 === i ? void 0 : i.call(t);
              });
            }
          }, {
            key: "attributeChangedCallback",
            value: function attributeChangedCallback(t, i, s) {
              this._$AK(t, s);
            }
          }, {
            key: "_$EO",
            value: function _$EO(t, i) {
              var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : l$4;
              var e;
              var r = this.constructor._$Ep(t, s);
              if (void 0 !== r && true === s.reflect) {
                var _h = (void 0 !== (null === (e = s.converter) || void 0 === e ? void 0 : e.toAttribute) ? s.converter : n$5).toAttribute(i, s.type);
                this._$El = t, null == _h ? this.removeAttribute(r) : this.setAttribute(r, _h), this._$El = null;
              }
            }
          }, {
            key: "_$AK",
            value: function _$AK(t, i) {
              var s;
              var e = this.constructor,
                r = e._$Ev.get(t);
              if (void 0 !== r && this._$El !== r) {
                var _t2 = e.getPropertyOptions(r),
                  _h2 = "function" == typeof _t2.converter ? {
                    fromAttribute: _t2.converter
                  } : void 0 !== (null === (s = _t2.converter) || void 0 === s ? void 0 : s.fromAttribute) ? _t2.converter : n$5;
                this._$El = r, this[r] = _h2.fromAttribute(i, _t2.type), this._$El = null;
              }
            }
          }, {
            key: "requestUpdate",
            value: function requestUpdate(t, i, s) {
              var e = true;
              void 0 !== t && (((s = s || this.constructor.getPropertyOptions(t)).hasChanged || a$2)(this[t], i) ? (this._$AL.has(t) || this._$AL.set(t, i), true === s.reflect && this._$El !== t && (void 0 === this._$EC && (this._$EC = new Map()), this._$EC.set(t, s))) : e = false), !this.isUpdatePending && e && (this._$E_ = this._$Ej());
            }
          }, {
            key: "_$Ej",
            value: function () {
              var _$Ej2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
                var t;
                return _regeneratorRuntime().wrap(function _callee$(_context) {
                  while (1) switch (_context.prev = _context.next) {
                    case 0:
                      this.isUpdatePending = true;
                      _context.prev = 1;
                      _context.next = 4;
                      return this._$E_;
                    case 4:
                      _context.next = 9;
                      break;
                    case 6:
                      _context.prev = 6;
                      _context.t0 = _context["catch"](1);
                      Promise.reject(_context.t0);
                    case 9:
                      t = this.scheduleUpdate();
                      _context.t1 = null != t;
                      if (!_context.t1) {
                        _context.next = 14;
                        break;
                      }
                      _context.next = 14;
                      return t;
                    case 14:
                      return _context.abrupt("return", !this.isUpdatePending);
                    case 15:
                    case "end":
                      return _context.stop();
                  }
                }, _callee, this, [[1, 6]]);
              }));
              function _$Ej() {
                return _$Ej2.apply(this, arguments);
              }
              return _$Ej;
            }()
          }, {
            key: "scheduleUpdate",
            value: function scheduleUpdate() {
              return this.performUpdate();
            }
          }, {
            key: "performUpdate",
            value: function performUpdate() {
              var _this4 = this;
              var t;
              if (!this.isUpdatePending) return;
              this.hasUpdated, this._$Ei && (this._$Ei.forEach(function (t, i) {
                return _this4[i] = t;
              }), this._$Ei = void 0);
              var i = false;
              var s = this._$AL;
              try {
                i = this.shouldUpdate(s), i ? (this.willUpdate(s), null === (t = this._$ES) || void 0 === t || t.forEach(function (t) {
                  var i;
                  return null === (i = t.hostUpdate) || void 0 === i ? void 0 : i.call(t);
                }), this.update(s)) : this._$Ek();
              } catch (t) {
                throw i = false, this._$Ek(), t;
              }
              i && this._$AE(s);
            }
          }, {
            key: "willUpdate",
            value: function willUpdate(t) {}
          }, {
            key: "_$AE",
            value: function _$AE(t) {
              var i;
              null === (i = this._$ES) || void 0 === i || i.forEach(function (t) {
                var i;
                return null === (i = t.hostUpdated) || void 0 === i ? void 0 : i.call(t);
              }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t)), this.updated(t);
            }
          }, {
            key: "_$Ek",
            value: function _$Ek() {
              this._$AL = new Map(), this.isUpdatePending = false;
            }
          }, {
            key: "updateComplete",
            get: function get() {
              return this.getUpdateComplete();
            }
          }, {
            key: "getUpdateComplete",
            value: function getUpdateComplete() {
              return this._$E_;
            }
          }, {
            key: "shouldUpdate",
            value: function shouldUpdate(t) {
              return true;
            }
          }, {
            key: "update",
            value: function update(t) {
              var _this5 = this;
              void 0 !== this._$EC && (this._$EC.forEach(function (t, i) {
                return _this5._$EO(i, _this5[i], t);
              }), this._$EC = void 0), this._$Ek();
            }
          }, {
            key: "updated",
            value: function updated(t) {}
          }, {
            key: "firstUpdated",
            value: function firstUpdated(t) {}
          }], [{
            key: "addInitializer",
            value: function addInitializer(t) {
              var i;
              this.finalize(), (null !== (i = this.h) && void 0 !== i ? i : this.h = []).push(t);
            }
          }, {
            key: "observedAttributes",
            get: function get() {
              var _this6 = this;
              this.finalize();
              var t = [];
              return this.elementProperties.forEach(function (i, s) {
                var e = _this6._$Ep(s, i);
                void 0 !== e && (_this6._$Ev.set(e, s), t.push(e));
              }), t;
            }
          }, {
            key: "createProperty",
            value: function createProperty(t) {
              var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : l$4;
              if (i.state && (i.attribute = false), this.finalize(), this.elementProperties.set(t, i), !i.noAccessor && !this.prototype.hasOwnProperty(t)) {
                var _s2 = "symbol" == _typeof(t) ? Symbol() : "__" + t,
                  _e3 = this.getPropertyDescriptor(t, _s2, i);
                void 0 !== _e3 && Object.defineProperty(this.prototype, t, _e3);
              }
            }
          }, {
            key: "getPropertyDescriptor",
            value: function getPropertyDescriptor(t, i, s) {
              return {
                get: function get() {
                  return this[i];
                },
                set: function set(e) {
                  var r = this[t];
                  this[i] = e, this.requestUpdate(t, r, s);
                },
                configurable: true,
                enumerable: true
              };
            }
          }, {
            key: "getPropertyOptions",
            value: function getPropertyOptions(t) {
              return this.elementProperties.get(t) || l$4;
            }
          }, {
            key: "finalize",
            value: function finalize() {
              if (this.hasOwnProperty(d$2)) return false;
              this[d$2] = true;
              var t = Object.getPrototypeOf(this);
              if (t.finalize(), void 0 !== t.h && (this.h = _toConsumableArray(t.h)), this.elementProperties = new Map(t.elementProperties), this._$Ev = new Map(), this.hasOwnProperty("properties")) {
                var _t3 = this.properties,
                  _i = [].concat(_toConsumableArray(Object.getOwnPropertyNames(_t3)), _toConsumableArray(Object.getOwnPropertySymbols(_t3)));
                var _iterator2 = _createForOfIteratorHelper(_i),
                  _step2;
                try {
                  for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                    var _s3 = _step2.value;
                    this.createProperty(_s3, _t3[_s3]);
                  }
                } catch (err) {
                  _iterator2.e(err);
                } finally {
                  _iterator2.f();
                }
              }
              return this.elementStyles = this.finalizeStyles(this.styles), true;
            }
          }, {
            key: "finalizeStyles",
            value: function finalizeStyles(i) {
              var s = [];
              if (Array.isArray(i)) {
                var _e4 = new Set(i.flat(1 / 0).reverse());
                var _iterator3 = _createForOfIteratorHelper(_e4),
                  _step3;
                try {
                  for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                    var _i2 = _step3.value;
                    s.unshift(c$3(_i2));
                  }
                } catch (err) {
                  _iterator3.e(err);
                } finally {
                  _iterator3.f();
                }
              } else void 0 !== i && s.push(c$3(i));
              return s;
            }
          }, {
            key: "_$Ep",
            value: function _$Ep(t, i) {
              var s = i.attribute;
              return false === s ? void 0 : "string" == typeof s ? s : "string" == typeof t ? t.toLowerCase() : void 0;
            }
          }]);
        }( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
        u$2[d$2] = true, u$2.elementProperties = new Map(), u$2.elementStyles = [], u$2.shadowRootOptions = {
          mode: "open"
        }, null == o$4 || o$4({
          ReactiveElement: u$2
        }), (null !== (s$3 = e$5.reactiveElementVersions) && void 0 !== s$3 ? s$3 : e$5.reactiveElementVersions = []).push("1.6.3");

        /**
         * @license
         * Copyright 2017 Google LLC
         * SPDX-License-Identifier: BSD-3-Clause
         */
        var t$3;
        var i$3 = window,
          s$2 = i$3.trustedTypes,
          e$4 = s$2 ? s$2.createPolicy("lit-html", {
            createHTML: function createHTML(t) {
              return t;
            }
          }) : void 0,
          o$3 = "$lit$",
          n$4 = "lit$".concat((Math.random() + "").slice(9), "$"),
          l$3 = "?" + n$4,
          h$2 = "<".concat(l$3, ">"),
          r$1 = document,
          u$1 = function u$1() {
            return r$1.createComment("");
          },
          d$1 = function d$1(t) {
            return null === t || "object" != _typeof(t) && "function" != typeof t;
          },
          c$2 = Array.isArray,
          v$2 = function v$2(t) {
            return c$2(t) || "function" == typeof (null == t ? void 0 : t[Symbol.iterator]);
          },
          a$1 = "[ \t\n\f\r]",
          f$1 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
          _$2 = /-->/g,
          m$1 = />/g,
          p$1 = RegExp(">|".concat(a$1, "(?:([^\\s\"'>=/]+)(").concat(a$1, "*=").concat(a$1, "*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)"), "g"),
          g$1 = /'/g,
          $$1 = /"/g,
          y$1 = /^(?:script|style|textarea|title)$/i,
          w$1 = function w$1(t) {
            return function (i) {
              for (var _len2 = arguments.length, s = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                s[_key2 - 1] = arguments[_key2];
              }
              return {
                _$litType$: t,
                strings: i,
                values: s
              };
            };
          },
          x = w$1(1),
          b$1 = w$1(2),
          T$2 = Symbol.for("lit-noChange"),
          A$2 = Symbol.for("lit-nothing"),
          E$1 = new WeakMap(),
          C$1 = r$1.createTreeWalker(r$1, 129, null, false);
        function P$1(t, i) {
          if (!Array.isArray(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
          return void 0 !== e$4 ? e$4.createHTML(i) : i;
        }
        var V$1 = function V$1(t, i) {
          var s = t.length - 1,
            e = [];
          var l,
            r = 2 === i ? "<svg>" : "",
            u = f$1;
          for (var _i3 = 0; _i3 < s; _i3++) {
            var _s4 = t[_i3];
            var _d = void 0,
              _c = void 0,
              _v = -1,
              _a2 = 0;
            for (; _a2 < _s4.length && (u.lastIndex = _a2, _c = u.exec(_s4), null !== _c);) _a2 = u.lastIndex, u === f$1 ? "!--" === _c[1] ? u = _$2 : void 0 !== _c[1] ? u = m$1 : void 0 !== _c[2] ? (y$1.test(_c[2]) && (l = RegExp("</" + _c[2], "g")), u = p$1) : void 0 !== _c[3] && (u = p$1) : u === p$1 ? ">" === _c[0] ? (u = null != l ? l : f$1, _v = -1) : void 0 === _c[1] ? _v = -2 : (_v = u.lastIndex - _c[2].length, _d = _c[1], u = void 0 === _c[3] ? p$1 : '"' === _c[3] ? $$1 : g$1) : u === $$1 || u === g$1 ? u = p$1 : u === _$2 || u === m$1 ? u = f$1 : (u = p$1, l = void 0);
            var _w = u === p$1 && t[_i3 + 1].startsWith("/>") ? " " : "";
            r += u === f$1 ? _s4 + h$2 : _v >= 0 ? (e.push(_d), _s4.slice(0, _v) + o$3 + _s4.slice(_v) + n$4 + _w) : _s4 + n$4 + (-2 === _v ? (e.push(void 0), _i3) : _w);
          }
          return [P$1(t, r + (t[s] || "<?>") + (2 === i ? "</svg>" : "")), e];
        };
        var N$1 = /*#__PURE__*/function () {
          function N(_ref, e) {
            var t = _ref.strings,
              i = _ref._$litType$;
            _classCallCheck(this, N);
            var h;
            this.parts = [];
            var r = 0,
              d = 0;
            var c = t.length - 1,
              v = this.parts,
              _V$ = V$1(t, i),
              _V$2 = _slicedToArray(_V$, 2),
              a = _V$2[0],
              f = _V$2[1];
            if (this.el = N.createElement(a, e), C$1.currentNode = this.el.content, 2 === i) {
              var _t4 = this.el.content,
                _i4 = _t4.firstChild;
              _i4.remove(), _t4.append.apply(_t4, _toConsumableArray(_i4.childNodes));
            }
            for (; null !== (h = C$1.nextNode()) && v.length < c;) {
              if (1 === h.nodeType) {
                if (h.hasAttributes()) {
                  var _t5 = [];
                  var _iterator4 = _createForOfIteratorHelper(h.getAttributeNames()),
                    _step4;
                  try {
                    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                      var _i7 = _step4.value;
                      if (_i7.endsWith(o$3) || _i7.startsWith(n$4)) {
                        var _s5 = f[d++];
                        if (_t5.push(_i7), void 0 !== _s5) {
                          var _t7 = h.getAttribute(_s5.toLowerCase() + o$3).split(n$4),
                            _i8 = /([.?@])?(.*)/.exec(_s5);
                          v.push({
                            type: 1,
                            index: r,
                            name: _i8[2],
                            strings: _t7,
                            ctor: "." === _i8[1] ? H$1 : "?" === _i8[1] ? L$2 : "@" === _i8[1] ? z : k$1
                          });
                        } else v.push({
                          type: 6,
                          index: r
                        });
                      }
                    }
                  } catch (err) {
                    _iterator4.e(err);
                  } finally {
                    _iterator4.f();
                  }
                  for (var _i5 = 0, _t6 = _t5; _i5 < _t6.length; _i5++) {
                    var _i6 = _t6[_i5];
                    h.removeAttribute(_i6);
                  }
                }
                if (y$1.test(h.tagName)) {
                  var _t8 = h.textContent.split(n$4),
                    _i9 = _t8.length - 1;
                  if (_i9 > 0) {
                    h.textContent = s$2 ? s$2.emptyScript : "";
                    for (var _s6 = 0; _s6 < _i9; _s6++) h.append(_t8[_s6], u$1()), C$1.nextNode(), v.push({
                      type: 2,
                      index: ++r
                    });
                    h.append(_t8[_i9], u$1());
                  }
                }
              } else if (8 === h.nodeType) if (h.data === l$3) v.push({
                type: 2,
                index: r
              });else {
                var _t9 = -1;
                for (; -1 !== (_t9 = h.data.indexOf(n$4, _t9 + 1));) v.push({
                  type: 7,
                  index: r
                }), _t9 += n$4.length - 1;
              }
              r++;
            }
          }
          return _createClass(N, null, [{
            key: "createElement",
            value: function createElement(t, i) {
              var s = r$1.createElement("template");
              return s.innerHTML = t, s;
            }
          }]);
        }();
        function S$2(t, i) {
          var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : t;
          var e = arguments.length > 3 ? arguments[3] : undefined;
          var o, n, l, h;
          if (i === T$2) return i;
          var r = void 0 !== e ? null === (o = s._$Co) || void 0 === o ? void 0 : o[e] : s._$Cl;
          var u = d$1(i) ? void 0 : i._$litDirective$;
          return (null == r ? void 0 : r.constructor) !== u && (null === (n = null == r ? void 0 : r._$AO) || void 0 === n || n.call(r, false), void 0 === u ? r = void 0 : (r = new u(t), r._$AT(t, s, e)), void 0 !== e ? (null !== (l = (h = s)._$Co) && void 0 !== l ? l : h._$Co = [])[e] = r : s._$Cl = r), void 0 !== r && (i = S$2(t, r._$AS(t, i.values), r, e)), i;
        }
        var M$1 = /*#__PURE__*/function () {
          function M(t, i) {
            _classCallCheck(this, M);
            this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = i;
          }
          return _createClass(M, [{
            key: "parentNode",
            get: function get() {
              return this._$AM.parentNode;
            }
          }, {
            key: "_$AU",
            get: function get() {
              return this._$AM._$AU;
            }
          }, {
            key: "u",
            value: function u(t) {
              var i;
              var _this$_$AD = this._$AD,
                s = _this$_$AD.el.content,
                e = _this$_$AD.parts,
                o = (null !== (i = null == t ? void 0 : t.creationScope) && void 0 !== i ? i : r$1).importNode(s, true);
              C$1.currentNode = o;
              var n = C$1.nextNode(),
                l = 0,
                h = 0,
                u = e[0];
              for (; void 0 !== u;) {
                if (l === u.index) {
                  var _i10 = void 0;
                  2 === u.type ? _i10 = new R$1(n, n.nextSibling, this, t) : 1 === u.type ? _i10 = new u.ctor(n, u.name, u.strings, this, t) : 6 === u.type && (_i10 = new Z$2(n, this, t)), this._$AV.push(_i10), u = e[++h];
                }
                l !== (null == u ? void 0 : u.index) && (n = C$1.nextNode(), l++);
              }
              return C$1.currentNode = r$1, o;
            }
          }, {
            key: "v",
            value: function v(t) {
              var i = 0;
              var _iterator5 = _createForOfIteratorHelper(this._$AV),
                _step5;
              try {
                for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                  var _s7 = _step5.value;
                  void 0 !== _s7 && (void 0 !== _s7.strings ? (_s7._$AI(t, _s7, i), i += _s7.strings.length - 2) : _s7._$AI(t[i])), i++;
                }
              } catch (err) {
                _iterator5.e(err);
              } finally {
                _iterator5.f();
              }
            }
          }]);
        }();
        var R$1 = /*#__PURE__*/function () {
          function R(t, i, s, e) {
            _classCallCheck(this, R);
            var o;
            this.type = 2, this._$AH = A$2, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = s, this.options = e, this._$Cp = null === (o = null == e ? void 0 : e.isConnected) || void 0 === o || o;
          }
          return _createClass(R, [{
            key: "_$AU",
            get: function get() {
              var t, i;
              return null !== (i = null === (t = this._$AM) || void 0 === t ? void 0 : t._$AU) && void 0 !== i ? i : this._$Cp;
            }
          }, {
            key: "parentNode",
            get: function get() {
              var t = this._$AA.parentNode;
              var i = this._$AM;
              return void 0 !== i && 11 === (null == t ? void 0 : t.nodeType) && (t = i.parentNode), t;
            }
          }, {
            key: "startNode",
            get: function get() {
              return this._$AA;
            }
          }, {
            key: "endNode",
            get: function get() {
              return this._$AB;
            }
          }, {
            key: "_$AI",
            value: function _$AI(t) {
              var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
              t = S$2(this, t, i), d$1(t) ? t === A$2 || null == t || "" === t ? (this._$AH !== A$2 && this._$AR(), this._$AH = A$2) : t !== this._$AH && t !== T$2 && this._(t) : void 0 !== t._$litType$ ? this.g(t) : void 0 !== t.nodeType ? this.$(t) : v$2(t) ? this.T(t) : this._(t);
            }
          }, {
            key: "k",
            value: function k(t) {
              return this._$AA.parentNode.insertBefore(t, this._$AB);
            }
          }, {
            key: "$",
            value: function $(t) {
              this._$AH !== t && (this._$AR(), this._$AH = this.k(t));
            }
          }, {
            key: "_",
            value: function _(t) {
              this._$AH !== A$2 && d$1(this._$AH) ? this._$AA.nextSibling.data = t : this.$(r$1.createTextNode(t)), this._$AH = t;
            }
          }, {
            key: "g",
            value: function g(t) {
              var i;
              var s = t.values,
                e = t._$litType$,
                o = "number" == typeof e ? this._$AC(t) : (void 0 === e.el && (e.el = N$1.createElement(P$1(e.h, e.h[0]), this.options)), e);
              if ((null === (i = this._$AH) || void 0 === i ? void 0 : i._$AD) === o) this._$AH.v(s);else {
                var _t10 = new M$1(o, this),
                  _i11 = _t10.u(this.options);
                _t10.v(s), this.$(_i11), this._$AH = _t10;
              }
            }
          }, {
            key: "_$AC",
            value: function _$AC(t) {
              var i = E$1.get(t.strings);
              return void 0 === i && E$1.set(t.strings, i = new N$1(t)), i;
            }
          }, {
            key: "T",
            value: function T(t) {
              c$2(this._$AH) || (this._$AH = [], this._$AR());
              var i = this._$AH;
              var s,
                e = 0;
              var _iterator6 = _createForOfIteratorHelper(t),
                _step6;
              try {
                for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
                  var _o = _step6.value;
                  e === i.length ? i.push(s = new R(this.k(u$1()), this.k(u$1()), this, this.options)) : s = i[e], s._$AI(_o), e++;
                }
              } catch (err) {
                _iterator6.e(err);
              } finally {
                _iterator6.f();
              }
              e < i.length && (this._$AR(s && s._$AB.nextSibling, e), i.length = e);
            }
          }, {
            key: "_$AR",
            value: function _$AR() {
              var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._$AA.nextSibling;
              var i = arguments.length > 1 ? arguments[1] : undefined;
              var s;
              for (null === (s = this._$AP) || void 0 === s || s.call(this, false, true, i); t && t !== this._$AB;) {
                var _i12 = t.nextSibling;
                t.remove(), t = _i12;
              }
            }
          }, {
            key: "setConnected",
            value: function setConnected(t) {
              var i;
              void 0 === this._$AM && (this._$Cp = t, null === (i = this._$AP) || void 0 === i || i.call(this, t));
            }
          }]);
        }();
        var k$1 = /*#__PURE__*/function () {
          function k(t, i, s, e, o) {
            _classCallCheck(this, k);
            this.type = 1, this._$AH = A$2, this._$AN = void 0, this.element = t, this.name = i, this._$AM = e, this.options = o, s.length > 2 || "" !== s[0] || "" !== s[1] ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = A$2;
          }
          return _createClass(k, [{
            key: "tagName",
            get: function get() {
              return this.element.tagName;
            }
          }, {
            key: "_$AU",
            get: function get() {
              return this._$AM._$AU;
            }
          }, {
            key: "_$AI",
            value: function _$AI(t) {
              var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
              var s = arguments.length > 2 ? arguments[2] : undefined;
              var e = arguments.length > 3 ? arguments[3] : undefined;
              var o = this.strings;
              var n = false;
              if (void 0 === o) t = S$2(this, t, i, 0), n = !d$1(t) || t !== this._$AH && t !== T$2, n && (this._$AH = t);else {
                var _e5 = t;
                var _l, _h3;
                for (t = o[0], _l = 0; _l < o.length - 1; _l++) _h3 = S$2(this, _e5[s + _l], i, _l), _h3 === T$2 && (_h3 = this._$AH[_l]), n || (n = !d$1(_h3) || _h3 !== this._$AH[_l]), _h3 === A$2 ? t = A$2 : t !== A$2 && (t += (null != _h3 ? _h3 : "") + o[_l + 1]), this._$AH[_l] = _h3;
              }
              n && !e && this.j(t);
            }
          }, {
            key: "j",
            value: function j(t) {
              t === A$2 ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t ? t : "");
            }
          }]);
        }();
        var H$1 = /*#__PURE__*/function (_k$) {
          function H() {
            var _this7;
            _classCallCheck(this, H);
            _this7 = _callSuper(this, H, arguments), _this7.type = 3;
            return _this7;
          }
          _inherits(H, _k$);
          return _createClass(H, [{
            key: "j",
            value: function j(t) {
              this.element[this.name] = t === A$2 ? void 0 : t;
            }
          }]);
        }(k$1);
        var I$1 = s$2 ? s$2.emptyScript : "";
        var L$2 = /*#__PURE__*/function (_k$2) {
          function L() {
            var _this8;
            _classCallCheck(this, L);
            _this8 = _callSuper(this, L, arguments), _this8.type = 4;
            return _this8;
          }
          _inherits(L, _k$2);
          return _createClass(L, [{
            key: "j",
            value: function j(t) {
              t && t !== A$2 ? this.element.setAttribute(this.name, I$1) : this.element.removeAttribute(this.name);
            }
          }]);
        }(k$1);
        var z = /*#__PURE__*/function (_k$3) {
          function z(t, i, s, e, o) {
            var _this9;
            _classCallCheck(this, z);
            _this9 = _callSuper(this, z, [t, i, s, e, o]), _this9.type = 5;
            return _this9;
          }
          _inherits(z, _k$3);
          return _createClass(z, [{
            key: "_$AI",
            value: function _$AI(t) {
              var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
              var s;
              if ((t = null !== (s = S$2(this, t, i, 0)) && void 0 !== s ? s : A$2) === T$2) return;
              var e = this._$AH,
                o = t === A$2 && e !== A$2 || t.capture !== e.capture || t.once !== e.once || t.passive !== e.passive,
                n = t !== A$2 && (e === A$2 || o);
              o && this.element.removeEventListener(this.name, this, e), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
            }
          }, {
            key: "handleEvent",
            value: function handleEvent(t) {
              var i, s;
              "function" == typeof this._$AH ? this._$AH.call(null !== (s = null === (i = this.options) || void 0 === i ? void 0 : i.host) && void 0 !== s ? s : this.element, t) : this._$AH.handleEvent(t);
            }
          }]);
        }(k$1);
        var Z$2 = /*#__PURE__*/function () {
          function Z(t, i, s) {
            _classCallCheck(this, Z);
            this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
          }
          return _createClass(Z, [{
            key: "_$AU",
            get: function get() {
              return this._$AM._$AU;
            }
          }, {
            key: "_$AI",
            value: function _$AI(t) {
              S$2(this, t);
            }
          }]);
        }();
        var B$1 = i$3.litHtmlPolyfillSupport;
        null == B$1 || B$1(N$1, R$1), (null !== (t$3 = i$3.litHtmlVersions) && void 0 !== t$3 ? t$3 : i$3.litHtmlVersions = []).push("2.8.0");
        var D$1 = function D$1(t, i, s) {
          var e, o;
          var n = null !== (e = null == s ? void 0 : s.renderBefore) && void 0 !== e ? e : i;
          var l = n._$litPart$;
          if (void 0 === l) {
            var _t11 = null !== (o = null == s ? void 0 : s.renderBefore) && void 0 !== o ? o : null;
            n._$litPart$ = l = new R$1(i.insertBefore(u$1(), _t11), _t11, void 0, null != s ? s : {});
          }
          return l._$AI(t), l;
        };

        /**
         * @license
         * Copyright 2017 Google LLC
         * SPDX-License-Identifier: BSD-3-Clause
         */
        var l$2, o$2;
        var s$1 = /*#__PURE__*/function (_u$) {
          function s() {
            var _this10;
            _classCallCheck(this, s);
            _this10 = _callSuper(this, s, arguments), _this10.renderOptions = {
              host: _assertThisInitialized(_this10)
            }, _this10._$Do = void 0;
            return _this10;
          }
          _inherits(s, _u$);
          return _createClass(s, [{
            key: "createRenderRoot",
            value: function createRenderRoot() {
              var t, e;
              var i = _get(_getPrototypeOf(s.prototype), "createRenderRoot", this).call(this);
              return null !== (t = (e = this.renderOptions).renderBefore) && void 0 !== t || (e.renderBefore = i.firstChild), i;
            }
          }, {
            key: "update",
            value: function update(t) {
              var i = this.render();
              this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), _get(_getPrototypeOf(s.prototype), "update", this).call(this, t), this._$Do = D$1(i, this.renderRoot, this.renderOptions);
            }
          }, {
            key: "connectedCallback",
            value: function connectedCallback() {
              var t;
              _get(_getPrototypeOf(s.prototype), "connectedCallback", this).call(this), null === (t = this._$Do) || void 0 === t || t.setConnected(true);
            }
          }, {
            key: "disconnectedCallback",
            value: function disconnectedCallback() {
              var t;
              _get(_getPrototypeOf(s.prototype), "disconnectedCallback", this).call(this), null === (t = this._$Do) || void 0 === t || t.setConnected(false);
            }
          }, {
            key: "render",
            value: function render() {
              return T$2;
            }
          }]);
        }(u$2);
        s$1.finalized = true, s$1._$litElement$ = true, null === (l$2 = globalThis.litElementHydrateSupport) || void 0 === l$2 || l$2.call(globalThis, {
          LitElement: s$1
        });
        var n$3 = globalThis.litElementPolyfillSupport;
        null == n$3 || n$3({
          LitElement: s$1
        });
        (null !== (o$2 = globalThis.litElementVersions) && void 0 !== o$2 ? o$2 : globalThis.litElementVersions = []).push("3.3.3");

        /**
         * @license
         * Copyright 2017 Google LLC
         * SPDX-License-Identifier: BSD-3-Clause
         */
        var e$3 = function e$3(e) {
          return function (n) {
            return "function" == typeof n ? function (e, n) {
              return customElements.define(e, n), n;
            }(e, n) : function (e, n) {
              var t = n.kind,
                s = n.elements;
              return {
                kind: t,
                elements: s,
                finisher: function finisher(n) {
                  customElements.define(e, n);
                }
              };
            }(e, n);
          };
        };

        /**
         * @license
         * Copyright 2017 Google LLC
         * SPDX-License-Identifier: BSD-3-Clause
         */
        var i$2 = function i$2(i, e) {
            return "method" === e.kind && e.descriptor && !("value" in e.descriptor) ? _objectSpread(_objectSpread({}, e), {}, {
              finisher: function finisher(n) {
                n.createProperty(e.key, i);
              }
            }) : {
              kind: "field",
              key: Symbol(),
              placement: "own",
              descriptor: {},
              originalKey: e.key,
              initializer: function initializer() {
                "function" == typeof e.initializer && (this[e.key] = e.initializer.call(this));
              },
              finisher: function finisher(n) {
                n.createProperty(e.key, i);
              }
            };
          },
          e$2 = function e$2(i, e, n) {
            e.constructor.createProperty(n, i);
          };
        function n$2(n) {
          return function (t, o) {
            return void 0 !== o ? e$2(n, t, o) : i$2(n, t);
          };
        }

        /**
         * @license
         * Copyright 2017 Google LLC
         * SPDX-License-Identifier: BSD-3-Clause
         */
        function t$2(t) {
          return n$2(_objectSpread(_objectSpread({}, t), {}, {
            state: true
          }));
        }

        /**
         * @license
         * Copyright 2021 Google LLC
         * SPDX-License-Identifier: BSD-3-Clause
         */
        var n$1;
        null != (null === (n$1 = window.HTMLSlotElement) || void 0 === n$1 ? void 0 : n$1.prototype.assignedElements) ? function (o, n) {
          return o.assignedElements(n);
        } : function (o, n) {
          return o.assignedNodes(n).filter(function (o) {
            return o.nodeType === Node.ELEMENT_NODE;
          });
        };

        /**
         * @license
         * Copyright 2017 Google LLC
         * SPDX-License-Identifier: BSD-3-Clause
         */
        var t$1 = {
            ATTRIBUTE: 1
          },
          e$1 = function e$1(t) {
            return function () {
              for (var _len3 = arguments.length, e = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                e[_key3] = arguments[_key3];
              }
              return {
                _$litDirective$: t,
                values: e
              };
            };
          };
        var i$1 = /*#__PURE__*/function () {
          function i(t) {
            _classCallCheck(this, i);
          }
          return _createClass(i, [{
            key: "_$AU",
            get: function get() {
              return this._$AM._$AU;
            }
          }, {
            key: "_$AT",
            value: function _$AT(t, e, _i13) {
              this._$Ct = t, this._$AM = e, this._$Ci = _i13;
            }
          }, {
            key: "_$AS",
            value: function _$AS(t, e) {
              return this.update(t, e);
            }
          }, {
            key: "update",
            value: function update(t, e) {
              return this.render.apply(this, _toConsumableArray(e));
            }
          }]);
        }();

        /**
         * @license
         * Copyright 2018 Google LLC
         * SPDX-License-Identifier: BSD-3-Clause
         */
        var o$1 = e$1( /*#__PURE__*/function (_i$) {
          function _class(t) {
            var _this11;
            _classCallCheck(this, _class);
            var i;
            if (_this11 = _callSuper(this, _class, [t]), t.type !== t$1.ATTRIBUTE || "class" !== t.name || (null === (i = t.strings) || void 0 === i ? void 0 : i.length) > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
            return _assertThisInitialized(_this11);
          }
          _inherits(_class, _i$);
          return _createClass(_class, [{
            key: "render",
            value: function render(t) {
              return " " + Object.keys(t).filter(function (i) {
                return t[i];
              }).join(" ") + " ";
            }
          }, {
            key: "update",
            value: function update(i, _ref2) {
              var _this12 = this;
              var _ref3 = _slicedToArray(_ref2, 1),
                s = _ref3[0];
              var r, o;
              if (void 0 === this.it) {
                this.it = new Set(), void 0 !== i.strings && (this.nt = new Set(i.strings.join(" ").split(/\s/).filter(function (t) {
                  return "" !== t;
                })));
                for (var _t12 in s) s[_t12] && !(null === (r = this.nt) || void 0 === r ? void 0 : r.has(_t12)) && this.it.add(_t12);
                return this.render(s);
              }
              var e = i.element.classList;
              this.it.forEach(function (t) {
                t in s || (e.remove(t), _this12.it.delete(t));
              });
              for (var _t13 in s) {
                var _i14 = !!s[_t13];
                _i14 === this.it.has(_t13) || (null === (o = this.nt) || void 0 === o ? void 0 : o.has(_t13)) || (_i14 ? (e.add(_t13), this.it.add(_t13)) : (e.remove(_t13), this.it.delete(_t13)));
              }
              return T$2;
            }
          }]);
        }(i$1));

        /**
         * @license
         * Copyright 2017 Google LLC
         * SPDX-License-Identifier: BSD-3-Clause
         */
        var t = globalThis,
          i = t.trustedTypes,
          s = i ? i.createPolicy("lit-html", {
            createHTML: function createHTML(t) {
              return t;
            }
          }) : void 0,
          e = "$lit$",
          h$1 = "lit$".concat(Math.random().toFixed(9).slice(2), "$"),
          o = "?" + h$1,
          n = "<".concat(o, ">"),
          r = document,
          l$1 = function l$1() {
            return r.createComment("");
          },
          c$1 = function c$1(t) {
            return null === t || "object" != _typeof(t) && "function" != typeof t;
          },
          a = Array.isArray,
          u = function u(t) {
            return a(t) || "function" == typeof (t === null || t === void 0 ? void 0 : t[Symbol.iterator]);
          },
          d = "[ \t\n\f\r]",
          f = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
          v$1 = /-->/g,
          _$1 = />/g,
          m = RegExp(">|".concat(d, "(?:([^\\s\"'>=/]+)(").concat(d, "*=").concat(d, "*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)"), "g"),
          p = /'/g,
          g = /"/g,
          $ = /^(?:script|style|textarea|title)$/i,
          y = function y(t) {
            return function (i) {
              for (var _len4 = arguments.length, s = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
                s[_key4 - 1] = arguments[_key4];
              }
              return {
                _$litType$: t,
                strings: i,
                values: s
              };
            };
          },
          b = y(2),
          w = Symbol.for("lit-noChange"),
          T$1 = Symbol.for("lit-nothing"),
          A$1 = new WeakMap(),
          E = r.createTreeWalker(r, 129);
        function C(t, i) {
          if (!Array.isArray(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
          return void 0 !== s ? s.createHTML(i) : i;
        }
        var P = function P(t, i) {
          var s = t.length - 1,
            o = [];
          var r,
            l = 2 === i ? "<svg>" : "",
            c = f;
          for (var _i15 = 0; _i15 < s; _i15++) {
            var _s8 = t[_i15];
            var _a3 = void 0,
              _u = void 0,
              _d2 = -1,
              _y = 0;
            for (; _y < _s8.length && (c.lastIndex = _y, _u = c.exec(_s8), null !== _u);) {
              var _r;
              _y = c.lastIndex, c === f ? "!--" === _u[1] ? c = v$1 : void 0 !== _u[1] ? c = _$1 : void 0 !== _u[2] ? ($.test(_u[2]) && (r = RegExp("</" + _u[2], "g")), c = m) : void 0 !== _u[3] && (c = m) : c === m ? ">" === _u[0] ? (c = (_r = r) !== null && _r !== void 0 ? _r : f, _d2 = -1) : void 0 === _u[1] ? _d2 = -2 : (_d2 = c.lastIndex - _u[2].length, _a3 = _u[1], c = void 0 === _u[3] ? m : '"' === _u[3] ? g : p) : c === g || c === p ? c = m : c === v$1 || c === _$1 ? c = f : (c = m, r = void 0);
            }
            var _x = c === m && t[_i15 + 1].startsWith("/>") ? " " : "";
            l += c === f ? _s8 + n : _d2 >= 0 ? (o.push(_a3), _s8.slice(0, _d2) + e + _s8.slice(_d2) + h$1 + _x) : _s8 + h$1 + (-2 === _d2 ? _i15 : _x);
          }
          return [C(t, l + (t[s] || "<?>") + (2 === i ? "</svg>" : "")), o];
        };
        var V = /*#__PURE__*/function () {
          function V(_ref4, n) {
            var t = _ref4.strings,
              s = _ref4._$litType$;
            _classCallCheck(this, V);
            var r;
            this.parts = [];
            var c = 0,
              a = 0;
            var u = t.length - 1,
              d = this.parts,
              _P = P(t, s),
              _P2 = _slicedToArray(_P, 2),
              f = _P2[0],
              v = _P2[1];
            if (this.el = V.createElement(f, n), E.currentNode = this.el.content, 2 === s) {
              var _t14 = this.el.content.firstChild;
              _t14.replaceWith.apply(_t14, _toConsumableArray(_t14.childNodes));
            }
            for (; null !== (r = E.nextNode()) && d.length < u;) {
              if (1 === r.nodeType) {
                if (r.hasAttributes()) {
                  var _iterator7 = _createForOfIteratorHelper(r.getAttributeNames()),
                    _step7;
                  try {
                    for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
                      var _t15 = _step7.value;
                      if (_t15.endsWith(e)) {
                        var _i16 = v[a++],
                          _s9 = r.getAttribute(_t15).split(h$1),
                          _e6 = /([.?@])?(.*)/.exec(_i16);
                        d.push({
                          type: 1,
                          index: c,
                          name: _e6[2],
                          strings: _s9,
                          ctor: "." === _e6[1] ? k : "?" === _e6[1] ? H : "@" === _e6[1] ? I : R
                        }), r.removeAttribute(_t15);
                      } else _t15.startsWith(h$1) && (d.push({
                        type: 6,
                        index: c
                      }), r.removeAttribute(_t15));
                    }
                  } catch (err) {
                    _iterator7.e(err);
                  } finally {
                    _iterator7.f();
                  }
                }
                if ($.test(r.tagName)) {
                  var _t16 = r.textContent.split(h$1),
                    _s10 = _t16.length - 1;
                  if (_s10 > 0) {
                    r.textContent = i ? i.emptyScript : "";
                    for (var _i17 = 0; _i17 < _s10; _i17++) r.append(_t16[_i17], l$1()), E.nextNode(), d.push({
                      type: 2,
                      index: ++c
                    });
                    r.append(_t16[_s10], l$1());
                  }
                }
              } else if (8 === r.nodeType) if (r.data === o) d.push({
                type: 2,
                index: c
              });else {
                var _t17 = -1;
                for (; -1 !== (_t17 = r.data.indexOf(h$1, _t17 + 1));) d.push({
                  type: 7,
                  index: c
                }), _t17 += h$1.length - 1;
              }
              c++;
            }
          }
          return _createClass(V, null, [{
            key: "createElement",
            value: function createElement(t, i) {
              var s = r.createElement("template");
              return s.innerHTML = t, s;
            }
          }]);
        }();
        function N(t, i) {
          var _s$_$Co, _h4, _h5, _h5$_$AO, _s$_$Co2;
          var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : t;
          var e = arguments.length > 3 ? arguments[3] : undefined;
          if (i === w) return i;
          var h = void 0 !== e ? (_s$_$Co = s._$Co) === null || _s$_$Co === void 0 ? void 0 : _s$_$Co[e] : s._$Cl;
          var o = c$1(i) ? void 0 : i._$litDirective$;
          return ((_h4 = h) === null || _h4 === void 0 ? void 0 : _h4.constructor) !== o && ((_h5 = h) !== null && _h5 !== void 0 && (_h5$_$AO = _h5._$AO) !== null && _h5$_$AO !== void 0 && _h5$_$AO.call(_h5, false), void 0 === o ? h = void 0 : (h = new o(t), h._$AT(t, s, e)), void 0 !== e ? ((_s$_$Co2 = s._$Co) !== null && _s$_$Co2 !== void 0 ? _s$_$Co2 : s._$Co = [])[e] = h : s._$Cl = h), void 0 !== h && (i = N(t, h._$AS(t, i.values), h, e)), i;
        }
        var S$1 = /*#__PURE__*/function () {
          function S(t, i) {
            _classCallCheck(this, S);
            this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = i;
          }
          return _createClass(S, [{
            key: "parentNode",
            get: function get() {
              return this._$AM.parentNode;
            }
          }, {
            key: "_$AU",
            get: function get() {
              return this._$AM._$AU;
            }
          }, {
            key: "u",
            value: function u(t) {
              var _t$creationScope;
              var _this$_$AD2 = this._$AD,
                i = _this$_$AD2.el.content,
                s = _this$_$AD2.parts,
                e = ((_t$creationScope = t === null || t === void 0 ? void 0 : t.creationScope) !== null && _t$creationScope !== void 0 ? _t$creationScope : r).importNode(i, true);
              E.currentNode = e;
              var h = E.nextNode(),
                o = 0,
                n = 0,
                l = s[0];
              for (; void 0 !== l;) {
                var _l2;
                if (o === l.index) {
                  var _i18 = void 0;
                  2 === l.type ? _i18 = new M(h, h.nextSibling, this, t) : 1 === l.type ? _i18 = new l.ctor(h, l.name, l.strings, this, t) : 6 === l.type && (_i18 = new L$1(h, this, t)), this._$AV.push(_i18), l = s[++n];
                }
                o !== ((_l2 = l) === null || _l2 === void 0 ? void 0 : _l2.index) && (h = E.nextNode(), o++);
              }
              return E.currentNode = r, e;
            }
          }, {
            key: "p",
            value: function p(t) {
              var i = 0;
              var _iterator8 = _createForOfIteratorHelper(this._$AV),
                _step8;
              try {
                for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
                  var _s11 = _step8.value;
                  void 0 !== _s11 && (void 0 !== _s11.strings ? (_s11._$AI(t, _s11, i), i += _s11.strings.length - 2) : _s11._$AI(t[i])), i++;
                }
              } catch (err) {
                _iterator8.e(err);
              } finally {
                _iterator8.f();
              }
            }
          }]);
        }();
        var M = /*#__PURE__*/function () {
          function M(t, i, s, e) {
            var _e$isConnected;
            _classCallCheck(this, M);
            this.type = 2, this._$AH = T$1, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = s, this.options = e, this._$Cv = (_e$isConnected = e === null || e === void 0 ? void 0 : e.isConnected) !== null && _e$isConnected !== void 0 ? _e$isConnected : true;
          }
          return _createClass(M, [{
            key: "_$AU",
            get: function get() {
              var _this$_$AM$_$AU, _this$_$AM;
              return (_this$_$AM$_$AU = (_this$_$AM = this._$AM) === null || _this$_$AM === void 0 ? void 0 : _this$_$AM._$AU) !== null && _this$_$AM$_$AU !== void 0 ? _this$_$AM$_$AU : this._$Cv;
            }
          }, {
            key: "parentNode",
            get: function get() {
              var _t18;
              var t = this._$AA.parentNode;
              var i = this._$AM;
              return void 0 !== i && 11 === ((_t18 = t) === null || _t18 === void 0 ? void 0 : _t18.nodeType) && (t = i.parentNode), t;
            }
          }, {
            key: "startNode",
            get: function get() {
              return this._$AA;
            }
          }, {
            key: "endNode",
            get: function get() {
              return this._$AB;
            }
          }, {
            key: "_$AI",
            value: function _$AI(t) {
              var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
              t = N(this, t, i), c$1(t) ? t === T$1 || null == t || "" === t ? (this._$AH !== T$1 && this._$AR(), this._$AH = T$1) : t !== this._$AH && t !== w && this._(t) : void 0 !== t._$litType$ ? this.$(t) : void 0 !== t.nodeType ? this.T(t) : u(t) ? this.k(t) : this._(t);
            }
          }, {
            key: "S",
            value: function S(t) {
              return this._$AA.parentNode.insertBefore(t, this._$AB);
            }
          }, {
            key: "T",
            value: function T(t) {
              this._$AH !== t && (this._$AR(), this._$AH = this.S(t));
            }
          }, {
            key: "_",
            value: function _(t) {
              this._$AH !== T$1 && c$1(this._$AH) ? this._$AA.nextSibling.data = t : this.T(r.createTextNode(t)), this._$AH = t;
            }
          }, {
            key: "$",
            value: function $(t) {
              var _this$_$AH;
              var i = t.values,
                s = t._$litType$,
                e = "number" == typeof s ? this._$AC(t) : (void 0 === s.el && (s.el = V.createElement(C(s.h, s.h[0]), this.options)), s);
              if (((_this$_$AH = this._$AH) === null || _this$_$AH === void 0 ? void 0 : _this$_$AH._$AD) === e) this._$AH.p(i);else {
                var _t19 = new S$1(e, this),
                  _s12 = _t19.u(this.options);
                _t19.p(i), this.T(_s12), this._$AH = _t19;
              }
            }
          }, {
            key: "_$AC",
            value: function _$AC(t) {
              var i = A$1.get(t.strings);
              return void 0 === i && A$1.set(t.strings, i = new V(t)), i;
            }
          }, {
            key: "k",
            value: function k(t) {
              a(this._$AH) || (this._$AH = [], this._$AR());
              var i = this._$AH;
              var s,
                e = 0;
              var _iterator9 = _createForOfIteratorHelper(t),
                _step9;
              try {
                for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
                  var _h6 = _step9.value;
                  e === i.length ? i.push(s = new M(this.S(l$1()), this.S(l$1()), this, this.options)) : s = i[e], s._$AI(_h6), e++;
                }
              } catch (err) {
                _iterator9.e(err);
              } finally {
                _iterator9.f();
              }
              e < i.length && (this._$AR(s && s._$AB.nextSibling, e), i.length = e);
            }
          }, {
            key: "_$AR",
            value: function _$AR() {
              var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._$AA.nextSibling;
              var i = arguments.length > 1 ? arguments[1] : undefined;
              for ((_this$_$AP = this._$AP) === null || _this$_$AP === void 0 ? void 0 : _this$_$AP.call(this, false, true, i); t && t !== this._$AB;) {
                var _this$_$AP;
                var _i19 = t.nextSibling;
                t.remove(), t = _i19;
              }
            }
          }, {
            key: "setConnected",
            value: function setConnected(t) {
              var _this$_$AP2;
              void 0 === this._$AM && (this._$Cv = t, (_this$_$AP2 = this._$AP) === null || _this$_$AP2 === void 0 ? void 0 : _this$_$AP2.call(this, t));
            }
          }]);
        }();
        var R = /*#__PURE__*/function () {
          function R(t, i, s, e, h) {
            _classCallCheck(this, R);
            this.type = 1, this._$AH = T$1, this._$AN = void 0, this.element = t, this.name = i, this._$AM = e, this.options = h, s.length > 2 || "" !== s[0] || "" !== s[1] ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = T$1;
          }
          return _createClass(R, [{
            key: "tagName",
            get: function get() {
              return this.element.tagName;
            }
          }, {
            key: "_$AU",
            get: function get() {
              return this._$AM._$AU;
            }
          }, {
            key: "_$AI",
            value: function _$AI(t) {
              var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
              var s = arguments.length > 2 ? arguments[2] : undefined;
              var e = arguments.length > 3 ? arguments[3] : undefined;
              var h = this.strings;
              var o = false;
              if (void 0 === h) t = N(this, t, i, 0), o = !c$1(t) || t !== this._$AH && t !== w, o && (this._$AH = t);else {
                var _e7 = t;
                var _n, _r2;
                for (t = h[0], _n = 0; _n < h.length - 1; _n++) {
                  var _r3;
                  _r2 = N(this, _e7[s + _n], i, _n), _r2 === w && (_r2 = this._$AH[_n]), o || (o = !c$1(_r2) || _r2 !== this._$AH[_n]), _r2 === T$1 ? t = T$1 : t !== T$1 && (t += ((_r3 = _r2) !== null && _r3 !== void 0 ? _r3 : "") + h[_n + 1]), this._$AH[_n] = _r2;
                }
              }
              o && !e && this.j(t);
            }
          }, {
            key: "j",
            value: function j(t) {
              t === T$1 ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t !== null && t !== void 0 ? t : "");
            }
          }]);
        }();
        var k = /*#__PURE__*/function (_R) {
          function k() {
            var _this13;
            _classCallCheck(this, k);
            _this13 = _callSuper(this, k, arguments), _this13.type = 3;
            return _this13;
          }
          _inherits(k, _R);
          return _createClass(k, [{
            key: "j",
            value: function j(t) {
              this.element[this.name] = t === T$1 ? void 0 : t;
            }
          }]);
        }(R);
        var H = /*#__PURE__*/function (_R2) {
          function H() {
            var _this14;
            _classCallCheck(this, H);
            _this14 = _callSuper(this, H, arguments), _this14.type = 4;
            return _this14;
          }
          _inherits(H, _R2);
          return _createClass(H, [{
            key: "j",
            value: function j(t) {
              this.element.toggleAttribute(this.name, !!t && t !== T$1);
            }
          }]);
        }(R);
        var I = /*#__PURE__*/function (_R3) {
          function I(t, i, s, e, h) {
            var _this15;
            _classCallCheck(this, I);
            _this15 = _callSuper(this, I, [t, i, s, e, h]), _this15.type = 5;
            return _this15;
          }
          _inherits(I, _R3);
          return _createClass(I, [{
            key: "_$AI",
            value: function _$AI(t) {
              var _N;
              var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
              if ((t = (_N = N(this, t, i, 0)) !== null && _N !== void 0 ? _N : T$1) === w) return;
              var s = this._$AH,
                e = t === T$1 && s !== T$1 || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive,
                h = t !== T$1 && (s === T$1 || e);
              e && this.element.removeEventListener(this.name, this, s), h && this.element.addEventListener(this.name, this, t), this._$AH = t;
            }
          }, {
            key: "handleEvent",
            value: function handleEvent(t) {
              var _this$options$host, _this$options;
              "function" == typeof this._$AH ? this._$AH.call((_this$options$host = (_this$options = this.options) === null || _this$options === void 0 ? void 0 : _this$options.host) !== null && _this$options$host !== void 0 ? _this$options$host : this.element, t) : this._$AH.handleEvent(t);
            }
          }]);
        }(R);
        var L$1 = /*#__PURE__*/function () {
          function L(t, i, s) {
            _classCallCheck(this, L);
            this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
          }
          return _createClass(L, [{
            key: "_$AU",
            get: function get() {
              return this._$AM._$AU;
            }
          }, {
            key: "_$AI",
            value: function _$AI(t) {
              N(this, t);
            }
          }]);
        }();
        var Z$1 = t.litHtmlPolyfillSupport;
        Z$1 !== null && Z$1 !== void 0 && Z$1(V, M), ((_t$litHtmlVersions = t.litHtmlVersions) !== null && _t$litHtmlVersions !== void 0 ? _t$litHtmlVersions : t.litHtmlVersions = []).push("3.1.4");
        function addUniqueItem(array, item) {
          array.indexOf(item) === -1 && array.push(item);
        }
        var clamp = function clamp(min, max, v) {
          return Math.min(Math.max(v, min), max);
        };
        var defaults = {
          duration: 0.3,
          delay: 0,
          endDelay: 0,
          repeat: 0,
          easing: "ease"
        };
        var isNumber = function isNumber(value) {
          return typeof value === "number";
        };
        var isEasingList = function isEasingList(easing) {
          return Array.isArray(easing) && !isNumber(easing[0]);
        };
        var wrap = function wrap(min, max, v) {
          var rangeSize = max - min;
          return ((v - min) % rangeSize + rangeSize) % rangeSize + min;
        };
        function getEasingForSegment(easing, i) {
          return isEasingList(easing) ? easing[wrap(0, easing.length, i)] : easing;
        }
        var mix = function mix(min, max, progress) {
          return -progress * min + progress * max + min;
        };
        var noop = function noop() {};
        var noopReturn = function noopReturn(v) {
          return v;
        };
        var progress = function progress(min, max, value) {
          return max - min === 0 ? 1 : (value - min) / (max - min);
        };
        function fillOffset(offset, remaining) {
          var min = offset[offset.length - 1];
          for (var _i20 = 1; _i20 <= remaining; _i20++) {
            var offsetProgress = progress(0, remaining, _i20);
            offset.push(mix(min, 1, offsetProgress));
          }
        }
        function defaultOffset(length) {
          var offset = [0];
          fillOffset(offset, length - 1);
          return offset;
        }
        function interpolate(output) {
          var input = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultOffset(output.length);
          var easing = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noopReturn;
          var length = output.length;
          /**
           * If the input length is lower than the output we
           * fill the input to match. This currently assumes the input
           * is an animation progress value so is a good candidate for
           * moving outside the function.
           */
          var remainder = length - input.length;
          remainder > 0 && fillOffset(input, remainder);
          return function (t) {
            var i = 0;
            for (; i < length - 2; i++) {
              if (t < input[i + 1]) break;
            }
            var progressInRange = clamp(0, 1, progress(input[i], input[i + 1], t));
            var segmentEasing = getEasingForSegment(easing, i);
            progressInRange = segmentEasing(progressInRange);
            return mix(output[i], output[i + 1], progressInRange);
          };
        }
        var isCubicBezier = function isCubicBezier(easing) {
          return Array.isArray(easing) && isNumber(easing[0]);
        };
        var isEasingGenerator = function isEasingGenerator(easing) {
          return _typeof(easing) === "object" && Boolean(easing.createAnimation);
        };
        var isFunction = function isFunction(value) {
          return typeof value === "function";
        };
        var isString = function isString(value) {
          return typeof value === "string";
        };
        var time = {
          ms: function ms(seconds) {
            return seconds * 1000;
          },
          s: function s(milliseconds) {
            return milliseconds / 1000;
          }
        };

        /*
          Bezier function generator
           This has been modified from Gaëtan Renaudeau's BezierEasing
          https://github.com/gre/bezier-easing/blob/master/src/index.js
          https://github.com/gre/bezier-easing/blob/master/LICENSE
          
          I've removed the newtonRaphsonIterate algo because in benchmarking it
          wasn't noticiably faster than binarySubdivision, indeed removing it
          usually improved times, depending on the curve.
           I also removed the lookup table, as for the added bundle size and loop we're
          only cutting ~4 or so subdivision iterations. I bumped the max iterations up
          to 12 to compensate and this still tended to be faster for no perceivable
          loss in accuracy.
           Usage
            const easeOut = cubicBezier(.17,.67,.83,.67);
            const x = easeOut(0.5); // returns 0.627...
        */
        // Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
        var calcBezier = function calcBezier(t, a1, a2) {
          return (((1.0 - 3.0 * a2 + 3.0 * a1) * t + (3.0 * a2 - 6.0 * a1)) * t + 3.0 * a1) * t;
        };
        var subdivisionPrecision = 0.0000001;
        var subdivisionMaxIterations = 12;
        function binarySubdivide(x, lowerBound, upperBound, mX1, mX2) {
          var currentX;
          var currentT;
          var i = 0;
          do {
            currentT = lowerBound + (upperBound - lowerBound) / 2.0;
            currentX = calcBezier(currentT, mX1, mX2) - x;
            if (currentX > 0.0) {
              upperBound = currentT;
            } else {
              lowerBound = currentT;
            }
          } while (Math.abs(currentX) > subdivisionPrecision && ++i < subdivisionMaxIterations);
          return currentT;
        }
        function cubicBezier(mX1, mY1, mX2, mY2) {
          // If this is a linear gradient, return linear easing
          if (mX1 === mY1 && mX2 === mY2) return noopReturn;
          var getTForX = function getTForX(aX) {
            return binarySubdivide(aX, 0, 1, mX1, mX2);
          };
          // If animation is at start/end, return t without easing
          return function (t) {
            return t === 0 || t === 1 ? t : calcBezier(getTForX(t), mY1, mY2);
          };
        }
        var steps = function steps(_steps) {
          var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "end";
          return function (progress) {
            progress = direction === "end" ? Math.min(progress, 0.999) : Math.max(progress, 0.001);
            var expanded = progress * _steps;
            var rounded = direction === "end" ? Math.floor(expanded) : Math.ceil(expanded);
            return clamp(0, 1, rounded / _steps);
          };
        };
        var namedEasings = {
          ease: cubicBezier(0.25, 0.1, 0.25, 1.0),
          "ease-in": cubicBezier(0.42, 0.0, 1.0, 1.0),
          "ease-in-out": cubicBezier(0.42, 0.0, 0.58, 1.0),
          "ease-out": cubicBezier(0.0, 0.0, 0.58, 1.0)
        };
        var functionArgsRegex = /\((.*?)\)/;
        function getEasingFunction(definition) {
          // If already an easing function, return
          if (isFunction(definition)) return definition;
          // If an easing curve definition, return bezier function
          if (isCubicBezier(definition)) return cubicBezier.apply(void 0, _toConsumableArray(definition));
          // If we have a predefined easing function, return
          var namedEasing = namedEasings[definition];
          if (namedEasing) return namedEasing;
          // If this is a steps function, attempt to create easing curve
          if (definition.startsWith("steps")) {
            var args = functionArgsRegex.exec(definition);
            if (args) {
              var argsArray = args[1].split(",");
              return steps(parseFloat(argsArray[0]), argsArray[1].trim());
            }
          }
          return noopReturn;
        }
        var Animation = /*#__PURE__*/function () {
          function Animation(output) {
            var _this16 = this;
            var keyframes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [0, 1];
            var _ref5 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
              easing = _ref5.easing,
              _ref5$duration = _ref5.duration,
              initialDuration = _ref5$duration === void 0 ? defaults.duration : _ref5$duration,
              _ref5$delay = _ref5.delay,
              delay = _ref5$delay === void 0 ? defaults.delay : _ref5$delay,
              _ref5$endDelay = _ref5.endDelay,
              endDelay = _ref5$endDelay === void 0 ? defaults.endDelay : _ref5$endDelay,
              _ref5$repeat = _ref5.repeat,
              repeat = _ref5$repeat === void 0 ? defaults.repeat : _ref5$repeat,
              offset = _ref5.offset,
              _ref5$direction = _ref5.direction,
              direction = _ref5$direction === void 0 ? "normal" : _ref5$direction,
              _ref5$autoplay = _ref5.autoplay,
              autoplay = _ref5$autoplay === void 0 ? true : _ref5$autoplay;
            _classCallCheck(this, Animation);
            this.startTime = null;
            this.rate = 1;
            this.t = 0;
            this.cancelTimestamp = null;
            this.easing = noopReturn;
            this.duration = 0;
            this.totalDuration = 0;
            this.repeat = 0;
            this.playState = "idle";
            this.finished = new Promise(function (resolve, reject) {
              _this16.resolve = resolve;
              _this16.reject = reject;
            });
            easing = easing || defaults.easing;
            if (isEasingGenerator(easing)) {
              var custom = easing.createAnimation(keyframes);
              easing = custom.easing;
              keyframes = custom.keyframes || keyframes;
              initialDuration = custom.duration || initialDuration;
            }
            this.repeat = repeat;
            this.easing = isEasingList(easing) ? noopReturn : getEasingFunction(easing);
            this.updateDuration(initialDuration);
            var interpolate$1 = interpolate(keyframes, offset, isEasingList(easing) ? easing.map(getEasingFunction) : noopReturn);
            this.tick = function (timestamp) {
              var _a;
              // TODO: Temporary fix for OptionsResolver typing
              delay = delay;
              var t = 0;
              if (_this16.pauseTime !== undefined) {
                t = _this16.pauseTime;
              } else {
                t = (timestamp - _this16.startTime) * _this16.rate;
              }
              _this16.t = t;
              // Convert to seconds
              t /= 1000;
              // Rebase on delay
              t = Math.max(t - delay, 0);
              /**
               * If this animation has finished, set the current time
               * to the total duration.
               */
              if (_this16.playState === "finished" && _this16.pauseTime === undefined) {
                t = _this16.totalDuration;
              }
              /**
               * Get the current progress (0-1) of the animation. If t is >
               * than duration we'll get values like 2.5 (midway through the
               * third iteration)
               */
              var progress = t / _this16.duration;
              // TODO progress += iterationStart
              /**
               * Get the current iteration (0 indexed). For instance the floor of
               * 2.5 is 2.
               */
              var currentIteration = Math.floor(progress);
              /**
               * Get the current progress of the iteration by taking the remainder
               * so 2.5 is 0.5 through iteration 2
               */
              var iterationProgress = progress % 1.0;
              if (!iterationProgress && progress >= 1) {
                iterationProgress = 1;
              }
              /**
               * If iteration progress is 1 we count that as the end
               * of the previous iteration.
               */
              iterationProgress === 1 && currentIteration--;
              /**
               * Reverse progress if we're not running in "normal" direction
               */
              var iterationIsOdd = currentIteration % 2;
              if (direction === "reverse" || direction === "alternate" && iterationIsOdd || direction === "alternate-reverse" && !iterationIsOdd) {
                iterationProgress = 1 - iterationProgress;
              }
              var p = t >= _this16.totalDuration ? 1 : Math.min(iterationProgress, 1);
              var latest = interpolate$1(_this16.easing(p));
              output(latest);
              var isAnimationFinished = _this16.pauseTime === undefined && (_this16.playState === "finished" || t >= _this16.totalDuration + endDelay);
              if (isAnimationFinished) {
                _this16.playState = "finished";
                (_a = _this16.resolve) === null || _a === void 0 ? void 0 : _a.call(_this16, latest);
              } else if (_this16.playState !== "idle") {
                _this16.frameRequestId = requestAnimationFrame(_this16.tick);
              }
            };
            if (autoplay) this.play();
          }
          return _createClass(Animation, [{
            key: "play",
            value: function play() {
              var now = performance.now();
              this.playState = "running";
              if (this.pauseTime !== undefined) {
                this.startTime = now - this.pauseTime;
              } else if (!this.startTime) {
                this.startTime = now;
              }
              this.cancelTimestamp = this.startTime;
              this.pauseTime = undefined;
              this.frameRequestId = requestAnimationFrame(this.tick);
            }
          }, {
            key: "pause",
            value: function pause() {
              this.playState = "paused";
              this.pauseTime = this.t;
            }
          }, {
            key: "finish",
            value: function finish() {
              this.playState = "finished";
              this.tick(0);
            }
          }, {
            key: "stop",
            value: function stop() {
              var _a;
              this.playState = "idle";
              if (this.frameRequestId !== undefined) {
                cancelAnimationFrame(this.frameRequestId);
              }
              (_a = this.reject) === null || _a === void 0 ? void 0 : _a.call(this, false);
            }
          }, {
            key: "cancel",
            value: function cancel() {
              this.stop();
              this.tick(this.cancelTimestamp);
            }
          }, {
            key: "reverse",
            value: function reverse() {
              this.rate *= -1;
            }
          }, {
            key: "commitStyles",
            value: function commitStyles() {}
          }, {
            key: "updateDuration",
            value: function updateDuration(duration) {
              this.duration = duration;
              this.totalDuration = duration * (this.repeat + 1);
            }
          }, {
            key: "currentTime",
            get: function get() {
              return this.t;
            },
            set: function set(t) {
              if (this.pauseTime !== undefined || this.rate === 0) {
                this.pauseTime = t;
              } else {
                this.startTime = performance.now() - t / this.rate;
              }
            }
          }, {
            key: "playbackRate",
            get: function get() {
              return this.rate;
            },
            set: function set(rate) {
              this.rate = rate;
            }
          }]);
        }();
        /**
         * The MotionValue tracks the state of a single animatable
         * value. Currently, updatedAt and current are unused. The
         * long term idea is to use this to minimise the number
         * of DOM reads, and to abstract the DOM interactions here.
         */
        var MotionValue = /*#__PURE__*/function () {
          function MotionValue() {
            _classCallCheck(this, MotionValue);
          }
          return _createClass(MotionValue, [{
            key: "setAnimation",
            value: function setAnimation(animation) {
              var _this17 = this;
              this.animation = animation;
              animation === null || animation === void 0 ? void 0 : animation.finished.then(function () {
                return _this17.clearAnimation();
              }).catch(function () {});
            }
          }, {
            key: "clearAnimation",
            value: function clearAnimation() {
              this.animation = this.generator = undefined;
            }
          }]);
        }();
        var data = new WeakMap();
        function getAnimationData(element) {
          if (!data.has(element)) {
            data.set(element, {
              transforms: [],
              values: new Map()
            });
          }
          return data.get(element);
        }
        function getMotionValue(motionValues, name) {
          if (!motionValues.has(name)) {
            motionValues.set(name, new MotionValue());
          }
          return motionValues.get(name);
        }

        /**
         * A list of all transformable axes. We'll use this list to generated a version
         * of each axes for each transform.
         */
        var axes = ["", "X", "Y", "Z"];
        /**
         * An ordered array of each transformable value. By default, transform values
         * will be sorted to this order.
         */
        var order = ["translate", "scale", "rotate", "skew"];
        var transformAlias = {
          x: "translateX",
          y: "translateY",
          z: "translateZ"
        };
        var rotation = {
          syntax: "<angle>",
          initialValue: "0deg",
          toDefaultUnit: function toDefaultUnit(v) {
            return v + "deg";
          }
        };
        var baseTransformProperties = {
          translate: {
            syntax: "<length-percentage>",
            initialValue: "0px",
            toDefaultUnit: function toDefaultUnit(v) {
              return v + "px";
            }
          },
          rotate: rotation,
          scale: {
            syntax: "<number>",
            initialValue: 1,
            toDefaultUnit: noopReturn
          },
          skew: rotation
        };
        var transformDefinitions = new Map();
        var asTransformCssVar = function asTransformCssVar(name) {
          return "--motion-".concat(name);
        };
        /**
         * Generate a list of every possible transform key
         */
        var transforms = ["x", "y", "z"];
        order.forEach(function (name) {
          axes.forEach(function (axis) {
            transforms.push(name + axis);
            transformDefinitions.set(asTransformCssVar(name + axis), baseTransformProperties[name]);
          });
        });
        /**
         * A function to use with Array.sort to sort transform keys by their default order.
         */
        var compareTransformOrder = function compareTransformOrder(a, b) {
          return transforms.indexOf(a) - transforms.indexOf(b);
        };
        /**
         * Provide a quick way to check if a string is the name of a transform
         */
        var transformLookup = new Set(transforms);
        var isTransform = function isTransform(name) {
          return transformLookup.has(name);
        };
        var addTransformToElement = function addTransformToElement(element, name) {
          // Map x to translateX etc
          if (transformAlias[name]) name = transformAlias[name];
          var _getAnimationData = getAnimationData(element),
            transforms = _getAnimationData.transforms;
          addUniqueItem(transforms, name);
          /**
           * TODO: An optimisation here could be to cache the transform in element data
           * and only update if this has changed.
           */
          element.style.transform = buildTransformTemplate(transforms);
        };
        var buildTransformTemplate = function buildTransformTemplate(transforms) {
          return transforms.sort(compareTransformOrder).reduce(transformListToString, "").trim();
        };
        var transformListToString = function transformListToString(template, name) {
          return "".concat(template, " ").concat(name, "(var(").concat(asTransformCssVar(name), "))");
        };
        var isCssVar = function isCssVar(name) {
          return name.startsWith("--");
        };
        var registeredProperties = new Set();
        function registerCssVariable(name) {
          if (registeredProperties.has(name)) return;
          registeredProperties.add(name);
          try {
            var _ref6 = transformDefinitions.has(name) ? transformDefinitions.get(name) : {},
              syntax = _ref6.syntax,
              initialValue = _ref6.initialValue;
            CSS.registerProperty({
              name: name,
              inherits: false,
              syntax: syntax,
              initialValue: initialValue
            });
          } catch (e) {}
        }
        var testAnimation = function testAnimation(keyframes, options) {
          return document.createElement("div").animate(keyframes, options);
        };
        var featureTests = {
          cssRegisterProperty: function cssRegisterProperty() {
            return typeof CSS !== "undefined" && Object.hasOwnProperty.call(CSS, "registerProperty");
          },
          waapi: function waapi() {
            return Object.hasOwnProperty.call(Element.prototype, "animate");
          },
          partialKeyframes: function partialKeyframes() {
            try {
              testAnimation({
                opacity: [1]
              });
            } catch (e) {
              return false;
            }
            return true;
          },
          finished: function finished() {
            return Boolean(testAnimation({
              opacity: [0, 1]
            }, {
              duration: 0.001
            }).finished);
          },
          linearEasing: function linearEasing() {
            try {
              testAnimation({
                opacity: 0
              }, {
                easing: "linear(0, 1)"
              });
            } catch (e) {
              return false;
            }
            return true;
          }
        };
        var results = {};
        var supports = {};
        var _loop = function _loop(key) {
          supports[key] = function () {
            if (results[key] === undefined) results[key] = featureTests[key]();
            return results[key];
          };
        };
        for (var key in featureTests) {
          _loop(key);
        }

        // Create a linear easing point for every x second
        var resolution = 0.015;
        var generateLinearEasingPoints = function generateLinearEasingPoints(easing, duration) {
          var points = "";
          var numPoints = Math.round(duration / resolution);
          for (var _i21 = 0; _i21 < numPoints; _i21++) {
            points += easing(progress(0, numPoints - 1, _i21)) + ", ";
          }
          return points.substring(0, points.length - 2);
        };
        var convertEasing = function convertEasing(easing, duration) {
          if (isFunction(easing)) {
            return supports.linearEasing() ? "linear(".concat(generateLinearEasingPoints(easing, duration), ")") : defaults.easing;
          } else {
            return isCubicBezier(easing) ? cubicBezierAsString(easing) : easing;
          }
        };
        var cubicBezierAsString = function cubicBezierAsString(_ref7) {
          var _ref8 = _slicedToArray(_ref7, 4),
            a = _ref8[0],
            b = _ref8[1],
            c = _ref8[2],
            d = _ref8[3];
          return "cubic-bezier(".concat(a, ", ").concat(b, ", ").concat(c, ", ").concat(d, ")");
        };
        function hydrateKeyframes(keyframes, readInitialValue) {
          for (var _i22 = 0; _i22 < keyframes.length; _i22++) {
            if (keyframes[_i22] === null) {
              keyframes[_i22] = _i22 ? keyframes[_i22 - 1] : readInitialValue();
            }
          }
          return keyframes;
        }
        var keyframesList = function keyframesList(keyframes) {
          return Array.isArray(keyframes) ? keyframes : [keyframes];
        };
        function getStyleName(key) {
          if (transformAlias[key]) key = transformAlias[key];
          return isTransform(key) ? asTransformCssVar(key) : key;
        }
        var style = {
          get: function get(element, name) {
            name = getStyleName(name);
            var value = isCssVar(name) ? element.style.getPropertyValue(name) : getComputedStyle(element)[name];
            // TODO Decide if value can be 0
            if (!value && value !== 0) {
              var definition = transformDefinitions.get(name);
              if (definition) value = definition.initialValue;
            }
            return value;
          },
          set: function set(element, name, value) {
            name = getStyleName(name);
            if (isCssVar(name)) {
              element.style.setProperty(name, value);
            } else {
              element.style[name] = value;
            }
          }
        };
        function stopAnimation(animation) {
          var needsCommit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
          if (!animation || animation.playState === "finished") return;
          // Suppress error thrown by WAAPI
          try {
            if (animation.stop) {
              animation.stop();
            } else {
              needsCommit && animation.commitStyles();
              animation.cancel();
            }
          } catch (e) {}
        }
        function getUnitConverter(keyframes, definition) {
          var _a;
          var toUnit = (definition === null || definition === void 0 ? void 0 : definition.toDefaultUnit) || noopReturn;
          var finalKeyframe = keyframes[keyframes.length - 1];
          if (isString(finalKeyframe)) {
            var unit = ((_a = finalKeyframe.match(/(-?[\d.]+)([a-z%]*)/)) === null || _a === void 0 ? void 0 : _a[2]) || "";
            if (unit) toUnit = function toUnit(value) {
              return value + unit;
            };
          }
          return toUnit;
        }
        function getDevToolsRecord() {
          return window.__MOTION_DEV_TOOLS_RECORD;
        }
        function animateStyle(element, key, keyframesDefinition) {
          var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
          var AnimationPolyfill = arguments.length > 4 ? arguments[4] : undefined;
          var record = getDevToolsRecord();
          var isRecording = options.record !== false && record;
          var animation;
          var _options$duration = options.duration,
            duration = _options$duration === void 0 ? defaults.duration : _options$duration,
            _options$delay = options.delay,
            delay = _options$delay === void 0 ? defaults.delay : _options$delay,
            _options$endDelay = options.endDelay,
            endDelay = _options$endDelay === void 0 ? defaults.endDelay : _options$endDelay,
            _options$repeat = options.repeat,
            repeat = _options$repeat === void 0 ? defaults.repeat : _options$repeat,
            _options$easing = options.easing,
            easing = _options$easing === void 0 ? defaults.easing : _options$easing,
            _options$persist = options.persist,
            persist = _options$persist === void 0 ? false : _options$persist,
            direction = options.direction,
            offset = options.offset,
            _options$allowWebkitA = options.allowWebkitAcceleration,
            allowWebkitAcceleration = _options$allowWebkitA === void 0 ? false : _options$allowWebkitA,
            _options$autoplay = options.autoplay,
            autoplay = _options$autoplay === void 0 ? true : _options$autoplay;
          var data = getAnimationData(element);
          var valueIsTransform = isTransform(key);
          var canAnimateNatively = supports.waapi();
          /**
           * If this is an individual transform, we need to map its
           * key to a CSS variable and update the element's transform style
           */
          valueIsTransform && addTransformToElement(element, key);
          var name = getStyleName(key);
          var motionValue = getMotionValue(data.values, name);
          /**
           * Get definition of value, this will be used to convert numerical
           * keyframes into the default value type.
           */
          var definition = transformDefinitions.get(name);
          /**
           * Stop the current animation, if any. Because this will trigger
           * commitStyles (DOM writes) and we might later trigger DOM reads,
           * this is fired now and we return a factory function to create
           * the actual animation that can get called in batch,
           */
          stopAnimation(motionValue.animation, !(isEasingGenerator(easing) && motionValue.generator) && options.record !== false);
          /**
           * Batchable factory function containing all DOM reads.
           */
          return function () {
            var readInitialValue = function readInitialValue() {
              var _a, _b;
              return (_b = (_a = style.get(element, name)) !== null && _a !== void 0 ? _a : definition === null || definition === void 0 ? void 0 : definition.initialValue) !== null && _b !== void 0 ? _b : 0;
            };
            /**
             * Replace null values with the previous keyframe value, or read
             * it from the DOM if it's the first keyframe.
             */
            var keyframes = hydrateKeyframes(keyframesList(keyframesDefinition), readInitialValue);
            /**
             * Detect unit type of keyframes.
             */
            var toUnit = getUnitConverter(keyframes, definition);
            if (isEasingGenerator(easing)) {
              var custom = easing.createAnimation(keyframes, key !== "opacity", readInitialValue, name, motionValue);
              easing = custom.easing;
              keyframes = custom.keyframes || keyframes;
              duration = custom.duration || duration;
            }
            /**
             * If this is a CSS variable we need to register it with the browser
             * before it can be animated natively. We also set it with setProperty
             * rather than directly onto the element.style object.
             */
            if (isCssVar(name)) {
              if (supports.cssRegisterProperty()) {
                registerCssVariable(name);
              } else {
                canAnimateNatively = false;
              }
            }
            /**
             * If we've been passed a custom easing function, and this browser
             * does **not** support linear() easing, and the value is a transform
             * (and thus a pure number) we can still support the custom easing
             * by falling back to the animation polyfill.
             */
            if (valueIsTransform && !supports.linearEasing() && (isFunction(easing) || isEasingList(easing) && easing.some(isFunction))) {
              canAnimateNatively = false;
            }
            /**
             * If we can animate this value with WAAPI, do so.
             */
            if (canAnimateNatively) {
              /**
               * Convert numbers to default value types. Currently this only supports
               * transforms but it could also support other value types.
               */
              if (definition) {
                keyframes = keyframes.map(function (value) {
                  return isNumber(value) ? definition.toDefaultUnit(value) : value;
                });
              }
              /**
               * If this browser doesn't support partial/implicit keyframes we need to
               * explicitly provide one.
               */
              if (keyframes.length === 1 && (!supports.partialKeyframes() || isRecording)) {
                keyframes.unshift(readInitialValue());
              }
              var animationOptions = {
                delay: time.ms(delay),
                duration: time.ms(duration),
                endDelay: time.ms(endDelay),
                easing: !isEasingList(easing) ? convertEasing(easing, duration) : undefined,
                direction: direction,
                iterations: repeat + 1,
                fill: "both"
              };
              animation = element.animate(_defineProperty(_defineProperty(_defineProperty({}, name, keyframes), "offset", offset), "easing", isEasingList(easing) ? easing.map(function (thisEasing) {
                return convertEasing(thisEasing, duration);
              }) : undefined), animationOptions);
              /**
               * Polyfill finished Promise in browsers that don't support it
               */
              if (!animation.finished) {
                animation.finished = new Promise(function (resolve, reject) {
                  animation.onfinish = resolve;
                  animation.oncancel = reject;
                });
              }
              var target = keyframes[keyframes.length - 1];
              animation.finished.then(function () {
                if (persist) return;
                // Apply styles to target
                style.set(element, name, target);
                // Ensure fill modes don't persist
                animation.cancel();
              }).catch(noop);
              /**
               * This forces Webkit to run animations on the main thread by exploiting
               * this condition:
               * https://trac.webkit.org/browser/webkit/trunk/Source/WebCore/platform/graphics/ca/GraphicsLayerCA.cpp?rev=281238#L1099
               *
               * This fixes Webkit's timing bugs, like accelerated animations falling
               * out of sync with main thread animations and massive delays in starting
               * accelerated animations in WKWebView.
               */
              if (!allowWebkitAcceleration) animation.playbackRate = 1.000001;
              /**
               * If we can't animate the value natively then we can fallback to the numbers-only
               * polyfill for transforms.
               */
            } else if (AnimationPolyfill && valueIsTransform) {
              /**
               * If any keyframe is a string (because we measured it from the DOM), we need to convert
               * it into a number before passing to the Animation polyfill.
               */
              keyframes = keyframes.map(function (value) {
                return typeof value === "string" ? parseFloat(value) : value;
              });
              /**
               * If we only have a single keyframe, we need to create an initial keyframe by reading
               * the current value from the DOM.
               */
              if (keyframes.length === 1) {
                keyframes.unshift(parseFloat(readInitialValue()));
              }
              animation = new AnimationPolyfill(function (latest) {
                style.set(element, name, toUnit ? toUnit(latest) : latest);
              }, keyframes, Object.assign(Object.assign({}, options), {
                duration: duration,
                easing: easing
              }));
            } else {
              var _target = keyframes[keyframes.length - 1];
              style.set(element, name, definition && isNumber(_target) ? definition.toDefaultUnit(_target) : _target);
            }
            if (isRecording) {
              record(element, key, keyframes, {
                duration: duration,
                delay: delay,
                easing: easing,
                repeat: repeat,
                offset: offset
              }, "motion-one");
            }
            motionValue.setAnimation(animation);
            if (animation && !autoplay) animation.pause();
            return animation;
          };
        }
        var getOptions = function getOptions(options, key) {
          return (
            /**
             * TODO: Make test for this
             * Always return a new object otherwise delay is overwritten by results of stagger
             * and this results in no stagger
             */
            options[key] ? Object.assign(Object.assign({}, options), options[key]) : Object.assign({}, options)
          );
        };
        function resolveElements(elements, selectorCache) {
          if (typeof elements === "string") {
            {
              elements = document.querySelectorAll(elements);
            }
          } else if (elements instanceof Element) {
            elements = [elements];
          }
          /**
           * Return an empty array
           */
          return Array.from(elements || []);
        }
        var createAnimation = function createAnimation(factory) {
          return factory();
        };
        var withControls = function withControls(animationFactory, options) {
          var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaults.duration;
          return new Proxy({
            animations: animationFactory.map(createAnimation).filter(Boolean),
            duration: duration,
            options: options
          }, controls);
        };
        /**
         * TODO:
         * Currently this returns the first animation, ideally it would return
         * the first active animation.
         */
        var getActiveAnimation = function getActiveAnimation(state) {
          return state.animations[0];
        };
        var controls = {
          get: function get(target, key) {
            var activeAnimation = getActiveAnimation(target);
            switch (key) {
              case "duration":
                return target.duration;
              case "currentTime":
                return time.s((activeAnimation === null || activeAnimation === void 0 ? void 0 : activeAnimation[key]) || 0);
              case "playbackRate":
              case "playState":
                return activeAnimation === null || activeAnimation === void 0 ? void 0 : activeAnimation[key];
              case "finished":
                if (!target.finished) {
                  target.finished = Promise.all(target.animations.map(selectFinished)).catch(noop);
                }
                return target.finished;
              case "stop":
                return function () {
                  target.animations.forEach(function (animation) {
                    return stopAnimation(animation);
                  });
                };
              case "forEachNative":
                /**
                 * This is for internal use only, fire a callback for each
                 * underlying animation.
                 */
                return function (callback) {
                  target.animations.forEach(function (animation) {
                    return callback(animation, target);
                  });
                };
              default:
                return typeof (activeAnimation === null || activeAnimation === void 0 ? void 0 : activeAnimation[key]) === "undefined" ? undefined : function () {
                  return target.animations.forEach(function (animation) {
                    return animation[key]();
                  });
                };
            }
          },
          set: function set(target, key, value) {
            switch (key) {
              case "currentTime":
                value = time.ms(value);
              // Fall-through
              case "playbackRate":
                for (var _i23 = 0; _i23 < target.animations.length; _i23++) {
                  target.animations[_i23][key] = value;
                }
                return true;
            }
            return false;
          }
        };
        var selectFinished = function selectFinished(animation) {
          return animation.finished;
        };
        function resolveOption(option, i, total) {
          return isFunction(option) ? option(i, total) : option;
        }
        function createAnimate(AnimatePolyfill) {
          return function animate(elements, keyframes) {
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            elements = resolveElements(elements);
            var numElements = elements.length;
            /**
             * Create and start new animations
             */
            var animationFactories = [];
            for (var _i24 = 0; _i24 < numElements; _i24++) {
              var element = elements[_i24];
              for (var _key5 in keyframes) {
                var valueOptions = getOptions(options, _key5);
                valueOptions.delay = resolveOption(valueOptions.delay, _i24, numElements);
                var animation = animateStyle(element, _key5, keyframes[_key5], valueOptions, AnimatePolyfill);
                animationFactories.push(animation);
              }
            }
            return withControls(animationFactories, options,
            /**
             * TODO:
             * If easing is set to spring or glide, duration will be dynamically
             * generated. Ideally we would dynamically generate this from
             * animation.effect.getComputedTiming().duration but this isn't
             * supported in iOS13 or our number polyfill. Perhaps it's possible
             * to Proxy animations returned from animateStyle that has duration
             * as a getter.
             */
            options.duration);
          };
        }
        var animate$1 = createAnimate(Animation);
        function animateProgress(target) {
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          return withControls([function () {
            var animation = new Animation(target, [0, 1], options);
            animation.finished.catch(function () {});
            return animation;
          }], options, options.duration);
        }
        function animate(target, keyframesOrOptions, options) {
          var factory = isFunction(target) ? animateProgress : animate$1;
          return factory(target, keyframesOrOptions, options);
        }

        /**
         * @license
         * Copyright 2018 Google LLC
         * SPDX-License-Identifier: BSD-3-Clause
         */
        var l = function l(_l3) {
          return null != _l3 ? _l3 : A$2;
        };
        var browser = {};
        var canPromise;
        var hasRequiredCanPromise;
        function requireCanPromise() {
          if (hasRequiredCanPromise) return canPromise;
          hasRequiredCanPromise = 1;
          // can-promise has a crash in some versions of react native that dont have
          // standard global objects
          // https://github.com/soldair/node-qrcode/issues/157

          canPromise = function canPromise() {
            return typeof Promise === 'function' && Promise.prototype && Promise.prototype.then;
          };
          return canPromise;
        }
        var qrcode = {};
        var utils$1 = {};
        var hasRequiredUtils$1;
        function requireUtils$1() {
          if (hasRequiredUtils$1) return utils$1;
          hasRequiredUtils$1 = 1;
          var toSJISFunction;
          var CODEWORDS_COUNT = [0,
          // Not used
          26, 44, 70, 100, 134, 172, 196, 242, 292, 346, 404, 466, 532, 581, 655, 733, 815, 901, 991, 1085, 1156, 1258, 1364, 1474, 1588, 1706, 1828, 1921, 2051, 2185, 2323, 2465, 2611, 2761, 2876, 3034, 3196, 3362, 3532, 3706];

          /**
           * Returns the QR Code size for the specified version
           *
           * @param  {Number} version QR Code version
           * @return {Number}         size of QR code
           */
          utils$1.getSymbolSize = function getSymbolSize(version) {
            if (!version) throw new Error('"version" cannot be null or undefined');
            if (version < 1 || version > 40) throw new Error('"version" should be in range from 1 to 40');
            return version * 4 + 17;
          };

          /**
           * Returns the total number of codewords used to store data and EC information.
           *
           * @param  {Number} version QR Code version
           * @return {Number}         Data length in bits
           */
          utils$1.getSymbolTotalCodewords = function getSymbolTotalCodewords(version) {
            return CODEWORDS_COUNT[version];
          };

          /**
           * Encode data with Bose-Chaudhuri-Hocquenghem
           *
           * @param  {Number} data Value to encode
           * @return {Number}      Encoded value
           */
          utils$1.getBCHDigit = function (data) {
            var digit = 0;
            while (data !== 0) {
              digit++;
              data >>>= 1;
            }
            return digit;
          };
          utils$1.setToSJISFunction = function setToSJISFunction(f) {
            if (typeof f !== 'function') {
              throw new Error('"toSJISFunc" is not a valid function.');
            }
            toSJISFunction = f;
          };
          utils$1.isKanjiModeEnabled = function () {
            return typeof toSJISFunction !== 'undefined';
          };
          utils$1.toSJIS = function toSJIS(kanji) {
            return toSJISFunction(kanji);
          };
          return utils$1;
        }
        var errorCorrectionLevel = {};
        var hasRequiredErrorCorrectionLevel;
        function requireErrorCorrectionLevel() {
          if (hasRequiredErrorCorrectionLevel) return errorCorrectionLevel;
          hasRequiredErrorCorrectionLevel = 1;
          (function (exports) {
            exports.L = {
              bit: 1
            };
            exports.M = {
              bit: 0
            };
            exports.Q = {
              bit: 3
            };
            exports.H = {
              bit: 2
            };
            function fromString(string) {
              if (typeof string !== 'string') {
                throw new Error('Param is not a string');
              }
              var lcStr = string.toLowerCase();
              switch (lcStr) {
                case 'l':
                case 'low':
                  return exports.L;
                case 'm':
                case 'medium':
                  return exports.M;
                case 'q':
                case 'quartile':
                  return exports.Q;
                case 'h':
                case 'high':
                  return exports.H;
                default:
                  throw new Error('Unknown EC Level: ' + string);
              }
            }
            exports.isValid = function isValid(level) {
              return level && typeof level.bit !== 'undefined' && level.bit >= 0 && level.bit < 4;
            };
            exports.from = function from(value, defaultValue) {
              if (exports.isValid(value)) {
                return value;
              }
              try {
                return fromString(value);
              } catch (e) {
                return defaultValue;
              }
            };
          })(errorCorrectionLevel);
          return errorCorrectionLevel;
        }
        var bitBuffer;
        var hasRequiredBitBuffer;
        function requireBitBuffer() {
          if (hasRequiredBitBuffer) return bitBuffer;
          hasRequiredBitBuffer = 1;
          function BitBuffer() {
            this.buffer = [];
            this.length = 0;
          }
          BitBuffer.prototype = {
            get: function get(index) {
              var bufIndex = Math.floor(index / 8);
              return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) === 1;
            },
            put: function put(num, length) {
              for (var _i25 = 0; _i25 < length; _i25++) {
                this.putBit((num >>> length - _i25 - 1 & 1) === 1);
              }
            },
            getLengthInBits: function getLengthInBits() {
              return this.length;
            },
            putBit: function putBit(bit) {
              var bufIndex = Math.floor(this.length / 8);
              if (this.buffer.length <= bufIndex) {
                this.buffer.push(0);
              }
              if (bit) {
                this.buffer[bufIndex] |= 0x80 >>> this.length % 8;
              }
              this.length++;
            }
          };
          bitBuffer = BitBuffer;
          return bitBuffer;
        }

        /**
         * Helper class to handle QR Code symbol modules
         *
         * @param {Number} size Symbol size
         */

        var bitMatrix;
        var hasRequiredBitMatrix;
        function requireBitMatrix() {
          if (hasRequiredBitMatrix) return bitMatrix;
          hasRequiredBitMatrix = 1;
          function BitMatrix(size) {
            if (!size || size < 1) {
              throw new Error('BitMatrix size must be defined and greater than 0');
            }
            this.size = size;
            this.data = new Uint8Array(size * size);
            this.reservedBit = new Uint8Array(size * size);
          }

          /**
           * Set bit value at specified location
           * If reserved flag is set, this bit will be ignored during masking process
           *
           * @param {Number}  row
           * @param {Number}  col
           * @param {Boolean} value
           * @param {Boolean} reserved
           */
          BitMatrix.prototype.set = function (row, col, value, reserved) {
            var index = row * this.size + col;
            this.data[index] = value;
            if (reserved) this.reservedBit[index] = true;
          };

          /**
           * Returns bit value at specified location
           *
           * @param  {Number}  row
           * @param  {Number}  col
           * @return {Boolean}
           */
          BitMatrix.prototype.get = function (row, col) {
            return this.data[row * this.size + col];
          };

          /**
           * Applies xor operator at specified location
           * (used during masking process)
           *
           * @param {Number}  row
           * @param {Number}  col
           * @param {Boolean} value
           */
          BitMatrix.prototype.xor = function (row, col, value) {
            this.data[row * this.size + col] ^= value;
          };

          /**
           * Check if bit at specified location is reserved
           *
           * @param {Number}   row
           * @param {Number}   col
           * @return {Boolean}
           */
          BitMatrix.prototype.isReserved = function (row, col) {
            return this.reservedBit[row * this.size + col];
          };
          bitMatrix = BitMatrix;
          return bitMatrix;
        }
        var alignmentPattern = {};

        /**
         * Alignment pattern are fixed reference pattern in defined positions
         * in a matrix symbology, which enables the decode software to re-synchronise
         * the coordinate mapping of the image modules in the event of moderate amounts
         * of distortion of the image.
         *
         * Alignment patterns are present only in QR Code symbols of version 2 or larger
         * and their number depends on the symbol version.
         */

        var hasRequiredAlignmentPattern;
        function requireAlignmentPattern() {
          if (hasRequiredAlignmentPattern) return alignmentPattern;
          hasRequiredAlignmentPattern = 1;
          (function (exports) {
            var getSymbolSize = requireUtils$1().getSymbolSize;

            /**
             * Calculate the row/column coordinates of the center module of each alignment pattern
             * for the specified QR Code version.
             *
             * The alignment patterns are positioned symmetrically on either side of the diagonal
             * running from the top left corner of the symbol to the bottom right corner.
             *
             * Since positions are simmetrical only half of the coordinates are returned.
             * Each item of the array will represent in turn the x and y coordinate.
             * @see {@link getPositions}
             *
             * @param  {Number} version QR Code version
             * @return {Array}          Array of coordinate
             */
            exports.getRowColCoords = function getRowColCoords(version) {
              if (version === 1) return [];
              var posCount = Math.floor(version / 7) + 2;
              var size = getSymbolSize(version);
              var intervals = size === 145 ? 26 : Math.ceil((size - 13) / (2 * posCount - 2)) * 2;
              var positions = [size - 7]; // Last coord is always (size - 7)

              for (var _i26 = 1; _i26 < posCount - 1; _i26++) {
                positions[_i26] = positions[_i26 - 1] - intervals;
              }
              positions.push(6); // First coord is always 6

              return positions.reverse();
            };

            /**
             * Returns an array containing the positions of each alignment pattern.
             * Each array's element represent the center point of the pattern as (x, y) coordinates
             *
             * Coordinates are calculated expanding the row/column coordinates returned by {@link getRowColCoords}
             * and filtering out the items that overlaps with finder pattern
             *
             * @example
             * For a Version 7 symbol {@link getRowColCoords} returns values 6, 22 and 38.
             * The alignment patterns, therefore, are to be centered on (row, column)
             * positions (6,22), (22,6), (22,22), (22,38), (38,22), (38,38).
             * Note that the coordinates (6,6), (6,38), (38,6) are occupied by finder patterns
             * and are not therefore used for alignment patterns.
             *
             * let pos = getPositions(7)
             * // [[6,22], [22,6], [22,22], [22,38], [38,22], [38,38]]
             *
             * @param  {Number} version QR Code version
             * @return {Array}          Array of coordinates
             */
            exports.getPositions = function getPositions(version) {
              var coords = [];
              var pos = exports.getRowColCoords(version);
              var posLength = pos.length;
              for (var _i27 = 0; _i27 < posLength; _i27++) {
                for (var _j = 0; _j < posLength; _j++) {
                  // Skip if position is occupied by finder patterns
                  if (_i27 === 0 && _j === 0 ||
                  // top-left
                  _i27 === 0 && _j === posLength - 1 ||
                  // bottom-left
                  _i27 === posLength - 1 && _j === 0) {
                    // top-right
                    continue;
                  }
                  coords.push([pos[_i27], pos[_j]]);
                }
              }
              return coords;
            };
          })(alignmentPattern);
          return alignmentPattern;
        }
        var finderPattern = {};
        var hasRequiredFinderPattern;
        function requireFinderPattern() {
          if (hasRequiredFinderPattern) return finderPattern;
          hasRequiredFinderPattern = 1;
          var getSymbolSize = requireUtils$1().getSymbolSize;
          var FINDER_PATTERN_SIZE = 7;

          /**
           * Returns an array containing the positions of each finder pattern.
           * Each array's element represent the top-left point of the pattern as (x, y) coordinates
           *
           * @param  {Number} version QR Code version
           * @return {Array}          Array of coordinates
           */
          finderPattern.getPositions = function getPositions(version) {
            var size = getSymbolSize(version);
            return [
            // top-left
            [0, 0],
            // top-right
            [size - FINDER_PATTERN_SIZE, 0],
            // bottom-left
            [0, size - FINDER_PATTERN_SIZE]];
          };
          return finderPattern;
        }
        var maskPattern = {};

        /**
         * Data mask pattern reference
         * @type {Object}
         */

        var hasRequiredMaskPattern;
        function requireMaskPattern() {
          if (hasRequiredMaskPattern) return maskPattern;
          hasRequiredMaskPattern = 1;
          (function (exports) {
            exports.Patterns = {
              PATTERN000: 0,
              PATTERN001: 1,
              PATTERN010: 2,
              PATTERN011: 3,
              PATTERN100: 4,
              PATTERN101: 5,
              PATTERN110: 6,
              PATTERN111: 7
            };

            /**
             * Weighted penalty scores for the undesirable features
             * @type {Object}
             */
            var PenaltyScores = {
              N1: 3,
              N2: 3,
              N3: 40,
              N4: 10
            };

            /**
             * Check if mask pattern value is valid
             *
             * @param  {Number}  mask    Mask pattern
             * @return {Boolean}         true if valid, false otherwise
             */
            exports.isValid = function isValid(mask) {
              return mask != null && mask !== '' && !isNaN(mask) && mask >= 0 && mask <= 7;
            };

            /**
             * Returns mask pattern from a value.
             * If value is not valid, returns undefined
             *
             * @param  {Number|String} value        Mask pattern value
             * @return {Number}                     Valid mask pattern or undefined
             */
            exports.from = function from(value) {
              return exports.isValid(value) ? parseInt(value, 10) : undefined;
            };

            /**
            * Find adjacent modules in row/column with the same color
            * and assign a penalty value.
            *
            * Points: N1 + i
            * i is the amount by which the number of adjacent modules of the same color exceeds 5
            */
            exports.getPenaltyN1 = function getPenaltyN1(data) {
              var size = data.size;
              var points = 0;
              var sameCountCol = 0;
              var sameCountRow = 0;
              var lastCol = null;
              var lastRow = null;
              for (var row = 0; row < size; row++) {
                sameCountCol = sameCountRow = 0;
                lastCol = lastRow = null;
                for (var col = 0; col < size; col++) {
                  var _module = data.get(row, col);
                  if (_module === lastCol) {
                    sameCountCol++;
                  } else {
                    if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);
                    lastCol = _module;
                    sameCountCol = 1;
                  }
                  _module = data.get(col, row);
                  if (_module === lastRow) {
                    sameCountRow++;
                  } else {
                    if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);
                    lastRow = _module;
                    sameCountRow = 1;
                  }
                }
                if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);
                if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);
              }
              return points;
            };

            /**
             * Find 2x2 blocks with the same color and assign a penalty value
             *
             * Points: N2 * (m - 1) * (n - 1)
             */
            exports.getPenaltyN2 = function getPenaltyN2(data) {
              var size = data.size;
              var points = 0;
              for (var row = 0; row < size - 1; row++) {
                for (var col = 0; col < size - 1; col++) {
                  var last = data.get(row, col) + data.get(row, col + 1) + data.get(row + 1, col) + data.get(row + 1, col + 1);
                  if (last === 4 || last === 0) points++;
                }
              }
              return points * PenaltyScores.N2;
            };

            /**
             * Find 1:1:3:1:1 ratio (dark:light:dark:light:dark) pattern in row/column,
             * preceded or followed by light area 4 modules wide
             *
             * Points: N3 * number of pattern found
             */
            exports.getPenaltyN3 = function getPenaltyN3(data) {
              var size = data.size;
              var points = 0;
              var bitsCol = 0;
              var bitsRow = 0;
              for (var row = 0; row < size; row++) {
                bitsCol = bitsRow = 0;
                for (var col = 0; col < size; col++) {
                  bitsCol = bitsCol << 1 & 0x7FF | data.get(row, col);
                  if (col >= 10 && (bitsCol === 0x5D0 || bitsCol === 0x05D)) points++;
                  bitsRow = bitsRow << 1 & 0x7FF | data.get(col, row);
                  if (col >= 10 && (bitsRow === 0x5D0 || bitsRow === 0x05D)) points++;
                }
              }
              return points * PenaltyScores.N3;
            };

            /**
             * Calculate proportion of dark modules in entire symbol
             *
             * Points: N4 * k
             *
             * k is the rating of the deviation of the proportion of dark modules
             * in the symbol from 50% in steps of 5%
             */
            exports.getPenaltyN4 = function getPenaltyN4(data) {
              var darkCount = 0;
              var modulesCount = data.data.length;
              for (var _i28 = 0; _i28 < modulesCount; _i28++) darkCount += data.data[_i28];
              var k = Math.abs(Math.ceil(darkCount * 100 / modulesCount / 5) - 10);
              return k * PenaltyScores.N4;
            };

            /**
             * Return mask value at given position
             *
             * @param  {Number} maskPattern Pattern reference value
             * @param  {Number} i           Row
             * @param  {Number} j           Column
             * @return {Boolean}            Mask value
             */
            function getMaskAt(maskPattern, i, j) {
              switch (maskPattern) {
                case exports.Patterns.PATTERN000:
                  return (i + j) % 2 === 0;
                case exports.Patterns.PATTERN001:
                  return i % 2 === 0;
                case exports.Patterns.PATTERN010:
                  return j % 3 === 0;
                case exports.Patterns.PATTERN011:
                  return (i + j) % 3 === 0;
                case exports.Patterns.PATTERN100:
                  return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0;
                case exports.Patterns.PATTERN101:
                  return i * j % 2 + i * j % 3 === 0;
                case exports.Patterns.PATTERN110:
                  return (i * j % 2 + i * j % 3) % 2 === 0;
                case exports.Patterns.PATTERN111:
                  return (i * j % 3 + (i + j) % 2) % 2 === 0;
                default:
                  throw new Error('bad maskPattern:' + maskPattern);
              }
            }

            /**
             * Apply a mask pattern to a BitMatrix
             *
             * @param  {Number}    pattern Pattern reference number
             * @param  {BitMatrix} data    BitMatrix data
             */
            exports.applyMask = function applyMask(pattern, data) {
              var size = data.size;
              for (var col = 0; col < size; col++) {
                for (var row = 0; row < size; row++) {
                  if (data.isReserved(row, col)) continue;
                  data.xor(row, col, getMaskAt(pattern, row, col));
                }
              }
            };

            /**
             * Returns the best mask pattern for data
             *
             * @param  {BitMatrix} data
             * @return {Number} Mask pattern reference number
             */
            exports.getBestMask = function getBestMask(data, setupFormatFunc) {
              var numPatterns = Object.keys(exports.Patterns).length;
              var bestPattern = 0;
              var lowerPenalty = Infinity;
              for (var _p = 0; _p < numPatterns; _p++) {
                setupFormatFunc(_p);
                exports.applyMask(_p, data);

                // Calculate penalty
                var penalty = exports.getPenaltyN1(data) + exports.getPenaltyN2(data) + exports.getPenaltyN3(data) + exports.getPenaltyN4(data);

                // Undo previously applied mask
                exports.applyMask(_p, data);
                if (penalty < lowerPenalty) {
                  lowerPenalty = penalty;
                  bestPattern = _p;
                }
              }
              return bestPattern;
            };
          })(maskPattern);
          return maskPattern;
        }
        var errorCorrectionCode = {};
        var hasRequiredErrorCorrectionCode;
        function requireErrorCorrectionCode() {
          if (hasRequiredErrorCorrectionCode) return errorCorrectionCode;
          hasRequiredErrorCorrectionCode = 1;
          var ECLevel = requireErrorCorrectionLevel();
          var EC_BLOCKS_TABLE = [
          // L  M  Q  H
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 4, 1, 2, 4, 4, 2, 4, 4, 4, 2, 4, 6, 5, 2, 4, 6, 6, 2, 5, 8, 8, 4, 5, 8, 8, 4, 5, 8, 11, 4, 8, 10, 11, 4, 9, 12, 16, 4, 9, 16, 16, 6, 10, 12, 18, 6, 10, 17, 16, 6, 11, 16, 19, 6, 13, 18, 21, 7, 14, 21, 25, 8, 16, 20, 25, 8, 17, 23, 25, 9, 17, 23, 34, 9, 18, 25, 30, 10, 20, 27, 32, 12, 21, 29, 35, 12, 23, 34, 37, 12, 25, 34, 40, 13, 26, 35, 42, 14, 28, 38, 45, 15, 29, 40, 48, 16, 31, 43, 51, 17, 33, 45, 54, 18, 35, 48, 57, 19, 37, 51, 60, 19, 38, 53, 63, 20, 40, 56, 66, 21, 43, 59, 70, 22, 45, 62, 74, 24, 47, 65, 77, 25, 49, 68, 81];
          var EC_CODEWORDS_TABLE = [
          // L  M  Q  H
          7, 10, 13, 17, 10, 16, 22, 28, 15, 26, 36, 44, 20, 36, 52, 64, 26, 48, 72, 88, 36, 64, 96, 112, 40, 72, 108, 130, 48, 88, 132, 156, 60, 110, 160, 192, 72, 130, 192, 224, 80, 150, 224, 264, 96, 176, 260, 308, 104, 198, 288, 352, 120, 216, 320, 384, 132, 240, 360, 432, 144, 280, 408, 480, 168, 308, 448, 532, 180, 338, 504, 588, 196, 364, 546, 650, 224, 416, 600, 700, 224, 442, 644, 750, 252, 476, 690, 816, 270, 504, 750, 900, 300, 560, 810, 960, 312, 588, 870, 1050, 336, 644, 952, 1110, 360, 700, 1020, 1200, 390, 728, 1050, 1260, 420, 784, 1140, 1350, 450, 812, 1200, 1440, 480, 868, 1290, 1530, 510, 924, 1350, 1620, 540, 980, 1440, 1710, 570, 1036, 1530, 1800, 570, 1064, 1590, 1890, 600, 1120, 1680, 1980, 630, 1204, 1770, 2100, 660, 1260, 1860, 2220, 720, 1316, 1950, 2310, 750, 1372, 2040, 2430];

          /**
           * Returns the number of error correction block that the QR Code should contain
           * for the specified version and error correction level.
           *
           * @param  {Number} version              QR Code version
           * @param  {Number} errorCorrectionLevel Error correction level
           * @return {Number}                      Number of error correction blocks
           */
          errorCorrectionCode.getBlocksCount = function getBlocksCount(version, errorCorrectionLevel) {
            switch (errorCorrectionLevel) {
              case ECLevel.L:
                return EC_BLOCKS_TABLE[(version - 1) * 4 + 0];
              case ECLevel.M:
                return EC_BLOCKS_TABLE[(version - 1) * 4 + 1];
              case ECLevel.Q:
                return EC_BLOCKS_TABLE[(version - 1) * 4 + 2];
              case ECLevel.H:
                return EC_BLOCKS_TABLE[(version - 1) * 4 + 3];
              default:
                return undefined;
            }
          };

          /**
           * Returns the number of error correction codewords to use for the specified
           * version and error correction level.
           *
           * @param  {Number} version              QR Code version
           * @param  {Number} errorCorrectionLevel Error correction level
           * @return {Number}                      Number of error correction codewords
           */
          errorCorrectionCode.getTotalCodewordsCount = function getTotalCodewordsCount(version, errorCorrectionLevel) {
            switch (errorCorrectionLevel) {
              case ECLevel.L:
                return EC_CODEWORDS_TABLE[(version - 1) * 4 + 0];
              case ECLevel.M:
                return EC_CODEWORDS_TABLE[(version - 1) * 4 + 1];
              case ECLevel.Q:
                return EC_CODEWORDS_TABLE[(version - 1) * 4 + 2];
              case ECLevel.H:
                return EC_CODEWORDS_TABLE[(version - 1) * 4 + 3];
              default:
                return undefined;
            }
          };
          return errorCorrectionCode;
        }
        var polynomial = {};
        var galoisField = {};
        var hasRequiredGaloisField;
        function requireGaloisField() {
          if (hasRequiredGaloisField) return galoisField;
          hasRequiredGaloisField = 1;
          var EXP_TABLE = new Uint8Array(512);
          var LOG_TABLE = new Uint8Array(256)
          /**
           * Precompute the log and anti-log tables for faster computation later
           *
           * For each possible value in the galois field 2^8, we will pre-compute
           * the logarithm and anti-logarithm (exponential) of this value
           *
           * ref {@link https://en.wikiversity.org/wiki/Reed%E2%80%93Solomon_codes_for_coders#Introduction_to_mathematical_fields}
           */;
          (function initTables() {
            var x = 1;
            for (var _i29 = 0; _i29 < 255; _i29++) {
              EXP_TABLE[_i29] = x;
              LOG_TABLE[x] = _i29;
              x <<= 1; // multiply by 2

              // The QR code specification says to use byte-wise modulo 100011101 arithmetic.
              // This means that when a number is 256 or larger, it should be XORed with 0x11D.
              if (x & 0x100) {
                // similar to x >= 256, but a lot faster (because 0x100 == 256)
                x ^= 0x11D;
              }
            }

            // Optimization: double the size of the anti-log table so that we don't need to mod 255 to
            // stay inside the bounds (because we will mainly use this table for the multiplication of
            // two GF numbers, no more).
            // @see {@link mul}
            for (var _i30 = 255; _i30 < 512; _i30++) {
              EXP_TABLE[_i30] = EXP_TABLE[_i30 - 255];
            }
          })();

          /**
           * Returns log value of n inside Galois Field
           *
           * @param  {Number} n
           * @return {Number}
           */
          galoisField.log = function log(n) {
            if (n < 1) throw new Error('log(' + n + ')');
            return LOG_TABLE[n];
          };

          /**
           * Returns anti-log value of n inside Galois Field
           *
           * @param  {Number} n
           * @return {Number}
           */
          galoisField.exp = function exp(n) {
            return EXP_TABLE[n];
          };

          /**
           * Multiplies two number inside Galois Field
           *
           * @param  {Number} x
           * @param  {Number} y
           * @return {Number}
           */
          galoisField.mul = function mul(x, y) {
            if (x === 0 || y === 0) return 0;

            // should be EXP_TABLE[(LOG_TABLE[x] + LOG_TABLE[y]) % 255] if EXP_TABLE wasn't oversized
            // @see {@link initTables}
            return EXP_TABLE[LOG_TABLE[x] + LOG_TABLE[y]];
          };
          return galoisField;
        }
        var hasRequiredPolynomial;
        function requirePolynomial() {
          if (hasRequiredPolynomial) return polynomial;
          hasRequiredPolynomial = 1;
          (function (exports) {
            var GF = requireGaloisField();

            /**
             * Multiplies two polynomials inside Galois Field
             *
             * @param  {Uint8Array} p1 Polynomial
             * @param  {Uint8Array} p2 Polynomial
             * @return {Uint8Array}    Product of p1 and p2
             */
            exports.mul = function mul(p1, p2) {
              var coeff = new Uint8Array(p1.length + p2.length - 1);
              for (var _i31 = 0; _i31 < p1.length; _i31++) {
                for (var _j2 = 0; _j2 < p2.length; _j2++) {
                  coeff[_i31 + _j2] ^= GF.mul(p1[_i31], p2[_j2]);
                }
              }
              return coeff;
            };

            /**
             * Calculate the remainder of polynomials division
             *
             * @param  {Uint8Array} divident Polynomial
             * @param  {Uint8Array} divisor  Polynomial
             * @return {Uint8Array}          Remainder
             */
            exports.mod = function mod(divident, divisor) {
              var result = new Uint8Array(divident);
              while (result.length - divisor.length >= 0) {
                var coeff = result[0];
                for (var _i32 = 0; _i32 < divisor.length; _i32++) {
                  result[_i32] ^= GF.mul(divisor[_i32], coeff);
                }

                // remove all zeros from buffer head
                var offset = 0;
                while (offset < result.length && result[offset] === 0) offset++;
                result = result.slice(offset);
              }
              return result;
            };

            /**
             * Generate an irreducible generator polynomial of specified degree
             * (used by Reed-Solomon encoder)
             *
             * @param  {Number} degree Degree of the generator polynomial
             * @return {Uint8Array}    Buffer containing polynomial coefficients
             */
            exports.generateECPolynomial = function generateECPolynomial(degree) {
              var poly = new Uint8Array([1]);
              for (var _i33 = 0; _i33 < degree; _i33++) {
                poly = exports.mul(poly, new Uint8Array([1, GF.exp(_i33)]));
              }
              return poly;
            };
          })(polynomial);
          return polynomial;
        }
        var reedSolomonEncoder;
        var hasRequiredReedSolomonEncoder;
        function requireReedSolomonEncoder() {
          if (hasRequiredReedSolomonEncoder) return reedSolomonEncoder;
          hasRequiredReedSolomonEncoder = 1;
          var Polynomial = requirePolynomial();
          function ReedSolomonEncoder(degree) {
            this.genPoly = undefined;
            this.degree = degree;
            if (this.degree) this.initialize(this.degree);
          }

          /**
           * Initialize the encoder.
           * The input param should correspond to the number of error correction codewords.
           *
           * @param  {Number} degree
           */
          ReedSolomonEncoder.prototype.initialize = function initialize(degree) {
            // create an irreducible generator polynomial
            this.degree = degree;
            this.genPoly = Polynomial.generateECPolynomial(this.degree);
          };

          /**
           * Encodes a chunk of data
           *
           * @param  {Uint8Array} data Buffer containing input data
           * @return {Uint8Array}      Buffer containing encoded data
           */
          ReedSolomonEncoder.prototype.encode = function encode(data) {
            if (!this.genPoly) {
              throw new Error('Encoder not initialized');
            }

            // Calculate EC for this data block
            // extends data size to data+genPoly size
            var paddedData = new Uint8Array(data.length + this.degree);
            paddedData.set(data);

            // The error correction codewords are the remainder after dividing the data codewords
            // by a generator polynomial
            var remainder = Polynomial.mod(paddedData, this.genPoly);

            // return EC data blocks (last n byte, where n is the degree of genPoly)
            // If coefficients number in remainder are less than genPoly degree,
            // pad with 0s to the left to reach the needed number of coefficients
            var start = this.degree - remainder.length;
            if (start > 0) {
              var buff = new Uint8Array(this.degree);
              buff.set(remainder, start);
              return buff;
            }
            return remainder;
          };
          reedSolomonEncoder = ReedSolomonEncoder;
          return reedSolomonEncoder;
        }
        var version = {};
        var mode = {};
        var versionCheck = {};

        /**
         * Check if QR Code version is valid
         *
         * @param  {Number}  version QR Code version
         * @return {Boolean}         true if valid version, false otherwise
         */

        var hasRequiredVersionCheck;
        function requireVersionCheck() {
          if (hasRequiredVersionCheck) return versionCheck;
          hasRequiredVersionCheck = 1;
          versionCheck.isValid = function isValid(version) {
            return !isNaN(version) && version >= 1 && version <= 40;
          };
          return versionCheck;
        }
        var regex = {};
        var hasRequiredRegex;
        function requireRegex() {
          if (hasRequiredRegex) return regex;
          hasRequiredRegex = 1;
          var numeric = '[0-9]+';
          var alphanumeric = '[A-Z $%*+\\-./:]+';
          var kanji = '(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|' + '[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|' + '[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|' + '[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+';
          kanji = kanji.replace(/u/g, "\\u");
          var byte = '(?:(?![A-Z0-9 $%*+\\-./:]|' + kanji + ')(?:.|[\r\n]))+';
          regex.KANJI = new RegExp(kanji, 'g');
          regex.BYTE_KANJI = new RegExp('[^A-Z0-9 $%*+\\-./:]+', 'g');
          regex.BYTE = new RegExp(byte, 'g');
          regex.NUMERIC = new RegExp(numeric, 'g');
          regex.ALPHANUMERIC = new RegExp(alphanumeric, 'g');
          var TEST_KANJI = new RegExp('^' + kanji + '$');
          var TEST_NUMERIC = new RegExp('^' + numeric + '$');
          var TEST_ALPHANUMERIC = new RegExp('^[A-Z0-9 $%*+\\-./:]+$');
          regex.testKanji = function testKanji(str) {
            return TEST_KANJI.test(str);
          };
          regex.testNumeric = function testNumeric(str) {
            return TEST_NUMERIC.test(str);
          };
          regex.testAlphanumeric = function testAlphanumeric(str) {
            return TEST_ALPHANUMERIC.test(str);
          };
          return regex;
        }
        var hasRequiredMode;
        function requireMode() {
          if (hasRequiredMode) return mode;
          hasRequiredMode = 1;
          (function (exports) {
            var VersionCheck = requireVersionCheck();
            var Regex = requireRegex();

            /**
             * Numeric mode encodes data from the decimal digit set (0 - 9)
             * (byte values 30HEX to 39HEX).
             * Normally, 3 data characters are represented by 10 bits.
             *
             * @type {Object}
             */
            exports.NUMERIC = {
              id: 'Numeric',
              bit: 1 << 0,
              ccBits: [10, 12, 14]
            };

            /**
             * Alphanumeric mode encodes data from a set of 45 characters,
             * i.e. 10 numeric digits (0 - 9),
             *      26 alphabetic characters (A - Z),
             *   and 9 symbols (SP, $, %, *, +, -, ., /, :).
             * Normally, two input characters are represented by 11 bits.
             *
             * @type {Object}
             */
            exports.ALPHANUMERIC = {
              id: 'Alphanumeric',
              bit: 1 << 1,
              ccBits: [9, 11, 13]
            };

            /**
             * In byte mode, data is encoded at 8 bits per character.
             *
             * @type {Object}
             */
            exports.BYTE = {
              id: 'Byte',
              bit: 1 << 2,
              ccBits: [8, 16, 16]
            };

            /**
             * The Kanji mode efficiently encodes Kanji characters in accordance with
             * the Shift JIS system based on JIS X 0208.
             * The Shift JIS values are shifted from the JIS X 0208 values.
             * JIS X 0208 gives details of the shift coded representation.
             * Each two-byte character value is compacted to a 13-bit binary codeword.
             *
             * @type {Object}
             */
            exports.KANJI = {
              id: 'Kanji',
              bit: 1 << 3,
              ccBits: [8, 10, 12]
            };

            /**
             * Mixed mode will contain a sequences of data in a combination of any of
             * the modes described above
             *
             * @type {Object}
             */
            exports.MIXED = {
              bit: -1
            };

            /**
             * Returns the number of bits needed to store the data length
             * according to QR Code specifications.
             *
             * @param  {Mode}   mode    Data mode
             * @param  {Number} version QR Code version
             * @return {Number}         Number of bits
             */
            exports.getCharCountIndicator = function getCharCountIndicator(mode, version) {
              if (!mode.ccBits) throw new Error('Invalid mode: ' + mode);
              if (!VersionCheck.isValid(version)) {
                throw new Error('Invalid version: ' + version);
              }
              if (version >= 1 && version < 10) return mode.ccBits[0];else if (version < 27) return mode.ccBits[1];
              return mode.ccBits[2];
            };

            /**
             * Returns the most efficient mode to store the specified data
             *
             * @param  {String} dataStr Input data string
             * @return {Mode}           Best mode
             */
            exports.getBestModeForData = function getBestModeForData(dataStr) {
              if (Regex.testNumeric(dataStr)) return exports.NUMERIC;else if (Regex.testAlphanumeric(dataStr)) return exports.ALPHANUMERIC;else if (Regex.testKanji(dataStr)) return exports.KANJI;else return exports.BYTE;
            };

            /**
             * Return mode name as string
             *
             * @param {Mode} mode Mode object
             * @returns {String}  Mode name
             */
            exports.toString = function toString(mode) {
              if (mode && mode.id) return mode.id;
              throw new Error('Invalid mode');
            };

            /**
             * Check if input param is a valid mode object
             *
             * @param   {Mode}    mode Mode object
             * @returns {Boolean} True if valid mode, false otherwise
             */
            exports.isValid = function isValid(mode) {
              return mode && mode.bit && mode.ccBits;
            };

            /**
             * Get mode object from its name
             *
             * @param   {String} string Mode name
             * @returns {Mode}          Mode object
             */
            function fromString(string) {
              if (typeof string !== 'string') {
                throw new Error('Param is not a string');
              }
              var lcStr = string.toLowerCase();
              switch (lcStr) {
                case 'numeric':
                  return exports.NUMERIC;
                case 'alphanumeric':
                  return exports.ALPHANUMERIC;
                case 'kanji':
                  return exports.KANJI;
                case 'byte':
                  return exports.BYTE;
                default:
                  throw new Error('Unknown mode: ' + string);
              }
            }

            /**
             * Returns mode from a value.
             * If value is not a valid mode, returns defaultValue
             *
             * @param  {Mode|String} value        Encoding mode
             * @param  {Mode}        defaultValue Fallback value
             * @return {Mode}                     Encoding mode
             */
            exports.from = function from(value, defaultValue) {
              if (exports.isValid(value)) {
                return value;
              }
              try {
                return fromString(value);
              } catch (e) {
                return defaultValue;
              }
            };
          })(mode);
          return mode;
        }
        var hasRequiredVersion;
        function requireVersion() {
          if (hasRequiredVersion) return version;
          hasRequiredVersion = 1;
          (function (exports) {
            var Utils = requireUtils$1();
            var ECCode = requireErrorCorrectionCode();
            var ECLevel = requireErrorCorrectionLevel();
            var Mode = requireMode();
            var VersionCheck = requireVersionCheck();

            // Generator polynomial used to encode version information
            var G18 = 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0;
            var G18_BCH = Utils.getBCHDigit(G18);
            function getBestVersionForDataLength(mode, length, errorCorrectionLevel) {
              for (var currentVersion = 1; currentVersion <= 40; currentVersion++) {
                if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, mode)) {
                  return currentVersion;
                }
              }
              return undefined;
            }
            function getReservedBitsCount(mode, version) {
              // Character count indicator + mode indicator bits
              return Mode.getCharCountIndicator(mode, version) + 4;
            }
            function getTotalBitsFromDataArray(segments, version) {
              var totalBits = 0;
              segments.forEach(function (data) {
                var reservedBits = getReservedBitsCount(data.mode, version);
                totalBits += reservedBits + data.getBitsLength();
              });
              return totalBits;
            }
            function getBestVersionForMixedData(segments, errorCorrectionLevel) {
              for (var currentVersion = 1; currentVersion <= 40; currentVersion++) {
                var length = getTotalBitsFromDataArray(segments, currentVersion);
                if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, Mode.MIXED)) {
                  return currentVersion;
                }
              }
              return undefined;
            }

            /**
             * Returns version number from a value.
             * If value is not a valid version, returns defaultValue
             *
             * @param  {Number|String} value        QR Code version
             * @param  {Number}        defaultValue Fallback value
             * @return {Number}                     QR Code version number
             */
            exports.from = function from(value, defaultValue) {
              if (VersionCheck.isValid(value)) {
                return parseInt(value, 10);
              }
              return defaultValue;
            };

            /**
             * Returns how much data can be stored with the specified QR code version
             * and error correction level
             *
             * @param  {Number} version              QR Code version (1-40)
             * @param  {Number} errorCorrectionLevel Error correction level
             * @param  {Mode}   mode                 Data mode
             * @return {Number}                      Quantity of storable data
             */
            exports.getCapacity = function getCapacity(version, errorCorrectionLevel, mode) {
              if (!VersionCheck.isValid(version)) {
                throw new Error('Invalid QR Code version');
              }

              // Use Byte mode as default
              if (typeof mode === 'undefined') mode = Mode.BYTE;

              // Total codewords for this QR code version (Data + Error correction)
              var totalCodewords = Utils.getSymbolTotalCodewords(version);

              // Total number of error correction codewords
              var ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);

              // Total number of data codewords
              var dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
              if (mode === Mode.MIXED) return dataTotalCodewordsBits;
              var usableBits = dataTotalCodewordsBits - getReservedBitsCount(mode, version);

              // Return max number of storable codewords
              switch (mode) {
                case Mode.NUMERIC:
                  return Math.floor(usableBits / 10 * 3);
                case Mode.ALPHANUMERIC:
                  return Math.floor(usableBits / 11 * 2);
                case Mode.KANJI:
                  return Math.floor(usableBits / 13);
                case Mode.BYTE:
                default:
                  return Math.floor(usableBits / 8);
              }
            };

            /**
             * Returns the minimum version needed to contain the amount of data
             *
             * @param  {Segment} data                    Segment of data
             * @param  {Number} [errorCorrectionLevel=H] Error correction level
             * @param  {Mode} mode                       Data mode
             * @return {Number}                          QR Code version
             */
            exports.getBestVersionForData = function getBestVersionForData(data, errorCorrectionLevel) {
              var seg;
              var ecl = ECLevel.from(errorCorrectionLevel, ECLevel.M);
              if (Array.isArray(data)) {
                if (data.length > 1) {
                  return getBestVersionForMixedData(data, ecl);
                }
                if (data.length === 0) {
                  return 1;
                }
                seg = data[0];
              } else {
                seg = data;
              }
              return getBestVersionForDataLength(seg.mode, seg.getLength(), ecl);
            };

            /**
             * Returns version information with relative error correction bits
             *
             * The version information is included in QR Code symbols of version 7 or larger.
             * It consists of an 18-bit sequence containing 6 data bits,
             * with 12 error correction bits calculated using the (18, 6) Golay code.
             *
             * @param  {Number} version QR Code version
             * @return {Number}         Encoded version info bits
             */
            exports.getEncodedBits = function getEncodedBits(version) {
              if (!VersionCheck.isValid(version) || version < 7) {
                throw new Error('Invalid QR Code version');
              }
              var d = version << 12;
              while (Utils.getBCHDigit(d) - G18_BCH >= 0) {
                d ^= G18 << Utils.getBCHDigit(d) - G18_BCH;
              }
              return version << 12 | d;
            };
          })(version);
          return version;
        }
        var formatInfo = {};
        var hasRequiredFormatInfo;
        function requireFormatInfo() {
          if (hasRequiredFormatInfo) return formatInfo;
          hasRequiredFormatInfo = 1;
          var Utils = requireUtils$1();
          var G15 = 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0;
          var G15_MASK = 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1;
          var G15_BCH = Utils.getBCHDigit(G15);

          /**
           * Returns format information with relative error correction bits
           *
           * The format information is a 15-bit sequence containing 5 data bits,
           * with 10 error correction bits calculated using the (15, 5) BCH code.
           *
           * @param  {Number} errorCorrectionLevel Error correction level
           * @param  {Number} mask                 Mask pattern
           * @return {Number}                      Encoded format information bits
           */
          formatInfo.getEncodedBits = function getEncodedBits(errorCorrectionLevel, mask) {
            var data = errorCorrectionLevel.bit << 3 | mask;
            var d = data << 10;
            while (Utils.getBCHDigit(d) - G15_BCH >= 0) {
              d ^= G15 << Utils.getBCHDigit(d) - G15_BCH;
            }

            // xor final data with mask pattern in order to ensure that
            // no combination of Error Correction Level and data mask pattern
            // will result in an all-zero data string
            return (data << 10 | d) ^ G15_MASK;
          };
          return formatInfo;
        }
        var segments = {};
        var numericData;
        var hasRequiredNumericData;
        function requireNumericData() {
          if (hasRequiredNumericData) return numericData;
          hasRequiredNumericData = 1;
          var Mode = requireMode();
          function NumericData(data) {
            this.mode = Mode.NUMERIC;
            this.data = data.toString();
          }
          NumericData.getBitsLength = function getBitsLength(length) {
            return 10 * Math.floor(length / 3) + (length % 3 ? length % 3 * 3 + 1 : 0);
          };
          NumericData.prototype.getLength = function getLength() {
            return this.data.length;
          };
          NumericData.prototype.getBitsLength = function getBitsLength() {
            return NumericData.getBitsLength(this.data.length);
          };
          NumericData.prototype.write = function write(bitBuffer) {
            var i, group, value;

            // The input data string is divided into groups of three digits,
            // and each group is converted to its 10-bit binary equivalent.
            for (i = 0; i + 3 <= this.data.length; i += 3) {
              group = this.data.substr(i, 3);
              value = parseInt(group, 10);
              bitBuffer.put(value, 10);
            }

            // If the number of input digits is not an exact multiple of three,
            // the final one or two digits are converted to 4 or 7 bits respectively.
            var remainingNum = this.data.length - i;
            if (remainingNum > 0) {
              group = this.data.substr(i);
              value = parseInt(group, 10);
              bitBuffer.put(value, remainingNum * 3 + 1);
            }
          };
          numericData = NumericData;
          return numericData;
        }
        var alphanumericData;
        var hasRequiredAlphanumericData;
        function requireAlphanumericData() {
          if (hasRequiredAlphanumericData) return alphanumericData;
          hasRequiredAlphanumericData = 1;
          var Mode = requireMode();

          /**
           * Array of characters available in alphanumeric mode
           *
           * As per QR Code specification, to each character
           * is assigned a value from 0 to 44 which in this case coincides
           * with the array index
           *
           * @type {Array}
           */
          var ALPHA_NUM_CHARS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', ' ', '$', '%', '*', '+', '-', '.', '/', ':'];
          function AlphanumericData(data) {
            this.mode = Mode.ALPHANUMERIC;
            this.data = data;
          }
          AlphanumericData.getBitsLength = function getBitsLength(length) {
            return 11 * Math.floor(length / 2) + 6 * (length % 2);
          };
          AlphanumericData.prototype.getLength = function getLength() {
            return this.data.length;
          };
          AlphanumericData.prototype.getBitsLength = function getBitsLength() {
            return AlphanumericData.getBitsLength(this.data.length);
          };
          AlphanumericData.prototype.write = function write(bitBuffer) {
            var i;

            // Input data characters are divided into groups of two characters
            // and encoded as 11-bit binary codes.
            for (i = 0; i + 2 <= this.data.length; i += 2) {
              // The character value of the first character is multiplied by 45
              var value = ALPHA_NUM_CHARS.indexOf(this.data[i]) * 45;

              // The character value of the second digit is added to the product
              value += ALPHA_NUM_CHARS.indexOf(this.data[i + 1]);

              // The sum is then stored as 11-bit binary number
              bitBuffer.put(value, 11);
            }

            // If the number of input data characters is not a multiple of two,
            // the character value of the final character is encoded as a 6-bit binary number.
            if (this.data.length % 2) {
              bitBuffer.put(ALPHA_NUM_CHARS.indexOf(this.data[i]), 6);
            }
          };
          alphanumericData = AlphanumericData;
          return alphanumericData;
        }
        var encodeUtf8;
        var hasRequiredEncodeUtf8;
        function requireEncodeUtf8() {
          if (hasRequiredEncodeUtf8) return encodeUtf8;
          hasRequiredEncodeUtf8 = 1;
          encodeUtf8 = function encodeUtf8(input) {
            var result = [];
            var size = input.length;
            for (var index = 0; index < size; index++) {
              var point = input.charCodeAt(index);
              if (point >= 0xD800 && point <= 0xDBFF && size > index + 1) {
                var second = input.charCodeAt(index + 1);
                if (second >= 0xDC00 && second <= 0xDFFF) {
                  // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
                  point = (point - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
                  index += 1;
                }
              }

              // US-ASCII
              if (point < 0x80) {
                result.push(point);
                continue;
              }

              // 2-byte UTF-8
              if (point < 0x800) {
                result.push(point >> 6 | 192);
                result.push(point & 63 | 128);
                continue;
              }

              // 3-byte UTF-8
              if (point < 0xD800 || point >= 0xE000 && point < 0x10000) {
                result.push(point >> 12 | 224);
                result.push(point >> 6 & 63 | 128);
                result.push(point & 63 | 128);
                continue;
              }

              // 4-byte UTF-8
              if (point >= 0x10000 && point <= 0x10FFFF) {
                result.push(point >> 18 | 240);
                result.push(point >> 12 & 63 | 128);
                result.push(point >> 6 & 63 | 128);
                result.push(point & 63 | 128);
                continue;
              }

              // Invalid character
              result.push(0xEF, 0xBF, 0xBD);
            }
            return new Uint8Array(result).buffer;
          };
          return encodeUtf8;
        }
        var byteData;
        var hasRequiredByteData;
        function requireByteData() {
          if (hasRequiredByteData) return byteData;
          hasRequiredByteData = 1;
          var encodeUtf8 = requireEncodeUtf8();
          var Mode = requireMode();
          function ByteData(data) {
            this.mode = Mode.BYTE;
            if (typeof data === 'string') {
              data = encodeUtf8(data);
            }
            this.data = new Uint8Array(data);
          }
          ByteData.getBitsLength = function getBitsLength(length) {
            return length * 8;
          };
          ByteData.prototype.getLength = function getLength() {
            return this.data.length;
          };
          ByteData.prototype.getBitsLength = function getBitsLength() {
            return ByteData.getBitsLength(this.data.length);
          };
          ByteData.prototype.write = function (bitBuffer) {
            for (var _i34 = 0, _l4 = this.data.length; _i34 < _l4; _i34++) {
              bitBuffer.put(this.data[_i34], 8);
            }
          };
          byteData = ByteData;
          return byteData;
        }
        var kanjiData;
        var hasRequiredKanjiData;
        function requireKanjiData() {
          if (hasRequiredKanjiData) return kanjiData;
          hasRequiredKanjiData = 1;
          var Mode = requireMode();
          var Utils = requireUtils$1();
          function KanjiData(data) {
            this.mode = Mode.KANJI;
            this.data = data;
          }
          KanjiData.getBitsLength = function getBitsLength(length) {
            return length * 13;
          };
          KanjiData.prototype.getLength = function getLength() {
            return this.data.length;
          };
          KanjiData.prototype.getBitsLength = function getBitsLength() {
            return KanjiData.getBitsLength(this.data.length);
          };
          KanjiData.prototype.write = function (bitBuffer) {
            var i;

            // In the Shift JIS system, Kanji characters are represented by a two byte combination.
            // These byte values are shifted from the JIS X 0208 values.
            // JIS X 0208 gives details of the shift coded representation.
            for (i = 0; i < this.data.length; i++) {
              var value = Utils.toSJIS(this.data[i]);

              // For characters with Shift JIS values from 0x8140 to 0x9FFC:
              if (value >= 0x8140 && value <= 0x9FFC) {
                // Subtract 0x8140 from Shift JIS value
                value -= 0x8140;

                // For characters with Shift JIS values from 0xE040 to 0xEBBF
              } else if (value >= 0xE040 && value <= 0xEBBF) {
                // Subtract 0xC140 from Shift JIS value
                value -= 0xC140;
              } else {
                throw new Error('Invalid SJIS character: ' + this.data[i] + '\n' + 'Make sure your charset is UTF-8');
              }

              // Multiply most significant byte of result by 0xC0
              // and add least significant byte to product
              value = (value >>> 8 & 0xff) * 0xC0 + (value & 0xff);

              // Convert result to a 13-bit binary string
              bitBuffer.put(value, 13);
            }
          };
          kanjiData = KanjiData;
          return kanjiData;
        }
        var dijkstra = {
          exports: {}
        };
        var hasRequiredDijkstra;
        function requireDijkstra() {
          if (hasRequiredDijkstra) return dijkstra.exports;
          hasRequiredDijkstra = 1;
          (function (module) {
            /******************************************************************************
             * Created 2008-08-19.
             *
             * Dijkstra path-finding functions. Adapted from the Dijkstar Python project.
             *
             * Copyright (C) 2008
             *   Wyatt Baldwin <self@wyattbaldwin.com>
             *   All rights reserved
             *
             * Licensed under the MIT license.
             *
             *   http://www.opensource.org/licenses/mit-license.php
             *
             * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
             * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
             * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
             * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
             * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
             * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
             * THE SOFTWARE.
             *****************************************************************************/
            var dijkstra = {
              single_source_shortest_paths: function single_source_shortest_paths(graph, s, d) {
                // Predecessor map for each node that has been encountered.
                // node ID => predecessor node ID
                var predecessors = {};

                // Costs of shortest paths from s to all nodes encountered.
                // node ID => cost
                var costs = {};
                costs[s] = 0;

                // Costs of shortest paths from s to all nodes encountered; differs from
                // `costs` in that it provides easy access to the node that currently has
                // the known shortest path from s.
                // XXX: Do we actually need both `costs` and `open`?
                var open = dijkstra.PriorityQueue.make();
                open.push(s, 0);
                var closest, u, v, cost_of_s_to_u, adjacent_nodes, cost_of_e, cost_of_s_to_u_plus_cost_of_e, cost_of_s_to_v, first_visit;
                while (!open.empty()) {
                  // In the nodes remaining in graph that have a known cost from s,
                  // find the node, u, that currently has the shortest path from s.
                  closest = open.pop();
                  u = closest.value;
                  cost_of_s_to_u = closest.cost;

                  // Get nodes adjacent to u...
                  adjacent_nodes = graph[u] || {};

                  // ...and explore the edges that connect u to those nodes, updating
                  // the cost of the shortest paths to any or all of those nodes as
                  // necessary. v is the node across the current edge from u.
                  for (v in adjacent_nodes) {
                    if (adjacent_nodes.hasOwnProperty(v)) {
                      // Get the cost of the edge running from u to v.
                      cost_of_e = adjacent_nodes[v];

                      // Cost of s to u plus the cost of u to v across e--this is *a*
                      // cost from s to v that may or may not be less than the current
                      // known cost to v.
                      cost_of_s_to_u_plus_cost_of_e = cost_of_s_to_u + cost_of_e;

                      // If we haven't visited v yet OR if the current known cost from s to
                      // v is greater than the new cost we just found (cost of s to u plus
                      // cost of u to v across e), update v's cost in the cost list and
                      // update v's predecessor in the predecessor list (it's now u).
                      cost_of_s_to_v = costs[v];
                      first_visit = typeof costs[v] === 'undefined';
                      if (first_visit || cost_of_s_to_v > cost_of_s_to_u_plus_cost_of_e) {
                        costs[v] = cost_of_s_to_u_plus_cost_of_e;
                        open.push(v, cost_of_s_to_u_plus_cost_of_e);
                        predecessors[v] = u;
                      }
                    }
                  }
                }
                if (typeof d !== 'undefined' && typeof costs[d] === 'undefined') {
                  var msg = ['Could not find a path from ', s, ' to ', d, '.'].join('');
                  throw new Error(msg);
                }
                return predecessors;
              },
              extract_shortest_path_from_predecessor_list: function extract_shortest_path_from_predecessor_list(predecessors, d) {
                var nodes = [];
                var u = d;
                while (u) {
                  nodes.push(u);
                  predecessors[u];
                  u = predecessors[u];
                }
                nodes.reverse();
                return nodes;
              },
              find_path: function find_path(graph, s, d) {
                var predecessors = dijkstra.single_source_shortest_paths(graph, s, d);
                return dijkstra.extract_shortest_path_from_predecessor_list(predecessors, d);
              },
              /**
               * A very naive priority queue implementation.
               */
              PriorityQueue: {
                make: function make(opts) {
                  var T = dijkstra.PriorityQueue,
                    t = {},
                    key;
                  opts = opts || {};
                  for (key in T) {
                    if (T.hasOwnProperty(key)) {
                      t[key] = T[key];
                    }
                  }
                  t.queue = [];
                  t.sorter = opts.sorter || T.default_sorter;
                  return t;
                },
                default_sorter: function default_sorter(a, b) {
                  return a.cost - b.cost;
                },
                /**
                 * Add a new item to the queue and ensure the highest priority element
                 * is at the front of the queue.
                 */
                push: function push(value, cost) {
                  var item = {
                    value: value,
                    cost: cost
                  };
                  this.queue.push(item);
                  this.queue.sort(this.sorter);
                },
                /**
                 * Return the highest priority element in the queue.
                 */
                pop: function pop() {
                  return this.queue.shift();
                },
                empty: function empty() {
                  return this.queue.length === 0;
                }
              }
            };

            // node.js module exports
            {
              module.exports = dijkstra;
            }
          })(dijkstra);
          return dijkstra.exports;
        }
        var hasRequiredSegments;
        function requireSegments() {
          if (hasRequiredSegments) return segments;
          hasRequiredSegments = 1;
          (function (exports) {
            var Mode = requireMode();
            var NumericData = requireNumericData();
            var AlphanumericData = requireAlphanumericData();
            var ByteData = requireByteData();
            var KanjiData = requireKanjiData();
            var Regex = requireRegex();
            var Utils = requireUtils$1();
            var dijkstra = requireDijkstra();

            /**
             * Returns UTF8 byte length
             *
             * @param  {String} str Input string
             * @return {Number}     Number of byte
             */
            function getStringByteLength(str) {
              return unescape(encodeURIComponent(str)).length;
            }

            /**
             * Get a list of segments of the specified mode
             * from a string
             *
             * @param  {Mode}   mode Segment mode
             * @param  {String} str  String to process
             * @return {Array}       Array of object with segments data
             */
            function getSegments(regex, mode, str) {
              var segments = [];
              var result;
              while ((result = regex.exec(str)) !== null) {
                segments.push({
                  data: result[0],
                  index: result.index,
                  mode: mode,
                  length: result[0].length
                });
              }
              return segments;
            }

            /**
             * Extracts a series of segments with the appropriate
             * modes from a string
             *
             * @param  {String} dataStr Input string
             * @return {Array}          Array of object with segments data
             */
            function getSegmentsFromString(dataStr) {
              var numSegs = getSegments(Regex.NUMERIC, Mode.NUMERIC, dataStr);
              var alphaNumSegs = getSegments(Regex.ALPHANUMERIC, Mode.ALPHANUMERIC, dataStr);
              var byteSegs;
              var kanjiSegs;
              if (Utils.isKanjiModeEnabled()) {
                byteSegs = getSegments(Regex.BYTE, Mode.BYTE, dataStr);
                kanjiSegs = getSegments(Regex.KANJI, Mode.KANJI, dataStr);
              } else {
                byteSegs = getSegments(Regex.BYTE_KANJI, Mode.BYTE, dataStr);
                kanjiSegs = [];
              }
              var segs = numSegs.concat(alphaNumSegs, byteSegs, kanjiSegs);
              return segs.sort(function (s1, s2) {
                return s1.index - s2.index;
              }).map(function (obj) {
                return {
                  data: obj.data,
                  mode: obj.mode,
                  length: obj.length
                };
              });
            }

            /**
             * Returns how many bits are needed to encode a string of
             * specified length with the specified mode
             *
             * @param  {Number} length String length
             * @param  {Mode} mode     Segment mode
             * @return {Number}        Bit length
             */
            function getSegmentBitsLength(length, mode) {
              switch (mode) {
                case Mode.NUMERIC:
                  return NumericData.getBitsLength(length);
                case Mode.ALPHANUMERIC:
                  return AlphanumericData.getBitsLength(length);
                case Mode.KANJI:
                  return KanjiData.getBitsLength(length);
                case Mode.BYTE:
                  return ByteData.getBitsLength(length);
              }
            }

            /**
             * Merges adjacent segments which have the same mode
             *
             * @param  {Array} segs Array of object with segments data
             * @return {Array}      Array of object with segments data
             */
            function mergeSegments(segs) {
              return segs.reduce(function (acc, curr) {
                var prevSeg = acc.length - 1 >= 0 ? acc[acc.length - 1] : null;
                if (prevSeg && prevSeg.mode === curr.mode) {
                  acc[acc.length - 1].data += curr.data;
                  return acc;
                }
                acc.push(curr);
                return acc;
              }, []);
            }

            /**
             * Generates a list of all possible nodes combination which
             * will be used to build a segments graph.
             *
             * Nodes are divided by groups. Each group will contain a list of all the modes
             * in which is possible to encode the given text.
             *
             * For example the text '12345' can be encoded as Numeric, Alphanumeric or Byte.
             * The group for '12345' will contain then 3 objects, one for each
             * possible encoding mode.
             *
             * Each node represents a possible segment.
             *
             * @param  {Array} segs Array of object with segments data
             * @return {Array}      Array of object with segments data
             */
            function buildNodes(segs) {
              var nodes = [];
              for (var _i35 = 0; _i35 < segs.length; _i35++) {
                var seg = segs[_i35];
                switch (seg.mode) {
                  case Mode.NUMERIC:
                    nodes.push([seg, {
                      data: seg.data,
                      mode: Mode.ALPHANUMERIC,
                      length: seg.length
                    }, {
                      data: seg.data,
                      mode: Mode.BYTE,
                      length: seg.length
                    }]);
                    break;
                  case Mode.ALPHANUMERIC:
                    nodes.push([seg, {
                      data: seg.data,
                      mode: Mode.BYTE,
                      length: seg.length
                    }]);
                    break;
                  case Mode.KANJI:
                    nodes.push([seg, {
                      data: seg.data,
                      mode: Mode.BYTE,
                      length: getStringByteLength(seg.data)
                    }]);
                    break;
                  case Mode.BYTE:
                    nodes.push([{
                      data: seg.data,
                      mode: Mode.BYTE,
                      length: getStringByteLength(seg.data)
                    }]);
                }
              }
              return nodes;
            }

            /**
             * Builds a graph from a list of nodes.
             * All segments in each node group will be connected with all the segments of
             * the next group and so on.
             *
             * At each connection will be assigned a weight depending on the
             * segment's byte length.
             *
             * @param  {Array} nodes    Array of object with segments data
             * @param  {Number} version QR Code version
             * @return {Object}         Graph of all possible segments
             */
            function buildGraph(nodes, version) {
              var table = {};
              var graph = {
                start: {}
              };
              var prevNodeIds = ['start'];
              for (var _i36 = 0; _i36 < nodes.length; _i36++) {
                var nodeGroup = nodes[_i36];
                var currentNodeIds = [];
                for (var _j3 = 0; _j3 < nodeGroup.length; _j3++) {
                  var node = nodeGroup[_j3];
                  var _key6 = '' + _i36 + _j3;
                  currentNodeIds.push(_key6);
                  table[_key6] = {
                    node: node,
                    lastCount: 0
                  };
                  graph[_key6] = {};
                  for (var _n2 = 0; _n2 < prevNodeIds.length; _n2++) {
                    var prevNodeId = prevNodeIds[_n2];
                    if (table[prevNodeId] && table[prevNodeId].node.mode === node.mode) {
                      graph[prevNodeId][_key6] = getSegmentBitsLength(table[prevNodeId].lastCount + node.length, node.mode) - getSegmentBitsLength(table[prevNodeId].lastCount, node.mode);
                      table[prevNodeId].lastCount += node.length;
                    } else {
                      if (table[prevNodeId]) table[prevNodeId].lastCount = node.length;
                      graph[prevNodeId][_key6] = getSegmentBitsLength(node.length, node.mode) + 4 + Mode.getCharCountIndicator(node.mode, version); // switch cost
                    }
                  }
                }
                prevNodeIds = currentNodeIds;
              }
              for (var _n3 = 0; _n3 < prevNodeIds.length; _n3++) {
                graph[prevNodeIds[_n3]].end = 0;
              }
              return {
                map: graph,
                table: table
              };
            }

            /**
             * Builds a segment from a specified data and mode.
             * If a mode is not specified, the more suitable will be used.
             *
             * @param  {String} data             Input data
             * @param  {Mode | String} modesHint Data mode
             * @return {Segment}                 Segment
             */
            function buildSingleSegment(data, modesHint) {
              var mode;
              var bestMode = Mode.getBestModeForData(data);
              mode = Mode.from(modesHint, bestMode);

              // Make sure data can be encoded
              if (mode !== Mode.BYTE && mode.bit < bestMode.bit) {
                throw new Error('"' + data + '"' + ' cannot be encoded with mode ' + Mode.toString(mode) + '.\n Suggested mode is: ' + Mode.toString(bestMode));
              }

              // Use Mode.BYTE if Kanji support is disabled
              if (mode === Mode.KANJI && !Utils.isKanjiModeEnabled()) {
                mode = Mode.BYTE;
              }
              switch (mode) {
                case Mode.NUMERIC:
                  return new NumericData(data);
                case Mode.ALPHANUMERIC:
                  return new AlphanumericData(data);
                case Mode.KANJI:
                  return new KanjiData(data);
                case Mode.BYTE:
                  return new ByteData(data);
              }
            }

            /**
             * Builds a list of segments from an array.
             * Array can contain Strings or Objects with segment's info.
             *
             * For each item which is a string, will be generated a segment with the given
             * string and the more appropriate encoding mode.
             *
             * For each item which is an object, will be generated a segment with the given
             * data and mode.
             * Objects must contain at least the property "data".
             * If property "mode" is not present, the more suitable mode will be used.
             *
             * @param  {Array} array Array of objects with segments data
             * @return {Array}       Array of Segments
             */
            exports.fromArray = function fromArray(array) {
              return array.reduce(function (acc, seg) {
                if (typeof seg === 'string') {
                  acc.push(buildSingleSegment(seg, null));
                } else if (seg.data) {
                  acc.push(buildSingleSegment(seg.data, seg.mode));
                }
                return acc;
              }, []);
            };

            /**
             * Builds an optimized sequence of segments from a string,
             * which will produce the shortest possible bitstream.
             *
             * @param  {String} data    Input string
             * @param  {Number} version QR Code version
             * @return {Array}          Array of segments
             */
            exports.fromString = function fromString(data, version) {
              var segs = getSegmentsFromString(data, Utils.isKanjiModeEnabled());
              var nodes = buildNodes(segs);
              var graph = buildGraph(nodes, version);
              var path = dijkstra.find_path(graph.map, 'start', 'end');
              var optimizedSegs = [];
              for (var _i37 = 1; _i37 < path.length - 1; _i37++) {
                optimizedSegs.push(graph.table[path[_i37]].node);
              }
              return exports.fromArray(mergeSegments(optimizedSegs));
            };

            /**
             * Splits a string in various segments with the modes which
             * best represent their content.
             * The produced segments are far from being optimized.
             * The output of this function is only used to estimate a QR Code version
             * which may contain the data.
             *
             * @param  {string} data Input string
             * @return {Array}       Array of segments
             */
            exports.rawSplit = function rawSplit(data) {
              return exports.fromArray(getSegmentsFromString(data, Utils.isKanjiModeEnabled()));
            };
          })(segments);
          return segments;
        }
        var hasRequiredQrcode;
        function requireQrcode() {
          if (hasRequiredQrcode) return qrcode;
          hasRequiredQrcode = 1;
          var Utils = requireUtils$1();
          var ECLevel = requireErrorCorrectionLevel();
          var BitBuffer = requireBitBuffer();
          var BitMatrix = requireBitMatrix();
          var AlignmentPattern = requireAlignmentPattern();
          var FinderPattern = requireFinderPattern();
          var MaskPattern = requireMaskPattern();
          var ECCode = requireErrorCorrectionCode();
          var ReedSolomonEncoder = requireReedSolomonEncoder();
          var Version = requireVersion();
          var FormatInfo = requireFormatInfo();
          var Mode = requireMode();
          var Segments = requireSegments();

          /**
           * QRCode for JavaScript
           *
           * modified by Ryan Day for nodejs support
           * Copyright (c) 2011 Ryan Day
           *
           * Licensed under the MIT license:
           *   http://www.opensource.org/licenses/mit-license.php
           *
          //---------------------------------------------------------------------
          // QRCode for JavaScript
          //
          // Copyright (c) 2009 Kazuhiko Arase
          //
          // URL: http://www.d-project.com/
          //
          // Licensed under the MIT license:
          //   http://www.opensource.org/licenses/mit-license.php
          //
          // The word "QR Code" is registered trademark of
          // DENSO WAVE INCORPORATED
          //   http://www.denso-wave.com/qrcode/faqpatent-e.html
          //
          //---------------------------------------------------------------------
          */

          /**
           * Add finder patterns bits to matrix
           *
           * @param  {BitMatrix} matrix  Modules matrix
           * @param  {Number}    version QR Code version
           */
          function setupFinderPattern(matrix, version) {
            var size = matrix.size;
            var pos = FinderPattern.getPositions(version);
            for (var _i38 = 0; _i38 < pos.length; _i38++) {
              var row = pos[_i38][0];
              var col = pos[_i38][1];
              for (var _r4 = -1; _r4 <= 7; _r4++) {
                if (row + _r4 <= -1 || size <= row + _r4) continue;
                for (var _c2 = -1; _c2 <= 7; _c2++) {
                  if (col + _c2 <= -1 || size <= col + _c2) continue;
                  if (_r4 >= 0 && _r4 <= 6 && (_c2 === 0 || _c2 === 6) || _c2 >= 0 && _c2 <= 6 && (_r4 === 0 || _r4 === 6) || _r4 >= 2 && _r4 <= 4 && _c2 >= 2 && _c2 <= 4) {
                    matrix.set(row + _r4, col + _c2, true, true);
                  } else {
                    matrix.set(row + _r4, col + _c2, false, true);
                  }
                }
              }
            }
          }

          /**
           * Add timing pattern bits to matrix
           *
           * Note: this function must be called before {@link setupAlignmentPattern}
           *
           * @param  {BitMatrix} matrix Modules matrix
           */
          function setupTimingPattern(matrix) {
            var size = matrix.size;
            for (var _r5 = 8; _r5 < size - 8; _r5++) {
              var value = _r5 % 2 === 0;
              matrix.set(_r5, 6, value, true);
              matrix.set(6, _r5, value, true);
            }
          }

          /**
           * Add alignment patterns bits to matrix
           *
           * Note: this function must be called after {@link setupTimingPattern}
           *
           * @param  {BitMatrix} matrix  Modules matrix
           * @param  {Number}    version QR Code version
           */
          function setupAlignmentPattern(matrix, version) {
            var pos = AlignmentPattern.getPositions(version);
            for (var _i39 = 0; _i39 < pos.length; _i39++) {
              var row = pos[_i39][0];
              var col = pos[_i39][1];
              for (var _r6 = -2; _r6 <= 2; _r6++) {
                for (var _c3 = -2; _c3 <= 2; _c3++) {
                  if (_r6 === -2 || _r6 === 2 || _c3 === -2 || _c3 === 2 || _r6 === 0 && _c3 === 0) {
                    matrix.set(row + _r6, col + _c3, true, true);
                  } else {
                    matrix.set(row + _r6, col + _c3, false, true);
                  }
                }
              }
            }
          }

          /**
           * Add version info bits to matrix
           *
           * @param  {BitMatrix} matrix  Modules matrix
           * @param  {Number}    version QR Code version
           */
          function setupVersionInfo(matrix, version) {
            var size = matrix.size;
            var bits = Version.getEncodedBits(version);
            var row, col, mod;
            for (var _i40 = 0; _i40 < 18; _i40++) {
              row = Math.floor(_i40 / 3);
              col = _i40 % 3 + size - 8 - 3;
              mod = (bits >> _i40 & 1) === 1;
              matrix.set(row, col, mod, true);
              matrix.set(col, row, mod, true);
            }
          }

          /**
           * Add format info bits to matrix
           *
           * @param  {BitMatrix} matrix               Modules matrix
           * @param  {ErrorCorrectionLevel}    errorCorrectionLevel Error correction level
           * @param  {Number}    maskPattern          Mask pattern reference value
           */
          function setupFormatInfo(matrix, errorCorrectionLevel, maskPattern) {
            var size = matrix.size;
            var bits = FormatInfo.getEncodedBits(errorCorrectionLevel, maskPattern);
            var i, mod;
            for (i = 0; i < 15; i++) {
              mod = (bits >> i & 1) === 1;

              // vertical
              if (i < 6) {
                matrix.set(i, 8, mod, true);
              } else if (i < 8) {
                matrix.set(i + 1, 8, mod, true);
              } else {
                matrix.set(size - 15 + i, 8, mod, true);
              }

              // horizontal
              if (i < 8) {
                matrix.set(8, size - i - 1, mod, true);
              } else if (i < 9) {
                matrix.set(8, 15 - i - 1 + 1, mod, true);
              } else {
                matrix.set(8, 15 - i - 1, mod, true);
              }
            }

            // fixed module
            matrix.set(size - 8, 8, 1, true);
          }

          /**
           * Add encoded data bits to matrix
           *
           * @param  {BitMatrix}  matrix Modules matrix
           * @param  {Uint8Array} data   Data codewords
           */
          function setupData(matrix, data) {
            var size = matrix.size;
            var inc = -1;
            var row = size - 1;
            var bitIndex = 7;
            var byteIndex = 0;
            for (var col = size - 1; col > 0; col -= 2) {
              if (col === 6) col--;
              while (true) {
                for (var _c4 = 0; _c4 < 2; _c4++) {
                  if (!matrix.isReserved(row, col - _c4)) {
                    var dark = false;
                    if (byteIndex < data.length) {
                      dark = (data[byteIndex] >>> bitIndex & 1) === 1;
                    }
                    matrix.set(row, col - _c4, dark);
                    bitIndex--;
                    if (bitIndex === -1) {
                      byteIndex++;
                      bitIndex = 7;
                    }
                  }
                }
                row += inc;
                if (row < 0 || size <= row) {
                  row -= inc;
                  inc = -inc;
                  break;
                }
              }
            }
          }

          /**
           * Create encoded codewords from data input
           *
           * @param  {Number}   version              QR Code version
           * @param  {ErrorCorrectionLevel}   errorCorrectionLevel Error correction level
           * @param  {ByteData} data                 Data input
           * @return {Uint8Array}                    Buffer containing encoded codewords
           */
          function createData(version, errorCorrectionLevel, segments) {
            // Prepare data buffer
            var buffer = new BitBuffer();
            segments.forEach(function (data) {
              // prefix data with mode indicator (4 bits)
              buffer.put(data.mode.bit, 4);

              // Prefix data with character count indicator.
              // The character count indicator is a string of bits that represents the
              // number of characters that are being encoded.
              // The character count indicator must be placed after the mode indicator
              // and must be a certain number of bits long, depending on the QR version
              // and data mode
              // @see {@link Mode.getCharCountIndicator}.
              buffer.put(data.getLength(), Mode.getCharCountIndicator(data.mode, version));

              // add binary data sequence to buffer
              data.write(buffer);
            });

            // Calculate required number of bits
            var totalCodewords = Utils.getSymbolTotalCodewords(version);
            var ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
            var dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;

            // Add a terminator.
            // If the bit string is shorter than the total number of required bits,
            // a terminator of up to four 0s must be added to the right side of the string.
            // If the bit string is more than four bits shorter than the required number of bits,
            // add four 0s to the end.
            if (buffer.getLengthInBits() + 4 <= dataTotalCodewordsBits) {
              buffer.put(0, 4);
            }

            // If the bit string is fewer than four bits shorter, add only the number of 0s that
            // are needed to reach the required number of bits.

            // After adding the terminator, if the number of bits in the string is not a multiple of 8,
            // pad the string on the right with 0s to make the string's length a multiple of 8.
            while (buffer.getLengthInBits() % 8 !== 0) {
              buffer.putBit(0);
            }

            // Add pad bytes if the string is still shorter than the total number of required bits.
            // Extend the buffer to fill the data capacity of the symbol corresponding to
            // the Version and Error Correction Level by adding the Pad Codewords 11101100 (0xEC)
            // and 00010001 (0x11) alternately.
            var remainingByte = (dataTotalCodewordsBits - buffer.getLengthInBits()) / 8;
            for (var _i41 = 0; _i41 < remainingByte; _i41++) {
              buffer.put(_i41 % 2 ? 0x11 : 0xEC, 8);
            }
            return createCodewords(buffer, version, errorCorrectionLevel);
          }

          /**
           * Encode input data with Reed-Solomon and return codewords with
           * relative error correction bits
           *
           * @param  {BitBuffer} bitBuffer            Data to encode
           * @param  {Number}    version              QR Code version
           * @param  {ErrorCorrectionLevel} errorCorrectionLevel Error correction level
           * @return {Uint8Array}                     Buffer containing encoded codewords
           */
          function createCodewords(bitBuffer, version, errorCorrectionLevel) {
            // Total codewords for this QR code version (Data + Error correction)
            var totalCodewords = Utils.getSymbolTotalCodewords(version);

            // Total number of error correction codewords
            var ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);

            // Total number of data codewords
            var dataTotalCodewords = totalCodewords - ecTotalCodewords;

            // Total number of blocks
            var ecTotalBlocks = ECCode.getBlocksCount(version, errorCorrectionLevel);

            // Calculate how many blocks each group should contain
            var blocksInGroup2 = totalCodewords % ecTotalBlocks;
            var blocksInGroup1 = ecTotalBlocks - blocksInGroup2;
            var totalCodewordsInGroup1 = Math.floor(totalCodewords / ecTotalBlocks);
            var dataCodewordsInGroup1 = Math.floor(dataTotalCodewords / ecTotalBlocks);
            var dataCodewordsInGroup2 = dataCodewordsInGroup1 + 1;

            // Number of EC codewords is the same for both groups
            var ecCount = totalCodewordsInGroup1 - dataCodewordsInGroup1;

            // Initialize a Reed-Solomon encoder with a generator polynomial of degree ecCount
            var rs = new ReedSolomonEncoder(ecCount);
            var offset = 0;
            var dcData = new Array(ecTotalBlocks);
            var ecData = new Array(ecTotalBlocks);
            var maxDataSize = 0;
            var buffer = new Uint8Array(bitBuffer.buffer);

            // Divide the buffer into the required number of blocks
            for (var _b2 = 0; _b2 < ecTotalBlocks; _b2++) {
              var dataSize = _b2 < blocksInGroup1 ? dataCodewordsInGroup1 : dataCodewordsInGroup2;

              // extract a block of data from buffer
              dcData[_b2] = buffer.slice(offset, offset + dataSize);

              // Calculate EC codewords for this data block
              ecData[_b2] = rs.encode(dcData[_b2]);
              offset += dataSize;
              maxDataSize = Math.max(maxDataSize, dataSize);
            }

            // Create final data
            // Interleave the data and error correction codewords from each block
            var data = new Uint8Array(totalCodewords);
            var index = 0;
            var i, r;

            // Add data codewords
            for (i = 0; i < maxDataSize; i++) {
              for (r = 0; r < ecTotalBlocks; r++) {
                if (i < dcData[r].length) {
                  data[index++] = dcData[r][i];
                }
              }
            }

            // Apped EC codewords
            for (i = 0; i < ecCount; i++) {
              for (r = 0; r < ecTotalBlocks; r++) {
                data[index++] = ecData[r][i];
              }
            }
            return data;
          }

          /**
           * Build QR Code symbol
           *
           * @param  {String} data                 Input string
           * @param  {Number} version              QR Code version
           * @param  {ErrorCorretionLevel} errorCorrectionLevel Error level
           * @param  {MaskPattern} maskPattern     Mask pattern
           * @return {Object}                      Object containing symbol data
           */
          function createSymbol(data, version, errorCorrectionLevel, maskPattern) {
            var segments;
            if (Array.isArray(data)) {
              segments = Segments.fromArray(data);
            } else if (typeof data === 'string') {
              var estimatedVersion = version;
              if (!estimatedVersion) {
                var rawSegments = Segments.rawSplit(data);

                // Estimate best version that can contain raw splitted segments
                estimatedVersion = Version.getBestVersionForData(rawSegments, errorCorrectionLevel);
              }

              // Build optimized segments
              // If estimated version is undefined, try with the highest version
              segments = Segments.fromString(data, estimatedVersion || 40);
            } else {
              throw new Error('Invalid data');
            }

            // Get the min version that can contain data
            var bestVersion = Version.getBestVersionForData(segments, errorCorrectionLevel);

            // If no version is found, data cannot be stored
            if (!bestVersion) {
              throw new Error('The amount of data is too big to be stored in a QR Code');
            }

            // If not specified, use min version as default
            if (!version) {
              version = bestVersion;

              // Check if the specified version can contain the data
            } else if (version < bestVersion) {
              throw new Error('\n' + 'The chosen QR Code version cannot contain this amount of data.\n' + 'Minimum version required to store current data is: ' + bestVersion + '.\n');
            }
            var dataBits = createData(version, errorCorrectionLevel, segments);

            // Allocate matrix buffer
            var moduleCount = Utils.getSymbolSize(version);
            var modules = new BitMatrix(moduleCount);

            // Add function modules
            setupFinderPattern(modules, version);
            setupTimingPattern(modules);
            setupAlignmentPattern(modules, version);

            // Add temporary dummy bits for format info just to set them as reserved.
            // This is needed to prevent these bits from being masked by {@link MaskPattern.applyMask}
            // since the masking operation must be performed only on the encoding region.
            // These blocks will be replaced with correct values later in code.
            setupFormatInfo(modules, errorCorrectionLevel, 0);
            if (version >= 7) {
              setupVersionInfo(modules, version);
            }

            // Add data codewords
            setupData(modules, dataBits);
            if (isNaN(maskPattern)) {
              // Find best mask pattern
              maskPattern = MaskPattern.getBestMask(modules, setupFormatInfo.bind(null, modules, errorCorrectionLevel));
            }

            // Apply mask pattern
            MaskPattern.applyMask(maskPattern, modules);

            // Replace format info bits with correct values
            setupFormatInfo(modules, errorCorrectionLevel, maskPattern);
            return {
              modules: modules,
              version: version,
              errorCorrectionLevel: errorCorrectionLevel,
              maskPattern: maskPattern,
              segments: segments
            };
          }

          /**
           * QR Code
           *
           * @param {String | Array} data                 Input data
           * @param {Object} options                      Optional configurations
           * @param {Number} options.version              QR Code version
           * @param {String} options.errorCorrectionLevel Error correction level
           * @param {Function} options.toSJISFunc         Helper func to convert utf8 to sjis
           */
          qrcode.create = function create(data, options) {
            if (typeof data === 'undefined' || data === '') {
              throw new Error('No input text');
            }
            var errorCorrectionLevel = ECLevel.M;
            var version;
            var mask;
            if (typeof options !== 'undefined') {
              // Use higher error correction level as default
              errorCorrectionLevel = ECLevel.from(options.errorCorrectionLevel, ECLevel.M);
              version = Version.from(options.version);
              mask = MaskPattern.from(options.maskPattern);
              if (options.toSJISFunc) {
                Utils.setToSJISFunction(options.toSJISFunc);
              }
            }
            return createSymbol(data, version, errorCorrectionLevel, mask);
          };
          return qrcode;
        }
        var canvas = {};
        var utils = {};
        var hasRequiredUtils;
        function requireUtils() {
          if (hasRequiredUtils) return utils;
          hasRequiredUtils = 1;
          (function (exports) {
            function hex2rgba(hex) {
              if (typeof hex === 'number') {
                hex = hex.toString();
              }
              if (typeof hex !== 'string') {
                throw new Error('Color should be defined as hex string');
              }
              var hexCode = hex.slice().replace('#', '').split('');
              if (hexCode.length < 3 || hexCode.length === 5 || hexCode.length > 8) {
                throw new Error('Invalid hex color: ' + hex);
              }

              // Convert from short to long form (fff -> ffffff)
              if (hexCode.length === 3 || hexCode.length === 4) {
                hexCode = Array.prototype.concat.apply([], hexCode.map(function (c) {
                  return [c, c];
                }));
              }

              // Add default alpha value
              if (hexCode.length === 6) hexCode.push('F', 'F');
              var hexValue = parseInt(hexCode.join(''), 16);
              return {
                r: hexValue >> 24 & 255,
                g: hexValue >> 16 & 255,
                b: hexValue >> 8 & 255,
                a: hexValue & 255,
                hex: '#' + hexCode.slice(0, 6).join('')
              };
            }
            exports.getOptions = function getOptions(options) {
              if (!options) options = {};
              if (!options.color) options.color = {};
              var margin = typeof options.margin === 'undefined' || options.margin === null || options.margin < 0 ? 4 : options.margin;
              var width = options.width && options.width >= 21 ? options.width : undefined;
              var scale = options.scale || 4;
              return {
                width: width,
                scale: width ? 4 : scale,
                margin: margin,
                color: {
                  dark: hex2rgba(options.color.dark || '#000000ff'),
                  light: hex2rgba(options.color.light || '#ffffffff')
                },
                type: options.type,
                rendererOpts: options.rendererOpts || {}
              };
            };
            exports.getScale = function getScale(qrSize, opts) {
              return opts.width && opts.width >= qrSize + opts.margin * 2 ? opts.width / (qrSize + opts.margin * 2) : opts.scale;
            };
            exports.getImageWidth = function getImageWidth(qrSize, opts) {
              var scale = exports.getScale(qrSize, opts);
              return Math.floor((qrSize + opts.margin * 2) * scale);
            };
            exports.qrToImageData = function qrToImageData(imgData, qr, opts) {
              var size = qr.modules.size;
              var data = qr.modules.data;
              var scale = exports.getScale(size, opts);
              var symbolSize = Math.floor((size + opts.margin * 2) * scale);
              var scaledMargin = opts.margin * scale;
              var palette = [opts.color.light, opts.color.dark];
              for (var _i42 = 0; _i42 < symbolSize; _i42++) {
                for (var _j4 = 0; _j4 < symbolSize; _j4++) {
                  var posDst = (_i42 * symbolSize + _j4) * 4;
                  var pxColor = opts.color.light;
                  if (_i42 >= scaledMargin && _j4 >= scaledMargin && _i42 < symbolSize - scaledMargin && _j4 < symbolSize - scaledMargin) {
                    var iSrc = Math.floor((_i42 - scaledMargin) / scale);
                    var jSrc = Math.floor((_j4 - scaledMargin) / scale);
                    pxColor = palette[data[iSrc * size + jSrc] ? 1 : 0];
                  }
                  imgData[posDst++] = pxColor.r;
                  imgData[posDst++] = pxColor.g;
                  imgData[posDst++] = pxColor.b;
                  imgData[posDst] = pxColor.a;
                }
              }
            };
          })(utils);
          return utils;
        }
        var hasRequiredCanvas;
        function requireCanvas() {
          if (hasRequiredCanvas) return canvas;
          hasRequiredCanvas = 1;
          (function (exports) {
            var Utils = requireUtils();
            function clearCanvas(ctx, canvas, size) {
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              if (!canvas.style) canvas.style = {};
              canvas.height = size;
              canvas.width = size;
              canvas.style.height = size + 'px';
              canvas.style.width = size + 'px';
            }
            function getCanvasElement() {
              try {
                return document.createElement('canvas');
              } catch (e) {
                throw new Error('You need to specify a canvas element');
              }
            }
            exports.render = function render(qrData, canvas, options) {
              var opts = options;
              var canvasEl = canvas;
              if (typeof opts === 'undefined' && (!canvas || !canvas.getContext)) {
                opts = canvas;
                canvas = undefined;
              }
              if (!canvas) {
                canvasEl = getCanvasElement();
              }
              opts = Utils.getOptions(opts);
              var size = Utils.getImageWidth(qrData.modules.size, opts);
              var ctx = canvasEl.getContext('2d');
              var image = ctx.createImageData(size, size);
              Utils.qrToImageData(image.data, qrData, opts);
              clearCanvas(ctx, canvasEl, size);
              ctx.putImageData(image, 0, 0);
              return canvasEl;
            };
            exports.renderToDataURL = function renderToDataURL(qrData, canvas, options) {
              var opts = options;
              if (typeof opts === 'undefined' && (!canvas || !canvas.getContext)) {
                opts = canvas;
                canvas = undefined;
              }
              if (!opts) opts = {};
              var canvasEl = exports.render(qrData, canvas, opts);
              var type = opts.type || 'image/png';
              var rendererOpts = opts.rendererOpts || {};
              return canvasEl.toDataURL(type, rendererOpts.quality);
            };
          })(canvas);
          return canvas;
        }
        var svgTag = {};
        var hasRequiredSvgTag;
        function requireSvgTag() {
          if (hasRequiredSvgTag) return svgTag;
          hasRequiredSvgTag = 1;
          var Utils = requireUtils();
          function getColorAttrib(color, attrib) {
            var alpha = color.a / 255;
            var str = attrib + '="' + color.hex + '"';
            return alpha < 1 ? str + ' ' + attrib + '-opacity="' + alpha.toFixed(2).slice(1) + '"' : str;
          }
          function svgCmd(cmd, x, y) {
            var str = cmd + x;
            if (typeof y !== 'undefined') str += ' ' + y;
            return str;
          }
          function qrToPath(data, size, margin) {
            var path = '';
            var moveBy = 0;
            var newRow = false;
            var lineLength = 0;
            for (var _i43 = 0; _i43 < data.length; _i43++) {
              var col = Math.floor(_i43 % size);
              var row = Math.floor(_i43 / size);
              if (!col && !newRow) newRow = true;
              if (data[_i43]) {
                lineLength++;
                if (!(_i43 > 0 && col > 0 && data[_i43 - 1])) {
                  path += newRow ? svgCmd('M', col + margin, 0.5 + row + margin) : svgCmd('m', moveBy, 0);
                  moveBy = 0;
                  newRow = false;
                }
                if (!(col + 1 < size && data[_i43 + 1])) {
                  path += svgCmd('h', lineLength);
                  lineLength = 0;
                }
              } else {
                moveBy++;
              }
            }
            return path;
          }
          svgTag.render = function render(qrData, options, cb) {
            var opts = Utils.getOptions(options);
            var size = qrData.modules.size;
            var data = qrData.modules.data;
            var qrcodesize = size + opts.margin * 2;
            var bg = !opts.color.light.a ? '' : '<path ' + getColorAttrib(opts.color.light, 'fill') + ' d="M0 0h' + qrcodesize + 'v' + qrcodesize + 'H0z"/>';
            var path = '<path ' + getColorAttrib(opts.color.dark, 'stroke') + ' d="' + qrToPath(data, size, opts.margin) + '"/>';
            var viewBox = 'viewBox="' + '0 0 ' + qrcodesize + ' ' + qrcodesize + '"';
            var width = !opts.width ? '' : 'width="' + opts.width + '" height="' + opts.width + '" ';
            var svgTag = '<svg xmlns="http://www.w3.org/2000/svg" ' + width + viewBox + ' shape-rendering="crispEdges">' + bg + path + '</svg>\n';
            if (typeof cb === 'function') {
              cb(null, svgTag);
            }
            return svgTag;
          };
          return svgTag;
        }
        var hasRequiredBrowser;
        function requireBrowser() {
          if (hasRequiredBrowser) return browser;
          hasRequiredBrowser = 1;
          var canPromise = requireCanPromise();
          var QRCode = requireQrcode();
          var CanvasRenderer = requireCanvas();
          var SvgRenderer = requireSvgTag();
          function renderCanvas(renderFunc, canvas, text, opts, cb) {
            var args = [].slice.call(arguments, 1);
            var argsNum = args.length;
            var isLastArgCb = typeof args[argsNum - 1] === 'function';
            if (!isLastArgCb && !canPromise()) {
              throw new Error('Callback required as last argument');
            }
            if (isLastArgCb) {
              if (argsNum < 2) {
                throw new Error('Too few arguments provided');
              }
              if (argsNum === 2) {
                cb = text;
                text = canvas;
                canvas = opts = undefined;
              } else if (argsNum === 3) {
                if (canvas.getContext && typeof cb === 'undefined') {
                  cb = opts;
                  opts = undefined;
                } else {
                  cb = opts;
                  opts = text;
                  text = canvas;
                  canvas = undefined;
                }
              }
            } else {
              if (argsNum < 1) {
                throw new Error('Too few arguments provided');
              }
              if (argsNum === 1) {
                text = canvas;
                canvas = opts = undefined;
              } else if (argsNum === 2 && !canvas.getContext) {
                opts = text;
                text = canvas;
                canvas = undefined;
              }
              return new Promise(function (resolve, reject) {
                try {
                  var _data = QRCode.create(text, opts);
                  resolve(renderFunc(_data, canvas, opts));
                } catch (e) {
                  reject(e);
                }
              });
            }
            try {
              var _data2 = QRCode.create(text, opts);
              cb(null, renderFunc(_data2, canvas, opts));
            } catch (e) {
              cb(e);
            }
          }
          browser.create = QRCode.create;
          browser.toCanvas = renderCanvas.bind(null, CanvasRenderer.render);
          browser.toDataURL = renderCanvas.bind(null, CanvasRenderer.renderToDataURL);

          // only svg for now.
          browser.toString = renderCanvas.bind(null, function (data, _, opts) {
            return SvgRenderer.render(data, opts);
          });
          return browser;
        }
        var browserExports = requireBrowser();
        var Je = /*@__PURE__*/getDefaultExportFromCjs(browserExports);
        var et = Object.defineProperty,
          Be = Object.getOwnPropertySymbols,
          tt = Object.prototype.hasOwnProperty,
          ot = Object.prototype.propertyIsEnumerable,
          Ue = function Ue(e, o, r) {
            return o in e ? et(e, o, {
              enumerable: true,
              configurable: true,
              writable: true,
              value: r
            }) : e[o] = r;
          },
          ve = function ve(e, o) {
            for (var r in o || (o = {})) tt.call(o, r) && Ue(e, r, o[r]);
            if (Be) {
              var _iterator10 = _createForOfIteratorHelper(Be(o)),
                _step10;
              try {
                for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
                  var r = _step10.value;
                  ot.call(o, r) && Ue(e, r, o[r]);
                }
              } catch (err) {
                _iterator10.e(err);
              } finally {
                _iterator10.f();
              }
            }
            return e;
          };
        function rt() {
          var e;
          var o = (e = ne$1.state.themeMode) != null ? e : "dark",
            r = {
              light: {
                foreground: {
                  1: "rgb(20,20,20)",
                  2: "rgb(121,134,134)",
                  3: "rgb(158,169,169)"
                },
                background: {
                  1: "rgb(255,255,255)",
                  2: "rgb(241,243,243)",
                  3: "rgb(228,231,231)"
                },
                overlay: "rgba(0,0,0,0.1)"
              },
              dark: {
                foreground: {
                  1: "rgb(228,231,231)",
                  2: "rgb(148,158,158)",
                  3: "rgb(110,119,119)"
                },
                background: {
                  1: "rgb(20,20,20)",
                  2: "rgb(39,42,42)",
                  3: "rgb(59,64,64)"
                },
                overlay: "rgba(255,255,255,0.1)"
              }
            }[o];
          return {
            "--wcm-color-fg-1": r.foreground[1],
            "--wcm-color-fg-2": r.foreground[2],
            "--wcm-color-fg-3": r.foreground[3],
            "--wcm-color-bg-1": r.background[1],
            "--wcm-color-bg-2": r.background[2],
            "--wcm-color-bg-3": r.background[3],
            "--wcm-color-overlay": r.overlay
          };
        }
        function He() {
          return {
            "--wcm-accent-color": "#3396FF",
            "--wcm-accent-fill-color": "#FFFFFF",
            "--wcm-z-index": "89",
            "--wcm-background-color": "#3396FF",
            "--wcm-background-border-radius": "8px",
            "--wcm-container-border-radius": "30px",
            "--wcm-wallet-icon-border-radius": "15px",
            "--wcm-wallet-icon-large-border-radius": "30px",
            "--wcm-wallet-icon-small-border-radius": "7px",
            "--wcm-input-border-radius": "28px",
            "--wcm-button-border-radius": "10px",
            "--wcm-notification-border-radius": "36px",
            "--wcm-secondary-button-border-radius": "28px",
            "--wcm-icon-button-border-radius": "50%",
            "--wcm-button-hover-highlight-border-radius": "10px",
            "--wcm-text-big-bold-size": "20px",
            "--wcm-text-big-bold-weight": "600",
            "--wcm-text-big-bold-line-height": "24px",
            "--wcm-text-big-bold-letter-spacing": "-0.03em",
            "--wcm-text-big-bold-text-transform": "none",
            "--wcm-text-xsmall-bold-size": "10px",
            "--wcm-text-xsmall-bold-weight": "700",
            "--wcm-text-xsmall-bold-line-height": "12px",
            "--wcm-text-xsmall-bold-letter-spacing": "0.02em",
            "--wcm-text-xsmall-bold-text-transform": "uppercase",
            "--wcm-text-xsmall-regular-size": "12px",
            "--wcm-text-xsmall-regular-weight": "600",
            "--wcm-text-xsmall-regular-line-height": "14px",
            "--wcm-text-xsmall-regular-letter-spacing": "-0.03em",
            "--wcm-text-xsmall-regular-text-transform": "none",
            "--wcm-text-small-thin-size": "14px",
            "--wcm-text-small-thin-weight": "500",
            "--wcm-text-small-thin-line-height": "16px",
            "--wcm-text-small-thin-letter-spacing": "-0.03em",
            "--wcm-text-small-thin-text-transform": "none",
            "--wcm-text-small-regular-size": "14px",
            "--wcm-text-small-regular-weight": "600",
            "--wcm-text-small-regular-line-height": "16px",
            "--wcm-text-small-regular-letter-spacing": "-0.03em",
            "--wcm-text-small-regular-text-transform": "none",
            "--wcm-text-medium-regular-size": "16px",
            "--wcm-text-medium-regular-weight": "600",
            "--wcm-text-medium-regular-line-height": "20px",
            "--wcm-text-medium-regular-letter-spacing": "-0.03em",
            "--wcm-text-medium-regular-text-transform": "none",
            "--wcm-font-family": "-apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, Ubuntu, 'Helvetica Neue', sans-serif",
            "--wcm-font-feature-settings": "'tnum' on, 'lnum' on, 'case' on",
            "--wcm-success-color": "rgb(38,181,98)",
            "--wcm-error-color": "rgb(242, 90, 103)",
            "--wcm-overlay-background-color": "rgba(0, 0, 0, 0.3)",
            "--wcm-overlay-backdrop-filter": "none"
          };
        }
        var h = {
            getPreset: function getPreset(e) {
              return He()[e];
            },
            setTheme: function setTheme() {
              var e = document.querySelector(":root"),
                o = ne$1.state.themeVariables;
              if (e) {
                var _r7 = ve(ve(ve({}, rt()), He()), o);
                Object.entries(_r7).forEach(function (_ref9) {
                  var _ref10 = _slicedToArray(_ref9, 2),
                    a = _ref10[0],
                    t = _ref10[1];
                  return e.style.setProperty(a, t);
                });
              }
            },
            globalCss: i$4(_templateObject || (_templateObject = _taggedTemplateLiteral(["*,::after,::before{margin:0;padding:0;box-sizing:border-box;font-style:normal;text-rendering:optimizeSpeed;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-tap-highlight-color:transparent;backface-visibility:hidden}button{cursor:pointer;display:flex;justify-content:center;align-items:center;position:relative;border:none;background-color:transparent;transition:all .2s ease}@media (hover:hover) and (pointer:fine){button:active{transition:all .1s ease;transform:scale(.93)}}button::after{content:'';position:absolute;top:0;bottom:0;left:0;right:0;transition:background-color,.2s ease}button:disabled{cursor:not-allowed}button svg,button wcm-text{position:relative;z-index:1}input{border:none;outline:0;appearance:none}img{display:block}::selection{color:var(--wcm-accent-fill-color);background:var(--wcm-accent-color)}"])))
          },
          at = i$4(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["button{border-radius:var(--wcm-secondary-button-border-radius);height:28px;padding:0 10px;background-color:var(--wcm-accent-color)}button path{fill:var(--wcm-accent-fill-color)}button::after{border-radius:inherit;border:1px solid var(--wcm-color-overlay)}button:disabled::after{background-color:transparent}.wcm-icon-left svg{margin-right:5px}.wcm-icon-right svg{margin-left:5px}button:active::after{background-color:var(--wcm-color-overlay)}.wcm-ghost,.wcm-ghost:active::after,.wcm-outline{background-color:transparent}.wcm-ghost:active{opacity:.5}@media(hover:hover){button:hover::after{background-color:var(--wcm-color-overlay)}.wcm-ghost:hover::after{background-color:transparent}.wcm-ghost:hover{opacity:.5}}button:disabled{background-color:var(--wcm-color-bg-3);pointer-events:none}.wcm-ghost::after{border-color:transparent}.wcm-ghost path{fill:var(--wcm-color-fg-2)}.wcm-outline path{fill:var(--wcm-accent-color)}.wcm-outline:disabled{background-color:transparent;opacity:.5}"])));
        var lt = Object.defineProperty,
          it = Object.getOwnPropertyDescriptor,
          F = function F(e, o, r, a) {
            for (var t = a > 1 ? void 0 : a ? it(o, r) : o, l = e.length - 1, i; l >= 0; l--) (i = e[l]) && (t = (a ? i(o, r, t) : i(t)) || t);
            return a && t && lt(o, r, t), t;
          };
        var T = /*#__PURE__*/function (_s$) {
          function T() {
            var _this18;
            _classCallCheck(this, T);
            _this18 = _callSuper(this, T, arguments), _this18.disabled = false, _this18.iconLeft = void 0, _this18.iconRight = void 0, _this18.onClick = function () {
              return null;
            }, _this18.variant = "default";
            return _this18;
          }
          _inherits(T, _s$);
          return _createClass(T, [{
            key: "render",
            value: function render() {
              var e = {
                "wcm-icon-left": this.iconLeft !== void 0,
                "wcm-icon-right": this.iconRight !== void 0,
                "wcm-ghost": this.variant === "ghost",
                "wcm-outline": this.variant === "outline"
              };
              var o = "inverse";
              return this.variant === "ghost" && (o = "secondary"), this.variant === "outline" && (o = "accent"), x(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["<button class=\"", "\" ?disabled=\"", "\" @click=\"", "\">", "<wcm-text variant=\"small-regular\" color=\"", "\"><slot></slot></wcm-text>", "</button>"])), o$1(e), this.disabled, this.onClick, this.iconLeft, o, this.iconRight);
            }
          }]);
        }(s$1);
        T.styles = [h.globalCss, at], F([n$2({
          type: Boolean
        })], T.prototype, "disabled", 2), F([n$2()], T.prototype, "iconLeft", 2), F([n$2()], T.prototype, "iconRight", 2), F([n$2()], T.prototype, "onClick", 2), F([n$2()], T.prototype, "variant", 2), T = F([e$3("wcm-button")], T);
        var nt = i$4(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral([":host{display:inline-block}button{padding:0 15px 1px;height:40px;border-radius:var(--wcm-button-border-radius);color:var(--wcm-accent-fill-color);background-color:var(--wcm-accent-color)}button::after{content:'';top:0;bottom:0;left:0;right:0;position:absolute;background-color:transparent;border-radius:inherit;transition:background-color .2s ease;border:1px solid var(--wcm-color-overlay)}button:active::after{background-color:var(--wcm-color-overlay)}button:disabled{padding-bottom:0;background-color:var(--wcm-color-bg-3);color:var(--wcm-color-fg-3)}.wcm-secondary{color:var(--wcm-accent-color);background-color:transparent}.wcm-secondary::after{display:none}@media(hover:hover){button:hover::after{background-color:var(--wcm-color-overlay)}}"])));
        var ct = Object.defineProperty,
          st = Object.getOwnPropertyDescriptor,
          ue = function ue(e, o, r, a) {
            for (var t = a > 1 ? void 0 : a ? st(o, r) : o, l = e.length - 1, i; l >= 0; l--) (i = e[l]) && (t = (a ? i(o, r, t) : i(t)) || t);
            return a && t && ct(o, r, t), t;
          };
        var ee = /*#__PURE__*/function (_s$2) {
          function ee() {
            var _this19;
            _classCallCheck(this, ee);
            _this19 = _callSuper(this, ee, arguments), _this19.disabled = false, _this19.variant = "primary";
            return _this19;
          }
          _inherits(ee, _s$2);
          return _createClass(ee, [{
            key: "render",
            value: function render() {
              var e = {
                "wcm-secondary": this.variant === "secondary"
              };
              return x(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["<button ?disabled=\"", "\" class=\"", "\"><slot></slot></button>"])), this.disabled, o$1(e));
            }
          }]);
        }(s$1);
        ee.styles = [h.globalCss, nt], ue([n$2({
          type: Boolean
        })], ee.prototype, "disabled", 2), ue([n$2()], ee.prototype, "variant", 2), ee = ue([e$3("wcm-button-big")], ee);
        var dt = i$4(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral([":host{background-color:var(--wcm-color-bg-2);border-top:1px solid var(--wcm-color-bg-3)}div{padding:10px 20px;display:inherit;flex-direction:inherit;align-items:inherit;width:inherit;justify-content:inherit}"])));
        var wt = function wt(e, o, r, a) {
          for (var t = o, l = e.length - 1, i; l >= 0; l--) (i = e[l]) && (t = i(t) || t);
          return t;
        };
        var be = /*#__PURE__*/function (_s$3) {
          function be() {
            _classCallCheck(this, be);
            return _callSuper(this, be, arguments);
          }
          _inherits(be, _s$3);
          return _createClass(be, [{
            key: "render",
            value: function render() {
              return x(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["<div><slot></slot></div>"])));
            }
          }]);
        }(s$1);
        be.styles = [h.globalCss, dt], be = wt([e$3("wcm-info-footer")], be);
        var v = {
            CROSS_ICON: b(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["<svg width=\"12\" height=\"12\" viewBox=\"0 0 12 12\"><path d=\"M9.94 11A.75.75 0 1 0 11 9.94L7.414 6.353a.5.5 0 0 1 0-.708L11 2.061A.75.75 0 1 0 9.94 1L6.353 4.586a.5.5 0 0 1-.708 0L2.061 1A.75.75 0 0 0 1 2.06l3.586 3.586a.5.5 0 0 1 0 .708L1 9.939A.75.75 0 1 0 2.06 11l3.586-3.586a.5.5 0 0 1 .708 0L9.939 11Z\" fill=\"#fff\"/></svg>"]))),
            WALLET_CONNECT_LOGO: b(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["<svg width=\"178\" height=\"29\" viewBox=\"0 0 178 29\" id=\"wcm-wc-logo\"><path d=\"M10.683 7.926c5.284-5.17 13.85-5.17 19.134 0l.636.623a.652.652 0 0 1 0 .936l-2.176 2.129a.343.343 0 0 1-.478 0l-.875-.857c-3.686-3.607-9.662-3.607-13.348 0l-.937.918a.343.343 0 0 1-.479 0l-2.175-2.13a.652.652 0 0 1 0-.936l.698-.683Zm23.633 4.403 1.935 1.895a.652.652 0 0 1 0 .936l-8.73 8.543a.687.687 0 0 1-.956 0L20.37 17.64a.172.172 0 0 0-.239 0l-6.195 6.063a.687.687 0 0 1-.957 0l-8.73-8.543a.652.652 0 0 1 0-.936l1.936-1.895a.687.687 0 0 1 .957 0l6.196 6.064a.172.172 0 0 0 .239 0l6.195-6.064a.687.687 0 0 1 .957 0l6.196 6.064a.172.172 0 0 0 .24 0l6.195-6.064a.687.687 0 0 1 .956 0ZM48.093 20.948l2.338-9.355c.139-.515.258-1.07.416-1.942.12.872.258 1.427.357 1.942l2.022 9.355h4.181l3.528-13.874h-3.21l-1.943 8.523a24.825 24.825 0 0 0-.456 2.457c-.158-.931-.317-1.625-.495-2.438l-1.883-8.542h-4.201l-2.042 8.542a41.204 41.204 0 0 0-.475 2.438 41.208 41.208 0 0 0-.476-2.438l-1.903-8.542h-3.349l3.508 13.874h4.083ZM63.33 21.304c1.585 0 2.596-.654 3.11-1.605-.059.297-.078.595-.078.892v.357h2.655V15.22c0-2.735-1.248-4.32-4.3-4.32-2.636 0-4.36 1.466-4.52 3.487h2.914c.1-.891.734-1.426 1.705-1.426.911 0 1.407.515 1.407 1.11 0 .435-.258.693-1.03.792l-1.388.159c-2.061.257-3.825 1.01-3.825 3.19 0 1.982 1.645 3.092 3.35 3.092Zm.891-2.041c-.773 0-1.348-.436-1.348-1.19 0-.733.655-1.09 1.645-1.268l.674-.119c.575-.118.892-.218 1.09-.396v.912c0 1.228-.892 2.06-2.06 2.06ZM70.398 7.074v13.874h2.874V7.074h-2.874ZM74.934 7.074v13.874h2.874V7.074h-2.874ZM84.08 21.304c2.735 0 4.5-1.546 4.697-3.567h-2.893c-.139.892-.892 1.387-1.804 1.387-1.228 0-2.12-.99-2.14-2.358h6.897v-.555c0-3.21-1.764-5.312-4.816-5.312-2.933 0-4.994 2.062-4.994 5.173 0 3.37 2.12 5.232 5.053 5.232Zm-2.16-6.421c.119-1.11.932-1.922 2.081-1.922 1.11 0 1.883.772 1.903 1.922H81.92ZM94.92 21.146c.633 0 1.248-.1 1.525-.179v-2.18c-.218.04-.475.06-.693.06-1.05 0-1.427-.595-1.427-1.566v-3.805h2.338v-2.24h-2.338V7.788H91.47v3.448H89.37v2.24h2.1v4.201c0 2.3 1.15 3.469 3.45 3.469ZM104.62 21.304c3.924 0 6.302-2.299 6.599-5.608h-3.111c-.238 1.803-1.506 3.032-3.369 3.032-2.2 0-3.746-1.784-3.746-4.796 0-2.953 1.605-4.638 3.805-4.638 1.883 0 2.953 1.15 3.171 2.834h3.191c-.317-3.448-2.854-5.41-6.342-5.41-3.984 0-7.036 2.695-7.036 7.214 0 4.677 2.676 7.372 6.838 7.372ZM117.449 21.304c2.993 0 5.114-1.882 5.114-5.172 0-3.23-2.121-5.233-5.114-5.233-2.972 0-5.093 2.002-5.093 5.233 0 3.29 2.101 5.172 5.093 5.172Zm0-2.22c-1.327 0-2.18-1.09-2.18-2.952 0-1.903.892-2.973 2.18-2.973 1.308 0 2.2 1.07 2.2 2.973 0 1.862-.872 2.953-2.2 2.953ZM126.569 20.948v-5.689c0-1.208.753-2.1 1.823-2.1 1.011 0 1.606.773 1.606 2.06v5.729h2.873v-6.144c0-2.339-1.229-3.905-3.428-3.905-1.526 0-2.458.734-2.953 1.606a5.31 5.31 0 0 0 .079-.892v-.377h-2.874v9.712h2.874ZM137.464 20.948v-5.689c0-1.208.753-2.1 1.823-2.1 1.011 0 1.606.773 1.606 2.06v5.729h2.873v-6.144c0-2.339-1.228-3.905-3.428-3.905-1.526 0-2.458.734-2.953 1.606a5.31 5.31 0 0 0 .079-.892v-.377h-2.874v9.712h2.874ZM149.949 21.304c2.735 0 4.499-1.546 4.697-3.567h-2.893c-.139.892-.892 1.387-1.804 1.387-1.228 0-2.12-.99-2.14-2.358h6.897v-.555c0-3.21-1.764-5.312-4.816-5.312-2.933 0-4.994 2.062-4.994 5.173 0 3.37 2.12 5.232 5.053 5.232Zm-2.16-6.421c.119-1.11.932-1.922 2.081-1.922 1.11 0 1.883.772 1.903 1.922h-3.984ZM160.876 21.304c3.013 0 4.658-1.645 4.975-4.201h-2.874c-.099 1.07-.713 1.982-2.001 1.982-1.309 0-2.2-1.21-2.2-2.993 0-1.942 1.03-2.933 2.259-2.933 1.209 0 1.803.872 1.883 1.882h2.873c-.218-2.358-1.823-4.142-4.776-4.142-2.874 0-5.153 1.903-5.153 5.193 0 3.25 1.923 5.212 5.014 5.212ZM172.067 21.146c.634 0 1.248-.1 1.526-.179v-2.18c-.218.04-.476.06-.694.06-1.05 0-1.427-.595-1.427-1.566v-3.805h2.339v-2.24h-2.339V7.788h-2.854v3.448h-2.1v2.24h2.1v4.201c0 2.3 1.15 3.469 3.449 3.469Z\" fill=\"#fff\"/></svg>"]))),
            WALLET_CONNECT_ICON: b(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["<svg width=\"28\" height=\"20\" viewBox=\"0 0 28 20\"><g clip-path=\"url(#a)\"><path d=\"M7.386 6.482c3.653-3.576 9.575-3.576 13.228 0l.44.43a.451.451 0 0 1 0 .648L19.55 9.033a.237.237 0 0 1-.33 0l-.606-.592c-2.548-2.496-6.68-2.496-9.228 0l-.648.634a.237.237 0 0 1-.33 0L6.902 7.602a.451.451 0 0 1 0-.647l.483-.473Zm16.338 3.046 1.339 1.31a.451.451 0 0 1 0 .648l-6.035 5.909a.475.475 0 0 1-.662 0L14.083 13.2a.119.119 0 0 0-.166 0l-4.283 4.194a.475.475 0 0 1-.662 0l-6.035-5.91a.451.451 0 0 1 0-.647l1.338-1.31a.475.475 0 0 1 .662 0l4.283 4.194c.046.044.12.044.166 0l4.283-4.194a.475.475 0 0 1 .662 0l4.283 4.194c.046.044.12.044.166 0l4.283-4.194a.475.475 0 0 1 .662 0Z\" fill=\"#000000\"/></g><defs><clipPath id=\"a\"><path fill=\"#ffffff\" d=\"M0 0h28v20H0z\"/></clipPath></defs></svg>"]))),
            WALLET_CONNECT_ICON_COLORED: b(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["<svg width=\"96\" height=\"96\" fill=\"none\"><path fill=\"#fff\" d=\"M25.322 33.597c12.525-12.263 32.83-12.263 45.355 0l1.507 1.476a1.547 1.547 0 0 1 0 2.22l-5.156 5.048a.814.814 0 0 1-1.134 0l-2.074-2.03c-8.737-8.555-22.903-8.555-31.64 0l-2.222 2.175a.814.814 0 0 1-1.134 0l-5.156-5.049a1.547 1.547 0 0 1 0-2.22l1.654-1.62Zm56.019 10.44 4.589 4.494a1.547 1.547 0 0 1 0 2.22l-20.693 20.26a1.628 1.628 0 0 1-2.267 0L48.283 56.632a.407.407 0 0 0-.567 0L33.03 71.012a1.628 1.628 0 0 1-2.268 0L10.07 50.75a1.547 1.547 0 0 1 0-2.22l4.59-4.494a1.628 1.628 0 0 1 2.267 0l14.687 14.38c.156.153.41.153.567 0l14.685-14.38a1.628 1.628 0 0 1 2.268 0l14.687 14.38c.156.153.41.153.567 0l14.686-14.38a1.628 1.628 0 0 1 2.268 0Z\"/><path stroke=\"#000\" d=\"M25.672 33.954c12.33-12.072 32.325-12.072 44.655 0l1.508 1.476a1.047 1.047 0 0 1 0 1.506l-5.157 5.048a.314.314 0 0 1-.434 0l-2.074-2.03c-8.932-8.746-23.409-8.746-32.34 0l-2.222 2.174a.314.314 0 0 1-.434 0l-5.157-5.048a1.047 1.047 0 0 1 0-1.506l1.655-1.62Zm55.319 10.44 4.59 4.494a1.047 1.047 0 0 1 0 1.506l-20.694 20.26a1.128 1.128 0 0 1-1.568 0l-14.686-14.38a.907.907 0 0 0-1.267 0L32.68 70.655a1.128 1.128 0 0 1-1.568 0L10.42 50.394a1.047 1.047 0 0 1 0-1.506l4.59-4.493a1.128 1.128 0 0 1 1.567 0l14.687 14.379a.907.907 0 0 0 1.266 0l-.35-.357.35.357 14.686-14.38a1.128 1.128 0 0 1 1.568 0l14.687 14.38a.907.907 0 0 0 1.267 0l14.686-14.38a1.128 1.128 0 0 1 1.568 0Z\"/></svg>"]))),
            BACK_ICON: b(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["<svg width=\"10\" height=\"18\" viewBox=\"0 0 10 18\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M8.735.179a.75.75 0 0 1 .087 1.057L2.92 8.192a1.25 1.25 0 0 0 0 1.617l5.902 6.956a.75.75 0 1 1-1.144.97L1.776 10.78a2.75 2.75 0 0 1 0-3.559L7.678.265A.75.75 0 0 1 8.735.18Z\" fill=\"#fff\"/></svg>"]))),
            COPY_ICON: b(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["<svg width=\"24\" height=\"24\" fill=\"none\"><path fill=\"#fff\" fill-rule=\"evenodd\" d=\"M7.01 7.01c.03-1.545.138-2.5.535-3.28A5 5 0 0 1 9.73 1.545C10.8 1 12.2 1 15 1c2.8 0 4.2 0 5.27.545a5 5 0 0 1 2.185 2.185C23 4.8 23 6.2 23 9c0 2.8 0 4.2-.545 5.27a5 5 0 0 1-2.185 2.185c-.78.397-1.735.505-3.28.534l-.001.01c-.03 1.54-.138 2.493-.534 3.27a5 5 0 0 1-2.185 2.186C13.2 23 11.8 23 9 23c-2.8 0-4.2 0-5.27-.545a5 5 0 0 1-2.185-2.185C1 19.2 1 17.8 1 15c0-2.8 0-4.2.545-5.27A5 5 0 0 1 3.73 7.545C4.508 7.149 5.46 7.04 7 7.01h.01ZM15 15.5c-1.425 0-2.403-.001-3.162-.063-.74-.06-1.139-.172-1.427-.319a3.5 3.5 0 0 1-1.53-1.529c-.146-.288-.257-.686-.318-1.427C8.501 11.403 8.5 10.425 8.5 9c0-1.425.001-2.403.063-3.162.06-.74.172-1.139.318-1.427a3.5 3.5 0 0 1 1.53-1.53c.288-.146.686-.257 1.427-.318.759-.062 1.737-.063 3.162-.063 1.425 0 2.403.001 3.162.063.74.06 1.139.172 1.427.318a3.5 3.5 0 0 1 1.53 1.53c.146.288.257.686.318 1.427.062.759.063 1.737.063 3.162 0 1.425-.001 2.403-.063 3.162-.06.74-.172 1.139-.319 1.427a3.5 3.5 0 0 1-1.529 1.53c-.288.146-.686.257-1.427.318-.759.062-1.737.063-3.162.063ZM7 8.511c-.444.009-.825.025-1.162.052-.74.06-1.139.172-1.427.318a3.5 3.5 0 0 0-1.53 1.53c-.146.288-.257.686-.318 1.427-.062.759-.063 1.737-.063 3.162 0 1.425.001 2.403.063 3.162.06.74.172 1.139.318 1.427a3.5 3.5 0 0 0 1.53 1.53c.288.146.686.257 1.427.318.759.062 1.737.063 3.162.063 1.425 0 2.403-.001 3.162-.063.74-.06 1.139-.172 1.427-.319a3.5 3.5 0 0 0 1.53-1.53c.146-.287.257-.685.318-1.426.027-.337.043-.718.052-1.162H15c-2.8 0-4.2 0-5.27-.545a5 5 0 0 1-2.185-2.185C7 13.2 7 11.8 7 9v-.489Z\" clip-rule=\"evenodd\"/></svg>"]))),
            RETRY_ICON: b(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral(["<svg width=\"15\" height=\"16\" viewBox=\"0 0 15 16\"><path d=\"M6.464 2.03A.75.75 0 0 0 5.403.97L2.08 4.293a1 1 0 0 0 0 1.414L5.403 9.03a.75.75 0 0 0 1.06-1.06L4.672 6.177a.25.25 0 0 1 .177-.427h2.085a4 4 0 1 1-3.93 4.746c-.077-.407-.405-.746-.82-.746-.414 0-.755.338-.7.748a5.501 5.501 0 1 0 5.45-6.248H4.848a.25.25 0 0 1-.177-.427L6.464 2.03Z\" fill=\"#fff\"/></svg>"]))),
            DESKTOP_ICON: b(_templateObject15 || (_templateObject15 = _taggedTemplateLiteral(["<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M0 5.98c0-1.85 0-2.775.394-3.466a3 3 0 0 1 1.12-1.12C2.204 1 3.13 1 4.98 1h6.04c1.85 0 2.775 0 3.466.394a3 3 0 0 1 1.12 1.12C16 3.204 16 4.13 16 5.98v1.04c0 1.85 0 2.775-.394 3.466a3 3 0 0 1-1.12 1.12C13.796 12 12.87 12 11.02 12H4.98c-1.85 0-2.775 0-3.466-.394a3 3 0 0 1-1.12-1.12C0 9.796 0 8.87 0 7.02V5.98ZM4.98 2.5h6.04c.953 0 1.568.001 2.034.043.446.04.608.108.69.154a1.5 1.5 0 0 1 .559.56c.046.08.114.243.154.69.042.465.043 1.08.043 2.033v1.04c0 .952-.001 1.568-.043 2.034-.04.446-.108.608-.154.69a1.499 1.499 0 0 1-.56.559c-.08.046-.243.114-.69.154-.466.042-1.08.043-2.033.043H4.98c-.952 0-1.568-.001-2.034-.043-.446-.04-.608-.108-.69-.154a1.5 1.5 0 0 1-.559-.56c-.046-.08-.114-.243-.154-.69-.042-.465-.043-1.08-.043-2.033V5.98c0-.952.001-1.568.043-2.034.04-.446.108-.608.154-.69a1.5 1.5 0 0 1 .56-.559c.08-.046.243-.114.69-.154.465-.042 1.08-.043 2.033-.043Z\" fill=\"#fff\"/><path d=\"M4 14.25a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1-.75-.75Z\" fill=\"#fff\"/></svg>"]))),
            MOBILE_ICON: b(_templateObject16 || (_templateObject16 = _taggedTemplateLiteral(["<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\"><path d=\"M6.75 5a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z\" fill=\"#fff\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M3 4.98c0-1.85 0-2.775.394-3.466a3 3 0 0 1 1.12-1.12C5.204 0 6.136 0 8 0s2.795 0 3.486.394a3 3 0 0 1 1.12 1.12C13 2.204 13 3.13 13 4.98v6.04c0 1.85 0 2.775-.394 3.466a3 3 0 0 1-1.12 1.12C10.796 16 9.864 16 8 16s-2.795 0-3.486-.394a3 3 0 0 1-1.12-1.12C3 13.796 3 12.87 3 11.02V4.98Zm8.5 0v6.04c0 .953-.001 1.568-.043 2.034-.04.446-.108.608-.154.69a1.499 1.499 0 0 1-.56.559c-.08.045-.242.113-.693.154-.47.042-1.091.043-2.05.043-.959 0-1.58-.001-2.05-.043-.45-.04-.613-.109-.693-.154a1.5 1.5 0 0 1-.56-.56c-.046-.08-.114-.243-.154-.69-.042-.466-.043-1.08-.043-2.033V4.98c0-.952.001-1.568.043-2.034.04-.446.108-.608.154-.69a1.5 1.5 0 0 1 .56-.559c.08-.045.243-.113.693-.154C6.42 1.501 7.041 1.5 8 1.5c.959 0 1.58.001 2.05.043.45.04.613.109.693.154a1.5 1.5 0 0 1 .56.56c.046.08.114.243.154.69.042.465.043 1.08.043 2.033Z\" fill=\"#fff\"/></svg>"]))),
            ARROW_DOWN_ICON: b(_templateObject17 || (_templateObject17 = _taggedTemplateLiteral(["<svg width=\"14\" height=\"14\" viewBox=\"0 0 14 14\"><path d=\"M2.28 7.47a.75.75 0 0 0-1.06 1.06l5.25 5.25a.75.75 0 0 0 1.06 0l5.25-5.25a.75.75 0 0 0-1.06-1.06l-3.544 3.543a.25.25 0 0 1-.426-.177V.75a.75.75 0 0 0-1.5 0v10.086a.25.25 0 0 1-.427.176L2.28 7.47Z\" fill=\"#fff\"/></svg>"]))),
            ARROW_UP_RIGHT_ICON: b(_templateObject18 || (_templateObject18 = _taggedTemplateLiteral(["<svg width=\"15\" height=\"14\" fill=\"none\"><path d=\"M4.5 1.75A.75.75 0 0 1 5.25 1H12a1.5 1.5 0 0 1 1.5 1.5v6.75a.75.75 0 0 1-1.5 0V4.164a.25.25 0 0 0-.427-.176L4.061 11.5A.75.75 0 0 1 3 10.44l7.513-7.513a.25.25 0 0 0-.177-.427H5.25a.75.75 0 0 1-.75-.75Z\" fill=\"#fff\"/></svg>"]))),
            ARROW_RIGHT_ICON: b(_templateObject19 || (_templateObject19 = _taggedTemplateLiteral(["<svg width=\"6\" height=\"14\" viewBox=\"0 0 6 14\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M2.181 1.099a.75.75 0 0 1 1.024.279l2.433 4.258a2.75 2.75 0 0 1 0 2.729l-2.433 4.257a.75.75 0 1 1-1.303-.744L4.335 7.62a1.25 1.25 0 0 0 0-1.24L1.902 2.122a.75.75 0 0 1 .28-1.023Z\" fill=\"#fff\"/></svg>"]))),
            QRCODE_ICON: b(_templateObject20 || (_templateObject20 = _taggedTemplateLiteral(["<svg width=\"25\" height=\"24\" viewBox=\"0 0 25 24\"><path d=\"M23.748 9a.748.748 0 0 0 .748-.752c-.018-2.596-.128-4.07-.784-5.22a6 6 0 0 0-2.24-2.24c-1.15-.656-2.624-.766-5.22-.784a.748.748 0 0 0-.752.748c0 .414.335.749.748.752 1.015.007 1.82.028 2.494.088.995.09 1.561.256 1.988.5.7.398 1.28.978 1.679 1.678.243.427.41.993.498 1.988.061.675.082 1.479.09 2.493a.753.753 0 0 0 .75.749ZM3.527.788C4.677.132 6.152.022 8.747.004A.748.748 0 0 1 9.5.752a.753.753 0 0 1-.749.752c-1.014.007-1.818.028-2.493.088-.995.09-1.561.256-1.988.5-.7.398-1.28.978-1.679 1.678-.243.427-.41.993-.499 1.988-.06.675-.081 1.479-.088 2.493A.753.753 0 0 1 1.252 9a.748.748 0 0 1-.748-.752c.018-2.596.128-4.07.784-5.22a6 6 0 0 1 2.24-2.24ZM1.252 15a.748.748 0 0 0-.748.752c.018 2.596.128 4.07.784 5.22a6 6 0 0 0 2.24 2.24c1.15.656 2.624.766 5.22.784a.748.748 0 0 0 .752-.748.753.753 0 0 0-.749-.752c-1.014-.007-1.818-.028-2.493-.089-.995-.089-1.561-.255-1.988-.498a4.5 4.5 0 0 1-1.679-1.68c-.243-.426-.41-.992-.499-1.987-.06-.675-.081-1.479-.088-2.493A.753.753 0 0 0 1.252 15ZM22.996 15.749a.753.753 0 0 1 .752-.749c.415 0 .751.338.748.752-.018 2.596-.128 4.07-.784 5.22a6 6 0 0 1-2.24 2.24c-1.15.656-2.624.766-5.22.784a.748.748 0 0 1-.752-.748c0-.414.335-.749.748-.752 1.015-.007 1.82-.028 2.494-.089.995-.089 1.561-.255 1.988-.498a4.5 4.5 0 0 0 1.679-1.68c.243-.426.41-.992.498-1.987.061-.675.082-1.479.09-2.493Z\" fill=\"#fff\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M7 4a2.5 2.5 0 0 0-2.5 2.5v2A2.5 2.5 0 0 0 7 11h2a2.5 2.5 0 0 0 2.5-2.5v-2A2.5 2.5 0 0 0 9 4H7Zm2 1.5H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1ZM13.5 6.5A2.5 2.5 0 0 1 16 4h2a2.5 2.5 0 0 1 2.5 2.5v2A2.5 2.5 0 0 1 18 11h-2a2.5 2.5 0 0 1-2.5-2.5v-2Zm2.5-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1ZM7 13a2.5 2.5 0 0 0-2.5 2.5v2A2.5 2.5 0 0 0 7 20h2a2.5 2.5 0 0 0 2.5-2.5v-2A2.5 2.5 0 0 0 9 13H7Zm2 1.5H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1Z\" fill=\"#fff\"/><path d=\"M13.5 15.5c0-.465 0-.697.038-.89a2 2 0 0 1 1.572-1.572C15.303 13 15.535 13 16 13v2.5h-2.5ZM18 13c.465 0 .697 0 .89.038a2 2 0 0 1 1.572 1.572c.038.193.038.425.038.89H18V13ZM18 17.5h2.5c0 .465 0 .697-.038.89a2 2 0 0 1-1.572 1.572C18.697 20 18.465 20 18 20v-2.5ZM13.5 17.5H16V20c-.465 0-.697 0-.89-.038a2 2 0 0 1-1.572-1.572c-.038-.193-.038-.425-.038-.89Z\" fill=\"#fff\"/></svg>"]))),
            SCAN_ICON: b(_templateObject21 || (_templateObject21 = _taggedTemplateLiteral(["<svg width=\"16\" height=\"16\" fill=\"none\"><path fill=\"#fff\" d=\"M10 15.216c0 .422.347.763.768.74 1.202-.064 2.025-.222 2.71-.613a5.001 5.001 0 0 0 1.865-1.866c.39-.684.549-1.507.613-2.709a.735.735 0 0 0-.74-.768.768.768 0 0 0-.76.732c-.009.157-.02.306-.032.447-.073.812-.206 1.244-.384 1.555-.31.545-.761.996-1.306 1.306-.311.178-.743.311-1.555.384-.141.013-.29.023-.447.032a.768.768 0 0 0-.732.76ZM10 .784c0 .407.325.737.732.76.157.009.306.02.447.032.812.073 1.244.206 1.555.384a3.5 3.5 0 0 1 1.306 1.306c.178.311.311.743.384 1.555.013.142.023.29.032.447a.768.768 0 0 0 .76.732.734.734 0 0 0 .74-.768c-.064-1.202-.222-2.025-.613-2.71A5 5 0 0 0 13.477.658c-.684-.39-1.507-.549-2.709-.613a.735.735 0 0 0-.768.74ZM5.232.044A.735.735 0 0 1 6 .784a.768.768 0 0 1-.732.76c-.157.009-.305.02-.447.032-.812.073-1.244.206-1.555.384A3.5 3.5 0 0 0 1.96 3.266c-.178.311-.311.743-.384 1.555-.013.142-.023.29-.032.447A.768.768 0 0 1 .784 6a.735.735 0 0 1-.74-.768c.064-1.202.222-2.025.613-2.71A5 5 0 0 1 2.523.658C3.207.267 4.03.108 5.233.044ZM5.268 14.456a.768.768 0 0 1 .732.76.734.734 0 0 1-.768.74c-1.202-.064-2.025-.222-2.71-.613a5 5 0 0 1-1.865-1.866c-.39-.684-.549-1.507-.613-2.709A.735.735 0 0 1 .784 10c.407 0 .737.325.76.732.009.157.02.306.032.447.073.812.206 1.244.384 1.555a3.5 3.5 0 0 0 1.306 1.306c.311.178.743.311 1.555.384.142.013.29.023.447.032Z\"/></svg>"]))),
            CHECKMARK_ICON: b(_templateObject22 || (_templateObject22 = _taggedTemplateLiteral(["<svg width=\"13\" height=\"12\" viewBox=\"0 0 13 12\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M12.155.132a.75.75 0 0 1 .232 1.035L5.821 11.535a1 1 0 0 1-1.626.09L.665 7.21a.75.75 0 1 1 1.17-.937L4.71 9.867a.25.25 0 0 0 .406-.023L11.12.364a.75.75 0 0 1 1.035-.232Z\" fill=\"#fff\"/></svg>"]))),
            SEARCH_ICON: b(_templateObject23 || (_templateObject23 = _taggedTemplateLiteral(["<svg width=\"20\" height=\"21\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M12.432 13.992c-.354-.353-.91-.382-1.35-.146a5.5 5.5 0 1 1 2.265-2.265c-.237.441-.208.997.145 1.35l3.296 3.296a.75.75 0 1 1-1.06 1.061l-3.296-3.296Zm.06-5a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z\" fill=\"#949E9E\"/></svg>"]))),
            WALLET_PLACEHOLDER: b(_templateObject24 || (_templateObject24 = _taggedTemplateLiteral(["<svg width=\"60\" height=\"60\" fill=\"none\" viewBox=\"0 0 60 60\"><g clip-path=\"url(#q)\"><path id=\"wallet-placeholder-fill\" fill=\"#fff\" d=\"M0 24.9c0-9.251 0-13.877 1.97-17.332a15 15 0 0 1 5.598-5.597C11.023 0 15.648 0 24.9 0h10.2c9.252 0 13.877 0 17.332 1.97a15 15 0 0 1 5.597 5.598C60 11.023 60 15.648 60 24.9v10.2c0 9.252 0 13.877-1.97 17.332a15.001 15.001 0 0 1-5.598 5.597C48.977 60 44.352 60 35.1 60H24.9c-9.251 0-13.877 0-17.332-1.97a15 15 0 0 1-5.597-5.598C0 48.977 0 44.352 0 35.1V24.9Z\"/><path id=\"wallet-placeholder-dash\" stroke=\"#000\" stroke-dasharray=\"4 4\" stroke-width=\"1.5\" d=\"M.04 41.708a231.598 231.598 0 0 1-.039-4.403l.75-.001L.75 35.1v-2.55H0v-5.1h.75V24.9l.001-2.204h-.75c.003-1.617.011-3.077.039-4.404l.75.016c.034-1.65.099-3.08.218-4.343l-.746-.07c.158-1.678.412-3.083.82-4.316l.713.236c.224-.679.497-1.296.827-1.875a14.25 14.25 0 0 1 1.05-1.585L3.076 5.9A15 15 0 0 1 5.9 3.076l.455.596a14.25 14.25 0 0 1 1.585-1.05c.579-.33 1.196-.603 1.875-.827l-.236-.712C10.812.674 12.217.42 13.895.262l.07.746C15.23.89 16.66.824 18.308.79l-.016-.75C19.62.012 21.08.004 22.695.001l.001.75L24.9.75h2.55V0h5.1v.75h2.55l2.204.001v-.75c1.617.003 3.077.011 4.404.039l-.016.75c1.65.034 3.08.099 4.343.218l.07-.746c1.678.158 3.083.412 4.316.82l-.236.713c.679.224 1.296.497 1.875.827a14.24 14.24 0 0 1 1.585 1.05l.455-.596A14.999 14.999 0 0 1 56.924 5.9l-.596.455c.384.502.735 1.032 1.05 1.585.33.579.602 1.196.827 1.875l.712-.236c.409 1.233.663 2.638.822 4.316l-.747.07c.119 1.264.184 2.694.218 4.343l.75-.016c.028 1.327.036 2.787.039 4.403l-.75.001.001 2.204v2.55H60v5.1h-.75v2.55l-.001 2.204h.75a231.431 231.431 0 0 1-.039 4.404l-.75-.016c-.034 1.65-.099 3.08-.218 4.343l.747.07c-.159 1.678-.413 3.083-.822 4.316l-.712-.236a10.255 10.255 0 0 1-.827 1.875 14.242 14.242 0 0 1-1.05 1.585l.596.455a14.997 14.997 0 0 1-2.824 2.824l-.455-.596c-.502.384-1.032.735-1.585 1.05-.579.33-1.196.602-1.875.827l.236.712c-1.233.409-2.638.663-4.316.822l-.07-.747c-1.264.119-2.694.184-4.343.218l.016.75c-1.327.028-2.787.036-4.403.039l-.001-.75-2.204.001h-2.55V60h-5.1v-.75H24.9l-2.204-.001v.75a231.431 231.431 0 0 1-4.404-.039l.016-.75c-1.65-.034-3.08-.099-4.343-.218l-.07.747c-1.678-.159-3.083-.413-4.316-.822l.236-.712a10.258 10.258 0 0 1-1.875-.827 14.252 14.252 0 0 1-1.585-1.05l-.455.596A14.999 14.999 0 0 1 3.076 54.1l.596-.455a14.24 14.24 0 0 1-1.05-1.585 10.259 10.259 0 0 1-.827-1.875l-.712.236C.674 49.188.42 47.783.262 46.105l.746-.07C.89 44.77.824 43.34.79 41.692l-.75.016Z\"/><path fill=\"#fff\" fill-rule=\"evenodd\" d=\"M35.643 32.145c-.297-.743-.445-1.114-.401-1.275a.42.42 0 0 1 .182-.27c.134-.1.463-.1 1.123-.1.742 0 1.499.046 2.236-.05a6 6 0 0 0 5.166-5.166c.051-.39.051-.855.051-1.784 0-.928 0-1.393-.051-1.783a6 6 0 0 0-5.166-5.165c-.39-.052-.854-.052-1.783-.052h-7.72c-4.934 0-7.401 0-9.244 1.051a8 8 0 0 0-2.985 2.986C16.057 22.28 16.003 24.58 16 29 15.998 31.075 16 33.15 16 35.224A7.778 7.778 0 0 0 23.778 43H28.5c1.394 0 2.09 0 2.67-.116a6 6 0 0 0 4.715-4.714c.115-.58.115-1.301.115-2.744 0-1.31 0-1.964-.114-2.49a4.998 4.998 0 0 0-.243-.792Z\" clip-rule=\"evenodd\"/><path fill=\"#9EA9A9\" fill-rule=\"evenodd\" d=\"M37 18h-7.72c-2.494 0-4.266.002-5.647.126-1.361.122-2.197.354-2.854.728a6.5 6.5 0 0 0-2.425 2.426c-.375.657-.607 1.492-.729 2.853-.11 1.233-.123 2.777-.125 4.867 0 .7 0 1.05.097 1.181.096.13.182.181.343.2.163.02.518-.18 1.229-.581a6.195 6.195 0 0 1 3.053-.8H37c.977 0 1.32-.003 1.587-.038a4.5 4.5 0 0 0 3.874-3.874c.036-.268.039-.611.039-1.588 0-.976-.003-1.319-.038-1.587a4.5 4.5 0 0 0-3.875-3.874C38.32 18.004 37.977 18 37 18Zm-7.364 12.5h-7.414a4.722 4.722 0 0 0-4.722 4.723 6.278 6.278 0 0 0 6.278 6.278H28.5c1.466 0 1.98-.008 2.378-.087a4.5 4.5 0 0 0 3.535-3.536c.08-.397.087-.933.087-2.451 0-1.391-.009-1.843-.08-2.17a3.5 3.5 0 0 0-2.676-2.676c-.328-.072-.762-.08-2.108-.08Z\" clip-rule=\"evenodd\"/></g><defs><clipPath id=\"q\"><path fill=\"#fff\" d=\"M0 0h60v60H0z\"/></clipPath></defs></svg>"]))),
            GLOBE_ICON: b(_templateObject25 || (_templateObject25 = _taggedTemplateLiteral(["<svg width=\"16\" height=\"16\" fill=\"none\" viewBox=\"0 0 16 16\"><path fill=\"#fff\" fill-rule=\"evenodd\" d=\"M15.5 8a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Zm-2.113.75c.301 0 .535.264.47.558a6.01 6.01 0 0 1-2.867 3.896c-.203.116-.42-.103-.334-.32.409-1.018.691-2.274.797-3.657a.512.512 0 0 1 .507-.477h1.427Zm.47-2.058c.065.294-.169.558-.47.558H11.96a.512.512 0 0 1-.507-.477c-.106-1.383-.389-2.638-.797-3.656-.087-.217.13-.437.333-.32a6.01 6.01 0 0 1 2.868 3.895Zm-4.402.558c.286 0 .515-.24.49-.525-.121-1.361-.429-2.534-.83-3.393-.279-.6-.549-.93-.753-1.112a.535.535 0 0 0-.724 0c-.204.182-.474.513-.754 1.112-.4.859-.708 2.032-.828 3.393a.486.486 0 0 0 .49.525h2.909Zm-5.415 0c.267 0 .486-.21.507-.477.106-1.383.389-2.638.797-3.656.087-.217-.13-.437-.333-.32a6.01 6.01 0 0 0-2.868 3.895c-.065.294.169.558.47.558H4.04ZM2.143 9.308c-.065-.294.169-.558.47-.558H4.04c.267 0 .486.21.507.477.106 1.383.389 2.639.797 3.657.087.217-.13.436-.333.32a6.01 6.01 0 0 1-2.868-3.896Zm3.913-.033a.486.486 0 0 1 .49-.525h2.909c.286 0 .515.24.49.525-.121 1.361-.428 2.535-.83 3.394-.279.6-.549.93-.753 1.112a.535.535 0 0 1-.724 0c-.204-.182-.474-.513-.754-1.112-.4-.859-.708-2.033-.828-3.394Z\" clip-rule=\"evenodd\"/></svg>"])))
          },
          pt = i$4(_templateObject26 || (_templateObject26 = _taggedTemplateLiteral([".wcm-toolbar-placeholder{top:0;bottom:0;left:0;right:0;width:100%;position:absolute;display:block;pointer-events:none;height:100px;border-radius:calc(var(--wcm-background-border-radius) * .9);background-color:var(--wcm-background-color);background-position:center;background-size:cover}.wcm-toolbar{height:38px;display:flex;position:relative;margin:5px 15px 5px 5px;justify-content:space-between;align-items:center}.wcm-toolbar img,.wcm-toolbar svg{height:28px;object-position:left center;object-fit:contain}#wcm-wc-logo path{fill:var(--wcm-accent-fill-color)}button{width:28px;height:28px;border-radius:var(--wcm-icon-button-border-radius);border:0;display:flex;justify-content:center;align-items:center;cursor:pointer;background-color:var(--wcm-color-bg-1);box-shadow:0 0 0 1px var(--wcm-color-overlay)}button:active{background-color:var(--wcm-color-bg-2)}button svg{display:block;object-position:center}button path{fill:var(--wcm-color-fg-1)}.wcm-toolbar div{display:flex}@media(hover:hover){button:hover{background-color:var(--wcm-color-bg-2)}}"])));
        var ut = function ut(e, o, r, a) {
          for (var t = o, l = e.length - 1, i; l >= 0; l--) (i = e[l]) && (t = i(t) || t);
          return t;
        };
        var fe = /*#__PURE__*/function (_s$4) {
          function fe() {
            _classCallCheck(this, fe);
            return _callSuper(this, fe, arguments);
          }
          _inherits(fe, _s$4);
          return _createClass(fe, [{
            key: "render",
            value: function render() {
              return x(_templateObject27 || (_templateObject27 = _taggedTemplateLiteral(["<div class=\"wcm-toolbar-placeholder\"></div><div class=\"wcm-toolbar\">", " <button @click=\"", "\">", "</button></div>"])), v.WALLET_CONNECT_LOGO, se$1.close, v.CROSS_ICON);
            }
          }]);
        }(s$1);
        fe.styles = [h.globalCss, pt], fe = ut([e$3("wcm-modal-backcard")], fe);
        var bt = i$4(_templateObject28 || (_templateObject28 = _taggedTemplateLiteral(["main{padding:20px;padding-top:0;width:100%}"])));
        var yt = function yt(e, o, r, a) {
          for (var t = o, l = e.length - 1, i; l >= 0; l--) (i = e[l]) && (t = i(t) || t);
          return t;
        };
        var xe = /*#__PURE__*/function (_s$5) {
          function xe() {
            _classCallCheck(this, xe);
            return _callSuper(this, xe, arguments);
          }
          _inherits(xe, _s$5);
          return _createClass(xe, [{
            key: "render",
            value: function render() {
              return x(_templateObject29 || (_templateObject29 = _taggedTemplateLiteral(["<main><slot></slot></main>"])));
            }
          }]);
        }(s$1);
        xe.styles = [h.globalCss, bt], xe = yt([e$3("wcm-modal-content")], xe);
        var $t = i$4(_templateObject30 || (_templateObject30 = _taggedTemplateLiteral(["footer{padding:10px;display:flex;flex-direction:column;align-items:inherit;justify-content:inherit;border-top:1px solid var(--wcm-color-bg-2)}"])));
        var Ot = function Ot(e, o, r, a) {
          for (var t = o, l = e.length - 1, i; l >= 0; l--) (i = e[l]) && (t = i(t) || t);
          return t;
        };
        var ye = /*#__PURE__*/function (_s$6) {
          function ye() {
            _classCallCheck(this, ye);
            return _callSuper(this, ye, arguments);
          }
          _inherits(ye, _s$6);
          return _createClass(ye, [{
            key: "render",
            value: function render() {
              return x(_templateObject31 || (_templateObject31 = _taggedTemplateLiteral(["<footer><slot></slot></footer>"])));
            }
          }]);
        }(s$1);
        ye.styles = [h.globalCss, $t], ye = Ot([e$3("wcm-modal-footer")], ye);
        var Wt = i$4(_templateObject32 || (_templateObject32 = _taggedTemplateLiteral(["header{display:flex;justify-content:center;align-items:center;padding:20px;position:relative}.wcm-border{border-bottom:1px solid var(--wcm-color-bg-2);margin-bottom:20px}header button{padding:15px 20px}header button:active{opacity:.5}@media(hover:hover){header button:hover{opacity:.5}}.wcm-back-btn{position:absolute;left:0}.wcm-action-btn{position:absolute;right:0}path{fill:var(--wcm-accent-color)}"])));
        var It = Object.defineProperty,
          Et = Object.getOwnPropertyDescriptor,
          te = function te(e, o, r, a) {
            for (var t = a > 1 ? void 0 : a ? Et(o, r) : o, l = e.length - 1, i; l >= 0; l--) (i = e[l]) && (t = (a ? i(o, r, t) : i(t)) || t);
            return a && t && It(o, r, t), t;
          };
        var S = /*#__PURE__*/function (_s$7) {
          function S() {
            var _this20;
            _classCallCheck(this, S);
            _this20 = _callSuper(this, S, arguments), _this20.title = "", _this20.onAction = void 0, _this20.actionIcon = void 0, _this20.border = false;
            return _this20;
          }
          _inherits(S, _s$7);
          return _createClass(S, [{
            key: "backBtnTemplate",
            value: function backBtnTemplate() {
              return x(_templateObject33 || (_templateObject33 = _taggedTemplateLiteral(["<button class=\"wcm-back-btn\" @click=\"", "\">", "</button>"])), T$3.goBack, v.BACK_ICON);
            }
          }, {
            key: "actionBtnTemplate",
            value: function actionBtnTemplate() {
              return x(_templateObject34 || (_templateObject34 = _taggedTemplateLiteral(["<button class=\"wcm-action-btn\" @click=\"", "\">", "</button>"])), this.onAction, this.actionIcon);
            }
          }, {
            key: "render",
            value: function render() {
              var e = {
                  "wcm-border": this.border
                },
                o = T$3.state.history.length > 1,
                r = this.title ? x(_templateObject35 || (_templateObject35 = _taggedTemplateLiteral(["<wcm-text variant=\"big-bold\">", "</wcm-text>"])), this.title) : x(_templateObject36 || (_templateObject36 = _taggedTemplateLiteral(["<slot></slot>"])));
              return x(_templateObject37 || (_templateObject37 = _taggedTemplateLiteral(["<header class=\"", "\">", " ", " ", "</header>"])), o$1(e), o ? this.backBtnTemplate() : null, r, this.onAction ? this.actionBtnTemplate() : null);
            }
          }]);
        }(s$1);
        S.styles = [h.globalCss, Wt], te([n$2()], S.prototype, "title", 2), te([n$2()], S.prototype, "onAction", 2), te([n$2()], S.prototype, "actionIcon", 2), te([n$2({
          type: Boolean
        })], S.prototype, "border", 2), S = te([e$3("wcm-modal-header")], S);
        var c = {
            MOBILE_BREAKPOINT: 600,
            WCM_RECENT_WALLET_DATA: "WCM_RECENT_WALLET_DATA",
            EXPLORER_WALLET_URL: "https://explorer.walletconnect.com/?type=wallet",
            getShadowRootElement: function getShadowRootElement(e, o) {
              var r = e.renderRoot.querySelector(o);
              if (!r) throw new Error("".concat(o, " not found"));
              return r;
            },
            getWalletIcon: function getWalletIcon(_ref11) {
              var e = _ref11.id,
                o = _ref11.image_id;
              var r = y$2.state.walletImages;
              return r != null && r[e] ? r[e] : o ? te$1.getWalletImageUrl(o) : "";
            },
            getWalletName: function getWalletName(e) {
              var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
              return o && e.length > 8 ? "".concat(e.substring(0, 8), "..") : e;
            },
            isMobileAnimation: function isMobileAnimation() {
              return window.innerWidth <= c.MOBILE_BREAKPOINT;
            },
            preloadImage: function preloadImage(e) {
              return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
                var o;
                return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                  while (1) switch (_context2.prev = _context2.next) {
                    case 0:
                      o = new Promise(function (r, a) {
                        var t = new Image();
                        t.onload = r, t.onerror = a, t.crossOrigin = "anonymous", t.src = e;
                      });
                      return _context2.abrupt("return", Promise.race([o, a$3.wait(3e3)]));
                    case 2:
                    case "end":
                      return _context2.stop();
                  }
                }, _callee2);
              }))();
            },
            getErrorMessage: function getErrorMessage(e) {
              return e instanceof Error ? e.message : "Unknown Error";
            },
            debounce: function debounce(e) {
              var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
              var r;
              return function () {
                for (var _len5 = arguments.length, a = new Array(_len5), _key7 = 0; _key7 < _len5; _key7++) {
                  a[_key7] = arguments[_key7];
                }
                function t() {
                  e.apply(void 0, a);
                }
                r && clearTimeout(r), r = setTimeout(t, o);
              };
            },
            handleMobileLinking: function handleMobileLinking(e) {
              var o = p$2.state.walletConnectUri,
                r = e.mobile,
                a = e.name,
                t = r === null || r === void 0 ? void 0 : r.native,
                l = r === null || r === void 0 ? void 0 : r.universal;
              c.setRecentWallet(e);
              function i(s) {
                var $ = "";
                t ? $ = a$3.formatUniversalUrl(t, s, a) : l && ($ = a$3.formatNativeUrl(l, s, a)), a$3.openHref($, "_self");
              }
              o && i(o);
            },
            handleAndroidLinking: function handleAndroidLinking() {
              var e = p$2.state.walletConnectUri;
              e && (a$3.setWalletConnectAndroidDeepLink(e), a$3.openHref(e, "_self"));
            },
            handleUriCopy: function handleUriCopy() {
              return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
                var e;
                return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                  while (1) switch (_context3.prev = _context3.next) {
                    case 0:
                      e = p$2.state.walletConnectUri;
                      if (!e) {
                        _context3.next = 11;
                        break;
                      }
                      _context3.prev = 2;
                      _context3.next = 5;
                      return navigator.clipboard.writeText(e);
                    case 5:
                      oe$1.openToast("Link copied", "success");
                      _context3.next = 11;
                      break;
                    case 8:
                      _context3.prev = 8;
                      _context3.t0 = _context3["catch"](2);
                      oe$1.openToast("Failed to copy", "error");
                    case 11:
                    case "end":
                      return _context3.stop();
                  }
                }, _callee3, null, [[2, 8]]);
              }))();
            },
            getCustomImageUrls: function getCustomImageUrls() {
              var e = y$2.state.walletImages,
                o = Object.values(e !== null && e !== void 0 ? e : {});
              return Object.values(o);
            },
            truncate: function truncate(e) {
              var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 8;
              return e.length <= o ? e : "".concat(e.substring(0, 4), "...").concat(e.substring(e.length - 4));
            },
            setRecentWallet: function setRecentWallet(e) {
              try {
                localStorage.setItem(c.WCM_RECENT_WALLET_DATA, JSON.stringify(e));
              } catch (_unused2) {
                console.info("Unable to set recent wallet");
              }
            },
            getRecentWallet: function getRecentWallet() {
              try {
                var _e8 = localStorage.getItem(c.WCM_RECENT_WALLET_DATA);
                return _e8 ? JSON.parse(_e8) : void 0;
              } catch (_unused3) {
                console.info("Unable to get recent wallet");
              }
            },
            caseSafeIncludes: function caseSafeIncludes(e, o) {
              return e.toUpperCase().includes(o.toUpperCase());
            },
            openWalletExplorerUrl: function openWalletExplorerUrl() {
              a$3.openHref(c.EXPLORER_WALLET_URL, "_blank");
            },
            getCachedRouterWalletPlatforms: function getCachedRouterWalletPlatforms() {
              var _a$3$getWalletRouterD = a$3.getWalletRouterData(),
                e = _a$3$getWalletRouterD.desktop,
                o = _a$3$getWalletRouterD.mobile,
                r = Boolean(e === null || e === void 0 ? void 0 : e.native),
                a = Boolean(e === null || e === void 0 ? void 0 : e.universal),
                t = Boolean(o === null || o === void 0 ? void 0 : o.native) || Boolean(o === null || o === void 0 ? void 0 : o.universal);
              return {
                isDesktop: r,
                isMobile: t,
                isWeb: a
              };
            },
            goToConnectingView: function goToConnectingView(e) {
              T$3.setData({
                Wallet: e
              });
              var o = a$3.isMobile(),
                _c$getCachedRouterWal = c.getCachedRouterWalletPlatforms(),
                r = _c$getCachedRouterWal.isDesktop,
                a = _c$getCachedRouterWal.isWeb,
                t = _c$getCachedRouterWal.isMobile;
              o ? t ? T$3.push("MobileConnecting") : a ? T$3.push("WebConnecting") : T$3.push("InstallWallet") : r ? T$3.push("DesktopConnecting") : a ? T$3.push("WebConnecting") : t ? T$3.push("MobileQrcodeConnecting") : T$3.push("InstallWallet");
            }
          },
          Mt = i$4(_templateObject38 || (_templateObject38 = _taggedTemplateLiteral([".wcm-router{overflow:hidden;will-change:transform}.wcm-content{display:flex;flex-direction:column}"])));
        var Lt = Object.defineProperty,
          Rt = Object.getOwnPropertyDescriptor,
          $e = function $e(e, o, r, a) {
            for (var t = a > 1 ? void 0 : a ? Rt(o, r) : o, l = e.length - 1, i; l >= 0; l--) (i = e[l]) && (t = (a ? i(o, r, t) : i(t)) || t);
            return a && t && Lt(o, r, t), t;
          };
        var oe = /*#__PURE__*/function (_s$8) {
          function oe() {
            var _this21;
            _classCallCheck(this, oe);
            _this21 = _callSuper(this, oe), _this21.view = T$3.state.view, _this21.prevView = T$3.state.view, _this21.unsubscribe = void 0, _this21.oldHeight = "0px", _this21.resizeObserver = void 0, _this21.unsubscribe = T$3.subscribe(function (e) {
              _this21.view !== e.view && _this21.onChangeRoute();
            });
            return _this21;
          }
          _inherits(oe, _s$8);
          return _createClass(oe, [{
            key: "firstUpdated",
            value: function firstUpdated() {
              var _this22 = this;
              this.resizeObserver = new ResizeObserver(function (_ref12) {
                var _ref13 = _slicedToArray(_ref12, 1),
                  e = _ref13[0];
                var o = "".concat(e.contentRect.height, "px");
                _this22.oldHeight !== "0px" && animate(_this22.routerEl, {
                  height: [_this22.oldHeight, o]
                }, {
                  duration: .2
                }), _this22.oldHeight = o;
              }), this.resizeObserver.observe(this.contentEl);
            }
          }, {
            key: "disconnectedCallback",
            value: function disconnectedCallback() {
              var e, o;
              (e = this.unsubscribe) == null || e.call(this), (o = this.resizeObserver) == null || o.disconnect();
            }
          }, {
            key: "routerEl",
            get: function get() {
              return c.getShadowRootElement(this, ".wcm-router");
            }
          }, {
            key: "contentEl",
            get: function get() {
              return c.getShadowRootElement(this, ".wcm-content");
            }
          }, {
            key: "viewTemplate",
            value: function viewTemplate() {
              switch (this.view) {
                case "ConnectWallet":
                  return x(_templateObject39 || (_templateObject39 = _taggedTemplateLiteral(["<wcm-connect-wallet-view></wcm-connect-wallet-view>"])));
                case "DesktopConnecting":
                  return x(_templateObject40 || (_templateObject40 = _taggedTemplateLiteral(["<wcm-desktop-connecting-view></wcm-desktop-connecting-view>"])));
                case "MobileConnecting":
                  return x(_templateObject41 || (_templateObject41 = _taggedTemplateLiteral(["<wcm-mobile-connecting-view></wcm-mobile-connecting-view>"])));
                case "WebConnecting":
                  return x(_templateObject42 || (_templateObject42 = _taggedTemplateLiteral(["<wcm-web-connecting-view></wcm-web-connecting-view>"])));
                case "MobileQrcodeConnecting":
                  return x(_templateObject43 || (_templateObject43 = _taggedTemplateLiteral(["<wcm-mobile-qr-connecting-view></wcm-mobile-qr-connecting-view>"])));
                case "WalletExplorer":
                  return x(_templateObject44 || (_templateObject44 = _taggedTemplateLiteral(["<wcm-wallet-explorer-view></wcm-wallet-explorer-view>"])));
                case "Qrcode":
                  return x(_templateObject45 || (_templateObject45 = _taggedTemplateLiteral(["<wcm-qrcode-view></wcm-qrcode-view>"])));
                case "InstallWallet":
                  return x(_templateObject46 || (_templateObject46 = _taggedTemplateLiteral(["<wcm-install-wallet-view></wcm-install-wallet-view>"])));
                default:
                  return x(_templateObject47 || (_templateObject47 = _taggedTemplateLiteral(["<div>Not Found</div>"])));
              }
            }
          }, {
            key: "onChangeRoute",
            value: function () {
              var _onChangeRoute = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
                return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                  while (1) switch (_context4.prev = _context4.next) {
                    case 0:
                      _context4.next = 2;
                      return animate(this.routerEl, {
                        opacity: [1, 0],
                        scale: [1, 1.02]
                      }, {
                        duration: .15,
                        delay: .1
                      }).finished;
                    case 2:
                      this.view = T$3.state.view;
                      animate(this.routerEl, {
                        opacity: [0, 1],
                        scale: [.99, 1]
                      }, {
                        duration: .37,
                        delay: .05
                      });
                    case 4:
                    case "end":
                      return _context4.stop();
                  }
                }, _callee4, this);
              }));
              function onChangeRoute() {
                return _onChangeRoute.apply(this, arguments);
              }
              return onChangeRoute;
            }()
          }, {
            key: "render",
            value: function render() {
              return x(_templateObject48 || (_templateObject48 = _taggedTemplateLiteral(["<div class=\"wcm-router\"><div class=\"wcm-content\">", "</div></div>"])), this.viewTemplate());
            }
          }]);
        }(s$1);
        oe.styles = [h.globalCss, Mt], $e([t$2()], oe.prototype, "view", 2), $e([t$2()], oe.prototype, "prevView", 2), oe = $e([e$3("wcm-modal-router")], oe);
        var At = i$4(_templateObject49 || (_templateObject49 = _taggedTemplateLiteral(["div{height:36px;width:max-content;display:flex;justify-content:center;align-items:center;padding:9px 15px 11px;position:absolute;top:12px;box-shadow:0 6px 14px -6px rgba(10,16,31,.3),0 10px 32px -4px rgba(10,16,31,.15);z-index:2;left:50%;transform:translateX(-50%);pointer-events:none;backdrop-filter:blur(20px) saturate(1.8);-webkit-backdrop-filter:blur(20px) saturate(1.8);border-radius:var(--wcm-notification-border-radius);border:1px solid var(--wcm-color-overlay);background-color:var(--wcm-color-overlay)}svg{margin-right:5px}@-moz-document url-prefix(){div{background-color:var(--wcm-color-bg-3)}}.wcm-success path{fill:var(--wcm-accent-color)}.wcm-error path{fill:var(--wcm-error-color)}"])));
        var Pt = Object.defineProperty,
          Tt = Object.getOwnPropertyDescriptor,
          ze = function ze(e, o, r, a) {
            for (var t = a > 1 ? void 0 : a ? Tt(o, r) : o, l = e.length - 1, i; l >= 0; l--) (i = e[l]) && (t = (a ? i(o, r, t) : i(t)) || t);
            return a && t && Pt(o, r, t), t;
          };
        var ne = /*#__PURE__*/function (_s$9) {
          function ne() {
            var _this23;
            _classCallCheck(this, ne);
            _this23 = _callSuper(this, ne), _this23.open = false, _this23.unsubscribe = void 0, _this23.timeout = void 0, _this23.unsubscribe = oe$1.subscribe(function (e) {
              e.open ? (_this23.open = true, _this23.timeout = setTimeout(function () {
                return oe$1.closeToast();
              }, 2200)) : (_this23.open = false, clearTimeout(_this23.timeout));
            });
            return _this23;
          }
          _inherits(ne, _s$9);
          return _createClass(ne, [{
            key: "disconnectedCallback",
            value: function disconnectedCallback() {
              var e;
              (e = this.unsubscribe) == null || e.call(this), clearTimeout(this.timeout), oe$1.closeToast();
            }
          }, {
            key: "render",
            value: function render() {
              var _oe$1$state = oe$1.state,
                e = _oe$1$state.message,
                o = _oe$1$state.variant,
                r = {
                  "wcm-success": o === "success",
                  "wcm-error": o === "error"
                };
              return this.open ? x(_templateObject50 || (_templateObject50 = _taggedTemplateLiteral(["<div class=\"", "\">", " ", "<wcm-text variant=\"small-regular\">", "</wcm-text></div>"])), o$1(r), o === "success" ? v.CHECKMARK_ICON : null, o === "error" ? v.CROSS_ICON : null, e) : null;
            }
          }]);
        }(s$1);
        ne.styles = [h.globalCss, At], ze([t$2()], ne.prototype, "open", 2), ne = ze([e$3("wcm-modal-toast")], ne);
        var jt = .1,
          Ve = 2.5,
          A = 7;
        function Ce(e, o, r) {
          return e === o ? false : (e - o < 0 ? o - e : e - o) <= r + jt;
        }
        function _t(e, o) {
          var r = Array.prototype.slice.call(Je.create(e, {
              errorCorrectionLevel: o
            }).modules.data, 0),
            a = Math.sqrt(r.length);
          return r.reduce(function (t, l, i) {
            return (i % a === 0 ? t.push([l]) : t[t.length - 1].push(l)) && t;
          }, []);
        }
        var Dt = {
            generate: function generate(e, o, r) {
              var a = "#141414",
                t = "#ffffff",
                l = [],
                i = _t(e, "Q"),
                s = o / i.length,
                $ = [{
                  x: 0,
                  y: 0
                }, {
                  x: 1,
                  y: 0
                }, {
                  x: 0,
                  y: 1
                }];
              $.forEach(function (_ref14) {
                var y = _ref14.x,
                  u = _ref14.y;
                var O = (i.length - A) * s * y,
                  b = (i.length - A) * s * u,
                  E = .45;
                for (var _M = 0; _M < $.length; _M += 1) {
                  var _V = s * (A - _M * 2);
                  l.push(b$1(_templateObject51 || (_templateObject51 = _taggedTemplateLiteral(["<rect fill=\"", "\" height=\"", "\" rx=\"", "\" ry=\"", "\" width=\"", "\" x=\"", "\" y=\"", "\">"])), _M % 2 === 0 ? a : t, _V, _V * E, _V * E, _V, O + s * _M, b + s * _M));
                }
              });
              var f = Math.floor((r + 25) / s),
                Ne = i.length / 2 - f / 2,
                Ze = i.length / 2 + f / 2 - 1,
                Se = [];
              i.forEach(function (y, u) {
                y.forEach(function (O, b) {
                  if (i[u][b] && !(u < A && b < A || u > i.length - (A + 1) && b < A || u < A && b > i.length - (A + 1)) && !(u > Ne && u < Ze && b > Ne && b < Ze)) {
                    var _E = u * s + s / 2,
                      _M2 = b * s + s / 2;
                    Se.push([_E, _M2]);
                  }
                });
              });
              var J = {};
              return Se.forEach(function (_ref15) {
                var _ref16 = _slicedToArray(_ref15, 2),
                  y = _ref16[0],
                  u = _ref16[1];
                J[y] ? J[y].push(u) : J[y] = [u];
              }), Object.entries(J).map(function (_ref17) {
                var _ref18 = _slicedToArray(_ref17, 2),
                  y = _ref18[0],
                  u = _ref18[1];
                var O = u.filter(function (b) {
                  return u.every(function (E) {
                    return !Ce(b, E, s);
                  });
                });
                return [Number(y), O];
              }).forEach(function (_ref19) {
                var _ref20 = _slicedToArray(_ref19, 2),
                  y = _ref20[0],
                  u = _ref20[1];
                u.forEach(function (O) {
                  l.push(b$1(_templateObject52 || (_templateObject52 = _taggedTemplateLiteral(["<circle cx=\"", "\" cy=\"", "\" fill=\"", "\" r=\"", "\">"])), y, O, a, s / Ve));
                });
              }), Object.entries(J).filter(function (_ref21) {
                var _ref22 = _slicedToArray(_ref21, 2),
                  y = _ref22[0],
                  u = _ref22[1];
                return u.length > 1;
              }).map(function (_ref23) {
                var _ref24 = _slicedToArray(_ref23, 2),
                  y = _ref24[0],
                  u = _ref24[1];
                var O = u.filter(function (b) {
                  return u.some(function (E) {
                    return Ce(b, E, s);
                  });
                });
                return [Number(y), O];
              }).map(function (_ref25) {
                var _ref26 = _slicedToArray(_ref25, 2),
                  y = _ref26[0],
                  u = _ref26[1];
                u.sort(function (b, E) {
                  return b < E ? -1 : 1;
                });
                var O = [];
                var _iterator11 = _createForOfIteratorHelper(u),
                  _step11;
                try {
                  var _loop2 = function _loop2() {
                    var b = _step11.value;
                    var E = O.find(function (M) {
                      return M.some(function (V) {
                        return Ce(b, V, s);
                      });
                    });
                    E ? E.push(b) : O.push([b]);
                  };
                  for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
                    _loop2();
                  }
                } catch (err) {
                  _iterator11.e(err);
                } finally {
                  _iterator11.f();
                }
                return [y, O.map(function (b) {
                  return [b[0], b[b.length - 1]];
                })];
              }).forEach(function (_ref27) {
                var _ref28 = _slicedToArray(_ref27, 2),
                  y = _ref28[0],
                  u = _ref28[1];
                u.forEach(function (_ref29) {
                  var _ref30 = _slicedToArray(_ref29, 2),
                    O = _ref30[0],
                    b = _ref30[1];
                  l.push(b$1(_templateObject53 || (_templateObject53 = _taggedTemplateLiteral(["<line x1=\"", "\" x2=\"", "\" y1=\"", "\" y2=\"", "\" stroke=\"", "\" stroke-width=\"", "\" stroke-linecap=\"round\">"])), y, y, O, b, a, s / (Ve / 2)));
                });
              }), l;
            }
          },
          Nt = i$4(_templateObject54 || (_templateObject54 = _taggedTemplateLiteral(["@keyframes fadeIn{0%{opacity:0}100%{opacity:1}}div{position:relative;user-select:none;display:block;overflow:hidden;aspect-ratio:1/1;animation:fadeIn ease .2s}.wcm-dark{background-color:#fff;border-radius:var(--wcm-container-border-radius);padding:18px;box-shadow:0 2px 5px #000}svg:first-child,wcm-wallet-image{position:absolute;top:50%;left:50%;transform:translateY(-50%) translateX(-50%)}wcm-wallet-image{transform:translateY(-50%) translateX(-50%)}wcm-wallet-image{width:25%;height:25%;border-radius:var(--wcm-wallet-icon-border-radius)}svg:first-child{transform:translateY(-50%) translateX(-50%) scale(.9)}svg:first-child path:first-child{fill:var(--wcm-accent-color)}svg:first-child path:last-child{stroke:var(--wcm-color-overlay)}"])));
        var Zt = Object.defineProperty,
          St = Object.getOwnPropertyDescriptor,
          q = function q(e, o, r, a) {
            for (var t = a > 1 ? void 0 : a ? St(o, r) : o, l = e.length - 1, i; l >= 0; l--) (i = e[l]) && (t = (a ? i(o, r, t) : i(t)) || t);
            return a && t && Zt(o, r, t), t;
          };
        var j = exports("WcmQrCode", /*#__PURE__*/function (_s$10) {
          function _class2() {
            var _this24;
            _classCallCheck(this, _class2);
            _this24 = _callSuper(this, _class2, arguments), _this24.uri = "", _this24.size = 0, _this24.imageId = void 0, _this24.walletId = void 0, _this24.imageUrl = void 0;
            return _this24;
          }
          _inherits(_class2, _s$10);
          return _createClass(_class2, [{
            key: "svgTemplate",
            value: function svgTemplate() {
              var e = ne$1.state.themeMode === "light" ? this.size : this.size - 36;
              return b$1(_templateObject55 || (_templateObject55 = _taggedTemplateLiteral(["<svg height=\"", "\" width=\"", "\">", "</svg>"])), e, e, Dt.generate(this.uri, e, e / 4));
            }
          }, {
            key: "render",
            value: function render() {
              var e = {
                "wcm-dark": ne$1.state.themeMode === "dark"
              };
              return x(_templateObject56 || (_templateObject56 = _taggedTemplateLiteral(["<div style=\"", "\" class=\"", "\">", " ", "</div>"])), "width: ".concat(this.size, "px"), o$1(e), this.walletId || this.imageUrl ? x(_templateObject57 || (_templateObject57 = _taggedTemplateLiteral(["<wcm-wallet-image walletId=\"", "\" imageId=\"", "\" imageUrl=\"", "\"></wcm-wallet-image>"])), l(this.walletId), l(this.imageId), l(this.imageUrl)) : v.WALLET_CONNECT_ICON_COLORED, this.svgTemplate());
            }
          }]);
        }(s$1));
        j.styles = [h.globalCss, Nt], q([n$2()], j.prototype, "uri", 2), q([n$2({
          type: Number
        })], j.prototype, "size", 2), q([n$2()], j.prototype, "imageId", 2), q([n$2()], j.prototype, "walletId", 2), q([n$2()], j.prototype, "imageUrl", 2), exports("WcmQrCode", j = q([e$3("wcm-qrcode")], j));
        var Bt = i$4(_templateObject58 || (_templateObject58 = _taggedTemplateLiteral([":host{position:relative;height:28px;width:80%}input{width:100%;height:100%;line-height:28px!important;border-radius:var(--wcm-input-border-radius);font-style:normal;font-family:-apple-system,system-ui,BlinkMacSystemFont,'Segoe UI',Roboto,Ubuntu,'Helvetica Neue',sans-serif;font-feature-settings:'case' on;font-weight:500;font-size:16px;letter-spacing:-.03em;padding:0 10px 0 34px;transition:.2s all ease;color:var(--wcm-color-fg-1);background-color:var(--wcm-color-bg-3);box-shadow:inset 0 0 0 1px var(--wcm-color-overlay);caret-color:var(--wcm-accent-color)}input::placeholder{color:var(--wcm-color-fg-2)}svg{left:10px;top:4px;pointer-events:none;position:absolute;width:20px;height:20px}input:focus-within{box-shadow:inset 0 0 0 1px var(--wcm-accent-color)}path{fill:var(--wcm-color-fg-2)}"])));
        var Ut = Object.defineProperty,
          Ht = Object.getOwnPropertyDescriptor,
          Fe = function Fe(e, o, r, a) {
            for (var t = a > 1 ? void 0 : a ? Ht(o, r) : o, l = e.length - 1, i; l >= 0; l--) (i = e[l]) && (t = (a ? i(o, r, t) : i(t)) || t);
            return a && t && Ut(o, r, t), t;
          };
        var ce = /*#__PURE__*/function (_s$11) {
          function ce() {
            var _this25;
            _classCallCheck(this, ce);
            _this25 = _callSuper(this, ce, arguments), _this25.onChange = function () {
              return null;
            };
            return _this25;
          }
          _inherits(ce, _s$11);
          return _createClass(ce, [{
            key: "render",
            value: function render() {
              return x(_templateObject59 || (_templateObject59 = _taggedTemplateLiteral(["<input type=\"text\" @input=\"", "\" placeholder=\"Search wallets\"> ", ""])), this.onChange, v.SEARCH_ICON);
            }
          }]);
        }(s$1);
        ce.styles = [h.globalCss, Bt], Fe([n$2()], ce.prototype, "onChange", 2), ce = Fe([e$3("wcm-search-input")], ce);
        var zt = i$4(_templateObject60 || (_templateObject60 = _taggedTemplateLiteral(["@keyframes rotate{100%{transform:rotate(360deg)}}@keyframes dash{0%{stroke-dasharray:1,150;stroke-dashoffset:0}50%{stroke-dasharray:90,150;stroke-dashoffset:-35}100%{stroke-dasharray:90,150;stroke-dashoffset:-124}}svg{animation:rotate 2s linear infinite;display:flex;justify-content:center;align-items:center}svg circle{stroke-linecap:round;animation:dash 1.5s ease infinite;stroke:var(--wcm-accent-color)}"])));
        var qt = function qt(e, o, r, a) {
          for (var t = o, l = e.length - 1, i; l >= 0; l--) (i = e[l]) && (t = i(t) || t);
          return t;
        };
        var ke = /*#__PURE__*/function (_s$12) {
          function ke() {
            _classCallCheck(this, ke);
            return _callSuper(this, ke, arguments);
          }
          _inherits(ke, _s$12);
          return _createClass(ke, [{
            key: "render",
            value: function render() {
              return x(_templateObject61 || (_templateObject61 = _taggedTemplateLiteral(["<svg viewBox=\"0 0 50 50\" width=\"24\" height=\"24\"><circle cx=\"25\" cy=\"25\" r=\"20\" fill=\"none\" stroke-width=\"4\" stroke=\"#fff\"/></svg>"])));
            }
          }]);
        }(s$1);
        ke.styles = [h.globalCss, zt], ke = qt([e$3("wcm-spinner")], ke);
        var Qt = i$4(_templateObject62 || (_templateObject62 = _taggedTemplateLiteral(["span{font-style:normal;font-family:var(--wcm-font-family);font-feature-settings:var(--wcm-font-feature-settings)}.wcm-xsmall-bold{font-family:var(--wcm-text-xsmall-bold-font-family);font-weight:var(--wcm-text-xsmall-bold-weight);font-size:var(--wcm-text-xsmall-bold-size);line-height:var(--wcm-text-xsmall-bold-line-height);letter-spacing:var(--wcm-text-xsmall-bold-letter-spacing);text-transform:var(--wcm-text-xsmall-bold-text-transform)}.wcm-xsmall-regular{font-family:var(--wcm-text-xsmall-regular-font-family);font-weight:var(--wcm-text-xsmall-regular-weight);font-size:var(--wcm-text-xsmall-regular-size);line-height:var(--wcm-text-xsmall-regular-line-height);letter-spacing:var(--wcm-text-xsmall-regular-letter-spacing);text-transform:var(--wcm-text-xsmall-regular-text-transform)}.wcm-small-thin{font-family:var(--wcm-text-small-thin-font-family);font-weight:var(--wcm-text-small-thin-weight);font-size:var(--wcm-text-small-thin-size);line-height:var(--wcm-text-small-thin-line-height);letter-spacing:var(--wcm-text-small-thin-letter-spacing);text-transform:var(--wcm-text-small-thin-text-transform)}.wcm-small-regular{font-family:var(--wcm-text-small-regular-font-family);font-weight:var(--wcm-text-small-regular-weight);font-size:var(--wcm-text-small-regular-size);line-height:var(--wcm-text-small-regular-line-height);letter-spacing:var(--wcm-text-small-regular-letter-spacing);text-transform:var(--wcm-text-small-regular-text-transform)}.wcm-medium-regular{font-family:var(--wcm-text-medium-regular-font-family);font-weight:var(--wcm-text-medium-regular-weight);font-size:var(--wcm-text-medium-regular-size);line-height:var(--wcm-text-medium-regular-line-height);letter-spacing:var(--wcm-text-medium-regular-letter-spacing);text-transform:var(--wcm-text-medium-regular-text-transform)}.wcm-big-bold{font-family:var(--wcm-text-big-bold-font-family);font-weight:var(--wcm-text-big-bold-weight);font-size:var(--wcm-text-big-bold-size);line-height:var(--wcm-text-big-bold-line-height);letter-spacing:var(--wcm-text-big-bold-letter-spacing);text-transform:var(--wcm-text-big-bold-text-transform)}:host(*){color:var(--wcm-color-fg-1)}.wcm-color-primary{color:var(--wcm-color-fg-1)}.wcm-color-secondary{color:var(--wcm-color-fg-2)}.wcm-color-tertiary{color:var(--wcm-color-fg-3)}.wcm-color-inverse{color:var(--wcm-accent-fill-color)}.wcm-color-accnt{color:var(--wcm-accent-color)}.wcm-color-error{color:var(--wcm-error-color)}"])));
        var Kt = Object.defineProperty,
          Yt = Object.getOwnPropertyDescriptor,
          Oe = function Oe(e, o, r, a) {
            for (var t = a > 1 ? void 0 : a ? Yt(o, r) : o, l = e.length - 1, i; l >= 0; l--) (i = e[l]) && (t = (a ? i(o, r, t) : i(t)) || t);
            return a && t && Kt(o, r, t), t;
          };
        var re = /*#__PURE__*/function (_s$13) {
          function re() {
            var _this26;
            _classCallCheck(this, re);
            _this26 = _callSuper(this, re, arguments), _this26.variant = "medium-regular", _this26.color = "primary";
            return _this26;
          }
          _inherits(re, _s$13);
          return _createClass(re, [{
            key: "render",
            value: function render() {
              var e = {
                "wcm-big-bold": this.variant === "big-bold",
                "wcm-medium-regular": this.variant === "medium-regular",
                "wcm-small-regular": this.variant === "small-regular",
                "wcm-small-thin": this.variant === "small-thin",
                "wcm-xsmall-regular": this.variant === "xsmall-regular",
                "wcm-xsmall-bold": this.variant === "xsmall-bold",
                "wcm-color-primary": this.color === "primary",
                "wcm-color-secondary": this.color === "secondary",
                "wcm-color-tertiary": this.color === "tertiary",
                "wcm-color-inverse": this.color === "inverse",
                "wcm-color-accnt": this.color === "accent",
                "wcm-color-error": this.color === "error"
              };
              return x(_templateObject63 || (_templateObject63 = _taggedTemplateLiteral(["<span><slot class=\"", "\"></slot></span>"])), o$1(e));
            }
          }]);
        }(s$1);
        re.styles = [h.globalCss, Qt], Oe([n$2()], re.prototype, "variant", 2), Oe([n$2()], re.prototype, "color", 2), re = Oe([e$3("wcm-text")], re);
        var Gt = i$4(_templateObject64 || (_templateObject64 = _taggedTemplateLiteral(["button{width:100%;height:100%;border-radius:var(--wcm-button-hover-highlight-border-radius);display:flex;align-items:flex-start}button:active{background-color:var(--wcm-color-overlay)}@media(hover:hover){button:hover{background-color:var(--wcm-color-overlay)}}button>div{width:80px;padding:5px 0;display:flex;flex-direction:column;align-items:center}wcm-text{width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-align:center}wcm-wallet-image{height:60px;width:60px;transition:all .2s ease;border-radius:var(--wcm-wallet-icon-border-radius);margin-bottom:5px}.wcm-sublabel{margin-top:2px}"])));
        var Xt = Object.defineProperty,
          Jt = Object.getOwnPropertyDescriptor,
          _ = function _(e, o, r, a) {
            for (var t = a > 1 ? void 0 : a ? Jt(o, r) : o, l = e.length - 1, i; l >= 0; l--) (i = e[l]) && (t = (a ? i(o, r, t) : i(t)) || t);
            return a && t && Xt(o, r, t), t;
          };
        var L = /*#__PURE__*/function (_s$14) {
          function L() {
            var _this27;
            _classCallCheck(this, L);
            _this27 = _callSuper(this, L, arguments), _this27.onClick = function () {
              return null;
            }, _this27.name = "", _this27.walletId = "", _this27.label = void 0, _this27.imageId = void 0, _this27.installed = false, _this27.recent = false;
            return _this27;
          }
          _inherits(L, _s$14);
          return _createClass(L, [{
            key: "sublabelTemplate",
            value: function sublabelTemplate() {
              return this.recent ? x(_templateObject65 || (_templateObject65 = _taggedTemplateLiteral(["<wcm-text class=\"wcm-sublabel\" variant=\"xsmall-bold\" color=\"tertiary\">RECENT</wcm-text>"]))) : this.installed ? x(_templateObject66 || (_templateObject66 = _taggedTemplateLiteral(["<wcm-text class=\"wcm-sublabel\" variant=\"xsmall-bold\" color=\"tertiary\">INSTALLED</wcm-text>"]))) : null;
            }
          }, {
            key: "handleClick",
            value: function handleClick() {
              R$2.click({
                name: "WALLET_BUTTON",
                walletId: this.walletId
              }), this.onClick();
            }
          }, {
            key: "render",
            value: function render() {
              var e;
              return x(_templateObject67 || (_templateObject67 = _taggedTemplateLiteral(["<button @click=\"", "\"><div><wcm-wallet-image walletId=\"", "\" imageId=\"", "\"></wcm-wallet-image><wcm-text variant=\"xsmall-regular\">", "</wcm-text>", "</div></button>"])), this.handleClick.bind(this), this.walletId, l(this.imageId), (e = this.label) != null ? e : c.getWalletName(this.name, true), this.sublabelTemplate());
            }
          }]);
        }(s$1);
        L.styles = [h.globalCss, Gt], _([n$2()], L.prototype, "onClick", 2), _([n$2()], L.prototype, "name", 2), _([n$2()], L.prototype, "walletId", 2), _([n$2()], L.prototype, "label", 2), _([n$2()], L.prototype, "imageId", 2), _([n$2({
          type: Boolean
        })], L.prototype, "installed", 2), _([n$2({
          type: Boolean
        })], L.prototype, "recent", 2), L = _([e$3("wcm-wallet-button")], L);
        var eo = i$4(_templateObject68 || (_templateObject68 = _taggedTemplateLiteral([":host{display:block}div{overflow:hidden;position:relative;border-radius:inherit;width:100%;height:100%;background-color:var(--wcm-color-overlay)}svg{position:relative;width:100%;height:100%}div::after{content:'';position:absolute;top:0;bottom:0;left:0;right:0;border-radius:inherit;border:1px solid var(--wcm-color-overlay)}div img{width:100%;height:100%;object-fit:cover;object-position:center}#wallet-placeholder-fill{fill:var(--wcm-color-bg-3)}#wallet-placeholder-dash{stroke:var(--wcm-color-overlay)}"])));
        var to = Object.defineProperty,
          oo = Object.getOwnPropertyDescriptor,
          se = function se(e, o, r, a) {
            for (var t = a > 1 ? void 0 : a ? oo(o, r) : o, l = e.length - 1, i; l >= 0; l--) (i = e[l]) && (t = (a ? i(o, r, t) : i(t)) || t);
            return a && t && to(o, r, t), t;
          };
        var Q = /*#__PURE__*/function (_s$15) {
          function Q() {
            var _this28;
            _classCallCheck(this, Q);
            _this28 = _callSuper(this, Q, arguments), _this28.walletId = "", _this28.imageId = void 0, _this28.imageUrl = void 0;
            return _this28;
          }
          _inherits(Q, _s$15);
          return _createClass(Q, [{
            key: "render",
            value: function render() {
              var e;
              var o = (e = this.imageUrl) != null && e.length ? this.imageUrl : c.getWalletIcon({
                id: this.walletId,
                image_id: this.imageId
              });
              return x(_templateObject69 || (_templateObject69 = _taggedTemplateLiteral(["", ""])), o.length ? x(_templateObject70 || (_templateObject70 = _taggedTemplateLiteral(["<div><img crossorigin=\"anonymous\" src=\"", "\" alt=\"", "\"></div>"])), o, this.id) : v.WALLET_PLACEHOLDER);
            }
          }]);
        }(s$1);
        Q.styles = [h.globalCss, eo], se([n$2()], Q.prototype, "walletId", 2), se([n$2()], Q.prototype, "imageId", 2), se([n$2()], Q.prototype, "imageUrl", 2), Q = se([e$3("wcm-wallet-image")], Q);
        var ro = Object.defineProperty,
          ao = Object.getOwnPropertyDescriptor,
          qe = function qe(e, o, r, a) {
            for (var t = a > 1 ? void 0 : a ? ao(o, r) : o, l = e.length - 1, i; l >= 0; l--) (i = e[l]) && (t = (a ? i(o, r, t) : i(t)) || t);
            return a && t && ro(o, r, t), t;
          };
        var We = /*#__PURE__*/function (_s$16) {
          function We() {
            var _this29;
            _classCallCheck(this, We);
            _this29 = _callSuper(this, We), _this29.preload = true, _this29.preloadData();
            return _this29;
          }
          _inherits(We, _s$16);
          return _createClass(We, [{
            key: "loadImages",
            value: function () {
              var _loadImages = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(e) {
                return _regeneratorRuntime().wrap(function _callee6$(_context6) {
                  while (1) switch (_context6.prev = _context6.next) {
                    case 0:
                      _context6.prev = 0;
                      _context6.t0 = e != null && e.length;
                      if (!_context6.t0) {
                        _context6.next = 5;
                        break;
                      }
                      _context6.next = 5;
                      return Promise.all(e.map( /*#__PURE__*/function () {
                        var _ref31 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(o) {
                          return _regeneratorRuntime().wrap(function _callee5$(_context5) {
                            while (1) switch (_context5.prev = _context5.next) {
                              case 0:
                                return _context5.abrupt("return", c.preloadImage(o));
                              case 1:
                              case "end":
                                return _context5.stop();
                            }
                          }, _callee5);
                        }));
                        return function (_x3) {
                          return _ref31.apply(this, arguments);
                        };
                      }()));
                    case 5:
                      _context6.next = 10;
                      break;
                    case 7:
                      _context6.prev = 7;
                      _context6.t1 = _context6["catch"](0);
                      console.info("Unsuccessful attempt at preloading some images", e);
                    case 10:
                    case "end":
                      return _context6.stop();
                  }
                }, _callee6, null, [[0, 7]]);
              }));
              function loadImages(_x2) {
                return _loadImages.apply(this, arguments);
              }
              return loadImages;
            }()
          }, {
            key: "preloadListings",
            value: function () {
              var _preloadListings = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
                var _e9, _o2;
                return _regeneratorRuntime().wrap(function _callee7$(_context7) {
                  while (1) switch (_context7.prev = _context7.next) {
                    case 0:
                      if (!y$2.state.enableExplorer) {
                        _context7.next = 9;
                        break;
                      }
                      _context7.next = 3;
                      return te$1.getRecomendedWallets();
                    case 3:
                      p$2.setIsDataLoaded(true);
                      _e9 = te$1.state.recomendedWallets, _o2 = _e9.map(function (r) {
                        return c.getWalletIcon(r);
                      });
                      _context7.next = 7;
                      return this.loadImages(_o2);
                    case 7:
                      _context7.next = 10;
                      break;
                    case 9:
                      p$2.setIsDataLoaded(true);
                    case 10:
                    case "end":
                      return _context7.stop();
                  }
                }, _callee7, this);
              }));
              function preloadListings() {
                return _preloadListings.apply(this, arguments);
              }
              return preloadListings;
            }()
          }, {
            key: "preloadCustomImages",
            value: function () {
              var _preloadCustomImages = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
                var e;
                return _regeneratorRuntime().wrap(function _callee8$(_context8) {
                  while (1) switch (_context8.prev = _context8.next) {
                    case 0:
                      e = c.getCustomImageUrls();
                      _context8.next = 3;
                      return this.loadImages(e);
                    case 3:
                    case "end":
                      return _context8.stop();
                  }
                }, _callee8, this);
              }));
              function preloadCustomImages() {
                return _preloadCustomImages.apply(this, arguments);
              }
              return preloadCustomImages;
            }()
          }, {
            key: "preloadData",
            value: function () {
              var _preloadData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
                return _regeneratorRuntime().wrap(function _callee9$(_context9) {
                  while (1) switch (_context9.prev = _context9.next) {
                    case 0:
                      _context9.prev = 0;
                      _context9.t0 = this.preload;
                      if (!_context9.t0) {
                        _context9.next = 6;
                        break;
                      }
                      this.preload = !1;
                      _context9.next = 6;
                      return Promise.all([this.preloadListings(), this.preloadCustomImages()]);
                    case 6:
                      _context9.next = 11;
                      break;
                    case 8:
                      _context9.prev = 8;
                      _context9.t1 = _context9["catch"](0);
                      console.error(_context9.t1), oe$1.openToast("Failed preloading", "error");
                    case 11:
                    case "end":
                      return _context9.stop();
                  }
                }, _callee9, this, [[0, 8]]);
              }));
              function preloadData() {
                return _preloadData.apply(this, arguments);
              }
              return preloadData;
            }()
          }]);
        }(s$1);
        qe([t$2()], We.prototype, "preload", 2), We = qe([e$3("wcm-explorer-context")], We);
        var no = function no(e, o, r, a) {
          for (var t = o, l = e.length - 1, i; l >= 0; l--) (i = e[l]) && (t = i(t) || t);
          return t;
        };
        var Qe = /*#__PURE__*/function (_s$17) {
          function Qe() {
            var _this30;
            _classCallCheck(this, Qe);
            _this30 = _callSuper(this, Qe), _this30.unsubscribeTheme = void 0, h.setTheme(), _this30.unsubscribeTheme = ne$1.subscribe(h.setTheme);
            return _this30;
          }
          _inherits(Qe, _s$17);
          return _createClass(Qe, [{
            key: "disconnectedCallback",
            value: function disconnectedCallback() {
              var e;
              (e = this.unsubscribeTheme) == null || e.call(this);
            }
          }]);
        }(s$1);
        Qe = no([e$3("wcm-theme-context")], Qe);
        var co = i$4(_templateObject71 || (_templateObject71 = _taggedTemplateLiteral(["@keyframes scroll{0%{transform:translate3d(0,0,0)}100%{transform:translate3d(calc(-70px * 9),0,0)}}.wcm-slider{position:relative;overflow-x:hidden;padding:10px 0;margin:0 -20px;width:calc(100% + 40px)}.wcm-track{display:flex;width:calc(70px * 18);animation:scroll 20s linear infinite;opacity:.7}.wcm-track svg{margin:0 5px}wcm-wallet-image{width:60px;height:60px;margin:0 5px;border-radius:var(--wcm-wallet-icon-border-radius)}.wcm-grid{display:grid;grid-template-columns:repeat(4,80px);justify-content:space-between}.wcm-title{display:flex;align-items:center;margin-bottom:10px}.wcm-title svg{margin-right:6px}.wcm-title path{fill:var(--wcm-accent-color)}wcm-modal-footer .wcm-title{padding:0 10px}wcm-button-big{position:absolute;top:50%;left:50%;transform:translateY(-50%) translateX(-50%);filter:drop-shadow(0 0 17px var(--wcm-color-bg-1))}wcm-info-footer{flex-direction:column;align-items:center;display:flex;width:100%;padding:5px 0}wcm-info-footer wcm-text{text-align:center;margin-bottom:15px}#wallet-placeholder-fill{fill:var(--wcm-color-bg-3)}#wallet-placeholder-dash{stroke:var(--wcm-color-overlay)}"])));
        var ho = function ho(e, o, r, a) {
          for (var t = o, l = e.length - 1, i; l >= 0; l--) (i = e[l]) && (t = i(t) || t);
          return t;
        };
        var Ie = /*#__PURE__*/function (_s$18) {
          function Ie() {
            _classCallCheck(this, Ie);
            return _callSuper(this, Ie, arguments);
          }
          _inherits(Ie, _s$18);
          return _createClass(Ie, [{
            key: "onGoToQrcode",
            value: function onGoToQrcode() {
              T$3.push("Qrcode");
            }
          }, {
            key: "render",
            value: function render() {
              var e = te$1.state.recomendedWallets,
                o = [].concat(_toConsumableArray(e), _toConsumableArray(e)),
                r = a$3.RECOMMENDED_WALLET_AMOUNT * 2;
              return x(_templateObject72 || (_templateObject72 = _taggedTemplateLiteral(["<wcm-modal-header title=\"Connect your wallet\" .onAction=\"", "\" .actionIcon=\"", "\"></wcm-modal-header><wcm-modal-content><div class=\"wcm-title\">", "<wcm-text variant=\"small-regular\" color=\"accent\">WalletConnect</wcm-text></div><div class=\"wcm-slider\"><div class=\"wcm-track\">", "</div><wcm-button-big @click=\"", "\"><wcm-text variant=\"medium-regular\" color=\"inverse\">Select Wallet</wcm-text></wcm-button-big></div></wcm-modal-content><wcm-info-footer><wcm-text color=\"secondary\" variant=\"small-thin\">Choose WalletConnect to see supported apps on your device</wcm-text></wcm-info-footer>"])), this.onGoToQrcode, v.QRCODE_ICON, v.MOBILE_ICON, _toConsumableArray(Array(r)).map(function (a, t) {
                var l = o[t % o.length];
                return l ? x(_templateObject73 || (_templateObject73 = _taggedTemplateLiteral(["<wcm-wallet-image walletId=\"", "\" imageId=\"", "\"></wcm-wallet-image>"])), l.id, l.image_id) : v.WALLET_PLACEHOLDER;
              }), c.handleAndroidLinking);
            }
          }]);
        }(s$1);
        Ie.styles = [h.globalCss, co], Ie = ho([e$3("wcm-android-wallet-selection")], Ie);
        var wo = i$4(_templateObject74 || (_templateObject74 = _taggedTemplateLiteral(["@keyframes loading{to{stroke-dashoffset:0}}@keyframes shake{10%,90%{transform:translate3d(-1px,0,0)}20%,80%{transform:translate3d(1px,0,0)}30%,50%,70%{transform:translate3d(-2px,0,0)}40%,60%{transform:translate3d(2px,0,0)}}:host{display:flex;flex-direction:column;align-items:center}div{position:relative;width:110px;height:110px;display:flex;justify-content:center;align-items:center;margin:40px 0 20px 0;transform:translate3d(0,0,0)}svg{position:absolute;width:110px;height:110px;fill:none;stroke:transparent;stroke-linecap:round;stroke-width:2px;top:0;left:0}use{stroke:var(--wcm-accent-color);animation:loading 1s linear infinite}wcm-wallet-image{border-radius:var(--wcm-wallet-icon-large-border-radius);width:90px;height:90px}wcm-text{margin-bottom:40px}.wcm-error svg{stroke:var(--wcm-error-color)}.wcm-error use{display:none}.wcm-error{animation:shake .4s cubic-bezier(.36,.07,.19,.97) both}.wcm-stale svg,.wcm-stale use{display:none}"])));
        var po = Object.defineProperty,
          go = Object.getOwnPropertyDescriptor,
          K = function K(e, o, r, a) {
            for (var t = a > 1 ? void 0 : a ? go(o, r) : o, l = e.length - 1, i; l >= 0; l--) (i = e[l]) && (t = (a ? i(o, r, t) : i(t)) || t);
            return a && t && po(o, r, t), t;
          };
        var D = /*#__PURE__*/function (_s$19) {
          function D() {
            var _this31;
            _classCallCheck(this, D);
            _this31 = _callSuper(this, D, arguments), _this31.walletId = void 0, _this31.imageId = void 0, _this31.isError = false, _this31.isStale = false, _this31.label = "";
            return _this31;
          }
          _inherits(D, _s$19);
          return _createClass(D, [{
            key: "svgLoaderTemplate",
            value: function svgLoaderTemplate() {
              var e, o;
              var r = (o = (e = ne$1.state.themeVariables) == null ? void 0 : e["--wcm-wallet-icon-large-border-radius"]) != null ? o : h.getPreset("--wcm-wallet-icon-large-border-radius");
              var a = 0;
              r.includes("%") ? a = 88 / 100 * parseInt(r, 10) : a = parseInt(r, 10), a *= 1.17;
              var t = 317 - a * 1.57,
                l = 425 - a * 1.8;
              return x(_templateObject75 || (_templateObject75 = _taggedTemplateLiteral(["<svg viewBox=\"0 0 110 110\" width=\"110\" height=\"110\"><rect id=\"wcm-loader\" x=\"2\" y=\"2\" width=\"106\" height=\"106\" rx=\"", "\"/><use xlink:href=\"#wcm-loader\" stroke-dasharray=\"106 ", "\" stroke-dashoffset=\"", "\"></use></svg>"])), a, t, l);
            }
          }, {
            key: "render",
            value: function render() {
              var e = {
                "wcm-error": this.isError,
                "wcm-stale": this.isStale
              };
              return x(_templateObject76 || (_templateObject76 = _taggedTemplateLiteral(["<div class=\"", "\">", "<wcm-wallet-image walletId=\"", "\" imageId=\"", "\"></wcm-wallet-image></div><wcm-text variant=\"medium-regular\" color=\"", "\">", "</wcm-text>"])), o$1(e), this.svgLoaderTemplate(), l(this.walletId), l(this.imageId), this.isError ? "error" : "primary", this.isError ? "Connection declined" : this.label);
            }
          }]);
        }(s$1);
        D.styles = [h.globalCss, wo], K([n$2()], D.prototype, "walletId", 2), K([n$2()], D.prototype, "imageId", 2), K([n$2({
          type: Boolean
        })], D.prototype, "isError", 2), K([n$2({
          type: Boolean
        })], D.prototype, "isStale", 2), K([n$2()], D.prototype, "label", 2), D = K([e$3("wcm-connector-waiting")], D);
        var G = {
            manualWallets: function manualWallets() {
              var e, o;
              var _y$2$state = y$2.state,
                r = _y$2$state.mobileWallets,
                a = _y$2$state.desktopWallets,
                t = (e = G.recentWallet()) == null ? void 0 : e.id,
                l = a$3.isMobile() ? r : a,
                i = l === null || l === void 0 ? void 0 : l.filter(function (s) {
                  return t !== s.id;
                });
              return (o = a$3.isMobile() ? i === null || i === void 0 ? void 0 : i.map(function (_ref32) {
                var s = _ref32.id,
                  $ = _ref32.name,
                  f = _ref32.links;
                return {
                  id: s,
                  name: $,
                  mobile: f,
                  links: f
                };
              }) : i === null || i === void 0 ? void 0 : i.map(function (_ref33) {
                var s = _ref33.id,
                  $ = _ref33.name,
                  f = _ref33.links;
                return {
                  id: s,
                  name: $,
                  desktop: f,
                  links: f
                };
              })) != null ? o : [];
            },
            recentWallet: function recentWallet() {
              return c.getRecentWallet();
            },
            recomendedWallets: function recomendedWallets() {
              var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
              var o;
              var r = e || (o = G.recentWallet()) == null ? void 0 : o.id,
                a = te$1.state.recomendedWallets;
              return a.filter(function (t) {
                return r !== t.id;
              });
            }
          },
          Z = {
            onConnecting: function onConnecting(e) {
              c.goToConnectingView(e);
            },
            manualWalletsTemplate: function manualWalletsTemplate() {
              var _this32 = this;
              return G.manualWallets().map(function (e) {
                return x(_templateObject77 || (_templateObject77 = _taggedTemplateLiteral(["<wcm-wallet-button walletId=\"", "\" name=\"", "\" .onClick=\"", "\"></wcm-wallet-button>"])), e.id, e.name, function () {
                  return _this32.onConnecting(e);
                });
              });
            },
            recomendedWalletsTemplate: function recomendedWalletsTemplate() {
              var _this33 = this;
              var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
              return G.recomendedWallets(e).map(function (o) {
                return x(_templateObject78 || (_templateObject78 = _taggedTemplateLiteral(["<wcm-wallet-button name=\"", "\" walletId=\"", "\" imageId=\"", "\" .onClick=\"", "\"></wcm-wallet-button>"])), o.name, o.id, o.image_id, function () {
                  return _this33.onConnecting(o);
                });
              });
            },
            recentWalletTemplate: function recentWalletTemplate() {
              var _this34 = this;
              var e = G.recentWallet();
              if (e) return x(_templateObject79 || (_templateObject79 = _taggedTemplateLiteral(["<wcm-wallet-button name=\"", "\" walletId=\"", "\" imageId=\"", "\" .recent=\"", "\" .onClick=\"", "\"></wcm-wallet-button>"])), e.name, e.id, l(e.image_id), true, function () {
                return _this34.onConnecting(e);
              });
            }
          },
          vo = i$4(_templateObject80 || (_templateObject80 = _taggedTemplateLiteral([".wcm-grid{display:grid;grid-template-columns:repeat(4,80px);justify-content:space-between}.wcm-desktop-title,.wcm-mobile-title{display:flex;align-items:center}.wcm-mobile-title{justify-content:space-between;margin-bottom:20px;margin-top:-10px}.wcm-desktop-title{margin-bottom:10px;padding:0 10px}.wcm-subtitle{display:flex;align-items:center}.wcm-subtitle:last-child path{fill:var(--wcm-color-fg-3)}.wcm-desktop-title svg,.wcm-mobile-title svg{margin-right:6px}.wcm-desktop-title path,.wcm-mobile-title path{fill:var(--wcm-accent-color)}"])));
        var fo = function fo(e, o, r, a) {
          for (var t = o, l = e.length - 1, i; l >= 0; l--) (i = e[l]) && (t = i(t) || t);
          return t;
        };
        var Ee = /*#__PURE__*/function (_s$20) {
          function Ee() {
            _classCallCheck(this, Ee);
            return _callSuper(this, Ee, arguments);
          }
          _inherits(Ee, _s$20);
          return _createClass(Ee, [{
            key: "render",
            value: function render() {
              var _y$2$state2 = y$2.state,
                e = _y$2$state2.explorerExcludedWalletIds,
                o = _y$2$state2.enableExplorer,
                r = e !== "ALL" && o,
                a = Z.manualWalletsTemplate(),
                t = Z.recomendedWalletsTemplate();
              var l = [Z.recentWalletTemplate()].concat(_toConsumableArray(a), _toConsumableArray(t));
              l = l.filter(Boolean);
              var i = l.length > 4 || r;
              var s = [];
              i ? s = l.slice(0, 3) : s = l;
              var $ = Boolean(s.length);
              return x(_templateObject81 || (_templateObject81 = _taggedTemplateLiteral(["<wcm-modal-header .border=\"", "\" title=\"Connect your wallet\" .onAction=\"", "\" .actionIcon=\"", "\"></wcm-modal-header><wcm-modal-content><div class=\"wcm-mobile-title\"><div class=\"wcm-subtitle\">", "<wcm-text variant=\"small-regular\" color=\"accent\">Mobile</wcm-text></div><div class=\"wcm-subtitle\">", "<wcm-text variant=\"small-regular\" color=\"secondary\">Scan with your wallet</wcm-text></div></div><wcm-walletconnect-qr></wcm-walletconnect-qr></wcm-modal-content>", ""])), true, c.handleUriCopy, v.COPY_ICON, v.MOBILE_ICON, v.SCAN_ICON, $ ? x(_templateObject82 || (_templateObject82 = _taggedTemplateLiteral(["<wcm-modal-footer><div class=\"wcm-desktop-title\">", "<wcm-text variant=\"small-regular\" color=\"accent\">Desktop</wcm-text></div><div class=\"wcm-grid\">", " ", "</div></wcm-modal-footer>"])), v.DESKTOP_ICON, s, i ? x(_templateObject83 || (_templateObject83 = _taggedTemplateLiteral(["<wcm-view-all-wallets-button></wcm-view-all-wallets-button>"]))) : null) : null);
            }
          }]);
        }(s$1);
        Ee.styles = [h.globalCss, vo], Ee = fo([e$3("wcm-desktop-wallet-selection")], Ee);
        var xo = i$4(_templateObject84 || (_templateObject84 = _taggedTemplateLiteral(["div{background-color:var(--wcm-color-bg-2);padding:10px 20px 15px 20px;border-top:1px solid var(--wcm-color-bg-3);text-align:center}a{color:var(--wcm-accent-color);text-decoration:none;transition:opacity .2s ease-in-out;display:inline}a:active{opacity:.8}@media(hover:hover){a:hover{opacity:.8}}"])));
        var Co = function Co(e, o, r, a) {
          for (var t = o, l = e.length - 1, i; l >= 0; l--) (i = e[l]) && (t = i(t) || t);
          return t;
        };
        var Me = /*#__PURE__*/function (_s$21) {
          function Me() {
            _classCallCheck(this, Me);
            return _callSuper(this, Me, arguments);
          }
          _inherits(Me, _s$21);
          return _createClass(Me, [{
            key: "render",
            value: function render() {
              var _y$2$state3 = y$2.state,
                e = _y$2$state3.termsOfServiceUrl,
                o = _y$2$state3.privacyPolicyUrl;
              return (e !== null && e !== void 0 ? e : o) ? x(_templateObject85 || (_templateObject85 = _taggedTemplateLiteral(["<div><wcm-text variant=\"small-regular\" color=\"secondary\">By connecting your wallet to this app, you agree to the app's ", " ", " ", "</wcm-text></div>"])), e ? x(_templateObject86 || (_templateObject86 = _taggedTemplateLiteral(["<a href=\"", "\" target=\"_blank\" rel=\"noopener noreferrer\">Terms of Service</a>"])), e) : null, e && o ? "and" : null, o ? x(_templateObject87 || (_templateObject87 = _taggedTemplateLiteral(["<a href=\"", "\" target=\"_blank\" rel=\"noopener noreferrer\">Privacy Policy</a>"])), o) : null) : null;
            }
          }]);
        }(s$1);
        Me.styles = [h.globalCss, xo], Me = Co([e$3("wcm-legal-notice")], Me);
        var ko = i$4(_templateObject88 || (_templateObject88 = _taggedTemplateLiteral(["div{display:grid;grid-template-columns:repeat(4,80px);margin:0 -10px;justify-content:space-between;row-gap:10px}"])));
        var Io = function Io(e, o, r, a) {
          for (var t = o, l = e.length - 1, i; l >= 0; l--) (i = e[l]) && (t = i(t) || t);
          return t;
        };
        var Le = /*#__PURE__*/function (_s$22) {
          function Le() {
            _classCallCheck(this, Le);
            return _callSuper(this, Le, arguments);
          }
          _inherits(Le, _s$22);
          return _createClass(Le, [{
            key: "onQrcode",
            value: function onQrcode() {
              T$3.push("Qrcode");
            }
          }, {
            key: "render",
            value: function render() {
              var _y$2$state4 = y$2.state,
                e = _y$2$state4.explorerExcludedWalletIds,
                o = _y$2$state4.enableExplorer,
                r = e !== "ALL" && o,
                a = Z.manualWalletsTemplate(),
                t = Z.recomendedWalletsTemplate();
              var l = [Z.recentWalletTemplate()].concat(_toConsumableArray(a), _toConsumableArray(t));
              l = l.filter(Boolean);
              var i = l.length > 8 || r;
              var s = [];
              i ? s = l.slice(0, 7) : s = l;
              var $ = Boolean(s.length);
              return x(_templateObject89 || (_templateObject89 = _taggedTemplateLiteral(["<wcm-modal-header title=\"Connect your wallet\" .onAction=\"", "\" .actionIcon=\"", "\"></wcm-modal-header>", ""])), this.onQrcode, v.QRCODE_ICON, $ ? x(_templateObject90 || (_templateObject90 = _taggedTemplateLiteral(["<wcm-modal-content><div>", " ", "</div></wcm-modal-content>"])), s, i ? x(_templateObject91 || (_templateObject91 = _taggedTemplateLiteral(["<wcm-view-all-wallets-button></wcm-view-all-wallets-button>"]))) : null) : null);
            }
          }]);
        }(s$1);
        Le.styles = [h.globalCss, ko], Le = Io([e$3("wcm-mobile-wallet-selection")], Le);
        var Eo = i$4(_templateObject92 || (_templateObject92 = _taggedTemplateLiteral([":host{all:initial}.wcm-overlay{top:0;bottom:0;left:0;right:0;position:fixed;z-index:var(--wcm-z-index);overflow:hidden;display:flex;justify-content:center;align-items:center;opacity:0;pointer-events:none;background-color:var(--wcm-overlay-background-color);backdrop-filter:var(--wcm-overlay-backdrop-filter)}@media(max-height:720px) and (orientation:landscape){.wcm-overlay{overflow:scroll;align-items:flex-start;padding:20px 0}}.wcm-active{pointer-events:auto}.wcm-container{position:relative;max-width:360px;width:100%;outline:0;border-radius:var(--wcm-background-border-radius) var(--wcm-background-border-radius) var(--wcm-container-border-radius) var(--wcm-container-border-radius);border:1px solid var(--wcm-color-overlay);overflow:hidden}.wcm-card{width:100%;position:relative;border-radius:var(--wcm-container-border-radius);overflow:hidden;box-shadow:0 6px 14px -6px rgba(10,16,31,.12),0 10px 32px -4px rgba(10,16,31,.1),0 0 0 1px var(--wcm-color-overlay);background-color:var(--wcm-color-bg-1);color:var(--wcm-color-fg-1)}@media(max-width:600px){.wcm-container{max-width:440px;border-radius:var(--wcm-background-border-radius) var(--wcm-background-border-radius) 0 0}.wcm-card{border-radius:var(--wcm-container-border-radius) var(--wcm-container-border-radius) 0 0}.wcm-overlay{align-items:flex-end}}@media(max-width:440px){.wcm-container{border:0}}"])));
        var Mo = Object.defineProperty,
          Lo = Object.getOwnPropertyDescriptor,
          Re = function Re(e, o, r, a) {
            for (var t = a > 1 ? void 0 : a ? Lo(o, r) : o, l = e.length - 1, i; l >= 0; l--) (i = e[l]) && (t = (a ? i(o, r, t) : i(t)) || t);
            return a && t && Mo(o, r, t), t;
          };
        var ae = exports("WcmModal", /*#__PURE__*/function (_s$23) {
          function _class3() {
            var _this35;
            _classCallCheck(this, _class3);
            _this35 = _callSuper(this, _class3), _this35.open = false, _this35.active = false, _this35.unsubscribeModal = void 0, _this35.abortController = void 0, _this35.unsubscribeModal = se$1.subscribe(function (e) {
              e.open ? _this35.onOpenModalEvent() : _this35.onCloseModalEvent();
            });
            return _this35;
          }
          _inherits(_class3, _s$23);
          return _createClass(_class3, [{
            key: "disconnectedCallback",
            value: function disconnectedCallback() {
              var e;
              (e = this.unsubscribeModal) == null || e.call(this);
            }
          }, {
            key: "overlayEl",
            get: function get() {
              return c.getShadowRootElement(this, ".wcm-overlay");
            }
          }, {
            key: "containerEl",
            get: function get() {
              return c.getShadowRootElement(this, ".wcm-container");
            }
          }, {
            key: "toggleBodyScroll",
            value: function toggleBodyScroll(e) {
              if (document.querySelector("body")) if (e) {
                var _o3 = document.getElementById("wcm-styles");
                _o3 === null || _o3 === void 0 || _o3.remove();
              } else document.head.insertAdjacentHTML("beforeend", '<style id="wcm-styles">html,body{touch-action:none;overflow:hidden;overscroll-behavior:contain;}</style>');
            }
          }, {
            key: "onCloseModal",
            value: function onCloseModal(e) {
              e.target === e.currentTarget && se$1.close();
            }
          }, {
            key: "onOpenModalEvent",
            value: function onOpenModalEvent() {
              var _this36 = this;
              this.toggleBodyScroll(false), this.addKeyboardEvents(), this.open = true, setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
                var e, o, r;
                return _regeneratorRuntime().wrap(function _callee10$(_context10) {
                  while (1) switch (_context10.prev = _context10.next) {
                    case 0:
                      e = c.isMobileAnimation() ? {
                        y: ["50vh", "0vh"]
                      } : {
                        scale: [.98, 1]
                      }, o = .1, r = .2;
                      _context10.next = 3;
                      return Promise.all([animate(_this36.overlayEl, {
                        opacity: [0, 1]
                      }, {
                        delay: o,
                        duration: r
                      }).finished, animate(_this36.containerEl, e, {
                        delay: o,
                        duration: r
                      }).finished]);
                    case 3:
                      _this36.active = true;
                    case 4:
                    case "end":
                      return _context10.stop();
                  }
                }, _callee10);
              })), 0);
            }
          }, {
            key: "onCloseModalEvent",
            value: function () {
              var _onCloseModalEvent = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
                var e, o;
                return _regeneratorRuntime().wrap(function _callee11$(_context11) {
                  while (1) switch (_context11.prev = _context11.next) {
                    case 0:
                      this.toggleBodyScroll(true), this.removeKeyboardEvents();
                      e = c.isMobileAnimation() ? {
                        y: ["0vh", "50vh"]
                      } : {
                        scale: [1, .98]
                      }, o = .2;
                      _context11.next = 4;
                      return Promise.all([animate(this.overlayEl, {
                        opacity: [1, 0]
                      }, {
                        duration: o
                      }).finished, animate(this.containerEl, e, {
                        duration: o
                      }).finished]);
                    case 4:
                      this.containerEl.removeAttribute("style");
                      this.active = false;
                      this.open = false;
                    case 7:
                    case "end":
                      return _context11.stop();
                  }
                }, _callee11, this);
              }));
              function onCloseModalEvent() {
                return _onCloseModalEvent.apply(this, arguments);
              }
              return onCloseModalEvent;
            }()
          }, {
            key: "addKeyboardEvents",
            value: function addKeyboardEvents() {
              var _this37 = this;
              this.abortController = new AbortController(), window.addEventListener("keydown", function (e) {
                var o;
                e.key === "Escape" ? se$1.close() : e.key === "Tab" && ((o = e.target) != null && o.tagName.includes("wcm-") || _this37.containerEl.focus());
              }, this.abortController), this.containerEl.focus();
            }
          }, {
            key: "removeKeyboardEvents",
            value: function removeKeyboardEvents() {
              var e;
              (e = this.abortController) == null || e.abort(), this.abortController = void 0;
            }
          }, {
            key: "render",
            value: function render() {
              var e = {
                "wcm-overlay": true,
                "wcm-active": this.active
              };
              return x(_templateObject93 || (_templateObject93 = _taggedTemplateLiteral(["<wcm-explorer-context></wcm-explorer-context><wcm-theme-context></wcm-theme-context><div id=\"wcm-modal\" class=\"", "\" @click=\"", "\" role=\"alertdialog\" aria-modal=\"true\"><div class=\"wcm-container\" tabindex=\"0\">", "</div></div>"])), o$1(e), this.onCloseModal, this.open ? x(_templateObject94 || (_templateObject94 = _taggedTemplateLiteral(["<wcm-modal-backcard></wcm-modal-backcard><div class=\"wcm-card\"><wcm-modal-router></wcm-modal-router><wcm-modal-toast></wcm-modal-toast></div>"]))) : null);
            }
          }]);
        }(s$1));
        ae.styles = [h.globalCss, Eo], Re([t$2()], ae.prototype, "open", 2), Re([t$2()], ae.prototype, "active", 2), exports("WcmModal", ae = Re([e$3("wcm-modal")], ae));
        var Ro = i$4(_templateObject95 || (_templateObject95 = _taggedTemplateLiteral(["div{display:flex;margin-top:15px}slot{display:inline-block;margin:0 5px}wcm-button{margin:0 5px}"])));
        var Ao = Object.defineProperty,
          Po = Object.getOwnPropertyDescriptor,
          le = function le(e, o, r, a) {
            for (var t = a > 1 ? void 0 : a ? Po(o, r) : o, l = e.length - 1, i; l >= 0; l--) (i = e[l]) && (t = (a ? i(o, r, t) : i(t)) || t);
            return a && t && Ao(o, r, t), t;
          };
        var B = /*#__PURE__*/function (_s$24) {
          function B() {
            var _this38;
            _classCallCheck(this, B);
            _this38 = _callSuper(this, B, arguments), _this38.isMobile = false, _this38.isDesktop = false, _this38.isWeb = false, _this38.isRetry = false;
            return _this38;
          }
          _inherits(B, _s$24);
          return _createClass(B, [{
            key: "onMobile",
            value: function onMobile() {
              a$3.isMobile() ? T$3.replace("MobileConnecting") : T$3.replace("MobileQrcodeConnecting");
            }
          }, {
            key: "onDesktop",
            value: function onDesktop() {
              T$3.replace("DesktopConnecting");
            }
          }, {
            key: "onWeb",
            value: function onWeb() {
              T$3.replace("WebConnecting");
            }
          }, {
            key: "render",
            value: function render() {
              return x(_templateObject96 || (_templateObject96 = _taggedTemplateLiteral(["<div>", " ", " ", " ", "</div>"])), this.isRetry ? x(_templateObject97 || (_templateObject97 = _taggedTemplateLiteral(["<slot></slot>"]))) : null, this.isMobile ? x(_templateObject98 || (_templateObject98 = _taggedTemplateLiteral(["<wcm-button .onClick=\"", "\" .iconLeft=\"", "\" variant=\"outline\">Mobile</wcm-button>"])), this.onMobile, v.MOBILE_ICON) : null, this.isDesktop ? x(_templateObject99 || (_templateObject99 = _taggedTemplateLiteral(["<wcm-button .onClick=\"", "\" .iconLeft=\"", "\" variant=\"outline\">Desktop</wcm-button>"])), this.onDesktop, v.DESKTOP_ICON) : null, this.isWeb ? x(_templateObject100 || (_templateObject100 = _taggedTemplateLiteral(["<wcm-button .onClick=\"", "\" .iconLeft=\"", "\" variant=\"outline\">Web</wcm-button>"])), this.onWeb, v.GLOBE_ICON) : null);
            }
          }]);
        }(s$1);
        B.styles = [h.globalCss, Ro], le([n$2({
          type: Boolean
        })], B.prototype, "isMobile", 2), le([n$2({
          type: Boolean
        })], B.prototype, "isDesktop", 2), le([n$2({
          type: Boolean
        })], B.prototype, "isWeb", 2), le([n$2({
          type: Boolean
        })], B.prototype, "isRetry", 2), B = le([e$3("wcm-platform-selection")], B);
        var To = i$4(_templateObject101 || (_templateObject101 = _taggedTemplateLiteral(["button{display:flex;flex-direction:column;padding:5px 10px;border-radius:var(--wcm-button-hover-highlight-border-radius);height:100%;justify-content:flex-start}.wcm-icons{width:60px;height:60px;display:flex;flex-wrap:wrap;padding:7px;border-radius:var(--wcm-wallet-icon-border-radius);justify-content:space-between;align-items:center;margin-bottom:5px;background-color:var(--wcm-color-bg-2);box-shadow:inset 0 0 0 1px var(--wcm-color-overlay)}button:active{background-color:var(--wcm-color-overlay)}@media(hover:hover){button:hover{background-color:var(--wcm-color-overlay)}}.wcm-icons img{width:21px;height:21px;object-fit:cover;object-position:center;border-radius:calc(var(--wcm-wallet-icon-border-radius)/ 2);border:1px solid var(--wcm-color-overlay)}.wcm-icons svg{width:21px;height:21px}.wcm-icons img:nth-child(1),.wcm-icons img:nth-child(2),.wcm-icons svg:nth-child(1),.wcm-icons svg:nth-child(2){margin-bottom:4px}wcm-text{width:100%;text-align:center}#wallet-placeholder-fill{fill:var(--wcm-color-bg-3)}#wallet-placeholder-dash{stroke:var(--wcm-color-overlay)}"])));
        var Do = function Do(e, o, r, a) {
          for (var t = o, l = e.length - 1, i; l >= 0; l--) (i = e[l]) && (t = i(t) || t);
          return t;
        };
        var Ae = /*#__PURE__*/function (_s$25) {
          function Ae() {
            _classCallCheck(this, Ae);
            return _callSuper(this, Ae, arguments);
          }
          _inherits(Ae, _s$25);
          return _createClass(Ae, [{
            key: "onClick",
            value: function onClick() {
              T$3.push("WalletExplorer");
            }
          }, {
            key: "render",
            value: function render() {
              var e = te$1.state.recomendedWallets,
                o = G.manualWallets(),
                r = [].concat(_toConsumableArray(e), _toConsumableArray(o)).reverse().slice(0, 4);
              return x(_templateObject102 || (_templateObject102 = _taggedTemplateLiteral(["<button @click=\"", "\"><div class=\"wcm-icons\">", " ", "</div><wcm-text variant=\"xsmall-regular\">View All</wcm-text></button>"])), this.onClick, r.map(function (a) {
                var t = c.getWalletIcon(a);
                if (t) return x(_templateObject103 || (_templateObject103 = _taggedTemplateLiteral(["<img crossorigin=\"anonymous\" src=\"", "\">"])), t);
                var l = c.getWalletIcon({
                  id: a.id
                });
                return l ? x(_templateObject104 || (_templateObject104 = _taggedTemplateLiteral(["<img crossorigin=\"anonymous\" src=\"", "\">"])), l) : v.WALLET_PLACEHOLDER;
              }), _toConsumableArray(Array(4 - r.length)).map(function () {
                return v.WALLET_PLACEHOLDER;
              }));
            }
          }]);
        }(s$1);
        Ae.styles = [h.globalCss, To], Ae = Do([e$3("wcm-view-all-wallets-button")], Ae);
        var No = i$4(_templateObject105 || (_templateObject105 = _taggedTemplateLiteral([".wcm-qr-container{width:100%;display:flex;justify-content:center;align-items:center;aspect-ratio:1/1}"])));
        var Zo = Object.defineProperty,
          So = Object.getOwnPropertyDescriptor,
          de = function de(e, o, r, a) {
            for (var t = a > 1 ? void 0 : a ? So(o, r) : o, l = e.length - 1, i; l >= 0; l--) (i = e[l]) && (t = (a ? i(o, r, t) : i(t)) || t);
            return a && t && Zo(o, r, t), t;
          };
        var Y = /*#__PURE__*/function (_s$26) {
          function Y() {
            var _this39;
            _classCallCheck(this, Y);
            _this39 = _callSuper(this, Y), _this39.walletId = "", _this39.imageId = "", _this39.uri = "", setTimeout(function () {
              var e = p$2.state.walletConnectUri;
              _this39.uri = e;
            }, 0);
            return _this39;
          }
          _inherits(Y, _s$26);
          return _createClass(Y, [{
            key: "overlayEl",
            get: function get() {
              return c.getShadowRootElement(this, ".wcm-qr-container");
            }
          }, {
            key: "render",
            value: function render() {
              return x(_templateObject106 || (_templateObject106 = _taggedTemplateLiteral(["<div class=\"wcm-qr-container\">", "</div>"])), this.uri ? x(_templateObject107 || (_templateObject107 = _taggedTemplateLiteral(["<wcm-qrcode size=\"", "\" uri=\"", "\" walletId=\"", "\" imageId=\"", "\"></wcm-qrcode>"])), this.overlayEl.offsetWidth, this.uri, l(this.walletId), l(this.imageId)) : x(_templateObject108 || (_templateObject108 = _taggedTemplateLiteral(["<wcm-spinner></wcm-spinner>"]))));
            }
          }]);
        }(s$1);
        Y.styles = [h.globalCss, No], de([n$2()], Y.prototype, "walletId", 2), de([n$2()], Y.prototype, "imageId", 2), de([t$2()], Y.prototype, "uri", 2), Y = de([e$3("wcm-walletconnect-qr")], Y);
        var Ho = function Ho(e, o, r, a) {
          for (var t = o, l = e.length - 1, i; l >= 0; l--) (i = e[l]) && (t = i(t) || t);
          return t;
        };
        var Pe = /*#__PURE__*/function (_s$27) {
          function Pe() {
            _classCallCheck(this, Pe);
            return _callSuper(this, Pe, arguments);
          }
          _inherits(Pe, _s$27);
          return _createClass(Pe, [{
            key: "viewTemplate",
            value: function viewTemplate() {
              return a$3.isAndroid() ? x(_templateObject109 || (_templateObject109 = _taggedTemplateLiteral(["<wcm-android-wallet-selection></wcm-android-wallet-selection>"]))) : a$3.isMobile() ? x(_templateObject110 || (_templateObject110 = _taggedTemplateLiteral(["<wcm-mobile-wallet-selection></wcm-mobile-wallet-selection>"]))) : x(_templateObject111 || (_templateObject111 = _taggedTemplateLiteral(["<wcm-desktop-wallet-selection></wcm-desktop-wallet-selection>"])));
            }
          }, {
            key: "render",
            value: function render() {
              return x(_templateObject112 || (_templateObject112 = _taggedTemplateLiteral(["", "<wcm-legal-notice></wcm-legal-notice>"])), this.viewTemplate());
            }
          }]);
        }(s$1);
        Pe.styles = [h.globalCss], Pe = Ho([e$3("wcm-connect-wallet-view")], Pe);
        var zo = i$4(_templateObject113 || (_templateObject113 = _taggedTemplateLiteral(["wcm-info-footer{flex-direction:column;align-items:center;display:flex;width:100%;padding:5px 0}wcm-text{text-align:center}"])));
        var Vo = Object.defineProperty,
          Fo = Object.getOwnPropertyDescriptor,
          Ke = function Ke(e, o, r, a) {
            for (var t = a > 1 ? void 0 : a ? Fo(o, r) : o, l = e.length - 1, i; l >= 0; l--) (i = e[l]) && (t = (a ? i(o, r, t) : i(t)) || t);
            return a && t && Vo(o, r, t), t;
          };
        var me = /*#__PURE__*/function (_s$28) {
          function me() {
            var _this40;
            _classCallCheck(this, me);
            _this40 = _callSuper(this, me), _this40.isError = false, _this40.openDesktopApp();
            return _this40;
          }
          _inherits(me, _s$28);
          return _createClass(me, [{
            key: "onFormatAndRedirect",
            value: function onFormatAndRedirect(e) {
              var _a$3$getWalletRouterD2 = a$3.getWalletRouterData(),
                o = _a$3$getWalletRouterD2.desktop,
                r = _a$3$getWalletRouterD2.name,
                a = o === null || o === void 0 ? void 0 : o.native;
              if (a) {
                var _t20 = a$3.formatNativeUrl(a, e, r);
                a$3.openHref(_t20, "_self");
              }
            }
          }, {
            key: "openDesktopApp",
            value: function openDesktopApp() {
              var e = p$2.state.walletConnectUri,
                o = a$3.getWalletRouterData();
              c.setRecentWallet(o), e && this.onFormatAndRedirect(e);
            }
          }, {
            key: "render",
            value: function render() {
              var _a$3$getWalletRouterD3 = a$3.getWalletRouterData(),
                e = _a$3$getWalletRouterD3.name,
                o = _a$3$getWalletRouterD3.id,
                r = _a$3$getWalletRouterD3.image_id,
                _c$getCachedRouterWal2 = c.getCachedRouterWalletPlatforms(),
                a = _c$getCachedRouterWal2.isMobile,
                t = _c$getCachedRouterWal2.isWeb;
              return x(_templateObject114 || (_templateObject114 = _taggedTemplateLiteral(["<wcm-modal-header title=\"", "\" .onAction=\"", "\" .actionIcon=\"", "\"></wcm-modal-header><wcm-modal-content><wcm-connector-waiting walletId=\"", "\" imageId=\"", "\" label=\"", "\" .isError=\"", "\"></wcm-connector-waiting></wcm-modal-content><wcm-info-footer><wcm-text color=\"secondary\" variant=\"small-thin\">", "</wcm-text><wcm-platform-selection .isMobile=\"", "\" .isWeb=\"", "\" .isRetry=\"", "\"><wcm-button .onClick=\"", "\" .iconRight=\"", "\">Retry</wcm-button></wcm-platform-selection></wcm-info-footer>"])), e, c.handleUriCopy, v.COPY_ICON, o, l(r), "Continue in ".concat(e, "..."), this.isError, "Connection can continue loading if ".concat(e, " is not installed on your device"), a, t, true, this.openDesktopApp.bind(this), v.RETRY_ICON);
            }
          }]);
        }(s$1);
        me.styles = [h.globalCss, zo], Ke([t$2()], me.prototype, "isError", 2), me = Ke([e$3("wcm-desktop-connecting-view")], me);
        var qo = i$4(_templateObject115 || (_templateObject115 = _taggedTemplateLiteral(["wcm-info-footer{flex-direction:column;align-items:center;display:flex;width:100%;padding:5px 0}wcm-text{text-align:center}wcm-button{margin-top:15px}"])));
        var Yo = function Yo(e, o, r, a) {
          for (var t = o, l = e.length - 1, i; l >= 0; l--) (i = e[l]) && (t = i(t) || t);
          return t;
        };
        var Te = /*#__PURE__*/function (_s$29) {
          function Te() {
            _classCallCheck(this, Te);
            return _callSuper(this, Te, arguments);
          }
          _inherits(Te, _s$29);
          return _createClass(Te, [{
            key: "onInstall",
            value: function onInstall(e) {
              e && a$3.openHref(e, "_blank");
            }
          }, {
            key: "render",
            value: function render() {
              var _this41 = this;
              var _a$3$getWalletRouterD4 = a$3.getWalletRouterData(),
                e = _a$3$getWalletRouterD4.name,
                o = _a$3$getWalletRouterD4.id,
                r = _a$3$getWalletRouterD4.image_id,
                a = _a$3$getWalletRouterD4.homepage;
              return x(_templateObject116 || (_templateObject116 = _taggedTemplateLiteral(["<wcm-modal-header title=\"", "\"></wcm-modal-header><wcm-modal-content><wcm-connector-waiting walletId=\"", "\" imageId=\"", "\" label=\"Not Detected\" .isStale=\"", "\"></wcm-connector-waiting></wcm-modal-content><wcm-info-footer><wcm-text color=\"secondary\" variant=\"small-thin\">", "</wcm-text><wcm-button .onClick=\"", "\" .iconLeft=\"", "\">Download</wcm-button></wcm-info-footer>"])), e, o, l(r), true, "Download ".concat(e, " to continue. If multiple browser extensions are installed, disable non ").concat(e, " ones and try again"), function () {
                return _this41.onInstall(a);
              }, v.ARROW_DOWN_ICON);
            }
          }]);
        }(s$1);
        Te.styles = [h.globalCss, qo], Te = Yo([e$3("wcm-install-wallet-view")], Te);
        var Go = i$4(_templateObject117 || (_templateObject117 = _taggedTemplateLiteral(["wcm-wallet-image{border-radius:var(--wcm-wallet-icon-large-border-radius);width:96px;height:96px;margin-bottom:20px}wcm-info-footer{display:flex;width:100%}.wcm-app-store{justify-content:space-between}.wcm-app-store wcm-wallet-image{margin-right:10px;margin-bottom:0;width:28px;height:28px;border-radius:var(--wcm-wallet-icon-small-border-radius)}.wcm-app-store div{display:flex;align-items:center}.wcm-app-store wcm-button{margin-right:-10px}.wcm-note{flex-direction:column;align-items:center;padding:5px 0}.wcm-note wcm-text{text-align:center}wcm-platform-selection{margin-top:-15px}.wcm-note wcm-text{margin-top:15px}.wcm-note wcm-text span{color:var(--wcm-accent-color)}"])));
        var Xo = Object.defineProperty,
          Jo = Object.getOwnPropertyDescriptor,
          Ye = function Ye(e, o, r, a) {
            for (var t = a > 1 ? void 0 : a ? Jo(o, r) : o, l = e.length - 1, i; l >= 0; l--) (i = e[l]) && (t = (a ? i(o, r, t) : i(t)) || t);
            return a && t && Xo(o, r, t), t;
          };
        var he = /*#__PURE__*/function (_s$30) {
          function he() {
            var _this42;
            _classCallCheck(this, he);
            _this42 = _callSuper(this, he), _this42.isError = false, _this42.openMobileApp();
            return _this42;
          }
          _inherits(he, _s$30);
          return _createClass(he, [{
            key: "onFormatAndRedirect",
            value: function onFormatAndRedirect(e) {
              var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
              var _a$3$getWalletRouterD5 = a$3.getWalletRouterData(),
                r = _a$3$getWalletRouterD5.mobile,
                a = _a$3$getWalletRouterD5.name,
                t = r === null || r === void 0 ? void 0 : r.native,
                l = r === null || r === void 0 ? void 0 : r.universal;
              if (t && !o) {
                var _i44 = a$3.formatNativeUrl(t, e, a);
                a$3.openHref(_i44, "_self");
              } else if (l) {
                var _i45 = a$3.formatUniversalUrl(l, e, a);
                a$3.openHref(_i45, "_self");
              }
            }
          }, {
            key: "openMobileApp",
            value: function openMobileApp() {
              var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
              var o = p$2.state.walletConnectUri,
                r = a$3.getWalletRouterData();
              c.setRecentWallet(r), o && this.onFormatAndRedirect(o, e);
            }
          }, {
            key: "onGoToAppStore",
            value: function onGoToAppStore(e) {
              e && a$3.openHref(e, "_blank");
            }
          }, {
            key: "render",
            value: function render() {
              var _this43 = this;
              var _a$3$getWalletRouterD6 = a$3.getWalletRouterData(),
                e = _a$3$getWalletRouterD6.name,
                o = _a$3$getWalletRouterD6.id,
                r = _a$3$getWalletRouterD6.image_id,
                a = _a$3$getWalletRouterD6.app,
                t = _a$3$getWalletRouterD6.mobile,
                _c$getCachedRouterWal3 = c.getCachedRouterWalletPlatforms(),
                l$1 = _c$getCachedRouterWal3.isWeb,
                i = a === null || a === void 0 ? void 0 : a.ios,
                s = t === null || t === void 0 ? void 0 : t.universal;
              return x(_templateObject118 || (_templateObject118 = _taggedTemplateLiteral(["<wcm-modal-header title=\"", "\"></wcm-modal-header><wcm-modal-content><wcm-connector-waiting walletId=\"", "\" imageId=\"", "\" label=\"Tap 'Open' to continue\u2026\" .isError=\"", "\"></wcm-connector-waiting></wcm-modal-content><wcm-info-footer class=\"wcm-note\"><wcm-platform-selection .isWeb=\"", "\" .isRetry=\"", "\"><wcm-button .onClick=\"", "\" .iconRight=\"", "\">Retry</wcm-button></wcm-platform-selection>", "</wcm-info-footer><wcm-info-footer class=\"wcm-app-store\"><div><wcm-wallet-image walletId=\"", "\" imageId=\"", "\"></wcm-wallet-image><wcm-text>", "</wcm-text></div><wcm-button .iconRight=\"", "\" .onClick=\"", "\" variant=\"ghost\">App Store</wcm-button></wcm-info-footer>"])), e, o, l(r), this.isError, l$1, true, function () {
                return _this43.openMobileApp(false);
              }, v.RETRY_ICON, s ? x(_templateObject119 || (_templateObject119 = _taggedTemplateLiteral(["<wcm-text color=\"secondary\" variant=\"small-thin\">Still doesn't work? <span tabindex=\"0\" @click=\"", "\">Try this alternate link</span></wcm-text>"])), function () {
                return _this43.openMobileApp(true);
              }) : null, o, l(r), "Get ".concat(e), v.ARROW_RIGHT_ICON, function () {
                return _this43.onGoToAppStore(i);
              });
            }
          }]);
        }(s$1);
        he.styles = [h.globalCss, Go], Ye([t$2()], he.prototype, "isError", 2), he = Ye([e$3("wcm-mobile-connecting-view")], he);
        var er = i$4(_templateObject120 || (_templateObject120 = _taggedTemplateLiteral(["wcm-info-footer{flex-direction:column;align-items:center;display:flex;width:100%;padding:5px 0}wcm-text{text-align:center}"])));
        var rr = function rr(e, o, r, a) {
          for (var t = o, l = e.length - 1, i; l >= 0; l--) (i = e[l]) && (t = i(t) || t);
          return t;
        };
        var je = /*#__PURE__*/function (_s$31) {
          function je() {
            _classCallCheck(this, je);
            return _callSuper(this, je, arguments);
          }
          _inherits(je, _s$31);
          return _createClass(je, [{
            key: "render",
            value: function render() {
              var _a$3$getWalletRouterD7 = a$3.getWalletRouterData(),
                e = _a$3$getWalletRouterD7.name,
                o = _a$3$getWalletRouterD7.id,
                r = _a$3$getWalletRouterD7.image_id,
                _c$getCachedRouterWal4 = c.getCachedRouterWalletPlatforms(),
                a = _c$getCachedRouterWal4.isDesktop,
                t = _c$getCachedRouterWal4.isWeb;
              return x(_templateObject121 || (_templateObject121 = _taggedTemplateLiteral(["<wcm-modal-header title=\"", "\" .onAction=\"", "\" .actionIcon=\"", "\"></wcm-modal-header><wcm-modal-content><wcm-walletconnect-qr walletId=\"", "\" imageId=\"", "\"></wcm-walletconnect-qr></wcm-modal-content><wcm-info-footer><wcm-text color=\"secondary\" variant=\"small-thin\">", "</wcm-text><wcm-platform-selection .isDesktop=\"", "\" .isWeb=\"", "\"></wcm-platform-selection></wcm-info-footer>"])), e, c.handleUriCopy, v.COPY_ICON, o, l(r), "Scan this QR Code with your phone's camera or inside ".concat(e, " app"), a, t);
            }
          }]);
        }(s$1);
        je.styles = [h.globalCss, er], je = rr([e$3("wcm-mobile-qr-connecting-view")], je);
        var ir = function ir(e, o, r, a) {
          for (var t = o, l = e.length - 1, i; l >= 0; l--) (i = e[l]) && (t = i(t) || t);
          return t;
        };
        var _e = /*#__PURE__*/function (_s$32) {
          function _e() {
            _classCallCheck(this, _e);
            return _callSuper(this, _e, arguments);
          }
          _inherits(_e, _s$32);
          return _createClass(_e, [{
            key: "render",
            value: function render() {
              return x(_templateObject122 || (_templateObject122 = _taggedTemplateLiteral(["<wcm-modal-header title=\"Scan the code\" .onAction=\"", "\" .actionIcon=\"", "\"></wcm-modal-header><wcm-modal-content><wcm-walletconnect-qr></wcm-walletconnect-qr></wcm-modal-content>"])), c.handleUriCopy, v.COPY_ICON);
            }
          }]);
        }(s$1);
        _e.styles = [h.globalCss], _e = ir([e$3("wcm-qrcode-view")], _e);
        var nr = i$4(_templateObject123 || (_templateObject123 = _taggedTemplateLiteral(["wcm-modal-content{height:clamp(200px,60vh,600px);display:block;overflow:scroll;scrollbar-width:none;position:relative;margin-top:1px}.wcm-grid{display:grid;grid-template-columns:repeat(4,80px);justify-content:space-between;margin:-15px -10px;padding-top:20px}wcm-modal-content::after,wcm-modal-content::before{content:'';position:fixed;pointer-events:none;z-index:1;width:100%;height:20px;opacity:1}wcm-modal-content::before{box-shadow:0 -1px 0 0 var(--wcm-color-bg-1);background:linear-gradient(var(--wcm-color-bg-1),rgba(255,255,255,0))}wcm-modal-content::after{box-shadow:0 1px 0 0 var(--wcm-color-bg-1);background:linear-gradient(rgba(255,255,255,0),var(--wcm-color-bg-1));top:calc(100% - 20px)}wcm-modal-content::-webkit-scrollbar{display:none}.wcm-placeholder-block{display:flex;justify-content:center;align-items:center;height:100px;overflow:hidden}.wcm-empty,.wcm-loading{display:flex}.wcm-loading .wcm-placeholder-block{height:100%}.wcm-end-reached .wcm-placeholder-block{height:0;opacity:0}.wcm-empty .wcm-placeholder-block{opacity:1;height:100%}wcm-wallet-button{margin:calc((100% - 60px)/ 3) 0}"])));
        var cr = Object.defineProperty,
          sr = Object.getOwnPropertyDescriptor,
          ie = function ie(e, o, r, a) {
            for (var t = a > 1 ? void 0 : a ? sr(o, r) : o, l = e.length - 1, i; l >= 0; l--) (i = e[l]) && (t = (a ? i(o, r, t) : i(t)) || t);
            return a && t && cr(o, r, t), t;
          };
        var De = 40;
        var U = /*#__PURE__*/function (_s$33) {
          function U() {
            var _this44;
            _classCallCheck(this, U);
            _this44 = _callSuper(this, U, arguments), _this44.loading = !te$1.state.wallets.listings.length, _this44.firstFetch = !te$1.state.wallets.listings.length, _this44.search = "", _this44.endReached = false, _this44.intersectionObserver = void 0, _this44.searchDebounce = c.debounce(function (e) {
              e.length >= 1 ? (_this44.firstFetch = true, _this44.endReached = false, _this44.search = e, te$1.resetSearch(), _this44.fetchWallets()) : _this44.search && (_this44.search = "", _this44.endReached = _this44.isLastPage(), te$1.resetSearch());
            });
            return _this44;
          }
          _inherits(U, _s$33);
          return _createClass(U, [{
            key: "firstUpdated",
            value: function firstUpdated() {
              this.createPaginationObserver();
            }
          }, {
            key: "disconnectedCallback",
            value: function disconnectedCallback() {
              var e;
              (e = this.intersectionObserver) == null || e.disconnect();
            }
          }, {
            key: "placeholderEl",
            get: function get() {
              return c.getShadowRootElement(this, ".wcm-placeholder-block");
            }
          }, {
            key: "createPaginationObserver",
            value: function createPaginationObserver() {
              var _this45 = this;
              this.intersectionObserver = new IntersectionObserver(function (_ref35) {
                var _ref36 = _slicedToArray(_ref35, 1),
                  e = _ref36[0];
                e.isIntersecting && !(_this45.search && _this45.firstFetch) && _this45.fetchWallets();
              }), this.intersectionObserver.observe(this.placeholderEl);
            }
          }, {
            key: "isLastPage",
            value: function isLastPage() {
              var _te$1$state = te$1.state,
                e = _te$1$state.wallets,
                o = _te$1$state.search,
                _ref37 = this.search ? o : e,
                r = _ref37.listings,
                a = _ref37.total;
              return a <= De || r.length >= a;
            }
          }, {
            key: "fetchWallets",
            value: function () {
              var _fetchWallets = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13() {
                var e, _te$1$state2, o, r, _ref38, a, t, l, _i46, _yield$te$1$getWallet, _s13, _$;
                return _regeneratorRuntime().wrap(function _callee13$(_context13) {
                  while (1) switch (_context13.prev = _context13.next) {
                    case 0:
                      _te$1$state2 = te$1.state, o = _te$1$state2.wallets, r = _te$1$state2.search, _ref38 = this.search ? r : o, a = _ref38.listings, t = _ref38.total, l = _ref38.page;
                      if (!(!this.endReached && (this.firstFetch || t > De && a.length < t))) {
                        _context13.next = 21;
                        break;
                      }
                      _context13.prev = 2;
                      this.loading = !0;
                      _i46 = (e = p$2.state.chains) == null ? void 0 : e.join(",");
                      _context13.next = 7;
                      return te$1.getWallets({
                        page: this.firstFetch ? 1 : l + 1,
                        entries: De,
                        search: this.search,
                        version: 2,
                        chains: _i46
                      });
                    case 7:
                      _yield$te$1$getWallet = _context13.sent;
                      _s13 = _yield$te$1$getWallet.listings;
                      _$ = _s13.map(function (f) {
                        return c.getWalletIcon(f);
                      });
                      _context13.next = 12;
                      return Promise.all([].concat(_toConsumableArray(_$.map( /*#__PURE__*/function () {
                        var _ref39 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(f) {
                          return _regeneratorRuntime().wrap(function _callee12$(_context12) {
                            while (1) switch (_context12.prev = _context12.next) {
                              case 0:
                                return _context12.abrupt("return", c.preloadImage(f));
                              case 1:
                              case "end":
                                return _context12.stop();
                            }
                          }, _callee12);
                        }));
                        return function (_x4) {
                          return _ref39.apply(this, arguments);
                        };
                      }())), [a$3.wait(300)]));
                    case 12:
                      this.endReached = this.isLastPage();
                      _context13.next = 18;
                      break;
                    case 15:
                      _context13.prev = 15;
                      _context13.t0 = _context13["catch"](2);
                      console.error(_context13.t0), oe$1.openToast(c.getErrorMessage(_context13.t0), "error");
                    case 18:
                      _context13.prev = 18;
                      this.loading = false, this.firstFetch = false;
                      return _context13.finish(18);
                    case 21:
                    case "end":
                      return _context13.stop();
                  }
                }, _callee13, this, [[2, 15, 18, 21]]);
              }));
              function fetchWallets() {
                return _fetchWallets.apply(this, arguments);
              }
              return fetchWallets;
            }()
          }, {
            key: "onConnect",
            value: function onConnect(e) {
              a$3.isAndroid() ? c.handleMobileLinking(e) : c.goToConnectingView(e);
            }
          }, {
            key: "onSearchChange",
            value: function onSearchChange(e) {
              var o = e.target.value;
              this.searchDebounce(o);
            }
          }, {
            key: "render",
            value: function render() {
              var _this46 = this;
              var _te$1$state3 = te$1.state,
                e = _te$1$state3.wallets,
                o = _te$1$state3.search,
                _ref40 = this.search ? o : e,
                r = _ref40.listings,
                a = this.loading && !r.length,
                t = this.search.length >= 3;
              var l = Z.manualWalletsTemplate(),
                i = Z.recomendedWalletsTemplate(true);
              t && (l = l.filter(function (_ref41) {
                var f = _ref41.values;
                return c.caseSafeIncludes(f[0], _this46.search);
              }), i = i.filter(function (_ref42) {
                var f = _ref42.values;
                return c.caseSafeIncludes(f[0], _this46.search);
              }));
              var s = !this.loading && !r.length && !i.length,
                $ = {
                  "wcm-loading": a,
                  "wcm-end-reached": this.endReached || !this.loading,
                  "wcm-empty": s
                };
              return x(_templateObject124 || (_templateObject124 = _taggedTemplateLiteral(["<wcm-modal-header><wcm-search-input .onChange=\"", "\"></wcm-search-input></wcm-modal-header><wcm-modal-content class=\"", "\"><div class=\"wcm-grid\">", " ", " ", "</div><div class=\"wcm-placeholder-block\">", " ", "</div></wcm-modal-content>"])), this.onSearchChange.bind(this), o$1($), a ? null : l, a ? null : i, a ? null : r.map(function (f) {
                return x(_templateObject125 || (_templateObject125 = _taggedTemplateLiteral(["", ""])), f ? x(_templateObject126 || (_templateObject126 = _taggedTemplateLiteral(["<wcm-wallet-button imageId=\"", "\" name=\"", "\" walletId=\"", "\" .onClick=\"", "\"></wcm-wallet-button>"])), f.image_id, f.name, f.id, function () {
                  return _this46.onConnect(f);
                }) : null);
              }), s ? x(_templateObject127 || (_templateObject127 = _taggedTemplateLiteral(["<wcm-text variant=\"big-bold\" color=\"secondary\">No results found</wcm-text>"]))) : null, !s && this.loading ? x(_templateObject128 || (_templateObject128 = _taggedTemplateLiteral(["<wcm-spinner></wcm-spinner>"]))) : null);
            }
          }]);
        }(s$1);
        U.styles = [h.globalCss, nr], ie([t$2()], U.prototype, "loading", 2), ie([t$2()], U.prototype, "firstFetch", 2), ie([t$2()], U.prototype, "search", 2), ie([t$2()], U.prototype, "endReached", 2), U = ie([e$3("wcm-wallet-explorer-view")], U);
        var dr = i$4(_templateObject129 || (_templateObject129 = _taggedTemplateLiteral(["wcm-info-footer{flex-direction:column;align-items:center;display:flex;width:100%;padding:5px 0}wcm-text{text-align:center}"])));
        var mr = Object.defineProperty,
          hr = Object.getOwnPropertyDescriptor,
          Ge = function Ge(e, o, r, a) {
            for (var t = a > 1 ? void 0 : a ? hr(o, r) : o, l = e.length - 1, i; l >= 0; l--) (i = e[l]) && (t = (a ? i(o, r, t) : i(t)) || t);
            return a && t && mr(o, r, t), t;
          };
        var we = /*#__PURE__*/function (_s$34) {
          function we() {
            var _this47;
            _classCallCheck(this, we);
            _this47 = _callSuper(this, we), _this47.isError = false, _this47.openWebWallet();
            return _this47;
          }
          _inherits(we, _s$34);
          return _createClass(we, [{
            key: "onFormatAndRedirect",
            value: function onFormatAndRedirect(e) {
              var _a$3$getWalletRouterD8 = a$3.getWalletRouterData(),
                o = _a$3$getWalletRouterD8.desktop,
                r = _a$3$getWalletRouterD8.name,
                a = o === null || o === void 0 ? void 0 : o.universal;
              if (a) {
                var _t21 = a$3.formatUniversalUrl(a, e, r);
                a$3.openHref(_t21, "_blank");
              }
            }
          }, {
            key: "openWebWallet",
            value: function openWebWallet() {
              var e = p$2.state.walletConnectUri,
                o = a$3.getWalletRouterData();
              c.setRecentWallet(o), e && this.onFormatAndRedirect(e);
            }
          }, {
            key: "render",
            value: function render() {
              var _a$3$getWalletRouterD9 = a$3.getWalletRouterData(),
                e = _a$3$getWalletRouterD9.name,
                o = _a$3$getWalletRouterD9.id,
                r = _a$3$getWalletRouterD9.image_id,
                _c$getCachedRouterWal5 = c.getCachedRouterWalletPlatforms(),
                a = _c$getCachedRouterWal5.isMobile,
                t = _c$getCachedRouterWal5.isDesktop,
                l$1 = a$3.isMobile();
              return x(_templateObject130 || (_templateObject130 = _taggedTemplateLiteral(["<wcm-modal-header title=\"", "\" .onAction=\"", "\" .actionIcon=\"", "\"></wcm-modal-header><wcm-modal-content><wcm-connector-waiting walletId=\"", "\" imageId=\"", "\" label=\"", "\" .isError=\"", "\"></wcm-connector-waiting></wcm-modal-content><wcm-info-footer><wcm-text color=\"secondary\" variant=\"small-thin\">", "</wcm-text><wcm-platform-selection .isMobile=\"", "\" .isDesktop=\"", "\" .isRetry=\"", "\"><wcm-button .onClick=\"", "\" .iconRight=\"", "\">Retry</wcm-button></wcm-platform-selection></wcm-info-footer>"])), e, c.handleUriCopy, v.COPY_ICON, o, l(r), "Continue in ".concat(e, "..."), this.isError, "".concat(e, " web app has opened in a new tab. Go there, accept the connection, and come back"), a, l$1 ? false : t, true, this.openWebWallet.bind(this), v.RETRY_ICON);
            }
          }]);
        }(s$1);
        we.styles = [h.globalCss, dr], Ge([t$2()], we.prototype, "isError", 2), we = Ge([e$3("wcm-web-connecting-view")], we);
      }
    };
  });
})();
