let myQuizzesSent = [];
let quizz = {};
let qttQuestions = 0;
let correctAnswers = 0;
let myQuizz = {
                title: "",
                image: "",
                questions: [],
                levels: []};

function loadPage(){
    qttQuestions = 0;
    const quizzesSerialized = localStorage.getItem("quizzes");
    myQuizzesSent = JSON.parse(quizzesSerialized);
    const initialPage = document.querySelector(".initialPage");

    if(myQuizzesSent.length == 0){
        console.log("oi")
        initialPage.innerHTML = `
            <div class="header">
                <h1>BuzzQuizz</h1>
            </div>
    
            <div class="page">
                <div class="myQuizzes empty"></div>
                    <h2>All Quizzes</h2>
                    <div class="allQuizzes"> 
                </div>
            </div>
        `;
    }else {
       
        initialPage.innerHTML = `
            <div class="header">
                <h2>BuzzQuizz</h2>
            </div>
    
            <div class="page">
                <div class="createMyQuizzes">
                    <h2>My Quizzes</h2>
                    <div class="btnCreate" onclick="createQuizz()">
                    <img src="./img/Vector.png">
                    </div>
                </div>
                <div class="myQuizzes"></div>
                    <h2>All Quizzes</h2>
                    <div class="allQuizzes"> 
                </div>
            </div>
        `;
    }
    getQuizzes();
    scrollPage(document.querySelector(".header"));
}

function getQuizzes(){
    const promise = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
    promise.then(loadQuizzes);
}

function loadQuizzes(response){
    const quizzes = response.data;

    if(myQuizzesSent == null || myQuizzesSent.length == 0){
        
        myQuizzesSent = [];
        myQuizzesEmpty();
        loadAllQuizzes(quizzes);
    }else {
        loadMyQuizzes(quizzes);
        loadAllQuizzes(quizzes);
    }
}

function myQuizzesEmpty(){
    const myQuizzes = document.querySelector(".myQuizzes");
    myQuizzes.classList.add("empty");
    myQuizzes.innerHTML = `
        <h2>You haven't created</h2>
        <h2>a quizz yet :(</h2>
        <button class="createQuizz" onclick="createQuizz()">Criate a Quizz</button>
    `;
}

function loadMyQuizzes(quizzes){
    for(let i = 0; i < quizzes.length; i++){
        let sameQuizz = false;
        for(let j = 0; j < myQuizzesSent.length; j++){
            if(quizzes[i].id === myQuizzesSent[j].id){
                sameQuizz = true;
            }
        }
        if(sameQuizz){
            const myQuizzes = document.querySelector(".myQuizzes");
            myQuizzes.classList.remove("empty");
            myQuizzes.innerHTML += `
                <div class="quizz" id="${quizzes[i].id}" onclick="getQuizzById(${quizzes[i].id}, accessQuizz)">
                    <div class="imgQuizz">
                        <div class="gradient"></div>
                        <img src="${quizzes[i].image}">
                    </div>
                    <h2>${quizzes[i].title}</h2>
                </div>
            `;
        }
    }
}

function loadAllQuizzes(quizzes){
    for(let i = 0; i < quizzes.length; i++){
        let sameQuizz = false;
        for(let j = 0; j < myQuizzesSent.length; j++){
            if(quizzes[i].id === myQuizzesSent[j].id){
                sameQuizz = true;
            }
        }
        if(!sameQuizz){
            const allQuizzes = document.querySelector(".allQuizzes");
            allQuizzes.innerHTML += `
                <div class="quizz" id="${quizzes[i].id}" onclick="getQuizzById(${quizzes[i].id}, accessQuizz)">
                    <div class="imgQuizz">
                        <div class="gradient"></div>
                        <img src="${quizzes[i].image}">
                    </div>
                    <h2>${quizzes[i].title}</h2>
                </div>
            `;
        }
    }
}

function createQuizz(){
    const createQuizz = document.querySelector(".initialPage");
    createQuizz.innerHTML = `
        <div class="header">
            <h1>BuzzQuizz</h1>
        </div>

        <div class="pageCreateQuizz">
            <h2>Start from the beggining</h2>
            <div class="quizzDetails">
                <input type="text" placeHolder="Quizz title" class="quizzTitle">
                <input type="text" placeHolder="Image URL" class="quizzImgURL">
                <input type="text" placeHolder="How many questions?" class="quizzQuestions">
                <input type="text" placeHolder="How many levels?" class="quizzLevels">
            </div>
            <button class="btnCreateQuizz" onclick="createQuestions()">Create questions</button>
        </div>
    `;
}

