<script setup lang="ts">
useHead({
  title: 'Login',
});
const { $bus } = useNuxtApp();
const { signIn } = useAuth();

const router = useRouter();

const data = reactive({
  email: '',
  password: '',
  loading: false,
});

const handleLogin = async () => {
  data.loading = true;
  try {
    await signIn({ email: data.email, password: data.password });
    router.push('/');
  } catch (error) {
    console.error(error);
    $bus.$emit('toast', { 
      message: error instanceof Error ? error.message : 'Erro ao fazer login', 
      type: 'error' 
    });
  } finally {
    data.loading = false;
  }
};

const handleRegisterPage = () => {
  $bus.$emit('auth:form', { page: 'register' });
};
</script>

<template>
  <div class="w-full max-w-[400px]">
    <h1 class="text-white text-3xl w-full text-left mb-1">Seja bem vindo</h1>
    <p class="text-gray-200 mb-5">Faça login para utilizar o trello Nuxt</p>

    <VForm class="flex flex-col" @submit="handleLogin">
      <div class="flex flex-col gap-1 mb-2">
        <label class="text-sm text-gray-300" for="email">Email</label>
        <VField
          id="email"
          v-model="data.email"
          class="bg-white/10 text-white p-2 rounded-md"
          type="email"
          name="email"
          rules="required|email"
        />
        <VErrorMessage name="email" class="text-red-500" />
      </div>

      <div class="flex flex-col gap-1">
        <label class="text-sm text-gray-300" for="password">Senha</label>
        <VField
          id="password"
          v-model="data.password"
          class="bg-white/10 text-white p-2 rounded-md"
          type="password"
          name="password"
          rules="required"
        />
        <VErrorMessage name="password" class="text-red-500" />
      </div>

      <div
        v-if="data.loading"
        class="flex items-center justify-center w-full mt-4"
      >
        <UILoading />
      </div>

      <div v-else class="flex flex-col gap-3 mt-4">
        <UIButton>Entrar</UIButton>

        <UIButton type="button" color="secondary" @click="handleRegisterPage"
          >Cadastre-se</UIButton
        >
      </div>
    </VForm>
  </div>
</template>
