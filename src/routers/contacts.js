import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import {
    getContactsConroller,
    getContactsByIdContoller,
    createContactConroller,
    patchContactController,
    deleteContactConroller
} from "../controllers/contacts.js";

const router = Router();

router.get('/contacts',
    ctrlWrapper(getContactsConroller));

router.get('/contacts/:contactId',
    ctrlWrapper(getContactsByIdContoller));

router.post('/contacts',
    ctrlWrapper(createContactConroller));

router.patch('/contacts/:contactId',
    ctrlWrapper(patchContactController));

router.delete('/contacts/:contactId',
    ctrlWrapper(deleteContactConroller));

export default router;
