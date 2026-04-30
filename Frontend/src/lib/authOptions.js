import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

// 🔥 ALWAYS SAFE BASE URL
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

    let data;
    try {
      data = await res.json();
    } catch {
      throw new Error("Invalid refresh response");
    }

    if (!res.ok) throw new Error(data.message);

    const decoded = jwtDecode(data.accessToken);

    console.log("✅ NEW TOKEN RECEIVED");

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
        otp: {},
      },

      async authorize(credentials) {
        try {
          console.log("📥 LOGIN REQUEST:", credentials);

          if (!credentials?.mobile || !credentials?.otp) {
            throw new Error("Missing credentials");
          }

          const res = await fetch(`${API_BASE}/customer/auth/otp/verify`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              mobile: credentials.mobile,
              otp: credentials.otp,
            }),
          });

          let data;
          try {
            data = await res.json();
          } catch {
            console.log("❌ RESPONSE NOT JSON");
            throw new Error("Server error (invalid response)");
          }

          console.log("📡 BACKEND:", data);

          if (!res.ok) {
            throw new Error(data?.message || "Login failed");
          }

          if (!data?.data?.accessToken) {
            throw new Error("AccessToken missing");
          }

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
    async jwt({ token, user }) {
      // 🔹 LOGIN
      if (user) {
        const decoded = jwtDecode(user.accessToken);

        console.log("🧠 LOGIN EXP:", new Date(decoded.exp * 1000));

        return {
          ...token,
          userId: user._id,
          mobile: user.mobile,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: decoded.exp * 1000,
        };
      }

      // 🔹 DEBUG
      console.log("⏱ NOW:", Date.now());
      console.log("⏱ EXP:", token.accessTokenExpires);

      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      console.log("⚠️ TOKEN EXPIRED");

      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      session.user = {
        id: token.userId,
        mobile: token.mobile,
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
