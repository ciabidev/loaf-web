<script lang="ts">    
    export type Tag = {
        name: string;
        description?: string;
        link?: string;
        iconPath?: string;
        color?: string;
    }
    interface Props {
        tags: Tag[];
    }
    let { tags }: Props = $props();

    
</script>

<div class="tags-container">
    {#each tags as tag}
        
        <button class="tag" style="--color: {tag.color ? tag.color : 'var(--surface-secondary)'}">
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
        border-radius: 0.375rem;
        background: var(--color);
        border: var(--button-stroke) solid 0.0625rem;
        box-shadow: var(--shadow-main);
        font-size: 0.875rem;
        color: var(--text-color);
    }
</style>