import { connection, manyOrNone } from "../connect/connect";
import { sql } from "../sql/SQLQuery";


connection.on('connect', async function (err) {
    if (err) {
        console.log(err);
    } else {
        const ttt: any[] = await manyOrNone(sql)
        console.log(ttt);
        connection.close();
    }
});
