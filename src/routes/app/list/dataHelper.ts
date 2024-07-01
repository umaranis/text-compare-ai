import type postgres from 'postgres';
export function convertDBtoUIList(data: postgres.RowList<postgres.Row[]>) {
	return data.map((row) => {
		return {
			label: row.subdisciplinelongname,
			value: row.subdisciplineid
		};
	});
}

export function disciplineIsValid(data: postgres.RowList<postgres.Row[]>, subdiscipline: string) {
    return data.find((row) => row.subdisciplinelongname === subdiscipline);
}

export function findCourses(data: postgres.RowList<postgres.Row[]>, subdisciplineid: number) {
    return data.filter((row) => row.subdisciplineid === subdisciplineid);
}

