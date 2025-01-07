import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Model from "sequelize";

class Provider extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        firstName: {
          type: DataTypes.TEXT,
          allowNull: false,
          field: "first_name",
        },
        lastName: {
          type: DataTypes.TEXT,
          allowNull: false,
          field: "last_name",
        },
        designation: {
          type: DataTypes.TEXT,
        },
        institution: {
          type: DataTypes.TEXT,
        },
        address: {
          type: DataTypes.TEXT,
        },
        city: {
          type: DataTypes.TEXT,
        },
        state: {
          type: DataTypes.TEXT,
        },
        country: {
          type: DataTypes.TEXT,
        },
        postal: {
          type: DataTypes.TEXT,
        },
        image: {
          type: DataTypes.TEXT,
        },
        link: {
          type: DataTypes.TEXT,
        },
      },
      {
        sequelize,
        modelName: "Provider",
        tableName: "providers",
      }
    );
  }
}

Provider.init(sequelize);

export default Provider;
