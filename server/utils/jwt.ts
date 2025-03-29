import jwt from 'jsonwebtoken';
import type { User } from '#shared/types/user';
import type { Token } from '#shared/types/token';
import type { H3Event } from 'h3';

const config = useRuntimeConfig();

const generateAccessToken = (user: User) => {
  return jwt.sign({ userId: user.id }, config.jwtAccessSecret, {
    expiresIn: '60m',
  });
};

const generateRefreshToken = (user: User) => {
  return jwt.sign({ userId: user.id }, config.jwtRefreshSecret, {
    expiresIn: '4h',
  });
};

export const generateTokens = (user: User) => {
  return {
    accessToken: generateAccessToken(user),
    refreshToken: generateRefreshToken(user),
  };
};

export const sendRefreshToken = (event: H3Event, token: Token) => {
  setCookie(event, 'refresh_token', token, {
    httpOnly: true,
    sameSite: true,
  });
};

export const decodeRefreshToken = (token: Token) => {
  try {
    return jwt.verify(token, config.jwtRefreshSecret);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const decodeAccessToken = (token: Token) => {
  try {
    return jwt.verify(token, config.jwtAccessSecret);
  } catch (error) {
    console.error(error);
    return null;
  }
};
