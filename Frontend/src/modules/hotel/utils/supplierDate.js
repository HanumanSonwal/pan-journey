import dayjs from "dayjs";

/**
 * Supplier APIs always expect MM/DD/YYYY
 */
export const formatSupplierDate = (date) => {
  if (!date) return "";

  return dayjs(date).format("MM/DD/YYYY");
};
