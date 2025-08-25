import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.js";
import {
    loginUserSchema,
    registerUserSchema
} from "../validation/auth.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import {
    loginUserController,
    logoutUserConroller,
    refreshUserSessionConroller,
    registerUserController
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

export default router;
