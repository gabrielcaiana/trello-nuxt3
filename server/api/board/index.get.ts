import { getAllBoards } from '~~/server/db/board';
import { Board } from '~/types/board';

export default defineEventHandler(async (event) => {
  let boards: Board[];

  try {
    boards = await getAllBoards();
  } catch (error) {
    return sendError(
      event,
      createError({
        statusCode: 500,
        message: 'Error getting boards',
      })
    );
  }

  return boards;
});
