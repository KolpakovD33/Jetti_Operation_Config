export const sql: string = `select TOP 10 * from [dbo].[Documents] where [type] = 'Catalog.Operation' and [deleted] = 0 and [posted] = 1`;