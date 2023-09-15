const wrapper = document.querySelector(".wrapper"),
    searchInput = wrapper.querySelector("input"),
    infoText = wrapper.querySelector(".info-text");



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
        wrapper.classList.add("active")
    }
}

// pegando o valor digitado no input
searchInput.addEventListener("keyup", e => {
    if (e.key === "Enter" && e.target.value) {
        fetchApi(e.target.value);
    }
})