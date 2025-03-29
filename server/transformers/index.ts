import type { User } from '~/types/user';

export const userTransformer = (user: User) => {
  const { password, ...rest } = user;
  return rest;
};
