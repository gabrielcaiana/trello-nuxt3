<script setup lang="ts">
import type { User } from '#shared/types/user';

useHead({
  title: 'Login',
});
const { $bus } = useNuxtApp();
const { signUp } = useAuth();

const data = reactive<User>({
  name: '',
  email: '',
  password: '',
  profileImage: '',
  repeatPassword: '',
});

const handleRegister = async () => {
  try {
    await signUp(data);
    handleLoginPage();
    $bus.$emit('toast', {
      message: 'Usuário criado com sucesso!',
      type: 'success',
    });
  } catch (error) {
    console.error(error);
  }
};

const handleLoginPage = () => {
  $bus.$emit('auth:form', { page: 'login' });
};
</script>

<template>
  <div class="w-full max-w-[400px]">
    <h1 class="text-white text-3xl w-full text-left mb-1">Criar nova conta</h1>

    <VForm class="flex flex-col" @submit="handleRegister">
      <div class="flex flex-col gap-1 mb-2">
        <label class="text-sm text-gray-300" for="name">Nome</label>
        <VField
          id="name"
          v-model="data.name"
          class="bg-white/10 text-white p-2 rounded-md"
          type="text"
          name="name"
          rules="required|minMax:5,20"
        />
        <VErrorMessage name="name" class="text-red-500" />
      </div>

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

      <div class="flex flex-col gap-1 mb-2">
        <label class="text-sm text-gray-300" for="imageProfileUrl"
          >Imagem Url</label
        >
        <VField
          id="imageProfileUrl"
          v-model="data.profileImage"
          class="bg-white/10 text-white p-2 rounded-md"
          type="text"
          name="imageProfileUrl"
          rules="required|url"
        />
        <VErrorMessage name="imageProfileUrl" class="text-red-500" />
      </div>

      <div class="flex flex-col gap-1">
        <label class="text-sm text-gray-300" for="password">Senha</label>
        <VField
          id="password"
          v-model="data.password"
          class="bg-white/10 text-white p-2 rounded-md"
          type="password"
          name="password"
          rules="required|minMax:5,16"
        />
        <VErrorMessage name="password" class="text-red-500" />
      </div>

      <div class="flex flex-col gap-1">
        <label class="text-sm text-gray-300" for="password"
          >Repetir senha</label
        >
        <VField
          id="repeatPassword"
          v-model="data.repeatPassword"
          class="bg-white/10 text-white p-2 rounded-md"
          type="password"
          name="repeatPassword"
          rules="required|minMax:5,16|confirmed:password"
        />
        <VErrorMessage name="repeatPassword" class="text-red-500" />
      </div>

      <div class="flex flex-col gap-3 mt-4">
        <UIButton>Registrar</UIButton>
        <UIButton type="button" color="secondary" @click="handleLoginPage"
          >Ir para página de login</UIButton
        >
      </div>
    </VForm>
  </div>
</template>
