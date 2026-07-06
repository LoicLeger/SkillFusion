<script lang="ts">
    import { goto } from '$app/navigation';
    import api from '$lib/services/api.service';
    import '../../../../app.css';
    import { browser } from '$app/environment';

    function nav_back() {
        if (browser) window.history.back();
    }

    let errorEmail = $state(false);
    let errorPseudo = $state(false);
    let errorPassword = $state(false);
    let passwordValue = $state('');
    let mailSend = $state(false);

    let hasLower = $derived(/[a-z]/.test(passwordValue));
    let hasUpper = $derived(/[A-Z]/.test(passwordValue));
    let hasSpecial = $derived(/[!@#$%.&*\-+{}?]/.test(passwordValue));
    let hasLength = $derived(passwordValue.length >= 8);

    const onSubmitForm = async (event: SubmitEvent): Promise<void> => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const pseudo = formData.get('pseudo');
        const email = formData.get('email');
        const password = formData.get('password') as string;
        const confirmPassword = formData.get('confirm-password');

        errorPassword = false;
        errorPseudo = false;
        errorEmail = false;

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%.&*\-+{}?]).{8,100}$/;
        if (!passwordRegex.test(password)) {
            errorPassword = true;
            return;
        }

        const response = await api('auth/register', 'POST', {
            pseudo,
            email,
            password,
            confirmPassword
        });

        if (response.status != 201) {
            if (response.data.error == 'Pseudo déjà utilisé') {
                errorPseudo = true;
            }
            if (response.data.error == 'Email déjà utilisé') {
                errorEmail = true;
            }
        } else {
            mailSend = true;
        }
    };
</script>

<div class="register-container">
    <button class="buttonReturn" onclick={nav_back}>{'<-retour'} </button>
    <h1>Inscription</h1>
    <span class="introduction"><p>Rejoins SkillFusion gratuitement</p></span>
    {#if mailSend}
        <div class="divConfirmMessage">
            <p>Un email de confirmation a éte envoyer a votre adresse mail avec un lien</p>
        </div>
    {:else}
        <form class="register-form" onsubmit={onSubmitForm}>
            <label for="pseudo">Pseudo</label>
            <input type="text" id="pseudo" name="pseudo" placeholder="JeanJean" required />
            {#if errorPseudo}
                <p class="error-message">Pseudo déjà utilisé</p>
            {/if}

            <label for="email">E-mail</label>
            <input type="email" id="email" name="email" placeholder="JeanDupont@mail.fr" required />
            {#if errorEmail}
                <p class="error-message">Email déjà utilisé</p>
            {/if}

            <label for="password">Mot de passe</label>
            <input
                type="password"
                id="password"
                name="password"
                placeholder="Mot de passe"
                required
                bind:value={passwordValue}
            />

            <!-- Indicateur de règles -->
            <div class="password-rules">
                <div class="rule" class:rule--ok={hasLength}>
                    <span class="rule__dot"></span>
                    <span>8 caractères minimum</span>
                </div>
                <div class="rule" class:rule--ok={hasLower}>
                    <span class="rule__dot"></span>
                    <span>Une minuscule</span>
                </div>
                <div class="rule" class:rule--ok={hasUpper}>
                    <span class="rule__dot"></span>
                    <span>Une majuscule</span>
                </div>
                <div class="rule" class:rule--ok={hasSpecial}>
                    <span class="rule__dot"></span>
                    <span>Un caractère spécial (!@#$%.&*-+&#123;&#125;?)</span>
                </div>
            </div>

            {#if errorPassword}
                <p class="error-message">Le mot de passe ne respecte pas les règles ci-dessus.</p>
            {/if}

            <label for="confirm-password">Confirmer</label>
            <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                placeholder="Confirmation"
                required
            />

            <button class="btn-register" type="submit">S'inscrire</button>

            <div>
                <p class="already-account">
                    Déjà inscrit ?
                    <a class="btn-login" href="/connexion">Se connecter</a>
                </p>
            </div>
        </form>
    {/if}
</div>

<style>
    :global(body) {
        background-color: #f3f0eaff;
    }

    .already-account {
        text-align: center;
        margin-top: 20px;
    }

    h1 {
        text-align: center;
        margin-bottom: 0px;
        color: #1d4e89;
    }

    .buttonReturn{
        cursor: pointer;
        background-color: #fff;
        border: 1px solid lightgray;
        text-decoration: none;
        border-radius: 5px;
    }

    p {
        margin-top: 5px;
    }

    .introduction {
        text-align: center;
        margin-bottom: 20px;
    }

    .btn-register {
        text-align: center;
        padding: 10px 20px;
        cursor: pointer;
        background-color: orange;
        border-radius: var(--border-radius);
        border: none;
        color: #1d4e89;
        font-weight: bold;
        margin-top: 10px;
    }

    .btn-login {
        text-decoration: none;
        color: #1d4e89;
    }

    .btn-login:hover {
        text-decoration: underline;
    }

    .register-container {
        max-width: 400px;
        margin: 0 auto;
        padding: 20px;
        margin-top: 100px;
    }

    .register-form {
        display: flex;
        flex-direction: column;
        background-color: white;
        padding: 40px;
        border-radius: 20px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .divConfirmMessage
    {
        display: flex;
        flex-direction: column;
        background-color: white;
        padding: 40px;
        border-radius: 20px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .register-form label {
        margin-bottom: 5px;
    }

    .register-form input {
        margin-bottom: 10px;
        padding: 5px;
        border-radius: 10px;
        border: 1px solid lightgray;
    }

    /* ── Indicateur mot de passe ── */
    .password-rules {
        display: flex;
        flex-direction: column;
        gap: 6px;
        margin-bottom: 10px;
        padding: 10px 12px;
        background: var(--background-color);
        border-radius: var(--border-radius);
        border: 1px solid #e5e7eb;
    }

    .rule {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 12px;
        color: #9ca3af;
        transition: color 0.2s;
    }

    .rule--ok {
        color: #27ae60;
    }

    .rule__dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--background-color);
        flex-shrink: 0;
        transition: background 0.2s;
    }

    /* ── Messages erreur ── */
    .error-message {
        color: #dc2626;
        background: #fee2e2;
        border-radius: 8px;
        padding: 8px 12px;
        font-size: 12px;
        margin-bottom: 8px;
    }

    @media (min-width: 1024px) {
        .register-container {
            margin-top: 150px;
        }
    }

    @media (max-width: 768px) {
        .register-container {
            padding: 10px;
        }

        .register-form {
            padding: 20px;
        }

        .introduction {
            display: none;
        }

        h1 {
            margin-bottom: 20px;
        }
    }
</style>
