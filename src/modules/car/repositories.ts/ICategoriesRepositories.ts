import { Category } from "../model/Category";

// Conceito DTO => Data Transfer Object
// A rota não deve conhecer a estrutura da Classe original, responsabilidade apenas do repositório
interface ICreateCategoriesDTO {
    name: string;
    description: string;
}

// Sub-tipo dos repositórios, Solid (Princípio de substituição de Liskov)
interface ICategoriesRepositories {
    findByName(name: string): Category;
    list(): Category[];
    create({ name, description }: ICreateCategoriesDTO): void;
}

export { ICreateCategoriesDTO, ICategoriesRepositories };
