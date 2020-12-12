import connect, { Database } from 'better-sqlite3'

export const database: Database = connect('./src/Persistence/database/db.sqlite')
