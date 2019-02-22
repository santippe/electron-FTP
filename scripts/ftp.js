let configFTP = {
    'host': 'localhost',
    'port': 21,
    'user': 'mascioli',
    'password': 'test',
    'startDirectory': '/',
};
let listOFEntries = [];
const { dialog } = require('electron').remote;
function loadFileLocal() {
    let fileSelected = dialog.showOpenDialog();
    for (let a = 0; a < fileSelected.length; a++) {
        dialog.showMessageBox({ 'message': fileSelected[a] });
    }
}
function createNewFile() {
    let localpath = 'filename';
    createWriteStream('./download/' + localpath);
    //cycle for all the filenames
    let arrNames = [];
    for (let arrName in arrNames) {
        let tmpRemotePAth = configFTP.startDirectory + arrName + "csv";
        downloadFromFtp(remote, localpath);
    }
}
function downloadFromFtp(remotepath, localpath) {
    genericFTPCommand((c) => {
        c.on('ready', function () {
            c.get(remotepath, function (err, stream) {
                if (err) {
                    dialog.showMessageBox(`File ${localpath} not downloaded`);
                    console.log(err);
                } else {
                    stream.once('close', function () {
                        c.end();
                        dialog.showMessageBox(`File ${localpath} successfully donwloaded`);
                    });
                    stream.pipe(fs.createWriteStream('./download/' + localpath));
                }
            });
        });
    });
}
function enumerateEntiresFromFtp() {
    let outputarr = [];
    let remotepath = configFTP.startDirectory;
    genericFTPCommand((c) => {
        c.on('ready', function () {
            c.list(remotepath, function (err, listArray) {
                if (err) throw err
                else {
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