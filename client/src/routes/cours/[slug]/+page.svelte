<script>
	import IndexCours from '$lib/assets/components/Cours/IndexCours.svelte';
	import Header from '$lib/assets/components/Header.svelte';
	import Footer from '$lib/assets/components/Footer.svelte';
	import App from '$lib/assets/components/App.svelte';
	import Main from '$lib/assets/components/Main.svelte';
</script>

<App>
	<Header />
	<Main>
		<IndexCours />
	</Main>
	<Footer />
</App>
