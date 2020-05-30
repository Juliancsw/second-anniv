var divs = document.getElementById("puzzle").getElementsByTagName("div");
var completeButton = document.getElementById("complete");
var moves = 0;
var fixed = false;
var secret = 0;

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
        Thank you for being such a wonderful partner in the last two years.\
        It has truly been my honour to be able to be journey through life's ups and downs together with you.\
        Looking back, I am truly amazed at the entire journey that we have come together, from meeting in MapleStory,\
        questing together, becoming closer friends, till eventually having feelings for one another.\
        Subsequently, we journeyed through another year of praying and consideration whether to enter a relationship.\
        After a brief exploration and getting together, we then finally got together. Our first few months were\
        so exciting, yet also challenging, figuring out expectations in a relationship and learning how to relate\
        to one another. Fast forward a couple of years, I think we have definitely grown in leaps and bounds in our\
        relationship and that we are now even looking towards getting engaged and married. I feel really blessed\
        to have you in my life and am excited to continue journeying with you in the days to come.\
        Even through all the years, you still feel like home, more than ever, and I hope that you\
        enjoy this little card that I have made for you and that it will bring you joy. I love you sweetheart.<br/><br/>\
        With love,<br/> Julian Chan<br/>"
    }

    displayMessage(message)
}

function displayMessage(message){
    var messageDiv = document.getElementById("message")
    messageDiv.innerHTML = message
}

function checkSecret(){
    switch(secret){
        case 4:
        case 3:
        case 2:
        case 1:
        case 0:
            this.index == 2 ? secret++ : secret=0;
            break;
        case 5:
            this.index == 1 ? secret++ : secret=0;
            break;
        case 6:
            this.index == 3 ? secret++ : secret=0;
            break;
        case 7:
            this.index == 4 ? secret++ : secret=0;
            break;
        case 8:
            this.index == 5 ? secret++ : secret=0;
            break;
        case 9:
            this.index == 6 ? secret++ : secret=0;
            break;
        case 10:
            this.index == 7 ? secret++ : secret=0;
            break;
        case 11:
            if(this.index == 8){
                message = atob("V2lsbCB5b3UgbWFycnkgbWU/");
                displayMessage(message)
            }else{
                secret = 0;
            }
            break;
    }
}