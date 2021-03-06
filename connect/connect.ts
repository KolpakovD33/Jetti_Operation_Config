import { ConnectionPool } from 'mssql';
import { rejects } from 'node:assert';
import { resolve } from 'node:path';
import { ConnectProps } from '../settings';

const config = {
    user: ConnectProps.DB_USER_META,
    password: ConnectProps.DB_PASSWORD_META,
    server: ConnectProps.DB_HOST,
    database: ConnectProps.DB_NAME,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 3000,
        connectionTimeout: 3000
    }
};

let sql: String = `select TOP 2 * from [dbo].[Documents] where [type] = 'Catalog.Operation'`;

console.log(sql);

async function queryExec() {
    let CurrentRes = await manyOrNone(sql, params);
    console.log(CurrentRes);
    return CurrentRes;
}

function manyOrNone(sql: any, params: any[] = []) {
    new ConnectionPool(config).connect().then(pool => {
        return new Promise((resolve, reject) => {
            pool.query(sql, params),
                (err, result: any[]) => {
                    if (err) return reject(err);
                    resolve(result)
                };
        })
    }
    )
};

let ttt = queryExec(sql);
console.log(ttt);
