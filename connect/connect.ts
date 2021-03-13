import { ConnectionPool } from 'mssql';
import { config } from './connectProps';
import { sql } from '../sql/SQLQuery';

const pool = new ConnectionPool(config);
const poolConnect = pool.connect();

console.log(sql);
console.log(pool.connected);

pool.on('error', err => {
    console.log(err);
});

async function manyOrNone (sql: any, params: any[] = []) {
    await poolConnect;
    console.log(pool.connected);
    try {
        const request = pool.request();
        console.log(request);
        const result = await request.query(sql, params);
        console.log(result.recordset, result.rowsAffected);
        return result.recordset;
    } catch (err) {
        console.error('SQL error', err)
    }
}

const ttt = manyOrNone(sql)
console.log(JSON.stringify(ttt));

// async function queryExec() {
//     let CurrentRes = await manyOrNone(sql);
//     // console.log(CurrentRes);
//     return CurrentRes;
// }

// async function manyOrNone(sql: any, params: any[] = []) {
//     new ConnectionPool(config).connect().then(pool => {
//         console.log(pool);
//         return new Promise((resolve, reject) => {
//             pool.query(sql, params),
//                 (err: String, result: any[]) => {
//                     if (err) return reject(err);
//                     resolve(result);
//                 };
//         })
//     }
//     )
// };

// let ttt = queryExec();
// //console.log(JSON.stringify(ttt));
