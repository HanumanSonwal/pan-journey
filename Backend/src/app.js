import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import "./cron/hotelCache.cron.js";
import { errorHandler } from "./middleware/error.middleware.js";
import authRoutes from "./modules/auth/admin-auth/auth.routes.js";
import otpRoutes from "./modules/auth/customer-auth/auth.routes.js";
import profileRoutes from "./modules/auth/customer-auth/customerProfile/profile.routes.js";
import citySearch from "./modules/citysearch/supplierCity.routes.js";
import cmsRoutes from "./modules/cms/cms.routes.js";
import dashboardhotelsearch from "./modules/dashboardHotels/hotel.routes.js";
import destinationRoutes from "./modules/exploreDesitanation/desitanation.routes.js";
import hotelSearch from "./modules/hotel/hotel.route.js";
import hotelDetails from "./modules/hotel/hotelDetails/hotel.routes.js";
import tempbookingRoutes from "./modules/hotel/hotelTempBooking/booking.routes.js";
import seoContentRoutes from "./modules/hotel/seo/hotelcityseo/seoContent.routes.js";
import mediaRoutes from "./modules/media/media.routes.js";
import countryRoutes from "./modules/priceMarkup/countryData/country.routes.js";
import markeupRoutes from "./modules/priceMarkup/markup/markup.routes.js";
import stateRoutes from "./modules/priceMarkup/stateData/state.routes.js";
import roleRoutes from "./modules/role/role.routes.js";
import userRoutes from "./modules/user/user.routes.js";

import customerProfileRoutes from "./modules/auth/customer-auth/customer-documents/customerDocument.routes.js";
import testRoutes from "./test.routes.js";

const app = express();
app.use((req, res, next) => {
  console.log("📡 REQUEST HIT:", req.method, req.url);
  next();
});

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://main.d1lddnidhuqzni.amplifyapp.com",
      "https://main.d1lddnidhuqzni.amplifyapp.com",
      "https://www.panjourney.com",
      "https://panjourney.com",
    ],
    credentials: true,
  }),
);

app.use(cookieParser());

app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/media", mediaRoutes);

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/seo-content", seoContentRoutes);
app.use("/api/v1/cms", cmsRoutes);
app.use("/api/v1/roles", roleRoutes);
app.use("/api/v1/Seacrhcity", citySearch);
app.use("/api/v1/Hotels", hotelSearch);
app.use("/api/v1", tempbookingRoutes);

app.use("/api/v1/customer/auth/", otpRoutes);
app.use("/api/v1/customer/profile", profileRoutes);
app.use("/api/v1/markup", markeupRoutes);

app.use("/api/v1", testRoutes);
app.use("/api/v1", destinationRoutes);
app.use("/api/v1/customer", customerProfileRoutes);
app.use("/api/v1", countryRoutes);
app.use("/api/v1/states", stateRoutes);
app.use("/api/v1/", dashboardhotelsearch);
app.use("/api/v1", hotelDetails);
app.use(errorHandler);

export default app;
