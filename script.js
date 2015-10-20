console.log("linked");
//Process : 
// 1.We create the cards -> Card -> Give it getters/setters
// 2.We create the betaDeck which has all the cards in order
// 3.Create images in order as the same as betaDeck
// 4.Create assossiative array that pairs image to the card in betaDeck
// 5.Shuffle the deck and store into a new array , the one we will be using for the game
// 6.SETUP->
// 	a)Enter bankroll
// 	b)Press play
// 	c)Setup for table happens
// 	d)Enter bet amount
// 	e)Give cards out
// 7.PLAY
// 8.RESET FOR NEXT GAME


//---------------------------------------------------------------//CARDS
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


//---------------------------------------------------------------//DECK FOR CARDS - betaDeck 
var suits = ["clubs" , "spades", "hearts", "diamonds"];
var ranks  = [ "Ace","King","Queen","Jack","10","9","8","7","6","5","4","3","2"];
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

//---------------------------------------------------------------//IMAGES
var images = [
"img/1.png",
"img/2.png",
"img/3.png",
"img/4.png",
"img/5.png",
"img/6.png",
"img/7.png",
"img/8.png",
"img/9.png",
"img/10.png",
"img/11.png",
"img/12.png",
"img/13.png",
"img/14.png",
"img/15.png",
"img/16.png",
"img/17.png",
"img/18.png",
"img/19.png",
"img/20.png",
"img/21.png",
"img/22.png",
"img/23.png",
"img/24.png",
"img/25.png",
"img/26.png",
"img/27.png",
"img/28.png",
"img/29.png",
"img/30.png",
"img/31.png",
"img/32.png",
"img/33.png",
"img/34.png",
"img/35.png",
"img/36.png",
"img/37.png",
"img/38.png",
"img/39.png",
"img/40.png",
"img/41.png",
"img/42.png",
"img/43.png",
"img/44.png",
"img/45.png",
"img/46.png",
"img/47.png",
"img/48.png",
"img/49.png",
"img/50.png",
"img/51.png",
"img/52.png"
]


//---------------------------------------------------------------//DECK with pairing - deck
var deck = {};
var createPairing = function(){
	for (var i = 0; i < betaDeck.length; i++) {
		deck[images[i]] = betaDeck[i];
	}
}


//---------------------------------------------------------------//DECK shuffled from betaDeck - sd
var sd = [];
var shuffle = function(){
	//shuffle deck
	sd = _.shuffle(betaDeck);
}


//----------------------------------------------------//Give Cards-----------
var giveCards = function(a, b , c, d){
	var playerCardOneImage = Object.keys(deck)[a];
	var playerCardTwoImage = Object.keys(deck)[b];
	var dealerCardOneImage = Object.keys(deck)[c];
	var dealerCardTwoImage = Object.keys(deck)[d];
	$(".player-cardsAfter").append($("<img>", { src: playerCardOneImage } ) ); 
	$(".player-cardsAfter").append($("<img>", { src: playerCardTwoImage } ) ); 
	$(".dealer-cardsAfter").append($("<img>", { src: dealerCardOneImage } ) ); 
	$(".dealer-cardsAfter").append($("<img>", { id:'beforeflip' , src: dealerCardTwoImage } ) );
	$(".dealer-cardsAfter").append($("<img>", { id:'flip', src: "deck.png"}  ) ); 

}




//BEGIN THE GAME -> USER HAS LOADED PAGE -> PRESENT BANKROLL ENTER 
var bankroll = 0 
var bankrollEntered = $('#bankroll-enter').on('click' , function(){
	bankroll = parseInt($('#moneys').val()) //must do .val , nothing else worked
	if(isNaN(bankroll)===true || bankroll<0 || bankroll===null){
		swal({   title: "Input Invalid",   
				 text: "Please enter a valid bankroll , we all know you have more money than that! ",    
				 confirmButtonText: "Okay! I will follow the rules now" 
		});
		return;
	}
	$('.play-button').css("visibility" , "visible");
	$('.play-button').addClass('animated fadeIn');
	//account for illegal input?
	$('.bankroll').addClass('animated fadeOut');
	// $('.bankroll').css("visibility" , "hidden");
	var normal = Number(bankroll).toLocaleString('en'); // generates english version of number
	$("#amount").text("$" + normal);
})



