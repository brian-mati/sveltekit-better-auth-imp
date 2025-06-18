import { z } from 'zod';

// Sign-up validation schema
export const signUpSchema = z.object({
	name: z
		.string()
		.min(2, 'Name must be at least 2 characters long')
		.max(50, 'Name must be no more than 50 characters long')
		.regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),

	email: z
		.string()
		.email('Please enter a valid email address')
		.max(100, 'Email must be no more than 100 characters long'),

	password: z
		.string()
		.min(8, 'Password must be at least 8 characters long')
		.max(100, 'Password must be no more than 100 characters long')
		.regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
		.regex(/[a-z]/, 'Password must contain at least one lowercase letter')
		.regex(/[0-9]/, 'Password must contain at least one number')
		.regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
});

// Sign-in validation schema (more lenient since user already exists)
export const signInSchema = z.object({
	email: z
		.string()
		.email('Please enter a valid email address')
		.max(100, 'Email must be no more than 100 characters long'),

	password: z
		.string()
		.min(1, 'Password is required')
		.max(100, 'Password must be no more than 100 characters long')
});

// Types for the schemas
export type SignUpFormData = z.infer<typeof signUpSchema>;
export type SignInFormData = z.infer<typeof signInSchema>;

// Validation helper function
export function validateForm<T>(
	schema: z.ZodSchema<T>,
	data: Record<string, unknown>
):
	| { success: true; data: T; errors: null }
	| { success: false; data: null; errors: Record<string, string[]> } {
	const result = schema.safeParse(data);

	if (result.success) {
		return { success: true, data: result.data, errors: null };
	} else {
		const errors: Record<string, string[]> = {};
		result.error.errors.forEach((error) => {
			const field = error.path.join('.');
			if (!errors[field]) {
				errors[field] = [];
			}
			errors[field].push(error.message);
		});
		return { success: false, data: null, errors };
	}
}
