import test from "ava";
import * as tr from "./termrover";

test("length", async (t) => {
	const len = await tr.length();
	t.truthy(len);
	t.assert(typeof len === "number");
});

test("latest", async (t) => {
	const resp = await tr.latest().catch(() => null);
	t.truthy(resp);
	t.assert(typeof resp?.images?.ascii === "string");
	t.truthy(resp?.images?.ascii?.length);
	t.assert(typeof resp?.images?.base64 === "string");
	t.truthy(resp?.images?.base64?.length);
});

test("atIndex", async (t) => {
	const resp = await tr.atIndex(13).catch(() => null);
	t.truthy(resp);
	t.assert(typeof resp?.images?.ascii === "string");
	t.truthy(resp?.images?.ascii?.length);
	t.assert(typeof resp?.images?.base64 === "string");
	t.truthy(resp?.images?.base64?.length);
});

test("iterate", async (t) => {
	let index = 0;
	for await (let resp of tr.iterate()) {
		index++;
		if (index > 13) {
			break;
		}
		t.truthy(resp);
		t.assert(typeof resp?.images?.ascii === "string");
		t.truthy(resp?.images?.ascii?.length);
		t.assert(typeof resp?.images?.base64 === "string");
		t.truthy(resp?.images?.base64?.length);
	}
});
