<script setup lang="ts">
import type { Column, Task } from '~~/types';
import draggable from 'vuedraggable';
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

const alt = useKeyModifier('Alt');

const deleteTask = (id: string): void => {
  columns.value.forEach((column: Column) => {
    const taskIndex = column.tasks.findIndex((task: Task) => task.id === id);
    if (taskIndex !== -1) {
      column.tasks.splice(taskIndex, 1);
      return;
    }
  });
};
</script>

<template>
  <div>
    <draggable
      v-model="columns"
      group="columns"
      item-key="id"
      class="flex gap-4 overflow-x-auto items-start"
      :animation="150"
      handle=".drag-handle"
    >
      <template #item="{ element: column }: { element: Column }">
        <div class="bg-zinc-800 p-5 rounded min-w-[280px]">
          <header class="text-white font-bold flex items-center gap-1">
            <DragHandle />
            {{ column.title }}
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
  </div>
</template>
