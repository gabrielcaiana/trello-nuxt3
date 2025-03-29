<script setup lang="ts">
const { useStateUser, logout } = useAuth();
const user = useStateUser();

const handleLogout = () => {
  logout();
};
</script>

<template>
  <header
    datatest-id="header"
    class="border-b border-1 border-zinc-800 mb-10 pb-6 flex justify-between items-center"
  >
    <nuxt-link to="/" class="text-4xl text-white font-medium"
      >Dev Kanban</nuxt-link
    >

    <div v-if="user" class="flex gap-2 items-center">
      <img
        v-if="user.profileImage"
        :src="user.profileImage"
        :alt="user.name!"
        class="rounded-full w-6 h-6"
      >

      <div class="text-white flex gap-3 items-center">
        <span class="text-gray-300 font-medium"> {{ user.name }}</span>
        <Icon
          name="ph:sign-out"
          size="16"
          class="cursor-pointer hover:text-green-500 transition-colors mt-1"
          @click="handleLogout"
        />
      </div>
    </div>
  </header>
</template>
