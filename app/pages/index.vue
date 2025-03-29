<script setup lang="ts">
import type { Board } from '~~/shared/types/board';

useHead({
  title: 'Home',
});

const { getBoards } = useBoard();

let boards = reactive<Board[]>([]);

try {
  boards = (await getBoards()) as Board[];
} catch (error) {
  console.error(error);
}
</script>

<template>
  <div>
    <h1 class="text-white font-medium">Selecione algum board abaixo:</h1>

    <ul class="flex flex-wrap gap-4 mt-6">
      <nuxt-link
        v-for="board in boards"
        :key="board.id"
        :to="`/board/${board.id}`"
        class="p-4 bg-white/20 text-white font-medium cursor-pointer hover:bg-white/40 transitions-colors min-w-[200px] text-center rounded-md"
      >
        {{ board.title }}
      </nuxt-link>
    </ul>
  </div>
</template>
