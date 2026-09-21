import { writable, get } from 'svelte/store';
import type { BundledLanguage } from 'shiki';

type HighlightedCode = {
	code: string;
	language: string;
	highlightedCode: string;
};

export const highlightedCache = writable<HighlightedCode[]>([]);

type ShikiBundle = typeof import('shiki/dist/bundle-full.mjs');
type Highlighter = Awaited<ReturnType<ShikiBundle['createHighlighter']>>;

export const highlighterInstance = writable<Highlighter | null>(null);

let initPromise: Promise<Highlighter> | null = null;

function initHighlighter() {
	if (initPromise) return initPromise;

	initPromise = (async () => {
		const { createHighlighter } = await import('shiki/dist/bundle-full.mjs');
		const highlighter = await createHighlighter({
			themes: ['dark-plus'],
			langs: ['plaintext', 'javascript', 'typescript', 'html', 'css']
		});
		highlighterInstance.set(highlighter);
		return highlighter;
	})();

	return initPromise;
}

initHighlighter();

export const highlightCode = async (code: string, language: string) => {
	const cache = get(highlightedCache);
	const cachedCode = cache.find((item) => item.code === code && item.language === language);
	if (cachedCode) {
		return cachedCode.highlightedCode;
	}

	let highlighter = get(highlighterInstance);
	if (!highlighter) {
		highlighter = await initHighlighter();
	}

	const lang = language || 'plaintext';

	try {
		// 3. ✅ LAZY-LOADING: Check if Shiki already knows this language. If not, fetch it on-the-fly!
		const loadedLangs = highlighter.getLoadedLanguages();
		if (!loadedLangs.includes(lang)) {
			await highlighter.loadLanguage(lang as BundledLanguage);
		}

		const highlightedCode = await highlighter.codeToHtml(code, { lang, theme: 'dark-plus' });

		highlightedCache.update((arr) => [...arr, { code, language: lang, highlightedCode }]);
		return highlightedCode;
	} catch (error: unknown) {
		const message = error instanceof Error ? error.message : String(error);
		return `error highlighting code: ${message}\n\n<pre><code>${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`;
	}
};
