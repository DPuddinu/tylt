export function validateGoal(formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const completed = formData.get('completed') === 'on';
  const categoryId = Number(formData.get('category'));
  const completionDate = formData.get('completion-date') as string;
  const dueDate = formData.get('due-date') as string;

  if (!title || !description || !categoryId) throw new Error('Invalid inputs');
  return {
    title,
    description,
    completed,
    categoryId,
    completionDate: completionDate ? new Date(completionDate) : undefined,
    dueDate: dueDate ? new Date(dueDate) : undefined
  };
}
