import { CategoriesRepository } from "../../repositories.ts/implementations/CategoriesRepository";
import { ImportCategoryController } from "./importCategoryController";
import { ImportCategoryUseCase } from "./importCategoryUseCase";

const categoriesRepositories = CategoriesRepository.getInstance();
const importCategoryUseCase = new ImportCategoryUseCase(categoriesRepositories);
const importCategoryController = new ImportCategoryController(
    importCategoryUseCase
);

export { importCategoryController };
