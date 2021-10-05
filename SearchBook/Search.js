// ------- WRITE FILE -------
function writeFile(id_form, func) {

    var element = document.createElement('a');

    let text1 = document.getElementById(id_form);
    let count = text1.elements.length;
    let textToSave = func;
    for (let i = 0; i < count - 1; i++) {
        textToSave += ";" + text1[i].value;
    }

    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(textToSave));
    element.setAttribute('download', 'request.txt');

    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

}

// -------------------------

function createDocTextAuthor(){
    writeFile("form-insertAuthor", "findByAuthor");
}

function createDocTextBook(){
    writeFile("form-insertBookName", "findByTitle");
}

function createDocTextGenres(){
    writeFile("form-insertGenres", "findByGenre");
}


function sendTextAuthor(event){
    let boleen =true;
    let format = new RegExp(/^[a-z,\s'-]+$/);
    let charAuthor = document.getElementsByClassName("author")[0];

    if(format.test(charAuthor.value)===false){
        event.preventDefault();
        charAuthor.classList.add("invalid");
        alert("error nameAuthor ");
        boleen = false;
    }
    if(boleen === true){
        // console.log("");
        // console.log(format.test(charAuthor.value));
        createDocTextAuthor();
    }
}

function sendTextBook(event){
    let boleen =true;
    let format = new RegExp(/^[a-zI,\s'-]+$/);
    let nameBook = document.getElementsByClassName("book")[0];

    if (format.test(nameBook.value) === false) {
        event.preventDefault();
        nameBook.classList.add("invalid");
        alert("Error nameBook");
        boleen = false;
    }
    if(boleen === true){
        // console.log("");
        // console.log(format.test(nameBook.value));
        createDocTextBook();
    }
}

function sendTextGenre(event){
    let boleen =true;
    let format = new RegExp(/^[a-z,\s'-]+$/);
    let genres = document.getElementsByClassName("genres")[0];

    if (format.test(genres.value) === false) {
        event.preventDefault();
        genres.classList.add("invalid");
        alert("Error genres");
        boleen = false;
    }
    if(boleen === true){
        // console.log("");
        // console.log(format.test(genres.value));
        createDocTextGenres();
    }
}


function getInformation(){
    let author = document.getElementById("form-insertAuthor");
    author.addEventListener("submit", sendTextAuthor);

    let nameBook = document.getElementById("form-insertBookName");
    nameBook.addEventListener("submit", sendTextBook);

    let genre = document.getElementById("form-insertGenres");
    genre.addEventListener("submit", sendTextGenre);
}



function main(){
    getInformation();
}

main();