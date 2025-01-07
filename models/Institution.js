import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";
import Model from "sequelize";

class Institution extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        name: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        lab: {
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
        modelName: "Institution",
        tableName: "institutions",
      }
    );
  }
}

Institution.init(sequelize);

export default Institution;
