import { LogoutOutlined, SettingOutlined } from "@ant-design/icons";

export const bottomMenuItems = [
  {
    key: "settings",
    icon: <SettingOutlined />,
    label: "Settings",
    children: [

      {
        key: "/dashboard/destinations",
        label: "Destinations",
        module: "destinationSettings",
      },
      {
        key: "/dashboard/home-content",
        label: "Home Page",
        module: "homeContent",
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
