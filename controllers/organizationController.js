import {
  getAllOrganizationsService,
  getOrganizationByIdService,
  getAllLabResearchByOrganizationIdService,
  createOrganizationService,
  getAllTagsService,
  getAllResourcesService,
} from "../services/organizationService.js";

// Get all organizations
export const getAllOrganizations = async (req, res) => {
  //todo: Add Auth
  getAllOrganizationsService()
    .then((organizations) => {
      res.json(organizations);
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to fetch organizations" });
    });

};

// Create a new organization
export const createOrganization = (req, res) => {
  if (res.isAuthenticated) {
    createOrganizationService(req.body)
      .then((organization) => {
        res.json(organization);
      })
      .catch((err) => {
        res.status(500).json({ error: "Failed to create organization" });
      });
  } else {
    res.status(403).json({
      error: "User is not an admin - could not create the organization",
    });
  }
};

// Get organization by ID
export const getOrganizationById = (req, res) => {
  const id = req.params.id;
  getOrganizationByIdService(id)
    .then((organization) => {
      if (organization) {
        res.json(organization);
      } else {
        res.status(404).json({ error: "Organization not found.." });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch organization.." });
    });
};

// Get all tags by ID
export const getAllTagsByOrganizationIdController = (req, res) => {
  const id = req.params.id;
  getAllTagsService(id)
    .then((tags) => {
      if (tags) {
        res.json(tags);
      } else {
        res.status(404).json({ error: "Tags not found.." });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch tags.." });
    });
};

// Get all resources by ID
export const getAllResourcesByOrganizationId = (req, res) => {
  const id = req.params.id;
  getAllResourcesService(id)
    .then((resources) => {
      if (resources) {
        res.json(resources);
      } else {
        res.status(404).json({ error: "Resources not found.." });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch resources.." });
    });
};

// Get all organizations a user is a member of
export const getUserOrganizations = (req, res) => {
  getUserOrganizationsService()
    .then((organizations) => {
      res.json(organizations);
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to fetch users's organizations" });
    });
};

// Get lab research by organization id
export const getAllLabResearchByOrganizationIdController = (req, res) => {
  const id = req.params.id;
  getAllLabResearchByOrganizationIdService(id)
    .then((research) => {
      if (research) {
        res.json(research);
      } else {
        res.status(404).json({ error: "Lab research not found." });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch research." });
    });
};

// // Update an organization
// const updateOrganization = (req, res) => {
//   const id = req.params.id;
//   const { name, email, address, city, state, zip, country, phone } = req.body;
//     .updateOrganization(id, {
//       name,
//       email,
//       address,
//       city,
//       state,
//       zip,
//       country,
//       phone,
//     })
//     .then(() => {
//       res.sendStatus(204);
//     })
//     .catch((err) => {
//       res.status(500).json({ error: "Failed to update organization" });
//     });
// };

// // Delete an organization
// const deleteOrganization = (req, res) => {
//   const id = req.params.id;
//     .deleteOrganization(id)
//     .then(() => {
//       res.sendStatus(204);
//     })
//     .catch((err) => {
//       res.status(500).json({ error: "Failed to delete organization" });
//     });
// };
