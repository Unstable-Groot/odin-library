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


const bookList = [];

function newBookButton() {
    console.log(this);
    const newBook = new book("Testing Title", "Testing Author", true); //Todo: replace with form input

    bookList.push(newBook);
    const bookContainer = document.querySelector(".book-container");
    bookContainer.innerHTML = "";
    bookList.forEach( (b) => {
        bookContainer.appendChild(b.createBookDom());
    });
}



const addButton = document.querySelector(".info-btn");
addButton.addEventListener("click", newBookButton);