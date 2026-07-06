<script>
    let props = $props();
</script>

<div class="card-category">
    {props.category.name}
</div>

<style>
    .card-category {
        color: var(--text_color);
        font-size: 10px;
        font-family: 'DM Sans', sans-serif;
        font-weight: 500;
        border: 1px solid var(--border_color);
        border-radius: 20px;
        padding: 5px 15px;
        background-color: var(--background_color);
        align-items: flex-end;
    }
</style>
