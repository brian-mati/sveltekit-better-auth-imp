<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { authClient } from "$lib/auth-client";
    import { signUpSchema, validateForm } from "$lib/validation.js";
    
    const id = $props.id();
    let name: string = $state('')
    let email: string = $state('')
    let password: string = $state('')
    let errors: Record<string, string[]> = $state({});
    let isSubmitting: boolean = $state(false);
    let submitError: string = $state('');

    // Real-time validation
    function validateField(field: string, value: string) {
        const fieldSchema = {
            name: signUpSchema.shape.name,
            email: signUpSchema.shape.email,
            password: signUpSchema.shape.password
        }[field];
        
        if (fieldSchema) {
            const result = fieldSchema.safeParse(value);
            if (result.success) {
                // Clear errors for this field
                const newErrors = { ...errors };
                delete newErrors[field];
                errors = newErrors;
            } else {
                // Set errors for this field
                errors = {
                    ...errors,
                    [field]: result.error.errors.map(e => e.message)
                };
            }
        }
    }

    async function handleSubmit() {
        isSubmitting = true;
        submitError = '';
        
        // Validate all fields
        const validation = validateForm(signUpSchema, { name, email, password });
        
        if (!validation.success) {
            errors = validation.errors;
            isSubmitting = false;
            return;
        }
        
        // Clear errors if validation passes
        errors = {};
        
        try {
            const { data, error } = await authClient.signUp.email({
                email,
                password,
                name,
                fetchOptions: {
                    onSuccess() {
                        console.info(`Successfully signed up ${name}`);
                    }
                }
            });
            
            if (error) {
                console.warn(error);
                submitError = error.message || 'An error occurred during sign up';
            }
        } catch (err) {
            console.error('Sign up error:', err);
            submitError = 'An unexpected error occurred. Please try again.';
        } finally {
            isSubmitting = false;
        }
    }
</script>
  <Card.Root class="mx-auto w-full max-w-sm mt-10">
    <Card.Header>
      <Card.Title class="text-2xl">Sign up</Card.Title>
      <Card.Description>Enter your email below to create your account</Card.Description>
    </Card.Header>
    <Card.Content>
      <div class="grid gap-4 mt-2">
        <!-- Name Field -->
        <div class="grid gap-2">
          <Label for="name-{id}">Name</Label>
          <Input 
            id="name-{id}" 
            type="text"
            bind:value={name} 
            placeholder="Enter your full name" 
            class={errors.name ? 'border-red-500 focus:border-red-500' : ''}
            onblur={() => validateField('name', name)}
            required 
          />
          {#if errors.name}
            <div class="text-sm text-red-500">
              {#each errors.name as error}
                <p>{error}</p>
              {/each}
            </div>
          {/if}
        </div>
        
        <!-- Email Field -->
        <div class="grid gap-2">
          <Label for="email-{id}">Email</Label>
          <Input 
            id="email-{id}" 
            type="email"
            bind:value={email} 
            placeholder="m@example.com" 
            class={errors.email ? 'border-red-500 focus:border-red-500' : ''}
            onblur={() => validateField('email', email)}
            required 
          />
          {#if errors.email}
            <div class="text-sm text-red-500">
              {#each errors.email as error}
                <p>{error}</p>
              {/each}
            </div>
          {/if}
        </div>
        
        <!-- Password Field -->
        <div class="grid gap-2">
          <div class="flex items-center">
            <Label for="password-{id}">Password</Label>
          </div>
          <Input 
            id="password-{id}" 
            type="password" 
            bind:value={password} 
            placeholder="Enter a strong password"
            class={errors.password ? 'border-red-500 focus:border-red-500' : ''}
            onblur={() => validateField('password', password)}
            required 
          />
          {#if errors.password}
            <div class="text-sm text-red-500">
              {#each errors.password as error}
                <p>{error}</p>
              {/each}
            </div>
          {/if}
          <div class="text-xs text-gray-500 mt-1">
            Password must contain at least 8 characters, including uppercase, lowercase, number, and special character.
          </div>
        </div>
        
        <!-- Submit Error -->
        {#if submitError}
          <div class="text-sm text-red-500 bg-red-50 p-2 rounded border border-red-200">
            {submitError}
          </div>
        {/if}
        
        <Button onclick={handleSubmit} class="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Creating account...' : 'Get started'}
        </Button>
        
        <Button variant="outline" class="w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-4 h-4 mr-2">
            <path
              d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
              fill="currentColor"
            />
          </svg>
          Sign up with Google
        </Button>
      </div>
      
      <div class="mt-4 text-center text-sm">
        Already have an account? 
        <a href="/sign-in" class="underline hover:text-primary">Sign in</a>
      </div>
    </Card.Content>
  </Card.Root>
