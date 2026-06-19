import {
  createContactService,
  getAllContactsService,
  getSingleContactService,
  updateContactService,
  deleteContactService,
} from "./contact.service.js";

import {
  sendSuccess,
  sendError,
} from "../../utils/response/ApiResponse.js";



// CREATE CONTACT
export const createContact = async (req, res) => {
  try {
    const result = await createContactService(req.body);

    return sendSuccess(
      res,
      "Contact created successfully",
      result,
      null,
      201
    );
  } catch (error) {
    return sendError(
      res,
      error.message,
      500
    );
  }
};



// GET ALL CONTACTS
export const getAllContacts = async (req, res) => {
  try {
    const result = await getAllContactsService(req.query);

    return sendSuccess(
      res,
      "Contacts fetched successfully",
      result
    );
  } catch (error) {
    return sendError(
      res,
      error.message,
      500
    );
  }
};



// GET SINGLE CONTACT
export const getSingleContact = async (req, res) => {
  try {
    const result = await getSingleContactService(
      req.params.id
    );

    return sendSuccess(
      res,
      "Contact fetched successfully",
      result
    );
  } catch (error) {
    return sendError(
      res,
      error.message,
      404
    );
  }
};



// UPDATE CONTACT
export const updateContact = async (req, res) => {
  try {
    const result = await updateContactService(
      req.params.id,
      req.body
    );

    return sendSuccess(
      res,
      "Contact updated successfully",
      result
    );
  } catch (error) {
    return sendError(
      res,
      error.message,
      404
    );
  }
};



// DELETE CONTACT
export const deleteContact = async (req, res) => {
  try {
    await deleteContactService(
      req.params.id
    );

    return sendSuccess(
      res,
      "Contact deleted successfully"
    );
  } catch (error) {
    return sendError(
      res,
      error.message,
      404
    );
  }
};