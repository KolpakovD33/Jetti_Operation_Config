import { ConnectProps } from '../settings';
import { ConnectionConfig } from 'tedious'
import { config as dotenv } from 'dotenv'

dotenv()
export type ConnectionConfigAndPool = ConnectionConfig & { pool: { min: number, max: number, idleTimeoutMillis: number } };

export const config = {
    server: ConnectProps.DB_HOST,
    authentication: {
        type: 'default',
        options: {
            userName: ConnectProps.DB_USER_META,
            password: ConnectProps.DB_PASSWORD_META
        }
    },
    options: {
        encrypt: false,
        database: ConnectProps.DB_NAME,
        port: ConnectProps.DB_PORT,
        requestTimeout: 5 * 60 * 1000,
        rowCollectionOnRequestCompletion: true,
        validateBulkLoadParameters: true
    },
    pool: {
        min: 0,
        max: 1000,
        idleTimeoutMillis: 20 * 60 * 1000
    }
};

    // pool: {
    //     max: 10,
    //     min: 0,
    //     idleTimeoutMillis: 5000,
    //     connectionTimeout: 5000
    // }
