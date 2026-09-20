<script lang="ts">
	interface Props {
		enabled?: boolean;
		title?: string;
		locked?: boolean;
		full?: boolean;
		onClick?: (
			event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }
		) => void | Promise<void>;
	}

	let {
		enabled = false,
		title = '',
		locked = false,
		full = false,
		onClick = async () => {}
	}: Props = $props();
</script>

<button
    class="button toggle-container"
    class:transparent = {!title}
    role="switch"
    aria-checked={enabled}
    onclick={onClick}
    class:full
    class:locked
>   

    {#if title}
        <h4 class="toggle-title">{title}</h4>
    {/if}   
    <div class="toggle" class:enabled>
        <div class="toggle-switcher"></div>
    </div>
</button>


<style>
	.toggle-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: var(--padding-md);
		justify-content: space-between;
		text-align: start;
		padding: calc(var(--switcher-padding) * 2) 16px;
		border-radius: var(--radius-md);
		overflow: visible; 
	}

	.toggle-container.transparent {
		filter: none;
	}

	.toggle-container.full {
		width: 100%;
	}

	.toggle {
		--switcher-width: 32px;   
		--track-height: 26px;    
		
		--track-width: calc(var(--switcher-width) * 1.6 + 4px); 
		
		box-sizing: border-box;
		width: var(--track-width);
		height: var(--track-height);
		border-radius: 100px;
		background: var(--toggle-bg);
		transition: background 0.25s ease;
		flex-shrink: 0;
		
		position: relative; 
	}

	.toggle-switcher {
		position: absolute;
		top: 2px;
		left: 2px;
		
		height: calc(var(--track-height) - 4px); 
		width: var(--switcher-width); 
		
		background: #ffffff;
		border-radius: 100px;
		transform: translateX(0);
		transition: transform 0.25s cubic-bezier(0.25, 1, 0.5, 1); 
	}

	.toggle.enabled {
		background: var(--toggle-bg-enabled);
	}

	/* FIX 4: Perfectly scales the slide path to stop precisely 2px away from the right edge */
	.toggle.enabled .toggle-switcher {
		transform: translateX(calc(var(--track-width) - var(--switcher-width) - 4px));
	}

	/* RTL layout handles the mirror transformation evenly */
	.toggle:dir(rtl) .toggle-switcher {
		left: auto;
		right: 2px;
	}

	.toggle:dir(rtl).enabled .toggle-switcher {
		transform: translateX(calc((var(--track-width) - var(--switcher-width) - 4px) * -1));
	}

	.toggle-title {
		margin: 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.transparent {
		background: none;
		border: none;
		padding: 0;
	}




</style>
