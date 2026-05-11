<script>
    import { onMount } from 'svelte';

    let darkMode = $state(false);

    onMount(() => {
        darkMode = localStorage.getItem('darkMode') === 'true';
        document.documentElement.classList.toggle('dark', darkMode);
    });

    function toggleDark() {
        darkMode = !darkMode;
        localStorage.setItem('darkMode', String(darkMode));
        document.documentElement.classList.toggle('dark', darkMode);
    }
</script>

<button onclick={toggleDark}>
    {darkMode ? 'Thème sombre' : 'Thème clair'}
</button>

<style>
    button {
        padding: 5px;
        border: 1px solid var(--color-background-modify-button);
        border-radius: var(--radius);
        font-size: 14px;
        font-weight: 500;
        color: var(--h1-color);
        text-decoration: none;
        transition:
            background 0.15s,
            color 0.15s;
        text-align: center;
        width: 70%;
        background-color: var(--color-background-modify-button);
    }

    button:hover {
        background: var(--blue-light);
        color: var(--blue);
        cursor: pointer;
    }
</style>
