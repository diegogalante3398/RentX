import { ICategoriesRepositories } from "../../repositories.ts/ICategoriesRepositories";

interface IRequest {
    name: string;
    description: string;
}

// Toda regra de negócio deve ficar em um service ao invés das rotas
class CreateCategoryUseCase {
    // Importação da INTERFACE que é um contrato/sub-tipo
    // Possibilita que o codigo não quebre ao alterar o modo de armazenamento dos dados
    constructor(private categoriesRepository: ICategoriesRepositories) {}

    execute({ name, description }: IRequest): void {
        const categoryAlrearyExists =
            this.categoriesRepository.findByName(name);

        if (categoryAlrearyExists) {
            throw new Error("Category already exists!");
        }

        // Após instanciado o "CategoriesRepository" é chamado o metodo de "create" da classe
        // Passado os parametros "name" e "description" recebido no "request.body"
        this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase };
