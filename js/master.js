var divs = document.getElementById("puzzle").getElementsByTagName("div");
var completeButton = document.getElementById("complete");
var moves = 0;
var fixed = false;
var secret = 0;
var interval = null;

initialize()

function initialize(){
    completeButton.onclick = checkComplete;
    
    for(var i = 0; i < divs.length; i++) {
        divs[i].position = i;
        divs[i].index = i;
        divs[i].onclick = getAdjacents;
    }
}

function getAdjacents() {
	if(!this.adjacents) {
		this.adjacents = {
			left: (!(this.position % 3)) ? null : divs[this.position-1],
			top: (this.position < 3) ? null : divs[this.position-3],
			right: ((this.position % 3) === 2) ? null : divs[this.position+1],
			bottom: (this.position > 5) ? null : divs[this.position+3]
		}
	}
	swapTiles.call(this);
}

function swapTiles(){
    var emptyTile = document.getElementById("empty-tile")
    for(var pos in this.adjacents) {
        if(this.adjacents[pos] !== null && this.adjacents[pos].position === emptyTile.position){
            var tempIndex = emptyTile.index

            emptyTile.index = this.index
            emptyTile.innerHTML = this.innerHTML
            emptyTile.removeAttribute("id")
            emptyTile.shifted = true;

            this.innerHTML = ""
            this.setAttribute("id", "empty-tile")
            this.index = tempIndex
            this.shifted = true;
        }
    }
    moves++;
}

function checkComplete(){
    var message = ""
    var helper = true;

    if(moves < 25){
        message = "Please make " + (25-moves) + " more moves"
        helper = false;
    }else{
        for(var i = 0; i < divs.length; i++) {
            if(divs[i].index != divs[i].position){
                message = "Puzzle is not fixed!"
                helper = false;
                break;
            } else if (divs[i].shifted != true) {
                message = "You have to move every single puzzle piece!"
                helper = false;
                break;
            }
        }
    }
    
    if(helper){
        fixed = true;
        for(var i = 0; i < divs.length; i++) {
            divs[i].onclick = checkSecret;
        }
        message = "Dear Lisha, <br/><br/>\
        Thank you for being such a wonderful partner in the last two years.It has <br/>\
        truly been my honour to be able to be journey through life's ups and downs <br/>\
        together with you. Looking back, I am truly amazed at the entire journey that <br/>\
        we have come together, from meeting in MapleStory, questing together, <br/>\
        becoming closer friends, till eventually having feelings for one another.<br/>\
        Subsequently, we journeyed through another year of praying and <br/>\
        consideration whether to enter a relationship. After a brief exploration <br/>\
        and getting together, we then finally got together. Our first few months were <br/>\
        so exciting, yet also challenging, figuring out expectations in a relationship <br/>\
        and learning how to relate to one another. Fast forward a couple of years, I <br/>\
        think we have definitely grown in leaps and bounds in our relationship and <br/>\
        that we are now even looking towards getting engag<span onclick='incrementSecret();'>e</span>d and married. I feel <br/>\
        really blessed to have you in my life and am excited to continue journeying <br/>\
        with you in the days to come. Even through all the years, you still feel like <br/>\
        home, more than ever, and I hope that you enjoy this little card that I have <br/>\
        made for you and that it will bring you joy. I love you sweetheart.<br/><br/>\
        With love,<br/> Julian Chan<br/>"
    }

    displayMessage(message)
}
function incrementSecret(){
    secret++;
    checkSecret();
}
function displayMessage(message){
    var messageDiv = document.getElementById("message")
    messageDiv.innerHTML = message
}

function checkLightUp(index, val){
    if(index == val){
        secret++;
        divs[index].style.backgroundColor = "yellow";
    }else{
        secret = 5;
        for(var i = 1; i < divs.length; i++) {
            divs[i].style.backgroundColor = "rebeccapurple";
        }
    }
}

function checkSecret(){
    var answer = "";
    switch(secret){
        case 3:
        case 2:
        case 1:
        case 0:
            this.index == 2 ? secret++ : secret=0;
            break;
        case 4:
            if(this.index == 2){
                message = "Tell me you love me within 15s (warm up hint: use the puzzle)"
                alert(message);
                interval = setInterval(function(){alert("Oops you took too long, please try again. " + message);secret=5;checkLightUp(-1,0)},15000);
                secret++;
            }else{
                secret = 0;
            }
        case 5:
            checkLightUp(this.index, 1)
            break;
        case 6:
            checkLightUp(this.index, 3)
            break;
        case 7:
            checkLightUp(this.index, 4)
            break;
        case 8:
            checkLightUp(this.index, 5)
            break;
        case 9:
            checkLightUp(this.index, 6)
            break;
        case 10:
            checkLightUp(this.index, 7)
            break;
        case 11:
            if(this.index == 8){
                divs[this.index].style.backgroundColor = "yellow";
                clearInterval(interval);
                message = "Good job solving the first puzzle, didn't even know there was a puzzle did you? When did we get together? (DD/MM/YYYY)"
                answer = prompt(message)
                while(answer != "31/05/2018"){
                    answer = prompt("Oops that was incorrect, please try again. " + message)
                }
                secret++;
                checkSecret();
            }else{
                secret = 5;
            }
            break;
        case 12:
            message = "Find the last letter of the fifth word of row 11 in the paragraph (small case)"
            answer = prompt(message)
            while(answer != "n"){
                answer = prompt("Oops that was incorrect, please try again. " + message)
            }
            secret++;
            checkSecret();
            break;
        case 13:
            message = "(n) Wow you've gotten this far. Find the sixth letter of the fifth last word of the fifth last row and click it (close this box first)"
            alert(message);
            interval = setInterval(function(){alert("Oops you took too long, please try again. " + message);},15000);
            break;
        case 14:
            clearInterval(interval);
            message = "(ne) Oh, you are getting good. Sixth last row, first letter, fourth word (small case)"
            answer = prompt(message)
            while(answer != "d"){
                answer = prompt("Oops that was incorrect, please try again. " + message)
            }
            secret++;
            checkSecret();
            break;
        case 15:
            message = "(ned) Don't go quitting on me now, you are almost there! 18th letter of the alphabet! (small case)"
            answer = prompt(message)
            while(answer != "r"){
                answer = prompt("Oops that was incorrect, please try again. " + message)
            }
            secret++;
            checkSecret();
            break;
        case 16:
            message = "(nedr) Good job! Sixth word of first row (small case)"
            answer = prompt(message)
            while(answer != "a"){
                answer = prompt("Oops that was incorrect, please try again. " + message)
            }
            secret++;
            checkSecret();
            break;
        case 17:
            message = "(nedra) Last one till your secret message! Tenth letter of the ninth row! (small case)"
            answer = prompt(message)
            while(answer != "g"){
                answer = prompt("Oops that was incorrect, please try again. " + message)
            }
            secret++;
            checkSecret();
            break;
        case 18:
            message = "Congratulations! Your secret message is (nedrag), read it backwards and meet me there :)"
            alert(message);
            interval = setInterval(function(){alert(message);},5000);
            break;
    }
}