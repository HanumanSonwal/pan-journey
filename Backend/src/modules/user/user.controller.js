

import {
  createSubAdmin,
  deleteCustomer,
  deleteSubAdmin,
  getAllCustomers,
  getAllUsers,
  getSingleCustomer,
  getSingleSubAdmin,
  updateSubAdmin,
} from "./user.service.js";

import { asyncHandler } from "../../middleware/asyncHandler.js";
import { sendSuccess } from "../../utils/ApiResponse.js";
import { validatePermissions } from "../../utils/validatePermissions.js";

/* ==============================
   CREATE STAFF (SUB ADMIN)
============================== */
export const createSubAdminController = asyncHandler(async (req, res) => {
  const cleanedPermissions = validatePermissions(req.body.permissions || {});

   console.log(cleanedPermissions , "cleanedPermissions");

  const user = await createSubAdmin({
    ...req.body,
    permissions: cleanedPermissions,
  });

  return sendSuccess(res, "Staff created successfully", user, null, 201);
});

/* ==============================
   GET ALL STAFF
============================== */
export const getAllUsersController = asyncHandler(async (req, res) => {
  const result = await getAllUsers(req.query);

  return sendSuccess(
    res,
    "Users fetched successfully",
    result.data,
    result.pagination
  );
});

/* ==============================
   GET SINGLE STAFF
============================== */
export const getSingleSubAdminController = asyncHandler(async (req, res) => {
  const user = await getSingleSubAdmin(req.params.id);

  return sendSuccess(res, "Staff fetched successfully", user);
});

/* ==============================
   UPDATE STAFF
============================== */
export const updateSubAdminController = asyncHandler(async (req, res) => {
  const cleanedPermissions = validatePermissions(req.body.permissions || {});

  const user = await updateSubAdmin(req.params.id, {
    ...req.body,
    permissions: cleanedPermissions,
  });

  return sendSuccess(res, "Staff updated successfully", user);
});

/* ==============================
   DELETE STAFF
============================== */
export const deleteSubAdminController = asyncHandler(async (req, res) => {
  await deleteSubAdmin(req.params.id, req.user._id);

  return sendSuccess(res, "Staff deleted successfully");
});

/* ==============================
   GET ALL CUSTOMERS
============================== */
export const getAllCustomersController = asyncHandler(async (req, res) => {
  const { roleId } = req.query;

  if (!roleId) {
    throw new Error("roleId is required");
  }

  const result = await getAllCustomers(req.query, roleId);

  return sendSuccess(
    res,
    "Customer list fetched",
    result.data,
    result.pagination
  );
});

/* ==============================
   GET SINGLE CUSTOMER
============================== */
export const getSingleCustomerController = asyncHandler(async (req, res) => {
  const user = await getSingleCustomer(req.params.id);

  return sendSuccess(res, "Customer fetched successfully", user);
});

/* ==============================
   DELETE CUSTOMER
============================== */
export const deleteCustomerController = asyncHandler(async (req, res) => {
  await deleteCustomer(req.params.id);

  return sendSuccess(res, "Customer deleted successfully");
});

/* ==============================
   PROFILE
============================== */
export const getProfileController = asyncHandler(async (req, res) => {
  return sendSuccess(res, "Profile fetched", req.user);
});

/* ==============================
   UPDATE PROFILE
============================== */
export const updateProfileController = asyncHandler(async (req, res) => {
  const updatedUser = await updateSubAdmin(req.user._id, req.body);

  return sendSuccess(res, "Profile updated successfully", updatedUser);
});

/* ==============================
   DELETE PROFILE
============================== */
export const deleteProfileController = asyncHandler(async (req, res) => {
  await deleteSubAdmin(req.user._id, req.user._id);

  return sendSuccess(res, "Profile deleted successfully");
});