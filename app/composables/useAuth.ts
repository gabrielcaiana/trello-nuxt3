import type { ID, User, UserLogin } from '#shared/types/user';
import type { Token } from '#shared/types/token';
import jwt_decode from 'jwt-decode';

interface ResponseLogin {
  access_token: string;
  user: User;
}

interface JwtDecode {
  exp: number;
  iat: number;
  userId: ID;
}

export function useAuth() {
  const useStateToken = () => useState<Token>('auth_token');
  const useStateUser = () => useState<User>('auth_user');
  const useStateLoading = () => useState<boolean>('auth_loading', () => true);

  const setToken = (newToken: Token | null) => {
    const authToken = useStateToken();

    if (newToken) {
      authToken.value = newToken;
    }
  };

  const setUser = (newUser: User | null) => {
    const authUser = useStateUser();

    if (newUser) {  
      authUser.value = newUser;
    }
  };

  const setIsLoading = (value: boolean) => {
    const authLoading = useStateLoading();
    authLoading.value = value;
  };

  const signUp = async (data: User) => {
    try {
      const response = await useFetchApi('/api/auth/register', {
        method: 'POST',
        body: data,
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const signIn = async ({ email, password }: UserLogin) => {
    try {
      const { data } = await useFetchApi('/api/auth/login', {
        method: 'POST',
        body: { email, password },
      });

      const { access_token, user } = data.value as ResponseLogin;
      setToken(access_token);
      setUser(user);

      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const refreshToken = async () => {
    try {
      const data: ResponseLogin = await $fetch('/api/auth/refresh');
      const { access_token } = data;
      setToken(access_token);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const reRefreshAccessToken = async () => {
    const authToken = useStateToken();

    if (!authToken.value) return;

    const jwt: JwtDecode = jwt_decode(authToken.value);

    let remainingTime = jwt.exp * 1000 - Date.now() - 60000;

    while (remainingTime > 0) {
      await new Promise((resolve) => setTimeout(resolve, remainingTime));

      try {
        await refreshToken();
        break;
      } catch (error) {
        console.error(`Error updating token: ${error}`);
        await new Promise((resolve) => setTimeout(resolve, 30000));
      }

      const newJwt: JwtDecode = jwt_decode(useStateToken().value);
      remainingTime = newJwt.exp * 1000 - Date.now() - 60000;
    }
  };

  const getUser = async () => {
    try {
      const { data } = await useFetchApi('/api/auth/user');
      const { user } = data.value as ResponseLogin;
      setUser(user);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const initAuth = async () => {
    setIsLoading(true);
    try {
      await refreshToken();
      await getUser();
      reRefreshAccessToken();
      return true;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      const response = await useFetchApi('/api/auth/logout/', {
        method: 'POST',
      });

      setToken(null);
      setUser(null);
      return response;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signUp,
    signIn,
    logout,
    initAuth,
    useStateUser,
    useStateToken,
    useStateLoading,
  };
};
