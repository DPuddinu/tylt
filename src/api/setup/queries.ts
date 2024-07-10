import store from '@/store/first-setup.store';
import { Settings, db, eq } from 'astro:db';

export async function getSetupDone(userId: string) {
  const cachedSetupDone = store.getCachedSetupDone();
  if (cachedSetupDone !== undefined) return cachedSetupDone;
  try {
    const setupDone = await db.select().from(Settings).where(eq(Settings.authorId, userId)).get();
    store.setCachedSetupDone(setupDone?.setupDone ?? false);
    return setupDone?.setupDone;
  } catch (error) {
    throw error;
  }
}
