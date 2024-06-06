export type GoalFilters = {
  fromDate?: string;
  toDate?: string;
  category?: number;
  expired?: boolean;
  notExpired?: boolean;
  completed?: boolean;
  notCompleted?: boolean;
};

export type GoalFormParam =
  | 'fromDate'
  | 'toDate'
  | 'category'
  | 'expired'
  | 'notExpired'
  | 'completed'
  | 'notCompleted';
