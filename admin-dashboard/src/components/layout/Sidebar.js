"use client";

import { useTheme } from "@/context/ThemeContext";
import { logoutUser } from "@/modules/auth/api/auth.service";
import { useAuthStore } from "@/modules/auth/store/auth.store";
import { useFilteredMenu } from "@/modules/shared/hooks/useFilteredMenu";
import { Layout, Menu, theme } from "antd";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const { Sider } = Layout;

const Sidebar = ({ collapsed }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { isDark } = useTheme();

  const { user, clearUser, permissions, isLoading } = useAuthStore();

  console.log("USER:", user);
  console.log("ROLE:", user?.role);
  console.log("PERMISSIONS:", permissions);
  console.log("LOADING:", isLoading);
  const {
    token: { colorBgContainer, colorTextSecondary },
  } = theme.useToken();

  const { menuItems, bottomMenuItems } = useFilteredMenu();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (e) {}
    clearUser();
    router.replace("/");
  };

  const handleMenuClick = ({ key }) => {
    if (key === "logout") {
      handleLogout();
      return;
    }

    router.push(key);
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      trigger={null}
      width={260}
      collapsedWidth={80}
      breakpoint="lg"
      style={{
        background: isDark
          ? "linear-gradient(180deg,#0D1B1E 0%,#08161A 100%)"
          : "linear-gradient(180deg,#72C0F0 0%,#0F6A75 100%)",
        height: "100vh",
        boxShadow: isDark
          ? "2px 0 25px rgba(0,0,0,.35)"
          : "2px 0 25px rgba(15,106,117,.25)",
        zIndex: 100,
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <div
        className="sidebar-scroll"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          overflowY: "auto",
          overflowX: "hidden",
          padding: "16px 12px",
        }}
      >
        {/* 🔹 LOGO */}
        <div>
          <div
            style={{
              height: 72,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 16,
            }}
          >
            <div
              style={{
                width: collapsed ? 40 : 130,
                height: 50,
                position: "relative",
              }}
            >
              <Image
                src="/images/mmt_logo.avif"
                alt="logo"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>

          <Menu
            mode="inline"
            selectedKeys={[pathname]}
            defaultOpenKeys={["/dashboard/staff"]}
            items={menuItems}
            // theme={isDark ? "dark" : "light"}
            theme="dark"
            inlineCollapsed={collapsed}
            style={{
              borderRight: 0,
              background: "transparent",
            }}
          />
        </div>

        <div style={{ marginTop: "auto" }}>
          <Menu
            mode="inline"
            items={bottomMenuItems}
            onClick={handleMenuClick}
            // theme={isDark ? "dark" : "light"}
            theme="dark"
            selectable={false}
            inlineCollapsed={collapsed}
            style={{
              borderRight: 0,
              background: "transparent",
              marginTop: 12,
            }}
          />
        </div>
      </div>
    </Sider>
  );
};

export default Sidebar;
