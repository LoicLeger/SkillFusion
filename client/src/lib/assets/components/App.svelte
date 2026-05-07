<script lang="ts">
    let { children } = $props();
</script>

<div class="app">
    {@render children()}
</div>

<style>
    .app {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        background-color: var(--background-color);
    }
</style>
