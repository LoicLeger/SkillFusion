<script>
    import '../../normalize.css';
    import '../../app.css';
    import Footer from '$lib/assets/components/Footer.svelte';
    import Header from '$lib/assets/components/Header.svelte';
    import App from '$lib/assets/components/App.svelte';
    import Main from '$lib/assets/components/Main.svelte';

    import photoLoic from '$lib/assets/img/photo1.jpeg';
    import photoCS from '$lib/assets/img/CELIK-Samed.png';
    import photo_ad from '$lib/assets/img/photo_ad.png';
    import photoJD from '$lib/assets/img/jacques.jpg';

    import Menuiserie from '$lib/assets/img/Menuiserie.png';
    import Electricite from '$lib/assets/img/Electricite.png';
    import Chauffage from '$lib/assets/img/Chauffage.png';
    import Plomberie from '$lib/assets/img/Plomberie.png';
    import Carrelage from '$lib/assets/img/Carrelage.png';
    import Peinture from '$lib/assets/img/Peinture.png';
</script>

<svelte:head>
    <title>À propos de SkillFusion</title>
</svelte:head>

<App>
    <Header />

    <Main>
        <!-- Hero -->
        <div class="hero">
            <div class="hero__tag">À propos</div>
            <h1 class="hero__title">
                Apprendre <br /><em>ensemble</em>
            </h1>
            <p class="hero__sub">
                SkillFusion est une plateforme d'apprentissage en ligne conçue pour faciliter
                l'accès à des contenus pédagogiques variés et de qualité.
            </p>
        </div>
        <section class="carousel-section">
            <p class="carousel-label">Nos catégories</p>
            <div class="carousel">
                <div class="carousel__item scroll-start">
                    <div class="carousel__img">
                        <img src={Menuiserie} alt="Menuiserie" />
                    </div>
                    <h3 class="carousel__title">Menuiserie</h3>
                </div>
                <div class="carousel__item">
                    <div class="carousel__img">
                        <img src={Electricite} alt="Électricité" />
                    </div>
                    <h3 class="carousel__title">Électricité</h3>
                </div>
                <div class="carousel__item">
                    <div class="carousel__img">
                        <img src={Chauffage} alt="Chauffage" />
                    </div>
                    <h3 class="carousel__title">Chauffage</h3>
                </div>
                <div class="carousel__item">
                    <div class="carousel__img">
                        <img src={Plomberie} alt="Plomberie" />
                    </div>
                    <h3 class="carousel__title">Plomberie</h3>
                </div>
                <div class="carousel__item">
                    <div class="carousel__img">
                        <img src={Carrelage} alt="Carrelage" />
                    </div>
                    <h3 class="carousel__title">Carrelage</h3>
                </div>
                <div class="carousel__item">
                    <div class="carousel__img">
                        <img src={Peinture} alt="Peinture" />
                    </div>
                    <h3 class="carousel__title">Peinture</h3>
                </div>
            </div>
        </section>
        <div class="divider"></div>

        <!-- Histoire -->
        <section class="section">
            <div class="section__label">Notre histoire</div>
            <div class="section__content">
                <p>
                    Créée en 2026 par une équipe de développeurs en reconversion professionnelle,
                    SkillFusion est née de la volonté de rendre l'apprentissage plus <strong
                        >accessible</strong
                    >,
                    <strong>structuré</strong> et <strong>interactif</strong>.
                </p>
                <p>
                    Le site propose un catalogue de cours organisés par catégories, offrant une
                    navigation simple et intuitive. Chaque cours présente un aperçu détaillé avec
                    ses objectifs, permettant aux utilisateurs de comprendre les compétences qu'ils
                    pourront acquérir avant de s'inscrire.
                </p>
            </div>
        </section>

        <div class="divider"></div>

        <!-- Pour qui -->
        <section class="section">
            <div class="section__label">Pour qui ?</div>
            <div class="cards">
                <div class="card">
                    <div class="card__icon">🎓</div>
                    <h3 class="card__title">Apprenants</h3>
                    <p class="card__text">
                        Suivez des cours à votre rythme et progressez dans les domaines qui vous
                        passionnent.
                    </p>
                </div>
                <div class="card">
                    <div class="card__icon">✏️</div>
                    <h3 class="card__title">Instructeurs</h3>
                    <p class="card__text">
                        Créez et gérez vos propres contenus pédagogiques pour partager votre
                        expertise.
                    </p>
                </div>
                <div class="card">
                    <div class="card__icon">⚙️</div>
                    <h3 class="card__title">Administrateurs</h3>
                    <p class="card__text">
                        Supervisez la plateforme, gérez les utilisateurs, les rôles et les contenus.
                    </p>
                </div>
            </div>
        </section>

        <div class="divider"></div>

        <!-- Fonctionnalités -->
        <section class="section">
            <div class="section__label">Fonctionnalités</div>
            <div class="features">
                <div class="feature">
                    <div class="feature__dot"></div>
                    <span>Suivi de progression personnalisé</span>
                </div>
                <div class="feature">
                    <div class="feature__dot"></div>
                    <span>Gestion des comptes utilisateurs</span>
                </div>
                <div class="feature">
                    <div class="feature__dot"></div>
                    <span>Système d'avis sur les cours</span>
                </div>
                <div class="feature">
                    <div class="feature__dot"></div>
                    <span>Catalogue organisé par catégories</span>
                </div>
                <div class="feature">
                    <div class="feature__dot"></div>
                    <span>Interface simple et intuitive</span>
                </div>
                <div class="feature">
                    <div class="feature__dot"></div>
                    <span>Contenus structurés et progressifs</span>
                </div>
            </div>
        </section>

        <div class="divider"></div>

        <!-- Équipe -->
        <section class="section section--team">
            <div class="section__label">L'équipe</div>
            <div class="team__intro">
                <p class="team__headline">Les créateurs de SkillFusion</p>
                <p class="team__desc">
                    Quatre développeurs passionnés, réunis par une même envie : rendre
                    l'apprentissage plus humain, plus accessible et plus engageant.
                </p>
            </div>
        </section>

        <div class="team">
            <a class="team__member" href="https://github.com/DevPoncet07" target="_blank">
                <div class="team__avatar">
                    <img src={photo_ad} alt="Membre 1" />
                </div>
                <h3 class="team__name">Adrien PONCET</h3>
                <p class="team__role">Développeur Full Stack</p>
            </a>
            <a class="team__member" href="https://github.com/CELIK-Samed" target="_blank">
                <div class="team__avatar-2">
                    <img src={photoCS} alt="Samed CELIK" />
                </div>
                <h3 class="team__name">Samed CELIK</h3>
                <p class="team__role">Développeur Full Stack</p>
            </a>
            <a class="team__member" href="https://github.com/LoicLeger" target="_blank">
                <div class="team__avatar">
                    <img src={photoLoic} alt="Membre 3" />
                </div>
                <h3 class="team__name">Loïc LEGER</h3>
                <p class="team__role">Développeur Full Stack</p>
            </a>
            <a class="team__member" href="https://github.com/Alithiel31" target="_blank">
                <div class="team__avatar-2">
                    <img src={photoJD} alt="Membre 4" />
                </div>
                <h3 class="team__name">Jacques DUCHAMPLECHEVAL</h3>
                <p class="team__role">Développeur Full Stack</p>
            </a>
        </div>

        <!-- Mission -->
        <section class="mission">
            <blockquote>
                "L'objectif de SkillFusion est de proposer une expérience d'apprentissage fluide,
                accessible et évolutive, en mettant l'accent sur la simplicité d'utilisation et la
                qualité des contenus."
            </blockquote>
        </section>
    </Main>

    <Footer />
