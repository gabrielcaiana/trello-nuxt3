import { deleteRefreshToken } from '~~/server/db/refreshTokens';
import type { Token } from '~~/shared/types/token';

export default defineEventHandler(async (event) => {
  try {
    const cookie = getCookie(event, 'refresh_token') as Token;
    await deleteRefreshToken(cookie);
  } catch (error) {
    console.error(error);
    sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'email or password is invalid',
      })
    );
  }

  sendRefreshToken(event, '');

  return {
    message: 'Logout successful',
  };
});
