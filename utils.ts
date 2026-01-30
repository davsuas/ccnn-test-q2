
import { Question } from './types';

/**
 * Shuffles an array using Fisher-Yates algorithm.
 */
export const shuffleArray = <T,>(array: T[]): T[] => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

/**
 * Selects 30 random questions ensuring they haven't been used in the current session set.
 */
export const getNextBatch = (
  masterBank: Question[], 
  usedIds: number[], 
  limit: number = 30
): { batch: Question[]; updatedUsedIds: number[] } => {
  // Filter questions not in usedIds
  let available = masterBank.filter(q => !usedIds.includes(q.id));
  
  // If we don't have enough new ones, we reset the used list but exclude the ones just used
  if (available.length < limit) {
    usedIds = []; 
    available = masterBank;
  }
  
  const shuffled = shuffleArray(available);
  const selected = shuffled.slice(0, limit);
  const selectedIds = selected.map(q => q.id);
  
  return {
    batch: selected,
    updatedUsedIds: [...usedIds, ...selectedIds]
  };
};
