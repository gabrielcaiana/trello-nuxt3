import type { User } from '#shared/types/user';

export const userTransformer = (user: User) => {
  const { password, ...rest } = user;
  return rest;
};
