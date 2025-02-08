import { t as b, a as k } from "../chunks/BAiI8h4J.js";
import "../chunks/dkvEX0sp.js";
import {
	L as $,
	P as E,
	Q as J,
	J as K,
	g as L,
	R as M,
	K as N,
	U as O,
	u as i,
	O as j,
	M as l,
	T as m,
	S as u,
	N as v,
	i as x,
	j as y,
} from "../chunks/2beTIzVn.js";
import { s as P, p as _ } from "../chunks/B-u3oKOJ.js";
import { s as g } from "../chunks/DkT0BGCT.js";
function Q(a = !1) {
	const e = x;
	const t = e.l.u;
	if (!t) return;
	let r = () => E(e.s);
	if (a) {
		let o = 0;
		const s = {};
		const p = J(() => {
			let n = !1;
			const c = e.s;
			for (const f in c) c[f] !== s[f] && ((s[f] = c[f]), (n = !0));
			return n && o++, o;
		});
		r = () => v(p);
	}
	t.b.length &&
		$(() => {
			d(e, r), l(t.b);
		}),
		i(() => {
			const o = y(() => t.m.map(j));
			return () => {
				for (const s of o) typeof s === "function" && s();
			};
		}),
		t.a.length &&
			i(() => {
				d(e, r), l(t.a);
			});
}
function d(a, e) {
	if (a.l.s) for (const t of a.l.s) v(t);
	e();
}
const R = {
	get error() {
		return _.error;
	},
	get status() {
		return _.status;
	},
};
P.updated.check;
const h = R;
const S = b("<h1> </h1> <p> </p>", 1);
function A(a, e) {
	K(e, !1), Q();
	const t = S();
	const r = L(t);
	const o = u(r, !0);
	m(r);
	const s = O(r, 2);
	const p = u(s, !0);
	m(s),
		M(() => {
			let n;
			g(o, h.status), g(p, (n = h.error) == null ? void 0 : n.message);
		}),
		k(a, t),
		N();
}
export { A as component };
