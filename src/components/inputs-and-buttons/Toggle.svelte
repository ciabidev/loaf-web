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
		gap: var(--padding);
		justify-content: space-between;
		text-align: start;
		padding: calc(var(--switcher-padding) * 2) 16px;
		border-radius: var(--border-radius);
		overflow: visible; 
	}

	.toggle-container.full {
		width: 100%;
	}

	.toggle {
		/* --- CONFIGURATION: CHANGE WIDER OVAL HERE --- */
		--switcher-width: 32px;   /* Symmetrical oval width control */
		--track-height: 26px;     /* Core height boundary */
		
		/* --- AUTOMATED CALCULATIONS --- */
		/* The multiplier controls the track runway width cleanly */
		--track-width: calc(var(--switcher-width) * 1.6 + 4px); 
		
		box-sizing: border-box;
		width: var(--track-width);
		height: var(--track-height);
		border-radius: 100px;
		background: var(--toggle-bg);
		transition: background 0.25s ease;
		flex-shrink: 0;
		
		/* FIX 1: Enforces perfect absolute pixel coordinates on children */
		position: relative; 
	}

	.toggle-switcher {
		/* FIX 2: Explicitly positions the circle precisely 2px from the top and left */
		position: absolute;
		top: 2px;
		left: 2px;
		
		/* FIX 3: Automatically calculates height to match the 2px top/bottom padding bounds */
		height: calc(var(--track-height) - 4px); 
		width: var(--switcher-width); 
		
		background: var(--white);
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
