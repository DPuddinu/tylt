import { setCachedSetupDone } from '@/store/first-setup.store';
import { Settings, db } from 'astro:db';

export async function setSetupDone(userId: string) {
  try {
    await db.insert(Settings).values({
      authorId: userId,
      setupDone: true
    });
    setCachedSetupDone();
  } catch (error) {
    throw error;
  }
}
