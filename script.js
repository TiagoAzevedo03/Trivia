let n = new URLSearchParams(window.location.search).get("number");
let category = new URLSearchParams(window.location.search).get("category");
let url = "https://opentdb.com/api.php?amount=" + n + "&category=" + category;

const categories = {"9": "General Knowledge", "21": "Sports", "22": "Geography", "23": "History", "27": "Animals", "12": "Music", "15": "Video Games", "17": "Science", "19": "Maths"};
const title = document.getElementById("title");
title.textContent = "Trivia - " + categories[category]; 

/*category "Science: Computers" 
correct_answer: "Shellshock"
difficulty: "hard"
incorrect_answers: (3) ['Heartbleed', 'Bashbug', 'Stagefright']
question: "What was the name of the security vulnerability found in Bash in 2014?"
type: "multiple"*/

const questions = document.getElementById("questions");
let points = 0, id = 0, correct = [];


function calc() {
    for (let i = 0; i < id; i++) {
        let radio = document.querySelectorAll(`input[name="${i}"]:checked`);
        if (radio.length > 0 && correct[i] == radio[0].value){
            document.getElementById(`a${i}`).style.backgroundColor = 'green';
            points++;
        }
        else {
            document.getElementById(`a${i}`).style.backgroundColor = 'red';
        }
    }
    document.getElementById("result").textContent = points + "/" + n;
}

async function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

async function getQuestions(){
    const response = await fetch (url);
    const data = await response.json();

    data.results.forEach((question) => {
        let li = document.createElement("li");
		li.textContent = question.question;
        li.setAttribute("id", "a"+id);

        let form = document.createElement("form");
        form.setAttribute("id", "form");

        let q = 0;
        let array = [...question.incorrect_answers, question.correct_answer];
        shuffleArray(array);
        correct[id] = question.correct_answer;

        array.forEach((answer) => {
            let ans = document.createElement("input");
            ans.setAttribute("type", "radio");
            ans.setAttribute("id", q);
            ans.setAttribute("name", id)
            ans.setAttribute("value", answer);
            form.appendChild(ans);

            let label = document.createElement("label");
            label.setAttribute("for", q);
            label.textContent = answer;
            form.appendChild(label);

            form.appendChild(document.createElement("br"));

            q++;
        });

        li.appendChild(form);
        questions.appendChild(li);
        id++;
        
    });
}

getQuestions();