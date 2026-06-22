import Contact from "./contact.model.js";


// CREATE CONTACT
export const createContactService = async (payload) => {
  const contact = await Contact.create(payload);

  return contact;
};



// GET ALL CONTACTS
export const getAllContactsService = async ({
  page = 1,
  limit = 10,
  UserId,
}) => {
  const skip = (page - 1) * limit;

  const contacts = await Contact.find({
    UserId,
  })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Contact.countDocuments({
    UserId,
  });

  return {
    contacts,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};



// GET SINGLE CONTACT
export const getSingleContactService = async (id, userId) => {
  const contact = await Contact.findOne({
    _id: id,
    UserId: userId,
  });

  if (!contact) {
    throw new Error("Contact not found");
  }

  return contact;
};



// UPDATE CONTACT
export const updateContactService = async (
  id,
  userId,
  payload
) => {
  const contact = await Contact.findOneAndUpdate(
    {
      _id: id,
      UserId: userId,
    },
    payload,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!contact) {
    throw new Error("Contact not found");
  }

  return contact;
};



// DELETE CONTACT
export const deleteContactService = async (
  id,
  userId
) => {
  const contact = await Contact.findOneAndDelete({
    _id: id,
    UserId: userId,
  });

  if (!contact) {
    throw new Error("Contact not found");
  }

  return true;
};