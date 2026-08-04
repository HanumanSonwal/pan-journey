import api from "@/services/api";

export const createMarkupApi = async (data) => {
  const res = await api.post("/markup/createMarkup", data, {
    // skipToast: true,
  });

  return res?.data;
};

// ================= GET ALL =================

export const getMarkupsApi = async (params = {}) => {
  const res = await api.get("/markup/getAllMarkups", {
    params,
    skipToast: true,
  });

  return {
    markups: res?.data?.data || [],

    meta: res?.data?.meta || {},
  };
};
// ================= UPDATE =================

export const updateMarkupApi = async ({ id, data }) => {
  const res = await api.put(`/markup/${id}`, data, {
    // skipToast: true,
  });

  return res?.data;
};

// ================= DELETE =================

export const deleteMarkupApi = async (id) => {
  const res = await api.delete(`/markup/${id}`, {
    // skipToast: true,
  });

  return res?.data;
};

// ================= UPDATE STATUS =================

export const updateMarkupStatusApi = async ({ id, data }) => {
  const res = await api.patch(`/markup/status/${id}`, data, {
    // skipToast: true,
  });

  return res?.data;
};

// ================= COUNTRIES =================

export const getCountriesApi = async (search = "") => {
  const res = await api.get(`/countries?search=${search}`, {
    skipToast: true,
  });

  return res?.data?.data || [];
};

// ================= STATES =================

export const getStatesApi = async ({ countryCode, search = "" }) => {
  const res = await api.get(`/states/${countryCode}?search=${search}`, {
    skipToast: true,
  });

  return res?.data?.data || [];
};

// ================= CITY / HOTEL =================

export const getCitiesHotelsApi = async (searchText = "") => {
  if (!searchText?.trim()) {
    return [];
  }

  const response = await api.post(
    "/Seacrhcity/destination-search",
    {
      SearchInput: searchText,
   
    },
    {
      skipToast: true,
    },
  );

  return response?.data?.data || [];
};

// ================= CREATE TAX =================

export const createTaxApi = async (data) => {
  const res = await api.post("/tax/create", data);

  return res?.data;
};

// ================= TAX LIST =================

export const getTaxesApi = async (params = {}) => {
  const res = await api.get("/tax/all", {
    params,
    skipToast: true,
  });

  return {
    taxes: res?.data?.data || [],
    meta: res?.data?.meta || {},
  };
};

// ================= UPDATE TAX =================

export const updateTaxApi = async ({ id, data }) => {
  const res = await api.put(`/tax/update/${id}`, data);

  return res?.data;
};

// ================= DELETE TAX =================

export const deleteTaxApi = async (id) => {
  const res = await api.delete(`/tax/delete/${id}`);

  return res?.data;
};

// ================= UPDATE TAX STATUS =================

export const updateTaxStatusApi = async ({ id, data }) => {
  const res = await api.patch(`/tax/status/${id}`, data);

  return res?.data;
};
