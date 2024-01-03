var fs = require('fs');
function read(file, callback) {
    fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        }
        callback(data);
    });
}
var output = read('C:\\users\\william\\documents\\adventofcode\\2023\\6\\input.txt', function (data) {
    console.log(ProcessData(data));
});
function ProcessData(data) {
    var raceData = data.split("\r\n");
    var raceResult = ProcessRaceDataSecondPart(raceData);
    return raceResult;
}
function ProcessRaceData(data) {
    var result = new Array();
    var times = data[0].split(":")[1].trim().split(" ").map(function (x) { return parseInt(x); }).filter(function (x) { return !isNaN(x); });
    var distances = data[1].split(":")[1].trim().split(" ").map(function (x) { return parseInt(x); }).filter(function (x) { return !isNaN(x); });
    for (var i = 0; i < times.length; i++) {
        var time = times[i];
        var distance = distances[i];
        var threshold = 0;
        while (true) {
            var travelled = threshold * (time - threshold);
            if (travelled > distance)
                break;
            if (travelled < 0)
                break;
            threshold++;
        }
        if (threshold < time) {
            var option = time + 1 - threshold * 2;
            result.push(option);
        }
    }
    return result;
}
function ProcessRaceDataSecondPart(data) {
    var timeString = data[0].split(":")[1].split("").filter(function (x) { return x != " "; }).join("");
    var distanceString = data[1].split(":")[1].split("").filter(function (x) { return x != " "; }).join("");
    var time = parseInt(timeString);
    var distance = parseInt(distanceString);
    var result = 0;
    var threshold = 0;
    while (true) {
        var travelled = threshold * (time - threshold);
        if (travelled > distance)
            break;
        if (travelled < 0)
            break;
        threshold++;
    }
    if (threshold < time) {
        result = time + 1 - threshold * 2;
    }
    return result;
}
