import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from './server/db';

export const auth = betterAuth({
	emailAndPassword: {
		enabled: true
	},
	cookieCache: {
		enabled: true, // Enable caching session in cookie (default: `false`)
		maxAge: 3600 // 5 minutes
	},
	database: drizzleAdapter(db, {
		provider: 'sqlite' // or "mysql", "sqlite"
	})
});
