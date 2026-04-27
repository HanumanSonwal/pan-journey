import { Popover, Space, Tag } from "antd";

const PermissionPopover = ({ permissions }) => {
  if (!permissions || Object.keys(permissions).length === 0) {
    return <Tag>No Access</Tag>;
  }

  const content = (
    <div style={{ maxWidth: 250 }}>
      {Object.entries(permissions).map(([module, actions]) => {
        const enabled = Object.entries(actions)
          .filter(([_, val]) => val)
          .map(([key]) => key);

        if (!enabled.length) return null;

        return (
          <div key={module} style={{ marginBottom: 8 }}>
            <strong>{module}</strong>
            <div>
              <Space wrap>
                {enabled.map((act) => (
                  <Tag key={act} color="green">
                    {act}
                  </Tag>
                ))}
              </Space>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <Popover
      content={content}
      title="Permissions"
      trigger="click"
      overlayStyle={{ width: 300 }}
    >
      <Tag color="blue" style={{ cursor: "pointer" }}>
        View Permissions
      </Tag>
    </Popover>
  );
};

export default PermissionPopover;
