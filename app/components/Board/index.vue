<script setup lang="ts">
import type { Board, Column, Task } from '~~/shared/types/board';
import draggable from 'vuedraggable';
const alt = useKeyModifier('Alt');

const { getBoardById } = useBoard();
const { createColumn, updateColumnById, deleteColumnById } = useColumn();

const { setBoard, stateBoard } = useStateBoard();

const props = defineProps<{
  boardId: string;
}>();

const loading = ref(false);

const loadBoard = async () => {
  try {
    loading.value = true;
    const data = (await getBoardById(props.boardId)) as {
      value: { board: Board };
    };
    setBoard(data.value.board);
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const addColumn = async () => {
  try {
    const data = (await createColumn('', props.boardId)) as {
      value: { column: Column };
    };

    setBoard({
      ...stateBoard().value,
      columns: [...stateBoard().value.columns, data.value.column],
    });
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
    const data = (await updateColumnById(id, title)) as { value: Column };

    setBoard({
      ...stateBoard().value,
      columns: stateBoard().value.columns.map((column) =>
        column.id === data.value.id ? data.value : column
      ),
    });

    nextTick(() => event.blur());
  } catch (error) {
    console.error(error);
  }
};

const deleteColumn = async (id: string, event: HTMLInputElement) => {
  if (event.value !== '') return;

  try {
    await deleteColumnById(id);

    setBoard({
      ...stateBoard().value,
      columns: stateBoard().value.columns.filter((column) => column.id !== id),
    });
  } catch (error) {
    console.error(error);
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
        v-model="stateBoard().value.columns"
        group="columns"
        item-key="id"
        class="flex gap-4 items-start"
        :animation="150"
        handle=".drag-handle"
      >
        <template #item="{ element: column }: { element: Column }">
          <div class="column bg-white/5 p-5 rounded min-w-[280px]">
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
              <NewTask @reload:board="loadBoard" :columnId="column.id" />
            </footer>
          </div>
        </template>
      </draggable>
      <button
        @click="addColumn"
        class="focus:bg-zinc-700 hover:bg-zinc-600 focus:shadow resize-none rounded bg-zinc-900 transition-colors text-zinc-500 px-2 text-left cursor-pointer whitespace-nowrap"
      >
        + Add Another Column
      </button>
    </div>
  </div>
</template>
