import express from "express";
import {
  getAllProvidersByOrganizationIdService,
  getAllProvidersService,
} from "../services/providerService.js";
import * as providerController from "../controllers/providerController.js";
import { protectRouteAndCheckAdmin } from "../controllers/loginController.js";

const router = express.Router();

// Get providers by organization
router.get(
  "/organizations/:id/providers",
  getAllProvidersByOrganizationIdService
);

// Get all providers
router.get("/", getAllProvidersService);

// create new provider
router.post(
  "/create",
  protectRouteAndCheckAdmin,
  providerController.createProvider
);

export default router;
