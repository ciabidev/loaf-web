<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    test?: boolean;
    position?: 'top' | 'right' | 'bottom' | 'left';
    children: Snippet;
  }

  let { test = false, position = 'bottom', children }: Props = $props();
</script>

<nav class="navbar" class:test data-position={position}>
  <div
    class="navbar-tabs"
    role="tablist"
    aria-orientation={position === 'left' || position === 'right' ? 'vertical' : 'horizontal'}
  >
    {@render children()}
  </div>
</nav>

<style>
  .navbar,
  .navbar-tabs {
    display: flex;
    flex-direction: row;
  }

  .navbar {
    overflow: hidden;
    width: 100%;
    height: var(--navbar-height);
    justify-content: center;
    align-items: center;
    overflow-y: hidden;
    z-index: 100;
    background-color: var(--nav-bg);
  }

  .navbar:not(.test) {
    position: fixed;
  }

  .navbar[data-position='top'] {
    top: 0;
    left: 0;
  }

  .navbar[data-position='bottom'] {
    bottom: 0;
    left: 0;
  }

  .navbar[data-position='left'],
  .navbar[data-position='right'] {
    top: 0;
    width: calc(var(--navbar-width) + var(--navbar-inner-padding) * 2);
    height: 100%;
    padding: 0;
  }

  .navbar[data-position='left'] {
    left: 0;
  }

  .navbar[data-position='right'] {
    right: 0;
  }

  .navbar-tabs {
    z-index: 1005;
    max-width: 100%;
    padding: var(--navbar-inner-padding) 0;
    height: fit-content;
    justify-content: space-between;
  }

  .navbar[data-position='top'] .navbar-tabs,
  .navbar[data-position='bottom'] .navbar-tabs {
    height: 100%;
    align-items: stretch;
  }

  .navbar[data-position='left'] .navbar-tabs,
  .navbar[data-position='right'] .navbar-tabs {
    flex-direction: column;
    width: 100%;
    max-height: 100%;
    height: 100%;
    justify-content: flex-start;
    overflow-x: hidden;
    overflow-y: auto;
    padding: var(--navbar-inner-padding);
    padding-bottom: var(--navbar-tab-padding);
  }

  .navbar > * {
    z-index: 2;
  }

  @media screen and (max-width: 600px) {
    .navbar[data-position='top'],
    .navbar[data-position='bottom'] {
      height: var(--mobile-navbar-height);
    }

    .navbar[data-position='top'] .navbar-tabs,
    .navbar[data-position='bottom'] .navbar-tabs {
      height: fit-content;
      align-items: normal;
    }
  }

  @media screen and (max-height: 500px) {
    .navbar[data-position='top'],
    .navbar[data-position='bottom'] {
      height: var(--mobile-navbar-height);
    }
  }
</style>
