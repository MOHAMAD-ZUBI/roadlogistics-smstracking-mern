import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { jwtVerify } from "jose";

export const options = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        userName: {
          label: "userName",
          type: "text",
        },
        password: {
          label: "Password",
          type: "Password",
        },
      },
      async authorize(credentials) {
        if (!credentials.userName || !credentials.password) {
          throw new Error("invalid username or password");
        }

        try {
          const response = await axios.post(
            "http://api.roadco-smstracking.online/api/auth/login",
            {
              userName: credentials.userName,
              password: credentials.password,
            }
          );
          const user = response.data;
          if (!user) {
            throw new Error("no such user");
          }
          const { payload } = await jwtVerify(
            user.token,
            new TextEncoder().encode(process.env.JWT_SECRET)
          );

          return payload;
        } catch (error) {
          throw new Error(error.response.data.msg);
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
};
