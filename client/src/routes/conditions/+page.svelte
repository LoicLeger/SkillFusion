<script>
    import Footer from '$lib/assets/components/Footer.svelte';
    import Header from '$lib/assets/components/Header.svelte';
</script>

<svelte:head>
    <title>Conditions générales d'utilisation</title>
</svelte:head>

<Header />

<main class="conditions">
    <h1>Conditions générales d'utilisation</h1>

    <p>Dernière mise à jour : 23 avril 2026</p>

    <h2>1. Objet</h2>
    <p>
        Les présentes conditions générales d'utilisation (CGU) régissent l'utilisation de la
        plateforme SkillFusion, une plateforme éducative dédiée à l'apprentissage du bricolage et du
        Do It Yourself (DIY). En accédant à la plateforme, vous acceptez d'être lié par ces CGU.
    </p>

    <h2>2. Accès à la plateforme</h2>
    <p>
        L'accès à certains contenus nécessite une inscription et une connexion. Vous êtes
        responsable de la confidentialité de vos identifiants de connexion.
    </p>

    <h2>3. Utilisation des services</h2>
    <p>
        SkillFusion propose un catalogue de cours classés par catégories (Menuiserie, Electricité,
        plomberie, etc.). Les utilisateurs peuvent suivre des cours à leur rythme et accéder à leur
        tableau de bord personnel.
    </p>

    <h2>4. Obligations des utilisateurs</h2>
    <ul>
        <li>Fournir des informations exactes lors de l'inscription</li>
        <li>Respecter les droits de propriété intellectuelle</li>
        <li>Ne pas utiliser la plateforme à des fins illégales</li>
        <li>Respecter les autres utilisateurs</li>
    </ul>

    <h2>5. Contenu des cours</h2>
    <p>
        Les instructeurs sont responsables du contenu de leurs cours. SkillFusion s'efforce de
        vérifier la qualité des contenus mais ne peut garantir l'exactitude de toutes les
        informations.
    </p>

    <h2>6. Propriété intellectuelle</h2>
    <p>
        Le contenu de la plateforme (textes, vidéos, images) est protégé par le droit d'auteur.
        Toute reproduction sans autorisation est interdite.
    </p>

    <h2>7. Responsabilité</h2>
    <p>
        SkillFusion ne peut être tenu responsable des dommages indirects liés à l'utilisation de la
        plateforme. Les utilisateurs utilisent les conseils des cours sous leur propre
        responsabilité.
    </p>

    <h2>8. Données personnelles</h2>
    <p>
        Le traitement des données personnelles est régi par notre politique de protection des
        données, conforme au RGPD.
    </p>

    <h2>9. Modification des CGU</h2>
    <p>
        SkillFusion se réserve le droit de modifier ces CGU à tout moment. Les utilisateurs seront
        informés des modifications importantes.
    </p>

    <h2>10. Résiliation</h2>
    <p>SkillFusion peut suspendre ou résilier un compte en cas de violation des CGU.</p>

    <h2>11. Droit applicable</h2>
    <p>
        Ces CGU sont soumises au droit français. Tout litige sera porté devant les tribunaux
        français.
    </p>
</main>

<Footer />

<style>
    .conditions {
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
</style>
