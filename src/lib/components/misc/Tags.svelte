<script lang="ts">
	import type { Tag } from '../../types/tag.js';

	interface Props {
		tags: Tag[];
	}
	let { tags }: Props = $props();
</script>

<div class="tags-container">
	{#each tags as tag}
		<button class="tag" style="--color: {tag.color ? tag.color : 'var(--surface)'}">
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
		border-radius: var(--radius-md);
		background: var(--color);
		border: var(--button-stroke) solid 0.0625rem;
		box-shadow: var(--shadow-main);
		font-size: 0.875rem;
		color: var(--text-color);
		transition: transform 0.2s ease;
	}

	button.tag:hover {
		transform: translateY(-2px);
	}
</style>
