import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import "./cron/hotelCache.cron.js";
import { errorHandler } from "./middleware/error.middleware.js";
import authRoutes from "./modules/auth/admin-auth/auth.routes.js";
import otpRoutes from "./modules/auth/customer-auth/auth.routes.js";
import profileRoutes from "./modules/auth/customer-auth/customerProfile/profile.routes.js";
import roleRoutes from "./modules/role/role.routes.js";
import userRoutes from "./modules/user/user.routes.js";
import destinationRoutes from "./modules/exploreDesitanation/desitanation.routes.js";
import citySearch from "./modules/citysearch/supplierCity.routes.js";
import hotelSearch from "./modules/hotel/hotel.route.js";

import testRoutes from "./test.routes.js";
import customerProfileRoutes from "./modules/auth/customer-auth/customer-documents/customerDocument.routes.js";


const app = express();
app.use((req, res, next) => {
  console.log("📡 REQUEST HIT:", req.method, req.url);
  next();
});

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  }),
);

app.use(cookieParser());

app.use(express.json());

app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/users", userRoutes);

app.use("/api/v1/roles", roleRoutes);
app.use("/api/v1/Seacrhcity", citySearch);
app.use("/api/v1/Hotels", hotelSearch);

app.use("/api/v1/customer/auth/", otpRoutes);
app.use("/api/v1/customer/profile", profileRoutes);

app.use("/api/v1", testRoutes);
app.use("/api/v1", destinationRoutes);
app.use("/api/v1/customer", customerProfileRoutes);
app.use(errorHandler);

export default app;
