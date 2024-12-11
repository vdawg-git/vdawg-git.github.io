import { Observable, share } from "rxjs"

export function observeIntersection(
	element: HTMLElement,
	options?: IntersectionObserverInit
): Observable<readonly IntersectionObserverEntry[]> {
	const observable = new Observable((subscriber) => {
		const intersectionObserver = new IntersectionObserver((entries) => {
			subscriber.next(entries)
		}, options)

		intersectionObserver.observe(element)

		return () => {
			intersectionObserver.disconnect()
		}
	}).pipe(share()) as Observable<IntersectionObserverEntry[]>

	return observable
}
