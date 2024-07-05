import type { ActivityWithGoalCount } from '@/api/activities/queries';
import type { TimeFilter } from '@/types/filters.types';
import type { TActivity } from 'db/config';
import { atom } from 'nanostores';

// ACTIVITIES
const activitiesStore = atom<TActivity[] | undefined>(undefined);

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
function clearCachedActivities() {
  activitiesStore.set(undefined);
}

// ACTIVITIES WITH GOAL COUNT
const activitiesWithGoalCount = atom<ActivityWithGoalCount[] | undefined>(undefined);
function getCachedActivitiesWithGoalCount() {
  return activitiesWithGoalCount.get();
}
function setCachedActivitiesWithGoalCount(activities: ActivityWithGoalCount[]) {
  activitiesWithGoalCount.set(activities);
}
function clearCachedActivitiesWithGoalCount() {
  activitiesWithGoalCount.set(undefined);
}

// TIME FILTER
const activitiesTimeFilter = atom<TimeFilter>('month');
function getCachedTimeFilter() {
  return activitiesTimeFilter.get();
}
function setCachedTimeFilter(filter: TimeFilter) {
  activitiesTimeFilter.set(filter);
}

export {
  addCachedActivity,
  clearCachedActivities,
  clearCachedActivitiesWithGoalCount,
  getCachedActivities,
  getCachedActivitiesWithGoalCount,
  getCachedActivityById,
  getCachedTimeFilter,
  setCachedActivities,
  setCachedActivitiesWithGoalCount,
  setCachedTimeFilter,
  updateCachedActivity
};
