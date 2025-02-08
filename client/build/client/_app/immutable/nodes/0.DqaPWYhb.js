import {
	E as c,
	c as d,
	h,
	b as i,
	f as l,
	d as m,
	a as p,
	g as u,
} from "../chunks/2beTIzVn.js";
import { a as f, c as s } from "../chunks/BAiI8h4J.js";
function v(t, e, ...a) {
	let n = t;
	let o = d;
	let r;
	i(() => {
		o !== (o = e()) && (r && (m(r), (r = null)), (r = p(() => o(n, ...a))));
	}, c),
		h && (n = l);
}
function E(t, e) {
	const a = s();
	const n = u(a);
	v(n, () => e.children), f(t, a);
}
export { E as component };
