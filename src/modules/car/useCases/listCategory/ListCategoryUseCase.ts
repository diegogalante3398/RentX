import { Category } from "../../model/Category";
import { ICategoriesRepositories } from "../../repositories.ts/ICategoriesRepositories";

class ListCategoryUseCase {
    constructor(private categoryRepository: ICategoriesRepositories) {}

    execute(): Category[] {
        return this.categoryRepository.list();
    }
}

export { ListCategoryUseCase };
