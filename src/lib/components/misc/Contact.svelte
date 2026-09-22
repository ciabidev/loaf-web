<script>
	let { Icon, href } = $props();
</script>

<a class="contact button" {href} target="_blank">
	<Icon style=" flex-shrink: 0; font-size: 1.1rem" />
</a>

<style>
 .contact {
	display: flex;
	justify-content: center;
	align-items: center;
	vertical-align: center;
	flex-direction: row;
	padding: 0.6rem;
	border-radius: var(--loaf-radius-md);
	background: transparent;
	transition: background 0.2s ease;
	max-width: fit-content;
	box-shadow: var(--loaf-shadow-md);
	user-select: none;
	-webkit-user-select: none; /* Safari / iOS */
	-ms-user-select: none;
 }

 @media (pointer: coarse) {
	.contact {
		min-width: 2.75rem;
		min-height: 2.75rem;
	}
 }

 @media (hover: hover) {
	.contact:hover {
		background: color-mix(in srgb, var(--loaf-text) 6%, transparent);
	}
 }



</style>
