<script lang="ts">
	import { onMount } from 'svelte';
	import { highlightCode } from '../../state/shiki.js';

	let {
		code = '',
		language = 'plaintext',
		title = 'code',
	}: { code?: string; language?: string; title?: string } = $props();

	let copyText = $state('Copy');
	let highlighted = $state('');

	async function copyCode() {
		try {
			await navigator.clipboard.writeText(code);
			copyText = 'Copied!';
			setTimeout(() => (copyText = 'Copy'), 2000);
		} catch (err) {
			console.error('Failed to copy: ', err);
		}
	}

	async function highlight() {
		if (!code) return;
		highlighted = await highlightCode(code, language);
	}

	// Delay highlighting to avoid interfering with page loading animations
	onMount(() => {
		highlight();
	});
</script>

<div class="block-wrapper">
		<div class="header">
			<div class="code-title">{title}</div>
			<button class="copy-btn" onclick={copyCode}>
				<span class="icon">📋</span>
				{copyText}
			</button>
		</div>
		<div class="block-container">
			{@html highlighted}
		</div>
</div>

<style>
	.block-wrapper {
		max-width: 100%;
		position: relative;
		overflow: hidden;
		background: var(--surface-secondary);
		border: 1px solid var(--border-color);
		padding: var(--padding-xs);
		border-radius: var(--radius-md);
		display: flex;
		flex-direction: column;
	}



	.header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: var(--padding-xs) var(--padding-md);
		font-size: 14px;
		color: var(--text);
		background: var(--surface-secondary);
	}

	.copy-btn {
		padding: 0.25rem 0.5rem;
		color: var(--text);
		background: var(--button-default);
		border: 1px solid var(--button-stroke);
		border-radius: var(--radius-xs);
		font-size: 0.9rem;
		transition: background-color 0.2s;
		display: flex;
		align-items: center;
		gap: 0.25rem;
		z-index: 2;
	}

	.icon {
		font-size: 1rem;
	}

	.copy-btn:hover {
		filter: brightness(1.25);
	}

	.code-title {
		flex: 1;
		color: var(--text);
	}

	/* Override Shiki's background to match component */
	:global(.shiki) {
		background: var(--code-bg) !important;
		margin: 0;
		padding: 0.75rem;
		color-scheme: dark;
		font-size: 0.9rem;
		line-height: inherit;
		overflow-x: auto;
				border-radius: var(--radius-md);

	}

	:global(.shiki code) {
		background: transparent !important;
		padding: 0;

		border-radius: 0;
		font-family: inherit;
		font-size: inherit;
	}

	:global(.shiki code *) {
		font-family: inherit;
	}
</style>
