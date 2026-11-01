import mongoose from 'mongoose';

interface DBConnectionStatus {
  isConnected: boolean;
  databaseName?: string;
  host?: string;
  error?: string;
}

export const dbStatus: DBConnectionStatus = {
  isConnected: false,
};

/**
 * Connect to MongoDB using Mongoose.
 * Supports local MongoDB instances as well as cloud-hosted MongoDB Atlas.
 */
export async function connectDB(): Promise<DBConnectionStatus> {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.includes('MY_MONGODB_URI') || uri.trim() === '') {
    dbStatus.isConnected = false;
    dbStatus.error = 'MONGODB_URI is not configured in .env. Running in ephemeral in-memory demo mode.';
    console.warn(`[CareercraftAI DB] ${dbStatus.error}`);
    return dbStatus;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });

    dbStatus.isConnected = true;
    dbStatus.host = conn.connection.host;
    dbStatus.databaseName = conn.connection.name;
    dbStatus.error = undefined;

    console.log(`[CareercraftAI DB] Connected successfully to MongoDB: ${conn.connection.host}/${conn.connection.name}`);
    return dbStatus;
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    dbStatus.isConnected = false;
    dbStatus.error = `Failed to connect to MongoDB: ${errorMsg}`;
    console.error(`[CareercraftAI DB Error] ${dbStatus.error}`);
    return dbStatus;
  }
}

/**
 * Graceful database disconnect
 */
export async function disconnectDB(): Promise<void> {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
    dbStatus.isConnected = false;
    console.log('[CareercraftAI DB] MongoDB connection disconnected.');
  }
}
