import type { BackgroundCodeArgument } from "./types"

export function initialzeCodeBackground() {
	const codeWorker = new Worker(
		new URL("BackgroundCodeWorker", import.meta.url),
		{
			type: "module",
		}
	)

	codeWorker.addEventListener("message", setBackgroundCode)

	const observer = new MutationObserver(() => sendHTMLtoWorker(codeWorker))

	const element = getAppElement()
	if (!element) {
		console.error("Main element for live-code not found")
		return
	}

	observer.observe(element, {
		childList: true,
		subtree: true,
		characterData: true,
		attributes: true,
	})

	sendHTMLtoWorker(codeWorker)

	return () => {
		codeWorker.terminate()
		observer.disconnect()
	}
}

function sendHTMLtoWorker(worker: Worker) {
	const message: BackgroundCodeArgument = {
		htmlString: getAppHTML() ?? "",
	}

	worker.postMessage(message)
}

function setBackgroundCode({ data }: MessageEvent<string>) {
	const element = getCodeBlock()
	if (!element) {
		console.error("Background code element not found")
		return
	}

	element.innerHTML = data
}

function getCodeBlock() {
	return document.querySelector("#bg-code")
}

function getAppElement() {
	return document.querySelector("main")
}

function getAppHTML() {
	return getAppElement()?.innerHTML
}
