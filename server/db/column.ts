import { prisma } from '~/server/db';
import { deleteTasksByColumnId } from './task';

export const createColumn = (
  userId: string,
  title: string,
  boardId: string
) => {
  return prisma.column.create({
    data: {
      title,
      userId,
      boardId,
    },
  });
};

export const getAllColumns = async () => {
  const columns = await prisma.column.findMany({
    include: {
      tasks: true,
    },
  });

  return {
    columns,
  };
};

export const getColumnById = async (id: string) => {
  const column = await prisma.column.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      tasks: true,
    },
  });

  return {
    column,
  };
};

export const updateColumn = async (id: string, title: string) => {
  const column = await prisma.column.update({
    where: {
      id,
    },
    data: {
      title,
    },
    include: {
      tasks: true,
    },
  });

  return column;
};

export const deleteColumn = async (id: string) => {
  try {
    await deleteTasksByColumnId(id);
  } catch (error) {
    return {
      statusCode: 400,
      message: 'Failed to delete tasks',
    };
  }

  return prisma.column.delete({
    where: {
      id,
    },
  });
};

export const deleteColumnsAndTasksByBoardId = async (boardId: string) => {
  const columns = await prisma.column.findMany({
    where: {
      boardId,
    },
  });

  for (const column of columns) {
    try {
      await deleteTasksByColumnId(column.id);
    } catch (error) {
      return {
        statusCode: 400,
        message: 'Failed to delete tasks',
      };
    }
  }

  return prisma.column.deleteMany({
    where: {
      boardId,
    },
  });
};
