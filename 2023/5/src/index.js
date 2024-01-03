var fs = require('fs');
var seedSoil = new Array();
var soilFertilizer = new Array();
var fertilizerWater = new Array();
var waterLight = new Array();
var lightTemperature = new Array();
var temperatureHumidity = new Array();
var humidityLocation = new Array();
var mappings = new Array();
var mapping = /** @class */ (function () {
    function mapping(source, destination) {
        this.source = source;
        this.destination = destination;
    }
    return mapping;
}());
var fullMapping = /** @class */ (function () {
    function fullMapping(seed, soil, fertilizer, water, light, temperature, humidity, location) {
        this.seed = seed;
        this.soil = soil;
        this.fertilizer = fertilizer;
        this.water = water;
        this.light = light;
        this.temperature = temperature;
        this.humidity = humidity;
        this.location = location;
    }
    return fullMapping;
}());
function read(file, callback) {
    fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        }
        callback(data);
    });
}
var output = read('C:\\users\\william\\documents\\adventofcode\\2023\\5\\input.txt', function (data) {
    console.log(ProcessData(data));
});
function ProcessData(data) {
    var seedData = data.split("\r\n");
    ExtractMappings(seedData);
    var location = mappings.map(function (x) { return x.location; }).sort()[0];
    return location;
}
function ExtractMappings(data) {
    var seedLine = data[0];
    var seedStrings = seedLine.split(":")[1].trim().split(" ");
    for (var i = 0; i < seedStrings.length; i += 2) {
        var seedNumber = parseInt(seedStrings[i]);
        var seedRange = parseInt(seedStrings[i + 1]);
        if (!isNaN(seedNumber) && !isNaN(seedRange)) {
            for (var j = 0; j < seedRange; j++) {
                mappings.push(new fullMapping(seedNumber + j, 0, 0, 0, 0, 0, 0, 0));
            }
        }
    }
    var seedSoilStart = data.indexOf("seed-to-soil map:");
    var soilFertilizerStart = data.indexOf("soil-to-fertilizer map:");
    var fertilizerWaterStart = data.indexOf("fertilizer-to-water map:");
    var waterLightStart = data.indexOf("water-to-light map:");
    var lightTemperatureStart = data.indexOf("light-to-temperature map:");
    var temperatureHumidityStart = data.indexOf("temperature-to-humidity map:");
    var humidityLocationStart = data.indexOf("humidity-to-location map:");
    for (var i = seedSoilStart + 1; i < soilFertilizerStart; i++) {
        var nums = data[i].split(" ").map(function (x) { return parseInt(x); });
        for (var j = 0; j < mappings.length; j++) {
            if (mappings[j].seed >= nums[1] && mappings[j].seed < nums[1] + nums[2]) {
                var diff = mappings[j].seed - nums[1];
                mappings[j].soil = diff + nums[0];
            }
            else if (mappings[j].soil == 0 && i == soilFertilizerStart - 1) {
                mappings[j].soil = mappings[j].seed;
            }
        }
    }
    for (var i = soilFertilizerStart + 1; i < fertilizerWaterStart; i++) {
        var nums = data[i].split(" ").map(function (x) { return parseInt(x); });
        for (var j = 0; j < mappings.length; j++) {
            if (mappings[j].soil >= nums[1] && mappings[j].soil < nums[1] + nums[2]) {
                var diff = mappings[j].soil - nums[1];
                mappings[j].fertilizer = diff + nums[0];
            }
            else if (mappings[j].fertilizer == 0 && i == fertilizerWaterStart - 1) {
                mappings[j].fertilizer = mappings[j].soil;
            }
        }
    }
    for (var i = fertilizerWaterStart + 1; i < waterLightStart; i++) {
        var nums = data[i].split(" ").map(function (x) { return parseInt(x); });
        for (var j = 0; j < mappings.length; j++) {
            if (mappings[j].fertilizer >= nums[1] && mappings[j].fertilizer < nums[1] + nums[2]) {
                var diff = mappings[j].fertilizer - nums[1];
                mappings[j].water = diff + nums[0];
            }
            else if (mappings[j].water == 0 && i == waterLightStart - 1) {
                mappings[j].water = mappings[j].fertilizer;
            }
        }
    }
    for (var i = waterLightStart + 1; i < lightTemperatureStart; i++) {
        var nums = data[i].split(" ").map(function (x) { return parseInt(x); });
        for (var j = 0; j < mappings.length; j++) {
            if (mappings[j].water >= nums[1] && mappings[j].water < nums[1] + nums[2]) {
                var diff = mappings[j].water - nums[1];
                mappings[j].light = diff + nums[0];
            }
            else if (mappings[j].light == 0 && i == lightTemperatureStart - 1) {
                mappings[j].light = mappings[j].water;
            }
        }
    }
    for (var i = lightTemperatureStart + 1; i < temperatureHumidityStart; i++) {
        var nums = data[i].split(" ").map(function (x) { return parseInt(x); });
        for (var j = 0; j < mappings.length; j++) {
            if (mappings[j].light >= nums[1] && mappings[j].light < nums[1] + nums[2]) {
                var diff = mappings[j].light - nums[1];
                mappings[j].temperature = diff + nums[0];
            }
            else if (mappings[j].temperature == 0 && i == temperatureHumidityStart - 1) {
                mappings[j].temperature = mappings[j].light;
            }
        }
    }
    for (var i = temperatureHumidityStart + 1; i < humidityLocationStart; i++) {
        var nums = data[i].split(" ").map(function (x) { return parseInt(x); });
        for (var j = 0; j < mappings.length; j++) {
            if (mappings[j].temperature >= nums[1] && mappings[j].temperature < nums[1] + nums[2]) {
                var diff = mappings[j].temperature - nums[1];
                mappings[j].humidity = diff + nums[0];
            }
            else if (mappings[j].humidity == 0 && i == humidityLocationStart - 1) {
                mappings[j].humidity = mappings[j].temperature;
            }
        }
    }
    for (var i = humidityLocationStart + 1; i < data.length; i++) {
        var nums = data[i].split(" ").map(function (x) { return parseInt(x); });
        for (var j = 0; j < mappings.length; j++) {
            if (mappings[j].humidity >= nums[1] && mappings[j].humidity < nums[1] + nums[2]) {
                var diff = mappings[j].humidity - nums[1];
                mappings[j].location = diff + nums[0];
            }
            else if (mappings[j].location == 0 && i == data.length - 1) {
                mappings[j].location = mappings[j].humidity;
            }
        }
    }
}
