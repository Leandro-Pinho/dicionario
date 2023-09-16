const wrapper = document.querySelector(".wrapper"),
    searchInput = wrapper.querySelector("input"),
    synonyms = wrapper.querySelector(".synonyms .list"),
    infoText = wrapper.querySelector(".info-text"),
    volumeIcon = wrapper.querySelector(".word i"),
    removeIcon = wrapper.querySelector(".search span");

let audio;


// fetch api function
function fetchApi(word) {
    infoText.style.color = "#000"
    infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`;
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    // fecthing api response and returning it with parsing into js obj and in another then
    // method calling data function with passing api response and searched word as an argument
    fetch(url).then(res => res.json()).then(result => data(result, word));
}

// data function
function data(result, word) {
    if (result.title) { // if api returns the message of can't find word
        infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>. Please, try to search for another word.`;
    } else {
        console.log(result);
        wrapper.classList.add("active");
        let definitions = result[0].meanings[0].definitions[0],
            examples = result[0].meanings[1].definitions[0],
            syno = result[0].meanings[1],
            phonetics = `${result[0].meanings[0].partOfSpeech} ${result[0].phonetics[0].text}`;

        // let's pass the particular response data to a particular html element
        document.querySelector(".word p").innerText = result[0].word;
        document.querySelector(".word span").innerText = phonetics;

        document.querySelector(".meaning span").innerText = definitions.definition;
        document.querySelector(".example span").innerText = examples.example;

        if (syno.synonyms[0] == undefined) { // if there is no synonym then hide the synonyms div
            synonyms.parentElement.style.display = "none";
        } else {
            synonyms.parentElement.style.display = "block";
            synonyms.innerHTML = "";
            for (let i = 0; i < 5; i++) { // getting only 5 out of many
                let tag = `<span onclick=search('${syno.synonyms[i]}')>${syno.synonyms[i]},</span>`;
                synonyms.insertAdjacentHTML("beforeend", tag); // passing all 5 synonyms inside synonyms div
            }
        }


        // função para procurar o audio da palavra digitada, 
        const music = () => {
            if (result[0].phonetics[0].audio === "") {
                let sum = "";
                for (let i = 0; i < phonetics.length; i++) {
                    sum = result[0].phonetics[i].audio;
                    if (sum !== "") break;
                }
                return sum;
            }
            return result[0].phonetics[0].audio
        }
        audio = new Audio(music()); // creating new audio obj and passing audio src
    }
}

// fetch api function
function search(word) {
    searchInput.value = word;
    fetchApi(word);
}

// pegando o valor digitado no input
searchInput.addEventListener("keyup", e => {
    if (e.key === "Enter" && e.target.value) {
        fetchApi(e.target.value);
    }
});

// adicionando o audio
volumeIcon.addEventListener("click", () => {
    audio.play();
});

removeIcon.addEventListener("click", () => {
    searchInput.value = "";
    searchInput.focus();
})