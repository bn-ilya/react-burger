import { IIngredient } from "../../../../../utils/types";

export interface IIngredientsCategory {
    id: string,
    name: string,
    ingredients: Array<IIngredient>
}