import {data} from '../utils/data';
export const FETCH_DATA = 'FETCH_DATA';

export function fetchData() {
  return {
    type: FETCH_DATA,
    payload: data
  }
}
