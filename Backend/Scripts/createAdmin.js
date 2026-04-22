import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

import User from "../src/modules/user/user.model.js";
import Role from "../src/modules/roles/role.model.js";

dotenv.config({ path: "../.env" });

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const adminRole = await Role.findOne({ name: "admin" });

    if (!adminRole) {
      console.log("❌ ADMIN role not found. Create role first.");
      process.exit(1);
    }

    const existingAdmin = await User.findOne({
      email: "admin@trainscafe.com",
    });

    if (existingAdmin) {
      console.log("⚠️ Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    const admin = await User.create({
      name: "Super Admin",
      email: "admin@trainscafe.com",
      password: hashedPassword,
      role: adminRole._id,   // ⭐ FIXED
      isEmailVerified: true,
    });

    console.log("✅ Admin created successfully");
    process.exit();
  } catch (error) {
    console.log("❌ Error:", error.message);
    process.exit(1);
  }
};

createAdmin();