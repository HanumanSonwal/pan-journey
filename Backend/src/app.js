import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import "./cron/hotelCache.cron.js";
import { errorHandler } from "./middleware/error.middleware.js";
import authRoutes from "./modules/auth/admin-auth/auth.routes.js";
import otpRoutes from "./modules/auth/customer-auth/otp.routes.js";
//import hotelRoutes from "./modules/hotel/hotel.routes.js";
import roleRoutes from "./modules/role/role.routes.js";
import userRoutes from "./modules/user/user.routes.js";
import testRoutes from "./test.routes.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  }),
);

// Parse cookies (used for auth tokens)
app.use(cookieParser());

// Parse incoming JSON requests
app.use(express.json());

// Authentication routes (login, logout, profile, etc.)
app.use("/api/v1/auth", authRoutes);

// User management (admin, staff, customers)
app.use("/api/v1/users", userRoutes);

// Role & permission management
app.use("/api/v1/roles", roleRoutes);
//app.use("/api/v1/hotel", hotelRoutes);

app.use("/api/v1/customer/auth/", otpRoutes);

app.use("/api/v1", testRoutes);
// Handles all errors in one place
app.use(errorHandler);

export default app;
