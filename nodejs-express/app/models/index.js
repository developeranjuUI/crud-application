const dbConfig = require("../config/db.config.js"); // Ensure correct path
const { Sequelize } = require("sequelize");

// Initialize Sequelize with DB configuration
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
  logging: console.log, // Log SQL queries (useful for debugging)
});

// Test database connection
sequelize.authenticate()
  .then(() => console.log("Database connected successfully."))
  .catch(err => console.error("Database connection failed:", err));

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);

module.exports = db;
