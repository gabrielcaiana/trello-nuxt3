<script setup lang="ts">
import type { Column, Task } from '~~/types';
import draggable from 'vuedraggable';
import { nanoid } from 'nanoid';
const columns = useLocalStorage<Column[]>('trelloBoard', []);

const alt = useKeyModifier('Alt');

const createColumn = () => {
  const column: Column = {
    id: nanoid(),
    title: '',
    tasks: [],
  };

  columns.value.push(column);
  nextTick(() => {
    (
      document.querySelector(
        '.column:last-of-type .title-input'
      ) as HTMLInputElement
    ).focus();
  });
};

const deleteTask = (id: string): void => {
  columns.value.forEach((column: Column) => {
    const taskIndex = column.tasks.findIndex((task: Task) => task.id === id);
    if (taskIndex !== -1) {
      column.tasks.splice(taskIndex, 1);
      return;
    }
  });
};

const deleteColumn = (id: string): void => {
  columns.value = columns.value.filter(
    (c: Column) => c.title !== '' || c.id !== id
  );
};
</script>

<template>
  <div
    class="flex items-start gap-4 overflow-x-auto h-full scrollbar scrollbar-thumb-transparent scrollbar-track-transparent"
  >
    <draggable
      v-model="columns"
      group="columns"
      item-key="id"
      class="flex gap-4 items-start"
      :animation="150"
      handle=".drag-handle"
    >
      <template #item="{ element: column }: { element: Column }">
        <div class="column bg-zinc-800 p-5 rounded min-w-[280px]">
          <header class="text-white font-bold flex items-center gap-1">
            <DragHandle />
            <input
              class="title-input bg-transparent focus:shadow focus:border focus:border-zinc-200 rounded w-4/5"
              @keyup.enter="($event.target as HTMLInputElement).blur()"
              @keydown.backspace="deleteColumn(column.id)"
              type="text"
              v-model="column.title"
            />
          </header>
          <draggable
            v-model="column.tasks"
            :group="{ name: ' tasks', pull: alt ? 'clone' : true }"
            item-key="id"
            :animation="150"
            handle=".drag-handle"
          >
            <template #item="{ element: task }: { element: Task }">
              <div>
                <Task class="task" :task="task" @delete="deleteTask($event)" />
              </div>
            </template>
          </draggable>
          <footer>
            <NewTask @add="column.tasks.push($event)" />
          </footer>
        </div>
      </template>
    </draggable>
    <button
      @click="createColumn"
      class="focus:bg-zinc-700 hover:bg-zinc-600 focus:shadow resize-none rounded bg-zinc-700 transition-colors text-zinc-500 px-2 text-left cursor-pointer whitespace-nowrap"
    >
      + Add Another Column
    </button>
  </div>
</template>
