import { sql } from '$lib/db';
import type { PageServerLoad } from './$types';

export const load = (async ({params}) => {
    //console.log(params.csid);

    if (params.csid) {
        const courseDesc = await sql`
        select * from creditmap_schema.unitoutlinedetail where unitoutlinekey =
        (select max(unitoutlinekey) from creditmap_schema.unitoutline where unitid = ${params.csid})
    order by uotype, sequence asc`
    
        return {
            unitid: params.csid,
            courseDesc
        };
    }
    else {
        return {};
    }
}) satisfies PageServerLoad;