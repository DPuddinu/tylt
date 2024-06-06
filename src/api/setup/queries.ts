import { Settings, db, eq } from 'astro:db';

export function getSetupDone(userId: string) {
  return db.select().from(Settings).where(eq(Settings.authorId, userId));
}
