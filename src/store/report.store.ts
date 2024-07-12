import { atom } from 'nanostores';

export type GoalsReport = {
  completedCount: number;
  completionRate: number;
  lastWeekGoalsCount: number;
  totalGoalsCount: number;
  deltaCount: number;
};

const reportStore = atom<GoalsReport | undefined>(undefined);
function getCachedReport() {
  return reportStore.get();
}
function setCachedReport(report: GoalsReport) {
  reportStore.set(report);
}
function invalidateReport() {
  reportStore.set(undefined);
}
const store = { invalidateReport, getCachedReport, setCachedReport };
export default store;
