function book(title, author, read) {
    this.title = title;
    this.author = author;
    this.read = read;
}


book.prototype.createBookDom = function(arrayPos) {
    const domBook = document.createElement("div");
    domBook.setAttribute("class", "book");
    domBook.setAttribute("data-position", arrayPos);

    const domTitle = document.createElement("div");
    domTitle.setAttribute("class", "title");
    domTitle.textContent = this.title;
    domBook.appendChild(domTitle);

    const domAuthor = document.createElement("div");
    domAuthor.setAttribute("class", "author");
    domAuthor.textContent = this.author;
    domBook.appendChild(domAuthor);

    const buttonContainer = document.createElement("div");
    buttonContainer.setAttribute("class", "buttons");
    domBook.appendChild(buttonContainer);

    const readButton = document.createElement("button");
    readButton.setAttribute("class", "read");
    readButton.textContent = "Read";
    readButton.addEventListener("click", readBook);
    buttonContainer.appendChild(readButton);

    const removeButton = document.createElement("button");
    removeButton.setAttribute("class", "remove");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", removeBook);
    buttonContainer.appendChild(removeButton);
    
    return domBook;
}

function redrawGrid(title, author, read) {
    const bookContainer = document.querySelector(".book-container");
    bookContainer.innerHTML = "";
    for (let i = 0; i < bookList.length; i++) {
        bookContainer.appendChild(bookList[i].createBookDom(i));
    }
}

function createNewBook() {
    const title = document.querySelector("#title");
    const author = document.querySelector("#author");
    const read = document.querySelector("#read");
    if (title.value == "" || author.value == "") {
        if (title.value == "") {
            title.style.backgroundColor = "#ff9191";
        }

        if (author.value == "") {
            author.style.backgroundColor = "#ff9191";
        }

        return;
    }

    const newBook = new book(title.value, author.value, read.checked);
    bookList.push(newBook);
    redrawGrid(title, author, read);

    //reseting form
    blurContainer.className = "form-container noblur";
    title.style.backgroundColor = "#ff9191";
    author.style.backgroundColor = "#ff9191";
    title.value = "";
    author.value = "";
    read.checked = false;
}

function showForm() {
    blurContainer.className = "form-container blur";
}

function removeBook() {
    const arrayPos = this.parentNode.parentNode.dataset.position;
    bookList.splice(arrayPos, 1);
    redrawGrid();
}

function readBook() {
    return;
}

//container finder
const container = document.querySelector(".container");
const blurContainer = document.querySelector(".form-container");

const bookList = [];


//button function assignment
const formButton = document.querySelector(".info-btn");
formButton.addEventListener("click", showForm);

const addButton = document.querySelector("#submit");
addButton.addEventListener("click", createNewBook);