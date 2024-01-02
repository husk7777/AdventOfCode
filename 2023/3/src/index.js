"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var symbolLocation = /** @class */ (function () {
    function symbolLocation(line, index, symbolString) {
        this.line = line;
        this.index = index;
        this.symbolString = symbolString;
    }
    return symbolLocation;
}());
var numberLocation = /** @class */ (function () {
    function numberLocation(line, startIndex, numString, counted) {
        this.line = line;
        this.startIndex = startIndex;
        this.numString = numString;
        this.counted = counted;
    }
    return numberLocation;
}());
var fs = require('fs');
var symbols = new Array();
var numbers = new Array();
var symbolsInUse = "";
function read(file, callback) {
    fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        }
        callback(data);
    });
}
var output = read('C:\\users\\william\\documents\\adventofcode\\2023\\3\\input.txt', function (data) {
    console.log(ProcessData(data));
});
function ProcessData(data) {
    var intCountString = data.replace(/\D/g, "");
    console.log(intCountString.length);
    symbolsInUse = RemoveDuplicateSymbols(data.replace(/[0-9.\r\n]/g, ''));
    var splitLines = data.split('\r\n');
    var gameSum = 0;
    for (var i = 0; i < splitLines.length; i++) {
        GetDataFromLine(splitLines[i], i);
    }
    DisplayMaxNum();
    return GetGearSum();
}
function GetDataFromLine(data, line) {
    for (var i = 0; i < data.length; i++) {
        var numString = "";
        if (symbolsInUse.includes(data[i])) {
            symbols.push(new symbolLocation(line, i, data[i]));
        }
        else if (data[i] <= '9' && data[i] >= '0') {
            var index = i;
            while (data[i] <= '9' && data[i] >= '0') {
                numString += data[i];
                i++;
                if (i > data.length)
                    break;
            }
            numbers.push(new numberLocation(line, index, numString, false));
            i--;
        }
    }
}
function GetGameSum() {
    var gameSum = 0;
    for (var i = 0; i < numbers.length; i++) {
        if (numbers[i].counted)
            continue;
        for (var j = 0; j < symbols.length; j++) {
            if (symbols[j].line <= numbers[i].line + 1 && symbols[j].line >= numbers[i].line - 1) {
                var startPos = numbers[i].startIndex - 1;
                var endPos = numbers[i].startIndex + numbers[i].numString.length + 1;
                if (symbols[j].index >= startPos && symbols[j].index <= endPos) {
                    var num = parseInt(numbers[i].numString);
                    if (!isNaN(num)) {
                        gameSum += num;
                        numbers[i].counted = true;
                        break;
                    }
                }
            }
        }
    }
    return gameSum;
}
function GetGearSum() {
    var gearSum = 0;
    for (var i = 0; i < symbols.length; i++) {
        var symbol = symbols[i];
        if (symbol.symbolString != "*")
            continue;
        var adjacentNumbers = new Array();
        for (var j = 0; j < numbers.length; j++) {
            var number = numbers[j];
            if (number.line <= symbol.line + 1 && number.line >= symbol.line - 1) {
                var startPos = number.startIndex - 1;
                var endPos = number.startIndex + number.numString.length;
                if (symbol.index >= startPos && symbol.index <= endPos) {
                    adjacentNumbers.push(number.numString);
                }
            }
        }
        if (adjacentNumbers.length == 2) {
            var gearRatio = 0;
            var firstGearNum = parseInt(adjacentNumbers[0]);
            var secondGearNum = parseInt(adjacentNumbers[1]);
            if (!(isNaN(firstGearNum) || isNaN(secondGearNum))) {
                gearRatio = firstGearNum * secondGearNum;
                gearSum += gearRatio;
            }
        }
    }
    return gearSum;
}
function RemoveDuplicateSymbols(symbolString) {
    var cleanSymbolString = "";
    for (var i = 0; i < symbolString.length; i++) {
        if (symbolString.indexOf(symbolString[i]) === i) {
            cleanSymbolString += symbolString[i];
        }
    }
    return cleanSymbolString;
}
function DisplayMaxNum() {
    var maxNum = 0;
    for (var i = 0; i < numbers.length; i++) {
        var num = parseInt(numbers[i].numString);
        if (!isNaN(num)) {
            maxNum += num;
        }
    }
    console.log(maxNum);
}
