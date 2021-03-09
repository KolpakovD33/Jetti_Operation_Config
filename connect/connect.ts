import { ConnectionPool } from 'mssql';
import { ConnectProps } from '../settings';

const config = {
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

let sql: String = `select TOP 2 * from [dbo].[Documents] where [type] = 'Catalog.Operation'`;

console.log(sql);

async function queryExec() {
    let CurrentRes = await manyOrNone(sql);
    // console.log(CurrentRes);
    return CurrentRes;
}

async function manyOrNone(sql: any, params: any[] = []) {
    new ConnectionPool(config).connect().then(pool => {
        //console.dir(pool);
        return new Promise((resolve, reject) => {
            pool.query(sql, params),
                (err: String, result: any[]) => {
                    if (err) return reject(err);
                    resolve(result);
                };
        })
    }
    )
};

let ttt = queryExec();
console.log(JSON.stringify(ttt));
