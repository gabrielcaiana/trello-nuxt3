import { deleteBoard, getBoardById } from '~/server/db/board';

export default defineEventHandler(async (event) => {
  const { id } = event.context.params as Record<string, string>;

  try {
    await getBoardById(id);
  } catch (error) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'Board not found',
      })
    );
  }

  try {
    await deleteBoard(id);
  } catch (error) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'Failed to delete board',
      })
    );
  }

  return {
    statusCode: 200,
    message: 'Board deleted successfully',
  };
});
