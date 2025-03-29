export function useBoard () {
  const getBoards = async () => {
    try {
      const { data } = await useFetchApi(`/api/board`);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const getBoardById = async (id: string | string[]) => {
    try {
      const { data } = await useFetchApi(`/api/board/${id}`);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    getBoards,
    getBoardById,
  };
};
