<script lang="ts">
    import Footer from '$lib/assets/components/Footer.svelte';
    import Header from '$lib/assets/components/Header.svelte';

    let status = $state('idle'); // 'idle' | 'success' | 'error'

    const onSubmitForm = async (e: SubmitEvent): Promise<void> => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const data = new FormData(form);

        try {
            const res = await fetch(form.action, {
                method: 'POST',
                body: data,
                headers: { Accept: 'application/json' }
            });

            if (res.ok) {
                status = 'success';
                form.reset();
            } else {
                throw new Error();
            }
        } catch {
            status = 'error';
        }
    };
</script>

<Header />

<main class="contact">
    <h1>Contactez-nous</h1>

    <p>
        Vous avez des questions sur SkillFusion ou besoin d'aide ? N'hésitez pas à nous contacter.
    </p>

    <h2>Coordonnées</h2>
    <div class="contact-info">
        <div class="contact-item">
            <strong>Email :</strong><br />
            <a href="mailto:skillfusion.noreply@gmail.com">skillfusion.noreply@gmail.com</a>
        </div>

        <div class="contact-item">
            <strong>Téléphone :</strong><br />
            01 02 03 04 05
        </div>

        <div class="contact-item">
            <strong>Adresse :</strong><br />
            SkillFusion<br />
            123 Avenue Aurélie F0F<br />
            23754642672 MaxiLearn<br />
            Planète Mars (pas loin après la lune)
        </div>

        <div class="contact-item">
            <strong>Horaires d'ouverture :</strong><br />
            Lundi au vendredi : 0h01 - 0h00<br />
            Samedi et Dimanche: 0h01 - 0h00
        </div>
    </div>

    <h2>Formulaire de contact</h2>
    <p>Pour nous contacter directement, utilisez le formulaire ci-dessous :</p>

    <form
        onsubmit={onSubmitForm}
        class="contact-form"
        action="https://formspree.io/f/mkokynrn"
        method="POST"
        id="contact-form"
    >
        <input type="hidden" name="_next" value="http://localhost:5173/contact" />
        <input
            type="hidden"
            name="_subject"
            value="Nouveau message de contact depuis SkillFusion"
        />

        <div class="form-group">
            <label for="name">Nom :</label>
            <input type="text" id="name" name="name" placeholder="Votre nom" required />
        </div>

        <div class="form-group">
            <label for="email">Email :</label>
            <input type="email" id="email" name="email" placeholder="votre@email.com" required />
        </div>

        <div class="form-group">
            <label for="subject">Sujet :</label>
            <select id="subject" name="subject" required>
                <option value="">Choisissez un sujet</option>
                <option value="support">Support technique</option>
                <option value="cours">Question sur les cours</option>
                <option value="inscription">Problème d'inscription</option>
                <option value="partenariat">Partenariat / Devenir instructeur</option>
                <option value="autre">Autre</option>
            </select>
        </div>

        <div class="form-group">
            <label for="message">Message :</label>
            <textarea id="message" name="message" rows="5" required></textarea>
        </div>

        {#if status === 'success'}
            <p style="color: #6dba8a; font-size:0.88rem;">
                ✅ Message envoyé avec succès ! Nous vous répondrons rapidement.
            </p>
        {:else if status === 'error'}
            <p style="color: #d97a7a; font-size:0.88rem;">
                ❌ Une erreur est survenue. Veuillez réessayer.
            </p>
        {/if}

        <button type="submit" class="submit-btn">Envoyer</button>
    </form>
</main>

<Footer />

<style>
    .contact {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        line-height: 1.6;
    }

    h1 {
        text-align: center;
        margin-bottom: 30px;
    }

    h2 {
        margin-top: 30px;
        margin-bottom: 20px;
        color: #333;
    }

    .contact-info {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
        margin-bottom: 30px;
    }

    .contact-item {
        background-color: #f8f9fa;
        padding: 15px;
        border-radius: 5px;
    }

    .contact-form {
        background-color: #f8f9fa;
        padding: 20px;
        border-radius: 5px;
    }

    .form-group {
        margin-bottom: 15px;
    }

    label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
    }

    input,
    select,
    textarea {
        width: 100%;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 14px;
    }

    textarea {
        resize: vertical;
    }

    .submit-btn {
        background-color: #007bff;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
    }

    .submit-btn:hover {
        background-color: #0056b3;
    }

    a {
        color: #007bff;
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }
</style>
