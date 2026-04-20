import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./modules/auth/auth.routes.js";
import stationRoutes from "./modules/station/station.routes.js";
import vendorRoutes from "./modules/vendor/vendor.routes.js";
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
app.use("/api/v1/stations", stationRoutes);
app.use("/api/v1/sub-admins", subAdminRoutes);
app.use("/api/v1/customers", customerRoutes);
app.use("/api/v1/vendors", vendorRoutes);

app.use(errorHandler);

export default app;
