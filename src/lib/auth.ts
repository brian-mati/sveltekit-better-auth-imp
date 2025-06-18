import { betterAuth } from 'better-auth';
import Database from 'better-sqlite3';
import { DATABASE_URL } from '$env/static/private';

if (!DATABASE_URL) {
	ReferenceError('Database url is undefined');
}

export const auth = betterAuth({
	database: new Database(DATABASE_URL)
});
