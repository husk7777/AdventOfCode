//import { start } from "repl";

var fs = require('fs')

function read(file: string, callback: CallableFunction){
    fs.readFile(file, 'utf8', function(err: any, data: string){
        if(err){
            console.log(err);
        }
        callback(data);
    })
}

var output = read('input.txt', function(data: string){
    ProcessData(data);
});


function ProcessData(data: string){
    var sum = 0;
    data = data.replaceAll("one", "o1e");
    data = data.replaceAll("two", "t2o");
    data = data.replaceAll("three", "th3ee");
    data = data.replaceAll("four", "f4ur");
    data = data.replaceAll("five", "f5ve");
    data = data.replaceAll("six", "s6x");
    data = data.replaceAll("seven", "se7en");
    data = data.replaceAll("eight", "ei8ht");
    data = data.replaceAll("nine", "n9ne");
    var splitLines = data.split('\r\n')
    for(let i = 0; i < splitLines.length; i++){
        console.log(splitLines[i]);
        splitLines[i]
        let numString = "";
        let allNums = splitLines[i].replace(/\D/g, "");
        console.log(allNums);
        if(allNums)
        {
            numString += allNums[0];
            numString += allNums[allNums.length-1];
        }
        let parsedNum = parseInt(numString);
        if(!isNaN(parsedNum)){
            sum += parsedNum;
            console.log(parsedNum);
        } 
    }
    console.log(sum);
}

function ReplaceStringNumbers(subString: string){
    let searchNums = 
    [
        ['one','1'],
        ['two','2'],
        ['three','3'],
        ['four','4'],
        ['five','5'],
        ['six','6'],
        ['seven','7'],
        ['eight','8'],
        ['nine','9'],
    ]
    let numIndicies = [];
    var index;
    for(let i = 0; i < searchNums.length; i++)
    {
        var startIndex = 0;
        while((index = subString.indexOf(searchNums[i][0], startIndex)) > -1){
            numIndicies.push({"position":index, "number": searchNums[i][1]});
            startIndex += searchNums[i][0].length+index;
        }
    }
    numIndicies.sort((a,b)=>b.position-a.position);
    for(let j = 0; j < numIndicies.length; j++){
        subString = subString.slice(0,numIndicies[j].position) + numIndicies[j].number + subString.slice(numIndicies[j].position);
    }
    return subString;
}