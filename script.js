function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
  this.info = function () {
    readRet = ""
    if (read) {
      readRet = "read"
    }
    else {
      readRet = "not read yet"
    }
    return (title + " by " + author + ", " + pages + "pages, " + readRet)
  }
}

class Library {
  constructor() {
    this.books = []
  }

  addBook(newBook) {
    this.books.push(newBook)
  }

  removeBook(title){
    this.books = this.books.filter((book) => book.title !== title)
  }

  getBook(title) {
    return this.books.find((book) => book.title === title)
  }
}

function createBookCard(book) {
  const bookCard = document.createElement('div')
  const title = document.createElement('p')
  const author = document.createElement('p')
  const pages = document.createElement('p')
  const readBtn = document.createElement('button')
  const deleteBtn = document.createElement('button')

  bookCard.classList.add('bookCard')
  if (!book.read) {
    title.classList.add('bookCardInfoUnread')
    author.classList.add('bookCardInfoUnread')
    pages.classList.add('bookCardInfoUnread')
    readBtn.classList.add('bookCardInfoUnread')
    deleteBtn.classList.add('bookCardInfoUnread')
    readBtn.textContent = "Not read"
    readBtn.style.backgroundColor = "lightcoral"
  }
  else {
    title.classList.add('bookCardInfoRead')
    author.classList.add('bookCardInfoRead')
    pages.classList.add('bookCardInfoRead')
    readBtn.classList.add('bookCardInfoRead')
    deleteBtn.classList.add('bookCardInfoRead')
    readBtn.textContent = "Read"
    readBtn.style.backgroundColor = "lightgreen"
  }
  deleteBtn.onclick = deleteBook
  readBtn.onclick = toggleRead


  title.textContent = book.title
  author.textContent = book.author
  pages.textContent = `${book.pages} pages`
  deleteBtn.textContent = 'Delete'

  bookCard.appendChild(title)
  bookCard.appendChild(author)
  bookCard.appendChild(pages)
  bookCard.appendChild(readBtn)
  bookCard.appendChild(deleteBtn)

  return bookCard
}

const updateBooksGrid = () => {
  resetBooksGrid()
  for (let book of myLibrary.books) {
    booksGrid.appendChild(createBookCard(book))
  }
}

const resetBooksGrid = () => {
  booksGrid.innerHTML = ''
}

const myLibrary = new Library();

const booksGrid = document.getElementById('booksGrid')
var addBtn = document.getElementById("addBook");
const newBookForm = document.getElementById("newBookForm");


addBtn.onclick = function () {
  modal.classList.add('active');
  overlay.classList.add('active');
}

overlay.onclick = function () {
  modal.classList.remove('active');
  overlay.classList.remove('active');
}

const getBookFromInput = () => {
  const title = document.getElementById('title').value
  const author = document.getElementById('author').value
  const pages = document.getElementById('pages').value
  const isRead = document.getElementById('read').checked
  return new Book(title, author, pages, isRead)
}

const addBook = (e) => {
  e.preventDefault()
  const newBook = getBookFromInput()
  myLibrary.addBook(newBook)
  updateBooksGrid()
  modal.classList.remove('active');
  overlay.classList.remove('active');
}

const deleteBook = (e) =>{
  const title = e.target.parentNode.firstChild.innerHTML
  myLibrary.removeBook(title)
  updateBooksGrid();
}

const toggleRead = (e) =>{
  const title = e.target.parentNode.firstChild.innerHTML
  const book = myLibrary.getBook(title);
  myLibrary.removeBook(title)
  book.read = !book.read;
  myLibrary.addBook(book)
  updateBooksGrid();
}

newBookForm.onsubmit = addBook

