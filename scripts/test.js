let fs = require('fs');
function loadSection(sectionName){
    let content = fs.readFileSync(sectionName);        
    return content;
}
