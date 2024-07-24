import { Settings, db } from 'astro:db';

export async function setSetupDone(userId: string) {
  try {
    await db
      .insert(Settings)
      .values({
        authorId: userId,
        setupDone: true
      })
      .returning()
      .get();
  } catch (error) {
    throw error;
  }
}
