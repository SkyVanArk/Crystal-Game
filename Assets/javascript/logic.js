
const CryptoCollector = function() {

    
    const numCryptos   = 4;
    let   cryptoValues = new Array(numCryptos);
    
    let numWins = 0, numLosses = 0;
    let targetSum, currentSum;



    this.startNewGame = function() {

        targetSum  = 0;
        currentSum = 0;


        for (let i = 0; i < numCryptos; i++) {
            cryptoValues[i] = randomInteger(1, 12);

            targetSum += randomInteger(1, 6) * cryptoValues[i];
        }

        while (targetSum < 19 || targetSum > 120) {
            targetSum = 0;

            for (let i = 0; i < numCryptos; i++) {
                targetSum += randomInteger(1, 6) * cryptoValues[i];
            }
        }

        displayNumWins();
        displayNumLosses();
        displayTargetSum();
        displayCurrentSum();
    }



    this.displaypopup = function(popupOn) {
        $("#popup_background, #popup").css({"display": (popupOn ? "block" : "none")});
    }

    function displayNumWins() {
        $("#numWins").text(numWins);
    }

    function displayNumLosses() {
        $("#numLosses").text(numLosses);
    }

    function displayTargetSum() {
        $("#targetSum").text(targetSum);
    }

    function displayCurrentSum() {
        $("#currentSum").text(currentSum);
    }



    function updateNumWins(changeBy) {
        numWins += changeBy;
    }

    function updateNumLosses(changeBy) {
        numLosses += changeBy;
    }



    function randomInteger(a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a;
    }
    
    this.collectCrypto = function(index) {
        currentSum += cryptoValues[index];

        displayCurrentSum();

        if (currentSum < targetSum) {
            return;

        } else if (currentSum === targetSum) {
            updateNumWins(1);

            $("#outputMessage").html("Congratulations!<br>Click anywhere to continue.");
            $("#popup").css({
                "animation-name"  : "slide_down",
            });

            this.displaypopup(true);
            
            this.startNewGame();

        } else {
            updateNumLosses(1);

            $("#outputMessage").html("You got greedy!<br>Click anywhere to continue.");
            $("#popup").css({
                "animation-name"  : "shake",
                "background-color": "var(--color-danger-red)"
            });

            this.displaypopup(true);
            
            this.startNewGame();

        }
    }
}





let game;

$(document).ready(function() {
    game = new CryptoCollector();

    game.startNewGame();

    $(".cryptos").on("click", function() {
        game.collectCrypto($(".cryptos").index(this));
    });


    $("#popup_background, #popup").on("click", function() {
        game.displaypopup(false);
    });
});