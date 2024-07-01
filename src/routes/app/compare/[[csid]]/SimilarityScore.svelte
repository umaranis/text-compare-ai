<script lang="ts">
	export let similarity_score: number | null;

	let color: 'green' | 'yellow' | 'red' | null = null;

	$: if (!similarity_score) {
		color = null;
	} else if (similarity_score >= 70) {
		color = 'green';
	} else if (similarity_score >= 50) {
		color = 'yellow';
	} else {
		color = 'red';
	}

	let score_text: string | null;
	$: if (!similarity_score) {
		score_text = null;
	} else if (similarity_score >= 70) {
		score_text = 'High Similarity: The content is very similar.';
	} else if (similarity_score >= 50) {
		score_text = 'Medium Similarity: There is some similarity in the content.';
	} else {
		score_text = 'Low Similarity: The content is not very similar.';
	}
</script>

{#if similarity_score}
	<div class="score"><b><u>{Math.round(similarity_score)}%</u></b></div>
	<div class="center-container">
		<div class="response-container">
			<div class="traffic-light" style:background-color={color} id="traffic_light" />
			<div class="response-text-container">
				<p id="response_text">{score_text}</p>
			</div>
		</div>
	</div>
{/if}

<style>
	.score {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 20px;
		height: 40px;
	}

	.response-container {
		display: flex;
		align-items: center;
	}

	.center-container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: auto;
	}

	.response-container {
		display: flex;
		align-items: center;
	}

	.traffic-light {
		width: 200px;
		height: 50px;
		border: 2px solid white;
		border-radius: 8px;
		margin-right: 20px;
	}
	.response-text-container {
		flex-grow: 1;
	}
</style>
