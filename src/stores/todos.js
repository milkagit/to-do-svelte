// <!-- stores.js -->
import { writable } from 'svelte/store';

// Initial default state
/**
 * @type {any[] | undefined}
 */
const defaultTodos = [];

// Create a writable store
export const todos = writable(defaultTodos);