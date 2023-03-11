import UrlPattern from 'url-pattern';
import { Token } from '~/types/token';
import { decodeAccessToken } from '../utils/jwt';
import { sendError } from 'h3';
import { getUserById } from '../db/users';
import { userTransformer } from '../transformers';

interface Decoded {
  userId: string;
}

export default defineEventHandler(async (event) => {
  const endpoints = [
    '/api/auth/user',
    '/api/board',
    '/api/board/:id',
    '/api/column',
    '/api/column/:id',
    '/api/task',
    '/api/task/:id',
  ];

  const isHandled = endpoints.some((endpoint) => {
    const pattern = new UrlPattern(endpoint);
    return pattern.match(event.node.req.url!);
  });

  if (!isHandled) return;

  const token = event.node.req.headers['authorization']?.split(' ')[1] as Token;

  // Decode the token
  const decoded = decodeAccessToken(token) as Decoded;

  if (!decoded) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: 'Unauthorized',
      })
    );
  }

  try {
    const { userId } = decoded;
    const user = await getUserById(userId);

    event.context.auth = {
      user: userTransformer(user!),
    };
  } catch (error) {
    return;
  }
});
