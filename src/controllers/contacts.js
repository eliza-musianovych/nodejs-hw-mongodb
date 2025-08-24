import createHttpError from "http-errors";
import { createContact, deleteContact, getAllContacts, getContactById, patchContact } from "../services/contacts.js";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { parseFilterParams } from "../utils/parseFilterParams.js";

export const getContactsConroller = async (req, res) => {
        const { page, perPage } = parsePaginationParams(req.query);
        const { sortOrder, sortBy } = parseSortParams(req.query);
        const filter = parseFilterParams(req.query);

        const students = await getAllContacts({
            page,
            perPage,
            sortBy,
            sortOrder,
            filter,
            userId: req.user._id,
        });

        res.status(200).json({
           status: 200,
           message: "Successfully found contacts!",
           data: students,
        });
    };

export const getContactsByIdContoller = async (req, res) => {
        const { contactId } = req.params;
        const contact = await getContactById({ contactId, userId: req.user._id });

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

export const createContactConroller = async (req, res, next) => {
    const contactData = {
        ...req.body,
        usedId: req.user._id,
    };

    const contact = await createContact(contactData);

    res.status(201).json({
        status: 201,
		message: "Successfully created a contact!",
		data: contact,
    });
};

export const patchContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await patchContact(
        { contactId, userId: req.user._id },
        req.body
    );

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
    const contact = await deleteContact({ contactId, userId: req.user._id });

    if (!contact) {
        next(createHttpError(404, 'Contact not found'));
        return;
    }

    res.status(204).send();
};
