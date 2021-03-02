const { Connection, Request } = require("tedious");

// const DB_HOST = process.env.DB_HOST;
// const DB_NAME = process.env.DB_NAME;
// const DB_USER_META = process.env.DB_USER_META;
// const DB_PASSWORD_META = process.env.DB_PASSWORD_META;
// Create connection to database
const config = {
  authentication: {
    options: {
      userName: "PowerUser", // update me
      password: "13Cb1KdpiHxK" // update me
    },
    type: "default"
  },
  server: "sql.jetti-app.com", // update me
  options: {
    database: "sm", //update me
    encrypt: true
  }
};

const connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on("connect", err => {
  if (err) {
    console.error(err.message);
  } else {
    queryDatabase();
  }
});

function queryDatabase() {
  console.log("Reading rows from the Table...");

  // Read all rows from table
  const request = new Request(
    `SELECT TOP 20 pc.code as "code"
     FROM [dbo].[Catalog.Company] pc
     `,
    (err, rowCount) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log(`${rowCount} row(s) returned`);
      }
    }
  );

  request.on("row", columns => {
    columns.forEach(column => {
      console.log("%s\t%s", column.metadata.colName, column.value);
    });
  });

  connection.execSql(request);
}