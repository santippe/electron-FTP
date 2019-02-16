const sql = require('mssql');
const config = {
    server: 'localhost\\SQLEXPRESS', // You can use 'localhost\\instance' to connect to named instance
    database: 'dbtest',
    options: {
        // encrypt: true, // Use this if you're on Windows Azure
        trustedConnection: true
    }
};
exports.doMssqlStuff = () => {
    sql.connect(config, err => {
        if (err != null)
            console.log(err);
        else
            new sql.Request().query('select 15 as number', (err2, result) => {
                if (err2 == null)
                    console.dir(result.recordset[0]);
                else
                    console.log(err2);
            });
    });
}

sql.on('error', err => {
    // ... error handler
})