export function useColumn () {
  const getColumns = async () => {
    try {
      const { data } = await useFetchApi('/api/column');
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const createColumn = async (title: string, boardId: string) => {
    try {
      const { data } = await useFetchApi('/api/column', {
        method: 'POST',
        body: {
          title,
          boardId,
        },
      });
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateColumnById = async (id: string, title: string) => {
    try {
        const { data } = await useFetchApi(`/api/column/${id}`, {
          method: 'PUT',
          body: {
            title,
          },
        });
        return data;
      } catch (error) {
        console.error(error);
      }
  };

  const deleteColumnById = async (id: string) => {
     try {
        const { data } = await useFetchApi(`/api/column/${id}`, {
          method: 'DELETE',
        });
        
        return data;
      } catch (error) {
        console.error(error);
      }
  };

  return {
    getColumns,
    createColumn,
    updateColumnById,
    deleteColumnById,
  };
};
