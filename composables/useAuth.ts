import { ID, User, UserLogin } from '~/types/user';
import { Token } from '~/types/token';
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

export default () => {
  const useStateToken = () => useState<Token>('auth_token');
  const useStateUser = () => useState<User>('auth_user');
  const useStateLoading = () => useState<boolean>('auth_loading', () => true);

  const setToken = (newToken: Token) => {
    const authToken = useStateToken();
    authToken.value = newToken;
  };

  const setUser = (newUser: User) => {
    const authUser = useStateUser();
    authUser.value = newUser;
  };

  const setIsLoading = (value: boolean) => {
    const authLoading = useStateLoading();
    authLoading.value = value;
  };

  const signUp = (data: User) => {
    return new Promise(async (resolve, reject) => {
      try {
        await useFetchApi('/api/auth/register', {
          method: 'POST',
          body: data,
        });
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  const signIn = ({ email, password }: UserLogin) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await useFetchApi('/api/auth/login', {
          method: 'POST',
          body: { email, password },
        });

        const { access_token, user } = data.value as ResponseLogin;
        setToken(access_token);
        setUser(user);

        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  const refreshToken = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch('/api/auth/refresh');

        const { access_token } = data as ResponseLogin;
        setToken(access_token);

        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
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
      } catch (error: any) {
        console.error(`Error updating token: ${error.message}`);

        await new Promise((resolve) => setTimeout(resolve, 30000));
      }

      const newJwt: JwtDecode = jwt_decode(useStateToken().value);
      remainingTime = newJwt.exp * 1000 - Date.now() - 60000;
    }
  };

  const getUser = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await useFetchApi('/api/auth/user');
        const { user } = data.value as any;

        setUser(user);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  const initAuth = () => {
    return new Promise(async (resolve, reject) => {
      setIsLoading(true);
      try {
        await refreshToken();
        await getUser();

        reRefreshAccessToken();
        resolve(true);
      } catch (error) {
        reject(error);
      } finally {
        setIsLoading(false);
      }
    });
  };

  const logout = () => {
    return new Promise(async (resolve, reject) => {
      setIsLoading(true);
      try {
        await useFetchApi('/api/auth/logout/', {
          method: 'POST',
        });

        setToken(null as any);
        setUser(null as any);
        resolve(true);
      } catch (error) {
        reject(error);
      } finally {
        setIsLoading(false);
      }
    });
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
