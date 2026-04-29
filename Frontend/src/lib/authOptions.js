import jwt from "jsonwebtoken";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "OTP",
      credentials: {
        mobile: { label: "Mobile", type: "text" },
        otp: { label: "OTP", type: "text" },
      },
      async authorize(credentials) {
        const res = await fetch(
          "http://localhost:8000/api/v1/customer/auth/otp/verify",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          },
        );

        const data = await res.json();
        if (!res.ok) throw new Error(data.message);

        return data.data;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  jwt: {
    async encode({ token, secret }) {
      return jwt.sign(token, secret, { algorithm: "HS256" });
    },
    async decode({ token, secret }) {
      return jwt.verify(token, secret);
    },
  },

  callbacks: {
    async jwt({ token, user, account }) {
      try {
        if (user) {
          token.userId = user._id;
          token.mobile = user.mobile || null;
          token.name = user.name || token.name;
          token.email = user.email || token.email;
          token.type = user.type || "customer";
        }

        if (account?.provider === "google") {
          const res = await fetch(
            "http://localhost:8000/api/v1/customer/auth/google",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: token.email,
                name: token.name,
              }),
            },
          );

          const data = await res.json();

          if (res.ok && data?.data?._id) {
            token.userId = data.data._id;
          }
        }

        return token;
      } catch (err) {
        console.log("JWT CALLBACK ERROR:", err.message);
        return token;
      }
    },

    async session({ session, token }) {
      session.user = {
        id: token.userId || null,
        name: token.name || null,
        email: token.email || null,
        mobile: token.mobile || null,
        type: token.type || "customer",
      };
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
