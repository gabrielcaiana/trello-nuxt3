export default async (url: string, options: any = {}) => {
  const { useStateToken } = useAuth();
  const token = useStateToken();

  const { data, pending, refresh, error } = await useFetch(url, {
    ...options,
    headers: {
      ...options.headers,
      authorization: `Bearer ${token.value}`,
    },
  });

  return {
    data,
    pending,
    refresh,
    error,
  };
};
