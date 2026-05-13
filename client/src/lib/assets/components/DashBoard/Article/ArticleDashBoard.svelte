<script>
    import DeleteButton from '../../Button/DeleteButton.svelte';
    import ModifyButton from '../../Button/ModifyButton.svelte';

    const { children, openModifyModal, openDeleteModal } = $props();
</script>

<article class="article_dashboard">
    {@render children()}
    <div class="article_dashboard--div_button">
        <ModifyButton onclick={openModifyModal} />
        <DeleteButton onclick={openDeleteModal} />
    </div>
</article>

<style>
    .article_dashboard {
        display: flex;
        flex-direction: column;
        width: 100%;
        background-color: var(--background-color);
        gap: 12px;
        box-sizing: border-box;
    }

    .article_dashboard--div_button {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 10px;
        width: 100%;
        margin: 0;
    }

    @media (min-width: 768px) {
        .article_dashboard {
            flex-direction: row;
            align-items: center;
        }

        .article_dashboard--div_button {
            width: auto;
            margin-left: auto;
            margin-right: 10px;
        }
    }
</style>
