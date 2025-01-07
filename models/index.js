import fs from "fs";
import path from "path";
import { Sequelize, DataTypes } from "sequelize";
import process from "process";

const basename = path.basename(import.meta.url);
const env = process.env.NODE_ENV || "local";
const config = await import(`${__dirname}/../config/config.js`).then(
  (module) => module.default
);
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config);
}

const importModels = async () => {
  const files = fs
    .readdirSync(__dirname)
    .filter(
      (file) =>
        file.indexOf(".") !== 0 &&
        file !== basename &&
        file.slice(-3) === ".js" &&
        file.indexOf(".test.js") === -1
    );

  await Promise.all(
    files.map(async (file) => {
      const model = await import(path.join(__dirname, file)).then(
        (module) => module.default
      );
      db[model.name] = model(sequelize, DataTypes);
    })
  );
};

await importModels();

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
