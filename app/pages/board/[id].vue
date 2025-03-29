<script setup lang="ts">
import type { Board } from '~~/shared/types/board';

const route = useRoute();
const { id } = route.params;

const { getBoardById } = useBoard();

let board = reactive<Board>({} as Board);

try {
  const data = (await getBoardById(id)) as { value: { board: Board } };
  board = data.value.board;
} catch (error) {
  console.error(error);
}

useHead({
  title: board.title,
});
</script>

<template>
  <div>
    <Board :boardId="board.id" />
  </div>
</template>
