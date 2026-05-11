<script>
    import '../../app.css';

    let email = $state('');
    let message = $state('');
    let error = $state('');

    async function handleSubmit(e) {
        e.preventDefault();
        message = '';
        error = '';

        const res = await fetch('http://localhost:3000/auth/forgot-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
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
    <title>Réinitialiser le mot de passe</title>
</svelte:head>

<!-- Page de réinitialisation du mot de passe -->
<div class="reset-password-container">
    <h1>Réinitialiser votre mot de passe</h1>

    <form class="reset-password-form" onsubmit={handleSubmit}>
        {#if message}
            <p style="color:green;">{message}</p>
        {/if}
        {#if error}
            <p style="color:red;">{error}</p>
        {/if}
        <p class="introduction">
            Entrez votre adresse e-mail pour recevoir un lien de réinitialisation de mot de passe.
        </p>
        <div class="form-group">
            <input type="email" bind:value={email} placeholder="Votre adresse e-mail" required />
        </div>
        <div class="form-group">
            <button type="submit" class="btn-reset-password"
                >Envoyer le lien de réinitialisation</button
            >
        </div>
    </form>
</div>

<style>
    :global(body) {
        background-color: #f3f0eaff;
    }

    h1 {
        text-align: center;
        color: var(--h1-color);
        margin-bottom: 20px;
    }
    .introduction {
        margin-bottom: 20px;
        margin-top: 0;
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
        background-color: white;
        padding: 40px;
        border-radius: 20px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .reset-password-form input {
        margin-bottom: 10px;
        padding: 5px;
        border-radius: 10px;
        border: 1px solid lightgray;
    }

    .btn-reset-password {
        text-align: center;
        padding: 10px;
        cursor: pointer;
        background-color: #1d4e89;
        border-radius: 10px;
        border: none;
        color: white;
        font-weight: bold;
        margin-top: 10px;
    }
</style>
