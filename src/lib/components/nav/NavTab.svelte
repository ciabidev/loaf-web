<script lang="ts">
  import type { Component } from "svelte";

  interface Props {
    Icon?: Component;
    path: string;
    name: string;
    layout?: 'vertical' | 'horizontal';
    iconColor?: string;
    active?: boolean;
  }

  let { Icon, path, name, layout, iconColor, active = false }: Props = $props();
  import { fly } from "svelte/transition";

  let tab!: HTMLElement;

  const scrollToTab = (ele: HTMLElement) => {
    const tabList = ele.parentElement;

    if (!tabList) return;

    if (tabList.scrollWidth > tabList.clientWidth) {
      tabList.scrollTo({
        left: ele.offsetLeft - (tabList.clientWidth - ele.offsetWidth) / 2,
        behavior: 'smooth'
      });
    }

    if (tabList.scrollHeight > tabList.clientHeight) {
      tabList.scrollTo({
        top: ele.offsetTop - (tabList.clientHeight - ele.offsetHeight) / 2,
        behavior: 'smooth'
      });
    }
  };

  $effect(() => {
    if (active && tab) {
      scrollToTab(tab);
    }
  });

  let clicked = $state(false);
</script>

<a
  role="tab"
  id="tab"
  draggable="false"
  class:active
  class:navbar-tab={true}
  href={path}
  aria-selected={active}
  class:horizontal={layout === 'horizontal'}
  style:--icon-color={iconColor ?? 'currentColor'}
  bind:this={tab}
>
  {#if Icon}
    <Icon style="font-size: var(--loaf-icon-size-mobile); color: var(--active-icon-color, var(--icon-color));" class="icon" />
  {/if}
  <span class="tab-title">{name}</span>
</a>

<style lang="css">
  /* the .active class is enabled when the path of the tab is = to the path of the current page, meaning the tab is active. The :active selector is only when the element itself is active. */
  @keyframes afterClick {
    0% {
      transform: scale(0.85);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }

  .tab-title {
    white-space: nowrap;
  }

  .navbar-tab {
    transition: transform 250ms cubic-bezier(0.33, 1, 0.68, 1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.1875rem;
    min-width: var(--loaf-navbar-width);
    height: fit-content;
    padding: var(--loaf-navbar-tab-padding);
    text-align: center;
    color: var(--loaf-nav-highlight);
    font-size: var(--loaf-navbar-font-size);
    opacity: 0.75;
    text-decoration: none;
    overflow-x: hidden;
     user-select: none;
  -webkit-user-select: none;  /* Safari / iOS */
  -ms-user-select: none; 
    border-radius: var(--loaf-radius-md);
  }

  :global(.navbar[data-position='top']) .navbar-tab,
  :global(.navbar[data-position='bottom']) .navbar-tab {
    height: auto;
  }

  @media screen and (max-width: 600px) {
    :global(.navbar[data-position='top']) .navbar-tab,
    :global(.navbar[data-position='bottom']) .navbar-tab,
    :global(.navbar[data-position$='-top']) .navbar-tab,
    :global(.navbar[data-position$='-bottom']) .navbar-tab {
      height: fit-content;
      padding: 0.3125rem var(--loaf-padding-md);
    }
  }

  .navbar-tab.horizontal {
    flex-direction: row;
    justify-content: flex-start;
    height: auto;
    padding: var(--loaf-navbar-tab-padding-horizontal);
    gap: calc(var(--loaf-navbar-tab-padding-horizontal));
  }

  /* shrinks down for a little then scales back up once it gains the .active class */
  .navbar-tab:active:hover:not(.active) {
    transform: scale(0.85, 0.85);
    border: var(--loaf-button-stroke) solid 1px;
  }

  .navbar-tab.active {
    --active-icon-color: var(--loaf-nav-active-highlight);
    animation: 0.3s afterClick cubic-bezier(0.33, 1, 0.68, 1);
    background: var(--loaf-accent-secondary);
    opacity: 1;
    cursor: default;
    color: var(--loaf-nav-active-highlight);
    --icon-color: var(--loaf-nav-active-highlight);
  }


@media not all and (hover: none) {
   .navbar-tab:hover:not(.active) {
    background: var(--loaf-nav-hover-bg)
  }
}

</style>
