<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { PageData } from './$types';
	import SimilarityScore from './SimilarityScore.svelte';

	import { checkSentenceSimilarity, checkTextSimilarity } from '$lib/aiModel';
	import { compareResult } from '../store';
	import { aiCommentary } from '$lib/openAI';
	import { browser } from '$app/environment';

	const currentPage = getContext<Writable<string>>('currentPage');
	$currentPage = 'compare';

	export let data: PageData;
	let full: string = '';
	if (data && data.courseDesc) {
		for (let i = 0; i < data.courseDesc.length; i++) {
			if(data.courseDesc[i].uotype !== 'asced' && data.courseDesc[i].uotype !== 'prglvl') {
				full += data.courseDesc[i].content + '\n\n';
			}			
		}
	} else if (browser) {
		full = localStorage.getItem('text1') ?? '';
	}

	let sentence1 = full;
	let sentence2 = browser? (localStorage.getItem('text2') ?? '') : '';
	let similarity_score: number | null = 0;
	let wordCount1 = 0;
	let wordCount2 = 0;
	let aiCommentaryText = '';

	// Function to check sentence similarity
	async function checkSimilarity() {
		aiCommentaryText = "";
		similarity_score = await checkSentenceSimilarity(sentence1, sentence2);
	}

	onMount(() => {
		updateWordCount('sentence1');
		updateWordCount('sentence2');
	});

	async function compareText() {
		aiCommentaryText = "";
		if (browser) {
			localStorage.setItem('text1', sentence1);
			localStorage.setItem('text2', sentence2);
		}
		const result = await checkTextSimilarity(sentence1, sentence2);
		console.log(result);
		$compareResult = result;
		similarity_score = result?.final_score ?? null;
	}

	async function aiComment() {
		const result = await aiCommentary(sentence1, sentence2);
		aiCommentaryText = result;
	}

	//WORD COUNTING
	function updateWordCount(textAreaId: string) {
		const text = textAreaId === 'sentence1' ? sentence1 : sentence2;
		const words = text.trim().split(/\s+/);
		const count = words.filter((word) => word.length > 0).length;

		if (textAreaId === 'sentence1') {
			wordCount1 = count;
		} else if (textAreaId === 'sentence2') {
			wordCount2 = count;
		}
	}

	//PDF UPLOAD

	let selectedTextarea = 'sentence1';

	async function handleUpload(event) {
		event.preventDefault();

		const formData = new FormData(event.target);

		try {
			const response = await fetch('http://127.0.0.1:5000/api/upload-pdf', {
				method: 'POST',
				body: formData
			});

			if (response.ok) {
				const pdfText = await response.text();
				console.log('PDF Text:', pdfText);

				if (selectedTextarea === 'sentence1') {
					sentence1 = pdfText;
					updateWordCount('sentence1');
				} else if (selectedTextarea === 'sentence2') {
					sentence2 = pdfText;
					updateWordCount('sentence2');
				}

				//if (selectedTextarea)
				//sentence1 = pdfText;
				//updateWordCount('sentence1');
			} else {
				console.error('Error uploading PDF');
			}
		} catch (error) {
			console.error('Error', error);
		}
	}
</script>

<main>
	<p class="title">Compare Texts</p>
	<!-- Sentence Textareas -->
	<div class="textarea-container">
		<div class="textarea-group">
			<h1>Text 1: {data.unitid ? data.unitid : ''}</h1>
			<textarea
				id="sentence1"
				placeholder="Enter text for comparison:"
				style="color: black;"
				rows="14"
				cols="80"
				bind:value={sentence1}
				on:input={() => updateWordCount('sentence1')}
			/>
			<div id="wordCount1">Word count: {wordCount1} /384</div>
		</div>
		<div class="textarea-group">
			<h1>Text 2:</h1>
			<textarea
				id="sentence2"
				placeholder="Enter text for comparison:"
				style="color: black;"
				rows="14"
				cols="80"
				bind:value={sentence2}
				on:input={() => updateWordCount('sentence2')}
			/>
			<div id="wordCount2">Word count: {wordCount2} /384</div>
		</div>
		<br />
	</div>
	<div class="pdf">
		<form
			class="uploadForm"
			on:submit={handleUpload}
			method="POST"
			enctype="multipart/form-data"
			id="form1"
		>
			<label for="file1">Upload pdf file:</label>
			<input type="file" name="file1" id="file1" accept=".pdf" />
			<br /><br />
			<label for="targetTextarea">Where to upload?:</label>
			<select style="color: black;" bind:value={selectedTextarea} id="targetTextarea">
				<option value="sentence1">Text 1</option>
				<option value="sentence2">Text 2</option>
			</select>
			<br /><br />
			<input class="pill" type="submit" value="Upload" />
		</form>
	</div>

	<!-- Check Similarity Button -->
	<br />
	<div class="centreelement">
		<button class="comparebutton" id="check_similarity_button" on:click={checkSimilarity}
			>Compute Text Similarity</button
		>
		<button class="comparebutton" id="check_text_similarity_button" on:click={compareText}
			>Compute Detailed Comparison</button
		>
		<div class="button"><a href="/app/compare/detail">View Detailed Analysis</a></div>
		<button class="comparebutton" id="compare_button" on:click={aiComment}>AI Commentary</button>
	</div>

	<SimilarityScore {similarity_score} />
	<div style="margin: 30px;"><pre style="white-space:pre-line;">{aiCommentaryText}</pre></div>
</main>

<style>
	.pdf {
		width: 75%;
		border: solid white 1px;
		margin: auto;
		padding-left: 20px;
		padding-right: 20px;
		padding-bottom: 10px;
		margin-top: 20px;
	}
	.pill {
		background-color: #ddd;
		border: none;
		color: black;
		padding: 10px 20px;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		margin: 4px 2px;
		cursor: pointer;
		border-radius: 16px;
		width: 150px;
		margin-left: 20px;
	}
	.uploadForm {
		display: flex;
		align-items: center;
		margin-top: 10px;
	}

	.uploadForm label {
		margin-right: 10px;
	}
	.title {
		font-size: 40px;
		padding: 30px;
	}

	.textarea-container {
		display: flex;
		justify-content: center;
	}
	.textarea-group {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		margin-right: 20px; /* Optional: Add some space between text areas */
	}
	textarea {
		width: 100%; /* Adjust the width based on your preference */
		margin-right: 10px; /* Add some space between text areas */
	}
	.centreelement {
		width: 100%;
		padding: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.button {
		padding: 10px;
		border: 1px solid white;
		vertical-align: middle;
	}
	.comparebutton {
		width: 15%;
		display: block;
		height: 50px;
		font-size: 1em;
		font-weight: bold;
		margin: auto;
		border: 1px solid white;
	}
</style>
