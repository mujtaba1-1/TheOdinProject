const showAddBookDialogBtn = document.getElementById("add-book");
const addBookDialog = document.getElementById("add-book-dialog")
const cancelBtn = document.getElementById("cancel-button");
const addBook = document.getElementById("book-form");
const bookshelf = document.getElementById("bookshelf");

const myLibrary = JSON.parse(localStorage.getItem('books')) || [];

function Book(title, author, hasRead) {
    this.title = title;
    this.author = author;
    this.hasRead = hasRead;
    this.id = crypto.randomUUID();
}

showAddBookDialogBtn.addEventListener("click", () => {
    addBookDialog.showModal();
})

cancelBtn.addEventListener("click", () => {
    resetInput();
    addBookDialog.close();
})

addBook.addEventListener("submit", (event) => {
    event.preventDefault();

    const bookTitle = document.getElementById("book-name").value;
    const bookAuthor = document.getElementById("book-author").value;
    const hasRead = document.getElementById("book-read").checked;
    
    const book = new Book(bookTitle, bookAuthor, hasRead);
    myLibrary.unshift(book);

    renderBooks(myLibrary);

    resetInput();
    localStorage.setItem('books', JSON.stringify(myLibrary));
    addBookDialog.close();
})

function resetInput() {
    document.getElementById("book-name").value = "";
    document.getElementById("book-author").value = "";
    document.getElementById("book-read").checked = false;
}

function renderBooks(array) {
    bookshelf.innerHTML = ``;

    array.forEach((book) => {
        bookshelf.innerHTML += `
            <div class="book" id="book-${book.id}">
                <div class="spine"></div>
                <div class="book-cover">
                    <div class="close-btn">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 5L5 19M5 5L19 19" stroke="#f5deb3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div class="decorative-border"></div>
                    <div class="book-content">
                        <p class="book-title">${book.title}</p>
                        <p class="book-author">by ${book.author}</p>
                        ${book.hasRead ? `<div class="read"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 3L13.4302 8.31181C13.6047 8.96 13.692 9.28409 13.8642 9.54905C14.0166 9.78349 14.2165 9.98336 14.451 10.1358C14.7159 10.308 15.04 10.3953 15.6882 10.5698L21 12L15.6882 13.4302C15.04 13.6047 14.7159 13.692 14.451 13.8642C14.2165 14.0166 14.0166 14.2165 13.8642 14.451C13.692 14.7159 13.6047 15.04 13.4302 15.6882L12 21L10.5698 15.6882C10.3953 15.04 10.308 14.7159 10.1358 14.451C9.98336 14.2165 9.78349 14.0166 9.54905 13.8642C9.28409 13.692 8.96 13.6047 8.31181 13.4302L3 12L8.31181 10.5698C8.96 10.3953 9.28409 10.308 9.54905 10.1358C9.78349 9.98336 9.98336 9.78349 10.1358 9.54905C10.308 9.28409 10.3953 8.96 10.5698 8.31181L12 3Z" stroke="#currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></div>` : ``}
                    </div>
                </div>
            </div>
        `
    })

    const deleteBtns = document.getElementsByClassName("close-btn");

    for (const btn of deleteBtns) {
        btn.addEventListener("click", (event) => {
            const bookId = event.target.closest('.book').id;
            const updatedLibrary = myLibrary.filter((book) => "book-" + book.id !== bookId);
            myLibrary.length = 0;
            myLibrary.push(...updatedLibrary);
    
            renderBooks(myLibrary);
            localStorage.setItem('books', JSON.stringify(myLibrary));
        });
    };
}

renderBooks(myLibrary);