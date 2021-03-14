import { ColumnValue, Connection, Request, RequestError, TYPES } from 'tedious';
import { sql } from '../sql/SQLQuery';
import { config } from './connectProps';
//import async = require('async');

export const connection = new Connection(config);

export function manyOrNone<T>(sql: string, _params: any[] = []): Promise<T[]> {
    return (new Promise<T[]>(async (resolve, reject) => {
        try {
            const request = new Request(sql, function (error: RequestError, rowCount: number, rows: ColumnValue[][]) {
                if (!rowCount) { console.log(rowCount + ' row(s) returned'); return reject(error) };
                const result = rows.map(row => {
                    const data = {} as T;
                    row.forEach(col => data[col.metadata.colName] = col.value);
                    return data;
                })
                return resolve(result);
            }
            );
            //this.setParams(params, request)
            connection.execSql(request);
        } catch (error) { return reject(error); }
    }));
};


