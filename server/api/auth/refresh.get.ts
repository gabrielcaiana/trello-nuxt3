import { sendError } from 'h3';
import { getRefreshTokenByToken } from '~~/server/db/refreshTokens';
import { decodeRefreshToken, generateTokens } from '~~/server/utils/jwt';
import { getUserById } from '~~/server/db/users';

export default defineEventHandler(async (event) => {
  const refresh_token = getCookie(event, 'refresh_token');

  if (!refresh_token) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: 'Refresh token is invalid',
      })
    );
  }

  const dbToken = await getRefreshTokenByToken(refresh_token);

  if (!dbToken) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: 'Refresh token is invalid',
      })
    );
  }

  const token = decodeRefreshToken(refresh_token);
  const { userId } = token as any;

  try {
    const user = await getUserById(userId);

    const { accessToken } = generateTokens(user!);

    return {
      access_token: accessToken,
    };
  } catch (error) {
    return sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage: 'Something went wrong',
      })
    );
  }
});
