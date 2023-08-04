var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var cardW, cardH;
canvas.width = window.innerWidth < 700 ? window.innerWidth* (7/10) : window.innerWidth/4;
canvas.height = window.innerHeight/(4);
cardW = window.innerWidth < 700 ? 50 : 100;
cardW = window.innerWidth < 700 ? 75 : 150;
var x = 20;
var y = 30;
window.addEventListener("resize", ()=>{
     canvas.width = window.innerWidth < 700 ? window.innerWidth * (7/10): window.innerWidth/4;
     cardW = window.innerWidth < 700 ? 50 : 100;
     cardW = window.innerWidth < 700 ? 75 : 150;
     // function display cards to the canvas 
     draw_canvas();
})

var player11 = document.querySelectorAll(".player1");
var player22 = document.querySelectorAll(".player2");
var player1 = [];
var player2 = [];
var player1Count = 7;
var player2Count = 7;
var sideCard = [];
var you;
canvasCardsArray = [];

player11.forEach(element => {
    player1.push(element);
});
player22.forEach(element => {
    player2.push(element);
});

var player1Cards = [];
var player2Cards= [];
var player1Turn = false;
var computer = [];

// choice
var choiceArray = document.querySelectorAll(".choice1");
var isChoice = false;

// array of played cards 
var cardsPlayed = [];
var covered = "https://i.pinimg.com/736x/0e/5f/f1/0e5ff160c652d000ebb409a754653d23.jpg";

var cardsImage = [
    [
        "https://mathematik.com/Blackjack/cards/diamond-2.gif", 
        "https://mathematik.com/Blackjack/cards/diamond-3.gif", 
        "https://mathematik.com/Blackjack/cards/diamond-4.gif", 
        "https://mathematik.com/Blackjack/cards/diamond-5.gif",
        "https://mathematik.com/Blackjack/cards/diamond-6.gif", 
        "https://mathematik.com/Blackjack/cards/diamond-7.gif", 
        "https://mathematik.com/Blackjack/cards/diamond-8.gif", 
        "https://mathematik.com/Blackjack/cards/diamond-9.gif", 
        "https://mathematik.com/Blackjack/cards/diamond-10.gif", 
        "https://mathematik.com/Blackjack/cards/diamond-jack.gif", 
        "https://mathematik.com/Blackjack/cards/diamond-queen.gif", 
        "https://mathematik.com/Blackjack/cards/diamond-king.gif", 
        "https://mathematik.com/Blackjack/cards/diamond-ace.gif"
   ],
   [
    "https://mathematik.com/Blackjack/cards/spades-2.gif", 
    "https://mathematik.com/Blackjack/cards/spades-3.gif", 
    "https://mathematik.com/Blackjack/cards/spades-4.gif", 
    "https://mathematik.com/Blackjack/cards/spades-5.gif",
     "https://mathematik.com/Blackjack/cards/spades-6.gif", 
     "https://mathematik.com/Blackjack/cards/spades-7.gif", 
     "https://mathematik.com/Blackjack/cards/spades-8.gif", 
     "https://mathematik.com/Blackjack/cards/spades-9.gif", 
     "https://mathematik.com/Blackjack/cards/spades-10.gif", 
     "https://mathematik.com/Blackjack/cards/spades-jack.gif", 
         "https://mathematik.com/Blackjack/cards/spades-queen.gif", 
         "https://mathematik.com/Blackjack/cards/spades-king.gif", 
         "https://mathematik.com/Blackjack/cards/spades-ace.gif"
   ], 
   [
    "https://mathematik.com/Blackjack/cards/heart-2.gif", 
    "https://mathematik.com/Blackjack/cards/heart-3.gif", 
    "https://mathematik.com/Blackjack/cards/heart-4.gif", 
    "https://mathematik.com/Blackjack/cards/heart-5.gif",
     "https://mathematik.com/Blackjack/cards/heart-6.gif", 
     "https://mathematik.com/Blackjack/cards/heart-7.gif", 
     "https://mathematik.com/Blackjack/cards/heart-8.gif", 
     "https://mathematik.com/Blackjack/cards/heart-9.gif", 
     "https://mathematik.com/Blackjack/cards/heart-10.gif", 
     "https://mathematik.com/Blackjack/cards/heart-jack.gif", 
         "https://mathematik.com/Blackjack/cards/heart-queen.gif", 
         "https://mathematik.com/Blackjack/cards/heart-king.gif", 
         "https://mathematik.com/Blackjack/cards/heart-ace.gif"
    ],
    [
        "https://mathematik.com/Blackjack/cards/club-2.gif", 
        "https://mathematik.com/Blackjack/cards/club-3.gif", 
        "https://mathematik.com/Blackjack/cards/club-4.gif", 
        "https://mathematik.com/Blackjack/cards/club-5.gif",
        "https://mathematik.com/Blackjack/cards/club-6.gif", 
        "https://mathematik.com/Blackjack/cards/club-7.gif", 
        "https://mathematik.com/Blackjack/cards/club-8.gif", 
        "https://mathematik.com/Blackjack/cards/club-9.gif", 
        "https://mathematik.com/Blackjack/cards/club-10.gif",
         "https://mathematik.com/Blackjack/cards/club-jack.gif", 
         "https://mathematik.com/Blackjack/cards/club-queen.gif", 
         "https://mathematik.com/Blackjack/cards/club-king.gif", 
         "https://mathematik.com/Blackjack/cards/club-ace.gif"
   ]
];


