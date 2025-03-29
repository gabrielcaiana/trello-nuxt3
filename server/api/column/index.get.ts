import { prisma } from '~~/server/db';

export default defineEventHandler(async () => {
  const data = await prisma.column.findMany({
    include: {
      tasks: true,
    },
  });

  return data;
});
