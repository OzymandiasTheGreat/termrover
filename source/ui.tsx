import React, { FC, useEffect, useState } from "react";
import { Text } from "ink";
import * as tr from "./lib/termrover";

async function sleep(timeout: number) {
	return new Promise((resolve) => setTimeout(resolve, timeout));
}

const App: FC<{ index: number; slideshow: number }> = ({
	index,
	slideshow,
}) => {
	const [image, setImage] = useState("");

	useEffect(() => {
		if (index > -1 && slideshow > -1) {
			setImage("You must provide only one of `index` or `slideshow`");
		} else if (index > -1) {
			tr.atIndex(index).then((resp) => setImage(resp.images.ascii));
		} else if (slideshow > -1) {
			(async () => {
				for await (let resp of tr.iterate()) {
					setImage(resp.images.ascii);
					await sleep(slideshow);
				}
			})();
		} else {
			tr.latest().then((resp) => setImage(resp.images.ascii));
		}
	}, []);

	return <Text>{image}</Text>;
};

module.exports = App;
export default App;
