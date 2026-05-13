<script>
    import Category from '../../Category/Category.svelte';

    const { category } = $props();
</script>

<div class="category_item">
    <Category
        {category}
        --text_color={category.textColor}
        --border_color={category.borderColor}
        --background_color={category.backgroundColor}
    />
</div>

<style>
    .category_item {
        display: flex;
        padding: 10px;
        width: 100%;
        box-sizing: border-box;
    }
</style>
