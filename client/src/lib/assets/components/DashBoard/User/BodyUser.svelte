<script>
	const { user } = $props();
</script>

<div class="cours_item">
	<span class="table-row__cell">{user.lastname}</span>
	<span class="table-row__cell">{user.firstname}</span>
	<span class="table-row__cell table-row__cell--pseudo">{user.pseudo}</span>
	<span class="badge"> </span>
</div>

<style>
	.cours_item {
		display: flex;
		flex-direction: column;
		padding: 10px;
		padding-left: 0px;
		gap: 10px;
	}
</style>
