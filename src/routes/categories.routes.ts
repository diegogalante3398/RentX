// Permite criar rotas para a aplicação
import { Router } from "express";
import multer from "multer";

import { createCategoryController } from "../modules/car/useCases/createCategory";
import { importCategoryController } from "../modules/car/useCases/importCategory";
import { listCategoryController } from "../modules/car/useCases/listCategory";

const upload = multer({ dest: "./temp" });

const categoriesRoutes = Router();

categoriesRoutes.post("/", (request, response) => {
    return createCategoryController.handle(request, response);
});

categoriesRoutes.get("/", (request, response) => {
    return listCategoryController.handle(request, response);
});

categoriesRoutes.post("/import", upload.single("file"), (request, response) => {
    return importCategoryController.handle(request, response);
});
// Exporta a rota para uso externo
export { categoriesRoutes };
