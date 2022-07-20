#!/usr/bin/env node
import React from "react";
import { render } from "ink";
import meow from "meow";
import App from "./ui";

const cli = meow(
	`
	Display images from NASA's Perseverance's "Front Left Hazard Avoidance Camera"
	indexed chronologically.

	Usage
	  $ termrover

	Options
		-i, --index      Display image at this index (Default: latest)
		-s, --slideshow  Display a slideshow of all images with a given delay in milliseconds

	Examples
	  $ termrover --index=13
`,
	{
		flags: {
			index: {
				type: "number",
				alias: "i",
				default: -1,
			},
			slideshow: {
				type: "number",
				alias: "s",
				default: -1,
			},
		},
	}
);

render(<App index={cli.flags.index} slideshow={cli.flags.slideshow} />);
