
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import ApiError from "../../utils/ApiError.js";
import {
  deleteByPattern,
  deleteCache,
  getCache,
  setCache,
} from "../../utils/cache.js";
import User from "./user.model.js";
import Role from "../roles/role.model.js";

//////////////////////////////////////////////////////////////
// PAGINATION
//////////////////////////////////////////////////////////////
const getPagination = (query) => {
  const page = Math.max(1, parseInt(query.page) || 1);
  const limit = Math.min(50, parseInt(query.limit) || 10);
  const skip = (page - 1) * limit;

  const sortBy = query.sortBy || "createdAt";
  const order = query.order === "asc" ? 1 : -1;

  return { page, limit, skip, sortBy, order };
};

//////////////////////////////////////////////////////////////
// GET USERS BY ROLE (SAFE)
//////////////////////////////////////////////////////////////
const getUsersByRole = async ({ roleName, query, extraSearchFields = [] }) => {
  const roleDoc = await Role.findOne({ name: roleName });

  if (!roleDoc) {
    throw new ApiError(400, `${roleName} role not found`);
  }

  const { skip, sortBy, order } = getPagination(query);
  const search = query.search || "";

  const fields = ["name", "email", ...extraSearchFields];

  const searchQuery = {
    role: roleDoc._id,
    ...(search
      ? {
          $or: fields.map((field) => ({
            [field]: { $regex: search, $options: "i" },
          })),
        }
      : {}),
  };

  const [data, total] = await Promise.all([
    User.find(searchQuery)
      .select("-password -refreshToken")
      .populate("role", "name permissions")
      .sort({ [sortBy]: order })
      .skip(skip)
      .limit(10)
      .lean(),

    User.countDocuments(searchQuery),
  ]);

  return {
    data,
    pagination: {
      total,
      page: getPagination(query).page,
      limit: getPagination(query).limit,
      totalPages: Math.ceil(total / getPagination(query).limit),
    },
  };
};

//////////////////////////////////////////////////////////////
// CREATE SUB ADMIN
//////////////////////////////////////////////////////////////
export const createSubAdmin = async (data) => {
  if (!data.password) throw new ApiError(400, "Password is required");
  if (!data.role) throw new ApiError(400, "Role ID is required");

  if (!mongoose.Types.ObjectId.isValid(data.role)) {
    throw new ApiError(400, "Invalid role ID format");
  }

  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) throw new ApiError(400, "Email already exists");

  const roleDoc = await Role.findById(data.role);
  if (!roleDoc) throw new ApiError(400, "Role not found");

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await User.create({
    name: data.name,
    email: data.email,
    mobile: data.mobile,
    password: hashedPassword,
    role: roleDoc._id,
    permissions: roleDoc.permissions || {},
    isEmailVerified: true,
  });

  user.password = undefined;
  return user;
};

//////////////////////////////////////////////////////////////
// GET ALL SUB ADMINS
//////////////////////////////////////////////////////////////
export const getAllSubAdmins = async (query) => {
  const cacheKey = `subadmins:${JSON.stringify(query)}`;
  const cached = await getCache(cacheKey);
  if (cached) return cached;

  const result = await getUsersByRole({
    roleName: "",
    query,
  });

  await setCache(cacheKey, result, 300);
  return result;
};

//////////////////////////////////////////////////////////////
// GET SINGLE SUB ADMIN
//////////////////////////////////////////////////////////////
export const getSingleSubAdmin = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid ID");
  }

  const roleDoc = await Role.findOne({ name: "user" });
  if (!roleDoc) throw new ApiError(400, "Role not found");

  const user = await User.findOne({
    _id: id,
    role: roleDoc._id,
  })
    .select("-password -refreshToken")
    .populate("role", "name permissions");

  if (!user) throw new ApiError(404, "Sub-admin not found");

  return user;
};

//////////////////////////////////////////////////////////////
// UPDATE SUB ADMIN
//////////////////////////////////////////////////////////////
export const updateSubAdmin = async (id, data) => {
  const user = await User.findById(id);
  if (!user) throw new ApiError(404, "Sub-admin not found");

  if (data.email) {
    const exists = await User.findOne({ email: data.email });
    if (exists && exists._id.toString() !== id) {
      throw new ApiError(400, "Email already in use");
    }
    user.email = data.email;
  }

  if (data.name) user.name = data.name;

  if (data.password) {
    user.password = await bcrypt.hash(data.password, 10);
  }

  await user.save();

  await deleteByPattern("subadmins:*");
  user.password = undefined;

  return user;
};

//////////////////////////////////////////////////////////////
// DELETE SUB ADMIN
//////////////////////////////////////////////////////////////
export const deleteSubAdmin = async (id, currentAdminId) => {
  const user = await User.findById(id);
  if (!user) throw new ApiError(404, "Sub-admin not found");

  if (id === currentAdminId) {
    throw new ApiError(400, "You cannot delete yourself");
  }

  await user.deleteOne();
  await deleteByPattern("subadmins:*");
};

//////////////////////////////////////////////////////////////
// CUSTOMERS
//////////////////////////////////////////////////////////////
export const getAllCustomers = async (query) => {
  const cacheKey = `customers:${JSON.stringify(query)}`;
  const cached = await getCache(cacheKey);
  if (cached) return cached;

  const result = await getUsersByRole({
    roleName: "customer",
    query,
    extraSearchFields: ["mobile"],
  });

  await setCache(cacheKey, result, 300);
  return result;
};

export const getSingleCustomer = async (id) => {
  const roleDoc = await Role.findOne({ name: "customer" });

  if (!roleDoc) throw new ApiError(400, "Customer role not found");

  const user = await User.findOne({
    _id: id,
    role: roleDoc._id,
  }).select("-password");

  if (!user) throw new ApiError(404, "Customer not found");

  return user;
};

export const deleteCustomer = async (id) => {
  const roleDoc = await Role.findOne({ name: "customer" });

  if (!roleDoc) throw new ApiError(400, "Customer role not found");

  const user = await User.findOne({
    _id: id,
    role: roleDoc._id,
  });

  if (!user) throw new ApiError(404, "Customer not found");

  await user.deleteOne();
};

