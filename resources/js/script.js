var playing = false;
var action;
var timeRemaining;
var score;
var correctAnswer;

function startButton() {   //if we click on the start/reset
    if (playing == true) { //if we are playing
        location.reload();  //reload the page
    } else { //if we are not playing
        playing = true;
        score = 0;
        document.getElementById('scorevalue').innerHTML = score;//set score to 0
        document.getElementById("startreset").innerHTML = 'Reset Game'; //change button text to reset
        show('timeremaining'); //show countdown box
        timeRemaining = 60;
        hide('gameOver');
        startCountdown();
        generateQA();
    }
}    

for(i=1; i<5; i++) {
    document.getElementById('box'+i).onclick = function(){
        if(playing==true){
            if(this.innerHTML == correctAnswer){
                score++;
                document.getElementById('scorevalue').innerHTML = score;
                hide('wrong');
                show('correct');
                setTimeout(function(){
                    hide('correct');
                }, 1000);
                generateQA();
            } else {
                hide('correct');
                show('wrong');
                setTimeout(function(){
                    hide('wrong');
                }, 1000);
            }
        }
    }
}

//start counter
function startCountdown() {
    action = setInterval(function(){
        timeRemaining--; document.getElementById('timeremainingvalue').innerHTML = timeRemaining;
        if(timeRemaining == 0) {
            stopCountdown();
            show('gameOver');
            document.getElementById('gameOver').innerHTML = "<p>Game Over</p><p>Your Score is " + score + "</p>"; 
            hide('timeremaining');
            hide('correct');
            hide('wrong');
            playing = false;
            document.getElementById('startreset').innerHTML = "Start Game";
        }
    }, 1000);
}

//stop counter
function stopCountdown(){
    clearInterval(action);
}

//hide element
function hide(id){
    document.getElementById(id).style.display = "none";
}

//show element
function show(id){
    document.getElementById(id).style.display = "block";
}

//generate question with multiple answers
function generateQA(){
    var x = 1 + Math.round(9*Math.random());
    var y = 1 + Math.round(9*Math.random());
    correctAnswer = x*y;
    document.getElementById('question').innerHTML = x + 'x' + y;
    var correctPosition = 1 + Math.round(3*Math.random());
    document.getElementById('box'+correctPosition).innerHTML = correctAnswer;

    //fill other boxes with wrong answers
    var answers = [correctAnswer];
    for(i=1; i<5; i++){
        if (i != correctPosition) {
            var wrongAnswer;
            do {
                wrongAnswer = (1 + Math.round(9*Math.random()))*(1 + Math.round(9*Math.random()));
            } while(answers.indexOf(wrongAnswer)>-1) 
            document.getElementById('box'+i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}