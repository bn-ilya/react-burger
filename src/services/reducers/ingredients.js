import { createSlice } from '@reduxjs/toolkit';
// Api
import { getIngredients as getIngredientsApi } from '../../utils/burger-api';

const ingredientsSlice = createSlice({
    name: "ingredients",
    initialState: {
        buns: [],
        sauces: [],
        mains: [],
        ingredientsRequest: false,
        ingredientsFailed: false
    },
    reducers: {
        setIngredients(state, action) {
            state.buns = action.payload.filter(ingredient => ingredient.type === 'bun');
            state.sauces = action.payload.filter(ingredient => ingredient.type === 'sauce');
            state.mains = action.payload.filter(ingredient => ingredient.type === 'main');
        },
        setIngredientsRequest(state, action) {
            state.ingredientsRequest = action.payload
        },
        setIngredientsFailed(state, action) {
            state.ingredientsFailed = action.payload
        },
        setCountIngredients(state, action) {

            for (let key in action.payload) {
                switch (action.payload[key].type) {
                    case 'bun':
                        state.buns = state.buns.map(bun => bun['_id'] === key ? { ...bun, count: action.payload[key].count } : { ...bun, count: null });
                        break;
                    case 'sauce':
                        state.sauces = state.sauces.map(sauce => sauce['_id'] === key ? { ...sauce, count: action.payload[key].count } : sauce);
                        break;
                    case 'main':
                        state.mains = state.mains.map(main => main['_id'] === key ? { ...main, count: action.payload[key].count } : main);
                        break;
                }
            }
        },
        incrementCount(state, action) {
            switch (action.payload.type) {
                case 'bun':
                    state.buns = state.buns.map(bun => bun['_id'] === action.payload.id ? { ...bun, count: (bun?.count ?? 0) + 1 } : bun);
                    break;
                case 'sauce':
                    state.sauces = state.sauces.map(sauce => sauce['_id'] === action.payload.id ? { ...sauce, count: (sauce?.count ?? 0) + 1 } : sauce);
                    break;
                case 'main':
                    state.mains = state.mains.map(main => main['_id'] === action.payload.id ? { ...main, count: (main?.count ?? 0) + 1 } : main);
                    break;
            }
        },
        decrementCount(state, action) {
            switch (action.payload.type) {
                case 'bun':
                    state.buns = state.buns.map(bun => bun['_id'] === action.payload.id ? { ...bun, count: (bun?.count ?? 0) - 1 } : bun);
                case 'sauce':
                    state.sauces = state.sauces.map(sauce => sauce['_id'] === action.payload.id ? { ...sauce, count: (sauce?.count ?? 0) - 1 } : sauce);
                case 'main':
                    state.mains = state.mains.map(main => main['_id'] === action.payload.id ? { ...main, count: (main?.count ?? 0) - 1 } : main);
            }
        }
    }
})

export const getIngredients = () => {
    return (dispatch) => {
        dispatch(setIngredientsRequest(true));
        getIngredientsApi()
            .then(data => {
                dispatch(setIngredients(data))
                dispatch(setIngredientsFailed(false))
            })
            .catch(() => {
                dispatch(setIngredientsFailed(true))
            })
            .finally(() => {
                dispatch(setIngredientsRequest(false))
            })
    }
}

export default ingredientsSlice.reducer;
export const { setIngredients, setIngredientsFailed, setIngredientsRequest, incrementCount, decrementCount, setCountIngredients } = ingredientsSlice.actions;