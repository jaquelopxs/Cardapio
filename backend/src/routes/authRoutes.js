console.log("ROTAS DE AUTH CARREGADAS DE:", import.meta.url);

import express from "express";
import { login, getMe } from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.get("/me", authMiddleware, getMe);

export default router;
