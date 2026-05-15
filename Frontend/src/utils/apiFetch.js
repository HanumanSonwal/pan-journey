export const apiFetch = async (url, options = {}) => {
  const { setLoading } = window.__loader || {};

  try {
    setLoading?.(true);

    const res = await fetch(url, options);

    return await res.json();
  } finally {
    setLoading?.(false);
  }
};