import { openDatabaseSync } from 'expo-sqlite/next';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import * as schema from './schema';

const expoDB = openDatabaseSync('todos.db');
export const db = drizzle(expoDB, { schema });
