const manifest = (() => {
	function __memo(fn) {
		let value;
		return () => (value ??= value = fn());
	}

	return {
		appDir: "_app",
		appPath: "_app",
		assets: new Set(["favicon.png"]),
		mimeTypes: { ".png": "image/png" },
		_: {
			client: {
				start: "_app/immutable/entry/start.BUxSt4p7.js",
				app: "_app/immutable/entry/app.BPZ2n0zY.js",
				imports: [
					"_app/immutable/entry/start.BUxSt4p7.js",
					"_app/immutable/chunks/B-u3oKOJ.js",
					"_app/immutable/chunks/2beTIzVn.js",
					"_app/immutable/chunks/DWNMcbeD.js",
					"_app/immutable/entry/app.BPZ2n0zY.js",
					"_app/immutable/chunks/2beTIzVn.js",
					"_app/immutable/chunks/DkT0BGCT.js",
					"_app/immutable/chunks/BAiI8h4J.js",
					"_app/immutable/chunks/DWNMcbeD.js",
				],
				stylesheets: [],
				fonts: [],
				uses_env_dynamic_public: false,
			},
			nodes: [
				__memo(() => import("./chunks/0-DXXRpm2_.js")),
				__memo(() => import("./chunks/1-DoAeTGsi.js")),
				__memo(() => import("./chunks/2-ffxXBjsK.js")),
			],
			routes: [
				{
					id: "/",
					pattern: /^\/$/,
					params: [],
					page: { layouts: [0], errors: [1], leaf: 2 },
					endpoint: null,
				},
			],
			prerendered_routes: new Set([]),
			matchers: async () => {
				return {};
			},
			server_assets: {},
		},
	};
})();

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
