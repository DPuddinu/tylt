import store from '@/store/first-setup.store';
import { Settings, db } from 'astro:db';

export async function setSetupDone(userId: string) {
  try {
    const setupDone = await db
      .insert(Settings)
      .values({
        authorId: userId,
        setupDone: true
      })
      .returning()
      .get();
    store.setCachedSetupDone(setupDone.setupDone);
  } catch (error) {
    throw error;
  }
}