function createQuestions(){
    let questions = "";
    if(validateCreateQuizz()){
        for(let i = 2; i <= myQuizz.questions.length; i++){
            questions += `
                    <div class="otherQuestions q${i}">
                        <h2>Question ${i}</h2>
                        <ion-icon name="create-outline" onclick="createAnotherQuestion(this)" class="q${i}"></ion-icon>
                    </div>
                        `;
        }

        const createQuizz = document.querySelector(".initialPage");
        createQuizz.innerHTML = `
            <div class="header">
                <h1>BuzzQuizz</h1>
            </div>
    
            <div class="pageCreateQuestions">
                <h2>Create your questions</h2>
                <div class="quizzDetails q1">
                    <h2>Question 1</h2>
                    <input type="text" placeHolder="Question" class="quizzQuestion q1">
                    <input type="text" placeHolder="Background color for the question" class="quizzBckColor q1">
    
                    <h2>Correct answer</h2>
                    <input type="text" placeHolder="Correct answer" class="quizzCorrectAnswer q1">
                    <input type="text" placeHolder="Image URL" class="quizzCorrectAnswerURL q1">
    
                    <h2>Incorret answers</h2>
                    <input type="text" placeHolder="Incorrect answer 1" class="quizzIncorrectAnswer1 q1">
                    <input type="text" placeHolder="Image URL" class="quizzIncorrectAnswer1URL q1">
                    <br>
                    <input type="text" placeHolder="Incorrect answer 2" class="quizzIncorrectAnswer2 q1">
                    <input type="text" placeHolder="Image URL" class="quizzIncorrectAnswer2URL q1">
                    <br>
                    <input type="text" placeHolder="Incorrect answer 3" class="quizzIncorrectAnswer3 q1">
                    <input type="text" placeHolder="Image URL" class="quizzIncorrectAnswer3URL q1">
                    <br>
    
                </div>

                ${questions}

                <button class="btnCreateLevels" onclick="createLevels()">Create levels</button>
            </div>
            `;

        scrollPage(document.querySelector(".header"));
    } 
}

function createAnotherQuestion(question){
    let questionNumber = question.classList[0].substring(1);
    const createQuestion = document.querySelector(`.otherQuestions.q${questionNumber}`);
    createQuestion.classList.remove("otherQuestions");
    createQuestion.classList.add("quizzDetails");
    createQuestion.innerHTML = `
        <h2>Question ${questionNumber}</h2>
        <input type="text" placeHolder="Question" class="quizzQuestion q${questionNumber}">
        <input type="text" placeHolder="Background color for the question" class="quizzBckColor q${questionNumber}">
    
        <h2>Correct answer</h2>
        <input type="text" placeHolder="Correct answer" class="quizzCorrectAnswer q${questionNumber}">
        <input type="text" placeHolder="Image URL" class="quizzCorrectAnswerURL q${questionNumber}">
    
        <h2>Incorret answers</h2>
        <input type="text" placeHolder="Incorrect answer 1" class="quizzIncorrectAnswer1 q${questionNumber}">
        <input type="text" placeHolder="Image URL" class="quizzIncorrectAnswer1URL q${questionNumber}">
        <br>
        <input type="text" placeHolder="Incorrect answer 2" class="quizzIncorrectAnswer2 q${questionNumber}">
        <input type="text" placeHolder="Image URL" class="quizzIncorrectAnswer2URL q${questionNumber}">
        <br>
        <input type="text" placeHolder="Incorrect answer 3" class="quizzIncorrectAnswer3 q${questionNumber}">
        <input type="text" placeHolder="Image URL" class="quizzIncorrectAnswer3URL q${questionNumber}">
        <br>           
        `;   

        scrollPage(document.querySelector(`.q${questionNumber}.quizzDetails`));
}

function createLevels(){
    let flag = true;
    let levels = "";
    validateAllQuestionsFilled();
    for(let i = 1; i <= myQuizz.questions.length; i++){
        let question = "q" + i;
        if(!validateCreateQuestions(question)){
            flag = false;
        }
    }
    if(flag){
        for(let i = 2; i <= myQuizz.levels.length; i++){
            levels += `
                    <div class="otherLevels l${i}">
                        <h2>Level ${i}</h2>
                        <ion-icon name="create-outline" onclick="createAnotherLevel(this)" class="l${i}"></ion-icon>
                    </div>
                        `;
        }

        const createQuizz = document.querySelector(".initialPage");
        createQuizz.innerHTML = `
            <div class="header">
                <h1>BuzzQuizz</h1>
            </div>
    
            <div class="pageCreateLevels">
                <h2>Now, tell us the levels</h2>
                <div class="quizzDetails l1">
                    <h2>Level 1</h2>
                    <input type="text" placeHolder="Level title" class="quizzLevelTitle l1">
                    <input type="text" placeHolder="minimum hit %" class="quizzPctMinimum l1">
                    <input type="text" placeHolder="Image URL" class="quizzLevelURL l1">
                    <input type="text" placeHolder="Level description" class="quizzLevelDescription l1">
                    <br>
    
                </div>
    
                ${levels}
    
                <button class="btnFinalizeQuizz" onclick="finalizeQuizz()">Finalize Quizz</button>
            </div>
        `;

        scrollPage(document.querySelector(`.header`)); 
    }
}

