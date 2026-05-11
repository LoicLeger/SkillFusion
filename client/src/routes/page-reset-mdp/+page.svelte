<script>
    import '../../app.css';
    import { page } from '$app/state';

    let token = $derived(page.url.searchParams.get('token'));
    let password = $state('');
    let confirm = $state('');
    let message = $state('');
    let error = $state('');

    async function handleSubmit(e) {
        e.preventDefault();
        error = '';
        message = '';

        if (password !== confirm) {
            error = 'Les mots de passe ne correspondent pas.';
            return;
        }

        const res = await fetch('http://localhost:3000/auth/reset-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, password })
        });

        const data = await res.json();

        if (res.ok) {
            message = data.message;
        } else {
            error = data.message ?? 'Une erreur est survenue.';
        }
    }
</script>

<svelte:head>
    <title>Réinitialisation du mot de passe</title>
</svelte:head>

<div class="reset-password-container">
    <h1>Nouveau mot de passe</h1>

    <form class="reset-password-form" onsubmit={handleSubmit}>
        <p class="new-password">Entrez votre nouveau mot de passe</p>
        {#if message}
            <p class="msg-success">{message} <a href="/connexion">Se connecter</a></p>
        {/if}
        {#if error}
            <p class="msg-error">{error}</p>
        {/if}

        <div class="form-group">
            <input
                type="password"
                bind:value={password}
                placeholder="Nouveau mot de passe"
                required
            />
        </div>
        <div class="form-group">
            <input
                type="password"
                bind:value={confirm}
                placeholder="Confirmer le mot de passe"
                required
            />
        </div>
        <div class="form-group">
            <button type="submit" class="btn-reset-password">
                Réinitialiser le mot de passe
            </button>
        </div>
    </form>
</div>

<style>
    :global(body) {
        background-color: var(--background-color);
    }

    h1 {
        text-align: center;
        color: var(--h1-color);
        margin-bottom: 20px;
    }

    .reset-password-container {
        max-width: 400px;
        margin: 0 auto;
        padding: 20px;
        margin-top: 100px;
    }

    .reset-password-form {
        display: flex;
        flex-direction: column;
        background-color: var(--background-white);
        padding: 40px;
        border-radius: 20px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .reset-password-form input {
        margin-bottom: 10px;
        padding: 7px;
        border-radius: 10px;
        border: 1px solid lightgray;
    }

    .form-group {
        margin-bottom: 15px;
    }

    .btn-reset-password {
        text-align: center;
        padding: 10px 20px;
        cursor: pointer;
        background-color: #1d4e89;
        border-radius: 10px;
        border: none;
        color: white;
        font-weight: bold;
        margin-top: 10px;
    }

    .msg-success {
        color: green;
    }

    .msg-error {
        color: red;
    }
</style>
