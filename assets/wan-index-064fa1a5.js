/* empty css                 */ function fe(i) {
  return (
    i !== null &&
    typeof i == 'object' &&
    'constructor' in i &&
    i.constructor === Object
  );
}
function oe(i, e) {
  i === void 0 && (i = {}),
    e === void 0 && (e = {}),
    Object.keys(e).forEach((t) => {
      typeof i[t] > 'u'
        ? (i[t] = e[t])
        : fe(e[t]) &&
          fe(i[t]) &&
          Object.keys(e[t]).length > 0 &&
          oe(i[t], e[t]);
    });
}
const ve = {
  body: {},
  addEventListener() {},
  removeEventListener() {},
  activeElement: { blur() {}, nodeName: '' },
  querySelector() {
    return null;
  },
  querySelectorAll() {
    return [];
  },
  getElementById() {
    return null;
  },
  createEvent() {
    return { initEvent() {} };
  },
  createElement() {
    return {
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {},
      getElementsByTagName() {
        return [];
      },
    };
  },
  createElementNS() {
    return {};
  },
  importNode() {
    return null;
  },
  location: {
    hash: '',
    host: '',
    hostname: '',
    href: '',
    origin: '',
    pathname: '',
    protocol: '',
    search: '',
  },
};
function R() {
  const i = typeof document < 'u' ? document : {};
  return oe(i, ve), i;
}
const Ie = {
  document: ve,
  navigator: { userAgent: '' },
  location: {
    hash: '',
    host: '',
    hostname: '',
    href: '',
    origin: '',
    pathname: '',
    protocol: '',
    search: '',
  },
  history: { replaceState() {}, pushState() {}, go() {}, back() {} },
  CustomEvent: function () {
    return this;
  },
  addEventListener() {},
  removeEventListener() {},
  getComputedStyle() {
    return {
      getPropertyValue() {
        return '';
      },
    };
  },
  Image() {},
  Date() {},
  screen: {},
  setTimeout() {},
  clearTimeout() {},
  matchMedia() {
    return {};
  },
  requestAnimationFrame(i) {
    return typeof setTimeout > 'u' ? (i(), null) : setTimeout(i, 0);
  },
  cancelAnimationFrame(i) {
    typeof setTimeout > 'u' || clearTimeout(i);
  },
};
function G() {
  const i = typeof window < 'u' ? window : {};
  return oe(i, Ie), i;
}
function N(i) {
  return (
    i === void 0 && (i = ''),
    i
      .trim()
      .split(' ')
      .filter((e) => !!e.trim())
  );
}
function ze(i) {
  const e = i;
  Object.keys(e).forEach((t) => {
    try {
      e[t] = null;
    } catch {}
    try {
      delete e[t];
    } catch {}
  });
}
function U(i, e) {
  return e === void 0 && (e = 0), setTimeout(i, e);
}
function K() {
  return Date.now();
}
function Oe(i) {
  const e = G();
  let t;
  return (
    e.getComputedStyle && (t = e.getComputedStyle(i, null)),
    !t && i.currentStyle && (t = i.currentStyle),
    t || (t = i.style),
    t
  );
}
function Ae(i, e) {
  e === void 0 && (e = 'x');
  const t = G();
  let s, n, r;
  const o = Oe(i);
  return (
    t.WebKitCSSMatrix
      ? ((n = o.transform || o.webkitTransform),
        n.split(',').length > 6 &&
          (n = n
            .split(', ')
            .map((l) => l.replace(',', '.'))
            .join(', ')),
        (r = new t.WebKitCSSMatrix(n === 'none' ? '' : n)))
      : ((r =
          o.MozTransform ||
          o.OTransform ||
          o.MsTransform ||
          o.msTransform ||
          o.transform ||
          o
            .getPropertyValue('transform')
            .replace('translate(', 'matrix(1, 0, 0, 1,')),
        (s = r.toString().split(','))),
    e === 'x' &&
      (t.WebKitCSSMatrix
        ? (n = r.m41)
        : s.length === 16
        ? (n = parseFloat(s[12]))
        : (n = parseFloat(s[4]))),
    e === 'y' &&
      (t.WebKitCSSMatrix
        ? (n = r.m42)
        : s.length === 16
        ? (n = parseFloat(s[13]))
        : (n = parseFloat(s[5]))),
    n || 0
  );
}
function j(i) {
  return (
    typeof i == 'object' &&
    i !== null &&
    i.constructor &&
    Object.prototype.toString.call(i).slice(8, -1) === 'Object'
  );
}
function De(i) {
  return typeof window < 'u' && typeof window.HTMLElement < 'u'
    ? i instanceof HTMLElement
    : i && (i.nodeType === 1 || i.nodeType === 11);
}
function $() {
  const i = Object(arguments.length <= 0 ? void 0 : arguments[0]),
    e = ['__proto__', 'constructor', 'prototype'];
  for (let t = 1; t < arguments.length; t += 1) {
    const s = t < 0 || arguments.length <= t ? void 0 : arguments[t];
    if (s != null && !De(s)) {
      const n = Object.keys(Object(s)).filter((r) => e.indexOf(r) < 0);
      for (let r = 0, o = n.length; r < o; r += 1) {
        const l = n[r],
          a = Object.getOwnPropertyDescriptor(s, l);
        a !== void 0 &&
          a.enumerable &&
          (j(i[l]) && j(s[l])
            ? s[l].__swiper__
              ? (i[l] = s[l])
              : $(i[l], s[l])
            : !j(i[l]) && j(s[l])
            ? ((i[l] = {}), s[l].__swiper__ ? (i[l] = s[l]) : $(i[l], s[l]))
            : (i[l] = s[l]));
      }
    }
  }
  return i;
}
function Y(i, e, t) {
  i.style.setProperty(e, t);
}
function we(i) {
  let { swiper: e, targetPosition: t, side: s } = i;
  const n = G(),
    r = -e.translate;
  let o = null,
    l;
  const a = e.params.speed;
  (e.wrapperEl.style.scrollSnapType = 'none'),
    n.cancelAnimationFrame(e.cssModeFrameID);
  const u = t > r ? 'next' : 'prev',
    f = (g, m) => (u === 'next' && g >= m) || (u === 'prev' && g <= m),
    p = () => {
      (l = new Date().getTime()), o === null && (o = l);
      const g = Math.max(Math.min((l - o) / a, 1), 0),
        m = 0.5 - Math.cos(g * Math.PI) / 2;
      let h = r + m * (t - r);
      if ((f(h, t) && (h = t), e.wrapperEl.scrollTo({ [s]: h }), f(h, t))) {
        (e.wrapperEl.style.overflow = 'hidden'),
          (e.wrapperEl.style.scrollSnapType = ''),
          setTimeout(() => {
            (e.wrapperEl.style.overflow = ''), e.wrapperEl.scrollTo({ [s]: h });
          }),
          n.cancelAnimationFrame(e.cssModeFrameID);
        return;
      }
      e.cssModeFrameID = n.requestAnimationFrame(p);
    };
  p();
}
function H(i, e) {
  e === void 0 && (e = '');
  const t = [...i.children];
  return (
    i instanceof HTMLSlotElement && t.push(...i.assignedElements()),
    e ? t.filter((s) => s.matches(e)) : t
  );
}
function ke(i, e) {
  const t = e.contains(i);
  return !t && e instanceof HTMLSlotElement
    ? [...e.assignedElements()].includes(i)
    : t;
}
function J(i) {
  try {
    console.warn(i);
    return;
  } catch {}
}
function q(i, e) {
  e === void 0 && (e = []);
  const t = document.createElement(i);
  return t.classList.add(...(Array.isArray(e) ? e : N(e))), t;
}
function Ge(i) {
  const e = G(),
    t = R(),
    s = i.getBoundingClientRect(),
    n = t.body,
    r = i.clientTop || n.clientTop || 0,
    o = i.clientLeft || n.clientLeft || 0,
    l = i === e ? e.scrollY : i.scrollTop,
    a = i === e ? e.scrollX : i.scrollLeft;
  return { top: s.top + l - r, left: s.left + a - o };
}
function Be(i, e) {
  const t = [];
  for (; i.previousElementSibling; ) {
    const s = i.previousElementSibling;
    e ? s.matches(e) && t.push(s) : t.push(s), (i = s);
  }
  return t;
}
function $e(i, e) {
  const t = [];
  for (; i.nextElementSibling; ) {
    const s = i.nextElementSibling;
    e ? s.matches(e) && t.push(s) : t.push(s), (i = s);
  }
  return t;
}
function _(i, e) {
  return G().getComputedStyle(i, null).getPropertyValue(e);
}
function Q(i) {
  let e = i,
    t;
  if (e) {
    for (t = 0; (e = e.previousSibling) !== null; )
      e.nodeType === 1 && (t += 1);
    return t;
  }
}
function be(i, e) {
  const t = [];
  let s = i.parentElement;
  for (; s; ) e ? s.matches(e) && t.push(s) : t.push(s), (s = s.parentElement);
  return t;
}
function ae(i, e, t) {
  const s = G();
  return t
    ? i[e === 'width' ? 'offsetWidth' : 'offsetHeight'] +
        parseFloat(
          s
            .getComputedStyle(i, null)
            .getPropertyValue(e === 'width' ? 'margin-right' : 'margin-top'),
        ) +
        parseFloat(
          s
            .getComputedStyle(i, null)
            .getPropertyValue(e === 'width' ? 'margin-left' : 'margin-bottom'),
        )
    : i.offsetWidth;
}
function k(i) {
  return (Array.isArray(i) ? i : [i]).filter((e) => !!e);
}
let Z;
function Ve() {
  const i = G(),
    e = R();
  return {
    smoothScroll:
      e.documentElement &&
      e.documentElement.style &&
      'scrollBehavior' in e.documentElement.style,
    touch: !!(
      'ontouchstart' in i ||
      (i.DocumentTouch && e instanceof i.DocumentTouch)
    ),
  };
}
function Se() {
  return Z || (Z = Ve()), Z;
}
let ee;
function Fe(i) {
  let { userAgent: e } = i === void 0 ? {} : i;
  const t = Se(),
    s = G(),
    n = s.navigator.platform,
    r = e || s.navigator.userAgent,
    o = { ios: !1, android: !1 },
    l = s.screen.width,
    a = s.screen.height,
    u = r.match(/(Android);?[\s\/]+([\d.]+)?/);
  let f = r.match(/(iPad).*OS\s([\d_]+)/);
  const p = r.match(/(iPod)(.*OS\s([\d_]+))?/),
    g = !f && r.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
    m = n === 'Win32';
  let h = n === 'MacIntel';
  const v = [
    '1024x1366',
    '1366x1024',
    '834x1194',
    '1194x834',
    '834x1112',
    '1112x834',
    '768x1024',
    '1024x768',
    '820x1180',
    '1180x820',
    '810x1080',
    '1080x810',
  ];
  return (
    !f &&
      h &&
      t.touch &&
      v.indexOf(`${l}x${a}`) >= 0 &&
      ((f = r.match(/(Version)\/([\d.]+)/)),
      f || (f = [0, 1, '13_0_0']),
      (h = !1)),
    u && !m && ((o.os = 'android'), (o.android = !0)),
    (f || g || p) && ((o.os = 'ios'), (o.ios = !0)),
    o
  );
}
function ye(i) {
  return i === void 0 && (i = {}), ee || (ee = Fe(i)), ee;
}
let te;
function He() {
  const i = G(),
    e = ye();
  let t = !1;
  function s() {
    const l = i.navigator.userAgent.toLowerCase();
    return (
      l.indexOf('safari') >= 0 &&
      l.indexOf('chrome') < 0 &&
      l.indexOf('android') < 0
    );
  }
  if (s()) {
    const l = String(i.navigator.userAgent);
    if (l.includes('Version/')) {
      const [a, u] = l
        .split('Version/')[1]
        .split(' ')[0]
        .split('.')
        .map((f) => Number(f));
      t = a < 16 || (a === 16 && u < 2);
    }
  }
  const n = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
      i.navigator.userAgent,
    ),
    r = s(),
    o = r || (n && e.ios);
  return {
    isSafari: t || r,
    needPerspectiveFix: t,
    need3dFix: o,
    isWebView: n,
  };
}
function Ne() {
  return te || (te = He()), te;
}
function _e(i) {
  let { swiper: e, on: t, emit: s } = i;
  const n = G();
  let r = null,
    o = null;
  const l = () => {
      !e || e.destroyed || !e.initialized || (s('beforeResize'), s('resize'));
    },
    a = () => {
      !e ||
        e.destroyed ||
        !e.initialized ||
        ((r = new ResizeObserver((p) => {
          o = n.requestAnimationFrame(() => {
            const { width: g, height: m } = e;
            let h = g,
              v = m;
            p.forEach((E) => {
              let { contentBoxSize: y, contentRect: d, target: c } = E;
              (c && c !== e.el) ||
                ((h = d ? d.width : (y[0] || y).inlineSize),
                (v = d ? d.height : (y[0] || y).blockSize));
            }),
              (h !== g || v !== m) && l();
          });
        })),
        r.observe(e.el));
    },
    u = () => {
      o && n.cancelAnimationFrame(o),
        r && r.unobserve && e.el && (r.unobserve(e.el), (r = null));
    },
    f = () => {
      !e || e.destroyed || !e.initialized || s('orientationchange');
    };
  t('init', () => {
    if (e.params.resizeObserver && typeof n.ResizeObserver < 'u') {
      a();
      return;
    }
    n.addEventListener('resize', l), n.addEventListener('orientationchange', f);
  }),
    t('destroy', () => {
      u(),
        n.removeEventListener('resize', l),
        n.removeEventListener('orientationchange', f);
    });
}
function Re(i) {
  let { swiper: e, extendParams: t, on: s, emit: n } = i;
  const r = [],
    o = G(),
    l = function (f, p) {
      p === void 0 && (p = {});
      const g = o.MutationObserver || o.WebkitMutationObserver,
        m = new g((h) => {
          if (e.__preventObserver__) return;
          if (h.length === 1) {
            n('observerUpdate', h[0]);
            return;
          }
          const v = function () {
            n('observerUpdate', h[0]);
          };
          o.requestAnimationFrame
            ? o.requestAnimationFrame(v)
            : o.setTimeout(v, 0);
        });
      m.observe(f, {
        attributes: typeof p.attributes > 'u' ? !0 : p.attributes,
        childList: e.isElement || (typeof p.childList > 'u' ? !0 : p).childList,
        characterData: typeof p.characterData > 'u' ? !0 : p.characterData,
      }),
        r.push(m);
    },
    a = () => {
      if (e.params.observer) {
        if (e.params.observeParents) {
          const f = be(e.hostEl);
          for (let p = 0; p < f.length; p += 1) l(f[p]);
        }
        l(e.hostEl, { childList: e.params.observeSlideChildren }),
          l(e.wrapperEl, { attributes: !1 });
      }
    },
    u = () => {
      r.forEach((f) => {
        f.disconnect();
      }),
        r.splice(0, r.length);
    };
  t({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
    s('init', a),
    s('destroy', u);
}
var We = {
  on(i, e, t) {
    const s = this;
    if (!s.eventsListeners || s.destroyed || typeof e != 'function') return s;
    const n = t ? 'unshift' : 'push';
    return (
      i.split(' ').forEach((r) => {
        s.eventsListeners[r] || (s.eventsListeners[r] = []),
          s.eventsListeners[r][n](e);
      }),
      s
    );
  },
  once(i, e, t) {
    const s = this;
    if (!s.eventsListeners || s.destroyed || typeof e != 'function') return s;
    function n() {
      s.off(i, n), n.__emitterProxy && delete n.__emitterProxy;
      for (var r = arguments.length, o = new Array(r), l = 0; l < r; l++)
        o[l] = arguments[l];
      e.apply(s, o);
    }
    return (n.__emitterProxy = e), s.on(i, n, t);
  },
  onAny(i, e) {
    const t = this;
    if (!t.eventsListeners || t.destroyed || typeof i != 'function') return t;
    const s = e ? 'unshift' : 'push';
    return t.eventsAnyListeners.indexOf(i) < 0 && t.eventsAnyListeners[s](i), t;
  },
  offAny(i) {
    const e = this;
    if (!e.eventsListeners || e.destroyed || !e.eventsAnyListeners) return e;
    const t = e.eventsAnyListeners.indexOf(i);
    return t >= 0 && e.eventsAnyListeners.splice(t, 1), e;
  },
  off(i, e) {
    const t = this;
    return (
      !t.eventsListeners ||
        t.destroyed ||
        !t.eventsListeners ||
        i.split(' ').forEach((s) => {
          typeof e > 'u'
            ? (t.eventsListeners[s] = [])
            : t.eventsListeners[s] &&
              t.eventsListeners[s].forEach((n, r) => {
                (n === e || (n.__emitterProxy && n.__emitterProxy === e)) &&
                  t.eventsListeners[s].splice(r, 1);
              });
        }),
      t
    );
  },
  emit() {
    const i = this;
    if (!i.eventsListeners || i.destroyed || !i.eventsListeners) return i;
    let e, t, s;
    for (var n = arguments.length, r = new Array(n), o = 0; o < n; o++)
      r[o] = arguments[o];
    return (
      typeof r[0] == 'string' || Array.isArray(r[0])
        ? ((e = r[0]), (t = r.slice(1, r.length)), (s = i))
        : ((e = r[0].events), (t = r[0].data), (s = r[0].context || i)),
      t.unshift(s),
      (Array.isArray(e) ? e : e.split(' ')).forEach((a) => {
        i.eventsAnyListeners &&
          i.eventsAnyListeners.length &&
          i.eventsAnyListeners.forEach((u) => {
            u.apply(s, [a, ...t]);
          }),
          i.eventsListeners &&
            i.eventsListeners[a] &&
            i.eventsListeners[a].forEach((u) => {
              u.apply(s, t);
            });
      }),
      i
    );
  },
};
function qe() {
  const i = this;
  let e, t;
  const s = i.el;
  typeof i.params.width < 'u' && i.params.width !== null
    ? (e = i.params.width)
    : (e = s.clientWidth),
    typeof i.params.height < 'u' && i.params.height !== null
      ? (t = i.params.height)
      : (t = s.clientHeight),
    !((e === 0 && i.isHorizontal()) || (t === 0 && i.isVertical())) &&
      ((e =
        e -
        parseInt(_(s, 'padding-left') || 0, 10) -
        parseInt(_(s, 'padding-right') || 0, 10)),
      (t =
        t -
        parseInt(_(s, 'padding-top') || 0, 10) -
        parseInt(_(s, 'padding-bottom') || 0, 10)),
      Number.isNaN(e) && (e = 0),
      Number.isNaN(t) && (t = 0),
      Object.assign(i, {
        width: e,
        height: t,
        size: i.isHorizontal() ? e : t,
      }));
}
function je() {
  const i = this;
  function e(C, P) {
    return parseFloat(C.getPropertyValue(i.getDirectionLabel(P)) || 0);
  }
  const t = i.params,
    { wrapperEl: s, slidesEl: n, size: r, rtlTranslate: o, wrongRTL: l } = i,
    a = i.virtual && t.virtual.enabled,
    u = a ? i.virtual.slides.length : i.slides.length,
    f = H(n, `.${i.params.slideClass}, swiper-slide`),
    p = a ? i.virtual.slides.length : f.length;
  let g = [];
  const m = [],
    h = [];
  let v = t.slidesOffsetBefore;
  typeof v == 'function' && (v = t.slidesOffsetBefore.call(i));
  let E = t.slidesOffsetAfter;
  typeof E == 'function' && (E = t.slidesOffsetAfter.call(i));
  const y = i.snapGrid.length,
    d = i.slidesGrid.length;
  let c = t.spaceBetween,
    w = -v,
    b = 0,
    L = 0;
  if (typeof r > 'u') return;
  typeof c == 'string' && c.indexOf('%') >= 0
    ? (c = (parseFloat(c.replace('%', '')) / 100) * r)
    : typeof c == 'string' && (c = parseFloat(c)),
    (i.virtualSize = -c),
    f.forEach((C) => {
      o ? (C.style.marginLeft = '') : (C.style.marginRight = ''),
        (C.style.marginBottom = ''),
        (C.style.marginTop = '');
    }),
    t.centeredSlides &&
      t.cssMode &&
      (Y(s, '--swiper-centered-offset-before', ''),
      Y(s, '--swiper-centered-offset-after', ''));
  const A = t.grid && t.grid.rows > 1 && i.grid;
  A ? i.grid.initSlides(f) : i.grid && i.grid.unsetSlides();
  let z;
  const O =
    t.slidesPerView === 'auto' &&
    t.breakpoints &&
    Object.keys(t.breakpoints).filter(
      (C) => typeof t.breakpoints[C].slidesPerView < 'u',
    ).length > 0;
  for (let C = 0; C < p; C += 1) {
    z = 0;
    let P;
    if (
      (f[C] && (P = f[C]),
      A && i.grid.updateSlide(C, P, f),
      !(f[C] && _(P, 'display') === 'none'))
    ) {
      if (t.slidesPerView === 'auto') {
        O && (f[C].style[i.getDirectionLabel('width')] = '');
        const T = getComputedStyle(P),
          S = P.style.transform,
          x = P.style.webkitTransform;
        if (
          (S && (P.style.transform = 'none'),
          x && (P.style.webkitTransform = 'none'),
          t.roundLengths)
        )
          z = i.isHorizontal() ? ae(P, 'width', !0) : ae(P, 'height', !0);
        else {
          const M = e(T, 'width'),
            I = e(T, 'padding-left'),
            V = e(T, 'padding-right'),
            F = e(T, 'margin-left'),
            D = e(T, 'margin-right'),
            ce = T.getPropertyValue('box-sizing');
          if (ce && ce === 'border-box') z = M + F + D;
          else {
            const { clientWidth: Pe, offsetWidth: Le } = P;
            z = M + I + V + F + D + (Le - Pe);
          }
        }
        S && (P.style.transform = S),
          x && (P.style.webkitTransform = x),
          t.roundLengths && (z = Math.floor(z));
      } else
        (z = (r - (t.slidesPerView - 1) * c) / t.slidesPerView),
          t.roundLengths && (z = Math.floor(z)),
          f[C] && (f[C].style[i.getDirectionLabel('width')] = `${z}px`);
      f[C] && (f[C].swiperSlideSize = z),
        h.push(z),
        t.centeredSlides
          ? ((w = w + z / 2 + b / 2 + c),
            b === 0 && C !== 0 && (w = w - r / 2 - c),
            C === 0 && (w = w - r / 2 - c),
            Math.abs(w) < 1 / 1e3 && (w = 0),
            t.roundLengths && (w = Math.floor(w)),
            L % t.slidesPerGroup === 0 && g.push(w),
            m.push(w))
          : (t.roundLengths && (w = Math.floor(w)),
            (L - Math.min(i.params.slidesPerGroupSkip, L)) %
              i.params.slidesPerGroup ===
              0 && g.push(w),
            m.push(w),
            (w = w + z + c)),
        (i.virtualSize += z + c),
        (b = z),
        (L += 1);
    }
  }
  if (
    ((i.virtualSize = Math.max(i.virtualSize, r) + E),
    o &&
      l &&
      (t.effect === 'slide' || t.effect === 'coverflow') &&
      (s.style.width = `${i.virtualSize + c}px`),
    t.setWrapperSize &&
      (s.style[i.getDirectionLabel('width')] = `${i.virtualSize + c}px`),
    A && i.grid.updateWrapperSize(z, g),
    !t.centeredSlides)
  ) {
    const C = [];
    for (let P = 0; P < g.length; P += 1) {
      let T = g[P];
      t.roundLengths && (T = Math.floor(T)),
        g[P] <= i.virtualSize - r && C.push(T);
    }
    (g = C),
      Math.floor(i.virtualSize - r) - Math.floor(g[g.length - 1]) > 1 &&
        g.push(i.virtualSize - r);
  }
  if (a && t.loop) {
    const C = h[0] + c;
    if (t.slidesPerGroup > 1) {
      const P = Math.ceil(
          (i.virtual.slidesBefore + i.virtual.slidesAfter) / t.slidesPerGroup,
        ),
        T = C * t.slidesPerGroup;
      for (let S = 0; S < P; S += 1) g.push(g[g.length - 1] + T);
    }
    for (let P = 0; P < i.virtual.slidesBefore + i.virtual.slidesAfter; P += 1)
      t.slidesPerGroup === 1 && g.push(g[g.length - 1] + C),
        m.push(m[m.length - 1] + C),
        (i.virtualSize += C);
  }
  if ((g.length === 0 && (g = [0]), c !== 0)) {
    const C =
      i.isHorizontal() && o ? 'marginLeft' : i.getDirectionLabel('marginRight');
    f.filter((P, T) =>
      !t.cssMode || t.loop ? !0 : T !== f.length - 1,
    ).forEach((P) => {
      P.style[C] = `${c}px`;
    });
  }
  if (t.centeredSlides && t.centeredSlidesBounds) {
    let C = 0;
    h.forEach((T) => {
      C += T + (c || 0);
    }),
      (C -= c);
    const P = C > r ? C - r : 0;
    g = g.map((T) => (T <= 0 ? -v : T > P ? P + E : T));
  }
  if (t.centerInsufficientSlides) {
    let C = 0;
    h.forEach((T) => {
      C += T + (c || 0);
    }),
      (C -= c);
    const P = (t.slidesOffsetBefore || 0) + (t.slidesOffsetAfter || 0);
    if (C + P < r) {
      const T = (r - C - P) / 2;
      g.forEach((S, x) => {
        g[x] = S - T;
      }),
        m.forEach((S, x) => {
          m[x] = S + T;
        });
    }
  }
  if (
    (Object.assign(i, {
      slides: f,
      snapGrid: g,
      slidesGrid: m,
      slidesSizesGrid: h,
    }),
    t.centeredSlides && t.cssMode && !t.centeredSlidesBounds)
  ) {
    Y(s, '--swiper-centered-offset-before', `${-g[0]}px`),
      Y(
        s,
        '--swiper-centered-offset-after',
        `${i.size / 2 - h[h.length - 1] / 2}px`,
      );
    const C = -i.snapGrid[0],
      P = -i.slidesGrid[0];
    (i.snapGrid = i.snapGrid.map((T) => T + C)),
      (i.slidesGrid = i.slidesGrid.map((T) => T + P));
  }
  if (
    (p !== u && i.emit('slidesLengthChange'),
    g.length !== y &&
      (i.params.watchOverflow && i.checkOverflow(),
      i.emit('snapGridLengthChange')),
    m.length !== d && i.emit('slidesGridLengthChange'),
    t.watchSlidesProgress && i.updateSlidesOffset(),
    i.emit('slidesUpdated'),
    !a && !t.cssMode && (t.effect === 'slide' || t.effect === 'fade'))
  ) {
    const C = `${t.containerModifierClass}backface-hidden`,
      P = i.el.classList.contains(C);
    p <= t.maxBackfaceHiddenSlides
      ? P || i.el.classList.add(C)
      : P && i.el.classList.remove(C);
  }
}
function Ye(i) {
  const e = this,
    t = [],
    s = e.virtual && e.params.virtual.enabled;
  let n = 0,
    r;
  typeof i == 'number'
    ? e.setTransition(i)
    : i === !0 && e.setTransition(e.params.speed);
  const o = (l) => (s ? e.slides[e.getSlideIndexByData(l)] : e.slides[l]);
  if (e.params.slidesPerView !== 'auto' && e.params.slidesPerView > 1)
    if (e.params.centeredSlides)
      (e.visibleSlides || []).forEach((l) => {
        t.push(l);
      });
    else
      for (r = 0; r < Math.ceil(e.params.slidesPerView); r += 1) {
        const l = e.activeIndex + r;
        if (l > e.slides.length && !s) break;
        t.push(o(l));
      }
  else t.push(o(e.activeIndex));
  for (r = 0; r < t.length; r += 1)
    if (typeof t[r] < 'u') {
      const l = t[r].offsetHeight;
      n = l > n ? l : n;
    }
  (n || n === 0) && (e.wrapperEl.style.height = `${n}px`);
}
function Xe() {
  const i = this,
    e = i.slides,
    t = i.isElement
      ? i.isHorizontal()
        ? i.wrapperEl.offsetLeft
        : i.wrapperEl.offsetTop
      : 0;
  for (let s = 0; s < e.length; s += 1)
    e[s].swiperSlideOffset =
      (i.isHorizontal() ? e[s].offsetLeft : e[s].offsetTop) -
      t -
      i.cssOverflowAdjustment();
}
const ue = (i, e, t) => {
  e && !i.classList.contains(t)
    ? i.classList.add(t)
    : !e && i.classList.contains(t) && i.classList.remove(t);
};
function Ue(i) {
  i === void 0 && (i = (this && this.translate) || 0);
  const e = this,
    t = e.params,
    { slides: s, rtlTranslate: n, snapGrid: r } = e;
  if (s.length === 0) return;
  typeof s[0].swiperSlideOffset > 'u' && e.updateSlidesOffset();
  let o = -i;
  n && (o = i), (e.visibleSlidesIndexes = []), (e.visibleSlides = []);
  let l = t.spaceBetween;
  typeof l == 'string' && l.indexOf('%') >= 0
    ? (l = (parseFloat(l.replace('%', '')) / 100) * e.size)
    : typeof l == 'string' && (l = parseFloat(l));
  for (let a = 0; a < s.length; a += 1) {
    const u = s[a];
    let f = u.swiperSlideOffset;
    t.cssMode && t.centeredSlides && (f -= s[0].swiperSlideOffset);
    const p =
        (o + (t.centeredSlides ? e.minTranslate() : 0) - f) /
        (u.swiperSlideSize + l),
      g =
        (o - r[0] + (t.centeredSlides ? e.minTranslate() : 0) - f) /
        (u.swiperSlideSize + l),
      m = -(o - f),
      h = m + e.slidesSizesGrid[a],
      v = m >= 0 && m <= e.size - e.slidesSizesGrid[a],
      E =
        (m >= 0 && m < e.size - 1) ||
        (h > 1 && h <= e.size) ||
        (m <= 0 && h >= e.size);
    E && (e.visibleSlides.push(u), e.visibleSlidesIndexes.push(a)),
      ue(u, E, t.slideVisibleClass),
      ue(u, v, t.slideFullyVisibleClass),
      (u.progress = n ? -p : p),
      (u.originalProgress = n ? -g : g);
  }
}
function Ke(i) {
  const e = this;
  if (typeof i > 'u') {
    const f = e.rtlTranslate ? -1 : 1;
    i = (e && e.translate && e.translate * f) || 0;
  }
  const t = e.params,
    s = e.maxTranslate() - e.minTranslate();
  let { progress: n, isBeginning: r, isEnd: o, progressLoop: l } = e;
  const a = r,
    u = o;
  if (s === 0) (n = 0), (r = !0), (o = !0);
  else {
    n = (i - e.minTranslate()) / s;
    const f = Math.abs(i - e.minTranslate()) < 1,
      p = Math.abs(i - e.maxTranslate()) < 1;
    (r = f || n <= 0), (o = p || n >= 1), f && (n = 0), p && (n = 1);
  }
  if (t.loop) {
    const f = e.getSlideIndexByData(0),
      p = e.getSlideIndexByData(e.slides.length - 1),
      g = e.slidesGrid[f],
      m = e.slidesGrid[p],
      h = e.slidesGrid[e.slidesGrid.length - 1],
      v = Math.abs(i);
    v >= g ? (l = (v - g) / h) : (l = (v + h - m) / h), l > 1 && (l -= 1);
  }
  Object.assign(e, { progress: n, progressLoop: l, isBeginning: r, isEnd: o }),
    (t.watchSlidesProgress || (t.centeredSlides && t.autoHeight)) &&
      e.updateSlidesProgress(i),
    r && !a && e.emit('reachBeginning toEdge'),
    o && !u && e.emit('reachEnd toEdge'),
    ((a && !r) || (u && !o)) && e.emit('fromEdge'),
    e.emit('progress', n);
}
const ie = (i, e, t) => {
  e && !i.classList.contains(t)
    ? i.classList.add(t)
    : !e && i.classList.contains(t) && i.classList.remove(t);
};
function Je() {
  const i = this,
    { slides: e, params: t, slidesEl: s, activeIndex: n } = i,
    r = i.virtual && t.virtual.enabled,
    o = i.grid && t.grid && t.grid.rows > 1,
    l = (p) => H(s, `.${t.slideClass}${p}, swiper-slide${p}`)[0];
  let a, u, f;
  if (r)
    if (t.loop) {
      let p = n - i.virtual.slidesBefore;
      p < 0 && (p = i.virtual.slides.length + p),
        p >= i.virtual.slides.length && (p -= i.virtual.slides.length),
        (a = l(`[data-swiper-slide-index="${p}"]`));
    } else a = l(`[data-swiper-slide-index="${n}"]`);
  else
    o
      ? ((a = e.filter((p) => p.column === n)[0]),
        (f = e.filter((p) => p.column === n + 1)[0]),
        (u = e.filter((p) => p.column === n - 1)[0]))
      : (a = e[n]);
  a &&
    (o ||
      ((f = $e(a, `.${t.slideClass}, swiper-slide`)[0]),
      t.loop && !f && (f = e[0]),
      (u = Be(a, `.${t.slideClass}, swiper-slide`)[0]),
      t.loop && !u === 0 && (u = e[e.length - 1]))),
    e.forEach((p) => {
      ie(p, p === a, t.slideActiveClass),
        ie(p, p === f, t.slideNextClass),
        ie(p, p === u, t.slidePrevClass);
    }),
    i.emitSlidesClasses();
}
const X = (i, e) => {
    if (!i || i.destroyed || !i.params) return;
    const t = () => (i.isElement ? 'swiper-slide' : `.${i.params.slideClass}`),
      s = e.closest(t());
    if (s) {
      let n = s.querySelector(`.${i.params.lazyPreloaderClass}`);
      !n &&
        i.isElement &&
        (s.shadowRoot
          ? (n = s.shadowRoot.querySelector(`.${i.params.lazyPreloaderClass}`))
          : requestAnimationFrame(() => {
              s.shadowRoot &&
                ((n = s.shadowRoot.querySelector(
                  `.${i.params.lazyPreloaderClass}`,
                )),
                n && n.remove());
            })),
        n && n.remove();
    }
  },
  se = (i, e) => {
    if (!i.slides[e]) return;
    const t = i.slides[e].querySelector('[loading="lazy"]');
    t && t.removeAttribute('loading');
  },
  le = (i) => {
    if (!i || i.destroyed || !i.params) return;
    let e = i.params.lazyPreloadPrevNext;
    const t = i.slides.length;
    if (!t || !e || e < 0) return;
    e = Math.min(e, t);
    const s =
        i.params.slidesPerView === 'auto'
          ? i.slidesPerViewDynamic()
          : Math.ceil(i.params.slidesPerView),
      n = i.activeIndex;
    if (i.params.grid && i.params.grid.rows > 1) {
      const o = n,
        l = [o - e];
      l.push(...Array.from({ length: e }).map((a, u) => o + s + u)),
        i.slides.forEach((a, u) => {
          l.includes(a.column) && se(i, u);
        });
      return;
    }
    const r = n + s - 1;
    if (i.params.rewind || i.params.loop)
      for (let o = n - e; o <= r + e; o += 1) {
        const l = ((o % t) + t) % t;
        (l < n || l > r) && se(i, l);
      }
    else
      for (let o = Math.max(n - e, 0); o <= Math.min(r + e, t - 1); o += 1)
        o !== n && (o > r || o < n) && se(i, o);
  };
function Qe(i) {
  const { slidesGrid: e, params: t } = i,
    s = i.rtlTranslate ? i.translate : -i.translate;
  let n;
  for (let r = 0; r < e.length; r += 1)
    typeof e[r + 1] < 'u'
      ? s >= e[r] && s < e[r + 1] - (e[r + 1] - e[r]) / 2
        ? (n = r)
        : s >= e[r] && s < e[r + 1] && (n = r + 1)
      : s >= e[r] && (n = r);
  return t.normalizeSlideIndex && (n < 0 || typeof n > 'u') && (n = 0), n;
}
function Ze(i) {
  const e = this,
    t = e.rtlTranslate ? e.translate : -e.translate,
    { snapGrid: s, params: n, activeIndex: r, realIndex: o, snapIndex: l } = e;
  let a = i,
    u;
  const f = (m) => {
    let h = m - e.virtual.slidesBefore;
    return (
      h < 0 && (h = e.virtual.slides.length + h),
      h >= e.virtual.slides.length && (h -= e.virtual.slides.length),
      h
    );
  };
  if ((typeof a > 'u' && (a = Qe(e)), s.indexOf(t) >= 0)) u = s.indexOf(t);
  else {
    const m = Math.min(n.slidesPerGroupSkip, a);
    u = m + Math.floor((a - m) / n.slidesPerGroup);
  }
  if ((u >= s.length && (u = s.length - 1), a === r && !e.params.loop)) {
    u !== l && ((e.snapIndex = u), e.emit('snapIndexChange'));
    return;
  }
  if (a === r && e.params.loop && e.virtual && e.params.virtual.enabled) {
    e.realIndex = f(a);
    return;
  }
  const p = e.grid && n.grid && n.grid.rows > 1;
  let g;
  if (e.virtual && n.virtual.enabled && n.loop) g = f(a);
  else if (p) {
    const m = e.slides.filter((v) => v.column === a)[0];
    let h = parseInt(m.getAttribute('data-swiper-slide-index'), 10);
    Number.isNaN(h) && (h = Math.max(e.slides.indexOf(m), 0)),
      (g = Math.floor(h / n.grid.rows));
  } else if (e.slides[a]) {
    const m = e.slides[a].getAttribute('data-swiper-slide-index');
    m ? (g = parseInt(m, 10)) : (g = a);
  } else g = a;
  Object.assign(e, {
    previousSnapIndex: l,
    snapIndex: u,
    previousRealIndex: o,
    realIndex: g,
    previousIndex: r,
    activeIndex: a,
  }),
    e.initialized && le(e),
    e.emit('activeIndexChange'),
    e.emit('snapIndexChange'),
    (e.initialized || e.params.runCallbacksOnInit) &&
      (o !== g && e.emit('realIndexChange'), e.emit('slideChange'));
}
function et(i, e) {
  const t = this,
    s = t.params;
  let n = i.closest(`.${s.slideClass}, swiper-slide`);
  !n &&
    t.isElement &&
    e &&
    e.length > 1 &&
    e.includes(i) &&
    [...e.slice(e.indexOf(i) + 1, e.length)].forEach((l) => {
      !n && l.matches && l.matches(`.${s.slideClass}, swiper-slide`) && (n = l);
    });
  let r = !1,
    o;
  if (n) {
    for (let l = 0; l < t.slides.length; l += 1)
      if (t.slides[l] === n) {
        (r = !0), (o = l);
        break;
      }
  }
  if (n && r)
    (t.clickedSlide = n),
      t.virtual && t.params.virtual.enabled
        ? (t.clickedIndex = parseInt(
            n.getAttribute('data-swiper-slide-index'),
            10,
          ))
        : (t.clickedIndex = o);
  else {
    (t.clickedSlide = void 0), (t.clickedIndex = void 0);
    return;
  }
  s.slideToClickedSlide &&
    t.clickedIndex !== void 0 &&
    t.clickedIndex !== t.activeIndex &&
    t.slideToClickedSlide();
}
var tt = {
  updateSize: qe,
  updateSlides: je,
  updateAutoHeight: Ye,
  updateSlidesOffset: Xe,
  updateSlidesProgress: Ue,
  updateProgress: Ke,
  updateSlidesClasses: Je,
  updateActiveIndex: Ze,
  updateClickedSlide: et,
};
function it(i) {
  i === void 0 && (i = this.isHorizontal() ? 'x' : 'y');
  const e = this,
    { params: t, rtlTranslate: s, translate: n, wrapperEl: r } = e;
  if (t.virtualTranslate) return s ? -n : n;
  if (t.cssMode) return n;
  let o = Ae(r, i);
  return (o += e.cssOverflowAdjustment()), s && (o = -o), o || 0;
}
function st(i, e) {
  const t = this,
    { rtlTranslate: s, params: n, wrapperEl: r, progress: o } = t;
  let l = 0,
    a = 0;
  const u = 0;
  t.isHorizontal() ? (l = s ? -i : i) : (a = i),
    n.roundLengths && ((l = Math.floor(l)), (a = Math.floor(a))),
    (t.previousTranslate = t.translate),
    (t.translate = t.isHorizontal() ? l : a),
    n.cssMode
      ? (r[t.isHorizontal() ? 'scrollLeft' : 'scrollTop'] = t.isHorizontal()
          ? -l
          : -a)
      : n.virtualTranslate ||
        (t.isHorizontal()
          ? (l -= t.cssOverflowAdjustment())
          : (a -= t.cssOverflowAdjustment()),
        (r.style.transform = `translate3d(${l}px, ${a}px, ${u}px)`));
  let f;
  const p = t.maxTranslate() - t.minTranslate();
  p === 0 ? (f = 0) : (f = (i - t.minTranslate()) / p),
    f !== o && t.updateProgress(i),
    t.emit('setTranslate', t.translate, e);
}
function rt() {
  return -this.snapGrid[0];
}
function nt() {
  return -this.snapGrid[this.snapGrid.length - 1];
}
function at(i, e, t, s, n) {
  i === void 0 && (i = 0),
    e === void 0 && (e = this.params.speed),
    t === void 0 && (t = !0),
    s === void 0 && (s = !0);
  const r = this,
    { params: o, wrapperEl: l } = r;
  if (r.animating && o.preventInteractionOnTransition) return !1;
  const a = r.minTranslate(),
    u = r.maxTranslate();
  let f;
  if (
    (s && i > a ? (f = a) : s && i < u ? (f = u) : (f = i),
    r.updateProgress(f),
    o.cssMode)
  ) {
    const p = r.isHorizontal();
    if (e === 0) l[p ? 'scrollLeft' : 'scrollTop'] = -f;
    else {
      if (!r.support.smoothScroll)
        return (
          we({ swiper: r, targetPosition: -f, side: p ? 'left' : 'top' }), !0
        );
      l.scrollTo({ [p ? 'left' : 'top']: -f, behavior: 'smooth' });
    }
    return !0;
  }
  return (
    e === 0
      ? (r.setTransition(0),
        r.setTranslate(f),
        t && (r.emit('beforeTransitionStart', e, n), r.emit('transitionEnd')))
      : (r.setTransition(e),
        r.setTranslate(f),
        t && (r.emit('beforeTransitionStart', e, n), r.emit('transitionStart')),
        r.animating ||
          ((r.animating = !0),
          r.onTranslateToWrapperTransitionEnd ||
            (r.onTranslateToWrapperTransitionEnd = function (g) {
              !r ||
                r.destroyed ||
                (g.target === this &&
                  (r.wrapperEl.removeEventListener(
                    'transitionend',
                    r.onTranslateToWrapperTransitionEnd,
                  ),
                  (r.onTranslateToWrapperTransitionEnd = null),
                  delete r.onTranslateToWrapperTransitionEnd,
                  (r.animating = !1),
                  t && r.emit('transitionEnd')));
            }),
          r.wrapperEl.addEventListener(
            'transitionend',
            r.onTranslateToWrapperTransitionEnd,
          ))),
    !0
  );
}
var lt = {
  getTranslate: it,
  setTranslate: st,
  minTranslate: rt,
  maxTranslate: nt,
  translateTo: at,
};
function ot(i, e) {
  const t = this;
  t.params.cssMode ||
    ((t.wrapperEl.style.transitionDuration = `${i}ms`),
    (t.wrapperEl.style.transitionDelay = i === 0 ? '0ms' : '')),
    t.emit('setTransition', i, e);
}
function Te(i) {
  let { swiper: e, runCallbacks: t, direction: s, step: n } = i;
  const { activeIndex: r, previousIndex: o } = e;
  let l = s;
  if (
    (l || (r > o ? (l = 'next') : r < o ? (l = 'prev') : (l = 'reset')),
    e.emit(`transition${n}`),
    t && r !== o)
  ) {
    if (l === 'reset') {
      e.emit(`slideResetTransition${n}`);
      return;
    }
    e.emit(`slideChangeTransition${n}`),
      l === 'next'
        ? e.emit(`slideNextTransition${n}`)
        : e.emit(`slidePrevTransition${n}`);
  }
}
function dt(i, e) {
  i === void 0 && (i = !0);
  const t = this,
    { params: s } = t;
  s.cssMode ||
    (s.autoHeight && t.updateAutoHeight(),
    Te({ swiper: t, runCallbacks: i, direction: e, step: 'Start' }));
}
function ct(i, e) {
  i === void 0 && (i = !0);
  const t = this,
    { params: s } = t;
  (t.animating = !1),
    !s.cssMode &&
      (t.setTransition(0),
      Te({ swiper: t, runCallbacks: i, direction: e, step: 'End' }));
}
var ft = { setTransition: ot, transitionStart: dt, transitionEnd: ct };
function ut(i, e, t, s, n) {
  i === void 0 && (i = 0),
    t === void 0 && (t = !0),
    typeof i == 'string' && (i = parseInt(i, 10));
  const r = this;
  let o = i;
  o < 0 && (o = 0);
  const {
    params: l,
    snapGrid: a,
    slidesGrid: u,
    previousIndex: f,
    activeIndex: p,
    rtlTranslate: g,
    wrapperEl: m,
    enabled: h,
  } = r;
  if (
    (!h && !s && !n) ||
    r.destroyed ||
    (r.animating && l.preventInteractionOnTransition)
  )
    return !1;
  typeof e > 'u' && (e = r.params.speed);
  const v = Math.min(r.params.slidesPerGroupSkip, o);
  let E = v + Math.floor((o - v) / r.params.slidesPerGroup);
  E >= a.length && (E = a.length - 1);
  const y = -a[E];
  if (l.normalizeSlideIndex)
    for (let b = 0; b < u.length; b += 1) {
      const L = -Math.floor(y * 100),
        A = Math.floor(u[b] * 100),
        z = Math.floor(u[b + 1] * 100);
      typeof u[b + 1] < 'u'
        ? L >= A && L < z - (z - A) / 2
          ? (o = b)
          : L >= A && L < z && (o = b + 1)
        : L >= A && (o = b);
    }
  if (
    r.initialized &&
    o !== p &&
    ((!r.allowSlideNext &&
      (g
        ? y > r.translate && y > r.minTranslate()
        : y < r.translate && y < r.minTranslate())) ||
      (!r.allowSlidePrev &&
        y > r.translate &&
        y > r.maxTranslate() &&
        (p || 0) !== o))
  )
    return !1;
  o !== (f || 0) && t && r.emit('beforeSlideChangeStart'), r.updateProgress(y);
  let d;
  o > p ? (d = 'next') : o < p ? (d = 'prev') : (d = 'reset');
  const c = r.virtual && r.params.virtual.enabled;
  if (!(c && n) && ((g && -y === r.translate) || (!g && y === r.translate)))
    return (
      r.updateActiveIndex(o),
      l.autoHeight && r.updateAutoHeight(),
      r.updateSlidesClasses(),
      l.effect !== 'slide' && r.setTranslate(y),
      d !== 'reset' && (r.transitionStart(t, d), r.transitionEnd(t, d)),
      !1
    );
  if (l.cssMode) {
    const b = r.isHorizontal(),
      L = g ? y : -y;
    if (e === 0)
      c &&
        ((r.wrapperEl.style.scrollSnapType = 'none'),
        (r._immediateVirtual = !0)),
        c && !r._cssModeVirtualInitialSet && r.params.initialSlide > 0
          ? ((r._cssModeVirtualInitialSet = !0),
            requestAnimationFrame(() => {
              m[b ? 'scrollLeft' : 'scrollTop'] = L;
            }))
          : (m[b ? 'scrollLeft' : 'scrollTop'] = L),
        c &&
          requestAnimationFrame(() => {
            (r.wrapperEl.style.scrollSnapType = ''), (r._immediateVirtual = !1);
          });
    else {
      if (!r.support.smoothScroll)
        return (
          we({ swiper: r, targetPosition: L, side: b ? 'left' : 'top' }), !0
        );
      m.scrollTo({ [b ? 'left' : 'top']: L, behavior: 'smooth' });
    }
    return !0;
  }
  return (
    r.setTransition(e),
    r.setTranslate(y),
    r.updateActiveIndex(o),
    r.updateSlidesClasses(),
    r.emit('beforeTransitionStart', e, s),
    r.transitionStart(t, d),
    e === 0
      ? r.transitionEnd(t, d)
      : r.animating ||
        ((r.animating = !0),
        r.onSlideToWrapperTransitionEnd ||
          (r.onSlideToWrapperTransitionEnd = function (L) {
            !r ||
              r.destroyed ||
              (L.target === this &&
                (r.wrapperEl.removeEventListener(
                  'transitionend',
                  r.onSlideToWrapperTransitionEnd,
                ),
                (r.onSlideToWrapperTransitionEnd = null),
                delete r.onSlideToWrapperTransitionEnd,
                r.transitionEnd(t, d)));
          }),
        r.wrapperEl.addEventListener(
          'transitionend',
          r.onSlideToWrapperTransitionEnd,
        )),
    !0
  );
}
function pt(i, e, t, s) {
  i === void 0 && (i = 0),
    t === void 0 && (t = !0),
    typeof i == 'string' && (i = parseInt(i, 10));
  const n = this;
  if (n.destroyed) return;
  typeof e > 'u' && (e = n.params.speed);
  const r = n.grid && n.params.grid && n.params.grid.rows > 1;
  let o = i;
  if (n.params.loop)
    if (n.virtual && n.params.virtual.enabled) o = o + n.virtual.slidesBefore;
    else {
      let l;
      if (r) {
        const g = o * n.params.grid.rows;
        l = n.slides.filter(
          (m) => m.getAttribute('data-swiper-slide-index') * 1 === g,
        )[0].column;
      } else l = n.getSlideIndexByData(o);
      const a = r
          ? Math.ceil(n.slides.length / n.params.grid.rows)
          : n.slides.length,
        { centeredSlides: u } = n.params;
      let f = n.params.slidesPerView;
      f === 'auto'
        ? (f = n.slidesPerViewDynamic())
        : ((f = Math.ceil(parseFloat(n.params.slidesPerView, 10))),
          u && f % 2 === 0 && (f = f + 1));
      let p = a - l < f;
      if (
        (u && (p = p || l < Math.ceil(f / 2)),
        s && u && n.params.slidesPerView !== 'auto' && !r && (p = !1),
        p)
      ) {
        const g = u
          ? l < n.activeIndex
            ? 'prev'
            : 'next'
          : l - n.activeIndex - 1 < n.params.slidesPerView
          ? 'next'
          : 'prev';
        n.loopFix({
          direction: g,
          slideTo: !0,
          activeSlideIndex: g === 'next' ? l + 1 : l - a + 1,
          slideRealIndex: g === 'next' ? n.realIndex : void 0,
        });
      }
      if (r) {
        const g = o * n.params.grid.rows;
        o = n.slides.filter(
          (m) => m.getAttribute('data-swiper-slide-index') * 1 === g,
        )[0].column;
      } else o = n.getSlideIndexByData(o);
    }
  return (
    requestAnimationFrame(() => {
      n.slideTo(o, e, t, s);
    }),
    n
  );
}
function mt(i, e, t) {
  e === void 0 && (e = !0);
  const s = this,
    { enabled: n, params: r, animating: o } = s;
  if (!n || s.destroyed) return s;
  typeof i > 'u' && (i = s.params.speed);
  let l = r.slidesPerGroup;
  r.slidesPerView === 'auto' &&
    r.slidesPerGroup === 1 &&
    r.slidesPerGroupAuto &&
    (l = Math.max(s.slidesPerViewDynamic('current', !0), 1));
  const a = s.activeIndex < r.slidesPerGroupSkip ? 1 : l,
    u = s.virtual && r.virtual.enabled;
  if (r.loop) {
    if (o && !u && r.loopPreventsSliding) return !1;
    if (
      (s.loopFix({ direction: 'next' }),
      (s._clientLeft = s.wrapperEl.clientLeft),
      s.activeIndex === s.slides.length - 1 && r.cssMode)
    )
      return (
        requestAnimationFrame(() => {
          s.slideTo(s.activeIndex + a, i, e, t);
        }),
        !0
      );
  }
  return r.rewind && s.isEnd
    ? s.slideTo(0, i, e, t)
    : s.slideTo(s.activeIndex + a, i, e, t);
}
function ht(i, e, t) {
  e === void 0 && (e = !0);
  const s = this,
    {
      params: n,
      snapGrid: r,
      slidesGrid: o,
      rtlTranslate: l,
      enabled: a,
      animating: u,
    } = s;
  if (!a || s.destroyed) return s;
  typeof i > 'u' && (i = s.params.speed);
  const f = s.virtual && n.virtual.enabled;
  if (n.loop) {
    if (u && !f && n.loopPreventsSliding) return !1;
    s.loopFix({ direction: 'prev' }), (s._clientLeft = s.wrapperEl.clientLeft);
  }
  const p = l ? s.translate : -s.translate;
  function g(y) {
    return y < 0 ? -Math.floor(Math.abs(y)) : Math.floor(y);
  }
  const m = g(p),
    h = r.map((y) => g(y));
  let v = r[h.indexOf(m) - 1];
  if (typeof v > 'u' && n.cssMode) {
    let y;
    r.forEach((d, c) => {
      m >= d && (y = c);
    }),
      typeof y < 'u' && (v = r[y > 0 ? y - 1 : y]);
  }
  let E = 0;
  if (
    (typeof v < 'u' &&
      ((E = o.indexOf(v)),
      E < 0 && (E = s.activeIndex - 1),
      n.slidesPerView === 'auto' &&
        n.slidesPerGroup === 1 &&
        n.slidesPerGroupAuto &&
        ((E = E - s.slidesPerViewDynamic('previous', !0) + 1),
        (E = Math.max(E, 0)))),
    n.rewind && s.isBeginning)
  ) {
    const y =
      s.params.virtual && s.params.virtual.enabled && s.virtual
        ? s.virtual.slides.length - 1
        : s.slides.length - 1;
    return s.slideTo(y, i, e, t);
  } else if (n.loop && s.activeIndex === 0 && n.cssMode)
    return (
      requestAnimationFrame(() => {
        s.slideTo(E, i, e, t);
      }),
      !0
    );
  return s.slideTo(E, i, e, t);
}
function gt(i, e, t) {
  e === void 0 && (e = !0);
  const s = this;
  if (!s.destroyed)
    return (
      typeof i > 'u' && (i = s.params.speed), s.slideTo(s.activeIndex, i, e, t)
    );
}
function vt(i, e, t, s) {
  e === void 0 && (e = !0), s === void 0 && (s = 0.5);
  const n = this;
  if (n.destroyed) return;
  typeof i > 'u' && (i = n.params.speed);
  let r = n.activeIndex;
  const o = Math.min(n.params.slidesPerGroupSkip, r),
    l = o + Math.floor((r - o) / n.params.slidesPerGroup),
    a = n.rtlTranslate ? n.translate : -n.translate;
  if (a >= n.snapGrid[l]) {
    const u = n.snapGrid[l],
      f = n.snapGrid[l + 1];
    a - u > (f - u) * s && (r += n.params.slidesPerGroup);
  } else {
    const u = n.snapGrid[l - 1],
      f = n.snapGrid[l];
    a - u <= (f - u) * s && (r -= n.params.slidesPerGroup);
  }
  return (
    (r = Math.max(r, 0)),
    (r = Math.min(r, n.slidesGrid.length - 1)),
    n.slideTo(r, i, e, t)
  );
}
function wt() {
  const i = this;
  if (i.destroyed) return;
  const { params: e, slidesEl: t } = i,
    s = e.slidesPerView === 'auto' ? i.slidesPerViewDynamic() : e.slidesPerView;
  let n = i.clickedIndex,
    r;
  const o = i.isElement ? 'swiper-slide' : `.${e.slideClass}`;
  if (e.loop) {
    if (i.animating) return;
    (r = parseInt(i.clickedSlide.getAttribute('data-swiper-slide-index'), 10)),
      e.centeredSlides
        ? n < i.loopedSlides - s / 2 ||
          n > i.slides.length - i.loopedSlides + s / 2
          ? (i.loopFix(),
            (n = i.getSlideIndex(
              H(t, `${o}[data-swiper-slide-index="${r}"]`)[0],
            )),
            U(() => {
              i.slideTo(n);
            }))
          : i.slideTo(n)
        : n > i.slides.length - s
        ? (i.loopFix(),
          (n = i.getSlideIndex(
            H(t, `${o}[data-swiper-slide-index="${r}"]`)[0],
          )),
          U(() => {
            i.slideTo(n);
          }))
        : i.slideTo(n);
  } else i.slideTo(n);
}
var bt = {
  slideTo: ut,
  slideToLoop: pt,
  slideNext: mt,
  slidePrev: ht,
  slideReset: gt,
  slideToClosest: vt,
  slideToClickedSlide: wt,
};
function St(i) {
  const e = this,
    { params: t, slidesEl: s } = e;
  if (!t.loop || (e.virtual && e.params.virtual.enabled)) return;
  const n = () => {
      H(s, `.${t.slideClass}, swiper-slide`).forEach((p, g) => {
        p.setAttribute('data-swiper-slide-index', g);
      });
    },
    r = e.grid && t.grid && t.grid.rows > 1,
    o = t.slidesPerGroup * (r ? t.grid.rows : 1),
    l = e.slides.length % o !== 0,
    a = r && e.slides.length % t.grid.rows !== 0,
    u = (f) => {
      for (let p = 0; p < f; p += 1) {
        const g = e.isElement
          ? q('swiper-slide', [t.slideBlankClass])
          : q('div', [t.slideClass, t.slideBlankClass]);
        e.slidesEl.append(g);
      }
    };
  if (l) {
    if (t.loopAddBlankSlides) {
      const f = o - (e.slides.length % o);
      u(f), e.recalcSlides(), e.updateSlides();
    } else
      J(
        'Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)',
      );
    n();
  } else if (a) {
    if (t.loopAddBlankSlides) {
      const f = t.grid.rows - (e.slides.length % t.grid.rows);
      u(f), e.recalcSlides(), e.updateSlides();
    } else
      J(
        'Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)',
      );
    n();
  } else n();
  e.loopFix({
    slideRealIndex: i,
    direction: t.centeredSlides ? void 0 : 'next',
  });
}
function yt(i) {
  let {
    slideRealIndex: e,
    slideTo: t = !0,
    direction: s,
    setTranslate: n,
    activeSlideIndex: r,
    byController: o,
    byMousewheel: l,
  } = i === void 0 ? {} : i;
  const a = this;
  if (!a.params.loop) return;
  a.emit('beforeLoopFix');
  const {
      slides: u,
      allowSlidePrev: f,
      allowSlideNext: p,
      slidesEl: g,
      params: m,
    } = a,
    { centeredSlides: h } = m;
  if (
    ((a.allowSlidePrev = !0),
    (a.allowSlideNext = !0),
    a.virtual && m.virtual.enabled)
  ) {
    t &&
      (!m.centeredSlides && a.snapIndex === 0
        ? a.slideTo(a.virtual.slides.length, 0, !1, !0)
        : m.centeredSlides && a.snapIndex < m.slidesPerView
        ? a.slideTo(a.virtual.slides.length + a.snapIndex, 0, !1, !0)
        : a.snapIndex === a.snapGrid.length - 1 &&
          a.slideTo(a.virtual.slidesBefore, 0, !1, !0)),
      (a.allowSlidePrev = f),
      (a.allowSlideNext = p),
      a.emit('loopFix');
    return;
  }
  let v = m.slidesPerView;
  v === 'auto'
    ? (v = a.slidesPerViewDynamic())
    : ((v = Math.ceil(parseFloat(m.slidesPerView, 10))),
      h && v % 2 === 0 && (v = v + 1));
  const E = m.slidesPerGroupAuto ? v : m.slidesPerGroup;
  let y = E;
  y % E !== 0 && (y += E - (y % E)),
    (y += m.loopAdditionalSlides),
    (a.loopedSlides = y);
  const d = a.grid && m.grid && m.grid.rows > 1;
  u.length < v + y
    ? J(
        'Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled and not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters',
      )
    : d &&
      m.grid.fill === 'row' &&
      J(
        'Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`',
      );
  const c = [],
    w = [];
  let b = a.activeIndex;
  typeof r > 'u'
    ? (r = a.getSlideIndex(
        u.filter((S) => S.classList.contains(m.slideActiveClass))[0],
      ))
    : (b = r);
  const L = s === 'next' || !s,
    A = s === 'prev' || !s;
  let z = 0,
    O = 0;
  const C = d ? Math.ceil(u.length / m.grid.rows) : u.length,
    T = (d ? u[r].column : r) + (h && typeof n > 'u' ? -v / 2 + 0.5 : 0);
  if (T < y) {
    z = Math.max(y - T, E);
    for (let S = 0; S < y - T; S += 1) {
      const x = S - Math.floor(S / C) * C;
      if (d) {
        const M = C - x - 1;
        for (let I = u.length - 1; I >= 0; I -= 1)
          u[I].column === M && c.push(I);
      } else c.push(C - x - 1);
    }
  } else if (T + v > C - y) {
    O = Math.max(T - (C - y * 2), E);
    for (let S = 0; S < O; S += 1) {
      const x = S - Math.floor(S / C) * C;
      d
        ? u.forEach((M, I) => {
            M.column === x && w.push(I);
          })
        : w.push(x);
    }
  }
  if (
    ((a.__preventObserver__ = !0),
    requestAnimationFrame(() => {
      a.__preventObserver__ = !1;
    }),
    A &&
      c.forEach((S) => {
        (u[S].swiperLoopMoveDOM = !0),
          g.prepend(u[S]),
          (u[S].swiperLoopMoveDOM = !1);
      }),
    L &&
      w.forEach((S) => {
        (u[S].swiperLoopMoveDOM = !0),
          g.append(u[S]),
          (u[S].swiperLoopMoveDOM = !1);
      }),
    a.recalcSlides(),
    m.slidesPerView === 'auto'
      ? a.updateSlides()
      : d &&
        ((c.length > 0 && A) || (w.length > 0 && L)) &&
        a.slides.forEach((S, x) => {
          a.grid.updateSlide(x, S, a.slides);
        }),
    m.watchSlidesProgress && a.updateSlidesOffset(),
    t)
  ) {
    if (c.length > 0 && A) {
      if (typeof e > 'u') {
        const S = a.slidesGrid[b],
          M = a.slidesGrid[b + z] - S;
        l
          ? a.setTranslate(a.translate - M)
          : (a.slideTo(b + Math.ceil(z), 0, !1, !0),
            n &&
              ((a.touchEventsData.startTranslate =
                a.touchEventsData.startTranslate - M),
              (a.touchEventsData.currentTranslate =
                a.touchEventsData.currentTranslate - M)));
      } else if (n) {
        const S = d ? c.length / m.grid.rows : c.length;
        a.slideTo(a.activeIndex + S, 0, !1, !0),
          (a.touchEventsData.currentTranslate = a.translate);
      }
    } else if (w.length > 0 && L)
      if (typeof e > 'u') {
        const S = a.slidesGrid[b],
          M = a.slidesGrid[b - O] - S;
        l
          ? a.setTranslate(a.translate - M)
          : (a.slideTo(b - O, 0, !1, !0),
            n &&
              ((a.touchEventsData.startTranslate =
                a.touchEventsData.startTranslate - M),
              (a.touchEventsData.currentTranslate =
                a.touchEventsData.currentTranslate - M)));
      } else {
        const S = d ? w.length / m.grid.rows : w.length;
        a.slideTo(a.activeIndex - S, 0, !1, !0);
      }
  }
  if (
    ((a.allowSlidePrev = f),
    (a.allowSlideNext = p),
    a.controller && a.controller.control && !o)
  ) {
    const S = {
      slideRealIndex: e,
      direction: s,
      setTranslate: n,
      activeSlideIndex: r,
      byController: !0,
    };
    Array.isArray(a.controller.control)
      ? a.controller.control.forEach((x) => {
          !x.destroyed &&
            x.params.loop &&
            x.loopFix({
              ...S,
              slideTo: x.params.slidesPerView === m.slidesPerView ? t : !1,
            });
        })
      : a.controller.control instanceof a.constructor &&
        a.controller.control.params.loop &&
        a.controller.control.loopFix({
          ...S,
          slideTo:
            a.controller.control.params.slidesPerView === m.slidesPerView
              ? t
              : !1,
        });
  }
  a.emit('loopFix');
}
function Tt() {
  const i = this,
    { params: e, slidesEl: t } = i;
  if (!e.loop || (i.virtual && i.params.virtual.enabled)) return;
  i.recalcSlides();
  const s = [];
  i.slides.forEach((n) => {
    const r =
      typeof n.swiperSlideIndex > 'u'
        ? n.getAttribute('data-swiper-slide-index') * 1
        : n.swiperSlideIndex;
    s[r] = n;
  }),
    i.slides.forEach((n) => {
      n.removeAttribute('data-swiper-slide-index');
    }),
    s.forEach((n) => {
      t.append(n);
    }),
    i.recalcSlides(),
    i.slideTo(i.realIndex, 0);
}
var xt = { loopCreate: St, loopFix: yt, loopDestroy: Tt };
function Et(i) {
  const e = this;
  if (
    !e.params.simulateTouch ||
    (e.params.watchOverflow && e.isLocked) ||
    e.params.cssMode
  )
    return;
  const t = e.params.touchEventsTarget === 'container' ? e.el : e.wrapperEl;
  e.isElement && (e.__preventObserver__ = !0),
    (t.style.cursor = 'move'),
    (t.style.cursor = i ? 'grabbing' : 'grab'),
    e.isElement &&
      requestAnimationFrame(() => {
        e.__preventObserver__ = !1;
      });
}
function Ct() {
  const i = this;
  (i.params.watchOverflow && i.isLocked) ||
    i.params.cssMode ||
    (i.isElement && (i.__preventObserver__ = !0),
    (i[
      i.params.touchEventsTarget === 'container' ? 'el' : 'wrapperEl'
    ].style.cursor = ''),
    i.isElement &&
      requestAnimationFrame(() => {
        i.__preventObserver__ = !1;
      }));
}
var Mt = { setGrabCursor: Et, unsetGrabCursor: Ct };
function Pt(i, e) {
  e === void 0 && (e = this);
  function t(s) {
    if (!s || s === R() || s === G()) return null;
    s.assignedSlot && (s = s.assignedSlot);
    const n = s.closest(i);
    return !n && !s.getRootNode ? null : n || t(s.getRootNode().host);
  }
  return t(e);
}
function pe(i, e, t) {
  const s = G(),
    { params: n } = i,
    r = n.edgeSwipeDetection,
    o = n.edgeSwipeThreshold;
  return r && (t <= o || t >= s.innerWidth - o)
    ? r === 'prevent'
      ? (e.preventDefault(), !0)
      : !1
    : !0;
}
function Lt(i) {
  const e = this,
    t = R();
  let s = i;
  s.originalEvent && (s = s.originalEvent);
  const n = e.touchEventsData;
  if (s.type === 'pointerdown') {
    if (n.pointerId !== null && n.pointerId !== s.pointerId) return;
    n.pointerId = s.pointerId;
  } else
    s.type === 'touchstart' &&
      s.targetTouches.length === 1 &&
      (n.touchId = s.targetTouches[0].identifier);
  if (s.type === 'touchstart') {
    pe(e, s, s.targetTouches[0].pageX);
    return;
  }
  const { params: r, touches: o, enabled: l } = e;
  if (
    !l ||
    (!r.simulateTouch && s.pointerType === 'mouse') ||
    (e.animating && r.preventInteractionOnTransition)
  )
    return;
  !e.animating && r.cssMode && r.loop && e.loopFix();
  let a = s.target;
  if (
    (r.touchEventsTarget === 'wrapper' && !ke(a, e.wrapperEl)) ||
    ('which' in s && s.which === 3) ||
    ('button' in s && s.button > 0) ||
    (n.isTouched && n.isMoved)
  )
    return;
  const u = !!r.noSwipingClass && r.noSwipingClass !== '',
    f = s.composedPath ? s.composedPath() : s.path;
  u && s.target && s.target.shadowRoot && f && (a = f[0]);
  const p = r.noSwipingSelector ? r.noSwipingSelector : `.${r.noSwipingClass}`,
    g = !!(s.target && s.target.shadowRoot);
  if (r.noSwiping && (g ? Pt(p, a) : a.closest(p))) {
    e.allowClick = !0;
    return;
  }
  if (r.swipeHandler && !a.closest(r.swipeHandler)) return;
  (o.currentX = s.pageX), (o.currentY = s.pageY);
  const m = o.currentX,
    h = o.currentY;
  if (!pe(e, s, m)) return;
  Object.assign(n, {
    isTouched: !0,
    isMoved: !1,
    allowTouchCallbacks: !0,
    isScrolling: void 0,
    startMoving: void 0,
  }),
    (o.startX = m),
    (o.startY = h),
    (n.touchStartTime = K()),
    (e.allowClick = !0),
    e.updateSize(),
    (e.swipeDirection = void 0),
    r.threshold > 0 && (n.allowThresholdMove = !1);
  let v = !0;
  a.matches(n.focusableElements) &&
    ((v = !1), a.nodeName === 'SELECT' && (n.isTouched = !1)),
    t.activeElement &&
      t.activeElement.matches(n.focusableElements) &&
      t.activeElement !== a &&
      (s.pointerType === 'mouse' ||
        (s.pointerType !== 'mouse' && !a.matches(n.focusableElements))) &&
      t.activeElement.blur();
  const E = v && e.allowTouchMove && r.touchStartPreventDefault;
  (r.touchStartForcePreventDefault || E) &&
    !a.isContentEditable &&
    s.preventDefault(),
    r.freeMode &&
      r.freeMode.enabled &&
      e.freeMode &&
      e.animating &&
      !r.cssMode &&
      e.freeMode.onTouchStart(),
    e.emit('touchStart', s);
}
function It(i) {
  const e = R(),
    t = this,
    s = t.touchEventsData,
    { params: n, touches: r, rtlTranslate: o, enabled: l } = t;
  if (!l || (!n.simulateTouch && i.pointerType === 'mouse')) return;
  let a = i;
  if (
    (a.originalEvent && (a = a.originalEvent),
    a.type === 'pointermove' &&
      (s.touchId !== null || a.pointerId !== s.pointerId))
  )
    return;
  let u;
  if (a.type === 'touchmove') {
    if (
      ((u = [...a.changedTouches].filter((L) => L.identifier === s.touchId)[0]),
      !u || u.identifier !== s.touchId)
    )
      return;
  } else u = a;
  if (!s.isTouched) {
    s.startMoving && s.isScrolling && t.emit('touchMoveOpposite', a);
    return;
  }
  const f = u.pageX,
    p = u.pageY;
  if (a.preventedByNestedSwiper) {
    (r.startX = f), (r.startY = p);
    return;
  }
  if (!t.allowTouchMove) {
    a.target.matches(s.focusableElements) || (t.allowClick = !1),
      s.isTouched &&
        (Object.assign(r, { startX: f, startY: p, currentX: f, currentY: p }),
        (s.touchStartTime = K()));
    return;
  }
  if (n.touchReleaseOnEdges && !n.loop) {
    if (t.isVertical()) {
      if (
        (p < r.startY && t.translate <= t.maxTranslate()) ||
        (p > r.startY && t.translate >= t.minTranslate())
      ) {
        (s.isTouched = !1), (s.isMoved = !1);
        return;
      }
    } else if (
      (f < r.startX && t.translate <= t.maxTranslate()) ||
      (f > r.startX && t.translate >= t.minTranslate())
    )
      return;
  }
  if (
    (e.activeElement &&
      e.activeElement.matches(s.focusableElements) &&
      e.activeElement !== a.target &&
      a.pointerType !== 'mouse' &&
      e.activeElement.blur(),
    e.activeElement &&
      a.target === e.activeElement &&
      a.target.matches(s.focusableElements))
  ) {
    (s.isMoved = !0), (t.allowClick = !1);
    return;
  }
  s.allowTouchCallbacks && t.emit('touchMove', a),
    (r.previousX = r.currentX),
    (r.previousY = r.currentY),
    (r.currentX = f),
    (r.currentY = p);
  const g = r.currentX - r.startX,
    m = r.currentY - r.startY;
  if (t.params.threshold && Math.sqrt(g ** 2 + m ** 2) < t.params.threshold)
    return;
  if (typeof s.isScrolling > 'u') {
    let L;
    (t.isHorizontal() && r.currentY === r.startY) ||
    (t.isVertical() && r.currentX === r.startX)
      ? (s.isScrolling = !1)
      : g * g + m * m >= 25 &&
        ((L = (Math.atan2(Math.abs(m), Math.abs(g)) * 180) / Math.PI),
        (s.isScrolling = t.isHorizontal()
          ? L > n.touchAngle
          : 90 - L > n.touchAngle));
  }
  if (
    (s.isScrolling && t.emit('touchMoveOpposite', a),
    typeof s.startMoving > 'u' &&
      (r.currentX !== r.startX || r.currentY !== r.startY) &&
      (s.startMoving = !0),
    s.isScrolling ||
      (a.type === 'touchmove' && s.preventTouchMoveFromPointerMove))
  ) {
    s.isTouched = !1;
    return;
  }
  if (!s.startMoving) return;
  (t.allowClick = !1),
    !n.cssMode && a.cancelable && a.preventDefault(),
    n.touchMoveStopPropagation && !n.nested && a.stopPropagation();
  let h = t.isHorizontal() ? g : m,
    v = t.isHorizontal() ? r.currentX - r.previousX : r.currentY - r.previousY;
  n.oneWayMovement &&
    ((h = Math.abs(h) * (o ? 1 : -1)), (v = Math.abs(v) * (o ? 1 : -1))),
    (r.diff = h),
    (h *= n.touchRatio),
    o && ((h = -h), (v = -v));
  const E = t.touchesDirection;
  (t.swipeDirection = h > 0 ? 'prev' : 'next'),
    (t.touchesDirection = v > 0 ? 'prev' : 'next');
  const y = t.params.loop && !n.cssMode,
    d =
      (t.touchesDirection === 'next' && t.allowSlideNext) ||
      (t.touchesDirection === 'prev' && t.allowSlidePrev);
  if (!s.isMoved) {
    if (
      (y && d && t.loopFix({ direction: t.swipeDirection }),
      (s.startTranslate = t.getTranslate()),
      t.setTransition(0),
      t.animating)
    ) {
      const L = new window.CustomEvent('transitionend', {
        bubbles: !0,
        cancelable: !0,
        detail: { bySwiperTouchMove: !0 },
      });
      t.wrapperEl.dispatchEvent(L);
    }
    (s.allowMomentumBounce = !1),
      n.grabCursor &&
        (t.allowSlideNext === !0 || t.allowSlidePrev === !0) &&
        t.setGrabCursor(!0),
      t.emit('sliderFirstMove', a);
  }
  let c;
  if (
    (new Date().getTime(),
    s.isMoved &&
      s.allowThresholdMove &&
      E !== t.touchesDirection &&
      y &&
      d &&
      Math.abs(h) >= 1)
  ) {
    Object.assign(r, {
      startX: f,
      startY: p,
      currentX: f,
      currentY: p,
      startTranslate: s.currentTranslate,
    }),
      (s.loopSwapReset = !0),
      (s.startTranslate = s.currentTranslate);
    return;
  }
  t.emit('sliderMove', a),
    (s.isMoved = !0),
    (s.currentTranslate = h + s.startTranslate);
  let w = !0,
    b = n.resistanceRatio;
  if (
    (n.touchReleaseOnEdges && (b = 0),
    h > 0
      ? (y &&
          d &&
          !c &&
          s.allowThresholdMove &&
          s.currentTranslate >
            (n.centeredSlides
              ? t.minTranslate() -
                t.slidesSizesGrid[t.activeIndex + 1] -
                (n.slidesPerView !== 'auto' &&
                t.slides.length - n.slidesPerView >= 2
                  ? t.slidesSizesGrid[t.activeIndex + 1] + t.params.spaceBetween
                  : 0) -
                t.params.spaceBetween
              : t.minTranslate()) &&
          t.loopFix({
            direction: 'prev',
            setTranslate: !0,
            activeSlideIndex: 0,
          }),
        s.currentTranslate > t.minTranslate() &&
          ((w = !1),
          n.resistance &&
            (s.currentTranslate =
              t.minTranslate() -
              1 +
              (-t.minTranslate() + s.startTranslate + h) ** b)))
      : h < 0 &&
        (y &&
          d &&
          !c &&
          s.allowThresholdMove &&
          s.currentTranslate <
            (n.centeredSlides
              ? t.maxTranslate() +
                t.slidesSizesGrid[t.slidesSizesGrid.length - 1] +
                t.params.spaceBetween +
                (n.slidesPerView !== 'auto' &&
                t.slides.length - n.slidesPerView >= 2
                  ? t.slidesSizesGrid[t.slidesSizesGrid.length - 1] +
                    t.params.spaceBetween
                  : 0)
              : t.maxTranslate()) &&
          t.loopFix({
            direction: 'next',
            setTranslate: !0,
            activeSlideIndex:
              t.slides.length -
              (n.slidesPerView === 'auto'
                ? t.slidesPerViewDynamic()
                : Math.ceil(parseFloat(n.slidesPerView, 10))),
          }),
        s.currentTranslate < t.maxTranslate() &&
          ((w = !1),
          n.resistance &&
            (s.currentTranslate =
              t.maxTranslate() +
              1 -
              (t.maxTranslate() - s.startTranslate - h) ** b))),
    w && (a.preventedByNestedSwiper = !0),
    !t.allowSlideNext &&
      t.swipeDirection === 'next' &&
      s.currentTranslate < s.startTranslate &&
      (s.currentTranslate = s.startTranslate),
    !t.allowSlidePrev &&
      t.swipeDirection === 'prev' &&
      s.currentTranslate > s.startTranslate &&
      (s.currentTranslate = s.startTranslate),
    !t.allowSlidePrev &&
      !t.allowSlideNext &&
      (s.currentTranslate = s.startTranslate),
    n.threshold > 0)
  )
    if (Math.abs(h) > n.threshold || s.allowThresholdMove) {
      if (!s.allowThresholdMove) {
        (s.allowThresholdMove = !0),
          (r.startX = r.currentX),
          (r.startY = r.currentY),
          (s.currentTranslate = s.startTranslate),
          (r.diff = t.isHorizontal()
            ? r.currentX - r.startX
            : r.currentY - r.startY);
        return;
      }
    } else {
      s.currentTranslate = s.startTranslate;
      return;
    }
  !n.followFinger ||
    n.cssMode ||
    (((n.freeMode && n.freeMode.enabled && t.freeMode) ||
      n.watchSlidesProgress) &&
      (t.updateActiveIndex(), t.updateSlidesClasses()),
    n.freeMode && n.freeMode.enabled && t.freeMode && t.freeMode.onTouchMove(),
    t.updateProgress(s.currentTranslate),
    t.setTranslate(s.currentTranslate));
}
function zt(i) {
  const e = this,
    t = e.touchEventsData;
  let s = i;
  s.originalEvent && (s = s.originalEvent);
  let n;
  if (s.type === 'touchend' || s.type === 'touchcancel') {
    if (
      ((n = [...s.changedTouches].filter((b) => b.identifier === t.touchId)[0]),
      !n || n.identifier !== t.touchId)
    )
      return;
  } else {
    if (t.touchId !== null || s.pointerId !== t.pointerId) return;
    n = s;
  }
  if (
    ['pointercancel', 'pointerout', 'pointerleave', 'contextmenu'].includes(
      s.type,
    ) &&
    !(
      ['pointercancel', 'contextmenu'].includes(s.type) &&
      (e.browser.isSafari || e.browser.isWebView)
    )
  )
    return;
  (t.pointerId = null), (t.touchId = null);
  const {
    params: o,
    touches: l,
    rtlTranslate: a,
    slidesGrid: u,
    enabled: f,
  } = e;
  if (!f || (!o.simulateTouch && s.pointerType === 'mouse')) return;
  if (
    (t.allowTouchCallbacks && e.emit('touchEnd', s),
    (t.allowTouchCallbacks = !1),
    !t.isTouched)
  ) {
    t.isMoved && o.grabCursor && e.setGrabCursor(!1),
      (t.isMoved = !1),
      (t.startMoving = !1);
    return;
  }
  o.grabCursor &&
    t.isMoved &&
    t.isTouched &&
    (e.allowSlideNext === !0 || e.allowSlidePrev === !0) &&
    e.setGrabCursor(!1);
  const p = K(),
    g = p - t.touchStartTime;
  if (e.allowClick) {
    const b = s.path || (s.composedPath && s.composedPath());
    e.updateClickedSlide((b && b[0]) || s.target, b),
      e.emit('tap click', s),
      g < 300 &&
        p - t.lastClickTime < 300 &&
        e.emit('doubleTap doubleClick', s);
  }
  if (
    ((t.lastClickTime = K()),
    U(() => {
      e.destroyed || (e.allowClick = !0);
    }),
    !t.isTouched ||
      !t.isMoved ||
      !e.swipeDirection ||
      (l.diff === 0 && !t.loopSwapReset) ||
      (t.currentTranslate === t.startTranslate && !t.loopSwapReset))
  ) {
    (t.isTouched = !1), (t.isMoved = !1), (t.startMoving = !1);
    return;
  }
  (t.isTouched = !1), (t.isMoved = !1), (t.startMoving = !1);
  let m;
  if (
    (o.followFinger
      ? (m = a ? e.translate : -e.translate)
      : (m = -t.currentTranslate),
    o.cssMode)
  )
    return;
  if (o.freeMode && o.freeMode.enabled) {
    e.freeMode.onTouchEnd({ currentPos: m });
    return;
  }
  const h = m >= -e.maxTranslate() && !e.params.loop;
  let v = 0,
    E = e.slidesSizesGrid[0];
  for (
    let b = 0;
    b < u.length;
    b += b < o.slidesPerGroupSkip ? 1 : o.slidesPerGroup
  ) {
    const L = b < o.slidesPerGroupSkip - 1 ? 1 : o.slidesPerGroup;
    typeof u[b + L] < 'u'
      ? (h || (m >= u[b] && m < u[b + L])) && ((v = b), (E = u[b + L] - u[b]))
      : (h || m >= u[b]) && ((v = b), (E = u[u.length - 1] - u[u.length - 2]));
  }
  let y = null,
    d = null;
  o.rewind &&
    (e.isBeginning
      ? (d =
          o.virtual && o.virtual.enabled && e.virtual
            ? e.virtual.slides.length - 1
            : e.slides.length - 1)
      : e.isEnd && (y = 0));
  const c = (m - u[v]) / E,
    w = v < o.slidesPerGroupSkip - 1 ? 1 : o.slidesPerGroup;
  if (g > o.longSwipesMs) {
    if (!o.longSwipes) {
      e.slideTo(e.activeIndex);
      return;
    }
    e.swipeDirection === 'next' &&
      (c >= o.longSwipesRatio
        ? e.slideTo(o.rewind && e.isEnd ? y : v + w)
        : e.slideTo(v)),
      e.swipeDirection === 'prev' &&
        (c > 1 - o.longSwipesRatio
          ? e.slideTo(v + w)
          : d !== null && c < 0 && Math.abs(c) > o.longSwipesRatio
          ? e.slideTo(d)
          : e.slideTo(v));
  } else {
    if (!o.shortSwipes) {
      e.slideTo(e.activeIndex);
      return;
    }
    e.navigation &&
    (s.target === e.navigation.nextEl || s.target === e.navigation.prevEl)
      ? s.target === e.navigation.nextEl
        ? e.slideTo(v + w)
        : e.slideTo(v)
      : (e.swipeDirection === 'next' && e.slideTo(y !== null ? y : v + w),
        e.swipeDirection === 'prev' && e.slideTo(d !== null ? d : v));
  }
}
function me() {
  const i = this,
    { params: e, el: t } = i;
  if (t && t.offsetWidth === 0) return;
  e.breakpoints && i.setBreakpoint();
  const { allowSlideNext: s, allowSlidePrev: n, snapGrid: r } = i,
    o = i.virtual && i.params.virtual.enabled;
  (i.allowSlideNext = !0),
    (i.allowSlidePrev = !0),
    i.updateSize(),
    i.updateSlides(),
    i.updateSlidesClasses();
  const l = o && e.loop;
  (e.slidesPerView === 'auto' || e.slidesPerView > 1) &&
  i.isEnd &&
  !i.isBeginning &&
  !i.params.centeredSlides &&
  !l
    ? i.slideTo(i.slides.length - 1, 0, !1, !0)
    : i.params.loop && !o
    ? i.slideToLoop(i.realIndex, 0, !1, !0)
    : i.slideTo(i.activeIndex, 0, !1, !0),
    i.autoplay &&
      i.autoplay.running &&
      i.autoplay.paused &&
      (clearTimeout(i.autoplay.resizeTimeout),
      (i.autoplay.resizeTimeout = setTimeout(() => {
        i.autoplay &&
          i.autoplay.running &&
          i.autoplay.paused &&
          i.autoplay.resume();
      }, 500))),
    (i.allowSlidePrev = n),
    (i.allowSlideNext = s),
    i.params.watchOverflow && r !== i.snapGrid && i.checkOverflow();
}
function Ot(i) {
  const e = this;
  e.enabled &&
    (e.allowClick ||
      (e.params.preventClicks && i.preventDefault(),
      e.params.preventClicksPropagation &&
        e.animating &&
        (i.stopPropagation(), i.stopImmediatePropagation())));
}
function At() {
  const i = this,
    { wrapperEl: e, rtlTranslate: t, enabled: s } = i;
  if (!s) return;
  (i.previousTranslate = i.translate),
    i.isHorizontal()
      ? (i.translate = -e.scrollLeft)
      : (i.translate = -e.scrollTop),
    i.translate === 0 && (i.translate = 0),
    i.updateActiveIndex(),
    i.updateSlidesClasses();
  let n;
  const r = i.maxTranslate() - i.minTranslate();
  r === 0 ? (n = 0) : (n = (i.translate - i.minTranslate()) / r),
    n !== i.progress && i.updateProgress(t ? -i.translate : i.translate),
    i.emit('setTranslate', i.translate, !1);
}
function Dt(i) {
  const e = this;
  X(e, i.target),
    !(
      e.params.cssMode ||
      (e.params.slidesPerView !== 'auto' && !e.params.autoHeight)
    ) && e.update();
}
function kt() {
  const i = this;
  i.documentTouchHandlerProceeded ||
    ((i.documentTouchHandlerProceeded = !0),
    i.params.touchReleaseOnEdges && (i.el.style.touchAction = 'auto'));
}
const xe = (i, e) => {
  const t = R(),
    { params: s, el: n, wrapperEl: r, device: o } = i,
    l = !!s.nested,
    a = e === 'on' ? 'addEventListener' : 'removeEventListener',
    u = e;
  !n ||
    typeof n == 'string' ||
    (t[a]('touchstart', i.onDocumentTouchStart, { passive: !1, capture: l }),
    n[a]('touchstart', i.onTouchStart, { passive: !1 }),
    n[a]('pointerdown', i.onTouchStart, { passive: !1 }),
    t[a]('touchmove', i.onTouchMove, { passive: !1, capture: l }),
    t[a]('pointermove', i.onTouchMove, { passive: !1, capture: l }),
    t[a]('touchend', i.onTouchEnd, { passive: !0 }),
    t[a]('pointerup', i.onTouchEnd, { passive: !0 }),
    t[a]('pointercancel', i.onTouchEnd, { passive: !0 }),
    t[a]('touchcancel', i.onTouchEnd, { passive: !0 }),
    t[a]('pointerout', i.onTouchEnd, { passive: !0 }),
    t[a]('pointerleave', i.onTouchEnd, { passive: !0 }),
    t[a]('contextmenu', i.onTouchEnd, { passive: !0 }),
    (s.preventClicks || s.preventClicksPropagation) &&
      n[a]('click', i.onClick, !0),
    s.cssMode && r[a]('scroll', i.onScroll),
    s.updateOnWindowResize
      ? i[u](
          o.ios || o.android
            ? 'resize orientationchange observerUpdate'
            : 'resize observerUpdate',
          me,
          !0,
        )
      : i[u]('observerUpdate', me, !0),
    n[a]('load', i.onLoad, { capture: !0 }));
};
function Gt() {
  const i = this,
    { params: e } = i;
  (i.onTouchStart = Lt.bind(i)),
    (i.onTouchMove = It.bind(i)),
    (i.onTouchEnd = zt.bind(i)),
    (i.onDocumentTouchStart = kt.bind(i)),
    e.cssMode && (i.onScroll = At.bind(i)),
    (i.onClick = Ot.bind(i)),
    (i.onLoad = Dt.bind(i)),
    xe(i, 'on');
}
function Bt() {
  xe(this, 'off');
}
var $t = { attachEvents: Gt, detachEvents: Bt };
const he = (i, e) => i.grid && e.grid && e.grid.rows > 1;
function Vt() {
  const i = this,
    { realIndex: e, initialized: t, params: s, el: n } = i,
    r = s.breakpoints;
  if (!r || (r && Object.keys(r).length === 0)) return;
  const o = i.getBreakpoint(r, i.params.breakpointsBase, i.el);
  if (!o || i.currentBreakpoint === o) return;
  const a = (o in r ? r[o] : void 0) || i.originalParams,
    u = he(i, s),
    f = he(i, a),
    p = i.params.grabCursor,
    g = a.grabCursor,
    m = s.enabled;
  u && !f
    ? (n.classList.remove(
        `${s.containerModifierClass}grid`,
        `${s.containerModifierClass}grid-column`,
      ),
      i.emitContainerClasses())
    : !u &&
      f &&
      (n.classList.add(`${s.containerModifierClass}grid`),
      ((a.grid.fill && a.grid.fill === 'column') ||
        (!a.grid.fill && s.grid.fill === 'column')) &&
        n.classList.add(`${s.containerModifierClass}grid-column`),
      i.emitContainerClasses()),
    p && !g ? i.unsetGrabCursor() : !p && g && i.setGrabCursor(),
    ['navigation', 'pagination', 'scrollbar'].forEach((c) => {
      if (typeof a[c] > 'u') return;
      const w = s[c] && s[c].enabled,
        b = a[c] && a[c].enabled;
      w && !b && i[c].disable(), !w && b && i[c].enable();
    });
  const h = a.direction && a.direction !== s.direction,
    v = s.loop && (a.slidesPerView !== s.slidesPerView || h),
    E = s.loop;
  h && t && i.changeDirection(), $(i.params, a);
  const y = i.params.enabled,
    d = i.params.loop;
  Object.assign(i, {
    allowTouchMove: i.params.allowTouchMove,
    allowSlideNext: i.params.allowSlideNext,
    allowSlidePrev: i.params.allowSlidePrev,
  }),
    m && !y ? i.disable() : !m && y && i.enable(),
    (i.currentBreakpoint = o),
    i.emit('_beforeBreakpoint', a),
    t &&
      (v
        ? (i.loopDestroy(), i.loopCreate(e), i.updateSlides())
        : !E && d
        ? (i.loopCreate(e), i.updateSlides())
        : E && !d && i.loopDestroy()),
    i.emit('breakpoint', a);
}
function Ft(i, e, t) {
  if ((e === void 0 && (e = 'window'), !i || (e === 'container' && !t))) return;
  let s = !1;
  const n = G(),
    r = e === 'window' ? n.innerHeight : t.clientHeight,
    o = Object.keys(i).map((l) => {
      if (typeof l == 'string' && l.indexOf('@') === 0) {
        const a = parseFloat(l.substr(1));
        return { value: r * a, point: l };
      }
      return { value: l, point: l };
    });
  o.sort((l, a) => parseInt(l.value, 10) - parseInt(a.value, 10));
  for (let l = 0; l < o.length; l += 1) {
    const { point: a, value: u } = o[l];
    e === 'window'
      ? n.matchMedia(`(min-width: ${u}px)`).matches && (s = a)
      : u <= t.clientWidth && (s = a);
  }
  return s || 'max';
}
var Ht = { setBreakpoint: Vt, getBreakpoint: Ft };
function Nt(i, e) {
  const t = [];
  return (
    i.forEach((s) => {
      typeof s == 'object'
        ? Object.keys(s).forEach((n) => {
            s[n] && t.push(e + n);
          })
        : typeof s == 'string' && t.push(e + s);
    }),
    t
  );
}
function _t() {
  const i = this,
    { classNames: e, params: t, rtl: s, el: n, device: r } = i,
    o = Nt(
      [
        'initialized',
        t.direction,
        { 'free-mode': i.params.freeMode && t.freeMode.enabled },
        { autoheight: t.autoHeight },
        { rtl: s },
        { grid: t.grid && t.grid.rows > 1 },
        {
          'grid-column': t.grid && t.grid.rows > 1 && t.grid.fill === 'column',
        },
        { android: r.android },
        { ios: r.ios },
        { 'css-mode': t.cssMode },
        { centered: t.cssMode && t.centeredSlides },
        { 'watch-progress': t.watchSlidesProgress },
      ],
      t.containerModifierClass,
    );
  e.push(...o), n.classList.add(...e), i.emitContainerClasses();
}
function Rt() {
  const i = this,
    { el: e, classNames: t } = i;
  !e ||
    typeof e == 'string' ||
    (e.classList.remove(...t), i.emitContainerClasses());
}
var Wt = { addClasses: _t, removeClasses: Rt };
function qt() {
  const i = this,
    { isLocked: e, params: t } = i,
    { slidesOffsetBefore: s } = t;
  if (s) {
    const n = i.slides.length - 1,
      r = i.slidesGrid[n] + i.slidesSizesGrid[n] + s * 2;
    i.isLocked = i.size > r;
  } else i.isLocked = i.snapGrid.length === 1;
  t.allowSlideNext === !0 && (i.allowSlideNext = !i.isLocked),
    t.allowSlidePrev === !0 && (i.allowSlidePrev = !i.isLocked),
    e && e !== i.isLocked && (i.isEnd = !1),
    e !== i.isLocked && i.emit(i.isLocked ? 'lock' : 'unlock');
}
var jt = { checkOverflow: qt },
  ge = {
    init: !0,
    direction: 'horizontal',
    oneWayMovement: !1,
    swiperElementNodeName: 'SWIPER-CONTAINER',
    touchEventsTarget: 'wrapper',
    initialSlide: 0,
    speed: 300,
    cssMode: !1,
    updateOnWindowResize: !0,
    resizeObserver: !0,
    nested: !1,
    createElements: !1,
    eventsPrefix: 'swiper',
    enabled: !0,
    focusableElements: 'input, select, option, textarea, button, video, label',
    width: null,
    height: null,
    preventInteractionOnTransition: !1,
    userAgent: null,
    url: null,
    edgeSwipeDetection: !1,
    edgeSwipeThreshold: 20,
    autoHeight: !1,
    setWrapperSize: !1,
    virtualTranslate: !1,
    effect: 'slide',
    breakpoints: void 0,
    breakpointsBase: 'window',
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: !1,
    centeredSlides: !1,
    centeredSlidesBounds: !1,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: !0,
    centerInsufficientSlides: !1,
    watchOverflow: !0,
    roundLengths: !1,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: !0,
    shortSwipes: !0,
    longSwipes: !0,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: !0,
    allowTouchMove: !0,
    threshold: 5,
    touchMoveStopPropagation: !1,
    touchStartPreventDefault: !0,
    touchStartForcePreventDefault: !1,
    touchReleaseOnEdges: !1,
    uniqueNavElements: !0,
    resistance: !0,
    resistanceRatio: 0.85,
    watchSlidesProgress: !1,
    grabCursor: !1,
    preventClicks: !0,
    preventClicksPropagation: !0,
    slideToClickedSlide: !1,
    loop: !1,
    loopAddBlankSlides: !0,
    loopAdditionalSlides: 0,
    loopPreventsSliding: !0,
    rewind: !1,
    allowSlidePrev: !0,
    allowSlideNext: !0,
    swipeHandler: null,
    noSwiping: !0,
    noSwipingClass: 'swiper-no-swiping',
    noSwipingSelector: null,
    passiveListeners: !0,
    maxBackfaceHiddenSlides: 10,
    containerModifierClass: 'swiper-',
    slideClass: 'swiper-slide',
    slideBlankClass: 'swiper-slide-blank',
    slideActiveClass: 'swiper-slide-active',
    slideVisibleClass: 'swiper-slide-visible',
    slideFullyVisibleClass: 'swiper-slide-fully-visible',
    slideNextClass: 'swiper-slide-next',
    slidePrevClass: 'swiper-slide-prev',
    wrapperClass: 'swiper-wrapper',
    lazyPreloaderClass: 'swiper-lazy-preloader',
    lazyPreloadPrevNext: 0,
    runCallbacksOnInit: !0,
    _emitClasses: !1,
  };
function Yt(i, e) {
  return function (s) {
    s === void 0 && (s = {});
    const n = Object.keys(s)[0],
      r = s[n];
    if (typeof r != 'object' || r === null) {
      $(e, s);
      return;
    }
    if (
      (i[n] === !0 && (i[n] = { enabled: !0 }),
      n === 'navigation' &&
        i[n] &&
        i[n].enabled &&
        !i[n].prevEl &&
        !i[n].nextEl &&
        (i[n].auto = !0),
      ['pagination', 'scrollbar'].indexOf(n) >= 0 &&
        i[n] &&
        i[n].enabled &&
        !i[n].el &&
        (i[n].auto = !0),
      !(n in i && 'enabled' in r))
    ) {
      $(e, s);
      return;
    }
    typeof i[n] == 'object' && !('enabled' in i[n]) && (i[n].enabled = !0),
      i[n] || (i[n] = { enabled: !1 }),
      $(e, s);
  };
}
const re = {
    eventsEmitter: We,
    update: tt,
    translate: lt,
    transition: ft,
    slide: bt,
    loop: xt,
    grabCursor: Mt,
    events: $t,
    breakpoints: Ht,
    checkOverflow: jt,
    classes: Wt,
  },
  ne = {};
class B {
  constructor() {
    let e, t;
    for (var s = arguments.length, n = new Array(s), r = 0; r < s; r++)
      n[r] = arguments[r];
    n.length === 1 &&
    n[0].constructor &&
    Object.prototype.toString.call(n[0]).slice(8, -1) === 'Object'
      ? (t = n[0])
      : ([e, t] = n),
      t || (t = {}),
      (t = $({}, t)),
      e && !t.el && (t.el = e);
    const o = R();
    if (
      t.el &&
      typeof t.el == 'string' &&
      o.querySelectorAll(t.el).length > 1
    ) {
      const f = [];
      return (
        o.querySelectorAll(t.el).forEach((p) => {
          const g = $({}, t, { el: p });
          f.push(new B(g));
        }),
        f
      );
    }
    const l = this;
    (l.__swiper__ = !0),
      (l.support = Se()),
      (l.device = ye({ userAgent: t.userAgent })),
      (l.browser = Ne()),
      (l.eventsListeners = {}),
      (l.eventsAnyListeners = []),
      (l.modules = [...l.__modules__]),
      t.modules && Array.isArray(t.modules) && l.modules.push(...t.modules);
    const a = {};
    l.modules.forEach((f) => {
      f({
        params: t,
        swiper: l,
        extendParams: Yt(t, a),
        on: l.on.bind(l),
        once: l.once.bind(l),
        off: l.off.bind(l),
        emit: l.emit.bind(l),
      });
    });
    const u = $({}, ge, a);
    return (
      (l.params = $({}, u, ne, t)),
      (l.originalParams = $({}, l.params)),
      (l.passedParams = $({}, t)),
      l.params &&
        l.params.on &&
        Object.keys(l.params.on).forEach((f) => {
          l.on(f, l.params.on[f]);
        }),
      l.params && l.params.onAny && l.onAny(l.params.onAny),
      Object.assign(l, {
        enabled: l.params.enabled,
        el: e,
        classNames: [],
        slides: [],
        slidesGrid: [],
        snapGrid: [],
        slidesSizesGrid: [],
        isHorizontal() {
          return l.params.direction === 'horizontal';
        },
        isVertical() {
          return l.params.direction === 'vertical';
        },
        activeIndex: 0,
        realIndex: 0,
        isBeginning: !0,
        isEnd: !1,
        translate: 0,
        previousTranslate: 0,
        progress: 0,
        velocity: 0,
        animating: !1,
        cssOverflowAdjustment() {
          return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
        },
        allowSlideNext: l.params.allowSlideNext,
        allowSlidePrev: l.params.allowSlidePrev,
        touchEventsData: {
          isTouched: void 0,
          isMoved: void 0,
          allowTouchCallbacks: void 0,
          touchStartTime: void 0,
          isScrolling: void 0,
          currentTranslate: void 0,
          startTranslate: void 0,
          allowThresholdMove: void 0,
          focusableElements: l.params.focusableElements,
          lastClickTime: 0,
          clickTimeout: void 0,
          velocities: [],
          allowMomentumBounce: void 0,
          startMoving: void 0,
          pointerId: null,
          touchId: null,
        },
        allowClick: !0,
        allowTouchMove: l.params.allowTouchMove,
        touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
        imagesToLoad: [],
        imagesLoaded: 0,
      }),
      l.emit('_swiper'),
      l.params.init && l.init(),
      l
    );
  }
  getDirectionLabel(e) {
    return this.isHorizontal()
      ? e
      : {
          width: 'height',
          'margin-top': 'margin-left',
          'margin-bottom ': 'margin-right',
          'margin-left': 'margin-top',
          'margin-right': 'margin-bottom',
          'padding-left': 'padding-top',
          'padding-right': 'padding-bottom',
          marginRight: 'marginBottom',
        }[e];
  }
  getSlideIndex(e) {
    const { slidesEl: t, params: s } = this,
      n = H(t, `.${s.slideClass}, swiper-slide`),
      r = Q(n[0]);
    return Q(e) - r;
  }
  getSlideIndexByData(e) {
    return this.getSlideIndex(
      this.slides.filter(
        (t) => t.getAttribute('data-swiper-slide-index') * 1 === e,
      )[0],
    );
  }
  recalcSlides() {
    const e = this,
      { slidesEl: t, params: s } = e;
    e.slides = H(t, `.${s.slideClass}, swiper-slide`);
  }
  enable() {
    const e = this;
    e.enabled ||
      ((e.enabled = !0),
      e.params.grabCursor && e.setGrabCursor(),
      e.emit('enable'));
  }
  disable() {
    const e = this;
    e.enabled &&
      ((e.enabled = !1),
      e.params.grabCursor && e.unsetGrabCursor(),
      e.emit('disable'));
  }
  setProgress(e, t) {
    const s = this;
    e = Math.min(Math.max(e, 0), 1);
    const n = s.minTranslate(),
      o = (s.maxTranslate() - n) * e + n;
    s.translateTo(o, typeof t > 'u' ? 0 : t),
      s.updateActiveIndex(),
      s.updateSlidesClasses();
  }
  emitContainerClasses() {
    const e = this;
    if (!e.params._emitClasses || !e.el) return;
    const t = e.el.className
      .split(' ')
      .filter(
        (s) =>
          s.indexOf('swiper') === 0 ||
          s.indexOf(e.params.containerModifierClass) === 0,
      );
    e.emit('_containerClasses', t.join(' '));
  }
  getSlideClasses(e) {
    const t = this;
    return t.destroyed
      ? ''
      : e.className
          .split(' ')
          .filter(
            (s) =>
              s.indexOf('swiper-slide') === 0 ||
              s.indexOf(t.params.slideClass) === 0,
          )
          .join(' ');
  }
  emitSlidesClasses() {
    const e = this;
    if (!e.params._emitClasses || !e.el) return;
    const t = [];
    e.slides.forEach((s) => {
      const n = e.getSlideClasses(s);
      t.push({ slideEl: s, classNames: n }), e.emit('_slideClass', s, n);
    }),
      e.emit('_slideClasses', t);
  }
  slidesPerViewDynamic(e, t) {
    e === void 0 && (e = 'current'), t === void 0 && (t = !1);
    const s = this,
      {
        params: n,
        slides: r,
        slidesGrid: o,
        slidesSizesGrid: l,
        size: a,
        activeIndex: u,
      } = s;
    let f = 1;
    if (typeof n.slidesPerView == 'number') return n.slidesPerView;
    if (n.centeredSlides) {
      let p = r[u] ? Math.ceil(r[u].swiperSlideSize) : 0,
        g;
      for (let m = u + 1; m < r.length; m += 1)
        r[m] &&
          !g &&
          ((p += Math.ceil(r[m].swiperSlideSize)), (f += 1), p > a && (g = !0));
      for (let m = u - 1; m >= 0; m -= 1)
        r[m] &&
          !g &&
          ((p += r[m].swiperSlideSize), (f += 1), p > a && (g = !0));
    } else if (e === 'current')
      for (let p = u + 1; p < r.length; p += 1)
        (t ? o[p] + l[p] - o[u] < a : o[p] - o[u] < a) && (f += 1);
    else for (let p = u - 1; p >= 0; p -= 1) o[u] - o[p] < a && (f += 1);
    return f;
  }
  update() {
    const e = this;
    if (!e || e.destroyed) return;
    const { snapGrid: t, params: s } = e;
    s.breakpoints && e.setBreakpoint(),
      [...e.el.querySelectorAll('[loading="lazy"]')].forEach((o) => {
        o.complete && X(e, o);
      }),
      e.updateSize(),
      e.updateSlides(),
      e.updateProgress(),
      e.updateSlidesClasses();
    function n() {
      const o = e.rtlTranslate ? e.translate * -1 : e.translate,
        l = Math.min(Math.max(o, e.maxTranslate()), e.minTranslate());
      e.setTranslate(l), e.updateActiveIndex(), e.updateSlidesClasses();
    }
    let r;
    if (s.freeMode && s.freeMode.enabled && !s.cssMode)
      n(), s.autoHeight && e.updateAutoHeight();
    else {
      if (
        (s.slidesPerView === 'auto' || s.slidesPerView > 1) &&
        e.isEnd &&
        !s.centeredSlides
      ) {
        const o = e.virtual && s.virtual.enabled ? e.virtual.slides : e.slides;
        r = e.slideTo(o.length - 1, 0, !1, !0);
      } else r = e.slideTo(e.activeIndex, 0, !1, !0);
      r || n();
    }
    s.watchOverflow && t !== e.snapGrid && e.checkOverflow(), e.emit('update');
  }
  changeDirection(e, t) {
    t === void 0 && (t = !0);
    const s = this,
      n = s.params.direction;
    return (
      e || (e = n === 'horizontal' ? 'vertical' : 'horizontal'),
      e === n ||
        (e !== 'horizontal' && e !== 'vertical') ||
        (s.el.classList.remove(`${s.params.containerModifierClass}${n}`),
        s.el.classList.add(`${s.params.containerModifierClass}${e}`),
        s.emitContainerClasses(),
        (s.params.direction = e),
        s.slides.forEach((r) => {
          e === 'vertical' ? (r.style.width = '') : (r.style.height = '');
        }),
        s.emit('changeDirection'),
        t && s.update()),
      s
    );
  }
  changeLanguageDirection(e) {
    const t = this;
    (t.rtl && e === 'rtl') ||
      (!t.rtl && e === 'ltr') ||
      ((t.rtl = e === 'rtl'),
      (t.rtlTranslate = t.params.direction === 'horizontal' && t.rtl),
      t.rtl
        ? (t.el.classList.add(`${t.params.containerModifierClass}rtl`),
          (t.el.dir = 'rtl'))
        : (t.el.classList.remove(`${t.params.containerModifierClass}rtl`),
          (t.el.dir = 'ltr')),
      t.update());
  }
  mount(e) {
    const t = this;
    if (t.mounted) return !0;
    let s = e || t.params.el;
    if ((typeof s == 'string' && (s = document.querySelector(s)), !s))
      return !1;
    (s.swiper = t),
      s.parentNode &&
        s.parentNode.host &&
        s.parentNode.host.nodeName ===
          t.params.swiperElementNodeName.toUpperCase() &&
        (t.isElement = !0);
    const n = () =>
      `.${(t.params.wrapperClass || '').trim().split(' ').join('.')}`;
    let o = (() =>
      s && s.shadowRoot && s.shadowRoot.querySelector
        ? s.shadowRoot.querySelector(n())
        : H(s, n())[0])();
    return (
      !o &&
        t.params.createElements &&
        ((o = q('div', t.params.wrapperClass)),
        s.append(o),
        H(s, `.${t.params.slideClass}`).forEach((l) => {
          o.append(l);
        })),
      Object.assign(t, {
        el: s,
        wrapperEl: o,
        slidesEl:
          t.isElement && !s.parentNode.host.slideSlots ? s.parentNode.host : o,
        hostEl: t.isElement ? s.parentNode.host : s,
        mounted: !0,
        rtl: s.dir.toLowerCase() === 'rtl' || _(s, 'direction') === 'rtl',
        rtlTranslate:
          t.params.direction === 'horizontal' &&
          (s.dir.toLowerCase() === 'rtl' || _(s, 'direction') === 'rtl'),
        wrongRTL: _(o, 'display') === '-webkit-box',
      }),
      !0
    );
  }
  init(e) {
    const t = this;
    if (t.initialized || t.mount(e) === !1) return t;
    t.emit('beforeInit'),
      t.params.breakpoints && t.setBreakpoint(),
      t.addClasses(),
      t.updateSize(),
      t.updateSlides(),
      t.params.watchOverflow && t.checkOverflow(),
      t.params.grabCursor && t.enabled && t.setGrabCursor(),
      t.params.loop && t.virtual && t.params.virtual.enabled
        ? t.slideTo(
            t.params.initialSlide + t.virtual.slidesBefore,
            0,
            t.params.runCallbacksOnInit,
            !1,
            !0,
          )
        : t.slideTo(
            t.params.initialSlide,
            0,
            t.params.runCallbacksOnInit,
            !1,
            !0,
          ),
      t.params.loop && t.loopCreate(),
      t.attachEvents();
    const n = [...t.el.querySelectorAll('[loading="lazy"]')];
    return (
      t.isElement && n.push(...t.hostEl.querySelectorAll('[loading="lazy"]')),
      n.forEach((r) => {
        r.complete
          ? X(t, r)
          : r.addEventListener('load', (o) => {
              X(t, o.target);
            });
      }),
      le(t),
      (t.initialized = !0),
      le(t),
      t.emit('init'),
      t.emit('afterInit'),
      t
    );
  }
  destroy(e, t) {
    e === void 0 && (e = !0), t === void 0 && (t = !0);
    const s = this,
      { params: n, el: r, wrapperEl: o, slides: l } = s;
    return (
      typeof s.params > 'u' ||
        s.destroyed ||
        (s.emit('beforeDestroy'),
        (s.initialized = !1),
        s.detachEvents(),
        n.loop && s.loopDestroy(),
        t &&
          (s.removeClasses(),
          r && typeof r != 'string' && r.removeAttribute('style'),
          o && o.removeAttribute('style'),
          l &&
            l.length &&
            l.forEach((a) => {
              a.classList.remove(
                n.slideVisibleClass,
                n.slideFullyVisibleClass,
                n.slideActiveClass,
                n.slideNextClass,
                n.slidePrevClass,
              ),
                a.removeAttribute('style'),
                a.removeAttribute('data-swiper-slide-index');
            })),
        s.emit('destroy'),
        Object.keys(s.eventsListeners).forEach((a) => {
          s.off(a);
        }),
        e !== !1 &&
          (s.el && typeof s.el != 'string' && (s.el.swiper = null), ze(s)),
        (s.destroyed = !0)),
      null
    );
  }
  static extendDefaults(e) {
    $(ne, e);
  }
  static get extendedDefaults() {
    return ne;
  }
  static get defaults() {
    return ge;
  }
  static installModule(e) {
    B.prototype.__modules__ || (B.prototype.__modules__ = []);
    const t = B.prototype.__modules__;
    typeof e == 'function' && t.indexOf(e) < 0 && t.push(e);
  }
  static use(e) {
    return Array.isArray(e)
      ? (e.forEach((t) => B.installModule(t)), B)
      : (B.installModule(e), B);
  }
}
Object.keys(re).forEach((i) => {
  Object.keys(re[i]).forEach((e) => {
    B.prototype[e] = re[i][e];
  });
});
B.use([_e, Re]);
function de(i, e, t, s) {
  return (
    i.params.createElements &&
      Object.keys(s).forEach((n) => {
        if (!t[n] && t.auto === !0) {
          let r = H(i.el, `.${s[n]}`)[0];
          r || ((r = q('div', s[n])), (r.className = s[n]), i.el.append(r)),
            (t[n] = r),
            (e[n] = r);
        }
      }),
    t
  );
}
function Ee(i) {
  let { swiper: e, extendParams: t, on: s, emit: n } = i;
  t({
    navigation: {
      nextEl: null,
      prevEl: null,
      hideOnClick: !1,
      disabledClass: 'swiper-button-disabled',
      hiddenClass: 'swiper-button-hidden',
      lockClass: 'swiper-button-lock',
      navigationDisabledClass: 'swiper-navigation-disabled',
    },
  }),
    (e.navigation = { nextEl: null, prevEl: null });
  function r(h) {
    let v;
    return h &&
      typeof h == 'string' &&
      e.isElement &&
      ((v = e.el.querySelector(h) || e.hostEl.querySelector(h)), v)
      ? v
      : (h &&
          (typeof h == 'string' && (v = [...document.querySelectorAll(h)]),
          e.params.uniqueNavElements &&
          typeof h == 'string' &&
          v &&
          v.length > 1 &&
          e.el.querySelectorAll(h).length === 1
            ? (v = e.el.querySelector(h))
            : v && v.length === 1 && (v = v[0])),
        h && !v ? h : v);
  }
  function o(h, v) {
    const E = e.params.navigation;
    (h = k(h)),
      h.forEach((y) => {
        y &&
          (y.classList[v ? 'add' : 'remove'](...E.disabledClass.split(' ')),
          y.tagName === 'BUTTON' && (y.disabled = v),
          e.params.watchOverflow &&
            e.enabled &&
            y.classList[e.isLocked ? 'add' : 'remove'](E.lockClass));
      });
  }
  function l() {
    const { nextEl: h, prevEl: v } = e.navigation;
    if (e.params.loop) {
      o(v, !1), o(h, !1);
      return;
    }
    o(v, e.isBeginning && !e.params.rewind), o(h, e.isEnd && !e.params.rewind);
  }
  function a(h) {
    h.preventDefault(),
      !(e.isBeginning && !e.params.loop && !e.params.rewind) &&
        (e.slidePrev(), n('navigationPrev'));
  }
  function u(h) {
    h.preventDefault(),
      !(e.isEnd && !e.params.loop && !e.params.rewind) &&
        (e.slideNext(), n('navigationNext'));
  }
  function f() {
    const h = e.params.navigation;
    if (
      ((e.params.navigation = de(
        e,
        e.originalParams.navigation,
        e.params.navigation,
        { nextEl: 'swiper-button-next', prevEl: 'swiper-button-prev' },
      )),
      !(h.nextEl || h.prevEl))
    )
      return;
    let v = r(h.nextEl),
      E = r(h.prevEl);
    Object.assign(e.navigation, { nextEl: v, prevEl: E }),
      (v = k(v)),
      (E = k(E));
    const y = (d, c) => {
      d && d.addEventListener('click', c === 'next' ? u : a),
        !e.enabled && d && d.classList.add(...h.lockClass.split(' '));
    };
    v.forEach((d) => y(d, 'next')), E.forEach((d) => y(d, 'prev'));
  }
  function p() {
    let { nextEl: h, prevEl: v } = e.navigation;
    (h = k(h)), (v = k(v));
    const E = (y, d) => {
      y.removeEventListener('click', d === 'next' ? u : a),
        y.classList.remove(...e.params.navigation.disabledClass.split(' '));
    };
    h.forEach((y) => E(y, 'next')), v.forEach((y) => E(y, 'prev'));
  }
  s('init', () => {
    e.params.navigation.enabled === !1 ? m() : (f(), l());
  }),
    s('toEdge fromEdge lock unlock', () => {
      l();
    }),
    s('destroy', () => {
      p();
    }),
    s('enable disable', () => {
      let { nextEl: h, prevEl: v } = e.navigation;
      if (((h = k(h)), (v = k(v)), e.enabled)) {
        l();
        return;
      }
      [...h, ...v]
        .filter((E) => !!E)
        .forEach((E) => E.classList.add(e.params.navigation.lockClass));
    }),
    s('click', (h, v) => {
      let { nextEl: E, prevEl: y } = e.navigation;
      (E = k(E)), (y = k(y));
      const d = v.target;
      let c = y.includes(d) || E.includes(d);
      if (e.isElement && !c) {
        const w = v.path || (v.composedPath && v.composedPath());
        w && (c = w.find((b) => E.includes(b) || y.includes(b)));
      }
      if (e.params.navigation.hideOnClick && !c) {
        if (
          e.pagination &&
          e.params.pagination &&
          e.params.pagination.clickable &&
          (e.pagination.el === d || e.pagination.el.contains(d))
        )
          return;
        let w;
        E.length
          ? (w = E[0].classList.contains(e.params.navigation.hiddenClass))
          : y.length &&
            (w = y[0].classList.contains(e.params.navigation.hiddenClass)),
          n(w === !0 ? 'navigationShow' : 'navigationHide'),
          [...E, ...y]
            .filter((b) => !!b)
            .forEach((b) =>
              b.classList.toggle(e.params.navigation.hiddenClass),
            );
      }
    });
  const g = () => {
      e.el.classList.remove(
        ...e.params.navigation.navigationDisabledClass.split(' '),
      ),
        f(),
        l();
    },
    m = () => {
      e.el.classList.add(
        ...e.params.navigation.navigationDisabledClass.split(' '),
      ),
        p();
    };
  Object.assign(e.navigation, {
    enable: g,
    disable: m,
    update: l,
    init: f,
    destroy: p,
  });
}
function W(i) {
  return (
    i === void 0 && (i = ''),
    `.${i
      .trim()
      .replace(/([\.:!+\/])/g, '\\$1')
      .replace(/ /g, '.')}`
  );
}
function Ce(i) {
  let { swiper: e, extendParams: t, on: s, emit: n } = i;
  const r = 'swiper-pagination';
  t({
    pagination: {
      el: null,
      bulletElement: 'span',
      clickable: !1,
      hideOnClick: !1,
      renderBullet: null,
      renderProgressbar: null,
      renderFraction: null,
      renderCustom: null,
      progressbarOpposite: !1,
      type: 'bullets',
      dynamicBullets: !1,
      dynamicMainBullets: 1,
      formatFractionCurrent: (d) => d,
      formatFractionTotal: (d) => d,
      bulletClass: `${r}-bullet`,
      bulletActiveClass: `${r}-bullet-active`,
      modifierClass: `${r}-`,
      currentClass: `${r}-current`,
      totalClass: `${r}-total`,
      hiddenClass: `${r}-hidden`,
      progressbarFillClass: `${r}-progressbar-fill`,
      progressbarOppositeClass: `${r}-progressbar-opposite`,
      clickableClass: `${r}-clickable`,
      lockClass: `${r}-lock`,
      horizontalClass: `${r}-horizontal`,
      verticalClass: `${r}-vertical`,
      paginationDisabledClass: `${r}-disabled`,
    },
  }),
    (e.pagination = { el: null, bullets: [] });
  let o,
    l = 0;
  function a() {
    return (
      !e.params.pagination.el ||
      !e.pagination.el ||
      (Array.isArray(e.pagination.el) && e.pagination.el.length === 0)
    );
  }
  function u(d, c) {
    const { bulletActiveClass: w } = e.params.pagination;
    d &&
      ((d = d[`${c === 'prev' ? 'previous' : 'next'}ElementSibling`]),
      d &&
        (d.classList.add(`${w}-${c}`),
        (d = d[`${c === 'prev' ? 'previous' : 'next'}ElementSibling`]),
        d && d.classList.add(`${w}-${c}-${c}`)));
  }
  function f(d, c, w) {
    if (((d = d % w), (c = c % w), c === d + 1)) return 'next';
    if (c === d - 1) return 'previous';
  }
  function p(d) {
    const c = d.target.closest(W(e.params.pagination.bulletClass));
    if (!c) return;
    d.preventDefault();
    const w = Q(c) * e.params.slidesPerGroup;
    if (e.params.loop) {
      if (e.realIndex === w) return;
      const b = f(e.realIndex, w, e.slides.length);
      b === 'next'
        ? e.slideNext()
        : b === 'previous'
        ? e.slidePrev()
        : e.slideToLoop(w);
    } else e.slideTo(w);
  }
  function g() {
    const d = e.rtl,
      c = e.params.pagination;
    if (a()) return;
    let w = e.pagination.el;
    w = k(w);
    let b, L;
    const A =
        e.virtual && e.params.virtual.enabled
          ? e.virtual.slides.length
          : e.slides.length,
      z = e.params.loop
        ? Math.ceil(A / e.params.slidesPerGroup)
        : e.snapGrid.length;
    if (
      (e.params.loop
        ? ((L = e.previousRealIndex || 0),
          (b =
            e.params.slidesPerGroup > 1
              ? Math.floor(e.realIndex / e.params.slidesPerGroup)
              : e.realIndex))
        : typeof e.snapIndex < 'u'
        ? ((b = e.snapIndex), (L = e.previousSnapIndex))
        : ((L = e.previousIndex || 0), (b = e.activeIndex || 0)),
      c.type === 'bullets' &&
        e.pagination.bullets &&
        e.pagination.bullets.length > 0)
    ) {
      const O = e.pagination.bullets;
      let C, P, T;
      if (
        (c.dynamicBullets &&
          ((o = ae(O[0], e.isHorizontal() ? 'width' : 'height', !0)),
          w.forEach((S) => {
            S.style[e.isHorizontal() ? 'width' : 'height'] = `${
              o * (c.dynamicMainBullets + 4)
            }px`;
          }),
          c.dynamicMainBullets > 1 &&
            L !== void 0 &&
            ((l += b - (L || 0)),
            l > c.dynamicMainBullets - 1
              ? (l = c.dynamicMainBullets - 1)
              : l < 0 && (l = 0)),
          (C = Math.max(b - l, 0)),
          (P = C + (Math.min(O.length, c.dynamicMainBullets) - 1)),
          (T = (P + C) / 2)),
        O.forEach((S) => {
          const x = [
            ...['', '-next', '-next-next', '-prev', '-prev-prev', '-main'].map(
              (M) => `${c.bulletActiveClass}${M}`,
            ),
          ]
            .map((M) =>
              typeof M == 'string' && M.includes(' ') ? M.split(' ') : M,
            )
            .flat();
          S.classList.remove(...x);
        }),
        w.length > 1)
      )
        O.forEach((S) => {
          const x = Q(S);
          x === b
            ? S.classList.add(...c.bulletActiveClass.split(' '))
            : e.isElement && S.setAttribute('part', 'bullet'),
            c.dynamicBullets &&
              (x >= C &&
                x <= P &&
                S.classList.add(...`${c.bulletActiveClass}-main`.split(' ')),
              x === C && u(S, 'prev'),
              x === P && u(S, 'next'));
        });
      else {
        const S = O[b];
        if (
          (S && S.classList.add(...c.bulletActiveClass.split(' ')),
          e.isElement &&
            O.forEach((x, M) => {
              x.setAttribute('part', M === b ? 'bullet-active' : 'bullet');
            }),
          c.dynamicBullets)
        ) {
          const x = O[C],
            M = O[P];
          for (let I = C; I <= P; I += 1)
            O[I] &&
              O[I].classList.add(...`${c.bulletActiveClass}-main`.split(' '));
          u(x, 'prev'), u(M, 'next');
        }
      }
      if (c.dynamicBullets) {
        const S = Math.min(O.length, c.dynamicMainBullets + 4),
          x = (o * S - o) / 2 - T * o,
          M = d ? 'right' : 'left';
        O.forEach((I) => {
          I.style[e.isHorizontal() ? M : 'top'] = `${x}px`;
        });
      }
    }
    w.forEach((O, C) => {
      if (
        (c.type === 'fraction' &&
          (O.querySelectorAll(W(c.currentClass)).forEach((P) => {
            P.textContent = c.formatFractionCurrent(b + 1);
          }),
          O.querySelectorAll(W(c.totalClass)).forEach((P) => {
            P.textContent = c.formatFractionTotal(z);
          })),
        c.type === 'progressbar')
      ) {
        let P;
        c.progressbarOpposite
          ? (P = e.isHorizontal() ? 'vertical' : 'horizontal')
          : (P = e.isHorizontal() ? 'horizontal' : 'vertical');
        const T = (b + 1) / z;
        let S = 1,
          x = 1;
        P === 'horizontal' ? (S = T) : (x = T),
          O.querySelectorAll(W(c.progressbarFillClass)).forEach((M) => {
            (M.style.transform = `translate3d(0,0,0) scaleX(${S}) scaleY(${x})`),
              (M.style.transitionDuration = `${e.params.speed}ms`);
          });
      }
      c.type === 'custom' && c.renderCustom
        ? ((O.innerHTML = c.renderCustom(e, b + 1, z)),
          C === 0 && n('paginationRender', O))
        : (C === 0 && n('paginationRender', O), n('paginationUpdate', O)),
        e.params.watchOverflow &&
          e.enabled &&
          O.classList[e.isLocked ? 'add' : 'remove'](c.lockClass);
    });
  }
  function m() {
    const d = e.params.pagination;
    if (a()) return;
    const c =
      e.virtual && e.params.virtual.enabled
        ? e.virtual.slides.length
        : e.grid && e.params.grid.rows > 1
        ? e.slides.length / Math.ceil(e.params.grid.rows)
        : e.slides.length;
    let w = e.pagination.el;
    w = k(w);
    let b = '';
    if (d.type === 'bullets') {
      let L = e.params.loop
        ? Math.ceil(c / e.params.slidesPerGroup)
        : e.snapGrid.length;
      e.params.freeMode && e.params.freeMode.enabled && L > c && (L = c);
      for (let A = 0; A < L; A += 1)
        d.renderBullet
          ? (b += d.renderBullet.call(e, A, d.bulletClass))
          : (b += `<${d.bulletElement} ${
              e.isElement ? 'part="bullet"' : ''
            } class="${d.bulletClass}"></${d.bulletElement}>`);
    }
    d.type === 'fraction' &&
      (d.renderFraction
        ? (b = d.renderFraction.call(e, d.currentClass, d.totalClass))
        : (b = `<span class="${d.currentClass}"></span> / <span class="${d.totalClass}"></span>`)),
      d.type === 'progressbar' &&
        (d.renderProgressbar
          ? (b = d.renderProgressbar.call(e, d.progressbarFillClass))
          : (b = `<span class="${d.progressbarFillClass}"></span>`)),
      (e.pagination.bullets = []),
      w.forEach((L) => {
        d.type !== 'custom' && (L.innerHTML = b || ''),
          d.type === 'bullets' &&
            e.pagination.bullets.push(...L.querySelectorAll(W(d.bulletClass)));
      }),
      d.type !== 'custom' && n('paginationRender', w[0]);
  }
  function h() {
    e.params.pagination = de(
      e,
      e.originalParams.pagination,
      e.params.pagination,
      { el: 'swiper-pagination' },
    );
    const d = e.params.pagination;
    if (!d.el) return;
    let c;
    typeof d.el == 'string' && e.isElement && (c = e.el.querySelector(d.el)),
      !c &&
        typeof d.el == 'string' &&
        (c = [...document.querySelectorAll(d.el)]),
      c || (c = d.el),
      !(!c || c.length === 0) &&
        (e.params.uniqueNavElements &&
          typeof d.el == 'string' &&
          Array.isArray(c) &&
          c.length > 1 &&
          ((c = [...e.el.querySelectorAll(d.el)]),
          c.length > 1 &&
            (c = c.filter((w) => be(w, '.swiper')[0] === e.el)[0])),
        Array.isArray(c) && c.length === 1 && (c = c[0]),
        Object.assign(e.pagination, { el: c }),
        (c = k(c)),
        c.forEach((w) => {
          d.type === 'bullets' &&
            d.clickable &&
            w.classList.add(...(d.clickableClass || '').split(' ')),
            w.classList.add(d.modifierClass + d.type),
            w.classList.add(
              e.isHorizontal() ? d.horizontalClass : d.verticalClass,
            ),
            d.type === 'bullets' &&
              d.dynamicBullets &&
              (w.classList.add(`${d.modifierClass}${d.type}-dynamic`),
              (l = 0),
              d.dynamicMainBullets < 1 && (d.dynamicMainBullets = 1)),
            d.type === 'progressbar' &&
              d.progressbarOpposite &&
              w.classList.add(d.progressbarOppositeClass),
            d.clickable && w.addEventListener('click', p),
            e.enabled || w.classList.add(d.lockClass);
        }));
  }
  function v() {
    const d = e.params.pagination;
    if (a()) return;
    let c = e.pagination.el;
    c &&
      ((c = k(c)),
      c.forEach((w) => {
        w.classList.remove(d.hiddenClass),
          w.classList.remove(d.modifierClass + d.type),
          w.classList.remove(
            e.isHorizontal() ? d.horizontalClass : d.verticalClass,
          ),
          d.clickable &&
            (w.classList.remove(...(d.clickableClass || '').split(' ')),
            w.removeEventListener('click', p));
      })),
      e.pagination.bullets &&
        e.pagination.bullets.forEach((w) =>
          w.classList.remove(...d.bulletActiveClass.split(' ')),
        );
  }
  s('changeDirection', () => {
    if (!e.pagination || !e.pagination.el) return;
    const d = e.params.pagination;
    let { el: c } = e.pagination;
    (c = k(c)),
      c.forEach((w) => {
        w.classList.remove(d.horizontalClass, d.verticalClass),
          w.classList.add(
            e.isHorizontal() ? d.horizontalClass : d.verticalClass,
          );
      });
  }),
    s('init', () => {
      e.params.pagination.enabled === !1 ? y() : (h(), m(), g());
    }),
    s('activeIndexChange', () => {
      typeof e.snapIndex > 'u' && g();
    }),
    s('snapIndexChange', () => {
      g();
    }),
    s('snapGridLengthChange', () => {
      m(), g();
    }),
    s('destroy', () => {
      v();
    }),
    s('enable disable', () => {
      let { el: d } = e.pagination;
      d &&
        ((d = k(d)),
        d.forEach((c) =>
          c.classList[e.enabled ? 'remove' : 'add'](
            e.params.pagination.lockClass,
          ),
        ));
    }),
    s('lock unlock', () => {
      g();
    }),
    s('click', (d, c) => {
      const w = c.target,
        b = k(e.pagination.el);
      if (
        e.params.pagination.el &&
        e.params.pagination.hideOnClick &&
        b &&
        b.length > 0 &&
        !w.classList.contains(e.params.pagination.bulletClass)
      ) {
        if (
          e.navigation &&
          ((e.navigation.nextEl && w === e.navigation.nextEl) ||
            (e.navigation.prevEl && w === e.navigation.prevEl))
        )
          return;
        const L = b[0].classList.contains(e.params.pagination.hiddenClass);
        n(L === !0 ? 'paginationShow' : 'paginationHide'),
          b.forEach((A) => A.classList.toggle(e.params.pagination.hiddenClass));
      }
    });
  const E = () => {
      e.el.classList.remove(e.params.pagination.paginationDisabledClass);
      let { el: d } = e.pagination;
      d &&
        ((d = k(d)),
        d.forEach((c) =>
          c.classList.remove(e.params.pagination.paginationDisabledClass),
        )),
        h(),
        m(),
        g();
    },
    y = () => {
      e.el.classList.add(e.params.pagination.paginationDisabledClass);
      let { el: d } = e.pagination;
      d &&
        ((d = k(d)),
        d.forEach((c) =>
          c.classList.add(e.params.pagination.paginationDisabledClass),
        )),
        v();
    };
  Object.assign(e.pagination, {
    enable: E,
    disable: y,
    render: m,
    update: g,
    init: h,
    destroy: v,
  });
}
function Me(i) {
  let { swiper: e, extendParams: t, on: s, emit: n } = i;
  const r = R();
  let o = !1,
    l = null,
    a = null,
    u,
    f,
    p,
    g;
  t({
    scrollbar: {
      el: null,
      dragSize: 'auto',
      hide: !1,
      draggable: !1,
      snapOnRelease: !0,
      lockClass: 'swiper-scrollbar-lock',
      dragClass: 'swiper-scrollbar-drag',
      scrollbarDisabledClass: 'swiper-scrollbar-disabled',
      horizontalClass: 'swiper-scrollbar-horizontal',
      verticalClass: 'swiper-scrollbar-vertical',
    },
  }),
    (e.scrollbar = { el: null, dragEl: null });
  function m() {
    if (!e.params.scrollbar.el || !e.scrollbar.el) return;
    const { scrollbar: T, rtlTranslate: S } = e,
      { dragEl: x, el: M } = T,
      I = e.params.scrollbar,
      V = e.params.loop ? e.progressLoop : e.progress;
    let F = f,
      D = (p - f) * V;
    S
      ? ((D = -D), D > 0 ? ((F = f - D), (D = 0)) : -D + f > p && (F = p + D))
      : D < 0
      ? ((F = f + D), (D = 0))
      : D + f > p && (F = p - D),
      e.isHorizontal()
        ? ((x.style.transform = `translate3d(${D}px, 0, 0)`),
          (x.style.width = `${F}px`))
        : ((x.style.transform = `translate3d(0px, ${D}px, 0)`),
          (x.style.height = `${F}px`)),
      I.hide &&
        (clearTimeout(l),
        (M.style.opacity = 1),
        (l = setTimeout(() => {
          (M.style.opacity = 0), (M.style.transitionDuration = '400ms');
        }, 1e3)));
  }
  function h(T) {
    !e.params.scrollbar.el ||
      !e.scrollbar.el ||
      (e.scrollbar.dragEl.style.transitionDuration = `${T}ms`);
  }
  function v() {
    if (!e.params.scrollbar.el || !e.scrollbar.el) return;
    const { scrollbar: T } = e,
      { dragEl: S, el: x } = T;
    (S.style.width = ''),
      (S.style.height = ''),
      (p = e.isHorizontal() ? x.offsetWidth : x.offsetHeight),
      (g =
        e.size /
        (e.virtualSize +
          e.params.slidesOffsetBefore -
          (e.params.centeredSlides ? e.snapGrid[0] : 0))),
      e.params.scrollbar.dragSize === 'auto'
        ? (f = p * g)
        : (f = parseInt(e.params.scrollbar.dragSize, 10)),
      e.isHorizontal()
        ? (S.style.width = `${f}px`)
        : (S.style.height = `${f}px`),
      g >= 1 ? (x.style.display = 'none') : (x.style.display = ''),
      e.params.scrollbar.hide && (x.style.opacity = 0),
      e.params.watchOverflow &&
        e.enabled &&
        T.el.classList[e.isLocked ? 'add' : 'remove'](
          e.params.scrollbar.lockClass,
        );
  }
  function E(T) {
    return e.isHorizontal() ? T.clientX : T.clientY;
  }
  function y(T) {
    const { scrollbar: S, rtlTranslate: x } = e,
      { el: M } = S;
    let I;
    (I =
      (E(T) -
        Ge(M)[e.isHorizontal() ? 'left' : 'top'] -
        (u !== null ? u : f / 2)) /
      (p - f)),
      (I = Math.max(Math.min(I, 1), 0)),
      x && (I = 1 - I);
    const V = e.minTranslate() + (e.maxTranslate() - e.minTranslate()) * I;
    e.updateProgress(V),
      e.setTranslate(V),
      e.updateActiveIndex(),
      e.updateSlidesClasses();
  }
  function d(T) {
    const S = e.params.scrollbar,
      { scrollbar: x, wrapperEl: M } = e,
      { el: I, dragEl: V } = x;
    (o = !0),
      (u =
        T.target === V
          ? E(T) -
            T.target.getBoundingClientRect()[e.isHorizontal() ? 'left' : 'top']
          : null),
      T.preventDefault(),
      T.stopPropagation(),
      (M.style.transitionDuration = '100ms'),
      (V.style.transitionDuration = '100ms'),
      y(T),
      clearTimeout(a),
      (I.style.transitionDuration = '0ms'),
      S.hide && (I.style.opacity = 1),
      e.params.cssMode && (e.wrapperEl.style['scroll-snap-type'] = 'none'),
      n('scrollbarDragStart', T);
  }
  function c(T) {
    const { scrollbar: S, wrapperEl: x } = e,
      { el: M, dragEl: I } = S;
    o &&
      (T.preventDefault && T.cancelable
        ? T.preventDefault()
        : (T.returnValue = !1),
      y(T),
      (x.style.transitionDuration = '0ms'),
      (M.style.transitionDuration = '0ms'),
      (I.style.transitionDuration = '0ms'),
      n('scrollbarDragMove', T));
  }
  function w(T) {
    const S = e.params.scrollbar,
      { scrollbar: x, wrapperEl: M } = e,
      { el: I } = x;
    o &&
      ((o = !1),
      e.params.cssMode &&
        ((e.wrapperEl.style['scroll-snap-type'] = ''),
        (M.style.transitionDuration = '')),
      S.hide &&
        (clearTimeout(a),
        (a = U(() => {
          (I.style.opacity = 0), (I.style.transitionDuration = '400ms');
        }, 1e3))),
      n('scrollbarDragEnd', T),
      S.snapOnRelease && e.slideToClosest());
  }
  function b(T) {
    const { scrollbar: S, params: x } = e,
      M = S.el;
    if (!M) return;
    const I = M,
      V = x.passiveListeners ? { passive: !1, capture: !1 } : !1,
      F = x.passiveListeners ? { passive: !0, capture: !1 } : !1;
    if (!I) return;
    const D = T === 'on' ? 'addEventListener' : 'removeEventListener';
    I[D]('pointerdown', d, V),
      r[D]('pointermove', c, V),
      r[D]('pointerup', w, F);
  }
  function L() {
    !e.params.scrollbar.el || !e.scrollbar.el || b('on');
  }
  function A() {
    !e.params.scrollbar.el || !e.scrollbar.el || b('off');
  }
  function z() {
    const { scrollbar: T, el: S } = e;
    e.params.scrollbar = de(e, e.originalParams.scrollbar, e.params.scrollbar, {
      el: 'swiper-scrollbar',
    });
    const x = e.params.scrollbar;
    if (!x.el) return;
    let M;
    if (
      (typeof x.el == 'string' && e.isElement && (M = e.el.querySelector(x.el)),
      !M && typeof x.el == 'string')
    ) {
      if (((M = r.querySelectorAll(x.el)), !M.length)) return;
    } else M || (M = x.el);
    e.params.uniqueNavElements &&
      typeof x.el == 'string' &&
      M.length > 1 &&
      S.querySelectorAll(x.el).length === 1 &&
      (M = S.querySelector(x.el)),
      M.length > 0 && (M = M[0]),
      M.classList.add(e.isHorizontal() ? x.horizontalClass : x.verticalClass);
    let I;
    M &&
      ((I = M.querySelector(W(e.params.scrollbar.dragClass))),
      I || ((I = q('div', e.params.scrollbar.dragClass)), M.append(I))),
      Object.assign(T, { el: M, dragEl: I }),
      x.draggable && L(),
      M &&
        M.classList[e.enabled ? 'remove' : 'add'](
          ...N(e.params.scrollbar.lockClass),
        );
  }
  function O() {
    const T = e.params.scrollbar,
      S = e.scrollbar.el;
    S &&
      S.classList.remove(
        ...N(e.isHorizontal() ? T.horizontalClass : T.verticalClass),
      ),
      A();
  }
  s('changeDirection', () => {
    if (!e.scrollbar || !e.scrollbar.el) return;
    const T = e.params.scrollbar;
    let { el: S } = e.scrollbar;
    (S = k(S)),
      S.forEach((x) => {
        x.classList.remove(T.horizontalClass, T.verticalClass),
          x.classList.add(
            e.isHorizontal() ? T.horizontalClass : T.verticalClass,
          );
      });
  }),
    s('init', () => {
      e.params.scrollbar.enabled === !1 ? P() : (z(), v(), m());
    }),
    s('update resize observerUpdate lock unlock changeDirection', () => {
      v();
    }),
    s('setTranslate', () => {
      m();
    }),
    s('setTransition', (T, S) => {
      h(S);
    }),
    s('enable disable', () => {
      const { el: T } = e.scrollbar;
      T &&
        T.classList[e.enabled ? 'remove' : 'add'](
          ...N(e.params.scrollbar.lockClass),
        );
    }),
    s('destroy', () => {
      O();
    });
  const C = () => {
      e.el.classList.remove(...N(e.params.scrollbar.scrollbarDisabledClass)),
        e.scrollbar.el &&
          e.scrollbar.el.classList.remove(
            ...N(e.params.scrollbar.scrollbarDisabledClass),
          ),
        z(),
        v(),
        m();
    },
    P = () => {
      e.el.classList.add(...N(e.params.scrollbar.scrollbarDisabledClass)),
        e.scrollbar.el &&
          e.scrollbar.el.classList.add(
            ...N(e.params.scrollbar.scrollbarDisabledClass),
          ),
        O();
    };
  Object.assign(e.scrollbar, {
    enable: C,
    disable: P,
    updateSize: v,
    setTranslate: m,
    init: z,
    destroy: O,
  });
}
class Xt extends window.HTMLElement {
  constructor() {
    super(),
      (this.slider = new B('.swiper', {
        modules: [Ee, Ce, Me],
        slidesPerView: 4,
        autoplay: !1,
        Scrollbar: !0,
        spaceBetween: 10,
        scrollbar: { el: '.swiper-scrollbar', draggable: !0 },
      }));
  }
}
class Ut extends window.HTMLElement {
  constructor() {
    super(), (this.handleResize = this.handleResize.bind(this));
  }
  connectedCallback() {
    window.addEventListener('resize', this.handleResize),
      window.innerWidth > 768
        ? this.slider && this.destroySlider()
        : this.initSlider();
  }
  handleResize() {
    window.innerWidth > 768
      ? (console.log('what is this slider', this.slider),
        this.slider && this.destroySlider())
      : this.initSlider();
  }
  initSlider() {
    (this.slider = new B('.menu.swiper', {
      modules: [Ee, Ce, Me],
      slidesPerView: 4,
      autoplay: !1,
      scrollbar: { draggable: !0 },
      spaceBetween: 10,
    })),
      console.log('slider init', this.slider);
  }
  destroySlider() {
    this.slider &&
      (this.slider.destroy(!0, !0),
      this.slider.update(),
      console.log('this slider', this.slider));
  }
}
window.customElements.define('swiper-slider', Xt);
window.customElements.define('menu-swiper', Ut);
