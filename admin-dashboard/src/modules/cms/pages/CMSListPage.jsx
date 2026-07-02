"use client";

import { PlusOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import { useState } from "react";
import { useDebounce } from "use-debounce";

import CMSFilters from "../components/CMSFilters";
import CMSTable from "../components/CMSTable";
import { useCMS } from "../hooks/useCMS";

export default function CMSListPage() {
  const [search, setSearch] = useState("");
  const [entityType, setEntityType] = useState("all");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [debouncedSearch] = useDebounce(search, 500);

  const queryParams = {
    page,
    limit,

    ...(entityType !== "all" && {
      entityType,
    }),

    ...(debouncedSearch && {
      search: debouncedSearch,
    }),
  };

  const { pages, meta, isLoading, deleteCMS } = useCMS(queryParams);

  return (
    <Card
      title="CMS Pages"
      extra={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          href="/dashboard/cms/create"
        >
          Create Page
        </Button>
      }
    >
      <CMSFilters
        search={search}
        setSearch={setSearch}
        entityType={entityType}
        setEntityType={setEntityType}
      />

      <CMSTable
        pages={pages}
        meta={meta}
        page={page}
        limit={limit}
        setPage={setPage}
        setLimit={setLimit}
        isLoading={isLoading}
        deleteCMS={deleteCMS}
      />
    </Card>
  );
}
