import {
  getAllTrialsService,
  getAllTrialsByOrganizationIdService,
  getAllClincialTrialsByOrganizationIdService,
} from "../services/trialService.js";

// Get all trials
export const getAllTrailsController = (req, res) => {
  const id = req.params.id;
  getAllTrialsService(id)
    .then((trials) => {
      if (trials) {
        res.json(trials);
      } else {
        res.status(404).json({ error: "Trails not found" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch trials" });
    });
};

// Get trials by organization id
export const getAllTrialsByOrganizationIdController = (req, res) => {
  const id = req.params.id;
  getAllTrialsByOrganizationIdService(id)
    .then((trials) => {
      if (trials) {
        res.json(trials);
      } else {
        res.status(404).json({ error: "Trails not found." });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch trials." });
    });
};

// Get clinical trials by organization id
export const getAllClinicalTrialsByOrganizationIdController = (req, res) => {
  const id = req.params.id;
  getAllClincialTrialsByOrganizationIdService(id)
    .then((trials) => {
      if (trials) {
        res.json(trials);
      } else {
        res.status(404).json({ error: "Clincial trials not found." });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch clincial trials." });
    });
};
