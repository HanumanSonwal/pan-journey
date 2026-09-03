import dayjs from "dayjs";

/**
 * Hotel Search API expects MM-DD-YYYY
 */
export const formatSupplierDate = (date) => {
  if (!date) return "";

  return dayjs(date).format("MM-DD-YYYY");
};
