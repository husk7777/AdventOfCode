
class ScratchCard{
    constructor(public gameNumber: number, public winningNumbers: Array<string>, public gameNumbers: Array<string> ){}
}

var fs = require('fs')

function read(file: string, callback: CallableFunction){
    fs.readFile(file, 'utf8', function(err: any, data: string){
        if(err){
            console.log(err);
        }
        callback(data);
    })
}


var output = read('C:\\users\\william\\documents\\adventofcode\\2023\\4\\example.txt', function(data: string){
    console.log(ProcessData(data));
});

function ProcessData(data: string){
    let gameData = data.split("\r\n");
    let games = BuildGameData(gameData);
    let score = TestCardsSecondPart(games);
    return score;
}

function BuildGameData(data: Array<string>){
    let games = new Array<ScratchCard>();
    for(let i=0; i<data.length; i++){
        let cardData = data[i].split(":");
        let cardNumber = parseInt(cardData[0].replace(/\D/g, ""));
        let gameData = cardData[1].replace(/\s+/g, ' ').split("|");
        let winningNumbers = gameData[0].trim().split(" ");
        let gameNumbers = gameData[1].trim().split(" ");
        games.push(new ScratchCard(cardNumber, winningNumbers, gameNumbers));
    }
    return games;
}

function TestCards(data: Array<ScratchCard>){
    let score = 0;
    for(let i = 0; i < data.length; i++){
        let card = data[i];
        let matchedNumbers = 0;
        for(let j = 0; j < card.gameNumbers.length; j++){
            if(card.winningNumbers.includes(card.gameNumbers[j])){
                matchedNumbers++;
            }
        }
        if(matchedNumbers > 0){
            score += Math.pow(2, matchedNumbers-1);
        }
    }
    return score;
}

function TestCardsSecondPart(data: Array<ScratchCard>){
    let copies = new Array<number>(data.length).fill(0);
    for(let i = 0; i< data.length; i++){
        let card = data[i];
        let matchedNumbers = 0;
        for(let j = 0; j < card.gameNumbers.length; j++){
            if(card.winningNumbers.includes(card.gameNumbers[j])){
                matchedNumbers++;
            }
        }
        if(matchedNumbers > 0){
            for(let j=1; j<= matchedNumbers; j++){
                if(i+j > data.length) break;
                copies[i + j]+= copies[i]+1;
            }
        }
    }
    let score = 0;
    copies.forEach(num => score += num+1);
    return score;
}