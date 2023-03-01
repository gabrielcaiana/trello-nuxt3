import { prisma } from '.';
import { User, ID } from '~/types/user';
import bcrypt from 'bcrypt';

export const createUser = async (userData: User) => {
  const verifyUserExists = await getUserByEmail(userData.email);

  if (verifyUserExists) {
    throw createError({
      statusCode: 400,
      statusMessage: 'user already exists',
    });
  }

  const data = {
    ...userData,
    password: bcrypt.hashSync(userData.password, 10),
  };

  return prisma.user.create({ data });
};

export const getUserByEmail = (email: string) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const getUserById = (id: ID) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
};
