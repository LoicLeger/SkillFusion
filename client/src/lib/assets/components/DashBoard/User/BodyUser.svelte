<script>
	const { user } = $props();
</script>

<div class="cours_item">
<<<<<<< HEAD
	<span class="table-row__cell">{user.lastname}</span>
	<span class="table-row__cell">{user.firstname}</span>
	<span class="table-row__cell table-row__cell--pseudo">{user.pseudo}</span>
	<span class="badge"> </span>
=======
	<span class="cell">{user.lastname}</span>
	<span class="cell">{user.firstname}</span>
	<span class="cell">{user.pseudo}</span>
>>>>>>> main-dev
</div>

<style>
	.cours_item {
		display: flex;
		flex-direction: row;
		padding: 10px;
		padding-left: 0px;
		gap: 10px;
		width: 100%;
	}

	.cell {
		min-width: 33%;
	}
</style>
