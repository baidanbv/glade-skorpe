import fetchCategories from './fetchCategories';
import fetchCategoryById from './fetchCategoryById';
import createCategory from './createCategory'
import updateCategory from './updateCategory'
import deleteCategory from './deleteCategory'

export const categoriesAPI = {
  fetchCategories,
  fetchCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
}