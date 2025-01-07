import { DataTypes } from "sequelize";
import Model from "sequelize";

class Article extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        title: DataTypes.STRING,
        headline: DataTypes.STRING,
        description: DataTypes.STRING,
        link: DataTypes.STRING,
        datePublished: DataTypes.DATE,
        organization_id: DataTypes.UUID,
      },
      {
        sequelize,
        modelName: "Article",
        tableName: "articles",
      }
    );
  }
}

export default Article;
