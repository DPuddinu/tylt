import type { GoalFilters } from '@/types/filters.types';

class FilterStore {
  currentPage: number = 1;
  filters: GoalFilters = {};

  getCurrentPage() {
    return this.currentPage;
  }

  setCurrentPage(currentPage: number) {
    this.currentPage = currentPage;
  }
  setFilters(filters: GoalFilters) {
    this.filters = filters;
  }

  getFilters() {
    return this.filters;
  }

  checkFilterChange({ goalFilters, onChangedFilters }: { goalFilters: GoalFilters; onChangedFilters: () => void }) {
    Object.keys(goalFilters).forEach((key) => {
      const a = goalFilters[key as keyof typeof goalFilters];
      const b = this.filters[key as keyof typeof this.filters];
      if (a !== b) {
        onChangedFilters();
      }
    });
  }
}
const store = new FilterStore();

export default store;
