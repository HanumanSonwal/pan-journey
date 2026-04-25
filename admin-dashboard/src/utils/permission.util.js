// src/utils/permission.util.js

// ✅ ACTION CHECK (page control)
export const can = (permissions = {}, module, action = "read", user) => {
  if (user?.role === "admin") return true;

  return !!permissions?.[module]?.[action];
};

// ✅ MODULE ACCESS (sidebar control)
export const canAccessModule = (permissions = {}, module, user) => {
  if (user?.role === "admin") return true;

  const modulePerm = permissions?.[module];

  if (!modulePerm) return false;

  return Object.values(modulePerm).some(Boolean);
};