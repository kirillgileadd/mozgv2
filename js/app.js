/*! For license information please see app.min.js.LICENSE.txt */
(() => {
  var e = {
      2: function (e, t, n) {
        var o, i;
        window.Element &&
          !Element.prototype.closest &&
          (Element.prototype.closest = function (e) {
            var t,
              n = (this.document || this.ownerDocument).querySelectorAll(e),
              o = this;
            do {
              for (t = n.length; 0 <= --t && n.item(t) !== o; );
            } while (t < 0 && (o = o.parentElement));
            return o;
          }),
          (function () {
            function e(e, t) {
              t = t || { bubbles: !1, cancelable: !1, detail: void 0 };
              var n = document.createEvent("CustomEvent");
              return n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), n;
            }
            "function" != typeof window.CustomEvent &&
              ((e.prototype = window.Event.prototype),
              (window.CustomEvent = e));
          })(),
          (function () {
            for (
              var e = 0, t = ["ms", "moz", "webkit", "o"], n = 0;
              n < t.length && !window.requestAnimationFrame;
              ++n
            )
              (window.requestAnimationFrame =
                window[t[n] + "RequestAnimationFrame"]),
                (window.cancelAnimationFrame =
                  window[t[n] + "CancelAnimationFrame"] ||
                  window[t[n] + "CancelRequestAnimationFrame"]);
            window.requestAnimationFrame ||
              (window.requestAnimationFrame = function (t, n) {
                var o = new Date().getTime(),
                  i = Math.max(0, 16 - (o - e)),
                  r = window.setTimeout(function () {
                    t(o + i);
                  }, i);
                return (e = o + i), r;
              }),
              window.cancelAnimationFrame ||
                (window.cancelAnimationFrame = function (e) {
                  clearTimeout(e);
                });
          })(),
          (i =
            void 0 !== n.g
              ? n.g
              : "undefined" != typeof window
              ? window
              : this),
          (o = function () {
            return (function (e) {
              "use strict";
              var t = {
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
                n = function () {
                  var e = {};
                  return (
                    Array.prototype.forEach.call(arguments, function (t) {
                      for (var n in t) {
                        if (!t.hasOwnProperty(n)) return;
                        e[n] = t[n];
                      }
                    }),
                    e
                  );
                },
                o = function (e) {
                  "#" === e.charAt(0) && (e = e.substr(1));
                  for (
                    var t,
                      n = String(e),
                      o = n.length,
                      i = -1,
                      r = "",
                      a = n.charCodeAt(0);
                    ++i < o;

                  ) {
                    if (0 === (t = n.charCodeAt(i)))
                      throw new InvalidCharacterError(
                        "Invalid character: the input contains U+0000."
                      );
                    r +=
                      (1 <= t && t <= 31) ||
                      127 == t ||
                      (0 === i && 48 <= t && t <= 57) ||
                      (1 === i && 48 <= t && t <= 57 && 45 === a)
                        ? "\\" + t.toString(16) + " "
                        : 128 <= t ||
                          45 === t ||
                          95 === t ||
                          (48 <= t && t <= 57) ||
                          (65 <= t && t <= 90) ||
                          (97 <= t && t <= 122)
                        ? n.charAt(i)
                        : "\\" + n.charAt(i);
                  }
                  return "#" + r;
                },
                i = function () {
                  return Math.max(
                    document.body.scrollHeight,
                    document.documentElement.scrollHeight,
                    document.body.offsetHeight,
                    document.documentElement.offsetHeight,
                    document.body.clientHeight,
                    document.documentElement.clientHeight
                  );
                },
                r = function (t) {
                  return t
                    ? ((n = t),
                      parseInt(e.getComputedStyle(n).height, 10) + t.offsetTop)
                    : 0;
                  var n;
                },
                a = function (t, n, o) {
                  0 === t && document.body.focus(),
                    o ||
                      (t.focus(),
                      document.activeElement !== t &&
                        (t.setAttribute("tabindex", "-1"),
                        t.focus(),
                        (t.style.outline = "none")),
                      e.scrollTo(0, n));
                },
                s = function (t, n, o, i) {
                  if (n.emitEvents && "function" == typeof e.CustomEvent) {
                    var r = new CustomEvent(t, {
                      bubbles: !0,
                      detail: { anchor: o, toggle: i },
                    });
                    document.dispatchEvent(r);
                  }
                };
              return function (l, c) {
                var d,
                  u,
                  m,
                  f,
                  p = {
                    cancelScroll: function (e) {
                      cancelAnimationFrame(f),
                        (f = null),
                        e || s("scrollCancel", d);
                    },
                    animateScroll: function (o, l, c) {
                      p.cancelScroll();
                      var u = n(d || t, c || {}),
                        h =
                          "[object Number]" ===
                          Object.prototype.toString.call(o),
                        g = h || !o.tagName ? null : o;
                      if (h || g) {
                        var y = e.pageYOffset;
                        u.header &&
                          !m &&
                          (m = document.querySelector(u.header));
                        var v,
                          w,
                          A,
                          E,
                          S,
                          b,
                          L,
                          x,
                          q = r(m),
                          P = h
                            ? o
                            : (function (t, n, o, r) {
                                var a = 0;
                                if (t.offsetParent)
                                  for (
                                    ;
                                    (a += t.offsetTop), (t = t.offsetParent);

                                  );
                                return (
                                  (a = Math.max(a - n - o, 0)),
                                  r && (a = Math.min(a, i() - e.innerHeight)),
                                  a
                                );
                              })(
                                g,
                                q,
                                parseInt(
                                  "function" == typeof u.offset
                                    ? u.offset(o, l)
                                    : u.offset,
                                  10
                                ),
                                u.clip
                              ),
                          O = P - y,
                          C = i(),
                          I = 0,
                          M =
                            ((v = O),
                            (A = (w = u).speedAsDuration
                              ? w.speed
                              : Math.abs((v / 1e3) * w.speed)),
                            w.durationMax && A > w.durationMax
                              ? w.durationMax
                              : w.durationMin && A < w.durationMin
                              ? w.durationMin
                              : parseInt(A, 10)),
                          T = function (t) {
                            var n, i, r;
                            E || (E = t),
                              (I += t - E),
                              (b =
                                y +
                                O *
                                  ((i = S =
                                    1 < (S = 0 === M ? 0 : I / M) ? 1 : S),
                                  "easeInQuad" === (n = u).easing &&
                                    (r = i * i),
                                  "easeOutQuad" === n.easing &&
                                    (r = i * (2 - i)),
                                  "easeInOutQuad" === n.easing &&
                                    (r =
                                      i < 0.5
                                        ? 2 * i * i
                                        : (4 - 2 * i) * i - 1),
                                  "easeInCubic" === n.easing && (r = i * i * i),
                                  "easeOutCubic" === n.easing &&
                                    (r = --i * i * i + 1),
                                  "easeInOutCubic" === n.easing &&
                                    (r =
                                      i < 0.5
                                        ? 4 * i * i * i
                                        : (i - 1) * (2 * i - 2) * (2 * i - 2) +
                                          1),
                                  "easeInQuart" === n.easing &&
                                    (r = i * i * i * i),
                                  "easeOutQuart" === n.easing &&
                                    (r = 1 - --i * i * i * i),
                                  "easeInOutQuart" === n.easing &&
                                    (r =
                                      i < 0.5
                                        ? 8 * i * i * i * i
                                        : 1 - 8 * --i * i * i * i),
                                  "easeInQuint" === n.easing &&
                                    (r = i * i * i * i * i),
                                  "easeOutQuint" === n.easing &&
                                    (r = 1 + --i * i * i * i * i),
                                  "easeInOutQuint" === n.easing &&
                                    (r =
                                      i < 0.5
                                        ? 16 * i * i * i * i * i
                                        : 1 + 16 * --i * i * i * i * i),
                                  n.customEasing && (r = n.customEasing(i)),
                                  r || i)),
                              e.scrollTo(0, Math.floor(b)),
                              (function (t, n) {
                                var i = e.pageYOffset;
                                if (
                                  t == n ||
                                  i == n ||
                                  (y < n && e.innerHeight + i) >= C
                                )
                                  return (
                                    p.cancelScroll(!0),
                                    a(o, n, h),
                                    s("scrollStop", u, o, l),
                                    !(f = E = null)
                                  );
                              })(b, P) ||
                                ((f = e.requestAnimationFrame(T)), (E = t));
                          };
                        0 === e.pageYOffset && e.scrollTo(0, 0),
                          (L = o),
                          (x = u),
                          h ||
                            (history.pushState &&
                              x.updateURL &&
                              history.pushState(
                                {
                                  smoothScroll: JSON.stringify(x),
                                  anchor: L.id,
                                },
                                document.title,
                                L === document.documentElement
                                  ? "#top"
                                  : "#" + L.id
                              )),
                          "matchMedia" in e &&
                          e.matchMedia("(prefers-reduced-motion)").matches
                            ? a(o, Math.floor(P), !1)
                            : (s("scrollStart", u, o, l),
                              p.cancelScroll(!0),
                              e.requestAnimationFrame(T));
                      }
                    },
                  },
                  h = function (t) {
                    if (
                      !t.defaultPrevented &&
                      !(
                        0 !== t.button ||
                        t.metaKey ||
                        t.ctrlKey ||
                        t.shiftKey
                      ) &&
                      "closest" in t.target &&
                      (u = t.target.closest(l)) &&
                      "a" === u.tagName.toLowerCase() &&
                      !t.target.closest(d.ignore) &&
                      u.hostname === e.location.hostname &&
                      u.pathname === e.location.pathname &&
                      /#/.test(u.href)
                    ) {
                      var n, i;
                      try {
                        n = o(decodeURIComponent(u.hash));
                      } catch (t) {
                        n = o(u.hash);
                      }
                      if ("#" === n) {
                        if (!d.topOnEmptyHash) return;
                        i = document.documentElement;
                      } else i = document.querySelector(n);
                      (i = i || "#top" !== n ? i : document.documentElement) &&
                        (t.preventDefault(),
                        (function (t) {
                          if (
                            history.replaceState &&
                            t.updateURL &&
                            !history.state
                          ) {
                            var n = e.location.hash;
                            (n = n || ""),
                              history.replaceState(
                                {
                                  smoothScroll: JSON.stringify(t),
                                  anchor: n || e.pageYOffset,
                                },
                                document.title,
                                n || e.location.href
                              );
                          }
                        })(d),
                        p.animateScroll(i, u));
                    }
                  },
                  g = function (e) {
                    if (
                      null !== history.state &&
                      history.state.smoothScroll &&
                      history.state.smoothScroll === JSON.stringify(d)
                    ) {
                      var t = history.state.anchor;
                      ("string" == typeof t &&
                        t &&
                        !(t = document.querySelector(
                          o(history.state.anchor)
                        ))) ||
                        p.animateScroll(t, null, { updateURL: !1 });
                    }
                  };
                return (
                  (p.destroy = function () {
                    d &&
                      (document.removeEventListener("click", h, !1),
                      e.removeEventListener("popstate", g, !1),
                      p.cancelScroll(),
                      (f = m = u = d = null));
                  }),
                  (function () {
                    if (
                      !(
                        "querySelector" in document &&
                        "addEventListener" in e &&
                        "requestAnimationFrame" in e &&
                        "closest" in e.Element.prototype
                      )
                    )
                      throw "Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs.";
                    p.destroy(),
                      (d = n(t, c || {})),
                      (m = d.header ? document.querySelector(d.header) : null),
                      document.addEventListener("click", h, !1),
                      d.updateURL &&
                        d.popstate &&
                        e.addEventListener("popstate", g, !1);
                  })(),
                  p
                );
              };
            })(i);
          }.apply(t, [])),
          void 0 === o || (e.exports = o);
      },
    },
    t = {};
  function n(o) {
    var i = t[o];
    if (void 0 !== i) return i.exports;
    var r = (t[o] = { exports: {} });
    return e[o].call(r.exports, r, r.exports, n), r.exports;
  }
  (n.g = (function () {
    if ("object" == typeof globalThis) return globalThis;
    try {
      return this || new Function("return this")();
    } catch (e) {
      if ("object" == typeof window) return window;
    }
  })()),
    (() => {
      "use strict";
      let e = {
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
            e.Android() || e.BlackBerry() || e.iOS() || e.Opera() || e.Windows()
          );
        },
      };
      let t = (e, t = 500, n = 0) => {
          e.classList.contains("_slide") ||
            (e.classList.add("_slide"),
            (e.style.transitionProperty = "height, margin, padding"),
            (e.style.transitionDuration = t + "ms"),
            (e.style.height = `${e.offsetHeight}px`),
            e.offsetHeight,
            (e.style.overflow = "hidden"),
            (e.style.height = n ? `${n}px` : "0px"),
            (e.style.paddingTop = 0),
            (e.style.paddingBottom = 0),
            (e.style.marginTop = 0),
            (e.style.marginBottom = 0),
            window.setTimeout(() => {
              (e.hidden = !n),
                !n && e.style.removeProperty("height"),
                e.style.removeProperty("padding-top"),
                e.style.removeProperty("padding-bottom"),
                e.style.removeProperty("margin-top"),
                e.style.removeProperty("margin-bottom"),
                !n && e.style.removeProperty("overflow"),
                e.style.removeProperty("transition-duration"),
                e.style.removeProperty("transition-property"),
                e.classList.remove("_slide");
            }, t));
        },
        o = (e, t = 500, n = 0) => {
          if (!e.classList.contains("_slide")) {
            e.classList.add("_slide"),
              (e.hidden = !e.hidden && null),
              n && e.style.removeProperty("height");
            let o = e.offsetHeight;
            (e.style.overflow = "hidden"),
              (e.style.height = n ? `${n}px` : "0px"),
              (e.style.paddingTop = 0),
              (e.style.paddingBottom = 0),
              (e.style.marginTop = 0),
              (e.style.marginBottom = 0),
              e.offsetHeight,
              (e.style.transitionProperty = "height, margin, padding"),
              (e.style.transitionDuration = t + "ms"),
              (e.style.height = o + "px"),
              e.style.removeProperty("padding-top"),
              e.style.removeProperty("padding-bottom"),
              e.style.removeProperty("margin-top"),
              e.style.removeProperty("margin-bottom"),
              window.setTimeout(() => {
                e.style.removeProperty("height"),
                  e.style.removeProperty("overflow"),
                  e.style.removeProperty("transition-duration"),
                  e.style.removeProperty("transition-property"),
                  e.classList.remove("_slide");
              }, t);
          }
        },
        i = !0,
        r = (e = 500) => {
          let t = document.querySelector("body");
          if (i) {
            let n = document.querySelectorAll("[data-lp]");
            setTimeout(() => {
              for (let e = 0; e < n.length; e++) {
                n[e].style.paddingRight = "0px";
              }
              (t.style.paddingRight = "0px"),
                document.documentElement.classList.remove("lock");
            }, e),
              (i = !1),
              setTimeout(function () {
                i = !0;
              }, e);
          }
        },
        a = (e = 500) => {
          let t = document.querySelector("body");
          if (i) {
            let n = document.querySelectorAll("[data-lp]");
            for (let e = 0; e < n.length; e++) {
              n[e].style.paddingRight =
                window.innerWidth -
                document.querySelector(".wrapper").offsetWidth +
                "px";
            }
            (t.style.paddingRight =
              window.innerWidth -
              document.querySelector(".wrapper").offsetWidth +
              "px"),
              document.documentElement.classList.add("lock"),
              (i = !1),
              setTimeout(function () {
                i = !0;
              }, e);
          }
        };
      function s(e) {
        setTimeout(() => {
          window.FLS && console.log(e);
        }, 0);
      }
      function l(e, t) {
        const n = Array.from(e).filter(function (e, n, o) {
          if (e.dataset[t]) return e.dataset[t].split(",")[0];
        });
        if (n.length) {
          const e = [];
          n.forEach((n) => {
            const o = {},
              i = n.dataset[t].split(",");
            (o.value = i[0]),
              (o.type = i[1] ? i[1].trim() : "max"),
              (o.item = n),
              e.push(o);
          });
          let o = e.map(function (e) {
            return (
              "(" +
              e.type +
              "-width: " +
              e.value +
              "px)," +
              e.value +
              "," +
              e.type
            );
          });
          o = (function (e) {
            return e.filter(function (e, t, n) {
              return n.indexOf(e) === t;
            });
          })(o);
          const i = [];
          if (o.length)
            return (
              o.forEach((t) => {
                const n = t.split(","),
                  o = n[1],
                  r = n[2],
                  a = window.matchMedia(n[0]),
                  s = e.filter(function (e) {
                    if (e.value === o && e.type === r) return !0;
                  });
                i.push({ itemsArray: s, matchMedia: a });
              }),
              i
            );
        }
      }
      var c = n(2);
      let d = (e, t = !1, n = 300, o = 0) => {
        const i = document.querySelector(e);
        if (i) {
          let a = "",
            l = 0;
          t &&
            ((a = "header.header"),
            (l = document.querySelector(a).offsetHeight));
          let d = {
            speedAsDuration: !0,
            speed: n,
            header: a,
            offset: o,
            easing: "easeOutQuad",
          };
          if (
            (document.documentElement.classList.contains("menu-open") &&
              (r(), document.documentElement.classList.remove("menu-open")),
            void 0 !== c)
          )
            new c().animateScroll(i, "", d);
          else {
            let e = i.getBoundingClientRect().top + scrollY;
            window.scrollTo({ top: l ? e - l : e, behavior: "smooth" });
          }
          s(`[gotoBlock]: Юхуу...едем к ${e}`);
        } else s(`[gotoBlock]: Ой ой..Такого блока нет на странице: ${e}`);
      };
      let u = !1;
      setTimeout(() => {
        if (u) {
          let e = new Event("windowScroll");
          window.addEventListener("scroll", function (t) {
            document.dispatchEvent(e);
          });
        }
      }, 0),
        (window.FLS = !0),
        (function (e) {
          let t = new Image();
          (t.onload = t.onerror =
            function () {
              e(2 == t.height);
            }),
            (t.src =
              "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
        })(function (e) {
          let t = !0 === e ? "webp" : "no-webp";
          document.documentElement.classList.add(t);
        }),
        window.addEventListener("load", function () {
          setTimeout(function () {
            document.documentElement.classList.add("loaded");
          }, 0);
        }),
        (function () {
          let e = document.querySelector(".icon-menu");
          e &&
            e.addEventListener("click", function (e) {
              i &&
                (((e = 500) => {
                  document.documentElement.classList.contains("lock")
                    ? r(e)
                    : a(e);
                })(),
                document.documentElement.classList.toggle("menu-open"));
            });
        })(),
        (function () {
          if (
            document.querySelectorAll("[data-fullscreen]").length &&
            e.any()
          ) {
            function e() {
              let e = 0.01 * window.innerHeight;
              document.documentElement.style.setProperty("--vh", `${e}px`);
            }
            window.addEventListener("resize", e), e();
          }
        })(),
        (function () {
          const e = document.querySelectorAll("[data-spollers]");
          if (e.length > 0) {
            const n = Array.from(e).filter(function (e, t, n) {
              return !e.dataset.spollers.split(",")[0];
            });
            n.length && r(n);
            let i = l(e, "spollers");
            function r(e, t = !1) {
              e.forEach((e) => {
                (e = t ? e.item : e),
                  t.matches || !t
                    ? (e.classList.add("_spoller-init"),
                      a(e),
                      e.addEventListener("click", s))
                    : (e.classList.remove("_spoller-init"),
                      a(e, !1),
                      e.removeEventListener("click", s));
              });
            }
            function a(e, t = !0) {
              const n = e.querySelectorAll("[data-spoller]");
              n.length > 0 &&
                n.forEach((e) => {
                  t
                    ? (e.removeAttribute("tabindex"),
                      e.classList.contains("_spoller-active") ||
                        (e.nextElementSibling.hidden = !0))
                    : (e.setAttribute("tabindex", "-1"),
                      (e.nextElementSibling.hidden = !1));
                });
            }
            function s(e) {
              const n = e.target;
              if (n.closest("[data-spoller]")) {
                const i = n.closest("[data-spoller]"),
                  r = i.closest("[data-spollers]"),
                  a = !!r.hasAttribute("data-one-spoller");
                r.querySelectorAll("._slide").length ||
                  (a && !i.classList.contains("_spoller-active") && c(r),
                  i.classList.toggle("_spoller-active"),
                  ((e, n = 500) => {
                    e.hidden ? o(e, n) : t(e, n);
                  })(i.nextElementSibling, 500)),
                  e.preventDefault();
              }
            }
            function c(e) {
              const n = e.querySelector("[data-spoller]._spoller-active");
              n &&
                (n.classList.remove("_spoller-active"),
                t(n.nextElementSibling, 500));
            }
            i &&
              i.length &&
              i.forEach((e) => {
                e.matchMedia.addEventListener("change", function () {
                  r(e.itemsArray, e.matchMedia);
                }),
                  r(e.itemsArray, e.matchMedia);
              });
          }
        })(),
        (function () {
          function e(e) {
            if ("click" === e.type) {
              const t = e.target;
              if (t.closest("[data-goto]")) {
                const n = t.closest("[data-goto]"),
                  o = n.dataset.goto ? n.dataset.goto : "",
                  i = !!n.hasAttribute("data-goto-header"),
                  r = n.dataset.gotoSpeed ? n.dataset.gotoSpeed : "400";
                d(o, i, r), e.preventDefault();
              }
            } else if ("watcherCallback" === e.type && e.detail) {
              const t = e.detail.entry,
                n = t.target;
              if ("navigator" === n.dataset.watch) {
                const e = n.id,
                  o =
                    (document.querySelector("[data-goto]._navigator-active"),
                    document.querySelector(`[data-goto="${e}"]`));
                t.isIntersecting
                  ? o && o.classList.add("_navigator-active")
                  : o && o.classList.remove("_navigator-active");
              }
            }
          }
          document.addEventListener("click", e),
            document.addEventListener("watcherCallback", e);
        })();
    })();
})();
