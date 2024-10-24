import fetchDishes from './fetchDishes';
import fetchDishesCategories from './fetchDishesCategories';
import fetchDishById from './fetchDishById';
import createNewDish from './createNewDish';
import updateDishById from './updateDishById';
import deleteDishById from './deleteDishById';

export const dishesAPI = {
  fetchDishes,
  fetchDishesCategories,
  fetchDishById,
  createNewDish,
  updateDishById,
  deleteDishById
};