<script lang="ts">
	/**
	 * DialogButton - Individual button component for dialogs
	 *
	 * Renders a single button within a dialog with support for:
	 * - Main button styling (primary action)
	 * - Color variants (e.g., red for destructive actions)
	 * - Timeout functionality with countdown
	 * - Link buttons (renders as <a> instead of <button>)
	 *
	 * Features:
	 * - Automatic timeout countdown display
	 * - Disabled state during timeout
	 * - Main button highlighting
	 * - Color-coded variants
	 * - Link support for external actions
	 *
	 * Props:
	 * - button: DialogButton - Button configuration object
	 * - closeFunc: () => void - Function to close the parent dialog
	 */

	import type { DialogButton as DialogButtonDefinition } from '../../types/dialog.js';

	// Props
	let { button, closeFunc }: { button: DialogButtonDefinition; closeFunc: () => void } = $props();

	// State for timeout functionality
	let disabled = $state(false);
	let seconds = $state(0);

	// Handle button timeout countdown
	$effect(() => {
		const timeout = button.timeout;
		if (!timeout) {
			disabled = false;
			seconds = 0;
			return;
		}

		disabled = true;
		seconds = Math.round(timeout / 1000);

		const interval = setInterval(() => {
			seconds--;
			if (seconds <= 0) {
				clearInterval(interval);
				disabled = false;
			}
		}, 1000);

		return () => clearInterval(interval);
	});
</script>

{#if button.link}
	<a class="button button--link" class:active={button.main} href={button.link}>
		{button.text}
	</a>
{:else}
	<button
		class="button {button.color === 'red' ? 'button--danger' : ''}"
		class:active={button.main}
		{disabled}
		onclick={async () => {
			await button.action();
			closeFunc();
		}}
	>
		{button.text}{seconds ? ` (${seconds})` : ''}
	</button>
{/if}

<style>
	button {
		width: 100%;
	}
</style>
