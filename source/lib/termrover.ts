import fetch from "cross-fetch";

const ENDPOINT = "https://hiring.hypercore-protocol.org/termrover";

/**
 * Response interface
 * {
 * 	metadata: raw metadata object from NASA
 * 	images: {
 * 		base64: base64 encoded string of the image
 * 		ascii: ascii version with color escape codes of the image
 * 	}
 * }
 */
type Response = {
	metadata: Record<string, any>;
	images: {
		base64: string;
		ascii: string;
	};
};

/**
 * @returns (number) the total number of available images
 */
export function length(): Promise<number> {
	return fetch(ENDPOINT)
		.then((response) => response.json())
		.then((data) => data.numImages);
}

/**
 * @returns (Response) the latest image
 */
export function latest(): Promise<Response> {
	return fetch(`${ENDPOINT}/latest`).then((response) => response.json());
}

/**
 *
 * @param index (number) the index of the image
 * @returns (Response) the image at a given index
 */
export function atIndex(index: number): Promise<Response> {
	return fetch(`${ENDPOINT}/${index}`).then((response) => response.json());
}

/**
 * @yields (Response) AsyncIterator over all images available
 */
export async function* iterate(): AsyncGenerator<Response> {
	let index = 0;
	let response = await atIndex(index).catch(() => null);
	while (response) {
		index++;
		response = (await atIndex(index).catch(() => null)) as Response;
		yield response;
	}
}
