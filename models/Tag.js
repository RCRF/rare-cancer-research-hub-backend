import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Model from "sequelize";

class Tag extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Tag",
        tableName: "tags",
      }
    );
  }
}

Tag.init(sequelize);

export default Tag;
