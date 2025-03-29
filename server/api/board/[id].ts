import { getBoardById } from '~~/server/db/board';
import type { Board } from '~~/shared/types/board';

export default defineEventHandler(async (event) => {
  const { id } = event.context.params as Record<string, string>;

  let board: Board | null;

  try {
    board = await getBoardById(id);
  } catch (error) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'Board not found',
      })
    );
  }

  return {
    board,
  };
});
