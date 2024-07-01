import { sql } from '$lib/db';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const subdisciplines = await sql`
        select
        *
        from creditmap_schema.subdiscipline`;

	const courses = await sql`
		select 
		* 
		from creditmap_schema.unit`;

	return {
		subdisciplines,
		courses
	};
}) satisfies PageServerLoad;