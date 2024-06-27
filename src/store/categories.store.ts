import type { CategoryWithGoalCount } from '@/api/categories/queries';
import type { TCategory } from 'db/config';

class CategoriesStore {
  data: TCategory[] | undefined = undefined;
  categoriesWithGoalCount: CategoryWithGoalCount[] | undefined = undefined;
  getAll() {
    return this.data;
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
  clear() {
    this.data = undefined;
  }
}
const store = new CategoriesStore();

export default store;
