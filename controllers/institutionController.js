import {
  getAllInstitutionsService,
  getAllInstitutionsByOrganizationIdService,
  insertInstitutionService,
} from "../services/institutionService.js";

export const getAllInstitutionsController = (req, res) => {
  const id = req.params.id;
  getAllInstitutionsService(id)
    .then((institutions) => {
      if (institutions) {
        res.json(institutions);
      } else {
        res.status(404).json({ error: "Institutions not found" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch institutions" });
    });
};

export const getAllInstitutionsByOrganizationIdController = (req, res) => {
  const id = req.params.id;
  getAllInstitutionsByOrganizationIdService(id)
    .then((institutions) => {
      if (institutions) {
        res.json(institutions);
      } else {
        res.status(404).json({ error: "Institutions not found." });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch institutions." });
    });
};

// Create a new institution
export const createInstitution = (req, res) => {
  if (res.isAuthenticated) {
    const institution = req.body.data;
    insertInstitutionService({ institution: institution })
      .then((institution) => {
        res.json(institution);
      })
      .catch((err) => {
        res.status(500).json({ error: "Failed to create institution" });
      });
  } else {
    res.status(403).json({
      error: "User is not an admin - could not create the institution",
    });
  }
};
