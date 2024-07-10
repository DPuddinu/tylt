import { atom } from 'nanostores';

type Report = {
  completedCount: number;
  completionRate: number;
  lastWeekGoalsCount: number;
  totalGoalsCount: number;
  deltaCount: number;
};

const reportStore = atom<Report | undefined>(undefined);
function getCachedReport() {
  return reportStore.get();
}
function setCachedReport(report: Report) {
  reportStore.set(report);
}
function clearCachedReport() {
  reportStore.set(undefined);
}
const store = { clearCachedReport, getCachedReport, setCachedReport };
export default store;
