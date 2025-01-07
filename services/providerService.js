import sequelize from "../config/database.js";
import { deepCamelcaseKeys } from "../helpers/utils.js";
import { v4 as uuidv4 } from "uuid";

export const getAllProvidersService = async () => {
  try {
    const query = `SELECT * FROM providers`;
    const providers = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });
    if (providers) {
      return deepCamelcaseKeys(providers);
    }
  } catch (error) {
    throw new Error("Failed to fetch providers");
  }
};

export const getAllProvidersByOrganizationIdService = async (id) => {
  try {
    const query = `SELECT
    providers.*,
    array_agg(tags.name) AS tag_names
    FROM
    organization_providers
    INNER JOIN
    providers ON organization_providers.provider_id = providers.id
    LEFT JOIN
    provider_tags ON providers.id = provider_tags.provider_id
    LEFT JOIN
    tags ON provider_tags.tag_id = tags.id
    WHERE
    organization_providers.organization_id = :id
    GROUP BY
    providers.id
`;
    const providers = await sequelize.query(query, {
      replacements: { id: id },
      type: sequelize.QueryTypes.SELECT,
    });
    if (providers) {
      return deepCamelcaseKeys(providers);
    }
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch providers");
  }
};

export const insertProviderService = async ({ provider }) => {
  try {
    const id = uuidv4();
    const insertProviderQuery = `
    INSERT INTO providers (id, first_name, last_name, designation, institution, address, city, state, postal, country, image, link, list_order)
    VALUES (:id, :first_name, :last_name, :designation, :institution, :address, :city, :state, :postal, :country, :image, :link, :list_order)
    RETURNING id
    `;
    const providerResult = await sequelize.query(insertProviderQuery, {
      replacements: {
        id: id,
        first_name: provider.firstName,
        last_name: provider.lastName,
        designation: provider.designation,
        institution: provider.institution,
        address: provider.address,
        city: provider.city,
        state: provider.state,
        postal: provider.postal,
        country: provider.country,
        image: provider.image,
        link: provider.link,
        list_order: provider.listOrder,
      },
      type: sequelize.QueryTypes.INSERT,
    });

    //insert into organization_providers table
    const insertOrganizationProvidersQuery = `
    INSERT INTO organization_providers (organization_id, provider_id)
    VALUES (:organization_id, :provider_id)
    `;
    await sequelize.query(insertOrganizationProvidersQuery, {
      replacements: {
        organization_id: provider.organization.id,
        provider_id: providerResult[0][0].id,
      },
      type: sequelize.QueryTypes.INSERT,
    });

    provider.tags.forEach(async (tag) => {
      const insertProviderTagsQuery = `
    INSERT INTO provider_tags (provider_id, tag_id)
    VALUES (:provider_id, :tag_id)
    `;
      await sequelize.query(insertProviderTagsQuery, {
        replacements: {
          provider_id: providerResult[0][0].id,
          tag_id: tag.id,
        },
        type: sequelize.QueryTypes.INSERT,
      });
    });
    return { success: true };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create providers");
  }
};