function createAnotherLevel(level){
    let levelNumber = level.classList[0].substring(1);
    
        const createLevel = document.querySelector(`.otherLevels.l${levelNumber}`);
        createLevel.classList.remove("otherLevels");
        createLevel.classList.add("quizzDetails");
        createLevel.innerHTML = `   
            <h2>Level ${levelNumber}</h2>
            <input type="text" placeHolder="Level title" class="quizzLevelTitle l${levelNumber}">
            <input type="text" placeHolder="minimum hit %" class="quizzPctMinimum l${levelNumber}">
            <input type="text" placeHolder="Image URL" class="quizzLevelURL l${levelNumber}">
            <input type="text" placeHolder="Level description" class="quizzLevelDescription l${levelNumber}">
            <br>         
        `;

        scrollPage(document.querySelector(`.quizzLevelTitle.l${levelNumber}`)); 
}

function finalizeQuizz(){
    let flag = true;
    validateAllLevelsFilled();
    for(let i = 1; i <= myQuizz.levels.length; i++){
        let level = "l" + i;
        if(!validateCreateLevels(level)){
            flag = false;
        }
    }

    if(flag){
        sendQuizz();
        
    }    
}

function finalizedQuizz(response){
    myQuizzesSent.push(response.data);
    const quizzesSerialized = JSON.stringify(myQuizzesSent); 
    localStorage.setItem("quizzes", quizzesSerialized);
    getQuizzById(response.data.id, loadFinalizedQuizz);    
}

function loadFinalizedQuizz(){
    const quizz = myQuizzesSent[myQuizzesSent.length - 1];
    const createdQuizz = document.querySelector(".initialPage");
        createdQuizz.innerHTML = `
            <div class="header">
                <h1>BuzzQuizz</h1>
            </div>

            <div class="pageFinalizedQuizz">
                <h2>Your quizz is ready!</h2>

                <div class="finalizedQuizz">
                    <div class="imgFinalizedQuizz">
                        <div class="finalizedGradient"></div>
                        <img src="${quizz.image}">
                    </div>
                    <h2>${quizz.title}</h2>
                </div>

                <button class="btnRetakeTest" onclick="getQuizzById(${quizz.id}, accessQuizz)">Access Quizz</button>

                <div class="btnBackToHome" onclick="loadPage()">Back to home</div>

            </div>
        `;

        scrollPage(document.querySelector(`.header`)); 
}

function accessQuizz(response){
    correctAnswers = 0;
    qttQuestions = 0;
    quizz = response.data;
    let questions = "";

    for(let i = 0; i < quizz.questions.length; i++){
        questions += `
        <div class="questions q${i + 1}">
            <div class="question" style="background-color:${quizz.questions[i].color}">
                <p>${quizz.questions[i].title}</p>
            </div>
            <div class="answersQuestion">
                <div class="first">
                    <div class="options q${i + 1} ${quizz.questions[i].answers[0].isCorrectAnswer}" onclick="selectAnswer(${quizz.questions[i].answers[0].isCorrectAnswer}, this, 'q${i + 1}', ${quizz.questions.length})">
                        <div class="img">
                            <img src="${quizz.questions[i].answers[0].image}">
                        </div>
                        <h2>${quizz.questions[i].answers[0].text}</h2>
                    </div>
                    <div class="options q${i + 1} ${quizz.questions[i].answers[1].isCorrectAnswer}" onclick="selectAnswer(${quizz.questions[i].answers[1].isCorrectAnswer}, this, 'q${i + 1}', ${quizz.questions.length})">
                        <div class="img">
                            <img src="${quizz.questions[i].answers[1].image}">
                        </div>
                        <h2>${quizz.questions[i].answers[1].text}</h2>
                    </div>
                </div>
                <div class="second">
                    <div class="options q${i + 1} ${quizz.questions[i].answers[2].isCorrectAnswer}" onclick="selectAnswer(${quizz.questions[i].answers[2].isCorrectAnswer}, this, 'q${i + 1}', ${quizz.questions.length})">
                        <div class="img">
                            <img src="${quizz.questions[i].answers[2].image}">
                        </div>
                        <h2>${quizz.questions[i].answers[2].text}</h2>
                    </div>
                    <div class="options q${i + 1} ${quizz.questions[i].answers[3].isCorrectAnswer}" onclick="selectAnswer(${quizz.questions[i].answers[3].isCorrectAnswer}, this, 'q${i + 1}', ${quizz.questions.length})">
                        <div class="img">
                            <img src="${quizz.questions[i].answers[3].image}">
                        </div>
                        <h2>${quizz.questions[i].answers[3].text}</h2>
                    </div>
                </div>
            </div>
        </div>
        `;
    }

    const initialPage = document.querySelector(".initialPage");
    initialPage.innerHTML = `
        <div class="header">
            <h1>BuzzQuizz</h1>
        </div>

        <div class="pageAccessQuizz">
            <div class="selectedQuizz">
                <div class="imgQuizzSelected">
                    <img src="${quizz.image}">
                </div>
                <h2>${quizz.title}</h2>
            </div>

            ${questions}

            <div class="result hidden">
                <div class="messageResult"></div>
                <div class="imgResult"></div>
                <div class="textResult"></div>
                <h2></h2>
            </div>

            <button class="btnRetakeTest hidden" onclick="getQuizzById(${quizz.id}, accessQuizz)">Retake Quizz</button>

            <button class="btnBackToHome" onclick="loadPage()">Back to home</button>

        </div>
    `;
    scrollPage(document.querySelector(".selectedQuizz"));
}

