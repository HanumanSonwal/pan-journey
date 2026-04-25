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
import { canAccessModule } from "@/utils/permission.util";

export const useFilteredMenu = () => {
  const permissions = useAuthStore((s) => s.permissions);
  const user = useAuthStore((s) => s.user);

  return menuItems
    .map((item) => {
      if (item.children) {
        const children = item.children.filter((child) =>
          canAccessModule(permissions, child.module, user)
        );

        if (children.length > 0) {
          return { ...item, children };
        }

        return null;
      }

      return canAccessModule(permissions, item.module, user)
        ? item
        : null;
    })
    .filter(Boolean);
};