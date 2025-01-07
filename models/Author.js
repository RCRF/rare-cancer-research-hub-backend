import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Model from "sequelize";

class Author extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        designation: DataTypes.STRING,
        institution: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: "Author",
        tableName: "authors",
      }
    );
  }
}

Author.init(sequelize);

export default Author;
