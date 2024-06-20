const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: process.env.SWAGGER_TITLE,
      description: process.env.SWAGGER_DESCRIPTION,
      contact: {
        name: process.env.SWAGGER_CONTACT_NAME,
        email: process.env.SWAGGER_CONTACT_EMAIL,
        url: process.env.SWAGGER_CONTACT_URL,
      },
      version: process.env.SWAGGER_VERSION,
    },
    servers: [
      {
        url: process.env.SWAGGER_LOCAL_SERVER_URL,
        description: "Local server",
      }
    ],
  },
  apis: ["./src/Routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, authMiddleware) {
  app.use(
    "/todo-api-docs",
    authMiddleware,
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
  );
  app.get("/docs.json", (res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}

module.exports = swaggerDocs;
