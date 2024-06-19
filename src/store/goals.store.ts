import type { TGoal } from 'db/config';

class GoalStore {
  data: Record<number, TGoal[]> = {};
  totalCount: number | undefined = undefined;

  get(page: number) {
    return this.data[page];
  }
  getGoalsCount() {
    return this.totalCount;
  }
  set(page: number, ...newData: TGoal[]) {
    if (!this.data[page]) this.data[page] = newData;
  }
  setGoalsCount(count: number) {
    this.totalCount = count;
  }
  clear() {
    this.data = {};
  }
  clearPagesCount() {
    this.totalCount = undefined;
  }
}
const store = new GoalStore();

export default store;
