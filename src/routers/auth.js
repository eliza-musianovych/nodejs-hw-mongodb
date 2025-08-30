import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.js";
import {
    loginUserSchema,
    registerUserSchema,
    resetPwdSchema,
    sentResetEmailSchema
} from "../validation/auth.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import {
    loginUserController,
    logoutUserConroller,
    refreshUserSessionConroller,
    registerUserController,
    resetPwdController,
    sentResetEmailConroller
} from "../controllers/auth.js";

const router = Router();

router.post(
    '/register',
    validateBody(registerUserSchema),
    ctrlWrapper(registerUserController),
);

router.post(
    '/login',
    validateBody(loginUserSchema),
    ctrlWrapper(loginUserController),
);

router.post(
    '/refresh',
    ctrlWrapper(refreshUserSessionConroller),
);

router.post(
    '/logout',
    ctrlWrapper(logoutUserConroller),
);

router.post(
    '/sent-reset-email',
    validateBody(sentResetEmailSchema),
    ctrlWrapper(sentResetEmailConroller),
);

router.post(
    '/reset-pwd',
    validateBody(resetPwdSchema),
    ctrlWrapper(resetPwdController),
);

export default router;
