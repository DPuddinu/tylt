import type { TCategory } from 'db/config';

class CategoriesStore {
  data: TCategory[] | undefined = undefined;

  get() {
    return this.data;
  }

  set(newData: TCategory[]) {
    this.data = newData;
  }

  clear() {
    this.data = undefined;
  }
}
const store = new CategoriesStore();

export default store;
