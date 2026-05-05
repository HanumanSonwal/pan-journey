import CustomerDetail from "./customerdetail.model.js";


// GET PROFILE SERVICE
export const getCustomerdetailService = async (userId) => {
  let profile = await CustomerDetail.findOne({ userId });

  // agar first time hai → blank profile return karo
  if (!profile) {
    profile = await CustomerDetail.create({ userId });
  }

  return profile;
};


// UPDATE PROFILE SERVICE
export const updateCustomerdetailService = async (userId, payload) => {
  const { passportNo, expireDate, issuingCountry, panCardNumber } = payload;

  let profile = await CustomerDetail.findOne({ userId });

  // agar exist nahi karta → create
  if (!profile) {
    profile = new CustomerDetail({ userId });
  }

  if (passportNo !== undefined) profile.passportNo = passportNo;
  if (expireDate !== undefined) profile.expireDate = expireDate;
  if (issuingCountry !== undefined) profile.issuingCountry = issuingCountry;
  if (panCardNumber !== undefined) profile.panCardNumber = panCardNumber;

  await profile.save();
  return profile;
};