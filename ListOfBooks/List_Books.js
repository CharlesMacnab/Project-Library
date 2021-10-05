// ------- WRITE FILE -------
function writeFile(func) {

    var element = document.createElement('a');


    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(func));
    element.setAttribute('download', 'request.txt');

    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

}

// -------------------------

function launchList(){
    writeFile("findByAuthor");
}

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

function calculTab(grid, myResult, tabIndex, ListBook, tabStockIndex){
    let grill = grid.parentElement;
    grill.style.borderCollapse = "collapse";

    //-----Creation des boutons de pagination-----

    let linePage = document.createElement("tr");
    linePage.className = "pagination";
    grid.appendChild(linePage);
    linePage.classList.add("justify-content-center");

    linePage.insertAdjacentHTML("beforeend", '<td class="page-item" ><a class="page-link" href="#" id="previous">Previous</a></td>');
    linePage.insertAdjacentHTML("beforeend", '<td class="page-item" ><a class="page-link" href="#" id="actual">' + ListBook + '</a></td>');
    linePage.insertAdjacentHTML("beforeend", '<td class="page-item" ><a class="page-link" href="#" id="next">Next</a></td>');
    //-----------------------

    //Creation de la grille
    console.log(myResult);

    let tr = document.createElement("tr");
    grid.appendChild(tr);
    tr.style.border ="1px solid black";
    tr.insertAdjacentHTML("beforeend", '<td style="border: 1px solid black;">Number</td>');
    tr.insertAdjacentHTML("beforeend", '<td style="border: 1px solid black;">Author</td>');
    tr.insertAdjacentHTML("beforeend", '<td style="border: 1px solid black;">Book Name</td>');
    tr.insertAdjacentHTML("beforeend", '<td style="border: 1px solid black;">Pages</td>');
    tr.insertAdjacentHTML("beforeend", '<td style="border: 1px solid black;">Genres</td>');
    //---------------------

    //------Afficher la liste des livres--------
    let wanted = 50*ListBook;
    let variable = 50*(ListBook-1);
    let charAuthor = "";
    let charBookName = "";
    let pages = "";
    let charGenres = "";
    let count = 0;
    let numberBook = variable;

    while(((variable-1)< numberBook) && (numberBook < wanted) && (tabIndex<myResult.length)) {
        if (count === 0 && myResult[tabIndex] !== ';') {
            charAuthor = charAuthor + myResult[tabIndex];
        } else if (count === 1 && myResult[tabIndex] !== ';') {
            charBookName = charBookName + myResult[tabIndex];
        } else if (count === 2 && myResult[tabIndex] !== ';') {
            pages = pages + myResult[tabIndex];
        } else if (count === 3 && myResult[tabIndex] !== ';') {
            charGenres = charGenres + myResult[tabIndex];
        }
        if (myResult[tabIndex] === ';') {//si on arrive a la fin d une des informations du livre
            count++;
        }

        if (myResult[tabIndex] === '\n') {//Quand on arrive a la fin des informations du livre
            numberBook++;
            let line = document.createElement("tr");
            line.id = "line-" + numberBook;
            grid.appendChild(line);

            line.insertAdjacentHTML("beforeend", '<td id="n-' + numberBook + '">' + numberBook + '</td>');
            let num = document.getElementById("n-" + numberBook);
            num.style.border = "1px solid black";


            line.insertAdjacentHTML("beforeend", '<td id="Author-' + numberBook + '">' + charAuthor + '</td>');
            let auth = document.getElementById("Author-" + numberBook);
            auth.style.border = "1px solid black";


            line.insertAdjacentHTML("beforeend", '<td id="BookName-' + numberBook + '">' + charBookName + '</td>');
            let book = document.getElementById("BookName-" + numberBook);
            book.style.border = "1px solid black";


            line.insertAdjacentHTML("beforeend", '<td id="nbPages-' + numberBook + '">' + pages + '</td>');
            let nPage = document.getElementById("nbPages-" + numberBook);
            nPage.style.border = "1px solid black";

            line.insertAdjacentHTML("beforeend", '<td id="Genres-' + numberBook + '">' + charGenres + '</td>');
            let genre = document.getElementById("Genres-" + numberBook);
            genre.style.border = "1px solid black";

            line.style.border = "1px solid black";

            charAuthor = "";
            charBookName = "";
            pages = "";
            charGenres = "";
            count = 0;
        }
        tabIndex++;
    }

    //-------------------------

    //------Ajout de addEventListener sur les boutons de deplacement-------

    tabStockIndex[ListBook] = tabIndex;
    let charTab = ""; //On transforme le tableau d'entier en un tableau de caractere pour les envoyer dans des div

    for(let i = 0; i<tabStockIndex.length;i++){
        if(i===0){
            charTab = charTab + tabStockIndex[i];
        }else{
            charTab = charTab + " " + tabStockIndex[i];
        }
    }


    let divIndex = document.createElement("div");
    let divTab = document.createElement("div");
    let divList = document.createElement("div");

    divTab.id = "TabData";
    divIndex.id="indexTable";
    divList.id ="ListBook";

    divIndex.textContent = ""+tabIndex;
    divList.textContent = ""+ListBook;
    divTab.textContent = ""+charTab;

    divTab.style.display ="none";
    divList.style.display ="none";
    divIndex.style.display = "none";

    grid.appendChild(divIndex);
    grid.appendChild(divList);
    grid.appendChild(divTab);


    let valNext = document.getElementById("next");
    valNext.addEventListener("click", readEvent);
    let valPrev = document.getElementById("previous");
    valPrev.addEventListener("click", readEvent);


    //-----------------------------------------------

}
//----------Recuperation des informations d'index du fichier txt et de la page actuelle du site pour rappeler la fonction calculTab----------
function readEvent(event){


    let tabIndex = parseInt(document.getElementById("indexTable").textContent);
    let ListBook = parseInt(document.getElementById("ListBook").textContent);
    let tab  = document.getElementById("TabData").textContent;
    let tabValueIndex = tab.split(" ").map( function(grade){ return parseInt(grade); } );

    let grid = document.getElementById("gridBody");
    let valPrev = document.getElementById("previous");
    let valActual = document.getElementById("actual");
    let valNext = document.getElementById("next");
    let myResult = readFile();
    myResult =  myResult+ '\n';
    console.log(tabIndex);
    if(event.target === valPrev && ListBook>1)
    {
        ListBook--;
        valActual.textContent = ""+ListBook;
        grid.innerHTML = "";
        tabIndex = tabValueIndex[ListBook-1];
        tabValueIndex[ListBook+1] = 0;

        calculTab(grid, myResult, tabIndex, ListBook, tabValueIndex);

    }else if(event.target === valPrev && ListBook===1){
        event.target.classList.add("disabled");
        // event.preventDefault();
    }else if(event.target === valNext && tabIndex>=myResult.length){
        event.target.classList.add("disabled");
    }
    else if(event.target === valNext){
        ListBook++;
        valActual.textContent = ""+ListBook;
        grid.innerHTML ="";

        calculTab(grid, myResult, tabIndex, ListBook, tabValueIndex);
    }

}

function main(){
    launchList();
    let myResult = readFile();
    myResult = myResult + '\n';
    let grid = document.getElementById("gridBody");
    let tabStockIndex = [0];
    calculTab(grid, myResult,0 , 1, tabStockIndex);
}

main();