<script setup lang="ts">
import type { Task } from '#shared/types/board';

const { createTask } = useTask();

const { setBoard, stateBoard } = useStateBoard();

const props = defineProps<{
  columnId: string;
}>();

const focused = ref(false);
const title = ref('');

const addTask = async (e: Event) => {
  e.preventDefault();

  const taskTitle = title.value.trim();

  if (!taskTitle) return;

  try {
    const task = (await createTask(taskTitle, props.columnId)) as {
      value: Task;
    };

    setBoard({
      ...stateBoard().value,
      columns: stateBoard().value.columns.map((column) => ({
        ...column,
        tasks:
          column.id === props.columnId
            ? [...column.tasks, task.value]
            : column.tasks,
      })),
    });
  } catch (error) {
    console.error(error);
  }

  title.value = '';
};
</script>

<template>
  <textarea
    v-model="title"
    :placeholder="!focused ? '+ Add A Card' : 'Enter a title for this card'"
    style="outlined: none !important"
    :class="[
      'focus:bg-zinc-700 hover:bg-zinc-600 focus:shadow resize-none rounded bg-zinc-700 transition-colors text-zinc-500 px-2 w-full text-left cursor-pointer mt-2',
      {
        'h-7': !focused,
        'h-20': focused,
      },
    ]"
    @keydown.tab="addTask"
    @keyup.enter="addTask"
    @blur="focused = false"
    @focus="focused = true"
  />
</template>
