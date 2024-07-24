import { Settings, db, eq } from 'astro:db';

export async function getSetupDone(userId: string) {
  try {
    const setupDone = await db.select().from(Settings).where(eq(Settings.authorId, userId)).get();
    return setupDone?.setupDone;
  } catch (error) {
    throw error;
  }
}
