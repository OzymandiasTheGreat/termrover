import React from "react";
import test from "ava";
import { render } from "ink-testing-library";
import App from "./ui";
import "./lib/test";
import * as tr from "./lib/termrover";

// Test's are flaky at this point, there's a known bug where test renderer
// sometimes fails to render component. Until that is resolved tests will
// remain flaky

test("Invalid arguments", async (t) => {
	const { lastFrame } = render(<App index={13} slideshow={2500} />);

	t.is(lastFrame(), "You must provide only one of `index` or `slideshow`");
});

test("Display latest", async (t) => {
	const { lastFrame } = render(<App index={-1} slideshow={-1} />);
	const resp = await tr.latest();

	t.is(lastFrame(), resp.images.ascii);
});

test("Display at index", async (t) => {
	const { lastFrame } = render(<App index={13} slideshow={-1} />);
	const resp = await tr.atIndex(13);

	t.is(lastFrame(), resp.images.ascii);
});
