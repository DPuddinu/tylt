import type { TGoal } from 'db/config';
import { atom } from 'nanostores';

const paginatedData = atom<Record<number, TGoal[]>>({});

const getPaginatedData = () => paginatedData.get();
const getCachedGoalsByPage = (page: number) => getPaginatedData()[page];

function getCachedGoalById(id: number) {
  return Object.values(getPaginatedData())
    .flat()
    .find((goal) => goal.id === id);
}
function setGoals(page: number, ...newData: TGoal[]) {
  paginatedData.set({ ...getPaginatedData(), [page]: newData });
}

function invalidateGoals() {
  paginatedData.set({});
  totalCount.set(undefined);
}

function updateCachedGoal(updatedGoal: TGoal) {
  const data = getPaginatedData();
  const keys = Object.keys(data);
  keys.forEach((key) => {
    const values = data[Number(key)];
    values.forEach((goal) => {
      if (goal.id === updatedGoal.id) {
        setGoals(Number(key), ...values.map((goal) => (goal.id === updatedGoal.id ? updatedGoal : goal)));
      }
    });
  });
}
const totalCount = atom<number | undefined>(undefined);

function getGoalsCount() {
  return totalCount.get() ?? 0;
}

function setGoalsCount(count: number) {
  totalCount.set(count);
}

type GoalsByActivityResponse = {
  id: number;
  count: number;
  goals: TGoal[];
};

const goalsByActivityId = atom<GoalsByActivityResponse | undefined>(undefined);
function getCachedGoalsByActivityId(id: number) {
  const cached = goalsByActivityId.get();
  if (cached?.id === id) return cached;
  return undefined;
}
function setCachedGoalsByActivityId(res: GoalsByActivityResponse) {
  return goalsByActivityId.set(res);
}
function invalidateGoalsByActivityId() {
  goalsByActivityId.set(undefined);
}

export {
  getCachedGoalById,
  getCachedGoalsByActivityId,
  getCachedGoalsByPage,
  getGoalsCount,
  invalidateGoals,
  invalidateGoalsByActivityId,
  setCachedGoalsByActivityId,
  setGoals,
  setGoalsCount,
  updateCachedGoal
};
