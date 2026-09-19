<script lang="ts">
	import SearchIcon from '~icons/tabler/search';
	import GridIcon from '~icons/tabler/layout-grid';
	import LinkIcon from '~icons/tabler/link';

	import CarouselContainer from '$components/inputs-and-buttons/CarouselContainer.svelte';
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
	import PopoverContainer from '$components/misc/PopoverContainer.svelte';
	import Tags from '$components/misc/Tags.svelte';
	import Navbar from '$components/nav/Navbar.svelte';
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
	let toggleEnabled = $state(false);
	let lockedToggle = $state(false);
	let popoverVisible = $state(false);
	let cardClicks = $state(0);

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
			<h1>Loaf component gallery</h1>
			<p>Every reusable component and state should get an example here when it is introduced.</p>
		</div>
		<Tags
			tags={[
				{ name: 'Svelte 5', color: 'var(--button-default)' },
				{ name: 'responsive', color: 'var(--button-default)' },
				{ name: 'interactive', color: 'var(--button-default)' }
			]}
		/>
	</header>

	<section class="gallery-section">
		<div class="section-heading">
			<h2>Cards</h2>
			<p>every example is clickable</p>
		</div>
		<div class="card-grid">
			{#each cardVariants as card}
				<Card
					variant={card.variant}
					name={`${card.variant[0].toUpperCase()}${card.variant.slice(1)} card`}
					description={card.description}
					tiny="Interactive card"
					onclick={() => (cardClicks += 1)}
				>
					<span class="subtext">Click count: {cardClicks}</span>
				</Card>
			{/each}
		</div>

		<Card
			variant="elevated"
			name="Project-style card"
			url="https://github.com/ciabidev/loaf-web"
			urlshort="github.com/ciabidev/loaf-web"
			description="Cards can still render the existing URL and project metadata layout."
			img="/favicon/favicon-96x96.png"
		>
			<div class="actions">
				<button class="button button--primary">Primary action</button>
				<button>Secondary action</button>
			</div>
		</Card>
	</section>

	<section class="gallery-section">
		<div class="section-heading">
			<h2>Buttons and links</h2>
			<p>Global button treatments and the URL button component.</p>
		</div>
		<div class="component-row">
			<button>Default</button>
			<button class="button--primary">Primary</button>
			<button class="button--success">Success</button>
			<button class="button--danger">Danger</button>
			<button class="button--elevated">Elevated</button>
			<button disabled>Disabled</button>
			<a class="button button--link" href="#inputs">Link button</a>
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
		<div class="section-heading">
			<h2>Inputs and controls</h2>
			<p>Text entry, segmented controls, and toggle states.</p>
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

			<Input placeholder="Long-form input" long bind:value={longInput} />

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
		<div class="section-heading">
			<h2>Dialogs and popovers</h2>
			<p>Overlay entry points and inline expanded/collapsed states.</p>
			<p class="subtext">Hover and open these controls to verify the outer loaf corners keep the navbar color.</p>
		</div>
		<div class="component-row">
			<button onclick={openSmallDialog}>Open small dialog</button>
			<button onclick={openPickerDialog}>Open picker dialog</button>
			<button onclick={() => (popoverVisible = !popoverVisible)}>
				{popoverVisible ? 'Close popover' : 'Open popover'}
			</button>
		</div>
		<div class="popover-stage">
			<PopoverContainer
				id="gallery-popover"
				expanded={popoverVisible}
				title="Popover"
				description="Popovers can hold arbitrary content."
			>
				<button class="button--primary">Popover action</button>
			</PopoverContainer>
		</div>
	</section>

	<section class="gallery-section">
		<div class="section-heading">
			<h2>Content</h2>
			<p>Tags, rich text, code, images, and carousel content.</p>
		</div>
		<Tags
			tags={[
				{ name: 'default' },
				{ name: 'accent', color: 'var(--main-color)' },
				{ name: 'success', color: 'var(--color-success)' },
				{ name: 'warning', color: 'var(--color-warning)' },
				{ name: 'error', color: 'var(--color-error)' }
			]}
		/>

		<div class="emotion-row">
			<Emoticon emotion="happy" size="small" />
			<Emoticon emotion="confused" size="small" />
			<Emoticon emotion="unamused" size="small" />
		</div>

		<Markdown
			source={'## Markdown example\n\nThis component renders **formatted text**, links, and lists.\n\n- One\n- Two\n- Three'}
		/>

		<Codeblock
			filename="card-example.svelte"
			language="svelte"
			code={'<Card variant="elevated" onclick={() => console.log("clicked")} >\n  Hello from a card\n</Card>'}
		/>

		<CarouselContainer id="gallery-carousel" items={flavorItems} />
	</section>

	<section class="gallery-section">
		<div class="section-heading">
			<h2>Navigation</h2>
			<p>Embedded previews exercise fixed and responsive navbar layouts.</p>
		</div>
		<div class="nav-previews">
			<div class="horizontal-nav-preview">
				<Navbar test position="bottom">
					<NavTab name="Gallery" Icon={GridIcon} path="/" />
					<NavTab name="Test route" Icon={LinkIcon} path="/test2" />
					<NavTab name="A very long test route" Icon={LinkIcon} path="/test3" />
				</Navbar>
			</div>
			<div class="vertical-nav-preview">
				<Navbar test position="left">
					<NavTab name="Gallery" Icon={GridIcon} path="/" />
					<NavTab name="Test route" Icon={LinkIcon} path="/test2" />
					<NavTab name="A very long test route" Icon={LinkIcon} path="/test3" />
				</Navbar>
			</div>
		</div>

		<div class="section-heading">
			<h3>Responsive side positions</h3>
			<p>Resize below 600px to see each side navbar move to its named top or bottom edge.</p>
		</div>
		<div class="responsive-nav-grid">
			{#each responsiveNavbarPositions as position}
				<div class="responsive-nav-example">
					<code>{position}</code>
					<div class="responsive-nav-preview">
						<Navbar test {position}>
							<NavTab name="Gallery" Icon={GridIcon} path="/" />
							<NavTab name="Test route" Icon={LinkIcon} path="/test2" />
						</Navbar>
					</div>
				</div>
			{/each}
		</div>
	</section>

	<section class="gallery-section">
		<div class="section-heading">
			<h2>Dropdown menu</h2>
		</div>
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
		border-bottom: 0.0625rem solid var(--button-stroke);
	}

	.section-heading {
		gap: 0.25rem;
	}

	.card-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr));
		gap: 1rem;
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
		border: 0.0625rem solid var(--button-stroke);
		border-radius: var(--radius-md);
		background: var(--nav-bg);
	}

	.horizontal-nav-preview {
		width: min(100%, 30rem);
		height: var(--navbar-height);
	}

	.vertical-nav-preview {
		width: calc(var(--navbar-width) + var(--navbar-inner-padding) * 2);
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
		border: 0.0625rem solid var(--button-stroke);
		border-radius: var(--radius-md);
		background: var(--bg-color);
	}

	.responsive-nav-preview :global(.navbar.test) {
		position: absolute;
	}

	@media only screen and (max-width: 37.5rem) {
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
