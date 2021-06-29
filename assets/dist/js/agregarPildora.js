class Book {
    constructor(nombre, descripcion, presentacion){
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.presentacion = presentacion;
    }
  }

const defaultBooks = [
	{
		nombre: 'Book 1',
		descripcion: 'Brad Traversy',
		presentacion: '12345'
	},
	{
		nombre: 'Book 2',
		descripcion: 'Mehul Mohan',
		presentacion: '6789'
	}
]

class UI {
    static displayBooks(){
        defaultBooks.forEach(book => UI.addBookToList(book))
    }
    static clearFileds(){
        document.getElementById("nombre").value = ""
        document.getElementById("descripcion").value = ""
        document.getElementById("presentacion").value = ""
    }
    static deleteBook(target){
        if (target.classList.contains('delete')) {
			// we clicked the X icon
			target.parentElement.parentElement.remove()
		}
    }
    static addBookToList(book) {
        const list = document.getElementById("book-list") // get the #book-list DOM node here
        const row = document.createElement("tr")// create a TR row element here (document.createElement)
        row.innerHTML = `
        <td>${book.nombre}</td>
        <td>${book.descripcion}</td>
        <td>${book.presentacion}</td>
        <td></td>
        <td>${Date()}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `
        list.appendChild(row)
    }
}

UI.displayBooks()

document.querySelector('#book-form').addEventListener('submit', addABook, false)

function addABook(e) {
	// prevent actual submission
	e.preventDefault()

	// Capturar los valores del Form
    const nombre = document.getElementById("nombre").value
    const descripcion = document.getElementById("descripcion").value
    const presentacion = document.getElementById("presentacion").value
	// Crear un nuevo objeto book
    const book = new Book(nombre, descripcion, presentacion)

    //Aunque no tenga un valor definido en la funcion, se encarga de darle este valor por defecto a cuaqluier variable que se asigne después.

	// Añadir el objeto book creado a UI (mostrarlo en HTML)
    UI.addBookToList(book)

    UI.clearFileds()
    
}
    document.getElementById('book-list').addEventListener('click', handleRemove)
    function handleRemove(e) {
        // Remove book from UI
        UI.deleteBook(e.target)
    }