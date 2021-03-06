// import { sqlClient } from "./default.pool";


// async function Main () {
//     let res = await sqlClient.manyOrNone(`select TOP 1 * from [dbo].[Documents]`);
//     console.log(res);
//     return res;
// }

// Main();

import { ConnectionPool } from 'mssql';
import { ConnectProps } from './settings';

const config = {
    user: ConnectProps.DB_USER_META,
    password: ConnectProps.DB_PASSWORD_META,
    server: ConnectProps.DB_HOST,
    database: ConnectProps.DB_NAME,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};

console.log(config);

new ConnectionPool(config).connect().then(pool => {
    return pool.query`select TOP 1 * from [dbo].[Documents]`
}).then(result => {
    console.log(result)
}).catch(err => {
    // ... error checks
})