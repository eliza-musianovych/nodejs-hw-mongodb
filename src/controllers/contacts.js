import createHttpError from "http-errors";
import { createContact, deleteContact, getAllContacts, getContactById, patchContact } from "../services/contacts.js";

export const getContactsConroller = async (req, res) => {
        const students = await getAllContacts();

        res.status(200).json({
           status: 200,
           message: "Successfully found contacts!",
           data: students,
        });
    };

export const getContactsByIdContoller = async (req, res) => {
        const { contactId } = req.params;
        const contact = await getContactById(contactId);

        if (!contact) {
            throw createHttpError(404, 'Contact not found');
        }

        res.status(200).json({
            status: 200,
            message: "Successfully found contact with id {contactId}!",
            data: {
                contact,
            },
        });
    };

export const createContactConroller = async (req,res) => {
    const contact = await createContact(req.body);

    res.status(201).json({
        status: 201,
		message: "Successfully created a contact!",
		data: contact,
    });
};

export const patchContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await patchContact(contactId, req.body);

    if (!result) {
        next(createHttpError(404, 'Contact not found'));
        return;
    }

    res.json({
        status: 200,
        message: "Successfully patched a contact!",
        data: result.contact,
    });
};

export const deleteContactConroller = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await deleteContact(contactId);

    if (!contact) {
        next(createHttpError(404, 'Contact not found'));
        return;
    }

    res.status(204).send();
};
