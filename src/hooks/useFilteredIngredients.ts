import { IIngredient } from '../utils/types';

export const useFilteredIngredients = (ingredients: Array<IIngredient>) => {
  const filteredIngredients = Array.from(new Set(ingredients)).map((ingredient) => {
    const count = ingredients.reduce((acc, reduceIngredient) => {
      if (ingredient._id === reduceIngredient._id) {
        return acc + 1;
      } else {
        return acc;
      }
    }, 0);

    return { ...ingredient, count: count };
  });

  return filteredIngredients;
};
