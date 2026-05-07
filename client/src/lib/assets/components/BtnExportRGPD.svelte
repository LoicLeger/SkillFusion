<script>
	async function exportData() {
		const response = await fetch('http://localhost:3000/api/users/me/export', {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		});

		if (!response.ok) {
			console.error("Erreur lors de l'export");
			return;
		}

		const blob = await response.blob();
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'mes-donnees-skillfusion.json';
		a.click();
		URL.revokeObjectURL(url);
	}
</script>

<button class="btn-export" type="button" onclick={exportData}> Exporter mes données (RGPD) </button>

<style>
	.btn-export {
		text-align: center;
		padding: 15px;
		cursor: pointer;
		background-color: white;
		border-radius: 10px;
		border: 1px solid #1d4e89;
		color: #1d4e89;
		font-weight: bold;
		margin-top: 10px;
		margin-left: 10px;
	}

	.btn-export:hover {
		background-color: #eff6ff;
	}
</style>
