<script>
    import Footer from '$lib/assets/components/Footer.svelte';
    import Header from '$lib/assets/components/Header.svelte';
</script>

<Header />

<main class="protection-donnees">
    <h1>Politique de protection des données personnelles</h1>

    <p>Dernière mise à jour : 23 avril 2026</p>

    <h2>1. Responsable du traitement</h2>
    <p>
        <strong>SkillFusion</strong><br />
        123 Rue de l'Innovation, 75001 Paris, France<br />
        Email : contact@skillfusion.fr
    </p>

    <h2>2. Données collectées</h2>
    <p>Nous collectons les données suivantes :</p>
    <ul>
        <li>Données d'identification (nom, prénom, email)</li>
        <li>Données de connexion (identifiant, mot de passe hashé)</li>
        <li>Données de progression dans les cours</li>
        <li>Données de navigation (cookies, logs)</li>
    </ul>

    <h2>3. Finalités du traitement</h2>
    <p>Les données sont traitées pour :</p>
    <ul>
        <li>Gérer votre compte et accès à la plateforme</li>
        <li>Fournir les services éducatifs</li>
        <li>Suivre votre progression dans les cours</li>
        <li>Améliorer nos services</li>
        <li>Respecter nos obligations légales</li>
    </ul>

    <h2>4. Base légale</h2>
    <p>
        Le traitement de vos données repose sur :<br />
        - L'exécution du contrat (CGU)<br />
        - Votre consentement<br />
        - Notre intérêt légitime<br />
        - Le respect d'obligations légales
    </p>

    <h2>5. Destinataires des données</h2>
    <p>
        Vos données sont accessibles uniquement au personnel autorisé de SkillFusion et à nos
        sous-traitants (hébergeur, service de paiement si applicable).
    </p>

    <h2>6. Durée de conservation</h2>
    <p>
        Les données sont conservées pendant la durée nécessaire à la fourniture des services, plus 3
        ans après la fermeture du compte pour des raisons légales.
    </p>

    <h2>7. Sécurité des données</h2>
    <p>
        Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger
        vos données contre la perte, l'altération ou l'accès non autorisé.
    </p>

    <h2>8. Cookies</h2>
    <p>
        Le site utilise des cookies pour améliorer votre expérience. Vous pouvez gérer vos
        préférences via les paramètres de votre navigateur.
    </p>

    <h2>9. Vos droits</h2>
    <p>Conformément au RGPD, vous disposez des droits suivants :</p>
    <ul>
        <li>Droit d'accès à vos données</li>
        <li>Droit de rectification</li>
        <li>Droit à l'effacement</li>
        <li>Droit à la portabilité</li>
        <li>Droit d'opposition</li>
        <li>Droit à la limitation du traitement</li>
    </ul>
    <p>Pour exercer ces droits, contactez-nous à contact@skillfusion.fr</p>

    <h2>10. Réclamation</h2>
    <p>
        Si vous estimez que vos droits ne sont pas respectés, vous pouvez saisir la CNIL (<a
            href="https://www.cnil.fr">www.cnil.fr</a
        >).
    </p>
</main>

<Footer />

<style>
    .protection-donnees {
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

    p {
        margin-bottom: 15px;
    }

    ul {
        margin-bottom: 15px;
        padding-left: 20px;
    }

    li {
        margin-bottom: 5px;
    }

    a {
        color: #007bff;
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }
</style>
