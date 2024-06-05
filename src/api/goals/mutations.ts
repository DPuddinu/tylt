import type { ValidationErrors } from '@/types/formValidation';
import { GoalSchema } from '@/types/goal.types';
import { validate } from '@/utils/validation';
import type { User } from '@auth/core/types';
import { Goal, db } from 'astro:db';
import { ZodError } from 'zod';

type Props = {
  formData: FormData;
  user: User;
  onSuccess: () => Response;
  onError: () => Response;
  onValidationError: (errors: ValidationErrors) => void;
};

export async function createGoal({ formData, user, onSuccess, onError, onValidationError }: Props) {
  try {
    const data = validate(formData, GoalSchema);
    const { description, completionDate } = data;
    await db.insert(Goal).values({
      authorId: user.id,
      authorName: user.name!,
      description: description ?? '',
      creationDate: new Date(),
      updateDate: new Date(),
      ...data,
      completed: !!completionDate
    });

    return onSuccess();
  } catch (error) {
    if (error instanceof ZodError) {
      onValidationError(error.flatten().fieldErrors);
    } else return onError();
  }
}
