export const can = (permissions, module, action) => {
  return !!permissions?.[module]?.[action];
};