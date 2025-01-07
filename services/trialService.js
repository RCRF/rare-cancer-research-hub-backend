import sequelize from "../config/database.js";
import { deepCamelcaseKeys } from "../helpers/utils.js";

export const getAllTrialsService = async () => {
  try {
    const query = `SELECT * FROM trial_data`;
    const results = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });
    const trials = results;
    if (trials) {
      return deepCamelcaseKeys(trials);
    }
  } catch (error) {
    throw new Error("Failed to fetch trials");
  }
};

export const getAllTrialsByOrganizationIdService = async (id) => {
  try {
    const query = `SELECT
    *
    FROM
    trial_data
    WHERE
    organization_id = :id;`;
    const results = await sequelize.query(query, {
      replacements: { id: id },
      type: sequelize.QueryTypes.SELECT,
    });
    const trials = results;
    if (trials) {
      return deepCamelcaseKeys(trials);
    }
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch trials");
  }
};

export const getAllClincialTrialsByOrganizationIdService = async (id) => {
  try {
    const query = `SELECT
    *
    FROM
    clinical_trials
    WHERE
    organization_id = :id;`;
    const results = await sequelize.query(query, {
      replacements: { id: id },
      type: sequelize.QueryTypes.SELECT,
    });
    const trials = results;
    if (trials) {
      return deepCamelcaseKeys(trials);
    }
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch clincial trials");
  }
};
