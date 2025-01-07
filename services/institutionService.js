import sequelize from "../config/database.js";
import { deepCamelcaseKeys } from "../helpers/utils.js";
import { v4 as uuidv4 } from "uuid";

export const getAllInstitutionsService = async () => {
  try {
    const query = `SELECT * FROM institutions`;
    const results = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });
    const institutions = results;
    if (institutions) {
      return deepCamelcaseKeys(institutions);
    }
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch institutions");
  }
};

export const getAllInstitutionsByOrganizationIdService = async (id) => {
  try {
    const query = `SELECT 
      institutions.*, 
      array_agg(tags.name) AS tag_names
    FROM 
      organization_institutions
      INNER JOIN institutions ON organization_institutions.institution_id = institutions.id
      LEFT JOIN institution_tags ON institutions.id = institution_tags.institution_id
      LEFT JOIN tags ON institution_tags.tag_id = tags.id
    WHERE 
      organization_institutions.organization_id = :id
    GROUP BY 
      institutions.id`;
    const results = await sequelize.query(query, {
      replacements: { id: id },
      type: sequelize.QueryTypes.SELECT,
    });
    const institutions = results;
    if (institutions) {
      return deepCamelcaseKeys(institutions);
    }
  } catch (error) {
    throw new Error("Failed to fetch institutions");
  }
};

export const insertInstitutionService = async ({ institution }) => {
  try {
    const id = uuidv4();
    const insertInstitutionQuery = `
    INSERT INTO institutions (id, name, lab, address, city, state, postal, country, image, link, list_order)
    VALUES (:id, :name, :lab, :address, :city, :state, :postal, :country, :image, :link, :list_order)
    RETURNING id
    `;
    const institutionResult = await sequelize.query(insertInstitutionQuery, {
      replacements: {
        id: id,
        name: institution.name,
        lab: institution.lab,
        address: institution.address,
        city: institution.city,
        state: institution.state,
        postal: institution.postal,
        country: institution.country,
        image: institution.image,
        link: institution.link,
        list_order: institution.listOrder,
      },
      type: sequelize.QueryTypes.INSERT,
    });

    const insertOrganizationInstitutionsQuery = `
    INSERT INTO organization_institutions (organization_id, institution_id)
    VALUES (:organization_id, :institution_id)
    `;
    await sequelize.query(insertOrganizationInstitutionsQuery, {
      replacements: {
        organization_id: institution.organization.id,
        institution_id: institutionResult[0][0].id,
      },
      type: sequelize.QueryTypes.INSERT,
    });

    institution.tags.forEach(async (tag) => {
      const insertInstitutionTagsQuery = `
    INSERT INTO institution_tags (institution_id, tag_id)
    VALUES (:institution_id, :tag_id)
    `;
      await sequelize.query(insertInstitutionTagsQuery, {
        replacements: {
          institution_id: institutionResult[0][0].id,
          tag_id: tag.id,
        },
        type: sequelize.QueryTypes.INSERT,
      });
    });
    return { success: true };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create institution");
  }
};
