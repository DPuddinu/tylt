type Report = {
  completedCount: number;
  completionRate: number;
  lastWeekGoalsCount: number;
  totalGoalsCount: number;
  deltaCount: number;
};
class ReportStore {
  data: Report | undefined = undefined;

  get() {
    return this.data;
  }

  set(newData: Report) {
    this.data = newData;
  }

  clear() {
    this.data = undefined;
  }
}
const store = new ReportStore();

export default store;
