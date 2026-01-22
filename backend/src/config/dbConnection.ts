import 'dotenv/config';
import { Pool } from 'pg';

const dbConfig = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME,
  max: 20, // Maximum connections in the pool
  idleTimeoutMillis: 30000, // Close idle connections after 30s
  connectionTimeoutMillis: 2000, // Connection timeout
});

// Connection pool event handlers
dbConfig.on('error', (err: Error) => {
  console.error('Unexpected error on idle client', err);
});

dbConfig.on('connect', () => {
  console.log('Pool: New client connection established');
});



// Initialize connection pool
dbConfig.query('SELECT NOW()')
  .then(() => console.log('✅ Database pool connected successfully'))
  .catch((err: Error) => console.error('❌ Database pool connection error:', err," \n ❌Please check your .env configuration"));

// Query helper function
export const query = (text: string, params?: unknown[]) => {
  return dbConfig.query(text, params);
};

export default dbConfig;

