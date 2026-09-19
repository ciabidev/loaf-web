<script lang="ts">
	import Switcher from '$components/inputs-and-buttons/Switcher.svelte';
	import Input from '$components/inputs-and-buttons/Input.svelte';
	import ProjectCard from '$components/misc/ProjectCard.svelte';
	import { createDialog } from '$lib/state/dialogs';
	import PageContainer from '$components/misc/PageContainer.svelte';
	import Codeblock from '$components/misc/Codeblock.svelte';
	import Navbar from '$components/nav/Navbar.svelte';
	import Tags from '$components/misc/Tags.svelte';
	let testInput = $state('');
	let active1 = $state(0);
	let active2 = $state(0);
	let toggleEnabled = $state(false);
	let selected = $state('five');
	import Toggle from '$components/inputs-and-buttons/Toggle.svelte';
	import Selector from '$components/inputs-and-buttons/Selector.svelte';
	import CarouselContainer from '$components/inputs-and-buttons/CarouselContainer.svelte';
	import PopoverContainer from '$components/misc/PopoverContainer.svelte';
	import { flavors } from '$lib/state/flavor-registry';
	// import NavTab from '$components/nav/NavTab.svelte';
	// import MacroIcon from '~icons/streamline-flex/toaster-remix';

	const flavor_items = Array.from(flavors, ([name, definition]) => ({
		title: name,
		description: definition.description,
		image: definition.iconPath
	}));

	let inf_dialog_1 = () => {
		createDialog({
			id: 'inf-dialog',
			type: 'small',
			bodyText: 'this is an infinite dialog, it will never close!',
			emoticon: 'sad',
			buttons: [
				{
					text: 'Continue',
					main: true,
					action: () => {
						inf_dialog_2();
					}
				}
			]
		});
	};

	let inf_dialog_2 = () => {
		createDialog({
			id: 'inf-dialog-2',
			type: 'small',
			bodyText: 'this is an infinite dialog, it will never close!',
			emoticon: 'sad',
			buttons: [
				{
					text: 'Continue',
					main: true,
					action: () => {
						inf_dialog_1();
					}
				}
			]
		});
	};

	let popovervisible = $state(false);
</script>

<!--bottom navbar-->
<!--acts as a "body" excluding the navbar -->
<!-- Page metadata for discord embed. This is a guide to AO Challenger and a list of all commands. The title is About AO Challenger-->

