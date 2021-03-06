/*! For license information please see app.min.js.LICENSE.txt */
(() => {
  var t = {
      2: function (t, e, i) {
        var n, s;
        window.Element &&
          !Element.prototype.closest &&
          (Element.prototype.closest = function (t) {
            var e,
              i = (this.document || this.ownerDocument).querySelectorAll(t),
              n = this;
            do {
              for (e = i.length; 0 <= --e && i.item(e) !== n; );
            } while (e < 0 && (n = n.parentElement));
            return n;
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
                var n = new Date().getTime(),
                  s = Math.max(0, 16 - (n - t)),
                  o = window.setTimeout(function () {
                    e(n + s);
                  }, s);
                return (t = n + s), o;
              }),
              window.cancelAnimationFrame ||
                (window.cancelAnimationFrame = function (t) {
                  clearTimeout(t);
                });
          })(),
          (s =
            void 0 !== i.g
              ? i.g
              : "undefined" != typeof window
              ? window
              : this),
          (n = function () {
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
                n = function (t) {
                  "#" === t.charAt(0) && (t = t.substr(1));
                  for (
                    var e,
                      i = String(t),
                      n = i.length,
                      s = -1,
                      o = "",
                      r = i.charCodeAt(0);
                    ++s < n;

                  ) {
                    if (0 === (e = i.charCodeAt(s)))
                      throw new InvalidCharacterError(
                        "Invalid character: the input contains U+0000."
                      );
                    o +=
                      (1 <= e && e <= 31) ||
                      127 == e ||
                      (0 === s && 48 <= e && e <= 57) ||
                      (1 === s && 48 <= e && e <= 57 && 45 === r)
                        ? "\\" + e.toString(16) + " "
                        : 128 <= e ||
                          45 === e ||
                          95 === e ||
                          (48 <= e && e <= 57) ||
                          (65 <= e && e <= 90) ||
                          (97 <= e && e <= 122)
                        ? i.charAt(s)
                        : "\\" + i.charAt(s);
                  }
                  return "#" + o;
                },
                s = function () {
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
                r = function (e, i, n) {
                  0 === e && document.body.focus(),
                    n ||
                      (e.focus(),
                      document.activeElement !== e &&
                        (e.setAttribute("tabindex", "-1"),
                        e.focus(),
                        (e.style.outline = "none")),
                      t.scrollTo(0, i));
                },
                l = function (e, i, n, s) {
                  if (i.emitEvents && "function" == typeof t.CustomEvent) {
                    var o = new CustomEvent(e, {
                      bubbles: !0,
                      detail: { anchor: n, toggle: s },
                    });
                    document.dispatchEvent(o);
                  }
                };
              return function (a, d) {
                var c,
                  u,
                  g,
                  h,
                  m = {
                    cancelScroll: function (t) {
                      cancelAnimationFrame(h),
                        (h = null),
                        t || l("scrollCancel", c);
                    },
                    animateScroll: function (n, a, d) {
                      m.cancelScroll();
                      var u = i(c || e, d || {}),
                        p =
                          "[object Number]" ===
                          Object.prototype.toString.call(n),
                        f = p || !n.tagName ? null : n;
                      if (p || f) {
                        var v = t.pageYOffset;
                        u.header &&
                          !g &&
                          (g = document.querySelector(u.header));
                        var y,
                          b,
                          w,
                          I,
                          C,
                          S,
                          x,
                          E,
                          T = o(g),
                          _ = p
                            ? n
                            : (function (e, i, n, o) {
                                var r = 0;
                                if (e.offsetParent)
                                  for (
                                    ;
                                    (r += e.offsetTop), (e = e.offsetParent);

                                  );
                                return (
                                  (r = Math.max(r - i - n, 0)),
                                  o && (r = Math.min(r, s() - t.innerHeight)),
                                  r
                                );
                              })(
                                f,
                                T,
                                parseInt(
                                  "function" == typeof u.offset
                                    ? u.offset(n, a)
                                    : u.offset,
                                  10
                                ),
                                u.clip
                              ),
                          A = _ - v,
                          O = s(),
                          L = 0,
                          k =
                            ((y = A),
                            (w = (b = u).speedAsDuration
                              ? b.speed
                              : Math.abs((y / 1e3) * b.speed)),
                            b.durationMax && w > b.durationMax
                              ? b.durationMax
                              : b.durationMin && w < b.durationMin
                              ? b.durationMin
                              : parseInt(w, 10)),
                          M = function (e) {
                            var i, s, o;
                            I || (I = e),
                              (L += e - I),
                              (S =
                                v +
                                A *
                                  ((s = C =
                                    1 < (C = 0 === k ? 0 : L / k) ? 1 : C),
                                  "easeInQuad" === (i = u).easing &&
                                    (o = s * s),
                                  "easeOutQuad" === i.easing &&
                                    (o = s * (2 - s)),
                                  "easeInOutQuad" === i.easing &&
                                    (o =
                                      s < 0.5
                                        ? 2 * s * s
                                        : (4 - 2 * s) * s - 1),
                                  "easeInCubic" === i.easing && (o = s * s * s),
                                  "easeOutCubic" === i.easing &&
                                    (o = --s * s * s + 1),
                                  "easeInOutCubic" === i.easing &&
                                    (o =
                                      s < 0.5
                                        ? 4 * s * s * s
                                        : (s - 1) * (2 * s - 2) * (2 * s - 2) +
                                          1),
                                  "easeInQuart" === i.easing &&
                                    (o = s * s * s * s),
                                  "easeOutQuart" === i.easing &&
                                    (o = 1 - --s * s * s * s),
                                  "easeInOutQuart" === i.easing &&
                                    (o =
                                      s < 0.5
                                        ? 8 * s * s * s * s
                                        : 1 - 8 * --s * s * s * s),
                                  "easeInQuint" === i.easing &&
                                    (o = s * s * s * s * s),
                                  "easeOutQuint" === i.easing &&
                                    (o = 1 + --s * s * s * s * s),
                                  "easeInOutQuint" === i.easing &&
                                    (o =
                                      s < 0.5
                                        ? 16 * s * s * s * s * s
                                        : 1 + 16 * --s * s * s * s * s),
                                  i.customEasing && (o = i.customEasing(s)),
                                  o || s)),
                              t.scrollTo(0, Math.floor(S)),
                              (function (e, i) {
                                var s = t.pageYOffset;
                                if (
                                  e == i ||
                                  s == i ||
                                  (v < i && t.innerHeight + s) >= O
                                )
                                  return (
                                    m.cancelScroll(!0),
                                    r(n, i, p),
                                    l("scrollStop", u, n, a),
                                    !(h = I = null)
                                  );
                              })(S, _) ||
                                ((h = t.requestAnimationFrame(M)), (I = e));
                          };
                        0 === t.pageYOffset && t.scrollTo(0, 0),
                          (x = n),
                          (E = u),
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
                            ? r(n, Math.floor(_), !1)
                            : (l("scrollStart", u, n, a),
                              m.cancelScroll(!0),
                              t.requestAnimationFrame(M));
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
                      (u = e.target.closest(a)) &&
                      "a" === u.tagName.toLowerCase() &&
                      !e.target.closest(c.ignore) &&
                      u.hostname === t.location.hostname &&
                      u.pathname === t.location.pathname &&
                      /#/.test(u.href)
                    ) {
                      var i, s;
                      try {
                        i = n(decodeURIComponent(u.hash));
                      } catch (e) {
                        i = n(u.hash);
                      }
                      if ("#" === i) {
                        if (!c.topOnEmptyHash) return;
                        s = document.documentElement;
                      } else s = document.querySelector(i);
                      (s = s || "#top" !== i ? s : document.documentElement) &&
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
                        })(c),
                        m.animateScroll(s, u));
                    }
                  },
                  f = function (t) {
                    if (
                      null !== history.state &&
                      history.state.smoothScroll &&
                      history.state.smoothScroll === JSON.stringify(c)
                    ) {
                      var e = history.state.anchor;
                      ("string" == typeof e &&
                        e &&
                        !(e = document.querySelector(
                          n(history.state.anchor)
                        ))) ||
                        m.animateScroll(e, null, { updateURL: !1 });
                    }
                  };
                return (
                  (m.destroy = function () {
                    c &&
                      (document.removeEventListener("click", p, !1),
                      t.removeEventListener("popstate", f, !1),
                      m.cancelScroll(),
                      (h = g = u = c = null));
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
                      (c = i(e, d || {})),
                      (g = c.header ? document.querySelector(c.header) : null),
                      document.addEventListener("click", p, !1),
                      c.updateURL &&
                        c.popstate &&
                        t.addEventListener("popstate", f, !1);
                  })(),
                  m
                );
              };
            })(s);
          }.apply(e, [])),
          void 0 === n || (t.exports = n);
      },
      732: function (t) {
        t.exports = (function () {
          "use strict";
          function t() {
            return (
              (t =
                Object.assign ||
                function (t) {
                  for (var e = 1; e < arguments.length; e++) {
                    var i = arguments[e];
                    for (var n in i)
                      Object.prototype.hasOwnProperty.call(i, n) &&
                        (t[n] = i[n]);
                  }
                  return t;
                }),
              t.apply(this, arguments)
            );
          }
          var e = "undefined" != typeof window,
            i =
              (e && !("onscroll" in window)) ||
              ("undefined" != typeof navigator &&
                /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent)),
            n = e && "IntersectionObserver" in window,
            s = e && "classList" in document.createElement("p"),
            o = e && window.devicePixelRatio > 1,
            r = {
              elements_selector: ".lazy",
              container: i || e ? document : null,
              threshold: 300,
              thresholds: null,
              data_src: "src",
              data_srcset: "srcset",
              data_sizes: "sizes",
              data_bg: "bg",
              data_bg_hidpi: "bg-hidpi",
              data_bg_multi: "bg-multi",
              data_bg_multi_hidpi: "bg-multi-hidpi",
              data_poster: "poster",
              class_applied: "applied",
              class_loading: "loading",
              class_loaded: "loaded",
              class_error: "error",
              class_entered: "entered",
              class_exited: "exited",
              unobserve_completed: !0,
              unobserve_entered: !1,
              cancel_on_exit: !0,
              callback_enter: null,
              callback_exit: null,
              callback_applied: null,
              callback_loading: null,
              callback_loaded: null,
              callback_error: null,
              callback_finish: null,
              callback_cancel: null,
              use_native: !1,
            },
            l = function (e) {
              return t({}, r, e);
            },
            a = function (t, e) {
              var i,
                n = "LazyLoad::Initialized",
                s = new t(e);
              try {
                i = new CustomEvent(n, { detail: { instance: s } });
              } catch (t) {
                (i = document.createEvent("CustomEvent")).initCustomEvent(
                  n,
                  !1,
                  !1,
                  { instance: s }
                );
              }
              window.dispatchEvent(i);
            },
            d = "src",
            c = "srcset",
            u = "sizes",
            g = "poster",
            h = "llOriginalAttrs",
            m = "loading",
            p = "loaded",
            f = "applied",
            v = "error",
            y = "native",
            b = "data-",
            w = "ll-status",
            I = function (t, e) {
              return t.getAttribute(b + e);
            },
            C = function (t) {
              return I(t, w);
            },
            S = function (t, e) {
              return (function (t, e, i) {
                var n = "data-ll-status";
                null !== i ? t.setAttribute(n, i) : t.removeAttribute(n);
              })(t, 0, e);
            },
            x = function (t) {
              return S(t, null);
            },
            E = function (t) {
              return null === C(t);
            },
            T = function (t) {
              return C(t) === y;
            },
            _ = [m, p, f, v],
            A = function (t, e, i, n) {
              t &&
                (void 0 === n ? (void 0 === i ? t(e) : t(e, i)) : t(e, i, n));
            },
            O = function (t, e) {
              s
                ? t.classList.add(e)
                : (t.className += (t.className ? " " : "") + e);
            },
            L = function (t, e) {
              s
                ? t.classList.remove(e)
                : (t.className = t.className
                    .replace(new RegExp("(^|\\s+)" + e + "(\\s+|$)"), " ")
                    .replace(/^\s+/, "")
                    .replace(/\s+$/, ""));
            },
            k = function (t) {
              return t.llTempImage;
            },
            M = function (t, e) {
              if (e) {
                var i = e._observer;
                i && i.unobserve(t);
              }
            },
            D = function (t, e) {
              t && (t.loadingCount += e);
            },
            z = function (t, e) {
              t && (t.toLoadCount = e);
            },
            G = function (t) {
              for (var e, i = [], n = 0; (e = t.children[n]); n += 1)
                "SOURCE" === e.tagName && i.push(e);
              return i;
            },
            F = function (t, e) {
              var i = t.parentNode;
              i && "PICTURE" === i.tagName && G(i).forEach(e);
            },
            B = function (t, e) {
              G(t).forEach(e);
            },
            P = [d],
            H = [d, g],
            N = [d, c, u],
            q = function (t) {
              return !!t[h];
            },
            $ = function (t) {
              return t[h];
            },
            R = function (t) {
              return delete t[h];
            },
            V = function (t, e) {
              if (!q(t)) {
                var i = {};
                e.forEach(function (e) {
                  i[e] = t.getAttribute(e);
                }),
                  (t[h] = i);
              }
            },
            j = function (t, e) {
              if (q(t)) {
                var i = $(t);
                e.forEach(function (e) {
                  !(function (t, e, i) {
                    i ? t.setAttribute(e, i) : t.removeAttribute(e);
                  })(t, e, i[e]);
                });
              }
            },
            U = function (t, e, i) {
              O(t, e.class_loading),
                S(t, m),
                i && (D(i, 1), A(e.callback_loading, t, i));
            },
            Y = function (t, e, i) {
              i && t.setAttribute(e, i);
            },
            W = function (t, e) {
              Y(t, u, I(t, e.data_sizes)),
                Y(t, c, I(t, e.data_srcset)),
                Y(t, d, I(t, e.data_src));
            },
            X = {
              IMG: function (t, e) {
                F(t, function (t) {
                  V(t, N), W(t, e);
                }),
                  V(t, N),
                  W(t, e);
              },
              IFRAME: function (t, e) {
                V(t, P), Y(t, d, I(t, e.data_src));
              },
              VIDEO: function (t, e) {
                B(t, function (t) {
                  V(t, P), Y(t, d, I(t, e.data_src));
                }),
                  V(t, H),
                  Y(t, g, I(t, e.data_poster)),
                  Y(t, d, I(t, e.data_src)),
                  t.load();
              },
            },
            Q = ["IMG", "IFRAME", "VIDEO"],
            K = function (t, e) {
              !e ||
                (function (t) {
                  return t.loadingCount > 0;
                })(e) ||
                (function (t) {
                  return t.toLoadCount > 0;
                })(e) ||
                A(t.callback_finish, e);
            },
            J = function (t, e, i) {
              t.addEventListener(e, i), (t.llEvLisnrs[e] = i);
            },
            Z = function (t, e, i) {
              t.removeEventListener(e, i);
            },
            tt = function (t) {
              return !!t.llEvLisnrs;
            },
            et = function (t) {
              if (tt(t)) {
                var e = t.llEvLisnrs;
                for (var i in e) {
                  var n = e[i];
                  Z(t, i, n);
                }
                delete t.llEvLisnrs;
              }
            },
            it = function (t, e, i) {
              !(function (t) {
                delete t.llTempImage;
              })(t),
                D(i, -1),
                (function (t) {
                  t && (t.toLoadCount -= 1);
                })(i),
                L(t, e.class_loading),
                e.unobserve_completed && M(t, i);
            },
            nt = function (t, e, i) {
              var n = k(t) || t;
              tt(n) ||
                (function (t, e, i) {
                  tt(t) || (t.llEvLisnrs = {});
                  var n = "VIDEO" === t.tagName ? "loadeddata" : "load";
                  J(t, n, e), J(t, "error", i);
                })(
                  n,
                  function (s) {
                    !(function (t, e, i, n) {
                      var s = T(e);
                      it(e, i, n),
                        O(e, i.class_loaded),
                        S(e, p),
                        A(i.callback_loaded, e, n),
                        s || K(i, n);
                    })(0, t, e, i),
                      et(n);
                  },
                  function (s) {
                    !(function (t, e, i, n) {
                      var s = T(e);
                      it(e, i, n),
                        O(e, i.class_error),
                        S(e, v),
                        A(i.callback_error, e, n),
                        s || K(i, n);
                    })(0, t, e, i),
                      et(n);
                  }
                );
            },
            st = function (t, e, i) {
              !(function (t) {
                t.llTempImage = document.createElement("IMG");
              })(t),
                nt(t, e, i),
                (function (t) {
                  q(t) || (t[h] = { backgroundImage: t.style.backgroundImage });
                })(t),
                (function (t, e, i) {
                  var n = I(t, e.data_bg),
                    s = I(t, e.data_bg_hidpi),
                    r = o && s ? s : n;
                  r &&
                    ((t.style.backgroundImage = 'url("'.concat(r, '")')),
                    k(t).setAttribute(d, r),
                    U(t, e, i));
                })(t, e, i),
                (function (t, e, i) {
                  var n = I(t, e.data_bg_multi),
                    s = I(t, e.data_bg_multi_hidpi),
                    r = o && s ? s : n;
                  r &&
                    ((t.style.backgroundImage = r),
                    (function (t, e, i) {
                      O(t, e.class_applied),
                        S(t, f),
                        i &&
                          (e.unobserve_completed && M(t, e),
                          A(e.callback_applied, t, i));
                    })(t, e, i));
                })(t, e, i);
            },
            ot = function (t, e, i) {
              !(function (t) {
                return Q.indexOf(t.tagName) > -1;
              })(t)
                ? st(t, e, i)
                : (function (t, e, i) {
                    nt(t, e, i),
                      (function (t, e, i) {
                        var n = X[t.tagName];
                        n && (n(t, e), U(t, e, i));
                      })(t, e, i);
                  })(t, e, i);
            },
            rt = function (t) {
              t.removeAttribute(d), t.removeAttribute(c), t.removeAttribute(u);
            },
            lt = function (t) {
              F(t, function (t) {
                j(t, N);
              }),
                j(t, N);
            },
            at = {
              IMG: lt,
              IFRAME: function (t) {
                j(t, P);
              },
              VIDEO: function (t) {
                B(t, function (t) {
                  j(t, P);
                }),
                  j(t, H),
                  t.load();
              },
            },
            dt = function (t, e) {
              (function (t) {
                var e = at[t.tagName];
                e
                  ? e(t)
                  : (function (t) {
                      if (q(t)) {
                        var e = $(t);
                        t.style.backgroundImage = e.backgroundImage;
                      }
                    })(t);
              })(t),
                (function (t, e) {
                  E(t) ||
                    T(t) ||
                    (L(t, e.class_entered),
                    L(t, e.class_exited),
                    L(t, e.class_applied),
                    L(t, e.class_loading),
                    L(t, e.class_loaded),
                    L(t, e.class_error));
                })(t, e),
                x(t),
                R(t);
            },
            ct = ["IMG", "IFRAME", "VIDEO"],
            ut = function (t) {
              return t.use_native && "loading" in HTMLImageElement.prototype;
            },
            gt = function (t, e, i) {
              t.forEach(function (t) {
                return (function (t) {
                  return t.isIntersecting || t.intersectionRatio > 0;
                })(t)
                  ? (function (t, e, i, n) {
                      var s = (function (t) {
                        return _.indexOf(C(t)) >= 0;
                      })(t);
                      S(t, "entered"),
                        O(t, i.class_entered),
                        L(t, i.class_exited),
                        (function (t, e, i) {
                          e.unobserve_entered && M(t, i);
                        })(t, i, n),
                        A(i.callback_enter, t, e, n),
                        s || ot(t, i, n);
                    })(t.target, t, e, i)
                  : (function (t, e, i, n) {
                      E(t) ||
                        (O(t, i.class_exited),
                        (function (t, e, i, n) {
                          i.cancel_on_exit &&
                            (function (t) {
                              return C(t) === m;
                            })(t) &&
                            "IMG" === t.tagName &&
                            (et(t),
                            (function (t) {
                              F(t, function (t) {
                                rt(t);
                              }),
                                rt(t);
                            })(t),
                            lt(t),
                            L(t, i.class_loading),
                            D(n, -1),
                            x(t),
                            A(i.callback_cancel, t, e, n));
                        })(t, e, i, n),
                        A(i.callback_exit, t, e, n));
                    })(t.target, t, e, i);
              });
            },
            ht = function (t) {
              return Array.prototype.slice.call(t);
            },
            mt = function (t) {
              return t.container.querySelectorAll(t.elements_selector);
            },
            pt = function (t) {
              return (function (t) {
                return C(t) === v;
              })(t);
            },
            ft = function (t, e) {
              return (function (t) {
                return ht(t).filter(E);
              })(t || mt(e));
            },
            vt = function (t, i) {
              var s = l(t);
              (this._settings = s),
                (this.loadingCount = 0),
                (function (t, e) {
                  n &&
                    !ut(t) &&
                    (e._observer = new IntersectionObserver(
                      function (i) {
                        gt(i, t, e);
                      },
                      (function (t) {
                        return {
                          root: t.container === document ? null : t.container,
                          rootMargin: t.thresholds || t.threshold + "px",
                        };
                      })(t)
                    ));
                })(s, this),
                (function (t, i) {
                  e &&
                    window.addEventListener("online", function () {
                      !(function (t, e) {
                        var i;
                        ((i = mt(t)), ht(i).filter(pt)).forEach(function (e) {
                          L(e, t.class_error), x(e);
                        }),
                          e.update();
                      })(t, i);
                    });
                })(s, this),
                this.update(i);
            };
          return (
            (vt.prototype = {
              update: function (t) {
                var e,
                  s,
                  o = this._settings,
                  r = ft(t, o);
                z(this, r.length),
                  !i && n
                    ? ut(o)
                      ? (function (t, e, i) {
                          t.forEach(function (t) {
                            -1 !== ct.indexOf(t.tagName) &&
                              (function (t, e, i) {
                                t.setAttribute("loading", "lazy"),
                                  nt(t, e, i),
                                  (function (t, e) {
                                    var i = X[t.tagName];
                                    i && i(t, e);
                                  })(t, e),
                                  S(t, y);
                              })(t, e, i);
                          }),
                            z(i, 0);
                        })(r, o, this)
                      : ((s = r),
                        (function (t) {
                          t.disconnect();
                        })((e = this._observer)),
                        (function (t, e) {
                          e.forEach(function (e) {
                            t.observe(e);
                          });
                        })(e, s))
                    : this.loadAll(r);
              },
              destroy: function () {
                this._observer && this._observer.disconnect(),
                  mt(this._settings).forEach(function (t) {
                    R(t);
                  }),
                  delete this._observer,
                  delete this._settings,
                  delete this.loadingCount,
                  delete this.toLoadCount;
              },
              loadAll: function (t) {
                var e = this,
                  i = this._settings;
                ft(t, i).forEach(function (t) {
                  M(t, e), ot(t, i, e);
                });
              },
              restoreAll: function () {
                var t = this._settings;
                mt(t).forEach(function (e) {
                  dt(e, t);
                });
              },
            }),
            (vt.load = function (t, e) {
              var i = l(e);
              ot(t, i);
            }),
            (vt.resetStatus = function (t) {
              x(t);
            }),
            e &&
              (function (t, e) {
                if (e)
                  if (e.length) for (var i, n = 0; (i = e[n]); n += 1) a(t, i);
                  else a(t, e);
              })(vt, window.lazyLoadOptions),
            vt
          );
        })();
      },
    },
    e = {};
  function i(n) {
    var s = e[n];
    if (void 0 !== s) return s.exports;
    var o = (e[n] = { exports: {} });
    return t[n].call(o.exports, o, o.exports, i), o.exports;
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
        n = (t = 500) => {
          let i = document.querySelector("body");
          if (e) {
            let n = document.querySelectorAll("[data-lp]");
            setTimeout(() => {
              for (let t = 0; t < n.length; t++) {
                n[t].style.paddingRight = "0px";
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
        s = (t = 500) => {
          document.querySelector("body");
          if (e) {
            let i = document.querySelectorAll("[data-lp]");
            for (let t = 0; t < i.length; t++) {
              i[t].style.paddingRight =
                window.innerWidth -
                document.querySelector(".wrapper").offsetWidth +
                "px";
            }
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
      let l = (t, e = !1, i = 300, s = 0) => {
        const l = document.querySelector(t);
        if (l) {
          let a = "",
            d = 0;
          e &&
            ((a = "header.header"),
            (d = document.querySelector(a).offsetHeight));
          let c = {
            speedAsDuration: !0,
            speed: i,
            header: a,
            offset: s,
            easing: "easeOutQuad",
          };
          if (
            (document.documentElement.classList.contains("menu-open") &&
              (n(), document.documentElement.classList.remove("menu-open")),
            void 0 !== r)
          )
            new r().animateScroll(l, "", c);
          else {
            let t = l.getBoundingClientRect().top + scrollY;
            window.scrollTo({ top: d ? t - d : t, behavior: "smooth" });
          }
          o(`[gotoBlock]: ????????...???????? ?? ${t}`);
        } else o(`[gotoBlock]: ???? ????..???????????? ?????????? ?????? ???? ????????????????: ${t}`);
      };
      new (i(732))({
        elements_selector: "[data-src]",
        class_loaded: "_lazy-loaded",
        use_native: !0,
      }).update();
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
              for (var e, i = 1, n = arguments.length; i < n; i++)
                for (var s in (e = arguments[i]))
                  Object.prototype.hasOwnProperty.call(e, s) && (t[s] = e[s]);
              return t;
            }),
          d.apply(this, arguments)
        );
      };
      var c = (function () {
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
            var n = e.replace(/-([a-z])/gi, function (t, e) {
              return e.toUpperCase();
            });
            -1 !== this.cssVenderPrefixes.indexOf(n)
              ? ((t.style[n.charAt(0).toLowerCase() + n.slice(1)] = i),
                (t.style["webkit" + n] = i),
                (t.style["moz" + n] = i),
                (t.style["ms" + n] = i),
                (t.style["o" + n] = i))
              : (t.style[n] = i);
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
            return u(this._getSelector(t, this.selector));
          }),
          (t.prototype.first = function () {
            return this.selector && void 0 !== this.selector.length
              ? u(this.selector[0])
              : u(this.selector);
          }),
          (t.prototype.eq = function (t) {
            return u(this.selector[t]);
          }),
          (t.prototype.parent = function () {
            return u(this.selector.parentElement);
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
              this._each(function (n) {
                i._setCssVendorPrefix(n, t, e);
              }),
              this
            );
          }),
          (t.prototype.on = function (e, i) {
            var n = this;
            return this.selector
              ? (e.split(" ").forEach(function (e) {
                  Array.isArray(t.eventListeners[e]) ||
                    (t.eventListeners[e] = []),
                    t.eventListeners[e].push(i),
                    n.selector.addEventListener(e.split(".")[0], i);
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
              ? (Object.keys(t.eventListeners).forEach(function (n) {
                  i.isEventMatched(e, n) &&
                    (t.eventListeners[n].forEach(function (t) {
                      i.selector.removeEventListener(n.split(".")[0], t);
                    }),
                    (t.eventListeners[n] = []));
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
              e = u("body").style().marginLeft;
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
      function u(t) {
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
          new c(t)
        );
      }
      var g = [
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
      function h(t) {
        return "href" === t
          ? "src"
          : (t = (t =
              (t = t.replace("data-", "")).charAt(0).toLowerCase() +
              t.slice(1)).replace(/-([a-z])/g, function (t) {
              return t[1].toUpperCase();
            }));
      }
      var m = function (t, e, i, n) {
          void 0 === i && (i = 0);
          var s = u(t).attr("data-lg-size") || n;
          if (s) {
            var o = s.split(",");
            if (o[1])
              for (var r = window.innerWidth, l = 0; l < o.length; l++) {
                var a = o[l];
                if (parseInt(a.split("-")[2], 10) > r) {
                  s = a;
                  break;
                }
                l === o.length - 1 && (s = a);
              }
            var d = s.split("-"),
              c = parseInt(d[0], 10),
              g = parseInt(d[1], 10),
              h = e.width(),
              m = e.height() - i,
              p = Math.min(h, c),
              f = Math.min(m, g),
              v = Math.min(p / c, f / g);
            return { width: c * v, height: g * v };
          }
        },
        p = function (t, e, i, n, s) {
          if (s) {
            var o = u(t).find("img").first();
            if (o.get()) {
              var r = e.get().getBoundingClientRect(),
                l = r.width,
                a = e.height() - (i + n),
                d = o.width(),
                c = o.height(),
                g = o.style(),
                h =
                  (l - d) / 2 -
                  o.offset().left +
                  (parseFloat(g.paddingLeft) || 0) +
                  (parseFloat(g.borderLeft) || 0) +
                  u(window).scrollLeft() +
                  r.left,
                m =
                  (a - c) / 2 -
                  o.offset().top +
                  (parseFloat(g.paddingTop) || 0) +
                  (parseFloat(g.borderTop) || 0) +
                  u(window).scrollTop() +
                  i;
              return (
                "translate3d(" +
                (h *= -1) +
                "px, " +
                (m *= -1) +
                "px, 0) scale3d(" +
                d / s.width +
                ", " +
                c / s.height +
                ", 1)"
              );
            }
          }
        },
        f = function (t, e, i, n, s, o) {
          return (
            '<div class="lg-video-cont lg-has-iframe" style="width:' +
            t +
            "; max-width:" +
            i +
            "; height: " +
            e +
            "; max-height:" +
            n +
            '">\n                    <iframe class="lg-object" frameborder="0" ' +
            (o ? 'title="' + o + '"' : "") +
            ' src="' +
            s +
            '"  allowfullscreen="true"></iframe>\n                </div>'
          );
        },
        v = function (t, e, i, n, s, o) {
          var r =
              "<img " +
              i +
              " " +
              (n ? 'srcset="' + n + '"' : "") +
              "  " +
              (s ? 'sizes="' + s + '"' : "") +
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
          for (var e = [], i = [], n = "", s = 0; s < t.length; s++) {
            var o = t[s].split(" ");
            "" === o[0] && o.splice(0, 1), i.push(o[0]), e.push(o[1]);
          }
          for (var r = window.innerWidth, l = 0; l < e.length; l++)
            if (parseInt(e[l], 10) > r) {
              n = i[l];
              break;
            }
          return n;
        },
        b = function (t) {
          return !!t && !!t.complete && 0 !== t.naturalWidth;
        },
        w = function (t, e, i, n) {
          return (
            '<div class="lg-video-cont ' +
            (n && n.youtube
              ? "lg-has-youtube"
              : n && n.vimeo
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
        I = function (t, e, i, n) {
          var s = [],
            o = (function () {
              for (var t = 0, e = 0, i = arguments.length; e < i; e++)
                t += arguments[e].length;
              var n = Array(t),
                s = 0;
              for (e = 0; e < i; e++)
                for (var o = arguments[e], r = 0, l = o.length; r < l; r++, s++)
                  n[s] = o[r];
              return n;
            })(g, e);
          return (
            [].forEach.call(t, function (t) {
              for (var e = {}, r = 0; r < t.attributes.length; r++) {
                var l = t.attributes[r];
                if (l.specified) {
                  var a = h(l.name),
                    d = "";
                  o.indexOf(a) > -1 && (d = a), d && (e[d] = l.value);
                }
              }
              var c = u(t),
                g = c.find("img").first().attr("alt"),
                m = c.attr("title"),
                p = n ? c.attr(n) : c.find("img").first().attr("src");
              (e.thumb = p),
                i && !e.subHtml && (e.subHtml = m || g || ""),
                (e.alt = g || m || ""),
                s.push(e);
            }),
            s
          );
        },
        C = function () {
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
          var n = t.match(
              /\/\/(?:www\.)?youtu(?:\.be|be\.com|be-nocookie\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)([\&|?][\S]*)*/i
            ),
            s = t.match(
              /\/\/(?:www\.)?(?:player\.)?vimeo.com\/(?:video\/)?([0-9a-z\-_]+)(.*)?/i
            ),
            o = t.match(
              /https?:\/\/(.+)?(wistia\.com|wi\.st)\/(medias|embed)\/([0-9a-z\-_]+)(.*)/
            );
          return n
            ? { youtube: n }
            : s
            ? { vimeo: s }
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
        _ = "lgHasVideo",
        A = "lgContainerResize",
        O = "lgUpdateSlides",
        L = "lgAfterAppendSubHtml",
        k = "lgBeforeOpen",
        M = "lgAfterOpen",
        D = "lgSlideItemLoad",
        z = "lgBeforeSlide",
        G = "lgAfterSlide",
        F = "lgPosterClick",
        B = "lgDragStart",
        P = "lgDragMove",
        H = "lgDragEnd",
        N = "lgBeforeNextSlide",
        q = "lgBeforePrevSlide",
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
              (this.LGel = u(t)),
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
                  : C())
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
                    var n = i.items[e],
                      s = u(n),
                      o = c.generateUUID();
                    s.attr("data-lg-id", o).on(
                      "click.lgcustom-item-" + o,
                      function (i) {
                        i.preventDefault();
                        var s = t.settings.index || e;
                        t.openGallery(s, n);
                      }
                    );
                  },
                  i = this,
                  n = 0;
                n < this.items.length;
                n++
              )
                e(n);
            }),
            (t.prototype.buildModules = function () {
              var t = this;
              this.settings.plugins.forEach(function (e) {
                t.plugins.push(new e(t, u));
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
              return u(this.getSlideItemId(t));
            }),
            (t.prototype.getSlideItemId = function (t) {
              return "#lg-item-" + this.lgId + "-" + t;
            }),
            (t.prototype.getIdName = function (t) {
              return t + "-" + this.lgId;
            }),
            (t.prototype.getElementById = function (t) {
              return u("#" + this.getIdName(t));
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
                var n = "";
                this.settings.allowMediaOverlap && (n += "lg-media-overlap ");
                var s = this.settings.ariaLabelledby
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
                    s +
                    " " +
                    o +
                    ' role="dialog"\n        >\n            <div id="' +
                    this.getIdName("lg-backdrop") +
                    '" class="lg-backdrop"></div>\n\n            <div id="' +
                    this.getIdName("lg-outer") +
                    '" class="lg-outer lg-use-css3 lg-css3 lg-hide-items ' +
                    n +
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
                u(this.settings.container)
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
                var c = this.settings.mode + " ";
                this.manageSingleSlideClassName(),
                  this.settings.enableDrag && (c += "lg-grab "),
                  this.outer.addClass(c),
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
                  u(window).on(
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
                  n = e.bottom;
                if (
                  ((this.currentImageSize = m(
                    this.items[this.index],
                    this.outer,
                    i + n,
                    t && this.settings.videoMaxSize
                  )),
                  t && this.resizeVideoSlide(this.index, this.currentImageSize),
                  this.zoomFromOrigin && !this.isDummyImageRemoved)
                ) {
                  var s = this.getDummyImgStyles(this.currentImageSize);
                  this.outer
                    .find(".lg-current .lg-dummy-img")
                    .first()
                    .attr("style", s);
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
                var n = 0;
                this.galleryItems.some(function (t, e) {
                  return t.src === i && ((n = e), !0);
                }),
                  (this.currentItemsInDom = this.organizeSlideItems(n, -1)),
                  this.loadContent(n, !0),
                  this.getSlideItem(n).addClass("lg-current"),
                  (this.index = n),
                  this.updateCurrentCounter(n),
                  this.LGel.trigger(O);
              } else this.closeGallery();
            }),
            (t.prototype.getItems = function () {
              if (((this.items = []), this.settings.dynamic))
                return this.settings.dynamicEl || [];
              if ("this" === this.settings.selector) this.items.push(this.el);
              else if (this.settings.selector)
                if ("string" == typeof this.settings.selector)
                  if (this.settings.selectWithin) {
                    var t = u(this.settings.selectWithin);
                    this.items = t.find(this.settings.selector).get();
                  } else
                    this.items = this.el.querySelectorAll(
                      this.settings.selector
                    );
                else this.items = this.settings.selector;
              else this.items = this.el.children;
              return I(
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
                var n = this.getItemsToBeInsertedToDom(t, t);
                this.currentItemsInDom = n;
                var s = "";
                n.forEach(function (t) {
                  s = s + '<div id="' + t + '" class="lg-item"></div>';
                }),
                  this.$inner.append(s),
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
                var c = this.settings.zoomFromOrigin
                  ? 100
                  : this.settings.backdropDuration;
                setTimeout(function () {
                  i.outer.addClass("lg-components-open");
                }, c),
                  (this.index = t),
                  this.LGel.trigger(k),
                  this.getSlideItem(t).addClass("lg-current"),
                  (this.lGalleryOn = !1),
                  (this.prevScrollTop = u(window).scrollTop()),
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
                      i.LGel.trigger(M);
                  }),
                  document.body === this.settings.container &&
                    u("html").addClass("lg-on");
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
                n = this.outer.find(".lg-thumb-outer").get();
              return { top: t, bottom: (n ? n.clientHeight : 0) + i };
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
                  var n = e.substring(0, 1);
                  ("." !== n && "#" !== n) ||
                    (e =
                      this.settings.subHtmlSelectorRelative &&
                      !this.settings.dynamic
                        ? u(this.items).eq(t).find(e).first().html()
                        : u(e).first().html());
                } else e = "";
              if (".lg-item" !== this.settings.appendSubHtmlTo)
                i
                  ? this.outer.find(".lg-sub-html").load(i)
                  : this.outer.find(".lg-sub-html").html(e);
              else {
                var s = u(this.getSlideItemId(t));
                i
                  ? s.load(i)
                  : s.append('<div class="lg-sub-html">' + e + "</div>");
              }
              null != e &&
                ("" === e
                  ? this.outer
                      .find(this.settings.appendSubHtmlTo)
                      .addClass("lg-empty-html")
                  : this.outer
                      .find(this.settings.appendSubHtmlTo)
                      .removeClass("lg-empty-html")),
                this.LGel.trigger(L, { index: t });
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
              var n;
              if ((this.settings.dynamic || (n = u(this.items).eq(e)), n)) {
                var s = void 0;
                if (
                  !(s = this.settings.exThumbImage
                    ? n.attr(this.settings.exThumbImage)
                    : n.find("img").first().attr("src"))
                )
                  return "";
                var o =
                  "<img " +
                  i +
                  ' style="' +
                  this.getDummyImgStyles(this.currentImageSize) +
                  '" class="lg-dummy-img" src="' +
                  s +
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
              var n = this.galleryItems[i],
                s = n.alt,
                o = n.srcset,
                r = n.sizes,
                l = n.sources,
                a = s ? 'alt="' + s + '"' : "",
                d =
                  '<picture class="lg-img-wrap"> ' +
                  (this.isFirstSlideWithZoomAnimation()
                    ? this.getDummyImageContent(e, i, a)
                    : v(i, t, a, o, r, l)) +
                  "</picture>";
              e.prepend(d);
            }),
            (t.prototype.onSlideObjectLoad = function (t, e, i, n) {
              var s = t.find(".lg-object").first();
              b(s.get()) || e
                ? i()
                : (s.on("load.lg error.lg", function () {
                    i && i();
                  }),
                  s.on("error.lg", function () {
                    n && n();
                  }));
            }),
            (t.prototype.onLgObjectLoad = function (t, e, i, n, s, o) {
              var r = this;
              this.onSlideObjectLoad(
                t,
                o,
                function () {
                  r.triggerSlideItemLoad(t, e, i, n, s);
                },
                function () {
                  t.addClass("lg-complete lg-complete_"),
                    t.html(
                      '<span class="lg-error-msg">Oops... Failed to load content...</span>'
                    );
                }
              );
            }),
            (t.prototype.triggerSlideItemLoad = function (t, e, i, n, s) {
              var o = this,
                r = this.galleryItems[e],
                l = s && "video" === this.getSlideType(r) && !r.poster ? n : 0;
              setTimeout(function () {
                t.addClass("lg-complete lg-complete_"),
                  o.LGel.trigger(D, {
                    index: e,
                    delay: i || 0,
                    isFirstSlide: s,
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
                n = this.galleryItems[t],
                s = u(this.getSlideItemId(t)),
                o = n.poster,
                r = n.srcset,
                l = n.sizes,
                a = n.sources,
                d = n.src,
                c = n.video,
                g = c && "string" == typeof c ? JSON.parse(c) : c;
              if (n.responsive) {
                var h = n.responsive.split(",");
                d = y(h) || d;
              }
              var p = n.__slideVideoInfo,
                b = "",
                I = !!n.iframe,
                C = !this.lGalleryOn,
                S = 0;
              if (
                (C &&
                  (S =
                    this.zoomFromOrigin && this.currentImageSize
                      ? this.settings.startAnimationDuration + 10
                      : this.settings.backdropDuration + 10),
                !s.hasClass("lg-loaded"))
              ) {
                if (p) {
                  var x = this.mediaContainerPosition,
                    T = x.top,
                    A = x.bottom,
                    O = m(
                      this.items[t],
                      this.outer,
                      T + A,
                      p && this.settings.videoMaxSize
                    );
                  b = this.getVideoContStyle(O);
                }
                if (I) {
                  var L = f(
                    this.settings.iframeWidth,
                    this.settings.iframeHeight,
                    this.settings.iframeMaxWidth,
                    this.settings.iframeMaxHeight,
                    d,
                    n.iframeTitle
                  );
                  s.prepend(L);
                } else if (o) {
                  var k = "";
                  C &&
                    this.zoomFromOrigin &&
                    this.currentImageSize &&
                    (k = this.getDummyImageContent(s, t, ""));
                  L = w(o, k || "", b, p);
                  s.prepend(L);
                } else if (p) {
                  L = '<div class="lg-video-cont " style="' + b + '"></div>';
                  s.prepend(L);
                } else if ((this.setImgMarkup(d, s, t), r || a)) {
                  var M = s.find(".lg-object");
                  this.initPictureFill(M);
                }
                (o || p) &&
                  this.LGel.trigger(_, {
                    index: t,
                    src: d,
                    html5Video: g,
                    hasPoster: !!o,
                  }),
                  this.LGel.trigger(E, { index: t }),
                  this.lGalleryOn &&
                    ".lg-item" === this.settings.appendSubHtmlTo &&
                    this.addHtml(t);
              }
              var D = 0;
              S && !u(document.body).hasClass("lg-from-hash") && (D = S),
                this.isFirstSlideWithZoomAnimation() &&
                  (setTimeout(function () {
                    s.removeClass(
                      "lg-start-end-progress lg-start-progress"
                    ).removeAttr("style");
                  }, this.settings.startAnimationDuration + 100),
                  s.hasClass("lg-loaded") ||
                    setTimeout(function () {
                      if (
                        "image" === i.getSlideType(n) &&
                        (s
                          .find(".lg-img-wrap")
                          .append(v(t, d, "", r, l, n.sources)),
                        r || a)
                      ) {
                        var e = s.find(".lg-object");
                        i.initPictureFill(e);
                      }
                      ("image" === i.getSlideType(n) ||
                        ("video" === i.getSlideType(n) && o)) &&
                        (i.onLgObjectLoad(s, t, S, D, !0, !1),
                        i.onSlideObjectLoad(
                          s,
                          !(!p || !p.html5 || o),
                          function () {
                            i.loadContentOnFirstSlideLoad(t, s, D);
                          },
                          function () {
                            i.loadContentOnFirstSlideLoad(t, s, D);
                          }
                        ));
                    }, this.settings.startAnimationDuration + 100)),
                s.addClass("lg-loaded"),
                (this.isFirstSlideWithZoomAnimation() &&
                  ("video" !== this.getSlideType(n) || o)) ||
                  this.onLgObjectLoad(s, t, S, D, C, !(!p || !p.html5 || o)),
                (this.zoomFromOrigin && this.currentImageSize) ||
                  !s.hasClass("lg-complete_") ||
                  this.lGalleryOn ||
                  setTimeout(function () {
                    s.addClass("lg-complete");
                  }, this.settings.backdropDuration),
                (this.lGalleryOn = !0),
                !0 === e &&
                  (s.hasClass("lg-complete_")
                    ? this.preload(t)
                    : s
                        .find(".lg-object")
                        .first()
                        .on("load.lg error.lg", function () {
                          i.preload(t);
                        }));
            }),
            (t.prototype.loadContentOnFirstSlideLoad = function (t, e, i) {
              var n = this;
              setTimeout(function () {
                e.find(".lg-dummy-img").remove(),
                  e.removeClass("lg-first-slide"),
                  n.outer.removeClass("lg-first-slide-loading"),
                  (n.isDummyImageRemoved = !0),
                  n.preload(t);
              }, i + 300);
            }),
            (t.prototype.getItemsToBeInsertedToDom = function (t, e, i) {
              var n = this;
              void 0 === i && (i = 0);
              var s = [],
                o = Math.max(i, 3);
              o = Math.min(o, this.galleryItems.length);
              var r = "lg-item-" + this.lgId + "-" + e;
              if (this.galleryItems.length <= 3)
                return (
                  this.galleryItems.forEach(function (t, e) {
                    s.push("lg-item-" + n.lgId + "-" + e);
                  }),
                  s
                );
              if (t < (this.galleryItems.length - 1) / 2) {
                for (var l = t; l > t - o / 2 && l >= 0; l--)
                  s.push("lg-item-" + this.lgId + "-" + l);
                var a = s.length;
                for (l = 0; l < o - a; l++)
                  s.push("lg-item-" + this.lgId + "-" + (t + l + 1));
              } else {
                for (
                  l = t;
                  l <= this.galleryItems.length - 1 && l < t + o / 2;
                  l++
                )
                  s.push("lg-item-" + this.lgId + "-" + l);
                for (a = s.length, l = 0; l < o - a; l++)
                  s.push("lg-item-" + this.lgId + "-" + (t - l - 1));
              }
              return (
                this.settings.loop &&
                  (t === this.galleryItems.length - 1
                    ? s.push("lg-item-" + this.lgId + "-0")
                    : 0 === t &&
                      s.push(
                        "lg-item-" +
                          this.lgId +
                          "-" +
                          (this.galleryItems.length - 1)
                      )),
                -1 === s.indexOf(r) && s.push("lg-item-" + this.lgId + "-" + e),
                s
              );
            }),
            (t.prototype.organizeSlideItems = function (t, e) {
              var i = this,
                n = this.getItemsToBeInsertedToDom(
                  t,
                  e,
                  this.settings.numberOfSlideItemsInDom
                );
              return (
                n.forEach(function (t) {
                  -1 === i.currentItemsInDom.indexOf(t) &&
                    i.$inner.append(
                      '<div id="' + t + '" class="lg-item"></div>'
                    );
                }),
                this.currentItemsInDom.forEach(function (t) {
                  -1 === n.indexOf(t) && u("#" + t).remove();
                }),
                n
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
              var n = this;
              this.lGalleryOn && i.addClass("lg-slide-progress"),
                setTimeout(
                  function () {
                    n.outer.addClass("lg-no-trans"),
                      n.outer
                        .find(".lg-item")
                        .removeClass("lg-prev-slide lg-next-slide"),
                      "prev" === t
                        ? (e.addClass("lg-prev-slide"),
                          i.addClass("lg-next-slide"))
                        : (e.addClass("lg-next-slide"),
                          i.addClass("lg-prev-slide")),
                      setTimeout(function () {
                        n.outer.find(".lg-item").removeClass("lg-current"),
                          e.addClass("lg-current"),
                          n.outer.removeClass("lg-no-trans");
                      }, 50);
                  },
                  this.lGalleryOn ? this.settings.slideDelay : 0
                );
            }),
            (t.prototype.slide = function (t, e, i, n) {
              var s = this,
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
                    c = d.__slideVideoInfo;
                  if (
                    (this.outer.attr(
                      "data-lg-slide-type",
                      this.getSlideType(d)
                    ),
                    this.setDownloadValue(t),
                    c)
                  ) {
                    var u = this.mediaContainerPosition,
                      g = u.top,
                      h = u.bottom,
                      p = m(
                        this.items[t],
                        this.outer,
                        g + h,
                        c && this.settings.videoMaxSize
                      );
                    this.resizeVideoSlide(t, p);
                  }
                  if (
                    (this.LGel.trigger(z, {
                      prevIndex: o,
                      index: t,
                      fromTouch: !!e,
                      fromThumb: !!i,
                    }),
                    (this.lgBusy = !0),
                    clearTimeout(this.hideBarTimeout),
                    this.arrowDisable(t),
                    n || (t < o ? (n = "prev") : t > o && (n = "next")),
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
                      "prev" === n
                        ? this.getSlideItem(v).addClass("lg-next-slide")
                        : this.getSlideItem(f).addClass("lg-prev-slide"),
                      l.addClass("lg-current");
                  } else this.makeSlideAnimation(n, l, a);
                  this.lGalleryOn
                    ? setTimeout(function () {
                        s.loadContent(t, !0),
                          ".lg-item" !== s.settings.appendSubHtmlTo &&
                            s.addHtml(t);
                      }, this.settings.speed +
                        50 +
                        (e ? 0 : this.settings.slideDelay))
                    : this.loadContent(t, !0),
                    setTimeout(function () {
                      (s.lgBusy = !1),
                        a.removeClass("lg-slide-progress"),
                        s.LGel.trigger(G, {
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
              var n = e.pageX - t.pageX,
                s = e.pageY - t.pageY,
                o = !1;
              if (
                (this.swipeDirection
                  ? (o = !0)
                  : Math.abs(n) > 15
                  ? ((this.swipeDirection = "horizontal"), (o = !0))
                  : Math.abs(s) > 15 &&
                    ((this.swipeDirection = "vertical"), (o = !0)),
                o)
              ) {
                var r = this.getSlideItem(this.index);
                if ("horizontal" === this.swipeDirection) {
                  null == i || i.preventDefault(),
                    this.outer.addClass("lg-dragging"),
                    this.setTranslate(r, n, 0);
                  var l = r.get().offsetWidth,
                    a = (15 * l) / 100 - Math.abs((10 * n) / 100);
                  this.setTranslate(
                    this.outer.find(".lg-prev-slide").first(),
                    -l + n - a,
                    0
                  ),
                    this.setTranslate(
                      this.outer.find(".lg-next-slide").first(),
                      l + n + a,
                      0
                    );
                } else if (
                  "vertical" === this.swipeDirection &&
                  this.settings.swipeToClose
                ) {
                  null == i || i.preventDefault(),
                    this.$container.addClass("lg-dragging-vertical");
                  var d = 1 - Math.abs(s) / window.innerHeight;
                  this.$backdrop.css("opacity", d);
                  var c = 1 - Math.abs(s) / (2 * window.innerWidth);
                  this.setTranslate(r, 0, s, c, c),
                    Math.abs(s) > 100 &&
                      this.outer
                        .addClass("lg-hide-items")
                        .removeClass("lg-components-open");
                }
              }
            }),
            (t.prototype.touchEnd = function (t, e, i) {
              var n,
                s = this;
              "lg-slide" !== this.settings.mode &&
                this.outer.addClass("lg-slide"),
                setTimeout(function () {
                  s.$container.removeClass("lg-dragging-vertical"),
                    s.outer
                      .removeClass("lg-dragging lg-hide-items")
                      .addClass("lg-components-open");
                  var o = !0;
                  if ("horizontal" === s.swipeDirection) {
                    n = t.pageX - e.pageX;
                    var r = Math.abs(t.pageX - e.pageX);
                    n < 0 && r > s.settings.swipeThreshold
                      ? (s.goToNextSlide(!0), (o = !1))
                      : n > 0 &&
                        r > s.settings.swipeThreshold &&
                        (s.goToPrevSlide(!0), (o = !1));
                  } else if ("vertical" === s.swipeDirection) {
                    if (
                      ((n = Math.abs(t.pageY - e.pageY)),
                      s.settings.closable && s.settings.swipeToClose && n > 100)
                    )
                      return void s.closeGallery();
                    s.$backdrop.css("opacity", 1);
                  }
                  if (
                    (s.outer.find(".lg-item").removeAttr("style"),
                    o && Math.abs(t.pageX - e.pageX) < 5)
                  ) {
                    var l = u(i.target);
                    s.isPosterElement(l) && s.LGel.trigger(F);
                  }
                  s.swipeDirection = void 0;
                }),
                setTimeout(function () {
                  s.outer.hasClass("lg-dragging") ||
                    "lg-slide" === s.settings.mode ||
                    s.outer.removeClass("lg-slide");
                }, this.settings.speed + 100);
            }),
            (t.prototype.enableSwipe = function () {
              var t = this,
                e = {},
                i = {},
                n = !1,
                s = !1;
              this.settings.enableSwipe &&
                (this.$inner.on("touchstart.lg", function (i) {
                  t.dragOrSwipeEnabled = !0;
                  var n = t.getSlideItem(t.index);
                  (!u(i.target).hasClass("lg-item") &&
                    !n.get().contains(i.target)) ||
                    t.outer.hasClass("lg-zoomed") ||
                    t.lgBusy ||
                    1 !== i.targetTouches.length ||
                    ((s = !0),
                    (t.touchAction = "swipe"),
                    t.manageSwipeClass(),
                    (e = {
                      pageX: i.targetTouches[0].pageX,
                      pageY: i.targetTouches[0].pageY,
                    }));
                }),
                this.$inner.on("touchmove.lg", function (o) {
                  s &&
                    "swipe" === t.touchAction &&
                    1 === o.targetTouches.length &&
                    ((i = {
                      pageX: o.targetTouches[0].pageX,
                      pageY: o.targetTouches[0].pageY,
                    }),
                    t.touchMove(e, i, o),
                    (n = !0));
                }),
                this.$inner.on("touchend.lg", function (o) {
                  if ("swipe" === t.touchAction) {
                    if (n) (n = !1), t.touchEnd(i, e, o);
                    else if (s) {
                      var r = u(o.target);
                      t.isPosterElement(r) && t.LGel.trigger(F);
                    }
                    (t.touchAction = void 0), (s = !1);
                  }
                }));
            }),
            (t.prototype.enableDrag = function () {
              var t = this,
                e = {},
                i = {},
                n = !1,
                s = !1;
              this.settings.enableDrag &&
                (this.outer.on("mousedown.lg", function (i) {
                  t.dragOrSwipeEnabled = !0;
                  var s = t.getSlideItem(t.index);
                  (u(i.target).hasClass("lg-item") ||
                    s.get().contains(i.target)) &&
                    (t.outer.hasClass("lg-zoomed") ||
                      t.lgBusy ||
                      (i.preventDefault(),
                      t.lgBusy ||
                        (t.manageSwipeClass(),
                        (e = { pageX: i.pageX, pageY: i.pageY }),
                        (n = !0),
                        (t.outer.get().scrollLeft += 1),
                        (t.outer.get().scrollLeft -= 1),
                        t.outer.removeClass("lg-grab").addClass("lg-grabbing"),
                        t.LGel.trigger(B))));
                }),
                u(window).on("mousemove.lg.global" + this.lgId, function (o) {
                  n &&
                    t.lgOpened &&
                    ((s = !0),
                    (i = { pageX: o.pageX, pageY: o.pageY }),
                    t.touchMove(e, i),
                    t.LGel.trigger(P));
                }),
                u(window).on("mouseup.lg.global" + this.lgId, function (o) {
                  if (t.lgOpened) {
                    var r = u(o.target);
                    s
                      ? ((s = !1), t.touchEnd(i, e, o), t.LGel.trigger(H))
                      : t.isPosterElement(r) && t.LGel.trigger(F),
                      n &&
                        ((n = !1),
                        t.outer.removeClass("lg-grabbing").addClass("lg-grab"));
                  }
                }));
            }),
            (t.prototype.triggerPosterClick = function () {
              var t = this;
              this.$inner.on("click.lg", function (e) {
                !t.dragOrSwipeEnabled &&
                  t.isPosterElement(u(e.target)) &&
                  t.LGel.trigger(F);
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
                      this.LGel.trigger(N, { index: this.index }),
                      this.slide(this.index, !!t, !1, "next"))
                    : i
                    ? ((this.index = 0),
                      this.LGel.trigger(N, { index: this.index }),
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
                      this.LGel.trigger(q, { index: this.index, fromTouch: t }),
                      this.slide(this.index, !!t, !1, "prev"))
                    : i
                    ? ((this.index = this.galleryItems.length - 1),
                      this.LGel.trigger(q, { index: this.index, fromTouch: t }),
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
              u(window).on("keydown.lg.global" + this.lgId, function (e) {
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
            (t.prototype.setTranslate = function (t, e, i, n, s) {
              void 0 === n && (n = 1),
                void 0 === s && (s = 1),
                t.css(
                  "transform",
                  "translate3d(" +
                    e +
                    "px, " +
                    i +
                    "px, 0px) scale3d(" +
                    n +
                    ", " +
                    s +
                    ", 1)"
                );
            }),
            (t.prototype.mousewheel = function () {
              var t = this,
                e = 0;
              this.outer.on("wheel.lg", function (i) {
                if (i.deltaY && !(t.galleryItems.length < 2)) {
                  i.preventDefault();
                  var n = new Date().getTime();
                  n - e < 1e3 ||
                    ((e = n),
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
                var e = u(this.items[t]);
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
                      var n = u(i.target);
                      e = !!t.isSlideElement(n);
                    }),
                    this.outer.on("mousemove.lg", function () {
                      e = !1;
                    }),
                    this.outer.on("mouseup.lg", function (i) {
                      var n = u(i.target);
                      t.isSlideElement(n) &&
                        e &&
                        (t.outer.hasClass("lg-dragging") || t.closeGallery());
                    }));
              }
            }),
            (t.prototype.closeGallery = function (t) {
              var e = this;
              if (!this.lgOpened || (!this.settings.closable && !t)) return 0;
              this.LGel.trigger($), u(window).scrollTop(this.prevScrollTop);
              var i,
                n = this.items[this.index];
              if (this.zoomFromOrigin && n) {
                var s = this.mediaContainerPosition,
                  o = s.top,
                  r = s.bottom,
                  l = this.galleryItems[this.index],
                  a = l.__slideVideoInfo,
                  d = l.poster,
                  c = m(
                    n,
                    this.outer,
                    o + r,
                    a && d && this.settings.videoMaxSize
                  );
                i = p(n, this.outer, o, r, c);
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
                u("html").removeClass("lg-on"),
                this.outer.removeClass("lg-visible lg-components-open"),
                this.$backdrop.removeClass("in").css("opacity", 0);
              var g =
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
                }, g + 100),
                g + 100
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
                this.LGel.trigger(O);
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
                    u(window).off(".lg.global" + t.lgId),
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
        Y = document.querySelectorAll("[data-gallery]");
      Y.length &&
        Y.forEach((t) => {
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
          let t = document.querySelector(".icon-menu");
          document.querySelector(".mobile-menu"),
            t &&
              t.addEventListener("click", function (t) {
                e &&
                  (((t = 500) => {
                    document.documentElement.classList.contains("lock")
                      ? n(t)
                      : s(t);
                  })(),
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
                  n = i.dataset.goto ? i.dataset.goto : "",
                  s = !!i.hasAttribute("data-goto-header"),
                  o = i.dataset.gotoSpeed ? i.dataset.gotoSpeed : "400";
                l(n, s, o), t.preventDefault();
              }
            } else if ("watcherCallback" === t.type && t.detail) {
              const e = t.detail.entry,
                i = e.target;
              if ("navigator" === i.dataset.watch) {
                const t = i.id,
                  n =
                    (document.querySelector("[data-goto]._navigator-active"),
                    document.querySelector(`[data-goto="${t}"]`));
                e.isIntersecting
                  ? n && n.classList.add("_navigator-active")
                  : n && n.classList.remove("_navigator-active");
              }
            }
          }
          document.addEventListener("click", t),
            document.addEventListener("watcherCallback", t);
        })();
    })();
})();
