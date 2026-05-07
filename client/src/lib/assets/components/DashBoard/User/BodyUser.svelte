<script>
	const { user } = $props();
</script>

<div class="cours_item">
	<span class="cell">{user.lastname}</span>
	<span class="cell">{user.firstname}</span>
	<span class="cell">{user.pseudo}</span>
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

	.cell{
		min-width:33%;
	}
</style>
