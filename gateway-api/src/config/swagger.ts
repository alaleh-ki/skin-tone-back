import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Gateway API",
      version: "1.0.0",
      description: "API documentation for the Gateway service",
    },
    servers: [{ url: `http://localhost:${Number(process.env.PORT) || 8000}` }],
  },
  apis: [
    // YAML/JSON sources (dev)
    "src/docs/**/*.yaml",
    "src/docs/**/*.yml",
    // YAML/JSON sources (prod build, if copied to dist)
    "dist/docs/**/*.yaml",
    "dist/docs/**/*.yml",
  ],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);