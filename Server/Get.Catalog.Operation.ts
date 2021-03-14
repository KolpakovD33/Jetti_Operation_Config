import { connection, manyOrNone } from "../connect/connect";
import { sql } from "../sql/SQLQuery";


connection.on('connect', async function (err) {
    if (err) {
        console.log(err);
    } else {
        let resultArray: any[] = [];
        const ttt: any[] = await manyOrNone(sql)
        for (let row of ttt) {
            resultArray.push({
                Code: row.code,
                Name: row.description,
                doc: JSON.parse(row.doc)
                // Script: JSON.parse(row.doc.script),
                // Parameters: JSON.parse(row.doc.Parameters)
            })
        };
        console.log(resultArray);
        connection.close();
    }
});
