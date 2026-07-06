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
        gap: 10px;
        width: 100%;
        box-sizing: border-box;
    }

    .cours_item--info {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 10px;
    }
    .is_public {
        margin: 0;
    }
    .cours_item--body {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding-left: 0;
        width: 100%;
    }
    p {
        margin: 0;
    }
    .div_category {
        max-width: 100%;
        width: 100%;
    }
</style>
