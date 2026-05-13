<script lang="ts">
    import api from '$lib/services/api.service';
    import { onMount } from 'svelte';
    import type { IBadge, ICategory, ICours, IRole, IUser } from '$lib/@types/types';
    import '../../../../app.css';
    import ModalValidator from '../Modal/ModalValidator.svelte';
    import type { IModal } from '$lib/@types/html';
    import Badge from './Badge/BodyBadge.svelte';
    import ArticleDashBoard from './Article/ArticleDashBoard.svelte';
    import BodyCategory from './Category/BodyCategory.svelte';
    import BodyCours from './Cours/BodyCours.svelte';
    import { goto } from '$app/navigation';
    import BodyUser from './User/BodyUser.svelte';
    import ModalModifyBadge from './Badge/ModalModifyBadge.svelte';
    import ModalModifyCategory from './Category/ModalModifyCategory.svelte';
    import ModalCreateCategory from './Category/ModalCreateCategory.svelte';

    let users: IUser[] = $state([]);
    let roles: IRole[] = $state([]);
    let courses: ICours[] = $state([]);
    let categories: ICategory[] = $state([]);
    let badges: IBadge[] = $state([]);

    onMount(async () => {
        // Fetch tous les roles
        const responseRoles = await api('api/roles');
        roles = responseRoles.data;

        // Fetch tous les users
        const responseUsers = await api('api/users');
        users = responseUsers.data;

        // Fetch tous les cours
        const responseCours = await api('api/cours');
        courses = responseCours.data;

        // Fetch toutes les categories
        const responseCategories = await api('api/categories');
        categories = responseCategories.data;

        const responseBagde = await api('api/badges');
        badges = responseBagde.data;
    });

    // ── Filtres ─────────────────────────────────────────────────
    let searchUsers = $state('');
    let filterRole = $state('');
    let searchCours = $state('');
    let searchBadges = $state('');
    let searchCats = $state('');

    const filteredUsers = $derived(
        users.filter((user) => {
            const matchSearch =
                !searchUsers ||
                user.lastname.toLowerCase().includes(searchUsers.toLowerCase()) ||
                user.firstname.toLowerCase().includes(searchUsers.toLowerCase()) ||
                user.pseudo.toLowerCase().includes(searchUsers.toLowerCase());
            const matchRole = !filterRole || user.role.name === filterRole;
            return matchSearch && matchRole;
        })
    );

    const filteredCours = $derived(
        courses.filter(
            (cours) => !searchCours || cours.title.toLowerCase().includes(searchCours.toLowerCase())
        )
    );

    const filteredBadges = $derived(
        badges.filter(
            (badge) =>
                !searchBadges || badge.name.toLowerCase().includes(searchBadges.toLowerCase())
        )
    );
    const filteredCategories = $derived(
        categories.filter(
            (category) =>
                !searchCats || category.name.toLowerCase().includes(searchCats.toLowerCase())
        )
    );

    let errorMessage = $state('');
    let successMessage = $state('');

    let coursToDelete = $state<number | null>(null);
    let userToDelete = $state<number | null>(null);
    let categoryToDelete = $state<number | null>(null);
    let badgeToDelete = $state<number | null>(null);

    let badgeToUpdate = $state<IBadge | null>(null);
    let categoryToUpdate = $state<ICategory | null>(null);

    /* Fonction pour la modification d'un utilisateur */
    function modifyUser(user: IUser) {
        goto('/profil?id=' + user.id);
    }

    /* Fonction pour la fenetre modal de confirmation de suppression d'un utilisateur */

    function openModalDeleteUser(userId: number) {
        userToDelete = userId;
        const modal = document.getElementById('modalDeleteUser') as IModal;
        if (modal) {
            modal.show();
        }
    }
    function cancelDeleteUser() {
        const modal = document.getElementById('modalDeleteUser') as IModal;
        if (modal) {
            modal.close();
        }
    }

    async function confirmDeleteUser() {
        if (!userToDelete) return;

        const response = await api(`api/users/${userToDelete}`, 'DELETE');

        if (response.status === 204 || response.status === 200) {
            users = users.filter((u) => u.id !== userToDelete);
            successMessage = 'Utilisateur supprimé avec succès';
            errorMessage = '';
            setTimeout(() => (successMessage = ''), 5000);
        } else {
            errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
            successMessage = '';
            setTimeout(() => (errorMessage = ''), 5000);
        }
        userToDelete = null;
        cancelDeleteUser();
    }

    /* Fonction pour la modification d'un cours */
    function modifyCours(cours: ICours) {
        goto('/cours/' + cours.slug);
    }

    /* Fonction pour la fenetre modal de confirmation de suppression d'un cours */

    function openModalDeleteCours(CoursId: number) {
        coursToDelete = CoursId;
        const modal = document.getElementById('modalDeleteCours') as IModal;
        if (modal) {
            modal.show();
        }
    }

    function cancelDeleteCours() {
        const modal = document.getElementById('modalDeleteCours') as IModal;
        if (modal) {
            modal.close();
        }
    }

    async function confirmDeleteCours() {
        if (!coursToDelete) return;
        const response = await api(`api/cours/${coursToDelete}`, 'DELETE');

        if (response.status === 204 || response.status === 200) {
            courses = courses.filter((cours) => cours.id !== coursToDelete);
            successMessage = 'La cours a été supprimé avec succès';
            errorMessage = '';
            setTimeout(() => ((successMessage = ''), 5000));
        } else {
            errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
            successMessage = '';
            setTimeout(() => (errorMessage = ''), 5000);
        }
        coursToDelete = null;
        let refreshCourses = await api('api/cours');
        courses = refreshCourses.data;
        cancelDeleteCours();
    }

    /* Fonction pour la modification d'un Badge */

    function openModalModifyBadge(badge: IBadge) {
        badgeToUpdate = badge;
        const modal = document.getElementById('modalModifyBadge') as IModal;
        if (modal) {
            modal.show();
        }
    }

    function cancelModifyBadge() {
        const modal = document.getElementById('modalModifyBadge') as IModal;
        if (modal) {
            modal.close();
        }
    }

    async function confirmModifyBadge(data: { name: string; description: string }) {
        const response = await api(`api/badges/${badgeToUpdate?.id}`, 'PATCH', { ...data });

        if (response.status === 204 || response.status === 200) {
            successMessage = 'La Badge a été modifier avec succès';
            errorMessage = '';
            setTimeout(() => ((successMessage = ''), 5000));
        } else {
            errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
            successMessage = '';
            setTimeout(() => (errorMessage = ''), 5000);
        }
        badgeToUpdate = null;
        let refreshBadges = await api('api/badges');
        badges = refreshBadges.data;

        cancelModifyBadge();
    }

    /* Fonction pour la fenetre modal de confirmation de suppression d'un badge */

    function openModalDeleteBadge(badgeId: number) {
        badgeToDelete = badgeId;
        const modal = document.getElementById('modalDeleteBadge') as IModal;
        if (modal) {
            modal.show();
        }
    }

    function cancelDeleteBadge() {
        const modal = document.getElementById('modalDeleteBadge') as IModal;
        if (modal) {
            modal.close();
        }
    }

    async function confirmDeleteBadge() {
        if (!badgeToDelete) return;
        const response = await api(`api/badges/${badgeToDelete}`, 'DELETE');

        if (response.status === 204 || response.status === 200) {
            badges = badges.filter((badge) => badge.id !== badgeToDelete);
            successMessage = 'La Badge a été supprimé avec succès';
            errorMessage = '';
            setTimeout(() => ((successMessage = ''), 5000));
        } else {
            errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
            successMessage = '';
            setTimeout(() => (errorMessage = ''), 5000);
        }
        badgeToDelete = null;
        let refreshBadges = await api('api/badges');
        badges = refreshBadges.data;
        cancelDeleteBadge();
    }

    /* Fonction pour la craetion d'une categories */

    function openModalCreateCategory() {
        const modal = document.getElementById('modalCreateCategory') as IModal;
        if (modal) {
            modal.show();
        }
    }

    function cancelCreateCategory() {
        const modal = document.getElementById('modalCreateCategory') as IModal;
        if (modal) {
            modal.close();
        }
    }

    async function confirmCreateCategory(data: { name: string; description: string }) {
        const response = await api(`api/categories`, 'POST', { ...data });

        if (response.status === 201 || response.status === 200) {
            successMessage = 'La categorie a été crée avec succès';
            errorMessage = '';
            setTimeout(() => ((successMessage = ''), 5000));
        } else {
            errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
            successMessage = '';
            setTimeout(() => (errorMessage = ''), 5000);
        }
        categoryToUpdate = null;
        let refreshCategories = await api('api/categories');
        categories = refreshCategories.data;
        cancelCreateCategory();
    }

    /* Fonction pour la modification d'une categories */

    function openModalModifyCategory(category: ICategory) {
        categoryToUpdate = category;
        const modal = document.getElementById('modalModifyCategory') as IModal;
        if (modal) {
            modal.show();
        }
    }

    function cancelModifyCategory() {
        const modal = document.getElementById('modalModifyCategory') as IModal;
        if (modal) {
            modal.close();
        }
    }

    async function confirmModifyCategory(data: { name: string; description: string }) {
        const response = await api(`api/categories/${categoryToUpdate?.id}`, 'PATCH', { ...data });

        if (response.status === 204 || response.status === 200) {
            successMessage = 'La categorie a été modifier avec succès';
            errorMessage = '';
            setTimeout(() => ((successMessage = ''), 5000));
        } else {
            errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
            successMessage = '';
            setTimeout(() => (errorMessage = ''), 5000);
        }
        categoryToUpdate = null;
        let refreshCategories = await api('api/categories');
        categories = refreshCategories.data;
        let refreshCourses = await api('api/cours');
        courses = refreshCourses.data;
        cancelModifyCategory();
    }

    /* Fonction pour la fenetre modal de confirmation de suppression d'une catégories */

    function openModalDeleteCategory(CategoryId: number) {
        categoryToDelete = CategoryId;
        const modal = document.getElementById('modalDeleteCategory') as IModal;
        if (modal) {
            modal.show();
        }
    }

    function cancelDeleteCategory() {
        const modal = document.getElementById('modalDeleteCategory') as IModal;
        if (modal) {
            modal.close();
        }
    }

    async function confirmDeleteCategory() {
        if (!categoryToDelete) return;
        const response = await api(`api/categories/${categoryToDelete}`, 'DELETE');

        if (response.status === 204 || response.status === 200) {
            categories = categories.filter((c) => c.id !== categoryToDelete);
            successMessage = 'La catégorie a été supprimé avec succès';
            errorMessage = '';
            setTimeout(() => ((successMessage = ''), 5000));
        } else {
            errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
            successMessage = '';
            setTimeout(() => (errorMessage = ''), 5000);
        }
        categoryToDelete = null;
        let refreshCategories = await api('api/categories');
        categories = refreshCategories.data;
        cancelDeleteCategory();
    }
