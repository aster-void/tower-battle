import {
	y as E,
	t as f,
	z as h,
	I as i,
	f as o,
	W as p,
	h as s,
	q as u,
	V as v,
} from "./2beTIzVn.js";
function T(n) {
	const t = document.createElement("template");
	return (t.innerHTML = n), t.content;
}
function r(n, t) {
	const e = u;
	e.nodes_start === null && ((e.nodes_start = n), (e.nodes_end = t));
}
function w(n, t) {
	const e = (t & v) !== 0;
	const _ = (t & p) !== 0;
	let a;
	const c = !n.startsWith("<!>");
	return () => {
		if (s) return r(o, null), o;
		a === void 0 && ((a = T(c ? n : `<!>${n}`)), e || (a = f(a)));
		const d = _ ? document.importNode(a, !0) : a.cloneNode(!0);
		if (e) {
			const m = f(d);
			const l = d.lastChild;
			r(m, l);
		} else r(d, d);
		return d;
	};
}
function M(n = "") {
	if (!s) {
		const t = i(`${n}`);
		return r(t, t), t;
	}
	let e = o;
	return e.nodeType !== 3 && (e.before((e = i())), E(e)), r(e, e), e;
}
function N() {
	if (s) return r(o, null), o;
	const n = document.createDocumentFragment();
	const t = document.createComment("");
	const e = i();
	return n.append(t, e), r(t, e), n;
}
function x(n, t) {
	if (s) {
		(u.nodes_end = o), h();
		return;
	}
	n?.before(t);
}
const y = "5";
typeof window < "u" &&
	(window.__svelte || (window.__svelte = { v: new Set() })).v.add(y);
export { x as a, r as b, N as c, M as d, w as t };
