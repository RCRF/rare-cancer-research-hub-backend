import { Sequelize } from "sequelize";
import config from "../config/config.js";

// Determine the current environment (e.g., "development", "production", etc.)
const env = process.env.NODE_ENV || "development";

let databaseConfig;

if (env === "production") {
  // Use DATABASE_URL in production
  databaseConfig = extractDatabaseCredentials(process.env.DATABASE_URL);
} else {
  // Use individual environment variables in development
  databaseConfig = {
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    dialect: "postgres",
  };

  // Only use dotenv if not in a production environment
  import("dotenv").then((dotenv) => {
    dotenv.config();
  });
}

const sequelize = new Sequelize(databaseConfig.database, databaseConfig.username, databaseConfig.password, {
  host: databaseConfig.host,
  dialect: databaseConfig.dialect,
  dialectOptions: env === "production" ? {
    ssl: {
      rejectUnauthorized: false,
    },
  } : {},
});

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to the PostgreSQL database");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

export default sequelize;

function extractDatabaseCredentials(databaseUrl) {
  const url = new URL(databaseUrl);

  const credentials = {
    host: url.hostname,
    port: url.port,
    database: url.pathname.slice(1),
    username: url.username,
    password: url.password,
    dialect: "postgres",
  };

  return credentials;
}
