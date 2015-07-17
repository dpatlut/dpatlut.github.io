console.log("linked");

//CARDS
var Card = function(rank,suit,val){ //card constructor
	this.rank=rank;
	this.suit=suit
	this.val = val;
}

var getCardRank = function(card){//get card rank
	return card.rank;
}

var getCardSuit = function(card){//get card suit
	return card.suit;
}

var getCardVal = function(card){
	return card.val;
}

var setCardSuit = function(card,suit){
	card.suit = suit;
}
var setCardVal = function(card,newval){
	card.val = newval;
}


//DECKS
var suits = ["clubs" , "spades", "hearts", "diamonds"];
var ranks  = [ "Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King" ];
var betaDeck = [];
var createCards = function(){
    var val
    for(var i=0;i<ranks.length;i++){ 
        if(ranks[i] === "Jack" || ranks[i] === "Queen" || ranks[i] === "King"){
            val = "10";
        }
        else if(ranks[i] === "Ace"){
            val = "1";
        }
        else{
            val = ranks[i];
        }
        for(var x=0;x<suits.length;x++) {
            betaDeck.push(new Card(ranks[i], suits[x], val));
        }           
    }
}




//setup board on click of play
var setup = $('#play').on('click' , function(){
	$('#logo').addClass('animated fadeOutUp'); //removes logo
	$('#play').removeClass('animated infinite bounce '); //removes play button
	$('#play').addClass('animated fadeOut'); //fades it out
	$('.play-button').css("visibility" , "hidden");
	//animation for buttons
	$('.dealer').addClass('moveAiOnscreen animated fadeInDown');
	$('.dealer').removeClass('dealer');
	$('.player').addClass('movePlayerOnscreen animated fadeInUp');
	$('.player').removeClass('player');
	$('.controls').addClass('moveControlsOnScreen animated fadeInUp');
	$('.controls').removeClass('controls');
	$('.deck-of-cards').addClass('deckAfter animated fadeInUp');
	$('.deck-of-cards').removeClass('deck-of-cards');
	$('.edge').addClass('edgeAfter animated fadeInRight');
	$('.edge').removeClass('edge');
	//move card divs into place
	$('.dealer-cards').addClass('dealer-cardsAfter animated fadeInDown');
	$('.dealer-cards').removeClass('dealer-cards');
	$('.player-cards').addClass('player-cardsAfter animated fadeInUp');
	$('.player-cards').removeClass('player-cards');
	//move scores into place
	$('.dealer-score').addClass('dealer-scoreAfter animated rollIn');
	$('.dealer-score').removeClass('dealer-score');
	$('.player-score').addClass('player-scoreAfter animated rollIn');
	$('.player-score').removeClass('player-score');
	//money
	$('.player-money').addClass('player-moneyAfter animated rollIn');
	$('.player-money').removeClass('player-money');
	createCards();
})

