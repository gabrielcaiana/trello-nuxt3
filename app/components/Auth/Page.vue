<script setup lang="ts">
const { $bus } = useNuxtApp();
const currentPage = ref('login');
const AuthLogin = resolveComponent('AuthLogin');
const AuthRegister = resolveComponent('AuthRegister');

$bus.$on('auth:form', (data: { page: string }) => {
  currentPage.value = data.page;
});
</script>

<template>
  <div class="min-h-[90vh] flex flex-col items-center justify-center">
    <Transition
      :name="currentPage === 'login' ? 'slide-right' : 'slide-left'"
      mode="out-in"
    >
      <component :is="currentPage === 'login' ? AuthLogin : AuthRegister" />
    </Transition>
  </div>
</template>

<style scoped>
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s;
}
.slide-left-enter-from {
  opacity: 0;
  transform: translate(50px, 0);
}
.slide-left-leave-to {
  opacity: 0;
  transform: translate(-50px, 0);
}
.slide-right-enter-from {
  opacity: 0;
  transform: translate(-50px, 0);
}
.slide-right-leave-to {
  opacity: 0;
  transform: translate(50px, 0);
}
</style>
