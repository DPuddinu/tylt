import type { CreateActivityPayload } from '@/api/activities/mutations';
import type { GoalInsertPayload } from '@/types/goal.types';

class FirstSetupStore {
  steps: [
    { createActivityPayload: CreateActivityPayload } | undefined,
    { goalInsertPayload: GoalInsertPayload } | undefined
  ] = [undefined, undefined];

  setStep1(createActivityPayload: CreateActivityPayload) {
    this.steps[0] = { createActivityPayload };
  }
  setStep2(goalInsertPayload: GoalInsertPayload) {
    this.steps[1] = { goalInsertPayload };
  }

  getStep1() {
    return this.steps[0];
  }
  getStep2() {
    return this.steps[1];
  }
  stepsCompleted() {
    return this.steps.every((step) => step !== undefined);
  }
}
const firstSetupStore = new FirstSetupStore();
export default firstSetupStore;
