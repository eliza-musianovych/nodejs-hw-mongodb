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
import { upload } from "../middlewares/multer.js";

const router = Router();

router.use(authenticate);

router.get('/',
    ctrlWrapper(getContactsConroller));

router.get('/:contactId',
    isValidId,
    ctrlWrapper(getContactsByIdContoller));

router.post('/',
    upload.single('photo'),
    validateBody(createContactSchema),
    ctrlWrapper(createContactConroller));

router.patch('/:contactId',
    isValidId,
    upload.single('photo'),
    validateBody(updateContactSchema),
    ctrlWrapper(patchContactController));

router.delete('/:contactId',
    isValidId,
    ctrlWrapper(deleteContactConroller));

export default router;
