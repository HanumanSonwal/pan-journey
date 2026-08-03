"use client";

import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Empty } from "antd";
import { useState } from "react";

import { usePermission } from "@/modules/shared/hooks/usePermission";

import DestinationFilters from "../components/DestinationFilters";
import DestinationForm from "../components/DestinationForm";
import DestinationTable from "../components/DestinationTable";

import { useDestination } from "../hooks/useDestination";

export default function DestinationPage() {
  const [type, setType] = useState("all");

  const [open, setOpen] = useState(false);

  const [editingDestination, setEditingDestination] = useState(null);

  const { canRead, canCreate, canEdit, canDelete, isAdmin } =
    usePermission("destination");

  const canFetch = canRead || isAdmin;

  const params = {
    ...(type !== "all" && {
      type,
    }),
  };

  const {
    destinations,
    isLoading,
    createDestination,
    updateDestination,
    deleteDestination,
  } = useDestination(params, canFetch);

  const handleCloseDrawer = () => {
    setOpen(false);
    setEditingDestination(null);
  };

  return (
    <>
      <Card
        title="Destination Master"
        extra={
          canCreate && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setEditingDestination(null);
                setOpen(true);
              }}
            >
              Add Destination
            </Button>
          )
        }
      >
        <DestinationFilters type={type} setType={setType} />

        {canFetch ? (
          <DestinationTable
            destinations={destinations}
            isLoading={isLoading}
            deleteDestination={deleteDestination}
            canEdit={canEdit || isAdmin}
            canDelete={canDelete || isAdmin}
            onEdit={(record) => {
              setEditingDestination(record);
              setOpen(true);
            }}
          />
        ) : (
          <Empty description="No permission to view destinations" />
        )}
      </Card>

      <DestinationForm
        open={open}
        onClose={handleCloseDrawer}
        editingDestination={editingDestination}
        createDestination={createDestination}
        updateDestination={updateDestination}
        selectedType={type} // ✅ NEW
      />
    </>
  );
}
