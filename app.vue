<script setup lang="ts">
const { useStateUser, initAuth, useStateLoading } = useAuth();
const user = useStateUser();
const isAuthLoading = useStateLoading();

onBeforeMount(() => {
  initAuth();
});
</script>

<template>
  <div class="min-h-screen bg-zinc-900">
    <UIToast />

    <div class="container mx-auto py-10">
      <UILoading v-if="isAuthLoading" />

      <div v-else-if="user">
        <VitePwaManifest />
        <NuxtLoadingIndicator />
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </div>

      <AuthPage v-else />
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
