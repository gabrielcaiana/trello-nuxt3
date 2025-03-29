<script setup lang="ts">
import type { Task } from '~~/shared/types/board';
import { ref } from 'vue';
import { onKeyStroke } from '@vueuse/core';

const { deleteTask } = useTask();

const { setBoard, stateBoard } = useStateBoard();

const props = defineProps<{
  task: Task;
}>();

const focused = ref(false);
onKeyStroke('Backspace', async (_e) => {
  if (focused.value) {
    await deleteTask(props.task.id);

    setBoard({
      ...stateBoard().value,
      columns: stateBoard().value.columns.map((column) => ({
        ...column,
        tasks: column.tasks.filter((task) => task.id !== props.task.id),
      })),
    });
  }
});
</script>

<template>
  <div :title="new Date(task.createdAt).toLocaleDateString()">
    <div
      @focus="focused = true"
      @blur="focused = false"
      tabindex="0"
      class="p-3 mt-4 mb-2 bg-zinc-500 rounded shadow-sm max-w-[280px] flex gap-2 focus:shadow focus:border focus:border-zinc-200 cursor-pointer"
    >
      <div>
        <DragHandle class="mt-1" />
      </div>
      <span datatest-id="task-title" class="text-white break-words">{{
        task.title
      }}</span>
    </div>
  </div>
</template>

<style>
.sortable-drag .task {
  @apply rotate-6;
}

.sortable-ghost .task {
  @apply relative;
}

.sortable-ghost .task::after {
  @apply content-[''] absolute top-0 bottom-0 left-0 right-0 bg-zinc-600 rounded;
}
</style>
