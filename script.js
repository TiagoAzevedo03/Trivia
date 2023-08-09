const url = "https://opentdb.com/api.php?amount=5"
/*category "Science: Computers" 
correct_answer: "Shellshock"
difficulty: "hard"
incorrect_answers: (3) ['Heartbleed', 'Bashbug', 'Stagefright']
question: "What was the name of the security vulnerability found in Bash in 2014?"
type: "multiple"*/

const questions = document.getElementById("questions");
let points = 0, id = 0;
let correct = [];

function calc() {
    console.log("Inicio: " + points);
    for (let i = 0; i < id; i++) {
        let radio = document.querySelectorAll(`input[name="${i}"]:checked`);
        if (correct[i] == radio[0].value){
            document.getElementById(`a${i}`).style.backgroundColor = 'green';
            points++;
        }
        else {
            document.getElementById(`a${i}`).style.backgroundColor = 'red';
        }
    }
    console.log("Fim: " + points);
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

        let div = document.createElement("div");
        div.setAttribute("id", "a"+id);
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
        div.appendChild(li);
        questions.appendChild(div);
        id++;
        
    });
}

getQuestions();
