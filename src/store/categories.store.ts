import type { CategoryWithGoalCount } from '@/api/categories/queries';
import type { TCategory } from 'db/config';

class CategoriesStore {
  data: TCategory[] | undefined = undefined;
  categoriesWithGoalCount: CategoryWithGoalCount[] | undefined = undefined;
  getAll() {
    return this.data;
  }
  getCategoryById(id: number) {
    return this.data?.find((category) => category.id === id);
  }
  set(newData: TCategory[]) {
    this.data = newData;
  }
  setCategoriesWithGoalCount(newData: CategoryWithGoalCount[]) {
    this.categoriesWithGoalCount = newData;
  }
  getCategoriesWithGoalCount() {
    return this.categoriesWithGoalCount;
  }
  addCategory(category: TCategory) {
    this.data = [category, ...(this.data ?? [])];
  }

  updateCategory(updatedCategory: TCategory) {
    this.data = this.data?.map((category: TCategory) =>
      category.id === updatedCategory.id ? updatedCategory : category
    );
  }
  clear() {
    this.data = undefined;
  }
}
const store = new CategoriesStore();

export default store;
