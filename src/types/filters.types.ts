export type GoalFilters = {
  fromDate?: string;
  toDate?: string;
  activity?: number;
  expired?: boolean;
  notExpired?: boolean;
  completed?: boolean;
  notCompleted?: boolean;
};

export type GoalFormParam =
  | 'fromDate'
  | 'toDate'
  | 'activity'
  | 'expired'
  | 'notExpired'
  | 'completed'
  | 'notCompleted';

export const timeFilters = ['week', 'month', 'all Time'] as const;
export type TimeFilter = (typeof timeFilters)[number];
