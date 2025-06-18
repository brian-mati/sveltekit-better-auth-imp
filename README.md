# BETTER AUTH SVELTEKIT SETUP 🚀

Author:

- Brian Muthomi Mati
- brianmuthomimati@gmail.com

Hello there. Ill cut right to the chase,I spent a better part of 2 weeks trying to get better auth to work on sveltekit. \ As such i would like to share that this setup is per the better-auth version below (For transparency):

- version **v.1.2.9**
- released on **June 10 2025**

> At this point (June 18th 2025) in time the **api for sign up and sign in by better auth is a broken** for lack of a better word causing the session token to not be set.

## IMPLEMENTATION NOTES

We will be making use of the client methods provided with the method of choice for signing up being email and password

Function list:

- authclient.signup.email
- authclient.signin.email
- authclient.signout.email

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

### Creating a project

Once you've cloned the project run `npm install` or `bun install` to install dependencies

```bash to start the server
npm run dev

npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.
