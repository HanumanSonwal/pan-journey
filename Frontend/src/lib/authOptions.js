import jwt from "jsonwebtoken";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    // 🔥 OTP LOGIN
    CredentialsProvider({
      name: "OTP",
      credentials: {
        mobile: { label: "Mobile", type: "text" },
        otp: { label: "OTP", type: "text" },
      },
      async authorize(credentials) {
        try {
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

          return {
            _id: data.data._id,
            mobile: data.data.mobile,
            type: data.data.type,
          };
        } catch (err) {
          throw new Error(err.message);
        }
      },
    }),

    // 🔥 GOOGLE LOGIN
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  // 🔥 CUSTOM JWT (backend compatible)
  jwt: {
    async encode({ token, secret }) {
      return jwt.sign(token, secret, { algorithm: "HS256" });
    },
    async decode({ token, secret }) {
      return jwt.verify(token, secret);
    },
  },

  callbacks: {
    // 🔥 JWT CALLBACK
    async jwt({ token, user, account }) {
      try {
        // 🔹 OTP LOGIN
        if (user && account?.provider === "credentials") {
          token.userId = user._id;
          token.mobile = user.mobile;
          token.type = user.type;
        }

        // 🔹 GOOGLE LOGIN
        if (account?.provider === "google") {
          const res = await fetch("http://localhost:8000/api/v1/auth/google", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: token.email,
              name: token.name,
            }),
          });

          const data = await res.json();

          if (!res.ok) throw new Error("Google sync failed");

          token.userId = data.data._id;
          token.name = data.data.name;
          token.email = data.data.email;
          token.type = "customer";
        }

        return token;
      } catch (err) {
        console.log("JWT CALLBACK ERROR:", err.message);
        return token;
      }
    },

    // 🔥 SESSION CALLBACK
    async session({ session, token }) {
      session.user = {
        id: token.userId,
        name: token.name || null,
        email: token.email || null,
        mobile: token.mobile || null,
        type: token.type,
      };

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
