import express from "express";

// Importa Swagger para documentação do sistema
import swaggerUi from "swagger-ui-express";

import { router } from "./routes";
import swaggerJson from "./swagger.json";

// Importa rotas

const app = express();

// Permite uso de JSON das rotas
app.use(express.json());

// Rota do swagger - documentação
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJson));

// Rotas do sistema
app.use(router);

app.listen(3333, () => console.log("Server running!"));
