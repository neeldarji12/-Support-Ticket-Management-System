import initialUsers from '../data/users.json';
import initialTickets from '../data/tickets.json';
import initialComments from '../data/comments.json';
import initialHistory from '../data/history.json';

const STORAGE_KEYS = {
  USERS: 'app_tickets_users',
  TICKETS: 'app_tickets_list',
  COMMENTS: 'app_tickets_comments',
  HISTORY: 'app_tickets_history',
  AUTH: 'app_tickets_auth_user',
};

export const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(initialUsers));
  }
  if (!localStorage.getItem(STORAGE_KEYS.TICKETS)) {
    localStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(initialTickets));
  }
  if (!localStorage.getItem(STORAGE_KEYS.COMMENTS)) {
    localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(initialComments));
  }
  if (!localStorage.getItem(STORAGE_KEYS.HISTORY)) {
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(initialHistory));
  }
};

export const getStoredItem = (key, fallback = []) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (err) {
    console.error(`Error reading ${key} from storage:`, err);
    return fallback;
  }
};

export const setStoredItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error writing ${key} to storage:`, err);
  }
};

export { STORAGE_KEYS };
