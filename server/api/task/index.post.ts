import { createTask } from '~~/server/db/task';
import { getColumnById } from '~~/server/db/column';

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

  const { title, columnId } = body;

  if (!title || !columnId) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'missing title or columnId',
      })
    );
  }

  let column;

  try {
    column = await getColumnById(columnId);
  } catch (error) {
    console.error(error);
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'Column not found',
      })
    );
  }

  if (!column) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'column not found',
      })
    );
  }

  const task = await createTask(event.context.auth.user.id, title, columnId);

  return task;
});
