<script lang="ts">
	import LinkIcon from '../icons/external-link.svelte';

	let { url, urlshort, name, img }: { url: string; urlshort: string; name: string; img?: string } =
		$props();
</script>

<a class="url-button" target="_blank" href={url}>
	{#if img}
		<img src={img} alt={name} class="url-icon icon" />
	{/if}
	<div class="url-text">
		<div class="url-name">{name}</div>
		<span class="url-short subtext"
			><LinkIcon
				aria-hidden="true"
				style="width: 1rem; height: 1rem; flex: 0 0 1rem;"
				class="icon"
			/>{urlshort}</span
		>
	</div>
</a>

<style>
	.url-text {
		line-height: var(--loaf-readable-line-height);
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-decoration: none;
		color: var(--loaf-text);
		position: relative;
		text-decoration: none;
	}

	.url-name {
		display: flex;
		text-decoration: none;
		font-weight: 600;
		font-size: 0.9rem;
	}

	.url-short {
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: 0.9rem;
		gap: 5px;
		text-decoration: underline;
	}

	.url-icon {
		width: 3rem;
		height: 3rem;
		border-radius: 12px;
	}

	a.url-button {
		user-select: none;
		-webkit-user-select: none; /* Safari / iOS */
		-ms-user-select: none;
		flex-shrink: 0;
		display: flex;
		min-width: fit-content;
		flex-basis: content;
		flex-direction: row;
		align-items: center;
		gap: 10px;
		position: relative;
		border-radius: var(--loaf-radius-md);
		padding: 7px 9px;
		width: max-content;
		text-decoration: none;
		touch-action: manipulation;
		transition: background 0.2s ease;
		border: var(--loaf-button-stroke) solid 0.0625rem;
	}

	@media (hover: hover) {
		a.url-button:hover {
			background: color-mix(in srgb, var(--loaf-text) 6%, transparent);
		}
	}
</style>
