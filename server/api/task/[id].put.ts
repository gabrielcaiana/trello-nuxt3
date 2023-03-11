import { getColumnById } from '~/server/db/column';
import { getTaskById, updateTaskById } from '~/server/db/task';

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

  const { title, columnId } = body;

  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'Invalid task title',
      })
    );
  }

  if (
    !columnId ||
    typeof columnId !== 'string' ||
    columnId.trim().length === 0
  ) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'Invalid column ID',
      })
    );
  }

  try {
    await getTaskById(id);
  } catch (error) {
    return sendError(
      event,
      createError({
        statusCode: 404,
        statusMessage: 'Task not found',
      })
    );
  }

  try {
    await getColumnById(columnId!);
  } catch (error) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'Column not found',
      })
    );
  }

  try {
    await updateTaskById(id, title, columnId!);
  } catch (error) {
    sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage: 'Faliure to update task',
      })
    );
  }

  return {
    statusCode: 200,
    message: 'Task updated successfully',
  };
});
