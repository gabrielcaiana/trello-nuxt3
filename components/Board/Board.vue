<script setup lang="ts">
import type { Column } from '~~/types';
import { nanoid } from 'nanoid';
const columns = ref<Column[]>([
  {
    id: nanoid(),
    title: 'Backlog',
    tasks: [
      {
        id: nanoid(),
        title: 'Create my kanban',
        createdAt: new Date(),
      },
      {
        id: nanoid(),
        title: 'develop authentication feature',
        createdAt: new Date(),
      },

      {
        id: nanoid(),
        title: 'develop backend with prisma',
        createdAt: new Date(),
      },
    ],
  },
  {
    id: nanoid(),
    title: 'Selected for Dev',
    tasks: [],
  },
  {
    id: nanoid(),
    title: 'In Progress',
    tasks: [],
  },
  {
    id: nanoid(),
    title: 'QA',
    tasks: [],
  },
  {
    id: nanoid(),
    title: 'Complete',
    tasks: [],
  },
]);
</script>

<template>
  <div class="flex gap-4 overflow-x-auto items-start">
    <div
      v-for="{ id, title, tasks } in columns"
      :key="id"
      class="bg-zinc-800 p-5 rounded min-w-[250px]"
    >
      <header class="text-white font-bold text-xl">{{ title }}</header>
      <Task v-for="task in tasks" :key="id" :task="task" />
      <footer>
        <button class="text-zinc-500">+ Add a Card</button>
      </footer>
    </div>
  </div>
</template>
