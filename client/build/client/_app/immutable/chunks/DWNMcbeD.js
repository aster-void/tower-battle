import { l as c, u as o, i as t, j as u } from "./2beTIzVn.js";
function l(n) {
	throw new Error("https://svelte.dev/e/lifecycle_outside_component");
}
function r(n) {
	t === null && l(),
		c && t.l !== null
			? a(t).m.push(n)
			: o(() => {
					const e = u(n);
					if (typeof e === "function") return e;
				});
}
function a(n) {
	const e = n.l;
	return e.u ?? (e.u = { a: [], b: [], m: [] });
}
export { r as o };
