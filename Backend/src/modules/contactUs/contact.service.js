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
  status,
}) => {
  const query = {};

  if (status) {
    query.status = status;
  }

  const skip = (page - 1) * limit;

  const contacts = await Contact.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Contact.countDocuments(query);

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
export const getSingleContactService = async (id) => {
  const contact = await Contact.findById(id);

  if (!contact) {
    throw new Error("Contact not found");
  }

  return contact;
};



// UPDATE CONTACT
export const updateContactService = async (id, payload) => {
  const contact = await Contact.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!contact) {
    throw new Error("Contact not found");
  }

  return contact;
};



// DELETE CONTACT
export const deleteContactService = async (id) => {
  const contact = await Contact.findByIdAndDelete(id);

  if (!contact) {
    throw new Error("Contact not found");
  }

  return true;
};