//WHEN USER SETS UP BANKROLL AND CLICKS PLAY , WE SETUP THE BOARD
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
	$('.deck-of-cards').addClass('deckAfter animated fadeInUp');
	$('.deck-of-cards').removeClass('deck-of-cards');
	$('.edge').addClass('edgeAfter animated fadeInRight');
	$('.edge').removeClass('edge');
	//move scores into place
	$('.dealer-score').addClass('dealer-scoreAfter animated rollIn');
	$('.dealer-score').removeClass('dealer-score');
	$('.player-score').addClass('player-scoreAfter animated rollIn');
	$('.player-score').removeClass('player-score');
	//money
	$('.player-money').addClass('player-moneyAfter animated rollIn');
	$('.player-money').removeClass('player-money');
	$('.bets').addClass('betsAfter animated fadeIn');
	$('.bets').removeClass('bets');
})

//AFTER THE USER ENTERS THE BET
var betAmount = 0
//GLOBAL^^



var afterBet = $('#bet-enter').on('click',function(){
	betAmount = parseInt($('#bet-amount').val()); //save bet amount for game
	if(betAmount>bankroll){
		swal({   title: "Input Invalid",   
			text: "Please enter a bet less than your bankroll",    
			confirmButtonText: "Okay! I will follow the rules now" 
		});
		return;
	}
	$('.game-bet').addClass('game-betAfter animated rollIn');
	$('.game-bet').removeClass('game-bet');
	var n = Number(betAmount).toLocaleString('en');
	$('#game-bet-amount').text("$"+ n)
	//remove bet button class
	$('.betsAfter').addClass('animated fadeOut');
	$('.controls').addClass('moveControlsOnScreen animated fadeInUp');
	$('.controls').removeClass('controls');
	$('.dealer-cards').addClass('dealer-cardsAfter animated fadeInDown');
	$('.dealer-cards').removeClass('dealer-cards');
	$('.player-cards').addClass('player-cardsAfter animated fadeInUp');
	$('.player-cards').removeClass('player-cards');
	play();
})

//WE PLAY THE GAME!!!
//VVVVVVVVVVVVVVVVVVVVVVVVVVV-----------------------------------------

