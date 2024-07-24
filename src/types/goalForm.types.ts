type GoalInputName = 'title' | 'description' | 'activityId' | 'completionDate' | 'dueDate';
type GoalInputValue = {
  label: string;
  inputName: string;
};
export const formNames: Record<GoalInputName, GoalInputValue> = {
  title: { label: 'Title', inputName: 'title' },
  description: { label: 'Description', inputName: 'description' },
  activityId: { label: 'Activity', inputName: 'activityId' },
  completionDate: { label: 'Completion Date', inputName: 'completionDate' },
  dueDate: { label: 'Due Date', inputName: 'dueDate' }
};
