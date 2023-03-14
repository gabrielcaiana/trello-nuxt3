import { Board } from '~/types/board';

export default () => {
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
