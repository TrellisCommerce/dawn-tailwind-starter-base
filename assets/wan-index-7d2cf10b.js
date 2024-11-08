/* empty css                 */ var Ft = !1,
  Vt = !1,
  we = [],
  Xt = -1;
function Er(t) {
  Tr(t);
}
function Tr(t) {
  we.includes(t) || we.push(t), _r();
}
function Mr(t) {
  let e = we.indexOf(t);
  e !== -1 && e > Xt && we.splice(e, 1);
}
function _r() {
  !Vt && !Ft && ((Ft = !0), queueMicrotask(Cr));
}
function Cr() {
  (Ft = !1), (Vt = !0);
  for (let t = 0; t < we.length; t++) we[t](), (Xt = t);
  (we.length = 0), (Xt = -1), (Vt = !1);
}
var Ie,
  Me,
  Oe,
  ns,
  Yt = !0;
function Pr(t) {
  (Yt = !1), t(), (Yt = !0);
}
function Ar(t) {
  (Ie = t.reactive),
    (Oe = t.release),
    (Me = (e) =>
      t.effect(e, {
        scheduler: (i) => {
          Yt ? Er(i) : i();
        },
      })),
    (ns = t.raw);
}
function Hi(t) {
  Me = t;
}
function Lr(t) {
  let e = () => {};
  return [
    (s) => {
      let r = Me(s);
      return (
        t._x_effects ||
          ((t._x_effects = new Set()),
          (t._x_runEffects = () => {
            t._x_effects.forEach((n) => n());
          })),
        t._x_effects.add(r),
        (e = () => {
          r !== void 0 && (t._x_effects.delete(r), Oe(r));
        }),
        r
      );
    },
    () => {
      e();
    },
  ];
}
function as(t, e) {
  let i = !0,
    s,
    r = Me(() => {
      let n = t();
      JSON.stringify(n),
        i
          ? (s = n)
          : queueMicrotask(() => {
              e(n, s), (s = n);
            }),
        (i = !1);
    });
  return () => Oe(r);
}
var os = [],
  ls = [],
  ds = [];
function Ir(t) {
  ds.push(t);
}
function li(t, e) {
  typeof e == 'function'
    ? (t._x_cleanups || (t._x_cleanups = []), t._x_cleanups.push(e))
    : ((e = t), ls.push(e));
}
function cs(t) {
  os.push(t);
}
function us(t, e, i) {
  t._x_attributeCleanups || (t._x_attributeCleanups = {}),
    t._x_attributeCleanups[e] || (t._x_attributeCleanups[e] = []),
    t._x_attributeCleanups[e].push(i);
}
function fs(t, e) {
  t._x_attributeCleanups &&
    Object.entries(t._x_attributeCleanups).forEach(([i, s]) => {
      (e === void 0 || e.includes(i)) &&
        (s.forEach((r) => r()), delete t._x_attributeCleanups[i]);
    });
}
function Or(t) {
  var e, i;
  for (
    (e = t._x_effects) == null || e.forEach(Mr);
    (i = t._x_cleanups) != null && i.length;

  )
    t._x_cleanups.pop()();
}
var di = new MutationObserver(pi),
  ci = !1;
function ui() {
  di.observe(document, {
    subtree: !0,
    childList: !0,
    attributes: !0,
    attributeOldValue: !0,
  }),
    (ci = !0);
}
function ps() {
  $r(), di.disconnect(), (ci = !1);
}
var Be = [];
function $r() {
  let t = di.takeRecords();
  Be.push(() => t.length > 0 && pi(t));
  let e = Be.length;
  queueMicrotask(() => {
    if (Be.length === e) for (; Be.length > 0; ) Be.shift()();
  });
}
function Y(t) {
  if (!ci) return t();
  ps();
  let e = t();
  return ui(), e;
}
var fi = !1,
  ut = [];
function zr() {
  fi = !0;
}
function Dr() {
  (fi = !1), pi(ut), (ut = []);
}
function pi(t) {
  if (fi) {
    ut = ut.concat(t);
    return;
  }
  let e = new Set(),
    i = new Set(),
    s = new Map(),
    r = new Map();
  for (let n = 0; n < t.length; n++)
    if (
      !t[n].target._x_ignoreMutationObserver &&
      (t[n].type === 'childList' &&
        (t[n].addedNodes.forEach((a) => a.nodeType === 1 && e.add(a)),
        t[n].removedNodes.forEach((a) => a.nodeType === 1 && i.add(a))),
      t[n].type === 'attributes')
    ) {
      let a = t[n].target,
        l = t[n].attributeName,
        o = t[n].oldValue,
        f = () => {
          s.has(a) || s.set(a, []),
            s.get(a).push({ name: l, value: a.getAttribute(l) });
        },
        c = () => {
          r.has(a) || r.set(a, []), r.get(a).push(l);
        };
      a.hasAttribute(l) && o === null
        ? f()
        : a.hasAttribute(l)
        ? (c(), f())
        : c();
    }
  r.forEach((n, a) => {
    fs(a, n);
  }),
    s.forEach((n, a) => {
      os.forEach((l) => l(a, n));
    });
  for (let n of i) e.has(n) || ls.forEach((a) => a(n));
  e.forEach((n) => {
    (n._x_ignoreSelf = !0), (n._x_ignore = !0);
  });
  for (let n of e)
    i.has(n) ||
      (n.isConnected &&
        (delete n._x_ignoreSelf,
        delete n._x_ignore,
        ds.forEach((a) => a(n)),
        (n._x_ignore = !0),
        (n._x_ignoreSelf = !0)));
  e.forEach((n) => {
    delete n._x_ignoreSelf, delete n._x_ignore;
  }),
    (e = null),
    (i = null),
    (s = null),
    (r = null);
}
function ms(t) {
  return Ue(Pe(t));
}
function Ke(t, e, i) {
  return (
    (t._x_dataStack = [e, ...Pe(i || t)]),
    () => {
      t._x_dataStack = t._x_dataStack.filter((s) => s !== e);
    }
  );
}
function Pe(t) {
  return t._x_dataStack
    ? t._x_dataStack
    : typeof ShadowRoot == 'function' && t instanceof ShadowRoot
    ? Pe(t.host)
    : t.parentNode
    ? Pe(t.parentNode)
    : [];
}
function Ue(t) {
  return new Proxy({ objects: t }, kr);
}
var kr = {
  ownKeys({ objects: t }) {
    return Array.from(new Set(t.flatMap((e) => Object.keys(e))));
  },
  has({ objects: t }, e) {
    return e == Symbol.unscopables
      ? !1
      : t.some(
          (i) =>
            Object.prototype.hasOwnProperty.call(i, e) || Reflect.has(i, e),
        );
  },
  get({ objects: t }, e, i) {
    return e == 'toJSON'
      ? Rr
      : Reflect.get(t.find((s) => Reflect.has(s, e)) || {}, e, i);
  },
  set({ objects: t }, e, i, s) {
    const r =
        t.find((a) => Object.prototype.hasOwnProperty.call(a, e)) ||
        t[t.length - 1],
      n = Object.getOwnPropertyDescriptor(r, e);
    return n != null && n.set && n != null && n.get
      ? n.set.call(s, i) || !0
      : Reflect.set(r, e, i);
  },
};
function Rr() {
  return Reflect.ownKeys(this).reduce(
    (e, i) => ((e[i] = Reflect.get(this, i)), e),
    {},
  );
}
function hs(t) {
  let e = (s) => typeof s == 'object' && !Array.isArray(s) && s !== null,
    i = (s, r = '') => {
      Object.entries(Object.getOwnPropertyDescriptors(s)).forEach(
        ([n, { value: a, enumerable: l }]) => {
          if (
            l === !1 ||
            a === void 0 ||
            (typeof a == 'object' && a !== null && a.__v_skip)
          )
            return;
          let o = r === '' ? n : `${r}.${n}`;
          typeof a == 'object' && a !== null && a._x_interceptor
            ? (s[n] = a.initialize(t, o, n))
            : e(a) && a !== s && !(a instanceof Element) && i(a, o);
        },
      );
    };
  return i(t);
}
function gs(t, e = () => {}) {
  let i = {
    initialValue: void 0,
    _x_interceptor: !0,
    initialize(s, r, n) {
      return t(
        this.initialValue,
        () => Br(s, r),
        (a) => jt(s, r, a),
        r,
        n,
      );
    },
  };
  return (
    e(i),
    (s) => {
      if (typeof s == 'object' && s !== null && s._x_interceptor) {
        let r = i.initialize.bind(i);
        i.initialize = (n, a, l) => {
          let o = s.initialize(n, a, l);
          return (i.initialValue = o), r(n, a, l);
        };
      } else i.initialValue = s;
      return i;
    }
  );
}
function Br(t, e) {
  return e.split('.').reduce((i, s) => i[s], t);
}
function jt(t, e, i) {
  if ((typeof e == 'string' && (e = e.split('.')), e.length === 1)) t[e[0]] = i;
  else {
    if (e.length === 0) throw error;
    return t[e[0]] || (t[e[0]] = {}), jt(t[e[0]], e.slice(1), i);
  }
}
var vs = {};
function re(t, e) {
  vs[t] = e;
}
function Wt(t, e) {
  let i = Hr(e);
  return (
    Object.entries(vs).forEach(([s, r]) => {
      Object.defineProperty(t, `$${s}`, {
        get() {
          return r(e, i);
        },
        enumerable: !1,
      });
    }),
    t
  );
}
function Hr(t) {
  let [e, i] = Es(t),
    s = { interceptor: gs, ...e };
  return li(t, i), s;
}
function Nr(t, e, i, ...s) {
  try {
    return i(...s);
  } catch (r) {
    We(r, t, e);
  }
}
function We(t, e, i = void 0) {
  (t = Object.assign(t ?? { message: 'No error message given.' }, {
    el: e,
    expression: i,
  })),
    console.warn(
      `Alpine Expression Error: ${t.message}

${
  i
    ? 'Expression: "' +
      i +
      `"

`
    : ''
}`,
      e,
    ),
    setTimeout(() => {
      throw t;
    }, 0);
}
var lt = !0;
function ws(t) {
  let e = lt;
  lt = !1;
  let i = t();
  return (lt = e), i;
}
function ye(t, e, i = {}) {
  let s;
  return J(t, e)((r) => (s = r), i), s;
}
function J(...t) {
  return ys(...t);
}
var ys = bs;
function Gr(t) {
  ys = t;
}
function bs(t, e) {
  let i = {};
  Wt(i, t);
  let s = [i, ...Pe(t)],
    r = typeof e == 'function' ? Fr(s, e) : Xr(s, e, t);
  return Nr.bind(null, t, e, r);
}
function Fr(t, e) {
  return (i = () => {}, { scope: s = {}, params: r = [] } = {}) => {
    let n = e.apply(Ue([s, ...t]), r);
    ft(i, n);
  };
}
var Lt = {};
function Vr(t, e) {
  if (Lt[t]) return Lt[t];
  let i = Object.getPrototypeOf(async function () {}).constructor,
    s =
      /^[\n\s]*if.*\(.*\)/.test(t.trim()) || /^(let|const)\s/.test(t.trim())
        ? `(async()=>{ ${t} })()`
        : t,
    n = (() => {
      try {
        let a = new i(
          ['__self', 'scope'],
          `with (scope) { __self.result = ${s} }; __self.finished = true; return __self.result;`,
        );
        return Object.defineProperty(a, 'name', { value: `[Alpine] ${t}` }), a;
      } catch (a) {
        return We(a, e, t), Promise.resolve();
      }
    })();
  return (Lt[t] = n), n;
}
function Xr(t, e, i) {
  let s = Vr(e, i);
  return (r = () => {}, { scope: n = {}, params: a = [] } = {}) => {
    (s.result = void 0), (s.finished = !1);
    let l = Ue([n, ...t]);
    if (typeof s == 'function') {
      let o = s(s, l).catch((f) => We(f, i, e));
      s.finished
        ? (ft(r, s.result, l, a, i), (s.result = void 0))
        : o
            .then((f) => {
              ft(r, f, l, a, i);
            })
            .catch((f) => We(f, i, e))
            .finally(() => (s.result = void 0));
    }
  };
}
function ft(t, e, i, s, r) {
  if (lt && typeof e == 'function') {
    let n = e.apply(i, s);
    n instanceof Promise
      ? n.then((a) => ft(t, a, i, s)).catch((a) => We(a, r, e))
      : t(n);
  } else
    typeof e == 'object' && e instanceof Promise ? e.then((n) => t(n)) : t(e);
}
var mi = 'x-';
function $e(t = '') {
  return mi + t;
}
function Yr(t) {
  mi = t;
}
var pt = {};
function W(t, e) {
  return (
    (pt[t] = e),
    {
      before(i) {
        if (!pt[i]) {
          console.warn(
            String.raw`Cannot find directive \`${i}\`. \`${t}\` will use the default order of execution`,
          );
          return;
        }
        const s = ve.indexOf(i);
        ve.splice(s >= 0 ? s : ve.indexOf('DEFAULT'), 0, t);
      },
    }
  );
}
function jr(t) {
  return Object.keys(pt).includes(t);
}
function hi(t, e, i) {
  if (((e = Array.from(e)), t._x_virtualDirectives)) {
    let n = Object.entries(t._x_virtualDirectives).map(([l, o]) => ({
        name: l,
        value: o,
      })),
      a = xs(n);
    (n = n.map((l) =>
      a.find((o) => o.name === l.name)
        ? { name: `x-bind:${l.name}`, value: `"${l.value}"` }
        : l,
    )),
      (e = e.concat(n));
  }
  let s = {};
  return e
    .map(_s((n, a) => (s[n] = a)))
    .filter(Ps)
    .map(Kr(s, i))
    .sort(Ur)
    .map((n) => qr(t, n));
}
function xs(t) {
  return Array.from(t)
    .map(_s())
    .filter((e) => !Ps(e));
}
var qt = !1,
  Ge = new Map(),
  Ss = Symbol();
function Wr(t) {
  qt = !0;
  let e = Symbol();
  (Ss = e), Ge.set(e, []);
  let i = () => {
      for (; Ge.get(e).length; ) Ge.get(e).shift()();
      Ge.delete(e);
    },
    s = () => {
      (qt = !1), i();
    };
  t(i), s();
}
function Es(t) {
  let e = [],
    i = (l) => e.push(l),
    [s, r] = Lr(t);
  return (
    e.push(r),
    [
      {
        Alpine: Ze,
        effect: s,
        cleanup: i,
        evaluateLater: J.bind(J, t),
        evaluate: ye.bind(ye, t),
      },
      () => e.forEach((l) => l()),
    ]
  );
}
function qr(t, e) {
  let i = () => {},
    s = pt[e.type] || i,
    [r, n] = Es(t);
  us(t, e.original, n);
  let a = () => {
    t._x_ignore ||
      t._x_ignoreSelf ||
      (s.inline && s.inline(t, e, r),
      (s = s.bind(s, t, e, r)),
      qt ? Ge.get(Ss).push(s) : s());
  };
  return (a.runCleanups = n), a;
}
var Ts =
    (t, e) =>
    ({ name: i, value: s }) => (
      i.startsWith(t) && (i = i.replace(t, e)), { name: i, value: s }
    ),
  Ms = (t) => t;
function _s(t = () => {}) {
  return ({ name: e, value: i }) => {
    let { name: s, value: r } = Cs.reduce((n, a) => a(n), {
      name: e,
      value: i,
    });
    return s !== e && t(s, e), { name: s, value: r };
  };
}
var Cs = [];
function gi(t) {
  Cs.push(t);
}
function Ps({ name: t }) {
  return As().test(t);
}
var As = () => new RegExp(`^${mi}([^:^.]+)\\b`);
function Kr(t, e) {
  return ({ name: i, value: s }) => {
    let r = i.match(As()),
      n = i.match(/:([a-zA-Z0-9\-_:]+)/),
      a = i.match(/\.[^.\]]+(?=[^\]]*$)/g) || [],
      l = e || t[i] || i;
    return {
      type: r ? r[1] : null,
      value: n ? n[1] : null,
      modifiers: a.map((o) => o.replace('.', '')),
      expression: s,
      original: l,
    };
  };
}
var Kt = 'DEFAULT',
  ve = [
    'ignore',
    'ref',
    'data',
    'id',
    'anchor',
    'bind',
    'init',
    'for',
    'model',
    'modelable',
    'transition',
    'show',
    'if',
    Kt,
    'teleport',
  ];
function Ur(t, e) {
  let i = ve.indexOf(t.type) === -1 ? Kt : t.type,
    s = ve.indexOf(e.type) === -1 ? Kt : e.type;
  return ve.indexOf(i) - ve.indexOf(s);
}
function Xe(t, e, i = {}) {
  t.dispatchEvent(
    new CustomEvent(e, {
      detail: i,
      bubbles: !0,
      composed: !0,
      cancelable: !0,
    }),
  );
}
function Ee(t, e) {
  if (typeof ShadowRoot == 'function' && t instanceof ShadowRoot) {
    Array.from(t.children).forEach((r) => Ee(r, e));
    return;
  }
  let i = !1;
  if ((e(t, () => (i = !0)), i)) return;
  let s = t.firstElementChild;
  for (; s; ) Ee(s, e), (s = s.nextElementSibling);
}
function ie(t, ...e) {
  console.warn(`Alpine Warning: ${t}`, ...e);
}
var Ni = !1;
function Jr() {
  Ni &&
    ie(
      'Alpine has already been initialized on this page. Calling Alpine.start() more than once can cause problems.',
    ),
    (Ni = !0),
    document.body ||
      ie(
        "Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?",
      ),
    Xe(document, 'alpine:init'),
    Xe(document, 'alpine:initializing'),
    ui(),
    Ir((e) => le(e, Ee)),
    li((e) => ze(e)),
    cs((e, i) => {
      hi(e, i).forEach((s) => s());
    });
  let t = (e) => !vt(e.parentElement, !0);
  Array.from(document.querySelectorAll(Os().join(',')))
    .filter(t)
    .forEach((e) => {
      le(e);
    }),
    Xe(document, 'alpine:initialized'),
    setTimeout(() => {
      en();
    });
}
var vi = [],
  Ls = [];
function Is() {
  return vi.map((t) => t());
}
function Os() {
  return vi.concat(Ls).map((t) => t());
}
function $s(t) {
  vi.push(t);
}
function zs(t) {
  Ls.push(t);
}
function vt(t, e = !1) {
  return Je(t, (i) => {
    if ((e ? Os() : Is()).some((r) => i.matches(r))) return !0;
  });
}
function Je(t, e) {
  if (t) {
    if (e(t)) return t;
    if ((t._x_teleportBack && (t = t._x_teleportBack), !!t.parentElement))
      return Je(t.parentElement, e);
  }
}
function Zr(t) {
  return Is().some((e) => t.matches(e));
}
var Ds = [];
function Qr(t) {
  Ds.push(t);
}
function le(t, e = Ee, i = () => {}) {
  Wr(() => {
    e(t, (s, r) => {
      i(s, r),
        Ds.forEach((n) => n(s, r)),
        hi(s, s.attributes).forEach((n) => n()),
        s._x_ignore && r();
    });
  });
}
function ze(t, e = Ee) {
  e(t, (i) => {
    Or(i), fs(i);
  });
}
function en() {
  [
    ['ui', 'dialog', ['[x-dialog], [x-popover]']],
    ['anchor', 'anchor', ['[x-anchor]']],
    ['sort', 'sort', ['[x-sort]']],
  ].forEach(([e, i, s]) => {
    jr(i) ||
      s.some((r) => {
        if (document.querySelector(r))
          return ie(`found "${r}", but missing ${e} plugin`), !0;
      });
  });
}
var Ut = [],
  wi = !1;
function yi(t = () => {}) {
  return (
    queueMicrotask(() => {
      wi ||
        setTimeout(() => {
          Jt();
        });
    }),
    new Promise((e) => {
      Ut.push(() => {
        t(), e();
      });
    })
  );
}
function Jt() {
  for (wi = !1; Ut.length; ) Ut.shift()();
}
function tn() {
  wi = !0;
}
function bi(t, e) {
  return Array.isArray(e)
    ? Gi(t, e.join(' '))
    : typeof e == 'object' && e !== null
    ? sn(t, e)
    : typeof e == 'function'
    ? bi(t, e())
    : Gi(t, e);
}
function Gi(t, e) {
  let i = (r) =>
      r
        .split(' ')
        .filter((n) => !t.classList.contains(n))
        .filter(Boolean),
    s = (r) => (
      t.classList.add(...r),
      () => {
        t.classList.remove(...r);
      }
    );
  return (e = e === !0 ? (e = '') : e || ''), s(i(e));
}
function sn(t, e) {
  let i = (l) => l.split(' ').filter(Boolean),
    s = Object.entries(e)
      .flatMap(([l, o]) => (o ? i(l) : !1))
      .filter(Boolean),
    r = Object.entries(e)
      .flatMap(([l, o]) => (o ? !1 : i(l)))
      .filter(Boolean),
    n = [],
    a = [];
  return (
    r.forEach((l) => {
      t.classList.contains(l) && (t.classList.remove(l), a.push(l));
    }),
    s.forEach((l) => {
      t.classList.contains(l) || (t.classList.add(l), n.push(l));
    }),
    () => {
      a.forEach((l) => t.classList.add(l)),
        n.forEach((l) => t.classList.remove(l));
    }
  );
}
function wt(t, e) {
  return typeof e == 'object' && e !== null ? rn(t, e) : nn(t, e);
}
function rn(t, e) {
  let i = {};
  return (
    Object.entries(e).forEach(([s, r]) => {
      (i[s] = t.style[s]),
        s.startsWith('--') || (s = an(s)),
        t.style.setProperty(s, r);
    }),
    setTimeout(() => {
      t.style.length === 0 && t.removeAttribute('style');
    }),
    () => {
      wt(t, i);
    }
  );
}
function nn(t, e) {
  let i = t.getAttribute('style', e);
  return (
    t.setAttribute('style', e),
    () => {
      t.setAttribute('style', i || '');
    }
  );
}
function an(t) {
  return t.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
function Zt(t, e = () => {}) {
  let i = !1;
  return function () {
    i ? e.apply(this, arguments) : ((i = !0), t.apply(this, arguments));
  };
}
W(
  'transition',
  (t, { value: e, modifiers: i, expression: s }, { evaluate: r }) => {
    typeof s == 'function' && (s = r(s)),
      s !== !1 && (!s || typeof s == 'boolean' ? ln(t, i, e) : on(t, s, e));
  },
);
function on(t, e, i) {
  ks(t, bi, ''),
    {
      enter: (r) => {
        t._x_transition.enter.during = r;
      },
      'enter-start': (r) => {
        t._x_transition.enter.start = r;
      },
      'enter-end': (r) => {
        t._x_transition.enter.end = r;
      },
      leave: (r) => {
        t._x_transition.leave.during = r;
      },
      'leave-start': (r) => {
        t._x_transition.leave.start = r;
      },
      'leave-end': (r) => {
        t._x_transition.leave.end = r;
      },
    }[i](e);
}
function ln(t, e, i) {
  ks(t, wt);
  let s = !e.includes('in') && !e.includes('out') && !i,
    r = s || e.includes('in') || ['enter'].includes(i),
    n = s || e.includes('out') || ['leave'].includes(i);
  e.includes('in') && !s && (e = e.filter((y, h) => h < e.indexOf('out'))),
    e.includes('out') && !s && (e = e.filter((y, h) => h > e.indexOf('out')));
  let a = !e.includes('opacity') && !e.includes('scale'),
    l = a || e.includes('opacity'),
    o = a || e.includes('scale'),
    f = l ? 0 : 1,
    c = o ? He(e, 'scale', 95) / 100 : 1,
    d = He(e, 'delay', 0) / 1e3,
    u = He(e, 'origin', 'center'),
    m = 'opacity, transform',
    v = He(e, 'duration', 150) / 1e3,
    w = He(e, 'duration', 75) / 1e3,
    g = 'cubic-bezier(0.4, 0.0, 0.2, 1)';
  r &&
    ((t._x_transition.enter.during = {
      transformOrigin: u,
      transitionDelay: `${d}s`,
      transitionProperty: m,
      transitionDuration: `${v}s`,
      transitionTimingFunction: g,
    }),
    (t._x_transition.enter.start = { opacity: f, transform: `scale(${c})` }),
    (t._x_transition.enter.end = { opacity: 1, transform: 'scale(1)' })),
    n &&
      ((t._x_transition.leave.during = {
        transformOrigin: u,
        transitionDelay: `${d}s`,
        transitionProperty: m,
        transitionDuration: `${w}s`,
        transitionTimingFunction: g,
      }),
      (t._x_transition.leave.start = { opacity: 1, transform: 'scale(1)' }),
      (t._x_transition.leave.end = { opacity: f, transform: `scale(${c})` }));
}
function ks(t, e, i = {}) {
  t._x_transition ||
    (t._x_transition = {
      enter: { during: i, start: i, end: i },
      leave: { during: i, start: i, end: i },
      in(s = () => {}, r = () => {}) {
        Qt(
          t,
          e,
          {
            during: this.enter.during,
            start: this.enter.start,
            end: this.enter.end,
          },
          s,
          r,
        );
      },
      out(s = () => {}, r = () => {}) {
        Qt(
          t,
          e,
          {
            during: this.leave.during,
            start: this.leave.start,
            end: this.leave.end,
          },
          s,
          r,
        );
      },
    });
}
window.Element.prototype._x_toggleAndCascadeWithTransitions = function (
  t,
  e,
  i,
  s,
) {
  const r =
    document.visibilityState === 'visible' ? requestAnimationFrame : setTimeout;
  let n = () => r(i);
  if (e) {
    t._x_transition && (t._x_transition.enter || t._x_transition.leave)
      ? t._x_transition.enter &&
        (Object.entries(t._x_transition.enter.during).length ||
          Object.entries(t._x_transition.enter.start).length ||
          Object.entries(t._x_transition.enter.end).length)
        ? t._x_transition.in(i)
        : n()
      : t._x_transition
      ? t._x_transition.in(i)
      : n();
    return;
  }
  (t._x_hidePromise = t._x_transition
    ? new Promise((a, l) => {
        t._x_transition.out(
          () => {},
          () => a(s),
        ),
          t._x_transitioning &&
            t._x_transitioning.beforeCancel(() =>
              l({ isFromCancelledTransition: !0 }),
            );
      })
    : Promise.resolve(s)),
    queueMicrotask(() => {
      let a = Rs(t);
      a
        ? (a._x_hideChildren || (a._x_hideChildren = []),
          a._x_hideChildren.push(t))
        : r(() => {
            let l = (o) => {
              let f = Promise.all([
                o._x_hidePromise,
                ...(o._x_hideChildren || []).map(l),
              ]).then(([c]) => (c == null ? void 0 : c()));
              return delete o._x_hidePromise, delete o._x_hideChildren, f;
            };
            l(t).catch((o) => {
              if (!o.isFromCancelledTransition) throw o;
            });
          });
    });
};
function Rs(t) {
  let e = t.parentNode;
  if (e) return e._x_hidePromise ? e : Rs(e);
}
function Qt(
  t,
  e,
  { during: i, start: s, end: r } = {},
  n = () => {},
  a = () => {},
) {
  if (
    (t._x_transitioning && t._x_transitioning.cancel(),
    Object.keys(i).length === 0 &&
      Object.keys(s).length === 0 &&
      Object.keys(r).length === 0)
  ) {
    n(), a();
    return;
  }
  let l, o, f;
  dn(t, {
    start() {
      l = e(t, s);
    },
    during() {
      o = e(t, i);
    },
    before: n,
    end() {
      l(), (f = e(t, r));
    },
    after: a,
    cleanup() {
      o(), f();
    },
  });
}
function dn(t, e) {
  let i,
    s,
    r,
    n = Zt(() => {
      Y(() => {
        (i = !0),
          s || e.before(),
          r || (e.end(), Jt()),
          e.after(),
          t.isConnected && e.cleanup(),
          delete t._x_transitioning;
      });
    });
  (t._x_transitioning = {
    beforeCancels: [],
    beforeCancel(a) {
      this.beforeCancels.push(a);
    },
    cancel: Zt(function () {
      for (; this.beforeCancels.length; ) this.beforeCancels.shift()();
      n();
    }),
    finish: n,
  }),
    Y(() => {
      e.start(), e.during();
    }),
    tn(),
    requestAnimationFrame(() => {
      if (i) return;
      let a =
          Number(
            getComputedStyle(t)
              .transitionDuration.replace(/,.*/, '')
              .replace('s', ''),
          ) * 1e3,
        l =
          Number(
            getComputedStyle(t)
              .transitionDelay.replace(/,.*/, '')
              .replace('s', ''),
          ) * 1e3;
      a === 0 &&
        (a =
          Number(getComputedStyle(t).animationDuration.replace('s', '')) * 1e3),
        Y(() => {
          e.before();
        }),
        (s = !0),
        requestAnimationFrame(() => {
          i ||
            (Y(() => {
              e.end();
            }),
            Jt(),
            setTimeout(t._x_transitioning.finish, a + l),
            (r = !0));
        });
    });
}
function He(t, e, i) {
  if (t.indexOf(e) === -1) return i;
  const s = t[t.indexOf(e) + 1];
  if (!s || (e === 'scale' && isNaN(s))) return i;
  if (e === 'duration' || e === 'delay') {
    let r = s.match(/([0-9]+)ms/);
    if (r) return r[1];
  }
  return e === 'origin' &&
    ['top', 'right', 'left', 'center', 'bottom'].includes(t[t.indexOf(e) + 2])
    ? [s, t[t.indexOf(e) + 2]].join(' ')
    : s;
}
var fe = !1;
function me(t, e = () => {}) {
  return (...i) => (fe ? e(...i) : t(...i));
}
function cn(t) {
  return (...e) => fe && t(...e);
}
var Bs = [];
function yt(t) {
  Bs.push(t);
}
function un(t, e) {
  Bs.forEach((i) => i(t, e)),
    (fe = !0),
    Hs(() => {
      le(e, (i, s) => {
        s(i, () => {});
      });
    }),
    (fe = !1);
}
var ei = !1;
function fn(t, e) {
  e._x_dataStack || (e._x_dataStack = t._x_dataStack),
    (fe = !0),
    (ei = !0),
    Hs(() => {
      pn(e);
    }),
    (fe = !1),
    (ei = !1);
}
function pn(t) {
  let e = !1;
  le(t, (s, r) => {
    Ee(s, (n, a) => {
      if (e && Zr(n)) return a();
      (e = !0), r(n, a);
    });
  });
}
function Hs(t) {
  let e = Me;
  Hi((i, s) => {
    let r = e(i);
    return Oe(r), () => {};
  }),
    t(),
    Hi(e);
}
function Ns(t, e, i, s = []) {
  switch (
    (t._x_bindings || (t._x_bindings = Ie({})),
    (t._x_bindings[e] = i),
    (e = s.includes('camel') ? xn(e) : e),
    e)
  ) {
    case 'value':
      mn(t, i);
      break;
    case 'style':
      gn(t, i);
      break;
    case 'class':
      hn(t, i);
      break;
    case 'selected':
    case 'checked':
      vn(t, e, i);
      break;
    default:
      Gs(t, e, i);
      break;
  }
}
function mn(t, e) {
  if (Xs(t))
    t.attributes.value === void 0 && (t.value = e),
      window.fromModel &&
        (typeof e == 'boolean'
          ? (t.checked = dt(t.value) === e)
          : (t.checked = Fi(t.value, e)));
  else if (xi(t))
    Number.isInteger(e)
      ? (t.value = e)
      : !Array.isArray(e) &&
        typeof e != 'boolean' &&
        ![null, void 0].includes(e)
      ? (t.value = String(e))
      : Array.isArray(e)
      ? (t.checked = e.some((i) => Fi(i, t.value)))
      : (t.checked = !!e);
  else if (t.tagName === 'SELECT') bn(t, e);
  else {
    if (t.value === e) return;
    t.value = e === void 0 ? '' : e;
  }
}
function hn(t, e) {
  t._x_undoAddedClasses && t._x_undoAddedClasses(),
    (t._x_undoAddedClasses = bi(t, e));
}
function gn(t, e) {
  t._x_undoAddedStyles && t._x_undoAddedStyles(),
    (t._x_undoAddedStyles = wt(t, e));
}
function vn(t, e, i) {
  Gs(t, e, i), yn(t, e, i);
}
function Gs(t, e, i) {
  [null, void 0, !1].includes(i) && En(e)
    ? t.removeAttribute(e)
    : (Fs(e) && (i = e), wn(t, e, i));
}
function wn(t, e, i) {
  t.getAttribute(e) != i && t.setAttribute(e, i);
}
function yn(t, e, i) {
  t[e] !== i && (t[e] = i);
}
function bn(t, e) {
  const i = [].concat(e).map((s) => s + '');
  Array.from(t.options).forEach((s) => {
    s.selected = i.includes(s.value);
  });
}
function xn(t) {
  return t.toLowerCase().replace(/-(\w)/g, (e, i) => i.toUpperCase());
}
function Fi(t, e) {
  return t == e;
}
function dt(t) {
  return [1, '1', 'true', 'on', 'yes', !0].includes(t)
    ? !0
    : [0, '0', 'false', 'off', 'no', !1].includes(t)
    ? !1
    : t
    ? !!t
    : null;
}
var Sn = new Set([
  'allowfullscreen',
  'async',
  'autofocus',
  'autoplay',
  'checked',
  'controls',
  'default',
  'defer',
  'disabled',
  'formnovalidate',
  'inert',
  'ismap',
  'itemscope',
  'loop',
  'multiple',
  'muted',
  'nomodule',
  'novalidate',
  'open',
  'playsinline',
  'readonly',
  'required',
  'reversed',
  'selected',
  'shadowrootclonable',
  'shadowrootdelegatesfocus',
  'shadowrootserializable',
]);
function Fs(t) {
  return Sn.has(t);
}
function En(t) {
  return ![
    'aria-pressed',
    'aria-checked',
    'aria-expanded',
    'aria-selected',
  ].includes(t);
}
function Tn(t, e, i) {
  return t._x_bindings && t._x_bindings[e] !== void 0
    ? t._x_bindings[e]
    : Vs(t, e, i);
}
function Mn(t, e, i, s = !0) {
  if (t._x_bindings && t._x_bindings[e] !== void 0) return t._x_bindings[e];
  if (t._x_inlineBindings && t._x_inlineBindings[e] !== void 0) {
    let r = t._x_inlineBindings[e];
    return (r.extract = s), ws(() => ye(t, r.expression));
  }
  return Vs(t, e, i);
}
function Vs(t, e, i) {
  let s = t.getAttribute(e);
  return s === null
    ? typeof i == 'function'
      ? i()
      : i
    : s === ''
    ? !0
    : Fs(e)
    ? !![e, 'true'].includes(s)
    : s;
}
function xi(t) {
  return (
    t.type === 'checkbox' ||
    t.localName === 'ui-checkbox' ||
    t.localName === 'ui-switch'
  );
}
function Xs(t) {
  return t.type === 'radio' || t.localName === 'ui-radio';
}
function Ys(t, e) {
  var i;
  return function () {
    var s = this,
      r = arguments,
      n = function () {
        (i = null), t.apply(s, r);
      };
    clearTimeout(i), (i = setTimeout(n, e));
  };
}
function js(t, e) {
  let i;
  return function () {
    let s = this,
      r = arguments;
    i || (t.apply(s, r), (i = !0), setTimeout(() => (i = !1), e));
  };
}
function Ws({ get: t, set: e }, { get: i, set: s }) {
  let r = !0,
    n,
    a = Me(() => {
      let l = t(),
        o = i();
      if (r) s(It(l)), (r = !1);
      else {
        let f = JSON.stringify(l),
          c = JSON.stringify(o);
        f !== n ? s(It(l)) : f !== c && e(It(o));
      }
      (n = JSON.stringify(t())), JSON.stringify(i());
    });
  return () => {
    Oe(a);
  };
}
function It(t) {
  return typeof t == 'object' ? JSON.parse(JSON.stringify(t)) : t;
}
function _n(t) {
  (Array.isArray(t) ? t : [t]).forEach((i) => i(Ze));
}
var ge = {},
  Vi = !1;
function Cn(t, e) {
  if ((Vi || ((ge = Ie(ge)), (Vi = !0)), e === void 0)) return ge[t];
  (ge[t] = e),
    hs(ge[t]),
    typeof e == 'object' &&
      e !== null &&
      e.hasOwnProperty('init') &&
      typeof e.init == 'function' &&
      ge[t].init();
}
function Pn() {
  return ge;
}
var qs = {};
function An(t, e) {
  let i = typeof e != 'function' ? () => e : e;
  return t instanceof Element ? Ks(t, i()) : ((qs[t] = i), () => {});
}
function Ln(t) {
  return (
    Object.entries(qs).forEach(([e, i]) => {
      Object.defineProperty(t, e, {
        get() {
          return (...s) => i(...s);
        },
      });
    }),
    t
  );
}
function Ks(t, e, i) {
  let s = [];
  for (; s.length; ) s.pop()();
  let r = Object.entries(e).map(([a, l]) => ({ name: a, value: l })),
    n = xs(r);
  return (
    (r = r.map((a) =>
      n.find((l) => l.name === a.name)
        ? { name: `x-bind:${a.name}`, value: `"${a.value}"` }
        : a,
    )),
    hi(t, r, i).map((a) => {
      s.push(a.runCleanups), a();
    }),
    () => {
      for (; s.length; ) s.pop()();
    }
  );
}
var Us = {};
function In(t, e) {
  Us[t] = e;
}
function On(t, e) {
  return (
    Object.entries(Us).forEach(([i, s]) => {
      Object.defineProperty(t, i, {
        get() {
          return (...r) => s.bind(e)(...r);
        },
        enumerable: !1,
      });
    }),
    t
  );
}
var $n = {
    get reactive() {
      return Ie;
    },
    get release() {
      return Oe;
    },
    get effect() {
      return Me;
    },
    get raw() {
      return ns;
    },
    version: '3.14.3',
    flushAndStopDeferringMutations: Dr,
    dontAutoEvaluateFunctions: ws,
    disableEffectScheduling: Pr,
    startObservingMutations: ui,
    stopObservingMutations: ps,
    setReactivityEngine: Ar,
    onAttributeRemoved: us,
    onAttributesAdded: cs,
    closestDataStack: Pe,
    skipDuringClone: me,
    onlyDuringClone: cn,
    addRootSelector: $s,
    addInitSelector: zs,
    interceptClone: yt,
    addScopeToNode: Ke,
    deferMutations: zr,
    mapAttributes: gi,
    evaluateLater: J,
    interceptInit: Qr,
    setEvaluator: Gr,
    mergeProxies: Ue,
    extractProp: Mn,
    findClosest: Je,
    onElRemoved: li,
    closestRoot: vt,
    destroyTree: ze,
    interceptor: gs,
    transition: Qt,
    setStyles: wt,
    mutateDom: Y,
    directive: W,
    entangle: Ws,
    throttle: js,
    debounce: Ys,
    evaluate: ye,
    initTree: le,
    nextTick: yi,
    prefixed: $e,
    prefix: Yr,
    plugin: _n,
    magic: re,
    store: Cn,
    start: Jr,
    clone: fn,
    cloneNode: un,
    bound: Tn,
    $data: ms,
    watch: as,
    walk: Ee,
    data: In,
    bind: An,
  },
  Ze = $n;
function zn(t, e) {
  const i = Object.create(null),
    s = t.split(',');
  for (let r = 0; r < s.length; r++) i[s[r]] = !0;
  return e ? (r) => !!i[r.toLowerCase()] : (r) => !!i[r];
}
var Dn = Object.freeze({}),
  kn = Object.prototype.hasOwnProperty,
  bt = (t, e) => kn.call(t, e),
  be = Array.isArray,
  Ye = (t) => Js(t) === '[object Map]',
  Rn = (t) => typeof t == 'string',
  Si = (t) => typeof t == 'symbol',
  xt = (t) => t !== null && typeof t == 'object',
  Bn = Object.prototype.toString,
  Js = (t) => Bn.call(t),
  Zs = (t) => Js(t).slice(8, -1),
  Ei = (t) =>
    Rn(t) && t !== 'NaN' && t[0] !== '-' && '' + parseInt(t, 10) === t,
  Hn = (t) => {
    const e = Object.create(null);
    return (i) => e[i] || (e[i] = t(i));
  },
  Nn = Hn((t) => t.charAt(0).toUpperCase() + t.slice(1)),
  Qs = (t, e) => t !== e && (t === t || e === e),
  ti = new WeakMap(),
  Ne = [],
  ne,
  xe = Symbol('iterate'),
  ii = Symbol('Map key iterate');
function Gn(t) {
  return t && t._isEffect === !0;
}
function Fn(t, e = Dn) {
  Gn(t) && (t = t.raw);
  const i = Yn(t, e);
  return e.lazy || i(), i;
}
function Vn(t) {
  t.active && (er(t), t.options.onStop && t.options.onStop(), (t.active = !1));
}
var Xn = 0;
function Yn(t, e) {
  const i = function () {
    if (!i.active) return t();
    if (!Ne.includes(i)) {
      er(i);
      try {
        return Wn(), Ne.push(i), (ne = i), t();
      } finally {
        Ne.pop(), tr(), (ne = Ne[Ne.length - 1]);
      }
    }
  };
  return (
    (i.id = Xn++),
    (i.allowRecurse = !!e.allowRecurse),
    (i._isEffect = !0),
    (i.active = !0),
    (i.raw = t),
    (i.deps = []),
    (i.options = e),
    i
  );
}
function er(t) {
  const { deps: e } = t;
  if (e.length) {
    for (let i = 0; i < e.length; i++) e[i].delete(t);
    e.length = 0;
  }
}
var Ae = !0,
  Ti = [];
function jn() {
  Ti.push(Ae), (Ae = !1);
}
function Wn() {
  Ti.push(Ae), (Ae = !0);
}
function tr() {
  const t = Ti.pop();
  Ae = t === void 0 ? !0 : t;
}
function se(t, e, i) {
  if (!Ae || ne === void 0) return;
  let s = ti.get(t);
  s || ti.set(t, (s = new Map()));
  let r = s.get(i);
  r || s.set(i, (r = new Set())),
    r.has(ne) ||
      (r.add(ne),
      ne.deps.push(r),
      ne.options.onTrack &&
        ne.options.onTrack({ effect: ne, target: t, type: e, key: i }));
}
function pe(t, e, i, s, r, n) {
  const a = ti.get(t);
  if (!a) return;
  const l = new Set(),
    o = (c) => {
      c &&
        c.forEach((d) => {
          (d !== ne || d.allowRecurse) && l.add(d);
        });
    };
  if (e === 'clear') a.forEach(o);
  else if (i === 'length' && be(t))
    a.forEach((c, d) => {
      (d === 'length' || d >= s) && o(c);
    });
  else
    switch ((i !== void 0 && o(a.get(i)), e)) {
      case 'add':
        be(t)
          ? Ei(i) && o(a.get('length'))
          : (o(a.get(xe)), Ye(t) && o(a.get(ii)));
        break;
      case 'delete':
        be(t) || (o(a.get(xe)), Ye(t) && o(a.get(ii)));
        break;
      case 'set':
        Ye(t) && o(a.get(xe));
        break;
    }
  const f = (c) => {
    c.options.onTrigger &&
      c.options.onTrigger({
        effect: c,
        target: t,
        key: i,
        type: e,
        newValue: s,
        oldValue: r,
        oldTarget: n,
      }),
      c.options.scheduler ? c.options.scheduler(c) : c();
  };
  l.forEach(f);
}
var qn = zn('__proto__,__v_isRef,__isVue'),
  ir = new Set(
    Object.getOwnPropertyNames(Symbol)
      .map((t) => Symbol[t])
      .filter(Si),
  ),
  Kn = sr(),
  Un = sr(!0),
  Xi = Jn();
function Jn() {
  const t = {};
  return (
    ['includes', 'indexOf', 'lastIndexOf'].forEach((e) => {
      t[e] = function (...i) {
        const s = X(this);
        for (let n = 0, a = this.length; n < a; n++) se(s, 'get', n + '');
        const r = s[e](...i);
        return r === -1 || r === !1 ? s[e](...i.map(X)) : r;
      };
    }),
    ['push', 'pop', 'shift', 'unshift', 'splice'].forEach((e) => {
      t[e] = function (...i) {
        jn();
        const s = X(this)[e].apply(this, i);
        return tr(), s;
      };
    }),
    t
  );
}
function sr(t = !1, e = !1) {
  return function (s, r, n) {
    if (r === '__v_isReactive') return !t;
    if (r === '__v_isReadonly') return t;
    if (r === '__v_raw' && n === (t ? (e ? pa : or) : e ? fa : ar).get(s))
      return s;
    const a = be(s);
    if (!t && a && bt(Xi, r)) return Reflect.get(Xi, r, n);
    const l = Reflect.get(s, r, n);
    return (Si(r) ? ir.has(r) : qn(r)) || (t || se(s, 'get', r), e)
      ? l
      : si(l)
      ? !a || !Ei(r)
        ? l.value
        : l
      : xt(l)
      ? t
        ? lr(l)
        : Pi(l)
      : l;
  };
}
var Zn = Qn();
function Qn(t = !1) {
  return function (i, s, r, n) {
    let a = i[s];
    if (!t && ((r = X(r)), (a = X(a)), !be(i) && si(a) && !si(r)))
      return (a.value = r), !0;
    const l = be(i) && Ei(s) ? Number(s) < i.length : bt(i, s),
      o = Reflect.set(i, s, r, n);
    return (
      i === X(n) &&
        (l ? Qs(r, a) && pe(i, 'set', s, r, a) : pe(i, 'add', s, r)),
      o
    );
  };
}
function ea(t, e) {
  const i = bt(t, e),
    s = t[e],
    r = Reflect.deleteProperty(t, e);
  return r && i && pe(t, 'delete', e, void 0, s), r;
}
function ta(t, e) {
  const i = Reflect.has(t, e);
  return (!Si(e) || !ir.has(e)) && se(t, 'has', e), i;
}
function ia(t) {
  return se(t, 'iterate', be(t) ? 'length' : xe), Reflect.ownKeys(t);
}
var sa = { get: Kn, set: Zn, deleteProperty: ea, has: ta, ownKeys: ia },
  ra = {
    get: Un,
    set(t, e) {
      return (
        console.warn(
          `Set operation on key "${String(e)}" failed: target is readonly.`,
          t,
        ),
        !0
      );
    },
    deleteProperty(t, e) {
      return (
        console.warn(
          `Delete operation on key "${String(e)}" failed: target is readonly.`,
          t,
        ),
        !0
      );
    },
  },
  Mi = (t) => (xt(t) ? Pi(t) : t),
  _i = (t) => (xt(t) ? lr(t) : t),
  Ci = (t) => t,
  St = (t) => Reflect.getPrototypeOf(t);
function st(t, e, i = !1, s = !1) {
  t = t.__v_raw;
  const r = X(t),
    n = X(e);
  e !== n && !i && se(r, 'get', e), !i && se(r, 'get', n);
  const { has: a } = St(r),
    l = s ? Ci : i ? _i : Mi;
  if (a.call(r, e)) return l(t.get(e));
  if (a.call(r, n)) return l(t.get(n));
  t !== r && t.get(e);
}
function rt(t, e = !1) {
  const i = this.__v_raw,
    s = X(i),
    r = X(t);
  return (
    t !== r && !e && se(s, 'has', t),
    !e && se(s, 'has', r),
    t === r ? i.has(t) : i.has(t) || i.has(r)
  );
}
function nt(t, e = !1) {
  return (
    (t = t.__v_raw), !e && se(X(t), 'iterate', xe), Reflect.get(t, 'size', t)
  );
}
function Yi(t) {
  t = X(t);
  const e = X(this);
  return St(e).has.call(e, t) || (e.add(t), pe(e, 'add', t, t)), this;
}
function ji(t, e) {
  e = X(e);
  const i = X(this),
    { has: s, get: r } = St(i);
  let n = s.call(i, t);
  n ? nr(i, s, t) : ((t = X(t)), (n = s.call(i, t)));
  const a = r.call(i, t);
  return (
    i.set(t, e),
    n ? Qs(e, a) && pe(i, 'set', t, e, a) : pe(i, 'add', t, e),
    this
  );
}
function Wi(t) {
  const e = X(this),
    { has: i, get: s } = St(e);
  let r = i.call(e, t);
  r ? nr(e, i, t) : ((t = X(t)), (r = i.call(e, t)));
  const n = s ? s.call(e, t) : void 0,
    a = e.delete(t);
  return r && pe(e, 'delete', t, void 0, n), a;
}
function qi() {
  const t = X(this),
    e = t.size !== 0,
    i = Ye(t) ? new Map(t) : new Set(t),
    s = t.clear();
  return e && pe(t, 'clear', void 0, void 0, i), s;
}
function at(t, e) {
  return function (s, r) {
    const n = this,
      a = n.__v_raw,
      l = X(a),
      o = e ? Ci : t ? _i : Mi;
    return (
      !t && se(l, 'iterate', xe), a.forEach((f, c) => s.call(r, o(f), o(c), n))
    );
  };
}
function ot(t, e, i) {
  return function (...s) {
    const r = this.__v_raw,
      n = X(r),
      a = Ye(n),
      l = t === 'entries' || (t === Symbol.iterator && a),
      o = t === 'keys' && a,
      f = r[t](...s),
      c = i ? Ci : e ? _i : Mi;
    return (
      !e && se(n, 'iterate', o ? ii : xe),
      {
        next() {
          const { value: d, done: u } = f.next();
          return u
            ? { value: d, done: u }
            : { value: l ? [c(d[0]), c(d[1])] : c(d), done: u };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function de(t) {
  return function (...e) {
    {
      const i = e[0] ? `on key "${e[0]}" ` : '';
      console.warn(
        `${Nn(t)} operation ${i}failed: target is readonly.`,
        X(this),
      );
    }
    return t === 'delete' ? !1 : this;
  };
}
function na() {
  const t = {
      get(n) {
        return st(this, n);
      },
      get size() {
        return nt(this);
      },
      has: rt,
      add: Yi,
      set: ji,
      delete: Wi,
      clear: qi,
      forEach: at(!1, !1),
    },
    e = {
      get(n) {
        return st(this, n, !1, !0);
      },
      get size() {
        return nt(this);
      },
      has: rt,
      add: Yi,
      set: ji,
      delete: Wi,
      clear: qi,
      forEach: at(!1, !0),
    },
    i = {
      get(n) {
        return st(this, n, !0);
      },
      get size() {
        return nt(this, !0);
      },
      has(n) {
        return rt.call(this, n, !0);
      },
      add: de('add'),
      set: de('set'),
      delete: de('delete'),
      clear: de('clear'),
      forEach: at(!0, !1),
    },
    s = {
      get(n) {
        return st(this, n, !0, !0);
      },
      get size() {
        return nt(this, !0);
      },
      has(n) {
        return rt.call(this, n, !0);
      },
      add: de('add'),
      set: de('set'),
      delete: de('delete'),
      clear: de('clear'),
      forEach: at(!0, !0),
    };
  return (
    ['keys', 'values', 'entries', Symbol.iterator].forEach((n) => {
      (t[n] = ot(n, !1, !1)),
        (i[n] = ot(n, !0, !1)),
        (e[n] = ot(n, !1, !0)),
        (s[n] = ot(n, !0, !0));
    }),
    [t, i, e, s]
  );
}
var [aa, oa, la, da] = na();
function rr(t, e) {
  const i = e ? (t ? da : la) : t ? oa : aa;
  return (s, r, n) =>
    r === '__v_isReactive'
      ? !t
      : r === '__v_isReadonly'
      ? t
      : r === '__v_raw'
      ? s
      : Reflect.get(bt(i, r) && r in s ? i : s, r, n);
}
var ca = { get: rr(!1, !1) },
  ua = { get: rr(!0, !1) };
function nr(t, e, i) {
  const s = X(i);
  if (s !== i && e.call(t, s)) {
    const r = Zs(t);
    console.warn(
      `Reactive ${r} contains both the raw and reactive versions of the same object${
        r === 'Map' ? ' as keys' : ''
      }, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`,
    );
  }
}
var ar = new WeakMap(),
  fa = new WeakMap(),
  or = new WeakMap(),
  pa = new WeakMap();
function ma(t) {
  switch (t) {
    case 'Object':
    case 'Array':
      return 1;
    case 'Map':
    case 'Set':
    case 'WeakMap':
    case 'WeakSet':
      return 2;
    default:
      return 0;
  }
}
function ha(t) {
  return t.__v_skip || !Object.isExtensible(t) ? 0 : ma(Zs(t));
}
function Pi(t) {
  return t && t.__v_isReadonly ? t : dr(t, !1, sa, ca, ar);
}
function lr(t) {
  return dr(t, !0, ra, ua, or);
}
function dr(t, e, i, s, r) {
  if (!xt(t))
    return console.warn(`value cannot be made reactive: ${String(t)}`), t;
  if (t.__v_raw && !(e && t.__v_isReactive)) return t;
  const n = r.get(t);
  if (n) return n;
  const a = ha(t);
  if (a === 0) return t;
  const l = new Proxy(t, a === 2 ? s : i);
  return r.set(t, l), l;
}
function X(t) {
  return (t && X(t.__v_raw)) || t;
}
function si(t) {
  return !!(t && t.__v_isRef === !0);
}
re('nextTick', () => yi);
re('dispatch', (t) => Xe.bind(Xe, t));
re('watch', (t, { evaluateLater: e, cleanup: i }) => (s, r) => {
  let n = e(s),
    l = as(() => {
      let o;
      return n((f) => (o = f)), o;
    }, r);
  i(l);
});
re('store', Pn);
re('data', (t) => ms(t));
re('root', (t) => vt(t));
re(
  'refs',
  (t) => (t._x_refs_proxy || (t._x_refs_proxy = Ue(ga(t))), t._x_refs_proxy),
);
function ga(t) {
  let e = [];
  return (
    Je(t, (i) => {
      i._x_refs && e.push(i._x_refs);
    }),
    e
  );
}
var Ot = {};
function cr(t) {
  return Ot[t] || (Ot[t] = 0), ++Ot[t];
}
function va(t, e) {
  return Je(t, (i) => {
    if (i._x_ids && i._x_ids[e]) return !0;
  });
}
function wa(t, e) {
  t._x_ids || (t._x_ids = {}), t._x_ids[e] || (t._x_ids[e] = cr(e));
}
re('id', (t, { cleanup: e }) => (i, s = null) => {
  let r = `${i}${s ? `-${s}` : ''}`;
  return ya(t, r, e, () => {
    let n = va(t, i),
      a = n ? n._x_ids[i] : cr(i);
    return s ? `${i}-${a}-${s}` : `${i}-${a}`;
  });
});
yt((t, e) => {
  t._x_id && (e._x_id = t._x_id);
});
function ya(t, e, i, s) {
  if ((t._x_id || (t._x_id = {}), t._x_id[e])) return t._x_id[e];
  let r = s();
  return (
    (t._x_id[e] = r),
    i(() => {
      delete t._x_id[e];
    }),
    r
  );
}
re('el', (t) => t);
ur('Focus', 'focus', 'focus');
ur('Persist', 'persist', 'persist');
function ur(t, e, i) {
  re(e, (s) =>
    ie(
      `You can't use [$${e}] without first installing the "${t}" plugin here: https://alpinejs.dev/plugins/${i}`,
      s,
    ),
  );
}
W(
  'modelable',
  (t, { expression: e }, { effect: i, evaluateLater: s, cleanup: r }) => {
    let n = s(e),
      a = () => {
        let c;
        return n((d) => (c = d)), c;
      },
      l = s(`${e} = __placeholder`),
      o = (c) => l(() => {}, { scope: { __placeholder: c } }),
      f = a();
    o(f),
      queueMicrotask(() => {
        if (!t._x_model) return;
        t._x_removeModelListeners.default();
        let c = t._x_model.get,
          d = t._x_model.set,
          u = Ws(
            {
              get() {
                return c();
              },
              set(m) {
                d(m);
              },
            },
            {
              get() {
                return a();
              },
              set(m) {
                o(m);
              },
            },
          );
        r(u);
      });
  },
);
W('teleport', (t, { modifiers: e, expression: i }, { cleanup: s }) => {
  t.tagName.toLowerCase() !== 'template' &&
    ie('x-teleport can only be used on a <template> tag', t);
  let r = Ki(i),
    n = t.content.cloneNode(!0).firstElementChild;
  (t._x_teleport = n),
    (n._x_teleportBack = t),
    t.setAttribute('data-teleport-template', !0),
    n.setAttribute('data-teleport-target', !0),
    t._x_forwardEvents &&
      t._x_forwardEvents.forEach((l) => {
        n.addEventListener(l, (o) => {
          o.stopPropagation(), t.dispatchEvent(new o.constructor(o.type, o));
        });
      }),
    Ke(n, {}, t);
  let a = (l, o, f) => {
    f.includes('prepend')
      ? o.parentNode.insertBefore(l, o)
      : f.includes('append')
      ? o.parentNode.insertBefore(l, o.nextSibling)
      : o.appendChild(l);
  };
  Y(() => {
    a(n, r, e),
      me(() => {
        le(n), (n._x_ignore = !0);
      })();
  }),
    (t._x_teleportPutBack = () => {
      let l = Ki(i);
      Y(() => {
        a(t._x_teleport, l, e);
      });
    }),
    s(() =>
      Y(() => {
        n.remove(), ze(n);
      }),
    );
});
var ba = document.createElement('div');
function Ki(t) {
  let e = me(
    () => document.querySelector(t),
    () => ba,
  )();
  return e || ie(`Cannot find x-teleport element for selector: "${t}"`), e;
}
var fr = () => {};
fr.inline = (t, { modifiers: e }, { cleanup: i }) => {
  e.includes('self') ? (t._x_ignoreSelf = !0) : (t._x_ignore = !0),
    i(() => {
      e.includes('self') ? delete t._x_ignoreSelf : delete t._x_ignore;
    });
};
W('ignore', fr);
W(
  'effect',
  me((t, { expression: e }, { effect: i }) => {
    i(J(t, e));
  }),
);
function ri(t, e, i, s) {
  let r = t,
    n = (o) => s(o),
    a = {},
    l = (o, f) => (c) => f(o, c);
  if (
    (i.includes('dot') && (e = xa(e)),
    i.includes('camel') && (e = Sa(e)),
    i.includes('passive') && (a.passive = !0),
    i.includes('capture') && (a.capture = !0),
    i.includes('window') && (r = window),
    i.includes('document') && (r = document),
    i.includes('debounce'))
  ) {
    let o = i[i.indexOf('debounce') + 1] || 'invalid-wait',
      f = mt(o.split('ms')[0]) ? Number(o.split('ms')[0]) : 250;
    n = Ys(n, f);
  }
  if (i.includes('throttle')) {
    let o = i[i.indexOf('throttle') + 1] || 'invalid-wait',
      f = mt(o.split('ms')[0]) ? Number(o.split('ms')[0]) : 250;
    n = js(n, f);
  }
  return (
    i.includes('prevent') &&
      (n = l(n, (o, f) => {
        f.preventDefault(), o(f);
      })),
    i.includes('stop') &&
      (n = l(n, (o, f) => {
        f.stopPropagation(), o(f);
      })),
    i.includes('once') &&
      (n = l(n, (o, f) => {
        o(f), r.removeEventListener(e, n, a);
      })),
    (i.includes('away') || i.includes('outside')) &&
      ((r = document),
      (n = l(n, (o, f) => {
        t.contains(f.target) ||
          (f.target.isConnected !== !1 &&
            ((t.offsetWidth < 1 && t.offsetHeight < 1) ||
              (t._x_isShown !== !1 && o(f))));
      }))),
    i.includes('self') &&
      (n = l(n, (o, f) => {
        f.target === t && o(f);
      })),
    (Ta(e) || pr(e)) &&
      (n = l(n, (o, f) => {
        Ma(f, i) || o(f);
      })),
    r.addEventListener(e, n, a),
    () => {
      r.removeEventListener(e, n, a);
    }
  );
}
function xa(t) {
  return t.replace(/-/g, '.');
}
function Sa(t) {
  return t.toLowerCase().replace(/-(\w)/g, (e, i) => i.toUpperCase());
}
function mt(t) {
  return !Array.isArray(t) && !isNaN(t);
}
function Ea(t) {
  return [' ', '_'].includes(t)
    ? t
    : t
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/[_\s]/, '-')
        .toLowerCase();
}
function Ta(t) {
  return ['keydown', 'keyup'].includes(t);
}
function pr(t) {
  return ['contextmenu', 'click', 'mouse'].some((e) => t.includes(e));
}
function Ma(t, e) {
  let i = e.filter(
    (n) =>
      ![
        'window',
        'document',
        'prevent',
        'stop',
        'once',
        'capture',
        'self',
        'away',
        'outside',
        'passive',
      ].includes(n),
  );
  if (i.includes('debounce')) {
    let n = i.indexOf('debounce');
    i.splice(n, mt((i[n + 1] || 'invalid-wait').split('ms')[0]) ? 2 : 1);
  }
  if (i.includes('throttle')) {
    let n = i.indexOf('throttle');
    i.splice(n, mt((i[n + 1] || 'invalid-wait').split('ms')[0]) ? 2 : 1);
  }
  if (i.length === 0 || (i.length === 1 && Ui(t.key).includes(i[0]))) return !1;
  const r = ['ctrl', 'shift', 'alt', 'meta', 'cmd', 'super'].filter((n) =>
    i.includes(n),
  );
  return (
    (i = i.filter((n) => !r.includes(n))),
    !(
      r.length > 0 &&
      r.filter(
        (a) => ((a === 'cmd' || a === 'super') && (a = 'meta'), t[`${a}Key`]),
      ).length === r.length &&
      (pr(t.type) || Ui(t.key).includes(i[0]))
    )
  );
}
function Ui(t) {
  if (!t) return [];
  t = Ea(t);
  let e = {
    ctrl: 'control',
    slash: '/',
    space: ' ',
    spacebar: ' ',
    cmd: 'meta',
    esc: 'escape',
    up: 'arrow-up',
    down: 'arrow-down',
    left: 'arrow-left',
    right: 'arrow-right',
    period: '.',
    comma: ',',
    equal: '=',
    minus: '-',
    underscore: '_',
  };
  return (
    (e[t] = t),
    Object.keys(e)
      .map((i) => {
        if (e[i] === t) return i;
      })
      .filter((i) => i)
  );
}
W('model', (t, { modifiers: e, expression: i }, { effect: s, cleanup: r }) => {
  let n = t;
  e.includes('parent') && (n = t.parentNode);
  let a = J(n, i),
    l;
  typeof i == 'string'
    ? (l = J(n, `${i} = __placeholder`))
    : typeof i == 'function' && typeof i() == 'string'
    ? (l = J(n, `${i()} = __placeholder`))
    : (l = () => {});
  let o = () => {
      let u;
      return a((m) => (u = m)), Ji(u) ? u.get() : u;
    },
    f = (u) => {
      let m;
      a((v) => (m = v)),
        Ji(m) ? m.set(u) : l(() => {}, { scope: { __placeholder: u } });
    };
  typeof i == 'string' &&
    t.type === 'radio' &&
    Y(() => {
      t.hasAttribute('name') || t.setAttribute('name', i);
    });
  var c =
    t.tagName.toLowerCase() === 'select' ||
    ['checkbox', 'radio'].includes(t.type) ||
    e.includes('lazy')
      ? 'change'
      : 'input';
  let d = fe
    ? () => {}
    : ri(t, c, e, (u) => {
        f($t(t, e, u, o()));
      });
  if (
    (e.includes('fill') &&
      ([void 0, null, ''].includes(o()) ||
        (xi(t) && Array.isArray(o())) ||
        (t.tagName.toLowerCase() === 'select' && t.multiple)) &&
      f($t(t, e, { target: t }, o())),
    t._x_removeModelListeners || (t._x_removeModelListeners = {}),
    (t._x_removeModelListeners.default = d),
    r(() => t._x_removeModelListeners.default()),
    t.form)
  ) {
    let u = ri(t.form, 'reset', [], (m) => {
      yi(() => t._x_model && t._x_model.set($t(t, e, { target: t }, o())));
    });
    r(() => u());
  }
  (t._x_model = {
    get() {
      return o();
    },
    set(u) {
      f(u);
    },
  }),
    (t._x_forceModelUpdate = (u) => {
      u === void 0 && typeof i == 'string' && i.match(/\./) && (u = ''),
        (window.fromModel = !0),
        Y(() => Ns(t, 'value', u)),
        delete window.fromModel;
    }),
    s(() => {
      let u = o();
      (e.includes('unintrusive') && document.activeElement.isSameNode(t)) ||
        t._x_forceModelUpdate(u);
    });
});
function $t(t, e, i, s) {
  return Y(() => {
    if (i instanceof CustomEvent && i.detail !== void 0)
      return i.detail !== null && i.detail !== void 0
        ? i.detail
        : i.target.value;
    if (xi(t))
      if (Array.isArray(s)) {
        let r = null;
        return (
          e.includes('number')
            ? (r = zt(i.target.value))
            : e.includes('boolean')
            ? (r = dt(i.target.value))
            : (r = i.target.value),
          i.target.checked
            ? s.includes(r)
              ? s
              : s.concat([r])
            : s.filter((n) => !_a(n, r))
        );
      } else return i.target.checked;
    else {
      if (t.tagName.toLowerCase() === 'select' && t.multiple)
        return e.includes('number')
          ? Array.from(i.target.selectedOptions).map((r) => {
              let n = r.value || r.text;
              return zt(n);
            })
          : e.includes('boolean')
          ? Array.from(i.target.selectedOptions).map((r) => {
              let n = r.value || r.text;
              return dt(n);
            })
          : Array.from(i.target.selectedOptions).map((r) => r.value || r.text);
      {
        let r;
        return (
          Xs(t)
            ? i.target.checked
              ? (r = i.target.value)
              : (r = s)
            : (r = i.target.value),
          e.includes('number')
            ? zt(r)
            : e.includes('boolean')
            ? dt(r)
            : e.includes('trim')
            ? r.trim()
            : r
        );
      }
    }
  });
}
function zt(t) {
  let e = t ? parseFloat(t) : null;
  return Ca(e) ? e : t;
}
function _a(t, e) {
  return t == e;
}
function Ca(t) {
  return !Array.isArray(t) && !isNaN(t);
}
function Ji(t) {
  return (
    t !== null &&
    typeof t == 'object' &&
    typeof t.get == 'function' &&
    typeof t.set == 'function'
  );
}
W('cloak', (t) =>
  queueMicrotask(() => Y(() => t.removeAttribute($e('cloak')))),
);
zs(() => `[${$e('init')}]`);
W(
  'init',
  me((t, { expression: e }, { evaluate: i }) =>
    typeof e == 'string' ? !!e.trim() && i(e, {}, !1) : i(e, {}, !1),
  ),
);
W('text', (t, { expression: e }, { effect: i, evaluateLater: s }) => {
  let r = s(e);
  i(() => {
    r((n) => {
      Y(() => {
        t.textContent = n;
      });
    });
  });
});
W('html', (t, { expression: e }, { effect: i, evaluateLater: s }) => {
  let r = s(e);
  i(() => {
    r((n) => {
      Y(() => {
        (t.innerHTML = n),
          (t._x_ignoreSelf = !0),
          le(t),
          delete t._x_ignoreSelf;
      });
    });
  });
});
gi(Ts(':', Ms($e('bind:'))));
var mr = (
  t,
  { value: e, modifiers: i, expression: s, original: r },
  { effect: n, cleanup: a },
) => {
  if (!e) {
    let o = {};
    Ln(o),
      J(t, s)(
        (c) => {
          Ks(t, c, r);
        },
        { scope: o },
      );
    return;
  }
  if (e === 'key') return Pa(t, s);
  if (
    t._x_inlineBindings &&
    t._x_inlineBindings[e] &&
    t._x_inlineBindings[e].extract
  )
    return;
  let l = J(t, s);
  n(() =>
    l((o) => {
      o === void 0 && typeof s == 'string' && s.match(/\./) && (o = ''),
        Y(() => Ns(t, e, o, i));
    }),
  ),
    a(() => {
      t._x_undoAddedClasses && t._x_undoAddedClasses(),
        t._x_undoAddedStyles && t._x_undoAddedStyles();
    });
};
mr.inline = (t, { value: e, modifiers: i, expression: s }) => {
  e &&
    (t._x_inlineBindings || (t._x_inlineBindings = {}),
    (t._x_inlineBindings[e] = { expression: s, extract: !1 }));
};
W('bind', mr);
function Pa(t, e) {
  t._x_keyExpression = e;
}
$s(() => `[${$e('data')}]`);
W('data', (t, { expression: e }, { cleanup: i }) => {
  if (Aa(t)) return;
  e = e === '' ? '{}' : e;
  let s = {};
  Wt(s, t);
  let r = {};
  On(r, s);
  let n = ye(t, e, { scope: r });
  (n === void 0 || n === !0) && (n = {}), Wt(n, t);
  let a = Ie(n);
  hs(a);
  let l = Ke(t, a);
  a.init && ye(t, a.init),
    i(() => {
      a.destroy && ye(t, a.destroy), l();
    });
});
yt((t, e) => {
  t._x_dataStack &&
    ((e._x_dataStack = t._x_dataStack),
    e.setAttribute('data-has-alpine-state', !0));
});
function Aa(t) {
  return fe ? (ei ? !0 : t.hasAttribute('data-has-alpine-state')) : !1;
}
W('show', (t, { modifiers: e, expression: i }, { effect: s }) => {
  let r = J(t, i);
  t._x_doHide ||
    (t._x_doHide = () => {
      Y(() => {
        t.style.setProperty(
          'display',
          'none',
          e.includes('important') ? 'important' : void 0,
        );
      });
    }),
    t._x_doShow ||
      (t._x_doShow = () => {
        Y(() => {
          t.style.length === 1 && t.style.display === 'none'
            ? t.removeAttribute('style')
            : t.style.removeProperty('display');
        });
      });
  let n = () => {
      t._x_doHide(), (t._x_isShown = !1);
    },
    a = () => {
      t._x_doShow(), (t._x_isShown = !0);
    },
    l = () => setTimeout(a),
    o = Zt(
      (d) => (d ? a() : n()),
      (d) => {
        typeof t._x_toggleAndCascadeWithTransitions == 'function'
          ? t._x_toggleAndCascadeWithTransitions(t, d, a, n)
          : d
          ? l()
          : n();
      },
    ),
    f,
    c = !0;
  s(() =>
    r((d) => {
      (!c && d === f) ||
        (e.includes('immediate') && (d ? l() : n()), o(d), (f = d), (c = !1));
    }),
  );
});
W('for', (t, { expression: e }, { effect: i, cleanup: s }) => {
  let r = Ia(e),
    n = J(t, r.items),
    a = J(t, t._x_keyExpression || 'index');
  (t._x_prevKeys = []),
    (t._x_lookup = {}),
    i(() => La(t, r, n, a)),
    s(() => {
      Object.values(t._x_lookup).forEach((l) =>
        Y(() => {
          ze(l), l.remove();
        }),
      ),
        delete t._x_prevKeys,
        delete t._x_lookup;
    });
});
function La(t, e, i, s) {
  let r = (a) => typeof a == 'object' && !Array.isArray(a),
    n = t;
  i((a) => {
    Oa(a) && a >= 0 && (a = Array.from(Array(a).keys(), (g) => g + 1)),
      a === void 0 && (a = []);
    let l = t._x_lookup,
      o = t._x_prevKeys,
      f = [],
      c = [];
    if (r(a))
      a = Object.entries(a).map(([g, y]) => {
        let h = Zi(e, y, g, a);
        s(
          (p) => {
            c.includes(p) && ie('Duplicate key on x-for', t), c.push(p);
          },
          { scope: { index: g, ...h } },
        ),
          f.push(h);
      });
    else
      for (let g = 0; g < a.length; g++) {
        let y = Zi(e, a[g], g, a);
        s(
          (h) => {
            c.includes(h) && ie('Duplicate key on x-for', t), c.push(h);
          },
          { scope: { index: g, ...y } },
        ),
          f.push(y);
      }
    let d = [],
      u = [],
      m = [],
      v = [];
    for (let g = 0; g < o.length; g++) {
      let y = o[g];
      c.indexOf(y) === -1 && m.push(y);
    }
    o = o.filter((g) => !m.includes(g));
    let w = 'template';
    for (let g = 0; g < c.length; g++) {
      let y = c[g],
        h = o.indexOf(y);
      if (h === -1) o.splice(g, 0, y), d.push([w, g]);
      else if (h !== g) {
        let p = o.splice(g, 1)[0],
          b = o.splice(h - 1, 1)[0];
        o.splice(g, 0, b), o.splice(h, 0, p), u.push([p, b]);
      } else v.push(y);
      w = y;
    }
    for (let g = 0; g < m.length; g++) {
      let y = m[g];
      y in l &&
        (Y(() => {
          ze(l[y]), l[y].remove();
        }),
        delete l[y]);
    }
    for (let g = 0; g < u.length; g++) {
      let [y, h] = u[g],
        p = l[y],
        b = l[h],
        x = document.createElement('div');
      Y(() => {
        b || ie('x-for ":key" is undefined or invalid', n, h, l),
          b.after(x),
          p.after(b),
          b._x_currentIfEl && b.after(b._x_currentIfEl),
          x.before(p),
          p._x_currentIfEl && p.after(p._x_currentIfEl),
          x.remove();
      }),
        b._x_refreshXForScope(f[c.indexOf(h)]);
    }
    for (let g = 0; g < d.length; g++) {
      let [y, h] = d[g],
        p = y === 'template' ? n : l[y];
      p._x_currentIfEl && (p = p._x_currentIfEl);
      let b = f[h],
        x = c[h],
        A = document.importNode(n.content, !0).firstElementChild,
        $ = Ie(b);
      Ke(A, $, n),
        (A._x_refreshXForScope = (I) => {
          Object.entries(I).forEach(([T, _]) => {
            $[T] = _;
          });
        }),
        Y(() => {
          p.after(A), me(() => le(A))();
        }),
        typeof x == 'object' &&
          ie(
            'x-for key cannot be an object, it must be a string or an integer',
            n,
          ),
        (l[x] = A);
    }
    for (let g = 0; g < v.length; g++)
      l[v[g]]._x_refreshXForScope(f[c.indexOf(v[g])]);
    n._x_prevKeys = c;
  });
}
function Ia(t) {
  let e = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/,
    i = /^\s*\(|\)\s*$/g,
    s = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/,
    r = t.match(s);
  if (!r) return;
  let n = {};
  n.items = r[2].trim();
  let a = r[1].replace(i, '').trim(),
    l = a.match(e);
  return (
    l
      ? ((n.item = a.replace(e, '').trim()),
        (n.index = l[1].trim()),
        l[2] && (n.collection = l[2].trim()))
      : (n.item = a),
    n
  );
}
function Zi(t, e, i, s) {
  let r = {};
  return (
    /^\[.*\]$/.test(t.item) && Array.isArray(e)
      ? t.item
          .replace('[', '')
          .replace(']', '')
          .split(',')
          .map((a) => a.trim())
          .forEach((a, l) => {
            r[a] = e[l];
          })
      : /^\{.*\}$/.test(t.item) && !Array.isArray(e) && typeof e == 'object'
      ? t.item
          .replace('{', '')
          .replace('}', '')
          .split(',')
          .map((a) => a.trim())
          .forEach((a) => {
            r[a] = e[a];
          })
      : (r[t.item] = e),
    t.index && (r[t.index] = i),
    t.collection && (r[t.collection] = s),
    r
  );
}
function Oa(t) {
  return !Array.isArray(t) && !isNaN(t);
}
function hr() {}
hr.inline = (t, { expression: e }, { cleanup: i }) => {
  let s = vt(t);
  s._x_refs || (s._x_refs = {}),
    (s._x_refs[e] = t),
    i(() => delete s._x_refs[e]);
};
W('ref', hr);
W('if', (t, { expression: e }, { effect: i, cleanup: s }) => {
  t.tagName.toLowerCase() !== 'template' &&
    ie('x-if can only be used on a <template> tag', t);
  let r = J(t, e),
    n = () => {
      if (t._x_currentIfEl) return t._x_currentIfEl;
      let l = t.content.cloneNode(!0).firstElementChild;
      return (
        Ke(l, {}, t),
        Y(() => {
          t.after(l), me(() => le(l))();
        }),
        (t._x_currentIfEl = l),
        (t._x_undoIf = () => {
          Y(() => {
            ze(l), l.remove();
          }),
            delete t._x_currentIfEl;
        }),
        l
      );
    },
    a = () => {
      t._x_undoIf && (t._x_undoIf(), delete t._x_undoIf);
    };
  i(() =>
    r((l) => {
      l ? n() : a();
    }),
  ),
    s(() => t._x_undoIf && t._x_undoIf());
});
W('id', (t, { expression: e }, { evaluate: i }) => {
  i(e).forEach((r) => wa(t, r));
});
yt((t, e) => {
  t._x_ids && (e._x_ids = t._x_ids);
});
gi(Ts('@', Ms($e('on:'))));
W(
  'on',
  me((t, { value: e, modifiers: i, expression: s }, { cleanup: r }) => {
    let n = s ? J(t, s) : () => {};
    t.tagName.toLowerCase() === 'template' &&
      (t._x_forwardEvents || (t._x_forwardEvents = []),
      t._x_forwardEvents.includes(e) || t._x_forwardEvents.push(e));
    let a = ri(t, e, i, (l) => {
      n(() => {}, { scope: { $event: l }, params: [l] });
    });
    r(() => a());
  }),
);
Et('Collapse', 'collapse', 'collapse');
Et('Intersect', 'intersect', 'intersect');
Et('Focus', 'trap', 'focus');
Et('Mask', 'mask', 'mask');
function Et(t, e, i) {
  W(e, (s) =>
    ie(
      `You can't use [x-${e}] without first installing the "${t}" plugin here: https://alpinejs.dev/plugins/${i}`,
      s,
    ),
  );
}
Ze.setEvaluator(bs);
Ze.setReactivityEngine({ reactive: Pi, effect: Fn, release: Vn, raw: X });
var $a = Ze,
  gr = $a;
function Qi(t) {
  return (
    t !== null &&
    typeof t == 'object' &&
    'constructor' in t &&
    t.constructor === Object
  );
}
function Ai(t, e) {
  t === void 0 && (t = {}),
    e === void 0 && (e = {}),
    Object.keys(e).forEach((i) => {
      typeof t[i] > 'u'
        ? (t[i] = e[i])
        : Qi(e[i]) &&
          Qi(t[i]) &&
          Object.keys(e[i]).length > 0 &&
          Ai(t[i], e[i]);
    });
}
const vr = {
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
function K() {
  const t = typeof document < 'u' ? document : {};
  return Ai(t, vr), t;
}
const za = {
  document: vr,
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
  requestAnimationFrame(t) {
    return typeof setTimeout > 'u' ? (t(), null) : setTimeout(t, 0);
  },
  cancelAnimationFrame(t) {
    typeof setTimeout > 'u' || clearTimeout(t);
  },
};
function j() {
  const t = typeof window < 'u' ? window : {};
  return Ai(t, za), t;
}
function ce(t) {
  return (
    t === void 0 && (t = ''),
    t
      .trim()
      .split(' ')
      .filter((e) => !!e.trim())
  );
}
function Da(t) {
  const e = t;
  Object.keys(e).forEach((i) => {
    try {
      e[i] = null;
    } catch {}
    try {
      delete e[i];
    } catch {}
  });
}
function Te(t, e) {
  return e === void 0 && (e = 0), setTimeout(t, e);
}
function te() {
  return Date.now();
}
function ka(t) {
  const e = j();
  let i;
  return (
    e.getComputedStyle && (i = e.getComputedStyle(t, null)),
    !i && t.currentStyle && (i = t.currentStyle),
    i || (i = t.style),
    i
  );
}
function ni(t, e) {
  e === void 0 && (e = 'x');
  const i = j();
  let s, r, n;
  const a = ka(t);
  return (
    i.WebKitCSSMatrix
      ? ((r = a.transform || a.webkitTransform),
        r.split(',').length > 6 &&
          (r = r
            .split(', ')
            .map((l) => l.replace(',', '.'))
            .join(', ')),
        (n = new i.WebKitCSSMatrix(r === 'none' ? '' : r)))
      : ((n =
          a.MozTransform ||
          a.OTransform ||
          a.MsTransform ||
          a.msTransform ||
          a.transform ||
          a
            .getPropertyValue('transform')
            .replace('translate(', 'matrix(1, 0, 0, 1,')),
        (s = n.toString().split(','))),
    e === 'x' &&
      (i.WebKitCSSMatrix
        ? (r = n.m41)
        : s.length === 16
        ? (r = parseFloat(s[12]))
        : (r = parseFloat(s[4]))),
    e === 'y' &&
      (i.WebKitCSSMatrix
        ? (r = n.m42)
        : s.length === 16
        ? (r = parseFloat(s[13]))
        : (r = parseFloat(s[5]))),
    r || 0
  );
}
function Fe(t) {
  return (
    typeof t == 'object' &&
    t !== null &&
    t.constructor &&
    Object.prototype.toString.call(t).slice(8, -1) === 'Object'
  );
}
function Ra(t) {
  return typeof window < 'u' && typeof window.HTMLElement < 'u'
    ? t instanceof HTMLElement
    : t && (t.nodeType === 1 || t.nodeType === 11);
}
function Q() {
  const t = Object(arguments.length <= 0 ? void 0 : arguments[0]),
    e = ['__proto__', 'constructor', 'prototype'];
  for (let i = 1; i < arguments.length; i += 1) {
    const s = i < 0 || arguments.length <= i ? void 0 : arguments[i];
    if (s != null && !Ra(s)) {
      const r = Object.keys(Object(s)).filter((n) => e.indexOf(n) < 0);
      for (let n = 0, a = r.length; n < a; n += 1) {
        const l = r[n],
          o = Object.getOwnPropertyDescriptor(s, l);
        o !== void 0 &&
          o.enumerable &&
          (Fe(t[l]) && Fe(s[l])
            ? s[l].__swiper__
              ? (t[l] = s[l])
              : Q(t[l], s[l])
            : !Fe(t[l]) && Fe(s[l])
            ? ((t[l] = {}), s[l].__swiper__ ? (t[l] = s[l]) : Q(t[l], s[l]))
            : (t[l] = s[l]));
      }
    }
  }
  return t;
}
function Ve(t, e, i) {
  t.style.setProperty(e, i);
}
function wr(t) {
  let { swiper: e, targetPosition: i, side: s } = t;
  const r = j(),
    n = -e.translate;
  let a = null,
    l;
  const o = e.params.speed;
  (e.wrapperEl.style.scrollSnapType = 'none'),
    r.cancelAnimationFrame(e.cssModeFrameID);
  const f = i > n ? 'next' : 'prev',
    c = (u, m) => (f === 'next' && u >= m) || (f === 'prev' && u <= m),
    d = () => {
      (l = new Date().getTime()), a === null && (a = l);
      const u = Math.max(Math.min((l - a) / o, 1), 0),
        m = 0.5 - Math.cos(u * Math.PI) / 2;
      let v = n + m * (i - n);
      if ((c(v, i) && (v = i), e.wrapperEl.scrollTo({ [s]: v }), c(v, i))) {
        (e.wrapperEl.style.overflow = 'hidden'),
          (e.wrapperEl.style.scrollSnapType = ''),
          setTimeout(() => {
            (e.wrapperEl.style.overflow = ''), e.wrapperEl.scrollTo({ [s]: v });
          }),
          r.cancelAnimationFrame(e.cssModeFrameID);
        return;
      }
      e.cssModeFrameID = r.requestAnimationFrame(d);
    };
  d();
}
function _e(t) {
  return (
    t.querySelector('.swiper-slide-transform') ||
    (t.shadowRoot && t.shadowRoot.querySelector('.swiper-slide-transform')) ||
    t
  );
}
function q(t, e) {
  e === void 0 && (e = '');
  const i = [...t.children];
  return (
    t instanceof HTMLSlotElement && i.push(...t.assignedElements()),
    e ? i.filter((s) => s.matches(e)) : i
  );
}
function Ba(t, e) {
  const i = e.contains(t);
  return !i && e instanceof HTMLSlotElement
    ? [...e.assignedElements()].includes(t)
    : i;
}
function ht(t) {
  try {
    console.warn(t);
    return;
  } catch {}
}
function ee(t, e) {
  e === void 0 && (e = []);
  const i = document.createElement(t);
  return i.classList.add(...(Array.isArray(e) ? e : ce(e))), i;
}
function gt(t) {
  const e = j(),
    i = K(),
    s = t.getBoundingClientRect(),
    r = i.body,
    n = t.clientTop || r.clientTop || 0,
    a = t.clientLeft || r.clientLeft || 0,
    l = t === e ? e.scrollY : t.scrollTop,
    o = t === e ? e.scrollX : t.scrollLeft;
  return { top: s.top + l - n, left: s.left + o - a };
}
function Ha(t, e) {
  const i = [];
  for (; t.previousElementSibling; ) {
    const s = t.previousElementSibling;
    e ? s.matches(e) && i.push(s) : i.push(s), (t = s);
  }
  return i;
}
function Na(t, e) {
  const i = [];
  for (; t.nextElementSibling; ) {
    const s = t.nextElementSibling;
    e ? s.matches(e) && i.push(s) : i.push(s), (t = s);
  }
  return i;
}
function ue(t, e) {
  return j().getComputedStyle(t, null).getPropertyValue(e);
}
function qe(t) {
  let e = t,
    i;
  if (e) {
    for (i = 0; (e = e.previousSibling) !== null; )
      e.nodeType === 1 && (i += 1);
    return i;
  }
}
function Se(t, e) {
  const i = [];
  let s = t.parentElement;
  for (; s; ) e ? s.matches(e) && i.push(s) : i.push(s), (s = s.parentElement);
  return i;
}
function je(t, e) {
  function i(s) {
    s.target === t && (e.call(t, s), t.removeEventListener('transitionend', i));
  }
  e && t.addEventListener('transitionend', i);
}
function ai(t, e, i) {
  const s = j();
  return i
    ? t[e === 'width' ? 'offsetWidth' : 'offsetHeight'] +
        parseFloat(
          s
            .getComputedStyle(t, null)
            .getPropertyValue(e === 'width' ? 'margin-right' : 'margin-top'),
        ) +
        parseFloat(
          s
            .getComputedStyle(t, null)
            .getPropertyValue(e === 'width' ? 'margin-left' : 'margin-bottom'),
        )
    : t.offsetWidth;
}
function G(t) {
  return (Array.isArray(t) ? t : [t]).filter((e) => !!e);
}
function Tt(t) {
  return (e) =>
    Math.abs(e) > 0 &&
    t.browser &&
    t.browser.need3dFix &&
    Math.abs(e) % 90 === 0
      ? e + 0.001
      : e;
}
let Dt;
function Ga() {
  const t = j(),
    e = K();
  return {
    smoothScroll:
      e.documentElement &&
      e.documentElement.style &&
      'scrollBehavior' in e.documentElement.style,
    touch: !!(
      'ontouchstart' in t ||
      (t.DocumentTouch && e instanceof t.DocumentTouch)
    ),
  };
}
function yr() {
  return Dt || (Dt = Ga()), Dt;
}
let kt;
function Fa(t) {
  let { userAgent: e } = t === void 0 ? {} : t;
  const i = yr(),
    s = j(),
    r = s.navigator.platform,
    n = e || s.navigator.userAgent,
    a = { ios: !1, android: !1 },
    l = s.screen.width,
    o = s.screen.height,
    f = n.match(/(Android);?[\s\/]+([\d.]+)?/);
  let c = n.match(/(iPad).*OS\s([\d_]+)/);
  const d = n.match(/(iPod)(.*OS\s([\d_]+))?/),
    u = !c && n.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
    m = r === 'Win32';
  let v = r === 'MacIntel';
  const w = [
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
    !c &&
      v &&
      i.touch &&
      w.indexOf(`${l}x${o}`) >= 0 &&
      ((c = n.match(/(Version)\/([\d.]+)/)),
      c || (c = [0, 1, '13_0_0']),
      (v = !1)),
    f && !m && ((a.os = 'android'), (a.android = !0)),
    (c || u || d) && ((a.os = 'ios'), (a.ios = !0)),
    a
  );
}
function br(t) {
  return t === void 0 && (t = {}), kt || (kt = Fa(t)), kt;
}
let Rt;
function Va() {
  const t = j(),
    e = br();
  let i = !1;
  function s() {
    const l = t.navigator.userAgent.toLowerCase();
    return (
      l.indexOf('safari') >= 0 &&
      l.indexOf('chrome') < 0 &&
      l.indexOf('android') < 0
    );
  }
  if (s()) {
    const l = String(t.navigator.userAgent);
    if (l.includes('Version/')) {
      const [o, f] = l
        .split('Version/')[1]
        .split(' ')[0]
        .split('.')
        .map((c) => Number(c));
      i = o < 16 || (o === 16 && f < 2);
    }
  }
  const r = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
      t.navigator.userAgent,
    ),
    n = s(),
    a = n || (r && e.ios);
  return {
    isSafari: i || n,
    needPerspectiveFix: i,
    need3dFix: a,
    isWebView: r,
  };
}
function Xa() {
  return Rt || (Rt = Va()), Rt;
}
function Ya(t) {
  let { swiper: e, on: i, emit: s } = t;
  const r = j();
  let n = null,
    a = null;
  const l = () => {
      !e || e.destroyed || !e.initialized || (s('beforeResize'), s('resize'));
    },
    o = () => {
      !e ||
        e.destroyed ||
        !e.initialized ||
        ((n = new ResizeObserver((d) => {
          a = r.requestAnimationFrame(() => {
            const { width: u, height: m } = e;
            let v = u,
              w = m;
            d.forEach((g) => {
              let { contentBoxSize: y, contentRect: h, target: p } = g;
              (p && p !== e.el) ||
                ((v = h ? h.width : (y[0] || y).inlineSize),
                (w = h ? h.height : (y[0] || y).blockSize));
            }),
              (v !== u || w !== m) && l();
          });
        })),
        n.observe(e.el));
    },
    f = () => {
      a && r.cancelAnimationFrame(a),
        n && n.unobserve && e.el && (n.unobserve(e.el), (n = null));
    },
    c = () => {
      !e || e.destroyed || !e.initialized || s('orientationchange');
    };
  i('init', () => {
    if (e.params.resizeObserver && typeof r.ResizeObserver < 'u') {
      o();
      return;
    }
    r.addEventListener('resize', l), r.addEventListener('orientationchange', c);
  }),
    i('destroy', () => {
      f(),
        r.removeEventListener('resize', l),
        r.removeEventListener('orientationchange', c);
    });
}
function ja(t) {
  let { swiper: e, extendParams: i, on: s, emit: r } = t;
  const n = [],
    a = j(),
    l = function (c, d) {
      d === void 0 && (d = {});
      const u = a.MutationObserver || a.WebkitMutationObserver,
        m = new u((v) => {
          if (e.__preventObserver__) return;
          if (v.length === 1) {
            r('observerUpdate', v[0]);
            return;
          }
          const w = function () {
            r('observerUpdate', v[0]);
          };
          a.requestAnimationFrame
            ? a.requestAnimationFrame(w)
            : a.setTimeout(w, 0);
        });
      m.observe(c, {
        attributes: typeof d.attributes > 'u' ? !0 : d.attributes,
        childList: e.isElement || (typeof d.childList > 'u' ? !0 : d).childList,
        characterData: typeof d.characterData > 'u' ? !0 : d.characterData,
      }),
        n.push(m);
    },
    o = () => {
      if (e.params.observer) {
        if (e.params.observeParents) {
          const c = Se(e.hostEl);
          for (let d = 0; d < c.length; d += 1) l(c[d]);
        }
        l(e.hostEl, { childList: e.params.observeSlideChildren }),
          l(e.wrapperEl, { attributes: !1 });
      }
    },
    f = () => {
      n.forEach((c) => {
        c.disconnect();
      }),
        n.splice(0, n.length);
    };
  i({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
    s('init', o),
    s('destroy', f);
}
var Wa = {
  on(t, e, i) {
    const s = this;
    if (!s.eventsListeners || s.destroyed || typeof e != 'function') return s;
    const r = i ? 'unshift' : 'push';
    return (
      t.split(' ').forEach((n) => {
        s.eventsListeners[n] || (s.eventsListeners[n] = []),
          s.eventsListeners[n][r](e);
      }),
      s
    );
  },
  once(t, e, i) {
    const s = this;
    if (!s.eventsListeners || s.destroyed || typeof e != 'function') return s;
    function r() {
      s.off(t, r), r.__emitterProxy && delete r.__emitterProxy;
      for (var n = arguments.length, a = new Array(n), l = 0; l < n; l++)
        a[l] = arguments[l];
      e.apply(s, a);
    }
    return (r.__emitterProxy = e), s.on(t, r, i);
  },
  onAny(t, e) {
    const i = this;
    if (!i.eventsListeners || i.destroyed || typeof t != 'function') return i;
    const s = e ? 'unshift' : 'push';
    return i.eventsAnyListeners.indexOf(t) < 0 && i.eventsAnyListeners[s](t), i;
  },
  offAny(t) {
    const e = this;
    if (!e.eventsListeners || e.destroyed || !e.eventsAnyListeners) return e;
    const i = e.eventsAnyListeners.indexOf(t);
    return i >= 0 && e.eventsAnyListeners.splice(i, 1), e;
  },
  off(t, e) {
    const i = this;
    return (
      !i.eventsListeners ||
        i.destroyed ||
        !i.eventsListeners ||
        t.split(' ').forEach((s) => {
          typeof e > 'u'
            ? (i.eventsListeners[s] = [])
            : i.eventsListeners[s] &&
              i.eventsListeners[s].forEach((r, n) => {
                (r === e || (r.__emitterProxy && r.__emitterProxy === e)) &&
                  i.eventsListeners[s].splice(n, 1);
              });
        }),
      i
    );
  },
  emit() {
    const t = this;
    if (!t.eventsListeners || t.destroyed || !t.eventsListeners) return t;
    let e, i, s;
    for (var r = arguments.length, n = new Array(r), a = 0; a < r; a++)
      n[a] = arguments[a];
    return (
      typeof n[0] == 'string' || Array.isArray(n[0])
        ? ((e = n[0]), (i = n.slice(1, n.length)), (s = t))
        : ((e = n[0].events), (i = n[0].data), (s = n[0].context || t)),
      i.unshift(s),
      (Array.isArray(e) ? e : e.split(' ')).forEach((o) => {
        t.eventsAnyListeners &&
          t.eventsAnyListeners.length &&
          t.eventsAnyListeners.forEach((f) => {
            f.apply(s, [o, ...i]);
          }),
          t.eventsListeners &&
            t.eventsListeners[o] &&
            t.eventsListeners[o].forEach((f) => {
              f.apply(s, i);
            });
      }),
      t
    );
  },
};
function qa() {
  const t = this;
  let e, i;
  const s = t.el;
  typeof t.params.width < 'u' && t.params.width !== null
    ? (e = t.params.width)
    : (e = s.clientWidth),
    typeof t.params.height < 'u' && t.params.height !== null
      ? (i = t.params.height)
      : (i = s.clientHeight),
    !((e === 0 && t.isHorizontal()) || (i === 0 && t.isVertical())) &&
      ((e =
        e -
        parseInt(ue(s, 'padding-left') || 0, 10) -
        parseInt(ue(s, 'padding-right') || 0, 10)),
      (i =
        i -
        parseInt(ue(s, 'padding-top') || 0, 10) -
        parseInt(ue(s, 'padding-bottom') || 0, 10)),
      Number.isNaN(e) && (e = 0),
      Number.isNaN(i) && (i = 0),
      Object.assign(t, {
        width: e,
        height: i,
        size: t.isHorizontal() ? e : i,
      }));
}
function Ka() {
  const t = this;
  function e(_, L) {
    return parseFloat(_.getPropertyValue(t.getDirectionLabel(L)) || 0);
  }
  const i = t.params,
    { wrapperEl: s, slidesEl: r, size: n, rtlTranslate: a, wrongRTL: l } = t,
    o = t.virtual && i.virtual.enabled,
    f = o ? t.virtual.slides.length : t.slides.length,
    c = q(r, `.${t.params.slideClass}, swiper-slide`),
    d = o ? t.virtual.slides.length : c.length;
  let u = [];
  const m = [],
    v = [];
  let w = i.slidesOffsetBefore;
  typeof w == 'function' && (w = i.slidesOffsetBefore.call(t));
  let g = i.slidesOffsetAfter;
  typeof g == 'function' && (g = i.slidesOffsetAfter.call(t));
  const y = t.snapGrid.length,
    h = t.slidesGrid.length;
  let p = i.spaceBetween,
    b = -w,
    x = 0,
    A = 0;
  if (typeof n > 'u') return;
  typeof p == 'string' && p.indexOf('%') >= 0
    ? (p = (parseFloat(p.replace('%', '')) / 100) * n)
    : typeof p == 'string' && (p = parseFloat(p)),
    (t.virtualSize = -p),
    c.forEach((_) => {
      a ? (_.style.marginLeft = '') : (_.style.marginRight = ''),
        (_.style.marginBottom = ''),
        (_.style.marginTop = '');
    }),
    i.centeredSlides &&
      i.cssMode &&
      (Ve(s, '--swiper-centered-offset-before', ''),
      Ve(s, '--swiper-centered-offset-after', ''));
  const $ = i.grid && i.grid.rows > 1 && t.grid;
  $ ? t.grid.initSlides(c) : t.grid && t.grid.unsetSlides();
  let I;
  const T =
    i.slidesPerView === 'auto' &&
    i.breakpoints &&
    Object.keys(i.breakpoints).filter(
      (_) => typeof i.breakpoints[_].slidesPerView < 'u',
    ).length > 0;
  for (let _ = 0; _ < d; _ += 1) {
    I = 0;
    let L;
    if (
      (c[_] && (L = c[_]),
      $ && t.grid.updateSlide(_, L, c),
      !(c[_] && ue(L, 'display') === 'none'))
    ) {
      if (i.slidesPerView === 'auto') {
        T && (c[_].style[t.getDirectionLabel('width')] = '');
        const C = getComputedStyle(L),
          S = L.style.transform,
          E = L.style.webkitTransform;
        if (
          (S && (L.style.transform = 'none'),
          E && (L.style.webkitTransform = 'none'),
          i.roundLengths)
        )
          I = t.isHorizontal() ? ai(L, 'width', !0) : ai(L, 'height', !0);
        else {
          const O = e(C, 'width'),
            R = e(C, 'padding-left'),
            M = e(C, 'padding-right'),
            P = e(C, 'margin-left'),
            k = e(C, 'margin-right'),
            N = C.getPropertyValue('box-sizing');
          if (N && N === 'border-box') I = O + P + k;
          else {
            const { clientWidth: z, offsetWidth: D } = L;
            I = O + R + M + P + k + (D - z);
          }
        }
        S && (L.style.transform = S),
          E && (L.style.webkitTransform = E),
          i.roundLengths && (I = Math.floor(I));
      } else
        (I = (n - (i.slidesPerView - 1) * p) / i.slidesPerView),
          i.roundLengths && (I = Math.floor(I)),
          c[_] && (c[_].style[t.getDirectionLabel('width')] = `${I}px`);
      c[_] && (c[_].swiperSlideSize = I),
        v.push(I),
        i.centeredSlides
          ? ((b = b + I / 2 + x / 2 + p),
            x === 0 && _ !== 0 && (b = b - n / 2 - p),
            _ === 0 && (b = b - n / 2 - p),
            Math.abs(b) < 1 / 1e3 && (b = 0),
            i.roundLengths && (b = Math.floor(b)),
            A % i.slidesPerGroup === 0 && u.push(b),
            m.push(b))
          : (i.roundLengths && (b = Math.floor(b)),
            (A - Math.min(t.params.slidesPerGroupSkip, A)) %
              t.params.slidesPerGroup ===
              0 && u.push(b),
            m.push(b),
            (b = b + I + p)),
        (t.virtualSize += I + p),
        (x = I),
        (A += 1);
    }
  }
  if (
    ((t.virtualSize = Math.max(t.virtualSize, n) + g),
    a &&
      l &&
      (i.effect === 'slide' || i.effect === 'coverflow') &&
      (s.style.width = `${t.virtualSize + p}px`),
    i.setWrapperSize &&
      (s.style[t.getDirectionLabel('width')] = `${t.virtualSize + p}px`),
    $ && t.grid.updateWrapperSize(I, u),
    !i.centeredSlides)
  ) {
    const _ = [];
    for (let L = 0; L < u.length; L += 1) {
      let C = u[L];
      i.roundLengths && (C = Math.floor(C)),
        u[L] <= t.virtualSize - n && _.push(C);
    }
    (u = _),
      Math.floor(t.virtualSize - n) - Math.floor(u[u.length - 1]) > 1 &&
        u.push(t.virtualSize - n);
  }
  if (o && i.loop) {
    const _ = v[0] + p;
    if (i.slidesPerGroup > 1) {
      const L = Math.ceil(
          (t.virtual.slidesBefore + t.virtual.slidesAfter) / i.slidesPerGroup,
        ),
        C = _ * i.slidesPerGroup;
      for (let S = 0; S < L; S += 1) u.push(u[u.length - 1] + C);
    }
    for (let L = 0; L < t.virtual.slidesBefore + t.virtual.slidesAfter; L += 1)
      i.slidesPerGroup === 1 && u.push(u[u.length - 1] + _),
        m.push(m[m.length - 1] + _),
        (t.virtualSize += _);
  }
  if ((u.length === 0 && (u = [0]), p !== 0)) {
    const _ =
      t.isHorizontal() && a ? 'marginLeft' : t.getDirectionLabel('marginRight');
    c.filter((L, C) =>
      !i.cssMode || i.loop ? !0 : C !== c.length - 1,
    ).forEach((L) => {
      L.style[_] = `${p}px`;
    });
  }
  if (i.centeredSlides && i.centeredSlidesBounds) {
    let _ = 0;
    v.forEach((C) => {
      _ += C + (p || 0);
    }),
      (_ -= p);
    const L = _ > n ? _ - n : 0;
    u = u.map((C) => (C <= 0 ? -w : C > L ? L + g : C));
  }
  if (i.centerInsufficientSlides) {
    let _ = 0;
    v.forEach((C) => {
      _ += C + (p || 0);
    }),
      (_ -= p);
    const L = (i.slidesOffsetBefore || 0) + (i.slidesOffsetAfter || 0);
    if (_ + L < n) {
      const C = (n - _ - L) / 2;
      u.forEach((S, E) => {
        u[E] = S - C;
      }),
        m.forEach((S, E) => {
          m[E] = S + C;
        });
    }
  }
  if (
    (Object.assign(t, {
      slides: c,
      snapGrid: u,
      slidesGrid: m,
      slidesSizesGrid: v,
    }),
    i.centeredSlides && i.cssMode && !i.centeredSlidesBounds)
  ) {
    Ve(s, '--swiper-centered-offset-before', `${-u[0]}px`),
      Ve(
        s,
        '--swiper-centered-offset-after',
        `${t.size / 2 - v[v.length - 1] / 2}px`,
      );
    const _ = -t.snapGrid[0],
      L = -t.slidesGrid[0];
    (t.snapGrid = t.snapGrid.map((C) => C + _)),
      (t.slidesGrid = t.slidesGrid.map((C) => C + L));
  }
  if (
    (d !== f && t.emit('slidesLengthChange'),
    u.length !== y &&
      (t.params.watchOverflow && t.checkOverflow(),
      t.emit('snapGridLengthChange')),
    m.length !== h && t.emit('slidesGridLengthChange'),
    i.watchSlidesProgress && t.updateSlidesOffset(),
    t.emit('slidesUpdated'),
    !o && !i.cssMode && (i.effect === 'slide' || i.effect === 'fade'))
  ) {
    const _ = `${i.containerModifierClass}backface-hidden`,
      L = t.el.classList.contains(_);
    d <= i.maxBackfaceHiddenSlides
      ? L || t.el.classList.add(_)
      : L && t.el.classList.remove(_);
  }
}
function Ua(t) {
  const e = this,
    i = [],
    s = e.virtual && e.params.virtual.enabled;
  let r = 0,
    n;
  typeof t == 'number'
    ? e.setTransition(t)
    : t === !0 && e.setTransition(e.params.speed);
  const a = (l) => (s ? e.slides[e.getSlideIndexByData(l)] : e.slides[l]);
  if (e.params.slidesPerView !== 'auto' && e.params.slidesPerView > 1)
    if (e.params.centeredSlides)
      (e.visibleSlides || []).forEach((l) => {
        i.push(l);
      });
    else
      for (n = 0; n < Math.ceil(e.params.slidesPerView); n += 1) {
        const l = e.activeIndex + n;
        if (l > e.slides.length && !s) break;
        i.push(a(l));
      }
  else i.push(a(e.activeIndex));
  for (n = 0; n < i.length; n += 1)
    if (typeof i[n] < 'u') {
      const l = i[n].offsetHeight;
      r = l > r ? l : r;
    }
  (r || r === 0) && (e.wrapperEl.style.height = `${r}px`);
}
function Ja() {
  const t = this,
    e = t.slides,
    i = t.isElement
      ? t.isHorizontal()
        ? t.wrapperEl.offsetLeft
        : t.wrapperEl.offsetTop
      : 0;
  for (let s = 0; s < e.length; s += 1)
    e[s].swiperSlideOffset =
      (t.isHorizontal() ? e[s].offsetLeft : e[s].offsetTop) -
      i -
      t.cssOverflowAdjustment();
}
const es = (t, e, i) => {
  e && !t.classList.contains(i)
    ? t.classList.add(i)
    : !e && t.classList.contains(i) && t.classList.remove(i);
};
function Za(t) {
  t === void 0 && (t = (this && this.translate) || 0);
  const e = this,
    i = e.params,
    { slides: s, rtlTranslate: r, snapGrid: n } = e;
  if (s.length === 0) return;
  typeof s[0].swiperSlideOffset > 'u' && e.updateSlidesOffset();
  let a = -t;
  r && (a = t), (e.visibleSlidesIndexes = []), (e.visibleSlides = []);
  let l = i.spaceBetween;
  typeof l == 'string' && l.indexOf('%') >= 0
    ? (l = (parseFloat(l.replace('%', '')) / 100) * e.size)
    : typeof l == 'string' && (l = parseFloat(l));
  for (let o = 0; o < s.length; o += 1) {
    const f = s[o];
    let c = f.swiperSlideOffset;
    i.cssMode && i.centeredSlides && (c -= s[0].swiperSlideOffset);
    const d =
        (a + (i.centeredSlides ? e.minTranslate() : 0) - c) /
        (f.swiperSlideSize + l),
      u =
        (a - n[0] + (i.centeredSlides ? e.minTranslate() : 0) - c) /
        (f.swiperSlideSize + l),
      m = -(a - c),
      v = m + e.slidesSizesGrid[o],
      w = m >= 0 && m <= e.size - e.slidesSizesGrid[o],
      g =
        (m >= 0 && m < e.size - 1) ||
        (v > 1 && v <= e.size) ||
        (m <= 0 && v >= e.size);
    g && (e.visibleSlides.push(f), e.visibleSlidesIndexes.push(o)),
      es(f, g, i.slideVisibleClass),
      es(f, w, i.slideFullyVisibleClass),
      (f.progress = r ? -d : d),
      (f.originalProgress = r ? -u : u);
  }
}
function Qa(t) {
  const e = this;
  if (typeof t > 'u') {
    const c = e.rtlTranslate ? -1 : 1;
    t = (e && e.translate && e.translate * c) || 0;
  }
  const i = e.params,
    s = e.maxTranslate() - e.minTranslate();
  let { progress: r, isBeginning: n, isEnd: a, progressLoop: l } = e;
  const o = n,
    f = a;
  if (s === 0) (r = 0), (n = !0), (a = !0);
  else {
    r = (t - e.minTranslate()) / s;
    const c = Math.abs(t - e.minTranslate()) < 1,
      d = Math.abs(t - e.maxTranslate()) < 1;
    (n = c || r <= 0), (a = d || r >= 1), c && (r = 0), d && (r = 1);
  }
  if (i.loop) {
    const c = e.getSlideIndexByData(0),
      d = e.getSlideIndexByData(e.slides.length - 1),
      u = e.slidesGrid[c],
      m = e.slidesGrid[d],
      v = e.slidesGrid[e.slidesGrid.length - 1],
      w = Math.abs(t);
    w >= u ? (l = (w - u) / v) : (l = (w + v - m) / v), l > 1 && (l -= 1);
  }
  Object.assign(e, { progress: r, progressLoop: l, isBeginning: n, isEnd: a }),
    (i.watchSlidesProgress || (i.centeredSlides && i.autoHeight)) &&
      e.updateSlidesProgress(t),
    n && !o && e.emit('reachBeginning toEdge'),
    a && !f && e.emit('reachEnd toEdge'),
    ((o && !n) || (f && !a)) && e.emit('fromEdge'),
    e.emit('progress', r);
}
const Bt = (t, e, i) => {
  e && !t.classList.contains(i)
    ? t.classList.add(i)
    : !e && t.classList.contains(i) && t.classList.remove(i);
};
function eo() {
  const t = this,
    { slides: e, params: i, slidesEl: s, activeIndex: r } = t,
    n = t.virtual && i.virtual.enabled,
    a = t.grid && i.grid && i.grid.rows > 1,
    l = (d) => q(s, `.${i.slideClass}${d}, swiper-slide${d}`)[0];
  let o, f, c;
  if (n)
    if (i.loop) {
      let d = r - t.virtual.slidesBefore;
      d < 0 && (d = t.virtual.slides.length + d),
        d >= t.virtual.slides.length && (d -= t.virtual.slides.length),
        (o = l(`[data-swiper-slide-index="${d}"]`));
    } else o = l(`[data-swiper-slide-index="${r}"]`);
  else
    a
      ? ((o = e.filter((d) => d.column === r)[0]),
        (c = e.filter((d) => d.column === r + 1)[0]),
        (f = e.filter((d) => d.column === r - 1)[0]))
      : (o = e[r]);
  o &&
    (a ||
      ((c = Na(o, `.${i.slideClass}, swiper-slide`)[0]),
      i.loop && !c && (c = e[0]),
      (f = Ha(o, `.${i.slideClass}, swiper-slide`)[0]),
      i.loop && !f === 0 && (f = e[e.length - 1]))),
    e.forEach((d) => {
      Bt(d, d === o, i.slideActiveClass),
        Bt(d, d === c, i.slideNextClass),
        Bt(d, d === f, i.slidePrevClass);
    }),
    t.emitSlidesClasses();
}
const ct = (t, e) => {
    if (!t || t.destroyed || !t.params) return;
    const i = () => (t.isElement ? 'swiper-slide' : `.${t.params.slideClass}`),
      s = e.closest(i());
    if (s) {
      let r = s.querySelector(`.${t.params.lazyPreloaderClass}`);
      !r &&
        t.isElement &&
        (s.shadowRoot
          ? (r = s.shadowRoot.querySelector(`.${t.params.lazyPreloaderClass}`))
          : requestAnimationFrame(() => {
              s.shadowRoot &&
                ((r = s.shadowRoot.querySelector(
                  `.${t.params.lazyPreloaderClass}`,
                )),
                r && r.remove());
            })),
        r && r.remove();
    }
  },
  Ht = (t, e) => {
    if (!t.slides[e]) return;
    const i = t.slides[e].querySelector('[loading="lazy"]');
    i && i.removeAttribute('loading');
  },
  oi = (t) => {
    if (!t || t.destroyed || !t.params) return;
    let e = t.params.lazyPreloadPrevNext;
    const i = t.slides.length;
    if (!i || !e || e < 0) return;
    e = Math.min(e, i);
    const s =
        t.params.slidesPerView === 'auto'
          ? t.slidesPerViewDynamic()
          : Math.ceil(t.params.slidesPerView),
      r = t.activeIndex;
    if (t.params.grid && t.params.grid.rows > 1) {
      const a = r,
        l = [a - e];
      l.push(...Array.from({ length: e }).map((o, f) => a + s + f)),
        t.slides.forEach((o, f) => {
          l.includes(o.column) && Ht(t, f);
        });
      return;
    }
    const n = r + s - 1;
    if (t.params.rewind || t.params.loop)
      for (let a = r - e; a <= n + e; a += 1) {
        const l = ((a % i) + i) % i;
        (l < r || l > n) && Ht(t, l);
      }
    else
      for (let a = Math.max(r - e, 0); a <= Math.min(n + e, i - 1); a += 1)
        a !== r && (a > n || a < r) && Ht(t, a);
  };
function to(t) {
  const { slidesGrid: e, params: i } = t,
    s = t.rtlTranslate ? t.translate : -t.translate;
  let r;
  for (let n = 0; n < e.length; n += 1)
    typeof e[n + 1] < 'u'
      ? s >= e[n] && s < e[n + 1] - (e[n + 1] - e[n]) / 2
        ? (r = n)
        : s >= e[n] && s < e[n + 1] && (r = n + 1)
      : s >= e[n] && (r = n);
  return i.normalizeSlideIndex && (r < 0 || typeof r > 'u') && (r = 0), r;
}
function io(t) {
  const e = this,
    i = e.rtlTranslate ? e.translate : -e.translate,
    { snapGrid: s, params: r, activeIndex: n, realIndex: a, snapIndex: l } = e;
  let o = t,
    f;
  const c = (m) => {
    let v = m - e.virtual.slidesBefore;
    return (
      v < 0 && (v = e.virtual.slides.length + v),
      v >= e.virtual.slides.length && (v -= e.virtual.slides.length),
      v
    );
  };
  if ((typeof o > 'u' && (o = to(e)), s.indexOf(i) >= 0)) f = s.indexOf(i);
  else {
    const m = Math.min(r.slidesPerGroupSkip, o);
    f = m + Math.floor((o - m) / r.slidesPerGroup);
  }
  if ((f >= s.length && (f = s.length - 1), o === n && !e.params.loop)) {
    f !== l && ((e.snapIndex = f), e.emit('snapIndexChange'));
    return;
  }
  if (o === n && e.params.loop && e.virtual && e.params.virtual.enabled) {
    e.realIndex = c(o);
    return;
  }
  const d = e.grid && r.grid && r.grid.rows > 1;
  let u;
  if (e.virtual && r.virtual.enabled && r.loop) u = c(o);
  else if (d) {
    const m = e.slides.filter((w) => w.column === o)[0];
    let v = parseInt(m.getAttribute('data-swiper-slide-index'), 10);
    Number.isNaN(v) && (v = Math.max(e.slides.indexOf(m), 0)),
      (u = Math.floor(v / r.grid.rows));
  } else if (e.slides[o]) {
    const m = e.slides[o].getAttribute('data-swiper-slide-index');
    m ? (u = parseInt(m, 10)) : (u = o);
  } else u = o;
  Object.assign(e, {
    previousSnapIndex: l,
    snapIndex: f,
    previousRealIndex: a,
    realIndex: u,
    previousIndex: n,
    activeIndex: o,
  }),
    e.initialized && oi(e),
    e.emit('activeIndexChange'),
    e.emit('snapIndexChange'),
    (e.initialized || e.params.runCallbacksOnInit) &&
      (a !== u && e.emit('realIndexChange'), e.emit('slideChange'));
}
function so(t, e) {
  const i = this,
    s = i.params;
  let r = t.closest(`.${s.slideClass}, swiper-slide`);
  !r &&
    i.isElement &&
    e &&
    e.length > 1 &&
    e.includes(t) &&
    [...e.slice(e.indexOf(t) + 1, e.length)].forEach((l) => {
      !r && l.matches && l.matches(`.${s.slideClass}, swiper-slide`) && (r = l);
    });
  let n = !1,
    a;
  if (r) {
    for (let l = 0; l < i.slides.length; l += 1)
      if (i.slides[l] === r) {
        (n = !0), (a = l);
        break;
      }
  }
  if (r && n)
    (i.clickedSlide = r),
      i.virtual && i.params.virtual.enabled
        ? (i.clickedIndex = parseInt(
            r.getAttribute('data-swiper-slide-index'),
            10,
          ))
        : (i.clickedIndex = a);
  else {
    (i.clickedSlide = void 0), (i.clickedIndex = void 0);
    return;
  }
  s.slideToClickedSlide &&
    i.clickedIndex !== void 0 &&
    i.clickedIndex !== i.activeIndex &&
    i.slideToClickedSlide();
}
var ro = {
  updateSize: qa,
  updateSlides: Ka,
  updateAutoHeight: Ua,
  updateSlidesOffset: Ja,
  updateSlidesProgress: Za,
  updateProgress: Qa,
  updateSlidesClasses: eo,
  updateActiveIndex: io,
  updateClickedSlide: so,
};
function no(t) {
  t === void 0 && (t = this.isHorizontal() ? 'x' : 'y');
  const e = this,
    { params: i, rtlTranslate: s, translate: r, wrapperEl: n } = e;
  if (i.virtualTranslate) return s ? -r : r;
  if (i.cssMode) return r;
  let a = ni(n, t);
  return (a += e.cssOverflowAdjustment()), s && (a = -a), a || 0;
}
function ao(t, e) {
  const i = this,
    { rtlTranslate: s, params: r, wrapperEl: n, progress: a } = i;
  let l = 0,
    o = 0;
  const f = 0;
  i.isHorizontal() ? (l = s ? -t : t) : (o = t),
    r.roundLengths && ((l = Math.floor(l)), (o = Math.floor(o))),
    (i.previousTranslate = i.translate),
    (i.translate = i.isHorizontal() ? l : o),
    r.cssMode
      ? (n[i.isHorizontal() ? 'scrollLeft' : 'scrollTop'] = i.isHorizontal()
          ? -l
          : -o)
      : r.virtualTranslate ||
        (i.isHorizontal()
          ? (l -= i.cssOverflowAdjustment())
          : (o -= i.cssOverflowAdjustment()),
        (n.style.transform = `translate3d(${l}px, ${o}px, ${f}px)`));
  let c;
  const d = i.maxTranslate() - i.minTranslate();
  d === 0 ? (c = 0) : (c = (t - i.minTranslate()) / d),
    c !== a && i.updateProgress(t),
    i.emit('setTranslate', i.translate, e);
}
function oo() {
  return -this.snapGrid[0];
}
function lo() {
  return -this.snapGrid[this.snapGrid.length - 1];
}
function co(t, e, i, s, r) {
  t === void 0 && (t = 0),
    e === void 0 && (e = this.params.speed),
    i === void 0 && (i = !0),
    s === void 0 && (s = !0);
  const n = this,
    { params: a, wrapperEl: l } = n;
  if (n.animating && a.preventInteractionOnTransition) return !1;
  const o = n.minTranslate(),
    f = n.maxTranslate();
  let c;
  if (
    (s && t > o ? (c = o) : s && t < f ? (c = f) : (c = t),
    n.updateProgress(c),
    a.cssMode)
  ) {
    const d = n.isHorizontal();
    if (e === 0) l[d ? 'scrollLeft' : 'scrollTop'] = -c;
    else {
      if (!n.support.smoothScroll)
        return (
          wr({ swiper: n, targetPosition: -c, side: d ? 'left' : 'top' }), !0
        );
      l.scrollTo({ [d ? 'left' : 'top']: -c, behavior: 'smooth' });
    }
    return !0;
  }
  return (
    e === 0
      ? (n.setTransition(0),
        n.setTranslate(c),
        i && (n.emit('beforeTransitionStart', e, r), n.emit('transitionEnd')))
      : (n.setTransition(e),
        n.setTranslate(c),
        i && (n.emit('beforeTransitionStart', e, r), n.emit('transitionStart')),
        n.animating ||
          ((n.animating = !0),
          n.onTranslateToWrapperTransitionEnd ||
            (n.onTranslateToWrapperTransitionEnd = function (u) {
              !n ||
                n.destroyed ||
                (u.target === this &&
                  (n.wrapperEl.removeEventListener(
                    'transitionend',
                    n.onTranslateToWrapperTransitionEnd,
                  ),
                  (n.onTranslateToWrapperTransitionEnd = null),
                  delete n.onTranslateToWrapperTransitionEnd,
                  (n.animating = !1),
                  i && n.emit('transitionEnd')));
            }),
          n.wrapperEl.addEventListener(
            'transitionend',
            n.onTranslateToWrapperTransitionEnd,
          ))),
    !0
  );
}
var uo = {
  getTranslate: no,
  setTranslate: ao,
  minTranslate: oo,
  maxTranslate: lo,
  translateTo: co,
};
function fo(t, e) {
  const i = this;
  i.params.cssMode ||
    ((i.wrapperEl.style.transitionDuration = `${t}ms`),
    (i.wrapperEl.style.transitionDelay = t === 0 ? '0ms' : '')),
    i.emit('setTransition', t, e);
}
function xr(t) {
  let { swiper: e, runCallbacks: i, direction: s, step: r } = t;
  const { activeIndex: n, previousIndex: a } = e;
  let l = s;
  if (
    (l || (n > a ? (l = 'next') : n < a ? (l = 'prev') : (l = 'reset')),
    e.emit(`transition${r}`),
    i && n !== a)
  ) {
    if (l === 'reset') {
      e.emit(`slideResetTransition${r}`);
      return;
    }
    e.emit(`slideChangeTransition${r}`),
      l === 'next'
        ? e.emit(`slideNextTransition${r}`)
        : e.emit(`slidePrevTransition${r}`);
  }
}
function po(t, e) {
  t === void 0 && (t = !0);
  const i = this,
    { params: s } = i;
  s.cssMode ||
    (s.autoHeight && i.updateAutoHeight(),
    xr({ swiper: i, runCallbacks: t, direction: e, step: 'Start' }));
}
function mo(t, e) {
  t === void 0 && (t = !0);
  const i = this,
    { params: s } = i;
  (i.animating = !1),
    !s.cssMode &&
      (i.setTransition(0),
      xr({ swiper: i, runCallbacks: t, direction: e, step: 'End' }));
}
var ho = { setTransition: fo, transitionStart: po, transitionEnd: mo };
function go(t, e, i, s, r) {
  t === void 0 && (t = 0),
    i === void 0 && (i = !0),
    typeof t == 'string' && (t = parseInt(t, 10));
  const n = this;
  let a = t;
  a < 0 && (a = 0);
  const {
    params: l,
    snapGrid: o,
    slidesGrid: f,
    previousIndex: c,
    activeIndex: d,
    rtlTranslate: u,
    wrapperEl: m,
    enabled: v,
  } = n;
  if (
    (!v && !s && !r) ||
    n.destroyed ||
    (n.animating && l.preventInteractionOnTransition)
  )
    return !1;
  typeof e > 'u' && (e = n.params.speed);
  const w = Math.min(n.params.slidesPerGroupSkip, a);
  let g = w + Math.floor((a - w) / n.params.slidesPerGroup);
  g >= o.length && (g = o.length - 1);
  const y = -o[g];
  if (l.normalizeSlideIndex)
    for (let x = 0; x < f.length; x += 1) {
      const A = -Math.floor(y * 100),
        $ = Math.floor(f[x] * 100),
        I = Math.floor(f[x + 1] * 100);
      typeof f[x + 1] < 'u'
        ? A >= $ && A < I - (I - $) / 2
          ? (a = x)
          : A >= $ && A < I && (a = x + 1)
        : A >= $ && (a = x);
    }
  if (
    n.initialized &&
    a !== d &&
    ((!n.allowSlideNext &&
      (u
        ? y > n.translate && y > n.minTranslate()
        : y < n.translate && y < n.minTranslate())) ||
      (!n.allowSlidePrev &&
        y > n.translate &&
        y > n.maxTranslate() &&
        (d || 0) !== a))
  )
    return !1;
  a !== (c || 0) && i && n.emit('beforeSlideChangeStart'), n.updateProgress(y);
  let h;
  a > d ? (h = 'next') : a < d ? (h = 'prev') : (h = 'reset');
  const p = n.virtual && n.params.virtual.enabled;
  if (!(p && r) && ((u && -y === n.translate) || (!u && y === n.translate)))
    return (
      n.updateActiveIndex(a),
      l.autoHeight && n.updateAutoHeight(),
      n.updateSlidesClasses(),
      l.effect !== 'slide' && n.setTranslate(y),
      h !== 'reset' && (n.transitionStart(i, h), n.transitionEnd(i, h)),
      !1
    );
  if (l.cssMode) {
    const x = n.isHorizontal(),
      A = u ? y : -y;
    if (e === 0)
      p &&
        ((n.wrapperEl.style.scrollSnapType = 'none'),
        (n._immediateVirtual = !0)),
        p && !n._cssModeVirtualInitialSet && n.params.initialSlide > 0
          ? ((n._cssModeVirtualInitialSet = !0),
            requestAnimationFrame(() => {
              m[x ? 'scrollLeft' : 'scrollTop'] = A;
            }))
          : (m[x ? 'scrollLeft' : 'scrollTop'] = A),
        p &&
          requestAnimationFrame(() => {
            (n.wrapperEl.style.scrollSnapType = ''), (n._immediateVirtual = !1);
          });
    else {
      if (!n.support.smoothScroll)
        return (
          wr({ swiper: n, targetPosition: A, side: x ? 'left' : 'top' }), !0
        );
      m.scrollTo({ [x ? 'left' : 'top']: A, behavior: 'smooth' });
    }
    return !0;
  }
  return (
    n.setTransition(e),
    n.setTranslate(y),
    n.updateActiveIndex(a),
    n.updateSlidesClasses(),
    n.emit('beforeTransitionStart', e, s),
    n.transitionStart(i, h),
    e === 0
      ? n.transitionEnd(i, h)
      : n.animating ||
        ((n.animating = !0),
        n.onSlideToWrapperTransitionEnd ||
          (n.onSlideToWrapperTransitionEnd = function (A) {
            !n ||
              n.destroyed ||
              (A.target === this &&
                (n.wrapperEl.removeEventListener(
                  'transitionend',
                  n.onSlideToWrapperTransitionEnd,
                ),
                (n.onSlideToWrapperTransitionEnd = null),
                delete n.onSlideToWrapperTransitionEnd,
                n.transitionEnd(i, h)));
          }),
        n.wrapperEl.addEventListener(
          'transitionend',
          n.onSlideToWrapperTransitionEnd,
        )),
    !0
  );
}
function vo(t, e, i, s) {
  t === void 0 && (t = 0),
    i === void 0 && (i = !0),
    typeof t == 'string' && (t = parseInt(t, 10));
  const r = this;
  if (r.destroyed) return;
  typeof e > 'u' && (e = r.params.speed);
  const n = r.grid && r.params.grid && r.params.grid.rows > 1;
  let a = t;
  if (r.params.loop)
    if (r.virtual && r.params.virtual.enabled) a = a + r.virtual.slidesBefore;
    else {
      let l;
      if (n) {
        const u = a * r.params.grid.rows;
        l = r.slides.filter(
          (m) => m.getAttribute('data-swiper-slide-index') * 1 === u,
        )[0].column;
      } else l = r.getSlideIndexByData(a);
      const o = n
          ? Math.ceil(r.slides.length / r.params.grid.rows)
          : r.slides.length,
        { centeredSlides: f } = r.params;
      let c = r.params.slidesPerView;
      c === 'auto'
        ? (c = r.slidesPerViewDynamic())
        : ((c = Math.ceil(parseFloat(r.params.slidesPerView, 10))),
          f && c % 2 === 0 && (c = c + 1));
      let d = o - l < c;
      if (
        (f && (d = d || l < Math.ceil(c / 2)),
        s && f && r.params.slidesPerView !== 'auto' && !n && (d = !1),
        d)
      ) {
        const u = f
          ? l < r.activeIndex
            ? 'prev'
            : 'next'
          : l - r.activeIndex - 1 < r.params.slidesPerView
          ? 'next'
          : 'prev';
        r.loopFix({
          direction: u,
          slideTo: !0,
          activeSlideIndex: u === 'next' ? l + 1 : l - o + 1,
          slideRealIndex: u === 'next' ? r.realIndex : void 0,
        });
      }
      if (n) {
        const u = a * r.params.grid.rows;
        a = r.slides.filter(
          (m) => m.getAttribute('data-swiper-slide-index') * 1 === u,
        )[0].column;
      } else a = r.getSlideIndexByData(a);
    }
  return (
    requestAnimationFrame(() => {
      r.slideTo(a, e, i, s);
    }),
    r
  );
}
function wo(t, e, i) {
  e === void 0 && (e = !0);
  const s = this,
    { enabled: r, params: n, animating: a } = s;
  if (!r || s.destroyed) return s;
  typeof t > 'u' && (t = s.params.speed);
  let l = n.slidesPerGroup;
  n.slidesPerView === 'auto' &&
    n.slidesPerGroup === 1 &&
    n.slidesPerGroupAuto &&
    (l = Math.max(s.slidesPerViewDynamic('current', !0), 1));
  const o = s.activeIndex < n.slidesPerGroupSkip ? 1 : l,
    f = s.virtual && n.virtual.enabled;
  if (n.loop) {
    if (a && !f && n.loopPreventsSliding) return !1;
    if (
      (s.loopFix({ direction: 'next' }),
      (s._clientLeft = s.wrapperEl.clientLeft),
      s.activeIndex === s.slides.length - 1 && n.cssMode)
    )
      return (
        requestAnimationFrame(() => {
          s.slideTo(s.activeIndex + o, t, e, i);
        }),
        !0
      );
  }
  return n.rewind && s.isEnd
    ? s.slideTo(0, t, e, i)
    : s.slideTo(s.activeIndex + o, t, e, i);
}
function yo(t, e, i) {
  e === void 0 && (e = !0);
  const s = this,
    {
      params: r,
      snapGrid: n,
      slidesGrid: a,
      rtlTranslate: l,
      enabled: o,
      animating: f,
    } = s;
  if (!o || s.destroyed) return s;
  typeof t > 'u' && (t = s.params.speed);
  const c = s.virtual && r.virtual.enabled;
  if (r.loop) {
    if (f && !c && r.loopPreventsSliding) return !1;
    s.loopFix({ direction: 'prev' }), (s._clientLeft = s.wrapperEl.clientLeft);
  }
  const d = l ? s.translate : -s.translate;
  function u(y) {
    return y < 0 ? -Math.floor(Math.abs(y)) : Math.floor(y);
  }
  const m = u(d),
    v = n.map((y) => u(y));
  let w = n[v.indexOf(m) - 1];
  if (typeof w > 'u' && r.cssMode) {
    let y;
    n.forEach((h, p) => {
      m >= h && (y = p);
    }),
      typeof y < 'u' && (w = n[y > 0 ? y - 1 : y]);
  }
  let g = 0;
  if (
    (typeof w < 'u' &&
      ((g = a.indexOf(w)),
      g < 0 && (g = s.activeIndex - 1),
      r.slidesPerView === 'auto' &&
        r.slidesPerGroup === 1 &&
        r.slidesPerGroupAuto &&
        ((g = g - s.slidesPerViewDynamic('previous', !0) + 1),
        (g = Math.max(g, 0)))),
    r.rewind && s.isBeginning)
  ) {
    const y =
      s.params.virtual && s.params.virtual.enabled && s.virtual
        ? s.virtual.slides.length - 1
        : s.slides.length - 1;
    return s.slideTo(y, t, e, i);
  } else if (r.loop && s.activeIndex === 0 && r.cssMode)
    return (
      requestAnimationFrame(() => {
        s.slideTo(g, t, e, i);
      }),
      !0
    );
  return s.slideTo(g, t, e, i);
}
function bo(t, e, i) {
  e === void 0 && (e = !0);
  const s = this;
  if (!s.destroyed)
    return (
      typeof t > 'u' && (t = s.params.speed), s.slideTo(s.activeIndex, t, e, i)
    );
}
function xo(t, e, i, s) {
  e === void 0 && (e = !0), s === void 0 && (s = 0.5);
  const r = this;
  if (r.destroyed) return;
  typeof t > 'u' && (t = r.params.speed);
  let n = r.activeIndex;
  const a = Math.min(r.params.slidesPerGroupSkip, n),
    l = a + Math.floor((n - a) / r.params.slidesPerGroup),
    o = r.rtlTranslate ? r.translate : -r.translate;
  if (o >= r.snapGrid[l]) {
    const f = r.snapGrid[l],
      c = r.snapGrid[l + 1];
    o - f > (c - f) * s && (n += r.params.slidesPerGroup);
  } else {
    const f = r.snapGrid[l - 1],
      c = r.snapGrid[l];
    o - f <= (c - f) * s && (n -= r.params.slidesPerGroup);
  }
  return (
    (n = Math.max(n, 0)),
    (n = Math.min(n, r.slidesGrid.length - 1)),
    r.slideTo(n, t, e, i)
  );
}
function So() {
  const t = this;
  if (t.destroyed) return;
  const { params: e, slidesEl: i } = t,
    s = e.slidesPerView === 'auto' ? t.slidesPerViewDynamic() : e.slidesPerView;
  let r = t.clickedIndex,
    n;
  const a = t.isElement ? 'swiper-slide' : `.${e.slideClass}`;
  if (e.loop) {
    if (t.animating) return;
    (n = parseInt(t.clickedSlide.getAttribute('data-swiper-slide-index'), 10)),
      e.centeredSlides
        ? r < t.loopedSlides - s / 2 ||
          r > t.slides.length - t.loopedSlides + s / 2
          ? (t.loopFix(),
            (r = t.getSlideIndex(
              q(i, `${a}[data-swiper-slide-index="${n}"]`)[0],
            )),
            Te(() => {
              t.slideTo(r);
            }))
          : t.slideTo(r)
        : r > t.slides.length - s
        ? (t.loopFix(),
          (r = t.getSlideIndex(
            q(i, `${a}[data-swiper-slide-index="${n}"]`)[0],
          )),
          Te(() => {
            t.slideTo(r);
          }))
        : t.slideTo(r);
  } else t.slideTo(r);
}
var Eo = {
  slideTo: go,
  slideToLoop: vo,
  slideNext: wo,
  slidePrev: yo,
  slideReset: bo,
  slideToClosest: xo,
  slideToClickedSlide: So,
};
function To(t) {
  const e = this,
    { params: i, slidesEl: s } = e;
  if (!i.loop || (e.virtual && e.params.virtual.enabled)) return;
  const r = () => {
      q(s, `.${i.slideClass}, swiper-slide`).forEach((d, u) => {
        d.setAttribute('data-swiper-slide-index', u);
      });
    },
    n = e.grid && i.grid && i.grid.rows > 1,
    a = i.slidesPerGroup * (n ? i.grid.rows : 1),
    l = e.slides.length % a !== 0,
    o = n && e.slides.length % i.grid.rows !== 0,
    f = (c) => {
      for (let d = 0; d < c; d += 1) {
        const u = e.isElement
          ? ee('swiper-slide', [i.slideBlankClass])
          : ee('div', [i.slideClass, i.slideBlankClass]);
        e.slidesEl.append(u);
      }
    };
  if (l) {
    if (i.loopAddBlankSlides) {
      const c = a - (e.slides.length % a);
      f(c), e.recalcSlides(), e.updateSlides();
    } else
      ht(
        'Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)',
      );
    r();
  } else if (o) {
    if (i.loopAddBlankSlides) {
      const c = i.grid.rows - (e.slides.length % i.grid.rows);
      f(c), e.recalcSlides(), e.updateSlides();
    } else
      ht(
        'Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)',
      );
    r();
  } else r();
  e.loopFix({
    slideRealIndex: t,
    direction: i.centeredSlides ? void 0 : 'next',
  });
}
function Mo(t) {
  let {
    slideRealIndex: e,
    slideTo: i = !0,
    direction: s,
    setTranslate: r,
    activeSlideIndex: n,
    byController: a,
    byMousewheel: l,
  } = t === void 0 ? {} : t;
  const o = this;
  if (!o.params.loop) return;
  o.emit('beforeLoopFix');
  const {
      slides: f,
      allowSlidePrev: c,
      allowSlideNext: d,
      slidesEl: u,
      params: m,
    } = o,
    { centeredSlides: v } = m;
  if (
    ((o.allowSlidePrev = !0),
    (o.allowSlideNext = !0),
    o.virtual && m.virtual.enabled)
  ) {
    i &&
      (!m.centeredSlides && o.snapIndex === 0
        ? o.slideTo(o.virtual.slides.length, 0, !1, !0)
        : m.centeredSlides && o.snapIndex < m.slidesPerView
        ? o.slideTo(o.virtual.slides.length + o.snapIndex, 0, !1, !0)
        : o.snapIndex === o.snapGrid.length - 1 &&
          o.slideTo(o.virtual.slidesBefore, 0, !1, !0)),
      (o.allowSlidePrev = c),
      (o.allowSlideNext = d),
      o.emit('loopFix');
    return;
  }
  let w = m.slidesPerView;
  w === 'auto'
    ? (w = o.slidesPerViewDynamic())
    : ((w = Math.ceil(parseFloat(m.slidesPerView, 10))),
      v && w % 2 === 0 && (w = w + 1));
  const g = m.slidesPerGroupAuto ? w : m.slidesPerGroup;
  let y = g;
  y % g !== 0 && (y += g - (y % g)),
    (y += m.loopAdditionalSlides),
    (o.loopedSlides = y);
  const h = o.grid && m.grid && m.grid.rows > 1;
  f.length < w + y
    ? ht(
        'Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled and not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters',
      )
    : h &&
      m.grid.fill === 'row' &&
      ht(
        'Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`',
      );
  const p = [],
    b = [];
  let x = o.activeIndex;
  typeof n > 'u'
    ? (n = o.getSlideIndex(
        f.filter((S) => S.classList.contains(m.slideActiveClass))[0],
      ))
    : (x = n);
  const A = s === 'next' || !s,
    $ = s === 'prev' || !s;
  let I = 0,
    T = 0;
  const _ = h ? Math.ceil(f.length / m.grid.rows) : f.length,
    C = (h ? f[n].column : n) + (v && typeof r > 'u' ? -w / 2 + 0.5 : 0);
  if (C < y) {
    I = Math.max(y - C, g);
    for (let S = 0; S < y - C; S += 1) {
      const E = S - Math.floor(S / _) * _;
      if (h) {
        const O = _ - E - 1;
        for (let R = f.length - 1; R >= 0; R -= 1)
          f[R].column === O && p.push(R);
      } else p.push(_ - E - 1);
    }
  } else if (C + w > _ - y) {
    T = Math.max(C - (_ - y * 2), g);
    for (let S = 0; S < T; S += 1) {
      const E = S - Math.floor(S / _) * _;
      h
        ? f.forEach((O, R) => {
            O.column === E && b.push(R);
          })
        : b.push(E);
    }
  }
  if (
    ((o.__preventObserver__ = !0),
    requestAnimationFrame(() => {
      o.__preventObserver__ = !1;
    }),
    $ &&
      p.forEach((S) => {
        (f[S].swiperLoopMoveDOM = !0),
          u.prepend(f[S]),
          (f[S].swiperLoopMoveDOM = !1);
      }),
    A &&
      b.forEach((S) => {
        (f[S].swiperLoopMoveDOM = !0),
          u.append(f[S]),
          (f[S].swiperLoopMoveDOM = !1);
      }),
    o.recalcSlides(),
    m.slidesPerView === 'auto'
      ? o.updateSlides()
      : h &&
        ((p.length > 0 && $) || (b.length > 0 && A)) &&
        o.slides.forEach((S, E) => {
          o.grid.updateSlide(E, S, o.slides);
        }),
    m.watchSlidesProgress && o.updateSlidesOffset(),
    i)
  ) {
    if (p.length > 0 && $) {
      if (typeof e > 'u') {
        const S = o.slidesGrid[x],
          O = o.slidesGrid[x + I] - S;
        l
          ? o.setTranslate(o.translate - O)
          : (o.slideTo(x + Math.ceil(I), 0, !1, !0),
            r &&
              ((o.touchEventsData.startTranslate =
                o.touchEventsData.startTranslate - O),
              (o.touchEventsData.currentTranslate =
                o.touchEventsData.currentTranslate - O)));
      } else if (r) {
        const S = h ? p.length / m.grid.rows : p.length;
        o.slideTo(o.activeIndex + S, 0, !1, !0),
          (o.touchEventsData.currentTranslate = o.translate);
      }
    } else if (b.length > 0 && A)
      if (typeof e > 'u') {
        const S = o.slidesGrid[x],
          O = o.slidesGrid[x - T] - S;
        l
          ? o.setTranslate(o.translate - O)
          : (o.slideTo(x - T, 0, !1, !0),
            r &&
              ((o.touchEventsData.startTranslate =
                o.touchEventsData.startTranslate - O),
              (o.touchEventsData.currentTranslate =
                o.touchEventsData.currentTranslate - O)));
      } else {
        const S = h ? b.length / m.grid.rows : b.length;
        o.slideTo(o.activeIndex - S, 0, !1, !0);
      }
  }
  if (
    ((o.allowSlidePrev = c),
    (o.allowSlideNext = d),
    o.controller && o.controller.control && !a)
  ) {
    const S = {
      slideRealIndex: e,
      direction: s,
      setTranslate: r,
      activeSlideIndex: n,
      byController: !0,
    };
    Array.isArray(o.controller.control)
      ? o.controller.control.forEach((E) => {
          !E.destroyed &&
            E.params.loop &&
            E.loopFix({
              ...S,
              slideTo: E.params.slidesPerView === m.slidesPerView ? i : !1,
            });
        })
      : o.controller.control instanceof o.constructor &&
        o.controller.control.params.loop &&
        o.controller.control.loopFix({
          ...S,
          slideTo:
            o.controller.control.params.slidesPerView === m.slidesPerView
              ? i
              : !1,
        });
  }
  o.emit('loopFix');
}
function _o() {
  const t = this,
    { params: e, slidesEl: i } = t;
  if (!e.loop || (t.virtual && t.params.virtual.enabled)) return;
  t.recalcSlides();
  const s = [];
  t.slides.forEach((r) => {
    const n =
      typeof r.swiperSlideIndex > 'u'
        ? r.getAttribute('data-swiper-slide-index') * 1
        : r.swiperSlideIndex;
    s[n] = r;
  }),
    t.slides.forEach((r) => {
      r.removeAttribute('data-swiper-slide-index');
    }),
    s.forEach((r) => {
      i.append(r);
    }),
    t.recalcSlides(),
    t.slideTo(t.realIndex, 0);
}
var Co = { loopCreate: To, loopFix: Mo, loopDestroy: _o };
function Po(t) {
  const e = this;
  if (
    !e.params.simulateTouch ||
    (e.params.watchOverflow && e.isLocked) ||
    e.params.cssMode
  )
    return;
  const i = e.params.touchEventsTarget === 'container' ? e.el : e.wrapperEl;
  e.isElement && (e.__preventObserver__ = !0),
    (i.style.cursor = 'move'),
    (i.style.cursor = t ? 'grabbing' : 'grab'),
    e.isElement &&
      requestAnimationFrame(() => {
        e.__preventObserver__ = !1;
      });
}
function Ao() {
  const t = this;
  (t.params.watchOverflow && t.isLocked) ||
    t.params.cssMode ||
    (t.isElement && (t.__preventObserver__ = !0),
    (t[
      t.params.touchEventsTarget === 'container' ? 'el' : 'wrapperEl'
    ].style.cursor = ''),
    t.isElement &&
      requestAnimationFrame(() => {
        t.__preventObserver__ = !1;
      }));
}
var Lo = { setGrabCursor: Po, unsetGrabCursor: Ao };
function Io(t, e) {
  e === void 0 && (e = this);
  function i(s) {
    if (!s || s === K() || s === j()) return null;
    s.assignedSlot && (s = s.assignedSlot);
    const r = s.closest(t);
    return !r && !s.getRootNode ? null : r || i(s.getRootNode().host);
  }
  return i(e);
}
function ts(t, e, i) {
  const s = j(),
    { params: r } = t,
    n = r.edgeSwipeDetection,
    a = r.edgeSwipeThreshold;
  return n && (i <= a || i >= s.innerWidth - a)
    ? n === 'prevent'
      ? (e.preventDefault(), !0)
      : !1
    : !0;
}
function Oo(t) {
  const e = this,
    i = K();
  let s = t;
  s.originalEvent && (s = s.originalEvent);
  const r = e.touchEventsData;
  if (s.type === 'pointerdown') {
    if (r.pointerId !== null && r.pointerId !== s.pointerId) return;
    r.pointerId = s.pointerId;
  } else
    s.type === 'touchstart' &&
      s.targetTouches.length === 1 &&
      (r.touchId = s.targetTouches[0].identifier);
  if (s.type === 'touchstart') {
    ts(e, s, s.targetTouches[0].pageX);
    return;
  }
  const { params: n, touches: a, enabled: l } = e;
  if (
    !l ||
    (!n.simulateTouch && s.pointerType === 'mouse') ||
    (e.animating && n.preventInteractionOnTransition)
  )
    return;
  !e.animating && n.cssMode && n.loop && e.loopFix();
  let o = s.target;
  if (
    (n.touchEventsTarget === 'wrapper' && !Ba(o, e.wrapperEl)) ||
    ('which' in s && s.which === 3) ||
    ('button' in s && s.button > 0) ||
    (r.isTouched && r.isMoved)
  )
    return;
  const f = !!n.noSwipingClass && n.noSwipingClass !== '',
    c = s.composedPath ? s.composedPath() : s.path;
  f && s.target && s.target.shadowRoot && c && (o = c[0]);
  const d = n.noSwipingSelector ? n.noSwipingSelector : `.${n.noSwipingClass}`,
    u = !!(s.target && s.target.shadowRoot);
  if (n.noSwiping && (u ? Io(d, o) : o.closest(d))) {
    e.allowClick = !0;
    return;
  }
  if (n.swipeHandler && !o.closest(n.swipeHandler)) return;
  (a.currentX = s.pageX), (a.currentY = s.pageY);
  const m = a.currentX,
    v = a.currentY;
  if (!ts(e, s, m)) return;
  Object.assign(r, {
    isTouched: !0,
    isMoved: !1,
    allowTouchCallbacks: !0,
    isScrolling: void 0,
    startMoving: void 0,
  }),
    (a.startX = m),
    (a.startY = v),
    (r.touchStartTime = te()),
    (e.allowClick = !0),
    e.updateSize(),
    (e.swipeDirection = void 0),
    n.threshold > 0 && (r.allowThresholdMove = !1);
  let w = !0;
  o.matches(r.focusableElements) &&
    ((w = !1), o.nodeName === 'SELECT' && (r.isTouched = !1)),
    i.activeElement &&
      i.activeElement.matches(r.focusableElements) &&
      i.activeElement !== o &&
      (s.pointerType === 'mouse' ||
        (s.pointerType !== 'mouse' && !o.matches(r.focusableElements))) &&
      i.activeElement.blur();
  const g = w && e.allowTouchMove && n.touchStartPreventDefault;
  (n.touchStartForcePreventDefault || g) &&
    !o.isContentEditable &&
    s.preventDefault(),
    n.freeMode &&
      n.freeMode.enabled &&
      e.freeMode &&
      e.animating &&
      !n.cssMode &&
      e.freeMode.onTouchStart(),
    e.emit('touchStart', s);
}
function $o(t) {
  const e = K(),
    i = this,
    s = i.touchEventsData,
    { params: r, touches: n, rtlTranslate: a, enabled: l } = i;
  if (!l || (!r.simulateTouch && t.pointerType === 'mouse')) return;
  let o = t;
  if (
    (o.originalEvent && (o = o.originalEvent),
    o.type === 'pointermove' &&
      (s.touchId !== null || o.pointerId !== s.pointerId))
  )
    return;
  let f;
  if (o.type === 'touchmove') {
    if (
      ((f = [...o.changedTouches].filter((A) => A.identifier === s.touchId)[0]),
      !f || f.identifier !== s.touchId)
    )
      return;
  } else f = o;
  if (!s.isTouched) {
    s.startMoving && s.isScrolling && i.emit('touchMoveOpposite', o);
    return;
  }
  const c = f.pageX,
    d = f.pageY;
  if (o.preventedByNestedSwiper) {
    (n.startX = c), (n.startY = d);
    return;
  }
  if (!i.allowTouchMove) {
    o.target.matches(s.focusableElements) || (i.allowClick = !1),
      s.isTouched &&
        (Object.assign(n, { startX: c, startY: d, currentX: c, currentY: d }),
        (s.touchStartTime = te()));
    return;
  }
  if (r.touchReleaseOnEdges && !r.loop) {
    if (i.isVertical()) {
      if (
        (d < n.startY && i.translate <= i.maxTranslate()) ||
        (d > n.startY && i.translate >= i.minTranslate())
      ) {
        (s.isTouched = !1), (s.isMoved = !1);
        return;
      }
    } else if (
      (c < n.startX && i.translate <= i.maxTranslate()) ||
      (c > n.startX && i.translate >= i.minTranslate())
    )
      return;
  }
  if (
    (e.activeElement &&
      e.activeElement.matches(s.focusableElements) &&
      e.activeElement !== o.target &&
      o.pointerType !== 'mouse' &&
      e.activeElement.blur(),
    e.activeElement &&
      o.target === e.activeElement &&
      o.target.matches(s.focusableElements))
  ) {
    (s.isMoved = !0), (i.allowClick = !1);
    return;
  }
  s.allowTouchCallbacks && i.emit('touchMove', o),
    (n.previousX = n.currentX),
    (n.previousY = n.currentY),
    (n.currentX = c),
    (n.currentY = d);
  const u = n.currentX - n.startX,
    m = n.currentY - n.startY;
  if (i.params.threshold && Math.sqrt(u ** 2 + m ** 2) < i.params.threshold)
    return;
  if (typeof s.isScrolling > 'u') {
    let A;
    (i.isHorizontal() && n.currentY === n.startY) ||
    (i.isVertical() && n.currentX === n.startX)
      ? (s.isScrolling = !1)
      : u * u + m * m >= 25 &&
        ((A = (Math.atan2(Math.abs(m), Math.abs(u)) * 180) / Math.PI),
        (s.isScrolling = i.isHorizontal()
          ? A > r.touchAngle
          : 90 - A > r.touchAngle));
  }
  if (
    (s.isScrolling && i.emit('touchMoveOpposite', o),
    typeof s.startMoving > 'u' &&
      (n.currentX !== n.startX || n.currentY !== n.startY) &&
      (s.startMoving = !0),
    s.isScrolling ||
      (o.type === 'touchmove' && s.preventTouchMoveFromPointerMove))
  ) {
    s.isTouched = !1;
    return;
  }
  if (!s.startMoving) return;
  (i.allowClick = !1),
    !r.cssMode && o.cancelable && o.preventDefault(),
    r.touchMoveStopPropagation && !r.nested && o.stopPropagation();
  let v = i.isHorizontal() ? u : m,
    w = i.isHorizontal() ? n.currentX - n.previousX : n.currentY - n.previousY;
  r.oneWayMovement &&
    ((v = Math.abs(v) * (a ? 1 : -1)), (w = Math.abs(w) * (a ? 1 : -1))),
    (n.diff = v),
    (v *= r.touchRatio),
    a && ((v = -v), (w = -w));
  const g = i.touchesDirection;
  (i.swipeDirection = v > 0 ? 'prev' : 'next'),
    (i.touchesDirection = w > 0 ? 'prev' : 'next');
  const y = i.params.loop && !r.cssMode,
    h =
      (i.touchesDirection === 'next' && i.allowSlideNext) ||
      (i.touchesDirection === 'prev' && i.allowSlidePrev);
  if (!s.isMoved) {
    if (
      (y && h && i.loopFix({ direction: i.swipeDirection }),
      (s.startTranslate = i.getTranslate()),
      i.setTransition(0),
      i.animating)
    ) {
      const A = new window.CustomEvent('transitionend', {
        bubbles: !0,
        cancelable: !0,
        detail: { bySwiperTouchMove: !0 },
      });
      i.wrapperEl.dispatchEvent(A);
    }
    (s.allowMomentumBounce = !1),
      r.grabCursor &&
        (i.allowSlideNext === !0 || i.allowSlidePrev === !0) &&
        i.setGrabCursor(!0),
      i.emit('sliderFirstMove', o);
  }
  let p;
  if (
    (new Date().getTime(),
    s.isMoved &&
      s.allowThresholdMove &&
      g !== i.touchesDirection &&
      y &&
      h &&
      Math.abs(v) >= 1)
  ) {
    Object.assign(n, {
      startX: c,
      startY: d,
      currentX: c,
      currentY: d,
      startTranslate: s.currentTranslate,
    }),
      (s.loopSwapReset = !0),
      (s.startTranslate = s.currentTranslate);
    return;
  }
  i.emit('sliderMove', o),
    (s.isMoved = !0),
    (s.currentTranslate = v + s.startTranslate);
  let b = !0,
    x = r.resistanceRatio;
  if (
    (r.touchReleaseOnEdges && (x = 0),
    v > 0
      ? (y &&
          h &&
          !p &&
          s.allowThresholdMove &&
          s.currentTranslate >
            (r.centeredSlides
              ? i.minTranslate() -
                i.slidesSizesGrid[i.activeIndex + 1] -
                (r.slidesPerView !== 'auto' &&
                i.slides.length - r.slidesPerView >= 2
                  ? i.slidesSizesGrid[i.activeIndex + 1] + i.params.spaceBetween
                  : 0) -
                i.params.spaceBetween
              : i.minTranslate()) &&
          i.loopFix({
            direction: 'prev',
            setTranslate: !0,
            activeSlideIndex: 0,
          }),
        s.currentTranslate > i.minTranslate() &&
          ((b = !1),
          r.resistance &&
            (s.currentTranslate =
              i.minTranslate() -
              1 +
              (-i.minTranslate() + s.startTranslate + v) ** x)))
      : v < 0 &&
        (y &&
          h &&
          !p &&
          s.allowThresholdMove &&
          s.currentTranslate <
            (r.centeredSlides
              ? i.maxTranslate() +
                i.slidesSizesGrid[i.slidesSizesGrid.length - 1] +
                i.params.spaceBetween +
                (r.slidesPerView !== 'auto' &&
                i.slides.length - r.slidesPerView >= 2
                  ? i.slidesSizesGrid[i.slidesSizesGrid.length - 1] +
                    i.params.spaceBetween
                  : 0)
              : i.maxTranslate()) &&
          i.loopFix({
            direction: 'next',
            setTranslate: !0,
            activeSlideIndex:
              i.slides.length -
              (r.slidesPerView === 'auto'
                ? i.slidesPerViewDynamic()
                : Math.ceil(parseFloat(r.slidesPerView, 10))),
          }),
        s.currentTranslate < i.maxTranslate() &&
          ((b = !1),
          r.resistance &&
            (s.currentTranslate =
              i.maxTranslate() +
              1 -
              (i.maxTranslate() - s.startTranslate - v) ** x))),
    b && (o.preventedByNestedSwiper = !0),
    !i.allowSlideNext &&
      i.swipeDirection === 'next' &&
      s.currentTranslate < s.startTranslate &&
      (s.currentTranslate = s.startTranslate),
    !i.allowSlidePrev &&
      i.swipeDirection === 'prev' &&
      s.currentTranslate > s.startTranslate &&
      (s.currentTranslate = s.startTranslate),
    !i.allowSlidePrev &&
      !i.allowSlideNext &&
      (s.currentTranslate = s.startTranslate),
    r.threshold > 0)
  )
    if (Math.abs(v) > r.threshold || s.allowThresholdMove) {
      if (!s.allowThresholdMove) {
        (s.allowThresholdMove = !0),
          (n.startX = n.currentX),
          (n.startY = n.currentY),
          (s.currentTranslate = s.startTranslate),
          (n.diff = i.isHorizontal()
            ? n.currentX - n.startX
            : n.currentY - n.startY);
        return;
      }
    } else {
      s.currentTranslate = s.startTranslate;
      return;
    }
  !r.followFinger ||
    r.cssMode ||
    (((r.freeMode && r.freeMode.enabled && i.freeMode) ||
      r.watchSlidesProgress) &&
      (i.updateActiveIndex(), i.updateSlidesClasses()),
    r.freeMode && r.freeMode.enabled && i.freeMode && i.freeMode.onTouchMove(),
    i.updateProgress(s.currentTranslate),
    i.setTranslate(s.currentTranslate));
}
function zo(t) {
  const e = this,
    i = e.touchEventsData;
  let s = t;
  s.originalEvent && (s = s.originalEvent);
  let r;
  if (s.type === 'touchend' || s.type === 'touchcancel') {
    if (
      ((r = [...s.changedTouches].filter((x) => x.identifier === i.touchId)[0]),
      !r || r.identifier !== i.touchId)
    )
      return;
  } else {
    if (i.touchId !== null || s.pointerId !== i.pointerId) return;
    r = s;
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
  (i.pointerId = null), (i.touchId = null);
  const {
    params: a,
    touches: l,
    rtlTranslate: o,
    slidesGrid: f,
    enabled: c,
  } = e;
  if (!c || (!a.simulateTouch && s.pointerType === 'mouse')) return;
  if (
    (i.allowTouchCallbacks && e.emit('touchEnd', s),
    (i.allowTouchCallbacks = !1),
    !i.isTouched)
  ) {
    i.isMoved && a.grabCursor && e.setGrabCursor(!1),
      (i.isMoved = !1),
      (i.startMoving = !1);
    return;
  }
  a.grabCursor &&
    i.isMoved &&
    i.isTouched &&
    (e.allowSlideNext === !0 || e.allowSlidePrev === !0) &&
    e.setGrabCursor(!1);
  const d = te(),
    u = d - i.touchStartTime;
  if (e.allowClick) {
    const x = s.path || (s.composedPath && s.composedPath());
    e.updateClickedSlide((x && x[0]) || s.target, x),
      e.emit('tap click', s),
      u < 300 &&
        d - i.lastClickTime < 300 &&
        e.emit('doubleTap doubleClick', s);
  }
  if (
    ((i.lastClickTime = te()),
    Te(() => {
      e.destroyed || (e.allowClick = !0);
    }),
    !i.isTouched ||
      !i.isMoved ||
      !e.swipeDirection ||
      (l.diff === 0 && !i.loopSwapReset) ||
      (i.currentTranslate === i.startTranslate && !i.loopSwapReset))
  ) {
    (i.isTouched = !1), (i.isMoved = !1), (i.startMoving = !1);
    return;
  }
  (i.isTouched = !1), (i.isMoved = !1), (i.startMoving = !1);
  let m;
  if (
    (a.followFinger
      ? (m = o ? e.translate : -e.translate)
      : (m = -i.currentTranslate),
    a.cssMode)
  )
    return;
  if (a.freeMode && a.freeMode.enabled) {
    e.freeMode.onTouchEnd({ currentPos: m });
    return;
  }
  const v = m >= -e.maxTranslate() && !e.params.loop;
  let w = 0,
    g = e.slidesSizesGrid[0];
  for (
    let x = 0;
    x < f.length;
    x += x < a.slidesPerGroupSkip ? 1 : a.slidesPerGroup
  ) {
    const A = x < a.slidesPerGroupSkip - 1 ? 1 : a.slidesPerGroup;
    typeof f[x + A] < 'u'
      ? (v || (m >= f[x] && m < f[x + A])) && ((w = x), (g = f[x + A] - f[x]))
      : (v || m >= f[x]) && ((w = x), (g = f[f.length - 1] - f[f.length - 2]));
  }
  let y = null,
    h = null;
  a.rewind &&
    (e.isBeginning
      ? (h =
          a.virtual && a.virtual.enabled && e.virtual
            ? e.virtual.slides.length - 1
            : e.slides.length - 1)
      : e.isEnd && (y = 0));
  const p = (m - f[w]) / g,
    b = w < a.slidesPerGroupSkip - 1 ? 1 : a.slidesPerGroup;
  if (u > a.longSwipesMs) {
    if (!a.longSwipes) {
      e.slideTo(e.activeIndex);
      return;
    }
    e.swipeDirection === 'next' &&
      (p >= a.longSwipesRatio
        ? e.slideTo(a.rewind && e.isEnd ? y : w + b)
        : e.slideTo(w)),
      e.swipeDirection === 'prev' &&
        (p > 1 - a.longSwipesRatio
          ? e.slideTo(w + b)
          : h !== null && p < 0 && Math.abs(p) > a.longSwipesRatio
          ? e.slideTo(h)
          : e.slideTo(w));
  } else {
    if (!a.shortSwipes) {
      e.slideTo(e.activeIndex);
      return;
    }
    e.navigation &&
    (s.target === e.navigation.nextEl || s.target === e.navigation.prevEl)
      ? s.target === e.navigation.nextEl
        ? e.slideTo(w + b)
        : e.slideTo(w)
      : (e.swipeDirection === 'next' && e.slideTo(y !== null ? y : w + b),
        e.swipeDirection === 'prev' && e.slideTo(h !== null ? h : w));
  }
}
function is() {
  const t = this,
    { params: e, el: i } = t;
  if (i && i.offsetWidth === 0) return;
  e.breakpoints && t.setBreakpoint();
  const { allowSlideNext: s, allowSlidePrev: r, snapGrid: n } = t,
    a = t.virtual && t.params.virtual.enabled;
  (t.allowSlideNext = !0),
    (t.allowSlidePrev = !0),
    t.updateSize(),
    t.updateSlides(),
    t.updateSlidesClasses();
  const l = a && e.loop;
  (e.slidesPerView === 'auto' || e.slidesPerView > 1) &&
  t.isEnd &&
  !t.isBeginning &&
  !t.params.centeredSlides &&
  !l
    ? t.slideTo(t.slides.length - 1, 0, !1, !0)
    : t.params.loop && !a
    ? t.slideToLoop(t.realIndex, 0, !1, !0)
    : t.slideTo(t.activeIndex, 0, !1, !0),
    t.autoplay &&
      t.autoplay.running &&
      t.autoplay.paused &&
      (clearTimeout(t.autoplay.resizeTimeout),
      (t.autoplay.resizeTimeout = setTimeout(() => {
        t.autoplay &&
          t.autoplay.running &&
          t.autoplay.paused &&
          t.autoplay.resume();
      }, 500))),
    (t.allowSlidePrev = r),
    (t.allowSlideNext = s),
    t.params.watchOverflow && n !== t.snapGrid && t.checkOverflow();
}
function Do(t) {
  const e = this;
  e.enabled &&
    (e.allowClick ||
      (e.params.preventClicks && t.preventDefault(),
      e.params.preventClicksPropagation &&
        e.animating &&
        (t.stopPropagation(), t.stopImmediatePropagation())));
}
function ko() {
  const t = this,
    { wrapperEl: e, rtlTranslate: i, enabled: s } = t;
  if (!s) return;
  (t.previousTranslate = t.translate),
    t.isHorizontal()
      ? (t.translate = -e.scrollLeft)
      : (t.translate = -e.scrollTop),
    t.translate === 0 && (t.translate = 0),
    t.updateActiveIndex(),
    t.updateSlidesClasses();
  let r;
  const n = t.maxTranslate() - t.minTranslate();
  n === 0 ? (r = 0) : (r = (t.translate - t.minTranslate()) / n),
    r !== t.progress && t.updateProgress(i ? -t.translate : t.translate),
    t.emit('setTranslate', t.translate, !1);
}
function Ro(t) {
  const e = this;
  ct(e, t.target),
    !(
      e.params.cssMode ||
      (e.params.slidesPerView !== 'auto' && !e.params.autoHeight)
    ) && e.update();
}
function Bo() {
  const t = this;
  t.documentTouchHandlerProceeded ||
    ((t.documentTouchHandlerProceeded = !0),
    t.params.touchReleaseOnEdges && (t.el.style.touchAction = 'auto'));
}
const Sr = (t, e) => {
  const i = K(),
    { params: s, el: r, wrapperEl: n, device: a } = t,
    l = !!s.nested,
    o = e === 'on' ? 'addEventListener' : 'removeEventListener',
    f = e;
  !r ||
    typeof r == 'string' ||
    (i[o]('touchstart', t.onDocumentTouchStart, { passive: !1, capture: l }),
    r[o]('touchstart', t.onTouchStart, { passive: !1 }),
    r[o]('pointerdown', t.onTouchStart, { passive: !1 }),
    i[o]('touchmove', t.onTouchMove, { passive: !1, capture: l }),
    i[o]('pointermove', t.onTouchMove, { passive: !1, capture: l }),
    i[o]('touchend', t.onTouchEnd, { passive: !0 }),
    i[o]('pointerup', t.onTouchEnd, { passive: !0 }),
    i[o]('pointercancel', t.onTouchEnd, { passive: !0 }),
    i[o]('touchcancel', t.onTouchEnd, { passive: !0 }),
    i[o]('pointerout', t.onTouchEnd, { passive: !0 }),
    i[o]('pointerleave', t.onTouchEnd, { passive: !0 }),
    i[o]('contextmenu', t.onTouchEnd, { passive: !0 }),
    (s.preventClicks || s.preventClicksPropagation) &&
      r[o]('click', t.onClick, !0),
    s.cssMode && n[o]('scroll', t.onScroll),
    s.updateOnWindowResize
      ? t[f](
          a.ios || a.android
            ? 'resize orientationchange observerUpdate'
            : 'resize observerUpdate',
          is,
          !0,
        )
      : t[f]('observerUpdate', is, !0),
    r[o]('load', t.onLoad, { capture: !0 }));
};
function Ho() {
  const t = this,
    { params: e } = t;
  (t.onTouchStart = Oo.bind(t)),
    (t.onTouchMove = $o.bind(t)),
    (t.onTouchEnd = zo.bind(t)),
    (t.onDocumentTouchStart = Bo.bind(t)),
    e.cssMode && (t.onScroll = ko.bind(t)),
    (t.onClick = Do.bind(t)),
    (t.onLoad = Ro.bind(t)),
    Sr(t, 'on');
}
function No() {
  Sr(this, 'off');
}
var Go = { attachEvents: Ho, detachEvents: No };
const ss = (t, e) => t.grid && e.grid && e.grid.rows > 1;
function Fo() {
  const t = this,
    { realIndex: e, initialized: i, params: s, el: r } = t,
    n = s.breakpoints;
  if (!n || (n && Object.keys(n).length === 0)) return;
  const a = t.getBreakpoint(n, t.params.breakpointsBase, t.el);
  if (!a || t.currentBreakpoint === a) return;
  const o = (a in n ? n[a] : void 0) || t.originalParams,
    f = ss(t, s),
    c = ss(t, o),
    d = t.params.grabCursor,
    u = o.grabCursor,
    m = s.enabled;
  f && !c
    ? (r.classList.remove(
        `${s.containerModifierClass}grid`,
        `${s.containerModifierClass}grid-column`,
      ),
      t.emitContainerClasses())
    : !f &&
      c &&
      (r.classList.add(`${s.containerModifierClass}grid`),
      ((o.grid.fill && o.grid.fill === 'column') ||
        (!o.grid.fill && s.grid.fill === 'column')) &&
        r.classList.add(`${s.containerModifierClass}grid-column`),
      t.emitContainerClasses()),
    d && !u ? t.unsetGrabCursor() : !d && u && t.setGrabCursor(),
    ['navigation', 'pagination', 'scrollbar'].forEach((p) => {
      if (typeof o[p] > 'u') return;
      const b = s[p] && s[p].enabled,
        x = o[p] && o[p].enabled;
      b && !x && t[p].disable(), !b && x && t[p].enable();
    });
  const v = o.direction && o.direction !== s.direction,
    w = s.loop && (o.slidesPerView !== s.slidesPerView || v),
    g = s.loop;
  v && i && t.changeDirection(), Q(t.params, o);
  const y = t.params.enabled,
    h = t.params.loop;
  Object.assign(t, {
    allowTouchMove: t.params.allowTouchMove,
    allowSlideNext: t.params.allowSlideNext,
    allowSlidePrev: t.params.allowSlidePrev,
  }),
    m && !y ? t.disable() : !m && y && t.enable(),
    (t.currentBreakpoint = a),
    t.emit('_beforeBreakpoint', o),
    i &&
      (w
        ? (t.loopDestroy(), t.loopCreate(e), t.updateSlides())
        : !g && h
        ? (t.loopCreate(e), t.updateSlides())
        : g && !h && t.loopDestroy()),
    t.emit('breakpoint', o);
}
function Vo(t, e, i) {
  if ((e === void 0 && (e = 'window'), !t || (e === 'container' && !i))) return;
  let s = !1;
  const r = j(),
    n = e === 'window' ? r.innerHeight : i.clientHeight,
    a = Object.keys(t).map((l) => {
      if (typeof l == 'string' && l.indexOf('@') === 0) {
        const o = parseFloat(l.substr(1));
        return { value: n * o, point: l };
      }
      return { value: l, point: l };
    });
  a.sort((l, o) => parseInt(l.value, 10) - parseInt(o.value, 10));
  for (let l = 0; l < a.length; l += 1) {
    const { point: o, value: f } = a[l];
    e === 'window'
      ? r.matchMedia(`(min-width: ${f}px)`).matches && (s = o)
      : f <= i.clientWidth && (s = o);
  }
  return s || 'max';
}
var Xo = { setBreakpoint: Fo, getBreakpoint: Vo };
function Yo(t, e) {
  const i = [];
  return (
    t.forEach((s) => {
      typeof s == 'object'
        ? Object.keys(s).forEach((r) => {
            s[r] && i.push(e + r);
          })
        : typeof s == 'string' && i.push(e + s);
    }),
    i
  );
}
function jo() {
  const t = this,
    { classNames: e, params: i, rtl: s, el: r, device: n } = t,
    a = Yo(
      [
        'initialized',
        i.direction,
        { 'free-mode': t.params.freeMode && i.freeMode.enabled },
        { autoheight: i.autoHeight },
        { rtl: s },
        { grid: i.grid && i.grid.rows > 1 },
        {
          'grid-column': i.grid && i.grid.rows > 1 && i.grid.fill === 'column',
        },
        { android: n.android },
        { ios: n.ios },
        { 'css-mode': i.cssMode },
        { centered: i.cssMode && i.centeredSlides },
        { 'watch-progress': i.watchSlidesProgress },
      ],
      i.containerModifierClass,
    );
  e.push(...a), r.classList.add(...e), t.emitContainerClasses();
}
function Wo() {
  const t = this,
    { el: e, classNames: i } = t;
  !e ||
    typeof e == 'string' ||
    (e.classList.remove(...i), t.emitContainerClasses());
}
var qo = { addClasses: jo, removeClasses: Wo };
function Ko() {
  const t = this,
    { isLocked: e, params: i } = t,
    { slidesOffsetBefore: s } = i;
  if (s) {
    const r = t.slides.length - 1,
      n = t.slidesGrid[r] + t.slidesSizesGrid[r] + s * 2;
    t.isLocked = t.size > n;
  } else t.isLocked = t.snapGrid.length === 1;
  i.allowSlideNext === !0 && (t.allowSlideNext = !t.isLocked),
    i.allowSlidePrev === !0 && (t.allowSlidePrev = !t.isLocked),
    e && e !== t.isLocked && (t.isEnd = !1),
    e !== t.isLocked && t.emit(t.isLocked ? 'lock' : 'unlock');
}
var Uo = { checkOverflow: Ko },
  rs = {
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
function Jo(t, e) {
  return function (s) {
    s === void 0 && (s = {});
    const r = Object.keys(s)[0],
      n = s[r];
    if (typeof n != 'object' || n === null) {
      Q(e, s);
      return;
    }
    if (
      (t[r] === !0 && (t[r] = { enabled: !0 }),
      r === 'navigation' &&
        t[r] &&
        t[r].enabled &&
        !t[r].prevEl &&
        !t[r].nextEl &&
        (t[r].auto = !0),
      ['pagination', 'scrollbar'].indexOf(r) >= 0 &&
        t[r] &&
        t[r].enabled &&
        !t[r].el &&
        (t[r].auto = !0),
      !(r in t && 'enabled' in n))
    ) {
      Q(e, s);
      return;
    }
    typeof t[r] == 'object' && !('enabled' in t[r]) && (t[r].enabled = !0),
      t[r] || (t[r] = { enabled: !1 }),
      Q(e, s);
  };
}
const Nt = {
    eventsEmitter: Wa,
    update: ro,
    translate: uo,
    transition: ho,
    slide: Eo,
    loop: Co,
    grabCursor: Lo,
    events: Go,
    breakpoints: Xo,
    checkOverflow: Uo,
    classes: qo,
  },
  Gt = {};
class Z {
  constructor() {
    let e, i;
    for (var s = arguments.length, r = new Array(s), n = 0; n < s; n++)
      r[n] = arguments[n];
    r.length === 1 &&
    r[0].constructor &&
    Object.prototype.toString.call(r[0]).slice(8, -1) === 'Object'
      ? (i = r[0])
      : ([e, i] = r),
      i || (i = {}),
      (i = Q({}, i)),
      e && !i.el && (i.el = e);
    const a = K();
    if (
      i.el &&
      typeof i.el == 'string' &&
      a.querySelectorAll(i.el).length > 1
    ) {
      const c = [];
      return (
        a.querySelectorAll(i.el).forEach((d) => {
          const u = Q({}, i, { el: d });
          c.push(new Z(u));
        }),
        c
      );
    }
    const l = this;
    (l.__swiper__ = !0),
      (l.support = yr()),
      (l.device = br({ userAgent: i.userAgent })),
      (l.browser = Xa()),
      (l.eventsListeners = {}),
      (l.eventsAnyListeners = []),
      (l.modules = [...l.__modules__]),
      i.modules && Array.isArray(i.modules) && l.modules.push(...i.modules);
    const o = {};
    l.modules.forEach((c) => {
      c({
        params: i,
        swiper: l,
        extendParams: Jo(i, o),
        on: l.on.bind(l),
        once: l.once.bind(l),
        off: l.off.bind(l),
        emit: l.emit.bind(l),
      });
    });
    const f = Q({}, rs, o);
    return (
      (l.params = Q({}, f, Gt, i)),
      (l.originalParams = Q({}, l.params)),
      (l.passedParams = Q({}, i)),
      l.params &&
        l.params.on &&
        Object.keys(l.params.on).forEach((c) => {
          l.on(c, l.params.on[c]);
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
    const { slidesEl: i, params: s } = this,
      r = q(i, `.${s.slideClass}, swiper-slide`),
      n = qe(r[0]);
    return qe(e) - n;
  }
  getSlideIndexByData(e) {
    return this.getSlideIndex(
      this.slides.filter(
        (i) => i.getAttribute('data-swiper-slide-index') * 1 === e,
      )[0],
    );
  }
  recalcSlides() {
    const e = this,
      { slidesEl: i, params: s } = e;
    e.slides = q(i, `.${s.slideClass}, swiper-slide`);
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
  setProgress(e, i) {
    const s = this;
    e = Math.min(Math.max(e, 0), 1);
    const r = s.minTranslate(),
      a = (s.maxTranslate() - r) * e + r;
    s.translateTo(a, typeof i > 'u' ? 0 : i),
      s.updateActiveIndex(),
      s.updateSlidesClasses();
  }
  emitContainerClasses() {
    const e = this;
    if (!e.params._emitClasses || !e.el) return;
    const i = e.el.className
      .split(' ')
      .filter(
        (s) =>
          s.indexOf('swiper') === 0 ||
          s.indexOf(e.params.containerModifierClass) === 0,
      );
    e.emit('_containerClasses', i.join(' '));
  }
  getSlideClasses(e) {
    const i = this;
    return i.destroyed
      ? ''
      : e.className
          .split(' ')
          .filter(
            (s) =>
              s.indexOf('swiper-slide') === 0 ||
              s.indexOf(i.params.slideClass) === 0,
          )
          .join(' ');
  }
  emitSlidesClasses() {
    const e = this;
    if (!e.params._emitClasses || !e.el) return;
    const i = [];
    e.slides.forEach((s) => {
      const r = e.getSlideClasses(s);
      i.push({ slideEl: s, classNames: r }), e.emit('_slideClass', s, r);
    }),
      e.emit('_slideClasses', i);
  }
  slidesPerViewDynamic(e, i) {
    e === void 0 && (e = 'current'), i === void 0 && (i = !1);
    const s = this,
      {
        params: r,
        slides: n,
        slidesGrid: a,
        slidesSizesGrid: l,
        size: o,
        activeIndex: f,
      } = s;
    let c = 1;
    if (typeof r.slidesPerView == 'number') return r.slidesPerView;
    if (r.centeredSlides) {
      let d = n[f] ? Math.ceil(n[f].swiperSlideSize) : 0,
        u;
      for (let m = f + 1; m < n.length; m += 1)
        n[m] &&
          !u &&
          ((d += Math.ceil(n[m].swiperSlideSize)), (c += 1), d > o && (u = !0));
      for (let m = f - 1; m >= 0; m -= 1)
        n[m] &&
          !u &&
          ((d += n[m].swiperSlideSize), (c += 1), d > o && (u = !0));
    } else if (e === 'current')
      for (let d = f + 1; d < n.length; d += 1)
        (i ? a[d] + l[d] - a[f] < o : a[d] - a[f] < o) && (c += 1);
    else for (let d = f - 1; d >= 0; d -= 1) a[f] - a[d] < o && (c += 1);
    return c;
  }
  update() {
    const e = this;
    if (!e || e.destroyed) return;
    const { snapGrid: i, params: s } = e;
    s.breakpoints && e.setBreakpoint(),
      [...e.el.querySelectorAll('[loading="lazy"]')].forEach((a) => {
        a.complete && ct(e, a);
      }),
      e.updateSize(),
      e.updateSlides(),
      e.updateProgress(),
      e.updateSlidesClasses();
    function r() {
      const a = e.rtlTranslate ? e.translate * -1 : e.translate,
        l = Math.min(Math.max(a, e.maxTranslate()), e.minTranslate());
      e.setTranslate(l), e.updateActiveIndex(), e.updateSlidesClasses();
    }
    let n;
    if (s.freeMode && s.freeMode.enabled && !s.cssMode)
      r(), s.autoHeight && e.updateAutoHeight();
    else {
      if (
        (s.slidesPerView === 'auto' || s.slidesPerView > 1) &&
        e.isEnd &&
        !s.centeredSlides
      ) {
        const a = e.virtual && s.virtual.enabled ? e.virtual.slides : e.slides;
        n = e.slideTo(a.length - 1, 0, !1, !0);
      } else n = e.slideTo(e.activeIndex, 0, !1, !0);
      n || r();
    }
    s.watchOverflow && i !== e.snapGrid && e.checkOverflow(), e.emit('update');
  }
  changeDirection(e, i) {
    i === void 0 && (i = !0);
    const s = this,
      r = s.params.direction;
    return (
      e || (e = r === 'horizontal' ? 'vertical' : 'horizontal'),
      e === r ||
        (e !== 'horizontal' && e !== 'vertical') ||
        (s.el.classList.remove(`${s.params.containerModifierClass}${r}`),
        s.el.classList.add(`${s.params.containerModifierClass}${e}`),
        s.emitContainerClasses(),
        (s.params.direction = e),
        s.slides.forEach((n) => {
          e === 'vertical' ? (n.style.width = '') : (n.style.height = '');
        }),
        s.emit('changeDirection'),
        i && s.update()),
      s
    );
  }
  changeLanguageDirection(e) {
    const i = this;
    (i.rtl && e === 'rtl') ||
      (!i.rtl && e === 'ltr') ||
      ((i.rtl = e === 'rtl'),
      (i.rtlTranslate = i.params.direction === 'horizontal' && i.rtl),
      i.rtl
        ? (i.el.classList.add(`${i.params.containerModifierClass}rtl`),
          (i.el.dir = 'rtl'))
        : (i.el.classList.remove(`${i.params.containerModifierClass}rtl`),
          (i.el.dir = 'ltr')),
      i.update());
  }
  mount(e) {
    const i = this;
    if (i.mounted) return !0;
    let s = e || i.params.el;
    if ((typeof s == 'string' && (s = document.querySelector(s)), !s))
      return !1;
    (s.swiper = i),
      s.parentNode &&
        s.parentNode.host &&
        s.parentNode.host.nodeName ===
          i.params.swiperElementNodeName.toUpperCase() &&
        (i.isElement = !0);
    const r = () =>
      `.${(i.params.wrapperClass || '').trim().split(' ').join('.')}`;
    let a = (() =>
      s && s.shadowRoot && s.shadowRoot.querySelector
        ? s.shadowRoot.querySelector(r())
        : q(s, r())[0])();
    return (
      !a &&
        i.params.createElements &&
        ((a = ee('div', i.params.wrapperClass)),
        s.append(a),
        q(s, `.${i.params.slideClass}`).forEach((l) => {
          a.append(l);
        })),
      Object.assign(i, {
        el: s,
        wrapperEl: a,
        slidesEl:
          i.isElement && !s.parentNode.host.slideSlots ? s.parentNode.host : a,
        hostEl: i.isElement ? s.parentNode.host : s,
        mounted: !0,
        rtl: s.dir.toLowerCase() === 'rtl' || ue(s, 'direction') === 'rtl',
        rtlTranslate:
          i.params.direction === 'horizontal' &&
          (s.dir.toLowerCase() === 'rtl' || ue(s, 'direction') === 'rtl'),
        wrongRTL: ue(a, 'display') === '-webkit-box',
      }),
      !0
    );
  }
  init(e) {
    const i = this;
    if (i.initialized || i.mount(e) === !1) return i;
    i.emit('beforeInit'),
      i.params.breakpoints && i.setBreakpoint(),
      i.addClasses(),
      i.updateSize(),
      i.updateSlides(),
      i.params.watchOverflow && i.checkOverflow(),
      i.params.grabCursor && i.enabled && i.setGrabCursor(),
      i.params.loop && i.virtual && i.params.virtual.enabled
        ? i.slideTo(
            i.params.initialSlide + i.virtual.slidesBefore,
            0,
            i.params.runCallbacksOnInit,
            !1,
            !0,
          )
        : i.slideTo(
            i.params.initialSlide,
            0,
            i.params.runCallbacksOnInit,
            !1,
            !0,
          ),
      i.params.loop && i.loopCreate(),
      i.attachEvents();
    const r = [...i.el.querySelectorAll('[loading="lazy"]')];
    return (
      i.isElement && r.push(...i.hostEl.querySelectorAll('[loading="lazy"]')),
      r.forEach((n) => {
        n.complete
          ? ct(i, n)
          : n.addEventListener('load', (a) => {
              ct(i, a.target);
            });
      }),
      oi(i),
      (i.initialized = !0),
      oi(i),
      i.emit('init'),
      i.emit('afterInit'),
      i
    );
  }
  destroy(e, i) {
    e === void 0 && (e = !0), i === void 0 && (i = !0);
    const s = this,
      { params: r, el: n, wrapperEl: a, slides: l } = s;
    return (
      typeof s.params > 'u' ||
        s.destroyed ||
        (s.emit('beforeDestroy'),
        (s.initialized = !1),
        s.detachEvents(),
        r.loop && s.loopDestroy(),
        i &&
          (s.removeClasses(),
          n && typeof n != 'string' && n.removeAttribute('style'),
          a && a.removeAttribute('style'),
          l &&
            l.length &&
            l.forEach((o) => {
              o.classList.remove(
                r.slideVisibleClass,
                r.slideFullyVisibleClass,
                r.slideActiveClass,
                r.slideNextClass,
                r.slidePrevClass,
              ),
                o.removeAttribute('style'),
                o.removeAttribute('data-swiper-slide-index');
            })),
        s.emit('destroy'),
        Object.keys(s.eventsListeners).forEach((o) => {
          s.off(o);
        }),
        e !== !1 &&
          (s.el && typeof s.el != 'string' && (s.el.swiper = null), Da(s)),
        (s.destroyed = !0)),
      null
    );
  }
  static extendDefaults(e) {
    Q(Gt, e);
  }
  static get extendedDefaults() {
    return Gt;
  }
  static get defaults() {
    return rs;
  }
  static installModule(e) {
    Z.prototype.__modules__ || (Z.prototype.__modules__ = []);
    const i = Z.prototype.__modules__;
    typeof e == 'function' && i.indexOf(e) < 0 && i.push(e);
  }
  static use(e) {
    return Array.isArray(e)
      ? (e.forEach((i) => Z.installModule(i)), Z)
      : (Z.installModule(e), Z);
  }
}
Object.keys(Nt).forEach((t) => {
  Object.keys(Nt[t]).forEach((e) => {
    Z.prototype[e] = Nt[t][e];
  });
});
Z.use([Ya, ja]);
function Zo(t) {
  let { swiper: e, extendParams: i, on: s, emit: r } = t;
  i({
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
  let n;
  const a = K();
  e.virtual = {
    cache: {},
    from: void 0,
    to: void 0,
    slides: [],
    offset: 0,
    slidesGrid: [],
  };
  const l = a.createElement('div');
  function o(v, w) {
    const g = e.params.virtual;
    if (g.cache && e.virtual.cache[w]) return e.virtual.cache[w];
    let y;
    return (
      g.renderSlide
        ? ((y = g.renderSlide.call(e, v, w)),
          typeof y == 'string' && ((l.innerHTML = y), (y = l.children[0])))
        : e.isElement
        ? (y = ee('swiper-slide'))
        : (y = ee('div', e.params.slideClass)),
      y.setAttribute('data-swiper-slide-index', w),
      g.renderSlide || (y.innerHTML = v),
      g.cache && (e.virtual.cache[w] = y),
      y
    );
  }
  function f(v, w) {
    const {
      slidesPerView: g,
      slidesPerGroup: y,
      centeredSlides: h,
      loop: p,
      initialSlide: b,
    } = e.params;
    if (w && !p && b > 0) return;
    const { addSlidesBefore: x, addSlidesAfter: A } = e.params.virtual,
      { from: $, to: I, slides: T, slidesGrid: _, offset: L } = e.virtual;
    e.params.cssMode || e.updateActiveIndex();
    const C = e.activeIndex || 0;
    let S;
    e.rtlTranslate ? (S = 'right') : (S = e.isHorizontal() ? 'left' : 'top');
    let E, O;
    h
      ? ((E = Math.floor(g / 2) + y + A), (O = Math.floor(g / 2) + y + x))
      : ((E = g + (y - 1) + A), (O = (p ? g : y) + x));
    let R = C - O,
      M = C + E;
    p || ((R = Math.max(R, 0)), (M = Math.min(M, T.length - 1)));
    let P = (e.slidesGrid[R] || 0) - (e.slidesGrid[0] || 0);
    p && C >= O
      ? ((R -= O), h || (P += e.slidesGrid[0]))
      : p && C < O && ((R = -O), h && (P += e.slidesGrid[0])),
      Object.assign(e.virtual, {
        from: R,
        to: M,
        offset: P,
        slidesGrid: e.slidesGrid,
        slidesBefore: O,
        slidesAfter: E,
      });
    function k() {
      e.updateSlides(),
        e.updateProgress(),
        e.updateSlidesClasses(),
        r('virtualUpdate');
    }
    if ($ === R && I === M && !v) {
      e.slidesGrid !== _ &&
        P !== L &&
        e.slides.forEach((H) => {
          H.style[S] = `${P - Math.abs(e.cssOverflowAdjustment())}px`;
        }),
        e.updateProgress(),
        r('virtualUpdate');
      return;
    }
    if (e.params.virtual.renderExternal) {
      e.params.virtual.renderExternal.call(e, {
        offset: P,
        from: R,
        to: M,
        slides: (function () {
          const F = [];
          for (let U = R; U <= M; U += 1) F.push(T[U]);
          return F;
        })(),
      }),
        e.params.virtual.renderExternalUpdate ? k() : r('virtualUpdate');
      return;
    }
    const N = [],
      z = [],
      D = (H) => {
        let F = H;
        return (
          H < 0 ? (F = T.length + H) : F >= T.length && (F = F - T.length), F
        );
      };
    if (v)
      e.slides
        .filter((H) => H.matches(`.${e.params.slideClass}, swiper-slide`))
        .forEach((H) => {
          H.remove();
        });
    else
      for (let H = $; H <= I; H += 1)
        if (H < R || H > M) {
          const F = D(H);
          e.slides
            .filter((U) =>
              U.matches(
                `.${e.params.slideClass}[data-swiper-slide-index="${F}"], swiper-slide[data-swiper-slide-index="${F}"]`,
              ),
            )
            .forEach((U) => {
              U.remove();
            });
        }
    const B = p ? -T.length : 0,
      V = p ? T.length * 2 : T.length;
    for (let H = B; H < V; H += 1)
      if (H >= R && H <= M) {
        const F = D(H);
        typeof I > 'u' || v
          ? z.push(F)
          : (H > I && z.push(F), H < $ && N.push(F));
      }
    if (
      (z.forEach((H) => {
        e.slidesEl.append(o(T[H], H));
      }),
      p)
    )
      for (let H = N.length - 1; H >= 0; H -= 1) {
        const F = N[H];
        e.slidesEl.prepend(o(T[F], F));
      }
    else
      N.sort((H, F) => F - H),
        N.forEach((H) => {
          e.slidesEl.prepend(o(T[H], H));
        });
    q(e.slidesEl, '.swiper-slide, swiper-slide').forEach((H) => {
      H.style[S] = `${P - Math.abs(e.cssOverflowAdjustment())}px`;
    }),
      k();
  }
  function c(v) {
    if (typeof v == 'object' && 'length' in v)
      for (let w = 0; w < v.length; w += 1) v[w] && e.virtual.slides.push(v[w]);
    else e.virtual.slides.push(v);
    f(!0);
  }
  function d(v) {
    const w = e.activeIndex;
    let g = w + 1,
      y = 1;
    if (Array.isArray(v)) {
      for (let h = 0; h < v.length; h += 1)
        v[h] && e.virtual.slides.unshift(v[h]);
      (g = w + v.length), (y = v.length);
    } else e.virtual.slides.unshift(v);
    if (e.params.virtual.cache) {
      const h = e.virtual.cache,
        p = {};
      Object.keys(h).forEach((b) => {
        const x = h[b],
          A = x.getAttribute('data-swiper-slide-index');
        A && x.setAttribute('data-swiper-slide-index', parseInt(A, 10) + y),
          (p[parseInt(b, 10) + y] = x);
      }),
        (e.virtual.cache = p);
    }
    f(!0), e.slideTo(g, 0);
  }
  function u(v) {
    if (typeof v > 'u' || v === null) return;
    let w = e.activeIndex;
    if (Array.isArray(v))
      for (let g = v.length - 1; g >= 0; g -= 1)
        e.params.virtual.cache &&
          (delete e.virtual.cache[v[g]],
          Object.keys(e.virtual.cache).forEach((y) => {
            y > v &&
              ((e.virtual.cache[y - 1] = e.virtual.cache[y]),
              e.virtual.cache[y - 1].setAttribute(
                'data-swiper-slide-index',
                y - 1,
              ),
              delete e.virtual.cache[y]);
          })),
          e.virtual.slides.splice(v[g], 1),
          v[g] < w && (w -= 1),
          (w = Math.max(w, 0));
    else
      e.params.virtual.cache &&
        (delete e.virtual.cache[v],
        Object.keys(e.virtual.cache).forEach((g) => {
          g > v &&
            ((e.virtual.cache[g - 1] = e.virtual.cache[g]),
            e.virtual.cache[g - 1].setAttribute(
              'data-swiper-slide-index',
              g - 1,
            ),
            delete e.virtual.cache[g]);
        })),
        e.virtual.slides.splice(v, 1),
        v < w && (w -= 1),
        (w = Math.max(w, 0));
    f(!0), e.slideTo(w, 0);
  }
  function m() {
    (e.virtual.slides = []),
      e.params.virtual.cache && (e.virtual.cache = {}),
      f(!0),
      e.slideTo(0, 0);
  }
  s('beforeInit', () => {
    if (!e.params.virtual.enabled) return;
    let v;
    if (typeof e.passedParams.virtual.slides > 'u') {
      const w = [...e.slidesEl.children].filter((g) =>
        g.matches(`.${e.params.slideClass}, swiper-slide`),
      );
      w &&
        w.length &&
        ((e.virtual.slides = [...w]),
        (v = !0),
        w.forEach((g, y) => {
          g.setAttribute('data-swiper-slide-index', y),
            (e.virtual.cache[y] = g),
            g.remove();
        }));
    }
    v || (e.virtual.slides = e.params.virtual.slides),
      e.classNames.push(`${e.params.containerModifierClass}virtual`),
      (e.params.watchSlidesProgress = !0),
      (e.originalParams.watchSlidesProgress = !0),
      f(!1, !0);
  }),
    s('setTranslate', () => {
      e.params.virtual.enabled &&
        (e.params.cssMode && !e._immediateVirtual
          ? (clearTimeout(n),
            (n = setTimeout(() => {
              f();
            }, 100)))
          : f());
    }),
    s('init update resize', () => {
      e.params.virtual.enabled &&
        e.params.cssMode &&
        Ve(e.wrapperEl, '--swiper-virtual-size', `${e.virtualSize}px`);
    }),
    Object.assign(e.virtual, {
      appendSlide: c,
      prependSlide: d,
      removeSlide: u,
      removeAllSlides: m,
      update: f,
    });
}
function Qo(t) {
  let { swiper: e, extendParams: i, on: s, emit: r } = t;
  const n = K(),
    a = j();
  (e.keyboard = { enabled: !1 }),
    i({ keyboard: { enabled: !1, onlyInViewport: !0, pageUpDown: !0 } });
  function l(c) {
    if (!e.enabled) return;
    const { rtlTranslate: d } = e;
    let u = c;
    u.originalEvent && (u = u.originalEvent);
    const m = u.keyCode || u.charCode,
      v = e.params.keyboard.pageUpDown,
      w = v && m === 33,
      g = v && m === 34,
      y = m === 37,
      h = m === 39,
      p = m === 38,
      b = m === 40;
    if (
      (!e.allowSlideNext &&
        ((e.isHorizontal() && h) || (e.isVertical() && b) || g)) ||
      (!e.allowSlidePrev &&
        ((e.isHorizontal() && y) || (e.isVertical() && p) || w))
    )
      return !1;
    if (
      !(u.shiftKey || u.altKey || u.ctrlKey || u.metaKey) &&
      !(
        n.activeElement &&
        n.activeElement.nodeName &&
        (n.activeElement.nodeName.toLowerCase() === 'input' ||
          n.activeElement.nodeName.toLowerCase() === 'textarea')
      )
    ) {
      if (e.params.keyboard.onlyInViewport && (w || g || y || h || p || b)) {
        let x = !1;
        if (
          Se(e.el, `.${e.params.slideClass}, swiper-slide`).length > 0 &&
          Se(e.el, `.${e.params.slideActiveClass}`).length === 0
        )
          return;
        const A = e.el,
          $ = A.clientWidth,
          I = A.clientHeight,
          T = a.innerWidth,
          _ = a.innerHeight,
          L = gt(A);
        d && (L.left -= A.scrollLeft);
        const C = [
          [L.left, L.top],
          [L.left + $, L.top],
          [L.left, L.top + I],
          [L.left + $, L.top + I],
        ];
        for (let S = 0; S < C.length; S += 1) {
          const E = C[S];
          if (E[0] >= 0 && E[0] <= T && E[1] >= 0 && E[1] <= _) {
            if (E[0] === 0 && E[1] === 0) continue;
            x = !0;
          }
        }
        if (!x) return;
      }
      e.isHorizontal()
        ? ((w || g || y || h) &&
            (u.preventDefault ? u.preventDefault() : (u.returnValue = !1)),
          (((g || h) && !d) || ((w || y) && d)) && e.slideNext(),
          (((w || y) && !d) || ((g || h) && d)) && e.slidePrev())
        : ((w || g || p || b) &&
            (u.preventDefault ? u.preventDefault() : (u.returnValue = !1)),
          (g || b) && e.slideNext(),
          (w || p) && e.slidePrev()),
        r('keyPress', m);
    }
  }
  function o() {
    e.keyboard.enabled ||
      (n.addEventListener('keydown', l), (e.keyboard.enabled = !0));
  }
  function f() {
    e.keyboard.enabled &&
      (n.removeEventListener('keydown', l), (e.keyboard.enabled = !1));
  }
  s('init', () => {
    e.params.keyboard.enabled && o();
  }),
    s('destroy', () => {
      e.keyboard.enabled && f();
    }),
    Object.assign(e.keyboard, { enable: o, disable: f });
}
function el(t) {
  let { swiper: e, extendParams: i, on: s, emit: r } = t;
  const n = j();
  i({
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
  let a,
    l = te(),
    o;
  const f = [];
  function c(p) {
    let $ = 0,
      I = 0,
      T = 0,
      _ = 0;
    return (
      'detail' in p && (I = p.detail),
      'wheelDelta' in p && (I = -p.wheelDelta / 120),
      'wheelDeltaY' in p && (I = -p.wheelDeltaY / 120),
      'wheelDeltaX' in p && ($ = -p.wheelDeltaX / 120),
      'axis' in p && p.axis === p.HORIZONTAL_AXIS && (($ = I), (I = 0)),
      (T = $ * 10),
      (_ = I * 10),
      'deltaY' in p && (_ = p.deltaY),
      'deltaX' in p && (T = p.deltaX),
      p.shiftKey && !T && ((T = _), (_ = 0)),
      (T || _) &&
        p.deltaMode &&
        (p.deltaMode === 1 ? ((T *= 40), (_ *= 40)) : ((T *= 800), (_ *= 800))),
      T && !$ && ($ = T < 1 ? -1 : 1),
      _ && !I && (I = _ < 1 ? -1 : 1),
      { spinX: $, spinY: I, pixelX: T, pixelY: _ }
    );
  }
  function d() {
    e.enabled && (e.mouseEntered = !0);
  }
  function u() {
    e.enabled && (e.mouseEntered = !1);
  }
  function m(p) {
    return (e.params.mousewheel.thresholdDelta &&
      p.delta < e.params.mousewheel.thresholdDelta) ||
      (e.params.mousewheel.thresholdTime &&
        te() - l < e.params.mousewheel.thresholdTime)
      ? !1
      : p.delta >= 6 && te() - l < 60
      ? !0
      : (p.direction < 0
          ? (!e.isEnd || e.params.loop) &&
            !e.animating &&
            (e.slideNext(), r('scroll', p.raw))
          : (!e.isBeginning || e.params.loop) &&
            !e.animating &&
            (e.slidePrev(), r('scroll', p.raw)),
        (l = new n.Date().getTime()),
        !1);
  }
  function v(p) {
    const b = e.params.mousewheel;
    if (p.direction < 0) {
      if (e.isEnd && !e.params.loop && b.releaseOnEdges) return !0;
    } else if (e.isBeginning && !e.params.loop && b.releaseOnEdges) return !0;
    return !1;
  }
  function w(p) {
    let b = p,
      x = !0;
    if (
      !e.enabled ||
      p.target.closest(`.${e.params.mousewheel.noMousewheelClass}`)
    )
      return;
    const A = e.params.mousewheel;
    e.params.cssMode && b.preventDefault();
    let $ = e.el;
    e.params.mousewheel.eventsTarget !== 'container' &&
      ($ = document.querySelector(e.params.mousewheel.eventsTarget));
    const I = $ && $.contains(b.target);
    if (!e.mouseEntered && !I && !A.releaseOnEdges) return !0;
    b.originalEvent && (b = b.originalEvent);
    let T = 0;
    const _ = e.rtlTranslate ? -1 : 1,
      L = c(b);
    if (A.forceToAxis)
      if (e.isHorizontal())
        if (Math.abs(L.pixelX) > Math.abs(L.pixelY)) T = -L.pixelX * _;
        else return !0;
      else if (Math.abs(L.pixelY) > Math.abs(L.pixelX)) T = -L.pixelY;
      else return !0;
    else
      T = Math.abs(L.pixelX) > Math.abs(L.pixelY) ? -L.pixelX * _ : -L.pixelY;
    if (T === 0) return !0;
    A.invert && (T = -T);
    let C = e.getTranslate() + T * A.sensitivity;
    if (
      (C >= e.minTranslate() && (C = e.minTranslate()),
      C <= e.maxTranslate() && (C = e.maxTranslate()),
      (x = e.params.loop
        ? !0
        : !(C === e.minTranslate() || C === e.maxTranslate())),
      x && e.params.nested && b.stopPropagation(),
      !e.params.freeMode || !e.params.freeMode.enabled)
    ) {
      const S = {
        time: te(),
        delta: Math.abs(T),
        direction: Math.sign(T),
        raw: p,
      };
      f.length >= 2 && f.shift();
      const E = f.length ? f[f.length - 1] : void 0;
      if (
        (f.push(S),
        E
          ? (S.direction !== E.direction ||
              S.delta > E.delta ||
              S.time > E.time + 150) &&
            m(S)
          : m(S),
        v(S))
      )
        return !0;
    } else {
      const S = { time: te(), delta: Math.abs(T), direction: Math.sign(T) },
        E =
          o &&
          S.time < o.time + 500 &&
          S.delta <= o.delta &&
          S.direction === o.direction;
      if (!E) {
        o = void 0;
        let O = e.getTranslate() + T * A.sensitivity;
        const R = e.isBeginning,
          M = e.isEnd;
        if (
          (O >= e.minTranslate() && (O = e.minTranslate()),
          O <= e.maxTranslate() && (O = e.maxTranslate()),
          e.setTransition(0),
          e.setTranslate(O),
          e.updateProgress(),
          e.updateActiveIndex(),
          e.updateSlidesClasses(),
          ((!R && e.isBeginning) || (!M && e.isEnd)) && e.updateSlidesClasses(),
          e.params.loop &&
            e.loopFix({
              direction: S.direction < 0 ? 'next' : 'prev',
              byMousewheel: !0,
            }),
          e.params.freeMode.sticky)
        ) {
          clearTimeout(a), (a = void 0), f.length >= 15 && f.shift();
          const P = f.length ? f[f.length - 1] : void 0,
            k = f[0];
          if (
            (f.push(S), P && (S.delta > P.delta || S.direction !== P.direction))
          )
            f.splice(0);
          else if (
            f.length >= 15 &&
            S.time - k.time < 500 &&
            k.delta - S.delta >= 1 &&
            S.delta <= 6
          ) {
            const N = T > 0 ? 0.8 : 0.2;
            (o = S),
              f.splice(0),
              (a = Te(() => {
                e.destroyed ||
                  !e.params ||
                  e.slideToClosest(e.params.speed, !0, void 0, N);
              }, 0));
          }
          a ||
            (a = Te(() => {
              if (e.destroyed || !e.params) return;
              const N = 0.5;
              (o = S),
                f.splice(0),
                e.slideToClosest(e.params.speed, !0, void 0, N);
            }, 500));
        }
        if (
          (E || r('scroll', b),
          e.params.autoplay &&
            e.params.autoplayDisableOnInteraction &&
            e.autoplay.stop(),
          A.releaseOnEdges &&
            (O === e.minTranslate() || O === e.maxTranslate()))
        )
          return !0;
      }
    }
    return b.preventDefault ? b.preventDefault() : (b.returnValue = !1), !1;
  }
  function g(p) {
    let b = e.el;
    e.params.mousewheel.eventsTarget !== 'container' &&
      (b = document.querySelector(e.params.mousewheel.eventsTarget)),
      b[p]('mouseenter', d),
      b[p]('mouseleave', u),
      b[p]('wheel', w);
  }
  function y() {
    return e.params.cssMode
      ? (e.wrapperEl.removeEventListener('wheel', w), !0)
      : e.mousewheel.enabled
      ? !1
      : (g('addEventListener'), (e.mousewheel.enabled = !0), !0);
  }
  function h() {
    return e.params.cssMode
      ? (e.wrapperEl.addEventListener(event, w), !0)
      : e.mousewheel.enabled
      ? (g('removeEventListener'), (e.mousewheel.enabled = !1), !0)
      : !1;
  }
  s('init', () => {
    !e.params.mousewheel.enabled && e.params.cssMode && h(),
      e.params.mousewheel.enabled && y();
  }),
    s('destroy', () => {
      e.params.cssMode && y(), e.mousewheel.enabled && h();
    }),
    Object.assign(e.mousewheel, { enable: y, disable: h });
}
function Li(t, e, i, s) {
  return (
    t.params.createElements &&
      Object.keys(s).forEach((r) => {
        if (!i[r] && i.auto === !0) {
          let n = q(t.el, `.${s[r]}`)[0];
          n || ((n = ee('div', s[r])), (n.className = s[r]), t.el.append(n)),
            (i[r] = n),
            (e[r] = n);
        }
      }),
    i
  );
}
function Ii(t) {
  let { swiper: e, extendParams: i, on: s, emit: r } = t;
  i({
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
  function n(v) {
    let w;
    return v &&
      typeof v == 'string' &&
      e.isElement &&
      ((w = e.el.querySelector(v) || e.hostEl.querySelector(v)), w)
      ? w
      : (v &&
          (typeof v == 'string' && (w = [...document.querySelectorAll(v)]),
          e.params.uniqueNavElements &&
          typeof v == 'string' &&
          w &&
          w.length > 1 &&
          e.el.querySelectorAll(v).length === 1
            ? (w = e.el.querySelector(v))
            : w && w.length === 1 && (w = w[0])),
        v && !w ? v : w);
  }
  function a(v, w) {
    const g = e.params.navigation;
    (v = G(v)),
      v.forEach((y) => {
        y &&
          (y.classList[w ? 'add' : 'remove'](...g.disabledClass.split(' ')),
          y.tagName === 'BUTTON' && (y.disabled = w),
          e.params.watchOverflow &&
            e.enabled &&
            y.classList[e.isLocked ? 'add' : 'remove'](g.lockClass));
      });
  }
  function l() {
    const { nextEl: v, prevEl: w } = e.navigation;
    if (e.params.loop) {
      a(w, !1), a(v, !1);
      return;
    }
    a(w, e.isBeginning && !e.params.rewind), a(v, e.isEnd && !e.params.rewind);
  }
  function o(v) {
    v.preventDefault(),
      !(e.isBeginning && !e.params.loop && !e.params.rewind) &&
        (e.slidePrev(), r('navigationPrev'));
  }
  function f(v) {
    v.preventDefault(),
      !(e.isEnd && !e.params.loop && !e.params.rewind) &&
        (e.slideNext(), r('navigationNext'));
  }
  function c() {
    const v = e.params.navigation;
    if (
      ((e.params.navigation = Li(
        e,
        e.originalParams.navigation,
        e.params.navigation,
        { nextEl: 'swiper-button-next', prevEl: 'swiper-button-prev' },
      )),
      !(v.nextEl || v.prevEl))
    )
      return;
    let w = n(v.nextEl),
      g = n(v.prevEl);
    Object.assign(e.navigation, { nextEl: w, prevEl: g }),
      (w = G(w)),
      (g = G(g));
    const y = (h, p) => {
      h && h.addEventListener('click', p === 'next' ? f : o),
        !e.enabled && h && h.classList.add(...v.lockClass.split(' '));
    };
    w.forEach((h) => y(h, 'next')), g.forEach((h) => y(h, 'prev'));
  }
  function d() {
    let { nextEl: v, prevEl: w } = e.navigation;
    (v = G(v)), (w = G(w));
    const g = (y, h) => {
      y.removeEventListener('click', h === 'next' ? f : o),
        y.classList.remove(...e.params.navigation.disabledClass.split(' '));
    };
    v.forEach((y) => g(y, 'next')), w.forEach((y) => g(y, 'prev'));
  }
  s('init', () => {
    e.params.navigation.enabled === !1 ? m() : (c(), l());
  }),
    s('toEdge fromEdge lock unlock', () => {
      l();
    }),
    s('destroy', () => {
      d();
    }),
    s('enable disable', () => {
      let { nextEl: v, prevEl: w } = e.navigation;
      if (((v = G(v)), (w = G(w)), e.enabled)) {
        l();
        return;
      }
      [...v, ...w]
        .filter((g) => !!g)
        .forEach((g) => g.classList.add(e.params.navigation.lockClass));
    }),
    s('click', (v, w) => {
      let { nextEl: g, prevEl: y } = e.navigation;
      (g = G(g)), (y = G(y));
      const h = w.target;
      let p = y.includes(h) || g.includes(h);
      if (e.isElement && !p) {
        const b = w.path || (w.composedPath && w.composedPath());
        b && (p = b.find((x) => g.includes(x) || y.includes(x)));
      }
      if (e.params.navigation.hideOnClick && !p) {
        if (
          e.pagination &&
          e.params.pagination &&
          e.params.pagination.clickable &&
          (e.pagination.el === h || e.pagination.el.contains(h))
        )
          return;
        let b;
        g.length
          ? (b = g[0].classList.contains(e.params.navigation.hiddenClass))
          : y.length &&
            (b = y[0].classList.contains(e.params.navigation.hiddenClass)),
          r(b === !0 ? 'navigationShow' : 'navigationHide'),
          [...g, ...y]
            .filter((x) => !!x)
            .forEach((x) =>
              x.classList.toggle(e.params.navigation.hiddenClass),
            );
      }
    });
  const u = () => {
      e.el.classList.remove(
        ...e.params.navigation.navigationDisabledClass.split(' '),
      ),
        c(),
        l();
    },
    m = () => {
      e.el.classList.add(
        ...e.params.navigation.navigationDisabledClass.split(' '),
      ),
        d();
    };
  Object.assign(e.navigation, {
    enable: u,
    disable: m,
    update: l,
    init: c,
    destroy: d,
  });
}
function oe(t) {
  return (
    t === void 0 && (t = ''),
    `.${t
      .trim()
      .replace(/([\.:!+\/])/g, '\\$1')
      .replace(/ /g, '.')}`
  );
}
function Oi(t) {
  let { swiper: e, extendParams: i, on: s, emit: r } = t;
  const n = 'swiper-pagination';
  i({
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
      formatFractionCurrent: (h) => h,
      formatFractionTotal: (h) => h,
      bulletClass: `${n}-bullet`,
      bulletActiveClass: `${n}-bullet-active`,
      modifierClass: `${n}-`,
      currentClass: `${n}-current`,
      totalClass: `${n}-total`,
      hiddenClass: `${n}-hidden`,
      progressbarFillClass: `${n}-progressbar-fill`,
      progressbarOppositeClass: `${n}-progressbar-opposite`,
      clickableClass: `${n}-clickable`,
      lockClass: `${n}-lock`,
      horizontalClass: `${n}-horizontal`,
      verticalClass: `${n}-vertical`,
      paginationDisabledClass: `${n}-disabled`,
    },
  }),
    (e.pagination = { el: null, bullets: [] });
  let a,
    l = 0;
  function o() {
    return (
      !e.params.pagination.el ||
      !e.pagination.el ||
      (Array.isArray(e.pagination.el) && e.pagination.el.length === 0)
    );
  }
  function f(h, p) {
    const { bulletActiveClass: b } = e.params.pagination;
    h &&
      ((h = h[`${p === 'prev' ? 'previous' : 'next'}ElementSibling`]),
      h &&
        (h.classList.add(`${b}-${p}`),
        (h = h[`${p === 'prev' ? 'previous' : 'next'}ElementSibling`]),
        h && h.classList.add(`${b}-${p}-${p}`)));
  }
  function c(h, p, b) {
    if (((h = h % b), (p = p % b), p === h + 1)) return 'next';
    if (p === h - 1) return 'previous';
  }
  function d(h) {
    const p = h.target.closest(oe(e.params.pagination.bulletClass));
    if (!p) return;
    h.preventDefault();
    const b = qe(p) * e.params.slidesPerGroup;
    if (e.params.loop) {
      if (e.realIndex === b) return;
      const x = c(e.realIndex, b, e.slides.length);
      x === 'next'
        ? e.slideNext()
        : x === 'previous'
        ? e.slidePrev()
        : e.slideToLoop(b);
    } else e.slideTo(b);
  }
  function u() {
    const h = e.rtl,
      p = e.params.pagination;
    if (o()) return;
    let b = e.pagination.el;
    b = G(b);
    let x, A;
    const $ =
        e.virtual && e.params.virtual.enabled
          ? e.virtual.slides.length
          : e.slides.length,
      I = e.params.loop
        ? Math.ceil($ / e.params.slidesPerGroup)
        : e.snapGrid.length;
    if (
      (e.params.loop
        ? ((A = e.previousRealIndex || 0),
          (x =
            e.params.slidesPerGroup > 1
              ? Math.floor(e.realIndex / e.params.slidesPerGroup)
              : e.realIndex))
        : typeof e.snapIndex < 'u'
        ? ((x = e.snapIndex), (A = e.previousSnapIndex))
        : ((A = e.previousIndex || 0), (x = e.activeIndex || 0)),
      p.type === 'bullets' &&
        e.pagination.bullets &&
        e.pagination.bullets.length > 0)
    ) {
      const T = e.pagination.bullets;
      let _, L, C;
      if (
        (p.dynamicBullets &&
          ((a = ai(T[0], e.isHorizontal() ? 'width' : 'height', !0)),
          b.forEach((S) => {
            S.style[e.isHorizontal() ? 'width' : 'height'] = `${
              a * (p.dynamicMainBullets + 4)
            }px`;
          }),
          p.dynamicMainBullets > 1 &&
            A !== void 0 &&
            ((l += x - (A || 0)),
            l > p.dynamicMainBullets - 1
              ? (l = p.dynamicMainBullets - 1)
              : l < 0 && (l = 0)),
          (_ = Math.max(x - l, 0)),
          (L = _ + (Math.min(T.length, p.dynamicMainBullets) - 1)),
          (C = (L + _) / 2)),
        T.forEach((S) => {
          const E = [
            ...['', '-next', '-next-next', '-prev', '-prev-prev', '-main'].map(
              (O) => `${p.bulletActiveClass}${O}`,
            ),
          ]
            .map((O) =>
              typeof O == 'string' && O.includes(' ') ? O.split(' ') : O,
            )
            .flat();
          S.classList.remove(...E);
        }),
        b.length > 1)
      )
        T.forEach((S) => {
          const E = qe(S);
          E === x
            ? S.classList.add(...p.bulletActiveClass.split(' '))
            : e.isElement && S.setAttribute('part', 'bullet'),
            p.dynamicBullets &&
              (E >= _ &&
                E <= L &&
                S.classList.add(...`${p.bulletActiveClass}-main`.split(' ')),
              E === _ && f(S, 'prev'),
              E === L && f(S, 'next'));
        });
      else {
        const S = T[x];
        if (
          (S && S.classList.add(...p.bulletActiveClass.split(' ')),
          e.isElement &&
            T.forEach((E, O) => {
              E.setAttribute('part', O === x ? 'bullet-active' : 'bullet');
            }),
          p.dynamicBullets)
        ) {
          const E = T[_],
            O = T[L];
          for (let R = _; R <= L; R += 1)
            T[R] &&
              T[R].classList.add(...`${p.bulletActiveClass}-main`.split(' '));
          f(E, 'prev'), f(O, 'next');
        }
      }
      if (p.dynamicBullets) {
        const S = Math.min(T.length, p.dynamicMainBullets + 4),
          E = (a * S - a) / 2 - C * a,
          O = h ? 'right' : 'left';
        T.forEach((R) => {
          R.style[e.isHorizontal() ? O : 'top'] = `${E}px`;
        });
      }
    }
    b.forEach((T, _) => {
      if (
        (p.type === 'fraction' &&
          (T.querySelectorAll(oe(p.currentClass)).forEach((L) => {
            L.textContent = p.formatFractionCurrent(x + 1);
          }),
          T.querySelectorAll(oe(p.totalClass)).forEach((L) => {
            L.textContent = p.formatFractionTotal(I);
          })),
        p.type === 'progressbar')
      ) {
        let L;
        p.progressbarOpposite
          ? (L = e.isHorizontal() ? 'vertical' : 'horizontal')
          : (L = e.isHorizontal() ? 'horizontal' : 'vertical');
        const C = (x + 1) / I;
        let S = 1,
          E = 1;
        L === 'horizontal' ? (S = C) : (E = C),
          T.querySelectorAll(oe(p.progressbarFillClass)).forEach((O) => {
            (O.style.transform = `translate3d(0,0,0) scaleX(${S}) scaleY(${E})`),
              (O.style.transitionDuration = `${e.params.speed}ms`);
          });
      }
      p.type === 'custom' && p.renderCustom
        ? ((T.innerHTML = p.renderCustom(e, x + 1, I)),
          _ === 0 && r('paginationRender', T))
        : (_ === 0 && r('paginationRender', T), r('paginationUpdate', T)),
        e.params.watchOverflow &&
          e.enabled &&
          T.classList[e.isLocked ? 'add' : 'remove'](p.lockClass);
    });
  }
  function m() {
    const h = e.params.pagination;
    if (o()) return;
    const p =
      e.virtual && e.params.virtual.enabled
        ? e.virtual.slides.length
        : e.grid && e.params.grid.rows > 1
        ? e.slides.length / Math.ceil(e.params.grid.rows)
        : e.slides.length;
    let b = e.pagination.el;
    b = G(b);
    let x = '';
    if (h.type === 'bullets') {
      let A = e.params.loop
        ? Math.ceil(p / e.params.slidesPerGroup)
        : e.snapGrid.length;
      e.params.freeMode && e.params.freeMode.enabled && A > p && (A = p);
      for (let $ = 0; $ < A; $ += 1)
        h.renderBullet
          ? (x += h.renderBullet.call(e, $, h.bulletClass))
          : (x += `<${h.bulletElement} ${
              e.isElement ? 'part="bullet"' : ''
            } class="${h.bulletClass}"></${h.bulletElement}>`);
    }
    h.type === 'fraction' &&
      (h.renderFraction
        ? (x = h.renderFraction.call(e, h.currentClass, h.totalClass))
        : (x = `<span class="${h.currentClass}"></span> / <span class="${h.totalClass}"></span>`)),
      h.type === 'progressbar' &&
        (h.renderProgressbar
          ? (x = h.renderProgressbar.call(e, h.progressbarFillClass))
          : (x = `<span class="${h.progressbarFillClass}"></span>`)),
      (e.pagination.bullets = []),
      b.forEach((A) => {
        h.type !== 'custom' && (A.innerHTML = x || ''),
          h.type === 'bullets' &&
            e.pagination.bullets.push(...A.querySelectorAll(oe(h.bulletClass)));
      }),
      h.type !== 'custom' && r('paginationRender', b[0]);
  }
  function v() {
    e.params.pagination = Li(
      e,
      e.originalParams.pagination,
      e.params.pagination,
      { el: 'swiper-pagination' },
    );
    const h = e.params.pagination;
    if (!h.el) return;
    let p;
    typeof h.el == 'string' && e.isElement && (p = e.el.querySelector(h.el)),
      !p &&
        typeof h.el == 'string' &&
        (p = [...document.querySelectorAll(h.el)]),
      p || (p = h.el),
      !(!p || p.length === 0) &&
        (e.params.uniqueNavElements &&
          typeof h.el == 'string' &&
          Array.isArray(p) &&
          p.length > 1 &&
          ((p = [...e.el.querySelectorAll(h.el)]),
          p.length > 1 &&
            (p = p.filter((b) => Se(b, '.swiper')[0] === e.el)[0])),
        Array.isArray(p) && p.length === 1 && (p = p[0]),
        Object.assign(e.pagination, { el: p }),
        (p = G(p)),
        p.forEach((b) => {
          h.type === 'bullets' &&
            h.clickable &&
            b.classList.add(...(h.clickableClass || '').split(' ')),
            b.classList.add(h.modifierClass + h.type),
            b.classList.add(
              e.isHorizontal() ? h.horizontalClass : h.verticalClass,
            ),
            h.type === 'bullets' &&
              h.dynamicBullets &&
              (b.classList.add(`${h.modifierClass}${h.type}-dynamic`),
              (l = 0),
              h.dynamicMainBullets < 1 && (h.dynamicMainBullets = 1)),
            h.type === 'progressbar' &&
              h.progressbarOpposite &&
              b.classList.add(h.progressbarOppositeClass),
            h.clickable && b.addEventListener('click', d),
            e.enabled || b.classList.add(h.lockClass);
        }));
  }
  function w() {
    const h = e.params.pagination;
    if (o()) return;
    let p = e.pagination.el;
    p &&
      ((p = G(p)),
      p.forEach((b) => {
        b.classList.remove(h.hiddenClass),
          b.classList.remove(h.modifierClass + h.type),
          b.classList.remove(
            e.isHorizontal() ? h.horizontalClass : h.verticalClass,
          ),
          h.clickable &&
            (b.classList.remove(...(h.clickableClass || '').split(' ')),
            b.removeEventListener('click', d));
      })),
      e.pagination.bullets &&
        e.pagination.bullets.forEach((b) =>
          b.classList.remove(...h.bulletActiveClass.split(' ')),
        );
  }
  s('changeDirection', () => {
    if (!e.pagination || !e.pagination.el) return;
    const h = e.params.pagination;
    let { el: p } = e.pagination;
    (p = G(p)),
      p.forEach((b) => {
        b.classList.remove(h.horizontalClass, h.verticalClass),
          b.classList.add(
            e.isHorizontal() ? h.horizontalClass : h.verticalClass,
          );
      });
  }),
    s('init', () => {
      e.params.pagination.enabled === !1 ? y() : (v(), m(), u());
    }),
    s('activeIndexChange', () => {
      typeof e.snapIndex > 'u' && u();
    }),
    s('snapIndexChange', () => {
      u();
    }),
    s('snapGridLengthChange', () => {
      m(), u();
    }),
    s('destroy', () => {
      w();
    }),
    s('enable disable', () => {
      let { el: h } = e.pagination;
      h &&
        ((h = G(h)),
        h.forEach((p) =>
          p.classList[e.enabled ? 'remove' : 'add'](
            e.params.pagination.lockClass,
          ),
        ));
    }),
    s('lock unlock', () => {
      u();
    }),
    s('click', (h, p) => {
      const b = p.target,
        x = G(e.pagination.el);
      if (
        e.params.pagination.el &&
        e.params.pagination.hideOnClick &&
        x &&
        x.length > 0 &&
        !b.classList.contains(e.params.pagination.bulletClass)
      ) {
        if (
          e.navigation &&
          ((e.navigation.nextEl && b === e.navigation.nextEl) ||
            (e.navigation.prevEl && b === e.navigation.prevEl))
        )
          return;
        const A = x[0].classList.contains(e.params.pagination.hiddenClass);
        r(A === !0 ? 'paginationShow' : 'paginationHide'),
          x.forEach(($) => $.classList.toggle(e.params.pagination.hiddenClass));
      }
    });
  const g = () => {
      e.el.classList.remove(e.params.pagination.paginationDisabledClass);
      let { el: h } = e.pagination;
      h &&
        ((h = G(h)),
        h.forEach((p) =>
          p.classList.remove(e.params.pagination.paginationDisabledClass),
        )),
        v(),
        m(),
        u();
    },
    y = () => {
      e.el.classList.add(e.params.pagination.paginationDisabledClass);
      let { el: h } = e.pagination;
      h &&
        ((h = G(h)),
        h.forEach((p) =>
          p.classList.add(e.params.pagination.paginationDisabledClass),
        )),
        w();
    };
  Object.assign(e.pagination, {
    enable: g,
    disable: y,
    render: m,
    update: u,
    init: v,
    destroy: w,
  });
}
function $i(t) {
  let { swiper: e, extendParams: i, on: s, emit: r } = t;
  const n = K();
  let a = !1,
    l = null,
    o = null,
    f,
    c,
    d,
    u;
  i({
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
      { dragEl: E, el: O } = C,
      R = e.params.scrollbar,
      M = e.params.loop ? e.progressLoop : e.progress;
    let P = c,
      k = (d - c) * M;
    S
      ? ((k = -k), k > 0 ? ((P = c - k), (k = 0)) : -k + c > d && (P = d + k))
      : k < 0
      ? ((P = c + k), (k = 0))
      : k + c > d && (P = d - k),
      e.isHorizontal()
        ? ((E.style.transform = `translate3d(${k}px, 0, 0)`),
          (E.style.width = `${P}px`))
        : ((E.style.transform = `translate3d(0px, ${k}px, 0)`),
          (E.style.height = `${P}px`)),
      R.hide &&
        (clearTimeout(l),
        (O.style.opacity = 1),
        (l = setTimeout(() => {
          (O.style.opacity = 0), (O.style.transitionDuration = '400ms');
        }, 1e3)));
  }
  function v(C) {
    !e.params.scrollbar.el ||
      !e.scrollbar.el ||
      (e.scrollbar.dragEl.style.transitionDuration = `${C}ms`);
  }
  function w() {
    if (!e.params.scrollbar.el || !e.scrollbar.el) return;
    const { scrollbar: C } = e,
      { dragEl: S, el: E } = C;
    (S.style.width = ''),
      (S.style.height = ''),
      (d = e.isHorizontal() ? E.offsetWidth : E.offsetHeight),
      (u =
        e.size /
        (e.virtualSize +
          e.params.slidesOffsetBefore -
          (e.params.centeredSlides ? e.snapGrid[0] : 0))),
      e.params.scrollbar.dragSize === 'auto'
        ? (c = d * u)
        : (c = parseInt(e.params.scrollbar.dragSize, 10)),
      e.isHorizontal()
        ? (S.style.width = `${c}px`)
        : (S.style.height = `${c}px`),
      u >= 1 ? (E.style.display = 'none') : (E.style.display = ''),
      e.params.scrollbar.hide && (E.style.opacity = 0),
      e.params.watchOverflow &&
        e.enabled &&
        C.el.classList[e.isLocked ? 'add' : 'remove'](
          e.params.scrollbar.lockClass,
        );
  }
  function g(C) {
    return e.isHorizontal() ? C.clientX : C.clientY;
  }
  function y(C) {
    const { scrollbar: S, rtlTranslate: E } = e,
      { el: O } = S;
    let R;
    (R =
      (g(C) -
        gt(O)[e.isHorizontal() ? 'left' : 'top'] -
        (f !== null ? f : c / 2)) /
      (d - c)),
      (R = Math.max(Math.min(R, 1), 0)),
      E && (R = 1 - R);
    const M = e.minTranslate() + (e.maxTranslate() - e.minTranslate()) * R;
    e.updateProgress(M),
      e.setTranslate(M),
      e.updateActiveIndex(),
      e.updateSlidesClasses();
  }
  function h(C) {
    const S = e.params.scrollbar,
      { scrollbar: E, wrapperEl: O } = e,
      { el: R, dragEl: M } = E;
    (a = !0),
      (f =
        C.target === M
          ? g(C) -
            C.target.getBoundingClientRect()[e.isHorizontal() ? 'left' : 'top']
          : null),
      C.preventDefault(),
      C.stopPropagation(),
      (O.style.transitionDuration = '100ms'),
      (M.style.transitionDuration = '100ms'),
      y(C),
      clearTimeout(o),
      (R.style.transitionDuration = '0ms'),
      S.hide && (R.style.opacity = 1),
      e.params.cssMode && (e.wrapperEl.style['scroll-snap-type'] = 'none'),
      r('scrollbarDragStart', C);
  }
  function p(C) {
    const { scrollbar: S, wrapperEl: E } = e,
      { el: O, dragEl: R } = S;
    a &&
      (C.preventDefault && C.cancelable
        ? C.preventDefault()
        : (C.returnValue = !1),
      y(C),
      (E.style.transitionDuration = '0ms'),
      (O.style.transitionDuration = '0ms'),
      (R.style.transitionDuration = '0ms'),
      r('scrollbarDragMove', C));
  }
  function b(C) {
    const S = e.params.scrollbar,
      { scrollbar: E, wrapperEl: O } = e,
      { el: R } = E;
    a &&
      ((a = !1),
      e.params.cssMode &&
        ((e.wrapperEl.style['scroll-snap-type'] = ''),
        (O.style.transitionDuration = '')),
      S.hide &&
        (clearTimeout(o),
        (o = Te(() => {
          (R.style.opacity = 0), (R.style.transitionDuration = '400ms');
        }, 1e3))),
      r('scrollbarDragEnd', C),
      S.snapOnRelease && e.slideToClosest());
  }
  function x(C) {
    const { scrollbar: S, params: E } = e,
      O = S.el;
    if (!O) return;
    const R = O,
      M = E.passiveListeners ? { passive: !1, capture: !1 } : !1,
      P = E.passiveListeners ? { passive: !0, capture: !1 } : !1;
    if (!R) return;
    const k = C === 'on' ? 'addEventListener' : 'removeEventListener';
    R[k]('pointerdown', h, M),
      n[k]('pointermove', p, M),
      n[k]('pointerup', b, P);
  }
  function A() {
    !e.params.scrollbar.el || !e.scrollbar.el || x('on');
  }
  function $() {
    !e.params.scrollbar.el || !e.scrollbar.el || x('off');
  }
  function I() {
    const { scrollbar: C, el: S } = e;
    e.params.scrollbar = Li(e, e.originalParams.scrollbar, e.params.scrollbar, {
      el: 'swiper-scrollbar',
    });
    const E = e.params.scrollbar;
    if (!E.el) return;
    let O;
    if (
      (typeof E.el == 'string' && e.isElement && (O = e.el.querySelector(E.el)),
      !O && typeof E.el == 'string')
    ) {
      if (((O = n.querySelectorAll(E.el)), !O.length)) return;
    } else O || (O = E.el);
    e.params.uniqueNavElements &&
      typeof E.el == 'string' &&
      O.length > 1 &&
      S.querySelectorAll(E.el).length === 1 &&
      (O = S.querySelector(E.el)),
      O.length > 0 && (O = O[0]),
      O.classList.add(e.isHorizontal() ? E.horizontalClass : E.verticalClass);
    let R;
    O &&
      ((R = O.querySelector(oe(e.params.scrollbar.dragClass))),
      R || ((R = ee('div', e.params.scrollbar.dragClass)), O.append(R))),
      Object.assign(C, { el: O, dragEl: R }),
      E.draggable && A(),
      O &&
        O.classList[e.enabled ? 'remove' : 'add'](
          ...ce(e.params.scrollbar.lockClass),
        );
  }
  function T() {
    const C = e.params.scrollbar,
      S = e.scrollbar.el;
    S &&
      S.classList.remove(
        ...ce(e.isHorizontal() ? C.horizontalClass : C.verticalClass),
      ),
      $();
  }
  s('changeDirection', () => {
    if (!e.scrollbar || !e.scrollbar.el) return;
    const C = e.params.scrollbar;
    let { el: S } = e.scrollbar;
    (S = G(S)),
      S.forEach((E) => {
        E.classList.remove(C.horizontalClass, C.verticalClass),
          E.classList.add(
            e.isHorizontal() ? C.horizontalClass : C.verticalClass,
          );
      });
  }),
    s('init', () => {
      e.params.scrollbar.enabled === !1 ? L() : (I(), w(), m());
    }),
    s('update resize observerUpdate lock unlock changeDirection', () => {
      w();
    }),
    s('setTranslate', () => {
      m();
    }),
    s('setTransition', (C, S) => {
      v(S);
    }),
    s('enable disable', () => {
      const { el: C } = e.scrollbar;
      C &&
        C.classList[e.enabled ? 'remove' : 'add'](
          ...ce(e.params.scrollbar.lockClass),
        );
    }),
    s('destroy', () => {
      T();
    });
  const _ = () => {
      e.el.classList.remove(...ce(e.params.scrollbar.scrollbarDisabledClass)),
        e.scrollbar.el &&
          e.scrollbar.el.classList.remove(
            ...ce(e.params.scrollbar.scrollbarDisabledClass),
          ),
        I(),
        w(),
        m();
    },
    L = () => {
      e.el.classList.add(...ce(e.params.scrollbar.scrollbarDisabledClass)),
        e.scrollbar.el &&
          e.scrollbar.el.classList.add(
            ...ce(e.params.scrollbar.scrollbarDisabledClass),
          ),
        T();
    };
  Object.assign(e.scrollbar, {
    enable: _,
    disable: L,
    updateSize: w,
    setTranslate: m,
    init: I,
    destroy: T,
  });
}
function tl(t) {
  let { swiper: e, extendParams: i, on: s } = t;
  i({ parallax: { enabled: !1 } });
  const r =
      '[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]',
    n = (o, f) => {
      const { rtl: c } = e,
        d = c ? -1 : 1,
        u = o.getAttribute('data-swiper-parallax') || '0';
      let m = o.getAttribute('data-swiper-parallax-x'),
        v = o.getAttribute('data-swiper-parallax-y');
      const w = o.getAttribute('data-swiper-parallax-scale'),
        g = o.getAttribute('data-swiper-parallax-opacity'),
        y = o.getAttribute('data-swiper-parallax-rotate');
      if (
        (m || v
          ? ((m = m || '0'), (v = v || '0'))
          : e.isHorizontal()
          ? ((m = u), (v = '0'))
          : ((v = u), (m = '0')),
        m.indexOf('%') >= 0
          ? (m = `${parseInt(m, 10) * f * d}%`)
          : (m = `${m * f * d}px`),
        v.indexOf('%') >= 0
          ? (v = `${parseInt(v, 10) * f}%`)
          : (v = `${v * f}px`),
        typeof g < 'u' && g !== null)
      ) {
        const p = g - (g - 1) * (1 - Math.abs(f));
        o.style.opacity = p;
      }
      let h = `translate3d(${m}, ${v}, 0px)`;
      if (typeof w < 'u' && w !== null) {
        const p = w - (w - 1) * (1 - Math.abs(f));
        h += ` scale(${p})`;
      }
      if (y && typeof y < 'u' && y !== null) {
        const p = y * f * -1;
        h += ` rotate(${p}deg)`;
      }
      o.style.transform = h;
    },
    a = () => {
      const { el: o, slides: f, progress: c, snapGrid: d, isElement: u } = e,
        m = q(o, r);
      e.isElement && m.push(...q(e.hostEl, r)),
        m.forEach((v) => {
          n(v, c);
        }),
        f.forEach((v, w) => {
          let g = v.progress;
          e.params.slidesPerGroup > 1 &&
            e.params.slidesPerView !== 'auto' &&
            (g += Math.ceil(w / 2) - c * (d.length - 1)),
            (g = Math.min(Math.max(g, -1), 1)),
            v
              .querySelectorAll(`${r}, [data-swiper-parallax-rotate]`)
              .forEach((y) => {
                n(y, g);
              });
        });
    },
    l = function (o) {
      o === void 0 && (o = e.params.speed);
      const { el: f, hostEl: c } = e,
        d = [...f.querySelectorAll(r)];
      e.isElement && d.push(...c.querySelectorAll(r)),
        d.forEach((u) => {
          let m =
            parseInt(u.getAttribute('data-swiper-parallax-duration'), 10) || o;
          o === 0 && (m = 0), (u.style.transitionDuration = `${m}ms`);
        });
    };
  s('beforeInit', () => {
    e.params.parallax.enabled &&
      ((e.params.watchSlidesProgress = !0),
      (e.originalParams.watchSlidesProgress = !0));
  }),
    s('init', () => {
      e.params.parallax.enabled && a();
    }),
    s('setTranslate', () => {
      e.params.parallax.enabled && a();
    }),
    s('setTransition', (o, f) => {
      e.params.parallax.enabled && l(f);
    });
}
function il(t) {
  let { swiper: e, extendParams: i, on: s, emit: r } = t;
  const n = j();
  i({
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
  let a = 1,
    l = !1,
    o,
    f;
  const c = [],
    d = {
      originX: 0,
      originY: 0,
      slideEl: void 0,
      slideWidth: void 0,
      slideHeight: void 0,
      imageEl: void 0,
      imageWrapEl: void 0,
      maxRatio: 3,
    },
    u = {
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
  let v = 1;
  Object.defineProperty(e.zoom, 'scale', {
    get() {
      return v;
    },
    set(z) {
      if (v !== z) {
        const D = d.imageEl,
          B = d.slideEl;
        r('zoomChange', z, D, B);
      }
      v = z;
    },
  });
  function w() {
    if (c.length < 2) return 1;
    const z = c[0].pageX,
      D = c[0].pageY,
      B = c[1].pageX,
      V = c[1].pageY;
    return Math.sqrt((B - z) ** 2 + (V - D) ** 2);
  }
  function g() {
    const z = e.params.zoom,
      D = d.imageWrapEl.getAttribute('data-swiper-zoom') || z.maxRatio;
    if (z.limitToOriginalSize && d.imageEl && d.imageEl.naturalWidth) {
      const B = d.imageEl.naturalWidth / d.imageEl.offsetWidth;
      return Math.min(B, D);
    }
    return D;
  }
  function y() {
    if (c.length < 2) return { x: null, y: null };
    const z = d.imageEl.getBoundingClientRect();
    return [
      (c[0].pageX + (c[1].pageX - c[0].pageX) / 2 - z.x - n.scrollX) / a,
      (c[0].pageY + (c[1].pageY - c[0].pageY) / 2 - z.y - n.scrollY) / a,
    ];
  }
  function h() {
    return e.isElement ? 'swiper-slide' : `.${e.params.slideClass}`;
  }
  function p(z) {
    const D = h();
    return !!(
      z.target.matches(D) ||
      e.slides.filter((B) => B.contains(z.target)).length > 0
    );
  }
  function b(z) {
    const D = `.${e.params.zoom.containerClass}`;
    return !!(
      z.target.matches(D) ||
      [...e.hostEl.querySelectorAll(D)].filter((B) => B.contains(z.target))
        .length > 0
    );
  }
  function x(z) {
    if ((z.pointerType === 'mouse' && c.splice(0, c.length), !p(z))) return;
    const D = e.params.zoom;
    if (((o = !1), (f = !1), c.push(z), !(c.length < 2))) {
      if (((o = !0), (d.scaleStart = w()), !d.slideEl)) {
        (d.slideEl = z.target.closest(`.${e.params.slideClass}, swiper-slide`)),
          d.slideEl || (d.slideEl = e.slides[e.activeIndex]);
        let B = d.slideEl.querySelector(`.${D.containerClass}`);
        if (
          (B &&
            (B = B.querySelectorAll(
              'picture, img, svg, canvas, .swiper-zoom-target',
            )[0]),
          (d.imageEl = B),
          B
            ? (d.imageWrapEl = Se(d.imageEl, `.${D.containerClass}`)[0])
            : (d.imageWrapEl = void 0),
          !d.imageWrapEl)
        ) {
          d.imageEl = void 0;
          return;
        }
        d.maxRatio = g();
      }
      if (d.imageEl) {
        const [B, V] = y();
        (d.originX = B),
          (d.originY = V),
          (d.imageEl.style.transitionDuration = '0ms');
      }
      l = !0;
    }
  }
  function A(z) {
    if (!p(z)) return;
    const D = e.params.zoom,
      B = e.zoom,
      V = c.findIndex((H) => H.pointerId === z.pointerId);
    V >= 0 && (c[V] = z),
      !(c.length < 2) &&
        ((f = !0),
        (d.scaleMove = w()),
        d.imageEl &&
          ((B.scale = (d.scaleMove / d.scaleStart) * a),
          B.scale > d.maxRatio &&
            (B.scale = d.maxRatio - 1 + (B.scale - d.maxRatio + 1) ** 0.5),
          B.scale < D.minRatio &&
            (B.scale = D.minRatio + 1 - (D.minRatio - B.scale + 1) ** 0.5),
          (d.imageEl.style.transform = `translate3d(0,0,0) scale(${B.scale})`)));
  }
  function $(z) {
    if (!p(z) || (z.pointerType === 'mouse' && z.type === 'pointerout')) return;
    const D = e.params.zoom,
      B = e.zoom,
      V = c.findIndex((H) => H.pointerId === z.pointerId);
    V >= 0 && c.splice(V, 1),
      !(!o || !f) &&
        ((o = !1),
        (f = !1),
        d.imageEl &&
          ((B.scale = Math.max(Math.min(B.scale, d.maxRatio), D.minRatio)),
          (d.imageEl.style.transitionDuration = `${e.params.speed}ms`),
          (d.imageEl.style.transform = `translate3d(0,0,0) scale(${B.scale})`),
          (a = B.scale),
          (l = !1),
          B.scale > 1 && d.slideEl
            ? d.slideEl.classList.add(`${D.zoomedSlideClass}`)
            : B.scale <= 1 &&
              d.slideEl &&
              d.slideEl.classList.remove(`${D.zoomedSlideClass}`),
          B.scale === 1 &&
            ((d.originX = 0), (d.originY = 0), (d.slideEl = void 0))));
  }
  let I;
  function T() {
    e.touchEventsData.preventTouchMoveFromPointerMove = !1;
  }
  function _() {
    clearTimeout(I),
      (e.touchEventsData.preventTouchMoveFromPointerMove = !0),
      (I = setTimeout(() => {
        e.destroyed || T();
      }));
  }
  function L(z) {
    const D = e.device;
    if (!d.imageEl || u.isTouched) return;
    D.android && z.cancelable && z.preventDefault(), (u.isTouched = !0);
    const B = c.length > 0 ? c[0] : z;
    (u.touchesStart.x = B.pageX), (u.touchesStart.y = B.pageY);
  }
  function C(z) {
    if (!p(z) || !b(z)) return;
    const D = e.zoom;
    if (!d.imageEl || !u.isTouched || !d.slideEl) return;
    u.isMoved ||
      ((u.width = d.imageEl.offsetWidth || d.imageEl.clientWidth),
      (u.height = d.imageEl.offsetHeight || d.imageEl.clientHeight),
      (u.startX = ni(d.imageWrapEl, 'x') || 0),
      (u.startY = ni(d.imageWrapEl, 'y') || 0),
      (d.slideWidth = d.slideEl.offsetWidth),
      (d.slideHeight = d.slideEl.offsetHeight),
      (d.imageWrapEl.style.transitionDuration = '0ms'));
    const B = u.width * D.scale,
      V = u.height * D.scale;
    if (
      ((u.minX = Math.min(d.slideWidth / 2 - B / 2, 0)),
      (u.maxX = -u.minX),
      (u.minY = Math.min(d.slideHeight / 2 - V / 2, 0)),
      (u.maxY = -u.minY),
      (u.touchesCurrent.x = c.length > 0 ? c[0].pageX : z.pageX),
      (u.touchesCurrent.y = c.length > 0 ? c[0].pageY : z.pageY),
      Math.max(
        Math.abs(u.touchesCurrent.x - u.touchesStart.x),
        Math.abs(u.touchesCurrent.y - u.touchesStart.y),
      ) > 5 && (e.allowClick = !1),
      !u.isMoved && !l)
    ) {
      if (
        e.isHorizontal() &&
        ((Math.floor(u.minX) === Math.floor(u.startX) &&
          u.touchesCurrent.x < u.touchesStart.x) ||
          (Math.floor(u.maxX) === Math.floor(u.startX) &&
            u.touchesCurrent.x > u.touchesStart.x))
      ) {
        (u.isTouched = !1), T();
        return;
      }
      if (
        !e.isHorizontal() &&
        ((Math.floor(u.minY) === Math.floor(u.startY) &&
          u.touchesCurrent.y < u.touchesStart.y) ||
          (Math.floor(u.maxY) === Math.floor(u.startY) &&
            u.touchesCurrent.y > u.touchesStart.y))
      ) {
        (u.isTouched = !1), T();
        return;
      }
    }
    z.cancelable && z.preventDefault(),
      z.stopPropagation(),
      _(),
      (u.isMoved = !0);
    const F = (D.scale - a) / (d.maxRatio - e.params.zoom.minRatio),
      { originX: U, originY: Ce } = d;
    (u.currentX =
      u.touchesCurrent.x - u.touchesStart.x + u.startX + F * (u.width - U * 2)),
      (u.currentY =
        u.touchesCurrent.y -
        u.touchesStart.y +
        u.startY +
        F * (u.height - Ce * 2)),
      u.currentX < u.minX &&
        (u.currentX = u.minX + 1 - (u.minX - u.currentX + 1) ** 0.8),
      u.currentX > u.maxX &&
        (u.currentX = u.maxX - 1 + (u.currentX - u.maxX + 1) ** 0.8),
      u.currentY < u.minY &&
        (u.currentY = u.minY + 1 - (u.minY - u.currentY + 1) ** 0.8),
      u.currentY > u.maxY &&
        (u.currentY = u.maxY - 1 + (u.currentY - u.maxY + 1) ** 0.8),
      m.prevPositionX || (m.prevPositionX = u.touchesCurrent.x),
      m.prevPositionY || (m.prevPositionY = u.touchesCurrent.y),
      m.prevTime || (m.prevTime = Date.now()),
      (m.x =
        (u.touchesCurrent.x - m.prevPositionX) / (Date.now() - m.prevTime) / 2),
      (m.y =
        (u.touchesCurrent.y - m.prevPositionY) / (Date.now() - m.prevTime) / 2),
      Math.abs(u.touchesCurrent.x - m.prevPositionX) < 2 && (m.x = 0),
      Math.abs(u.touchesCurrent.y - m.prevPositionY) < 2 && (m.y = 0),
      (m.prevPositionX = u.touchesCurrent.x),
      (m.prevPositionY = u.touchesCurrent.y),
      (m.prevTime = Date.now()),
      (d.imageWrapEl.style.transform = `translate3d(${u.currentX}px, ${u.currentY}px,0)`);
  }
  function S() {
    const z = e.zoom;
    if (!d.imageEl) return;
    if (!u.isTouched || !u.isMoved) {
      (u.isTouched = !1), (u.isMoved = !1);
      return;
    }
    (u.isTouched = !1), (u.isMoved = !1);
    let D = 300,
      B = 300;
    const V = m.x * D,
      H = u.currentX + V,
      F = m.y * B,
      U = u.currentY + F;
    m.x !== 0 && (D = Math.abs((H - u.currentX) / m.x)),
      m.y !== 0 && (B = Math.abs((U - u.currentY) / m.y));
    const Ce = Math.max(D, B);
    (u.currentX = H), (u.currentY = U);
    const et = u.width * z.scale,
      ae = u.height * z.scale;
    (u.minX = Math.min(d.slideWidth / 2 - et / 2, 0)),
      (u.maxX = -u.minX),
      (u.minY = Math.min(d.slideHeight / 2 - ae / 2, 0)),
      (u.maxY = -u.minY),
      (u.currentX = Math.max(Math.min(u.currentX, u.maxX), u.minX)),
      (u.currentY = Math.max(Math.min(u.currentY, u.maxY), u.minY)),
      (d.imageWrapEl.style.transitionDuration = `${Ce}ms`),
      (d.imageWrapEl.style.transform = `translate3d(${u.currentX}px, ${u.currentY}px,0)`);
  }
  function E() {
    const z = e.zoom;
    d.slideEl &&
      e.activeIndex !== e.slides.indexOf(d.slideEl) &&
      (d.imageEl && (d.imageEl.style.transform = 'translate3d(0,0,0) scale(1)'),
      d.imageWrapEl && (d.imageWrapEl.style.transform = 'translate3d(0,0,0)'),
      d.slideEl.classList.remove(`${e.params.zoom.zoomedSlideClass}`),
      (z.scale = 1),
      (a = 1),
      (d.slideEl = void 0),
      (d.imageEl = void 0),
      (d.imageWrapEl = void 0),
      (d.originX = 0),
      (d.originY = 0));
  }
  function O(z) {
    const D = e.zoom,
      B = e.params.zoom;
    if (!d.slideEl) {
      z &&
        z.target &&
        (d.slideEl = z.target.closest(`.${e.params.slideClass}, swiper-slide`)),
        d.slideEl ||
          (e.params.virtual && e.params.virtual.enabled && e.virtual
            ? (d.slideEl = q(e.slidesEl, `.${e.params.slideActiveClass}`)[0])
            : (d.slideEl = e.slides[e.activeIndex]));
      let Re = d.slideEl.querySelector(`.${B.containerClass}`);
      Re &&
        (Re = Re.querySelectorAll(
          'picture, img, svg, canvas, .swiper-zoom-target',
        )[0]),
        (d.imageEl = Re),
        Re
          ? (d.imageWrapEl = Se(d.imageEl, `.${B.containerClass}`)[0])
          : (d.imageWrapEl = void 0);
    }
    if (!d.imageEl || !d.imageWrapEl) return;
    e.params.cssMode &&
      ((e.wrapperEl.style.overflow = 'hidden'),
      (e.wrapperEl.style.touchAction = 'none')),
      d.slideEl.classList.add(`${B.zoomedSlideClass}`);
    let V, H, F, U, Ce, et, ae, he, zi, Di, ki, Ri, tt, it, _t, Ct, Pt, At;
    typeof u.touchesStart.x > 'u' && z
      ? ((V = z.pageX), (H = z.pageY))
      : ((V = u.touchesStart.x), (H = u.touchesStart.y));
    const ke = typeof z == 'number' ? z : null;
    a === 1 &&
      ke &&
      ((V = void 0),
      (H = void 0),
      (u.touchesStart.x = void 0),
      (u.touchesStart.y = void 0));
    const Bi = g();
    (D.scale = ke || Bi),
      (a = ke || Bi),
      z && !(a === 1 && ke)
        ? ((Pt = d.slideEl.offsetWidth),
          (At = d.slideEl.offsetHeight),
          (F = gt(d.slideEl).left + n.scrollX),
          (U = gt(d.slideEl).top + n.scrollY),
          (Ce = F + Pt / 2 - V),
          (et = U + At / 2 - H),
          (zi = d.imageEl.offsetWidth || d.imageEl.clientWidth),
          (Di = d.imageEl.offsetHeight || d.imageEl.clientHeight),
          (ki = zi * D.scale),
          (Ri = Di * D.scale),
          (tt = Math.min(Pt / 2 - ki / 2, 0)),
          (it = Math.min(At / 2 - Ri / 2, 0)),
          (_t = -tt),
          (Ct = -it),
          (ae = Ce * D.scale),
          (he = et * D.scale),
          ae < tt && (ae = tt),
          ae > _t && (ae = _t),
          he < it && (he = it),
          he > Ct && (he = Ct))
        : ((ae = 0), (he = 0)),
      ke && D.scale === 1 && ((d.originX = 0), (d.originY = 0)),
      (d.imageWrapEl.style.transitionDuration = '300ms'),
      (d.imageWrapEl.style.transform = `translate3d(${ae}px, ${he}px,0)`),
      (d.imageEl.style.transitionDuration = '300ms'),
      (d.imageEl.style.transform = `translate3d(0,0,0) scale(${D.scale})`);
  }
  function R() {
    const z = e.zoom,
      D = e.params.zoom;
    if (!d.slideEl) {
      e.params.virtual && e.params.virtual.enabled && e.virtual
        ? (d.slideEl = q(e.slidesEl, `.${e.params.slideActiveClass}`)[0])
        : (d.slideEl = e.slides[e.activeIndex]);
      let B = d.slideEl.querySelector(`.${D.containerClass}`);
      B &&
        (B = B.querySelectorAll(
          'picture, img, svg, canvas, .swiper-zoom-target',
        )[0]),
        (d.imageEl = B),
        B
          ? (d.imageWrapEl = Se(d.imageEl, `.${D.containerClass}`)[0])
          : (d.imageWrapEl = void 0);
    }
    !d.imageEl ||
      !d.imageWrapEl ||
      (e.params.cssMode &&
        ((e.wrapperEl.style.overflow = ''),
        (e.wrapperEl.style.touchAction = '')),
      (z.scale = 1),
      (a = 1),
      (u.touchesStart.x = void 0),
      (u.touchesStart.y = void 0),
      (d.imageWrapEl.style.transitionDuration = '300ms'),
      (d.imageWrapEl.style.transform = 'translate3d(0,0,0)'),
      (d.imageEl.style.transitionDuration = '300ms'),
      (d.imageEl.style.transform = 'translate3d(0,0,0) scale(1)'),
      d.slideEl.classList.remove(`${D.zoomedSlideClass}`),
      (d.slideEl = void 0),
      (d.originX = 0),
      (d.originY = 0));
  }
  function M(z) {
    const D = e.zoom;
    D.scale && D.scale !== 1 ? R() : O(z);
  }
  function P() {
    const z = e.params.passiveListeners ? { passive: !0, capture: !1 } : !1,
      D = e.params.passiveListeners ? { passive: !1, capture: !0 } : !0;
    return { passiveListener: z, activeListenerWithCapture: D };
  }
  function k() {
    const z = e.zoom;
    if (z.enabled) return;
    z.enabled = !0;
    const { passiveListener: D, activeListenerWithCapture: B } = P();
    e.wrapperEl.addEventListener('pointerdown', x, D),
      e.wrapperEl.addEventListener('pointermove', A, B),
      ['pointerup', 'pointercancel', 'pointerout'].forEach((V) => {
        e.wrapperEl.addEventListener(V, $, D);
      }),
      e.wrapperEl.addEventListener('pointermove', C, B);
  }
  function N() {
    const z = e.zoom;
    if (!z.enabled) return;
    z.enabled = !1;
    const { passiveListener: D, activeListenerWithCapture: B } = P();
    e.wrapperEl.removeEventListener('pointerdown', x, D),
      e.wrapperEl.removeEventListener('pointermove', A, B),
      ['pointerup', 'pointercancel', 'pointerout'].forEach((V) => {
        e.wrapperEl.removeEventListener(V, $, D);
      }),
      e.wrapperEl.removeEventListener('pointermove', C, B);
  }
  s('init', () => {
    e.params.zoom.enabled && k();
  }),
    s('destroy', () => {
      N();
    }),
    s('touchStart', (z, D) => {
      e.zoom.enabled && L(D);
    }),
    s('touchEnd', (z, D) => {
      e.zoom.enabled && S();
    }),
    s('doubleTap', (z, D) => {
      !e.animating &&
        e.params.zoom.enabled &&
        e.zoom.enabled &&
        e.params.zoom.toggle &&
        M(D);
    }),
    s('transitionEnd', () => {
      e.zoom.enabled && e.params.zoom.enabled && E();
    }),
    s('slideChange', () => {
      e.zoom.enabled && e.params.zoom.enabled && e.params.cssMode && E();
    }),
    Object.assign(e.zoom, { enable: k, disable: N, in: O, out: R, toggle: M });
}
function sl(t) {
  let { swiper: e, extendParams: i, on: s } = t;
  i({ controller: { control: void 0, inverse: !1, by: 'slide' } }),
    (e.controller = { control: void 0 });
  function r(f, c) {
    const d = (function () {
      let w, g, y;
      return (h, p) => {
        for (g = -1, w = h.length; w - g > 1; )
          (y = (w + g) >> 1), h[y] <= p ? (g = y) : (w = y);
        return w;
      };
    })();
    (this.x = f), (this.y = c), (this.lastIndex = f.length - 1);
    let u, m;
    return (
      (this.interpolate = function (w) {
        return w
          ? ((m = d(this.x, w)),
            (u = m - 1),
            ((w - this.x[u]) * (this.y[m] - this.y[u])) /
              (this.x[m] - this.x[u]) +
              this.y[u])
          : 0;
      }),
      this
    );
  }
  function n(f) {
    e.controller.spline = e.params.loop
      ? new r(e.slidesGrid, f.slidesGrid)
      : new r(e.snapGrid, f.snapGrid);
  }
  function a(f, c) {
    const d = e.controller.control;
    let u, m;
    const v = e.constructor;
    function w(g) {
      if (g.destroyed) return;
      const y = e.rtlTranslate ? -e.translate : e.translate;
      e.params.controller.by === 'slide' &&
        (n(g), (m = -e.controller.spline.interpolate(-y))),
        (!m || e.params.controller.by === 'container') &&
          ((u =
            (g.maxTranslate() - g.minTranslate()) /
            (e.maxTranslate() - e.minTranslate())),
          (Number.isNaN(u) || !Number.isFinite(u)) && (u = 1),
          (m = (y - e.minTranslate()) * u + g.minTranslate())),
        e.params.controller.inverse && (m = g.maxTranslate() - m),
        g.updateProgress(m),
        g.setTranslate(m, e),
        g.updateActiveIndex(),
        g.updateSlidesClasses();
    }
    if (Array.isArray(d))
      for (let g = 0; g < d.length; g += 1)
        d[g] !== c && d[g] instanceof v && w(d[g]);
    else d instanceof v && c !== d && w(d);
  }
  function l(f, c) {
    const d = e.constructor,
      u = e.controller.control;
    let m;
    function v(w) {
      w.destroyed ||
        (w.setTransition(f, e),
        f !== 0 &&
          (w.transitionStart(),
          w.params.autoHeight &&
            Te(() => {
              w.updateAutoHeight();
            }),
          je(w.wrapperEl, () => {
            u && w.transitionEnd();
          })));
    }
    if (Array.isArray(u))
      for (m = 0; m < u.length; m += 1)
        u[m] !== c && u[m] instanceof d && v(u[m]);
    else u instanceof d && c !== u && v(u);
  }
  function o() {
    e.controller.control &&
      e.controller.spline &&
      ((e.controller.spline = void 0), delete e.controller.spline);
  }
  s('beforeInit', () => {
    if (
      typeof window < 'u' &&
      (typeof e.params.controller.control == 'string' ||
        e.params.controller.control instanceof HTMLElement)
    ) {
      (typeof e.params.controller.control == 'string'
        ? [...document.querySelectorAll(e.params.controller.control)]
        : [e.params.controller.control]
      ).forEach((c) => {
        if (
          (e.controller.control || (e.controller.control = []), c && c.swiper)
        )
          e.controller.control.push(c.swiper);
        else if (c) {
          const d = `${e.params.eventsPrefix}init`,
            u = (m) => {
              e.controller.control.push(m.detail[0]),
                e.update(),
                c.removeEventListener(d, u);
            };
          c.addEventListener(d, u);
        }
      });
      return;
    }
    e.controller.control = e.params.controller.control;
  }),
    s('update', () => {
      o();
    }),
    s('resize', () => {
      o();
    }),
    s('observerUpdate', () => {
      o();
    }),
    s('setTranslate', (f, c, d) => {
      !e.controller.control ||
        e.controller.control.destroyed ||
        e.controller.setTranslate(c, d);
    }),
    s('setTransition', (f, c, d) => {
      !e.controller.control ||
        e.controller.control.destroyed ||
        e.controller.setTransition(c, d);
    }),
    Object.assign(e.controller, { setTranslate: a, setTransition: l });
}
function rl(t) {
  let { swiper: e, extendParams: i, on: s } = t;
  i({
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
  let r = null,
    n,
    a,
    l = new Date().getTime();
  function o(M) {
    const P = r;
    P.length !== 0 && ((P.innerHTML = ''), (P.innerHTML = M));
  }
  function f(M) {
    M === void 0 && (M = 16);
    const P = () => Math.round(16 * Math.random()).toString(16);
    return 'x'.repeat(M).replace(/x/g, P);
  }
  function c(M) {
    (M = G(M)),
      M.forEach((P) => {
        P.setAttribute('tabIndex', '0');
      });
  }
  function d(M) {
    (M = G(M)),
      M.forEach((P) => {
        P.setAttribute('tabIndex', '-1');
      });
  }
  function u(M, P) {
    (M = G(M)),
      M.forEach((k) => {
        k.setAttribute('role', P);
      });
  }
  function m(M, P) {
    (M = G(M)),
      M.forEach((k) => {
        k.setAttribute('aria-roledescription', P);
      });
  }
  function v(M, P) {
    (M = G(M)),
      M.forEach((k) => {
        k.setAttribute('aria-controls', P);
      });
  }
  function w(M, P) {
    (M = G(M)),
      M.forEach((k) => {
        k.setAttribute('aria-label', P);
      });
  }
  function g(M, P) {
    (M = G(M)),
      M.forEach((k) => {
        k.setAttribute('id', P);
      });
  }
  function y(M, P) {
    (M = G(M)),
      M.forEach((k) => {
        k.setAttribute('aria-live', P);
      });
  }
  function h(M) {
    (M = G(M)),
      M.forEach((P) => {
        P.setAttribute('aria-disabled', !0);
      });
  }
  function p(M) {
    (M = G(M)),
      M.forEach((P) => {
        P.setAttribute('aria-disabled', !1);
      });
  }
  function b(M) {
    if (M.keyCode !== 13 && M.keyCode !== 32) return;
    const P = e.params.a11y,
      k = M.target;
    if (
      !(
        e.pagination &&
        e.pagination.el &&
        (k === e.pagination.el || e.pagination.el.contains(M.target)) &&
        !M.target.matches(oe(e.params.pagination.bulletClass))
      )
    ) {
      if (e.navigation && e.navigation.prevEl && e.navigation.nextEl) {
        const N = G(e.navigation.prevEl);
        G(e.navigation.nextEl).includes(k) &&
          ((e.isEnd && !e.params.loop) || e.slideNext(),
          e.isEnd ? o(P.lastSlideMessage) : o(P.nextSlideMessage)),
          N.includes(k) &&
            ((e.isBeginning && !e.params.loop) || e.slidePrev(),
            e.isBeginning ? o(P.firstSlideMessage) : o(P.prevSlideMessage));
      }
      e.pagination &&
        k.matches(oe(e.params.pagination.bulletClass)) &&
        k.click();
    }
  }
  function x() {
    if (e.params.loop || e.params.rewind || !e.navigation) return;
    const { nextEl: M, prevEl: P } = e.navigation;
    P && (e.isBeginning ? (h(P), d(P)) : (p(P), c(P))),
      M && (e.isEnd ? (h(M), d(M)) : (p(M), c(M)));
  }
  function A() {
    return e.pagination && e.pagination.bullets && e.pagination.bullets.length;
  }
  function $() {
    return A() && e.params.pagination.clickable;
  }
  function I() {
    const M = e.params.a11y;
    A() &&
      e.pagination.bullets.forEach((P) => {
        e.params.pagination.clickable &&
          (c(P),
          e.params.pagination.renderBullet ||
            (u(P, 'button'),
            w(
              P,
              M.paginationBulletMessage.replace(/\{\{index\}\}/, qe(P) + 1),
            ))),
          P.matches(oe(e.params.pagination.bulletActiveClass))
            ? P.setAttribute('aria-current', 'true')
            : P.removeAttribute('aria-current');
      });
  }
  const T = (M, P, k) => {
      c(M),
        M.tagName !== 'BUTTON' &&
          (u(M, 'button'), M.addEventListener('keydown', b)),
        w(M, k),
        v(M, P);
    },
    _ = (M) => {
      a && a !== M.target && !a.contains(M.target) && (n = !0),
        (e.a11y.clicked = !0);
    },
    L = () => {
      (n = !1),
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            e.destroyed || (e.a11y.clicked = !1);
          });
        });
    },
    C = (M) => {
      l = new Date().getTime();
    },
    S = (M) => {
      if (
        e.a11y.clicked ||
        !e.params.a11y.scrollOnFocus ||
        new Date().getTime() - l < 100
      )
        return;
      const P = M.target.closest(`.${e.params.slideClass}, swiper-slide`);
      if (!P || !e.slides.includes(P)) return;
      a = P;
      const k = e.slides.indexOf(P) === e.activeIndex,
        N =
          e.params.watchSlidesProgress &&
          e.visibleSlides &&
          e.visibleSlides.includes(P);
      k ||
        N ||
        (M.sourceCapabilities && M.sourceCapabilities.firesTouchEvents) ||
        (e.isHorizontal() ? (e.el.scrollLeft = 0) : (e.el.scrollTop = 0),
        requestAnimationFrame(() => {
          n ||
            (e.params.loop
              ? e.slideToLoop(
                  parseInt(P.getAttribute('data-swiper-slide-index')),
                  0,
                )
              : e.slideTo(e.slides.indexOf(P), 0),
            (n = !1));
        }));
    },
    E = () => {
      const M = e.params.a11y;
      M.itemRoleDescriptionMessage && m(e.slides, M.itemRoleDescriptionMessage),
        M.slideRole && u(e.slides, M.slideRole);
      const P = e.slides.length;
      M.slideLabelMessage &&
        e.slides.forEach((k, N) => {
          const z = e.params.loop
              ? parseInt(k.getAttribute('data-swiper-slide-index'), 10)
              : N,
            D = M.slideLabelMessage
              .replace(/\{\{index\}\}/, z + 1)
              .replace(/\{\{slidesLength\}\}/, P);
          w(k, D);
        });
    },
    O = () => {
      const M = e.params.a11y;
      e.el.append(r);
      const P = e.el;
      M.containerRoleDescriptionMessage &&
        m(P, M.containerRoleDescriptionMessage),
        M.containerMessage && w(P, M.containerMessage),
        M.containerRole && u(P, M.containerRole);
      const k = e.wrapperEl,
        N = M.id || k.getAttribute('id') || `swiper-wrapper-${f(16)}`,
        z = e.params.autoplay && e.params.autoplay.enabled ? 'off' : 'polite';
      g(k, N), y(k, z), E();
      let { nextEl: D, prevEl: B } = e.navigation ? e.navigation : {};
      (D = G(D)),
        (B = G(B)),
        D && D.forEach((H) => T(H, N, M.nextSlideMessage)),
        B && B.forEach((H) => T(H, N, M.prevSlideMessage)),
        $() &&
          G(e.pagination.el).forEach((F) => {
            F.addEventListener('keydown', b);
          }),
        K().addEventListener('visibilitychange', C),
        e.el.addEventListener('focus', S, !0),
        e.el.addEventListener('focus', S, !0),
        e.el.addEventListener('pointerdown', _, !0),
        e.el.addEventListener('pointerup', L, !0);
    };
  function R() {
    r && r.remove();
    let { nextEl: M, prevEl: P } = e.navigation ? e.navigation : {};
    (M = G(M)),
      (P = G(P)),
      M && M.forEach((N) => N.removeEventListener('keydown', b)),
      P && P.forEach((N) => N.removeEventListener('keydown', b)),
      $() &&
        G(e.pagination.el).forEach((z) => {
          z.removeEventListener('keydown', b);
        }),
      K().removeEventListener('visibilitychange', C),
      e.el &&
        typeof e.el != 'string' &&
        (e.el.removeEventListener('focus', S, !0),
        e.el.removeEventListener('pointerdown', _, !0),
        e.el.removeEventListener('pointerup', L, !0));
  }
  s('beforeInit', () => {
    (r = ee('span', e.params.a11y.notificationClass)),
      r.setAttribute('aria-live', 'assertive'),
      r.setAttribute('aria-atomic', 'true');
  }),
    s('afterInit', () => {
      e.params.a11y.enabled && O();
    }),
    s('slidesLengthChange snapGridLengthChange slidesGridLengthChange', () => {
      e.params.a11y.enabled && E();
    }),
    s('fromEdge toEdge afterInit lock unlock', () => {
      e.params.a11y.enabled && x();
    }),
    s('paginationUpdate', () => {
      e.params.a11y.enabled && I();
    }),
    s('destroy', () => {
      e.params.a11y.enabled && R();
    });
}
function nl(t) {
  let { swiper: e, extendParams: i, on: s } = t;
  i({
    history: {
      enabled: !1,
      root: '',
      replaceState: !1,
      key: 'slides',
      keepQuery: !1,
    },
  });
  let r = !1,
    n = {};
  const a = (m) =>
      m
        .toString()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, ''),
    l = (m) => {
      const v = j();
      let w;
      m ? (w = new URL(m)) : (w = v.location);
      const g = w.pathname
          .slice(1)
          .split('/')
          .filter((b) => b !== ''),
        y = g.length,
        h = g[y - 2],
        p = g[y - 1];
      return { key: h, value: p };
    },
    o = (m, v) => {
      const w = j();
      if (!r || !e.params.history.enabled) return;
      let g;
      e.params.url ? (g = new URL(e.params.url)) : (g = w.location);
      const y =
        e.virtual && e.params.virtual.enabled
          ? e.slidesEl.querySelector(`[data-swiper-slide-index="${v}"]`)
          : e.slides[v];
      let h = a(y.getAttribute('data-history'));
      if (e.params.history.root.length > 0) {
        let b = e.params.history.root;
        b[b.length - 1] === '/' && (b = b.slice(0, b.length - 1)),
          (h = `${b}/${m ? `${m}/` : ''}${h}`);
      } else g.pathname.includes(m) || (h = `${m ? `${m}/` : ''}${h}`);
      e.params.history.keepQuery && (h += g.search);
      const p = w.history.state;
      (p && p.value === h) ||
        (e.params.history.replaceState
          ? w.history.replaceState({ value: h }, null, h)
          : w.history.pushState({ value: h }, null, h));
    },
    f = (m, v, w) => {
      if (v)
        for (let g = 0, y = e.slides.length; g < y; g += 1) {
          const h = e.slides[g];
          if (a(h.getAttribute('data-history')) === v) {
            const b = e.getSlideIndex(h);
            e.slideTo(b, m, w);
          }
        }
      else e.slideTo(0, m, w);
    },
    c = () => {
      (n = l(e.params.url)), f(e.params.speed, n.value, !1);
    },
    d = () => {
      const m = j();
      if (e.params.history) {
        if (!m.history || !m.history.pushState) {
          (e.params.history.enabled = !1),
            (e.params.hashNavigation.enabled = !0);
          return;
        }
        if (((r = !0), (n = l(e.params.url)), !n.key && !n.value)) {
          e.params.history.replaceState || m.addEventListener('popstate', c);
          return;
        }
        f(0, n.value, e.params.runCallbacksOnInit),
          e.params.history.replaceState || m.addEventListener('popstate', c);
      }
    },
    u = () => {
      const m = j();
      e.params.history.replaceState || m.removeEventListener('popstate', c);
    };
  s('init', () => {
    e.params.history.enabled && d();
  }),
    s('destroy', () => {
      e.params.history.enabled && u();
    }),
    s('transitionEnd _freeModeNoMomentumRelease', () => {
      r && o(e.params.history.key, e.activeIndex);
    }),
    s('slideChange', () => {
      r && e.params.cssMode && o(e.params.history.key, e.activeIndex);
    });
}
function al(t) {
  let { swiper: e, extendParams: i, emit: s, on: r } = t,
    n = !1;
  const a = K(),
    l = j();
  i({
    hashNavigation: {
      enabled: !1,
      replaceState: !1,
      watchState: !1,
      getSlideIndex(u, m) {
        if (e.virtual && e.params.virtual.enabled) {
          const v = e.slides.filter(
            (g) => g.getAttribute('data-hash') === m,
          )[0];
          return v
            ? parseInt(v.getAttribute('data-swiper-slide-index'), 10)
            : 0;
        }
        return e.getSlideIndex(
          q(
            e.slidesEl,
            `.${e.params.slideClass}[data-hash="${m}"], swiper-slide[data-hash="${m}"]`,
          )[0],
        );
      },
    },
  });
  const o = () => {
      s('hashChange');
      const u = a.location.hash.replace('#', ''),
        m =
          e.virtual && e.params.virtual.enabled
            ? e.slidesEl.querySelector(
                `[data-swiper-slide-index="${e.activeIndex}"]`,
              )
            : e.slides[e.activeIndex],
        v = m ? m.getAttribute('data-hash') : '';
      if (u !== v) {
        const w = e.params.hashNavigation.getSlideIndex(e, u);
        if (typeof w > 'u' || Number.isNaN(w)) return;
        e.slideTo(w);
      }
    },
    f = () => {
      if (!n || !e.params.hashNavigation.enabled) return;
      const u =
          e.virtual && e.params.virtual.enabled
            ? e.slidesEl.querySelector(
                `[data-swiper-slide-index="${e.activeIndex}"]`,
              )
            : e.slides[e.activeIndex],
        m = u
          ? u.getAttribute('data-hash') || u.getAttribute('data-history')
          : '';
      e.params.hashNavigation.replaceState &&
      l.history &&
      l.history.replaceState
        ? (l.history.replaceState(null, null, `#${m}` || ''), s('hashSet'))
        : ((a.location.hash = m || ''), s('hashSet'));
    },
    c = () => {
      if (
        !e.params.hashNavigation.enabled ||
        (e.params.history && e.params.history.enabled)
      )
        return;
      n = !0;
      const u = a.location.hash.replace('#', '');
      if (u) {
        const v = e.params.hashNavigation.getSlideIndex(e, u);
        e.slideTo(v || 0, 0, e.params.runCallbacksOnInit, !0);
      }
      e.params.hashNavigation.watchState && l.addEventListener('hashchange', o);
    },
    d = () => {
      e.params.hashNavigation.watchState &&
        l.removeEventListener('hashchange', o);
    };
  r('init', () => {
    e.params.hashNavigation.enabled && c();
  }),
    r('destroy', () => {
      e.params.hashNavigation.enabled && d();
    }),
    r('transitionEnd _freeModeNoMomentumRelease', () => {
      n && f();
    }),
    r('slideChange', () => {
      n && e.params.cssMode && f();
    });
}
function ol(t) {
  let { swiper: e, extendParams: i, on: s, emit: r, params: n } = t;
  (e.autoplay = { running: !1, paused: !1, timeLeft: 0 }),
    i({
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
  let a,
    l,
    o = n && n.autoplay ? n.autoplay.delay : 3e3,
    f = n && n.autoplay ? n.autoplay.delay : 3e3,
    c,
    d = new Date().getTime(),
    u,
    m,
    v,
    w,
    g,
    y,
    h;
  function p(P) {
    !e ||
      e.destroyed ||
      !e.wrapperEl ||
      (P.target === e.wrapperEl &&
        (e.wrapperEl.removeEventListener('transitionend', p),
        !(h || (P.detail && P.detail.bySwiperTouchMove)) && _()));
  }
  const b = () => {
      if (e.destroyed || !e.autoplay.running) return;
      e.autoplay.paused ? (u = !0) : u && ((f = c), (u = !1));
      const P = e.autoplay.paused ? c : d + f - new Date().getTime();
      (e.autoplay.timeLeft = P),
        r('autoplayTimeLeft', P, P / o),
        (l = requestAnimationFrame(() => {
          b();
        }));
    },
    x = () => {
      let P;
      return (
        e.virtual && e.params.virtual.enabled
          ? (P = e.slides.filter((N) =>
              N.classList.contains('swiper-slide-active'),
            )[0])
          : (P = e.slides[e.activeIndex]),
        P ? parseInt(P.getAttribute('data-swiper-autoplay'), 10) : void 0
      );
    },
    A = (P) => {
      if (e.destroyed || !e.autoplay.running) return;
      cancelAnimationFrame(l), b();
      let k = typeof P > 'u' ? e.params.autoplay.delay : P;
      (o = e.params.autoplay.delay), (f = e.params.autoplay.delay);
      const N = x();
      !Number.isNaN(N) &&
        N > 0 &&
        typeof P > 'u' &&
        ((k = N), (o = N), (f = N)),
        (c = k);
      const z = e.params.speed,
        D = () => {
          !e ||
            e.destroyed ||
            (e.params.autoplay.reverseDirection
              ? !e.isBeginning || e.params.loop || e.params.rewind
                ? (e.slidePrev(z, !0, !0), r('autoplay'))
                : e.params.autoplay.stopOnLastSlide ||
                  (e.slideTo(e.slides.length - 1, z, !0, !0), r('autoplay'))
              : !e.isEnd || e.params.loop || e.params.rewind
              ? (e.slideNext(z, !0, !0), r('autoplay'))
              : e.params.autoplay.stopOnLastSlide ||
                (e.slideTo(0, z, !0, !0), r('autoplay')),
            e.params.cssMode &&
              ((d = new Date().getTime()),
              requestAnimationFrame(() => {
                A();
              })));
        };
      return (
        k > 0
          ? (clearTimeout(a),
            (a = setTimeout(() => {
              D();
            }, k)))
          : requestAnimationFrame(() => {
              D();
            }),
        k
      );
    },
    $ = () => {
      (d = new Date().getTime()),
        (e.autoplay.running = !0),
        A(),
        r('autoplayStart');
    },
    I = () => {
      (e.autoplay.running = !1),
        clearTimeout(a),
        cancelAnimationFrame(l),
        r('autoplayStop');
    },
    T = (P, k) => {
      if (e.destroyed || !e.autoplay.running) return;
      clearTimeout(a), P || (y = !0);
      const N = () => {
        r('autoplayPause'),
          e.params.autoplay.waitForTransition
            ? e.wrapperEl.addEventListener('transitionend', p)
            : _();
      };
      if (((e.autoplay.paused = !0), k)) {
        g && (c = e.params.autoplay.delay), (g = !1), N();
        return;
      }
      (c = (c || e.params.autoplay.delay) - (new Date().getTime() - d)),
        !(e.isEnd && c < 0 && !e.params.loop) && (c < 0 && (c = 0), N());
    },
    _ = () => {
      (e.isEnd && c < 0 && !e.params.loop) ||
        e.destroyed ||
        !e.autoplay.running ||
        ((d = new Date().getTime()),
        y ? ((y = !1), A(c)) : A(),
        (e.autoplay.paused = !1),
        r('autoplayResume'));
    },
    L = () => {
      if (e.destroyed || !e.autoplay.running) return;
      const P = K();
      P.visibilityState === 'hidden' && ((y = !0), T(!0)),
        P.visibilityState === 'visible' && _();
    },
    C = (P) => {
      P.pointerType === 'mouse' &&
        ((y = !0), (h = !0), !(e.animating || e.autoplay.paused) && T(!0));
    },
    S = (P) => {
      P.pointerType === 'mouse' && ((h = !1), e.autoplay.paused && _());
    },
    E = () => {
      e.params.autoplay.pauseOnMouseEnter &&
        (e.el.addEventListener('pointerenter', C),
        e.el.addEventListener('pointerleave', S));
    },
    O = () => {
      e.el &&
        typeof e.el != 'string' &&
        (e.el.removeEventListener('pointerenter', C),
        e.el.removeEventListener('pointerleave', S));
    },
    R = () => {
      K().addEventListener('visibilitychange', L);
    },
    M = () => {
      K().removeEventListener('visibilitychange', L);
    };
  s('init', () => {
    e.params.autoplay.enabled && (E(), R(), $());
  }),
    s('destroy', () => {
      O(), M(), e.autoplay.running && I();
    }),
    s('_freeModeStaticRelease', () => {
      (v || y) && _();
    }),
    s('_freeModeNoMomentumRelease', () => {
      e.params.autoplay.disableOnInteraction ? I() : T(!0, !0);
    }),
    s('beforeTransitionStart', (P, k, N) => {
      e.destroyed ||
        !e.autoplay.running ||
        (N || !e.params.autoplay.disableOnInteraction ? T(!0, !0) : I());
    }),
    s('sliderFirstMove', () => {
      if (!(e.destroyed || !e.autoplay.running)) {
        if (e.params.autoplay.disableOnInteraction) {
          I();
          return;
        }
        (m = !0),
          (v = !1),
          (y = !1),
          (w = setTimeout(() => {
            (y = !0), (v = !0), T(!0);
          }, 200));
      }
    }),
    s('touchEnd', () => {
      if (!(e.destroyed || !e.autoplay.running || !m)) {
        if (
          (clearTimeout(w),
          clearTimeout(a),
          e.params.autoplay.disableOnInteraction)
        ) {
          (v = !1), (m = !1);
          return;
        }
        v && e.params.cssMode && _(), (v = !1), (m = !1);
      }
    }),
    s('slideChange', () => {
      e.destroyed || !e.autoplay.running || (g = !0);
    }),
    Object.assign(e.autoplay, { start: $, stop: I, pause: T, resume: _ });
}
function ll(t) {
  let { swiper: e, extendParams: i, on: s } = t;
  i({
    thumbs: {
      swiper: null,
      multipleActiveThumbs: !0,
      autoScrollOffset: 0,
      slideThumbActiveClass: 'swiper-slide-thumb-active',
      thumbsContainerClass: 'swiper-thumbs',
    },
  });
  let r = !1,
    n = !1;
  e.thumbs = { swiper: null };
  function a() {
    const f = e.thumbs.swiper;
    if (!f || f.destroyed) return;
    const c = f.clickedIndex,
      d = f.clickedSlide;
    if (
      (d && d.classList.contains(e.params.thumbs.slideThumbActiveClass)) ||
      typeof c > 'u' ||
      c === null
    )
      return;
    let u;
    f.params.loop
      ? (u = parseInt(
          f.clickedSlide.getAttribute('data-swiper-slide-index'),
          10,
        ))
      : (u = c),
      e.params.loop ? e.slideToLoop(u) : e.slideTo(u);
  }
  function l() {
    const { thumbs: f } = e.params;
    if (r) return !1;
    r = !0;
    const c = e.constructor;
    if (f.swiper instanceof c)
      (e.thumbs.swiper = f.swiper),
        Object.assign(e.thumbs.swiper.originalParams, {
          watchSlidesProgress: !0,
          slideToClickedSlide: !1,
        }),
        Object.assign(e.thumbs.swiper.params, {
          watchSlidesProgress: !0,
          slideToClickedSlide: !1,
        }),
        e.thumbs.swiper.update();
    else if (Fe(f.swiper)) {
      const d = Object.assign({}, f.swiper);
      Object.assign(d, { watchSlidesProgress: !0, slideToClickedSlide: !1 }),
        (e.thumbs.swiper = new c(d)),
        (n = !0);
    }
    return (
      e.thumbs.swiper.el.classList.add(e.params.thumbs.thumbsContainerClass),
      e.thumbs.swiper.on('tap', a),
      !0
    );
  }
  function o(f) {
    const c = e.thumbs.swiper;
    if (!c || c.destroyed) return;
    const d =
      c.params.slidesPerView === 'auto'
        ? c.slidesPerViewDynamic()
        : c.params.slidesPerView;
    let u = 1;
    const m = e.params.thumbs.slideThumbActiveClass;
    if (
      (e.params.slidesPerView > 1 &&
        !e.params.centeredSlides &&
        (u = e.params.slidesPerView),
      e.params.thumbs.multipleActiveThumbs || (u = 1),
      (u = Math.floor(u)),
      c.slides.forEach((g) => g.classList.remove(m)),
      c.params.loop || (c.params.virtual && c.params.virtual.enabled))
    )
      for (let g = 0; g < u; g += 1)
        q(c.slidesEl, `[data-swiper-slide-index="${e.realIndex + g}"]`).forEach(
          (y) => {
            y.classList.add(m);
          },
        );
    else
      for (let g = 0; g < u; g += 1)
        c.slides[e.realIndex + g] && c.slides[e.realIndex + g].classList.add(m);
    const v = e.params.thumbs.autoScrollOffset,
      w = v && !c.params.loop;
    if (e.realIndex !== c.realIndex || w) {
      const g = c.activeIndex;
      let y, h;
      if (c.params.loop) {
        const p = c.slides.filter(
          (b) => b.getAttribute('data-swiper-slide-index') === `${e.realIndex}`,
        )[0];
        (y = c.slides.indexOf(p)),
          (h = e.activeIndex > e.previousIndex ? 'next' : 'prev');
      } else (y = e.realIndex), (h = y > e.previousIndex ? 'next' : 'prev');
      w && (y += h === 'next' ? v : -1 * v),
        c.visibleSlidesIndexes &&
          c.visibleSlidesIndexes.indexOf(y) < 0 &&
          (c.params.centeredSlides
            ? y > g
              ? (y = y - Math.floor(d / 2) + 1)
              : (y = y + Math.floor(d / 2) - 1)
            : y > g && c.params.slidesPerGroup,
          c.slideTo(y, f ? 0 : void 0));
    }
  }
  s('beforeInit', () => {
    const { thumbs: f } = e.params;
    if (!(!f || !f.swiper))
      if (typeof f.swiper == 'string' || f.swiper instanceof HTMLElement) {
        const c = K(),
          d = () => {
            const m =
              typeof f.swiper == 'string'
                ? c.querySelector(f.swiper)
                : f.swiper;
            if (m && m.swiper) (f.swiper = m.swiper), l(), o(!0);
            else if (m) {
              const v = `${e.params.eventsPrefix}init`,
                w = (g) => {
                  (f.swiper = g.detail[0]),
                    m.removeEventListener(v, w),
                    l(),
                    o(!0),
                    f.swiper.update(),
                    e.update();
                };
              m.addEventListener(v, w);
            }
            return m;
          },
          u = () => {
            if (e.destroyed) return;
            d() || requestAnimationFrame(u);
          };
        requestAnimationFrame(u);
      } else l(), o(!0);
  }),
    s('slideChange update resize observerUpdate', () => {
      o();
    }),
    s('setTransition', (f, c) => {
      const d = e.thumbs.swiper;
      !d || d.destroyed || d.setTransition(c);
    }),
    s('beforeDestroy', () => {
      const f = e.thumbs.swiper;
      !f || f.destroyed || (n && f.destroy());
    }),
    Object.assign(e.thumbs, { init: l, update: o });
}
function dl(t) {
  let { swiper: e, extendParams: i, emit: s, once: r } = t;
  i({
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
  function n() {
    if (e.params.cssMode) return;
    const o = e.getTranslate();
    e.setTranslate(o),
      e.setTransition(0),
      (e.touchEventsData.velocities.length = 0),
      e.freeMode.onTouchEnd({ currentPos: e.rtl ? e.translate : -e.translate });
  }
  function a() {
    if (e.params.cssMode) return;
    const { touchEventsData: o, touches: f } = e;
    o.velocities.length === 0 &&
      o.velocities.push({
        position: f[e.isHorizontal() ? 'startX' : 'startY'],
        time: o.touchStartTime,
      }),
      o.velocities.push({
        position: f[e.isHorizontal() ? 'currentX' : 'currentY'],
        time: te(),
      });
  }
  function l(o) {
    let { currentPos: f } = o;
    if (e.params.cssMode) return;
    const {
        params: c,
        wrapperEl: d,
        rtlTranslate: u,
        snapGrid: m,
        touchEventsData: v,
      } = e,
      g = te() - v.touchStartTime;
    if (f < -e.minTranslate()) {
      e.slideTo(e.activeIndex);
      return;
    }
    if (f > -e.maxTranslate()) {
      e.slides.length < m.length
        ? e.slideTo(m.length - 1)
        : e.slideTo(e.slides.length - 1);
      return;
    }
    if (c.freeMode.momentum) {
      if (v.velocities.length > 1) {
        const I = v.velocities.pop(),
          T = v.velocities.pop(),
          _ = I.position - T.position,
          L = I.time - T.time;
        (e.velocity = _ / L),
          (e.velocity /= 2),
          Math.abs(e.velocity) < c.freeMode.minimumVelocity && (e.velocity = 0),
          (L > 150 || te() - I.time > 300) && (e.velocity = 0);
      } else e.velocity = 0;
      (e.velocity *= c.freeMode.momentumVelocityRatio),
        (v.velocities.length = 0);
      let y = 1e3 * c.freeMode.momentumRatio;
      const h = e.velocity * y;
      let p = e.translate + h;
      u && (p = -p);
      let b = !1,
        x;
      const A = Math.abs(e.velocity) * 20 * c.freeMode.momentumBounceRatio;
      let $;
      if (p < e.maxTranslate())
        c.freeMode.momentumBounce
          ? (p + e.maxTranslate() < -A && (p = e.maxTranslate() - A),
            (x = e.maxTranslate()),
            (b = !0),
            (v.allowMomentumBounce = !0))
          : (p = e.maxTranslate()),
          c.loop && c.centeredSlides && ($ = !0);
      else if (p > e.minTranslate())
        c.freeMode.momentumBounce
          ? (p - e.minTranslate() > A && (p = e.minTranslate() + A),
            (x = e.minTranslate()),
            (b = !0),
            (v.allowMomentumBounce = !0))
          : (p = e.minTranslate()),
          c.loop && c.centeredSlides && ($ = !0);
      else if (c.freeMode.sticky) {
        let I;
        for (let T = 0; T < m.length; T += 1)
          if (m[T] > -p) {
            I = T;
            break;
          }
        Math.abs(m[I] - p) < Math.abs(m[I - 1] - p) ||
        e.swipeDirection === 'next'
          ? (p = m[I])
          : (p = m[I - 1]),
          (p = -p);
      }
      if (
        ($ &&
          r('transitionEnd', () => {
            e.loopFix();
          }),
        e.velocity !== 0)
      ) {
        if (
          (u
            ? (y = Math.abs((-p - e.translate) / e.velocity))
            : (y = Math.abs((p - e.translate) / e.velocity)),
          c.freeMode.sticky)
        ) {
          const I = Math.abs((u ? -p : p) - e.translate),
            T = e.slidesSizesGrid[e.activeIndex];
          I < T
            ? (y = c.speed)
            : I < 2 * T
            ? (y = c.speed * 1.5)
            : (y = c.speed * 2.5);
        }
      } else if (c.freeMode.sticky) {
        e.slideToClosest();
        return;
      }
      c.freeMode.momentumBounce && b
        ? (e.updateProgress(x),
          e.setTransition(y),
          e.setTranslate(p),
          e.transitionStart(!0, e.swipeDirection),
          (e.animating = !0),
          je(d, () => {
            !e ||
              e.destroyed ||
              !v.allowMomentumBounce ||
              (s('momentumBounce'),
              e.setTransition(c.speed),
              setTimeout(() => {
                e.setTranslate(x),
                  je(d, () => {
                    !e || e.destroyed || e.transitionEnd();
                  });
              }, 0));
          }))
        : e.velocity
        ? (s('_freeModeNoMomentumRelease'),
          e.updateProgress(p),
          e.setTransition(y),
          e.setTranslate(p),
          e.transitionStart(!0, e.swipeDirection),
          e.animating ||
            ((e.animating = !0),
            je(d, () => {
              !e || e.destroyed || e.transitionEnd();
            })))
        : e.updateProgress(p),
        e.updateActiveIndex(),
        e.updateSlidesClasses();
    } else if (c.freeMode.sticky) {
      e.slideToClosest();
      return;
    } else c.freeMode && s('_freeModeNoMomentumRelease');
    (!c.freeMode.momentum || g >= c.longSwipesMs) &&
      (s('_freeModeStaticRelease'),
      e.updateProgress(),
      e.updateActiveIndex(),
      e.updateSlidesClasses());
  }
  Object.assign(e, {
    freeMode: { onTouchStart: n, onTouchMove: a, onTouchEnd: l },
  });
}
function cl(t) {
  let { swiper: e, extendParams: i, on: s } = t;
  i({ grid: { rows: 1, fill: 'column' } });
  let r, n, a, l;
  const o = () => {
      let w = e.params.spaceBetween;
      return (
        typeof w == 'string' && w.indexOf('%') >= 0
          ? (w = (parseFloat(w.replace('%', '')) / 100) * e.size)
          : typeof w == 'string' && (w = parseFloat(w)),
        w
      );
    },
    f = (w) => {
      const { slidesPerView: g } = e.params,
        { rows: y, fill: h } = e.params.grid,
        p =
          e.virtual && e.params.virtual.enabled
            ? e.virtual.slides.length
            : w.length;
      (a = Math.floor(p / y)),
        Math.floor(p / y) === p / y ? (r = p) : (r = Math.ceil(p / y) * y),
        g !== 'auto' && h === 'row' && (r = Math.max(r, g * y)),
        (n = r / y);
    },
    c = () => {
      e.slides &&
        e.slides.forEach((w) => {
          w.swiperSlideGridSet &&
            ((w.style.height = ''),
            (w.style[e.getDirectionLabel('margin-top')] = ''));
        });
    },
    d = (w, g, y) => {
      const { slidesPerGroup: h } = e.params,
        p = o(),
        { rows: b, fill: x } = e.params.grid,
        A =
          e.virtual && e.params.virtual.enabled
            ? e.virtual.slides.length
            : y.length;
      let $, I, T;
      if (x === 'row' && h > 1) {
        const _ = Math.floor(w / (h * b)),
          L = w - b * h * _,
          C = _ === 0 ? h : Math.min(Math.ceil((A - _ * b * h) / b), h);
        (T = Math.floor(L / C)),
          (I = L - T * C + _ * h),
          ($ = I + (T * r) / b),
          (g.style.order = $);
      } else
        x === 'column'
          ? ((I = Math.floor(w / b)),
            (T = w - I * b),
            (I > a || (I === a && T === b - 1)) &&
              ((T += 1), T >= b && ((T = 0), (I += 1))))
          : ((T = Math.floor(w / n)), (I = w - T * n));
      (g.row = T),
        (g.column = I),
        (g.style.height = `calc((100% - ${(b - 1) * p}px) / ${b})`),
        (g.style[e.getDirectionLabel('margin-top')] =
          T !== 0 ? p && `${p}px` : ''),
        (g.swiperSlideGridSet = !0);
    },
    u = (w, g) => {
      const { centeredSlides: y, roundLengths: h } = e.params,
        p = o(),
        { rows: b } = e.params.grid;
      if (
        ((e.virtualSize = (w + p) * r),
        (e.virtualSize = Math.ceil(e.virtualSize / b) - p),
        e.params.cssMode ||
          (e.wrapperEl.style[e.getDirectionLabel('width')] = `${
            e.virtualSize + p
          }px`),
        y)
      ) {
        const x = [];
        for (let A = 0; A < g.length; A += 1) {
          let $ = g[A];
          h && ($ = Math.floor($)), g[A] < e.virtualSize + g[0] && x.push($);
        }
        g.splice(0, g.length), g.push(...x);
      }
    },
    m = () => {
      l = e.params.grid && e.params.grid.rows > 1;
    },
    v = () => {
      const { params: w, el: g } = e,
        y = w.grid && w.grid.rows > 1;
      l && !y
        ? (g.classList.remove(
            `${w.containerModifierClass}grid`,
            `${w.containerModifierClass}grid-column`,
          ),
          (a = 1),
          e.emitContainerClasses())
        : !l &&
          y &&
          (g.classList.add(`${w.containerModifierClass}grid`),
          w.grid.fill === 'column' &&
            g.classList.add(`${w.containerModifierClass}grid-column`),
          e.emitContainerClasses()),
        (l = y);
    };
  s('init', m),
    s('update', v),
    (e.grid = {
      initSlides: f,
      unsetSlides: c,
      updateSlide: d,
      updateWrapperSize: u,
    });
}
function ul(t) {
  const e = this,
    { params: i, slidesEl: s } = e;
  i.loop && e.loopDestroy();
  const r = (n) => {
    if (typeof n == 'string') {
      const a = document.createElement('div');
      (a.innerHTML = n), s.append(a.children[0]), (a.innerHTML = '');
    } else s.append(n);
  };
  if (typeof t == 'object' && 'length' in t)
    for (let n = 0; n < t.length; n += 1) t[n] && r(t[n]);
  else r(t);
  e.recalcSlides(),
    i.loop && e.loopCreate(),
    (!i.observer || e.isElement) && e.update();
}
function fl(t) {
  const e = this,
    { params: i, activeIndex: s, slidesEl: r } = e;
  i.loop && e.loopDestroy();
  let n = s + 1;
  const a = (l) => {
    if (typeof l == 'string') {
      const o = document.createElement('div');
      (o.innerHTML = l), r.prepend(o.children[0]), (o.innerHTML = '');
    } else r.prepend(l);
  };
  if (typeof t == 'object' && 'length' in t) {
    for (let l = 0; l < t.length; l += 1) t[l] && a(t[l]);
    n = s + t.length;
  } else a(t);
  e.recalcSlides(),
    i.loop && e.loopCreate(),
    (!i.observer || e.isElement) && e.update(),
    e.slideTo(n, 0, !1);
}
function pl(t, e) {
  const i = this,
    { params: s, activeIndex: r, slidesEl: n } = i;
  let a = r;
  s.loop && ((a -= i.loopedSlides), i.loopDestroy(), i.recalcSlides());
  const l = i.slides.length;
  if (t <= 0) {
    i.prependSlide(e);
    return;
  }
  if (t >= l) {
    i.appendSlide(e);
    return;
  }
  let o = a > t ? a + 1 : a;
  const f = [];
  for (let c = l - 1; c >= t; c -= 1) {
    const d = i.slides[c];
    d.remove(), f.unshift(d);
  }
  if (typeof e == 'object' && 'length' in e) {
    for (let c = 0; c < e.length; c += 1) e[c] && n.append(e[c]);
    o = a > t ? a + e.length : a;
  } else n.append(e);
  for (let c = 0; c < f.length; c += 1) n.append(f[c]);
  i.recalcSlides(),
    s.loop && i.loopCreate(),
    (!s.observer || i.isElement) && i.update(),
    s.loop ? i.slideTo(o + i.loopedSlides, 0, !1) : i.slideTo(o, 0, !1);
}
function ml(t) {
  const e = this,
    { params: i, activeIndex: s } = e;
  let r = s;
  i.loop && ((r -= e.loopedSlides), e.loopDestroy());
  let n = r,
    a;
  if (typeof t == 'object' && 'length' in t) {
    for (let l = 0; l < t.length; l += 1)
      (a = t[l]), e.slides[a] && e.slides[a].remove(), a < n && (n -= 1);
    n = Math.max(n, 0);
  } else
    (a = t),
      e.slides[a] && e.slides[a].remove(),
      a < n && (n -= 1),
      (n = Math.max(n, 0));
  e.recalcSlides(),
    i.loop && e.loopCreate(),
    (!i.observer || e.isElement) && e.update(),
    i.loop ? e.slideTo(n + e.loopedSlides, 0, !1) : e.slideTo(n, 0, !1);
}
function hl() {
  const t = this,
    e = [];
  for (let i = 0; i < t.slides.length; i += 1) e.push(i);
  t.removeSlide(e);
}
function gl(t) {
  let { swiper: e } = t;
  Object.assign(e, {
    appendSlide: ul.bind(e),
    prependSlide: fl.bind(e),
    addSlide: pl.bind(e),
    removeSlide: ml.bind(e),
    removeAllSlides: hl.bind(e),
  });
}
function De(t) {
  const {
    effect: e,
    swiper: i,
    on: s,
    setTranslate: r,
    setTransition: n,
    overwriteParams: a,
    perspective: l,
    recreateShadows: o,
    getEffectParams: f,
  } = t;
  s('beforeInit', () => {
    if (i.params.effect !== e) return;
    i.classNames.push(`${i.params.containerModifierClass}${e}`),
      l && l() && i.classNames.push(`${i.params.containerModifierClass}3d`);
    const d = a ? a() : {};
    Object.assign(i.params, d), Object.assign(i.originalParams, d);
  }),
    s('setTranslate', () => {
      i.params.effect === e && r();
    }),
    s('setTransition', (d, u) => {
      i.params.effect === e && n(u);
    }),
    s('transitionEnd', () => {
      if (i.params.effect === e && o) {
        if (!f || !f().slideShadows) return;
        i.slides.forEach((d) => {
          d.querySelectorAll(
            '.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left',
          ).forEach((u) => u.remove());
        }),
          o();
      }
    });
  let c;
  s('virtualUpdate', () => {
    i.params.effect === e &&
      (i.slides.length || (c = !0),
      requestAnimationFrame(() => {
        c && i.slides && i.slides.length && (r(), (c = !1));
      }));
  });
}
function Qe(t, e) {
  const i = _e(e);
  return (
    i !== e &&
      ((i.style.backfaceVisibility = 'hidden'),
      (i.style['-webkit-backface-visibility'] = 'hidden')),
    i
  );
}
function Mt(t) {
  let { swiper: e, duration: i, transformElements: s, allSlides: r } = t;
  const { activeIndex: n } = e,
    a = (l) =>
      l.parentElement
        ? l.parentElement
        : e.slides.filter(
            (f) => f.shadowRoot && f.shadowRoot === l.parentNode,
          )[0];
  if (e.params.virtualTranslate && i !== 0) {
    let l = !1,
      o;
    r
      ? (o = s)
      : (o = s.filter((f) => {
          const c = f.classList.contains('swiper-slide-transform') ? a(f) : f;
          return e.getSlideIndex(c) === n;
        })),
      o.forEach((f) => {
        je(f, () => {
          if (l || !e || e.destroyed) return;
          (l = !0), (e.animating = !1);
          const c = new window.CustomEvent('transitionend', {
            bubbles: !0,
            cancelable: !0,
          });
          e.wrapperEl.dispatchEvent(c);
        });
      });
  }
}
function vl(t) {
  let { swiper: e, extendParams: i, on: s } = t;
  i({ fadeEffect: { crossFade: !1 } }),
    De({
      effect: 'fade',
      swiper: e,
      on: s,
      setTranslate: () => {
        const { slides: a } = e,
          l = e.params.fadeEffect;
        for (let o = 0; o < a.length; o += 1) {
          const f = e.slides[o];
          let d = -f.swiperSlideOffset;
          e.params.virtualTranslate || (d -= e.translate);
          let u = 0;
          e.isHorizontal() || ((u = d), (d = 0));
          const m = e.params.fadeEffect.crossFade
              ? Math.max(1 - Math.abs(f.progress), 0)
              : 1 + Math.min(Math.max(f.progress, -1), 0),
            v = Qe(l, f);
          (v.style.opacity = m),
            (v.style.transform = `translate3d(${d}px, ${u}px, 0px)`);
        }
      },
      setTransition: (a) => {
        const l = e.slides.map((o) => _e(o));
        l.forEach((o) => {
          o.style.transitionDuration = `${a}ms`;
        }),
          Mt({ swiper: e, duration: a, transformElements: l, allSlides: !0 });
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
function wl(t) {
  let { swiper: e, extendParams: i, on: s } = t;
  i({
    cubeEffect: {
      slideShadows: !0,
      shadow: !0,
      shadowOffset: 20,
      shadowScale: 0.94,
    },
  });
  const r = (o, f, c) => {
    let d = c
        ? o.querySelector('.swiper-slide-shadow-left')
        : o.querySelector('.swiper-slide-shadow-top'),
      u = c
        ? o.querySelector('.swiper-slide-shadow-right')
        : o.querySelector('.swiper-slide-shadow-bottom');
    d ||
      ((d = ee(
        'div',
        `swiper-slide-shadow-cube swiper-slide-shadow-${
          c ? 'left' : 'top'
        }`.split(' '),
      )),
      o.append(d)),
      u ||
        ((u = ee(
          'div',
          `swiper-slide-shadow-cube swiper-slide-shadow-${
            c ? 'right' : 'bottom'
          }`.split(' '),
        )),
        o.append(u)),
      d && (d.style.opacity = Math.max(-f, 0)),
      u && (u.style.opacity = Math.max(f, 0));
  };
  De({
    effect: 'cube',
    swiper: e,
    on: s,
    setTranslate: () => {
      const {
          el: o,
          wrapperEl: f,
          slides: c,
          width: d,
          height: u,
          rtlTranslate: m,
          size: v,
          browser: w,
        } = e,
        g = Tt(e),
        y = e.params.cubeEffect,
        h = e.isHorizontal(),
        p = e.virtual && e.params.virtual.enabled;
      let b = 0,
        x;
      y.shadow &&
        (h
          ? ((x = e.wrapperEl.querySelector('.swiper-cube-shadow')),
            x || ((x = ee('div', 'swiper-cube-shadow')), e.wrapperEl.append(x)),
            (x.style.height = `${d}px`))
          : ((x = o.querySelector('.swiper-cube-shadow')),
            x || ((x = ee('div', 'swiper-cube-shadow')), o.append(x))));
      for (let $ = 0; $ < c.length; $ += 1) {
        const I = c[$];
        let T = $;
        p && (T = parseInt(I.getAttribute('data-swiper-slide-index'), 10));
        let _ = T * 90,
          L = Math.floor(_ / 360);
        m && ((_ = -_), (L = Math.floor(-_ / 360)));
        const C = Math.max(Math.min(I.progress, 1), -1);
        let S = 0,
          E = 0,
          O = 0;
        T % 4 === 0
          ? ((S = -L * 4 * v), (O = 0))
          : (T - 1) % 4 === 0
          ? ((S = 0), (O = -L * 4 * v))
          : (T - 2) % 4 === 0
          ? ((S = v + L * 4 * v), (O = v))
          : (T - 3) % 4 === 0 && ((S = -v), (O = 3 * v + v * 4 * L)),
          m && (S = -S),
          h || ((E = S), (S = 0));
        const R = `rotateX(${g(h ? 0 : -_)}deg) rotateY(${g(
          h ? _ : 0,
        )}deg) translate3d(${S}px, ${E}px, ${O}px)`;
        C <= 1 &&
          C > -1 &&
          ((b = T * 90 + C * 90), m && (b = -T * 90 - C * 90)),
          (I.style.transform = R),
          y.slideShadows && r(I, C, h);
      }
      if (
        ((f.style.transformOrigin = `50% 50% -${v / 2}px`),
        (f.style['-webkit-transform-origin'] = `50% 50% -${v / 2}px`),
        y.shadow)
      )
        if (h)
          x.style.transform = `translate3d(0px, ${d / 2 + y.shadowOffset}px, ${
            -d / 2
          }px) rotateX(89.99deg) rotateZ(0deg) scale(${y.shadowScale})`;
        else {
          const $ = Math.abs(b) - Math.floor(Math.abs(b) / 90) * 90,
            I =
              1.5 -
              (Math.sin(($ * 2 * Math.PI) / 360) / 2 +
                Math.cos(($ * 2 * Math.PI) / 360) / 2),
            T = y.shadowScale,
            _ = y.shadowScale / I,
            L = y.shadowOffset;
          x.style.transform = `scale3d(${T}, 1, ${_}) translate3d(0px, ${
            u / 2 + L
          }px, ${-u / 2 / _}px) rotateX(-89.99deg)`;
        }
      const A =
        (w.isSafari || w.isWebView) && w.needPerspectiveFix ? -v / 2 : 0;
      (f.style.transform = `translate3d(0px,0,${A}px) rotateX(${g(
        e.isHorizontal() ? 0 : b,
      )}deg) rotateY(${g(e.isHorizontal() ? -b : 0)}deg)`),
        f.style.setProperty('--swiper-cube-translate-z', `${A}px`);
    },
    setTransition: (o) => {
      const { el: f, slides: c } = e;
      if (
        (c.forEach((d) => {
          (d.style.transitionDuration = `${o}ms`),
            d
              .querySelectorAll(
                '.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left',
              )
              .forEach((u) => {
                u.style.transitionDuration = `${o}ms`;
              });
        }),
        e.params.cubeEffect.shadow && !e.isHorizontal())
      ) {
        const d = f.querySelector('.swiper-cube-shadow');
        d && (d.style.transitionDuration = `${o}ms`);
      }
    },
    recreateShadows: () => {
      const o = e.isHorizontal();
      e.slides.forEach((f) => {
        const c = Math.max(Math.min(f.progress, 1), -1);
        r(f, c, o);
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
function Le(t, e, i) {
  const s = `swiper-slide-shadow${i ? `-${i}` : ''}${
      t ? ` swiper-slide-shadow-${t}` : ''
    }`,
    r = _e(e);
  let n = r.querySelector(`.${s.split(' ').join('.')}`);
  return n || ((n = ee('div', s.split(' '))), r.append(n)), n;
}
function yl(t) {
  let { swiper: e, extendParams: i, on: s } = t;
  i({ flipEffect: { slideShadows: !0, limitRotation: !0 } });
  const r = (o, f) => {
    let c = e.isHorizontal()
        ? o.querySelector('.swiper-slide-shadow-left')
        : o.querySelector('.swiper-slide-shadow-top'),
      d = e.isHorizontal()
        ? o.querySelector('.swiper-slide-shadow-right')
        : o.querySelector('.swiper-slide-shadow-bottom');
    c || (c = Le('flip', o, e.isHorizontal() ? 'left' : 'top')),
      d || (d = Le('flip', o, e.isHorizontal() ? 'right' : 'bottom')),
      c && (c.style.opacity = Math.max(-f, 0)),
      d && (d.style.opacity = Math.max(f, 0));
  };
  De({
    effect: 'flip',
    swiper: e,
    on: s,
    setTranslate: () => {
      const { slides: o, rtlTranslate: f } = e,
        c = e.params.flipEffect,
        d = Tt(e);
      for (let u = 0; u < o.length; u += 1) {
        const m = o[u];
        let v = m.progress;
        e.params.flipEffect.limitRotation &&
          (v = Math.max(Math.min(m.progress, 1), -1));
        const w = m.swiperSlideOffset;
        let y = -180 * v,
          h = 0,
          p = e.params.cssMode ? -w - e.translate : -w,
          b = 0;
        e.isHorizontal()
          ? f && (y = -y)
          : ((b = p), (p = 0), (h = -y), (y = 0)),
          (m.style.zIndex = -Math.abs(Math.round(v)) + o.length),
          c.slideShadows && r(m, v);
        const x = `translate3d(${p}px, ${b}px, 0px) rotateX(${d(
            h,
          )}deg) rotateY(${d(y)}deg)`,
          A = Qe(c, m);
        A.style.transform = x;
      }
    },
    setTransition: (o) => {
      const f = e.slides.map((c) => _e(c));
      f.forEach((c) => {
        (c.style.transitionDuration = `${o}ms`),
          c
            .querySelectorAll(
              '.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left',
            )
            .forEach((d) => {
              d.style.transitionDuration = `${o}ms`;
            });
      }),
        Mt({ swiper: e, duration: o, transformElements: f });
    },
    recreateShadows: () => {
      e.params.flipEffect,
        e.slides.forEach((o) => {
          let f = o.progress;
          e.params.flipEffect.limitRotation &&
            (f = Math.max(Math.min(o.progress, 1), -1)),
            r(o, f);
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
function bl(t) {
  let { swiper: e, extendParams: i, on: s } = t;
  i({
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      scale: 1,
      modifier: 1,
      slideShadows: !0,
    },
  }),
    De({
      effect: 'coverflow',
      swiper: e,
      on: s,
      setTranslate: () => {
        const { width: a, height: l, slides: o, slidesSizesGrid: f } = e,
          c = e.params.coverflowEffect,
          d = e.isHorizontal(),
          u = e.translate,
          m = d ? -u + a / 2 : -u + l / 2,
          v = d ? c.rotate : -c.rotate,
          w = c.depth,
          g = Tt(e);
        for (let y = 0, h = o.length; y < h; y += 1) {
          const p = o[y],
            b = f[y],
            x = p.swiperSlideOffset,
            A = (m - x - b / 2) / b,
            $ =
              typeof c.modifier == 'function' ? c.modifier(A) : A * c.modifier;
          let I = d ? v * $ : 0,
            T = d ? 0 : v * $,
            _ = -w * Math.abs($),
            L = c.stretch;
          typeof L == 'string' &&
            L.indexOf('%') !== -1 &&
            (L = (parseFloat(c.stretch) / 100) * b);
          let C = d ? 0 : L * $,
            S = d ? L * $ : 0,
            E = 1 - (1 - c.scale) * Math.abs($);
          Math.abs(S) < 0.001 && (S = 0),
            Math.abs(C) < 0.001 && (C = 0),
            Math.abs(_) < 0.001 && (_ = 0),
            Math.abs(I) < 0.001 && (I = 0),
            Math.abs(T) < 0.001 && (T = 0),
            Math.abs(E) < 0.001 && (E = 0);
          const O = `translate3d(${S}px,${C}px,${_}px)  rotateX(${g(
              T,
            )}deg) rotateY(${g(I)}deg) scale(${E})`,
            R = Qe(c, p);
          if (
            ((R.style.transform = O),
            (p.style.zIndex = -Math.abs(Math.round($)) + 1),
            c.slideShadows)
          ) {
            let M = d
                ? p.querySelector('.swiper-slide-shadow-left')
                : p.querySelector('.swiper-slide-shadow-top'),
              P = d
                ? p.querySelector('.swiper-slide-shadow-right')
                : p.querySelector('.swiper-slide-shadow-bottom');
            M || (M = Le('coverflow', p, d ? 'left' : 'top')),
              P || (P = Le('coverflow', p, d ? 'right' : 'bottom')),
              M && (M.style.opacity = $ > 0 ? $ : 0),
              P && (P.style.opacity = -$ > 0 ? -$ : 0);
          }
        }
      },
      setTransition: (a) => {
        e.slides
          .map((o) => _e(o))
          .forEach((o) => {
            (o.style.transitionDuration = `${a}ms`),
              o
                .querySelectorAll(
                  '.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left',
                )
                .forEach((f) => {
                  f.style.transitionDuration = `${a}ms`;
                });
          });
      },
      perspective: () => !0,
      overwriteParams: () => ({ watchSlidesProgress: !0 }),
    });
}
function xl(t) {
  let { swiper: e, extendParams: i, on: s } = t;
  i({
    creativeEffect: {
      limitProgress: 1,
      shadowPerProgress: !1,
      progressMultiplier: 1,
      perspective: !0,
      prev: { translate: [0, 0, 0], rotate: [0, 0, 0], opacity: 1, scale: 1 },
      next: { translate: [0, 0, 0], rotate: [0, 0, 0], opacity: 1, scale: 1 },
    },
  });
  const r = (l) => (typeof l == 'string' ? l : `${l}px`);
  De({
    effect: 'creative',
    swiper: e,
    on: s,
    setTranslate: () => {
      const { slides: l, wrapperEl: o, slidesSizesGrid: f } = e,
        c = e.params.creativeEffect,
        { progressMultiplier: d } = c,
        u = e.params.centeredSlides,
        m = Tt(e);
      if (u) {
        const v = f[0] / 2 - e.params.slidesOffsetBefore || 0;
        o.style.transform = `translateX(calc(50% - ${v}px))`;
      }
      for (let v = 0; v < l.length; v += 1) {
        const w = l[v],
          g = w.progress,
          y = Math.min(Math.max(w.progress, -c.limitProgress), c.limitProgress);
        let h = y;
        u ||
          (h = Math.min(
            Math.max(w.originalProgress, -c.limitProgress),
            c.limitProgress,
          ));
        const p = w.swiperSlideOffset,
          b = [e.params.cssMode ? -p - e.translate : -p, 0, 0],
          x = [0, 0, 0];
        let A = !1;
        e.isHorizontal() || ((b[1] = b[0]), (b[0] = 0));
        let $ = {
          translate: [0, 0, 0],
          rotate: [0, 0, 0],
          scale: 1,
          opacity: 1,
        };
        y < 0 ? (($ = c.next), (A = !0)) : y > 0 && (($ = c.prev), (A = !0)),
          b.forEach((E, O) => {
            b[O] = `calc(${E}px + (${r($.translate[O])} * ${Math.abs(y * d)}))`;
          }),
          x.forEach((E, O) => {
            let R = $.rotate[O] * Math.abs(y * d);
            x[O] = R;
          }),
          (w.style.zIndex = -Math.abs(Math.round(g)) + l.length);
        const I = b.join(', '),
          T = `rotateX(${m(x[0])}deg) rotateY(${m(x[1])}deg) rotateZ(${m(
            x[2],
          )}deg)`,
          _ =
            h < 0
              ? `scale(${1 + (1 - $.scale) * h * d})`
              : `scale(${1 - (1 - $.scale) * h * d})`,
          L = h < 0 ? 1 + (1 - $.opacity) * h * d : 1 - (1 - $.opacity) * h * d,
          C = `translate3d(${I}) ${T} ${_}`;
        if ((A && $.shadow) || !A) {
          let E = w.querySelector('.swiper-slide-shadow');
          if ((!E && $.shadow && (E = Le('creative', w)), E)) {
            const O = c.shadowPerProgress ? y * (1 / c.limitProgress) : y;
            E.style.opacity = Math.min(Math.max(Math.abs(O), 0), 1);
          }
        }
        const S = Qe(c, w);
        (S.style.transform = C),
          (S.style.opacity = L),
          $.origin && (S.style.transformOrigin = $.origin);
      }
    },
    setTransition: (l) => {
      const o = e.slides.map((f) => _e(f));
      o.forEach((f) => {
        (f.style.transitionDuration = `${l}ms`),
          f.querySelectorAll('.swiper-slide-shadow').forEach((c) => {
            c.style.transitionDuration = `${l}ms`;
          });
      }),
        Mt({ swiper: e, duration: l, transformElements: o, allSlides: !0 });
    },
    perspective: () => e.params.creativeEffect.perspective,
    overwriteParams: () => ({
      watchSlidesProgress: !0,
      virtualTranslate: !e.params.cssMode,
    }),
  });
}
function Sl(t) {
  let { swiper: e, extendParams: i, on: s } = t;
  i({
    cardsEffect: {
      slideShadows: !0,
      rotate: !0,
      perSlideRotate: 2,
      perSlideOffset: 8,
    },
  }),
    De({
      effect: 'cards',
      swiper: e,
      on: s,
      setTranslate: () => {
        const { slides: a, activeIndex: l, rtlTranslate: o } = e,
          f = e.params.cardsEffect,
          { startTranslate: c, isTouched: d } = e.touchEventsData,
          u = o ? -e.translate : e.translate;
        for (let m = 0; m < a.length; m += 1) {
          const v = a[m],
            w = v.progress,
            g = Math.min(Math.max(w, -4), 4);
          let y = v.swiperSlideOffset;
          e.params.centeredSlides &&
            !e.params.cssMode &&
            (e.wrapperEl.style.transform = `translateX(${e.minTranslate()}px)`),
            e.params.centeredSlides &&
              e.params.cssMode &&
              (y -= a[0].swiperSlideOffset);
          let h = e.params.cssMode ? -y - e.translate : -y,
            p = 0;
          const b = -100 * Math.abs(g);
          let x = 1,
            A = -f.perSlideRotate * g,
            $ = f.perSlideOffset - Math.abs(g) * 0.75;
          const I =
              e.virtual && e.params.virtual.enabled ? e.virtual.from + m : m,
            T =
              (I === l || I === l - 1) &&
              g > 0 &&
              g < 1 &&
              (d || e.params.cssMode) &&
              u < c,
            _ =
              (I === l || I === l + 1) &&
              g < 0 &&
              g > -1 &&
              (d || e.params.cssMode) &&
              u > c;
          if (T || _) {
            const E = (1 - Math.abs((Math.abs(g) - 0.5) / 0.5)) ** 0.5;
            (A += -28 * g * E),
              (x += -0.5 * E),
              ($ += 96 * E),
              (p = `${-25 * E * Math.abs(g)}%`);
          }
          if (
            (g < 0
              ? (h = `calc(${h}px ${o ? '-' : '+'} (${$ * Math.abs(g)}%))`)
              : g > 0
              ? (h = `calc(${h}px ${o ? '-' : '+'} (-${$ * Math.abs(g)}%))`)
              : (h = `${h}px`),
            !e.isHorizontal())
          ) {
            const E = p;
            (p = h), (h = E);
          }
          const L = g < 0 ? `${1 + (1 - x) * g}` : `${1 - (1 - x) * g}`,
            C = `
        translate3d(${h}, ${p}, ${b}px)
        rotateZ(${f.rotate ? (o ? -A : A) : 0}deg)
        scale(${L})
      `;
          if (f.slideShadows) {
            let E = v.querySelector('.swiper-slide-shadow');
            E || (E = Le('cards', v)),
              E &&
                (E.style.opacity = Math.min(
                  Math.max((Math.abs(g) - 0.5) / 0.5, 0),
                  1,
                ));
          }
          v.style.zIndex = -Math.abs(Math.round(w)) + a.length;
          const S = Qe(f, v);
          S.style.transform = C;
        }
      },
      setTransition: (a) => {
        const l = e.slides.map((o) => _e(o));
        l.forEach((o) => {
          (o.style.transitionDuration = `${a}ms`),
            o.querySelectorAll('.swiper-slide-shadow').forEach((f) => {
              f.style.transitionDuration = `${a}ms`;
            });
        }),
          Mt({ swiper: e, duration: a, transformElements: l });
      },
      perspective: () => !0,
      overwriteParams: () => ({
        watchSlidesProgress: !0,
        virtualTranslate: !e.params.cssMode,
      }),
    });
}
const El = [
  Zo,
  Qo,
  el,
  Ii,
  Oi,
  $i,
  tl,
  il,
  sl,
  rl,
  nl,
  al,
  ol,
  ll,
  dl,
  cl,
  gl,
  vl,
  wl,
  yl,
  bl,
  xl,
  Sl,
];
Z.use(El);
class Tl extends window.HTMLElement {
  constructor() {
    super(),
      (this.slider = new Z('.swiper', {
        modules: [Ii, Oi, $i],
        slidesPerView: 4,
        autoplay: !1,
        spaceBetween: 10,
        pagination: { el: '.swiper-pagination' },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        scrollbar: { el: '.swiper-scrollbar', hide: !0 },
      }));
  }
}
class Ml extends window.HTMLElement {
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
    (this.slider = new Z('.menu.swiper', {
      modules: [Ii, Oi, $i],
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
window.Alpine = gr;
gr.start();
window.customElements.define('swiper-slider', Tl);
window.customElements.define('menu-swiper', Ml);
