const {dialog} = require('electron').remote;
exports.prova = {'test':1};
//callSQLServer();
exports.callSQLServer = () => {
    const sql = require("msnodesqlv8");
 
    const connectionString = "server=.\\SQLEXPRESS;Database=Master;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
    const query = "SELECT name FROM sys.databases";
     
    sql.query(connectionString, query, (err, rows) => {
        console.log(rows);
        console.log(err);
    });
}