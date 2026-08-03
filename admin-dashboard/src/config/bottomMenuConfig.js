import { LogoutOutlined, SettingOutlined } from "@ant-design/icons";

export const bottomMenuItems = [
  {
    key: "settings",
    icon: <SettingOutlined />,
    label: "Settings",
    children: [
      {
        key: "/dashboard/settings/home-page",
        label: "Home Page",
        module: "homePageSettings",
      },

      // Future
      // {
      //   key: "/dashboard/settings/seo",
      //   label: "SEO",
      //   module: "seoSettings",
      // },
      // {
      //   key: "/dashboard/settings/footer",
      //   label: "Footer",
      //   module: "footerSettings",
      // },
    ],
  },

  {
    key: "logout",
    icon: <LogoutOutlined />,
    label: "Logout",
  },
];
