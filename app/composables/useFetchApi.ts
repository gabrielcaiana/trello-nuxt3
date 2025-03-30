export async function useFetchApi (url: string, options: any = {}) {
  const { useStateToken } = useAuth();
  const token = useStateToken();

  const { data, status, refresh, error, execute } = await useFetch(url, {
    ...options,
    headers: {
      ...options.headers,
      authorization: `Bearer ${token.value}`,
    },
  });

  return {
    data,
    status,
    refresh,
    error,
    execute,
  };
};
