// import { useAuthStore } from "@/store/auth.store";
// import { menuItems } from "@/config/menuConfig";
// import { can } from "@/utils/permission.util";

// export const useFilteredMenu = () => {
//   const permissions = useAuthStore((s) => s.permissions);

//   return menuItems
//     .map((item) => {
//       if (!item.module) return item;

//       // children handle
//       if (item.children) {
//         if (!can(permissions, item.module, "read")) return null;

//         return {
//           ...item,
//           children: item.children,
//         };
//       }

//       if (!can(permissions, item.module, "read")) return null;

//       return item;
//     })
//     .filter(Boolean);
// };

import { useAuthStore } from "@/store/auth.store";
import { menuItems } from "@/config/menuConfig";
import { can } from "@/utils/permission.util";

export const useFilteredMenu = () => {
  const { permissions, user } = useAuthStore();

  // 🔥 ADMIN BYPASS
if (!user?.role || user?.role === "admin") {
  return menuItems;
}

  return menuItems
    .map((item) => {
      if (!item.module) return item;

      if (!can(permissions, item.module, "read")) return null;

      return item;
    })
    .filter(Boolean);
};