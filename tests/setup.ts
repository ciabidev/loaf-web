import { afterEach } from 'vitest';

Object.defineProperty(HTMLDialogElement.prototype, 'showModal', {
	configurable: true,
	value() {
		this.setAttribute('open', '');
	}
});

Object.defineProperty(HTMLDialogElement.prototype, 'close', {
	configurable: true,
	value() {
		this.removeAttribute('open');
	}
});

Object.defineProperty(HTMLElement.prototype, 'scroll', {
	configurable: true,
	value() {}
});

Object.defineProperty(HTMLElement.prototype, 'scrollTo', {
	configurable: true,
	value() {}
});

Object.defineProperty(Element.prototype, 'animate', {
	configurable: true,
	value() {
		const animation = {
			onfinish: null as (() => void) | null,
			cancel() {},
			finished: Promise.resolve()
		};
		queueMicrotask(() => animation.onfinish?.());
		return animation;
	}
});

afterEach(() => {
	document.body.replaceChildren();
});
