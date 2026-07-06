<script>
    import Footer from '$lib/assets/components/Footer.svelte';
    import Header from '$lib/assets/components/Header.svelte';
</script>

<svelte:head>
    <title>Plan du site</title>
</svelte:head>

<Header />

<main class="plan-site">
    <h1>Plan du site</h1>

    <h2>Navigation principale</h2>
    <ul>
        <li><a href="/">Accueil</a> - Découvrez SkillFusion et nos cours mis en avant</li>
        <li>
            <a href="/cours">Cours</a> - Catalogue complet de nos formations en bricolage et DIY
        </li>
        <li><a href="/connexion">Connexion</a> - Accédez à votre compte</li>
        <li><a href="/inscription">Inscription</a> - Créez votre compte pour accéder aux cours</li>
    </ul>

    <h2>Espace utilisateur</h2>
    <ul>
        <li>
            <a href="/tableau-de-bord">Tableau de bord</a> - Suivez vos cours et votre progression
        </li>
    </ul>

    <h2>Informations légales</h2>
    <ul>
        <li>
            <a href="/mentions-legales">Mentions légales</a> - Informations sur l'éditeur et l'hébergement
        </li>
        <li>
            <a href="/conditions">Conditions générales d'utilisation</a> - Règles d'utilisation de la
            plateforme
        </li>
        <li>
            <a href="/protection-donnees">Protection des données</a> - Politique de confidentialité et
            RGPD
        </li>
        <li><a href="/accessibilite">Accessibilité</a> - Déclaration d'accessibilité</li>
    </ul>

    <h2>Contact et informations</h2>
    <ul>
        <li><a href="/contact">Contact</a> - Nos coordonnées et formulaire de contact</li>
    </ul>
</main>

<Footer />

<style>
    .plan-site {
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
        margin-bottom: 10px;
        color: #333;
    }

    ul {
        list-style-type: none;
        padding-left: 0;
    }

    li {
        margin-bottom: 10px;
        padding-left: 20px;
        position: relative;
    }

    li::before {
        content: '•';
        color: #007bff;
        font-weight: bold;
        position: absolute;
        left: 0;
    }

    a {
        color: #007bff;
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }
</style>