<PageContainer containerId="test-page-container" pageId="test-page">
	<section id="test-hero" class="paragraph-text">
		<h1>Loaf-web Test Page</h1>
		<p class="paragraph-text">the web in a cozy bread basket</p>
	</section>
	<h1>Components</h1>
	<section id="test-dialog">
		<button onclick={inf_dialog_1}>test small dialog</button>
	</section>
	<section id="test-picker-dialog">
		<button
			onclick={() =>
				createDialog({
					id: 'picker-dialog',
					type: 'picker',
					items: [
						{ type: 'photo', url: '/emotions/surprised.png' },
						{ type: 'photo', url: '/emotions/unamused.png' },
						{ type: 'photo', url: '/emotions/confused.png' },
						{ type: 'photo', url: '/emotions/angry.png' },
						{ type: 'photo', url: '/emotions/sad.png' },
						{ type: 'photo', url: '/emotions/awkward.png' },
						{ type: 'photo', url: '/emotions/happy.png' },
						{ type: 'photo', url: '/favicon/favicon-96x96.png', text: 'test' }
					],
					buttons: [{ text: 'Continue', main: true, action: () => {} }],
					onSelect: (item) => {
						console.log('Selected item:', item);
						createDialog({
							id: 'selected-item',
							type: 'small',
							title: item.text ?? item.url,
							bodyText: '',
							buttons: [
								{
									text: 'continue',
									main: true,
									action: () => {}
								}
							]
						});
					}
				})}>test picker Dialog</button
		>
	</section>
	<section id="test-project-card">
		<ProjectCard
			name="Test Project"
			url="https://github.com/wheatwhole/cyclone"
			urlshort="github.com/wheatwhole/cyclone"
			description="This is a test project card"
		>
			<div class="actions">
				<button class="button button--primary">Test </button>
			</div>
		</ProjectCard>
	</section>
	<section id="test-switcher--defualt">
		<Switcher>
			<button class:active={active1 === 0} onclick={() => (active1 = 0)}>six</button>
			<button class:active={active1 === 1} onclick={() => (active1 = 1)}>seven</button>
		</Switcher>
	</section>
	<section id="test-switcher--big">
		<Switcher description="This is a description on a big switcher!" full>
			<button class:active={active2 === 0} onclick={() => (active2 = 0)}>eight</button>
			<button class:active={active2 === 1} onclick={() => (active2 = 1)}>nine</button>
			<button class:active={active2 === 2} onclick={() => (active2 = 2)}
				>ten</button
			>
		</Switcher>
	</section>
	<section id="test-input">
		<Input
			placeholder="test input with description"
			bind:value={testInput}
			description={'your input is: ' + testInput}
		/>
	</section>
	<section id="code-block">
		<Codeblock code={"console.log('hello world')"} language="js" />
	</section>

	<section id="carousel">
		<CarouselContainer id="flavor-picker-carousel" items={flavor_items}></CarouselContainer>
	</section>
	<section id="popover">
		<button onclick={() => (popovervisible = !popovervisible)}>
			{popovervisible ? 'hide' : 'show'}
		</button>
		<PopoverContainer id="test-popover" expanded={popovervisible}>hey</PopoverContainer>
	</section>
	<section id="toggle">
		<Toggle
			enabled={toggleEnabled}
			onClick={() => {
				toggleEnabled = !toggleEnabled;
			}}
		/>
	</section>
	<section id="full-toggle">
		<Toggle
			title="Full Toggle"
			enabled={toggleEnabled}
			onClick={() => {
				toggleEnabled = !toggleEnabled;
			}}
		/>
	</section>
	<section id="selector">
		<Selector
			title="Selector"
			options={[
				{ value: 'one', text: 'One' },
				{ value: 'two', text: 'Two' },
				{ value: 'three', text: 'Three' },
				{ value: 'four', text: 'Four' },
				{ value: 'five', text: 'Five' },
				{ value: 'six', text: 'Six' },
				{ value: 'seven', text: 'Seven' },
				{ value: 'eight', text: 'Eight' },
				{ value: 'nine', text: 'Nine' },
				{ value: 'ten', text: 'Ten' }
			]}
			{selected}
			onSelect={(value) => {
				selected = value;
			}}
		/>
	</section>
	<section id="tags">
		<Tags
			tags={[
				{ name: 'tag1', description: 'this is a tag' },
				{ name: 'tag2', description: 'this is a tag' },
				{ name: 'tag3', description: 'this is a tag' },
				{ name: 'tag4', description: 'this is a tag' },
				{ name: 'tag5', description: 'this is a tag' },
				{ name: 'tag6', description: 'this is a tag' },
				{ name: 'tag7', description: 'this is a tag' },
				{ name: 'tag8', description: 'this is a tag' },
				{ name: 'tag9', description: 'this is a tag' },
				{ name: 'tag10', description: 'this is a tag' }
			]}
		/>
	</section>
	<section id="navbar" style="height: 80px;">
		<!-- <Navbar test={true}>
			<NavTab name={'test'} Icon={MacroIcon} path={'/'} layout={'horizontal'} iconColor={'red'} />
			<NavTab name={'404'} Icon={MacroIcon} path={'/404'} iconColor={'red'} />
			<Toggle
				title="Full Toggle"
				enabled={toggleEnabled}
				onClick={() => {
					toggleEnabled = !toggleEnabled;
				}}
			/>
			<Switcher>
				<button class:active={active1 === 0} onclick={() => (active1 = 0)}>six</button>
				<button class:active={active1 === 1} onclick={() => (active1 = 1)}>seven</button>
			</Switcher>
		</Navbar> -->
	</section>
</PageContainer>

<style>
</style>
