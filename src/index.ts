/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import YAML from 'yaml'

import default_rule from './clash_script'

export default {
	async fetch(request, env, ctx): Promise<Response> {

		const url = new URL(request.url);

		let req = url.pathname

		if (!req.startsWith("/convert")) {
			return new Response(null, {
				status: 204
			})
		}

		const remote = url.searchParams.get("url")
		const rule = url.searchParams.get("rule")

		if (!remote) {
			return new Response(null, {
				status: 204
			})
		}

		const remote_url = decodeURIComponent(remote)

		let clash_conf = await (await fetch(remote_url)).text()

		let clash_json = YAML.parse(clash_conf)

		delete clash_json["proxies"]

		clash_json["proxy-providers"] = {
			"myprovider": {
				type: "http",
				url: remote_url,
				interval: 86400,
				proxy: "DIRECT",
			}
		}

		let clash_conf_new
		switch (rule) {
			case "default":
				clash_conf_new = default_rule(clash_json, "config")
		}

		let res_yaml = YAML.stringify(clash_conf_new)

		return new Response(res_yaml);
	},
} satisfies ExportedHandler<Env>;
