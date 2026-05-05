<script>
	import DeleteButton from "../../Button/DeleteButton.svelte";
	import ModifyButton from "../../Button/ModifyButton.svelte";

    const { children } = $props();
</script>

<article class="article_dashboard">
        {@render children()}
    <div class="article_dashboard--div_button">
        <ModifyButton/>
		<DeleteButton/>
    </div>
</article>

<style>
    .article_dashboard{
        display: flex;
        background-color: var(--background-color);
    }

    .article_dashboard--div_button{
        margin-left: auto;
        margin-right: 10px;
        margin-top: auto;
        margin-bottom: auto;
    }

</style>