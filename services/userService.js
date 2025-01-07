import sequelize from "../config/database.js";
import { deepCamelcaseKeys } from "../helpers/utils.js";

export const getUserOrganizationsService = async (id) => {
  try {
    const query = `SELECT 
    org.id AS organization_id,
    org.name AS organization_name,
    roles.role_name AS user_role
  FROM 
    users 
  JOIN 
    user_roles ON users.id = user_roles.user_id
  JOIN 
    roles ON user_roles.role_id = roles.id
  JOIN 
    organizations AS org ON user_roles.organization_id = org.id
  WHERE 
    users.id = :userId`;
    const organizations = await sequelize.query(query, {
      replacements: { userId: id },
      type: sequelize.QueryTypes.SELECT,
    });
    return deepCamelcaseKeys(organizations);
  } catch (error) {
    throw new Error("Failed to fetch user organizations");
  }
};

export const isUserAdminService = async (id) => {
  try {
    const query = `SELECT * FROM user_roles WHERE user_id = :userId AND role_id = :roleId`;
    const user = await sequelize.query(query, {
      replacements: { userId: id, roleId: 1 },
      type: sequelize.QueryTypes.SELECT,
    });
    return deepCamelcaseKeys(user.length > 0);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch admin status");
  }
};

export const getUserByEmailService = async (email) => {
  try {
    const query = `SELECT * FROM users where email = :email`;
    const user = await sequelize.query(query, {
      replacements: { email: email },
      type: sequelize.QueryTypes.SELECT,
    });
    return deepCamelcaseKeys(user);
  } catch (error) {
    throw new Error("Failed to fetch user");
  }
};

export const getUserById = async (id) => {
  try {
    const query = `SELECT * FROM users where id = :id`;
    const user = await sequelize.query(query, {
      replacements: { id: id },
      type: sequelize.QueryTypes.SELECT,
    });
    return deepCamelcaseKeys(user);
  } catch (error) {
    throw new Error("Failed to fetch user by id");
  }
};
