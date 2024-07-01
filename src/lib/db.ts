import postgres from 'postgres';

export const sql = postgres({
	host: 'localhost',
	database: 'creditmap_db',
	port: 5432
});
