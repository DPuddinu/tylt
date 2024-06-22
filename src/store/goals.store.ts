import type { TGoal } from 'db/config';

class GoalStore {
  data: Record<number, TGoal[]> = {};
  totalCount: number | undefined = undefined;
  getAll() {
    return this.data;
  }
  getGoalsByPage(page: number) {
    return this.data[page];
  }
  getGoalsCount() {
    return this.totalCount ?? 0;
  }

  set(page: number, ...newData: TGoal[]) {
    this.data[page] = newData;
  }
  setGoalsCount(count: number) {
    this.totalCount = count;
  }

  clear() {
    this.data = {};
    this.totalCount = undefined;
  }
  getGoalById(page: number, id: number) {
    return this.getGoalsByPage(page)?.find((goal) => goal.id === id);
  }

  updateGoal(page: number, updatedGoal: TGoal) {
    this.set(page, ...this.data[page].map((goal) => (goal.id === updatedGoal.id ? updatedGoal : goal)));
  }
}
const store = new GoalStore();

export default store;
