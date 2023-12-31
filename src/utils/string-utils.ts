import { OrderByFields } from 'app/services/cloud_database/BaseDatabase';
import { OrderByDirection } from 'firebase/firestore';

// convert to state to string
export const toStateString = (title: string, states: Array<string>): string => {
  if (states.length === 0) return 'No States';
  return title + ': {' + states.join(',') + '}';
};
// merge string
export const toMergeString = (states: string[]): string => {
  let string = '';
  states.forEach((state, index) => {
    string += `Q${index}` + ': {' + state + '} ';
  });

  return string;
};

// validate query
export const validateSortByQuery = (query: string | null): OrderByDirection => {
  switch (query) {
    case 'desc':
    case 'asc':
      return query;
    default:
      return 'desc';
  }
};
// validate order by
export const validateOrderByQuery = (query: string | null): OrderByFields => {
  switch (query) {
    case 'title':
    case 'created_at':
    case 'updated_at':
      return query;
    default:
      return 'created_at';
  }
};
