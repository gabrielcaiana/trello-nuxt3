import { createBoard } from '~/server/db/board';

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
    await createBoard(title, event.context.auth.user.id);
  } catch (error) {
    return sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage: 'Something went wrong',
      })
    );
  }

  return {
    statusCode: 201,
    statusMessage: 'Board created successfully',
  };
});
