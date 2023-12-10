//import { start } from "repl";
var fs = require('fs');
function read(file, callback) {
    fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        }
        callback(data);
    });
}
var output = read('input.txt', function (data) {
    ProcessData(data);
});
function ProcessData(data) {
    var sum = 0;
    var splitLines = data.split('\r\n');
    for (var i = 0; i < splitLines.length; i++) {
        if (i < 995)
            continue;
        console.log(splitLines[i]);
        splitLines[i];
        var numString = "";
        var allNums = ReplaceStringNumbers(splitLines[i]).replace(/\D/g, "");
        console.log(allNums);
        if (allNums) {
            numString += allNums[0];
            numString += allNums[allNums.length - 1];
        }
        console.log(numString);
        var parsedNum = parseInt(numString);
        if (!isNaN(parsedNum)) {
            sum += parsedNum;
            console.log(parsedNum);
        }
    }
    console.log(sum);
}
function ReplaceStringNumbers(subString) {
    var searchNums = [
        ['one', '1'],
        ['two', '2'],
        ['three', '3'],
        ['four', '4'],
        ['five', '5'],
        ['six', '6'],
        ['seven', '7'],
        ['eight', '8'],
        ['nine', '9'],
    ];
    var numIndicies = [];
    var index;
    for (var i = 0; i < searchNums.length; i++) {
        var startIndex = 0;
        while ((index = subString.indexOf(searchNums[i][0], startIndex)) > -1) {
            numIndicies.push({ "position": index, "number": searchNums[i][1] });
            startIndex += searchNums[i][0].length + index;
        }
    }
    console.log(numIndicies);
    numIndicies.sort(function (a, b) { return b.position - a.position; });
    for (var j = 0; j < numIndicies.length; j++) {
        subString = subString.slice(0, numIndicies[j].position) + numIndicies[j].number + subString.slice(numIndicies[j].position);
    }
    return subString;
}
