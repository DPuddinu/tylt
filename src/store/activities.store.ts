import type { ActivityWithGoalCount } from '@/api/activities/queries';
import type { TActivity } from 'db/config';

class ActivitiesStore {
  data: TActivity[] | undefined = undefined;
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

  updateActivity(updatedActivity: TActivity) {
    this.data = this.data?.map((activity: TActivity) =>
      activity.id === updatedActivity.id ? updatedActivity : activity
    );
  }
  clear() {
    this.data = undefined;
  }
}
const store = new ActivitiesStore();

export default store;
