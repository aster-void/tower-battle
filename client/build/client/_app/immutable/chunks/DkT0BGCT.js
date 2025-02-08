import {
	A as $,
	m as A,
	z as B,
	o as C,
	y as D,
	h as E,
	D as F,
	F as G,
	q as I,
	G as J,
	I as K,
	p as M,
	t as P,
	J as Q,
	s as R,
	w as T,
	i as U,
	k as V,
	a as W,
	K as X,
	H as Y,
	r as b,
	x as g,
	B as j,
	f as p,
	v as q,
	C as z,
} from "./2beTIzVn.js";
import { b as Z } from "./BAiI8h4J.js";
const x = ["touchstart", "touchmove"];
function rr(r) {
	return x.includes(r);
}
const er = new Set();
const O = new Set();
function m(r) {
	let N;
	const s = this.ownerDocument;
	const c = r.type;
	const o = ((N = r.composedPath) == null ? void 0 : N.call(r)) || [];
	let t = o[0] || r.target;
	let d = 0;
	const _ = r.__root;
	if (_) {
		const u = o.indexOf(_);
		if (u !== -1 && (this === document || this === window)) {
			r.__root = this;
			return;
		}
		const h = o.indexOf(this);
		if (h === -1) return;
		u <= h && (d = u);
	}
	if (((t = o[d] || r.target), t !== this)) {
		V(r, "currentTarget", {
			configurable: !0,
			get() {
				return t || s;
			},
		});
		const w = M;
		const i = I;
		R(null), A(null);
		try {
			for (let a, n = []; t !== null; ) {
				const f = t.assignedSlot || t.parentNode || t.host || null;
				try {
					const l = t[`__${c}`];
					if (l !== void 0 && !t.disabled)
						if (C(l)) {
							const [H, ...L] = l;
							H.apply(t, [r, ...L]);
						} else l.call(t, r);
				} catch (y) {
					a ? n.push(y) : (a = y);
				}
				if (r.cancelBubble || f === this || f === null) break;
				t = f;
			}
			if (a) {
				for (const y of n)
					queueMicrotask(() => {
						throw y;
					});
				throw a;
			}
		} finally {
			(r.__root = this), (r.currentTarget = undefined), R(w), A(i);
		}
	}
}
function nr(r, e) {
	const s = e == null ? "" : typeof e === "object" ? `${e}` : e;
	s !== (r.__t ?? (r.__t = r.nodeValue)) &&
		((r.__t = s), (r.nodeValue = `${s}`));
}
function tr(r, e) {
	return k(r, e);
}
function ir(r, e) {
	b(), (e.intro = e.intro ?? !1);
	const s = e.target;
	const c = E;
	const o = p;
	try {
		for (let t = P(s); t && (t.nodeType !== 8 || t.data !== Y); ) t = q(t);
		if (!t) throw T;
		g(!0), D(t), B();
		const d = k(r, { ...e, anchor: t });
		if (p === null || p.nodeType !== 8 || p.data !== $) throw (j(), T);
		return g(!1), d;
	} catch (d) {
		if (d === T) return e.recover === !1 && z(), b(), F(s), g(!1), tr(r, e);
		throw d;
	} finally {
		g(c), D(o);
	}
}
const v = new Map();
function k(
	r,
	{ target: e, anchor: s, props: c = {}, events: o, context: t, intro: d = !0 },
) {
	b();
	const _ = new Set();
	const u = (i) => {
		for (let a = 0; a < i.length; a++) {
			const n = i[a];
			if (!_.has(n)) {
				_.add(n);
				const f = rr(n);
				e.addEventListener(n, m, { passive: f });
				const l = v.get(n);
				l === void 0
					? (document.addEventListener(n, m, { passive: f }), v.set(n, 1))
					: v.set(n, l + 1);
			}
		}
	};
	u(G(er)), O.add(u);
	let h = void 0;
	const w = J(() => {
		const i = s ?? e.appendChild(K());
		return (
			W(() => {
				if (t) {
					Q({});
					const a = U;
					a.c = t;
				}
				o && (c.$$events = o),
					E && Z(i, null),
					(h = r(i, c) || {}),
					E && (I.nodes_end = p),
					t && X();
			}),
			() => {
				let f;
				for (const a of _) {
					e.removeEventListener(a, m);
					let n = v.get(a);
					--n === 0
						? (document.removeEventListener(a, m), v.delete(a))
						: v.set(a, n);
				}
				O.delete(u),
					i !== s && ((f = i.parentNode) == null || f.removeChild(i));
			}
		);
	});
	return S.set(h, w), h;
}
const S = new WeakMap();
function or(r, e) {
	const s = S.get(r);
	return s ? (S.delete(r), s(e)) : Promise.resolve();
}
export { ir as h, tr as m, nr as s, or as u };
