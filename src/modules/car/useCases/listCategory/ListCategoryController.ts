import { Response, Request } from "express";

import { ListCategoryUseCase } from "./ListCategoryUseCase";

class ListCategoryController {
    constructor(private listCategoryUseCase: ListCategoryUseCase) {}

    handle(request: Request, response: Response) {
        const categories = this.listCategoryUseCase.execute();

        return response.status(200).json(categories);
    }
}

export { ListCategoryController };
