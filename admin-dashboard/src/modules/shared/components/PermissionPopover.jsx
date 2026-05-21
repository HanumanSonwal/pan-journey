"use client";

import {
  EyeOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";

import {
  Badge,
  Button,
  Empty,
  Popover,
  Space,
  Tag,
  Typography,
} from "antd";

const { Text } = Typography;

export default function PermissionPopover({
  permissions,
}) {
  // ================= EMPTY =================

  if (
    !permissions ||
    Object.keys(permissions)
      .length === 0
  ) {
    return (
      <Tag
        style={{
          borderRadius: 999,
          margin: 0,
        }}
      >
        No Access
      </Tag>
    );
  }

  // ================= MODULES =================

  const permissionModules =
    Object.entries(
      permissions
    ).filter(
      ([_, actions]) =>
        Object.values(
          actions
        ).some(Boolean)
    );

  // ================= TOTAL =================

  const totalPermissions =
    permissionModules.reduce(
      (acc, [_, actions]) => {
        return (
          acc +
          Object.values(
            actions
          ).filter(Boolean)
            .length
        );
      },
      0
    );

  // ================= CONTENT =================

  const content = (
    <div
      style={{
        width: 300,
        maxHeight: 400,
        overflowY: "auto",
      }}
    >
      {/* ================= HEADER ================= */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent:
            "space-between",

          marginBottom: 18,
        }}
      >
        {/* LEFT */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <SafetyCertificateOutlined
            style={{
              color: "#1677ff",
              fontSize: 16,
            }}
          />

          <Text
            strong
            style={{
              fontSize: 15,
            }}
          >
            Role Permissions
          </Text>
        </div>

        {/* COUNT */}

        <Badge
          count={
            totalPermissions
          }
          style={{
            background:
              "#1677ff",
          }}
        />
      </div>

      {/* ================= EMPTY ================= */}

      {!permissionModules?.length ? (
        <Empty
          image={
            Empty.PRESENTED_IMAGE_SIMPLE
          }
          description="No permissions assigned"
        />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection:
              "column",
            gap: 14,
          }}
        >
          {permissionModules.map(
            ([module, actions]) => {
              const enabled =
                Object.entries(
                  actions
                )
                  .filter(
                    ([_, val]) =>
                      val
                  )
                  .map(
                    ([key]) =>
                      key
                  );

              return (
                <div
                  key={module}
                  style={{
                    paddingBottom: 12,

                    borderBottom:
                      "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {/* ================= TOP ================= */}

                  <div
                    style={{
                      display:
                        "flex",

                      alignItems:
                        "center",

                      justifyContent:
                        "space-between",

                      marginBottom: 10,
                    }}
                  >
                    {/* MODULE */}

                    <Text
                      strong
                      style={{
                        fontSize: 13,

                        textTransform:
                          "capitalize",
                      }}
                    >
                      {module}
                    </Text>

                    {/* COUNT */}

                    <Tag
                      color="blue"
                      style={{
                        margin: 0,

                        borderRadius: 999,

                        fontSize: 11,

                        fontWeight: 500,

                        paddingInline: 10,
                      }}
                    >
                      {
                        enabled.length
                      }{" "}
                      Access
                    </Tag>
                  </div>

                  {/* ================= ACTIONS ================= */}

                  <Space
                    wrap
                    size={[6, 6]}
                  >
                    {enabled.map(
                      (act) => (
                        <Tag
                          key={act}
                          style={{
                            margin: 0,

                            borderRadius: 999,

                            fontSize: 11,

                            paddingInline: 10,

                            fontWeight: 500,

                            textTransform:
                              "capitalize",

                            background:
                              "rgba(82,196,26,0.12)",

                            border:
                              "1px solid rgba(82,196,26,0.2)",

                            color:
                              "#52c41a",
                          }}
                        >
                          {act}
                        </Tag>
                      )
                    )}
                  </Space>
                </div>
              );
            }
          )}
        </div>
      )}
    </div>
  );

  // ================= TRIGGER =================

  return (
    <Popover
      content={content}
      trigger="click"
      placement="bottom"
      styles={{
        body: {
          borderRadius: 18,
          padding: 16,
        },
      }}
    >
      <Button
        icon={<EyeOutlined />}
        size="small"
        style={{
          borderRadius: 999,
          fontWeight: 500,
        }}
      >
       view Permissions
      </Button>
    </Popover>
  );
}