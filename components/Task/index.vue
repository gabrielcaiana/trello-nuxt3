<script setup lang="ts">
import type { Task } from '~~/types';

defineProps<{
  task: Task;
}>();
</script>

<template>
  <div :title="task.createdAt.toLocaleDateString()">
    <div
      class="p-3 mt-4 mb-2 bg-zinc-500 rounded shadow-sm max-w-[250px] flex gap-2"
    >
      <DragHandle class="mt-1" />
      <span datatest-id="task-title" class="text-white">{{ task.title }}</span>
    </div>
  </div>
</template>
