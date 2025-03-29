import type { Board } from '~~/shared/types/board';

export function useStateBoard () {
  const stateBoard = () => useState<Board>('board');

  const setBoard = (newBoard: Board) => {
    const board = stateBoard();
    board.value = newBoard;
  };

  return {
    stateBoard,
    setBoard,
  };
};
