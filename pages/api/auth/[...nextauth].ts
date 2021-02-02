import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default function (req, res) {
  return NextAuth(req, res, {
    providers: [
      Providers.Discord({
        clientId: process.env.DISCORD_CLIENT_ID,
        clientSecret: process.env.DISCORD_CLIENT_SECRET,
        scope: 'guilds'
      })
    ],

    callbacks: {
      async jwt(token, user, account, profile) {
        if (account?.accessToken) {
          token.accessToken = account.accessToken;
        }

        return token;
      },

      async session(sess, token) {
        if (token?.accessToken) {
          sess.accessToken = token.accessToken;
        }

        return sess;
      }
    }
  });
};
