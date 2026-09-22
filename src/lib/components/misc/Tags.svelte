<script lang="ts">
	import type { Tag } from '../../types/tag.js';

	interface Props {
		tags: Tag[];
	}
	let { tags }: Props = $props();
</script>

<div class="tags-container">
	{#each tags as tag (tag)}
		<button
			class="tag"
			style:--tag-background={tag.color ?? 'var(--loaf-surface)'}
			style:--tag-text={tag.textColor}
		>
			<span>{tag.name}</span>
		</button>
	{/each}
</div>

<style>
	.tags-container {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		gap: 0.1875rem;
	}

	.tag {
		display: flex;
		flex-direction: row;
		gap: 0.1875rem;
		align-items: center;
		padding: 0.1875rem 0.5rem;
		border-radius: var(--loaf-radius-md);
		background: var(--tag-background);
		border: var(--loaf-button-stroke) solid 0.0625rem;
		box-shadow: var(--loaf-shadow-md);
		font-size: 0.875rem;
		/* Keep the inherited theme color as a fallback for older browsers. */
		color: var(--loaf-text);
		color: var(--tag-text, contrast-color(var(--tag-background)));
		transition: transform 0.2s ease;
	}

	button.tag:hover {
		transform: translateY(-2px);
	}
</style>