function selectAnswer(isCorrectAnswer, div, questionNumber){
    question = "." + questionNumber;
    if(isCorrectAnswer){
        div.classList.add("correctAnswer");
        let divQuestion = document.querySelectorAll(`${question}`);

        for(let i = 0; i < divQuestion.length; i++){
            if(divQuestion[i].classList.contains("false")){
                divQuestion[i].classList.add("wrongAnswer");
            }
        }
        correctAnswers++;
        qttQuestions++;
    }else {
        div.classList.add("wrongAnswer");
        let divQuestion = document.querySelectorAll(`${question}`);

        for(let i = 0; i < divQuestion.length; i++){
            if(divQuestion[i].classList.contains("true")){
                divQuestion[i].classList.add("correctAnswer");
            }else {
                divQuestion[i].classList.add("wrongAnswer");
            }
        }
        qttQuestions++;
    }

    if(quizz.questions.length - 1 >= qttQuestions){
        question = "q" + parseInt(questionNumber[1]) + 1;
        number = parseInt(questionNumber[1]);
        scrollPage(document.querySelector(`.questions.q${number + 1}`));
    }

    if(quizz.questions.length == qttQuestions){
        const button = document.querySelector(".btnRetakeTest");
        button.classList.remove("hidden");

        const result = document.querySelector(".result");
        result.classList.remove("hidden");
        
        loadResult();
        scrollPage(document.querySelector(`.imgResult`));
    }
}

function loadResult(){
    let titleLevel = "";
    let textLevel = "";
    let imageLevel = "";
    const percentageCorrectAnswers = calculateResult();
    for(let i = 0; i < quizz.levels.length; i++){
        if(quizz.levels[i].minValue <= percentageCorrectAnswers){
            titleLevel = quizz.levels[i].title;
            textLevel = quizz.levels[i].text;
            imageLevel = quizz.levels[i].image;
        }
    }
    const messageResult = document.querySelector(".messageResult");
    messageResult.innerHTML = `
        ${percentageCorrectAnswers}% de acerto: ${titleLevel}
    `;

    const imageResult = document.querySelector(".imgResult");
    imageResult.innerHTML = `
        <img src="${imageLevel}">
    `;

    const textResult = document.querySelector(".textResult");
    textResult.innerHTML = `
        <h2>${textLevel}</h2>
    `;
}

function calculateResult(){
    const percentageCorrectAnswers = Math.round((correctAnswers/qttQuestions)*100);
    return percentageCorrectAnswers;
}

function sendQuizz(){
    const promise = axios.post('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes', myQuizz);
    promise.then(finalizedQuizz)
}

