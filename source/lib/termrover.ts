import fetch from "cross-fetch";

const ENDPOINT = "https://hiring.hypercore-protocol.org/termrover";

type Response = {
	metadata: Record<string, any>;
	images: {
		base64: string;
		ascii: string;
	};
};

export function length(): Promise<number> {
	return fetch(ENDPOINT)
		.then((response) => response.json())
		.then((data) => data.numImages);
}

export function latest(): Promise<Response> {
	return fetch(`${ENDPOINT}/latest`).then((response) => response.json());
}

export function atIndex(index: number): Promise<Response> {
	return fetch(`${ENDPOINT}/${index}`).then((response) => response.json());
}

export async function* iterate(): AsyncGenerator<Response> {
	let index = 0;
	let response = await atIndex(index).catch(() => null);
	while (response) {
		index++;
		response = (await atIndex(index).catch(() => null)) as Response;
		yield response;
	}
}
