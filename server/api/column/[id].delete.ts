import { deleteColumn } from '~~/server/db/column';

export default defineEventHandler(async (event) => {
  const { id } = event.context.params as Record<string, string>;

  try {
    await deleteColumn(id!);
  } catch (error) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'Failed to delete column',
      })
    );
  }

  return {
    statusCode: 200,
    message: 'Column deleted successfully',
  };
});
