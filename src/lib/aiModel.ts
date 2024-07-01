export type CompareResult = {
	similarity_score: Array<Array<number>>;
	text1_lines: Array<string>;
	text2_lines: Array<string>;
    text1_lines_scores: Array<number>;
    text2_lines_scores: Array<number>;
    final_score: number;
};
export async function checkTextSimilarity(
	text1: string,
	text2: string
): Promise<CompareResult | null> {
	try {
		const response = await fetch('http://127.0.0.1:5000/api/text-similarity', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				text1,
				text2
			})
		});
		if (response.ok) {
            const result = await response.json();
            calculateScores(result);
			return result;
		} else {
			console.error(response.statusText + ' - ' + "'text-similarity' api call failed!");
		}
	} catch (error) {
		console.error('Error', error);
	}

	return null;
}

function calculateScores(compareResult: CompareResult): void {
	console.log(compareResult.similarity_score);

	const text1_lines_scores = [];
	for (let i = 0; i < compareResult.text1_lines.length; i++) {
		text1_lines_scores.push(Math.max(...compareResult.similarity_score[i]));
	}
    compareResult.text1_lines_scores = text1_lines_scores;

    const text2_lines_scores = [];
    for (let j = 0; j < compareResult.text2_lines.length; j++) {
        let max_value = 0;
        for(let i = 0; i < compareResult.text1_lines.length; i++) {
            const score = compareResult.similarity_score[i][j];
            if(score > max_value) {
                max_value = score;
            }
        }
        text2_lines_scores.push(max_value);
    }
    compareResult.text2_lines_scores = text2_lines_scores;

    const sum = text1_lines_scores.reduce((a, b) => a + b, 0) + text2_lines_scores.reduce((a, b) => a + b, 0);
    compareResult.final_score = sum / (text1_lines_scores.length + text2_lines_scores.length);
}

export function getText2LinesSortedGivenText1Line(compareResult: CompareResult, text1_line_index: number) {
    const arr = compareResult.similarity_score[text1_line_index];

    const arr_with_index = [];
    for (let i = 0; i < arr.length; i++) {
        arr_with_index.push([arr[i], i]);
    }
    arr_with_index.sort(function(left, right) {
        return left[0] > right[0] ? -1 : 1;
    });
    const indexes = [];
    for (let j = 0; j < arr_with_index.length; j++) {
        indexes.push(arr_with_index[j][1]);
    }

    return indexes;
}

export async function checkSentenceSimilarity(
	sentence1: string,
	sentence2: string
): Promise<number | null> {
	try {
		const response = await fetch('http://127.0.0.1:5000/api/sentence-similarity', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				sentence1: sentence1,
				sentence2: sentence2
			})
		});
		if (response.ok) {
			const data = await response.json();
			let similarity_score = parseFloat(data.similarity_score);
			similarity_score = similarity_score * 100;
			return similarity_score;
		} else {
			console.error(response.statusText + ' - ' + "'sentence-similarity' api call failed!");
		}
	} catch (error) {
		console.error('Error', error);
	}

	return null;
}
