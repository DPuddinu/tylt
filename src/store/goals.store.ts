import type { TGoal } from 'db/config';

type PaginatedGoals = Record<number, TGoal[]>;

let storedGoals: PaginatedGoals = {};

export function getCachedGoals() {
  return storedGoals;
}

export function saveGoals(page: number, ...goal: TGoal[]) {
  if (!storedGoals[page]) storedGoals[page] = goal;
}

export function invalidateGoals() {
  storedGoals = {};
}
