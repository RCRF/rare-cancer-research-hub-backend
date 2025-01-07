import express from "express";
import { getLogin } from "../controllers/loginController.js";

const router = express.Router();

// Get login endpoint
router.get("/", getLogin);

export default router;
