export type GoalFilters = {
  fromDate: string | undefined;
  toDate: string | undefined;
  category: number | undefined;
  expired: boolean | undefined;
  notExpired: boolean | undefined;
  notCompleted: boolean | undefined;
  completed: boolean | undefined;
};
