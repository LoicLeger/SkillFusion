<script>
    import { onMount } from 'svelte';

    let message = $state('Vérification en cours...');
    let success = $state(false);
    let loading = $state(true);

    onMount(async () => {
        const token = new URLSearchParams(window.location.search).get('token');

        if (!token) {
            message = 'Token manquant.';
            loading = false;
            return;
        }

        const res = await fetch(`http://localhost:3000/auth/verify-email?token=${token}`);
        const data = await res.json();

        if (res.ok) {
            success = true;
            message = data.message;
        } else {
            message = data.message ?? 'Lien invalide ou expiré.';
        }

        loading = false;
    });
</script>

<svelte:head>
    <title>Vérification de l'email</title>
</svelte:head>

<div class="verify-container">
    {#if loading}
        <p class="loading">Vérification en cours...</p>
    {:else}
        <div class="verify-card">
            {#if success}
                <div class="icon icon--success">✓</div>
                <h1>Email confirmé !</h1>
                <p>{message}</p>
                <a href="/connexion" class="btn-login">Se connecter</a>
            {:else}
                <div class="icon icon--error">✕</div>
                <h1>Erreur</h1>
                <p>{message}</p>
                <a href="/inscription" class="btn-register">Réessayer</a>
            {/if}
        </div>
    {/if}
</div>

<style>
    .verify-container {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #f3f0ea;
        font-family: 'DM Sans', sans-serif;
    }

    .verify-card {
        background: white;
        border-radius: 20px;
        padding: 3rem 4rem;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
        text-align: center;
        max-width: 420px;
        width: 100%;
    }

    .icon {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        font-weight: 700;
        margin: 0 auto 1.5rem;
    }

    .icon--success {
        background: #dcfce7;
        color: #16a34a;
    }

    .icon--error {
        background: #fee2e2;
        color: #dc2626;
    }

    h1 {
        font-size: 1.4rem;
        font-weight: 700;
        color: #1a1a1a;
        margin-bottom: 0.75rem;
    }

    p {
        font-size: 0.9rem;
        color: #6b7280;
        margin-bottom: 1.5rem;
    }

    .loading {
        font-size: 1rem;
        color: #6b7280;
    }

    .btn-login,
    .btn-register {
        display: inline-block;
        padding: 0.7rem 1.5rem;
        border-radius: 10px;
        font-size: 0.9rem;
        font-weight: 600;
        text-decoration: none;
        transition: opacity 0.15s;
    }

    .btn-login {
        background: #1d4e89;
        color: white;
    }

    .btn-register {
        background: #f5a623;
        color: white;
    }

    .btn-login:hover,
    .btn-register:hover {
        opacity: 0.88;
    }
</style>
