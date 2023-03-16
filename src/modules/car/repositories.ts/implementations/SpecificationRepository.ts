import { Specification } from "../../model/Specification";
import {
    ISpecificationRepository,
    ISpecificationRepositoryDTO,
} from "../ISpecificationRepository";

class SpecificationRepository implements ISpecificationRepository {
    private specifications: Specification[];

    // eslint-disable-next-line no-use-before-define
    private static INSTANCE: SpecificationRepository;

    private constructor() {
        this.specifications = [];
    }

    public static getInstance() {
        if (!SpecificationRepository.INSTANCE) {
            SpecificationRepository.INSTANCE = new SpecificationRepository();
        }
        return SpecificationRepository.INSTANCE;
    }

    create({ description, name }: ISpecificationRepositoryDTO): void {
        const specification = new Specification();
        Object.assign(specification, { name, description });

        this.specifications.push(specification);
    }

    findByName(name: string): Specification {
        const specificationAlreadyExists = this.specifications.find(
            (specification) => specification.name === name
        );

        return specificationAlreadyExists;
    }
}

export { SpecificationRepository };
