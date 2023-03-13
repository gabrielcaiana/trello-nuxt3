import { createColumn } from '~/server/db/column';
import { getBoardById } from '~/server/db/board';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'please provide a body',
      })
    );
  }

  const { title, boardId } = body;

  if (!boardId || typeof boardId !== 'string' || boardId.trim().length === 0) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'Invalid board id',
      })
    );
  }

  if (!event.context.auth.user) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: 'user not found',
      })
    );
  }

  try {
    await getBoardById(boardId);
  } catch (error) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'Board not found',
      })
    );
  }

  const column = await createColumn(event.context.auth.user.id, title, boardId);

  return {
    column,
  };
});