function getQuizzById(id, metodo){
    const promise = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`);
    promise.then(metodo);
}

function loadQuizzById(responseQuizz){
    quizz = responseQuizz.data;
    accessQuizz(quizz);
}

function validateCreateQuizz(){
    const quizzTitle = document.querySelector(".quizzTitle").value;
    const quizzImgURL = document.querySelector(".quizzImgURL").value;
    const quizzQuestions = document.querySelector(".quizzQuestions").value;
    const quizzLevels = document.querySelector(".quizzLevels").value;
    
    let msgErrorTitle = "";
    let msgErrorURL = "";
    let msgErrorQuestions = "";
    let msgErrorLevels = "";

    if(quizzTitle.length < 20 || quizzTitle > 65){
        msgErrorTitle = "The title should be at least 20 characters long and a maximum of 65 characters long"
    }

    if(!/^(ftp|http|https):\/\/[^ "]+$/.test(quizzImgURL)){
        msgErrorURL = "You should inform a valid URL"
    }

    if(quizzQuestions.length == 0 || parseInt(quizzQuestions) < 3){
        msgErrorQuestions = "Your Quizz should have at least 3 questions"
    }
    
    if(quizzLevels.length == 0 || parseInt(quizzLevels) < 2){
        msgErrorLevels = "Your Quizz should have at least 2 levels"
    }

    if(msgErrorTitle !== "" || msgErrorURL !== "" || msgErrorQuestions !== "" || msgErrorLevels !== ""){
        const createQuizz = document.querySelector(".initialPage");
        createQuizz.innerHTML = `
            <div class="header">
                <h1>BuzzQuizz</h1>
            </div>
    
            <div class="pageCreateQuizz">
                <h2>Start from the beggining</h2>
                <div class="quizzDetails">
                    <p class="msgError">${msgErrorTitle}</p>
                    <input type="text" placeHolder="Quizz title" class="quizzTitle">
                    <p class="msgError">${msgErrorURL}</p>
                    <input type="text" placeHolder="Image URL" class="quizzImgURL">
                    <p class="msgError">${msgErrorQuestions}</p>
                    <input type="text" placeHolder="How many questions?" class="quizzQuestions">
                    <p class="msgError">${msgErrorLevels}</p>
                    <input type="text" placeHolder="How many levels?" class="quizzLevels">
                </div>
                <button class="btnCreateQuizz" onclick="createQuestions()">Create questions</button>
            </div>
        `;
        document.querySelector(".quizzTitle").value = quizzTitle;
        document.querySelector(".quizzImgURL").value = quizzImgURL;
        document.querySelector(".quizzQuestions").value = quizzQuestions;
        document.querySelector(".quizzLevels").value = quizzLevels;

    }

    if(msgErrorLevels == "" && msgErrorQuestions == "" && msgErrorTitle == "" && msgErrorURL == ""){
        myQuizz.title = quizzTitle;
        myQuizz.image = quizzImgURL;
        myQuizz.questions.length = quizzQuestions;
        myQuizz.levels.length = quizzLevels;

        return true;
    }
}

function validateCreateQuestions(questionNumber){
    const quizzQuestion = document.querySelector(`.quizzQuestion.${questionNumber}`).value;
    const quizzBckColor = document.querySelector(`.quizzBckColor.${questionNumber}`).value;
    const quizzCorrectAnswer = document.querySelector(`.quizzCorrectAnswer.${questionNumber}`).value;
    const quizzCorrectAnswerURL = document.querySelector(`.quizzCorrectAnswerURL.${questionNumber}`).value;
    const quizzIncorrectAnswer1 = document.querySelector(`.quizzIncorrectAnswer1.${questionNumber}`).value;
    const quizzIncorrectAnswer1URL = document.querySelector(`.quizzIncorrectAnswer1URL.${questionNumber}`).value;
    const quizzIncorrectAnswer2 = document.querySelector(`.quizzIncorrectAnswer2.${questionNumber}`).value;
    const quizzIncorrectAnswer2URL = document.querySelector(`.quizzIncorrectAnswer2URL.${questionNumber}`).value;
    const quizzIncorrectAnswer3 = document.querySelector(`.quizzIncorrectAnswer3.${questionNumber}`).value;
    const quizzIncorrectAnswer3URL = document.querySelector(`.quizzIncorrectAnswer3URL.${questionNumber}`).value;
    
    let msgErrorQuestion = "";
    let msgErrorBckColorL = "";
    let msgErrorCorrectAnswer = "";
    let msgErrorCorrectAnswerURL = "";
    let msgErrorIncorrectAnswer1 = "";
    let msgErrorIncorrectAnswer1URLL = "";
    let msgErrorIncorrectAnswer2 = "";
    let msgErrorIncorrectAnswer2URL = "";
    let msgErrorIncorrectAnswer3 = "";
    let msgErrorIncorrectAnswer3URL = "";
    
    if(quizzQuestion.length == 0 || quizzQuestion.length < 20){
        msgErrorQuestion = "The question should be at least 20 characters long"
    }

    if(quizzBckColor.length == 0 || !/^#([A-F0-9]{3,4}|[A-F0-9]{6}|[A-F0-9]{8})$/i.test(quizzBckColor)){
        msgErrorBckColorL = "Your color should be in the format #000000"
    }
    
    if(quizzCorrectAnswer.length == 0){
        msgErrorCorrectAnswer = "Your question should have an answer"
    }

    if(quizzCorrectAnswerURL.length == 0 || !/^(ftp|http|https):\/\/[^ "]+$/.test(quizzCorrectAnswerURL)){
        msgErrorCorrectAnswerURL = "You should inform a valid URL"
    }
    
    if(quizzIncorrectAnswer1.length == 0){
        msgErrorIncorrectAnswer1 = "Your question should have an answer"
    }

    if(quizzIncorrectAnswer1URL.length == 0 || !/^(ftp|http|https):\/\/[^ "]+$/.test(quizzIncorrectAnswer1URL)){
        msgErrorIncorrectAnswer1URLL = "You should inform a valid URL"
    }

    if(quizzIncorrectAnswer2.length == 0 && quizzIncorrectAnswer2URL.length != 0){
        msgErrorIncorrectAnswer2 = "Your question should have an answer"
    }
    
    if(quizzIncorrectAnswer2.length != 0 && (quizzIncorrectAnswer2URL.length == 0 || !/^(ftp|http|https):\/\/[^ "]+$/.test(quizzIncorrectAnswer2URL))){
        msgErrorIncorrectAnswer2URL = "You should inform a valid URL"
    }

    if(quizzIncorrectAnswer3.length == 0 && quizzIncorrectAnswer3URL.length != 0){
        msgErrorIncorrectAnswer3 = "Your question should have an answer"
    }

    if(quizzIncorrectAnswer3.length != 0 && (quizzIncorrectAnswer3URL.length == 0 || !/^(ftp|http|https):\/\/[^ "]+$/.test(quizzIncorrectAnswer3URL))){
        msgErrorIncorrectAnswer3URL = "You should inform a valid URL"
    }

    if(msgErrorQuestion !== "" || msgErrorBckColorL !== "" || msgErrorCorrectAnswer !== "" 
        || msgErrorCorrectAnswerURL !== "" || msgErrorIncorrectAnswer1 !== "" 
        || msgErrorIncorrectAnswer1URLL !== "" || msgErrorIncorrectAnswer2 !== "" 
        || msgErrorIncorrectAnswer2URL !== "" || msgErrorIncorrectAnswer3 !== "" 
        || msgErrorIncorrectAnswer3URL !== ""){
        const createQuestion = document.querySelector(`.quizzDetails.${questionNumber}`);
        createQuestion.innerHTML = `
            <h2>Question ${questionNumber[1]}</h2>
            <p class="msgError">${msgErrorQuestion}</p>
            <input type="text" placeHolder="Question" class="quizzQuestion ${questionNumber}">
            <p class="msgError">${msgErrorBckColorL}</p>
            <input type="text" placeHolder="Background color for the question" class="quizzBckColor ${questionNumber}">
            
            <h2>Correct answer</h2>
            <p class="msgError">${msgErrorCorrectAnswer}</p>
            <input type="text" placeHolder="Correct answer" class="quizzCorrectAnswer ${questionNumber}">
            <p class="msgError">${msgErrorCorrectAnswerURL}</p>
            <input type="text" placeHolder="Image URL" class="quizzCorrectAnswerURL ${questionNumber}">
            
            <h2>Incorret answers</h2>
            <p class="msgError">${msgErrorIncorrectAnswer1}</p>
            <input type="text" placeHolder="Incorrect answer 1" class="quizzIncorrectAnswer1 ${questionNumber}">
            <p class="msgError">${msgErrorIncorrectAnswer1URLL}</p>
            <input type="text" placeHolder="Image URL" class="quizzIncorrectAnswer1URL ${questionNumber}">
            <br>
            <p class="msgError">${msgErrorIncorrectAnswer2}</p>
            <input type="text" placeHolder="Incorrect answer 2" class="quizzIncorrectAnswer2 ${questionNumber}">
            <p class="msgError">${msgErrorIncorrectAnswer2URL}</p>
            <input type="text" placeHolder="Image URL" class="quizzIncorrectAnswer2URL ${questionNumber}">
            <br>
            <p class="msgError">${msgErrorIncorrectAnswer3}</p>
            <input type="text" placeHolder="Incorrect answer 3" class="quizzIncorrectAnswer3 ${questionNumber}">
            <p class="msgError">${msgErrorIncorrectAnswer3URL}</p>
            <input type="text" placeHolder="Image URL" class="quizzIncorrectAnswer3URL ${questionNumber}">
            <br>           
            `;    
        document.querySelector(`.quizzQuestion.${questionNumber}`).value = quizzQuestion;
        document.querySelector(`.quizzBckColor.${questionNumber}`).value = quizzBckColor;
        document.querySelector(`.quizzCorrectAnswer.${questionNumber}`).value = quizzCorrectAnswer;
        document.querySelector(`.quizzCorrectAnswerURL.${questionNumber}`).value = quizzCorrectAnswerURL;
        document.querySelector(`.quizzIncorrectAnswer1.${questionNumber}`).value = quizzIncorrectAnswer1;
        document.querySelector(`.quizzIncorrectAnswer1URL.${questionNumber}`).value = quizzIncorrectAnswer1URL;
        document.querySelector(`.quizzIncorrectAnswer2.${questionNumber}`).value = quizzIncorrectAnswer2;
        document.querySelector(`.quizzIncorrectAnswer2URL.${questionNumber}`).value = quizzIncorrectAnswer2URL;
        document.querySelector(`.quizzIncorrectAnswer3.${questionNumber}`).value = quizzIncorrectAnswer3;
        document.querySelector(`.quizzIncorrectAnswer3URL.${questionNumber}`).value = quizzIncorrectAnswer3URL;
    
    }

   if(msgErrorQuestion == "" && msgErrorBckColorL == "" && msgErrorCorrectAnswer == "" && msgErrorCorrectAnswerURL == ""
        && msgErrorIncorrectAnswer1 == "" && msgErrorIncorrectAnswer1URLL == "" && msgErrorIncorrectAnswer2 == ""
        && msgErrorIncorrectAnswer2URL == "" && msgErrorIncorrectAnswer3 == "" && msgErrorIncorrectAnswer3URL == ""){
            
        const question = {
            title: quizzQuestion,
            color: quizzBckColor,
            answers: [{
                text: quizzCorrectAnswer,
                image: quizzIncorrectAnswer1,
                isCorrectAnswer: true},
                {
                text: quizzIncorrectAnswer1,
                image: quizzIncorrectAnswer1URL,
                isCorrectAnswer: false
                }
            ]
        }
                
        let answer2 = {};
        let answer3 = {};
                            
        if(quizzIncorrectAnswer2 !== null){
            answer2 = {
                text: quizzIncorrectAnswer2,
                image: quizzIncorrectAnswer2URL,
                isCorrectAnswer: false
            }
                        
            question.answers.push(answer2);
        }
                    
        if(quizzIncorrectAnswer3 !== null){
            answer3 = {
                text: quizzIncorrectAnswer3,
                image: quizzIncorrectAnswer3URL,
                isCorrectAnswer: false
            }
                    
            question.answers.push(answer3);
        }

        question.answers.sort((a, b) => 0.5 - Math.random());
        myQuizz.questions[questionNumber[1] - 1] = question;
            
        return true;
    }
}

function validateAllQuestionsFilled(){
    const otherQuestions = document.querySelectorAll(".otherQuestions");

    if(otherQuestions.length !== 0){
        for(let i = 1; i < (myQuizz.questions.length - otherQuestions.length); i++){
            let question = "q" + (i);
            validateCreateQuestions(question);
        }

        for(let i = 0; i < otherQuestions.length; i++){
            
            const createQuizz = document.querySelector(`.otherQuestions`);
            createQuizz.classList.remove("otherQuestions");
            createQuizz.classList.add("quizzDetails");

            const question = createQuizz.classList[0];
            createQuizz.innerHTML = `
                <h2>Question ${question}</h2>
                <input type="text" placeHolder="Question" class="quizzQuestion ${question}">
                <input type="text" placeHolder="Background color for the question" class="quizzBckColor ${question}">
                
                <h2>Correct answer</h2>
                <input type="text" placeHolder="Correct answer" class="quizzCorrectAnswer ${question}">
                <input type="text" placeHolder="Image URL" class="quizzCorrectAnswerURL ${question}">
                
                <h2>Incorret answers</h2>
                <input type="text" placeHolder="Incorrect answer 1" class="quizzIncorrectAnswer1 ${question}">
                <input type="text" placeHolder="Image URL" class="quizzIncorrectAnswer1URL ${question}">
                <br>
                <input type="text" placeHolder="Incorrect answer 2" class="quizzIncorrectAnswer2 ${question}">
                <input type="text" placeHolder="Image URL" class="quizzIncorrectAnswer2URL ${question}">
                <br>
                <input type="text" placeHolder="Incorrect answer 3" class="quizzIncorrectAnswer3 ${question}">
                <input type="text" placeHolder="Image URL" class="quizzIncorrectAnswer3URL ${question}">
                <br>  
            `;
            validateCreateQuestions(question);
        }
    } else {
        
        
        return true;
    }
}

function validateCreateLevels(levelNumber){
    const quizz = document.querySelector(`.quizzDetails.${levelNumber}`).value;
    const quizzLevelTitle = document.querySelector(`.quizzLevelTitle.${levelNumber}`).value;
    const quizzPctMinimum = document.querySelector(`.quizzPctMinimum.${levelNumber}`).value;
    const quizzLevelURL = document.querySelector(`.quizzLevelURL.${levelNumber}`).value;
    const quizzLevelDescription = document.querySelector(`.quizzLevelDescription.${levelNumber}`).value;
    
    let msgErrorLevelTitle = "";
    let msgErrorPctMinimum = "";
    let msgErrorLevelURL = "";
    let msgErrorLevelDescription = "";
    
    if(quizzLevelTitle.length == 0 || quizzLevelTitle.length < 10){
        msgErrorLevelTitle = "The level should be at least 10 characters long"
    }

    if(quizzPctMinimum.length == 0 || parseInt(quizzPctMinimum) < 0 || parseInt(quizzPctMinimum) > 100){
        msgErrorPctMinimum = "Your value should be between 0 and 100"
    }
    
    if(quizzLevelURL.length == 0 || !/^(ftp|http|https):\/\/[^ "]+$/.test(quizzLevelURL)){
        msgErrorLevelURL = "You should inform a valid URL"
    }
    
    if(quizzLevelDescription.length == 0 || quizzLevelDescription.length < 30){
        msgErrorLevelDescription = "Your descriptiom should  be at least 30 characters long"
    }

    if(msgErrorLevelTitle !== "" || msgErrorPctMinimum !== "" || msgErrorLevelURL !== "" 
        || msgErrorLevelDescription !== "" ){
        const createLevel = document.querySelector(`.quizzDetails.${levelNumber}`);
        createLevel.innerHTML = `
            <h2>Level l${levelNumber[1]}</h2>
            <p class="msgError">${msgErrorLevelTitle}</p>
            <input type="text" placeHolder="Level title" class="quizzLevelTitle ${levelNumber}">
            <p class="msgError">${msgErrorPctMinimum}</p>
            <input type="text" placeHolder="minimum hit %" class="quizzPctMinimum ${levelNumber}">
            <p class="msgError">${msgErrorLevelURL}</p>
            <input type="text" placeHolder="Image URL" class="quizzLevelURL ${levelNumber}">
            <p class="msgError">${msgErrorLevelDescription}</p>
            <input type="text" placeHolder="Level description" class="quizzLevelDescription ${levelNumber}">
            <br>        
            `;    

        document.querySelector(`.quizzLevelTitle.${levelNumber}`).value = quizzLevelTitle;
        document.querySelector(`.quizzPctMinimum.${levelNumber}`).value = quizzPctMinimum;
        document.querySelector(`.quizzLevelURL.${levelNumber}`).value = quizzLevelURL;
        document.querySelector(`.quizzLevelDescription.${levelNumber}`).value = quizzLevelDescription;    
    }

   if(msgErrorLevelTitle == "" && msgErrorPctMinimum == "" && msgErrorLevelURL == "" && msgErrorLevelDescription == "" ){
        const level = {
                title: quizzLevelTitle,
                image: quizzLevelURL,
                text: quizzLevelDescription,
                minValue: quizzPctMinimum}
        
        myQuizz.levels[levelNumber[1] - 1] = level;
            
        return true;
    }
}

function validateAllLevelsFilled(){
    const otherLevels = document.querySelectorAll(".otherLevels");

    if(otherLevels.length !== 0){
        for(let i = 1; i < (myQuizz.levels.length - otherLevels.length); i++){
            let level = "l" + (i);
            validateCreateLevels(level);
        }

        for(let i = 0; i < otherLevels.length; i++){
            const createLevel = document.querySelector(`.otherLevels`);
            createLevel.classList.remove("otherLevels");
            createLevel.classList.add("quizzDetails");

            const level = createLevel.classList[0];
            createLevel.innerHTML = `
            <h2>Level ${level[1]}</h2>
            <input type="text" placeHolder="Level title" class="quizzLevelTitle ${level}">
            <input type="text" placeHolder="minimum hit %" class="quizzPctMinimum ${level}">
            <input type="text" placeHolder="Image URL" class="quizzLevelURL ${level}">
            <input type="text" placeHolder="Level description" class="quizzLevelDescription ${level}">
            <br> 
            `;
            validateCreateLevels(level);
        }
    } else {
        
        
        return true;
    }
}

function scrollPage(element){
    element.scrollIntoView();
}

loadPage();

