import { prisma } from '~~/server/db';
import type { Task } from '~~/shared/types/board';
import type { ID } from '~~/shared/types/user';

export const getAllTasks = async (): Promise<Task[] | null> => {
  const tasks = await prisma.task.findMany();

  return tasks;
};

export const getTaskById = async (id: string): Promise<Task | null> => {
  const task = await prisma.task.findUnique({
    where: {
      id,
    },
  });

  return task;
};

export const createTask = (userId: string, title: string, columnId: string) => {
  return prisma.task.create({
    data: {
      title,
      columnId,
      userId,
    },
  });
};

export const updateTaskById = (id: ID, title: string, columnId: ID) => {
  return prisma.task.update({
    where: {
      id,
    },
    data: {
      title,
      columnId,
    },
  });
};

export const deleteTaskById = (id: string) => {
  return prisma.task.delete({
    where: {
      id,
    },
  });
};
export const deleteTasksByColumnId = (columnId: string) => {
  return prisma.task.deleteMany({
    where: {
      columnId,
    },
  });
};