// array of to be played 
var cards = [
                
                ["2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D", "10D", "JD", "QD", "KD", "AD"], 
                ["2S", "3S", "4S", "5S", "6S", "7S", "8S", "9S", "10S", "JS", "QS", "KS", "AS"],
                ["2H", "3H", "4H", "5H", "6H", "7H", "8H", "9H", "10H", "JH", "QH", "KH", "AH"],
                ["2F", "3F", "4F", "5F", "6F", "7F", "8F", "9F", "10F", "JF", "QF", "KF", "AF"]
           ];

var player1results;
var player2results;

var computer_pick_two = false;
var pick_two = false;

function insertAfter(newNode, existingNode) {
     existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}


// function to share the cards to players 
function share (playerCards, player, className, playerSide) {

    for (let index = 0; index < 7; index++) {
        var type;
        var card;
        
        type = Math.floor(Math.random() * (cards.length));
        card = Math.floor(Math.random() * (cards[type].length));
            
        if(cards[type][card] == ""){
            index--;
        }
        else{
            playerCards.push([type, card, cards[type][card]]);
            let div = document.createElement('img');
            div.src = cardsImage[type][card];
            div.style.display = "block";
            // div.width = "50px";
            div.id = cards[type][card];
            div.classList.add(className);
            // div.innerHTML =  "<img src='"+cardsImage[type][card]+"'/>";
            insertAfter(div,  playerSide.lastElementChild);
            player.push(div);
            cards[type][card] = "";
        }
    
    }

}

function computer_share (playerCards, player, c, className, playerSide) {

    for (let index = 0; index < 7; index++) {
        var type;
        var card;
        
        type = Math.floor(Math.random() * (cards.length));
        card = Math.floor(Math.random() * (cards[type].length));
            
        if(cards[type][card] == ""){
            index--;
        }
        else{
            playerCards.push([type, card, cards[type][card]]);
            let div = document.createElement('img');
            let img = document.createElement('img');
            div.src = covered;
            img.src = cardsImage[type][card];
            div.style.display = "block";
            div.id = cards[type][card];
            div.classList.add(className);
            insertAfter(div,  playerSide.lastElementChild);
            c.push(div);
            player.push(img);
            cards[type][card] = "";
        }
    
    }

}

