import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./modules/auth/auth.routes.js";
import hotelRoutes from "./modules/hotels/hotelRoutes.js";

import roleRoutes from "./modules/roles/role.routes.js";

import { errorHandler } from "./middleware/error.middleware.js";
import subAdminRoutes from "./modules/user/subAdmin.routes.js";
import customerRoutes from "./modules/user/customer.routes.js";

const app = express();


app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser())
app.use(express.json());

app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/s", subAdminRoutes);
app.use("/api/v1/customers", customerRoutes);

app.use("/api/v1/hotels", hotelRoutes);

app.use("/api/v1/roles", roleRoutes);

app.use(errorHandler);

export default app;
