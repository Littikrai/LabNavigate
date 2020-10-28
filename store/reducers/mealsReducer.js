import { MEALS } from "../../data/dummy-data";
import { TOGGLE_FAVORITE } from "../action/mealsAction";

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: [],
};

const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const mealIndex = state.favoriteMeals.findIndex(
        (meal) => meal.id === action.mealId
      );
      if (mealIndex !== -1) {
        const updateFav = [...state.favoriteMeals];
        updateFav.splice(mealIndex, 1);
        console.log(updateFav);
        return {
          ...state,
          favoriteMeals: updateFav,
        };
      } else {
        const meal = state.meals.find((meal) => meal.id === action.mealId);
        return { ...state, favoriteMeals: state.favoriteMeals.concat(meal) };
      }
    default:
      return state;
  }
};

export default mealsReducer;