// display the cards to the cards 
function display(player){
    player.forEach(element => {
        element.style.display = "flex";
    });
}


// starting the game by clicking the begin button 
function begin() {
    display(player1);
    display(player2);
    computer_share(player1Cards, player1, computer, "player1", document.getElementById("player1Cards"));
    share(player2Cards, player2, "player2", document.getElementById("player2Cards"));
    side_card("playerx", document.querySelector(".cong"));
    clear_canvas();
    cardsPlayed = [];
    x= 20;
    y=30;
    player1Turn = false;
    canvasCardsArray = [];
    // console.log(computer);
    play();
}

window.addEventListener("load", ()=>{
    let w =  "";
    you = w == "" || w == "undefined" ? "You Have" : w;
    begin();
});


// siding the cards
function side_card(className, playerSide){
    for (let index = 0; index <= 1; index++) {

        var type1;
        var card1;
        
        type1 = Math.floor(Math.random() * (cards.length));
        card1 = Math.floor(Math.random() * (cards[type1].length));
            
        if(cards[type1][card1] == ""){
            index--;
        }
        else{

            if (cards[type1][card1] == "7S" || cards[type1][card1] == "7F" || cards[type1][card1] == "7D" || cards[type1][card1] == "7H") {
                index--
            }
            else{
                let div = document.createElement('img');
                div.src = cardsImage[type1][card1];
                div.id = cards[type1][card1];
                div.classList.add(className);
                insertAfter(div,  playerSide.lastElementChild);
                sideCard.push([type1, card1, cards[type1][card1]]);
                cards[type1][card1] = "";
                break;
            }
             
        }
    }
}



    



// picking the cards
function pick_card(playerCards, player, className, playerSide){
    for (let index = 0; index <= 1; index++) {

        var type1;
        var card1;
        
        type1 = Math.floor(Math.random() * (cards.length));
        card1 = Math.floor(Math.random() * (cards[type1].length));
            
        if(cards[type1][card1] == ""){
            index--;
        }
        else{
            playerCards.push([type1, card1, cards[type1][card1]]);
            let div = document.createElement('img');
            div.src = cardsImage[type1][card1];
            div.id = cards[type1][card1];
            div.classList.add(className);
            // div.innerHTML =  "<img src='"+cardsImage[type][card]+"'/>";
            insertAfter(div,  playerSide.lastElementChild);
            player.push(div);
            cards[type1][card1] = "";
            break;
        }
    }


    for (let index = 0; index < player.length; index++) {
        if (player[index].style.display != "none") {
            if(playerCards[index][0] == canvasCardsArray[canvasCardsArray.length - 1].type){
                player1Turn = false;
                break;
            }
            if(playerCards[index][1] == canvasCardsArray[canvasCardsArray.length - 1].number){
                player1Turn = false;
                break;
            }
            if (playerCards[index][2] == "AH" || playerCards[index][2] == "AS" || playerCards[index][2] == "AF" || playerCards[index][2] == "AD") {
               player1Turn = false;
               break;
            }
              
        }
        
    }
    
    play();
    check_cards();
}


document.getElementById("pick").addEventListener("click", ()=>{
    if(!player1Turn){
        pick_card(player2Cards, player2, "player2", document.getElementById("player2Cards"));
        player2Count++;
        player1Turn = true;
        setTimeout(() => {
            computer_move();
        }, 500);
        // play();
    }
})




