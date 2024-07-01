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
