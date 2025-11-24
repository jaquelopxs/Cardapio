import express from "express";
import { login, getMe } from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Login
router.post("/login", login);

// Validar sessão (rota protegida)
router.get("/me", authMiddleware, getMe);

export default router;
