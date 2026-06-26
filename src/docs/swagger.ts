import swaggerJsdoc from "swagger-jsdoc";
import type { Options } from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Projeto Final Uninter",
      version: "1.0.0",
      description: "Documentação da API usando Swagger + TypeScript",
    },
    servers: [{ url: "http://localhost:3000" }],
    paths: {},
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };

