<script setup lang="ts">
interface HandleError {
  url: string;
  statusCode: string;
  statusMessage: string;
  message: string;
  stack: string;
}

const props = defineProps<{
  error: HandleError;
}>();

const message = computed(() => String(props.error?.message || ''));
const is404 = computed(
  () => props.error?.statusCode === '404' || message.value?.includes('404')
);
const isDev = process.dev;
const handleError = () => clearError({ redirect: '/' });
</script>
<template>
  <NuxtLayout name="error">
    <div class="flex flex-col items-center mt-12 text-white">
      <div class="text-2xl mb-2">
        {{ is404 ? 'Página não encontrada' : 'Ocorreu um erro inesperado' }}
      </div>
      <div class="text-xl text-neutral-500">
        Parece que você seguiu um link quebrado ou inseriu um URL que não
        existem neste site.
      </div>
      <pre class="my-4" v-if="isDev">{{ error }}</pre>
      <button
        class="bg-neutral-400 text-white p-3 rounded-md hover:bg-neutral-600"
        @click="handleError"
      >
        Retornar ao início
      </button>
    </div>
  </NuxtLayout>
</template>
