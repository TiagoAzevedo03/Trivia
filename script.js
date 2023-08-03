const url = "https://opentdb.com/api.php?amount=10"
/*category "Science: Computers" 
correct_answer: "Shellshock"
difficulty: "hard"
incorrect_answers: (3) ['Heartbleed', 'Bashbug', 'Stagefright']
question: "What was the name of the security vulnerability found in Bash in 2014?"
type: "multiple"*/

const questions = document.getElementById("questions")

async function getQuestions(){
    const response = await fetch (url);
    const data = await response.json();

    data.results.forEach((question) => {

        let li = document.createElement("li");
		li.textContent = question.question;

        let ul = document.createElement("ul");
        
        question.incorrect_answers.forEach((answer) => {
            let ans = document.createElement("li");
            ans.textContent = answer;
            ul.appendChild(ans);
        })

        const correct = document.createElement("li");
        correct.textContent = question.correct_answer;
        ul.appendChild(correct);

        li.appendChild(ul);

        questions.appendChild(li);

    });
}

getQuestions();