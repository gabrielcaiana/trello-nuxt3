import { getTaskById } from '~/server/db/task';

export default defineEventHandler(async (event) => {
  const { id } = event.context.params as Record<string, string>;

  let task;

  try {
    task = await getTaskById(id);
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
    task,
  };
});
