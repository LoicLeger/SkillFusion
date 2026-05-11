<script lang="ts">
    import { goto } from '$app/navigation';
    import api from '$lib/services/api.service';
    import { setAuth } from '$lib/services/localstorage.service.svelte';

    let errorMessage = $state('');

    const onSubmitForm = async (event: SubmitEvent): Promise<void> => {
        errorMessage = '';
        const formData = new FormData(event.target as HTMLFormElement);
        const email = formData.get('email');
        const password = formData.get('password');
        const token = await api('auth/login', 'POST', { email, password });

        if (!token?.data?.accessToken) {
            errorMessage = 'Email ou mot de passe incorrect.';

            setTimeout(() => {
                errorMessage = '';
            }, 5000);

            return;
        }

        setAuth(token.data.user, token.data.accessToken.token);
        goto('/');
    };
</script>

<!-- Composant de connexion -->
<div class="connection-container">
    <h1>Connexion</h1>
    <span class="introduction"><p>Content de te revoir !</p></span>
    <form class="connection-form" onsubmit={onSubmitForm}>
        {#if errorMessage}
            <p class="msg-error">{errorMessage}</p>
        {/if}
        <label for="email">Identifiant</label>
        <input type="email" id="email" name="email" placeholder="Email ou pseudo" required />

        <label for="password">Mot de passe</label>
        <input type="password" id="password" name="password" placeholder="••••••••" />

        <button class="btn-connection" type="submit">Se connecter</button>
        <div>
            <p class="not-acompte">
                <span class="desktop-text">Pas encore de compte ?</span>
                <span class="mobile-text">Pas de compte ?</span>
                <a class="btn-register" href="/inscription">S'inscrire</a>
                <span class="reset-password">
                    <a class="btn-reset-password" href="/reinitialiser-mdp">Mot de passe oublié ?</a
                    >
                </span>
            </p>
        </div>
    </form>
</div>

<style>
    :global(body) {
        background-color: #f3f0eaff;
    }

    .not-acompte {
        text-align: center;
        margin-top: 20px;
    }

    h1 {
        text-align: center;
        color: #1d4e89;
        margin-bottom: 0px;
    }

    p {
        margin-top: 5px;
    }

    .introduction {
        text-align: center;
        margin-bottom: 20px;
    }

    .btn-connection {
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

    .btn-register {
        text-decoration: none;
        color: #1d4e89;
    }

    .btn-register:hover {
        text-decoration: underline;
    }

    .connection-container {
        max-width: 400px;
        margin: 0 auto;
        padding: 20px;
        margin-top: 100px;
    }

    .connection-form {
        display: flex;
        flex-direction: column;
        background-color: white;
        padding: 40px;
        border-radius: 20px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .connection-form label {
        margin-bottom: 5px;
    }

    .connection-form input {
        margin-bottom: 10px;
        padding: 5px;
        border-radius: 10px;
        border: 1px solid lightgray;
    }

    .reset-password {
        display: block;
        text-align: center;
        margin-top: 10px;
    }

    .btn-reset-password {
        text-decoration: none;
        color: #1d4e89;
    }

    .msg-error {
        background: #fee2e2;
        color: #dc2626;
        border-radius: 8px;
        padding: 10px 14px;
        font-size: 0.875rem;
        margin-bottom: 10px;
        text-align: center;
    }

    @media (min-width: 1024px) {
        .connection-container {
            margin-top: 150px;
        }
        .mobile-text {
            display: none;
        }
    }

    @media (max-width: 768px) {
        .connection-container {
            padding: 10px;
        }

        .connection-form {
            padding: 20px;
        }

        .introduction {
            display: none;
        }
        h1 {
            margin-bottom: 50px;
        }
        .desktop-text {
            display: none;
        }
    }

    @media (min-width: 768px) and (max-width: 1024px) {
        .mobile-text {
            display: none;
        }
    }
</style>
