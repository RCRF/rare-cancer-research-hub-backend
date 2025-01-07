import {
  getAllProvidersService,
  getAllProvidersByOrganizationIdService,
  insertProviderService,
} from "../services/providerService.js";

// Get all providers
export const getAllProviders = async (req, res) => {
  try {
    const id = req.params.id;
    const providers = await getAllProvidersService(id);
    if (providers) {
      res.json(providers);
    } else {
      res.status(404).json({ error: "Providers not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch providers" });
  }
};

// Get providers by organization id
export const getAllProvidersByOrganizationId = async (req, res) => {
  try {
    const id = req.params.id;
    const providers = await getAllProvidersByOrganizationIdService(id);
    if (providers) {
      res.json(providers);
    } else {
      res.status(404).json({ error: "Providers not found." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch providers." });
  }
};

// Create a new provider
export const createProvider = (req, res) => {
  if (res.isAuthenticated) {
    const provider = req.body.data;
    insertProviderService({ provider })
      .then((provider) => {
        res.json(provider);
      })
      .catch((err) => {
        res.status(500).json({ error: "Failed to create provider" });
      });
  } else {
    res.status(403).json({
      error: "User is not an admin - could not create the provider",
    });
  }
};
