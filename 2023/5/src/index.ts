var fs = require('fs')
var seedSoil = new Array<mapping>();
var soilFertilizer = new Array<mapping>();
var fertilizerWater = new Array<mapping>();
var waterLight = new Array<mapping>();
var lightTemperature = new Array<mapping>();
var temperatureHumidity = new Array<mapping>();
var humidityLocation = new Array<mapping>();
var mappings = new Array<fullMapping>();

class mapping{
    constructor(public source: number, public destination: number){}
}

class fullMapping{
    constructor
    (
        public seed: number, 
        public soil: number, 
        public fertilizer: number, 
        public water: number, 
        public light: number,
        public temperature: number,
        public humidity: number,
        public location: number   
    ){}
}

function read(file: string, callback: CallableFunction){
    fs.readFile(file, 'utf8', function(err: any, data: string){
        if(err){
            console.log(err);
        }
        callback(data);
    })
}


var output = read('C:\\users\\william\\documents\\adventofcode\\2023\\5\\example.txt', function(data: string){
    console.log(ProcessData(data));
});

function ProcessData(data: string){
    let seedData = data.split("\r\n");
    ExtractMappings(seedData);
    let location = mappings.map(x=>x.location).sort()[0];
    return location;
}

function ExtractMappings(data: Array<string>){
    let seedLine = data[0];
    let seedStrings = seedLine.split(":")[1].trim().split(" ");
    for(let i = 0; i< seedStrings.length; i+=2){
        let seedNumber = parseInt(seedStrings[i]);
        let seedRange = parseInt(seedStrings[i+1]);
        if(!isNaN(seedNumber) && !isNaN(seedRange)){
            for(let j = 0; j < seedRange; j++){
                mappings.push(new fullMapping(seedNumber+j,0,0,0,0,0,0,0));                
            }
        }
    }
    let seedSoilStart = data.indexOf("seed-to-soil map:");
    let soilFertilizerStart = data.indexOf("soil-to-fertilizer map:");
    let fertilizerWaterStart = data.indexOf("fertilizer-to-water map:");
    let waterLightStart = data.indexOf("water-to-light map:");
    let lightTemperatureStart = data.indexOf("light-to-temperature map:");
    let temperatureHumidityStart = data.indexOf("temperature-to-humidity map:");
    let humidityLocationStart = data.indexOf("humidity-to-location map:");
    for(let i = seedSoilStart+1; i < soilFertilizerStart; i++){
        let nums = data[i].split(" ").map(x=>parseInt(x));
        for(let j = 0; j < mappings.length; j++){
            if(mappings[j].seed >= nums[1] && mappings[j].seed < nums[1]+nums[2]){
                let diff = mappings[j].seed - nums[1];
                mappings[j].soil = diff + nums[0];
            }
            else if(mappings[j].soil == 0 && i == soilFertilizerStart-1){
                mappings[j].soil = mappings[j].seed;
            }
        }
    }
    for(let i = soilFertilizerStart+1; i < fertilizerWaterStart; i++){
        let nums = data[i].split(" ").map(x=>parseInt(x));
        for(let j = 0; j < mappings.length; j++){
            if(mappings[j].soil >= nums[1] && mappings[j].soil < nums[1]+nums[2]){
                let diff = mappings[j].soil - nums[1];
                mappings[j].fertilizer = diff + nums[0];
            }
            else if(mappings[j].fertilizer == 0 && i == fertilizerWaterStart-1){
                mappings[j].fertilizer = mappings[j].soil;
            }
        }
    }
    for(let i = fertilizerWaterStart+1; i < waterLightStart; i++){
        let nums = data[i].split(" ").map(x=>parseInt(x));
        for(let j = 0; j < mappings.length; j++){
            if(mappings[j].fertilizer >= nums[1] && mappings[j].fertilizer < nums[1]+nums[2]){
                let diff = mappings[j].fertilizer - nums[1];
                mappings[j].water = diff + nums[0];
            }
            else if(mappings[j].water == 0 && i == waterLightStart-1){
                mappings[j].water = mappings[j].fertilizer;
            }
        }
    }
    for(let i = waterLightStart+1; i < lightTemperatureStart; i++){
        let nums = data[i].split(" ").map(x=>parseInt(x));
        for(let j = 0; j < mappings.length; j++){
            if(mappings[j].water >= nums[1] && mappings[j].water < nums[1]+nums[2]){
                let diff = mappings[j].water - nums[1];
                mappings[j].light = diff + nums[0];
            }
            else if(mappings[j].light == 0 && i == lightTemperatureStart-1){
                mappings[j].light = mappings[j].water;
            }
        }
    }
    for(let i = lightTemperatureStart+1; i < temperatureHumidityStart; i++){
        let nums = data[i].split(" ").map(x=>parseInt(x));
        for(let j = 0; j < mappings.length; j++){
            if(mappings[j].light >= nums[1] && mappings[j].light < nums[1]+nums[2]){
                let diff = mappings[j].light - nums[1];
                mappings[j].temperature = diff + nums[0];
            }
            else if(mappings[j].temperature == 0 && i == temperatureHumidityStart-1){
                mappings[j].temperature = mappings[j].light;
            }
        }
    }
    for(let i = temperatureHumidityStart+1; i < humidityLocationStart; i++){
        let nums = data[i].split(" ").map(x=>parseInt(x));
        for(let j = 0; j < mappings.length; j++){
            if(mappings[j].temperature >= nums[1] && mappings[j].temperature < nums[1]+nums[2]){
                let diff = mappings[j].temperature - nums[1];
                mappings[j].humidity = diff + nums[0];
            }
            else if(mappings[j].humidity == 0 && i == humidityLocationStart-1){
                mappings[j].humidity = mappings[j].temperature;
            }
        }
    }
    for(let i = humidityLocationStart+1; i < data.length; i++){
        let nums = data[i].split(" ").map(x=>parseInt(x));
        for(let j = 0; j < mappings.length; j++){
            if(mappings[j].humidity >= nums[1] && mappings[j].humidity < nums[1]+nums[2]){
                let diff = mappings[j].humidity - nums[1];
                mappings[j].location = diff + nums[0];
            }
            else if(mappings[j].location == 0 && i == data.length-1){
                mappings[j].location = mappings[j].humidity;
            }
        }
    }
    
}