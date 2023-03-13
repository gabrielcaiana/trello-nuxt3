<script setup lang="ts">
import type { Board, Column, Task } from '~/types/board';
import draggable from 'vuedraggable';
const alt = useKeyModifier('Alt');

const { getBoardById } = useBoard();
const { createColumn, updateColumnById, deleteColumnById } = useColumn();

const props = defineProps<{
  boardId: string;
}>();

let board = reactive<Board>({} as Board);
const loading = ref(false);

const loadBoard = async () => {
  try {
    loading.value = true;
    const data = (await getBoardById(props.boardId)) as {
      value: { board: Board };
    };
    board = data.value.board;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const addColumn = async () => {
  try {
    await createColumn('', props.boardId);
    await loadBoard();
  } catch (error) {
    console.error(error);
  }

  nextTick(() => {
    (
      document.querySelector(
        '.column:last-of-type .title-input'
      ) as HTMLInputElement
    ).focus();
  });
};

const editColumn = async (id: string, event: HTMLInputElement) => {
  const title = event.value;

  try {
    loading.value = true;
    await updateColumnById(id, title!);
    await loadBoard();
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const deleteColumn = async (id: string, event: HTMLInputElement) => {
  if (event.value !== '') return;

  try {
    loading.value = true;
    await deleteColumnById(id);
    await loadBoard();
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

onBeforeMount(() => {
  loadBoard();
});
</script>

<template>
  <div>
    <UILoading v-if="loading" />
    <div
      v-else
      class="flex items-start gap-4 overflow-x-auto h-full scrollbar scrollbar-thumb-transparent scrollbar-track-transparent"
    >
      <draggable
        v-model="board.columns"
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
                @keyup.enter="
                  editColumn(column.id, $event.target as HTMLInputElement)
                "
                @keydown.backspace="
                  deleteColumn(column.id, $event.target as HTMLInputElement)
                "
                type="text"
                :value="column.title"
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
                  <Task class="task" :task="task" />
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
        @click="addColumn"
        class="focus:bg-zinc-700 hover:bg-zinc-600 focus:shadow resize-none rounded bg-zinc-700 transition-colors text-zinc-500 px-2 text-left cursor-pointer whitespace-nowrap"
      >
        + Add Another Column
      </button>
    </div>
  </div>
</template>
