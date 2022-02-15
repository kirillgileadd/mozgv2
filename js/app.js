/*! For license information please see app.min.js.LICENSE.txt */
(() => {
  var t = {
      2: function (t, e, i) {
        var s, n;
        window.Element &&
          !Element.prototype.closest &&
          (Element.prototype.closest = function (t) {
            var e,
              i = (this.document || this.ownerDocument).querySelectorAll(t),
              s = this;
            do {
              for (e = i.length; 0 <= --e && i.item(e) !== s; );
            } while (e < 0 && (s = s.parentElement));
            return s;
          }),
          (function () {
            function t(t, e) {
              e = e || { bubbles: !1, cancelable: !1, detail: void 0 };
              var i = document.createEvent("CustomEvent");
              return i.initCustomEvent(t, e.bubbles, e.cancelable, e.detail), i;
            }
            "function" != typeof window.CustomEvent &&
              ((t.prototype = window.Event.prototype),
              (window.CustomEvent = t));
          })(),
          (function () {
            for (
              var t = 0, e = ["ms", "moz", "webkit", "o"], i = 0;
              i < e.length && !window.requestAnimationFrame;
              ++i
            )
              (window.requestAnimationFrame =
                window[e[i] + "RequestAnimationFrame"]),
                (window.cancelAnimationFrame =
                  window[e[i] + "CancelAnimationFrame"] ||
                  window[e[i] + "CancelRequestAnimationFrame"]);
            window.requestAnimationFrame ||
              (window.requestAnimationFrame = function (e, i) {
                var s = new Date().getTime(),
                  n = Math.max(0, 16 - (s - t)),
                  o = window.setTimeout(function () {
                    e(s + n);
                  }, n);
                return (t = s + n), o;
              }),
              window.cancelAnimationFrame ||
                (window.cancelAnimationFrame = function (t) {
                  clearTimeout(t);
                });
          })(),
          (n =
            void 0 !== i.g
              ? i.g
              : "undefined" != typeof window
              ? window
              : this),
          (s = function () {
            return (function (t) {
              "use strict";
              var e = {
                  ignore: "[data-scroll-ignore]",
                  header: null,
                  topOnEmptyHash: !0,
                  speed: 500,
                  speedAsDuration: !1,
                  durationMax: null,
                  durationMin: null,
                  clip: !0,
                  offset: 0,
                  easing: "easeInOutCubic",
                  customEasing: null,
                  updateURL: !0,
                  popstate: !0,
                  emitEvents: !0,
                },
                i = function () {
                  var t = {};
                  return (
                    Array.prototype.forEach.call(arguments, function (e) {
                      for (var i in e) {
                        if (!e.hasOwnProperty(i)) return;
                        t[i] = e[i];
                      }
                    }),
                    t
                  );
                },
                s = function (t) {
                  "#" === t.charAt(0) && (t = t.substr(1));
                  for (
                    var e,
                      i = String(t),
                      s = i.length,
                      n = -1,
                      o = "",
                      r = i.charCodeAt(0);
                    ++n < s;

                  ) {
                    if (0 === (e = i.charCodeAt(n)))
                      throw new InvalidCharacterError(
                        "Invalid character: the input contains U+0000."
                      );
                    o +=
                      (1 <= e && e <= 31) ||
                      127 == e ||
                      (0 === n && 48 <= e && e <= 57) ||
                      (1 === n && 48 <= e && e <= 57 && 45 === r)
                        ? "\\" + e.toString(16) + " "
                        : 128 <= e ||
                          45 === e ||
                          95 === e ||
                          (48 <= e && e <= 57) ||
                          (65 <= e && e <= 90) ||
                          (97 <= e && e <= 122)
                        ? i.charAt(n)
                        : "\\" + i.charAt(n);
                  }
                  return "#" + o;
                },
                n = function () {
                  return Math.max(
                    document.body.scrollHeight,
                    document.documentElement.scrollHeight,
                    document.body.offsetHeight,
                    document.documentElement.offsetHeight,
                    document.body.clientHeight,
                    document.documentElement.clientHeight
                  );
                },
                o = function (e) {
                  return e
                    ? ((i = e),
                      parseInt(t.getComputedStyle(i).height, 10) + e.offsetTop)
                    : 0;
                  var i;
                },
                r = function (e, i, s) {
                  0 === e && document.body.focus(),
                    s ||
                      (e.focus(),
                      document.activeElement !== e &&
                        (e.setAttribute("tabindex", "-1"),
                        e.focus(),
                        (e.style.outline = "none")),
                      t.scrollTo(0, i));
                },
                l = function (e, i, s, n) {
                  if (i.emitEvents && "function" == typeof t.CustomEvent) {
                    var o = new CustomEvent(e, {
                      bubbles: !0,
                      detail: { anchor: s, toggle: n },
                    });
                    document.dispatchEvent(o);
                  }
                };
              return function (a, d) {
                var g,
                  h,
                  c,
                  u,
                  m = {
                    cancelScroll: function (t) {
                      cancelAnimationFrame(u),
                        (u = null),
                        t || l("scrollCancel", g);
                    },
                    animateScroll: function (s, a, d) {
                      m.cancelScroll();
                      var h = i(g || e, d || {}),
                        p =
                          "[object Number]" ===
                          Object.prototype.toString.call(s),
                        f = p || !s.tagName ? null : s;
                      if (p || f) {
                        var v = t.pageYOffset;
                        h.header &&
                          !c &&
                          (c = document.querySelector(h.header));
                        var y,
                          b,
                          w,
                          C,
                          I,
                          S,
                          x,
                          E,
                          T = o(c),
                          O = p
                            ? s
                            : (function (e, i, s, o) {
                                var r = 0;
                                if (e.offsetParent)
                                  for (
                                    ;
                                    (r += e.offsetTop), (e = e.offsetParent);

                                  );
                                return (
                                  (r = Math.max(r - i - s, 0)),
                                  o && (r = Math.min(r, n() - t.innerHeight)),
                                  r
                                );
                              })(
                                f,
                                T,
                                parseInt(
                                  "function" == typeof h.offset
                                    ? h.offset(s, a)
                                    : h.offset,
                                  10
                                ),
                                h.clip
                              ),
                          A = O - v,
                          L = n(),
                          D = 0,
                          M =
                            ((y = A),
                            (w = (b = h).speedAsDuration
                              ? b.speed
                              : Math.abs((y / 1e3) * b.speed)),
                            b.durationMax && w > b.durationMax
                              ? b.durationMax
                              : b.durationMin && w < b.durationMin
                              ? b.durationMin
                              : parseInt(w, 10)),
                          k = function (e) {
                            var i, n, o;
                            C || (C = e),
                              (D += e - C),
                              (S =
                                v +
                                A *
                                  ((n = I =
                                    1 < (I = 0 === M ? 0 : D / M) ? 1 : I),
                                  "easeInQuad" === (i = h).easing &&
                                    (o = n * n),
                                  "easeOutQuad" === i.easing &&
                                    (o = n * (2 - n)),
                                  "easeInOutQuad" === i.easing &&
                                    (o =
                                      n < 0.5
                                        ? 2 * n * n
                                        : (4 - 2 * n) * n - 1),
                                  "easeInCubic" === i.easing && (o = n * n * n),
                                  "easeOutCubic" === i.easing &&
                                    (o = --n * n * n + 1),
                                  "easeInOutCubic" === i.easing &&
                                    (o =
                                      n < 0.5
                                        ? 4 * n * n * n
                                        : (n - 1) * (2 * n - 2) * (2 * n - 2) +
                                          1),
                                  "easeInQuart" === i.easing &&
                                    (o = n * n * n * n),
                                  "easeOutQuart" === i.easing &&
                                    (o = 1 - --n * n * n * n),
                                  "easeInOutQuart" === i.easing &&
                                    (o =
                                      n < 0.5
                                        ? 8 * n * n * n * n
                                        : 1 - 8 * --n * n * n * n),
                                  "easeInQuint" === i.easing &&
                                    (o = n * n * n * n * n),
                                  "easeOutQuint" === i.easing &&
                                    (o = 1 + --n * n * n * n * n),
                                  "easeInOutQuint" === i.easing &&
                                    (o =
                                      n < 0.5
                                        ? 16 * n * n * n * n * n
                                        : 1 + 16 * --n * n * n * n * n),
                                  i.customEasing && (o = i.customEasing(n)),
                                  o || n)),
                              t.scrollTo(0, Math.floor(S)),
                              (function (e, i) {
                                var n = t.pageYOffset;
                                if (
                                  e == i ||
                                  n == i ||
                                  (v < i && t.innerHeight + n) >= L
                                )
                                  return (
                                    m.cancelScroll(!0),
                                    r(s, i, p),
                                    l("scrollStop", h, s, a),
                                    !(u = C = null)
                                  );
                              })(S, O) ||
                                ((u = t.requestAnimationFrame(k)), (C = e));
                          };
                        0 === t.pageYOffset && t.scrollTo(0, 0),
                          (x = s),
                          (E = h),
                          p ||
                            (history.pushState &&
                              E.updateURL &&
                              history.pushState(
                                {
                                  smoothScroll: JSON.stringify(E),
                                  anchor: x.id,
                                },
                                document.title,
                                x === document.documentElement
                                  ? "#top"
                                  : "#" + x.id
                              )),
                          "matchMedia" in t &&
                          t.matchMedia("(prefers-reduced-motion)").matches
                            ? r(s, Math.floor(O), !1)
                            : (l("scrollStart", h, s, a),
                              m.cancelScroll(!0),
                              t.requestAnimationFrame(k));
                      }
                    },
                  },
                  p = function (e) {
                    if (
                      !e.defaultPrevented &&
                      !(
                        0 !== e.button ||
                        e.metaKey ||
                        e.ctrlKey ||
                        e.shiftKey
                      ) &&
                      "closest" in e.target &&
                      (h = e.target.closest(a)) &&
                      "a" === h.tagName.toLowerCase() &&
                      !e.target.closest(g.ignore) &&
                      h.hostname === t.location.hostname &&
                      h.pathname === t.location.pathname &&
                      /#/.test(h.href)
                    ) {
                      var i, n;
                      try {
                        i = s(decodeURIComponent(h.hash));
                      } catch (e) {
                        i = s(h.hash);
                      }
                      if ("#" === i) {
                        if (!g.topOnEmptyHash) return;
                        n = document.documentElement;
                      } else n = document.querySelector(i);
                      (n = n || "#top" !== i ? n : document.documentElement) &&
                        (e.preventDefault(),
                        (function (e) {
                          if (
                            history.replaceState &&
                            e.updateURL &&
                            !history.state
                          ) {
                            var i = t.location.hash;
                            (i = i || ""),
                              history.replaceState(
                                {
                                  smoothScroll: JSON.stringify(e),
                                  anchor: i || t.pageYOffset,
                                },
                                document.title,
                                i || t.location.href
                              );
                          }
                        })(g),
                        m.animateScroll(n, h));
                    }
                  },
                  f = function (t) {
                    if (
                      null !== history.state &&
                      history.state.smoothScroll &&
                      history.state.smoothScroll === JSON.stringify(g)
                    ) {
                      var e = history.state.anchor;
                      ("string" == typeof e &&
                        e &&
                        !(e = document.querySelector(
                          s(history.state.anchor)
                        ))) ||
                        m.animateScroll(e, null, { updateURL: !1 });
                    }
                  };
                return (
                  (m.destroy = function () {
                    g &&
                      (document.removeEventListener("click", p, !1),
                      t.removeEventListener("popstate", f, !1),
                      m.cancelScroll(),
                      (u = c = h = g = null));
                  }),
                  (function () {
                    if (
                      !(
                        "querySelector" in document &&
                        "addEventListener" in t &&
                        "requestAnimationFrame" in t &&
                        "closest" in t.Element.prototype
                      )
                    )
                      throw "Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs.";
                    m.destroy(),
                      (g = i(e, d || {})),
                      (c = g.header ? document.querySelector(g.header) : null),
                      document.addEventListener("click", p, !1),
                      g.updateURL &&
                        g.popstate &&
                        t.addEventListener("popstate", f, !1);
                  })(),
                  m
                );
              };
            })(n);
          }.apply(e, [])),
          void 0 === s || (t.exports = s);
      },
    },
    e = {};
  function i(s) {
    var n = e[s];
    if (void 0 !== n) return n.exports;
    var o = (e[s] = { exports: {} });
    return t[s].call(o.exports, o, o.exports, i), o.exports;
  }
  (i.g = (function () {
    if ("object" == typeof globalThis) return globalThis;
    try {
      return this || new Function("return this")();
    } catch (t) {
      if ("object" == typeof window) return window;
    }
  })()),
    (() => {
      "use strict";
      let t = {
        Android: function () {
          return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
          return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
          return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
          return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
          return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
          return (
            t.Android() || t.BlackBerry() || t.iOS() || t.Opera() || t.Windows()
          );
        },
      };
      let e = !0,
        s = (t = 500) => {
          let i = document.querySelector("body");
          if (e) {
            let s = document.querySelectorAll("[data-lp]");
            setTimeout(() => {
              for (let t = 0; t < s.length; t++) {
                s[t].style.paddingRight = "0px";
              }
              (i.style.paddingRight = "0px"),
                document.documentElement.classList.remove("lock");
            }, t),
              (e = !1),
              setTimeout(function () {
                e = !0;
              }, t);
          }
        },
        n = (t = 500) => {
          let i = document.querySelector("body");
          if (e) {
            let s = document.querySelectorAll("[data-lp]");
            for (let t = 0; t < s.length; t++) {
              s[t].style.paddingRight =
                window.innerWidth -
                document.querySelector(".wrapper").offsetWidth +
                "px";
            }
            (i.style.paddingRight =
              window.innerWidth -
              document.querySelector(".wrapper").offsetWidth +
              "px"),
              document.documentElement.classList.add("lock"),
              (e = !1),
              setTimeout(function () {
                e = !0;
              }, t);
          }
        };
      function o(t) {
        setTimeout(() => {
          window.FLS && console.log(t);
        }, 0);
      }
      var r = i(2);
      let l = (t, e = !1, i = 300, n = 0) => {
        const l = document.querySelector(t);
        if (l) {
          let a = "",
            d = 0;
          e &&
            ((a = "header.header"),
            (d = document.querySelector(a).offsetHeight));
          let g = {
            speedAsDuration: !0,
            speed: i,
            header: a,
            offset: n,
            easing: "easeOutQuad",
          };
          if (
            (document.documentElement.classList.contains("menu-open") &&
              (s(), document.documentElement.classList.remove("menu-open")),
            void 0 !== r)
          )
            new r().animateScroll(l, "", g);
          else {
            let t = l.getBoundingClientRect().top + scrollY;
            window.scrollTo({ top: d ? t - d : t, behavior: "smooth" });
          }
          o(`[gotoBlock]: Юхуу...едем к ${t}`);
        } else o(`[gotoBlock]: Ой ой..Такого блока нет на странице: ${t}`);
      };
      let a = !1;
      setTimeout(() => {
        if (a) {
          let t = new Event("windowScroll");
          window.addEventListener("scroll", function (e) {
            document.dispatchEvent(t);
          });
        }
      }, 0);
      var d = function () {
        return (
          (d =
            Object.assign ||
            function (t) {
              for (var e, i = 1, s = arguments.length; i < s; i++)
                for (var n in (e = arguments[i]))
                  Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
              return t;
            }),
          d.apply(this, arguments)
        );
      };
      var g = (function () {
        function t(t) {
          return (
            (this.cssVenderPrefixes = [
              "TransitionDuration",
              "TransitionTimingFunction",
              "Transform",
              "Transition",
            ]),
            (this.selector = this._getSelector(t)),
            (this.firstElement = this._getFirstEl()),
            this
          );
        }
        return (
          (t.generateUUID = function () {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
              /[xy]/g,
              function (t) {
                var e = (16 * Math.random()) | 0;
                return ("x" == t ? e : (3 & e) | 8).toString(16);
              }
            );
          }),
          (t.prototype._getSelector = function (t, e) {
            return (
              void 0 === e && (e = document),
              "string" != typeof t
                ? t
                : ((e = e || document),
                  "#" === t.substring(0, 1)
                    ? e.querySelector(t)
                    : e.querySelectorAll(t))
            );
          }),
          (t.prototype._each = function (t) {
            return this.selector
              ? (void 0 !== this.selector.length
                  ? [].forEach.call(this.selector, t)
                  : t(this.selector, 0),
                this)
              : this;
          }),
          (t.prototype._setCssVendorPrefix = function (t, e, i) {
            var s = e.replace(/-([a-z])/gi, function (t, e) {
              return e.toUpperCase();
            });
            -1 !== this.cssVenderPrefixes.indexOf(s)
              ? ((t.style[s.charAt(0).toLowerCase() + s.slice(1)] = i),
                (t.style["webkit" + s] = i),
                (t.style["moz" + s] = i),
                (t.style["ms" + s] = i),
                (t.style["o" + s] = i))
              : (t.style[s] = i);
          }),
          (t.prototype._getFirstEl = function () {
            return this.selector && void 0 !== this.selector.length
              ? this.selector[0]
              : this.selector;
          }),
          (t.prototype.isEventMatched = function (t, e) {
            var i = e.split(".");
            return t
              .split(".")
              .filter(function (t) {
                return t;
              })
              .every(function (t) {
                return -1 !== i.indexOf(t);
              });
          }),
          (t.prototype.attr = function (t, e) {
            return void 0 === e
              ? this.firstElement
                ? this.firstElement.getAttribute(t)
                : ""
              : (this._each(function (i) {
                  i.setAttribute(t, e);
                }),
                this);
          }),
          (t.prototype.find = function (t) {
            return h(this._getSelector(t, this.selector));
          }),
          (t.prototype.first = function () {
            return this.selector && void 0 !== this.selector.length
              ? h(this.selector[0])
              : h(this.selector);
          }),
          (t.prototype.eq = function (t) {
            return h(this.selector[t]);
          }),
          (t.prototype.parent = function () {
            return h(this.selector.parentElement);
          }),
          (t.prototype.get = function () {
            return this._getFirstEl();
          }),
          (t.prototype.removeAttr = function (t) {
            var e = t.split(" ");
            return (
              this._each(function (t) {
                e.forEach(function (e) {
                  return t.removeAttribute(e);
                });
              }),
              this
            );
          }),
          (t.prototype.wrap = function (t) {
            if (!this.firstElement) return this;
            var e = document.createElement("div");
            return (
              (e.className = t),
              this.firstElement.parentNode.insertBefore(e, this.firstElement),
              this.firstElement.parentNode.removeChild(this.firstElement),
              e.appendChild(this.firstElement),
              this
            );
          }),
          (t.prototype.addClass = function (t) {
            return (
              void 0 === t && (t = ""),
              this._each(function (e) {
                t.split(" ").forEach(function (t) {
                  t && e.classList.add(t);
                });
              }),
              this
            );
          }),
          (t.prototype.removeClass = function (t) {
            return (
              this._each(function (e) {
                t.split(" ").forEach(function (t) {
                  t && e.classList.remove(t);
                });
              }),
              this
            );
          }),
          (t.prototype.hasClass = function (t) {
            return (
              !!this.firstElement && this.firstElement.classList.contains(t)
            );
          }),
          (t.prototype.hasAttribute = function (t) {
            return !!this.firstElement && this.firstElement.hasAttribute(t);
          }),
          (t.prototype.toggleClass = function (t) {
            return this.firstElement
              ? (this.hasClass(t) ? this.removeClass(t) : this.addClass(t),
                this)
              : this;
          }),
          (t.prototype.css = function (t, e) {
            var i = this;
            return (
              this._each(function (s) {
                i._setCssVendorPrefix(s, t, e);
              }),
              this
            );
          }),
          (t.prototype.on = function (e, i) {
            var s = this;
            return this.selector
              ? (e.split(" ").forEach(function (e) {
                  Array.isArray(t.eventListeners[e]) ||
                    (t.eventListeners[e] = []),
                    t.eventListeners[e].push(i),
                    s.selector.addEventListener(e.split(".")[0], i);
                }),
                this)
              : this;
          }),
          (t.prototype.once = function (t, e) {
            var i = this;
            return (
              this.on(t, function () {
                i.off(t), e(t);
              }),
              this
            );
          }),
          (t.prototype.off = function (e) {
            var i = this;
            return this.selector
              ? (Object.keys(t.eventListeners).forEach(function (s) {
                  i.isEventMatched(e, s) &&
                    (t.eventListeners[s].forEach(function (t) {
                      i.selector.removeEventListener(s.split(".")[0], t);
                    }),
                    (t.eventListeners[s] = []));
                }),
                this)
              : this;
          }),
          (t.prototype.trigger = function (t, e) {
            if (!this.firstElement) return this;
            var i = new CustomEvent(t.split(".")[0], { detail: e || null });
            return this.firstElement.dispatchEvent(i), this;
          }),
          (t.prototype.load = function (t) {
            var e = this;
            return (
              fetch(t).then(function (t) {
                e.selector.innerHTML = t;
              }),
              this
            );
          }),
          (t.prototype.html = function (t) {
            return void 0 === t
              ? this.firstElement
                ? this.firstElement.innerHTML
                : ""
              : (this._each(function (e) {
                  e.innerHTML = t;
                }),
                this);
          }),
          (t.prototype.append = function (t) {
            return (
              this._each(function (e) {
                "string" == typeof t
                  ? e.insertAdjacentHTML("beforeend", t)
                  : e.appendChild(t);
              }),
              this
            );
          }),
          (t.prototype.prepend = function (t) {
            return (
              this._each(function (e) {
                e.insertAdjacentHTML("afterbegin", t);
              }),
              this
            );
          }),
          (t.prototype.remove = function () {
            return (
              this._each(function (t) {
                t.parentNode.removeChild(t);
              }),
              this
            );
          }),
          (t.prototype.empty = function () {
            return (
              this._each(function (t) {
                t.innerHTML = "";
              }),
              this
            );
          }),
          (t.prototype.scrollTop = function (t) {
            return void 0 !== t
              ? ((document.body.scrollTop = t),
                (document.documentElement.scrollTop = t),
                this)
              : window.pageYOffset ||
                  document.documentElement.scrollTop ||
                  document.body.scrollTop ||
                  0;
          }),
          (t.prototype.scrollLeft = function (t) {
            return void 0 !== t
              ? ((document.body.scrollLeft = t),
                (document.documentElement.scrollLeft = t),
                this)
              : window.pageXOffset ||
                  document.documentElement.scrollLeft ||
                  document.body.scrollLeft ||
                  0;
          }),
          (t.prototype.offset = function () {
            if (!this.firstElement) return { left: 0, top: 0 };
            var t = this.firstElement.getBoundingClientRect(),
              e = h("body").style().marginLeft;
            return {
              left: t.left - parseFloat(e) + this.scrollLeft(),
              top: t.top + this.scrollTop(),
            };
          }),
          (t.prototype.style = function () {
            return this.firstElement
              ? this.firstElement.currentStyle ||
                  window.getComputedStyle(this.firstElement)
              : {};
          }),
          (t.prototype.width = function () {
            var t = this.style();
            return (
              this.firstElement.clientWidth -
              parseFloat(t.paddingLeft) -
              parseFloat(t.paddingRight)
            );
          }),
          (t.prototype.height = function () {
            var t = this.style();
            return (
              this.firstElement.clientHeight -
              parseFloat(t.paddingTop) -
              parseFloat(t.paddingBottom)
            );
          }),
          (t.eventListeners = {}),
          t
        );
      })();
      function h(t) {
        return (
          (function () {
            if ("function" == typeof window.CustomEvent) return !1;
            window.CustomEvent = function (t, e) {
              e = e || { bubbles: !1, cancelable: !1, detail: null };
              var i = document.createEvent("CustomEvent");
              return i.initCustomEvent(t, e.bubbles, e.cancelable, e.detail), i;
            };
          })(),
          Element.prototype.matches ||
            (Element.prototype.matches =
              Element.prototype.msMatchesSelector ||
              Element.prototype.webkitMatchesSelector),
          new g(t)
        );
      }
      var c = [
        "src",
        "sources",
        "subHtml",
        "subHtmlUrl",
        "html",
        "video",
        "poster",
        "slideName",
        "responsive",
        "srcset",
        "sizes",
        "iframe",
        "downloadUrl",
        "download",
        "width",
        "facebookShareUrl",
        "tweetText",
        "iframeTitle",
        "twitterShareUrl",
        "pinterestShareUrl",
        "pinterestText",
        "fbHtml",
        "disqusIdentifier",
        "disqusUrl",
      ];
      function u(t) {
        return "href" === t
          ? "src"
          : (t = (t =
              (t = t.replace("data-", "")).charAt(0).toLowerCase() +
              t.slice(1)).replace(/-([a-z])/g, function (t) {
              return t[1].toUpperCase();
            }));
      }
      var m = function (t, e, i, s) {
          void 0 === i && (i = 0);
          var n = h(t).attr("data-lg-size") || s;
          if (n) {
            var o = n.split(",");
            if (o[1])
              for (var r = window.innerWidth, l = 0; l < o.length; l++) {
                var a = o[l];
                if (parseInt(a.split("-")[2], 10) > r) {
                  n = a;
                  break;
                }
                l === o.length - 1 && (n = a);
              }
            var d = n.split("-"),
              g = parseInt(d[0], 10),
              c = parseInt(d[1], 10),
              u = e.width(),
              m = e.height() - i,
              p = Math.min(u, g),
              f = Math.min(m, c),
              v = Math.min(p / g, f / c);
            return { width: g * v, height: c * v };
          }
        },
        p = function (t, e, i, s, n) {
          if (n) {
            var o = h(t).find("img").first();
            if (o.get()) {
              var r = e.get().getBoundingClientRect(),
                l = r.width,
                a = e.height() - (i + s),
                d = o.width(),
                g = o.height(),
                c = o.style(),
                u =
                  (l - d) / 2 -
                  o.offset().left +
                  (parseFloat(c.paddingLeft) || 0) +
                  (parseFloat(c.borderLeft) || 0) +
                  h(window).scrollLeft() +
                  r.left,
                m =
                  (a - g) / 2 -
                  o.offset().top +
                  (parseFloat(c.paddingTop) || 0) +
                  (parseFloat(c.borderTop) || 0) +
                  h(window).scrollTop() +
                  i;
              return (
                "translate3d(" +
                (u *= -1) +
                "px, " +
                (m *= -1) +
                "px, 0) scale3d(" +
                d / n.width +
                ", " +
                g / n.height +
                ", 1)"
              );
            }
          }
        },
        f = function (t, e, i, s, n, o) {
          return (
            '<div class="lg-video-cont lg-has-iframe" style="width:' +
            t +
            "; max-width:" +
            i +
            "; height: " +
            e +
            "; max-height:" +
            s +
            '">\n                    <iframe class="lg-object" frameborder="0" ' +
            (o ? 'title="' + o + '"' : "") +
            ' src="' +
            n +
            '"  allowfullscreen="true"></iframe>\n                </div>'
          );
        },
        v = function (t, e, i, s, n, o) {
          var r =
              "<img " +
              i +
              " " +
              (s ? 'srcset="' + s + '"' : "") +
              "  " +
              (n ? 'sizes="' + n + '"' : "") +
              ' class="lg-object lg-image" data-index="' +
              t +
              '" src="' +
              e +
              '" />',
            l = "";
          o &&
            (l = ("string" == typeof o ? JSON.parse(o) : o).map(function (t) {
              var e = "";
              return (
                Object.keys(t).forEach(function (i) {
                  e += " " + i + '="' + t[i] + '"';
                }),
                "<source " + e + "></source>"
              );
            }));
          return "" + l + r;
        },
        y = function (t) {
          for (var e = [], i = [], s = "", n = 0; n < t.length; n++) {
            var o = t[n].split(" ");
            "" === o[0] && o.splice(0, 1), i.push(o[0]), e.push(o[1]);
          }
          for (var r = window.innerWidth, l = 0; l < e.length; l++)
            if (parseInt(e[l], 10) > r) {
              s = i[l];
              break;
            }
          return s;
        },
        b = function (t) {
          return !!t && !!t.complete && 0 !== t.naturalWidth;
        },
        w = function (t, e, i, s) {
          return (
            '<div class="lg-video-cont ' +
            (s && s.youtube
              ? "lg-has-youtube"
              : s && s.vimeo
              ? "lg-has-vimeo"
              : "lg-has-html5") +
            '" style="' +
            i +
            '">\n                <div class="lg-video-play-button">\n                <svg\n                    viewBox="0 0 20 20"\n                    preserveAspectRatio="xMidYMid"\n                    focusable="false"\n                    aria-labelledby="Play video"\n                    role="img"\n                    class="lg-video-play-icon"\n                >\n                    <title>Play video</title>\n                    <polygon class="lg-video-play-icon-inner" points="1,0 20,10 1,20"></polygon>\n                </svg>\n                <svg class="lg-video-play-icon-bg" viewBox="0 0 50 50" focusable="false">\n                    <circle cx="50%" cy="50%" r="20"></circle></svg>\n                <svg class="lg-video-play-icon-circle" viewBox="0 0 50 50" focusable="false">\n                    <circle cx="50%" cy="50%" r="20"></circle>\n                </svg>\n            </div>\n            ' +
            (e || "") +
            '\n            <img class="lg-object lg-video-poster" src="' +
            t +
            '" />\n        </div>'
          );
        },
        C = function (t, e, i, s) {
          var n = [],
            o = (function () {
              for (var t = 0, e = 0, i = arguments.length; e < i; e++)
                t += arguments[e].length;
              var s = Array(t),
                n = 0;
              for (e = 0; e < i; e++)
                for (var o = arguments[e], r = 0, l = o.length; r < l; r++, n++)
                  s[n] = o[r];
              return s;
            })(c, e);
          return (
            [].forEach.call(t, function (t) {
              for (var e = {}, r = 0; r < t.attributes.length; r++) {
                var l = t.attributes[r];
                if (l.specified) {
                  var a = u(l.name),
                    d = "";
                  o.indexOf(a) > -1 && (d = a), d && (e[d] = l.value);
                }
              }
              var g = h(t),
                c = g.find("img").first().attr("alt"),
                m = g.attr("title"),
                p = s ? g.attr(s) : g.find("img").first().attr("src");
              (e.thumb = p),
                i && !e.subHtml && (e.subHtml = m || c || ""),
                (e.alt = c || m || ""),
                n.push(e);
            }),
            n
          );
        },
        I = function () {
          return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        },
        S = function (t, e, i) {
          if (!t)
            return e
              ? { html5: !0 }
              : void console.error(
                  "lightGallery :- data-src is not provided on slide item " +
                    (i + 1) +
                    ". Please make sure the selector property is properly configured. More info - https://www.lightgalleryjs.com/demos/html-markup/"
                );
          var s = t.match(
              /\/\/(?:www\.)?youtu(?:\.be|be\.com|be-nocookie\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)([\&|?][\S]*)*/i
            ),
            n = t.match(
              /\/\/(?:www\.)?(?:player\.)?vimeo.com\/(?:video\/)?([0-9a-z\-_]+)(.*)?/i
            ),
            o = t.match(
              /https?:\/\/(.+)?(wistia\.com|wi\.st)\/(medias|embed)\/([0-9a-z\-_]+)(.*)/
            );
          return s
            ? { youtube: s }
            : n
            ? { vimeo: n }
            : o
            ? { wistia: o }
            : void 0;
        },
        x = {
          mode: "lg-slide",
          easing: "ease",
          speed: 400,
          licenseKey: "0000-0000-000-0000",
          height: "100%",
          width: "100%",
          addClass: "",
          startClass: "lg-start-zoom",
          backdropDuration: 300,
          container: "",
          startAnimationDuration: 400,
          zoomFromOrigin: !0,
          hideBarsDelay: 0,
          showBarsAfter: 1e4,
          slideDelay: 0,
          supportLegacyBrowser: !0,
          allowMediaOverlap: !1,
          videoMaxSize: "1280-720",
          loadYouTubePoster: !0,
          defaultCaptionHeight: 0,
          ariaLabelledby: "",
          ariaDescribedby: "",
          closable: !0,
          swipeToClose: !0,
          closeOnTap: !0,
          showCloseIcon: !0,
          showMaximizeIcon: !1,
          loop: !0,
          escKey: !0,
          keyPress: !0,
          controls: !0,
          slideEndAnimation: !0,
          hideControlOnEnd: !1,
          mousewheel: !1,
          getCaptionFromTitleOrAlt: !0,
          appendSubHtmlTo: ".lg-sub-html",
          subHtmlSelectorRelative: !1,
          preload: 2,
          numberOfSlideItemsInDom: 10,
          selector: "",
          selectWithin: "",
          nextHtml: "",
          prevHtml: "",
          index: 0,
          iframeWidth: "100%",
          iframeHeight: "100%",
          iframeMaxWidth: "100%",
          iframeMaxHeight: "100%",
          download: !0,
          counter: !0,
          appendCounterTo: ".lg-toolbar",
          swipeThreshold: 50,
          enableSwipe: !0,
          enableDrag: !0,
          dynamic: !1,
          dynamicEl: [],
          extraProps: [],
          exThumbImage: "",
          isMobile: void 0,
          mobileSettings: { controls: !1, showCloseIcon: !1, download: !1 },
          plugins: [],
        },
        E = "lgAfterAppendSlide",
        T = "lgInit",
        O = "lgHasVideo",
        A = "lgContainerResize",
        L = "lgUpdateSlides",
        D = "lgAfterAppendSubHtml",
        M = "lgBeforeOpen",
        k = "lgAfterOpen",
        z = "lgSlideItemLoad",
        B = "lgBeforeSlide",
        F = "lgAfterSlide",
        P = "lgPosterClick",
        G = "lgDragStart",
        H = "lgDragMove",
        _ = "lgDragEnd",
        q = "lgBeforeNextSlide",
        N = "lgBeforePrevSlide",
        $ = "lgBeforeClose",
        R = "lgAfterClose",
        V = 0,
        j = (function () {
          function t(t, e) {
            if (
              ((this.lgOpened = !1),
              (this.index = 0),
              (this.plugins = []),
              (this.lGalleryOn = !1),
              (this.lgBusy = !1),
              (this.currentItemsInDom = []),
              (this.prevScrollTop = 0),
              (this.isDummyImageRemoved = !1),
              (this.dragOrSwipeEnabled = !1),
              (this.mediaContainerPosition = { top: 0, bottom: 0 }),
              !t)
            )
              return this;
            if (
              (V++,
              (this.lgId = V),
              (this.el = t),
              (this.LGel = h(t)),
              this.generateSettings(e),
              this.buildModules(),
              this.settings.dynamic &&
                void 0 !== this.settings.dynamicEl &&
                !Array.isArray(this.settings.dynamicEl))
            )
              throw "When using dynamic mode, you must also define dynamicEl as an Array.";
            return (
              (this.galleryItems = this.getItems()),
              this.normalizeSettings(),
              this.init(),
              this.validateLicense(),
              this
            );
          }
          return (
            (t.prototype.generateSettings = function (t) {
              if (
                ((this.settings = d(d({}, x), t)),
                this.settings.isMobile &&
                "function" == typeof this.settings.isMobile
                  ? this.settings.isMobile()
                  : I())
              ) {
                var e = d(
                  d({}, this.settings.mobileSettings),
                  this.settings.mobileSettings
                );
                this.settings = d(d({}, this.settings), e);
              }
            }),
            (t.prototype.normalizeSettings = function () {
              this.settings.slideEndAnimation &&
                (this.settings.hideControlOnEnd = !1),
                this.settings.closable || (this.settings.swipeToClose = !1),
                (this.zoomFromOrigin = this.settings.zoomFromOrigin),
                this.settings.dynamic && (this.zoomFromOrigin = !1),
                this.settings.container ||
                  (this.settings.container = document.body),
                (this.settings.preload = Math.min(
                  this.settings.preload,
                  this.galleryItems.length
                ));
            }),
            (t.prototype.init = function () {
              var t = this;
              this.addSlideVideoInfo(this.galleryItems),
                this.buildStructure(),
                this.LGel.trigger(T, { instance: this }),
                this.settings.keyPress && this.keyPress(),
                setTimeout(function () {
                  t.enableDrag(), t.enableSwipe(), t.triggerPosterClick();
                }, 50),
                this.arrow(),
                this.settings.mousewheel && this.mousewheel(),
                this.settings.dynamic || this.openGalleryOnItemClick();
            }),
            (t.prototype.openGalleryOnItemClick = function () {
              for (
                var t = this,
                  e = function (e) {
                    var s = i.items[e],
                      n = h(s),
                      o = g.generateUUID();
                    n.attr("data-lg-id", o).on(
                      "click.lgcustom-item-" + o,
                      function (i) {
                        i.preventDefault();
                        var n = t.settings.index || e;
                        t.openGallery(n, s);
                      }
                    );
                  },
                  i = this,
                  s = 0;
                s < this.items.length;
                s++
              )
                e(s);
            }),
            (t.prototype.buildModules = function () {
              var t = this;
              this.settings.plugins.forEach(function (e) {
                t.plugins.push(new e(t, h));
              });
            }),
            (t.prototype.validateLicense = function () {
              this.settings.licenseKey
                ? "0000-0000-000-0000" === this.settings.licenseKey &&
                  console.warn(
                    "lightGallery: " +
                      this.settings.licenseKey +
                      " license key is not valid for production use"
                  )
                : console.error("Please provide a valid license key");
            }),
            (t.prototype.getSlideItem = function (t) {
              return h(this.getSlideItemId(t));
            }),
            (t.prototype.getSlideItemId = function (t) {
              return "#lg-item-" + this.lgId + "-" + t;
            }),
            (t.prototype.getIdName = function (t) {
              return t + "-" + this.lgId;
            }),
            (t.prototype.getElementById = function (t) {
              return h("#" + this.getIdName(t));
            }),
            (t.prototype.manageSingleSlideClassName = function () {
              this.galleryItems.length < 2
                ? this.outer.addClass("lg-single-item")
                : this.outer.removeClass("lg-single-item");
            }),
            (t.prototype.buildStructure = function () {
              var t = this;
              if (!(this.$container && this.$container.get())) {
                var e = "",
                  i = "";
                this.settings.controls &&
                  (e =
                    '<button type="button" id="' +
                    this.getIdName("lg-prev") +
                    '" aria-label="Previous slide" class="lg-prev lg-icon"> ' +
                    this.settings.prevHtml +
                    ' </button>\n                <button type="button" id="' +
                    this.getIdName("lg-next") +
                    '" aria-label="Next slide" class="lg-next lg-icon"> ' +
                    this.settings.nextHtml +
                    " </button>"),
                  ".lg-item" !== this.settings.appendSubHtmlTo &&
                    (i =
                      '<div class="lg-sub-html" role="status" aria-live="polite"></div>');
                var s = "";
                this.settings.allowMediaOverlap && (s += "lg-media-overlap ");
                var n = this.settings.ariaLabelledby
                    ? 'aria-labelledby="' + this.settings.ariaLabelledby + '"'
                    : "",
                  o = this.settings.ariaDescribedby
                    ? 'aria-describedby="' + this.settings.ariaDescribedby + '"'
                    : "",
                  r =
                    "lg-container " +
                    this.settings.addClass +
                    " " +
                    (document.body !== this.settings.container
                      ? "lg-inline"
                      : ""),
                  l =
                    this.settings.closable && this.settings.showCloseIcon
                      ? '<button type="button" aria-label="Close gallery" id="' +
                        this.getIdName("lg-close") +
                        '" class="lg-close lg-icon"></button>'
                      : "",
                  a = this.settings.showMaximizeIcon
                    ? '<button type="button" aria-label="Toggle maximize" id="' +
                      this.getIdName("lg-maximize") +
                      '" class="lg-maximize lg-icon"></button>'
                    : "",
                  d =
                    '\n        <div class="' +
                    r +
                    '" id="' +
                    this.getIdName("lg-container") +
                    '" tabindex="-1" aria-modal="true" ' +
                    n +
                    " " +
                    o +
                    ' role="dialog"\n        >\n            <div id="' +
                    this.getIdName("lg-backdrop") +
                    '" class="lg-backdrop"></div>\n\n            <div id="' +
                    this.getIdName("lg-outer") +
                    '" class="lg-outer lg-use-css3 lg-css3 lg-hide-items ' +
                    s +
                    ' ">\n\n              <div id="' +
                    this.getIdName("lg-content") +
                    '" class="lg-content">\n                <div id="' +
                    this.getIdName("lg-inner") +
                    '" class="lg-inner">\n                </div>\n                ' +
                    e +
                    '\n              </div>\n                <div id="' +
                    this.getIdName("lg-toolbar") +
                    '" class="lg-toolbar lg-group">\n                    ' +
                    a +
                    "\n                    " +
                    l +
                    "\n                    </div>\n                    " +
                    (".lg-outer" === this.settings.appendSubHtmlTo ? i : "") +
                    '\n                <div id="' +
                    this.getIdName("lg-components") +
                    '" class="lg-components">\n                    ' +
                    (".lg-sub-html" === this.settings.appendSubHtmlTo
                      ? i
                      : "") +
                    "\n                </div>\n            </div>\n        </div>\n        ";
                h(this.settings.container)
                  .css("position", "relative")
                  .append(d),
                  (this.outer = this.getElementById("lg-outer")),
                  (this.$lgComponents = this.getElementById("lg-components")),
                  (this.$backdrop = this.getElementById("lg-backdrop")),
                  (this.$container = this.getElementById("lg-container")),
                  (this.$inner = this.getElementById("lg-inner")),
                  (this.$content = this.getElementById("lg-content")),
                  (this.$toolbar = this.getElementById("lg-toolbar")),
                  this.$backdrop.css(
                    "transition-duration",
                    this.settings.backdropDuration + "ms"
                  );
                var g = this.settings.mode + " ";
                this.manageSingleSlideClassName(),
                  this.settings.enableDrag && (g += "lg-grab "),
                  this.outer.addClass(g),
                  this.$inner.css(
                    "transition-timing-function",
                    this.settings.easing
                  ),
                  this.$inner.css(
                    "transition-duration",
                    this.settings.speed + "ms"
                  ),
                  this.settings.download &&
                    this.$toolbar.append(
                      '<a id="' +
                        this.getIdName("lg-download") +
                        '" target="_blank" rel="noopener" aria-label="Download" download class="lg-download lg-icon"></a>'
                    ),
                  this.counter(),
                  h(window).on(
                    "resize.lg.global" +
                      this.lgId +
                      " orientationchange.lg.global" +
                      this.lgId,
                    function () {
                      t.refreshOnResize();
                    }
                  ),
                  this.hideBars(),
                  this.manageCloseGallery(),
                  this.toggleMaximize(),
                  this.initModules();
              }
            }),
            (t.prototype.refreshOnResize = function () {
              if (this.lgOpened) {
                var t = this.galleryItems[this.index].__slideVideoInfo;
                this.mediaContainerPosition = this.getMediaContainerPosition();
                var e = this.mediaContainerPosition,
                  i = e.top,
                  s = e.bottom;
                if (
                  ((this.currentImageSize = m(
                    this.items[this.index],
                    this.outer,
                    i + s,
                    t && this.settings.videoMaxSize
                  )),
                  t && this.resizeVideoSlide(this.index, this.currentImageSize),
                  this.zoomFromOrigin && !this.isDummyImageRemoved)
                ) {
                  var n = this.getDummyImgStyles(this.currentImageSize);
                  this.outer
                    .find(".lg-current .lg-dummy-img")
                    .first()
                    .attr("style", n);
                }
                this.LGel.trigger(A);
              }
            }),
            (t.prototype.resizeVideoSlide = function (t, e) {
              var i = this.getVideoContStyle(e);
              this.getSlideItem(t).find(".lg-video-cont").attr("style", i);
            }),
            (t.prototype.updateSlides = function (t, e) {
              if (
                (this.index > t.length - 1 && (this.index = t.length - 1),
                1 === t.length && (this.index = 0),
                t.length)
              ) {
                var i = this.galleryItems[e].src;
                (this.galleryItems = t),
                  this.updateControls(),
                  this.$inner.empty(),
                  (this.currentItemsInDom = []);
                var s = 0;
                this.galleryItems.some(function (t, e) {
                  return t.src === i && ((s = e), !0);
                }),
                  (this.currentItemsInDom = this.organizeSlideItems(s, -1)),
                  this.loadContent(s, !0),
                  this.getSlideItem(s).addClass("lg-current"),
                  (this.index = s),
                  this.updateCurrentCounter(s),
                  this.LGel.trigger(L);
              } else this.closeGallery();
            }),
            (t.prototype.getItems = function () {
              if (((this.items = []), this.settings.dynamic))
                return this.settings.dynamicEl || [];
              if ("this" === this.settings.selector) this.items.push(this.el);
              else if (this.settings.selector)
                if ("string" == typeof this.settings.selector)
                  if (this.settings.selectWithin) {
                    var t = h(this.settings.selectWithin);
                    this.items = t.find(this.settings.selector).get();
                  } else
                    this.items = this.el.querySelectorAll(
                      this.settings.selector
                    );
                else this.items = this.settings.selector;
              else this.items = this.el.children;
              return C(
                this.items,
                this.settings.extraProps,
                this.settings.getCaptionFromTitleOrAlt,
                this.settings.exThumbImage
              );
            }),
            (t.prototype.openGallery = function (t, e) {
              var i = this;
              if ((void 0 === t && (t = this.settings.index), !this.lgOpened)) {
                (this.lgOpened = !0),
                  this.outer.get().focus(),
                  this.outer.removeClass("lg-hide-items"),
                  this.$container.addClass("lg-show");
                var s = this.getItemsToBeInsertedToDom(t, t);
                this.currentItemsInDom = s;
                var n = "";
                s.forEach(function (t) {
                  n = n + '<div id="' + t + '" class="lg-item"></div>';
                }),
                  this.$inner.append(n),
                  this.addHtml(t);
                var o = "";
                this.mediaContainerPosition = this.getMediaContainerPosition();
                var r = this.mediaContainerPosition,
                  l = r.top,
                  a = r.bottom;
                this.settings.allowMediaOverlap ||
                  this.setMediaContainerPosition(l, a);
                var d = this.galleryItems[t].__slideVideoInfo;
                this.zoomFromOrigin &&
                  e &&
                  ((this.currentImageSize = m(
                    e,
                    this.outer,
                    l + a,
                    d && this.settings.videoMaxSize
                  )),
                  (o = p(e, this.outer, l, a, this.currentImageSize))),
                  (this.zoomFromOrigin && o) ||
                    (this.outer.addClass(this.settings.startClass),
                    this.getSlideItem(t).removeClass("lg-complete"));
                var g = this.settings.zoomFromOrigin
                  ? 100
                  : this.settings.backdropDuration;
                setTimeout(function () {
                  i.outer.addClass("lg-components-open");
                }, g),
                  (this.index = t),
                  this.LGel.trigger(M),
                  this.getSlideItem(t).addClass("lg-current"),
                  (this.lGalleryOn = !1),
                  (this.prevScrollTop = h(window).scrollTop()),
                  setTimeout(function () {
                    if (i.zoomFromOrigin && o) {
                      var e = i.getSlideItem(t);
                      e.css("transform", o),
                        setTimeout(function () {
                          e
                            .addClass("lg-start-progress lg-start-end-progress")
                            .css(
                              "transition-duration",
                              i.settings.startAnimationDuration + "ms"
                            ),
                            i.outer.addClass("lg-zoom-from-image");
                        }),
                        setTimeout(function () {
                          e.css("transform", "translate3d(0, 0, 0)");
                        }, 100);
                    }
                    setTimeout(function () {
                      i.$backdrop.addClass("in"),
                        i.$container.addClass("lg-show-in");
                    }, 10),
                      (i.zoomFromOrigin && o) ||
                        setTimeout(function () {
                          i.outer.addClass("lg-visible");
                        }, i.settings.backdropDuration),
                      i.slide(t, !1, !1, !1),
                      i.LGel.trigger(k);
                  }),
                  document.body === this.settings.container &&
                    h("html").addClass("lg-on");
              }
            }),
            (t.prototype.getMediaContainerPosition = function () {
              if (this.settings.allowMediaOverlap) return { top: 0, bottom: 0 };
              var t = this.$toolbar.get().clientHeight || 0,
                e = this.outer.find(".lg-components .lg-sub-html").get(),
                i =
                  this.settings.defaultCaptionHeight ||
                  (e && e.clientHeight) ||
                  0,
                s = this.outer.find(".lg-thumb-outer").get();
              return { top: t, bottom: (s ? s.clientHeight : 0) + i };
            }),
            (t.prototype.setMediaContainerPosition = function (t, e) {
              void 0 === t && (t = 0),
                void 0 === e && (e = 0),
                this.$content.css("top", t + "px").css("bottom", e + "px");
            }),
            (t.prototype.hideBars = function () {
              var t = this;
              setTimeout(function () {
                t.outer.removeClass("lg-hide-items"),
                  t.settings.hideBarsDelay > 0 &&
                    (t.outer.on(
                      "mousemove.lg click.lg touchstart.lg",
                      function () {
                        t.outer.removeClass("lg-hide-items"),
                          clearTimeout(t.hideBarTimeout),
                          (t.hideBarTimeout = setTimeout(function () {
                            t.outer.addClass("lg-hide-items");
                          }, t.settings.hideBarsDelay));
                      }
                    ),
                    t.outer.trigger("mousemove.lg"));
              }, this.settings.showBarsAfter);
            }),
            (t.prototype.initPictureFill = function (t) {
              if (this.settings.supportLegacyBrowser)
                try {
                  picturefill({ elements: [t.get()] });
                } catch (t) {
                  console.warn(
                    "lightGallery :- If you want srcset or picture tag to be supported for older browser please include picturefil javascript library in your document."
                  );
                }
            }),
            (t.prototype.counter = function () {
              if (this.settings.counter) {
                var t =
                  '<div class="lg-counter" role="status" aria-live="polite">\n                <span id="' +
                  this.getIdName("lg-counter-current") +
                  '" class="lg-counter-current">' +
                  (this.index + 1) +
                  ' </span> /\n                <span id="' +
                  this.getIdName("lg-counter-all") +
                  '" class="lg-counter-all">' +
                  this.galleryItems.length +
                  " </span></div>";
                this.outer.find(this.settings.appendCounterTo).append(t);
              }
            }),
            (t.prototype.addHtml = function (t) {
              var e, i;
              if (
                (this.galleryItems[t].subHtmlUrl
                  ? (i = this.galleryItems[t].subHtmlUrl)
                  : (e = this.galleryItems[t].subHtml),
                !i)
              )
                if (e) {
                  var s = e.substring(0, 1);
                  ("." !== s && "#" !== s) ||
                    (e =
                      this.settings.subHtmlSelectorRelative &&
                      !this.settings.dynamic
                        ? h(this.items).eq(t).find(e).first().html()
                        : h(e).first().html());
                } else e = "";
              if (".lg-item" !== this.settings.appendSubHtmlTo)
                i
                  ? this.outer.find(".lg-sub-html").load(i)
                  : this.outer.find(".lg-sub-html").html(e);
              else {
                var n = h(this.getSlideItemId(t));
                i
                  ? n.load(i)
                  : n.append('<div class="lg-sub-html">' + e + "</div>");
              }
              null != e &&
                ("" === e
                  ? this.outer
                      .find(this.settings.appendSubHtmlTo)
                      .addClass("lg-empty-html")
                  : this.outer
                      .find(this.settings.appendSubHtmlTo)
                      .removeClass("lg-empty-html")),
                this.LGel.trigger(D, { index: t });
            }),
            (t.prototype.preload = function (t) {
              for (
                var e = 1;
                e <= this.settings.preload &&
                !(e >= this.galleryItems.length - t);
                e++
              )
                this.loadContent(t + e, !1);
              for (var i = 1; i <= this.settings.preload && !(t - i < 0); i++)
                this.loadContent(t - i, !1);
            }),
            (t.prototype.getDummyImgStyles = function (t) {
              return t
                ? "width:" +
                    t.width +
                    "px;\n                margin-left: -" +
                    t.width / 2 +
                    "px;\n                margin-top: -" +
                    t.height / 2 +
                    "px;\n                height:" +
                    t.height +
                    "px"
                : "";
            }),
            (t.prototype.getVideoContStyle = function (t) {
              return t
                ? "width:" +
                    t.width +
                    "px;\n                height:" +
                    t.height +
                    "px"
                : "";
            }),
            (t.prototype.getDummyImageContent = function (t, e, i) {
              var s;
              if ((this.settings.dynamic || (s = h(this.items).eq(e)), s)) {
                var n = void 0;
                if (
                  !(n = this.settings.exThumbImage
                    ? s.attr(this.settings.exThumbImage)
                    : s.find("img").first().attr("src"))
                )
                  return "";
                var o =
                  "<img " +
                  i +
                  ' style="' +
                  this.getDummyImgStyles(this.currentImageSize) +
                  '" class="lg-dummy-img" src="' +
                  n +
                  '" />';
                return (
                  t.addClass("lg-first-slide"),
                  this.outer.addClass("lg-first-slide-loading"),
                  o
                );
              }
              return "";
            }),
            (t.prototype.setImgMarkup = function (t, e, i) {
              var s = this.galleryItems[i],
                n = s.alt,
                o = s.srcset,
                r = s.sizes,
                l = s.sources,
                a = n ? 'alt="' + n + '"' : "",
                d =
                  '<picture class="lg-img-wrap"> ' +
                  (this.isFirstSlideWithZoomAnimation()
                    ? this.getDummyImageContent(e, i, a)
                    : v(i, t, a, o, r, l)) +
                  "</picture>";
              e.prepend(d);
            }),
            (t.prototype.onSlideObjectLoad = function (t, e, i, s) {
              var n = t.find(".lg-object").first();
              b(n.get()) || e
                ? i()
                : (n.on("load.lg error.lg", function () {
                    i && i();
                  }),
                  n.on("error.lg", function () {
                    s && s();
                  }));
            }),
            (t.prototype.onLgObjectLoad = function (t, e, i, s, n, o) {
              var r = this;
              this.onSlideObjectLoad(
                t,
                o,
                function () {
                  r.triggerSlideItemLoad(t, e, i, s, n);
                },
                function () {
                  t.addClass("lg-complete lg-complete_"),
                    t.html(
                      '<span class="lg-error-msg">Oops... Failed to load content...</span>'
                    );
                }
              );
            }),
            (t.prototype.triggerSlideItemLoad = function (t, e, i, s, n) {
              var o = this,
                r = this.galleryItems[e],
                l = n && "video" === this.getSlideType(r) && !r.poster ? s : 0;
              setTimeout(function () {
                t.addClass("lg-complete lg-complete_"),
                  o.LGel.trigger(z, {
                    index: e,
                    delay: i || 0,
                    isFirstSlide: n,
                  });
              }, l);
            }),
            (t.prototype.isFirstSlideWithZoomAnimation = function () {
              return !(
                this.lGalleryOn ||
                !this.zoomFromOrigin ||
                !this.currentImageSize
              );
            }),
            (t.prototype.addSlideVideoInfo = function (t) {
              var e = this;
              t.forEach(function (t, i) {
                (t.__slideVideoInfo = S(t.src, !!t.video, i)),
                  t.__slideVideoInfo &&
                    e.settings.loadYouTubePoster &&
                    !t.poster &&
                    t.__slideVideoInfo.youtube &&
                    (t.poster =
                      "//img.youtube.com/vi/" +
                      t.__slideVideoInfo.youtube[1] +
                      "/maxresdefault.jpg");
              });
            }),
            (t.prototype.loadContent = function (t, e) {
              var i = this,
                s = this.galleryItems[t],
                n = h(this.getSlideItemId(t)),
                o = s.poster,
                r = s.srcset,
                l = s.sizes,
                a = s.sources,
                d = s.src,
                g = s.video,
                c = g && "string" == typeof g ? JSON.parse(g) : g;
              if (s.responsive) {
                var u = s.responsive.split(",");
                d = y(u) || d;
              }
              var p = s.__slideVideoInfo,
                b = "",
                C = !!s.iframe,
                I = !this.lGalleryOn,
                S = 0;
              if (
                (I &&
                  (S =
                    this.zoomFromOrigin && this.currentImageSize
                      ? this.settings.startAnimationDuration + 10
                      : this.settings.backdropDuration + 10),
                !n.hasClass("lg-loaded"))
              ) {
                if (p) {
                  var x = this.mediaContainerPosition,
                    T = x.top,
                    A = x.bottom,
                    L = m(
                      this.items[t],
                      this.outer,
                      T + A,
                      p && this.settings.videoMaxSize
                    );
                  b = this.getVideoContStyle(L);
                }
                if (C) {
                  var D = f(
                    this.settings.iframeWidth,
                    this.settings.iframeHeight,
                    this.settings.iframeMaxWidth,
                    this.settings.iframeMaxHeight,
                    d,
                    s.iframeTitle
                  );
                  n.prepend(D);
                } else if (o) {
                  var M = "";
                  I &&
                    this.zoomFromOrigin &&
                    this.currentImageSize &&
                    (M = this.getDummyImageContent(n, t, ""));
                  D = w(o, M || "", b, p);
                  n.prepend(D);
                } else if (p) {
                  D = '<div class="lg-video-cont " style="' + b + '"></div>';
                  n.prepend(D);
                } else if ((this.setImgMarkup(d, n, t), r || a)) {
                  var k = n.find(".lg-object");
                  this.initPictureFill(k);
                }
                (o || p) &&
                  this.LGel.trigger(O, {
                    index: t,
                    src: d,
                    html5Video: c,
                    hasPoster: !!o,
                  }),
                  this.LGel.trigger(E, { index: t }),
                  this.lGalleryOn &&
                    ".lg-item" === this.settings.appendSubHtmlTo &&
                    this.addHtml(t);
              }
              var z = 0;
              S && !h(document.body).hasClass("lg-from-hash") && (z = S),
                this.isFirstSlideWithZoomAnimation() &&
                  (setTimeout(function () {
                    n.removeClass(
                      "lg-start-end-progress lg-start-progress"
                    ).removeAttr("style");
                  }, this.settings.startAnimationDuration + 100),
                  n.hasClass("lg-loaded") ||
                    setTimeout(function () {
                      if (
                        "image" === i.getSlideType(s) &&
                        (n
                          .find(".lg-img-wrap")
                          .append(v(t, d, "", r, l, s.sources)),
                        r || a)
                      ) {
                        var e = n.find(".lg-object");
                        i.initPictureFill(e);
                      }
                      ("image" === i.getSlideType(s) ||
                        ("video" === i.getSlideType(s) && o)) &&
                        (i.onLgObjectLoad(n, t, S, z, !0, !1),
                        i.onSlideObjectLoad(
                          n,
                          !(!p || !p.html5 || o),
                          function () {
                            i.loadContentOnFirstSlideLoad(t, n, z);
                          },
                          function () {
                            i.loadContentOnFirstSlideLoad(t, n, z);
                          }
                        ));
                    }, this.settings.startAnimationDuration + 100)),
                n.addClass("lg-loaded"),
                (this.isFirstSlideWithZoomAnimation() &&
                  ("video" !== this.getSlideType(s) || o)) ||
                  this.onLgObjectLoad(n, t, S, z, I, !(!p || !p.html5 || o)),
                (this.zoomFromOrigin && this.currentImageSize) ||
                  !n.hasClass("lg-complete_") ||
                  this.lGalleryOn ||
                  setTimeout(function () {
                    n.addClass("lg-complete");
                  }, this.settings.backdropDuration),
                (this.lGalleryOn = !0),
                !0 === e &&
                  (n.hasClass("lg-complete_")
                    ? this.preload(t)
                    : n
                        .find(".lg-object")
                        .first()
                        .on("load.lg error.lg", function () {
                          i.preload(t);
                        }));
            }),
            (t.prototype.loadContentOnFirstSlideLoad = function (t, e, i) {
              var s = this;
              setTimeout(function () {
                e.find(".lg-dummy-img").remove(),
                  e.removeClass("lg-first-slide"),
                  s.outer.removeClass("lg-first-slide-loading"),
                  (s.isDummyImageRemoved = !0),
                  s.preload(t);
              }, i + 300);
            }),
            (t.prototype.getItemsToBeInsertedToDom = function (t, e, i) {
              var s = this;
              void 0 === i && (i = 0);
              var n = [],
                o = Math.max(i, 3);
              o = Math.min(o, this.galleryItems.length);
              var r = "lg-item-" + this.lgId + "-" + e;
              if (this.galleryItems.length <= 3)
                return (
                  this.galleryItems.forEach(function (t, e) {
                    n.push("lg-item-" + s.lgId + "-" + e);
                  }),
                  n
                );
              if (t < (this.galleryItems.length - 1) / 2) {
                for (var l = t; l > t - o / 2 && l >= 0; l--)
                  n.push("lg-item-" + this.lgId + "-" + l);
                var a = n.length;
                for (l = 0; l < o - a; l++)
                  n.push("lg-item-" + this.lgId + "-" + (t + l + 1));
              } else {
                for (
                  l = t;
                  l <= this.galleryItems.length - 1 && l < t + o / 2;
                  l++
                )
                  n.push("lg-item-" + this.lgId + "-" + l);
                for (a = n.length, l = 0; l < o - a; l++)
                  n.push("lg-item-" + this.lgId + "-" + (t - l - 1));
              }
              return (
                this.settings.loop &&
                  (t === this.galleryItems.length - 1
                    ? n.push("lg-item-" + this.lgId + "-0")
                    : 0 === t &&
                      n.push(
                        "lg-item-" +
                          this.lgId +
                          "-" +
                          (this.galleryItems.length - 1)
                      )),
                -1 === n.indexOf(r) && n.push("lg-item-" + this.lgId + "-" + e),
                n
              );
            }),
            (t.prototype.organizeSlideItems = function (t, e) {
              var i = this,
                s = this.getItemsToBeInsertedToDom(
                  t,
                  e,
                  this.settings.numberOfSlideItemsInDom
                );
              return (
                s.forEach(function (t) {
                  -1 === i.currentItemsInDom.indexOf(t) &&
                    i.$inner.append(
                      '<div id="' + t + '" class="lg-item"></div>'
                    );
                }),
                this.currentItemsInDom.forEach(function (t) {
                  -1 === s.indexOf(t) && h("#" + t).remove();
                }),
                s
              );
            }),
            (t.prototype.getPreviousSlideIndex = function () {
              var t = 0;
              try {
                var e = this.outer.find(".lg-current").first().attr("id");
                t = parseInt(e.split("-")[3]) || 0;
              } catch (e) {
                t = 0;
              }
              return t;
            }),
            (t.prototype.setDownloadValue = function (t) {
              if (this.settings.download) {
                var e = this.galleryItems[t];
                if (!1 === e.downloadUrl || "false" === e.downloadUrl)
                  this.outer.addClass("lg-hide-download");
                else {
                  var i = this.getElementById("lg-download");
                  this.outer.removeClass("lg-hide-download"),
                    i.attr("href", e.downloadUrl || e.src),
                    e.download && i.attr("download", e.download);
                }
              }
            }),
            (t.prototype.makeSlideAnimation = function (t, e, i) {
              var s = this;
              this.lGalleryOn && i.addClass("lg-slide-progress"),
                setTimeout(
                  function () {
                    s.outer.addClass("lg-no-trans"),
                      s.outer
                        .find(".lg-item")
                        .removeClass("lg-prev-slide lg-next-slide"),
                      "prev" === t
                        ? (e.addClass("lg-prev-slide"),
                          i.addClass("lg-next-slide"))
                        : (e.addClass("lg-next-slide"),
                          i.addClass("lg-prev-slide")),
                      setTimeout(function () {
                        s.outer.find(".lg-item").removeClass("lg-current"),
                          e.addClass("lg-current"),
                          s.outer.removeClass("lg-no-trans");
                      }, 50);
                  },
                  this.lGalleryOn ? this.settings.slideDelay : 0
                );
            }),
            (t.prototype.slide = function (t, e, i, s) {
              var n = this,
                o = this.getPreviousSlideIndex();
              if (
                ((this.currentItemsInDom = this.organizeSlideItems(t, o)),
                !this.lGalleryOn || o !== t)
              ) {
                var r = this.galleryItems.length;
                if (!this.lgBusy) {
                  this.settings.counter && this.updateCurrentCounter(t);
                  var l = this.getSlideItem(t),
                    a = this.getSlideItem(o),
                    d = this.galleryItems[t],
                    g = d.__slideVideoInfo;
                  if (
                    (this.outer.attr(
                      "data-lg-slide-type",
                      this.getSlideType(d)
                    ),
                    this.setDownloadValue(t),
                    g)
                  ) {
                    var h = this.mediaContainerPosition,
                      c = h.top,
                      u = h.bottom,
                      p = m(
                        this.items[t],
                        this.outer,
                        c + u,
                        g && this.settings.videoMaxSize
                      );
                    this.resizeVideoSlide(t, p);
                  }
                  if (
                    (this.LGel.trigger(B, {
                      prevIndex: o,
                      index: t,
                      fromTouch: !!e,
                      fromThumb: !!i,
                    }),
                    (this.lgBusy = !0),
                    clearTimeout(this.hideBarTimeout),
                    this.arrowDisable(t),
                    s || (t < o ? (s = "prev") : t > o && (s = "next")),
                    e)
                  ) {
                    this.outer
                      .find(".lg-item")
                      .removeClass("lg-prev-slide lg-current lg-next-slide");
                    var f = void 0,
                      v = void 0;
                    r > 2
                      ? ((f = t - 1),
                        (v = t + 1),
                        ((0 === t && o === r - 1) ||
                          (t === r - 1 && 0 === o)) &&
                          ((v = 0), (f = r - 1)))
                      : ((f = 0), (v = 1)),
                      "prev" === s
                        ? this.getSlideItem(v).addClass("lg-next-slide")
                        : this.getSlideItem(f).addClass("lg-prev-slide"),
                      l.addClass("lg-current");
                  } else this.makeSlideAnimation(s, l, a);
                  this.lGalleryOn
                    ? setTimeout(function () {
                        n.loadContent(t, !0),
                          ".lg-item" !== n.settings.appendSubHtmlTo &&
                            n.addHtml(t);
                      }, this.settings.speed +
                        50 +
                        (e ? 0 : this.settings.slideDelay))
                    : this.loadContent(t, !0),
                    setTimeout(function () {
                      (n.lgBusy = !1),
                        a.removeClass("lg-slide-progress"),
                        n.LGel.trigger(F, {
                          prevIndex: o,
                          index: t,
                          fromTouch: e,
                          fromThumb: i,
                        });
                    }, (this.lGalleryOn ? this.settings.speed + 100 : 100) +
                      (e ? 0 : this.settings.slideDelay));
                }
                this.index = t;
              }
            }),
            (t.prototype.updateCurrentCounter = function (t) {
              this.getElementById("lg-counter-current").html(t + 1 + "");
            }),
            (t.prototype.updateCounterTotal = function () {
              this.getElementById("lg-counter-all").html(
                this.galleryItems.length + ""
              );
            }),
            (t.prototype.getSlideType = function (t) {
              return t.__slideVideoInfo
                ? "video"
                : t.iframe
                ? "iframe"
                : "image";
            }),
            (t.prototype.touchMove = function (t, e, i) {
              var s = e.pageX - t.pageX,
                n = e.pageY - t.pageY,
                o = !1;
              if (
                (this.swipeDirection
                  ? (o = !0)
                  : Math.abs(s) > 15
                  ? ((this.swipeDirection = "horizontal"), (o = !0))
                  : Math.abs(n) > 15 &&
                    ((this.swipeDirection = "vertical"), (o = !0)),
                o)
              ) {
                var r = this.getSlideItem(this.index);
                if ("horizontal" === this.swipeDirection) {
                  null == i || i.preventDefault(),
                    this.outer.addClass("lg-dragging"),
                    this.setTranslate(r, s, 0);
                  var l = r.get().offsetWidth,
                    a = (15 * l) / 100 - Math.abs((10 * s) / 100);
                  this.setTranslate(
                    this.outer.find(".lg-prev-slide").first(),
                    -l + s - a,
                    0
                  ),
                    this.setTranslate(
                      this.outer.find(".lg-next-slide").first(),
                      l + s + a,
                      0
                    );
                } else if (
                  "vertical" === this.swipeDirection &&
                  this.settings.swipeToClose
                ) {
                  null == i || i.preventDefault(),
                    this.$container.addClass("lg-dragging-vertical");
                  var d = 1 - Math.abs(n) / window.innerHeight;
                  this.$backdrop.css("opacity", d);
                  var g = 1 - Math.abs(n) / (2 * window.innerWidth);
                  this.setTranslate(r, 0, n, g, g),
                    Math.abs(n) > 100 &&
                      this.outer
                        .addClass("lg-hide-items")
                        .removeClass("lg-components-open");
                }
              }
            }),
            (t.prototype.touchEnd = function (t, e, i) {
              var s,
                n = this;
              "lg-slide" !== this.settings.mode &&
                this.outer.addClass("lg-slide"),
                setTimeout(function () {
                  n.$container.removeClass("lg-dragging-vertical"),
                    n.outer
                      .removeClass("lg-dragging lg-hide-items")
                      .addClass("lg-components-open");
                  var o = !0;
                  if ("horizontal" === n.swipeDirection) {
                    s = t.pageX - e.pageX;
                    var r = Math.abs(t.pageX - e.pageX);
                    s < 0 && r > n.settings.swipeThreshold
                      ? (n.goToNextSlide(!0), (o = !1))
                      : s > 0 &&
                        r > n.settings.swipeThreshold &&
                        (n.goToPrevSlide(!0), (o = !1));
                  } else if ("vertical" === n.swipeDirection) {
                    if (
                      ((s = Math.abs(t.pageY - e.pageY)),
                      n.settings.closable && n.settings.swipeToClose && s > 100)
                    )
                      return void n.closeGallery();
                    n.$backdrop.css("opacity", 1);
                  }
                  if (
                    (n.outer.find(".lg-item").removeAttr("style"),
                    o && Math.abs(t.pageX - e.pageX) < 5)
                  ) {
                    var l = h(i.target);
                    n.isPosterElement(l) && n.LGel.trigger(P);
                  }
                  n.swipeDirection = void 0;
                }),
                setTimeout(function () {
                  n.outer.hasClass("lg-dragging") ||
                    "lg-slide" === n.settings.mode ||
                    n.outer.removeClass("lg-slide");
                }, this.settings.speed + 100);
            }),
            (t.prototype.enableSwipe = function () {
              var t = this,
                e = {},
                i = {},
                s = !1,
                n = !1;
              this.settings.enableSwipe &&
                (this.$inner.on("touchstart.lg", function (i) {
                  t.dragOrSwipeEnabled = !0;
                  var s = t.getSlideItem(t.index);
                  (!h(i.target).hasClass("lg-item") &&
                    !s.get().contains(i.target)) ||
                    t.outer.hasClass("lg-zoomed") ||
                    t.lgBusy ||
                    1 !== i.targetTouches.length ||
                    ((n = !0),
                    (t.touchAction = "swipe"),
                    t.manageSwipeClass(),
                    (e = {
                      pageX: i.targetTouches[0].pageX,
                      pageY: i.targetTouches[0].pageY,
                    }));
                }),
                this.$inner.on("touchmove.lg", function (o) {
                  n &&
                    "swipe" === t.touchAction &&
                    1 === o.targetTouches.length &&
                    ((i = {
                      pageX: o.targetTouches[0].pageX,
                      pageY: o.targetTouches[0].pageY,
                    }),
                    t.touchMove(e, i, o),
                    (s = !0));
                }),
                this.$inner.on("touchend.lg", function (o) {
                  if ("swipe" === t.touchAction) {
                    if (s) (s = !1), t.touchEnd(i, e, o);
                    else if (n) {
                      var r = h(o.target);
                      t.isPosterElement(r) && t.LGel.trigger(P);
                    }
                    (t.touchAction = void 0), (n = !1);
                  }
                }));
            }),
            (t.prototype.enableDrag = function () {
              var t = this,
                e = {},
                i = {},
                s = !1,
                n = !1;
              this.settings.enableDrag &&
                (this.outer.on("mousedown.lg", function (i) {
                  t.dragOrSwipeEnabled = !0;
                  var n = t.getSlideItem(t.index);
                  (h(i.target).hasClass("lg-item") ||
                    n.get().contains(i.target)) &&
                    (t.outer.hasClass("lg-zoomed") ||
                      t.lgBusy ||
                      (i.preventDefault(),
                      t.lgBusy ||
                        (t.manageSwipeClass(),
                        (e = { pageX: i.pageX, pageY: i.pageY }),
                        (s = !0),
                        (t.outer.get().scrollLeft += 1),
                        (t.outer.get().scrollLeft -= 1),
                        t.outer.removeClass("lg-grab").addClass("lg-grabbing"),
                        t.LGel.trigger(G))));
                }),
                h(window).on("mousemove.lg.global" + this.lgId, function (o) {
                  s &&
                    t.lgOpened &&
                    ((n = !0),
                    (i = { pageX: o.pageX, pageY: o.pageY }),
                    t.touchMove(e, i),
                    t.LGel.trigger(H));
                }),
                h(window).on("mouseup.lg.global" + this.lgId, function (o) {
                  if (t.lgOpened) {
                    var r = h(o.target);
                    n
                      ? ((n = !1), t.touchEnd(i, e, o), t.LGel.trigger(_))
                      : t.isPosterElement(r) && t.LGel.trigger(P),
                      s &&
                        ((s = !1),
                        t.outer.removeClass("lg-grabbing").addClass("lg-grab"));
                  }
                }));
            }),
            (t.prototype.triggerPosterClick = function () {
              var t = this;
              this.$inner.on("click.lg", function (e) {
                !t.dragOrSwipeEnabled &&
                  t.isPosterElement(h(e.target)) &&
                  t.LGel.trigger(P);
              });
            }),
            (t.prototype.manageSwipeClass = function () {
              var t = this.index + 1,
                e = this.index - 1;
              this.settings.loop &&
                this.galleryItems.length > 2 &&
                (0 === this.index
                  ? (e = this.galleryItems.length - 1)
                  : this.index === this.galleryItems.length - 1 && (t = 0)),
                this.outer
                  .find(".lg-item")
                  .removeClass("lg-next-slide lg-prev-slide"),
                e > -1 && this.getSlideItem(e).addClass("lg-prev-slide"),
                this.getSlideItem(t).addClass("lg-next-slide");
            }),
            (t.prototype.goToNextSlide = function (t) {
              var e = this,
                i = this.settings.loop;
              t && this.galleryItems.length < 3 && (i = !1),
                this.lgBusy ||
                  (this.index + 1 < this.galleryItems.length
                    ? (this.index++,
                      this.LGel.trigger(q, { index: this.index }),
                      this.slide(this.index, !!t, !1, "next"))
                    : i
                    ? ((this.index = 0),
                      this.LGel.trigger(q, { index: this.index }),
                      this.slide(this.index, !!t, !1, "next"))
                    : this.settings.slideEndAnimation &&
                      !t &&
                      (this.outer.addClass("lg-right-end"),
                      setTimeout(function () {
                        e.outer.removeClass("lg-right-end");
                      }, 400)));
            }),
            (t.prototype.goToPrevSlide = function (t) {
              var e = this,
                i = this.settings.loop;
              t && this.galleryItems.length < 3 && (i = !1),
                this.lgBusy ||
                  (this.index > 0
                    ? (this.index--,
                      this.LGel.trigger(N, { index: this.index, fromTouch: t }),
                      this.slide(this.index, !!t, !1, "prev"))
                    : i
                    ? ((this.index = this.galleryItems.length - 1),
                      this.LGel.trigger(N, { index: this.index, fromTouch: t }),
                      this.slide(this.index, !!t, !1, "prev"))
                    : this.settings.slideEndAnimation &&
                      !t &&
                      (this.outer.addClass("lg-left-end"),
                      setTimeout(function () {
                        e.outer.removeClass("lg-left-end");
                      }, 400)));
            }),
            (t.prototype.keyPress = function () {
              var t = this;
              h(window).on("keydown.lg.global" + this.lgId, function (e) {
                t.lgOpened &&
                  !0 === t.settings.escKey &&
                  27 === e.keyCode &&
                  (e.preventDefault(),
                  t.settings.allowMediaOverlap &&
                  t.outer.hasClass("lg-can-toggle") &&
                  t.outer.hasClass("lg-components-open")
                    ? t.outer.removeClass("lg-components-open")
                    : t.closeGallery()),
                  t.lgOpened &&
                    t.galleryItems.length > 1 &&
                    (37 === e.keyCode &&
                      (e.preventDefault(), t.goToPrevSlide()),
                    39 === e.keyCode &&
                      (e.preventDefault(), t.goToNextSlide()));
              });
            }),
            (t.prototype.arrow = function () {
              var t = this;
              this.getElementById("lg-prev").on("click.lg", function () {
                t.goToPrevSlide();
              }),
                this.getElementById("lg-next").on("click.lg", function () {
                  t.goToNextSlide();
                });
            }),
            (t.prototype.arrowDisable = function (t) {
              if (!this.settings.loop && this.settings.hideControlOnEnd) {
                var e = this.getElementById("lg-prev"),
                  i = this.getElementById("lg-next");
                t + 1 === this.galleryItems.length
                  ? i.attr("disabled", "disabled").addClass("disabled")
                  : i.removeAttr("disabled").removeClass("disabled"),
                  0 === t
                    ? e.attr("disabled", "disabled").addClass("disabled")
                    : e.removeAttr("disabled").removeClass("disabled");
              }
            }),
            (t.prototype.setTranslate = function (t, e, i, s, n) {
              void 0 === s && (s = 1),
                void 0 === n && (n = 1),
                t.css(
                  "transform",
                  "translate3d(" +
                    e +
                    "px, " +
                    i +
                    "px, 0px) scale3d(" +
                    s +
                    ", " +
                    n +
                    ", 1)"
                );
            }),
            (t.prototype.mousewheel = function () {
              var t = this,
                e = 0;
              this.outer.on("wheel.lg", function (i) {
                if (i.deltaY && !(t.galleryItems.length < 2)) {
                  i.preventDefault();
                  var s = new Date().getTime();
                  s - e < 1e3 ||
                    ((e = s),
                    i.deltaY > 0
                      ? t.goToNextSlide()
                      : i.deltaY < 0 && t.goToPrevSlide());
                }
              });
            }),
            (t.prototype.isSlideElement = function (t) {
              return (
                t.hasClass("lg-outer") ||
                t.hasClass("lg-item") ||
                t.hasClass("lg-img-wrap")
              );
            }),
            (t.prototype.isPosterElement = function (t) {
              var e = this.getSlideItem(this.index)
                .find(".lg-video-play-button")
                .get();
              return (
                t.hasClass("lg-video-poster") ||
                t.hasClass("lg-video-play-button") ||
                (e && e.contains(t.get()))
              );
            }),
            (t.prototype.toggleMaximize = function () {
              var t = this;
              this.getElementById("lg-maximize").on("click.lg", function () {
                t.$container.toggleClass("lg-inline"), t.refreshOnResize();
              });
            }),
            (t.prototype.invalidateItems = function () {
              for (var t = 0; t < this.items.length; t++) {
                var e = h(this.items[t]);
                e.off("click.lgcustom-item-" + e.attr("data-lg-id"));
              }
            }),
            (t.prototype.manageCloseGallery = function () {
              var t = this;
              if (this.settings.closable) {
                var e = !1;
                this.getElementById("lg-close").on("click.lg", function () {
                  t.closeGallery();
                }),
                  this.settings.closeOnTap &&
                    (this.outer.on("mousedown.lg", function (i) {
                      var s = h(i.target);
                      e = !!t.isSlideElement(s);
                    }),
                    this.outer.on("mousemove.lg", function () {
                      e = !1;
                    }),
                    this.outer.on("mouseup.lg", function (i) {
                      var s = h(i.target);
                      t.isSlideElement(s) &&
                        e &&
                        (t.outer.hasClass("lg-dragging") || t.closeGallery());
                    }));
              }
            }),
            (t.prototype.closeGallery = function (t) {
              var e = this;
              if (!this.lgOpened || (!this.settings.closable && !t)) return 0;
              this.LGel.trigger($), h(window).scrollTop(this.prevScrollTop);
              var i,
                s = this.items[this.index];
              if (this.zoomFromOrigin && s) {
                var n = this.mediaContainerPosition,
                  o = n.top,
                  r = n.bottom,
                  l = this.galleryItems[this.index],
                  a = l.__slideVideoInfo,
                  d = l.poster,
                  g = m(
                    s,
                    this.outer,
                    o + r,
                    a && d && this.settings.videoMaxSize
                  );
                i = p(s, this.outer, o, r, g);
              }
              this.zoomFromOrigin && i
                ? (this.outer.addClass("lg-closing lg-zoom-from-image"),
                  this.getSlideItem(this.index)
                    .addClass("lg-start-end-progress")
                    .css(
                      "transition-duration",
                      this.settings.startAnimationDuration + "ms"
                    )
                    .css("transform", i))
                : (this.outer.addClass("lg-hide-items"),
                  this.outer.removeClass("lg-zoom-from-image")),
                this.destroyModules(),
                (this.lGalleryOn = !1),
                (this.isDummyImageRemoved = !1),
                (this.zoomFromOrigin = this.settings.zoomFromOrigin),
                clearTimeout(this.hideBarTimeout),
                (this.hideBarTimeout = !1),
                h("html").removeClass("lg-on"),
                this.outer.removeClass("lg-visible lg-components-open"),
                this.$backdrop.removeClass("in").css("opacity", 0);
              var c =
                this.zoomFromOrigin && i
                  ? Math.max(
                      this.settings.startAnimationDuration,
                      this.settings.backdropDuration
                    )
                  : this.settings.backdropDuration;
              return (
                this.$container.removeClass("lg-show-in"),
                setTimeout(function () {
                  e.zoomFromOrigin &&
                    i &&
                    e.outer.removeClass("lg-zoom-from-image"),
                    e.$container.removeClass("lg-show"),
                    e.$backdrop
                      .removeAttr("style")
                      .css(
                        "transition-duration",
                        e.settings.backdropDuration + "ms"
                      ),
                    e.outer.removeClass("lg-closing " + e.settings.startClass),
                    e
                      .getSlideItem(e.index)
                      .removeClass("lg-start-end-progress"),
                    e.$inner.empty(),
                    e.lgOpened && e.LGel.trigger(R, { instance: e }),
                    e.outer.get() && e.outer.get().blur(),
                    (e.lgOpened = !1);
                }, c + 100),
                c + 100
              );
            }),
            (t.prototype.initModules = function () {
              this.plugins.forEach(function (t) {
                try {
                  t.init();
                } catch (t) {
                  console.warn(
                    "lightGallery:- make sure lightGallery module is properly initiated"
                  );
                }
              });
            }),
            (t.prototype.destroyModules = function (t) {
              this.plugins.forEach(function (e) {
                try {
                  t ? e.destroy() : e.closeGallery && e.closeGallery();
                } catch (t) {
                  console.warn(
                    "lightGallery:- make sure lightGallery module is properly destroyed"
                  );
                }
              });
            }),
            (t.prototype.refresh = function (t) {
              this.settings.dynamic || this.invalidateItems(),
                (this.galleryItems = t || this.getItems()),
                this.updateControls(),
                this.openGalleryOnItemClick(),
                this.LGel.trigger(L);
            }),
            (t.prototype.updateControls = function () {
              this.addSlideVideoInfo(this.galleryItems),
                this.updateCounterTotal(),
                this.manageSingleSlideClassName();
            }),
            (t.prototype.destroy = function () {
              var t = this,
                e = this.closeGallery(!0);
              return (
                setTimeout(function () {
                  t.destroyModules(!0),
                    t.settings.dynamic || t.invalidateItems(),
                    h(window).off(".lg.global" + t.lgId),
                    t.LGel.off(".lg"),
                    t.$container.remove();
                }, e),
                e
              );
            }),
            t
          );
        })();
      const U = function (t, e) {
          return new j(t, e);
        },
        W = document.querySelectorAll("[data-gallery]");
      W.length &&
        W.forEach((t) => {
          U(t, {
            licenseKey: "7EC452A9-0CFD441C-BD984C7C-17C8456E",
            speed: 500,
          });
        });
      document.querySelector(".works__content"),
        document.querySelectorAll(".work-category__item-box"),
        document.querySelectorAll(".work-category__body");
      (window.FLS = !0),
        (function (t) {
          let e = new Image();
          (e.onload = e.onerror =
            function () {
              t(2 == e.height);
            }),
            (e.src =
              "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
        })(function (t) {
          let e = !0 === t ? "webp" : "no-webp";
          document.documentElement.classList.add(e);
        }),
        window.addEventListener("load", function () {
          setTimeout(function () {
            document.documentElement.classList.add("loaded");
          }, 0);
        }),
        (function () {
          let t = document.querySelector(".icon-menu"),
            i = document.querySelector(".mobile-menu");
          t &&
            t.addEventListener("click", function (t) {
              e &&
                (((t = 500) => {
                  document.documentElement.classList.contains("lock")
                    ? s(t)
                    : n(t);
                })(),
                i.classList.toggle("menu-open"),
                document.documentElement.classList.toggle("menu-open"));
            });
        })(),
        (function () {
          if (
            document.querySelectorAll("[data-fullscreen]").length &&
            t.any()
          ) {
            function t() {
              let t = 0.01 * window.innerHeight;
              document.documentElement.style.setProperty("--vh", `${t}px`);
            }
            window.addEventListener("resize", t), t();
          }
        })(),
        (function () {
          function t(t) {
            if ("click" === t.type) {
              const e = t.target;
              if (e.closest("[data-goto]")) {
                const i = e.closest("[data-goto]"),
                  s = i.dataset.goto ? i.dataset.goto : "",
                  n = !!i.hasAttribute("data-goto-header"),
                  o = i.dataset.gotoSpeed ? i.dataset.gotoSpeed : "400";
                l(s, n, o), t.preventDefault();
              }
            } else if ("watcherCallback" === t.type && t.detail) {
              const e = t.detail.entry,
                i = e.target;
              if ("navigator" === i.dataset.watch) {
                const t = i.id,
                  s =
                    (document.querySelector("[data-goto]._navigator-active"),
                    document.querySelector(`[data-goto="${t}"]`));
                e.isIntersecting
                  ? s && s.classList.add("_navigator-active")
                  : s && s.classList.remove("_navigator-active");
              }
            }
          }
          document.addEventListener("click", t),
            document.addEventListener("watcherCallback", t);
        })();
    })();
})();
