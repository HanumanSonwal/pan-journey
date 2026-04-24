export const can = (permissions = {}, module, action = "read", user) => {
  // 🔥 ADMIN BYPASS
  if (user?.role === "admin") return true;

  return !!permissions?.[module]?.[action];
};