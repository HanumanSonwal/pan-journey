import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

async function refreshAccessToken(token) {
  try {
    console.log("🔄 REFRESH API CALLED");

    const res = await fetch(`${API_BASE}/customer/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        refreshToken: token.refreshToken,
      }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    const decoded = jwtDecode(data.accessToken);

    console.log("✅ REFRESH RESPONSE --- responce:", decoded);

    return {
      ...token,
      accessToken: data.accessToken,
      accessTokenExpires: decoded.exp * 1000,
    };
  } catch (err) {
    console.log("❌ REFRESH ERROR:", err.message);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "OTP",
      credentials: {
        mobile: {},
        email: {},
        otp: {},
      },

      async authorize(credentials) {
        try {
          const { mobile, email, otp } = credentials;

          if (!otp) throw new Error("OTP is required");

          let url = "";
          let body = {};

          if (mobile) {
            url = `${API_BASE}/customer/auth/otp/verify`;
            body = { mobile, otp };
          } else if (email) {
            url = `${API_BASE}/customer/auth/email/verify`;
            body = { email, otp };
          } else {
            throw new Error("Mobile or Email required");
          }

          const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });

          const data = await res.json();

          if (!res.ok) throw new Error(data.message);

          return data.data;
        } catch (err) {
          console.log("❌ AUTHORIZE ERROR:", err.message);
          throw err;
        }
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
      return jwt.sign(token, secret);
    },
    async decode({ token, secret }) {
      return jwt.verify(token, secret);
    },
  },

  callbacks: {
    async jwt({ token, user, account }) {
      // 🔥 GOOGLE LOGIN
      if (account?.provider === "google") {
        try {
          console.log("🔥 GOOGLE LOGIN START");

          const res = await fetch(`${API_BASE}/customer/auth/google`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: token.email,
              name: token.name,
              image: token.picture,
              googleId: account.providerAccountId, // 🔥 MUST
            }),
          });

          const data = await res.json();

          console.log("📡 GOOGLE BACKEND:", data);

          if (res.ok && data?.data) {
            const decoded = jwtDecode(data.data.accessToken);

            return {
              ...token,
              userId: data.data._id,
              name: data.data.name,
              email: data.data.email,
              image: data.data.avatar,
              mobile: data.data.mobile,
              profileCompleted: data.data.profileCompleted,
              accessToken: data.data.accessToken,
              refreshToken: data.data.refreshToken,
              accessTokenExpires: decoded.exp * 1000,
            };
          }

          console.log("❌ GOOGLE FAILED:", data.message);
          return token;
        } catch (err) {
          console.log("❌ GOOGLE ERROR:", err.message);
          return token;
        }
      }

      // 🔹 OTP / EMAIL LOGIN
      if (user) {
        const decoded = jwtDecode(user.accessToken);

        console.log("📡 BACKEND logn with otp:", user);

        return {
          ...token,
          userId: user._id,
          name: user.name,
          email: user.email,
          image: user.avatar,
          mobile: user.mobile,
          profileCompleted: user.profileCompleted,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: decoded.exp * 1000,
        };
      }

      // 🔹 TOKEN VALID
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      console.log("⚠️ TOKEN EXPIRED");

      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      session.user = {
        id: token.userId,
        name: token.name, // ✅ ADD
        email: token.email, // ✅ ADD
        image: token.image, // ✅ ADD
        mobile: token.mobile,
        profileCompleted: token.profileCompleted,
      };

      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.error = token.error;

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
