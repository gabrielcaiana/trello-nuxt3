import { deleteTaskById } from '~~/server/db/task';

export default defineEventHandler(async (event) => {
  const { id } = (await event.context.params) as Record<string, string>;

  try {
    await deleteTaskById(id!);
  } catch (error) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'Task not found',
      })
    );
  }

  return {
    message: 'Task deleted successfully',
  };
});
