function book(title, author, read) {
    this.title = title;
    this.author = author;
    this.read = read;
}

book.prototype.createBookDom = function() {
    const domBook = document.createElement("div");
    domBook.setAttribute("class", "book");

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
    const readButton = document.createElement("button");
    readButton.setAttribute("class", "read");
    readButton.textContent = "Read";
    const removeButton = document.createElement("button");
    removeButton.setAttribute("class", "remove");
    removeButton.textContent = "Remove";
    buttonContainer.appendChild(readButton);
    buttonContainer.appendChild(removeButton);
    domBook.appendChild(buttonContainer);
    
    return domBook;
}

//container finder
const container = document.querySelector(".container");
const blurContainer = document.querySelector(".form-container");

const bookList = [];

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

    //clear and redrawing grid to update changes to list
    const newBook = new book(title.value, author.value, read.checked);
    bookList.push(newBook);
    const bookContainer = document.querySelector(".book-container");
    bookContainer.innerHTML = "";
    bookList.forEach( (b) => bookContainer.appendChild(b.createBookDom()));

    //reseting form
    blurContainer.className = "form-container noblur";
    title.style.backgroundColor = "#ff9191";
    author.style.backgroundColor = "#ff9191";
    title.value = "";
    author.value = "";
    read.checked = false;
}

function showForm(){
    blurContainer.className = "form-container blur";
}


//button function assignment
const formButton = document.querySelector(".info-btn");
formButton.addEventListener("click", showForm);

const addButton = document.querySelector("#submit");
addButton.addEventListener("click", createNewBook);