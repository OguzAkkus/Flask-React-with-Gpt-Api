
document.addEventListener("DOMContentLoaded", function()
    {
        const select = document.getElementById("functions-select");
        const input = document.getElementById("translate-input");
        const button = document.getElementById("generate-button");
        select.addEventListener("change",
        function () {
            const selectedOption = this.value;

            if (selectedOption === "sw") {
                // Execute function for sentenceFromWord option
                sentenceFromWord();
            } else if (selectedOption === "mw") {
                // Execute function for meaningWord option
                meaningWord();
            } else if (selectedOption === "ms") {
                // Execute function for meaningSentence option
                meaningSentence();
            }
        });
    function sentenceFromWord(){
        button.value = "Generate sentence"
        input.placeholder = "Enter a word"

    console.log("Sentence from word");
    }
    function meaningWord(){
        button.value = "Check word"
        input.placeholder = "Word meaning ?"


    console.log("Word meaning ?");
    }
    function meaningSentence(){
        button.value = "Check sentence"
        input.placeholder = "Sentence meaning ?"
    console.log("Meaning of the sentence");
    }
    });