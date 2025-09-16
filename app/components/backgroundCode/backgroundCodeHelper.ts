import { auditTime, map, Observable } from "rxjs"

export function initializeCodeBackground() {
	// Don't do anything on mobile, as its too heavy
	if (window.innerWidth < 520) return () => {}

	const codeWorker = new Worker(
		new URL("./backgroundCode.worker.ts", import.meta.url),
		{
			type: "module",
		}
	)

	codeWorker.addEventListener("message", setBackgroundCode)

	const subscription = new Observable((subscriber) => {
		const observer = new MutationObserver(() => subscriber.next(undefined))

		observer.observe(getAppElement(), {
			childList: true,
			subtree: true,
			characterData: false,
			attributes: true,
		})

		return () => observer.disconnect()
	})
		.pipe(auditTime(80), map(getAppHTML))
		.subscribe((html) => {
			codeWorker.postMessage(html)
		})

	const element = getAppElement()
	if (!element) {
		console.error("Main element for live-code not found")
		return () => {}
	}

	sendHTMLtoWorker(codeWorker)

	return () => {
		codeWorker.terminate()
		subscription.unsubscribe()
	}
}

async function sendHTMLtoWorker(worker: Worker) {
	const message = getAppHTML() ?? ""

	worker.postMessage(message)
}

async function setBackgroundCode({ data }: MessageEvent<string>) {
	const element = getCodeBlock()
	if (!element) {
		console.error("Background code element not found")
		return
	}

	if (!element.dataset.rendered) {
		element.dataset.rendered = "true"
	}

	element.innerHTML = data
}

function getCodeBlock(): HTMLElement | undefined {
	return (document.querySelector("#bg-code") as HTMLElement) ?? undefined
}

function getAppElement() {
	return document.querySelector("main")!
}

function getAppHTML() {
	return getAppElement().innerHTML
}