// computer picking the cards
function computer_pick_card(playerCards, player, c, className, playerSide){
    for (let index = 0; index <= 1; index++) {

        var type1;
        var card1;
        
        type1 = Math.floor(Math.random() * (cards.length));
        card1 = Math.floor(Math.random() * (cards[type1].length));
            
        if(cards[type1][card1] == ""){
            index--;
        }
        else{
             playerCards.push([type1, card1, cards[type1][card1]]);
            let div = document.createElement('img');
            let img = document.createElement('img');
            div.src = covered;
            img.src = cardsImage[type1][card1];
            div.style.display = "block";
            div.id = cards[type1][card1];
            div.classList.add(className);
            insertAfter(div,  playerSide.lastElementChild);
            c.push(div);
            player.push(img);
            cards[type1][card1] = "";
            break;
        }
    }

    for (let index = 0; index < c.length; index++) {
        if (c[index].style.display != "none") {
            if(playerCards[index].id == canvasCardsArray[canvasCardsArray.length - 1].type){
                player1Turn = true;
                break;
            }
            if(playerCards[index][1] == canvasCardsArray[canvasCardsArray.length - 1].number){
                player1Turn = true;
                break;
            }
            if (playerCards[index][2] == "AH" || playerCards[index][2] == "AS" || playerCards[index][2] == "AF" || playerCards[index][2] == "AD") {
               player1Turn =true;
               break;
            }
              
        }
        
    }

    if (player1Turn) {
        setTimeout(() => {
            computer_move();
        }, 500);
    }  

    check_cards();
}

function computer_pick_move () {
        computer_pick_card(player1Cards, player1, computer, "player1", document.getElementById("player1Cards")); 
        player1Count++;
        player1Turn = false;
}

function check_cards(){
    var done = true;
    for (let index = 0; index < cards.length; index++) {
        for (let index1 = 0; index1 < cards[index].length; index1++) {
            if(cards[index][index1] != ""){
                done  = false;
            }
        }
        
    }

    if (done) {
        document.querySelector("#pick").style.display = "none";
       // document.querySelector("#message").innerText = "Its a Draw"; 
    }
}










// turn change 
function player_turn(p, pCards){

    for (let index = 0; index < pCards.length; index++) {
        if (p.id == pCards[index][2]) {

            if (canvasCardsArray.length == 0) {
                 canvasCardsArray.push({image: p, x:x, y:y, type: pCards[index][0], number: pCards[index][1], id: p.id});  
                 draw_canvas();
                 x = x + 20;  
                 p.style.display = "none";


                 if(x >= 120){
                    y = 30;
                    x = 20;
                 }

            }
            else{
                if (pick_two) {
                    if (pCards[index][2] == "2H" || pCards[index][2] == "2S" || pCards[index][2] == "2F" || pCards[index][2] == "2D") {  
                        canvasCardsArray.push({image: p, x:x, y:y, type: pCards[index][0], number: pCards[index][1], id: p.id});   
                        draw_canvas();
                        x = x + 20;  
                        p.style.display = "none";

                        if(x >= 120){
                            y = 30;
                            x = 20;
                        }
                        pick_two = false;
    
                    }
                    else{
                        alert("Either pick or Play a 2");
                    }
                }else{
                    if (canvasCardsArray[canvasCardsArray.length-1].type == pCards[index][0]) {  
                        canvasCardsArray.push({image: p, x:x, y:y, type: pCards[index][0], number: pCards[index][1], id: p.id});   
                        draw_canvas();
                        x = x + 20;  
                        p.style.display = "none";
    
                    }
                    else if(canvasCardsArray[canvasCardsArray.length-1].number == pCards[index][1]){
                        canvasCardsArray.push({image: p, x:x, y:y, type: pCards[index][0], number: pCards[index][1], id: p.id});   
                        draw_canvas();
                        x = x + 20;  
                        p.style.display = "none";
    
                    }
                    else if(pCards[index][2] == "AH" || pCards[index][2] == "AS" || pCards[index][2] == "AF" || pCards[index][2] == "AD"){
                        canvasCardsArray.push({image: p, x:x, y:y, type: pCards[index][0], number: pCards[index][1], id: p.id});   
                        draw_canvas();
                        x = x + 20;  
                        p.style.display = "none";
                    }
                    else{
                        
                    }

                    if(x >= 120){
                        y = 30;
                        x = 20;
                    }
                }
                
            }

            
           
            
            
        } 
    }

    not_choice_a();

}

