<script setup lang="ts">
import type { Task, ID } from '~~/types';

const props = defineProps<{
  task: Task;
}>();

const emit = defineEmits<{
  (e: 'delete', payload: ID): void;
}>();

const focused = ref(false);
onKeyStroke('Backspace', (_e) => {
  if (focused.value) emit('delete', props.task.id);
});
</script>

<template>
  <div :title="task.createdAt.toLocaleDateString()">
    <div
      @focus="focused = true"
      @blur="focused = false"
      tabindex="0"
      class="p-3 mt-4 mb-2 bg-zinc-500 rounded shadow-sm max-w-[280px] flex gap-2 focus:shadow focus:border focus:border-zinc-200 cursor-pointer"
    >
      <DragHandle class="mt-1" />
      <span datatest-id="task-title" class="text-white">{{ task.title }}</span>
    </div>
  </div>
</template>

<style>
.sortable-drag .task {
  transform: rotate(5deg);
}

.sortable-ghost .task {
  position: relative;
}

.sortable-ghost .task::after {
  content: '';
  @apply absolute top-0 bottom-0 left-0 right-0 bg-zinc-600 rounded;
}
</style>
