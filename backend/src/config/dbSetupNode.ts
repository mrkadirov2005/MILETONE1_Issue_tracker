import 'dotenv/config';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dbConfig from './dbConnection.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function setupDatabase(): Promise<void> {
  const schemaPath = join(__dirname, '../db/schema.sql');
  
  try {
    console.log('📂 Reading schema file:', schemaPath);
    
    // Check if schema file exists
    if (!existsSync(schemaPath)) {
      throw new Error(`Schema file not found at ${schemaPath}`);
    }
    
    const schema = readFileSync(schemaPath, 'utf-8');
    console.log(`✓ Schema file loaded (${schema.length} bytes)`);
    
    console.log('🔗 Connecting to database...');
    const client = await dbConfig.connect();
    console.log('✓ Database connection established');
    
    try {
      console.log('🚀 Running schema setup...');
      
      // Split schema into individual statements
      const statements = schema
        .split(';')
        .map(s => s.trim())
        .filter(s => s.length > 0);
      
      console.log(`Found ${statements.length} SQL statements`);
      
      // Execute each statement
      for (const statement of statements) {
        try {
          await client.query(statement);
        } catch (err: any) {
          // Ignore if tables already exist
          if (err.code === '42P07') {
            console.log('⚠️  Table already exists, skipping...');
          } else {
            throw err;
          }
        }
      }
      
      console.log('✅ Database setup completed successfully');
      process.exit(0);
    } catch (err) {
      console.error('❌ Error executing schema:', err);
      throw err;
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('❌ Database setup failed:', err);
    process.exit(1);
  }
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  setupDatabase();
}

export { setupDatabase };
