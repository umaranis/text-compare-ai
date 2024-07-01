export function getScoreColor(score: number | null): string | null {
    if (!score) {
		return null;
	} else if (score >= 70) {
		return '#78c47a';
	} else if (score >= 50) {
		return '#f2f291';
	} else {
		return '#eaa4a4';
	}
}


