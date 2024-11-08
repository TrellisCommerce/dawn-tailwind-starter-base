/* empty css                 */ function je(s) {
  return (
    s !== null &&
    typeof s == 'object' &&
    'constructor' in s &&
    s.constructor === Object
  );
}
function Be(s, e) {
  s === void 0 && (s = {}),
    e === void 0 && (e = {}),
    Object.keys(e).forEach((t) => {
      typeof s[t] > 'u'
        ? (s[t] = e[t])
        : je(e[t]) &&
          je(s[t]) &&
          Object.keys(e[t]).length > 0 &&
          Be(s[t], e[t]);
    });
}
const et = {
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
function q() {
  const s = typeof document < 'u' ? document : {};
  return Be(s, et), s;
}
const nt = {
  document: et,
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
  requestAnimationFrame(s) {
    return typeof setTimeout > 'u' ? (s(), null) : setTimeout(s, 0);
  },
  cancelAnimationFrame(s) {
    typeof setTimeout > 'u' || clearTimeout(s);
  },
};
function F() {
  const s = typeof window < 'u' ? window : {};
  return Be(s, nt), s;
}
function ee(s) {
  return (
    s === void 0 && (s = ''),
    s
      .trim()
      .split(' ')
      .filter((e) => !!e.trim())
  );
}
function lt(s) {
  const e = s;
  Object.keys(e).forEach((t) => {
    try {
      e[t] = null;
    } catch {}
    try {
      delete e[t];
    } catch {}
  });
}
function re(s, e) {
  return e === void 0 && (e = 0), setTimeout(s, e);
}
function Z() {
  return Date.now();
}
function ot(s) {
  const e = F();
  let t;
  return (
    e.getComputedStyle && (t = e.getComputedStyle(s, null)),
    !t && s.currentStyle && (t = s.currentStyle),
    t || (t = s.style),
    t
  );
}
function ke(s, e) {
  e === void 0 && (e = 'x');
  const t = F();
  let i, a, r;
  const f = ot(s);
  return (
    t.WebKitCSSMatrix
      ? ((a = f.transform || f.webkitTransform),
        a.split(',').length > 6 &&
          (a = a
            .split(', ')
            .map((c) => c.replace(',', '.'))
            .join(', ')),
        (r = new t.WebKitCSSMatrix(a === 'none' ? '' : a)))
      : ((r =
          f.MozTransform ||
          f.OTransform ||
          f.MsTransform ||
          f.msTransform ||
          f.transform ||
          f
            .getPropertyValue('transform')
            .replace('translate(', 'matrix(1, 0, 0, 1,')),
        (i = r.toString().split(','))),
    e === 'x' &&
      (t.WebKitCSSMatrix
        ? (a = r.m41)
        : i.length === 16
        ? (a = parseFloat(i[12]))
        : (a = parseFloat(i[4]))),
    e === 'y' &&
      (t.WebKitCSSMatrix
        ? (a = r.m42)
        : i.length === 16
        ? (a = parseFloat(i[13]))
        : (a = parseFloat(i[5]))),
    a || 0
  );
}
function fe(s) {
  return (
    typeof s == 'object' &&
    s !== null &&
    s.constructor &&
    Object.prototype.toString.call(s).slice(8, -1) === 'Object'
  );
}
function dt(s) {
  return typeof window < 'u' && typeof window.HTMLElement < 'u'
    ? s instanceof HTMLElement
    : s && (s.nodeType === 1 || s.nodeType === 11);
}
function U() {
  const s = Object(arguments.length <= 0 ? void 0 : arguments[0]),
    e = ['__proto__', 'constructor', 'prototype'];
  for (let t = 1; t < arguments.length; t += 1) {
    const i = t < 0 || arguments.length <= t ? void 0 : arguments[t];
    if (i != null && !dt(i)) {
      const a = Object.keys(Object(i)).filter((r) => e.indexOf(r) < 0);
      for (let r = 0, f = a.length; r < f; r += 1) {
        const c = a[r],
          n = Object.getOwnPropertyDescriptor(i, c);
        n !== void 0 &&
          n.enumerable &&
          (fe(s[c]) && fe(i[c])
            ? i[c].__swiper__
              ? (s[c] = i[c])
              : U(s[c], i[c])
            : !fe(s[c]) && fe(i[c])
            ? ((s[c] = {}), i[c].__swiper__ ? (s[c] = i[c]) : U(s[c], i[c]))
            : (s[c] = i[c]));
      }
    }
  }
  return s;
}
function ue(s, e, t) {
  s.style.setProperty(e, t);
}
function tt(s) {
  let { swiper: e, targetPosition: t, side: i } = s;
  const a = F(),
    r = -e.translate;
  let f = null,
    c;
  const n = e.params.speed;
  (e.wrapperEl.style.scrollSnapType = 'none'),
    a.cancelAnimationFrame(e.cssModeFrameID);
  const u = t > r ? 'next' : 'prev',
    o = (d, m) => (u === 'next' && d >= m) || (u === 'prev' && d <= m),
    l = () => {
      (c = new Date().getTime()), f === null && (f = c);
      const d = Math.max(Math.min((c - f) / n, 1), 0),
        m = 0.5 - Math.cos(d * Math.PI) / 2;
      let g = r + m * (t - r);
      if ((o(g, t) && (g = t), e.wrapperEl.scrollTo({ [i]: g }), o(g, t))) {
        (e.wrapperEl.style.overflow = 'hidden'),
          (e.wrapperEl.style.scrollSnapType = ''),
          setTimeout(() => {
            (e.wrapperEl.style.overflow = ''), e.wrapperEl.scrollTo({ [i]: g });
          }),
          a.cancelAnimationFrame(e.cssModeFrameID);
        return;
      }
      e.cssModeFrameID = a.requestAnimationFrame(l);
    };
  l();
}
function ae(s) {
  return (
    s.querySelector('.swiper-slide-transform') ||
    (s.shadowRoot && s.shadowRoot.querySelector('.swiper-slide-transform')) ||
    s
  );
}
function W(s, e) {
  e === void 0 && (e = '');
  const t = [...s.children];
  return (
    s instanceof HTMLSlotElement && t.push(...s.assignedElements()),
    e ? t.filter((i) => i.matches(e)) : t
  );
}
function ct(s, e) {
  const t = e.contains(s);
  return !t && e instanceof HTMLSlotElement
    ? [...e.assignedElements()].includes(s)
    : t;
}
function be(s) {
  try {
    console.warn(s);
    return;
  } catch {}
}
function K(s, e) {
  e === void 0 && (e = []);
  const t = document.createElement(s);
  return t.classList.add(...(Array.isArray(e) ? e : ee(e))), t;
}
function Se(s) {
  const e = F(),
    t = q(),
    i = s.getBoundingClientRect(),
    a = t.body,
    r = s.clientTop || a.clientTop || 0,
    f = s.clientLeft || a.clientLeft || 0,
    c = s === e ? e.scrollY : s.scrollTop,
    n = s === e ? e.scrollX : s.scrollLeft;
  return { top: i.top + c - r, left: i.left + n - f };
}
function ft(s, e) {
  const t = [];
  for (; s.previousElementSibling; ) {
    const i = s.previousElementSibling;
    e ? i.matches(e) && t.push(i) : t.push(i), (s = i);
  }
  return t;
}
function ut(s, e) {
  const t = [];
  for (; s.nextElementSibling; ) {
    const i = s.nextElementSibling;
    e ? i.matches(e) && t.push(i) : t.push(i), (s = i);
  }
  return t;
}
function te(s, e) {
  return F().getComputedStyle(s, null).getPropertyValue(e);
}
function me(s) {
  let e = s,
    t;
  if (e) {
    for (t = 0; (e = e.previousSibling) !== null; )
      e.nodeType === 1 && (t += 1);
    return t;
  }
}
function ie(s, e) {
  const t = [];
  let i = s.parentElement;
  for (; i; ) e ? i.matches(e) && t.push(i) : t.push(i), (i = i.parentElement);
  return t;
}
function pe(s, e) {
  function t(i) {
    i.target === s && (e.call(s, i), s.removeEventListener('transitionend', t));
  }
  e && s.addEventListener('transitionend', t);
}
function Ge(s, e, t) {
  const i = F();
  return t
    ? s[e === 'width' ? 'offsetWidth' : 'offsetHeight'] +
        parseFloat(
          i
            .getComputedStyle(s, null)
            .getPropertyValue(e === 'width' ? 'margin-right' : 'margin-top'),
        ) +
        parseFloat(
          i
            .getComputedStyle(s, null)
            .getPropertyValue(e === 'width' ? 'margin-left' : 'margin-bottom'),
        )
    : s.offsetWidth;
}
function X(s) {
  return (Array.isArray(s) ? s : [s]).filter((e) => !!e);
}
function Ee(s) {
  return (e) =>
    Math.abs(e) > 0 &&
    s.browser &&
    s.browser.need3dFix &&
    Math.abs(e) % 90 === 0
      ? e + 0.001
      : e;
}
let Le;
function pt() {
  const s = F(),
    e = q();
  return {
    smoothScroll:
      e.documentElement &&
      e.documentElement.style &&
      'scrollBehavior' in e.documentElement.style,
    touch: !!(
      'ontouchstart' in s ||
      (s.DocumentTouch && e instanceof s.DocumentTouch)
    ),
  };
}
function st() {
  return Le || (Le = pt()), Le;
}
let Ie;
function mt(s) {
  let { userAgent: e } = s === void 0 ? {} : s;
  const t = st(),
    i = F(),
    a = i.navigator.platform,
    r = e || i.navigator.userAgent,
    f = { ios: !1, android: !1 },
    c = i.screen.width,
    n = i.screen.height,
    u = r.match(/(Android);?[\s\/]+([\d.]+)?/);
  let o = r.match(/(iPad).*OS\s([\d_]+)/);
  const l = r.match(/(iPod)(.*OS\s([\d_]+))?/),
    d = !o && r.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
    m = a === 'Win32';
  let g = a === 'MacIntel';
  const h = [
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
    !o &&
      g &&
      t.touch &&
      h.indexOf(`${c}x${n}`) >= 0 &&
      ((o = r.match(/(Version)\/([\d.]+)/)),
      o || (o = [0, 1, '13_0_0']),
      (g = !1)),
    u && !m && ((f.os = 'android'), (f.android = !0)),
    (o || d || l) && ((f.os = 'ios'), (f.ios = !0)),
    f
  );
}
function it(s) {
  return s === void 0 && (s = {}), Ie || (Ie = mt(s)), Ie;
}
let ze;
function ht() {
  const s = F(),
    e = it();
  let t = !1;
  function i() {
    const c = s.navigator.userAgent.toLowerCase();
    return (
      c.indexOf('safari') >= 0 &&
      c.indexOf('chrome') < 0 &&
      c.indexOf('android') < 0
    );
  }
  if (i()) {
    const c = String(s.navigator.userAgent);
    if (c.includes('Version/')) {
      const [n, u] = c
        .split('Version/')[1]
        .split(' ')[0]
        .split('.')
        .map((o) => Number(o));
      t = n < 16 || (n === 16 && u < 2);
    }
  }
  const a = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
      s.navigator.userAgent,
    ),
    r = i(),
    f = r || (a && e.ios);
  return {
    isSafari: t || r,
    needPerspectiveFix: t,
    need3dFix: f,
    isWebView: a,
  };
}
function gt() {
  return ze || (ze = ht()), ze;
}
function vt(s) {
  let { swiper: e, on: t, emit: i } = s;
  const a = F();
  let r = null,
    f = null;
  const c = () => {
      !e || e.destroyed || !e.initialized || (i('beforeResize'), i('resize'));
    },
    n = () => {
      !e ||
        e.destroyed ||
        !e.initialized ||
        ((r = new ResizeObserver((l) => {
          f = a.requestAnimationFrame(() => {
            const { width: d, height: m } = e;
            let g = d,
              h = m;
            l.forEach((w) => {
              let { contentBoxSize: y, contentRect: v, target: p } = w;
              (p && p !== e.el) ||
                ((g = v ? v.width : (y[0] || y).inlineSize),
                (h = v ? v.height : (y[0] || y).blockSize));
            }),
              (g !== d || h !== m) && c();
          });
        })),
        r.observe(e.el));
    },
    u = () => {
      f && a.cancelAnimationFrame(f),
        r && r.unobserve && e.el && (r.unobserve(e.el), (r = null));
    },
    o = () => {
      !e || e.destroyed || !e.initialized || i('orientationchange');
    };
  t('init', () => {
    if (e.params.resizeObserver && typeof a.ResizeObserver < 'u') {
      n();
      return;
    }
    a.addEventListener('resize', c), a.addEventListener('orientationchange', o);
  }),
    t('destroy', () => {
      u(),
        a.removeEventListener('resize', c),
        a.removeEventListener('orientationchange', o);
    });
}
function wt(s) {
  let { swiper: e, extendParams: t, on: i, emit: a } = s;
  const r = [],
    f = F(),
    c = function (o, l) {
      l === void 0 && (l = {});
      const d = f.MutationObserver || f.WebkitMutationObserver,
        m = new d((g) => {
          if (e.__preventObserver__) return;
          if (g.length === 1) {
            a('observerUpdate', g[0]);
            return;
          }
          const h = function () {
            a('observerUpdate', g[0]);
          };
          f.requestAnimationFrame
            ? f.requestAnimationFrame(h)
            : f.setTimeout(h, 0);
        });
      m.observe(o, {
        attributes: typeof l.attributes > 'u' ? !0 : l.attributes,
        childList: e.isElement || (typeof l.childList > 'u' ? !0 : l).childList,
        characterData: typeof l.characterData > 'u' ? !0 : l.characterData,
      }),
        r.push(m);
    },
    n = () => {
      if (e.params.observer) {
        if (e.params.observeParents) {
          const o = ie(e.hostEl);
          for (let l = 0; l < o.length; l += 1) c(o[l]);
        }
        c(e.hostEl, { childList: e.params.observeSlideChildren }),
          c(e.wrapperEl, { attributes: !1 });
      }
    },
    u = () => {
      r.forEach((o) => {
        o.disconnect();
      }),
        r.splice(0, r.length);
    };
  t({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
    i('init', n),
    i('destroy', u);
}
var yt = {
  on(s, e, t) {
    const i = this;
    if (!i.eventsListeners || i.destroyed || typeof e != 'function') return i;
    const a = t ? 'unshift' : 'push';
    return (
      s.split(' ').forEach((r) => {
        i.eventsListeners[r] || (i.eventsListeners[r] = []),
          i.eventsListeners[r][a](e);
      }),
      i
    );
  },
  once(s, e, t) {
    const i = this;
    if (!i.eventsListeners || i.destroyed || typeof e != 'function') return i;
    function a() {
      i.off(s, a), a.__emitterProxy && delete a.__emitterProxy;
      for (var r = arguments.length, f = new Array(r), c = 0; c < r; c++)
        f[c] = arguments[c];
      e.apply(i, f);
    }
    return (a.__emitterProxy = e), i.on(s, a, t);
  },
  onAny(s, e) {
    const t = this;
    if (!t.eventsListeners || t.destroyed || typeof s != 'function') return t;
    const i = e ? 'unshift' : 'push';
    return t.eventsAnyListeners.indexOf(s) < 0 && t.eventsAnyListeners[i](s), t;
  },
  offAny(s) {
    const e = this;
    if (!e.eventsListeners || e.destroyed || !e.eventsAnyListeners) return e;
    const t = e.eventsAnyListeners.indexOf(s);
    return t >= 0 && e.eventsAnyListeners.splice(t, 1), e;
  },
  off(s, e) {
    const t = this;
    return (
      !t.eventsListeners ||
        t.destroyed ||
        !t.eventsListeners ||
        s.split(' ').forEach((i) => {
          typeof e > 'u'
            ? (t.eventsListeners[i] = [])
            : t.eventsListeners[i] &&
              t.eventsListeners[i].forEach((a, r) => {
                (a === e || (a.__emitterProxy && a.__emitterProxy === e)) &&
                  t.eventsListeners[i].splice(r, 1);
              });
        }),
      t
    );
  },
  emit() {
    const s = this;
    if (!s.eventsListeners || s.destroyed || !s.eventsListeners) return s;
    let e, t, i;
    for (var a = arguments.length, r = new Array(a), f = 0; f < a; f++)
      r[f] = arguments[f];
    return (
      typeof r[0] == 'string' || Array.isArray(r[0])
        ? ((e = r[0]), (t = r.slice(1, r.length)), (i = s))
        : ((e = r[0].events), (t = r[0].data), (i = r[0].context || s)),
      t.unshift(i),
      (Array.isArray(e) ? e : e.split(' ')).forEach((n) => {
        s.eventsAnyListeners &&
          s.eventsAnyListeners.length &&
          s.eventsAnyListeners.forEach((u) => {
            u.apply(i, [n, ...t]);
          }),
          s.eventsListeners &&
            s.eventsListeners[n] &&
            s.eventsListeners[n].forEach((u) => {
              u.apply(i, t);
            });
      }),
      s
    );
  },
};
function bt() {
  const s = this;
  let e, t;
  const i = s.el;
  typeof s.params.width < 'u' && s.params.width !== null
    ? (e = s.params.width)
    : (e = i.clientWidth),
    typeof s.params.height < 'u' && s.params.height !== null
      ? (t = s.params.height)
      : (t = i.clientHeight),
    !((e === 0 && s.isHorizontal()) || (t === 0 && s.isVertical())) &&
      ((e =
        e -
        parseInt(te(i, 'padding-left') || 0, 10) -
        parseInt(te(i, 'padding-right') || 0, 10)),
      (t =
        t -
        parseInt(te(i, 'padding-top') || 0, 10) -
        parseInt(te(i, 'padding-bottom') || 0, 10)),
      Number.isNaN(e) && (e = 0),
      Number.isNaN(t) && (t = 0),
      Object.assign(s, {
        width: e,
        height: t,
        size: s.isHorizontal() ? e : t,
      }));
}
function St() {
  const s = this;
  function e(P, I) {
    return parseFloat(P.getPropertyValue(s.getDirectionLabel(I)) || 0);
  }
  const t = s.params,
    { wrapperEl: i, slidesEl: a, size: r, rtlTranslate: f, wrongRTL: c } = s,
    n = s.virtual && t.virtual.enabled,
    u = n ? s.virtual.slides.length : s.slides.length,
    o = W(a, `.${s.params.slideClass}, swiper-slide`),
    l = n ? s.virtual.slides.length : o.length;
  let d = [];
  const m = [],
    g = [];
  let h = t.slidesOffsetBefore;
  typeof h == 'function' && (h = t.slidesOffsetBefore.call(s));
  let w = t.slidesOffsetAfter;
  typeof w == 'function' && (w = t.slidesOffsetAfter.call(s));
  const y = s.snapGrid.length,
    v = s.slidesGrid.length;
  let p = t.spaceBetween,
    b = -h,
    E = 0,
    z = 0;
  if (typeof r > 'u') return;
  typeof p == 'string' && p.indexOf('%') >= 0
    ? (p = (parseFloat(p.replace('%', '')) / 100) * r)
    : typeof p == 'string' && (p = parseFloat(p)),
    (s.virtualSize = -p),
    o.forEach((P) => {
      f ? (P.style.marginLeft = '') : (P.style.marginRight = ''),
        (P.style.marginBottom = ''),
        (P.style.marginTop = '');
    }),
    t.centeredSlides &&
      t.cssMode &&
      (ue(i, '--swiper-centered-offset-before', ''),
      ue(i, '--swiper-centered-offset-after', ''));
  const D = t.grid && t.grid.rows > 1 && s.grid;
  D ? s.grid.initSlides(o) : s.grid && s.grid.unsetSlides();
  let A;
  const M =
    t.slidesPerView === 'auto' &&
    t.breakpoints &&
    Object.keys(t.breakpoints).filter(
      (P) => typeof t.breakpoints[P].slidesPerView < 'u',
    ).length > 0;
  for (let P = 0; P < l; P += 1) {
    A = 0;
    let I;
    if (
      (o[P] && (I = o[P]),
      D && s.grid.updateSlide(P, I, o),
      !(o[P] && te(I, 'display') === 'none'))
    ) {
      if (t.slidesPerView === 'auto') {
        M && (o[P].style[s.getDirectionLabel('width')] = '');
        const C = getComputedStyle(I),
          S = I.style.transform,
          x = I.style.webkitTransform;
        if (
          (S && (I.style.transform = 'none'),
          x && (I.style.webkitTransform = 'none'),
          t.roundLengths)
        )
          A = s.isHorizontal() ? Ge(I, 'width', !0) : Ge(I, 'height', !0);
        else {
          const $ = e(C, 'width'),
            H = e(C, 'padding-left'),
            T = e(C, 'padding-right'),
            L = e(C, 'margin-left'),
            G = e(C, 'margin-right'),
            V = C.getPropertyValue('box-sizing');
          if (V && V === 'border-box') A = $ + L + G;
          else {
            const { clientWidth: O, offsetWidth: k } = I;
            A = $ + H + T + L + G + (k - O);
          }
        }
        S && (I.style.transform = S),
          x && (I.style.webkitTransform = x),
          t.roundLengths && (A = Math.floor(A));
      } else
        (A = (r - (t.slidesPerView - 1) * p) / t.slidesPerView),
          t.roundLengths && (A = Math.floor(A)),
          o[P] && (o[P].style[s.getDirectionLabel('width')] = `${A}px`);
      o[P] && (o[P].swiperSlideSize = A),
        g.push(A),
        t.centeredSlides
          ? ((b = b + A / 2 + E / 2 + p),
            E === 0 && P !== 0 && (b = b - r / 2 - p),
            P === 0 && (b = b - r / 2 - p),
            Math.abs(b) < 1 / 1e3 && (b = 0),
            t.roundLengths && (b = Math.floor(b)),
            z % t.slidesPerGroup === 0 && d.push(b),
            m.push(b))
          : (t.roundLengths && (b = Math.floor(b)),
            (z - Math.min(s.params.slidesPerGroupSkip, z)) %
              s.params.slidesPerGroup ===
              0 && d.push(b),
            m.push(b),
            (b = b + A + p)),
        (s.virtualSize += A + p),
        (E = A),
        (z += 1);
    }
  }
  if (
    ((s.virtualSize = Math.max(s.virtualSize, r) + w),
    f &&
      c &&
      (t.effect === 'slide' || t.effect === 'coverflow') &&
      (i.style.width = `${s.virtualSize + p}px`),
    t.setWrapperSize &&
      (i.style[s.getDirectionLabel('width')] = `${s.virtualSize + p}px`),
    D && s.grid.updateWrapperSize(A, d),
    !t.centeredSlides)
  ) {
    const P = [];
    for (let I = 0; I < d.length; I += 1) {
      let C = d[I];
      t.roundLengths && (C = Math.floor(C)),
        d[I] <= s.virtualSize - r && P.push(C);
    }
    (d = P),
      Math.floor(s.virtualSize - r) - Math.floor(d[d.length - 1]) > 1 &&
        d.push(s.virtualSize - r);
  }
  if (n && t.loop) {
    const P = g[0] + p;
    if (t.slidesPerGroup > 1) {
      const I = Math.ceil(
          (s.virtual.slidesBefore + s.virtual.slidesAfter) / t.slidesPerGroup,
        ),
        C = P * t.slidesPerGroup;
      for (let S = 0; S < I; S += 1) d.push(d[d.length - 1] + C);
    }
    for (let I = 0; I < s.virtual.slidesBefore + s.virtual.slidesAfter; I += 1)
      t.slidesPerGroup === 1 && d.push(d[d.length - 1] + P),
        m.push(m[m.length - 1] + P),
        (s.virtualSize += P);
  }
  if ((d.length === 0 && (d = [0]), p !== 0)) {
    const P =
      s.isHorizontal() && f ? 'marginLeft' : s.getDirectionLabel('marginRight');
    o.filter((I, C) =>
      !t.cssMode || t.loop ? !0 : C !== o.length - 1,
    ).forEach((I) => {
      I.style[P] = `${p}px`;
    });
  }
  if (t.centeredSlides && t.centeredSlidesBounds) {
    let P = 0;
    g.forEach((C) => {
      P += C + (p || 0);
    }),
      (P -= p);
    const I = P > r ? P - r : 0;
    d = d.map((C) => (C <= 0 ? -h : C > I ? I + w : C));
  }
  if (t.centerInsufficientSlides) {
    let P = 0;
    g.forEach((C) => {
      P += C + (p || 0);
    }),
      (P -= p);
    const I = (t.slidesOffsetBefore || 0) + (t.slidesOffsetAfter || 0);
    if (P + I < r) {
      const C = (r - P - I) / 2;
      d.forEach((S, x) => {
        d[x] = S - C;
      }),
        m.forEach((S, x) => {
          m[x] = S + C;
        });
    }
  }
  if (
    (Object.assign(s, {
      slides: o,
      snapGrid: d,
      slidesGrid: m,
      slidesSizesGrid: g,
    }),
    t.centeredSlides && t.cssMode && !t.centeredSlidesBounds)
  ) {
    ue(i, '--swiper-centered-offset-before', `${-d[0]}px`),
      ue(
        i,
        '--swiper-centered-offset-after',
        `${s.size / 2 - g[g.length - 1] / 2}px`,
      );
    const P = -s.snapGrid[0],
      I = -s.slidesGrid[0];
    (s.snapGrid = s.snapGrid.map((C) => C + P)),
      (s.slidesGrid = s.slidesGrid.map((C) => C + I));
  }
  if (
    (l !== u && s.emit('slidesLengthChange'),
    d.length !== y &&
      (s.params.watchOverflow && s.checkOverflow(),
      s.emit('snapGridLengthChange')),
    m.length !== v && s.emit('slidesGridLengthChange'),
    t.watchSlidesProgress && s.updateSlidesOffset(),
    s.emit('slidesUpdated'),
    !n && !t.cssMode && (t.effect === 'slide' || t.effect === 'fade'))
  ) {
    const P = `${t.containerModifierClass}backface-hidden`,
      I = s.el.classList.contains(P);
    l <= t.maxBackfaceHiddenSlides
      ? I || s.el.classList.add(P)
      : I && s.el.classList.remove(P);
  }
}
function Et(s) {
  const e = this,
    t = [],
    i = e.virtual && e.params.virtual.enabled;
  let a = 0,
    r;
  typeof s == 'number'
    ? e.setTransition(s)
    : s === !0 && e.setTransition(e.params.speed);
  const f = (c) => (i ? e.slides[e.getSlideIndexByData(c)] : e.slides[c]);
  if (e.params.slidesPerView !== 'auto' && e.params.slidesPerView > 1)
    if (e.params.centeredSlides)
      (e.visibleSlides || []).forEach((c) => {
        t.push(c);
      });
    else
      for (r = 0; r < Math.ceil(e.params.slidesPerView); r += 1) {
        const c = e.activeIndex + r;
        if (c > e.slides.length && !i) break;
        t.push(f(c));
      }
  else t.push(f(e.activeIndex));
  for (r = 0; r < t.length; r += 1)
    if (typeof t[r] < 'u') {
      const c = t[r].offsetHeight;
      a = c > a ? c : a;
    }
  (a || a === 0) && (e.wrapperEl.style.height = `${a}px`);
}
function xt() {
  const s = this,
    e = s.slides,
    t = s.isElement
      ? s.isHorizontal()
        ? s.wrapperEl.offsetLeft
        : s.wrapperEl.offsetTop
      : 0;
  for (let i = 0; i < e.length; i += 1)
    e[i].swiperSlideOffset =
      (s.isHorizontal() ? e[i].offsetLeft : e[i].offsetTop) -
      t -
      s.cssOverflowAdjustment();
}
const Ue = (s, e, t) => {
  e && !s.classList.contains(t)
    ? s.classList.add(t)
    : !e && s.classList.contains(t) && s.classList.remove(t);
};
function Tt(s) {
  s === void 0 && (s = (this && this.translate) || 0);
  const e = this,
    t = e.params,
    { slides: i, rtlTranslate: a, snapGrid: r } = e;
  if (i.length === 0) return;
  typeof i[0].swiperSlideOffset > 'u' && e.updateSlidesOffset();
  let f = -s;
  a && (f = s), (e.visibleSlidesIndexes = []), (e.visibleSlides = []);
  let c = t.spaceBetween;
  typeof c == 'string' && c.indexOf('%') >= 0
    ? (c = (parseFloat(c.replace('%', '')) / 100) * e.size)
    : typeof c == 'string' && (c = parseFloat(c));
  for (let n = 0; n < i.length; n += 1) {
    const u = i[n];
    let o = u.swiperSlideOffset;
    t.cssMode && t.centeredSlides && (o -= i[0].swiperSlideOffset);
    const l =
        (f + (t.centeredSlides ? e.minTranslate() : 0) - o) /
        (u.swiperSlideSize + c),
      d =
        (f - r[0] + (t.centeredSlides ? e.minTranslate() : 0) - o) /
        (u.swiperSlideSize + c),
      m = -(f - o),
      g = m + e.slidesSizesGrid[n],
      h = m >= 0 && m <= e.size - e.slidesSizesGrid[n],
      w =
        (m >= 0 && m < e.size - 1) ||
        (g > 1 && g <= e.size) ||
        (m <= 0 && g >= e.size);
    w && (e.visibleSlides.push(u), e.visibleSlidesIndexes.push(n)),
      Ue(u, w, t.slideVisibleClass),
      Ue(u, h, t.slideFullyVisibleClass),
      (u.progress = a ? -l : l),
      (u.originalProgress = a ? -d : d);
  }
}
function Mt(s) {
  const e = this;
  if (typeof s > 'u') {
    const o = e.rtlTranslate ? -1 : 1;
    s = (e && e.translate && e.translate * o) || 0;
  }
  const t = e.params,
    i = e.maxTranslate() - e.minTranslate();
  let { progress: a, isBeginning: r, isEnd: f, progressLoop: c } = e;
  const n = r,
    u = f;
  if (i === 0) (a = 0), (r = !0), (f = !0);
  else {
    a = (s - e.minTranslate()) / i;
    const o = Math.abs(s - e.minTranslate()) < 1,
      l = Math.abs(s - e.maxTranslate()) < 1;
    (r = o || a <= 0), (f = l || a >= 1), o && (a = 0), l && (a = 1);
  }
  if (t.loop) {
    const o = e.getSlideIndexByData(0),
      l = e.getSlideIndexByData(e.slides.length - 1),
      d = e.slidesGrid[o],
      m = e.slidesGrid[l],
      g = e.slidesGrid[e.slidesGrid.length - 1],
      h = Math.abs(s);
    h >= d ? (c = (h - d) / g) : (c = (h + g - m) / g), c > 1 && (c -= 1);
  }
  Object.assign(e, { progress: a, progressLoop: c, isBeginning: r, isEnd: f }),
    (t.watchSlidesProgress || (t.centeredSlides && t.autoHeight)) &&
      e.updateSlidesProgress(s),
    r && !n && e.emit('reachBeginning toEdge'),
    f && !u && e.emit('reachEnd toEdge'),
    ((n && !r) || (u && !f)) && e.emit('fromEdge'),
    e.emit('progress', a);
}
const Ae = (s, e, t) => {
  e && !s.classList.contains(t)
    ? s.classList.add(t)
    : !e && s.classList.contains(t) && s.classList.remove(t);
};
function Ct() {
  const s = this,
    { slides: e, params: t, slidesEl: i, activeIndex: a } = s,
    r = s.virtual && t.virtual.enabled,
    f = s.grid && t.grid && t.grid.rows > 1,
    c = (l) => W(i, `.${t.slideClass}${l}, swiper-slide${l}`)[0];
  let n, u, o;
  if (r)
    if (t.loop) {
      let l = a - s.virtual.slidesBefore;
      l < 0 && (l = s.virtual.slides.length + l),
        l >= s.virtual.slides.length && (l -= s.virtual.slides.length),
        (n = c(`[data-swiper-slide-index="${l}"]`));
    } else n = c(`[data-swiper-slide-index="${a}"]`);
  else
    f
      ? ((n = e.filter((l) => l.column === a)[0]),
        (o = e.filter((l) => l.column === a + 1)[0]),
        (u = e.filter((l) => l.column === a - 1)[0]))
      : (n = e[a]);
  n &&
    (f ||
      ((o = ut(n, `.${t.slideClass}, swiper-slide`)[0]),
      t.loop && !o && (o = e[0]),
      (u = ft(n, `.${t.slideClass}, swiper-slide`)[0]),
      t.loop && !u === 0 && (u = e[e.length - 1]))),
    e.forEach((l) => {
      Ae(l, l === n, t.slideActiveClass),
        Ae(l, l === o, t.slideNextClass),
        Ae(l, l === u, t.slidePrevClass);
    }),
    s.emitSlidesClasses();
}
const ye = (s, e) => {
    if (!s || s.destroyed || !s.params) return;
    const t = () => (s.isElement ? 'swiper-slide' : `.${s.params.slideClass}`),
      i = e.closest(t());
    if (i) {
      let a = i.querySelector(`.${s.params.lazyPreloaderClass}`);
      !a &&
        s.isElement &&
        (i.shadowRoot
          ? (a = i.shadowRoot.querySelector(`.${s.params.lazyPreloaderClass}`))
          : requestAnimationFrame(() => {
              i.shadowRoot &&
                ((a = i.shadowRoot.querySelector(
                  `.${s.params.lazyPreloaderClass}`,
                )),
                a && a.remove());
            })),
        a && a.remove();
    }
  },
  $e = (s, e) => {
    if (!s.slides[e]) return;
    const t = s.slides[e].querySelector('[loading="lazy"]');
    t && t.removeAttribute('loading');
  },
  He = (s) => {
    if (!s || s.destroyed || !s.params) return;
    let e = s.params.lazyPreloadPrevNext;
    const t = s.slides.length;
    if (!t || !e || e < 0) return;
    e = Math.min(e, t);
    const i =
        s.params.slidesPerView === 'auto'
          ? s.slidesPerViewDynamic()
          : Math.ceil(s.params.slidesPerView),
      a = s.activeIndex;
    if (s.params.grid && s.params.grid.rows > 1) {
      const f = a,
        c = [f - e];
      c.push(...Array.from({ length: e }).map((n, u) => f + i + u)),
        s.slides.forEach((n, u) => {
          c.includes(n.column) && $e(s, u);
        });
      return;
    }
    const r = a + i - 1;
    if (s.params.rewind || s.params.loop)
      for (let f = a - e; f <= r + e; f += 1) {
        const c = ((f % t) + t) % t;
        (c < a || c > r) && $e(s, c);
      }
    else
      for (let f = Math.max(a - e, 0); f <= Math.min(r + e, t - 1); f += 1)
        f !== a && (f > r || f < a) && $e(s, f);
  };
function Pt(s) {
  const { slidesGrid: e, params: t } = s,
    i = s.rtlTranslate ? s.translate : -s.translate;
  let a;
  for (let r = 0; r < e.length; r += 1)
    typeof e[r + 1] < 'u'
      ? i >= e[r] && i < e[r + 1] - (e[r + 1] - e[r]) / 2
        ? (a = r)
        : i >= e[r] && i < e[r + 1] && (a = r + 1)
      : i >= e[r] && (a = r);
  return t.normalizeSlideIndex && (a < 0 || typeof a > 'u') && (a = 0), a;
}
function Lt(s) {
  const e = this,
    t = e.rtlTranslate ? e.translate : -e.translate,
    { snapGrid: i, params: a, activeIndex: r, realIndex: f, snapIndex: c } = e;
  let n = s,
    u;
  const o = (m) => {
    let g = m - e.virtual.slidesBefore;
    return (
      g < 0 && (g = e.virtual.slides.length + g),
      g >= e.virtual.slides.length && (g -= e.virtual.slides.length),
      g
    );
  };
  if ((typeof n > 'u' && (n = Pt(e)), i.indexOf(t) >= 0)) u = i.indexOf(t);
  else {
    const m = Math.min(a.slidesPerGroupSkip, n);
    u = m + Math.floor((n - m) / a.slidesPerGroup);
  }
  if ((u >= i.length && (u = i.length - 1), n === r && !e.params.loop)) {
    u !== c && ((e.snapIndex = u), e.emit('snapIndexChange'));
    return;
  }
  if (n === r && e.params.loop && e.virtual && e.params.virtual.enabled) {
    e.realIndex = o(n);
    return;
  }
  const l = e.grid && a.grid && a.grid.rows > 1;
  let d;
  if (e.virtual && a.virtual.enabled && a.loop) d = o(n);
  else if (l) {
    const m = e.slides.filter((h) => h.column === n)[0];
    let g = parseInt(m.getAttribute('data-swiper-slide-index'), 10);
    Number.isNaN(g) && (g = Math.max(e.slides.indexOf(m), 0)),
      (d = Math.floor(g / a.grid.rows));
  } else if (e.slides[n]) {
    const m = e.slides[n].getAttribute('data-swiper-slide-index');
    m ? (d = parseInt(m, 10)) : (d = n);
  } else d = n;
  Object.assign(e, {
    previousSnapIndex: c,
    snapIndex: u,
    previousRealIndex: f,
    realIndex: d,
    previousIndex: r,
    activeIndex: n,
  }),
    e.initialized && He(e),
    e.emit('activeIndexChange'),
    e.emit('snapIndexChange'),
    (e.initialized || e.params.runCallbacksOnInit) &&
      (f !== d && e.emit('realIndexChange'), e.emit('slideChange'));
}
function It(s, e) {
  const t = this,
    i = t.params;
  let a = s.closest(`.${i.slideClass}, swiper-slide`);
  !a &&
    t.isElement &&
    e &&
    e.length > 1 &&
    e.includes(s) &&
    [...e.slice(e.indexOf(s) + 1, e.length)].forEach((c) => {
      !a && c.matches && c.matches(`.${i.slideClass}, swiper-slide`) && (a = c);
    });
  let r = !1,
    f;
  if (a) {
    for (let c = 0; c < t.slides.length; c += 1)
      if (t.slides[c] === a) {
        (r = !0), (f = c);
        break;
      }
  }
  if (a && r)
    (t.clickedSlide = a),
      t.virtual && t.params.virtual.enabled
        ? (t.clickedIndex = parseInt(
            a.getAttribute('data-swiper-slide-index'),
            10,
          ))
        : (t.clickedIndex = f);
  else {
    (t.clickedSlide = void 0), (t.clickedIndex = void 0);
    return;
  }
  i.slideToClickedSlide &&
    t.clickedIndex !== void 0 &&
    t.clickedIndex !== t.activeIndex &&
    t.slideToClickedSlide();
}
var zt = {
  updateSize: bt,
  updateSlides: St,
  updateAutoHeight: Et,
  updateSlidesOffset: xt,
  updateSlidesProgress: Tt,
  updateProgress: Mt,
  updateSlidesClasses: Ct,
  updateActiveIndex: Lt,
  updateClickedSlide: It,
};
function At(s) {
  s === void 0 && (s = this.isHorizontal() ? 'x' : 'y');
  const e = this,
    { params: t, rtlTranslate: i, translate: a, wrapperEl: r } = e;
  if (t.virtualTranslate) return i ? -a : a;
  if (t.cssMode) return a;
  let f = ke(r, s);
  return (f += e.cssOverflowAdjustment()), i && (f = -f), f || 0;
}
function $t(s, e) {
  const t = this,
    { rtlTranslate: i, params: a, wrapperEl: r, progress: f } = t;
  let c = 0,
    n = 0;
  const u = 0;
  t.isHorizontal() ? (c = i ? -s : s) : (n = s),
    a.roundLengths && ((c = Math.floor(c)), (n = Math.floor(n))),
    (t.previousTranslate = t.translate),
    (t.translate = t.isHorizontal() ? c : n),
    a.cssMode
      ? (r[t.isHorizontal() ? 'scrollLeft' : 'scrollTop'] = t.isHorizontal()
          ? -c
          : -n)
      : a.virtualTranslate ||
        (t.isHorizontal()
          ? (c -= t.cssOverflowAdjustment())
          : (n -= t.cssOverflowAdjustment()),
        (r.style.transform = `translate3d(${c}px, ${n}px, ${u}px)`));
  let o;
  const l = t.maxTranslate() - t.minTranslate();
  l === 0 ? (o = 0) : (o = (s - t.minTranslate()) / l),
    o !== f && t.updateProgress(s),
    t.emit('setTranslate', t.translate, e);
}
function Dt() {
  return -this.snapGrid[0];
}
function Ot() {
  return -this.snapGrid[this.snapGrid.length - 1];
}
function kt(s, e, t, i, a) {
  s === void 0 && (s = 0),
    e === void 0 && (e = this.params.speed),
    t === void 0 && (t = !0),
    i === void 0 && (i = !0);
  const r = this,
    { params: f, wrapperEl: c } = r;
  if (r.animating && f.preventInteractionOnTransition) return !1;
  const n = r.minTranslate(),
    u = r.maxTranslate();
  let o;
  if (
    (i && s > n ? (o = n) : i && s < u ? (o = u) : (o = s),
    r.updateProgress(o),
    f.cssMode)
  ) {
    const l = r.isHorizontal();
    if (e === 0) c[l ? 'scrollLeft' : 'scrollTop'] = -o;
    else {
      if (!r.support.smoothScroll)
        return (
          tt({ swiper: r, targetPosition: -o, side: l ? 'left' : 'top' }), !0
        );
      c.scrollTo({ [l ? 'left' : 'top']: -o, behavior: 'smooth' });
    }
    return !0;
  }
  return (
    e === 0
      ? (r.setTransition(0),
        r.setTranslate(o),
        t && (r.emit('beforeTransitionStart', e, a), r.emit('transitionEnd')))
      : (r.setTransition(e),
        r.setTranslate(o),
        t && (r.emit('beforeTransitionStart', e, a), r.emit('transitionStart')),
        r.animating ||
          ((r.animating = !0),
          r.onTranslateToWrapperTransitionEnd ||
            (r.onTranslateToWrapperTransitionEnd = function (d) {
              !r ||
                r.destroyed ||
                (d.target === this &&
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
var Gt = {
  getTranslate: At,
  setTranslate: $t,
  minTranslate: Dt,
  maxTranslate: Ot,
  translateTo: kt,
};
function Ht(s, e) {
  const t = this;
  t.params.cssMode ||
    ((t.wrapperEl.style.transitionDuration = `${s}ms`),
    (t.wrapperEl.style.transitionDelay = s === 0 ? '0ms' : '')),
    t.emit('setTransition', s, e);
}
function rt(s) {
  let { swiper: e, runCallbacks: t, direction: i, step: a } = s;
  const { activeIndex: r, previousIndex: f } = e;
  let c = i;
  if (
    (c || (r > f ? (c = 'next') : r < f ? (c = 'prev') : (c = 'reset')),
    e.emit(`transition${a}`),
    t && r !== f)
  ) {
    if (c === 'reset') {
      e.emit(`slideResetTransition${a}`);
      return;
    }
    e.emit(`slideChangeTransition${a}`),
      c === 'next'
        ? e.emit(`slideNextTransition${a}`)
        : e.emit(`slidePrevTransition${a}`);
  }
}
function Bt(s, e) {
  s === void 0 && (s = !0);
  const t = this,
    { params: i } = t;
  i.cssMode ||
    (i.autoHeight && t.updateAutoHeight(),
    rt({ swiper: t, runCallbacks: s, direction: e, step: 'Start' }));
}
function Rt(s, e) {
  s === void 0 && (s = !0);
  const t = this,
    { params: i } = t;
  (t.animating = !1),
    !i.cssMode &&
      (t.setTransition(0),
      rt({ swiper: t, runCallbacks: s, direction: e, step: 'End' }));
}
var Vt = { setTransition: Ht, transitionStart: Bt, transitionEnd: Rt };
function Xt(s, e, t, i, a) {
  s === void 0 && (s = 0),
    t === void 0 && (t = !0),
    typeof s == 'string' && (s = parseInt(s, 10));
  const r = this;
  let f = s;
  f < 0 && (f = 0);
  const {
    params: c,
    snapGrid: n,
    slidesGrid: u,
    previousIndex: o,
    activeIndex: l,
    rtlTranslate: d,
    wrapperEl: m,
    enabled: g,
  } = r;
  if (
    (!g && !i && !a) ||
    r.destroyed ||
    (r.animating && c.preventInteractionOnTransition)
  )
    return !1;
  typeof e > 'u' && (e = r.params.speed);
  const h = Math.min(r.params.slidesPerGroupSkip, f);
  let w = h + Math.floor((f - h) / r.params.slidesPerGroup);
  w >= n.length && (w = n.length - 1);
  const y = -n[w];
  if (c.normalizeSlideIndex)
    for (let E = 0; E < u.length; E += 1) {
      const z = -Math.floor(y * 100),
        D = Math.floor(u[E] * 100),
        A = Math.floor(u[E + 1] * 100);
      typeof u[E + 1] < 'u'
        ? z >= D && z < A - (A - D) / 2
          ? (f = E)
          : z >= D && z < A && (f = E + 1)
        : z >= D && (f = E);
    }
  if (
    r.initialized &&
    f !== l &&
    ((!r.allowSlideNext &&
      (d
        ? y > r.translate && y > r.minTranslate()
        : y < r.translate && y < r.minTranslate())) ||
      (!r.allowSlidePrev &&
        y > r.translate &&
        y > r.maxTranslate() &&
        (l || 0) !== f))
  )
    return !1;
  f !== (o || 0) && t && r.emit('beforeSlideChangeStart'), r.updateProgress(y);
  let v;
  f > l ? (v = 'next') : f < l ? (v = 'prev') : (v = 'reset');
  const p = r.virtual && r.params.virtual.enabled;
  if (!(p && a) && ((d && -y === r.translate) || (!d && y === r.translate)))
    return (
      r.updateActiveIndex(f),
      c.autoHeight && r.updateAutoHeight(),
      r.updateSlidesClasses(),
      c.effect !== 'slide' && r.setTranslate(y),
      v !== 'reset' && (r.transitionStart(t, v), r.transitionEnd(t, v)),
      !1
    );
  if (c.cssMode) {
    const E = r.isHorizontal(),
      z = d ? y : -y;
    if (e === 0)
      p &&
        ((r.wrapperEl.style.scrollSnapType = 'none'),
        (r._immediateVirtual = !0)),
        p && !r._cssModeVirtualInitialSet && r.params.initialSlide > 0
          ? ((r._cssModeVirtualInitialSet = !0),
            requestAnimationFrame(() => {
              m[E ? 'scrollLeft' : 'scrollTop'] = z;
            }))
          : (m[E ? 'scrollLeft' : 'scrollTop'] = z),
        p &&
          requestAnimationFrame(() => {
            (r.wrapperEl.style.scrollSnapType = ''), (r._immediateVirtual = !1);
          });
    else {
      if (!r.support.smoothScroll)
        return (
          tt({ swiper: r, targetPosition: z, side: E ? 'left' : 'top' }), !0
        );
      m.scrollTo({ [E ? 'left' : 'top']: z, behavior: 'smooth' });
    }
    return !0;
  }
  return (
    r.setTransition(e),
    r.setTranslate(y),
    r.updateActiveIndex(f),
    r.updateSlidesClasses(),
    r.emit('beforeTransitionStart', e, i),
    r.transitionStart(t, v),
    e === 0
      ? r.transitionEnd(t, v)
      : r.animating ||
        ((r.animating = !0),
        r.onSlideToWrapperTransitionEnd ||
          (r.onSlideToWrapperTransitionEnd = function (z) {
            !r ||
              r.destroyed ||
              (z.target === this &&
                (r.wrapperEl.removeEventListener(
                  'transitionend',
                  r.onSlideToWrapperTransitionEnd,
                ),
                (r.onSlideToWrapperTransitionEnd = null),
                delete r.onSlideToWrapperTransitionEnd,
                r.transitionEnd(t, v)));
          }),
        r.wrapperEl.addEventListener(
          'transitionend',
          r.onSlideToWrapperTransitionEnd,
        )),
    !0
  );
}
function Yt(s, e, t, i) {
  s === void 0 && (s = 0),
    t === void 0 && (t = !0),
    typeof s == 'string' && (s = parseInt(s, 10));
  const a = this;
  if (a.destroyed) return;
  typeof e > 'u' && (e = a.params.speed);
  const r = a.grid && a.params.grid && a.params.grid.rows > 1;
  let f = s;
  if (a.params.loop)
    if (a.virtual && a.params.virtual.enabled) f = f + a.virtual.slidesBefore;
    else {
      let c;
      if (r) {
        const d = f * a.params.grid.rows;
        c = a.slides.filter(
          (m) => m.getAttribute('data-swiper-slide-index') * 1 === d,
        )[0].column;
      } else c = a.getSlideIndexByData(f);
      const n = r
          ? Math.ceil(a.slides.length / a.params.grid.rows)
          : a.slides.length,
        { centeredSlides: u } = a.params;
      let o = a.params.slidesPerView;
      o === 'auto'
        ? (o = a.slidesPerViewDynamic())
        : ((o = Math.ceil(parseFloat(a.params.slidesPerView, 10))),
          u && o % 2 === 0 && (o = o + 1));
      let l = n - c < o;
      if (
        (u && (l = l || c < Math.ceil(o / 2)),
        i && u && a.params.slidesPerView !== 'auto' && !r && (l = !1),
        l)
      ) {
        const d = u
          ? c < a.activeIndex
            ? 'prev'
            : 'next'
          : c - a.activeIndex - 1 < a.params.slidesPerView
          ? 'next'
          : 'prev';
        a.loopFix({
          direction: d,
          slideTo: !0,
          activeSlideIndex: d === 'next' ? c + 1 : c - n + 1,
          slideRealIndex: d === 'next' ? a.realIndex : void 0,
        });
      }
      if (r) {
        const d = f * a.params.grid.rows;
        f = a.slides.filter(
          (m) => m.getAttribute('data-swiper-slide-index') * 1 === d,
        )[0].column;
      } else f = a.getSlideIndexByData(f);
    }
  return (
    requestAnimationFrame(() => {
      a.slideTo(f, e, t, i);
    }),
    a
  );
}
function Nt(s, e, t) {
  e === void 0 && (e = !0);
  const i = this,
    { enabled: a, params: r, animating: f } = i;
  if (!a || i.destroyed) return i;
  typeof s > 'u' && (s = i.params.speed);
  let c = r.slidesPerGroup;
  r.slidesPerView === 'auto' &&
    r.slidesPerGroup === 1 &&
    r.slidesPerGroupAuto &&
    (c = Math.max(i.slidesPerViewDynamic('current', !0), 1));
  const n = i.activeIndex < r.slidesPerGroupSkip ? 1 : c,
    u = i.virtual && r.virtual.enabled;
  if (r.loop) {
    if (f && !u && r.loopPreventsSliding) return !1;
    if (
      (i.loopFix({ direction: 'next' }),
      (i._clientLeft = i.wrapperEl.clientLeft),
      i.activeIndex === i.slides.length - 1 && r.cssMode)
    )
      return (
        requestAnimationFrame(() => {
          i.slideTo(i.activeIndex + n, s, e, t);
        }),
        !0
      );
  }
  return r.rewind && i.isEnd
    ? i.slideTo(0, s, e, t)
    : i.slideTo(i.activeIndex + n, s, e, t);
}
function Ft(s, e, t) {
  e === void 0 && (e = !0);
  const i = this,
    {
      params: a,
      snapGrid: r,
      slidesGrid: f,
      rtlTranslate: c,
      enabled: n,
      animating: u,
    } = i;
  if (!n || i.destroyed) return i;
  typeof s > 'u' && (s = i.params.speed);
  const o = i.virtual && a.virtual.enabled;
  if (a.loop) {
    if (u && !o && a.loopPreventsSliding) return !1;
    i.loopFix({ direction: 'prev' }), (i._clientLeft = i.wrapperEl.clientLeft);
  }
  const l = c ? i.translate : -i.translate;
  function d(y) {
    return y < 0 ? -Math.floor(Math.abs(y)) : Math.floor(y);
  }
  const m = d(l),
    g = r.map((y) => d(y));
  let h = r[g.indexOf(m) - 1];
  if (typeof h > 'u' && a.cssMode) {
    let y;
    r.forEach((v, p) => {
      m >= v && (y = p);
    }),
      typeof y < 'u' && (h = r[y > 0 ? y - 1 : y]);
  }
  let w = 0;
  if (
    (typeof h < 'u' &&
      ((w = f.indexOf(h)),
      w < 0 && (w = i.activeIndex - 1),
      a.slidesPerView === 'auto' &&
        a.slidesPerGroup === 1 &&
        a.slidesPerGroupAuto &&
        ((w = w - i.slidesPerViewDynamic('previous', !0) + 1),
        (w = Math.max(w, 0)))),
    a.rewind && i.isBeginning)
  ) {
    const y =
      i.params.virtual && i.params.virtual.enabled && i.virtual
        ? i.virtual.slides.length - 1
        : i.slides.length - 1;
    return i.slideTo(y, s, e, t);
  } else if (a.loop && i.activeIndex === 0 && a.cssMode)
    return (
      requestAnimationFrame(() => {
        i.slideTo(w, s, e, t);
      }),
      !0
    );
  return i.slideTo(w, s, e, t);
}
function Wt(s, e, t) {
  e === void 0 && (e = !0);
  const i = this;
  if (!i.destroyed)
    return (
      typeof s > 'u' && (s = i.params.speed), i.slideTo(i.activeIndex, s, e, t)
    );
}
function qt(s, e, t, i) {
  e === void 0 && (e = !0), i === void 0 && (i = 0.5);
  const a = this;
  if (a.destroyed) return;
  typeof s > 'u' && (s = a.params.speed);
  let r = a.activeIndex;
  const f = Math.min(a.params.slidesPerGroupSkip, r),
    c = f + Math.floor((r - f) / a.params.slidesPerGroup),
    n = a.rtlTranslate ? a.translate : -a.translate;
  if (n >= a.snapGrid[c]) {
    const u = a.snapGrid[c],
      o = a.snapGrid[c + 1];
    n - u > (o - u) * i && (r += a.params.slidesPerGroup);
  } else {
    const u = a.snapGrid[c - 1],
      o = a.snapGrid[c];
    n - u <= (o - u) * i && (r -= a.params.slidesPerGroup);
  }
  return (
    (r = Math.max(r, 0)),
    (r = Math.min(r, a.slidesGrid.length - 1)),
    a.slideTo(r, s, e, t)
  );
}
function _t() {
  const s = this;
  if (s.destroyed) return;
  const { params: e, slidesEl: t } = s,
    i = e.slidesPerView === 'auto' ? s.slidesPerViewDynamic() : e.slidesPerView;
  let a = s.clickedIndex,
    r;
  const f = s.isElement ? 'swiper-slide' : `.${e.slideClass}`;
  if (e.loop) {
    if (s.animating) return;
    (r = parseInt(s.clickedSlide.getAttribute('data-swiper-slide-index'), 10)),
      e.centeredSlides
        ? a < s.loopedSlides - i / 2 ||
          a > s.slides.length - s.loopedSlides + i / 2
          ? (s.loopFix(),
            (a = s.getSlideIndex(
              W(t, `${f}[data-swiper-slide-index="${r}"]`)[0],
            )),
            re(() => {
              s.slideTo(a);
            }))
          : s.slideTo(a)
        : a > s.slides.length - i
        ? (s.loopFix(),
          (a = s.getSlideIndex(
            W(t, `${f}[data-swiper-slide-index="${r}"]`)[0],
          )),
          re(() => {
            s.slideTo(a);
          }))
        : s.slideTo(a);
  } else s.slideTo(a);
}
var jt = {
  slideTo: Xt,
  slideToLoop: Yt,
  slideNext: Nt,
  slidePrev: Ft,
  slideReset: Wt,
  slideToClosest: qt,
  slideToClickedSlide: _t,
};
function Ut(s) {
  const e = this,
    { params: t, slidesEl: i } = e;
  if (!t.loop || (e.virtual && e.params.virtual.enabled)) return;
  const a = () => {
      W(i, `.${t.slideClass}, swiper-slide`).forEach((l, d) => {
        l.setAttribute('data-swiper-slide-index', d);
      });
    },
    r = e.grid && t.grid && t.grid.rows > 1,
    f = t.slidesPerGroup * (r ? t.grid.rows : 1),
    c = e.slides.length % f !== 0,
    n = r && e.slides.length % t.grid.rows !== 0,
    u = (o) => {
      for (let l = 0; l < o; l += 1) {
        const d = e.isElement
          ? K('swiper-slide', [t.slideBlankClass])
          : K('div', [t.slideClass, t.slideBlankClass]);
        e.slidesEl.append(d);
      }
    };
  if (c) {
    if (t.loopAddBlankSlides) {
      const o = f - (e.slides.length % f);
      u(o), e.recalcSlides(), e.updateSlides();
    } else
      be(
        'Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)',
      );
    a();
  } else if (n) {
    if (t.loopAddBlankSlides) {
      const o = t.grid.rows - (e.slides.length % t.grid.rows);
      u(o), e.recalcSlides(), e.updateSlides();
    } else
      be(
        'Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)',
      );
    a();
  } else a();
  e.loopFix({
    slideRealIndex: s,
    direction: t.centeredSlides ? void 0 : 'next',
  });
}
function Kt(s) {
  let {
    slideRealIndex: e,
    slideTo: t = !0,
    direction: i,
    setTranslate: a,
    activeSlideIndex: r,
    byController: f,
    byMousewheel: c,
  } = s === void 0 ? {} : s;
  const n = this;
  if (!n.params.loop) return;
  n.emit('beforeLoopFix');
  const {
      slides: u,
      allowSlidePrev: o,
      allowSlideNext: l,
      slidesEl: d,
      params: m,
    } = n,
    { centeredSlides: g } = m;
  if (
    ((n.allowSlidePrev = !0),
    (n.allowSlideNext = !0),
    n.virtual && m.virtual.enabled)
  ) {
    t &&
      (!m.centeredSlides && n.snapIndex === 0
        ? n.slideTo(n.virtual.slides.length, 0, !1, !0)
        : m.centeredSlides && n.snapIndex < m.slidesPerView
        ? n.slideTo(n.virtual.slides.length + n.snapIndex, 0, !1, !0)
        : n.snapIndex === n.snapGrid.length - 1 &&
          n.slideTo(n.virtual.slidesBefore, 0, !1, !0)),
      (n.allowSlidePrev = o),
      (n.allowSlideNext = l),
      n.emit('loopFix');
    return;
  }
  let h = m.slidesPerView;
  h === 'auto'
    ? (h = n.slidesPerViewDynamic())
    : ((h = Math.ceil(parseFloat(m.slidesPerView, 10))),
      g && h % 2 === 0 && (h = h + 1));
  const w = m.slidesPerGroupAuto ? h : m.slidesPerGroup;
  let y = w;
  y % w !== 0 && (y += w - (y % w)),
    (y += m.loopAdditionalSlides),
    (n.loopedSlides = y);
  const v = n.grid && m.grid && m.grid.rows > 1;
  u.length < h + y
    ? be(
        'Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled and not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters',
      )
    : v &&
      m.grid.fill === 'row' &&
      be(
        'Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`',
      );
  const p = [],
    b = [];
  let E = n.activeIndex;
  typeof r > 'u'
    ? (r = n.getSlideIndex(
        u.filter((S) => S.classList.contains(m.slideActiveClass))[0],
      ))
    : (E = r);
  const z = i === 'next' || !i,
    D = i === 'prev' || !i;
  let A = 0,
    M = 0;
  const P = v ? Math.ceil(u.length / m.grid.rows) : u.length,
    C = (v ? u[r].column : r) + (g && typeof a > 'u' ? -h / 2 + 0.5 : 0);
  if (C < y) {
    A = Math.max(y - C, w);
    for (let S = 0; S < y - C; S += 1) {
      const x = S - Math.floor(S / P) * P;
      if (v) {
        const $ = P - x - 1;
        for (let H = u.length - 1; H >= 0; H -= 1)
          u[H].column === $ && p.push(H);
      } else p.push(P - x - 1);
    }
  } else if (C + h > P - y) {
    M = Math.max(C - (P - y * 2), w);
    for (let S = 0; S < M; S += 1) {
      const x = S - Math.floor(S / P) * P;
      v
        ? u.forEach(($, H) => {
            $.column === x && b.push(H);
          })
        : b.push(x);
    }
  }
  if (
    ((n.__preventObserver__ = !0),
    requestAnimationFrame(() => {
      n.__preventObserver__ = !1;
    }),
    D &&
      p.forEach((S) => {
        (u[S].swiperLoopMoveDOM = !0),
          d.prepend(u[S]),
          (u[S].swiperLoopMoveDOM = !1);
      }),
    z &&
      b.forEach((S) => {
        (u[S].swiperLoopMoveDOM = !0),
          d.append(u[S]),
          (u[S].swiperLoopMoveDOM = !1);
      }),
    n.recalcSlides(),
    m.slidesPerView === 'auto'
      ? n.updateSlides()
      : v &&
        ((p.length > 0 && D) || (b.length > 0 && z)) &&
        n.slides.forEach((S, x) => {
          n.grid.updateSlide(x, S, n.slides);
        }),
    m.watchSlidesProgress && n.updateSlidesOffset(),
    t)
  ) {
    if (p.length > 0 && D) {
      if (typeof e > 'u') {
        const S = n.slidesGrid[E],
          $ = n.slidesGrid[E + A] - S;
        c
          ? n.setTranslate(n.translate - $)
          : (n.slideTo(E + Math.ceil(A), 0, !1, !0),
            a &&
              ((n.touchEventsData.startTranslate =
                n.touchEventsData.startTranslate - $),
              (n.touchEventsData.currentTranslate =
                n.touchEventsData.currentTranslate - $)));
      } else if (a) {
        const S = v ? p.length / m.grid.rows : p.length;
        n.slideTo(n.activeIndex + S, 0, !1, !0),
          (n.touchEventsData.currentTranslate = n.translate);
      }
    } else if (b.length > 0 && z)
      if (typeof e > 'u') {
        const S = n.slidesGrid[E],
          $ = n.slidesGrid[E - M] - S;
        c
          ? n.setTranslate(n.translate - $)
          : (n.slideTo(E - M, 0, !1, !0),
            a &&
              ((n.touchEventsData.startTranslate =
                n.touchEventsData.startTranslate - $),
              (n.touchEventsData.currentTranslate =
                n.touchEventsData.currentTranslate - $)));
      } else {
        const S = v ? b.length / m.grid.rows : b.length;
        n.slideTo(n.activeIndex - S, 0, !1, !0);
      }
  }
  if (
    ((n.allowSlidePrev = o),
    (n.allowSlideNext = l),
    n.controller && n.controller.control && !f)
  ) {
    const S = {
      slideRealIndex: e,
      direction: i,
      setTranslate: a,
      activeSlideIndex: r,
      byController: !0,
    };
    Array.isArray(n.controller.control)
      ? n.controller.control.forEach((x) => {
          !x.destroyed &&
            x.params.loop &&
            x.loopFix({
              ...S,
              slideTo: x.params.slidesPerView === m.slidesPerView ? t : !1,
            });
        })
      : n.controller.control instanceof n.constructor &&
        n.controller.control.params.loop &&
        n.controller.control.loopFix({
          ...S,
          slideTo:
            n.controller.control.params.slidesPerView === m.slidesPerView
              ? t
              : !1,
        });
  }
  n.emit('loopFix');
}
function Zt() {
  const s = this,
    { params: e, slidesEl: t } = s;
  if (!e.loop || (s.virtual && s.params.virtual.enabled)) return;
  s.recalcSlides();
  const i = [];
  s.slides.forEach((a) => {
    const r =
      typeof a.swiperSlideIndex > 'u'
        ? a.getAttribute('data-swiper-slide-index') * 1
        : a.swiperSlideIndex;
    i[r] = a;
  }),
    s.slides.forEach((a) => {
      a.removeAttribute('data-swiper-slide-index');
    }),
    i.forEach((a) => {
      t.append(a);
    }),
    s.recalcSlides(),
    s.slideTo(s.realIndex, 0);
}
var Qt = { loopCreate: Ut, loopFix: Kt, loopDestroy: Zt };
function Jt(s) {
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
    (t.style.cursor = s ? 'grabbing' : 'grab'),
    e.isElement &&
      requestAnimationFrame(() => {
        e.__preventObserver__ = !1;
      });
}
function es() {
  const s = this;
  (s.params.watchOverflow && s.isLocked) ||
    s.params.cssMode ||
    (s.isElement && (s.__preventObserver__ = !0),
    (s[
      s.params.touchEventsTarget === 'container' ? 'el' : 'wrapperEl'
    ].style.cursor = ''),
    s.isElement &&
      requestAnimationFrame(() => {
        s.__preventObserver__ = !1;
      }));
}
var ts = { setGrabCursor: Jt, unsetGrabCursor: es };
function ss(s, e) {
  e === void 0 && (e = this);
  function t(i) {
    if (!i || i === q() || i === F()) return null;
    i.assignedSlot && (i = i.assignedSlot);
    const a = i.closest(s);
    return !a && !i.getRootNode ? null : a || t(i.getRootNode().host);
  }
  return t(e);
}
function Ke(s, e, t) {
  const i = F(),
    { params: a } = s,
    r = a.edgeSwipeDetection,
    f = a.edgeSwipeThreshold;
  return r && (t <= f || t >= i.innerWidth - f)
    ? r === 'prevent'
      ? (e.preventDefault(), !0)
      : !1
    : !0;
}
function is(s) {
  const e = this,
    t = q();
  let i = s;
  i.originalEvent && (i = i.originalEvent);
  const a = e.touchEventsData;
  if (i.type === 'pointerdown') {
    if (a.pointerId !== null && a.pointerId !== i.pointerId) return;
    a.pointerId = i.pointerId;
  } else
    i.type === 'touchstart' &&
      i.targetTouches.length === 1 &&
      (a.touchId = i.targetTouches[0].identifier);
  if (i.type === 'touchstart') {
    Ke(e, i, i.targetTouches[0].pageX);
    return;
  }
  const { params: r, touches: f, enabled: c } = e;
  if (
    !c ||
    (!r.simulateTouch && i.pointerType === 'mouse') ||
    (e.animating && r.preventInteractionOnTransition)
  )
    return;
  !e.animating && r.cssMode && r.loop && e.loopFix();
  let n = i.target;
  if (
    (r.touchEventsTarget === 'wrapper' && !ct(n, e.wrapperEl)) ||
    ('which' in i && i.which === 3) ||
    ('button' in i && i.button > 0) ||
    (a.isTouched && a.isMoved)
  )
    return;
  const u = !!r.noSwipingClass && r.noSwipingClass !== '',
    o = i.composedPath ? i.composedPath() : i.path;
  u && i.target && i.target.shadowRoot && o && (n = o[0]);
  const l = r.noSwipingSelector ? r.noSwipingSelector : `.${r.noSwipingClass}`,
    d = !!(i.target && i.target.shadowRoot);
  if (r.noSwiping && (d ? ss(l, n) : n.closest(l))) {
    e.allowClick = !0;
    return;
  }
  if (r.swipeHandler && !n.closest(r.swipeHandler)) return;
  (f.currentX = i.pageX), (f.currentY = i.pageY);
  const m = f.currentX,
    g = f.currentY;
  if (!Ke(e, i, m)) return;
  Object.assign(a, {
    isTouched: !0,
    isMoved: !1,
    allowTouchCallbacks: !0,
    isScrolling: void 0,
    startMoving: void 0,
  }),
    (f.startX = m),
    (f.startY = g),
    (a.touchStartTime = Z()),
    (e.allowClick = !0),
    e.updateSize(),
    (e.swipeDirection = void 0),
    r.threshold > 0 && (a.allowThresholdMove = !1);
  let h = !0;
  n.matches(a.focusableElements) &&
    ((h = !1), n.nodeName === 'SELECT' && (a.isTouched = !1)),
    t.activeElement &&
      t.activeElement.matches(a.focusableElements) &&
      t.activeElement !== n &&
      (i.pointerType === 'mouse' ||
        (i.pointerType !== 'mouse' && !n.matches(a.focusableElements))) &&
      t.activeElement.blur();
  const w = h && e.allowTouchMove && r.touchStartPreventDefault;
  (r.touchStartForcePreventDefault || w) &&
    !n.isContentEditable &&
    i.preventDefault(),
    r.freeMode &&
      r.freeMode.enabled &&
      e.freeMode &&
      e.animating &&
      !r.cssMode &&
      e.freeMode.onTouchStart(),
    e.emit('touchStart', i);
}
function rs(s) {
  const e = q(),
    t = this,
    i = t.touchEventsData,
    { params: a, touches: r, rtlTranslate: f, enabled: c } = t;
  if (!c || (!a.simulateTouch && s.pointerType === 'mouse')) return;
  let n = s;
  if (
    (n.originalEvent && (n = n.originalEvent),
    n.type === 'pointermove' &&
      (i.touchId !== null || n.pointerId !== i.pointerId))
  )
    return;
  let u;
  if (n.type === 'touchmove') {
    if (
      ((u = [...n.changedTouches].filter((z) => z.identifier === i.touchId)[0]),
      !u || u.identifier !== i.touchId)
    )
      return;
  } else u = n;
  if (!i.isTouched) {
    i.startMoving && i.isScrolling && t.emit('touchMoveOpposite', n);
    return;
  }
  const o = u.pageX,
    l = u.pageY;
  if (n.preventedByNestedSwiper) {
    (r.startX = o), (r.startY = l);
    return;
  }
  if (!t.allowTouchMove) {
    n.target.matches(i.focusableElements) || (t.allowClick = !1),
      i.isTouched &&
        (Object.assign(r, { startX: o, startY: l, currentX: o, currentY: l }),
        (i.touchStartTime = Z()));
    return;
  }
  if (a.touchReleaseOnEdges && !a.loop) {
    if (t.isVertical()) {
      if (
        (l < r.startY && t.translate <= t.maxTranslate()) ||
        (l > r.startY && t.translate >= t.minTranslate())
      ) {
        (i.isTouched = !1), (i.isMoved = !1);
        return;
      }
    } else if (
      (o < r.startX && t.translate <= t.maxTranslate()) ||
      (o > r.startX && t.translate >= t.minTranslate())
    )
      return;
  }
  if (
    (e.activeElement &&
      e.activeElement.matches(i.focusableElements) &&
      e.activeElement !== n.target &&
      n.pointerType !== 'mouse' &&
      e.activeElement.blur(),
    e.activeElement &&
      n.target === e.activeElement &&
      n.target.matches(i.focusableElements))
  ) {
    (i.isMoved = !0), (t.allowClick = !1);
    return;
  }
  i.allowTouchCallbacks && t.emit('touchMove', n),
    (r.previousX = r.currentX),
    (r.previousY = r.currentY),
    (r.currentX = o),
    (r.currentY = l);
  const d = r.currentX - r.startX,
    m = r.currentY - r.startY;
  if (t.params.threshold && Math.sqrt(d ** 2 + m ** 2) < t.params.threshold)
    return;
  if (typeof i.isScrolling > 'u') {
    let z;
    (t.isHorizontal() && r.currentY === r.startY) ||
    (t.isVertical() && r.currentX === r.startX)
      ? (i.isScrolling = !1)
      : d * d + m * m >= 25 &&
        ((z = (Math.atan2(Math.abs(m), Math.abs(d)) * 180) / Math.PI),
        (i.isScrolling = t.isHorizontal()
          ? z > a.touchAngle
          : 90 - z > a.touchAngle));
  }
  if (
    (i.isScrolling && t.emit('touchMoveOpposite', n),
    typeof i.startMoving > 'u' &&
      (r.currentX !== r.startX || r.currentY !== r.startY) &&
      (i.startMoving = !0),
    i.isScrolling ||
      (n.type === 'touchmove' && i.preventTouchMoveFromPointerMove))
  ) {
    i.isTouched = !1;
    return;
  }
  if (!i.startMoving) return;
  (t.allowClick = !1),
    !a.cssMode && n.cancelable && n.preventDefault(),
    a.touchMoveStopPropagation && !a.nested && n.stopPropagation();
  let g = t.isHorizontal() ? d : m,
    h = t.isHorizontal() ? r.currentX - r.previousX : r.currentY - r.previousY;
  a.oneWayMovement &&
    ((g = Math.abs(g) * (f ? 1 : -1)), (h = Math.abs(h) * (f ? 1 : -1))),
    (r.diff = g),
    (g *= a.touchRatio),
    f && ((g = -g), (h = -h));
  const w = t.touchesDirection;
  (t.swipeDirection = g > 0 ? 'prev' : 'next'),
    (t.touchesDirection = h > 0 ? 'prev' : 'next');
  const y = t.params.loop && !a.cssMode,
    v =
      (t.touchesDirection === 'next' && t.allowSlideNext) ||
      (t.touchesDirection === 'prev' && t.allowSlidePrev);
  if (!i.isMoved) {
    if (
      (y && v && t.loopFix({ direction: t.swipeDirection }),
      (i.startTranslate = t.getTranslate()),
      t.setTransition(0),
      t.animating)
    ) {
      const z = new window.CustomEvent('transitionend', {
        bubbles: !0,
        cancelable: !0,
        detail: { bySwiperTouchMove: !0 },
      });
      t.wrapperEl.dispatchEvent(z);
    }
    (i.allowMomentumBounce = !1),
      a.grabCursor &&
        (t.allowSlideNext === !0 || t.allowSlidePrev === !0) &&
        t.setGrabCursor(!0),
      t.emit('sliderFirstMove', n);
  }
  let p;
  if (
    (new Date().getTime(),
    i.isMoved &&
      i.allowThresholdMove &&
      w !== t.touchesDirection &&
      y &&
      v &&
      Math.abs(g) >= 1)
  ) {
    Object.assign(r, {
      startX: o,
      startY: l,
      currentX: o,
      currentY: l,
      startTranslate: i.currentTranslate,
    }),
      (i.loopSwapReset = !0),
      (i.startTranslate = i.currentTranslate);
    return;
  }
  t.emit('sliderMove', n),
    (i.isMoved = !0),
    (i.currentTranslate = g + i.startTranslate);
  let b = !0,
    E = a.resistanceRatio;
  if (
    (a.touchReleaseOnEdges && (E = 0),
    g > 0
      ? (y &&
          v &&
          !p &&
          i.allowThresholdMove &&
          i.currentTranslate >
            (a.centeredSlides
              ? t.minTranslate() -
                t.slidesSizesGrid[t.activeIndex + 1] -
                (a.slidesPerView !== 'auto' &&
                t.slides.length - a.slidesPerView >= 2
                  ? t.slidesSizesGrid[t.activeIndex + 1] + t.params.spaceBetween
                  : 0) -
                t.params.spaceBetween
              : t.minTranslate()) &&
          t.loopFix({
            direction: 'prev',
            setTranslate: !0,
            activeSlideIndex: 0,
          }),
        i.currentTranslate > t.minTranslate() &&
          ((b = !1),
          a.resistance &&
            (i.currentTranslate =
              t.minTranslate() -
              1 +
              (-t.minTranslate() + i.startTranslate + g) ** E)))
      : g < 0 &&
        (y &&
          v &&
          !p &&
          i.allowThresholdMove &&
          i.currentTranslate <
            (a.centeredSlides
              ? t.maxTranslate() +
                t.slidesSizesGrid[t.slidesSizesGrid.length - 1] +
                t.params.spaceBetween +
                (a.slidesPerView !== 'auto' &&
                t.slides.length - a.slidesPerView >= 2
                  ? t.slidesSizesGrid[t.slidesSizesGrid.length - 1] +
                    t.params.spaceBetween
                  : 0)
              : t.maxTranslate()) &&
          t.loopFix({
            direction: 'next',
            setTranslate: !0,
            activeSlideIndex:
              t.slides.length -
              (a.slidesPerView === 'auto'
                ? t.slidesPerViewDynamic()
                : Math.ceil(parseFloat(a.slidesPerView, 10))),
          }),
        i.currentTranslate < t.maxTranslate() &&
          ((b = !1),
          a.resistance &&
            (i.currentTranslate =
              t.maxTranslate() +
              1 -
              (t.maxTranslate() - i.startTranslate - g) ** E))),
    b && (n.preventedByNestedSwiper = !0),
    !t.allowSlideNext &&
      t.swipeDirection === 'next' &&
      i.currentTranslate < i.startTranslate &&
      (i.currentTranslate = i.startTranslate),
    !t.allowSlidePrev &&
      t.swipeDirection === 'prev' &&
      i.currentTranslate > i.startTranslate &&
      (i.currentTranslate = i.startTranslate),
    !t.allowSlidePrev &&
      !t.allowSlideNext &&
      (i.currentTranslate = i.startTranslate),
    a.threshold > 0)
  )
    if (Math.abs(g) > a.threshold || i.allowThresholdMove) {
      if (!i.allowThresholdMove) {
        (i.allowThresholdMove = !0),
          (r.startX = r.currentX),
          (r.startY = r.currentY),
          (i.currentTranslate = i.startTranslate),
          (r.diff = t.isHorizontal()
            ? r.currentX - r.startX
            : r.currentY - r.startY);
        return;
      }
    } else {
      i.currentTranslate = i.startTranslate;
      return;
    }
  !a.followFinger ||
    a.cssMode ||
    (((a.freeMode && a.freeMode.enabled && t.freeMode) ||
      a.watchSlidesProgress) &&
      (t.updateActiveIndex(), t.updateSlidesClasses()),
    a.freeMode && a.freeMode.enabled && t.freeMode && t.freeMode.onTouchMove(),
    t.updateProgress(i.currentTranslate),
    t.setTranslate(i.currentTranslate));
}
function as(s) {
  const e = this,
    t = e.touchEventsData;
  let i = s;
  i.originalEvent && (i = i.originalEvent);
  let a;
  if (i.type === 'touchend' || i.type === 'touchcancel') {
    if (
      ((a = [...i.changedTouches].filter((E) => E.identifier === t.touchId)[0]),
      !a || a.identifier !== t.touchId)
    )
      return;
  } else {
    if (t.touchId !== null || i.pointerId !== t.pointerId) return;
    a = i;
  }
  if (
    ['pointercancel', 'pointerout', 'pointerleave', 'contextmenu'].includes(
      i.type,
    ) &&
    !(
      ['pointercancel', 'contextmenu'].includes(i.type) &&
      (e.browser.isSafari || e.browser.isWebView)
    )
  )
    return;
  (t.pointerId = null), (t.touchId = null);
  const {
    params: f,
    touches: c,
    rtlTranslate: n,
    slidesGrid: u,
    enabled: o,
  } = e;
  if (!o || (!f.simulateTouch && i.pointerType === 'mouse')) return;
  if (
    (t.allowTouchCallbacks && e.emit('touchEnd', i),
    (t.allowTouchCallbacks = !1),
    !t.isTouched)
  ) {
    t.isMoved && f.grabCursor && e.setGrabCursor(!1),
      (t.isMoved = !1),
      (t.startMoving = !1);
    return;
  }
  f.grabCursor &&
    t.isMoved &&
    t.isTouched &&
    (e.allowSlideNext === !0 || e.allowSlidePrev === !0) &&
    e.setGrabCursor(!1);
  const l = Z(),
    d = l - t.touchStartTime;
  if (e.allowClick) {
    const E = i.path || (i.composedPath && i.composedPath());
    e.updateClickedSlide((E && E[0]) || i.target, E),
      e.emit('tap click', i),
      d < 300 &&
        l - t.lastClickTime < 300 &&
        e.emit('doubleTap doubleClick', i);
  }
  if (
    ((t.lastClickTime = Z()),
    re(() => {
      e.destroyed || (e.allowClick = !0);
    }),
    !t.isTouched ||
      !t.isMoved ||
      !e.swipeDirection ||
      (c.diff === 0 && !t.loopSwapReset) ||
      (t.currentTranslate === t.startTranslate && !t.loopSwapReset))
  ) {
    (t.isTouched = !1), (t.isMoved = !1), (t.startMoving = !1);
    return;
  }
  (t.isTouched = !1), (t.isMoved = !1), (t.startMoving = !1);
  let m;
  if (
    (f.followFinger
      ? (m = n ? e.translate : -e.translate)
      : (m = -t.currentTranslate),
    f.cssMode)
  )
    return;
  if (f.freeMode && f.freeMode.enabled) {
    e.freeMode.onTouchEnd({ currentPos: m });
    return;
  }
  const g = m >= -e.maxTranslate() && !e.params.loop;
  let h = 0,
    w = e.slidesSizesGrid[0];
  for (
    let E = 0;
    E < u.length;
    E += E < f.slidesPerGroupSkip ? 1 : f.slidesPerGroup
  ) {
    const z = E < f.slidesPerGroupSkip - 1 ? 1 : f.slidesPerGroup;
    typeof u[E + z] < 'u'
      ? (g || (m >= u[E] && m < u[E + z])) && ((h = E), (w = u[E + z] - u[E]))
      : (g || m >= u[E]) && ((h = E), (w = u[u.length - 1] - u[u.length - 2]));
  }
  let y = null,
    v = null;
  f.rewind &&
    (e.isBeginning
      ? (v =
          f.virtual && f.virtual.enabled && e.virtual
            ? e.virtual.slides.length - 1
            : e.slides.length - 1)
      : e.isEnd && (y = 0));
  const p = (m - u[h]) / w,
    b = h < f.slidesPerGroupSkip - 1 ? 1 : f.slidesPerGroup;
  if (d > f.longSwipesMs) {
    if (!f.longSwipes) {
      e.slideTo(e.activeIndex);
      return;
    }
    e.swipeDirection === 'next' &&
      (p >= f.longSwipesRatio
        ? e.slideTo(f.rewind && e.isEnd ? y : h + b)
        : e.slideTo(h)),
      e.swipeDirection === 'prev' &&
        (p > 1 - f.longSwipesRatio
          ? e.slideTo(h + b)
          : v !== null && p < 0 && Math.abs(p) > f.longSwipesRatio
          ? e.slideTo(v)
          : e.slideTo(h));
  } else {
    if (!f.shortSwipes) {
      e.slideTo(e.activeIndex);
      return;
    }
    e.navigation &&
    (i.target === e.navigation.nextEl || i.target === e.navigation.prevEl)
      ? i.target === e.navigation.nextEl
        ? e.slideTo(h + b)
        : e.slideTo(h)
      : (e.swipeDirection === 'next' && e.slideTo(y !== null ? y : h + b),
        e.swipeDirection === 'prev' && e.slideTo(v !== null ? v : h));
  }
}
function Ze() {
  const s = this,
    { params: e, el: t } = s;
  if (t && t.offsetWidth === 0) return;
  e.breakpoints && s.setBreakpoint();
  const { allowSlideNext: i, allowSlidePrev: a, snapGrid: r } = s,
    f = s.virtual && s.params.virtual.enabled;
  (s.allowSlideNext = !0),
    (s.allowSlidePrev = !0),
    s.updateSize(),
    s.updateSlides(),
    s.updateSlidesClasses();
  const c = f && e.loop;
  (e.slidesPerView === 'auto' || e.slidesPerView > 1) &&
  s.isEnd &&
  !s.isBeginning &&
  !s.params.centeredSlides &&
  !c
    ? s.slideTo(s.slides.length - 1, 0, !1, !0)
    : s.params.loop && !f
    ? s.slideToLoop(s.realIndex, 0, !1, !0)
    : s.slideTo(s.activeIndex, 0, !1, !0),
    s.autoplay &&
      s.autoplay.running &&
      s.autoplay.paused &&
      (clearTimeout(s.autoplay.resizeTimeout),
      (s.autoplay.resizeTimeout = setTimeout(() => {
        s.autoplay &&
          s.autoplay.running &&
          s.autoplay.paused &&
          s.autoplay.resume();
      }, 500))),
    (s.allowSlidePrev = a),
    (s.allowSlideNext = i),
    s.params.watchOverflow && r !== s.snapGrid && s.checkOverflow();
}
function ns(s) {
  const e = this;
  e.enabled &&
    (e.allowClick ||
      (e.params.preventClicks && s.preventDefault(),
      e.params.preventClicksPropagation &&
        e.animating &&
        (s.stopPropagation(), s.stopImmediatePropagation())));
}
function ls() {
  const s = this,
    { wrapperEl: e, rtlTranslate: t, enabled: i } = s;
  if (!i) return;
  (s.previousTranslate = s.translate),
    s.isHorizontal()
      ? (s.translate = -e.scrollLeft)
      : (s.translate = -e.scrollTop),
    s.translate === 0 && (s.translate = 0),
    s.updateActiveIndex(),
    s.updateSlidesClasses();
  let a;
  const r = s.maxTranslate() - s.minTranslate();
  r === 0 ? (a = 0) : (a = (s.translate - s.minTranslate()) / r),
    a !== s.progress && s.updateProgress(t ? -s.translate : s.translate),
    s.emit('setTranslate', s.translate, !1);
}
function os(s) {
  const e = this;
  ye(e, s.target),
    !(
      e.params.cssMode ||
      (e.params.slidesPerView !== 'auto' && !e.params.autoHeight)
    ) && e.update();
}
function ds() {
  const s = this;
  s.documentTouchHandlerProceeded ||
    ((s.documentTouchHandlerProceeded = !0),
    s.params.touchReleaseOnEdges && (s.el.style.touchAction = 'auto'));
}
const at = (s, e) => {
  const t = q(),
    { params: i, el: a, wrapperEl: r, device: f } = s,
    c = !!i.nested,
    n = e === 'on' ? 'addEventListener' : 'removeEventListener',
    u = e;
  !a ||
    typeof a == 'string' ||
    (t[n]('touchstart', s.onDocumentTouchStart, { passive: !1, capture: c }),
    a[n]('touchstart', s.onTouchStart, { passive: !1 }),
    a[n]('pointerdown', s.onTouchStart, { passive: !1 }),
    t[n]('touchmove', s.onTouchMove, { passive: !1, capture: c }),
    t[n]('pointermove', s.onTouchMove, { passive: !1, capture: c }),
    t[n]('touchend', s.onTouchEnd, { passive: !0 }),
    t[n]('pointerup', s.onTouchEnd, { passive: !0 }),
    t[n]('pointercancel', s.onTouchEnd, { passive: !0 }),
    t[n]('touchcancel', s.onTouchEnd, { passive: !0 }),
    t[n]('pointerout', s.onTouchEnd, { passive: !0 }),
    t[n]('pointerleave', s.onTouchEnd, { passive: !0 }),
    t[n]('contextmenu', s.onTouchEnd, { passive: !0 }),
    (i.preventClicks || i.preventClicksPropagation) &&
      a[n]('click', s.onClick, !0),
    i.cssMode && r[n]('scroll', s.onScroll),
    i.updateOnWindowResize
      ? s[u](
          f.ios || f.android
            ? 'resize orientationchange observerUpdate'
            : 'resize observerUpdate',
          Ze,
          !0,
        )
      : s[u]('observerUpdate', Ze, !0),
    a[n]('load', s.onLoad, { capture: !0 }));
};
function cs() {
  const s = this,
    { params: e } = s;
  (s.onTouchStart = is.bind(s)),
    (s.onTouchMove = rs.bind(s)),
    (s.onTouchEnd = as.bind(s)),
    (s.onDocumentTouchStart = ds.bind(s)),
    e.cssMode && (s.onScroll = ls.bind(s)),
    (s.onClick = ns.bind(s)),
    (s.onLoad = os.bind(s)),
    at(s, 'on');
}
function fs() {
  at(this, 'off');
}
var us = { attachEvents: cs, detachEvents: fs };
const Qe = (s, e) => s.grid && e.grid && e.grid.rows > 1;
function ps() {
  const s = this,
    { realIndex: e, initialized: t, params: i, el: a } = s,
    r = i.breakpoints;
  if (!r || (r && Object.keys(r).length === 0)) return;
  const f = s.getBreakpoint(r, s.params.breakpointsBase, s.el);
  if (!f || s.currentBreakpoint === f) return;
  const n = (f in r ? r[f] : void 0) || s.originalParams,
    u = Qe(s, i),
    o = Qe(s, n),
    l = s.params.grabCursor,
    d = n.grabCursor,
    m = i.enabled;
  u && !o
    ? (a.classList.remove(
        `${i.containerModifierClass}grid`,
        `${i.containerModifierClass}grid-column`,
      ),
      s.emitContainerClasses())
    : !u &&
      o &&
      (a.classList.add(`${i.containerModifierClass}grid`),
      ((n.grid.fill && n.grid.fill === 'column') ||
        (!n.grid.fill && i.grid.fill === 'column')) &&
        a.classList.add(`${i.containerModifierClass}grid-column`),
      s.emitContainerClasses()),
    l && !d ? s.unsetGrabCursor() : !l && d && s.setGrabCursor(),
    ['navigation', 'pagination', 'scrollbar'].forEach((p) => {
      if (typeof n[p] > 'u') return;
      const b = i[p] && i[p].enabled,
        E = n[p] && n[p].enabled;
      b && !E && s[p].disable(), !b && E && s[p].enable();
    });
  const g = n.direction && n.direction !== i.direction,
    h = i.loop && (n.slidesPerView !== i.slidesPerView || g),
    w = i.loop;
  g && t && s.changeDirection(), U(s.params, n);
  const y = s.params.enabled,
    v = s.params.loop;
  Object.assign(s, {
    allowTouchMove: s.params.allowTouchMove,
    allowSlideNext: s.params.allowSlideNext,
    allowSlidePrev: s.params.allowSlidePrev,
  }),
    m && !y ? s.disable() : !m && y && s.enable(),
    (s.currentBreakpoint = f),
    s.emit('_beforeBreakpoint', n),
    t &&
      (h
        ? (s.loopDestroy(), s.loopCreate(e), s.updateSlides())
        : !w && v
        ? (s.loopCreate(e), s.updateSlides())
        : w && !v && s.loopDestroy()),
    s.emit('breakpoint', n);
}
function ms(s, e, t) {
  if ((e === void 0 && (e = 'window'), !s || (e === 'container' && !t))) return;
  let i = !1;
  const a = F(),
    r = e === 'window' ? a.innerHeight : t.clientHeight,
    f = Object.keys(s).map((c) => {
      if (typeof c == 'string' && c.indexOf('@') === 0) {
        const n = parseFloat(c.substr(1));
        return { value: r * n, point: c };
      }
      return { value: c, point: c };
    });
  f.sort((c, n) => parseInt(c.value, 10) - parseInt(n.value, 10));
  for (let c = 0; c < f.length; c += 1) {
    const { point: n, value: u } = f[c];
    e === 'window'
      ? a.matchMedia(`(min-width: ${u}px)`).matches && (i = n)
      : u <= t.clientWidth && (i = n);
  }
  return i || 'max';
}
var hs = { setBreakpoint: ps, getBreakpoint: ms };
function gs(s, e) {
  const t = [];
  return (
    s.forEach((i) => {
      typeof i == 'object'
        ? Object.keys(i).forEach((a) => {
            i[a] && t.push(e + a);
          })
        : typeof i == 'string' && t.push(e + i);
    }),
    t
  );
}
function vs() {
  const s = this,
    { classNames: e, params: t, rtl: i, el: a, device: r } = s,
    f = gs(
      [
        'initialized',
        t.direction,
        { 'free-mode': s.params.freeMode && t.freeMode.enabled },
        { autoheight: t.autoHeight },
        { rtl: i },
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
  e.push(...f), a.classList.add(...e), s.emitContainerClasses();
}
function ws() {
  const s = this,
    { el: e, classNames: t } = s;
  !e ||
    typeof e == 'string' ||
    (e.classList.remove(...t), s.emitContainerClasses());
}
var ys = { addClasses: vs, removeClasses: ws };
function bs() {
  const s = this,
    { isLocked: e, params: t } = s,
    { slidesOffsetBefore: i } = t;
  if (i) {
    const a = s.slides.length - 1,
      r = s.slidesGrid[a] + s.slidesSizesGrid[a] + i * 2;
    s.isLocked = s.size > r;
  } else s.isLocked = s.snapGrid.length === 1;
  t.allowSlideNext === !0 && (s.allowSlideNext = !s.isLocked),
    t.allowSlidePrev === !0 && (s.allowSlidePrev = !s.isLocked),
    e && e !== s.isLocked && (s.isEnd = !1),
    e !== s.isLocked && s.emit(s.isLocked ? 'lock' : 'unlock');
}
var Ss = { checkOverflow: bs },
  Je = {
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
function Es(s, e) {
  return function (i) {
    i === void 0 && (i = {});
    const a = Object.keys(i)[0],
      r = i[a];
    if (typeof r != 'object' || r === null) {
      U(e, i);
      return;
    }
    if (
      (s[a] === !0 && (s[a] = { enabled: !0 }),
      a === 'navigation' &&
        s[a] &&
        s[a].enabled &&
        !s[a].prevEl &&
        !s[a].nextEl &&
        (s[a].auto = !0),
      ['pagination', 'scrollbar'].indexOf(a) >= 0 &&
        s[a] &&
        s[a].enabled &&
        !s[a].el &&
        (s[a].auto = !0),
      !(a in s && 'enabled' in r))
    ) {
      U(e, i);
      return;
    }
    typeof s[a] == 'object' && !('enabled' in s[a]) && (s[a].enabled = !0),
      s[a] || (s[a] = { enabled: !1 }),
      U(e, i);
  };
}
const De = {
    eventsEmitter: yt,
    update: zt,
    translate: Gt,
    transition: Vt,
    slide: jt,
    loop: Qt,
    grabCursor: ts,
    events: us,
    breakpoints: hs,
    checkOverflow: Ss,
    classes: ys,
  },
  Oe = {};
class j {
  constructor() {
    let e, t;
    for (var i = arguments.length, a = new Array(i), r = 0; r < i; r++)
      a[r] = arguments[r];
    a.length === 1 &&
    a[0].constructor &&
    Object.prototype.toString.call(a[0]).slice(8, -1) === 'Object'
      ? (t = a[0])
      : ([e, t] = a),
      t || (t = {}),
      (t = U({}, t)),
      e && !t.el && (t.el = e);
    const f = q();
    if (
      t.el &&
      typeof t.el == 'string' &&
      f.querySelectorAll(t.el).length > 1
    ) {
      const o = [];
      return (
        f.querySelectorAll(t.el).forEach((l) => {
          const d = U({}, t, { el: l });
          o.push(new j(d));
        }),
        o
      );
    }
    const c = this;
    (c.__swiper__ = !0),
      (c.support = st()),
      (c.device = it({ userAgent: t.userAgent })),
      (c.browser = gt()),
      (c.eventsListeners = {}),
      (c.eventsAnyListeners = []),
      (c.modules = [...c.__modules__]),
      t.modules && Array.isArray(t.modules) && c.modules.push(...t.modules);
    const n = {};
    c.modules.forEach((o) => {
      o({
        params: t,
        swiper: c,
        extendParams: Es(t, n),
        on: c.on.bind(c),
        once: c.once.bind(c),
        off: c.off.bind(c),
        emit: c.emit.bind(c),
      });
    });
    const u = U({}, Je, n);
    return (
      (c.params = U({}, u, Oe, t)),
      (c.originalParams = U({}, c.params)),
      (c.passedParams = U({}, t)),
      c.params &&
        c.params.on &&
        Object.keys(c.params.on).forEach((o) => {
          c.on(o, c.params.on[o]);
        }),
      c.params && c.params.onAny && c.onAny(c.params.onAny),
      Object.assign(c, {
        enabled: c.params.enabled,
        el: e,
        classNames: [],
        slides: [],
        slidesGrid: [],
        snapGrid: [],
        slidesSizesGrid: [],
        isHorizontal() {
          return c.params.direction === 'horizontal';
        },
        isVertical() {
          return c.params.direction === 'vertical';
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
        allowSlideNext: c.params.allowSlideNext,
        allowSlidePrev: c.params.allowSlidePrev,
        touchEventsData: {
          isTouched: void 0,
          isMoved: void 0,
          allowTouchCallbacks: void 0,
          touchStartTime: void 0,
          isScrolling: void 0,
          currentTranslate: void 0,
          startTranslate: void 0,
          allowThresholdMove: void 0,
          focusableElements: c.params.focusableElements,
          lastClickTime: 0,
          clickTimeout: void 0,
          velocities: [],
          allowMomentumBounce: void 0,
          startMoving: void 0,
          pointerId: null,
          touchId: null,
        },
        allowClick: !0,
        allowTouchMove: c.params.allowTouchMove,
        touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
        imagesToLoad: [],
        imagesLoaded: 0,
      }),
      c.emit('_swiper'),
      c.params.init && c.init(),
      c
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
    const { slidesEl: t, params: i } = this,
      a = W(t, `.${i.slideClass}, swiper-slide`),
      r = me(a[0]);
    return me(e) - r;
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
      { slidesEl: t, params: i } = e;
    e.slides = W(t, `.${i.slideClass}, swiper-slide`);
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
    const i = this;
    e = Math.min(Math.max(e, 0), 1);
    const a = i.minTranslate(),
      f = (i.maxTranslate() - a) * e + a;
    i.translateTo(f, typeof t > 'u' ? 0 : t),
      i.updateActiveIndex(),
      i.updateSlidesClasses();
  }
  emitContainerClasses() {
    const e = this;
    if (!e.params._emitClasses || !e.el) return;
    const t = e.el.className
      .split(' ')
      .filter(
        (i) =>
          i.indexOf('swiper') === 0 ||
          i.indexOf(e.params.containerModifierClass) === 0,
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
            (i) =>
              i.indexOf('swiper-slide') === 0 ||
              i.indexOf(t.params.slideClass) === 0,
          )
          .join(' ');
  }
  emitSlidesClasses() {
    const e = this;
    if (!e.params._emitClasses || !e.el) return;
    const t = [];
    e.slides.forEach((i) => {
      const a = e.getSlideClasses(i);
      t.push({ slideEl: i, classNames: a }), e.emit('_slideClass', i, a);
    }),
      e.emit('_slideClasses', t);
  }
  slidesPerViewDynamic(e, t) {
    e === void 0 && (e = 'current'), t === void 0 && (t = !1);
    const i = this,
      {
        params: a,
        slides: r,
        slidesGrid: f,
        slidesSizesGrid: c,
        size: n,
        activeIndex: u,
      } = i;
    let o = 1;
    if (typeof a.slidesPerView == 'number') return a.slidesPerView;
    if (a.centeredSlides) {
      let l = r[u] ? Math.ceil(r[u].swiperSlideSize) : 0,
        d;
      for (let m = u + 1; m < r.length; m += 1)
        r[m] &&
          !d &&
          ((l += Math.ceil(r[m].swiperSlideSize)), (o += 1), l > n && (d = !0));
      for (let m = u - 1; m >= 0; m -= 1)
        r[m] &&
          !d &&
          ((l += r[m].swiperSlideSize), (o += 1), l > n && (d = !0));
    } else if (e === 'current')
      for (let l = u + 1; l < r.length; l += 1)
        (t ? f[l] + c[l] - f[u] < n : f[l] - f[u] < n) && (o += 1);
    else for (let l = u - 1; l >= 0; l -= 1) f[u] - f[l] < n && (o += 1);
    return o;
  }
  update() {
    const e = this;
    if (!e || e.destroyed) return;
    const { snapGrid: t, params: i } = e;
    i.breakpoints && e.setBreakpoint(),
      [...e.el.querySelectorAll('[loading="lazy"]')].forEach((f) => {
        f.complete && ye(e, f);
      }),
      e.updateSize(),
      e.updateSlides(),
      e.updateProgress(),
      e.updateSlidesClasses();
    function a() {
      const f = e.rtlTranslate ? e.translate * -1 : e.translate,
        c = Math.min(Math.max(f, e.maxTranslate()), e.minTranslate());
      e.setTranslate(c), e.updateActiveIndex(), e.updateSlidesClasses();
    }
    let r;
    if (i.freeMode && i.freeMode.enabled && !i.cssMode)
      a(), i.autoHeight && e.updateAutoHeight();
    else {
      if (
        (i.slidesPerView === 'auto' || i.slidesPerView > 1) &&
        e.isEnd &&
        !i.centeredSlides
      ) {
        const f = e.virtual && i.virtual.enabled ? e.virtual.slides : e.slides;
        r = e.slideTo(f.length - 1, 0, !1, !0);
      } else r = e.slideTo(e.activeIndex, 0, !1, !0);
      r || a();
    }
    i.watchOverflow && t !== e.snapGrid && e.checkOverflow(), e.emit('update');
  }
  changeDirection(e, t) {
    t === void 0 && (t = !0);
    const i = this,
      a = i.params.direction;
    return (
      e || (e = a === 'horizontal' ? 'vertical' : 'horizontal'),
      e === a ||
        (e !== 'horizontal' && e !== 'vertical') ||
        (i.el.classList.remove(`${i.params.containerModifierClass}${a}`),
        i.el.classList.add(`${i.params.containerModifierClass}${e}`),
        i.emitContainerClasses(),
        (i.params.direction = e),
        i.slides.forEach((r) => {
          e === 'vertical' ? (r.style.width = '') : (r.style.height = '');
        }),
        i.emit('changeDirection'),
        t && i.update()),
      i
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
    let i = e || t.params.el;
    if ((typeof i == 'string' && (i = document.querySelector(i)), !i))
      return !1;
    (i.swiper = t),
      i.parentNode &&
        i.parentNode.host &&
        i.parentNode.host.nodeName ===
          t.params.swiperElementNodeName.toUpperCase() &&
        (t.isElement = !0);
    const a = () =>
      `.${(t.params.wrapperClass || '').trim().split(' ').join('.')}`;
    let f = (() =>
      i && i.shadowRoot && i.shadowRoot.querySelector
        ? i.shadowRoot.querySelector(a())
        : W(i, a())[0])();
    return (
      !f &&
        t.params.createElements &&
        ((f = K('div', t.params.wrapperClass)),
        i.append(f),
        W(i, `.${t.params.slideClass}`).forEach((c) => {
          f.append(c);
        })),
      Object.assign(t, {
        el: i,
        wrapperEl: f,
        slidesEl:
          t.isElement && !i.parentNode.host.slideSlots ? i.parentNode.host : f,
        hostEl: t.isElement ? i.parentNode.host : i,
        mounted: !0,
        rtl: i.dir.toLowerCase() === 'rtl' || te(i, 'direction') === 'rtl',
        rtlTranslate:
          t.params.direction === 'horizontal' &&
          (i.dir.toLowerCase() === 'rtl' || te(i, 'direction') === 'rtl'),
        wrongRTL: te(f, 'display') === '-webkit-box',
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
    const a = [...t.el.querySelectorAll('[loading="lazy"]')];
    return (
      t.isElement && a.push(...t.hostEl.querySelectorAll('[loading="lazy"]')),
      a.forEach((r) => {
        r.complete
          ? ye(t, r)
          : r.addEventListener('load', (f) => {
              ye(t, f.target);
            });
      }),
      He(t),
      (t.initialized = !0),
      He(t),
      t.emit('init'),
      t.emit('afterInit'),
      t
    );
  }
  destroy(e, t) {
    e === void 0 && (e = !0), t === void 0 && (t = !0);
    const i = this,
      { params: a, el: r, wrapperEl: f, slides: c } = i;
    return (
      typeof i.params > 'u' ||
        i.destroyed ||
        (i.emit('beforeDestroy'),
        (i.initialized = !1),
        i.detachEvents(),
        a.loop && i.loopDestroy(),
        t &&
          (i.removeClasses(),
          r && typeof r != 'string' && r.removeAttribute('style'),
          f && f.removeAttribute('style'),
          c &&
            c.length &&
            c.forEach((n) => {
              n.classList.remove(
                a.slideVisibleClass,
                a.slideFullyVisibleClass,
                a.slideActiveClass,
                a.slideNextClass,
                a.slidePrevClass,
              ),
                n.removeAttribute('style'),
                n.removeAttribute('data-swiper-slide-index');
            })),
        i.emit('destroy'),
        Object.keys(i.eventsListeners).forEach((n) => {
          i.off(n);
        }),
        e !== !1 &&
          (i.el && typeof i.el != 'string' && (i.el.swiper = null), lt(i)),
        (i.destroyed = !0)),
      null
    );
  }
  static extendDefaults(e) {
    U(Oe, e);
  }
  static get extendedDefaults() {
    return Oe;
  }
  static get defaults() {
    return Je;
  }
  static installModule(e) {
    j.prototype.__modules__ || (j.prototype.__modules__ = []);
    const t = j.prototype.__modules__;
    typeof e == 'function' && t.indexOf(e) < 0 && t.push(e);
  }
  static use(e) {
    return Array.isArray(e)
      ? (e.forEach((t) => j.installModule(t)), j)
      : (j.installModule(e), j);
  }
}
Object.keys(De).forEach((s) => {
  Object.keys(De[s]).forEach((e) => {
    j.prototype[e] = De[s][e];
  });
});
j.use([vt, wt]);
function xs(s) {
  let { swiper: e, extendParams: t, on: i, emit: a } = s;
  t({
    virtual: {
      enabled: !1,
      slides: [],
      cache: !0,
      renderSlide: null,
      renderExternal: null,
      renderExternalUpdate: !0,
      addSlidesBefore: 0,
      addSlidesAfter: 0,
    },
  });
  let r;
  const f = q();
  e.virtual = {
    cache: {},
    from: void 0,
    to: void 0,
    slides: [],
    offset: 0,
    slidesGrid: [],
  };
  const c = f.createElement('div');
  function n(g, h) {
    const w = e.params.virtual;
    if (w.cache && e.virtual.cache[h]) return e.virtual.cache[h];
    let y;
    return (
      w.renderSlide
        ? ((y = w.renderSlide.call(e, g, h)),
          typeof y == 'string' && ((c.innerHTML = y), (y = c.children[0])))
        : e.isElement
        ? (y = K('swiper-slide'))
        : (y = K('div', e.params.slideClass)),
      y.setAttribute('data-swiper-slide-index', h),
      w.renderSlide || (y.innerHTML = g),
      w.cache && (e.virtual.cache[h] = y),
      y
    );
  }
  function u(g, h) {
    const {
      slidesPerView: w,
      slidesPerGroup: y,
      centeredSlides: v,
      loop: p,
      initialSlide: b,
    } = e.params;
    if (h && !p && b > 0) return;
    const { addSlidesBefore: E, addSlidesAfter: z } = e.params.virtual,
      { from: D, to: A, slides: M, slidesGrid: P, offset: I } = e.virtual;
    e.params.cssMode || e.updateActiveIndex();
    const C = e.activeIndex || 0;
    let S;
    e.rtlTranslate ? (S = 'right') : (S = e.isHorizontal() ? 'left' : 'top');
    let x, $;
    v
      ? ((x = Math.floor(w / 2) + y + z), ($ = Math.floor(w / 2) + y + E))
      : ((x = w + (y - 1) + z), ($ = (p ? w : y) + E));
    let H = C - $,
      T = C + x;
    p || ((H = Math.max(H, 0)), (T = Math.min(T, M.length - 1)));
    let L = (e.slidesGrid[H] || 0) - (e.slidesGrid[0] || 0);
    p && C >= $
      ? ((H -= $), v || (L += e.slidesGrid[0]))
      : p && C < $ && ((H = -$), v && (L += e.slidesGrid[0])),
      Object.assign(e.virtual, {
        from: H,
        to: T,
        offset: L,
        slidesGrid: e.slidesGrid,
        slidesBefore: $,
        slidesAfter: x,
      });
    function G() {
      e.updateSlides(),
        e.updateProgress(),
        e.updateSlidesClasses(),
        a('virtualUpdate');
    }
    if (D === H && A === T && !g) {
      e.slidesGrid !== P &&
        L !== I &&
        e.slides.forEach((R) => {
          R.style[S] = `${L - Math.abs(e.cssOverflowAdjustment())}px`;
        }),
        e.updateProgress(),
        a('virtualUpdate');
      return;
    }
    if (e.params.virtual.renderExternal) {
      e.params.virtual.renderExternal.call(e, {
        offset: L,
        from: H,
        to: T,
        slides: (function () {
          const Y = [];
          for (let _ = H; _ <= T; _ += 1) Y.push(M[_]);
          return Y;
        })(),
      }),
        e.params.virtual.renderExternalUpdate ? G() : a('virtualUpdate');
      return;
    }
    const V = [],
      O = [],
      k = (R) => {
        let Y = R;
        return (
          R < 0 ? (Y = M.length + R) : Y >= M.length && (Y = Y - M.length), Y
        );
      };
    if (g)
      e.slides
        .filter((R) => R.matches(`.${e.params.slideClass}, swiper-slide`))
        .forEach((R) => {
          R.remove();
        });
    else
      for (let R = D; R <= A; R += 1)
        if (R < H || R > T) {
          const Y = k(R);
          e.slides
            .filter((_) =>
              _.matches(
                `.${e.params.slideClass}[data-swiper-slide-index="${Y}"], swiper-slide[data-swiper-slide-index="${Y}"]`,
              ),
            )
            .forEach((_) => {
              _.remove();
            });
        }
    const B = p ? -M.length : 0,
      N = p ? M.length * 2 : M.length;
    for (let R = B; R < N; R += 1)
      if (R >= H && R <= T) {
        const Y = k(R);
        typeof A > 'u' || g
          ? O.push(Y)
          : (R > A && O.push(Y), R < D && V.push(Y));
      }
    if (
      (O.forEach((R) => {
        e.slidesEl.append(n(M[R], R));
      }),
      p)
    )
      for (let R = V.length - 1; R >= 0; R -= 1) {
        const Y = V[R];
        e.slidesEl.prepend(n(M[Y], Y));
      }
    else
      V.sort((R, Y) => Y - R),
        V.forEach((R) => {
          e.slidesEl.prepend(n(M[R], R));
        });
    W(e.slidesEl, '.swiper-slide, swiper-slide').forEach((R) => {
      R.style[S] = `${L - Math.abs(e.cssOverflowAdjustment())}px`;
    }),
      G();
  }
  function o(g) {
    if (typeof g == 'object' && 'length' in g)
      for (let h = 0; h < g.length; h += 1) g[h] && e.virtual.slides.push(g[h]);
    else e.virtual.slides.push(g);
    u(!0);
  }
  function l(g) {
    const h = e.activeIndex;
    let w = h + 1,
      y = 1;
    if (Array.isArray(g)) {
      for (let v = 0; v < g.length; v += 1)
        g[v] && e.virtual.slides.unshift(g[v]);
      (w = h + g.length), (y = g.length);
    } else e.virtual.slides.unshift(g);
    if (e.params.virtual.cache) {
      const v = e.virtual.cache,
        p = {};
      Object.keys(v).forEach((b) => {
        const E = v[b],
          z = E.getAttribute('data-swiper-slide-index');
        z && E.setAttribute('data-swiper-slide-index', parseInt(z, 10) + y),
          (p[parseInt(b, 10) + y] = E);
      }),
        (e.virtual.cache = p);
    }
    u(!0), e.slideTo(w, 0);
  }
  function d(g) {
    if (typeof g > 'u' || g === null) return;
    let h = e.activeIndex;
    if (Array.isArray(g))
      for (let w = g.length - 1; w >= 0; w -= 1)
        e.params.virtual.cache &&
          (delete e.virtual.cache[g[w]],
          Object.keys(e.virtual.cache).forEach((y) => {
            y > g &&
              ((e.virtual.cache[y - 1] = e.virtual.cache[y]),
              e.virtual.cache[y - 1].setAttribute(
                'data-swiper-slide-index',
                y - 1,
              ),
              delete e.virtual.cache[y]);
          })),
          e.virtual.slides.splice(g[w], 1),
          g[w] < h && (h -= 1),
          (h = Math.max(h, 0));
    else
      e.params.virtual.cache &&
        (delete e.virtual.cache[g],
        Object.keys(e.virtual.cache).forEach((w) => {
          w > g &&
            ((e.virtual.cache[w - 1] = e.virtual.cache[w]),
            e.virtual.cache[w - 1].setAttribute(
              'data-swiper-slide-index',
              w - 1,
            ),
            delete e.virtual.cache[w]);
        })),
        e.virtual.slides.splice(g, 1),
        g < h && (h -= 1),
        (h = Math.max(h, 0));
    u(!0), e.slideTo(h, 0);
  }
  function m() {
    (e.virtual.slides = []),
      e.params.virtual.cache && (e.virtual.cache = {}),
      u(!0),
      e.slideTo(0, 0);
  }
  i('beforeInit', () => {
    if (!e.params.virtual.enabled) return;
    let g;
    if (typeof e.passedParams.virtual.slides > 'u') {
      const h = [...e.slidesEl.children].filter((w) =>
        w.matches(`.${e.params.slideClass}, swiper-slide`),
      );
      h &&
        h.length &&
        ((e.virtual.slides = [...h]),
        (g = !0),
        h.forEach((w, y) => {
          w.setAttribute('data-swiper-slide-index', y),
            (e.virtual.cache[y] = w),
            w.remove();
        }));
    }
    g || (e.virtual.slides = e.params.virtual.slides),
      e.classNames.push(`${e.params.containerModifierClass}virtual`),
      (e.params.watchSlidesProgress = !0),
      (e.originalParams.watchSlidesProgress = !0),
      u(!1, !0);
  }),
    i('setTranslate', () => {
      e.params.virtual.enabled &&
        (e.params.cssMode && !e._immediateVirtual
          ? (clearTimeout(r),
            (r = setTimeout(() => {
              u();
            }, 100)))
          : u());
    }),
    i('init update resize', () => {
      e.params.virtual.enabled &&
        e.params.cssMode &&
        ue(e.wrapperEl, '--swiper-virtual-size', `${e.virtualSize}px`);
    }),
    Object.assign(e.virtual, {
      appendSlide: o,
      prependSlide: l,
      removeSlide: d,
      removeAllSlides: m,
      update: u,
    });
}
function Ts(s) {
  let { swiper: e, extendParams: t, on: i, emit: a } = s;
  const r = q(),
    f = F();
  (e.keyboard = { enabled: !1 }),
    t({ keyboard: { enabled: !1, onlyInViewport: !0, pageUpDown: !0 } });
  function c(o) {
    if (!e.enabled) return;
    const { rtlTranslate: l } = e;
    let d = o;
    d.originalEvent && (d = d.originalEvent);
    const m = d.keyCode || d.charCode,
      g = e.params.keyboard.pageUpDown,
      h = g && m === 33,
      w = g && m === 34,
      y = m === 37,
      v = m === 39,
      p = m === 38,
      b = m === 40;
    if (
      (!e.allowSlideNext &&
        ((e.isHorizontal() && v) || (e.isVertical() && b) || w)) ||
      (!e.allowSlidePrev &&
        ((e.isHorizontal() && y) || (e.isVertical() && p) || h))
    )
      return !1;
    if (
      !(d.shiftKey || d.altKey || d.ctrlKey || d.metaKey) &&
      !(
        r.activeElement &&
        r.activeElement.nodeName &&
        (r.activeElement.nodeName.toLowerCase() === 'input' ||
          r.activeElement.nodeName.toLowerCase() === 'textarea')
      )
    ) {
      if (e.params.keyboard.onlyInViewport && (h || w || y || v || p || b)) {
        let E = !1;
        if (
          ie(e.el, `.${e.params.slideClass}, swiper-slide`).length > 0 &&
          ie(e.el, `.${e.params.slideActiveClass}`).length === 0
        )
          return;
        const z = e.el,
          D = z.clientWidth,
          A = z.clientHeight,
          M = f.innerWidth,
          P = f.innerHeight,
          I = Se(z);
        l && (I.left -= z.scrollLeft);
        const C = [
          [I.left, I.top],
          [I.left + D, I.top],
          [I.left, I.top + A],
          [I.left + D, I.top + A],
        ];
        for (let S = 0; S < C.length; S += 1) {
          const x = C[S];
          if (x[0] >= 0 && x[0] <= M && x[1] >= 0 && x[1] <= P) {
            if (x[0] === 0 && x[1] === 0) continue;
            E = !0;
          }
        }
        if (!E) return;
      }
      e.isHorizontal()
        ? ((h || w || y || v) &&
            (d.preventDefault ? d.preventDefault() : (d.returnValue = !1)),
          (((w || v) && !l) || ((h || y) && l)) && e.slideNext(),
          (((h || y) && !l) || ((w || v) && l)) && e.slidePrev())
        : ((h || w || p || b) &&
            (d.preventDefault ? d.preventDefault() : (d.returnValue = !1)),
          (w || b) && e.slideNext(),
          (h || p) && e.slidePrev()),
        a('keyPress', m);
    }
  }
  function n() {
    e.keyboard.enabled ||
      (r.addEventListener('keydown', c), (e.keyboard.enabled = !0));
  }
  function u() {
    e.keyboard.enabled &&
      (r.removeEventListener('keydown', c), (e.keyboard.enabled = !1));
  }
  i('init', () => {
    e.params.keyboard.enabled && n();
  }),
    i('destroy', () => {
      e.keyboard.enabled && u();
    }),
    Object.assign(e.keyboard, { enable: n, disable: u });
}
function Ms(s) {
  let { swiper: e, extendParams: t, on: i, emit: a } = s;
  const r = F();
  t({
    mousewheel: {
      enabled: !1,
      releaseOnEdges: !1,
      invert: !1,
      forceToAxis: !1,
      sensitivity: 1,
      eventsTarget: 'container',
      thresholdDelta: null,
      thresholdTime: null,
      noMousewheelClass: 'swiper-no-mousewheel',
    },
  }),
    (e.mousewheel = { enabled: !1 });
  let f,
    c = Z(),
    n;
  const u = [];
  function o(p) {
    let D = 0,
      A = 0,
      M = 0,
      P = 0;
    return (
      'detail' in p && (A = p.detail),
      'wheelDelta' in p && (A = -p.wheelDelta / 120),
      'wheelDeltaY' in p && (A = -p.wheelDeltaY / 120),
      'wheelDeltaX' in p && (D = -p.wheelDeltaX / 120),
      'axis' in p && p.axis === p.HORIZONTAL_AXIS && ((D = A), (A = 0)),
      (M = D * 10),
      (P = A * 10),
      'deltaY' in p && (P = p.deltaY),
      'deltaX' in p && (M = p.deltaX),
      p.shiftKey && !M && ((M = P), (P = 0)),
      (M || P) &&
        p.deltaMode &&
        (p.deltaMode === 1 ? ((M *= 40), (P *= 40)) : ((M *= 800), (P *= 800))),
      M && !D && (D = M < 1 ? -1 : 1),
      P && !A && (A = P < 1 ? -1 : 1),
      { spinX: D, spinY: A, pixelX: M, pixelY: P }
    );
  }
  function l() {
    e.enabled && (e.mouseEntered = !0);
  }
  function d() {
    e.enabled && (e.mouseEntered = !1);
  }
  function m(p) {
    return (e.params.mousewheel.thresholdDelta &&
      p.delta < e.params.mousewheel.thresholdDelta) ||
      (e.params.mousewheel.thresholdTime &&
        Z() - c < e.params.mousewheel.thresholdTime)
      ? !1
      : p.delta >= 6 && Z() - c < 60
      ? !0
      : (p.direction < 0
          ? (!e.isEnd || e.params.loop) &&
            !e.animating &&
            (e.slideNext(), a('scroll', p.raw))
          : (!e.isBeginning || e.params.loop) &&
            !e.animating &&
            (e.slidePrev(), a('scroll', p.raw)),
        (c = new r.Date().getTime()),
        !1);
  }
  function g(p) {
    const b = e.params.mousewheel;
    if (p.direction < 0) {
      if (e.isEnd && !e.params.loop && b.releaseOnEdges) return !0;
    } else if (e.isBeginning && !e.params.loop && b.releaseOnEdges) return !0;
    return !1;
  }
  function h(p) {
    let b = p,
      E = !0;
    if (
      !e.enabled ||
      p.target.closest(`.${e.params.mousewheel.noMousewheelClass}`)
    )
      return;
    const z = e.params.mousewheel;
    e.params.cssMode && b.preventDefault();
    let D = e.el;
    e.params.mousewheel.eventsTarget !== 'container' &&
      (D = document.querySelector(e.params.mousewheel.eventsTarget));
    const A = D && D.contains(b.target);
    if (!e.mouseEntered && !A && !z.releaseOnEdges) return !0;
    b.originalEvent && (b = b.originalEvent);
    let M = 0;
    const P = e.rtlTranslate ? -1 : 1,
      I = o(b);
    if (z.forceToAxis)
      if (e.isHorizontal())
        if (Math.abs(I.pixelX) > Math.abs(I.pixelY)) M = -I.pixelX * P;
        else return !0;
      else if (Math.abs(I.pixelY) > Math.abs(I.pixelX)) M = -I.pixelY;
      else return !0;
    else
      M = Math.abs(I.pixelX) > Math.abs(I.pixelY) ? -I.pixelX * P : -I.pixelY;
    if (M === 0) return !0;
    z.invert && (M = -M);
    let C = e.getTranslate() + M * z.sensitivity;
    if (
      (C >= e.minTranslate() && (C = e.minTranslate()),
      C <= e.maxTranslate() && (C = e.maxTranslate()),
      (E = e.params.loop
        ? !0
        : !(C === e.minTranslate() || C === e.maxTranslate())),
      E && e.params.nested && b.stopPropagation(),
      !e.params.freeMode || !e.params.freeMode.enabled)
    ) {
      const S = {
        time: Z(),
        delta: Math.abs(M),
        direction: Math.sign(M),
        raw: p,
      };
      u.length >= 2 && u.shift();
      const x = u.length ? u[u.length - 1] : void 0;
      if (
        (u.push(S),
        x
          ? (S.direction !== x.direction ||
              S.delta > x.delta ||
              S.time > x.time + 150) &&
            m(S)
          : m(S),
        g(S))
      )
        return !0;
    } else {
      const S = { time: Z(), delta: Math.abs(M), direction: Math.sign(M) },
        x =
          n &&
          S.time < n.time + 500 &&
          S.delta <= n.delta &&
          S.direction === n.direction;
      if (!x) {
        n = void 0;
        let $ = e.getTranslate() + M * z.sensitivity;
        const H = e.isBeginning,
          T = e.isEnd;
        if (
          ($ >= e.minTranslate() && ($ = e.minTranslate()),
          $ <= e.maxTranslate() && ($ = e.maxTranslate()),
          e.setTransition(0),
          e.setTranslate($),
          e.updateProgress(),
          e.updateActiveIndex(),
          e.updateSlidesClasses(),
          ((!H && e.isBeginning) || (!T && e.isEnd)) && e.updateSlidesClasses(),
          e.params.loop &&
            e.loopFix({
              direction: S.direction < 0 ? 'next' : 'prev',
              byMousewheel: !0,
            }),
          e.params.freeMode.sticky)
        ) {
          clearTimeout(f), (f = void 0), u.length >= 15 && u.shift();
          const L = u.length ? u[u.length - 1] : void 0,
            G = u[0];
          if (
            (u.push(S), L && (S.delta > L.delta || S.direction !== L.direction))
          )
            u.splice(0);
          else if (
            u.length >= 15 &&
            S.time - G.time < 500 &&
            G.delta - S.delta >= 1 &&
            S.delta <= 6
          ) {
            const V = M > 0 ? 0.8 : 0.2;
            (n = S),
              u.splice(0),
              (f = re(() => {
                e.destroyed ||
                  !e.params ||
                  e.slideToClosest(e.params.speed, !0, void 0, V);
              }, 0));
          }
          f ||
            (f = re(() => {
              if (e.destroyed || !e.params) return;
              const V = 0.5;
              (n = S),
                u.splice(0),
                e.slideToClosest(e.params.speed, !0, void 0, V);
            }, 500));
        }
        if (
          (x || a('scroll', b),
          e.params.autoplay &&
            e.params.autoplayDisableOnInteraction &&
            e.autoplay.stop(),
          z.releaseOnEdges &&
            ($ === e.minTranslate() || $ === e.maxTranslate()))
        )
          return !0;
      }
    }
    return b.preventDefault ? b.preventDefault() : (b.returnValue = !1), !1;
  }
  function w(p) {
    let b = e.el;
    e.params.mousewheel.eventsTarget !== 'container' &&
      (b = document.querySelector(e.params.mousewheel.eventsTarget)),
      b[p]('mouseenter', l),
      b[p]('mouseleave', d),
      b[p]('wheel', h);
  }
  function y() {
    return e.params.cssMode
      ? (e.wrapperEl.removeEventListener('wheel', h), !0)
      : e.mousewheel.enabled
      ? !1
      : (w('addEventListener'), (e.mousewheel.enabled = !0), !0);
  }
  function v() {
    return e.params.cssMode
      ? (e.wrapperEl.addEventListener(event, h), !0)
      : e.mousewheel.enabled
      ? (w('removeEventListener'), (e.mousewheel.enabled = !1), !0)
      : !1;
  }
  i('init', () => {
    !e.params.mousewheel.enabled && e.params.cssMode && v(),
      e.params.mousewheel.enabled && y();
  }),
    i('destroy', () => {
      e.params.cssMode && y(), e.mousewheel.enabled && v();
    }),
    Object.assign(e.mousewheel, { enable: y, disable: v });
}
function Re(s, e, t, i) {
  return (
    s.params.createElements &&
      Object.keys(i).forEach((a) => {
        if (!t[a] && t.auto === !0) {
          let r = W(s.el, `.${i[a]}`)[0];
          r || ((r = K('div', i[a])), (r.className = i[a]), s.el.append(r)),
            (t[a] = r),
            (e[a] = r);
        }
      }),
    t
  );
}
function Ve(s) {
  let { swiper: e, extendParams: t, on: i, emit: a } = s;
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
  function r(g) {
    let h;
    return g &&
      typeof g == 'string' &&
      e.isElement &&
      ((h = e.el.querySelector(g) || e.hostEl.querySelector(g)), h)
      ? h
      : (g &&
          (typeof g == 'string' && (h = [...document.querySelectorAll(g)]),
          e.params.uniqueNavElements &&
          typeof g == 'string' &&
          h &&
          h.length > 1 &&
          e.el.querySelectorAll(g).length === 1
            ? (h = e.el.querySelector(g))
            : h && h.length === 1 && (h = h[0])),
        g && !h ? g : h);
  }
  function f(g, h) {
    const w = e.params.navigation;
    (g = X(g)),
      g.forEach((y) => {
        y &&
          (y.classList[h ? 'add' : 'remove'](...w.disabledClass.split(' ')),
          y.tagName === 'BUTTON' && (y.disabled = h),
          e.params.watchOverflow &&
            e.enabled &&
            y.classList[e.isLocked ? 'add' : 'remove'](w.lockClass));
      });
  }
  function c() {
    const { nextEl: g, prevEl: h } = e.navigation;
    if (e.params.loop) {
      f(h, !1), f(g, !1);
      return;
    }
    f(h, e.isBeginning && !e.params.rewind), f(g, e.isEnd && !e.params.rewind);
  }
  function n(g) {
    g.preventDefault(),
      !(e.isBeginning && !e.params.loop && !e.params.rewind) &&
        (e.slidePrev(), a('navigationPrev'));
  }
  function u(g) {
    g.preventDefault(),
      !(e.isEnd && !e.params.loop && !e.params.rewind) &&
        (e.slideNext(), a('navigationNext'));
  }
  function o() {
    const g = e.params.navigation;
    if (
      ((e.params.navigation = Re(
        e,
        e.originalParams.navigation,
        e.params.navigation,
        { nextEl: 'swiper-button-next', prevEl: 'swiper-button-prev' },
      )),
      !(g.nextEl || g.prevEl))
    )
      return;
    let h = r(g.nextEl),
      w = r(g.prevEl);
    Object.assign(e.navigation, { nextEl: h, prevEl: w }),
      (h = X(h)),
      (w = X(w));
    const y = (v, p) => {
      v && v.addEventListener('click', p === 'next' ? u : n),
        !e.enabled && v && v.classList.add(...g.lockClass.split(' '));
    };
    h.forEach((v) => y(v, 'next')), w.forEach((v) => y(v, 'prev'));
  }
  function l() {
    let { nextEl: g, prevEl: h } = e.navigation;
    (g = X(g)), (h = X(h));
    const w = (y, v) => {
      y.removeEventListener('click', v === 'next' ? u : n),
        y.classList.remove(...e.params.navigation.disabledClass.split(' '));
    };
    g.forEach((y) => w(y, 'next')), h.forEach((y) => w(y, 'prev'));
  }
  i('init', () => {
    e.params.navigation.enabled === !1 ? m() : (o(), c());
  }),
    i('toEdge fromEdge lock unlock', () => {
      c();
    }),
    i('destroy', () => {
      l();
    }),
    i('enable disable', () => {
      let { nextEl: g, prevEl: h } = e.navigation;
      if (((g = X(g)), (h = X(h)), e.enabled)) {
        c();
        return;
      }
      [...g, ...h]
        .filter((w) => !!w)
        .forEach((w) => w.classList.add(e.params.navigation.lockClass));
    }),
    i('click', (g, h) => {
      let { nextEl: w, prevEl: y } = e.navigation;
      (w = X(w)), (y = X(y));
      const v = h.target;
      let p = y.includes(v) || w.includes(v);
      if (e.isElement && !p) {
        const b = h.path || (h.composedPath && h.composedPath());
        b && (p = b.find((E) => w.includes(E) || y.includes(E)));
      }
      if (e.params.navigation.hideOnClick && !p) {
        if (
          e.pagination &&
          e.params.pagination &&
          e.params.pagination.clickable &&
          (e.pagination.el === v || e.pagination.el.contains(v))
        )
          return;
        let b;
        w.length
          ? (b = w[0].classList.contains(e.params.navigation.hiddenClass))
          : y.length &&
            (b = y[0].classList.contains(e.params.navigation.hiddenClass)),
          a(b === !0 ? 'navigationShow' : 'navigationHide'),
          [...w, ...y]
            .filter((E) => !!E)
            .forEach((E) =>
              E.classList.toggle(e.params.navigation.hiddenClass),
            );
      }
    });
  const d = () => {
      e.el.classList.remove(
        ...e.params.navigation.navigationDisabledClass.split(' '),
      ),
        o(),
        c();
    },
    m = () => {
      e.el.classList.add(
        ...e.params.navigation.navigationDisabledClass.split(' '),
      ),
        l();
    };
  Object.assign(e.navigation, {
    enable: d,
    disable: m,
    update: c,
    init: o,
    destroy: l,
  });
}
function J(s) {
  return (
    s === void 0 && (s = ''),
    `.${s
      .trim()
      .replace(/([\.:!+\/])/g, '\\$1')
      .replace(/ /g, '.')}`
  );
}
function Xe(s) {
  let { swiper: e, extendParams: t, on: i, emit: a } = s;
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
      formatFractionCurrent: (v) => v,
      formatFractionTotal: (v) => v,
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
  let f,
    c = 0;
  function n() {
    return (
      !e.params.pagination.el ||
      !e.pagination.el ||
      (Array.isArray(e.pagination.el) && e.pagination.el.length === 0)
    );
  }
  function u(v, p) {
    const { bulletActiveClass: b } = e.params.pagination;
    v &&
      ((v = v[`${p === 'prev' ? 'previous' : 'next'}ElementSibling`]),
      v &&
        (v.classList.add(`${b}-${p}`),
        (v = v[`${p === 'prev' ? 'previous' : 'next'}ElementSibling`]),
        v && v.classList.add(`${b}-${p}-${p}`)));
  }
  function o(v, p, b) {
    if (((v = v % b), (p = p % b), p === v + 1)) return 'next';
    if (p === v - 1) return 'previous';
  }
  function l(v) {
    const p = v.target.closest(J(e.params.pagination.bulletClass));
    if (!p) return;
    v.preventDefault();
    const b = me(p) * e.params.slidesPerGroup;
    if (e.params.loop) {
      if (e.realIndex === b) return;
      const E = o(e.realIndex, b, e.slides.length);
      E === 'next'
        ? e.slideNext()
        : E === 'previous'
        ? e.slidePrev()
        : e.slideToLoop(b);
    } else e.slideTo(b);
  }
  function d() {
    const v = e.rtl,
      p = e.params.pagination;
    if (n()) return;
    let b = e.pagination.el;
    b = X(b);
    let E, z;
    const D =
        e.virtual && e.params.virtual.enabled
          ? e.virtual.slides.length
          : e.slides.length,
      A = e.params.loop
        ? Math.ceil(D / e.params.slidesPerGroup)
        : e.snapGrid.length;
    if (
      (e.params.loop
        ? ((z = e.previousRealIndex || 0),
          (E =
            e.params.slidesPerGroup > 1
              ? Math.floor(e.realIndex / e.params.slidesPerGroup)
              : e.realIndex))
        : typeof e.snapIndex < 'u'
        ? ((E = e.snapIndex), (z = e.previousSnapIndex))
        : ((z = e.previousIndex || 0), (E = e.activeIndex || 0)),
      p.type === 'bullets' &&
        e.pagination.bullets &&
        e.pagination.bullets.length > 0)
    ) {
      const M = e.pagination.bullets;
      let P, I, C;
      if (
        (p.dynamicBullets &&
          ((f = Ge(M[0], e.isHorizontal() ? 'width' : 'height', !0)),
          b.forEach((S) => {
            S.style[e.isHorizontal() ? 'width' : 'height'] = `${
              f * (p.dynamicMainBullets + 4)
            }px`;
          }),
          p.dynamicMainBullets > 1 &&
            z !== void 0 &&
            ((c += E - (z || 0)),
            c > p.dynamicMainBullets - 1
              ? (c = p.dynamicMainBullets - 1)
              : c < 0 && (c = 0)),
          (P = Math.max(E - c, 0)),
          (I = P + (Math.min(M.length, p.dynamicMainBullets) - 1)),
          (C = (I + P) / 2)),
        M.forEach((S) => {
          const x = [
            ...['', '-next', '-next-next', '-prev', '-prev-prev', '-main'].map(
              ($) => `${p.bulletActiveClass}${$}`,
            ),
          ]
            .map(($) =>
              typeof $ == 'string' && $.includes(' ') ? $.split(' ') : $,
            )
            .flat();
          S.classList.remove(...x);
        }),
        b.length > 1)
      )
        M.forEach((S) => {
          const x = me(S);
          x === E
            ? S.classList.add(...p.bulletActiveClass.split(' '))
            : e.isElement && S.setAttribute('part', 'bullet'),
            p.dynamicBullets &&
              (x >= P &&
                x <= I &&
                S.classList.add(...`${p.bulletActiveClass}-main`.split(' ')),
              x === P && u(S, 'prev'),
              x === I && u(S, 'next'));
        });
      else {
        const S = M[E];
        if (
          (S && S.classList.add(...p.bulletActiveClass.split(' ')),
          e.isElement &&
            M.forEach((x, $) => {
              x.setAttribute('part', $ === E ? 'bullet-active' : 'bullet');
            }),
          p.dynamicBullets)
        ) {
          const x = M[P],
            $ = M[I];
          for (let H = P; H <= I; H += 1)
            M[H] &&
              M[H].classList.add(...`${p.bulletActiveClass}-main`.split(' '));
          u(x, 'prev'), u($, 'next');
        }
      }
      if (p.dynamicBullets) {
        const S = Math.min(M.length, p.dynamicMainBullets + 4),
          x = (f * S - f) / 2 - C * f,
          $ = v ? 'right' : 'left';
        M.forEach((H) => {
          H.style[e.isHorizontal() ? $ : 'top'] = `${x}px`;
        });
      }
    }
    b.forEach((M, P) => {
      if (
        (p.type === 'fraction' &&
          (M.querySelectorAll(J(p.currentClass)).forEach((I) => {
            I.textContent = p.formatFractionCurrent(E + 1);
          }),
          M.querySelectorAll(J(p.totalClass)).forEach((I) => {
            I.textContent = p.formatFractionTotal(A);
          })),
        p.type === 'progressbar')
      ) {
        let I;
        p.progressbarOpposite
          ? (I = e.isHorizontal() ? 'vertical' : 'horizontal')
          : (I = e.isHorizontal() ? 'horizontal' : 'vertical');
        const C = (E + 1) / A;
        let S = 1,
          x = 1;
        I === 'horizontal' ? (S = C) : (x = C),
          M.querySelectorAll(J(p.progressbarFillClass)).forEach(($) => {
            ($.style.transform = `translate3d(0,0,0) scaleX(${S}) scaleY(${x})`),
              ($.style.transitionDuration = `${e.params.speed}ms`);
          });
      }
      p.type === 'custom' && p.renderCustom
        ? ((M.innerHTML = p.renderCustom(e, E + 1, A)),
          P === 0 && a('paginationRender', M))
        : (P === 0 && a('paginationRender', M), a('paginationUpdate', M)),
        e.params.watchOverflow &&
          e.enabled &&
          M.classList[e.isLocked ? 'add' : 'remove'](p.lockClass);
    });
  }
  function m() {
    const v = e.params.pagination;
    if (n()) return;
    const p =
      e.virtual && e.params.virtual.enabled
        ? e.virtual.slides.length
        : e.grid && e.params.grid.rows > 1
        ? e.slides.length / Math.ceil(e.params.grid.rows)
        : e.slides.length;
    let b = e.pagination.el;
    b = X(b);
    let E = '';
    if (v.type === 'bullets') {
      let z = e.params.loop
        ? Math.ceil(p / e.params.slidesPerGroup)
        : e.snapGrid.length;
      e.params.freeMode && e.params.freeMode.enabled && z > p && (z = p);
      for (let D = 0; D < z; D += 1)
        v.renderBullet
          ? (E += v.renderBullet.call(e, D, v.bulletClass))
          : (E += `<${v.bulletElement} ${
              e.isElement ? 'part="bullet"' : ''
            } class="${v.bulletClass}"></${v.bulletElement}>`);
    }
    v.type === 'fraction' &&
      (v.renderFraction
        ? (E = v.renderFraction.call(e, v.currentClass, v.totalClass))
        : (E = `<span class="${v.currentClass}"></span> / <span class="${v.totalClass}"></span>`)),
      v.type === 'progressbar' &&
        (v.renderProgressbar
          ? (E = v.renderProgressbar.call(e, v.progressbarFillClass))
          : (E = `<span class="${v.progressbarFillClass}"></span>`)),
      (e.pagination.bullets = []),
      b.forEach((z) => {
        v.type !== 'custom' && (z.innerHTML = E || ''),
          v.type === 'bullets' &&
            e.pagination.bullets.push(...z.querySelectorAll(J(v.bulletClass)));
      }),
      v.type !== 'custom' && a('paginationRender', b[0]);
  }
  function g() {
    e.params.pagination = Re(
      e,
      e.originalParams.pagination,
      e.params.pagination,
      { el: 'swiper-pagination' },
    );
    const v = e.params.pagination;
    if (!v.el) return;
    let p;
    typeof v.el == 'string' && e.isElement && (p = e.el.querySelector(v.el)),
      !p &&
        typeof v.el == 'string' &&
        (p = [...document.querySelectorAll(v.el)]),
      p || (p = v.el),
      !(!p || p.length === 0) &&
        (e.params.uniqueNavElements &&
          typeof v.el == 'string' &&
          Array.isArray(p) &&
          p.length > 1 &&
          ((p = [...e.el.querySelectorAll(v.el)]),
          p.length > 1 &&
            (p = p.filter((b) => ie(b, '.swiper')[0] === e.el)[0])),
        Array.isArray(p) && p.length === 1 && (p = p[0]),
        Object.assign(e.pagination, { el: p }),
        (p = X(p)),
        p.forEach((b) => {
          v.type === 'bullets' &&
            v.clickable &&
            b.classList.add(...(v.clickableClass || '').split(' ')),
            b.classList.add(v.modifierClass + v.type),
            b.classList.add(
              e.isHorizontal() ? v.horizontalClass : v.verticalClass,
            ),
            v.type === 'bullets' &&
              v.dynamicBullets &&
              (b.classList.add(`${v.modifierClass}${v.type}-dynamic`),
              (c = 0),
              v.dynamicMainBullets < 1 && (v.dynamicMainBullets = 1)),
            v.type === 'progressbar' &&
              v.progressbarOpposite &&
              b.classList.add(v.progressbarOppositeClass),
            v.clickable && b.addEventListener('click', l),
            e.enabled || b.classList.add(v.lockClass);
        }));
  }
  function h() {
    const v = e.params.pagination;
    if (n()) return;
    let p = e.pagination.el;
    p &&
      ((p = X(p)),
      p.forEach((b) => {
        b.classList.remove(v.hiddenClass),
          b.classList.remove(v.modifierClass + v.type),
          b.classList.remove(
            e.isHorizontal() ? v.horizontalClass : v.verticalClass,
          ),
          v.clickable &&
            (b.classList.remove(...(v.clickableClass || '').split(' ')),
            b.removeEventListener('click', l));
      })),
      e.pagination.bullets &&
        e.pagination.bullets.forEach((b) =>
          b.classList.remove(...v.bulletActiveClass.split(' ')),
        );
  }
  i('changeDirection', () => {
    if (!e.pagination || !e.pagination.el) return;
    const v = e.params.pagination;
    let { el: p } = e.pagination;
    (p = X(p)),
      p.forEach((b) => {
        b.classList.remove(v.horizontalClass, v.verticalClass),
          b.classList.add(
            e.isHorizontal() ? v.horizontalClass : v.verticalClass,
          );
      });
  }),
    i('init', () => {
      e.params.pagination.enabled === !1 ? y() : (g(), m(), d());
    }),
    i('activeIndexChange', () => {
      typeof e.snapIndex > 'u' && d();
    }),
    i('snapIndexChange', () => {
      d();
    }),
    i('snapGridLengthChange', () => {
      m(), d();
    }),
    i('destroy', () => {
      h();
    }),
    i('enable disable', () => {
      let { el: v } = e.pagination;
      v &&
        ((v = X(v)),
        v.forEach((p) =>
          p.classList[e.enabled ? 'remove' : 'add'](
            e.params.pagination.lockClass,
          ),
        ));
    }),
    i('lock unlock', () => {
      d();
    }),
    i('click', (v, p) => {
      const b = p.target,
        E = X(e.pagination.el);
      if (
        e.params.pagination.el &&
        e.params.pagination.hideOnClick &&
        E &&
        E.length > 0 &&
        !b.classList.contains(e.params.pagination.bulletClass)
      ) {
        if (
          e.navigation &&
          ((e.navigation.nextEl && b === e.navigation.nextEl) ||
            (e.navigation.prevEl && b === e.navigation.prevEl))
        )
          return;
        const z = E[0].classList.contains(e.params.pagination.hiddenClass);
        a(z === !0 ? 'paginationShow' : 'paginationHide'),
          E.forEach((D) => D.classList.toggle(e.params.pagination.hiddenClass));
      }
    });
  const w = () => {
      e.el.classList.remove(e.params.pagination.paginationDisabledClass);
      let { el: v } = e.pagination;
      v &&
        ((v = X(v)),
        v.forEach((p) =>
          p.classList.remove(e.params.pagination.paginationDisabledClass),
        )),
        g(),
        m(),
        d();
    },
    y = () => {
      e.el.classList.add(e.params.pagination.paginationDisabledClass);
      let { el: v } = e.pagination;
      v &&
        ((v = X(v)),
        v.forEach((p) =>
          p.classList.add(e.params.pagination.paginationDisabledClass),
        )),
        h();
    };
  Object.assign(e.pagination, {
    enable: w,
    disable: y,
    render: m,
    update: d,
    init: g,
    destroy: h,
  });
}
function Ye(s) {
  let { swiper: e, extendParams: t, on: i, emit: a } = s;
  const r = q();
  let f = !1,
    c = null,
    n = null,
    u,
    o,
    l,
    d;
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
    const { scrollbar: C, rtlTranslate: S } = e,
      { dragEl: x, el: $ } = C,
      H = e.params.scrollbar,
      T = e.params.loop ? e.progressLoop : e.progress;
    let L = o,
      G = (l - o) * T;
    S
      ? ((G = -G), G > 0 ? ((L = o - G), (G = 0)) : -G + o > l && (L = l + G))
      : G < 0
      ? ((L = o + G), (G = 0))
      : G + o > l && (L = l - G),
      e.isHorizontal()
        ? ((x.style.transform = `translate3d(${G}px, 0, 0)`),
          (x.style.width = `${L}px`))
        : ((x.style.transform = `translate3d(0px, ${G}px, 0)`),
          (x.style.height = `${L}px`)),
      H.hide &&
        (clearTimeout(c),
        ($.style.opacity = 1),
        (c = setTimeout(() => {
          ($.style.opacity = 0), ($.style.transitionDuration = '400ms');
        }, 1e3)));
  }
  function g(C) {
    !e.params.scrollbar.el ||
      !e.scrollbar.el ||
      (e.scrollbar.dragEl.style.transitionDuration = `${C}ms`);
  }
  function h() {
    if (!e.params.scrollbar.el || !e.scrollbar.el) return;
    const { scrollbar: C } = e,
      { dragEl: S, el: x } = C;
    (S.style.width = ''),
      (S.style.height = ''),
      (l = e.isHorizontal() ? x.offsetWidth : x.offsetHeight),
      (d =
        e.size /
        (e.virtualSize +
          e.params.slidesOffsetBefore -
          (e.params.centeredSlides ? e.snapGrid[0] : 0))),
      e.params.scrollbar.dragSize === 'auto'
        ? (o = l * d)
        : (o = parseInt(e.params.scrollbar.dragSize, 10)),
      e.isHorizontal()
        ? (S.style.width = `${o}px`)
        : (S.style.height = `${o}px`),
      d >= 1 ? (x.style.display = 'none') : (x.style.display = ''),
      e.params.scrollbar.hide && (x.style.opacity = 0),
      e.params.watchOverflow &&
        e.enabled &&
        C.el.classList[e.isLocked ? 'add' : 'remove'](
          e.params.scrollbar.lockClass,
        );
  }
  function w(C) {
    return e.isHorizontal() ? C.clientX : C.clientY;
  }
  function y(C) {
    const { scrollbar: S, rtlTranslate: x } = e,
      { el: $ } = S;
    let H;
    (H =
      (w(C) -
        Se($)[e.isHorizontal() ? 'left' : 'top'] -
        (u !== null ? u : o / 2)) /
      (l - o)),
      (H = Math.max(Math.min(H, 1), 0)),
      x && (H = 1 - H);
    const T = e.minTranslate() + (e.maxTranslate() - e.minTranslate()) * H;
    e.updateProgress(T),
      e.setTranslate(T),
      e.updateActiveIndex(),
      e.updateSlidesClasses();
  }
  function v(C) {
    const S = e.params.scrollbar,
      { scrollbar: x, wrapperEl: $ } = e,
      { el: H, dragEl: T } = x;
    (f = !0),
      (u =
        C.target === T
          ? w(C) -
            C.target.getBoundingClientRect()[e.isHorizontal() ? 'left' : 'top']
          : null),
      C.preventDefault(),
      C.stopPropagation(),
      ($.style.transitionDuration = '100ms'),
      (T.style.transitionDuration = '100ms'),
      y(C),
      clearTimeout(n),
      (H.style.transitionDuration = '0ms'),
      S.hide && (H.style.opacity = 1),
      e.params.cssMode && (e.wrapperEl.style['scroll-snap-type'] = 'none'),
      a('scrollbarDragStart', C);
  }
  function p(C) {
    const { scrollbar: S, wrapperEl: x } = e,
      { el: $, dragEl: H } = S;
    f &&
      (C.preventDefault && C.cancelable
        ? C.preventDefault()
        : (C.returnValue = !1),
      y(C),
      (x.style.transitionDuration = '0ms'),
      ($.style.transitionDuration = '0ms'),
      (H.style.transitionDuration = '0ms'),
      a('scrollbarDragMove', C));
  }
  function b(C) {
    const S = e.params.scrollbar,
      { scrollbar: x, wrapperEl: $ } = e,
      { el: H } = x;
    f &&
      ((f = !1),
      e.params.cssMode &&
        ((e.wrapperEl.style['scroll-snap-type'] = ''),
        ($.style.transitionDuration = '')),
      S.hide &&
        (clearTimeout(n),
        (n = re(() => {
          (H.style.opacity = 0), (H.style.transitionDuration = '400ms');
        }, 1e3))),
      a('scrollbarDragEnd', C),
      S.snapOnRelease && e.slideToClosest());
  }
  function E(C) {
    const { scrollbar: S, params: x } = e,
      $ = S.el;
    if (!$) return;
    const H = $,
      T = x.passiveListeners ? { passive: !1, capture: !1 } : !1,
      L = x.passiveListeners ? { passive: !0, capture: !1 } : !1;
    if (!H) return;
    const G = C === 'on' ? 'addEventListener' : 'removeEventListener';
    H[G]('pointerdown', v, T),
      r[G]('pointermove', p, T),
      r[G]('pointerup', b, L);
  }
  function z() {
    !e.params.scrollbar.el || !e.scrollbar.el || E('on');
  }
  function D() {
    !e.params.scrollbar.el || !e.scrollbar.el || E('off');
  }
  function A() {
    const { scrollbar: C, el: S } = e;
    e.params.scrollbar = Re(e, e.originalParams.scrollbar, e.params.scrollbar, {
      el: 'swiper-scrollbar',
    });
    const x = e.params.scrollbar;
    if (!x.el) return;
    let $;
    if (
      (typeof x.el == 'string' && e.isElement && ($ = e.el.querySelector(x.el)),
      !$ && typeof x.el == 'string')
    ) {
      if ((($ = r.querySelectorAll(x.el)), !$.length)) return;
    } else $ || ($ = x.el);
    e.params.uniqueNavElements &&
      typeof x.el == 'string' &&
      $.length > 1 &&
      S.querySelectorAll(x.el).length === 1 &&
      ($ = S.querySelector(x.el)),
      $.length > 0 && ($ = $[0]),
      $.classList.add(e.isHorizontal() ? x.horizontalClass : x.verticalClass);
    let H;
    $ &&
      ((H = $.querySelector(J(e.params.scrollbar.dragClass))),
      H || ((H = K('div', e.params.scrollbar.dragClass)), $.append(H))),
      Object.assign(C, { el: $, dragEl: H }),
      x.draggable && z(),
      $ &&
        $.classList[e.enabled ? 'remove' : 'add'](
          ...ee(e.params.scrollbar.lockClass),
        );
  }
  function M() {
    const C = e.params.scrollbar,
      S = e.scrollbar.el;
    S &&
      S.classList.remove(
        ...ee(e.isHorizontal() ? C.horizontalClass : C.verticalClass),
      ),
      D();
  }
  i('changeDirection', () => {
    if (!e.scrollbar || !e.scrollbar.el) return;
    const C = e.params.scrollbar;
    let { el: S } = e.scrollbar;
    (S = X(S)),
      S.forEach((x) => {
        x.classList.remove(C.horizontalClass, C.verticalClass),
          x.classList.add(
            e.isHorizontal() ? C.horizontalClass : C.verticalClass,
          );
      });
  }),
    i('init', () => {
      e.params.scrollbar.enabled === !1 ? I() : (A(), h(), m());
    }),
    i('update resize observerUpdate lock unlock changeDirection', () => {
      h();
    }),
    i('setTranslate', () => {
      m();
    }),
    i('setTransition', (C, S) => {
      g(S);
    }),
    i('enable disable', () => {
      const { el: C } = e.scrollbar;
      C &&
        C.classList[e.enabled ? 'remove' : 'add'](
          ...ee(e.params.scrollbar.lockClass),
        );
    }),
    i('destroy', () => {
      M();
    });
  const P = () => {
      e.el.classList.remove(...ee(e.params.scrollbar.scrollbarDisabledClass)),
        e.scrollbar.el &&
          e.scrollbar.el.classList.remove(
            ...ee(e.params.scrollbar.scrollbarDisabledClass),
          ),
        A(),
        h(),
        m();
    },
    I = () => {
      e.el.classList.add(...ee(e.params.scrollbar.scrollbarDisabledClass)),
        e.scrollbar.el &&
          e.scrollbar.el.classList.add(
            ...ee(e.params.scrollbar.scrollbarDisabledClass),
          ),
        M();
    };
  Object.assign(e.scrollbar, {
    enable: P,
    disable: I,
    updateSize: h,
    setTranslate: m,
    init: A,
    destroy: M,
  });
}
function Cs(s) {
  let { swiper: e, extendParams: t, on: i } = s;
  t({ parallax: { enabled: !1 } });
  const a =
      '[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]',
    r = (n, u) => {
      const { rtl: o } = e,
        l = o ? -1 : 1,
        d = n.getAttribute('data-swiper-parallax') || '0';
      let m = n.getAttribute('data-swiper-parallax-x'),
        g = n.getAttribute('data-swiper-parallax-y');
      const h = n.getAttribute('data-swiper-parallax-scale'),
        w = n.getAttribute('data-swiper-parallax-opacity'),
        y = n.getAttribute('data-swiper-parallax-rotate');
      if (
        (m || g
          ? ((m = m || '0'), (g = g || '0'))
          : e.isHorizontal()
          ? ((m = d), (g = '0'))
          : ((g = d), (m = '0')),
        m.indexOf('%') >= 0
          ? (m = `${parseInt(m, 10) * u * l}%`)
          : (m = `${m * u * l}px`),
        g.indexOf('%') >= 0
          ? (g = `${parseInt(g, 10) * u}%`)
          : (g = `${g * u}px`),
        typeof w < 'u' && w !== null)
      ) {
        const p = w - (w - 1) * (1 - Math.abs(u));
        n.style.opacity = p;
      }
      let v = `translate3d(${m}, ${g}, 0px)`;
      if (typeof h < 'u' && h !== null) {
        const p = h - (h - 1) * (1 - Math.abs(u));
        v += ` scale(${p})`;
      }
      if (y && typeof y < 'u' && y !== null) {
        const p = y * u * -1;
        v += ` rotate(${p}deg)`;
      }
      n.style.transform = v;
    },
    f = () => {
      const { el: n, slides: u, progress: o, snapGrid: l, isElement: d } = e,
        m = W(n, a);
      e.isElement && m.push(...W(e.hostEl, a)),
        m.forEach((g) => {
          r(g, o);
        }),
        u.forEach((g, h) => {
          let w = g.progress;
          e.params.slidesPerGroup > 1 &&
            e.params.slidesPerView !== 'auto' &&
            (w += Math.ceil(h / 2) - o * (l.length - 1)),
            (w = Math.min(Math.max(w, -1), 1)),
            g
              .querySelectorAll(`${a}, [data-swiper-parallax-rotate]`)
              .forEach((y) => {
                r(y, w);
              });
        });
    },
    c = function (n) {
      n === void 0 && (n = e.params.speed);
      const { el: u, hostEl: o } = e,
        l = [...u.querySelectorAll(a)];
      e.isElement && l.push(...o.querySelectorAll(a)),
        l.forEach((d) => {
          let m =
            parseInt(d.getAttribute('data-swiper-parallax-duration'), 10) || n;
          n === 0 && (m = 0), (d.style.transitionDuration = `${m}ms`);
        });
    };
  i('beforeInit', () => {
    e.params.parallax.enabled &&
      ((e.params.watchSlidesProgress = !0),
      (e.originalParams.watchSlidesProgress = !0));
  }),
    i('init', () => {
      e.params.parallax.enabled && f();
    }),
    i('setTranslate', () => {
      e.params.parallax.enabled && f();
    }),
    i('setTransition', (n, u) => {
      e.params.parallax.enabled && c(u);
    });
}
function Ps(s) {
  let { swiper: e, extendParams: t, on: i, emit: a } = s;
  const r = F();
  t({
    zoom: {
      enabled: !1,
      limitToOriginalSize: !1,
      maxRatio: 3,
      minRatio: 1,
      toggle: !0,
      containerClass: 'swiper-zoom-container',
      zoomedSlideClass: 'swiper-slide-zoomed',
    },
  }),
    (e.zoom = { enabled: !1 });
  let f = 1,
    c = !1,
    n,
    u;
  const o = [],
    l = {
      originX: 0,
      originY: 0,
      slideEl: void 0,
      slideWidth: void 0,
      slideHeight: void 0,
      imageEl: void 0,
      imageWrapEl: void 0,
      maxRatio: 3,
    },
    d = {
      isTouched: void 0,
      isMoved: void 0,
      currentX: void 0,
      currentY: void 0,
      minX: void 0,
      minY: void 0,
      maxX: void 0,
      maxY: void 0,
      width: void 0,
      height: void 0,
      startX: void 0,
      startY: void 0,
      touchesStart: {},
      touchesCurrent: {},
    },
    m = {
      x: void 0,
      y: void 0,
      prevPositionX: void 0,
      prevPositionY: void 0,
      prevTime: void 0,
    };
  let g = 1;
  Object.defineProperty(e.zoom, 'scale', {
    get() {
      return g;
    },
    set(O) {
      if (g !== O) {
        const k = l.imageEl,
          B = l.slideEl;
        a('zoomChange', O, k, B);
      }
      g = O;
    },
  });
  function h() {
    if (o.length < 2) return 1;
    const O = o[0].pageX,
      k = o[0].pageY,
      B = o[1].pageX,
      N = o[1].pageY;
    return Math.sqrt((B - O) ** 2 + (N - k) ** 2);
  }
  function w() {
    const O = e.params.zoom,
      k = l.imageWrapEl.getAttribute('data-swiper-zoom') || O.maxRatio;
    if (O.limitToOriginalSize && l.imageEl && l.imageEl.naturalWidth) {
      const B = l.imageEl.naturalWidth / l.imageEl.offsetWidth;
      return Math.min(B, k);
    }
    return k;
  }
  function y() {
    if (o.length < 2) return { x: null, y: null };
    const O = l.imageEl.getBoundingClientRect();
    return [
      (o[0].pageX + (o[1].pageX - o[0].pageX) / 2 - O.x - r.scrollX) / f,
      (o[0].pageY + (o[1].pageY - o[0].pageY) / 2 - O.y - r.scrollY) / f,
    ];
  }
  function v() {
    return e.isElement ? 'swiper-slide' : `.${e.params.slideClass}`;
  }
  function p(O) {
    const k = v();
    return !!(
      O.target.matches(k) ||
      e.slides.filter((B) => B.contains(O.target)).length > 0
    );
  }
  function b(O) {
    const k = `.${e.params.zoom.containerClass}`;
    return !!(
      O.target.matches(k) ||
      [...e.hostEl.querySelectorAll(k)].filter((B) => B.contains(O.target))
        .length > 0
    );
  }
  function E(O) {
    if ((O.pointerType === 'mouse' && o.splice(0, o.length), !p(O))) return;
    const k = e.params.zoom;
    if (((n = !1), (u = !1), o.push(O), !(o.length < 2))) {
      if (((n = !0), (l.scaleStart = h()), !l.slideEl)) {
        (l.slideEl = O.target.closest(`.${e.params.slideClass}, swiper-slide`)),
          l.slideEl || (l.slideEl = e.slides[e.activeIndex]);
        let B = l.slideEl.querySelector(`.${k.containerClass}`);
        if (
          (B &&
            (B = B.querySelectorAll(
              'picture, img, svg, canvas, .swiper-zoom-target',
            )[0]),
          (l.imageEl = B),
          B
            ? (l.imageWrapEl = ie(l.imageEl, `.${k.containerClass}`)[0])
            : (l.imageWrapEl = void 0),
          !l.imageWrapEl)
        ) {
          l.imageEl = void 0;
          return;
        }
        l.maxRatio = w();
      }
      if (l.imageEl) {
        const [B, N] = y();
        (l.originX = B),
          (l.originY = N),
          (l.imageEl.style.transitionDuration = '0ms');
      }
      c = !0;
    }
  }
  function z(O) {
    if (!p(O)) return;
    const k = e.params.zoom,
      B = e.zoom,
      N = o.findIndex((R) => R.pointerId === O.pointerId);
    N >= 0 && (o[N] = O),
      !(o.length < 2) &&
        ((u = !0),
        (l.scaleMove = h()),
        l.imageEl &&
          ((B.scale = (l.scaleMove / l.scaleStart) * f),
          B.scale > l.maxRatio &&
            (B.scale = l.maxRatio - 1 + (B.scale - l.maxRatio + 1) ** 0.5),
          B.scale < k.minRatio &&
            (B.scale = k.minRatio + 1 - (k.minRatio - B.scale + 1) ** 0.5),
          (l.imageEl.style.transform = `translate3d(0,0,0) scale(${B.scale})`)));
  }
  function D(O) {
    if (!p(O) || (O.pointerType === 'mouse' && O.type === 'pointerout')) return;
    const k = e.params.zoom,
      B = e.zoom,
      N = o.findIndex((R) => R.pointerId === O.pointerId);
    N >= 0 && o.splice(N, 1),
      !(!n || !u) &&
        ((n = !1),
        (u = !1),
        l.imageEl &&
          ((B.scale = Math.max(Math.min(B.scale, l.maxRatio), k.minRatio)),
          (l.imageEl.style.transitionDuration = `${e.params.speed}ms`),
          (l.imageEl.style.transform = `translate3d(0,0,0) scale(${B.scale})`),
          (f = B.scale),
          (c = !1),
          B.scale > 1 && l.slideEl
            ? l.slideEl.classList.add(`${k.zoomedSlideClass}`)
            : B.scale <= 1 &&
              l.slideEl &&
              l.slideEl.classList.remove(`${k.zoomedSlideClass}`),
          B.scale === 1 &&
            ((l.originX = 0), (l.originY = 0), (l.slideEl = void 0))));
  }
  let A;
  function M() {
    e.touchEventsData.preventTouchMoveFromPointerMove = !1;
  }
  function P() {
    clearTimeout(A),
      (e.touchEventsData.preventTouchMoveFromPointerMove = !0),
      (A = setTimeout(() => {
        e.destroyed || M();
      }));
  }
  function I(O) {
    const k = e.device;
    if (!l.imageEl || d.isTouched) return;
    k.android && O.cancelable && O.preventDefault(), (d.isTouched = !0);
    const B = o.length > 0 ? o[0] : O;
    (d.touchesStart.x = B.pageX), (d.touchesStart.y = B.pageY);
  }
  function C(O) {
    if (!p(O) || !b(O)) return;
    const k = e.zoom;
    if (!l.imageEl || !d.isTouched || !l.slideEl) return;
    d.isMoved ||
      ((d.width = l.imageEl.offsetWidth || l.imageEl.clientWidth),
      (d.height = l.imageEl.offsetHeight || l.imageEl.clientHeight),
      (d.startX = ke(l.imageWrapEl, 'x') || 0),
      (d.startY = ke(l.imageWrapEl, 'y') || 0),
      (l.slideWidth = l.slideEl.offsetWidth),
      (l.slideHeight = l.slideEl.offsetHeight),
      (l.imageWrapEl.style.transitionDuration = '0ms'));
    const B = d.width * k.scale,
      N = d.height * k.scale;
    if (
      ((d.minX = Math.min(l.slideWidth / 2 - B / 2, 0)),
      (d.maxX = -d.minX),
      (d.minY = Math.min(l.slideHeight / 2 - N / 2, 0)),
      (d.maxY = -d.minY),
      (d.touchesCurrent.x = o.length > 0 ? o[0].pageX : O.pageX),
      (d.touchesCurrent.y = o.length > 0 ? o[0].pageY : O.pageY),
      Math.max(
        Math.abs(d.touchesCurrent.x - d.touchesStart.x),
        Math.abs(d.touchesCurrent.y - d.touchesStart.y),
      ) > 5 && (e.allowClick = !1),
      !d.isMoved && !c)
    ) {
      if (
        e.isHorizontal() &&
        ((Math.floor(d.minX) === Math.floor(d.startX) &&
          d.touchesCurrent.x < d.touchesStart.x) ||
          (Math.floor(d.maxX) === Math.floor(d.startX) &&
            d.touchesCurrent.x > d.touchesStart.x))
      ) {
        (d.isTouched = !1), M();
        return;
      }
      if (
        !e.isHorizontal() &&
        ((Math.floor(d.minY) === Math.floor(d.startY) &&
          d.touchesCurrent.y < d.touchesStart.y) ||
          (Math.floor(d.maxY) === Math.floor(d.startY) &&
            d.touchesCurrent.y > d.touchesStart.y))
      ) {
        (d.isTouched = !1), M();
        return;
      }
    }
    O.cancelable && O.preventDefault(),
      O.stopPropagation(),
      P(),
      (d.isMoved = !0);
    const Y = (k.scale - f) / (l.maxRatio - e.params.zoom.minRatio),
      { originX: _, originY: ne } = l;
    (d.currentX =
      d.touchesCurrent.x - d.touchesStart.x + d.startX + Y * (d.width - _ * 2)),
      (d.currentY =
        d.touchesCurrent.y -
        d.touchesStart.y +
        d.startY +
        Y * (d.height - ne * 2)),
      d.currentX < d.minX &&
        (d.currentX = d.minX + 1 - (d.minX - d.currentX + 1) ** 0.8),
      d.currentX > d.maxX &&
        (d.currentX = d.maxX - 1 + (d.currentX - d.maxX + 1) ** 0.8),
      d.currentY < d.minY &&
        (d.currentY = d.minY + 1 - (d.minY - d.currentY + 1) ** 0.8),
      d.currentY > d.maxY &&
        (d.currentY = d.maxY - 1 + (d.currentY - d.maxY + 1) ** 0.8),
      m.prevPositionX || (m.prevPositionX = d.touchesCurrent.x),
      m.prevPositionY || (m.prevPositionY = d.touchesCurrent.y),
      m.prevTime || (m.prevTime = Date.now()),
      (m.x =
        (d.touchesCurrent.x - m.prevPositionX) / (Date.now() - m.prevTime) / 2),
      (m.y =
        (d.touchesCurrent.y - m.prevPositionY) / (Date.now() - m.prevTime) / 2),
      Math.abs(d.touchesCurrent.x - m.prevPositionX) < 2 && (m.x = 0),
      Math.abs(d.touchesCurrent.y - m.prevPositionY) < 2 && (m.y = 0),
      (m.prevPositionX = d.touchesCurrent.x),
      (m.prevPositionY = d.touchesCurrent.y),
      (m.prevTime = Date.now()),
      (l.imageWrapEl.style.transform = `translate3d(${d.currentX}px, ${d.currentY}px,0)`);
  }
  function S() {
    const O = e.zoom;
    if (!l.imageEl) return;
    if (!d.isTouched || !d.isMoved) {
      (d.isTouched = !1), (d.isMoved = !1);
      return;
    }
    (d.isTouched = !1), (d.isMoved = !1);
    let k = 300,
      B = 300;
    const N = m.x * k,
      R = d.currentX + N,
      Y = m.y * B,
      _ = d.currentY + Y;
    m.x !== 0 && (k = Math.abs((R - d.currentX) / m.x)),
      m.y !== 0 && (B = Math.abs((_ - d.currentY) / m.y));
    const ne = Math.max(k, B);
    (d.currentX = R), (d.currentY = _);
    const ge = d.width * O.scale,
      Q = d.height * O.scale;
    (d.minX = Math.min(l.slideWidth / 2 - ge / 2, 0)),
      (d.maxX = -d.minX),
      (d.minY = Math.min(l.slideHeight / 2 - Q / 2, 0)),
      (d.maxY = -d.minY),
      (d.currentX = Math.max(Math.min(d.currentX, d.maxX), d.minX)),
      (d.currentY = Math.max(Math.min(d.currentY, d.maxY), d.minY)),
      (l.imageWrapEl.style.transitionDuration = `${ne}ms`),
      (l.imageWrapEl.style.transform = `translate3d(${d.currentX}px, ${d.currentY}px,0)`);
  }
  function x() {
    const O = e.zoom;
    l.slideEl &&
      e.activeIndex !== e.slides.indexOf(l.slideEl) &&
      (l.imageEl && (l.imageEl.style.transform = 'translate3d(0,0,0) scale(1)'),
      l.imageWrapEl && (l.imageWrapEl.style.transform = 'translate3d(0,0,0)'),
      l.slideEl.classList.remove(`${e.params.zoom.zoomedSlideClass}`),
      (O.scale = 1),
      (f = 1),
      (l.slideEl = void 0),
      (l.imageEl = void 0),
      (l.imageWrapEl = void 0),
      (l.originX = 0),
      (l.originY = 0));
  }
  function $(O) {
    const k = e.zoom,
      B = e.params.zoom;
    if (!l.slideEl) {
      O &&
        O.target &&
        (l.slideEl = O.target.closest(`.${e.params.slideClass}, swiper-slide`)),
        l.slideEl ||
          (e.params.virtual && e.params.virtual.enabled && e.virtual
            ? (l.slideEl = W(e.slidesEl, `.${e.params.slideActiveClass}`)[0])
            : (l.slideEl = e.slides[e.activeIndex]));
      let ce = l.slideEl.querySelector(`.${B.containerClass}`);
      ce &&
        (ce = ce.querySelectorAll(
          'picture, img, svg, canvas, .swiper-zoom-target',
        )[0]),
        (l.imageEl = ce),
        ce
          ? (l.imageWrapEl = ie(l.imageEl, `.${B.containerClass}`)[0])
          : (l.imageWrapEl = void 0);
    }
    if (!l.imageEl || !l.imageWrapEl) return;
    e.params.cssMode &&
      ((e.wrapperEl.style.overflow = 'hidden'),
      (e.wrapperEl.style.touchAction = 'none')),
      l.slideEl.classList.add(`${B.zoomedSlideClass}`);
    let N, R, Y, _, ne, ge, Q, se, Ne, Fe, We, qe, ve, we, Te, Me, Ce, Pe;
    typeof d.touchesStart.x > 'u' && O
      ? ((N = O.pageX), (R = O.pageY))
      : ((N = d.touchesStart.x), (R = d.touchesStart.y));
    const de = typeof O == 'number' ? O : null;
    f === 1 &&
      de &&
      ((N = void 0),
      (R = void 0),
      (d.touchesStart.x = void 0),
      (d.touchesStart.y = void 0));
    const _e = w();
    (k.scale = de || _e),
      (f = de || _e),
      O && !(f === 1 && de)
        ? ((Ce = l.slideEl.offsetWidth),
          (Pe = l.slideEl.offsetHeight),
          (Y = Se(l.slideEl).left + r.scrollX),
          (_ = Se(l.slideEl).top + r.scrollY),
          (ne = Y + Ce / 2 - N),
          (ge = _ + Pe / 2 - R),
          (Ne = l.imageEl.offsetWidth || l.imageEl.clientWidth),
          (Fe = l.imageEl.offsetHeight || l.imageEl.clientHeight),
          (We = Ne * k.scale),
          (qe = Fe * k.scale),
          (ve = Math.min(Ce / 2 - We / 2, 0)),
          (we = Math.min(Pe / 2 - qe / 2, 0)),
          (Te = -ve),
          (Me = -we),
          (Q = ne * k.scale),
          (se = ge * k.scale),
          Q < ve && (Q = ve),
          Q > Te && (Q = Te),
          se < we && (se = we),
          se > Me && (se = Me))
        : ((Q = 0), (se = 0)),
      de && k.scale === 1 && ((l.originX = 0), (l.originY = 0)),
      (l.imageWrapEl.style.transitionDuration = '300ms'),
      (l.imageWrapEl.style.transform = `translate3d(${Q}px, ${se}px,0)`),
      (l.imageEl.style.transitionDuration = '300ms'),
      (l.imageEl.style.transform = `translate3d(0,0,0) scale(${k.scale})`);
  }
  function H() {
    const O = e.zoom,
      k = e.params.zoom;
    if (!l.slideEl) {
      e.params.virtual && e.params.virtual.enabled && e.virtual
        ? (l.slideEl = W(e.slidesEl, `.${e.params.slideActiveClass}`)[0])
        : (l.slideEl = e.slides[e.activeIndex]);
      let B = l.slideEl.querySelector(`.${k.containerClass}`);
      B &&
        (B = B.querySelectorAll(
          'picture, img, svg, canvas, .swiper-zoom-target',
        )[0]),
        (l.imageEl = B),
        B
          ? (l.imageWrapEl = ie(l.imageEl, `.${k.containerClass}`)[0])
          : (l.imageWrapEl = void 0);
    }
    !l.imageEl ||
      !l.imageWrapEl ||
      (e.params.cssMode &&
        ((e.wrapperEl.style.overflow = ''),
        (e.wrapperEl.style.touchAction = '')),
      (O.scale = 1),
      (f = 1),
      (d.touchesStart.x = void 0),
      (d.touchesStart.y = void 0),
      (l.imageWrapEl.style.transitionDuration = '300ms'),
      (l.imageWrapEl.style.transform = 'translate3d(0,0,0)'),
      (l.imageEl.style.transitionDuration = '300ms'),
      (l.imageEl.style.transform = 'translate3d(0,0,0) scale(1)'),
      l.slideEl.classList.remove(`${k.zoomedSlideClass}`),
      (l.slideEl = void 0),
      (l.originX = 0),
      (l.originY = 0));
  }
  function T(O) {
    const k = e.zoom;
    k.scale && k.scale !== 1 ? H() : $(O);
  }
  function L() {
    const O = e.params.passiveListeners ? { passive: !0, capture: !1 } : !1,
      k = e.params.passiveListeners ? { passive: !1, capture: !0 } : !0;
    return { passiveListener: O, activeListenerWithCapture: k };
  }
  function G() {
    const O = e.zoom;
    if (O.enabled) return;
    O.enabled = !0;
    const { passiveListener: k, activeListenerWithCapture: B } = L();
    e.wrapperEl.addEventListener('pointerdown', E, k),
      e.wrapperEl.addEventListener('pointermove', z, B),
      ['pointerup', 'pointercancel', 'pointerout'].forEach((N) => {
        e.wrapperEl.addEventListener(N, D, k);
      }),
      e.wrapperEl.addEventListener('pointermove', C, B);
  }
  function V() {
    const O = e.zoom;
    if (!O.enabled) return;
    O.enabled = !1;
    const { passiveListener: k, activeListenerWithCapture: B } = L();
    e.wrapperEl.removeEventListener('pointerdown', E, k),
      e.wrapperEl.removeEventListener('pointermove', z, B),
      ['pointerup', 'pointercancel', 'pointerout'].forEach((N) => {
        e.wrapperEl.removeEventListener(N, D, k);
      }),
      e.wrapperEl.removeEventListener('pointermove', C, B);
  }
  i('init', () => {
    e.params.zoom.enabled && G();
  }),
    i('destroy', () => {
      V();
    }),
    i('touchStart', (O, k) => {
      e.zoom.enabled && I(k);
    }),
    i('touchEnd', (O, k) => {
      e.zoom.enabled && S();
    }),
    i('doubleTap', (O, k) => {
      !e.animating &&
        e.params.zoom.enabled &&
        e.zoom.enabled &&
        e.params.zoom.toggle &&
        T(k);
    }),
    i('transitionEnd', () => {
      e.zoom.enabled && e.params.zoom.enabled && x();
    }),
    i('slideChange', () => {
      e.zoom.enabled && e.params.zoom.enabled && e.params.cssMode && x();
    }),
    Object.assign(e.zoom, { enable: G, disable: V, in: $, out: H, toggle: T });
}
function Ls(s) {
  let { swiper: e, extendParams: t, on: i } = s;
  t({ controller: { control: void 0, inverse: !1, by: 'slide' } }),
    (e.controller = { control: void 0 });
  function a(u, o) {
    const l = (function () {
      let h, w, y;
      return (v, p) => {
        for (w = -1, h = v.length; h - w > 1; )
          (y = (h + w) >> 1), v[y] <= p ? (w = y) : (h = y);
        return h;
      };
    })();
    (this.x = u), (this.y = o), (this.lastIndex = u.length - 1);
    let d, m;
    return (
      (this.interpolate = function (h) {
        return h
          ? ((m = l(this.x, h)),
            (d = m - 1),
            ((h - this.x[d]) * (this.y[m] - this.y[d])) /
              (this.x[m] - this.x[d]) +
              this.y[d])
          : 0;
      }),
      this
    );
  }
  function r(u) {
    e.controller.spline = e.params.loop
      ? new a(e.slidesGrid, u.slidesGrid)
      : new a(e.snapGrid, u.snapGrid);
  }
  function f(u, o) {
    const l = e.controller.control;
    let d, m;
    const g = e.constructor;
    function h(w) {
      if (w.destroyed) return;
      const y = e.rtlTranslate ? -e.translate : e.translate;
      e.params.controller.by === 'slide' &&
        (r(w), (m = -e.controller.spline.interpolate(-y))),
        (!m || e.params.controller.by === 'container') &&
          ((d =
            (w.maxTranslate() - w.minTranslate()) /
            (e.maxTranslate() - e.minTranslate())),
          (Number.isNaN(d) || !Number.isFinite(d)) && (d = 1),
          (m = (y - e.minTranslate()) * d + w.minTranslate())),
        e.params.controller.inverse && (m = w.maxTranslate() - m),
        w.updateProgress(m),
        w.setTranslate(m, e),
        w.updateActiveIndex(),
        w.updateSlidesClasses();
    }
    if (Array.isArray(l))
      for (let w = 0; w < l.length; w += 1)
        l[w] !== o && l[w] instanceof g && h(l[w]);
    else l instanceof g && o !== l && h(l);
  }
  function c(u, o) {
    const l = e.constructor,
      d = e.controller.control;
    let m;
    function g(h) {
      h.destroyed ||
        (h.setTransition(u, e),
        u !== 0 &&
          (h.transitionStart(),
          h.params.autoHeight &&
            re(() => {
              h.updateAutoHeight();
            }),
          pe(h.wrapperEl, () => {
            d && h.transitionEnd();
          })));
    }
    if (Array.isArray(d))
      for (m = 0; m < d.length; m += 1)
        d[m] !== o && d[m] instanceof l && g(d[m]);
    else d instanceof l && o !== d && g(d);
  }
  function n() {
    e.controller.control &&
      e.controller.spline &&
      ((e.controller.spline = void 0), delete e.controller.spline);
  }
  i('beforeInit', () => {
    if (
      typeof window < 'u' &&
      (typeof e.params.controller.control == 'string' ||
        e.params.controller.control instanceof HTMLElement)
    ) {
      (typeof e.params.controller.control == 'string'
        ? [...document.querySelectorAll(e.params.controller.control)]
        : [e.params.controller.control]
      ).forEach((o) => {
        if (
          (e.controller.control || (e.controller.control = []), o && o.swiper)
        )
          e.controller.control.push(o.swiper);
        else if (o) {
          const l = `${e.params.eventsPrefix}init`,
            d = (m) => {
              e.controller.control.push(m.detail[0]),
                e.update(),
                o.removeEventListener(l, d);
            };
          o.addEventListener(l, d);
        }
      });
      return;
    }
    e.controller.control = e.params.controller.control;
  }),
    i('update', () => {
      n();
    }),
    i('resize', () => {
      n();
    }),
    i('observerUpdate', () => {
      n();
    }),
    i('setTranslate', (u, o, l) => {
      !e.controller.control ||
        e.controller.control.destroyed ||
        e.controller.setTranslate(o, l);
    }),
    i('setTransition', (u, o, l) => {
      !e.controller.control ||
        e.controller.control.destroyed ||
        e.controller.setTransition(o, l);
    }),
    Object.assign(e.controller, { setTranslate: f, setTransition: c });
}
function Is(s) {
  let { swiper: e, extendParams: t, on: i } = s;
  t({
    a11y: {
      enabled: !0,
      notificationClass: 'swiper-notification',
      prevSlideMessage: 'Previous slide',
      nextSlideMessage: 'Next slide',
      firstSlideMessage: 'This is the first slide',
      lastSlideMessage: 'This is the last slide',
      paginationBulletMessage: 'Go to slide {{index}}',
      slideLabelMessage: '{{index}} / {{slidesLength}}',
      containerMessage: null,
      containerRoleDescriptionMessage: null,
      containerRole: null,
      itemRoleDescriptionMessage: null,
      slideRole: 'group',
      id: null,
      scrollOnFocus: !0,
    },
  }),
    (e.a11y = { clicked: !1 });
  let a = null,
    r,
    f,
    c = new Date().getTime();
  function n(T) {
    const L = a;
    L.length !== 0 && ((L.innerHTML = ''), (L.innerHTML = T));
  }
  function u(T) {
    T === void 0 && (T = 16);
    const L = () => Math.round(16 * Math.random()).toString(16);
    return 'x'.repeat(T).replace(/x/g, L);
  }
  function o(T) {
    (T = X(T)),
      T.forEach((L) => {
        L.setAttribute('tabIndex', '0');
      });
  }
  function l(T) {
    (T = X(T)),
      T.forEach((L) => {
        L.setAttribute('tabIndex', '-1');
      });
  }
  function d(T, L) {
    (T = X(T)),
      T.forEach((G) => {
        G.setAttribute('role', L);
      });
  }
  function m(T, L) {
    (T = X(T)),
      T.forEach((G) => {
        G.setAttribute('aria-roledescription', L);
      });
  }
  function g(T, L) {
    (T = X(T)),
      T.forEach((G) => {
        G.setAttribute('aria-controls', L);
      });
  }
  function h(T, L) {
    (T = X(T)),
      T.forEach((G) => {
        G.setAttribute('aria-label', L);
      });
  }
  function w(T, L) {
    (T = X(T)),
      T.forEach((G) => {
        G.setAttribute('id', L);
      });
  }
  function y(T, L) {
    (T = X(T)),
      T.forEach((G) => {
        G.setAttribute('aria-live', L);
      });
  }
  function v(T) {
    (T = X(T)),
      T.forEach((L) => {
        L.setAttribute('aria-disabled', !0);
      });
  }
  function p(T) {
    (T = X(T)),
      T.forEach((L) => {
        L.setAttribute('aria-disabled', !1);
      });
  }
  function b(T) {
    if (T.keyCode !== 13 && T.keyCode !== 32) return;
    const L = e.params.a11y,
      G = T.target;
    if (
      !(
        e.pagination &&
        e.pagination.el &&
        (G === e.pagination.el || e.pagination.el.contains(T.target)) &&
        !T.target.matches(J(e.params.pagination.bulletClass))
      )
    ) {
      if (e.navigation && e.navigation.prevEl && e.navigation.nextEl) {
        const V = X(e.navigation.prevEl);
        X(e.navigation.nextEl).includes(G) &&
          ((e.isEnd && !e.params.loop) || e.slideNext(),
          e.isEnd ? n(L.lastSlideMessage) : n(L.nextSlideMessage)),
          V.includes(G) &&
            ((e.isBeginning && !e.params.loop) || e.slidePrev(),
            e.isBeginning ? n(L.firstSlideMessage) : n(L.prevSlideMessage));
      }
      e.pagination &&
        G.matches(J(e.params.pagination.bulletClass)) &&
        G.click();
    }
  }
  function E() {
    if (e.params.loop || e.params.rewind || !e.navigation) return;
    const { nextEl: T, prevEl: L } = e.navigation;
    L && (e.isBeginning ? (v(L), l(L)) : (p(L), o(L))),
      T && (e.isEnd ? (v(T), l(T)) : (p(T), o(T)));
  }
  function z() {
    return e.pagination && e.pagination.bullets && e.pagination.bullets.length;
  }
  function D() {
    return z() && e.params.pagination.clickable;
  }
  function A() {
    const T = e.params.a11y;
    z() &&
      e.pagination.bullets.forEach((L) => {
        e.params.pagination.clickable &&
          (o(L),
          e.params.pagination.renderBullet ||
            (d(L, 'button'),
            h(
              L,
              T.paginationBulletMessage.replace(/\{\{index\}\}/, me(L) + 1),
            ))),
          L.matches(J(e.params.pagination.bulletActiveClass))
            ? L.setAttribute('aria-current', 'true')
            : L.removeAttribute('aria-current');
      });
  }
  const M = (T, L, G) => {
      o(T),
        T.tagName !== 'BUTTON' &&
          (d(T, 'button'), T.addEventListener('keydown', b)),
        h(T, G),
        g(T, L);
    },
    P = (T) => {
      f && f !== T.target && !f.contains(T.target) && (r = !0),
        (e.a11y.clicked = !0);
    },
    I = () => {
      (r = !1),
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            e.destroyed || (e.a11y.clicked = !1);
          });
        });
    },
    C = (T) => {
      c = new Date().getTime();
    },
    S = (T) => {
      if (
        e.a11y.clicked ||
        !e.params.a11y.scrollOnFocus ||
        new Date().getTime() - c < 100
      )
        return;
      const L = T.target.closest(`.${e.params.slideClass}, swiper-slide`);
      if (!L || !e.slides.includes(L)) return;
      f = L;
      const G = e.slides.indexOf(L) === e.activeIndex,
        V =
          e.params.watchSlidesProgress &&
          e.visibleSlides &&
          e.visibleSlides.includes(L);
      G ||
        V ||
        (T.sourceCapabilities && T.sourceCapabilities.firesTouchEvents) ||
        (e.isHorizontal() ? (e.el.scrollLeft = 0) : (e.el.scrollTop = 0),
        requestAnimationFrame(() => {
          r ||
            (e.params.loop
              ? e.slideToLoop(
                  parseInt(L.getAttribute('data-swiper-slide-index')),
                  0,
                )
              : e.slideTo(e.slides.indexOf(L), 0),
            (r = !1));
        }));
    },
    x = () => {
      const T = e.params.a11y;
      T.itemRoleDescriptionMessage && m(e.slides, T.itemRoleDescriptionMessage),
        T.slideRole && d(e.slides, T.slideRole);
      const L = e.slides.length;
      T.slideLabelMessage &&
        e.slides.forEach((G, V) => {
          const O = e.params.loop
              ? parseInt(G.getAttribute('data-swiper-slide-index'), 10)
              : V,
            k = T.slideLabelMessage
              .replace(/\{\{index\}\}/, O + 1)
              .replace(/\{\{slidesLength\}\}/, L);
          h(G, k);
        });
    },
    $ = () => {
      const T = e.params.a11y;
      e.el.append(a);
      const L = e.el;
      T.containerRoleDescriptionMessage &&
        m(L, T.containerRoleDescriptionMessage),
        T.containerMessage && h(L, T.containerMessage),
        T.containerRole && d(L, T.containerRole);
      const G = e.wrapperEl,
        V = T.id || G.getAttribute('id') || `swiper-wrapper-${u(16)}`,
        O = e.params.autoplay && e.params.autoplay.enabled ? 'off' : 'polite';
      w(G, V), y(G, O), x();
      let { nextEl: k, prevEl: B } = e.navigation ? e.navigation : {};
      (k = X(k)),
        (B = X(B)),
        k && k.forEach((R) => M(R, V, T.nextSlideMessage)),
        B && B.forEach((R) => M(R, V, T.prevSlideMessage)),
        D() &&
          X(e.pagination.el).forEach((Y) => {
            Y.addEventListener('keydown', b);
          }),
        q().addEventListener('visibilitychange', C),
        e.el.addEventListener('focus', S, !0),
        e.el.addEventListener('focus', S, !0),
        e.el.addEventListener('pointerdown', P, !0),
        e.el.addEventListener('pointerup', I, !0);
    };
  function H() {
    a && a.remove();
    let { nextEl: T, prevEl: L } = e.navigation ? e.navigation : {};
    (T = X(T)),
      (L = X(L)),
      T && T.forEach((V) => V.removeEventListener('keydown', b)),
      L && L.forEach((V) => V.removeEventListener('keydown', b)),
      D() &&
        X(e.pagination.el).forEach((O) => {
          O.removeEventListener('keydown', b);
        }),
      q().removeEventListener('visibilitychange', C),
      e.el &&
        typeof e.el != 'string' &&
        (e.el.removeEventListener('focus', S, !0),
        e.el.removeEventListener('pointerdown', P, !0),
        e.el.removeEventListener('pointerup', I, !0));
  }
  i('beforeInit', () => {
    (a = K('span', e.params.a11y.notificationClass)),
      a.setAttribute('aria-live', 'assertive'),
      a.setAttribute('aria-atomic', 'true');
  }),
    i('afterInit', () => {
      e.params.a11y.enabled && $();
    }),
    i('slidesLengthChange snapGridLengthChange slidesGridLengthChange', () => {
      e.params.a11y.enabled && x();
    }),
    i('fromEdge toEdge afterInit lock unlock', () => {
      e.params.a11y.enabled && E();
    }),
    i('paginationUpdate', () => {
      e.params.a11y.enabled && A();
    }),
    i('destroy', () => {
      e.params.a11y.enabled && H();
    });
}
function zs(s) {
  let { swiper: e, extendParams: t, on: i } = s;
  t({
    history: {
      enabled: !1,
      root: '',
      replaceState: !1,
      key: 'slides',
      keepQuery: !1,
    },
  });
  let a = !1,
    r = {};
  const f = (m) =>
      m
        .toString()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, ''),
    c = (m) => {
      const g = F();
      let h;
      m ? (h = new URL(m)) : (h = g.location);
      const w = h.pathname
          .slice(1)
          .split('/')
          .filter((b) => b !== ''),
        y = w.length,
        v = w[y - 2],
        p = w[y - 1];
      return { key: v, value: p };
    },
    n = (m, g) => {
      const h = F();
      if (!a || !e.params.history.enabled) return;
      let w;
      e.params.url ? (w = new URL(e.params.url)) : (w = h.location);
      const y =
        e.virtual && e.params.virtual.enabled
          ? e.slidesEl.querySelector(`[data-swiper-slide-index="${g}"]`)
          : e.slides[g];
      let v = f(y.getAttribute('data-history'));
      if (e.params.history.root.length > 0) {
        let b = e.params.history.root;
        b[b.length - 1] === '/' && (b = b.slice(0, b.length - 1)),
          (v = `${b}/${m ? `${m}/` : ''}${v}`);
      } else w.pathname.includes(m) || (v = `${m ? `${m}/` : ''}${v}`);
      e.params.history.keepQuery && (v += w.search);
      const p = h.history.state;
      (p && p.value === v) ||
        (e.params.history.replaceState
          ? h.history.replaceState({ value: v }, null, v)
          : h.history.pushState({ value: v }, null, v));
    },
    u = (m, g, h) => {
      if (g)
        for (let w = 0, y = e.slides.length; w < y; w += 1) {
          const v = e.slides[w];
          if (f(v.getAttribute('data-history')) === g) {
            const b = e.getSlideIndex(v);
            e.slideTo(b, m, h);
          }
        }
      else e.slideTo(0, m, h);
    },
    o = () => {
      (r = c(e.params.url)), u(e.params.speed, r.value, !1);
    },
    l = () => {
      const m = F();
      if (e.params.history) {
        if (!m.history || !m.history.pushState) {
          (e.params.history.enabled = !1),
            (e.params.hashNavigation.enabled = !0);
          return;
        }
        if (((a = !0), (r = c(e.params.url)), !r.key && !r.value)) {
          e.params.history.replaceState || m.addEventListener('popstate', o);
          return;
        }
        u(0, r.value, e.params.runCallbacksOnInit),
          e.params.history.replaceState || m.addEventListener('popstate', o);
      }
    },
    d = () => {
      const m = F();
      e.params.history.replaceState || m.removeEventListener('popstate', o);
    };
  i('init', () => {
    e.params.history.enabled && l();
  }),
    i('destroy', () => {
      e.params.history.enabled && d();
    }),
    i('transitionEnd _freeModeNoMomentumRelease', () => {
      a && n(e.params.history.key, e.activeIndex);
    }),
    i('slideChange', () => {
      a && e.params.cssMode && n(e.params.history.key, e.activeIndex);
    });
}
function As(s) {
  let { swiper: e, extendParams: t, emit: i, on: a } = s,
    r = !1;
  const f = q(),
    c = F();
  t({
    hashNavigation: {
      enabled: !1,
      replaceState: !1,
      watchState: !1,
      getSlideIndex(d, m) {
        if (e.virtual && e.params.virtual.enabled) {
          const g = e.slides.filter(
            (w) => w.getAttribute('data-hash') === m,
          )[0];
          return g
            ? parseInt(g.getAttribute('data-swiper-slide-index'), 10)
            : 0;
        }
        return e.getSlideIndex(
          W(
            e.slidesEl,
            `.${e.params.slideClass}[data-hash="${m}"], swiper-slide[data-hash="${m}"]`,
          )[0],
        );
      },
    },
  });
  const n = () => {
      i('hashChange');
      const d = f.location.hash.replace('#', ''),
        m =
          e.virtual && e.params.virtual.enabled
            ? e.slidesEl.querySelector(
                `[data-swiper-slide-index="${e.activeIndex}"]`,
              )
            : e.slides[e.activeIndex],
        g = m ? m.getAttribute('data-hash') : '';
      if (d !== g) {
        const h = e.params.hashNavigation.getSlideIndex(e, d);
        if (typeof h > 'u' || Number.isNaN(h)) return;
        e.slideTo(h);
      }
    },
    u = () => {
      if (!r || !e.params.hashNavigation.enabled) return;
      const d =
          e.virtual && e.params.virtual.enabled
            ? e.slidesEl.querySelector(
                `[data-swiper-slide-index="${e.activeIndex}"]`,
              )
            : e.slides[e.activeIndex],
        m = d
          ? d.getAttribute('data-hash') || d.getAttribute('data-history')
          : '';
      e.params.hashNavigation.replaceState &&
      c.history &&
      c.history.replaceState
        ? (c.history.replaceState(null, null, `#${m}` || ''), i('hashSet'))
        : ((f.location.hash = m || ''), i('hashSet'));
    },
    o = () => {
      if (
        !e.params.hashNavigation.enabled ||
        (e.params.history && e.params.history.enabled)
      )
        return;
      r = !0;
      const d = f.location.hash.replace('#', '');
      if (d) {
        const g = e.params.hashNavigation.getSlideIndex(e, d);
        e.slideTo(g || 0, 0, e.params.runCallbacksOnInit, !0);
      }
      e.params.hashNavigation.watchState && c.addEventListener('hashchange', n);
    },
    l = () => {
      e.params.hashNavigation.watchState &&
        c.removeEventListener('hashchange', n);
    };
  a('init', () => {
    e.params.hashNavigation.enabled && o();
  }),
    a('destroy', () => {
      e.params.hashNavigation.enabled && l();
    }),
    a('transitionEnd _freeModeNoMomentumRelease', () => {
      r && u();
    }),
    a('slideChange', () => {
      r && e.params.cssMode && u();
    });
}
function $s(s) {
  let { swiper: e, extendParams: t, on: i, emit: a, params: r } = s;
  (e.autoplay = { running: !1, paused: !1, timeLeft: 0 }),
    t({
      autoplay: {
        enabled: !1,
        delay: 3e3,
        waitForTransition: !0,
        disableOnInteraction: !1,
        stopOnLastSlide: !1,
        reverseDirection: !1,
        pauseOnMouseEnter: !1,
      },
    });
  let f,
    c,
    n = r && r.autoplay ? r.autoplay.delay : 3e3,
    u = r && r.autoplay ? r.autoplay.delay : 3e3,
    o,
    l = new Date().getTime(),
    d,
    m,
    g,
    h,
    w,
    y,
    v;
  function p(L) {
    !e ||
      e.destroyed ||
      !e.wrapperEl ||
      (L.target === e.wrapperEl &&
        (e.wrapperEl.removeEventListener('transitionend', p),
        !(v || (L.detail && L.detail.bySwiperTouchMove)) && P()));
  }
  const b = () => {
      if (e.destroyed || !e.autoplay.running) return;
      e.autoplay.paused ? (d = !0) : d && ((u = o), (d = !1));
      const L = e.autoplay.paused ? o : l + u - new Date().getTime();
      (e.autoplay.timeLeft = L),
        a('autoplayTimeLeft', L, L / n),
        (c = requestAnimationFrame(() => {
          b();
        }));
    },
    E = () => {
      let L;
      return (
        e.virtual && e.params.virtual.enabled
          ? (L = e.slides.filter((V) =>
              V.classList.contains('swiper-slide-active'),
            )[0])
          : (L = e.slides[e.activeIndex]),
        L ? parseInt(L.getAttribute('data-swiper-autoplay'), 10) : void 0
      );
    },
    z = (L) => {
      if (e.destroyed || !e.autoplay.running) return;
      cancelAnimationFrame(c), b();
      let G = typeof L > 'u' ? e.params.autoplay.delay : L;
      (n = e.params.autoplay.delay), (u = e.params.autoplay.delay);
      const V = E();
      !Number.isNaN(V) &&
        V > 0 &&
        typeof L > 'u' &&
        ((G = V), (n = V), (u = V)),
        (o = G);
      const O = e.params.speed,
        k = () => {
          !e ||
            e.destroyed ||
            (e.params.autoplay.reverseDirection
              ? !e.isBeginning || e.params.loop || e.params.rewind
                ? (e.slidePrev(O, !0, !0), a('autoplay'))
                : e.params.autoplay.stopOnLastSlide ||
                  (e.slideTo(e.slides.length - 1, O, !0, !0), a('autoplay'))
              : !e.isEnd || e.params.loop || e.params.rewind
              ? (e.slideNext(O, !0, !0), a('autoplay'))
              : e.params.autoplay.stopOnLastSlide ||
                (e.slideTo(0, O, !0, !0), a('autoplay')),
            e.params.cssMode &&
              ((l = new Date().getTime()),
              requestAnimationFrame(() => {
                z();
              })));
        };
      return (
        G > 0
          ? (clearTimeout(f),
            (f = setTimeout(() => {
              k();
            }, G)))
          : requestAnimationFrame(() => {
              k();
            }),
        G
      );
    },
    D = () => {
      (l = new Date().getTime()),
        (e.autoplay.running = !0),
        z(),
        a('autoplayStart');
    },
    A = () => {
      (e.autoplay.running = !1),
        clearTimeout(f),
        cancelAnimationFrame(c),
        a('autoplayStop');
    },
    M = (L, G) => {
      if (e.destroyed || !e.autoplay.running) return;
      clearTimeout(f), L || (y = !0);
      const V = () => {
        a('autoplayPause'),
          e.params.autoplay.waitForTransition
            ? e.wrapperEl.addEventListener('transitionend', p)
            : P();
      };
      if (((e.autoplay.paused = !0), G)) {
        w && (o = e.params.autoplay.delay), (w = !1), V();
        return;
      }
      (o = (o || e.params.autoplay.delay) - (new Date().getTime() - l)),
        !(e.isEnd && o < 0 && !e.params.loop) && (o < 0 && (o = 0), V());
    },
    P = () => {
      (e.isEnd && o < 0 && !e.params.loop) ||
        e.destroyed ||
        !e.autoplay.running ||
        ((l = new Date().getTime()),
        y ? ((y = !1), z(o)) : z(),
        (e.autoplay.paused = !1),
        a('autoplayResume'));
    },
    I = () => {
      if (e.destroyed || !e.autoplay.running) return;
      const L = q();
      L.visibilityState === 'hidden' && ((y = !0), M(!0)),
        L.visibilityState === 'visible' && P();
    },
    C = (L) => {
      L.pointerType === 'mouse' &&
        ((y = !0), (v = !0), !(e.animating || e.autoplay.paused) && M(!0));
    },
    S = (L) => {
      L.pointerType === 'mouse' && ((v = !1), e.autoplay.paused && P());
    },
    x = () => {
      e.params.autoplay.pauseOnMouseEnter &&
        (e.el.addEventListener('pointerenter', C),
        e.el.addEventListener('pointerleave', S));
    },
    $ = () => {
      e.el &&
        typeof e.el != 'string' &&
        (e.el.removeEventListener('pointerenter', C),
        e.el.removeEventListener('pointerleave', S));
    },
    H = () => {
      q().addEventListener('visibilitychange', I);
    },
    T = () => {
      q().removeEventListener('visibilitychange', I);
    };
  i('init', () => {
    e.params.autoplay.enabled && (x(), H(), D());
  }),
    i('destroy', () => {
      $(), T(), e.autoplay.running && A();
    }),
    i('_freeModeStaticRelease', () => {
      (g || y) && P();
    }),
    i('_freeModeNoMomentumRelease', () => {
      e.params.autoplay.disableOnInteraction ? A() : M(!0, !0);
    }),
    i('beforeTransitionStart', (L, G, V) => {
      e.destroyed ||
        !e.autoplay.running ||
        (V || !e.params.autoplay.disableOnInteraction ? M(!0, !0) : A());
    }),
    i('sliderFirstMove', () => {
      if (!(e.destroyed || !e.autoplay.running)) {
        if (e.params.autoplay.disableOnInteraction) {
          A();
          return;
        }
        (m = !0),
          (g = !1),
          (y = !1),
          (h = setTimeout(() => {
            (y = !0), (g = !0), M(!0);
          }, 200));
      }
    }),
    i('touchEnd', () => {
      if (!(e.destroyed || !e.autoplay.running || !m)) {
        if (
          (clearTimeout(h),
          clearTimeout(f),
          e.params.autoplay.disableOnInteraction)
        ) {
          (g = !1), (m = !1);
          return;
        }
        g && e.params.cssMode && P(), (g = !1), (m = !1);
      }
    }),
    i('slideChange', () => {
      e.destroyed || !e.autoplay.running || (w = !0);
    }),
    Object.assign(e.autoplay, { start: D, stop: A, pause: M, resume: P });
}
function Ds(s) {
  let { swiper: e, extendParams: t, on: i } = s;
  t({
    thumbs: {
      swiper: null,
      multipleActiveThumbs: !0,
      autoScrollOffset: 0,
      slideThumbActiveClass: 'swiper-slide-thumb-active',
      thumbsContainerClass: 'swiper-thumbs',
    },
  });
  let a = !1,
    r = !1;
  e.thumbs = { swiper: null };
  function f() {
    const u = e.thumbs.swiper;
    if (!u || u.destroyed) return;
    const o = u.clickedIndex,
      l = u.clickedSlide;
    if (
      (l && l.classList.contains(e.params.thumbs.slideThumbActiveClass)) ||
      typeof o > 'u' ||
      o === null
    )
      return;
    let d;
    u.params.loop
      ? (d = parseInt(
          u.clickedSlide.getAttribute('data-swiper-slide-index'),
          10,
        ))
      : (d = o),
      e.params.loop ? e.slideToLoop(d) : e.slideTo(d);
  }
  function c() {
    const { thumbs: u } = e.params;
    if (a) return !1;
    a = !0;
    const o = e.constructor;
    if (u.swiper instanceof o)
      (e.thumbs.swiper = u.swiper),
        Object.assign(e.thumbs.swiper.originalParams, {
          watchSlidesProgress: !0,
          slideToClickedSlide: !1,
        }),
        Object.assign(e.thumbs.swiper.params, {
          watchSlidesProgress: !0,
          slideToClickedSlide: !1,
        }),
        e.thumbs.swiper.update();
    else if (fe(u.swiper)) {
      const l = Object.assign({}, u.swiper);
      Object.assign(l, { watchSlidesProgress: !0, slideToClickedSlide: !1 }),
        (e.thumbs.swiper = new o(l)),
        (r = !0);
    }
    return (
      e.thumbs.swiper.el.classList.add(e.params.thumbs.thumbsContainerClass),
      e.thumbs.swiper.on('tap', f),
      !0
    );
  }
  function n(u) {
    const o = e.thumbs.swiper;
    if (!o || o.destroyed) return;
    const l =
      o.params.slidesPerView === 'auto'
        ? o.slidesPerViewDynamic()
        : o.params.slidesPerView;
    let d = 1;
    const m = e.params.thumbs.slideThumbActiveClass;
    if (
      (e.params.slidesPerView > 1 &&
        !e.params.centeredSlides &&
        (d = e.params.slidesPerView),
      e.params.thumbs.multipleActiveThumbs || (d = 1),
      (d = Math.floor(d)),
      o.slides.forEach((w) => w.classList.remove(m)),
      o.params.loop || (o.params.virtual && o.params.virtual.enabled))
    )
      for (let w = 0; w < d; w += 1)
        W(o.slidesEl, `[data-swiper-slide-index="${e.realIndex + w}"]`).forEach(
          (y) => {
            y.classList.add(m);
          },
        );
    else
      for (let w = 0; w < d; w += 1)
        o.slides[e.realIndex + w] && o.slides[e.realIndex + w].classList.add(m);
    const g = e.params.thumbs.autoScrollOffset,
      h = g && !o.params.loop;
    if (e.realIndex !== o.realIndex || h) {
      const w = o.activeIndex;
      let y, v;
      if (o.params.loop) {
        const p = o.slides.filter(
          (b) => b.getAttribute('data-swiper-slide-index') === `${e.realIndex}`,
        )[0];
        (y = o.slides.indexOf(p)),
          (v = e.activeIndex > e.previousIndex ? 'next' : 'prev');
      } else (y = e.realIndex), (v = y > e.previousIndex ? 'next' : 'prev');
      h && (y += v === 'next' ? g : -1 * g),
        o.visibleSlidesIndexes &&
          o.visibleSlidesIndexes.indexOf(y) < 0 &&
          (o.params.centeredSlides
            ? y > w
              ? (y = y - Math.floor(l / 2) + 1)
              : (y = y + Math.floor(l / 2) - 1)
            : y > w && o.params.slidesPerGroup,
          o.slideTo(y, u ? 0 : void 0));
    }
  }
  i('beforeInit', () => {
    const { thumbs: u } = e.params;
    if (!(!u || !u.swiper))
      if (typeof u.swiper == 'string' || u.swiper instanceof HTMLElement) {
        const o = q(),
          l = () => {
            const m =
              typeof u.swiper == 'string'
                ? o.querySelector(u.swiper)
                : u.swiper;
            if (m && m.swiper) (u.swiper = m.swiper), c(), n(!0);
            else if (m) {
              const g = `${e.params.eventsPrefix}init`,
                h = (w) => {
                  (u.swiper = w.detail[0]),
                    m.removeEventListener(g, h),
                    c(),
                    n(!0),
                    u.swiper.update(),
                    e.update();
                };
              m.addEventListener(g, h);
            }
            return m;
          },
          d = () => {
            if (e.destroyed) return;
            l() || requestAnimationFrame(d);
          };
        requestAnimationFrame(d);
      } else c(), n(!0);
  }),
    i('slideChange update resize observerUpdate', () => {
      n();
    }),
    i('setTransition', (u, o) => {
      const l = e.thumbs.swiper;
      !l || l.destroyed || l.setTransition(o);
    }),
    i('beforeDestroy', () => {
      const u = e.thumbs.swiper;
      !u || u.destroyed || (r && u.destroy());
    }),
    Object.assign(e.thumbs, { init: c, update: n });
}
function Os(s) {
  let { swiper: e, extendParams: t, emit: i, once: a } = s;
  t({
    freeMode: {
      enabled: !1,
      momentum: !0,
      momentumRatio: 1,
      momentumBounce: !0,
      momentumBounceRatio: 1,
      momentumVelocityRatio: 1,
      sticky: !1,
      minimumVelocity: 0.02,
    },
  });
  function r() {
    if (e.params.cssMode) return;
    const n = e.getTranslate();
    e.setTranslate(n),
      e.setTransition(0),
      (e.touchEventsData.velocities.length = 0),
      e.freeMode.onTouchEnd({ currentPos: e.rtl ? e.translate : -e.translate });
  }
  function f() {
    if (e.params.cssMode) return;
    const { touchEventsData: n, touches: u } = e;
    n.velocities.length === 0 &&
      n.velocities.push({
        position: u[e.isHorizontal() ? 'startX' : 'startY'],
        time: n.touchStartTime,
      }),
      n.velocities.push({
        position: u[e.isHorizontal() ? 'currentX' : 'currentY'],
        time: Z(),
      });
  }
  function c(n) {
    let { currentPos: u } = n;
    if (e.params.cssMode) return;
    const {
        params: o,
        wrapperEl: l,
        rtlTranslate: d,
        snapGrid: m,
        touchEventsData: g,
      } = e,
      w = Z() - g.touchStartTime;
    if (u < -e.minTranslate()) {
      e.slideTo(e.activeIndex);
      return;
    }
    if (u > -e.maxTranslate()) {
      e.slides.length < m.length
        ? e.slideTo(m.length - 1)
        : e.slideTo(e.slides.length - 1);
      return;
    }
    if (o.freeMode.momentum) {
      if (g.velocities.length > 1) {
        const A = g.velocities.pop(),
          M = g.velocities.pop(),
          P = A.position - M.position,
          I = A.time - M.time;
        (e.velocity = P / I),
          (e.velocity /= 2),
          Math.abs(e.velocity) < o.freeMode.minimumVelocity && (e.velocity = 0),
          (I > 150 || Z() - A.time > 300) && (e.velocity = 0);
      } else e.velocity = 0;
      (e.velocity *= o.freeMode.momentumVelocityRatio),
        (g.velocities.length = 0);
      let y = 1e3 * o.freeMode.momentumRatio;
      const v = e.velocity * y;
      let p = e.translate + v;
      d && (p = -p);
      let b = !1,
        E;
      const z = Math.abs(e.velocity) * 20 * o.freeMode.momentumBounceRatio;
      let D;
      if (p < e.maxTranslate())
        o.freeMode.momentumBounce
          ? (p + e.maxTranslate() < -z && (p = e.maxTranslate() - z),
            (E = e.maxTranslate()),
            (b = !0),
            (g.allowMomentumBounce = !0))
          : (p = e.maxTranslate()),
          o.loop && o.centeredSlides && (D = !0);
      else if (p > e.minTranslate())
        o.freeMode.momentumBounce
          ? (p - e.minTranslate() > z && (p = e.minTranslate() + z),
            (E = e.minTranslate()),
            (b = !0),
            (g.allowMomentumBounce = !0))
          : (p = e.minTranslate()),
          o.loop && o.centeredSlides && (D = !0);
      else if (o.freeMode.sticky) {
        let A;
        for (let M = 0; M < m.length; M += 1)
          if (m[M] > -p) {
            A = M;
            break;
          }
        Math.abs(m[A] - p) < Math.abs(m[A - 1] - p) ||
        e.swipeDirection === 'next'
          ? (p = m[A])
          : (p = m[A - 1]),
          (p = -p);
      }
      if (
        (D &&
          a('transitionEnd', () => {
            e.loopFix();
          }),
        e.velocity !== 0)
      ) {
        if (
          (d
            ? (y = Math.abs((-p - e.translate) / e.velocity))
            : (y = Math.abs((p - e.translate) / e.velocity)),
          o.freeMode.sticky)
        ) {
          const A = Math.abs((d ? -p : p) - e.translate),
            M = e.slidesSizesGrid[e.activeIndex];
          A < M
            ? (y = o.speed)
            : A < 2 * M
            ? (y = o.speed * 1.5)
            : (y = o.speed * 2.5);
        }
      } else if (o.freeMode.sticky) {
        e.slideToClosest();
        return;
      }
      o.freeMode.momentumBounce && b
        ? (e.updateProgress(E),
          e.setTransition(y),
          e.setTranslate(p),
          e.transitionStart(!0, e.swipeDirection),
          (e.animating = !0),
          pe(l, () => {
            !e ||
              e.destroyed ||
              !g.allowMomentumBounce ||
              (i('momentumBounce'),
              e.setTransition(o.speed),
              setTimeout(() => {
                e.setTranslate(E),
                  pe(l, () => {
                    !e || e.destroyed || e.transitionEnd();
                  });
              }, 0));
          }))
        : e.velocity
        ? (i('_freeModeNoMomentumRelease'),
          e.updateProgress(p),
          e.setTransition(y),
          e.setTranslate(p),
          e.transitionStart(!0, e.swipeDirection),
          e.animating ||
            ((e.animating = !0),
            pe(l, () => {
              !e || e.destroyed || e.transitionEnd();
            })))
        : e.updateProgress(p),
        e.updateActiveIndex(),
        e.updateSlidesClasses();
    } else if (o.freeMode.sticky) {
      e.slideToClosest();
      return;
    } else o.freeMode && i('_freeModeNoMomentumRelease');
    (!o.freeMode.momentum || w >= o.longSwipesMs) &&
      (i('_freeModeStaticRelease'),
      e.updateProgress(),
      e.updateActiveIndex(),
      e.updateSlidesClasses());
  }
  Object.assign(e, {
    freeMode: { onTouchStart: r, onTouchMove: f, onTouchEnd: c },
  });
}
function ks(s) {
  let { swiper: e, extendParams: t, on: i } = s;
  t({ grid: { rows: 1, fill: 'column' } });
  let a, r, f, c;
  const n = () => {
      let h = e.params.spaceBetween;
      return (
        typeof h == 'string' && h.indexOf('%') >= 0
          ? (h = (parseFloat(h.replace('%', '')) / 100) * e.size)
          : typeof h == 'string' && (h = parseFloat(h)),
        h
      );
    },
    u = (h) => {
      const { slidesPerView: w } = e.params,
        { rows: y, fill: v } = e.params.grid,
        p =
          e.virtual && e.params.virtual.enabled
            ? e.virtual.slides.length
            : h.length;
      (f = Math.floor(p / y)),
        Math.floor(p / y) === p / y ? (a = p) : (a = Math.ceil(p / y) * y),
        w !== 'auto' && v === 'row' && (a = Math.max(a, w * y)),
        (r = a / y);
    },
    o = () => {
      e.slides &&
        e.slides.forEach((h) => {
          h.swiperSlideGridSet &&
            ((h.style.height = ''),
            (h.style[e.getDirectionLabel('margin-top')] = ''));
        });
    },
    l = (h, w, y) => {
      const { slidesPerGroup: v } = e.params,
        p = n(),
        { rows: b, fill: E } = e.params.grid,
        z =
          e.virtual && e.params.virtual.enabled
            ? e.virtual.slides.length
            : y.length;
      let D, A, M;
      if (E === 'row' && v > 1) {
        const P = Math.floor(h / (v * b)),
          I = h - b * v * P,
          C = P === 0 ? v : Math.min(Math.ceil((z - P * b * v) / b), v);
        (M = Math.floor(I / C)),
          (A = I - M * C + P * v),
          (D = A + (M * a) / b),
          (w.style.order = D);
      } else
        E === 'column'
          ? ((A = Math.floor(h / b)),
            (M = h - A * b),
            (A > f || (A === f && M === b - 1)) &&
              ((M += 1), M >= b && ((M = 0), (A += 1))))
          : ((M = Math.floor(h / r)), (A = h - M * r));
      (w.row = M),
        (w.column = A),
        (w.style.height = `calc((100% - ${(b - 1) * p}px) / ${b})`),
        (w.style[e.getDirectionLabel('margin-top')] =
          M !== 0 ? p && `${p}px` : ''),
        (w.swiperSlideGridSet = !0);
    },
    d = (h, w) => {
      const { centeredSlides: y, roundLengths: v } = e.params,
        p = n(),
        { rows: b } = e.params.grid;
      if (
        ((e.virtualSize = (h + p) * a),
        (e.virtualSize = Math.ceil(e.virtualSize / b) - p),
        e.params.cssMode ||
          (e.wrapperEl.style[e.getDirectionLabel('width')] = `${
            e.virtualSize + p
          }px`),
        y)
      ) {
        const E = [];
        for (let z = 0; z < w.length; z += 1) {
          let D = w[z];
          v && (D = Math.floor(D)), w[z] < e.virtualSize + w[0] && E.push(D);
        }
        w.splice(0, w.length), w.push(...E);
      }
    },
    m = () => {
      c = e.params.grid && e.params.grid.rows > 1;
    },
    g = () => {
      const { params: h, el: w } = e,
        y = h.grid && h.grid.rows > 1;
      c && !y
        ? (w.classList.remove(
            `${h.containerModifierClass}grid`,
            `${h.containerModifierClass}grid-column`,
          ),
          (f = 1),
          e.emitContainerClasses())
        : !c &&
          y &&
          (w.classList.add(`${h.containerModifierClass}grid`),
          h.grid.fill === 'column' &&
            w.classList.add(`${h.containerModifierClass}grid-column`),
          e.emitContainerClasses()),
        (c = y);
    };
  i('init', m),
    i('update', g),
    (e.grid = {
      initSlides: u,
      unsetSlides: o,
      updateSlide: l,
      updateWrapperSize: d,
    });
}
function Gs(s) {
  const e = this,
    { params: t, slidesEl: i } = e;
  t.loop && e.loopDestroy();
  const a = (r) => {
    if (typeof r == 'string') {
      const f = document.createElement('div');
      (f.innerHTML = r), i.append(f.children[0]), (f.innerHTML = '');
    } else i.append(r);
  };
  if (typeof s == 'object' && 'length' in s)
    for (let r = 0; r < s.length; r += 1) s[r] && a(s[r]);
  else a(s);
  e.recalcSlides(),
    t.loop && e.loopCreate(),
    (!t.observer || e.isElement) && e.update();
}
function Hs(s) {
  const e = this,
    { params: t, activeIndex: i, slidesEl: a } = e;
  t.loop && e.loopDestroy();
  let r = i + 1;
  const f = (c) => {
    if (typeof c == 'string') {
      const n = document.createElement('div');
      (n.innerHTML = c), a.prepend(n.children[0]), (n.innerHTML = '');
    } else a.prepend(c);
  };
  if (typeof s == 'object' && 'length' in s) {
    for (let c = 0; c < s.length; c += 1) s[c] && f(s[c]);
    r = i + s.length;
  } else f(s);
  e.recalcSlides(),
    t.loop && e.loopCreate(),
    (!t.observer || e.isElement) && e.update(),
    e.slideTo(r, 0, !1);
}
function Bs(s, e) {
  const t = this,
    { params: i, activeIndex: a, slidesEl: r } = t;
  let f = a;
  i.loop && ((f -= t.loopedSlides), t.loopDestroy(), t.recalcSlides());
  const c = t.slides.length;
  if (s <= 0) {
    t.prependSlide(e);
    return;
  }
  if (s >= c) {
    t.appendSlide(e);
    return;
  }
  let n = f > s ? f + 1 : f;
  const u = [];
  for (let o = c - 1; o >= s; o -= 1) {
    const l = t.slides[o];
    l.remove(), u.unshift(l);
  }
  if (typeof e == 'object' && 'length' in e) {
    for (let o = 0; o < e.length; o += 1) e[o] && r.append(e[o]);
    n = f > s ? f + e.length : f;
  } else r.append(e);
  for (let o = 0; o < u.length; o += 1) r.append(u[o]);
  t.recalcSlides(),
    i.loop && t.loopCreate(),
    (!i.observer || t.isElement) && t.update(),
    i.loop ? t.slideTo(n + t.loopedSlides, 0, !1) : t.slideTo(n, 0, !1);
}
function Rs(s) {
  const e = this,
    { params: t, activeIndex: i } = e;
  let a = i;
  t.loop && ((a -= e.loopedSlides), e.loopDestroy());
  let r = a,
    f;
  if (typeof s == 'object' && 'length' in s) {
    for (let c = 0; c < s.length; c += 1)
      (f = s[c]), e.slides[f] && e.slides[f].remove(), f < r && (r -= 1);
    r = Math.max(r, 0);
  } else
    (f = s),
      e.slides[f] && e.slides[f].remove(),
      f < r && (r -= 1),
      (r = Math.max(r, 0));
  e.recalcSlides(),
    t.loop && e.loopCreate(),
    (!t.observer || e.isElement) && e.update(),
    t.loop ? e.slideTo(r + e.loopedSlides, 0, !1) : e.slideTo(r, 0, !1);
}
function Vs() {
  const s = this,
    e = [];
  for (let t = 0; t < s.slides.length; t += 1) e.push(t);
  s.removeSlide(e);
}
function Xs(s) {
  let { swiper: e } = s;
  Object.assign(e, {
    appendSlide: Gs.bind(e),
    prependSlide: Hs.bind(e),
    addSlide: Bs.bind(e),
    removeSlide: Rs.bind(e),
    removeAllSlides: Vs.bind(e),
  });
}
function oe(s) {
  const {
    effect: e,
    swiper: t,
    on: i,
    setTranslate: a,
    setTransition: r,
    overwriteParams: f,
    perspective: c,
    recreateShadows: n,
    getEffectParams: u,
  } = s;
  i('beforeInit', () => {
    if (t.params.effect !== e) return;
    t.classNames.push(`${t.params.containerModifierClass}${e}`),
      c && c() && t.classNames.push(`${t.params.containerModifierClass}3d`);
    const l = f ? f() : {};
    Object.assign(t.params, l), Object.assign(t.originalParams, l);
  }),
    i('setTranslate', () => {
      t.params.effect === e && a();
    }),
    i('setTransition', (l, d) => {
      t.params.effect === e && r(d);
    }),
    i('transitionEnd', () => {
      if (t.params.effect === e && n) {
        if (!u || !u().slideShadows) return;
        t.slides.forEach((l) => {
          l.querySelectorAll(
            '.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left',
          ).forEach((d) => d.remove());
        }),
          n();
      }
    });
  let o;
  i('virtualUpdate', () => {
    t.params.effect === e &&
      (t.slides.length || (o = !0),
      requestAnimationFrame(() => {
        o && t.slides && t.slides.length && (a(), (o = !1));
      }));
  });
}
function he(s, e) {
  const t = ae(e);
  return (
    t !== e &&
      ((t.style.backfaceVisibility = 'hidden'),
      (t.style['-webkit-backface-visibility'] = 'hidden')),
    t
  );
}
function xe(s) {
  let { swiper: e, duration: t, transformElements: i, allSlides: a } = s;
  const { activeIndex: r } = e,
    f = (c) =>
      c.parentElement
        ? c.parentElement
        : e.slides.filter(
            (u) => u.shadowRoot && u.shadowRoot === c.parentNode,
          )[0];
  if (e.params.virtualTranslate && t !== 0) {
    let c = !1,
      n;
    a
      ? (n = i)
      : (n = i.filter((u) => {
          const o = u.classList.contains('swiper-slide-transform') ? f(u) : u;
          return e.getSlideIndex(o) === r;
        })),
      n.forEach((u) => {
        pe(u, () => {
          if (c || !e || e.destroyed) return;
          (c = !0), (e.animating = !1);
          const o = new window.CustomEvent('transitionend', {
            bubbles: !0,
            cancelable: !0,
          });
          e.wrapperEl.dispatchEvent(o);
        });
      });
  }
}
function Ys(s) {
  let { swiper: e, extendParams: t, on: i } = s;
  t({ fadeEffect: { crossFade: !1 } }),
    oe({
      effect: 'fade',
      swiper: e,
      on: i,
      setTranslate: () => {
        const { slides: f } = e,
          c = e.params.fadeEffect;
        for (let n = 0; n < f.length; n += 1) {
          const u = e.slides[n];
          let l = -u.swiperSlideOffset;
          e.params.virtualTranslate || (l -= e.translate);
          let d = 0;
          e.isHorizontal() || ((d = l), (l = 0));
          const m = e.params.fadeEffect.crossFade
              ? Math.max(1 - Math.abs(u.progress), 0)
              : 1 + Math.min(Math.max(u.progress, -1), 0),
            g = he(c, u);
          (g.style.opacity = m),
            (g.style.transform = `translate3d(${l}px, ${d}px, 0px)`);
        }
      },
      setTransition: (f) => {
        const c = e.slides.map((n) => ae(n));
        c.forEach((n) => {
          n.style.transitionDuration = `${f}ms`;
        }),
          xe({ swiper: e, duration: f, transformElements: c, allSlides: !0 });
      },
      overwriteParams: () => ({
        slidesPerView: 1,
        slidesPerGroup: 1,
        watchSlidesProgress: !0,
        spaceBetween: 0,
        virtualTranslate: !e.params.cssMode,
      }),
    });
}
function Ns(s) {
  let { swiper: e, extendParams: t, on: i } = s;
  t({
    cubeEffect: {
      slideShadows: !0,
      shadow: !0,
      shadowOffset: 20,
      shadowScale: 0.94,
    },
  });
  const a = (n, u, o) => {
    let l = o
        ? n.querySelector('.swiper-slide-shadow-left')
        : n.querySelector('.swiper-slide-shadow-top'),
      d = o
        ? n.querySelector('.swiper-slide-shadow-right')
        : n.querySelector('.swiper-slide-shadow-bottom');
    l ||
      ((l = K(
        'div',
        `swiper-slide-shadow-cube swiper-slide-shadow-${
          o ? 'left' : 'top'
        }`.split(' '),
      )),
      n.append(l)),
      d ||
        ((d = K(
          'div',
          `swiper-slide-shadow-cube swiper-slide-shadow-${
            o ? 'right' : 'bottom'
          }`.split(' '),
        )),
        n.append(d)),
      l && (l.style.opacity = Math.max(-u, 0)),
      d && (d.style.opacity = Math.max(u, 0));
  };
  oe({
    effect: 'cube',
    swiper: e,
    on: i,
    setTranslate: () => {
      const {
          el: n,
          wrapperEl: u,
          slides: o,
          width: l,
          height: d,
          rtlTranslate: m,
          size: g,
          browser: h,
        } = e,
        w = Ee(e),
        y = e.params.cubeEffect,
        v = e.isHorizontal(),
        p = e.virtual && e.params.virtual.enabled;
      let b = 0,
        E;
      y.shadow &&
        (v
          ? ((E = e.wrapperEl.querySelector('.swiper-cube-shadow')),
            E || ((E = K('div', 'swiper-cube-shadow')), e.wrapperEl.append(E)),
            (E.style.height = `${l}px`))
          : ((E = n.querySelector('.swiper-cube-shadow')),
            E || ((E = K('div', 'swiper-cube-shadow')), n.append(E))));
      for (let D = 0; D < o.length; D += 1) {
        const A = o[D];
        let M = D;
        p && (M = parseInt(A.getAttribute('data-swiper-slide-index'), 10));
        let P = M * 90,
          I = Math.floor(P / 360);
        m && ((P = -P), (I = Math.floor(-P / 360)));
        const C = Math.max(Math.min(A.progress, 1), -1);
        let S = 0,
          x = 0,
          $ = 0;
        M % 4 === 0
          ? ((S = -I * 4 * g), ($ = 0))
          : (M - 1) % 4 === 0
          ? ((S = 0), ($ = -I * 4 * g))
          : (M - 2) % 4 === 0
          ? ((S = g + I * 4 * g), ($ = g))
          : (M - 3) % 4 === 0 && ((S = -g), ($ = 3 * g + g * 4 * I)),
          m && (S = -S),
          v || ((x = S), (S = 0));
        const H = `rotateX(${w(v ? 0 : -P)}deg) rotateY(${w(
          v ? P : 0,
        )}deg) translate3d(${S}px, ${x}px, ${$}px)`;
        C <= 1 &&
          C > -1 &&
          ((b = M * 90 + C * 90), m && (b = -M * 90 - C * 90)),
          (A.style.transform = H),
          y.slideShadows && a(A, C, v);
      }
      if (
        ((u.style.transformOrigin = `50% 50% -${g / 2}px`),
        (u.style['-webkit-transform-origin'] = `50% 50% -${g / 2}px`),
        y.shadow)
      )
        if (v)
          E.style.transform = `translate3d(0px, ${l / 2 + y.shadowOffset}px, ${
            -l / 2
          }px) rotateX(89.99deg) rotateZ(0deg) scale(${y.shadowScale})`;
        else {
          const D = Math.abs(b) - Math.floor(Math.abs(b) / 90) * 90,
            A =
              1.5 -
              (Math.sin((D * 2 * Math.PI) / 360) / 2 +
                Math.cos((D * 2 * Math.PI) / 360) / 2),
            M = y.shadowScale,
            P = y.shadowScale / A,
            I = y.shadowOffset;
          E.style.transform = `scale3d(${M}, 1, ${P}) translate3d(0px, ${
            d / 2 + I
          }px, ${-d / 2 / P}px) rotateX(-89.99deg)`;
        }
      const z =
        (h.isSafari || h.isWebView) && h.needPerspectiveFix ? -g / 2 : 0;
      (u.style.transform = `translate3d(0px,0,${z}px) rotateX(${w(
        e.isHorizontal() ? 0 : b,
      )}deg) rotateY(${w(e.isHorizontal() ? -b : 0)}deg)`),
        u.style.setProperty('--swiper-cube-translate-z', `${z}px`);
    },
    setTransition: (n) => {
      const { el: u, slides: o } = e;
      if (
        (o.forEach((l) => {
          (l.style.transitionDuration = `${n}ms`),
            l
              .querySelectorAll(
                '.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left',
              )
              .forEach((d) => {
                d.style.transitionDuration = `${n}ms`;
              });
        }),
        e.params.cubeEffect.shadow && !e.isHorizontal())
      ) {
        const l = u.querySelector('.swiper-cube-shadow');
        l && (l.style.transitionDuration = `${n}ms`);
      }
    },
    recreateShadows: () => {
      const n = e.isHorizontal();
      e.slides.forEach((u) => {
        const o = Math.max(Math.min(u.progress, 1), -1);
        a(u, o, n);
      });
    },
    getEffectParams: () => e.params.cubeEffect,
    perspective: () => !0,
    overwriteParams: () => ({
      slidesPerView: 1,
      slidesPerGroup: 1,
      watchSlidesProgress: !0,
      resistanceRatio: 0,
      spaceBetween: 0,
      centeredSlides: !1,
      virtualTranslate: !0,
    }),
  });
}
function le(s, e, t) {
  const i = `swiper-slide-shadow${t ? `-${t}` : ''}${
      s ? ` swiper-slide-shadow-${s}` : ''
    }`,
    a = ae(e);
  let r = a.querySelector(`.${i.split(' ').join('.')}`);
  return r || ((r = K('div', i.split(' '))), a.append(r)), r;
}
function Fs(s) {
  let { swiper: e, extendParams: t, on: i } = s;
  t({ flipEffect: { slideShadows: !0, limitRotation: !0 } });
  const a = (n, u) => {
    let o = e.isHorizontal()
        ? n.querySelector('.swiper-slide-shadow-left')
        : n.querySelector('.swiper-slide-shadow-top'),
      l = e.isHorizontal()
        ? n.querySelector('.swiper-slide-shadow-right')
        : n.querySelector('.swiper-slide-shadow-bottom');
    o || (o = le('flip', n, e.isHorizontal() ? 'left' : 'top')),
      l || (l = le('flip', n, e.isHorizontal() ? 'right' : 'bottom')),
      o && (o.style.opacity = Math.max(-u, 0)),
      l && (l.style.opacity = Math.max(u, 0));
  };
  oe({
    effect: 'flip',
    swiper: e,
    on: i,
    setTranslate: () => {
      const { slides: n, rtlTranslate: u } = e,
        o = e.params.flipEffect,
        l = Ee(e);
      for (let d = 0; d < n.length; d += 1) {
        const m = n[d];
        let g = m.progress;
        e.params.flipEffect.limitRotation &&
          (g = Math.max(Math.min(m.progress, 1), -1));
        const h = m.swiperSlideOffset;
        let y = -180 * g,
          v = 0,
          p = e.params.cssMode ? -h - e.translate : -h,
          b = 0;
        e.isHorizontal()
          ? u && (y = -y)
          : ((b = p), (p = 0), (v = -y), (y = 0)),
          (m.style.zIndex = -Math.abs(Math.round(g)) + n.length),
          o.slideShadows && a(m, g);
        const E = `translate3d(${p}px, ${b}px, 0px) rotateX(${l(
            v,
          )}deg) rotateY(${l(y)}deg)`,
          z = he(o, m);
        z.style.transform = E;
      }
    },
    setTransition: (n) => {
      const u = e.slides.map((o) => ae(o));
      u.forEach((o) => {
        (o.style.transitionDuration = `${n}ms`),
          o
            .querySelectorAll(
              '.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left',
            )
            .forEach((l) => {
              l.style.transitionDuration = `${n}ms`;
            });
      }),
        xe({ swiper: e, duration: n, transformElements: u });
    },
    recreateShadows: () => {
      e.params.flipEffect,
        e.slides.forEach((n) => {
          let u = n.progress;
          e.params.flipEffect.limitRotation &&
            (u = Math.max(Math.min(n.progress, 1), -1)),
            a(n, u);
        });
    },
    getEffectParams: () => e.params.flipEffect,
    perspective: () => !0,
    overwriteParams: () => ({
      slidesPerView: 1,
      slidesPerGroup: 1,
      watchSlidesProgress: !0,
      spaceBetween: 0,
      virtualTranslate: !e.params.cssMode,
    }),
  });
}
function Ws(s) {
  let { swiper: e, extendParams: t, on: i } = s;
  t({
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      scale: 1,
      modifier: 1,
      slideShadows: !0,
    },
  }),
    oe({
      effect: 'coverflow',
      swiper: e,
      on: i,
      setTranslate: () => {
        const { width: f, height: c, slides: n, slidesSizesGrid: u } = e,
          o = e.params.coverflowEffect,
          l = e.isHorizontal(),
          d = e.translate,
          m = l ? -d + f / 2 : -d + c / 2,
          g = l ? o.rotate : -o.rotate,
          h = o.depth,
          w = Ee(e);
        for (let y = 0, v = n.length; y < v; y += 1) {
          const p = n[y],
            b = u[y],
            E = p.swiperSlideOffset,
            z = (m - E - b / 2) / b,
            D =
              typeof o.modifier == 'function' ? o.modifier(z) : z * o.modifier;
          let A = l ? g * D : 0,
            M = l ? 0 : g * D,
            P = -h * Math.abs(D),
            I = o.stretch;
          typeof I == 'string' &&
            I.indexOf('%') !== -1 &&
            (I = (parseFloat(o.stretch) / 100) * b);
          let C = l ? 0 : I * D,
            S = l ? I * D : 0,
            x = 1 - (1 - o.scale) * Math.abs(D);
          Math.abs(S) < 0.001 && (S = 0),
            Math.abs(C) < 0.001 && (C = 0),
            Math.abs(P) < 0.001 && (P = 0),
            Math.abs(A) < 0.001 && (A = 0),
            Math.abs(M) < 0.001 && (M = 0),
            Math.abs(x) < 0.001 && (x = 0);
          const $ = `translate3d(${S}px,${C}px,${P}px)  rotateX(${w(
              M,
            )}deg) rotateY(${w(A)}deg) scale(${x})`,
            H = he(o, p);
          if (
            ((H.style.transform = $),
            (p.style.zIndex = -Math.abs(Math.round(D)) + 1),
            o.slideShadows)
          ) {
            let T = l
                ? p.querySelector('.swiper-slide-shadow-left')
                : p.querySelector('.swiper-slide-shadow-top'),
              L = l
                ? p.querySelector('.swiper-slide-shadow-right')
                : p.querySelector('.swiper-slide-shadow-bottom');
            T || (T = le('coverflow', p, l ? 'left' : 'top')),
              L || (L = le('coverflow', p, l ? 'right' : 'bottom')),
              T && (T.style.opacity = D > 0 ? D : 0),
              L && (L.style.opacity = -D > 0 ? -D : 0);
          }
        }
      },
      setTransition: (f) => {
        e.slides
          .map((n) => ae(n))
          .forEach((n) => {
            (n.style.transitionDuration = `${f}ms`),
              n
                .querySelectorAll(
                  '.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left',
                )
                .forEach((u) => {
                  u.style.transitionDuration = `${f}ms`;
                });
          });
      },
      perspective: () => !0,
      overwriteParams: () => ({ watchSlidesProgress: !0 }),
    });
}
function qs(s) {
  let { swiper: e, extendParams: t, on: i } = s;
  t({
    creativeEffect: {
      limitProgress: 1,
      shadowPerProgress: !1,
      progressMultiplier: 1,
      perspective: !0,
      prev: { translate: [0, 0, 0], rotate: [0, 0, 0], opacity: 1, scale: 1 },
      next: { translate: [0, 0, 0], rotate: [0, 0, 0], opacity: 1, scale: 1 },
    },
  });
  const a = (c) => (typeof c == 'string' ? c : `${c}px`);
  oe({
    effect: 'creative',
    swiper: e,
    on: i,
    setTranslate: () => {
      const { slides: c, wrapperEl: n, slidesSizesGrid: u } = e,
        o = e.params.creativeEffect,
        { progressMultiplier: l } = o,
        d = e.params.centeredSlides,
        m = Ee(e);
      if (d) {
        const g = u[0] / 2 - e.params.slidesOffsetBefore || 0;
        n.style.transform = `translateX(calc(50% - ${g}px))`;
      }
      for (let g = 0; g < c.length; g += 1) {
        const h = c[g],
          w = h.progress,
          y = Math.min(Math.max(h.progress, -o.limitProgress), o.limitProgress);
        let v = y;
        d ||
          (v = Math.min(
            Math.max(h.originalProgress, -o.limitProgress),
            o.limitProgress,
          ));
        const p = h.swiperSlideOffset,
          b = [e.params.cssMode ? -p - e.translate : -p, 0, 0],
          E = [0, 0, 0];
        let z = !1;
        e.isHorizontal() || ((b[1] = b[0]), (b[0] = 0));
        let D = {
          translate: [0, 0, 0],
          rotate: [0, 0, 0],
          scale: 1,
          opacity: 1,
        };
        y < 0 ? ((D = o.next), (z = !0)) : y > 0 && ((D = o.prev), (z = !0)),
          b.forEach((x, $) => {
            b[$] = `calc(${x}px + (${a(D.translate[$])} * ${Math.abs(y * l)}))`;
          }),
          E.forEach((x, $) => {
            let H = D.rotate[$] * Math.abs(y * l);
            E[$] = H;
          }),
          (h.style.zIndex = -Math.abs(Math.round(w)) + c.length);
        const A = b.join(', '),
          M = `rotateX(${m(E[0])}deg) rotateY(${m(E[1])}deg) rotateZ(${m(
            E[2],
          )}deg)`,
          P =
            v < 0
              ? `scale(${1 + (1 - D.scale) * v * l})`
              : `scale(${1 - (1 - D.scale) * v * l})`,
          I = v < 0 ? 1 + (1 - D.opacity) * v * l : 1 - (1 - D.opacity) * v * l,
          C = `translate3d(${A}) ${M} ${P}`;
        if ((z && D.shadow) || !z) {
          let x = h.querySelector('.swiper-slide-shadow');
          if ((!x && D.shadow && (x = le('creative', h)), x)) {
            const $ = o.shadowPerProgress ? y * (1 / o.limitProgress) : y;
            x.style.opacity = Math.min(Math.max(Math.abs($), 0), 1);
          }
        }
        const S = he(o, h);
        (S.style.transform = C),
          (S.style.opacity = I),
          D.origin && (S.style.transformOrigin = D.origin);
      }
    },
    setTransition: (c) => {
      const n = e.slides.map((u) => ae(u));
      n.forEach((u) => {
        (u.style.transitionDuration = `${c}ms`),
          u.querySelectorAll('.swiper-slide-shadow').forEach((o) => {
            o.style.transitionDuration = `${c}ms`;
          });
      }),
        xe({ swiper: e, duration: c, transformElements: n, allSlides: !0 });
    },
    perspective: () => e.params.creativeEffect.perspective,
    overwriteParams: () => ({
      watchSlidesProgress: !0,
      virtualTranslate: !e.params.cssMode,
    }),
  });
}
function _s(s) {
  let { swiper: e, extendParams: t, on: i } = s;
  t({
    cardsEffect: {
      slideShadows: !0,
      rotate: !0,
      perSlideRotate: 2,
      perSlideOffset: 8,
    },
  }),
    oe({
      effect: 'cards',
      swiper: e,
      on: i,
      setTranslate: () => {
        const { slides: f, activeIndex: c, rtlTranslate: n } = e,
          u = e.params.cardsEffect,
          { startTranslate: o, isTouched: l } = e.touchEventsData,
          d = n ? -e.translate : e.translate;
        for (let m = 0; m < f.length; m += 1) {
          const g = f[m],
            h = g.progress,
            w = Math.min(Math.max(h, -4), 4);
          let y = g.swiperSlideOffset;
          e.params.centeredSlides &&
            !e.params.cssMode &&
            (e.wrapperEl.style.transform = `translateX(${e.minTranslate()}px)`),
            e.params.centeredSlides &&
              e.params.cssMode &&
              (y -= f[0].swiperSlideOffset);
          let v = e.params.cssMode ? -y - e.translate : -y,
            p = 0;
          const b = -100 * Math.abs(w);
          let E = 1,
            z = -u.perSlideRotate * w,
            D = u.perSlideOffset - Math.abs(w) * 0.75;
          const A =
              e.virtual && e.params.virtual.enabled ? e.virtual.from + m : m,
            M =
              (A === c || A === c - 1) &&
              w > 0 &&
              w < 1 &&
              (l || e.params.cssMode) &&
              d < o,
            P =
              (A === c || A === c + 1) &&
              w < 0 &&
              w > -1 &&
              (l || e.params.cssMode) &&
              d > o;
          if (M || P) {
            const x = (1 - Math.abs((Math.abs(w) - 0.5) / 0.5)) ** 0.5;
            (z += -28 * w * x),
              (E += -0.5 * x),
              (D += 96 * x),
              (p = `${-25 * x * Math.abs(w)}%`);
          }
          if (
            (w < 0
              ? (v = `calc(${v}px ${n ? '-' : '+'} (${D * Math.abs(w)}%))`)
              : w > 0
              ? (v = `calc(${v}px ${n ? '-' : '+'} (-${D * Math.abs(w)}%))`)
              : (v = `${v}px`),
            !e.isHorizontal())
          ) {
            const x = p;
            (p = v), (v = x);
          }
          const I = w < 0 ? `${1 + (1 - E) * w}` : `${1 - (1 - E) * w}`,
            C = `
        translate3d(${v}, ${p}, ${b}px)
        rotateZ(${u.rotate ? (n ? -z : z) : 0}deg)
        scale(${I})
      `;
          if (u.slideShadows) {
            let x = g.querySelector('.swiper-slide-shadow');
            x || (x = le('cards', g)),
              x &&
                (x.style.opacity = Math.min(
                  Math.max((Math.abs(w) - 0.5) / 0.5, 0),
                  1,
                ));
          }
          g.style.zIndex = -Math.abs(Math.round(h)) + f.length;
          const S = he(u, g);
          S.style.transform = C;
        }
      },
      setTransition: (f) => {
        const c = e.slides.map((n) => ae(n));
        c.forEach((n) => {
          (n.style.transitionDuration = `${f}ms`),
            n.querySelectorAll('.swiper-slide-shadow').forEach((u) => {
              u.style.transitionDuration = `${f}ms`;
            });
        }),
          xe({ swiper: e, duration: f, transformElements: c });
      },
      perspective: () => !0,
      overwriteParams: () => ({
        watchSlidesProgress: !0,
        virtualTranslate: !e.params.cssMode,
      }),
    });
}
const js = [
  xs,
  Ts,
  Ms,
  Ve,
  Xe,
  Ye,
  Cs,
  Ps,
  Ls,
  Is,
  zs,
  As,
  $s,
  Ds,
  Os,
  ks,
  Xs,
  Ys,
  Ns,
  Fs,
  Ws,
  qs,
  _s,
];
j.use(js);
class Us extends window.HTMLElement {
  constructor() {
    super(),
      (this.slider = new j('.swiper', {
        modules: [Ve, Xe, Ye],
        slidesPerView: 4,
        autoplay: !1,
        spaceBetween: 10,
        pagination: { el: '.swiper-pagination' },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        scrollbar: { el: '.swiper-scrollbar' },
      })),
      console.log('swiper init', this.slider);
  }
}
class Ks extends window.HTMLElement {
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
    (this.slider = new j('.menu.swiper', {
      modules: [Ve, Xe, Ye],
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
window.customElements.define('swiper-slider', Us);
window.customElements.define('menu-swiper', Ks);
