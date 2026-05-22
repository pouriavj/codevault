// lib/db.ts
import { Client, ClientConfig } from "pg";

// Helper function to parse the DATABASE_URL
function parseDatabaseUrl(url: string): ClientConfig {
  const urlObject = new URL(url);
  const config: ClientConfig = {
    user: urlObject.username,
    password: urlObject.password,
    host: urlObject.hostname,
    port: urlObject.port ? parseInt(urlObject.port, 10) : undefined,
    database: urlObject.pathname.substring(1), // Remove leading '/'
    ssl: urlObject.searchParams.get('sslmode') === 'require' ? { rejectUnauthorized: false } : undefined,
  };
  return config;
}

declare global {
  // Needed so TypeScript knows about the global in dev
  var _pgClient: Client | undefined;
}

let db: Client;

// Determine connection configuration
let connectionConfig: ClientConfig;

if (process.env.DATABASE_URL) {
  console.log("Using DATABASE_URL for PG connection.");
  connectionConfig = parseDatabaseUrl(process.env.DATABASE_URL);
} else if (
  process.env.PG_USER &&
  process.env.PG_HOST &&
  process.env.PG_DATABASE &&
  process.env.PG_PASSWORD
) {
  console.log("Using individual PG_* environment variables for connection.");
  connectionConfig = {
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: Number(process.env.PG_PORT) || 5432, // Default to 5432 if PG_PORT is not set
    // Add SSL handling if you set it via PG_SSLMODE or similar env var
    // ssl: process.env.PG_SSLMODE === 'require' ? { rejectUnauthorized: false } : undefined,
  };
} else {
  // If neither DATABASE_URL nor all PG_* variables are set, throw an error.
  console.error("Database connection details are missing. Set DATABASE_URL or PG_USER, PG_HOST, PG_DATABASE, PG_PASSWORD.");
  // In a real app, you might want to throw an error here to prevent further execution.
  // throw new Error("Database connection details are missing.");
  // For now, we'll proceed but the client might not connect properly.
  connectionConfig = {}; // Empty config will likely cause connection to fail
}

if (!global._pgClient) {
  console.log("Creating new PG client instance.");
  db = new Client(connectionConfig);
  db.connect()
    .then(() => console.log("PG database connected successfully"))
    .catch((err) => console.error("PG database connection error:", err.message)); // Log only message for brevity
  global._pgClient = db;
} else {
  console.log("Reusing existing PG client instance.");
  db = global._pgClient;
}

// Export the client
export { db };
