<script lang="ts">
    import api from '$lib/services/api.service';
    import Header from '$lib/assets/components/Header.svelte';
    import Footer from '$lib/assets/components/Footer.svelte';
    import BtnAllCours from '$lib/assets/components/BtnAllCours.svelte';
    import CoursCard from '$lib/assets/components/Cours/CoursCard.svelte';
    import { onMount } from 'svelte';
    import App from '$lib/assets/components/App.svelte';
    import Main from '$lib/assets/components/Main.svelte';
    import type { ICours, ICoursActived } from '$lib/@types/types';
    import type { IUserLocalStorage } from '$lib/@types/type.localStorage';
    import { getAuth, authStore } from '$lib/services/localstorage.service.svelte';
    import '../normalize.css';
    import '../app.css';

    let courses: ICours[] = $state([]);
    let user: IUserLocalStorage | null = $state(null);
    let coursEnded: number[] = $state([]);

    onMount(async () => {
        getAuth();
        user = authStore.user;
        const coursesResponse = await api('api/cours/homepage');
        courses = coursesResponse.data;

        if (user?.id) {
            const ended = await api('api/cours-active/user/' + user.id + '/ended');
            coursEnded = ended.data.map((ended: ICoursActived) => ended.coursId);
        }
    });
</script>

<svelte:head>
    <title>Acceuil</title>
</svelte:head>

<App>
    <Header />
    <Main>
        <main>
            <section class="homepage__leftside">
                <h2>Apprends par la pratique</h2>
                <h1>Maîtrise les métiers du bricolage</h1>
                <p>
                    Vous avez toujours voulu réparer cette fuite sous l'évier, poser vous-même votre
                    parquet ou installer une prise électrique en toute sécurité ? SkillFusion est
                    fait pour vous.
                </p>
                <p>
                    Nous croyons que les savoir-faire du bricolage et des métiers manuels ne
                    devraient pas être réservés aux professionnels. Chaque geste s'apprend et chaque
                    compétence se construit à condition d'être bien guidé.
                </p>
                <p>
                    SkillFusion est une plateforme de cours en ligne pensée pour les curieux, les
                    débrouillards et ceux qui aiment comprendre comment les choses fonctionnent.
                    Plomberie, électricité, menuiserie, chauffage, carrelage, peinture... nos
                    formateurs experts vous accompagnent pas à pas, avec des cours clairs, illustrés
                    et progressifs.
                </p>
                <p>
                    Débutant complet ou bricoleur confirmé, vous avancez à votre rythme, sans
                    pression. Chaque cours est conçu pour être concret et directement applicable,
                    depuis chez vous, avec les outils que vous avez déjà. Parce qu'apprendre avec
                    les mains, c'est aussi apprendre à être autonome.
                </p>
                <a class="main__btn__presentation" href="/info">En savoir plus</a>
                <BtnAllCours />
            </section>
            <section class="homepage__rightside">
                <div class="homepage__rightside__menu">
                    <h3>Nos cours</h3>
                    <a class="main__link" href="/cours">Voir tout ➔</a>
                </div>
                <div class="courses-grid">
                    {#each courses as cours (cours.id)}
                        <CoursCard
                            {cours}
                            --card__image__color={cours.category.textColor}
                            --border_color={cours.category.borderColor}
                            --text_color={cours.category.textColor}
                            --background-color={cours.category.backgroundColor}
                            {coursEnded}
                        />
                    {/each}
                </div>
            </section>
        </main>
    </Main>
    <Footer />
</App>

<style>
    main {
        display: flex;
        flex-direction: column;
    }
    .homepage__leftside {
        display: flex;
        width: 100%;
        padding-right: 30px;
        flex-direction: column;
    }
    .homepage__leftside a {
        display: flex;
        justify-content: center;
    }
    .main__btn__presentation {
        background-color: transparent;
        color: #1d4e89;
        border-radius: 10px;
        border: #1d4e89 1px solid;
        padding: 8px 18px;
        margin-top: 40px;
        font-weight: 400;
        transition:
            background 0.15s,
            color 0.15s;
    }
    .homepage__rightside__menu {
        display: flex;
        justify-content: space-between;
        margin: 10px 0;
    }
    .homepage__rightside__menu h3 {
        font-weight: bold;
    }
    a {
        text-decoration: none;
    }

    .courses-grid {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: 1.25rem;
    }

    @media (min-width: 768px) {
        main {
            flex-direction: row;
        }
        .homepage__rightside {
            width: 50%;
            gap: 10px;
            display: flex;
            flex-direction: column;
        }
        .homepage__leftside {
            width: 50%;
        }
        .courses-grid {
            display: grid;
            grid-template-columns: repeat(1, 1fr);
            gap: 1.25rem;
        }
    }
    @media (min-width: 1024px) {
        .courses-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1.25rem;
        }
    }
</style>
