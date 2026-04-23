// lib/db.ts
import { Client } from 'pg';

const connectionConfig = {
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: Number(process.env.PG_PORT) || 5432,
};

declare global {
  // Needed so TypeScript knows about the global in dev
  // eslint-disable-next-line no-var
  var _pgClient: Client | undefined;
}

let db: Client;

if (!global._pgClient) {
  db = new Client(connectionConfig);
  db
    .connect()
    .then(() => console.log('DB connected'))
    .catch((err) => console.error('DB connection error:', err));
  global._pgClient = db;
} else {
  db = global._pgClient;
}

export { db };
