<script setup lang="ts">
definePageMeta({
  layout: 'auth',
});

const { status, data, signIn } = useSession();
const login = async () => await signIn('github', { callbackUrl: '/' });
</script>
<template>
  <div
    class="flex items-center justify-center bg-zinc-700 w-[450px] px-3 py-8 rounded shadow"
  >
    <form class="">
      <h1 class="text-2xl text-white font-bold text-center">Trello - Nuxt 3</h1>
      <p class="text-zinc-100 mb-4">Faça login para visualizar o board</p>
      <button
        class="p-2 rounded bg-zinc-800 w-full text-white flex gap-2 items-center justify-center font-medium hover:bg-zinc-900 transition-colors"
        @click="login()"
      >
        <Icon name="ph:github-logo-fill" />
        Login with Github
      </button>
    </form>
  </div>
</template>
