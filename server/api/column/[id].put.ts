import { updateColumn, getColumnById } from '~~/server/db/column';

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
        statusMessage: 'Invalid column title',
      })
    );
  }

  try {
    await getColumnById(id!);
  } catch (error) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'Column not found',
      })
    );
  }

  let column;

  try {
    column = await updateColumn(id!, title);
  } catch (error) {
    sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage: 'Faliure to update task',
      })
    );
  }

  return column;
});
