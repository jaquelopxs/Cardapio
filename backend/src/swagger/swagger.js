import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Cardápio Digital API",
      version: "1.0.0",
      description: "Documentação oficial da API do Cardápio Digital"
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor Local"
      }
    ]
  },

  apis: ["./src/routes/*.js"], // Lê documentação das rotas
};

export const swaggerSpec = swaggerJSDoc(options);

export function swaggerDocs(app) {
  app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

  console.log("📘 Swagger rodando em: http://localhost:3000/docs");
}
