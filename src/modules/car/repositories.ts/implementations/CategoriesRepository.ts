import { Category } from "../../model/Category";
import {
    ICategoriesRepositories,
    ICreateCategoriesDTO,
} from "../ICategoriesRepositories";

// Repositorio para armazenamento dos objetos
// Implementa as propriedades e funções da interface-repositório correspondente
class CategoriesRepository implements ICategoriesRepositories {
    private categories: Category[];

    // eslint-disable-next-line no-use-before-define
    private static INSTANCE: CategoriesRepository;

    private constructor() {
        this.categories = [];
    }

    public static getInstance(): CategoriesRepository {
        if (!CategoriesRepository.INSTANCE) {
            CategoriesRepository.INSTANCE = new CategoriesRepository();
        }

        return CategoriesRepository.INSTANCE;
    }
    // Metodo que deve ser chamado para criar uma nova categoria, informando o "DTO"
    create({ name, description }: ICreateCategoriesDTO) {
        const category = new Category();

        // "Object.assign" permite instanciar a Class de forma prática
        Object.assign(category, {
            name,
            description,
            created_at: new Date(),
        });

        this.categories.push(category);
    }

    // Metodo responsável por buscar todas as categorias, retorna um array de Category, mas funciona se retirar o tipo de retorno
    list(): Category[] {
        return this.categories;
    }

    findByName(name: string): Category {
        const categoryAlrearyExists = this.categories.find(
            (category) => category.name === name
        );

        return categoryAlrearyExists;
    }
}

export { CategoriesRepository };
