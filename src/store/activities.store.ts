import type { ActivityWithGoalCount } from '@/api/activities/queries';
import type { TimeFilter } from '@/types/filters.types';
import type { TActivity } from 'db/config';
import { atom } from 'nanostores';

// ACTIVITIES
const activitiesStore = atom<TActivity[] | undefined>(undefined);
const activitiesWithGoalCount = atom<ActivityWithGoalCount[] | undefined>(undefined);
const activitiesTimeFilter = atom<TimeFilter>('month');

function getCachedActivities() {
  return activitiesStore.get();
}
function getCachedActivityById(id: number) {
  return getCachedActivities()?.find((activity) => activity.id === id);
}
function setCachedActivities(activities: TActivity[]) {
  activitiesStore.set(activities);
}
function addCachedActivity(activity: TActivity) {
  const activities = getCachedActivities();
  activitiesStore.set([activity, ...(activities ?? [])]);
}
function updateCachedActivity(updatedActivity: TActivity) {
  const activities = getCachedActivities();
  activitiesStore.set(
    activities?.map((activity: TActivity) => (activity.id === updatedActivity.id ? updatedActivity : activity))
  );
}

// ACTIVITIES WITH GOAL COUNT
function getCachedActivitiesWithGoalCount() {
  return activitiesWithGoalCount.get();
}
function setCachedActivitiesWithGoalCount(activities: ActivityWithGoalCount[]) {
  activitiesWithGoalCount.set(activities);
}

// TIME FILTER
function getCachedTimeFilter() {
  return activitiesTimeFilter.get();
}
function setCachedTimeFilter(filter: TimeFilter) {
  activitiesTimeFilter.set(filter);
}
function invalidateActivities() {
  activitiesStore.set(undefined);
  activitiesWithGoalCount.set(undefined);
}

const store = {
  addCachedActivity,
  getCachedActivities,
  getCachedActivitiesWithGoalCount,
  getCachedActivityById,
  getCachedTimeFilter,
  invalidateActivities,
  setCachedActivities,
  setCachedActivitiesWithGoalCount,
  setCachedTimeFilter,
  updateCachedActivity
};
export default store;
