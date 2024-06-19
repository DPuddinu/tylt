import type { GoalFilters } from '@/types/filters.types';
import type { TGoal } from 'db/config';

class GoalStore {
  data: Record<number, TGoal[]> = {};
  totalCount: number | undefined = undefined;
  filters: GoalFilters = {};

  get(page: number) {
    return this.data[page];
  }
  getGoalsCount() {
    return this.totalCount ?? 0;
  }
  set(page: number, ...newData: TGoal[]) {
    if (!this.data[page]) this.data[page] = newData;
  }
  setGoalsCount(count: number) {
    this.totalCount = count;
  }

  setFilters(filters: GoalFilters) {
    this.filters = filters;
  }

  getFilters() {
    return this.filters;
  }

  clear() {
    this.data = {};
    this.totalCount = undefined;
  }

  checkFilterChange(filters: GoalFilters) {
    Object.keys(filters).forEach((key) => {
      const a = filters[key as keyof typeof filters];
      const b = this.filters[key as keyof typeof this.filters];
      if (a !== b) {
        this.clear();
      }
    });
  }
}
const store = new GoalStore();

export default store;
