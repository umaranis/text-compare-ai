<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<script lang="ts">
	import { getScoreColor } from '$lib/helper';
	import { createEventDispatcher } from 'svelte';
	import { flip } from 'svelte/animate';

	export let heading: string;
	export let text_lines: Array<string>;
	export let text_lines_scores: Array<number>;

	export let selectedIndex: number | null = null;
	export let sortIndexes: number[];

	const dispatch = createEventDispatcher();

	function handleLineClick(index: number) {
		if (selectedIndex !== index) {
			selectedIndex = index;
		} else {
			selectedIndex = null;
		}
		dispatch('lineSelected', { selectedIndex });
	}
</script>

<div class="container">
	<h1>{heading}</h1>
	{#each sortIndexes as index (index)}
		{@const line = text_lines[index]}
		<div class="line" animate:flip>
			<div class="line_num" style:opacity={index === selectedIndex ? '1' : '0.5'}>{index + 1}</div>
			<div
				class="line_text"
				class:line_text_active={index === selectedIndex}
				class:line_text_inactive={selectedIndex !== null && selectedIndex !== index}
				style:background-color={getScoreColor(text_lines_scores[index])}
				on:click={() => handleLineClick(index)}
			>
				{line}
			</div>
			<div class="line_score" style:color={getScoreColor(text_lines_scores[index])}
      class:line_text_inactive={selectedIndex !== null && selectedIndex !== index}>
				{Math.round(text_lines_scores[index])}%
			</div>
		</div>
	{/each}
</div>

<style>
	.container {
		padding: 10px;
	}

	.line {
		display: flex;
		align-items: center;
		transition: transform 0.2s ease-in-out;
	}
	.line:hover {
		transform: scale(1.03);
	}

	.line_text {
		padding: 10px;
		margin: 5px 0;
		border-radius: 5px;
		color: #000;
		border-left: solid 5px #6fa5d5;
		transition: border-left 0.2s ease-in-out;
	}

	.line_text_active {
		border-left: solid 10px #6fa5d5;
	}

	.line_text_inactive {
		opacity: 0.35;
	}

	.line_num {
		background-color: #000;
		padding: 10px 5px 10px 10px;
		border-radius: 20px 0 0 20px;
	}

	.line_score {
		margin-top: 3px;
		padding: 0 5px;
		align-self: flex-start;
		font-size: small;
		background-color: #000;
	}
</style>
