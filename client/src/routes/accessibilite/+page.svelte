<script>
    import Footer from '$lib/assets/components/Footer.svelte';
    import Header from '$lib/assets/components/Header.svelte';
    import '../../app.css';
</script>

<Header />

<main class="accessibilite">
    <h1>Déclaration d'accessibilité</h1>

    <p>Dernière mise à jour : 23 avril 2026</p>

    <h2>Engagement d'accessibilité</h2>
    <p>
        SkillFusion s'engage à rendre sa plateforme accessible conformément aux dispositions de la
        loi n° 2005-102 du 11 février 2005 et du décret n° 2019-768 du 24 juillet 2019, relatifs à
        l'accessibilité des sites internet des services publics.
    </p>

    <h2>État de conformité</h2>
    <p>
        La plateforme SkillFusion est <strong>partiellement conforme</strong> au Référentiel Général d'Amélioration
        de l'Accessibilité (RGAA) version 4.1, en raison des non-conformités et des dérogations énumérées
        ci-dessous.
    </p>

    <h2>Résultats des tests</h2>
    <p>
        L'audit d'accessibilité réalisé révèle que <strong>85%</strong> des critères du RGAA sont respectés.
    </p>

    <h2>Non-conformités</h2>
    <ul>
        <li>Certains contrastes de couleurs ne respectent pas le ratio minimum requis</li>
        <li>
            Quelques images décoratives ne sont pas correctement masquées aux technologies
            d'assistance
        </li>
        <li>Certaines vidéos ne disposent pas de sous-titres ou de transcriptions</li>
    </ul>

    <h2>Contenus non accessibles</h2>
    <p>Les contenus suivants ne sont pas accessibles pour les raisons suivantes :</p>
    <ul>
        <li>
            Contenus externes (vidéos YouTube) : Ces contenus sont hébergés sur des plateformes
            tierces ne relevant pas du champ d'application de la loi
        </li>
        <li>Documents PDF : Certains anciens documents ne sont pas encore accessibles</li>
    </ul>

    <h2>Établissement de cette déclaration</h2>
    <p>
        Cette déclaration a été établie le 11 mai 2026.<br />
        Méthodologie utilisée : Auto-évaluation réalisée par l'équipe de développement, avec l'aide d'outils
        d'audit d'accessibilité.
    </p>

    <h2>Améliorations et contact</h2>
    <p>
        Nous travaillons continuellement à améliorer l'accessibilité de notre plateforme. Si vous
        rencontrez un problème d'accessibilité, vous pouvez nous contacter :
    </p>
    <ul>
        <li>
            Par email : <a href="mailto:skillfusion.noreply@gmail.com"
                >skillfusion.noreply@gmail.com</a
            >
        </li>
        <li>Par téléphone : 01 02 03 04 05</li>
        <li>Par courrier : SkillFusion<br />
            123 Avenue Aurélie F0F<br />
            23754642672 MaxiLearn<br />
            Planète Mars (pas loin après la lune)</li>
    </ul>

    <h2>Défenseur des droits</h2>
    <p>
        Si vous estimez que cette déclaration d'accessibilité n'est pas conforme ou que notre
        réponse à votre réclamation n'est pas satisfaisante, vous pouvez saisir le Défenseur des
        droits :
    </p>
    <ul>
        <li>
            Par formulaire en ligne : <a href="https://formulaire.defenseurdesdroits.fr"
                >formulaire.defenseurdesdroits.fr</a
            >
        </li>
        <li>Par courrier : Défenseur des droits, 7 rue Saint-Florentin, 75409 Paris Cedex 08</li>
        <li>Par téléphone : 09 69 39 00 00</li>
    </ul>

    <h2>Technologies utilisées</h2>
    <p>L'accessibilité de SkillFusion repose sur les technologies suivantes :</p>
    <ul>
        <li>HTML5</li>
        <li>CSS3</li>
        <li>JavaScript (avec framework Svelte)</li>
        <li>ARIA pour l'accessibilité</li>
    </ul>
</main>

<Footer />

<style>
    .accessibilite {
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
