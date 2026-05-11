<script>
    const props = $props();

    let title = $state('');
    let summary = $state('');

    $effect(() => {
        title = props.cours?.title;
        summary = props.cours?.summary;
    });
    function confirm() {
        props.confirm();
    }
</script>

<dialog class="overlay" id="modalModifyIndexCours">
    <div class="dialog">
        <h2>Modification d'un cours</h2>
        {#if props.cours}
            <form>
                <div>
                    <label for="title">Titre du cours : </label>
                    <input type="text" id="title" value={title} />
                </div>
                <div>
                    <label for="summary">Sommaire du cours : </label>
                    <textarea name="summary" id="summary" bind:value={props.cours.summary}
                    ></textarea>
                </div>
                <div>
                    <label for="littleSummary">Petit sommaire du cours : </label>
                    <textarea
                        name="littleSummary"
                        id="littleSummary"
                        bind:value={props.cours.littleSummary}
                    ></textarea>
                </div>
                <div>
                    <label for="difficulty">Difficulté cours : </label>
                    <select id="difficulty">
                        <option value="0" selected>Débutant</option>
                        <option value="1">Facile</option>
                        <option value="2">Intermédiaire</option>
                        <option value="3">Difficile</option>
                        <option value="4">Expert</option>
                    </select>
                </div>
            </form>
        {/if}
        <div class="actions">
            <button class="cancel" onclick={props.cancel}> Annuler </button>
            <button class="confirm" onclick={confirm}> Valider </button>
        </div>
    </div>
</dialog>

<style>
    .overlay {
        position: fixed;
        inset: 0;
        width: 100%;
        height: 100vh;
        background: rgba(0, 0, 0, 0.6);
        align-items: center;
        justify-content: center;
        z-index: 9999;
    }

    .dialog {
        background: white;
        padding: 2rem;
        border-radius: 12px;
        width: 90%;
        max-width: 700px;
        text-align: center;
        margin: auto;
        margin-top: 50vh;
        transform: translateY(-50%);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }

    h2 {
        margin-bottom: 1rem;
    }

    .actions {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
    }

    button {
        flex: 1;
        padding: 0.75rem;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-weight: bold;
    }

    input {
        width: 500px;
    }

    .cancel {
        background: #ddd;
    }

    .confirm {
        background: #e53935;
        color: white;
    }
</style>
