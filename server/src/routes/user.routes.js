import { Router } from "express";
import { loginUser, logutUser, register, refreshAccessToken } from "../controllers/user.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(register)
router.route("/login").post(loginUser)

// secured routes
router.route("/logout").post(verifyJwt, logutUser)
router.route("refresh-token").post(refreshAccessToken)

export default router;