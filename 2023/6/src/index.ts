var fs = require('fs');
function read(file: string, callback: CallableFunction){
    fs.readFile(file, 'utf8', function(err: any, data: string){
        if(err){
            console.log(err);
        }
        callback(data);
    })
}


var output = read('C:\\users\\william\\documents\\adventofcode\\2023\\6\\example.txt', function(data: string){
    console.log(ProcessData(data));
});

function ProcessData(data: string){
    let raceData = data.split("\r\n");
    let raceResult = ProcessRaceDataSecondPart(raceData);
    return raceResult;
}

function ProcessRaceData(data: Array<string>){
    let result = new Array<number>();

    let times = data[0].split(":")[1].trim().split(" ").map(x=>parseInt(x)).filter(x=>!isNaN(x));
    let distances = data[1].split(":")[1].trim().split(" ").map(x=>parseInt(x)).filter(x=>!isNaN(x));

    for(let i = 0; i< times.length; i++){
        let time = times[i];
        let distance = distances[i];
        let threshold = 0;
        while(true){
            let travelled = threshold * (time-threshold);
            if(travelled > distance) break;
            if(travelled < 0) break;
            threshold++
        }
        if(threshold < time){
            let option = time + 1 - threshold * 2;
            result.push(option);
        }
    }

    return result;
}

function ProcessRaceDataSecondPart(data: Array<string>){
    let timeString = data[0].split(":")[1].split("").filter(x=>x!=" ").join("");
    let distanceString = data[1].split(":")[1].split("").filter(x=>x!=" ").join("");
    let time = parseInt(timeString);
    let distance = parseInt(distanceString);
    let result = 0;
    let threshold = 0;
    while(true){
        let travelled = threshold * (time-threshold);
        if(travelled > distance) break;
        if(travelled < 0) break;
        threshold++
    }
    if(threshold < time){
        result = time + 1 - threshold * 2;
    }
    return result;
}