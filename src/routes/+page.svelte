<script>
	import URLButton from '$components/inputs-and-buttons/URLButton.svelte';
	import Codeblock from '$components/misc/Codeblock.svelte';
	import UrlButton from '$components/inputs-and-buttons/URLButton.svelte';

	import PageContainer from '$components/misc/PageContainer.svelte';
</script>

<!--bottom navbar-->

<PageContainer>
	<section class="paragraph-text">
		<img src="/illustrations/friedrice.jpg" alt="nutrition" class="full-width" id="fried-rice"/>
		<p>I programmed this entire website in <a href="https://svelte.dev/">Svelte</a></p>
		<section id="links">
			<UrlButton
				urlshort="wheatwhole/nutrition"
				name="the code"
				url="https://github.com/wheatwhole/nutrition"
			></UrlButton>
			<UrlButton
				urlshort="tldraw.com"
				name="ALL of my mindmaps/notes"
				url="https://www.tldraw.com/p/dR-yRLO5ZQTC7pE2BPf7O?d=v-7938.-3974.14944.7818.khy8fefBQIfDpjP5FLmdb"
			></UrlButton>
		</section>
		<h1>nutrition</h1>
		<p>
			Nutrition is the process of obtaining energy and building blocks from food. The food we eat is
			broken down into its constituent elements, which are then used to create energy and build up
			our body.
		</p>
		<h2>diet</h2>
		<p>Your diet is influenced by factors such as light exercise, age, genetics, and goals. For example, an ideal diet for a 120lb 14-15 year old with light exercise goals:</p>
		<ul>
			<li>Protein: 100 g - ~per lb of body weight</li>
			<li>Carbs: 240 g - dont need that much energy for their exercise levels</li>
			<li>Fat: 59 g</li>
			<li>Calories: 1,865 - light exercise</li>
		</ul>

	</section>
</PageContainer>

<style>
	#links {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	#fried-rice {
		height: 400px;
	}
</style>
