var ScratchCard = /** @class */ (function () {
    function ScratchCard(gameNumber, winningNumbers, gameNumbers) {
        this.gameNumber = gameNumber;
        this.winningNumbers = winningNumbers;
        this.gameNumbers = gameNumbers;
    }
    return ScratchCard;
}());
var fs = require('fs');
function read(file, callback) {
    fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        }
        callback(data);
    });
}
var output = read('C:\\users\\william\\documents\\adventofcode\\2023\\4\\input.txt', function (data) {
    console.log(ProcessData(data));
});
function ProcessData(data) {
    var gameData = data.split("\r\n");
    var games = BuildGameData(gameData);
    var score = TestCardsSecondPart(games);
    return score;
}
function BuildGameData(data) {
    var games = new Array();
    for (var i = 0; i < data.length; i++) {
        var cardData = data[i].split(":");
        var cardNumber = parseInt(cardData[0].replace(/\D/g, ""));
        var gameData = cardData[1].replace(/\s+/g, ' ').split("|");
        var winningNumbers = gameData[0].trim().split(" ");
        var gameNumbers = gameData[1].trim().split(" ");
        games.push(new ScratchCard(cardNumber, winningNumbers, gameNumbers));
    }
    return games;
}
function TestCards(data) {
    var score = 0;
    for (var i = 0; i < data.length; i++) {
        var card = data[i];
        var matchedNumbers = 0;
        for (var j = 0; j < card.gameNumbers.length; j++) {
            if (card.winningNumbers.includes(card.gameNumbers[j])) {
                matchedNumbers++;
            }
        }
        if (matchedNumbers > 0) {
            score += Math.pow(2, matchedNumbers - 1);
        }
    }
    return score;
}
function TestCardsSecondPart(data) {
    var copies = new Array(data.length).fill(0);
    for (var i = 0; i < data.length; i++) {
        var card = data[i];
        var matchedNumbers = 0;
        for (var j = 0; j < card.gameNumbers.length; j++) {
            if (card.winningNumbers.includes(card.gameNumbers[j])) {
                matchedNumbers++;
            }
        }
        if (matchedNumbers > 0) {
            for (var j = 1; j <= matchedNumbers; j++) {
                if (i + j > data.length)
                    break;
                copies[i + j]+= copies[i]+1;
            }
        }
    }
    let score = 0;
    copies.forEach(num => score += num+1);
    return score;
}
