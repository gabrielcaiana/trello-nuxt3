export default () => {
  const getBoards = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await useFetchApi(`/api/board`);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };

  const getBoardById = (id: string | string[]) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await useFetchApi(`/api/board/${id}`);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };

  return {
    getBoards,
    getBoardById,
  };
};
