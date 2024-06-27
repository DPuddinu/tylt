import type { TGoal } from 'db/config';

class GoalStore {
  paginatedData: Record<number, TGoal[]> = {};

  totalCount: number | undefined = undefined;
  getAll() {
    return this.paginatedData;
  }
  getGoalsByPage(page: number) {
    return this.paginatedData[page];
  }
  getGoalsCount() {
    return this.totalCount ?? 0;
  }

  set(page: number, ...newData: TGoal[]) {
    this.paginatedData[page] = newData;
  }
  setGoalsCount(count: number) {
    this.totalCount = count;
  }

  clear() {
    this.paginatedData = {};
    this.totalCount = undefined;
  }
  getGoalById(id: number) {
    return Object.values(this.paginatedData)
      .flat()
      .find((goal) => goal.id === id);
  }
  updateGoalById(updatedGoal: TGoal) {
    const keys = Object.keys(this.paginatedData);
    keys.forEach((key) => {
      const values = this.paginatedData[Number(key)];
      values.forEach((goal) => {
        if (goal.id === updatedGoal.id) {
          this.set(Number(key), ...values.map((goal) => (goal.id === updatedGoal.id ? updatedGoal : goal)));
        }
      });
    });
  }
}
const store = new GoalStore();

export default store;
