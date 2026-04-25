// import bcrypt from "bcryptjs";
// import mongoose from "mongoose";
// import ApiError from "../../utils/ApiError.js";
// import { deleteByPattern, getCache, setCache } from "../../utils/cache.js";
// import Role from "../roles/role.model.js";
// import User from "./user.model.js";

// const getPagination = (query) => {
//   const page = Math.max(1, parseInt(query.page) || 1);
//   const limit = Math.min(50, parseInt(query.limit) || 10);
//   const skip = (page - 1) * limit;

//   const sortBy = query.sortBy || "createdAt";
//   const order = query.order === "asc" ? 1 : -1;

//   return { page, limit, skip, sortBy, order };
// };

// const getUsersByRole = async ({ roleId, query, extraSearchFields = [] }) => {
//   const { skip, sortBy, order, limit } = getPagination(query);
//   const search = query.search || "";

//   const fields = ["name", "email", ...extraSearchFields];

//   const searchQuery = {
//     role: roleId,
//     ...(search
//       ? {
//           $or: fields.map((field) => ({
//             [field]: { $regex: search, $options: "i" },
//           })),
//         }
//       : {}),
//   };

//   const [data, total] = await Promise.all([
//     User.find(searchQuery)
//       .select("-password -refreshToken")
//       .populate("role", "name permissions")
//       .sort({ [sortBy]: order })
//       .skip(skip)
//       .limit(limit)
//       .lean(),

//     User.countDocuments(searchQuery),
//   ]);

//   return {
//     data,
//     pagination: {
//       total,
//       page: getPagination(query).page,
//       limit,
//       totalPages: Math.ceil(total / limit),
//     },
//   };
// };

// export const createSubAdmin = async (data) => {
//   if (!data.password) throw new ApiError(400, "Password is required");
//   if (!data.role) throw new ApiError(400, "Role ID is required");

//   if (!mongoose.Types.ObjectId.isValid(data.role)) {
//     throw new ApiError(400, "Invalid role ID format");
//   }

//   const existingUser = await User.findOne({ email: data.email });
//   if (existingUser) throw new ApiError(400, "Email already exists");

//   const roleDoc = await Role.findById(data.role);
//   if (!roleDoc) throw new ApiError(400, "Role not found");

//   const hashedPassword = await bcrypt.hash(data.password, 10);

//   const user = await User.create({
//     name: data.name,
//     email: data.email,
//     mobile: data.mobile,
//     password: hashedPassword,
//     role: roleDoc._id,
//     permissions: roleDoc.permissions || {},
//     isEmailVerified: true,
//   });

//   user.password = undefined;
//   return user;
// };

// export const getAllUsers = async (query) => {
//   const { skip, sortBy, order, limit } = getPagination(query);

//   const search = query.search || "";
//   const roleId = query.roleId || null;

//   const searchQuery = {
//     ...(roleId && { role: roleId }),

//     ...(search && {
//       $or: [
//         { name: { $regex: search, $options: "i" } },
//         { email: { $regex: search, $options: "i" } },
//       ],
//     }),
//   };

//   const [data, total] = await Promise.all([
//     User.find(searchQuery)
//       .select("-password -refreshToken")
//       .populate("role", "name permissions")
//       .sort({ [sortBy]: order })
//       .skip(skip)
//       .limit(limit)
//       .lean(),

//     User.countDocuments(searchQuery),
//   ]);

//   return {
//     data,
//     pagination: {
//       total,
//       page: getPagination(query).page,
//       limit,
//       totalPages: Math.ceil(total / limit),
//     },
//   };
// };


// export const getSingleSubAdmin = async (id) => {
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     throw new ApiError(400, "Invalid ID");
//   }

//   const user = await User.findById(id)
//     .select("-password -refreshToken")
//     .populate("role", "name permissions");

//   if (!user) throw new ApiError(404, "Sub-admin not found");

//   return user;
// };

// export const updateSubAdmin = async (id, data) => {
//   const user = await User.findById(id);
//   if (!user) throw new ApiError(404, "Sub-admin not found");

//   if (data.email) {
//     const exists = await User.findOne({ email: data.email });
//     if (exists && exists._id.toString() !== id) {
//       throw new ApiError(400, "Email already in use");
//     }
//     user.email = data.email;
//   }

//   if (data.name) user.name = data.name;

//   if (data.password) {
//     user.password = await bcrypt.hash(data.password, 10);
//   }

//   await user.save();

//   await deleteByPattern("subadmins:*");
//   user.password = undefined;

//   return user;
// };

// export const deleteSubAdmin = async (id, currentAdminId) => {
//   const user = await User.findById(id);
//   if (!user) throw new ApiError(404, "Sub-admin not found");

//   if (id === currentAdminId) {
//     throw new ApiError(400, "You cannot delete yourself");
//   }

//   await user.deleteOne();
//   await deleteByPattern("subadmins:*");
// };

// export const getAllCustomers = async (query, roleId) => {
//   const cacheKey = `customers:${JSON.stringify(query)}:${roleId}`;
//   const cached = await getCache(cacheKey);
//   if (cached) return cached;

//   const result = await getUsersByRole({
//     roleId,
//     query,
//     extraSearchFields: ["mobile"],
//   });

//   await setCache(cacheKey, result, 300);
//   return result;
// };

// export const getSingleCustomer = async (id) => {
//   const roleDoc = await Role.findOne({ name: "customer" });

//   if (!roleDoc) throw new ApiError(400, "Customer role not found");

//   const user = await User.findOne({
//     _id: id,
//     role: roleDoc._id,
//   }).select("-password");

//   if (!user) throw new ApiError(404, "Customer not found");

//   return user;
// };

// export const deleteCustomer = async (id) => {
//   const roleDoc = await Role.findOne({ name: "customer" });

//   if (!roleDoc) throw new ApiError(400, "Customer role not found");

//   const user = await User.findOne({
//     _id: id,
//     role: roleDoc._id,
//   });

//   if (!user) throw new ApiError(404, "Customer not found");

//   await user.deleteOne();
// };


import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import ApiError from "../../utils/ApiError.js";
import { deleteByPattern, getCache, setCache } from "../../utils/cache.js";
import Role from "../roles/role.model.js";
import User from "./user.model.js";

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
// CREATE STAFF (ADMIN ONLY)
//////////////////////////////////////////////////////////////
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

//////////////////////////////////////////////////////////////
// GET ALL USERS (ADMIN / STAFF)
//////////////////////////////////////////////////////////////
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

//////////////////////////////////////////////////////////////
// GET CUSTOMERS (SEPARATE - FUTURE READY)
//////////////////////////////////////////////////////////////
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

//////////////////////////////////////////////////////////////
// GET SINGLE USER
//////////////////////////////////////////////////////////////
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

//////////////////////////////////////////////////////////////
// UPDATE USER
//////////////////////////////////////////////////////////////
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

//////////////////////////////////////////////////////////////
// DELETE USER
//////////////////////////////////////////////////////////////
export const deleteUser = async (id, currentUserId) => {
  const user = await User.findById(id);
  if (!user) throw new ApiError(404, "User not found");

  if (id === currentUserId) {
    throw new ApiError(400, "You cannot delete yourself");
  }

  await user.deleteOne();
  await deleteByPattern("users:*");
};