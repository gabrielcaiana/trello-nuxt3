<script setup lang="ts">
import { User } from '@/types/index';

const { data, signOut } = useSession();
const logout = async () => await signOut();

const user = data.value?.user as User;
</script>

<template>
  <header
    class="border-b border-1 border-zinc-800 mb-10 pb-2 flex items-center justify-between"
  >
    <span class="text-4xl text-white font-medium">Trello - Nuxt 3</span>
    <div class="flex gap-4 text-white">
      <div v-if="user" class="flex items-center gap-2">
        <img class="w-[42px] rounded-full" :src="user.image" :alt="user.name" />
        <span class="font-medium">{{ user.name }}</span>
        |
      </div>
      <button
        class="text-white font-medium bg-zinc-800 rounded p-2"
        @click="logout()"
      >
        Logout
      </button>
    </div>
  </header>
</template>
