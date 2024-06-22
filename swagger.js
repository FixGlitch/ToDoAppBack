const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ToDoApp API Documentation",
      description: "TodoApp backend API.",
      contact: {
        name: "Lucas Blanco",
        email: "blancolucas112@gmail.com",
        url: "https://github.com/FixGlitch/ToDoAppBack",
      },
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3001",
        description: "Local server",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, port, authMiddleware) {
  app.use(
    "/todo-api-docs",
    authMiddleware,
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
  );
  app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}

module.exports = swaggerDocs;
