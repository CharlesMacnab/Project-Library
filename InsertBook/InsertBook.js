/*Enlever lES CONSOLE.LOG inutiles*/





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

// ------- READ FILE -------
function readFileByName(fileName) {

    let xhr = new XMLHttpRequest();
    do {
        xhr.open("GET", fileName, false);
        xhr.send(null);

    } while (xhr.status === 404);

    // assumes status 200
    return xhr.responseText;
}

function readFile() {
    readFileByName("ready.txt");
    return readFileByName("results.txt");
}

// -------------------------

function createBook() {
    writeFile("form-insert", "insertBook");
}

function creation(event) {
    let boleen =true;
    let format = new RegExp(/^[a-z0-9I,\s'-]+$/);
    let charPage = document.getElementsByClassName("pages")[0];
    let charAuthor = document.getElementsByClassName("author")[0];
    let nameBook = document.getElementsByClassName("book")[0];
    let genres = document.getElementsByClassName("genres")[0];

    console.log(format.test(charAuthor.value));
    console.log(format.test(nameBook.value));
    console.log(format.test(genres.value));

    if (charPage.value === 'e'){
        event.preventDefault();
        charPage.classList.add("invalid");
        alert("Error pages");
    }

    if(format.test(charAuthor.value)===false){
        event.preventDefault();
        charAuthor.classList.add("invalid");
        alert("error nameAuthor ");
        boleen = false;
    }

    if (format.test(nameBook.value) === false) {
        event.preventDefault();
        nameBook.classList.add("invalid");
        alert("Error nameBook");
        boleen = false;
    }

    if (format.test(genres.value) === false) {
        event.preventDefault();
        genres.classList.add("invalid");
        alert("Error genres");
        boleen = false;
    }
    console.log(boleen);

    if(boleen === true){
        // console.log("");
        // console.log(format.test(charAuthor.value));
        // console.log(format.test(nameBook.value));
        // console.log(format.test(genres.value));
        createBook();
    }

}

function getInfo() {
    let advance = document.getElementById("form-insert");
    advance.addEventListener("submit", creation);
}


function main() {
    getInfo();
}

main();