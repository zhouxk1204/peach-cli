import { createConsola } from 'consola';

// console sigleton instance
export const consolaInstance = createConsola({
  formatOptions: {
    date: false,
  },
});