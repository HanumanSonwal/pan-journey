import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import "./cron/hotelCache.cron.js";
import hotelRoutes from "./modules/hotel/hotel.routes.js";
import authRoutes from "./modules/auth/auth.routes.js";
import roleRoutes from "./modules/roles/role.routes.js";
import userRoutes from "./modules/user/user.routes.js";
import otpRoutes from "./modules/customer-auth/otp.routes.js";
import testRoutes from "./test.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";
import hotelModel from "./modules/hotel/hotel.model.js";

const app = express();

// Allow frontend to access backend (CORS setup)
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"], // change in production via ENV
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
app.use("/api/v1/hotel", hotelRoutes);

app.use("/api/v1/customer/auth/", otpRoutes);

app.use("/api/v1", testRoutes);
// Handles all errors in one place
app.use(errorHandler);

export default app;
