import type { TimeFilter } from '@/types/filters.types';
import { Goal, gte } from 'astro:db';

export function getTimeFilterQuery(timeFilter: TimeFilter) {
  const oneDay = 24 * 60 * 60 * 1000;
  switch (timeFilter) {
    case 'week':
      const oneWeekAgo = new Date(new Date().getTime() - 7 * oneDay);
      return gte(Goal.creationDate, oneWeekAgo);
      break;
    case 'month':
      const oneMonthAgo = new Date(new Date().getTime() - 30 * oneDay);
      return gte(Goal.creationDate, oneMonthAgo);
      break;
    case 'all Time':
      return undefined;
      break;
    default:
      return undefined;
      break;
  }
}
