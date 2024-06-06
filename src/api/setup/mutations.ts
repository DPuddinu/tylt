import { Settings, db } from 'astro:db';

export function setSetupDone(userId: string) {
  return db.insert(Settings).values({
    authorId: userId,
    setupDone: true
  });
}
