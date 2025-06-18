<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { authClient } from "$lib/auth-client";
    const id = $props.id();
    let name:string = $state('')
    let email:string = $state('')
    let password:string = $state('')

//     async function handlesubmit(){
//         console.info(name,email,password)
//         const { data, error } = await authClient.signUp.email({
//   email,
//   password,
//   name,
//   fetchOptions:{
//     onSuccess(){
//         console.info(`successfully signed up ${name}`)
//     }
//   }
// });
//     if (error){
//         console.warn(error)
//     }
//     }
  </script>
  <Card.Root class="mx-auto w-full max-w-sm mt-10">
    <Card.Header>
      <Card.Title class="text-2xl">Sign up</Card.Title>
      <Card.Description>Enter your email below to create to your account</Card.Description>
    </Card.Header>
    <Card.Content>
      <div class="grid gap-4 mt-2">
        <div class="grid gap-2">
            <Label for="email-{id}">Username</Label>
            <Input id="email-{id}" type="text"
            bind:value={name} placeholder="" required />
          </div>
        <div class="grid gap-2">
          <Label for="email-{id}">Email</Label>
          <Input id="email-{id}" type="email"
          bind:value={email} placeholder="m@example.com" required />
        </div>
        <div class="grid gap-2">
          <div class="flex items-center">
            <Label for="password-{id}">Password</Label>
          </div>
          <Input id="password-{id}" type="password" bind:value={password} required />
        </div>
        <Button type="submit" class="w-full">Get started</Button>
        <Button variant="outline" class="w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
              fill="currentColor"
            />
          </svg>
          Login with Google
        </Button>
      </div>
      <div class="mt-4 text-center text-sm">
        Already have an account? 
        <a href="##" class="underline"> Login </a>
      </div>
    </Card.Content>
  </Card.Root>