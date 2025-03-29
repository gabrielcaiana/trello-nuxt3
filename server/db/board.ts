import { prisma } from '~/server/db';
import type { Board, Column, ID } from '~/types/board';
import { deleteColumnsAndTasksByBoardId, getAllColumns } from './column';

export const createBoard = async (title: string, userId: ID) => {
  const board = await prisma.board.create({
    data: {
      title,
      userId,
    },
  });

  return board;
};

export const getAllBoards = async (userId: ID): Promise<Board[]> => {
  const boards = (await prisma.board.findMany({
    where: {
      userId,
    },
    include: {
      columns: {
        include: {
          tasks: true,
        },
      },
    },
  })) as Board[];

  return boards;
};

export const getBoardById = async (id: ID): Promise<Board | null> => {
  const board = (await prisma.board.findUnique({
    where: {
      id,
    },
    include: {
      columns: {
        include: {
          tasks: true,
        },
      },
    },
  })) as Board | null;

  return board;
};

export const updateBoardById = async (id: ID, title: string) => {
  const board = await prisma.board.update({
    where: {
      id,
    },
    data: {
      title,
    },
  });

  return board;
};

export const orderBoardByItemsId = async (
  orderItems: string[]
): Promise<Column[]> => {
  let columns: Column[] = [];

  const data = (await getAllColumns()) as { columns: Column[] };
  columns = data.columns;

  columns.sort((columnA, columnB) => {
    const indexA = orderItems.indexOf(columnA.id);
    const indexB = orderItems.indexOf(columnB.id);
    return indexA - indexB;
  });

  return columns as Column[];
};

export const deleteBoard = async (id: ID) => {
  try {
    await deleteColumnsAndTasksByBoardId(id);
  } catch (error) {
    return {
      statusCode: 400,
      message: 'Could not delete columns',
    };
  }

  return prisma.board.delete({
    where: {
      id,
    },
  });
};
