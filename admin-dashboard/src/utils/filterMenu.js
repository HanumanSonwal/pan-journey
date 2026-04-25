import { can } from "./hasPermission";

export const filterMenu = (menuItems, permissions = {}) => {
  return menuItems
    .map((item) => {
      // 👉 CHILD CASE (parent ka page nahi hai)
      if (item.children) {
        const filteredChildren = item.children.filter((child) =>
          can(permissions, child.module, "read")
        );

        // ✅ agar ek bhi child allowed hai → parent show
        if (filteredChildren.length > 0) {
          return {
            ...item,
            children: filteredChildren,
          };
        }

        return null;
      }

      // 👉 SIMPLE ITEM
      return can(permissions, item.module, "read") ? item : null;
    })
    .filter(Boolean);
};