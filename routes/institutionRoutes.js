import express from "express";
import {
  getAllInstitutionsByOrganizationIdController,
  getAllInstitutionsController,
  createInstitution,
} from "../controllers/institutionController.js";
import { protectRouteAndCheckAdmin } from "../controllers/loginController.js";

const router = express.Router();

// Get institutions by organization
router.get(
  "/organizations/:id/institutions",
  getAllInstitutionsByOrganizationIdController
);

// Get all institutions
router.get("/", getAllInstitutionsController);

// create new institution
router.post("/create", protectRouteAndCheckAdmin, createInstitution);

export default router;
