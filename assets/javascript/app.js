$(document).ready(function() {


            var options = [
                {
                    question: "What is the symbol of House Stark?",
                    choice:["Golden Lion", "Direwolf", "Falcon", "Kraken", "Dung Beetle"],
                    answer: 1,
                    photo: "assets/images/direwolf.gif"
                },

                {
                    question: "What is the name of Arya Stark's sword?",
                    choice:["Needle", "Heartsbane", "Big Poppa", "Longclaw", "Oathkeeper"],
                    answer: 0,
                    photo: "assets/images/arya.gif"
                },

                {
                    question: "In the Game of Thrones, how many dragons does Daenerys have?",
                    choice: ["42", "1", "two-fiddy", "3", "13"],
                    answer: 3,
                    photo: "assets/images/threedragons.gif"
                },

                {
                    question: "In the Game of Thrones, Jaime Lannister is known as the Kingslayer. Which king did he kill?",
                    choice: ["Joffrey Baratheon", "Mance Rayder", "Balon Greyjoy", "Robert Baratheon", "Aerys Targaryen"],
                    answer: 4,
                    photo: "assets/images/madking.gif"
                },

                {
                    question: "In the Game of Thrones it is revealed that Robert is not the father of Joffrey. Who is?",
                    choice: ["Ned Stark", "Euron Greyjoy", "Brad Pitt", "Jaime Lannister", "Petyr Baelish"],
                    answer: 3,
                    photo: "assets/images/jaimewave.gif"
                },

                {
                    question: "Children of the North who are bastards do not take the family name. What name do they often use?",
                    choice: ["Snow", "Sand", "Storm", "Hill", "Smith"],
                    answer: 0,
                    photo: "assets/images/jonsnow.gif"
                },

                {
                    question: "Besides dragonglass, what is the only other substance capable of defeating White Walkers?",
                    choice: ["Weirwood", "Wildfire", "Valyrian Steel", "Snowballs", "Robitussin"],
                    answer: 2,
                    photo: "assets/images/steel.gif"
                },

                {
                    question: "The phrase 'I drink and I know things' was uttered by which GOT character?",
                    choice: ["Cersei", "Tyrion", "Varys", "Lady Tyrell", "Dean Martin"],
                    answer: 1,
                    photo: "assets/images/tyrionpimp.gif"
                },

                {
                    question: "What is the nickname of Sandor Clegane?",
                    choice: ["The Mountain", "Little Finger", "The Hound", "The Waif", "The Nature Boy"],
                    answer: 2,
                    photo: "assets/images/houndchickens.gif"
                },

                {
                    question: "Who shot the flaming arrow that destroyed Stannis Baratheon's fleet in Blackwater Bay?",
                    choice: ["Tyrion Lannister", "King Joffrey", "Jaime Lannister", "Robin Hood", "Bronn"],
                    answer: 4,
                    photo: "assets/images/bronn.gif"
                }];



            var correctCount = 0;
            var wrongCount = 0;
            var unanswerCount = 0;
            var timer = 20;
            var intervalId;
            var userGuess ="";
            var running = false;
            var qCount = options.length;
            var pick;
            var index;
            var newArray = [];
            var holder = [];



            $("#reset").hide();
            //click start button to start game
            $("#start").on("click", function () {
                    $("#start").hide();
                    displayQuestion();
                    runTimer();
                    for(var i = 0; i < options.length; i++) {
                holder.push(options[i]);
            }
                })
            //timer start
            function runTimer(){
                if (!running) {
                intervalId = setInterval(decrement, 1000); 
                running = true;
                }
            }
            //timer countdown
            function decrement() {
                $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
                timer --;

                //stop timer if reach 0
                if (timer === 0) {
                    unanswerCount++;
                    stop();
                    $("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
                    hidepicture();
                }	
            }

            //timer stop
            function stop() {
                running = false;
                clearInterval(intervalId);
            }
            //randomly pick question in array if not already shown
            //display question and loop though and display possible answers
            function displayQuestion() {
                //generate random index in array
                index = Math.floor(Math.random()*options.length);
                pick = options[index];


            //iterate through answer array and display
            $("#questionblock").html("<h2>" + pick.question + "</h2>");
            for(var i = 0; i < pick.choice.length; i++) {
            var userChoice = $("<div>");
            userChoice.addClass("answerchoice");
            userChoice.html(pick.choice[i]);
            //assign array position to it so can check answer
            userChoice.attr("data-guessvalue", i);
            $("#answerblock").append(userChoice);
            }



            //click function to select answer and outcomes
            $(".answerchoice").on("click", function () {
                //grab array position from userGuess
                userGuess = parseInt($(this).attr("data-guessvalue"));

                //correct guess or wrong guess outcomes
                if (userGuess === pick.answer) {
                    stop();
                    correctCount++;
                    userGuess="";
                    $("#answerblock").html("<p>Correct!</p>");
                    hidepicture();

                } else {
                    stop();
                    wrongCount++;
                    userGuess="";
                    $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
                    hidepicture();
                }
            })
            }


            function hidepicture () {
                $("#answerblock").append("<img src=" + pick.photo + ">");
                newArray.push(pick);
                options.splice(index,1);

                var hidpic = setTimeout(function() {
                    $("#answerblock").empty();
                    timer= 20;

                //run the score screen if all questions answered
                if ((wrongCount + correctCount + unanswerCount) === qCount) {
                    $("#questionblock").empty();
                    $("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
                    $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
                    $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
                    $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
                    $("#reset").show();
                    correctCount = 0;
                    wrongCount = 0;
                    unanswerCount = 0;

                } else {
                    runTimer();
                    displayQuestion();

                }
                }, 3000);


            }

            $("#reset").on("click", function() {
                $("#reset").hide();
                $("#answerblock").empty();
                $("#questionblock").empty();
                for(var i = 0; i < holder.length; i++) {
                    options.push(holder[i]);
                }
                runTimer();
                displayQuestion();

})

})

