<script lang="ts">
    import { authClient } from "$lib/auth-client"; 
    import Button from "$lib/components/ui/button/button.svelte";
     
    const session = authClient.useSession(); 
    async function signout(){
        await authClient.signOut()
    }
    </script>
    {#if session }
    <p>
        {$session.data?.user.email}
        <Button onclick={signout}>Sign out</Button>
    </p>
    {/if}
    