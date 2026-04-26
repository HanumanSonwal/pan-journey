import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import ApiError from "../../utils/ApiError.js";
import { deleteByPattern, getCache, setCache } from "../../utils/cache.js";
import Role from "../roles/role.model.js";
import User from "./user.model.js";

// PAGINATION

const getPagination = (query) => {
  const page = Math.max(1, parseInt(query.page) || 1);
  const limit = Math.min(50, parseInt(query.limit) || 10);
  const skip = (page - 1) * limit;

  const sortBy = query.sortBy || "createdAt";
  const order = query.order === "asc" ? 1 : -1;

  return { page, limit, skip, sortBy, order };
};

// CREATE STAFF (ADMIN ONLY)

export const createStaff = async (data) => {
  if (!data.password) throw new ApiError(400, "Password is required");
  if (!data.role) throw new ApiError(400, "Role ID is required");

  if (!mongoose.Types.ObjectId.isValid(data.role)) {
    throw new ApiError(400, "Invalid role ID");
  }

  const roleDoc = await Role.findById(data.role);
  if (!roleDoc) throw new ApiError(400, "Role not found");

  if (roleDoc.name === "customer") {
    throw new ApiError(400, "Cannot assign customer role");
  }

  const existing = await User.findOne({ email: data.email });
  if (existing) throw new ApiError(400, "Email already exists");

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await User.create({
    name: data.name,
    email: data.email,
    mobile: data.mobile,
    password: hashedPassword,
    role: roleDoc._id,
    provider: "local",
    isEmailVerified: true,
  });

  await deleteByPattern("users:*");

  user.password = undefined;
  return user;
};

// GET ALL USERS (ADMIN / STAFF)

export const getAllUsers = async (query) => {
  const cacheKey = `users:${JSON.stringify(query)}`;
  const cached = await getCache(cacheKey);
  if (cached) return cached;

  const { skip, sortBy, order, limit } = getPagination(query);
  const search = query.search || "";

  let roleFilter = {};

  if (query.roleId) {
    roleFilter.role = query.roleId;
  }

  if (query.roleName) {
    const roleDoc = await Role.findOne({
      name: query.roleName.toLowerCase(),
    });

    if (!roleDoc) throw new ApiError(400, "Role not found");

    roleFilter.role = roleDoc._id;
  }

  const searchQuery = {
    ...roleFilter,
    ...(search && {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { mobile: { $regex: search, $options: "i" } },
      ],
    }),
  };

  const [data, total] = await Promise.all([
    User.find(searchQuery)
      .select("-password -refreshToken")
      .populate("role", "name permissions")
      .sort({ [sortBy]: order })
      .skip(skip)
      .limit(limit)
      .lean(),

    User.countDocuments(searchQuery),
  ]);

  const result = {
    data,
    pagination: {
      total,
      page: getPagination(query).page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };

  await setCache(cacheKey, result, 300);
  return result;
};

// GET CUSTOMERS (SEPARATE - FUTURE READY)

export const getCustomers = async (query) => {
  const cacheKey = `customers:${JSON.stringify(query)}`;
  const cached = await getCache(cacheKey);
  if (cached) return cached;

  const roleDoc = await Role.findOne({ name: "customer" });
  if (!roleDoc) throw new ApiError(400, "Customer role not found");

  const { skip, sortBy, order, limit } = getPagination(query);
  const search = query.search || "";

  const searchQuery = {
    role: roleDoc._id,
    ...(search && {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { mobile: { $regex: search, $options: "i" } },
      ],
    }),
  };

  const [data, total] = await Promise.all([
    User.find(searchQuery)
      .select("-password -refreshToken")
      .populate("role", "name")
      .sort({ [sortBy]: order })
      .skip(skip)
      .limit(limit)
      .lean(),

    User.countDocuments(searchQuery),
  ]);

  const result = {
    data,
    pagination: {
      total,
      page: getPagination(query).page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };

  await setCache(cacheKey, result, 300);
  return result;
};

// GET SINGLE USER
export const getSingleUser = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid ID");
  }

  const user = await User.findById(id)
    .select("-password -refreshToken")
    .populate("role", "name permissions");

  if (!user) throw new ApiError(404, "User not found");

  return user;
};

// UPDATE USER
export const updateUser = async (id, data) => {
  const user = await User.findById(id);
  if (!user) throw new ApiError(404, "User not found");

  if (data.email) {
    const exists = await User.findOne({ email: data.email });
    if (exists && exists._id.toString() !== id) {
      throw new ApiError(400, "Email already in use");
    }
    user.email = data.email;
  }

  if (data.name) user.name = data.name;
  if (data.mobile) user.mobile = data.mobile;

  if (data.password) {
    user.password = await bcrypt.hash(data.password, 10);
  }

  if (data.role) {
    const roleDoc = await Role.findById(data.role);
    if (!roleDoc) throw new ApiError(400, "Role not found");

    user.role = roleDoc._id;
  }

  await user.save();
  await deleteByPattern("users:*");

  user.password = undefined;
  return user;
};

export const updateUserStatus = async (id, isActive) => {
  console.log("SERVICE INPUT:", id, isActive);

  const user = await User.findById(id);

  console.log("BEFORE UPDATE:", user.isActive);

  user.isActive = isActive;

  await user.save();

  console.log("AFTER UPDATE:", user.isActive);

  return user;
};

// DELETE USER


