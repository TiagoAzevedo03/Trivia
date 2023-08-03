const url = "https://opentdb.com/api.php?amount=50"

const questions = document.getElementById("questions")

async function getQuestions(){
    const response = await fetch (url);
    const data = await response.json();
    data.results.forEach((question) => {
        console.log(question.difficulty);
        let li = document.createElement("li");
		li.textContent = question.difficulty;
        questions.appendChild(li);
    });
}

getQuestions();