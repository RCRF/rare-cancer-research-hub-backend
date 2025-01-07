import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Model from "sequelize";

class Trial extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        study: DataTypes.STRING,
        treatment: DataTypes.STRING,
        category: DataTypes.STRING,
        objective_response: DataTypes.STRING,
        total_patients: DataTypes.STRING,
        complete_response: DataTypes.STRING,
        stable_disease: DataTypes.STRING,
        orr: DataTypes.DECIMAL(5, 3),
        confidence: DataTypes.STRING,
        link: DataTypes.STRING,
        credit: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: "Trial",
        tableName: "trial_data",
      }
    );
  }
}

export default Trial;
