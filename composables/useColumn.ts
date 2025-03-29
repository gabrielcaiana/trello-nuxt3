export function useColumn () {
  const getColumns = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await useFetchApi('/api/column');
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };

  const createColumn = (title: string, boardId: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await useFetchApi('/api/column', {
          method: 'POST',
          body: {
            title,
            boardId,
          },
        });
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };

  const updateColumnById = (id: string, title: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await useFetchApi(`/api/column/${id}`, {
          method: 'PUT',
          body: {
            title,
          },
        });
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };

  const deleteColumnById = (id: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await useFetchApi(`/api/column/${id}`, {
          method: 'DELETE',
        });
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };

  return {
    getColumns,
    createColumn,
    updateColumnById,
    deleteColumnById,
  };
};
