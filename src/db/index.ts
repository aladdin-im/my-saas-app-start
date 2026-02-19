import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as authSchema from './schema/auth-schema';
import * as schema from './schema/schema';

export type Database = PostgresJsDatabase<typeof schema>;

declare global {
    // eslint-disable-next-line no-var
    var _db: Database | undefined;
}

async function getConnectionString(): Promise<string> {
    try {
        // @ts-ignore cloudflare:workers 仅在 Workers 运行时存在
        const { env } = await import('cloudflare:workers');
        if (env.HYPERDRIVE) {
            return env.HYPERDRIVE.connectionString;
        }
    } catch {
        // not in Workers runtime
    }
    return process.env.DATABASE_URL!;
}

export async function getDb(): Promise<Database> {
    const isProduction = process.env.NODE_ENV === 'production';
    const connectionString = await getConnectionString();

    if (isProduction) {
        // Workers 生产环境：每次请求创建新实例
        // Hyperdrive 在 Cloudflare 侧管理底层连接池，这里无需缓存
        // prepare: false 是 Hyperdrive 的要求（事务池模式不支持 prepared statements）
        const client = postgres(connectionString, { prepare: false });
        return drizzle({ client, schema: { ...schema, ...authSchema } });
    }

    // 开发环境：全局缓存，避免 HMR 热重载导致连接泄漏
    if (!global._db) {
        const client = postgres(connectionString, { max: 1 });
        global._db = drizzle({ client, schema: { ...schema, ...authSchema } });
    }
    return global._db;
}