// turn change computer
function computer_turn(pT, p, pCards){

    for (let index = 0; index < pCards.length; index++) {
        if (p.id == pCards[index][2]) {

            if (canvasCardsArray.length == 0) {
                 canvasCardsArray.push({image: pT, x:x, y:y, type: pCards[index][0], number: pCards[index][1], id: p.id});  
                 draw_canvas();
                 x = x + 20;  
                 p.style.display = "none";

            }
            else{
                if (canvasCardsArray[canvasCardsArray.length-1].type == pCards[index][0]) {  
                    canvasCardsArray.push({image: pT, x:x, y:y, type: pCards[index][0], number: pCards[index][1], id: p.id});   
                    draw_canvas();
                    x = x + 20;  
                    p.style.display = "none";

                }
                else if(canvasCardsArray[canvasCardsArray.length-1].number == pCards[index][1]){
                    canvasCardsArray.push({image: pT, x:x, y:y, type: pCards[index][0], number: pCards[index][1], id: p.id});   
                    draw_canvas();
                    x = x + 20;  
                    p.style.display = "none";

                }
                else if(pCards[index][2] == "AH" || pCards[index][2] == "AS" || pCards[index][2] == "AF" || pCards[index][2] == "AD"){
                    canvasCardsArray.push({image: pT, x:x, y:y, type: pCards[index][0], number: pCards[index][1], id: p.id});   
                    draw_canvas();
                    x = x + 20;  
                    p.style.display = "none";
                }
                else{
                    
                }
            }

            if(x >= 120){
                y = 30;
                x = 20;
            }
            
            
            
        } 
    }

    not_choice_a();

}



function calculate_results(){
    let results_temp = 0;
    let comp_results_temp = 0;
   for (let index = 0; index < player2.length; index++) {
        if (player2[index].style.display != "none") {
            for (let index1 = 0; index1 < player2Cards.length; index1++) {
                if(player2[index].id == player2Cards[index1][2]){

                    if (player2Cards[index1][1] == 0) {
                        results_temp = results_temp + 20;
                    }
                    else if(player2Cards[index1][1] == 12){
                        results_temp = results_temp + 15;
                    }
                    else{
                        results_temp = results_temp + 2 + player2Cards[index1][1];
                    }
                    player2[index].style.display = "none";


                }
            }
        }
   }

   for (let index = 0; index < computer.length; index++) {
        if (computer[index].style.display != "none") {
            for (let index1 = 0; index1 < player1Cards.length; index1++) {
                if(computer[index].id == player1Cards[index1][2]){

                    if (player1Cards[index1][1] == 0) {
                        comp_results_temp = comp_results_temp + 20;
                    }
                    else if(player1Cards[index1][1] == 12){
                        comp_results_temp = comp_results_temp + 15;
                    }
                    else{
                        comp_results_temp = comp_results_temp + 2 + player1Cards[index1][1];
                    }
                    computer[index].style.display = "none";

                }
            }
        }
    }
    console.log(comp_results_temp + " " + results_temp);

    if (comp_results_temp > results_temp) {
        document.getElementById("results").innerText = "Computer: " + comp_results_temp + "    --            " + "You: " + results_temp;
        leon(computer, "Computer");
    }
    else if(comp_results_temp < results_temp){
        document.getElementById("results").innerText = "Computer: " + comp_results_temp + "    --             " + "You: " + results_temp;
        leon(player2, you);
    }
    else{
        document.getElementById("results").innerText = "Computer: " + comp_results_temp + "    --             " + "You: " + results_temp;
        leon(computer, "No one");
    }
}



