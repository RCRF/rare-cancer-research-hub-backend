import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class Organization extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
        },
        address: {
          type: DataTypes.STRING,
        },
        city: {
          type: DataTypes.STRING,
        },
        state: {
          type: DataTypes.STRING,
        },
        zip: {
          type: DataTypes.STRING,
        },
        country: {
          type: DataTypes.STRING,
        },
        phone: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        modelName: "Organization",
        tableName: "organizations",
      }
    );
  }
}

Organization.init(sequelize);

export default Organization;
