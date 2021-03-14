import { Connection, Request, TYPES } from 'tedious';
import { sql } from '../sql/SQLQuery';
import { config } from './connectProps';
import async from 'async'

const connection = new Connection(config);

connection.on('connect', function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected...');
    }
});

function Start(callback) {
    console.log('Starting...');
    callback(null, 'Jake', 'United States');
}

function Read(callback) {
    console.log('Reading rows from the Table...');

    // Read all rows from table
    const request = new Request(sql,
        function (err, rowCount, rows) {
            if (err) {
                callback(err);
            } else {
                console.log(rowCount + ' row(s) returned');
                callback(null);
            }
        });

    // Print the rows read
    var result = "";
    request.on('row', function (columns) {
        columns.forEach(function (column) {
            if (column.value === null) {
                console.log('NULL');
            } else {
                result += column.metadata + column.value + " ";
            }
        });
        console.log(result);
        result = "";
    });

    // Execute SQL statement
    connection.execSql(request);
}

// Attempt to connect and execute queries if connection goes through
connection.on('connect', function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected');

    // Execute all functions in the array serially
    async.waterfall([
        Read
    ])
  }
});

