<script lang="ts">
	/**
	 * SmallDialog - Standard dialog component for the application
	 *
	 * The primary dialog component used throughout the application.
	 * Provides a consistent interface for displaying messages, confirmations,
	 * and user interactions.
	 *
	 * Features:
	 * - Title and body text support
	 * - Icon support for visual context
	 * - Configurable buttons with actions
	 * - Dismissable/backdrop click support
	 * - Left-aligned layout option
	 * - Meowbalt integration for special dialogs
	 *
	 * Usage:
	 * ```typescript
	 * createDialog({
	 *   id: 'confirm-delete',
	 *   type: 'small',
	 *   title: 'Delete Item',
	 *   bodyText: 'Are you sure?',
	 *   buttons: [
	 *     { text: 'cancel', action: () => {} },
	 *     { text: 'Delete', main: true, action: () => deleteItem() }
	 *   ]
	 * });
	 * ```
	 */

	import type { DialogButton, SmallDialogIcons } from '../../types/dialog.js';
	import DialogContainer from './DialogContainer.svelte';
	import DialogButtons from './DialogButtons.svelte';
	import type { Emotion } from '../../types/emoticon.ts';
	import Emoticon from '../misc/Emoticon.svelte';

	// Props with defaults
	let {
		id,
		emoticon = undefined,
		icon = undefined,
		title = '',
		bodyText = '',
		bodySubText = '',
		buttons = undefined,
		dismissable = true,
		leftAligned = false
	}: {
		id: string;
		emoticon?: Emotion;
		icon?: SmallDialogIcons;
		title?: string;
		bodyText?: string;
		bodySubText?: string;
		buttons?: DialogButton[];
		dismissable?: boolean;
		leftAligned?: boolean;
	} = $props();

	// Reference to close function from DialogContainer
	let close: () => void = $state(() => {});
</script>

<DialogContainer {id} {dismissable} bind:close>
	<div
		class="dialog-body small-dialog"
		class:emoticon-visible={emoticon}
		class:align-left={leftAligned}
	>
		{#if emoticon}
			<div class="emoticon-container">
				<Emoticon emotion={emoticon} size="medium" />
			</div>
		{/if}
		<div class="dialog-inner-container">
			{#if title || icon}
				<div class="popup-header">
					{#if icon === 'warn-red'}
						<div class="popup-icon {icon}">
							<!-- Icon would go here -->
						</div>
					{/if}
					{#if title}
						<h2 class="popup-title">{title}</h2>
					{/if}
				</div>
			{/if}
			{#if bodyText}
				<div class="body-text">{bodyText}</div>
			{/if}
			{#if bodySubText}
				<div class="subtext popup-subtext">{bodySubText}</div>
			{/if}
		</div>
		{#if buttons}
			<DialogButtons {buttons} closeFunc={close} />
		{/if}
	</div>
</DialogContainer>

<style>
	.small-dialog,
	.dialog-inner-container {
		display: flex;
		flex-direction: column;
		gap: var(--loaf-padding-md);
	}

	.dialog-inner-container {
		overflow-y: scroll;
		gap: 0.5rem;
	}

	.emoticon-container {
		position: absolute;
		bottom: 100%;
	}

	.small-dialog {
		text-align: center;
		max-width: 21.25rem;
		width: calc(100% - var(--loaf-padding-md) - var(--loaf-popup-padding) * 2);
		max-height: 85%;
		margin: calc(var(--loaf-padding-md) / 2);
	}

	.popup-title {
		color: var(--loaf-text);
		font-size: 1.1875rem;
	}

	.popup-header,
	.popup-icon {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.warn-red :global(svg) {
		stroke: var(--loaf-red);
	}

	.body-text {
		font-size: 0.9063rem;
		font-weight: 500;
		line-height: 1.7;
		color: var(--loaf-text-muted);
		white-space: pre-wrap;
		user-select: text;
		-webkit-user-select: text;
	}

	.popup-subtext {
		opacity: 0.7;
		padding: 0;
	}

	.align-left .body-text {
		text-align: start;
	}

	.align-left .popup-header {
		align-items: start;
		gap: 0.125rem;
	}
</style>
