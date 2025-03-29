import { getBoardById, orderBoardByItemsId } from '~~/server/db/board';

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

  const { orderItems } = body as Record<string, string[]>;

  if (!orderItems) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'please provide a orderItems',
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

  let board;

  try {
    board = await orderBoardByItemsId(orderItems);
  } catch (error) {
    return sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage: 'Error updating board',
      })
    );
  }

  return {
    statusCode: 200,
    message: 'Board updated successfully',
    board,
  };
});
