<script setup lang="ts">
const user = ref(false);
</script>

<template>
  <div class="min-h-screen bg-zinc-900">
    <div class="container mx-auto py-10">
      <AuthPage v-if="!user" />

      <div v-else>
        <VitePwaManifest />
        <NuxtLoadingIndicator />
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </div>
    </div>
  </div>
</template>
<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
