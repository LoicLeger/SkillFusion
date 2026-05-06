<script lang='ts'>
	import api from "$lib/services/api.service";
	import { onMount } from "svelte";
	import type { IInput } from "$lib/@types/html";
	import type { ICategory } from "$lib/@types/types";

    const props=$props()
    let categories:ICategory[]=$state([])

    onMount(async()=>{
        const response = await api("api/categories")
        categories=response.data
    })

    function valideForm(event:SubmitEvent){
        event.preventDefault()
        const titleElement = document.getElementById("title") as IInput
        const littleSummary= document.getElementById("littleSummary") as IInput
        const summary= document.getElementById("summary") as IInput
        const categoryId= document.getElementById("categoryId") as IInput
        const difficulty= document.getElementById("difficulty") as IInput

        props.confirm({
			title:titleElement.value,
			littleSummar:littleSummary.value,
			summar:summary.value,
			categoryId:Number(categoryId.value),
			difficulty:Number(difficulty.value)})
    }

</script>
	<dialog class="overlay" id="modalNewCours">
		<div class="dialog">
			<h2>Nouveau Cours</h2>
            <form onsubmit={(event)=>valideForm(event)}>
            <div class="input">   
                <label for="title">Titre du cours</label>
                <input type="texte" id="title" placeholder="Titre du cours" required>
            </div>
            <div class="input">   
                <label for="littleSummary">Petit résumé du cours</label>
                <input type="texte" id="littleSummary" placeholder="Petit resumé du cours" required>
            </div>
            <div class="input">   
                <label for="summary">Résumé du cours</label>
                <input type="texte" id="summary" placeholder="Resumé du cours" required>
            </div>
            <div class="input">   
                <label for="categoryId">Catégorie</label>
                <select id="categoryId">
                    <option value="">Selectionner une categorie</option>
                    {#each categories as category}
                        <option value={category.id}>{category.name}</option>
                    {/each}
                </select>
            </div>
            <div class="input">   
                <label for="difficulty">Difficulté</label>
                <select id="difficulty">
                    <option value="">Selectionner une difficulté</option>
                    {#each [1,2,3,4,5] as difficulty }
                        <option value={difficulty}>{difficulty}</option>
                    {/each}
                </select>
            </div>
			<div class="actions">
				<button class="cancel" type="button" onclick={props.cancel}>
					Annuler
				</button>
				<button class="confirm" type="submit">
					Valider
				</button>
			</div>
            </form>
		</div>
	</dialog>
<style>
	.overlay {
		position: fixed;
		inset: 0;
        width:100%;
        height:100vh;
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
		max-width: 400px;
		text-align: center;
        margin: auto;
        margin-top:50vh;
        transform: translateY(-50%);
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
	}

	.input {
		display: flex;
		flex-direction: column;
		margin-bottom: 1rem;
		text-align: left;
	}

	label {
		margin-bottom: 0.5rem;
		font-weight: bold;
		color: #444;
	}

	input, select {
		padding: 0.75rem;
		border: 1px solid #ddd;
		border-radius: 8px;
		font-size: 1rem;
	}

	input:focus, select:focus {
		outline: none;
		border-color: #e53935;
		box-shadow: 0 0 0 2px rgba(229, 57, 53, 0.2);
	}

	h2 {
		margin-bottom: 1rem;
	}

	.actions {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		margin-top: 1rem;
	}

	button {
		flex: 1;
		padding: 0.75rem;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		font-weight: bold;
	}

	.cancel {
		background: #ddd;
	}

	.confirm {
		background: #e53935;
		color: white;
	}
</style>