//-------------------------------------------------------------------------------------------------------------------------
var play = function(){
	//ONLY DEFINED INSIDE PLAY FUNCTION SO WE CANT CALL IT OUTSIDE OF IT 
	//ALL GLOBAL VARIABLES INSIDE PLAY FUNCTION FOR OTHER FUNCTIONS
	var playerscore = 0
	var dealerscore = 0 
	createCards();
	createPairing();
	shuffle();
	var pCardOne = Math.floor(Math.random()*sd.length);
	var pCardTwo = Math.floor(Math.random()*sd.length);
	var dCardOne = Math.floor(Math.random()*sd.length);
	var dCardTwo = Math.floor(Math.random()*sd.length);
	var dealersHand = 0;   
	var playersHand = 0;
	playersHand = parseInt(deck[images[pCardOne]].val) + parseInt(deck[images[pCardTwo]].val); //ADJUST PLAYERS HAND
	dealersHand = parseInt(deck[images[dCardOne]].val) + parseInt(deck[images[dCardTwo]].val); //ADJUST DEALERS HAND
	giveCards(pCardOne,pCardTwo,dCardOne,dCardTwo);
	//CARDS HAVE BEEN DISTRIBUTED
	//implement ace switch function / compare 


 //------------------------------------------AUTO WIN BEFORE WE EVEN COMPARE
	//WHAT IF PLAYER HAS AUTOMATIC WIN?
	//call win on player/dealer
	var natural;
	if(playersHand===21){
		if(playersHand===dealersHand){
			draw();
		}
		alert("AUTO WIN PLAYER")
		isWinner(natural);
	}

//NO AUTO WIN , NOW USER CAN CHOOSE WHAT TO DO : 
//a) hit -> until they hit stand or bust
//b) stand -> compare

//--------------------------------------------WE CLICK HIT
	//WHAT HAPPENS WHEN WE CLICK HIT : 
	//a) we will bust - call bust function
	//b) we dont bust  - continue until we ethier bust or click stand
	//WE CAN CALL VARIABLES ABOVE INSIDE HITCLICK
	var hitClick = $('#hit').on('click' , function(){
		var pCardExtra = Math.floor(Math.random()*sd.length);
		var additionalCard = parseInt(deck[images[pCardExtra]].val)
		var playerCardExtra = Object.keys(deck)[pCardExtra];
		$(".player-cardsAfter").append($("<img>", { src: playerCardExtra } ) );
		//we add the extra card ^^ 
		//add score to players hand
		playersHand += additionalCard; //works for multiple hits
		//we added the card 
		if(playersHand>21){
			isBust(player);
		}
	})


//--------------------------------------------WE CLICK STAND
var standClick = $('#stand').on('click' , function(){
	compareWinners();
})


//--------------------------------------------BUST FUNCTION
var isBust = function(who){//who is getting a bust?
	if (who===player){
		isWinner(dealer);
	}
	if (who===dealer){
		isWinner(player);
	}
}

var compareWinners = function(){
	console.log(playersHand);
	console.log(dealersHand);
	$("#flip").addClass('animated flipOutY');
	$("#beforeflip").addClass('animated flipInY');
			//DEALER HAS BLACKJACK AND PLAYER DOES NOT -> automatic win for dealer
			if((dealersHand===21) && (dealersHand>playersHand)){
				console.log("AUTO WIN DEALER")
				isWinner(dealer);
			}
			//if not automatic win check if dealers hand is less than 17 , if it is he draws till it is not
			while(dealersHand<17){
				var dCardExtra = Math.floor(Math.random()*sd.length);
				var dadditionalCard = parseInt(deck[images[dCardExtra]].val)
				dealersHand += dadditionalCard; //works for multiple hits
				var dealerCardExtra = Object.keys(deck)[dCardExtra];
				$(".dealer-cardsAfter").append($("<img>", { src: dealerCardExtra } ) ); 
				console.log(dealersHand);
			}
		//After he has more than 17 we compare the cards
		//if he has more than the player
		if(dealersHand>playersHand){
				//if he has more but it is a bust 
				if(dealersHand>21){
					isBust(dealer);
				}
				//if not bust and he has more than the winner is the dealer
				isWinner(dealer);
			}
				//if they are equal
				else if (dealersHand===playersHand){
					draw();
				}
			  	//else the player wins if not draw and the dealers hand is less than players hand
			  	else{
			  		isWinner(player);
			  	}
}//end compare winners function

// WHO WINS AND WHAT HAPPENS? , also must reset after the winner
var isWinner = function(who){
	if (who===player){
			//update score
			playerscore++;
			$("#pscore").text(playerscore);
			//update money
			console.log(betAmount);
			var newBalance = bankroll + betAmount;
			var temp = Number(newBalance).toLocaleString('en');
			$('#amount').text("$"+ temp);
			reset();
		}
		if (who===dealer){
			//update score
			dealerscore++;
			$("#dscore").text(dealerscore);
			//update money
			console.log(betAmount);
			var newBalance = bankroll - betAmount;
				if(newBalance<=0){
			swal({   title: "You broke bruh , get some more money!",       
				 	confirmButtonText: "Please wait for the page to reload!" //add in coundown as extra?
			});
			setTimeout(function(){
    		location.reload();},5000);// location.reload//NEED TO MAKE HIM START FROM BEGGINING
			}
			var temp = Number(newBalance).toLocaleString('en');
			$('#amount').text("$"+ temp);
			reset();
		}
		if (who===natural){
			playerscore++;
			$("#pscore").text(playerscore);
			//update money
			console.log(betAmount);
			var newBalance = bankroll + (betAmount*1.5);
			var temp = Number(newBalance).toLocaleString('en');
			$('#amount').text("$"+ temp);
			reset();
		}
	}
//WHAT IF THEY DRAW?
var draw = function(){
	reset();
}

var reset = function(){
		console.log("reset");
		// $('.player-cardsAfter').empty();
		// $('.dealer-cardsAfter').empty();
		$('.betsAfter').addClass('animated fadeIn');
		$('.betsAfter').removeClass('fadeOut');
	}
}//end big Play function