function play() {


    // player 2 plays a card 
    player2.forEach(player => {
        player.addEventListener("click", ()=>{
             
            if (!player1Turn && player.style.display != "none") {
                
                    player_turn(player, player2Cards); 

                    if (player.style.display == "none") {
                        player2Count--;

                        if (canvasCardsArray[canvasCardsArray.length - 1].number == 5 && canvasCardsArray[canvasCardsArray.length - 1].type == sideCard[0][0]) {
                            calculate_results();  
                        }
                        else if (
                            canvasCardsArray[canvasCardsArray.length-1].image.id == "JH" || canvasCardsArray[canvasCardsArray.length-1].image.id == "JS" || 
                            canvasCardsArray[canvasCardsArray.length-1].image.id == "JF" || canvasCardsArray[canvasCardsArray.length-1].image.id == "JD"
                        ) {
                           player1Turn = false;   
                        }
                        else if (
                            canvasCardsArray[canvasCardsArray.length-1].image.id == "8H" || canvasCardsArray[canvasCardsArray.length-1].image.id == "8S" || 
                            canvasCardsArray[canvasCardsArray.length-1].image.id == "8F" || canvasCardsArray[canvasCardsArray.length-1].image.id == "8D"
                        ) {
                            player1Turn = false;
                        }
                        else if (
                            canvasCardsArray[canvasCardsArray.length-1].image.id == "AH" || canvasCardsArray[canvasCardsArray.length-1].image.id == "AS" || 
                            canvasCardsArray[canvasCardsArray.length-1].image.id == "AF" || canvasCardsArray[canvasCardsArray.length-1].image.id == "AD"
                        ) {
                             if(player2.length != 0){
                                choice_a();
                             }
                        }
                        else if (
                            canvasCardsArray[canvasCardsArray.length-1].image.id == "2H" || canvasCardsArray[canvasCardsArray.length-1].image.id == "2S" || 
                            canvasCardsArray[canvasCardsArray.length-1].image.id == "2F" || canvasCardsArray[canvasCardsArray.length-1].image.id == "2D"
                        ) {

                            for (let index = 0; index < player1.length; index++) {
                                if(computer[index].style.display != "none"){

                                    if (
                                        computer[index].id == "2H" || computer[index].id == "2S" ||
                                        computer[index].id == "2F" || computer[index].id == "2D" 
                                        ) {
                                            computer_pick_two = true;
                                            break;
                                    }
                                }    
                            }
  
                            if(computer_pick_two){
                                
                                player1Turn = true;

                            }
                            else{
                                setTimeout(() => {
                                     computer_pick_card(player1Cards, player1, computer, "player1", document.getElementById("player1Cards"));  
                                }, 500);

                                setTimeout(() => {
                                    computer_pick_card(player1Cards, player1, computer, "player1", document.getElementById("player1Cards"));  
                                }, 500);

                                player1Count++;
                                player1Count++;
                                player1Turn = false;
                            
                            }
                            
                        }
                        else{
                            player1Turn = true;
                        }
                        
                        leon(player2, you);
                        

                    } 
                    setTimeout(()=> {
                        computer_move();
                     }
                     ,500);      
            }
            
           
        })

    });

}



