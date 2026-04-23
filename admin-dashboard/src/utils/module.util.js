import { moduleConfig } from "@/config/module.config";

export const getModulesFromMenu = (menuItems) => {
  const modules = new Set();

  const extract = (items) => {
    items.forEach((item) => {
      if (item.module) modules.add(item.module);
      if (item.children) extract(item.children);
    });
  };

  extract(menuItems);

  return Array.from(modules).map((key) => ({
    key,
    label: moduleConfig[key]?.label || key,
    actions: moduleConfig[key]?.actions || ["read"],
  }));
};