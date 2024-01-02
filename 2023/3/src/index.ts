import { arrayBuffer } from "stream/consumers";

class symbolLocation{
    constructor(public line: number, public index: number, public symbolString: string){}
}

class numberLocation{
    constructor(public line: number, public startIndex: number, public numString: string, public counted: boolean){}
}

var fs = require('fs')
var symbols = new Array();
var numbers = new Array();
var symbolsInUse = "";

function read(file: string, callback: CallableFunction){
    fs.readFile(file, 'utf8', function(err: any, data: string){
        if(err){
            console.log(err);
        }
        callback(data);
    })
}

var output = read('C:\\users\\william\\documents\\adventofcode\\2023\\3\\example.txt', function(data: string){
    console.log(ProcessData(data));
});

function ProcessData(data: string){
    let intCountString = data.replace(/\D/g, "");
    console.log(intCountString.length);
    symbolsInUse = RemoveDuplicateSymbols(data.replace(/[0-9.\r\n]/g, ''));
    var splitLines = data.split('\r\n');
    let gameSum = 0;
    for(let i = 0; i < splitLines.length; i++){
        GetDataFromLine(splitLines[i], i);
    }
    DisplayMaxNum();
    return GetGearSum();
}

function GetDataFromLine(data: string, line: number){
    for(let i = 0; i<data.length; i++){
        var numString = "";
        if(symbolsInUse.includes(data[i])){
            symbols.push(new symbolLocation(line, i, data[i]));
        }
        else if(data[i] <= '9' && data[i] >= '0'){
            let index = i;
            while(data[i] <= '9' && data[i] >= '0'){
                numString += data[i];
                i++;
                if(i > data.length) break;
            }
            numbers.push(new numberLocation(line, index, numString, false));
            i--;
        }
    }
}

function GetGameSum(){
    let gameSum = 0
    for(let i = 0; i< numbers.length; i++){
        if(numbers[i].counted) continue;
        for(let j = 0; j<symbols.length; j++){
            if(symbols[j].line <= numbers[i].line+1 && symbols[j].line >= numbers[i].line-1){
                let startPos = numbers[i].startIndex - 1;
                let endPos = numbers[i].startIndex + numbers[i].numString.length + 1;
                if(symbols[j].index >= startPos && symbols[j].index <= endPos){
                    let num = parseInt(numbers[i].numString);
                    if(!isNaN(num)){
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

function GetGearSum(){
    let gearSum = 0;
    for(let i = 0; i<symbols.length; i++){
        let symbol = symbols[i];
        if(symbol.symbolString != "*") continue;
        let adjacentNumbers = new Array();
        for(let j = 0; j<numbers.length; j++){
            let number = numbers[j];
            if(number.line <= symbol.line+1 && number.line >= symbol.line -1){
                let startPos = number.startIndex -1;
                let endPos = number.startIndex + number.numString.length + 1;
                if(symbol.index > startPos && symbol.index <= endPos){
                    adjacentNumbers.push(number.numString);
                }
            }
        }
        if(adjacentNumbers.length == 2){
            let gearRatio = 0;
            let firstGearNum = parseInt(adjacentNumbers[0]);
            let secondGearNum = parseInt(adjacentNumbers[1]);
            if(!(isNaN(firstGearNum) || isNaN(secondGearNum))){
                gearRatio = firstGearNum * secondGearNum;
                gearSum += gearRatio;
            }
        }
    }
    return gearSum;
}

function RemoveDuplicateSymbols( symbolString: string){
    let cleanSymbolString = "";
    for(let i = 0; i < symbolString.length; i++){
        if(symbolString.indexOf(symbolString[i]) === i){
            cleanSymbolString += symbolString[i];
        }
    }
    return cleanSymbolString;
}

function DisplayMaxNum(){
    let maxNum = 0;
    for(let i = 0; i < numbers.length; i++){
        let num = parseInt(numbers[i].numString);
        if(!isNaN(num)){
            maxNum += num;
        }
    }
    console.log(maxNum);
}