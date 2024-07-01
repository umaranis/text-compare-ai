<script lang="ts">
	import type { Writable } from 'svelte/store';
	import { compareResult } from './../store';
	import { getContext } from 'svelte';
	import { getScoreColor } from '$lib/helper';
	import TextContainer from './TextContainer.svelte';
	import { getText2LinesSortedGivenText1Line } from '$lib/aiModel';

	const currentPage = getContext<Writable<string>>('currentPage');
	$currentPage = 'detail';

	let selectedIndex1: number | null = null;
	let selectedIndex2: number | null = null;
  

	let sortIndexes1: number[] = [...Array($compareResult?.text1_lines.length).keys()];
	let sortIndexes2: number[] = [...Array($compareResult?.text2_lines.length).keys()];
	$: if ($compareResult) {
		if (selectedIndex1 === null) {
			sortIndexes2 = [...Array($compareResult?.text2_lines.length).keys()];
		} else {
			sortIndexes2 = getText2LinesSortedGivenText1Line($compareResult, selectedIndex1);
		}
	}

	let text1_lines_scores: number[] = $compareResult?.text1_lines_scores ?? [];
	let text2_lines_scores: number[] = $compareResult?.text2_lines_scores ?? [];
  $: if(selectedIndex1 !== null) {
    text2_lines_scores = $compareResult?.similarity_score[selectedIndex1] ?? [];
  } else {
    text2_lines_scores = $compareResult?.text2_lines_scores ?? [];
  }

	function handleLineSelection1(e: CustomEvent) {
		if (e.detail.selectedIndex !== null) {
			selectedIndex2 = null;
		}
	}

	function handleLineSelection2(e: CustomEvent) {
		if (e.detail.selectedIndex !== null) {
			selectedIndex1 = null;
		}
	}
</script>

{#if $compareResult}
	<h1 style="text-align: center; font-size: 2em; padding: 1em">
		Similarity Score (Overall): {Math.round($compareResult.final_score)}%
	</h1>
	<main>
		<TextContainer
			heading="Text 1:"
			text_lines={$compareResult.text1_lines}
			text_lines_scores={text1_lines_scores}
			bind:selectedIndex={selectedIndex1}
			sortIndexes={sortIndexes1}
			on:lineSelected={handleLineSelection1}
		/>
		<TextContainer
			heading="Text 2:"
			text_lines={$compareResult.text2_lines}
			text_lines_scores={text2_lines_scores}
			bind:selectedIndex={selectedIndex2}
			sortIndexes={sortIndexes2}
			on:lineSelected={handleLineSelection2}
		/>
	</main>
{/if}

<style>
	main {
		display: flex;
		padding: 10px;
	}
</style>
