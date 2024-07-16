import { column, defineDb, defineTable } from 'astro:db';

const Activity = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text(),
    authorId: column.text(),
    color: column.text(),
    icon: column.text()
  }
});
const Settings = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    authorId: column.text(),
    setupDone: column.boolean()
  }
});

const Goal = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    authorId: column.text(),
    authorName: column.text(),
    activityId: column.number({ references: () => Activity.columns.id }),
    title: column.text(),
    description: column.text(),
    creationDate: column.date(),
    updateDate: column.date(),
    completionDate: column.date({
      optional: true
    }),
    dueDate: column.date({
      optional: true
    }),
    completed: column.boolean({
      default: false
    })
  }
});

export default defineDb({
  tables: { Activity, Goal, Settings }
});

export type TGoal = {
  id: number;
  authorId: string;
  authorName: string;
  activityId: number;
  title: string;
  description: string;
  creationDate: Date;
  updateDate: Date;
  completionDate: Date | null;
  dueDate: Date | null;
  completed: boolean;
};

export type TActivity = {
  id: number;
  name: string;
  authorId: string;
  color: string;
  icon?: string;
};
