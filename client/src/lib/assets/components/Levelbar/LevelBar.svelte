<script>
	let { isDashboard = false, ...props } = $props();
</script>

<div class={props.class}>
	{#if !isDashboard}
		{#if props.level == 0}
			<div class="diff-card {props.class}">
				<div class="bars">
					<div class="bar" style="height:10px; background:#3B6D11;"></div>
					<div class="bar" style="height:14px; background:#C0DD97;"></div>
					<div class="bar" style="height:18px; background:#C0DD97;"></div>
					<div class="bar" style="height:22px; background:#C0DD97;"></div>
					<div class="bar" style="height:25px; background:#C0DD97;"></div>
				</div>
				<p class="diff-name" style="color:#27500A;">Débutant</p>
			</div>
		{:else if props.level == 1}
			<div class="diff-card {props.class}">
				<div class="bars">
					<div class="bar" style="height:10px; background:#0F6E56;"></div>
					<div class="bar" style="height:14px; background:#0F6E56;"></div>
					<div class="bar" style="height:18px; background:#9FE1CB;"></div>
					<div class="bar" style="height:22px; background:#9FE1CB;"></div>
					<div class="bar" style="height:25px; background:#9FE1CB;"></div>
				</div>
				<p class="diff-name" style="color:#085041;">Facile</p>
			</div>
		{:else if props.level == 2}
			<div class="diff-card {props.class}">
				<div class="bars">
					<div class="bar" style="height:10px; background:#854F0B;"></div>
					<div class="bar" style="height:14px; background:#854F0B;"></div>
					<div class="bar" style="height:18px; background:#854F0B;"></div>
					<div class="bar" style="height:22px; background:#FAC775;"></div>
					<div class="bar" style="height:25px; background:#FAC775;"></div>
				</div>
				<p class="diff-name" style="color:#633806;">Intermédiaire</p>
			</div>
		{:else if props.level == 3}
			<div class="diff-card {props.class}">
				<div class="bars">
					<div class="bar" style="height:10px; background:#993C1D;"></div>
					<div class="bar" style="height:14px; background:#993C1D;"></div>
					<div class="bar" style="height:18px; background:#993C1D;"></div>
					<div class="bar" style="height:22px; background:#993C1D;"></div>
					<div class="bar" style="height:25px; background:#F5C4B3;"></div>
				</div>
				<p class="diff-name" style="color:#712B13;">Difficile</p>
			</div>
		{:else if props.level == 4}
			<div class="diff-card {props.class}">
				<div class="bars">
					<div class="bar" style="height:10px; background:#A32D2D;"></div>
					<div class="bar" style="height:14px; background:#A32D2D;"></div>
					<div class="bar" style="height:18px; background:#A32D2D;"></div>
					<div class="bar" style="height:22px; background:#A32D2D;"></div>
					<div class="bar" style="height:25px; background:#A32D2D;"></div>
				</div>
				<p style="color:#791F1F;">Expert</p>
			</div>
		{/if}
	{/if}
</div>

<style>
	.bars {
		display: flex;
		gap: 3px;
		align-items: flex-end;
		height: 24px;
	}
	.bar {
		width: 8px;
		border-radius: 2px;
	}
	.diff-card {
		flex: 1;
		flex-direction: column;
		min-width: 30px;
		width: 90px;
		display: flex;
		align-items: center;
	}
	p {
		font-size: 12px;
		font-weight: bold;
		margin: 0px;
	}

	.difficulty-bar {
		flex-direction: row;
		gap: 15px;
		margin-top: 10px;
	}

	@media (min-width: 768px) {
		.diff-card {
			padding: 0;
		}
	}
	.hidden {
		display: none;
	}
</style>
