'use strict'

let questionNumber = 0;
let score=0; 


function startQuiz(){
    //this function will hide the start div and display the form div
    $('.startbutton').on('click', function (){
        $('.quizStart').hide();
        $('.questionAnswerForm').css('display','block');
        $('.questionNumber').text(1);
    });
}

function generateQuestion() {
    //this function will display the question and answer options
    if (questionNumber < questionsArray.length) {
        return `<form><fieldset>    
           
            <legend><h1>${questionsArray[questionNumber].question}</h1></legend>
            <p style="margin-bottom: 20px"><span class="alert hidden"> Please make a selection below:</span></p> 
            <label for="answer1" class="radioContainer">${questionsArray[questionNumber].answers[0]}
            <input type="radio" id="answer1" value="${questionsArray[questionNumber].answers[0]}" name="answer">
            <span class="circle"></span></label><br>

            <label for="answer2" class="radioContainer">${questionsArray[questionNumber].answers[1]}
            <input type="radio" id="answer2" value="${questionsArray[questionNumber].answers[1]}" name="answer">
            <span class="circle"></span></label><br>

            <label for="answer3" class="radioContainer ontop">${questionsArray[questionNumber].answers[2]}
            <input type="radio" id="answer3" value="${questionsArray[questionNumber].answers[2]}" name="answer">
            <span class="circle"></span></label><br>

            <label for="answer4" class="radioContainer">${questionsArray[questionNumber].answers[3]}
            <input type="radio" id="answer4" value="${questionsArray[questionNumber].answers[3]}" name="answer">
            <span class="circle"></span></label><br>    
            <button type="button" class="submitbutton">Submit</button> 
        </fieldset></form>   
        `;
    }
}

//render the questions Array in the DOM
function renderQuiz(){
        $('.questionAnswerForm').html(generateQuestion());
}

/*function enableSubmitButton(){
    $('input[name=answer]').on('click', function (event){
        $('.submitbutton').prop('disabled', false);
    })
}*/
function submitQuizAnswer() {
    $('.questionAnswerForm').on('click', '.submitbutton', function(event) {
        event.preventDefault();
        console.log(score);
        compareAnswer();
    });
}


function compareAnswer() {
    let selected= $('input[name=answer]:checked').val();
    console.log(selected);
    let rightChoice = questionsArray[questionNumber].correctAnswer;
        if (selected === rightChoice) {
            correctView();
            incrementQuestion();
            score++;
            $('.score').text(score);
        } else if ($('input[name=answer]:checked').length === 0) {
            $('.questionAnswerForm').find('span').removeClass('hidden');
        } else if (selected !== rightChoice) {
            wrongView();
            incrementQuestion();
        }
}

function correctView(){
    $('.questionAnswerForm').hide();
    $('.answerForm').css('display','flex');
    $('.answerForm').html(
        `<img src="${questionsArray[questionNumber].image}" alt="${questionsArray[questionNumber].alt}">
        <h1>Correct!</h1>
        <p>${questionsArray[questionNumber].description}</p>    
        <button type="button" class="nextQuestion">Next</button>`
    );

}

function wrongView(){
    $('.questionAnswerForm').hide();
    $('.answerForm').css('display','flex');
    $('.answerForm').html(
        `<img src="${questionsArray[questionNumber].image}" alt="${questionsArray[questionNumber].alt}">
        <h1>Sorry, you got it wrong.</h1>
        <p>${questionsArray[questionNumber].description}</p>    
        <button type="button" class="nextQuestion">Next</button>`
    );
}

function generateNextQuestion() {
    //this function will hide the start div and display the form div
    $('.answerForm').on('click', '.nextQuestion', function (event){
        event.preventDefault();
        if (questionNumber < questionsArray.length) {
        $('.answerForm').hide();
        $('.questionAnswerForm').css('display','block');
        $('.questionAnswerForm').html(generateQuestion());
        $('.questionNumber').text(questionNumber + 1);
        } else {
            if (score > 6) {
            $('.answerForm').css('display','block');
                highScore();
                startNewQuiz();
            } else {
                lowScore();
                startNewQuiz();
            }
        }      
    });
}

function highScore() {
    $('.answerForm').addClass('resultsPage').html(
        `<h1>Congratulations! You're a pro!</h1>
        <p>You got ${score} out of 9 answers.</p>
        <button type="button" class="startbutton">Start New Quiz</button>`
        );
}

function lowScore() {
    $('.answerForm').addClass('resultsPage').html(
        `<h1>You could learn more about Argentina.</h1>
        <p>You got ${score} out of 9</p>
        <button type="button" class="startbutton">Start New Quiz</button>`
        );
}

function startNewQuiz(){
    $('.answerForm').on('click', '.startbutton', function (event){
        location.reload();
    });
}

function incrementQuestion() {
        questionNumber++;
}

function handleQuiz(){
    startQuiz();
    renderQuiz();
    submitQuizAnswer();
    generateNextQuestion();
}

//when the page loads call handleQuiz
$(handleQuiz);