</script>

<div class="dashboard">
    <div class="dashboard__header">
        <h1 class="dashboard__title">Mon tableau de bord</h1>
        <div class="link-to-mail">
            <a class="Gmail-Admin" href="https://mail.google.com/mail/u/1/#inbox">Mes mails</a>
        </div>
    </div>

    {#if successMessage}
        <p class="success" style="color:green">{successMessage}</p>
    {/if}

    {#if errorMessage}
        <p class="error" style="color:red">{errorMessage}</p>
    {/if}

    <div class="dashboard__grid">
        <!-- ══════════════════════════════
         PANEL 1 — Utilisateurs
    ══════════════════════════════ -->
        <div class="panel">
            <div class="panel__head">
                <h2 class="panel__title">Utilisateurs</h2>
                <span class="panel__count">{filteredUsers.length}</span>
            </div>

            <div class="panel__filters">
                <input
                    class="input"
                    type="text"
                    placeholder="Rechercher..."
                    bind:value={searchUsers}
                />
                <select class="input input--select" bind:value={filterRole}>
                    <option value="">Tous les rôles</option>
                    {#each roles as r (r.id)}
                        <option value={r.name}>{r.frName}</option>
                    {/each}
                </select>
            </div>

            <!-- En-tête colonnes -->
            <div class="table-head">
                <span>Nom</span>
                <span>Prénom</span>
                <span>Pseudo</span>
                <span>Rôle</span>
            </div>

            <div class="panel__list">
                {#each filteredUsers as user (user.id)}
                    <ArticleDashBoard
                        openDeleteModal={() => openModalDeleteUser(user.id)}
                        openModifyModal={() => modifyUser(user)}
                    >
                        <BodyUser {user} />
                    </ArticleDashBoard>

                    {#if filteredUsers.length === 0}
                        <p class="panel__empty">Aucun utilisateur trouvé.</p>
                    {/if}
                {/each}
            </div>
        </div>

        <!-- ══════════════════════════════
         PANEL 2 — Cours
    ══════════════════════════════ -->
        <div class="panel">
            <div class="panel__head">
                <h2 class="panel__title">Cours</h2>
                <span class="panel__count">{filteredCours.length}</span>
            </div>

            <div class="panel__filters">
                <input
                    class="input"
                    type="text"
                    placeholder="Rechercher..."
                    bind:value={searchCours}
                />
            </div>

            <div class="panel__list">
                {#each filteredCours as cours (cours.id)}
                    <ArticleDashBoard
                        openDeleteModal={() => openModalDeleteCours(cours.id)}
                        openModifyModal={() => modifyCours(cours)}
                    >
                        <BodyCours {cours} />
                    </ArticleDashBoard>
                {/each}

                {#if filteredCours.length === 0}
                    <p class="panel__empty">Aucun cours trouvé.</p>
                {/if}
            </div>
        </div>

        <!-- ══════════════════════════════
         PANEL 3 — Badges
    ══════════════════════════════ -->
        <div class="panel">
            <div class="panel__head">
                <h2 class="panel__title">Gestion des badges</h2>
            </div>

            <div class="panel__filters">
                <input
                    class="input"
                    type="text"
                    placeholder="Rechercher..."
                    bind:value={searchBadges}
                />
            </div>

            <div class="panel__list">
                {#each filteredBadges as badge (badge.id)}
                    <ArticleDashBoard
                        openDeleteModal={() => openModalDeleteBadge(badge.id)}
                        openModifyModal={() => openModalModifyBadge(badge)}
                    >
                        <Badge {badge} --color={badge.color} />
                    </ArticleDashBoard>
                {/each}

                {#if filteredBadges.length === 0}
                    <p class="panel__empty">Aucun badge trouvé.</p>
                {/if}
            </div>
        </div>

        <!-- ══════════════════════════════
         PANEL 4 — Catégories
    ══════════════════════════════ -->
        <div class="panel">
            <div class="panel__head">
                <h2 class="panel__title">Gestion des catégories</h2>
                <button
                    class="btn-add"
                    title="Ajouter une catégorie"
                    onclick={() => openModalCreateCategory()}>+</button
                >
            </div>

            <div class="panel__filters">
                <input
                    class="input"
                    type="text"
                    placeholder="Rechercher..."
                    bind:value={searchCats}
                />
            </div>

            <div class="panel__list">
                {#each filteredCategories as category (category.id)}
                    <ArticleDashBoard
                        openDeleteModal={() => openModalDeleteCategory(category.id)}
                        openModifyModal={() => openModalModifyCategory(category)}
                    >
                        <BodyCategory {category} />
                    </ArticleDashBoard>
                {/each}

                {#if filteredCategories.length === 0}
                    <p class="panel__empty">Aucune catégorie trouvée.</p>
                {/if}
            </div>
        </div>
    </div>
    <ModalModifyBadge
        cancel={cancelModifyBadge}
        confirm={confirmModifyBadge}
        badge={badgeToUpdate}
    />
    <ModalModifyCategory
        cancel={cancelModifyCategory}
        confirm={confirmModifyCategory}
        badge={categoryToUpdate}
    />
    <ModalCreateCategory cancel={cancelCreateCategory} confirm={confirmCreateCategory} />
    <ModalValidator
        id="modalDeleteUser"
        message="Êtes-vous sûr de vouloir supprimer cet utilisateur ?"
        cancel={cancelDeleteUser}
        confirm={confirmDeleteUser}
    />
    <ModalValidator
        id="modalDeleteCours"
        message="Êtes-vous sûr de vouloir supprimer cette cours ?"
        cancel={cancelDeleteCours}
        confirm={confirmDeleteCours}
    />
    <ModalValidator
        id="modalDeleteCategory"
        message="Êtes-vous sûr de vouloir supprimer cette catégorie ?"
        cancel={cancelDeleteCategory}
        confirm={confirmDeleteCategory}
    />
    <ModalValidator
        id="modalDeleteBadge"
        message="Êtes-vous sûr de vouloir supprimer cette badge ?"
        cancel={cancelDeleteBadge}
        confirm={confirmDeleteBadge}
    />
</div>

<style>
    /* ── Tokens ─────────────────────────────────────────────── */
    .dashboard {
        --blue: #1d4e89;
        --blue-l: #ebf2fa;
        --blue-m: #b5d4f4;
        --amber: #f5a623;
        --amber-l: #fef5e7;
        --amber-m: #fac775;
        --bg: #f7f4ef;
        --dark: #2c3e50;
        --white: #ffffff;
        --gray: #6b7280;
        --border: rgba(44, 62, 80, 0.1);
        --green-l: #eaf3de;
        --green-d: #27500a;
        --green-m: #c0dd97;
        --pink-l: #fdedec;
        --pink-d: #a93226;
        --pink-m: #f1948a;
        --pur-l: #f4ecf7;
        --pur-d: #7d3c98;
        --teal-l: #e1f5ee;
        --teal-d: #085041;
        --r-md: 10px;
        --r-lg: 16px;
        --font: 'DM Sans', sans-serif;

        font-family: var(--font);
        background: var(--bg);
        min-height: 100vh;
        padding: 16px 16px 48px;
    }

    /* ── Header page ─────────────────────────────────────────── */
    .dashboard__header {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        flex-direction: column;
        gap: 12px;
        margin-bottom: 24px;
    }

    .dashboard__title {
        font-family: 'DM Serif Display', serif;
        font-size: 26px;
        font-weight: 400;
        color: var(--dark);
        margin: 0;
    }

    .link-to-mail {
        width: 100%;
    }

    .Gmail-Admin {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        font-size: 14px;
        color: var(--blue);
        padding: 8px 12px;
        background: var(--blue-l);
        border-radius: 999px;
    }

    /* ── Grid mobile first ──────────────────────────────────── */
    .dashboard__grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 18px;
    }

    /* ── Panel ───────────────────────────────────────────────── */
    .panel {
        background: var(--white);
        border: 0.5px solid var(--border);
        border-radius: var(--r-lg);
        padding: 18px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        min-width: 0;
    }

    .panel__head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        flex-wrap: wrap;
    }

    .panel__title {
        font-size: 15px;
        font-weight: 500;
        color: var(--blue);
        margin: 0;
    }

    .panel__count {
        background: var(--blue-l);
        color: var(--blue);
        font-size: 11px;
        font-weight: 600;
        padding: 2px 8px;
        border-radius: 100px;
    }

    .panel__filters {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 100%;
    }

    .panel__filters .input,
    .panel__filters .input--select {
        width: 100%;
        box-sizing: border-box;
    }

    .panel__list {
        display: flex;
        flex-direction: column;
        gap: 12px;
        max-height: none;
        min-width: 0;
    }

    .panel__list::-webkit-scrollbar {
        width: 4px;
    }
    .panel__list::-webkit-scrollbar-track {
        background: var(--bg);
        border-radius: 4px;
    }
    .panel__list::-webkit-scrollbar-thumb {
        background: var(--blue-m);
        border-radius: 4px;
    }

    .panel__empty {
        font-size: 13px;
        color: var(--gray);
        text-align: center;
        padding: 20px 0;
    }

    /* ── Inputs ──────────────────────────────────────────────── */
    .input {
        height: 42px;
        border: 1px solid var(--border);
        border-radius: var(--r-md);
        padding: 0 12px;
        font-family: var(--font);
        font-size: 14px;
        color: var(--dark);
        background: var(--bg);
        outline: none;
        transition: border-color 0.15s;
    }

    .input:focus {
        border-color: var(--blue);
        background: var(--white);
    }

    .input--select {
        width: 100%;
        max-width: 100%;
        cursor: pointer;
    }

    /* ── Table utilisateurs ──────────────────────────────────── */
    .table-head {
        display: none;
    }

    .table-head span {
        display: flex;
        justify-content: start;
        font-size: 11px;
        font-weight: 600;
        color: var(--gray);
        text-transform: uppercase;
        letter-spacing: 0.06em;
    }

    /* ── Boutons action ──────────────────────────────────────── */
    .btn-add {
        width: 36px;
        height: 36px;
        border-radius: var(--r-md);
        border: 1.5px solid var(--amber);
        background: var(--amber-l);
        color: #ba7517;
        font-size: 18px;
        font-weight: 500;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.15s;
        line-height: 1;
    }

    .btn-add:hover {
        background: var(--amber);
        color: var(--white);
    }

    /* ── Responsive ──────────────────────────────────────────── */
    @media (max-width: 768px) {
        .dashboard {
            padding: 16px;
        }

        .panel {
            padding: 16px;
        }

        .panel__head {
            align-items: flex-start;
        }

        .panel__filters {
            gap: 12px;
        }

        .panel__list {
            gap: 12px;
        }
    }

    @media (min-width: 768px) {
        .dashboard {
            padding: 20px 24px 48px;
        }

        .dashboard__header {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
        }

        .panel__filters {
            flex-direction: row;
            flex-wrap: wrap;
            align-items: center;
        }

        .input--select {
            width: 220px;
            flex: 0 0 auto;
        }

        .panel__list {
            max-height: 320px;
            overflow-y: auto;
        }

        .table-head {
            display: grid;
            grid-template-columns: 1fr 1.5fr 1fr 1fr;
            gap: 8px;
            padding: 0 10px;
        }
    }

    @media (min-width: 1024px) {
        .dashboard {
            padding: 24px 40px 60px;
        }

        .dashboard__grid {
            grid-template-columns: 1fr 1fr;
        }
    }
</style>
