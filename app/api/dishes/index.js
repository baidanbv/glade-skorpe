import fetchDishes from './fetchDishes';
import fetchDishById from './fetchDishById';
import createNewDish from './createNewDish';
import updateDishById from './updateDishById';
import deleteDishById from './deleteDishById';

import fetchDishesCategories from '../categories/fetchCategories';
import createCategory from '../categories/createCategory';
import updateCategory from '../categories/updateCategory';
import deleteCategoryById from '../categories/deleteCategory';

export const dishesAPI = {
  fetchDishes,
  fetchDishById,
  createNewDish,
  updateDishById,
  deleteDishById,

  fetchDishesCategories,
  createCategory,
  updateCategory,
  deleteCategoryById
};