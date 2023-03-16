import { parse as csvParse } from "csv-parse";
import fs from "fs";

import { ICategoriesRepositories } from "../../repositories.ts/ICategoriesRepositories";

interface IImportCategories {
    name: string;
    description: string;
}

class ImportCategoryUseCase {
    // O arquivo com categorias será armazenado dentro do repositório de categorias
    constructor(private categoriesRepository: ICategoriesRepositories) {}

    loadCategories(file: Express.Multer.File): Promise<IImportCategories[]> {
        // o arquivo deve ser passado como Promisse
        // pois só deve ser enviado quando parseFile.on("data") for finalizado
        return new Promise((resolve, reject) => {
            // Conceito de Stream (utilizado caso o arquivo seja grande)
            const stream = fs.createReadStream(file.path);

            const categories: IImportCategories[] = [];

            // CSV-Parse é uma biblioteca de gerenciar textos CSV
            const parseFile = csvParse();

            // leitura de cada pedaço do arquivo no stream e envio para o CSV-Parse
            stream.pipe(parseFile);

            // A cada linha lida do stream insere no array os dados com as chaves {name, description}
            parseFile
                .on("data", async (line) => {
                    const [name, description] = line;

                    categories.push({
                        name,
                        description,
                    });
                })
                .on("end", () => {
                    // Ao finalizar o push no array categories envia
                    resolve(categories);
                })
                .on("error", (err) => {
                    // Mostra o erro caso tenha
                    reject(err);
                });
        });
    }

    async execute(file: Express.Multer.File): Promise<void> {
        // Recebe a resposta da Promise somente quando ela finalizar o processamento do array
        const categories = await this.loadCategories(file);

        // Percorre o array já com todos os dados e cria as categorias caso o nome ainda exista
        categories.map(async (category) => {
            const { name, description } = category;

            const existCategory = this.categoriesRepository.findByName(name);

            if (!existCategory) {
                this.categoriesRepository.create({ name, description });
            }
        });
    }
}

export { ImportCategoryUseCase };
