import { ConnectProps } from '../settings';

export const config = {
    user: ConnectProps.DB_USER_META,
    password: ConnectProps.DB_PASSWORD_META,
    server: ConnectProps.DB_HOST,
    database: ConnectProps.DB_NAME,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 5000,
        connectionTimeout: 5000
    }
};