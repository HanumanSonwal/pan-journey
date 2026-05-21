"use client";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import MarkupFilters from "../componants/MarkupFilters";
import MarkupFormModal from "../componants/MarkupFormModal";
import MarkupTable from "../componants/MarkupTable";
import { useMarkups } from "../hooks/useMarkups";

export default function MarkupsPage() {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [page, setPage] = useState(1);

  const [limit, setLimit] = useState(10);
  const [debouncedSearch] = useDebounce(search, 500);
  const showSearch = !["all", "worldwide"].includes(levelFilter);
  const hasActiveFilters =
    statusFilter !== "all" || levelFilter !== "all" || search?.trim();

  // ================= RESET =================

  const handleResetFilters = () => {
    setStatusFilter("all");
    setLevelFilter("all");
    setSearch("");
  };

  // ================= API =================

  const queryParams = {
    page,
    limit,

    ...(statusFilter !== "all" && {
      isActive: statusFilter,
    }),

    ...(levelFilter !== "all" && {
      level: levelFilter,
    }),

    ...(showSearch &&
      debouncedSearch && {
        search: debouncedSearch,
      }),
  };

  const {
    markups,
    meta,

    isLoading,

    deleteMarkup,
    updateStatus,
  } = useMarkups(queryParams);

  // ================= EDIT =================

  const handleEdit = (record) => {
    setEditData(record);
    setOpen(true);
  };

  return (
    <>
      <Card
        title="Markup Management"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setEditData(null);
              setOpen(true);
            }}
          >
            Create Markup
          </Button>
        }
      >
        {/* FILTERS */}

        <MarkupFilters
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          levelFilter={levelFilter}
          setLevelFilter={setLevelFilter}
          search={search}
          setSearch={setSearch}
          showSearch={showSearch}
          hasActiveFilters={hasActiveFilters}
          handleResetFilters={handleResetFilters}
        />

        {/* TABLE */}

        <MarkupTable
          markups={markups}
          meta={meta}
          page={page}
          limit={limit}
          setPage={setPage}
          setLimit={setLimit}
          isLoading={isLoading}
          deleteMarkup={deleteMarkup}
          updateStatus={updateStatus}
          handleEdit={handleEdit}
        />
      </Card>

      {/* MODAL */}

      <MarkupFormModal open={open} setOpen={setOpen} editData={editData} />
    </>
  );
}
