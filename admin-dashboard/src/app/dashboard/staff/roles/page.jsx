// "use client";

// import {
//   DeleteOutlined,
//   EditOutlined,
//   PlusOutlined,
// } from "@ant-design/icons";
// import {
//   Button,
//   Card,
//   Empty,
//   Popconfirm,
//   Space,
//   Table,
//   Tag,
//   Tooltip,
// } from "antd";
// import { useState } from "react";

// import { deleteRole } from "@/services/role.service";
// import RoleFormModal from "@/components/staff-managment/RoleFormModal";
// import { useRoles } from "@/hooks/Role-module/useRoles";
// import { can } from "@/utils/permission.util";
// import { useQueryClient } from "@tanstack/react-query";
// import { useAuthStore } from "@/store/auth.store";

// export default function RolesPage() {
//   const [open, setOpen] = useState(false);
//   const [editData, setEditData] = useState(null);

//     // 🔥 PERMISSION CHECKS
//   const { permissions = {}, user } = useAuthStore();


// const canRead = can(permissions, "roles", "read", user);
// const canCreate = can(permissions, "roles", "write", user);
// const canEdit = can(permissions, "roles", "update", user);
// const canDelete = can(permissions, "roles", "delete", user);

//   const queryClient = useQueryClient();

//   // 🔥 IMPORTANT (FIX)

// const { data, isLoading } = useRoles(
//   user?.role === "admin" || canRead
// );
//   const roles = data?.data || [];

//   // 🔥 DELETE
//   const handleDelete = async (id) => {
//     await deleteRole(id);
//     queryClient.invalidateQueries(["roles"]);
//   };

//   // 🔥 EDIT
//   const handleEdit = (record) => {
//     setEditData(record);
//     setOpen(true);
//   };

//   // 🔥 PERMISSIONS RENDER
//   const renderPermissions = (permissions) => {
//     if (!permissions || Object.keys(permissions).length === 0) {
//       return <Tag color="default">No Permissions</Tag>;
//     }

//     return Object.entries(permissions).map(([module, actions]) => {
//       const enabledActions = Object.entries(actions)
//         .filter(([_, val]) => val)
//         .map(([key]) => key);

//       return (
//         <div key={module} style={{ marginBottom: 6 }}>
//           <Tag color="blue">{module}</Tag>

//           {enabledActions.length > 0 ? (
//             enabledActions.map((act) => (
//               <Tag key={act} color="green">
//                 {act}
//               </Tag>
//             ))
//           ) : (
//             <Tag color="red">No Access</Tag>
//           )}
//         </div>
//       );
//     });
//   };



//   const columns = [
//     {
//       title: "Role Name",
//       dataIndex: "name",
//       render: (text) => <strong>{text}</strong>,
//     },
//     {
//       title: "Permissions",
//       dataIndex: "permissions",
//       render: renderPermissions,
//     },
//     {
//       title: "System Role",
//       dataIndex: "isSystemRole",
//       render: (val) =>
//         val ? <Tag color="purple">System</Tag> : <Tag>User</Tag>,
//     },
//     {
//       title: "Created At",
//       dataIndex: "createdAt",
//       render: (val) => new Date(val).toLocaleString(),
//     },

//     // 🔥 ACTION COLUMN (FULLY CONTROLLED)
//     ...(canEdit || canDelete
//       ? [
//           {
//             title: "Actions",
//             render: (_, record) => {
//               // 👉 अगर कोई permission नहीं
//               if (!canEdit && !canDelete) {
//                 return <Tag color="default">No Access</Tag>;
//               }

//               return (
//                 <Space>
//                   {/* ✏️ EDIT */}
//                   {canEdit && (
//                     <Tooltip title="Edit Role">
//                       <Button
//                         icon={<EditOutlined />}
//                         onClick={() => handleEdit(record)}
//                       />
//                     </Tooltip>
//                   )}

//                   {/* 🗑 DELETE */}
//                   {canDelete && !record.isSystemRole && (
//                     <Popconfirm
//                       title="Are you sure delete this role?"
//                       onConfirm={() => handleDelete(record._id)}
//                     >
//                       <Tooltip title="Delete Role">
//                         <Button danger icon={<DeleteOutlined />} />
//                       </Tooltip>
//                     </Popconfirm>
//                   )}

//                   {/* 🔒 SYSTEM ROLE BLOCK */}
//                   {canDelete && record.isSystemRole && (
//                     <Tooltip title="System roles cannot be deleted">
//                       <Button danger icon={<DeleteOutlined />} disabled />
//                     </Tooltip>
//                   )}
//                 </Space>
//               );
//             },
//           },
//         ]
//       : []),
//   ];

