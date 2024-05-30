import { column, defineDb, defineTable } from 'astro:db';

const Category = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text(),
    authorId: column.text()
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
    categoryId: column.number({ references: () => Category.columns.id }),
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
    completed: column.boolean()
  }
});

export default defineDb({
  tables: { Category, Goal, Settings }
});

export type TGoal = {
  id: number;
  authorId: string;
  authorName: string;
  categoryId: number;
  title: string;
  description: string;
  creationDate: Date;
  updateDate: Date;
  completionDate: Date | null;
  dueDate: Date | null;
  completed: boolean;
};

export type TCategory = {
  id: number;
  name: string;
  authorId: string;
};
