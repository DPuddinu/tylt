import type { CreateActivityPayload } from '@/api/activities/mutations';
import type { GoalInsertPayload } from '@/types/goal.types';
import { atom } from 'nanostores';

type TFirstSetupStore = {
  steps: [
    { createActivityPayload: CreateActivityPayload } | undefined,
    { goalInsertPayload: GoalInsertPayload } | undefined
  ];
};
const firstSetupStore = atom<TFirstSetupStore>({
  steps: [undefined, undefined]
});
const setupDone = atom<boolean | undefined>(undefined);

function setStep1(createActivityPayload: CreateActivityPayload) {
  firstSetupStore.set({
    steps: [{ createActivityPayload }, firstSetupStore.get().steps[1]]
  });
}
function setStep2(goalInsertPayload: GoalInsertPayload) {
  firstSetupStore.set({
    steps: [firstSetupStore.get().steps[0], { goalInsertPayload }]
  });
}

function getStep1() {
  return firstSetupStore.get().steps[0];
}
function getStep2() {
  return firstSetupStore.get().steps[1];
}
function stepsCompleted() {
  return firstSetupStore.get().steps.every((step) => step !== undefined);
}
function emptySteps() {
  return firstSetupStore.get().steps.every((step) => step === undefined);
}

function setCachedSetupDone(done: boolean) {
  setupDone.set(done);
}

function getCachedSetupDone() {
  return setupDone.get();
}
const store = {
  emptySteps,
  firstSetupStore,
  getCachedSetupDone,
  getStep1,
  getStep2,
  setCachedSetupDone,
  setStep1,
  setStep2,
  stepsCompleted
};
export default store;
