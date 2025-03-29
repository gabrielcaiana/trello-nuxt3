import { getAllTasks } from '~~/server/db/task';

export default defineEventHandler(async () => {
  const tasks = await getAllTasks();
  return {
    tasks,
  };
});
