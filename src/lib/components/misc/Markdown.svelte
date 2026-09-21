<script>
	import { marked } from 'marked';
	import DOMPurify from 'isomorphic-dompurify'; // 👈 Swapped here
	import Codeblock from './Codeblock.svelte';

	let { source } = $props();

	const tokens = $derived(marked.lexer(source || ''));
</script>

<div class="markdown paragraph-text">
	{#each tokens as token, index (`${token.type}-${index}`)}
		{#if token.type === 'code'}
			<Codeblock
				code={token.text}
				language={token.lang || 'plaintext'}
				title={token.lang || 'code'}
			/>
		{:else}
			<!-- eslint-disable-next-line svelte/no-at-html-tags -- DOMPurify sanitizes Marked output before rendering. -->
			{@html DOMPurify.sanitize(marked.parser([token]))}
		{/if}
	{/each}
</div>

<style>
	.markdown {
		flex-direction: column;
		display: flex;
		max-width: 100%;
		gap: 0.85rem;
	}

	.markdown > :global(*) {
		margin-block: 0;
	}
</style>
