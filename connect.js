var sql = require('mssql');

sql.connect("mssql://PowerUser:13Cb1KdpiHxK@sql.jetti-app.com/sm").then(function () {
  // Query

  // new sql.Request().query('select * from mytable').then(function(recordset) {
  // 	console.dir(recordset);
  // }).catch(function(err) {
  // 	// ... query error checks
  // });

  //   // Stored Procedure

  // new sql.Request()
  // .input('input_parameter', sql.Int, value)
  //   .output('output_parameter', sql.VarChar(50))
  // .execute('procedure_name').then(function(recordsets) {
  // 	console.dir(recordsets);
  // }).catch(function(err) {
  // 	// ... execute error checks
  // });

  // ES6 Tagged template literals (experimental)

  sql.query`SELECT TOP 20 
              pc.code as "code"
            , pc.description 
            FROM [dbo].[Catalog.Company.v] as pc with (noexpand)`.then(function (recordset) {
    console.dir(recordset);
  }).catch(function (err) {
    // ... query error checks
  });
}).catch(function (err) {
  // ... connect error checks
});