//   return (
//     <Card
//       title="Role Management"
//       extra={
//         canCreate && (
//           <Button
//             type="primary"
//             icon={<PlusOutlined />}
//             onClick={() => {
//               setEditData(null);
//               setOpen(true);
//             }}
//           >
//             Create Role
//           </Button>
//         )
//       }
//     >
// {user?.role === "admin" || canRead ? (
//   <Table
//     columns={columns}
//     dataSource={roles}
//     rowKey="_id"
//     loading={isLoading}
//     bordered
//     pagination={{ pageSize: 8 }}
//   />
// ) : (
//    <Empty description="No permission to view data" />
// )}

//       <RoleFormModal open={open} setOpen={setOpen} editData={editData} />
//     </Card>
//   );
// }


"use client";

import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Empty,
  Popconfirm,
  Space,
  Table,
  Tag,
  Tooltip,
} from "antd";
import { useState } from "react";

import { deleteRole } from "@/services/role.service";
import RoleFormModal from "@/components/staff-managment/RoleFormModal";
import { useRoles } from "@/hooks/Role-module/useRoles";
import { can } from "@/utils/permission.util";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth.store";

export default function RolesPage() {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const { permissions = {}, user } = useAuthStore();
  const queryClient = useQueryClient();

  // 🔥 PERMISSIONS
  const canRead = can(permissions, "roles", "read", user);
  const canCreate = can(permissions, "roles", "write", user);
  const canEdit = can(permissions, "roles", "update", user);
  const canDelete = can(permissions, "roles", "delete", user);

  // 🔥 API CALL CONTROL
  const { data, isLoading } = useRoles(
    user?.role === "admin" || canRead
  );

  const roles = data?.data || [];

  // 🔥 DELETE
  const handleDelete = async (id) => {
    await deleteRole(id);
    queryClient.invalidateQueries(["roles"]);
  };

  // 🔥 EDIT
  const handleEdit = (record) => {
    setEditData(record);
    setOpen(true);
  };

  // 🔥 PERMISSIONS RENDER
const renderPermissions = (permissions) => {
  if (!permissions || Object.keys(permissions).length === 0) {
    return <Tag>No Permissions</Tag>;
  }

  return Object.entries(permissions).map(([module, actions]) => {
    const enabledActions = Object.entries(actions)
      .filter(([_, val]) => val)
      .map(([key]) => key);

    // 🔥 agar koi action enabled nahi → skip module
    if (enabledActions.length === 0) return null;

    return (
      <div key={module}>
        <Tag color="blue">{module}</Tag>

        {enabledActions.map((act) => (
          <Tag key={act} color="green">
            {act}
          </Tag>
        ))}
      </div>
    );
  });
};
  // 🔥 TABLE COLUMNS
  const columns = [
    {
      title: "Role Name",
      dataIndex: "name",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Permissions",
      dataIndex: "permissions",
      render: renderPermissions,
    },
    {
      title: "System Role",
      dataIndex: "isSystemRole",
      render: (val) =>
        val ? <Tag color="purple">System</Tag> : <Tag>User</Tag>,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (val) => new Date(val).toLocaleString(),
    },

    ...(canEdit || canDelete
      ? [
          {
            title: "Actions",
            render: (_, record) => (
              <Space>
                {canEdit && (
                  <Tooltip title="Edit Role">
                    <Button
                      icon={<EditOutlined />}
                      onClick={() => handleEdit(record)}
                    />
                  </Tooltip>
                )}

                {canDelete && !record.isSystemRole && (
                  <Popconfirm
                    title="Are you sure delete this role?"
                    onConfirm={() => handleDelete(record._id)}
                  >
                    <Button danger icon={<DeleteOutlined />} />
                  </Popconfirm>
                )}
              </Space>
            ),
          },
        ]
      : []),
  ];

  return (
    <Card
      title="Role Management"
      extra={
        canCreate && (
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setEditData(null);
              setOpen(true);
            }}
          >
            Create Role
          </Button>
        )
      }
    >
      {/* 🔥 DATA / NO ACCESS */}
      {user?.role === "admin" || canRead ? (
        <Table
          columns={columns}
          dataSource={roles}
          rowKey="_id"
          loading={isLoading}
          bordered
          pagination={{ pageSize: 8 }}
        />
      ) : (
        <Empty description="No permission to view data" />
      )}

      <RoleFormModal open={open} setOpen={setOpen} editData={editData} />
    </Card>
  );
}