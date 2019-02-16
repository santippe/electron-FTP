let configFTP = {
    'host': 'peshop.servehttp.com',
    'user': 'ftppeshop',
    'password': 'porcodio'
};
let listOFEntries = [];
const { dialog } = require('electron').remote;
function loadFileLocal() {    
    let fileSelected = dialog.showOpenDialog();
    for (let a = 0; a < fileSelected.length; a++) {
        dialog.showMessageBox({ 'message': fileSelected[a] });
    }
}
function downloadFromFtp(remotepath, localpath) {
    genericFTPCommand((c) => {
        c.on('ready', function () {
            c.get(remote, function (err, stream) {
                if (err) throw err;
                stream.once('close', function () { c.end(); });
                stream.pipe(fs.createWriteStream(__dir__ + '/download/' + localpath));
            });
        });
    });        
}
function enumerateEntiresFromFtp(remotepath) {
    let outputarr = [];
    genericFTPCommand((c) => {
        c.on('ready', function () {
            c.list(remotepath, function (err, listArray) {
                if (err) throw err
                else{
                    listOFEntries = listArray;
                    dialog.showMessageBox({ 'message': 'Connection OK' });
                }
                //enumerate list
                // listArray.forEach(element => {
                //     console.log(element.name);
                // });                    
            });
        });
    });        
    return outputarr;
}
function genericFTPCommand(actionToDo) {
    const ftpClient = require('ftp');
    let c = new ftpClient();    
    actionToDo(c);
    c.connect(configFTP);
}