</App>

<style>
    .hero,
    .section,
    .team,
    .divider,
    .mission {
        max-width: 760px;
        margin: 0 auto;
    }

    /* ── HERO ── */
    .hero {
        padding: 80px 24px 60px;
        text-align: center;
    }

    .hero__tag {
        display: inline-block;
        background: var(--color-background-modify-button);
        color: var(--color-font-modify-button);
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        padding: 5px 14px;
        border-radius: var(--border-radius);
        margin-bottom: 24px;
        border: 1px solid var(--color-font-modify-button);
    }

    .hero__title {
        font-family: 'DM Serif Display', serif;
        font-size: 40px;
        font-weight: 400;
        color: var(--h1-color);
        margin-bottom: 20px;
    }

    .hero__title em {
        font-style: italic;
        color: var(--h2-color);
    }

    .hero__sub {
        color: #57534e;
        font-size: 16px;
        line-height: 1.6;
        max-width: 540px;
        margin: 0 auto;
    }

    /* ── SECTIONS ── */
    .section {
        padding: 30px 24px;
        background: var(--background-white);
        border-radius: 10px;
        margin-bottom: 30px;
    }

    .section__label {
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--h2-color);
        margin-bottom: 20px;
    }

    .section__content p {
        font-size: 16px;
        line-height: 1.7;
        color: #57534e;
        margin-bottom: 16px;
    }

    .section__content strong {
        color: var(--h1-color);
    }

    /* ── DIVIDER ── */
    .divider {
        height: 1px;
        background: rgba(44, 62, 80, 0.1);
        margin: 40px auto;
    }

    /* ── CARDS ── */
    .cards {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
    }

    .card {
        background: var(--background-white);
        border: 1px solid rgba(44, 62, 80, 0.1);
        border-radius: var(--border-radius);
        padding: 20px;
        transition: 0.2s;
    }

    .card:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.07);
    }

    .card__icon {
        font-size: 22px;
        margin-bottom: 10px;
    }

    .card__title {
        font-size: 16px;
        font-weight: 600;
        color: var(--h1-color);
    }

    .card__text {
        font-size: 14px;
        color: #57534e;
    }

    /* ── FEATURES ── */
    .features {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
    }

    .feature {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 14px;
        color: #57534e;
    }

    .feature__dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: var(--h2-color);
    }

    /* ── TEAM ── */
    .section--team {
        padding-bottom: 30px;
    }

    .team__headline {
        font-family: 'DM Serif Display', serif;
        font-size: 24px;
        color: var(--h3-color);
    }

    .team__desc {
        font-size: 14px;
        color: #57534e;
    }

    .team {
        padding: 0 24px 60px;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 24px;
    }

    .team__member {
        background: var(--background-white);
        border: 1px solid rgba(44, 62, 80, 0.1);
        border-radius: var(--border-radius);
        padding: 20px;
        text-align: center;
        transition: 0.2s;
        text-decoration: none;
    }

    .team__member:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.07);
    }

    .team__avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        overflow: hidden;
        margin: 0 auto 10px;
        border: 2px solid var(--color-background-modify-button);
    }

    .team__avatar-2 {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        overflow: hidden;
        margin: 0 auto 10px;
        border: 2px solid var(--color-background-modify-button);
    }

    .team__avatar-2 img {
        width: 100%;
        object-fit: cover;
    }

    .team__avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .team__name {
        font-size: 14px;
        font-weight: 600;
        color: var(--h3-color);
    }

    .team__role {
        font-size: 13px;
        color: #6b7280;
    }

    /* ── MISSION ── */
    .mission {
        background: var(--button-backgroung-color);
        padding: 60px 24px;
        border-radius: var(--border-radius);
    }

    .mission blockquote {
        font-family: 'DM Serif Display', serif;
        font-size: 20px;
        color: white;
        text-align: center;
        line-height: 1.6;
    }

    /* ── CAROUSEL ── */
    .carousel-section {
        margin: 40px auto;
        max-width: 760px;
        padding: 0 24px;
        text-align: center;
        background-color: var(--background-white);
        padding-top: 20px;
        border-radius: 10px;
    }

    .carousel-label {
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--h2-color);
        margin-bottom: 24px;
    }

    .carousel {
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: 200px;
        gap: 0;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        scroll-behavior: smooth;
        scrollbar-width: none;
        padding-block: 20px;
        anchor-name: --carousel;
        overscroll-behavior-x: contain;
        scroll-padding-inline: 10px;
        width: 93%;
        margin-left: 20px;

        /* markers */
        scroll-marker-group: after;
    }

    .carousel::-webkit-scrollbar {
        display: none;
    }

    .carousel::scroll-marker-group {
        position: absolute;
        position-anchor: --carousel;
        align-items: center;
        padding-block-start: 12px;
        top: anchor(bottom);
        left: anchor(left);
        right: anchor(right);
    }

    /* Boutons prev/next */
    .carousel::scroll-button(*) {
        position: absolute;
        position-anchor: --carousel;
        width: 36px;
        aspect-ratio: 1;
        background: var(--button-backgroung-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: grid;
        place-content: center;
        opacity: 0.8;
        transition:
            opacity 0.15s,
            scale 0.15s;
    }

    .carousel::scroll-button(inline-start) {
        content: '❮';
        left: calc(anchor(left) - 40px);
        top: 25%;
    }

    .carousel::scroll-button(inline-end) {
        content: '❯';
        right: calc(anchor(right) - 40px);
        top: 25%;
    }

    .carousel::scroll-button(*):not(:disabled):hover {
        opacity: 1;
        scale: 1.1;
    }

    .carousel::scroll-button(*):disabled {
        opacity: 0.25;
        cursor: unset;
    }

    /* Items */
    .carousel__item {
        scroll-snap-align: start;
        scroll-snap-stop: always;
        container-type: scroll-state;
        display: grid;
        grid-template-areas: 'img' 'title';
        text-align: center;
        padding: 0 10px;
    }

    .carousel__item.scroll-start {
        scroll-initial-target: nearest;
    }

    .carousel__img {
        grid-area: img;
        width: 100%;
        aspect-ratio: 3/4;
        transition: all 300ms ease-in-out;
        transform-origin: center center;
    }

    .carousel__img img {
        width: 100%;
        height: 100%;
        border-radius: var(--border-radius);
        box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12);
    }

    .carousel__title {
        grid-area: title;
        margin: 12px 0 0;
        font-size: 15px;
        font-weight: 600;
        color: var(--h1-color);
        transition: all 300ms ease-in-out;
    }

    /* Markers */
    .carousel__item::scroll-marker {
        content: ' ';
        height: 8px;
        aspect-ratio: 1;
        background: var(--button-backgroung-color);
        border-radius: 50%;
        opacity: 0.25;
        scale: 0.75;
        transition: 150ms ease-in-out;
    }

    .carousel__item::scroll-marker:target-current {
        opacity: 1;
        scale: 1;
    }

    .carousel__item::scroll-marker:hover {
        opacity: 1;
    }

    /* ── RESPONSIVE ── */
    @media (max-width: 640px) {
        .carousel__item {
            grid-auto-columns: 160px;
        }
        .section {
            grid-template-columns: 1fr;
        }

        .carousel__item {
            flex: 0 0 85%;
        }

        .carousel__item img {
            height: 180px;
        }
        .cards {
            grid-template-columns: 1fr;
        }

        .features {
            grid-template-columns: 1fr;
        }

        .team {
            grid-template-columns: repeat(2, 1fr);
        }
    }
</style>
