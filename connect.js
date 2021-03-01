import { connect, query } from 'mssql'

async () => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await connect('mssql://username:password@localhost/database')
        const result = await query`select * from mytable where id = ${value}`
        console.dir(result)
    } catch (err) {
        // ... error checks
    }
}