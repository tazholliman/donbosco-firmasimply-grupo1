class Book {
  constructor(nombre, categoria, descripcion, fecha) {
    this.nombre = nombre;
    this.categoria = categoria;
    this.descripcion = descripcion;
    this.fecha = fecha;
  }
}

// UI Class: Handle UI Tasks
class UI {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector('#book-list');

    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${book.nombre}</td>
      <td>${book.categoria}</td>
      <td>${book.descripcion}</td>
      <td>${book.fecha}</td>
 
      <td></td>
      <td></td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
  <td></td>
    `;

    list.appendChild(row);
  }

   static deleteBook(el) {
     if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
     }
   }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    

    // Vanish in 3 seconds
    
  }

  static clearFields() {
    document.querySelector('#nombre').value = '';
    document.querySelector('#categoria').value = '';
    document.querySelector('#descripcion').value = '';
    document.querySelector('#fecha').value = '';
  }
}

// Store Class: Handles Storage
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(descripcion) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.descripcion === descripcion) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}


// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault();

  // Get form values
  const nombre = document.querySelector('#nombre').value;
  const categoria = document.querySelector('#categoria').value;
  const descripcion = document.querySelector('#descripcion').value;
  const fecha = document.querySelector('#fecha').value;

  // Validate
  if (nombre === '' || categoria === '' || descripcion === ''  || fecha === '') {
    UI.showAlert('Please fill in all fields', 'danger');
  } else {
    // Instatiate book
    const book = new Book(nombre, categoria, descripcion, fecha);

    // Add Book to UI
    UI.addBookToList(book);

    // Add book to store
    Store.addBook(book);

    // Show success message
    UI.showAlert('Book Added', 'success');

    // Clear fields
    UI.clearFields();
  }
});

// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
  // Remove book from UI
  UI.deleteBook(e.target);

  // Remove book from store
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // Show success message
  UI.showAlert('Book Removed', 'success');
});