function computer_move(){
        

        var computerCardsArray = [];
        var playerTemp = [];
        var player;
    
        if (player1Turn) {
            if(computer_pick_two){
                for(let index = 0; index< computer.length; index++){
      
                    if (computer[index].style.display != "none") {
                        if ( computer[index].id == "2H" || computer[index].id == "2S" ||
                             computer[index].id == "2F" || computer[index].id == "2D"
                             ) {
                                computerCardsArray.push([computer[index], index]);
                                computer_pick_two = false;   
                                break; 
                        }
                       
                     }
                }
            }
            else{
                for(let index = 0; index< computer.length; index++){
                    if (canvasCardsArray.length == 0) {
                        computerCardsArray.push([computer[index], index]);
                        break;
                    }
    
                    
                    if (computer[index].style.display != "none" && !computer_pick_two ) {
                        for (let index1 = 0; index1 < player1Cards.length; index1++) {
                            if(computer[index].id == player1Cards[index1][2]){
                                
                                if (
                                    canvasCardsArray[canvasCardsArray.length-1].type == player1Cards[index][0] || 
                                    canvasCardsArray[canvasCardsArray.length-1].number == player1Cards[index][1]
                                    ) {
        
                                        computerCardsArray.push([computer[index], index]);
                                } 
                                else{
                                    
                                }
        
                            }
                        }
                        if(computer[index].id == "AD" || computer[index].id == "AS" || computer[index].id == "AF" || computer[index].id == "AH"){
                            computerCardsArray.push([computer[index], index]);
                        }
                     }
                    
                     
                }
            }
            
            
           
            if(computerCardsArray.length == 0){
                computer_pick_move();
            }
            else{
                for (let index = 0; index < computerCardsArray.length; index++) {
                    if (computerCardsArray[index][0].id == "JD" || computerCardsArray[index][0].id == "JS" || computerCardsArray[index][0].id == "JF" || computerCardsArray[index][0].id == "JH") {
                       playerTemp = computerCardsArray[index];
                       break;
                    } 
                    else if(computerCardsArray[index][0].id == "8D" || computerCardsArray[index][0].id == "8S" || computerCardsArray[index][0].id == "8F" || computerCardsArray[index][0].id == "8H") {
                        playerTemp = computerCardsArray[index];
                        break;
                    } 
                    else{
                        if (playerTemp.length == 0 && (computerCardsArray.length - 1) == index) {
                            playerTemp = computerCardsArray[0];
                            break;
                        }
                    }
                }
                player = player1[playerTemp[1]];

                computerCardsArray = []
            }
            

        }

        if (player1Turn && playerTemp[0].style.display != "none") {
            
            computer_turn(player, playerTemp[0], player1Cards); 
            

            if (playerTemp[0].style.display == "none") {
                not_choice_a();
                
                setTimeout(() => {
                   leon(computer, "Computer");    
                }, 1000);

                if (canvasCardsArray[canvasCardsArray.length - 1].number == 5 && canvasCardsArray[canvasCardsArray.length - 1].type == sideCard[0][0]) {
                    calculate_results();       
                }
                else if (
                    canvasCardsArray[canvasCardsArray.length-1].id == "JH" || canvasCardsArray[canvasCardsArray.length-1].id == "JS" || 
                    canvasCardsArray[canvasCardsArray.length-1].id == "JF" || canvasCardsArray[canvasCardsArray.length-1].id == "JD"
                ) {
                   player1Turn = true; 

                   setTimeout(() => {
                       leon(computer, "Computer");    
                   }, 1000);

                   setTimeout(()=> {
                       computer_move();
                    }
                    ,500);
                }
                else if (
                    canvasCardsArray[canvasCardsArray.length-1].id == "8H" || canvasCardsArray[canvasCardsArray.length-1].id == "8S" || 
                    canvasCardsArray[canvasCardsArray.length-1].id == "8F" || canvasCardsArray[canvasCardsArray.length-1].id == "8D"
                ) {
                    player1Turn = true;

                    setTimeout(() => {
                        leon(computer, "Computer");    
                     }, 1000);

                    setTimeout(()=> {
                       computer_move();
                    }
                    ,500);
                }
                else if (
                    canvasCardsArray[canvasCardsArray.length-1].id == "AH" || canvasCardsArray[canvasCardsArray.length-1].id == "AS" || 
                    canvasCardsArray[canvasCardsArray.length-1].id == "AF" || canvasCardsArray[canvasCardsArray.length-1].id == "AD"
                ) {
                         
                        setTimeout(() => {
                            leon(computer, "Computer");    
                        }, 1000);
                     
                        computer_choice_a();
                        player1Turn = false;
                }
                else if (
                    canvasCardsArray[canvasCardsArray.length-1].id == "2H" || canvasCardsArray[canvasCardsArray.length-1].id == "2S" || 
                    canvasCardsArray[canvasCardsArray.length-1].id == "2F" || canvasCardsArray[canvasCardsArray.length-1].id == "2D"
                ) {

                   
                    for (let index = 0; index < player2.length; index++) {
                        if(player2[index].style.display != "none"){
                            if (
                                player2[index].id == "2H" || player2[index].id == "2S" ||
                                player2[index].id == "2F" || player2[index].id == "2D" 
                                ) {
                                    pick_two = true;
                            }
                        }   
                    }

                    if(pick_two){
                        player1Turn = false;

                    }
                    else{
                        setTimeout(() => {
                            pick_card(player2Cards, player2, "player2", document.getElementById("player2Cards"));  
                       }, 500);
                        
                       setTimeout(() => {
                          pick_card(player2Cards, player2, "player2", document.getElementById("player2Cards"));  
                       }, 500);

                        player2Count++;
                        player2Count++;

                        setTimeout(() => {
                            leon(computer, "Computer");    
                         }, 1000);

                        setTimeout(()=> {
                            computer_move();
                        }
                        ,500);
                    }
                    
                    
                }
                else{
                    player1Turn = false;
                }


            }
                
                
        }

}

