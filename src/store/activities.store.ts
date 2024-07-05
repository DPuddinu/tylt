import type { ActivityWithGoalCount } from '@/api/activities/queries';
import type { TActivity } from 'db/config';
import { atom } from 'nanostores';
export const timeFilters = ['week', 'month', 'all Time'] as const;
export type TimeFilter = (typeof timeFilters)[number];

class ActivitiesStore {
  data: TActivity[] | undefined = undefined;
  timeFilter: TimeFilter = 'month';
  activitiesWithGoalCount: ActivityWithGoalCount[] | undefined = undefined;

  getAll() {
    return this.data;
  }
  getActivityById(id: number) {
    return this.data?.find((activity) => activity.id === id);
  }
  set(newData: TActivity[]) {
    this.data = newData;
  }
  setActivitiesWithGoalCount(newData: ActivityWithGoalCount[]) {
    this.activitiesWithGoalCount = newData;
  }
  getActivitiesWithGoalCount() {
    return this.activitiesWithGoalCount;
  }
  clearActivitiesWithGoalCount() {
    this.activitiesWithGoalCount = undefined;
  }
  addActivity(activity: TActivity) {
    this.data = [activity, ...(this.data ?? [])];
  }
  setTimeFilter(timeFilter: TimeFilter) {
    this.timeFilter = timeFilter;
  }

  getTimeFilter() {
    return this.timeFilter;
  }

  updateActivity(updatedActivity: TActivity) {
    this.data = this.data?.map((activity: TActivity) =>
      activity.id === updatedActivity.id ? updatedActivity : activity
    );
  }
  clear() {
    this.data = undefined;
  }
}
const store = atom(new ActivitiesStore());

export default store;
