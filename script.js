function book(title, author, read) {
    this.title = title;
    this.author = author;
    this.read = read;
}


book.prototype.createBookDom = function(arrayPos) {
    const domBook = document.createElement("div");
    domBook.setAttribute("class", "book");
    domBook.setAttribute("data-position", arrayPos);
    domBook.style = (this.read) ? readGradient : "";

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
    readButton.textContent = (this.read) ? "Unread" : "Read";
    readButton.style = (this.read) ? readGradient : "";
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

    cancelForm();
    
}

function showForm() {
    blurContainer.className = "form-container blur";
}

function removeBook() {
    const arrayPos = this.parentNode.parentNode.dataset.position;
    bookList.splice(arrayPos, 1);
    redrawGrid();
}

function cancelForm() {
    blurContainer.className = "form-container noblur";
    title.style.backgroundColor = "#fff";
    author.style.backgroundColor = "#fff";
    title.value = "";
    author.value = "";
    read.checked = false;
}

function readBook() {
    const arrayPos = this.parentNode.parentNode.dataset.position;

    if (this.textContent == "Read"){
        this.parentNode.parentNode.style = readGradient;
        this.style = readGradient;
        this.textContent = "Unread";
        bookList[arrayPos].read = true;
    }
    else{
        this.parentNode.parentNode.style = "";
        this.style = "";
        this.textContent = "Read";
        bookList[arrayPos].read = false;
    }
}

//container finder
const container = document.querySelector(".container");
const blurContainer = document.querySelector(".form-container");

const readGradient = "background: linear-gradient(291deg, rgba(48,250,255,1) 0%, rgba(73,255,183,1) 100%);";
const bookList = [];


//button function assignment
const formButton = document.querySelector(".info-btn");
formButton.addEventListener("click", showForm);

const addButton = document.querySelector("#submit");
addButton.addEventListener("click", createNewBook);

const cancelButton = document.querySelector("#cancel");
cancelButton.addEventListener("click", cancelForm);