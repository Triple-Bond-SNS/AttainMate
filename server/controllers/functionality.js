const XLSX = require("xlsx");

function readFileToJson(f_name) {
    var WB = XLSX.readFile(f_name);
    var worksheet = WB.SheetNames[0];
    var WS = WB.Sheets[worksheet];
    var data = XLSX.utils.sheet_to_json(WS);
    return data;
}

module.exports = readFileToJson;