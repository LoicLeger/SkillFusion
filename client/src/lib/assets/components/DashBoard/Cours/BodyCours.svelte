<script>
    import Category from '../../Category/Category.svelte';

    const { cours } = $props();
</script>

<div class="cours_item">
    <div class="cours_item--info">
        {#if cours.visibility == true}
            <span class="is_public">🟢</span>
        {:else if cours.visibility == false}
            <span class="is_public">🔴</span>
        {/if}
        <p class="list-row__title">{cours.title}</p>
    </div>
    <div class="cours_item--body">
        <p>{cours.littleSummary}</p>
        <div class="div_category">
            <Category
                category={cours.category}
                --text_color={cours.category.textColor}
                --border_color={cours.category.borderColor}
                --background_color={cours.category.backgroundColor}
            />
        </div>
    </div>
</div>

<style>
    .cours_item {
        display: flex;
        flex-direction: column;
        padding: 10px;
        padding-left: 0px;
        gap: 10px;
    }

    .cours_item--info {
        display: flex;
    }
    .is_public {
        margin: auto 10px;
    }
    .cours_item--body {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding-left: 10px;
    }
    p {
        margin: 0px;
    }
    .div_category {
        max-width: max-content;
    }
</style>