// remove choice function 
function not_choice_a(){
    if (isChoice) {
        isChoice = false;
        document.querySelector(".choice").style.display = "none"; 

        for (let index = 0; index < choiceArray.length; index++) {
            choiceArray[index].style.display = "block";   
        }
    }
}

// player choice function 
function choice_a() {
    if (player2.length != 0) {
        document.querySelector(".choice").style.display = "grid";

        choiceArray.forEach(element => {
            element.addEventListener("click", ()=>{
                canvasCardsArray[canvasCardsArray.length-1].type = element.id;
                for (let index = 0; index < choiceArray.length; index++) {
                    choiceArray[index].style.display = "none";   
                }
                element.style.display = "block";
                player1Turn = true;
                setTimeout(()=> {
                computer_move();
                }
                ,500);
                isChoice = true;
            })
        });
    }
    else{
      leon(player2, you);
    }
    
}



// computer choice 
function computer_choice_a(){
    document.querySelector(".choice").style.display = "grid";
    for (let index = 0; index < choiceArray.length; index++) {
        choiceArray[index].style.display = "none";   
    }
    let x;
    if (computer.length != 0) {
        for (let index = 0; index < computer.length; index++) {
            if(computer[index].style.display != "none"){
               x = player1Cards[index][0];
               break;
            }
            
        }
        choiceArray[x].style.display = "block";
        canvasCardsArray[canvasCardsArray.length-1].type = x;
        player1Turn = false;
        isChoice = true;
    }
    else{
        leon(computer, "Computer");
    }
    
}


// winner function 
function leon(players, name) {
    var sign = true;
    for (let index = 0; index < players.length; index++) {
        if(players[index].style.display != "none"){
            sign = false;
            break; 
        }    
    }

    if(sign){
        document.querySelector(".cover").style.display = "grid";
        let me;
        me = you == "You Have" ? " Won" : " Has Won";
        document.querySelector("#message").innerText = name + me;
    }
}


// clearing the canvas 
function clear_canvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


// play cars to the canvas 
function draw_image (image, x, y) {
   ctx.shadowOffsetX = 2;
   ctx.shadowOffsetY = 2;
   ctx.shadowColor = '#aaaba9';
   ctx.shadowBlur = 15;
   ctx.drawImage(image, x, y, 70, 90);
}



// function display cards to the canvas 
function draw_canvas(){
    clear_canvas();

    for (let index = 0; index < canvasCardsArray.length; index++) {
        draw_image(canvasCardsArray[index].image, canvasCardsArray[index].x, canvasCardsArray[index].y);    
    }
}
