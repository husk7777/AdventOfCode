import { parse } from "path";

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
    console.log(ProcessData(data));
});

function ProcessData(data: string){
    var splitLines = data.split('\r\n');
    let gameSum = 0;
    for(let i = 0; i < splitLines.length; i++){
        gameSum += GetGamePower(splitLines[i]); 
    }
    return gameSum;
}

function GetGameIdIfPossible(gameInfo: string){
    let allowedRed = 12;
    let allowedGreen = 13;
    let allowedBlue = 14;
    let gameRoundsInfo = gameInfo.split(':')[1].split(';');
    for(let i = 0; i < gameRoundsInfo.length; i++){
        let gameColorInfo = gameRoundsInfo[i].split(',');
        for(let j = 0; j < gameColorInfo.length; j++){
            if(gameColorInfo[j].indexOf('red')>-1){
                let redNumber = parseInt(gameColorInfo[j].replace(/\D/g, ""));
                if(!isNaN(redNumber)){
                    if(redNumber > allowedRed){
                        return 0;
                    }
                }
            }
            if(gameColorInfo[j].indexOf('green')>-1){
                let greenNumber = parseInt(gameColorInfo[j].replace(/\D/g, ""));
                if(!isNaN(greenNumber)){
                    if(greenNumber > allowedGreen){
                        return 0;
                    }
                }
            }
            if(gameColorInfo[j].indexOf('blue')>-1){
                let blueNumber = parseInt(gameColorInfo[j].replace(/\D/g, ""));
                if(!isNaN(blueNumber)){
                    if(blueNumber > allowedBlue){
                        return 0;
                    }
                }
            }
        }
    }

    let gameNumString = gameInfo.split(':')[0].replace(/\D/g, "");
    let gameId = parseInt(gameNumString);
    if(!isNaN(gameId))return gameId;
    return 0;
}

function GetGamePower(gameInfo: string){
    let leastRed = 0;
    let leastGreen = 0;
    let leastBlue = 0;
    let gameRoundsInfo = gameInfo.split(':')[1].split(';');
    for(let i = 0; i < gameRoundsInfo.length; i++){
        let gameColorInfo = gameRoundsInfo[i].split(',');
        for(let j = 0; j < gameColorInfo.length; j++){
            if(gameColorInfo[j].indexOf('red')>-1){
                let redNumber = parseInt(gameColorInfo[j].replace(/\D/g, ""));
                if(!isNaN(redNumber)){
                    if(redNumber > leastRed){
                        leastRed = redNumber;
                    }
                }
            }
            if(gameColorInfo[j].indexOf('green')>-1){
                let greenNumber = parseInt(gameColorInfo[j].replace(/\D/g, ""));
                if(!isNaN(greenNumber)){
                    if(greenNumber > leastGreen){
                        leastGreen = greenNumber;
                    }
                }
            }
            if(gameColorInfo[j].indexOf('blue')>-1){
                let blueNumber = parseInt(gameColorInfo[j].replace(/\D/g, ""));
                if(!isNaN(blueNumber)){
                    if(blueNumber > leastBlue){
                        leastBlue = blueNumber;
                    }
                }
            }
        }
    }
    let power = leastBlue * leastRed * leastGreen;
    return power;
}