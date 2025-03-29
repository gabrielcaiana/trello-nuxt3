import { getAllBoards } from '~~/server/db/board';
import type { Board } from '~~/shared/types/board';

export default defineEventHandler(async (event) => {
  let boards: Board[];

  const userId = event.context?.auth?.user?.id;

  if (!userId) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        message: 'Unauthorized',
      })
    );
  }

  try {
    boards = await getAllBoards(userId);
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
