import Joi from "joi";

// MongoDB ObjectId validator
const objectId = Joi.string().hex().length(24);

// ===============================
// CREATE SUB ADMIN VALIDATION
// ===============================
export const createSubAdminValidation = Joi.object({
  name: Joi.string().min(2).max(50).required(),

  email: Joi.string().email().required(),

  mobile: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.pattern.base": "Mobile must be 10 digits",
    }),

  password: Joi.string().min(6).required(),

  // ⭐ NEW → role id instead of permissions
  role: objectId.required(),
});


// ===============================
// UPDATE SUB ADMIN VALIDATION
// ===============================
export const updateSubAdminValidation = Joi.object({
  name: Joi.string().min(2).max(50),

  email: Joi.string().email(),

  mobile: Joi.string().pattern(/^[0-9]{10}$/),

  password: Joi.string().min(6),

  // allow role change
  role: objectId,
});