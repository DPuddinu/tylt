import { getCachedSetupDone, setCachedSetupDone } from '@/store/first-setup.store';
import { Settings, db, eq } from 'astro:db';

export async function getSetupDone(userId: string) {
  const cachedSetupDone = getCachedSetupDone();
  if (cachedSetupDone) return cachedSetupDone;
  try {
    const setupDone = await db.select().from(Settings).where(eq(Settings.authorId, userId)).get();
    if (setupDone) {
      setCachedSetupDone();
    }
    return setupDone;
  } catch (error) {
    throw error;
  }
}
