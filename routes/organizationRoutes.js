import express from "express";
import * as organizationController from "../controllers/organizationController.js";
import * as institutionController from "../controllers/institutionController.js";
import * as providerController from "../controllers/providerController.js";
import * as articleController from "../controllers/articleController.js";
import * as trialController from "../controllers/trialController.js";
import { protectRouteAndCheckAdmin } from "../controllers/loginController.js";

const router = express.Router();

// Get lab research by organization
router.get(
  "/:id/research",
  organizationController.getAllLabResearchByOrganizationIdController
);

// Get trials by organization
router.get(
  "/:id/trials",
  trialController.getAllTrialsByOrganizationIdController
);

// Get clincial trials by organization
router.get(
  "/:id/clinical-trials",
  trialController.getAllClinicalTrialsByOrganizationIdController
);

// Get articles by organization
router.get(
  "/:id/articles",
  articleController.getAllArticlesByOrganizationIdController
);

// Get providers by organization
router.get(
  "/:id/providers",
  providerController.getAllProvidersByOrganizationId
);

// Get institutions by organization
router.get(
  "/:id/institutions",
  institutionController.getAllInstitutionsByOrganizationIdController
);

// Get tags by organization
router.get(
  "/:id/tags",
  protectRouteAndCheckAdmin,
  organizationController.getAllTagsByOrganizationIdController
);

// Get resources by organization
router.get(
  "/:id/resources",
  organizationController.getAllResourcesByOrganizationId
);

// Get organizations by ID
router.get("/:id", organizationController.getOrganizationById);

// Get all organizations
router.get(
  "/",
  organizationController.getAllOrganizations
);

// create new organization
router.post(
  "/create",
  protectRouteAndCheckAdmin,
  organizationController.createOrganization
);

export default router;
