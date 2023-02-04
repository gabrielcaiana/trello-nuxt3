<script setup lang="ts">
import type { Task } from '~~/types';
import { nanoid } from 'nanoid';

import { ref } from 'vue';

const emit = defineEmits<{
  (e: 'add', payload: Task): void;
}>();

const focused = ref(false);
const title = ref('');

const createTask = (e: Event) => {
  e.preventDefault();

  const taskTitle = title.value.trim();

  if (!taskTitle) return;

  emit('add', {
    id: nanoid(),
    title: taskTitle,
    createdAt: new Date(),
  } as Task);

  title.value = '';
};
</script>

<template>
  <textarea
    v-model="title"
    :placeholder="!focused ? '+ Add A Card' : 'Enter a title for this card'"
    @keydown.tab="createTask"
    @keyup.enter="createTask"
    @blur="focused = false"
    @focus="focused = true"
    style="outlined: none !important"
    :class="[
      'focus:bg-zinc-700 hover:bg-zinc-600 focus:shadow resize-none rounded bg-zinc-700 transition-colors text-zinc-500 px-2 w-full text-left cursor-pointer mt-2',
      {
        'h-7': !focused,
        'h-20': focused,
      },
    ]"
  />
</template>
