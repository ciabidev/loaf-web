<script lang="ts">
	import SearchIcon from '~icons/hugeicons/search-01';
	import GridIcon from '~icons/hugeicons/layout-grid';
	import LinkIcon from '~icons/hugeicons/link';
	import PlayIcon from '~icons/hugeicons/play';

	import Carousel from '$components/inputs-and-buttons/Carousel.svelte';
	import Input from '$components/inputs-and-buttons/Input.svelte';
	import Selector from '$components/inputs-and-buttons/Selector.svelte';
	import Switcher from '$components/inputs-and-buttons/Switcher.svelte';
	import Toggle from '$components/inputs-and-buttons/Toggle.svelte';
	import URLButton from '$components/inputs-and-buttons/URLButton.svelte';
	import Card from '$components/misc/Card.svelte';
	import Codeblock from '$components/misc/Codeblock.svelte';
	import Contact from '$components/misc/Contact.svelte';
	import Emoticon from '$components/misc/Emoticon.svelte';
	import FormField from '$components/misc/FormField.svelte';
	import Markdown from '$components/misc/Markdown.svelte';
	import PageContainer from '$components/misc/PageContainer.svelte';
	import Popover from '$components/misc/Popover.svelte';
	import Profile from '$components/misc/Profile.svelte';
	import Tags from '$components/misc/Tags.svelte';
	import Navbar from '$components/nav/Navbar.svelte';
	import NavbarLogo from '$components/nav/NavbarLogo.svelte';
	import NavTab from '$components/nav/NavTab.svelte';
	import { createDialog } from '$lib/state/dialogs';
	import { flavors } from '$lib/state/flavor-registry';
	type CardVariant = 'flat' | 'bordered' | 'elevated' | 'ghost';

	const cardVariants: Array<{ variant: CardVariant; description: string }> = [
		{ variant: 'flat', description: 'A filled surface without a border or shadow.' },
		{ variant: 'bordered', description: 'A flat surface with a strong border.' },
		{ variant: 'elevated', description: 'A thin border and shadow lift this card.' },
		{ variant: 'ghost', description: 'A transparent surface with a dashed outline.' }
	];

	const responsiveNavbarPositions = [
		'left-top',
		'left-bottom',
		'right-top',
		'right-bottom'
	] as const;

	const flavorItems = Array.from(flavors, ([name, definition]) => ({
		title: name,
		description: definition.description,
		image: definition.iconPath
	}));

	let textInput = $state('');
	let longInput = $state('');
	let activeSegment = $state(0);
	let fullActiveSegment = $state(0);
	let selectedOption = $state('second');
	let selectedEdgeOption = $state('alpha');
	let toggleEnabled = $state(false);
	let lockedToggle = $state(false);
	let popoverVisible = $state(false);
	let cardClicks = $state(0);
	let episodePlaying = $state(false);

	const openSmallDialog = () => {
		createDialog({
			id: 'component-gallery-small-dialog',
			type: 'small',
			title: 'Small dialog',
			bodyText: 'Dialogs can contain a title, body, emoticon, and one or more actions.',
			emoticon: 'happy',
			buttons: [{ text: 'Continue', main: true, action: () => {} }]
		});
	};

	const openPickerDialog = () => {
		createDialog({
			id: 'component-gallery-picker-dialog',
			type: 'picker',
			items: [
				{ type: 'photo', url: '/emotions/happy.png', text: 'Happy' },
				{ type: 'photo', url: '/emotions/confused.png', text: 'Confused' },
				{ type: 'photo', url: '/emotions/surprised.png', text: 'Surprised' },
				{ type: 'photo', url: '/emotions/unamused.png', text: 'Unamused' }
			],
			buttons: [{ text: 'Done', main: true, action: () => {} }],
			onSelect: (item) => {
				console.log('Selected gallery item:', item);
			}
		});
	};
</script>

<PageContainer
	containerId="component-gallery-container"
	pageId="component-gallery"
	maxWidth="68rem"
