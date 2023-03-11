import { getColumnById } from '~/server/db/column';

export default defineEventHandler(async (event) => {
  const { id } = (await event.context.params) as Record<string, string>;

  let column;

  try {
    column = await getColumnById(id);
  } catch (error) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'Column not found',
      })
    );
  }

  return {
    column: column,
  };
});
