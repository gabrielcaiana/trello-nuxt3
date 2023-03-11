import { getBoardById, updateBoardById } from '~/server/db/board';

export default defineEventHandler(async (event) => {
  const { id } = event.context.params as Record<string, string>;

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

  const { title } = body;

  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'Invalid task title',
      })
    );
  }

  try {
    await getBoardById(id);
  } catch (error) {
    return sendError(
      event,
      createError({
        statusCode: 404,
        statusMessage: 'Board not found',
      })
    );
  }

  try {
    await updateBoardById(id, title);
  } catch (error) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'Failed to update board',
      })
    );
  }

  return {
    statusCode: 200,
    message: 'Board updated successfully',
  };
});
