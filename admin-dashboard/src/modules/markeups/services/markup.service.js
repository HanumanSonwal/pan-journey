import api from "@/services/api";

// ================= CREATE =================

export const createMarkupApi = async (data) => {
  const res = await api.post("/markup/createMarkup", data, {
    skipToast: true,
  });

  return res.data;
};

// ================= GET =================

export const getMarkupsApi = async () => {
  const res = await api.get("/markup/getAllMarkups", {
    skipToast: true,
  });

  return res.data;
};

// ================= COUNTRIES =================

export const getCountriesApi = async (search = "") => {
  const res = await api.get(`/countries?search=${search}`, {
    skipToast: true,
  });

  return res.data;
};

// ================= STATES =================

export const getStatesApi = async ({ countryCode, search = "" }) => {
  const res = await api.get(`/states/${countryCode}?search=${search}`, {
    skipToast: true,
  });

  return res.data;
};

// ================= CITY / HOTEL =================

export const getCitiesHotelsApi = async (searchText = "") => {
  // if (!searchText?.trim()) {
  //   return [];
  // }
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
