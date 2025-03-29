import type { Token } from '#shared/types/token';
import type { ID } from '#shared/types/user';
import { prisma } from '.';

interface RefreshToken {
  token: Token;
  userId: ID;
}

export const createRefreshToken = ({ token, userId }: RefreshToken) => {
  return prisma.refreshToken.create({
    data: {
      token,
      userId,
    },
  });
};

export const getRefreshTokenByToken = (token: Token) => {
  return prisma.refreshToken.findUnique({
    where: {
      token,
    },
  });
};

export const deleteRefreshToken = (token: Token) => {
  return prisma.refreshToken.delete({
    where: {
      token,
    },
  });
};
