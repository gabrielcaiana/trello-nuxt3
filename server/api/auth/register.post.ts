import  type { User } from '~/types/user';
import { createUser } from '~/server/db/users';
import { sendError } from 'h3';
import { userTransformer } from '~/server/transformers';

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

  if (!body) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'please provide a body',
      })
    );
  }

  if (!body.email || !body.password || !body.repeatPassword) {
    return sendError(
      event,
      createError({ statusCode: 400, statusMessage: 'fields missing' })
    );
  }

  if (body.password !== body.repeatPassword) {
    return sendError(
      event,
      createError({ statusCode: 400, statusMessage: 'passwords do not match' })
    );
  }

  const user = (await createUser({
    email: body.email,
    name: body.name || null,
    password: body.password,
    profileImage: body.profileImage || null,
  })) as User;

  return {
    body: userTransformer(user),
  };
});
