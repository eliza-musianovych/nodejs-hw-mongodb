import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import {
    getContactsConroller,
    getContactsByIdContoller,
    createContactConroller,
    patchContactController,
    deleteContactConroller
} from "../controllers/contacts.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createContactSchema, updateContactSchema } from "../validation/contacts.js";
import { isValidId } from "../middlewares/isValidId.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = Router();

router.use(authenticate);

router.get('/contacts',
    ctrlWrapper(getContactsConroller));

router.get('/contacts/:contactId',
    isValidId,
    ctrlWrapper(getContactsByIdContoller));

router.post('/contacts',
    validateBody(createContactSchema),
    ctrlWrapper(createContactConroller));

router.patch('/contacts/:contactId',
    isValidId,
    validateBody(updateContactSchema),
    ctrlWrapper(patchContactController));

router.delete('/contacts/:contactId',
    isValidId,
    ctrlWrapper(deleteContactConroller));

export default router;