>
	<header class="hero paragraph-text">
		<div>
			<h1>loaf-web test page</h1>
			<p>the web in a cozy bread basket</p>
		</div>
		<Tags tags={[{ name: 'Svelte 5' }, { name: 'responsive' }, { name: 'interactive' }]} />
	</header>

	<section class="gallery-section">
		<div class="section-heading paragraph-text">
			<h2>Cards</h2>
			<p>Variants, interactions, and custom slotted content.</p>
		</div>
		<div class="card-grid">
			{#each cardVariants as card}
				<Card
					variant={card.variant}
					name={`${card.variant[0].toUpperCase()}${card.variant.slice(1)} card`}
					description={card.description}
					tiny="Interactive card"
					onclick={() => (cardClicks += 1)}
					banner="/"
				>
					<span class="subtext">Click count: {cardClicks}</span>
				</Card>
			{/each}
		</div>
		<div class="paragraph-text">
			<h3>Make cards your own</h3>
			<p>Cards can contain any slotted content, including images, videos, and even other cards.</p>
		</div>
		<Card variant="bordered" pad={false} onclick={() => (episodePlaying = !episodePlaying)}>
			<div class="episode-card">
				<img
					class="episode-card__artwork"
					src="/illustrations/wallpapersden.com_one-piece-4k-elbaf-arc-keyart_3840x2400.jpg"
					alt="The Straw Hat Pirates in Elbaph"
				/>
				<div class="episode-card__shade"></div>
				<div class="episode-card__content">
					<div class="episode-card__eyebrow">
						<span>One Piece</span>
						<span aria-hidden="true">•</span>
						<span>Elbaph Arc</span>
					</div>
					<h4>The Long-Sought Elbaph! The Big Reunion Banquet</h4>
					<p class="episode-card__meta">
						Episode 1156&nbsp; • &nbsp;Season 22, Episode 1&nbsp; • &nbsp;23 min&nbsp; • &nbsp;Apr
						5, 2026
					</p>
					<p class="episode-card__summary">
						The Straw Hats and Giant Warrior Pirates celebrate their reunion as they finally set
						sail for Elbaph—but by morning, the Sunny and six crewmates have vanished.
					</p>
					<span class="episode-card__action">
						<PlayIcon aria-hidden="true" />
						{episodePlaying ? 'Playing episode' : 'Watch episode'}
					</span>
				</div>
			</div>
		</Card>

		<Card
			variant="elevated"
			name="Link Card with a banner"
			url="https://github.com/ciabidev/loaf-web"
			urlshort="github.com/ciabidev/loaf-web"
			description="Cards can still render the existing URL and project metadata layout."
			img="/favicon/favicon-96x96.png"
			banner="/illustrations/wallpapersden.com_one-piece-4k-elbaf-arc-keyart_3840x2400.jpg"
		>
			<div class="actions">
				<button class="button button--primary">Primary action</button>
				<button>Secondary action</button>
			</div>
		</Card>
	</section>

	<section class="gallery-section">
		<div class="section-heading paragraph-text">
			<h2>Buttons and links</h2>
		</div>
		<div class="component-row">
			<button>Default</button>
			<button class="button--primary">Primary</button>
			<button class="button--loaf-success">Success</button>
			<button class="button--danger">Danger</button>
			<button class="button--loaf-elevated">Elevated</button>
			<button disabled>Disabled</button>
			<a class="button button--link" href="#inputs">Link button</a>
		</div>
		<div class="effect-samples">
			<div class="effect-samples__item effect-samples__item--border">Border only</div>
			<div class="effect-samples__item effect-samples__item--shadow">Shadow only</div>
			<div class="effect-samples__item effect-samples__item--both">Border and shadow</div>
		</div>
		<div class="component-row">
			<URLButton
				url="https://github.com/ciabidev/loaf-web"
				urlshort="github.com/ciabidev/loaf-web"
				name="Loaf web"
				img="/favicon/favicon-96x96.png"
			/>
			<Contact Icon={LinkIcon} href="https://github.com/ciabidev/loaf-web" />
		</div>
	</section>

	<section class="gallery-section" id="inputs">
		<div class="section-heading paragraph-text">
			<h2>Inputs and controls</h2>
			<p>text entry, segmented controls, and toggle states.</p>
		</div>
		<div class="stack">
			<FormField
				label="Text input"
				id="gallery-text-input"
				hint="Includes an icon and reactive description."
				long={false}
				required={true}
				value={textInput}
			>
				<Input
					id="gallery-text-input"
					placeholder="Type something"
					Icon={SearchIcon}
					bind:value={textInput}
					description={textInput ? `Current value: ${textInput}` : null}
				/>
			</FormField>

			<Input placeholder="Enter markdownhere" long bind:value={longInput} />
			<h3 class="paragraph-text">see live markdown rendering below!</h3>
			<Markdown source={longInput} />
			<Switcher description="Content-width segmented control">
				<button class:active={activeSegment === 0} onclick={() => (activeSegment = 0)}>First</button
				>
				<button class:active={activeSegment === 1} onclick={() => (activeSegment = 1)}
					>Second</button
				>
				<button class:active={activeSegment === 2} onclick={() => (activeSegment = 2)}>Third</button
				>
			</Switcher>

			<Switcher full description="Full-width segmented control">
				<button class:active={fullActiveSegment === 0} onclick={() => (fullActiveSegment = 0)}
					>Alpha</button
				>
				<button class:active={fullActiveSegment === 1} onclick={() => (fullActiveSegment = 1)}
					>Beta</button
				>
				<button class:active={fullActiveSegment === 2} onclick={() => (fullActiveSegment = 2)}
					>Gamma</button
				>
			</Switcher>

			<Selector
				title="Selector"
				options={[
					{ value: 'first', text: 'First option' },
					{ value: 'second', text: 'Second option' },
					{ value: 'third', text: 'Third option' }
				]}
				bind:selected={selectedOption}
			/>
			<Selector
				title="Compact selector"
				full={false}
				options={[
					{ value: 'first', text: 'First option' },
					{ value: 'second', text: 'Second option' },
					{ value: 'third', text: 'Third option' }
				]}
				bind:selected={selectedOption}
			/>
			<div class="component-row">
				<Toggle
					enabled={toggleEnabled}
					onClick={() => {
						toggleEnabled = !toggleEnabled;
					}}
				/>
				<Toggle
					title="Labeled toggle"
					enabled={toggleEnabled}
					onClick={() => {
						toggleEnabled = !toggleEnabled;
					}}
				/>
				<Toggle
					title="Locked toggle"
					enabled={lockedToggle}
					locked
					onClick={() => {
						lockedToggle = !lockedToggle;
					}}
				/>
			</div>
			<Toggle
				title="Full-width toggle"
				enabled={toggleEnabled}
				full
				onClick={() => {
					toggleEnabled = !toggleEnabled;
				}}
			/>
		</div>
	</section>

	<section class="gallery-section">
		<div class="section-heading paragraph-text">
			<h2>Dialogs and popovers</h2>
			<p>Overlay entry points and inline expanded/collapsed states.</p>
		</div>
		<div class="component-row">
			<button onclick={openSmallDialog}>Open small dialog</button>
			<button onclick={openPickerDialog}>Open picker dialog</button>
			<button onclick={() => (popoverVisible = !popoverVisible)}>
				{popoverVisible ? 'Close popover' : 'Open popover'}
			</button>
		</div>
		<div class="popover-stage">
			<Popover
				id="gallery-popover"
				expanded={popoverVisible}
				title="Popover"
				description="Popovers can hold arbitrary content."
			>
				<button class="button--primary">Popover action</button>
			</Popover>
		</div>
	</section>

	<section class="gallery-section">
		<div class="section-heading paragraph-text">
			<h2>Content</h2>
			<p>
				Tags, rich text, code, images, and a carousel that keeps its active item within the rail.
			</p>
		</div>
		<Tags
			tags={[
				{ name: 'default' },
				{ name: 'light pastel', color: '#f9e2af' },
				{ name: 'dark plum', color: '#31243d' },
				{ name: 'accent', color: 'var(--loaf-accent)' },
				{ name: 'custom text', color: '#89b4fa', textColor: '#1e1e2e' }
			]}
		/>
		<p class="subtext">Tag labels choose readable text from their own background color.</p>

		<div class="emotion-row">
			<Emoticon emotion="happy" size="small" />
			<Emoticon emotion="confused" size="small" />
			<Emoticon emotion="unamused" size="small" />
		</div>

		<Profile name="Loaf" src="/favicon/favicon-96x96.png" />

		<Markdown
			source={'## Markdown example\nThis component renders **formatted text**, links, and lists.\n- One\n- Two\n- Three\n\nSpacing stays consistent after a list, too.'}
		/>

		<Codeblock
			title="card-example.svelte"
			language="svelte"
			code={'<Card variant="elevated" onclick={() => console.log("clicked")} >\n  Hello from a card\n</Card>'}
		/>

		<Carousel id="gallery-carousel" items={flavorItems} />
	</section>

	<section class="gallery-section">
		<div class="section-heading paragraph-text">
			<h2>Navigation</h2>
		</div>
		<div class="nav-previews">
			<div class="horizontal-nav-preview">
				<Navbar test position="bottom">
					<NavTab name="Gallery" Icon={GridIcon} path="/" active />
					<NavTab name="Test route" Icon={LinkIcon} path="/test2" />
					<NavTab name="A very long test route" Icon={LinkIcon} path="/test3" />
				</Navbar>
			</div>
			<div class="vertical-nav-preview">
				<Navbar test position="left">
					<NavbarLogo src="/icons/biology.jpg" alt="Ciabi logo" />
					<NavTab name="Gallery" Icon={GridIcon} path="/" active />
					<NavTab name="Test route" Icon={LinkIcon} path="/test2" />
					<NavTab name="A very long test route" Icon={LinkIcon} path="/test3" />
				</Navbar>
			</div>
		</div>

		<div class="section-heading paragraph-text">
			<h3>Responsive side positions</h3>
			<p>Resize below 600px to see each side navbar move to its named top or bottom edge.</p>
		</div>
		<div class="responsive-nav-grid">
			{#each responsiveNavbarPositions as position}
				<div class="responsive-nav-example">
					<code>{position}</code>
					<div class="responsive-nav-preview">
						<Navbar test {position}>
							<NavTab name="Gallery" Icon={GridIcon} path="/" active />
							<NavTab name="Test route" Icon={LinkIcon} path="/test2" />
						</Navbar>
					</div>
				</div>
			{/each}
		</div>
	</section>
</PageContainer>

<style>
	.hero,
	.gallery-section,
	.section-heading,
	.stack {
		display: flex;
		flex-direction: column;
	}

	.gallery-section {
		gap: 1rem;
		padding-block: 0.5rem 1.5rem;
		border-bottom: 0.0625rem solid var(--loaf-button-stroke);
	}

	.section-heading {
		gap: 0.25rem;
	}

	.selector-edge-example {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-end;
		gap: 0.5rem;
		min-height: 12rem;
	}

	.card-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr));
		gap: 1rem;
	}

	.episode-card {
		position: relative;
		display: block;
		width: 100%;
		min-height: clamp(28rem, 58vw, 40rem);
		overflow: hidden;
		padding: 0;
		border: 0;
		border-radius: calc(var(--loaf-radius-lg) - 0.1875rem);
		background: #07131c;
		color: #fff;
		text-align: left;
		isolation: isolate;
	}

	.episode-card__artwork,
	.episode-card__shade {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}

	.episode-card__artwork {
		object-fit: cover;
		object-position: center 34%;
		transition: transform 0.45s ease;
	}

	.episode-card__shade {
		background: linear-gradient(
			to bottom,
			transparent 42%,
			rgb(4 10 16 / 0.2) 56%,
			rgb(4 10 16 / 0.92) 78%,
			#040a10 100%
		);
		pointer-events: none;
	}

	.episode-card__content {
		position: absolute;
		z-index: 1;
		inset: auto 0 0;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.65rem;
		padding: clamp(1.25rem, 4vw, 2.25rem);
	}

	.episode-card__eyebrow,
	.episode-card__meta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
		margin: 0;
		color: rgb(255 255 255 / 0.76);
		font-size: 0.78rem;
		font-weight: 600;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.episode-card h4 {
		max-width: 44rem;
		margin: 0;
		font-size: clamp(1.4rem, 4vw, 2.35rem);
		line-height: 1.08;
		text-wrap: balance;
	}

	.episode-card__meta {
		letter-spacing: 0;
		text-transform: none;
	}

	.episode-card__summary {
		max-width: 48rem;
		margin: 0;
		color: rgb(255 255 255 / 0.86);
		font-size: 0.92rem;
		line-height: 1.5;
	}

	.episode-card__action {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		margin-top: 0.2rem;
		padding: 0.6rem 0.85rem;
		border-radius: var(--loaf-radius-md);
		background: rgb(255 255 255 / 0.94);
		color: #07131c;
		font-size: 0.875rem;
		font-weight: 700;
	}

	.episode-card__action :global(svg) {
		width: 1.05rem;
		height: 1.05rem;
	}

	.episode-card:hover .episode-card__artwork {
		transform: scale(1.02);
	}

	.component-row,
	.actions,
	.emotion-row,
	.nav-previews {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.75rem;
	}

	.effect-samples {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 10rem), 1fr));
		gap: 0.75rem;
		width: 100%;
	}

	.effect-samples__item {
		padding: 1rem;
		border-radius: var(--loaf-radius-md);
		background: var(--loaf-button-default);
	}

	.effect-samples__item--border,
	.effect-samples__item--both {
		border: 0.0625rem solid var(--loaf-button-stroke);
	}

	.effect-samples__item--shadow,
	.effect-samples__item--both {
		box-shadow: var(--loaf-button-box-shadow);
	}

	.stack {
		gap: 1rem;
	}

	.popover-stage {
		min-height: 9rem;
	}

	.emotion-row :global(.emotion) {
		width: clamp(4rem, 15vw, 8rem);
		height: clamp(4rem, 15vw, 8rem);
	}

	.nav-previews {
		align-items: stretch;
	}

	.horizontal-nav-preview,
	.vertical-nav-preview {
		overflow: hidden;
		border: 0.0625rem solid var(--loaf-button-stroke);
		border-radius: var(--loaf-radius-md);
		background: var(--loaf-nav-bg);
	}

	.horizontal-nav-preview {
		width: min(100%, 30rem);
		height: var(--loaf-navbar-height);
	}

	.vertical-nav-preview {
		width: calc(var(--loaf-navbar-width) + var(--loaf-navbar-inner-padding) * 2);
		height: 22rem;
	}

	.responsive-nav-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr));
		gap: 0.75rem;
		width: 100%;
	}

	.responsive-nav-example {
		display: flex;
		flex-direction: column;
		gap: 0.375rem;
	}

	.responsive-nav-preview {
		position: relative;
		height: 15rem;
		overflow: hidden;
		border: 0.0625rem solid var(--loaf-button-stroke);
		border-radius: var(--loaf-radius-md);
		background: var(--loaf-surface);
	}

	.responsive-nav-preview :global(.navbar.test) {
		position: absolute;
	}

	@media only screen and (max-width: 37.5rem) {
		.episode-card {
			min-height: 34rem;
		}

		.episode-card__summary {
			display: -webkit-box;
			overflow: hidden;
			line-clamp: 3;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 3;
		}

		.component-row,
		.actions {
			align-items: stretch;
			flex-direction: column;
		}

		.component-row > :global(*),
		.actions > :global(*) {
			width: 100%;
		}
	}
</style>
