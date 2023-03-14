export default () => {
  const createTask = (title: string, columnId: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await useFetchApi('/api/task', {
          method: 'POST',
          body: {
            title,
            columnId,
          },
        });
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };

  const getAlltasks = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await useFetchApi(`/api/task`);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };

  const deleteTask = (id: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await useFetchApi(`/api/task/${id}`, {
          method: 'DELETE',
        });
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };

  return {
    createTask,
    getAlltasks,
    deleteTask,
  };
};
