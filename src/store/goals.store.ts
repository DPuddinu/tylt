import type { TGoal } from 'db/config';

class GoalStore {
  data: Record<number, TGoal[]> = {};
  totalCount: number | undefined = undefined;

  getGoalsByPage(page: number) {
    return this.data[page];
  }
  getGoalsCount() {
    return this.totalCount ?? 0;
  }

  set(page: number, ...newData: TGoal[]) {
    if (!this.data[page]) {
      this.data[page] = newData;
    }
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
    this.set(
      page,
      ...this.data[page].map((goal) => {
        if (goal.id === updatedGoal.id) return updatedGoal;
        return goal;
      })
    );
  }
}
const store = new GoalStore();

export default store;
