export const getAuthHeader = () => ({
  AuthHeader: {
    UserId: process.env.SUPPLIER_USER,
    Password: process.env.SUPPLIER_PASS,
    RequestId: Date.now().toString(),
    IPAddress: "1", // supplier ne yehi diya hai
  },
});