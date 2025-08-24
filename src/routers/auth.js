import { Router } from "express";
import { validateBody } from "../middlewares/validateBody";
import {
    loginUserSchema,
    registerUserSchema
} from "../validation/auth";
import { ctrlWrapper } from "../utils/ctrlWrapper";
import {
    loginUserController,
    logoutUserConroller,
    refreshUserSessionConroller,
    registerUserController
} from "../controllers/auth";

const router = Router();

router.post(
    '/auth/register',
    validateBody(registerUserSchema),
    ctrlWrapper(registerUserController),
);

router.post(
    '/auth/login',
    validateBody(loginUserSchema),
    ctrlWrapper(loginUserController),
);

router.post(
    '/auth/refresh',
    ctrlWrapper(refreshUserSessionConroller),
);

router.post(
    '/auth/logout',
    ctrlWrapper(logoutUserConroller),
);

export default router;
