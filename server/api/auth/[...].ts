import { NuxtAuthHandler } from '#auth';
import GithubProvider from 'next-auth/providers/github';

const { clientId, clientSecret } = useRuntimeConfig();

export default NuxtAuthHandler({
  providers: [
    // @ts-expect-error
    GithubProvider.default({
      clientId,
      clientSecret,
    }),
  ],
});
