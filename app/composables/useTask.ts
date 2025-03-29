export default () => {
  const createTask = async (title: string, columnId: string) => {
    try {
      const { data } = await useFetchApi('/api/task', {
        method: 'POST',
        body: {
          title,
          columnId,
        },
      });
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const getAlltasks = async () => {
    try {
      const { data } = await useFetchApi(`/api/task`);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const { data } = await useFetchApi(`/api/task/${id}`, {
        method: 'DELETE',
      });
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    createTask,
    getAlltasks,
    deleteTask,
  };
};
