import Auth from './Modules/Auth/Auth.js';
import tarea from './Modules/Tarea.js';
import Categoria from './Modules/Categoria.js';
import { listadoTareas } from './Modules/API/llamadasApi.js';
// Funcionalidad mostrar listado de tareas
class Tarea {
    constructor(nombre, categoria, descripcion, fecha) {
      this.nombre = nombre;
      this.categoria = categoria;
      this.descripcion = descripcion;
      this.fecha = fecha;
    }
  }
  
  // UI Class: Handle UI Tasks
  class UI {
    static displayTarea() {
      const getTarea = Store.getTarea();
  
      tarea.forEach((tarea) => UI.addTareasToList(tarea));
    }
  
    static addTareasToList(tarea) {
      const list = document.querySelector('#tarea-list');
  
      const row = document.createElement('tr');
  
      row.innerHTML = `
        <td>${tarea.nombre}</td>
        <td>${tarea.categoria}</td>
        <td>${tarea.descripcion}</td>
        <td>${tarea.fecha}</td>
   
        <td><input type="checkbox"></td>
        <td></td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    <td></td>
      `;
  
      list.appendChild(row);
    }
  
     static deleteTarea(el) {
       if (el.classList.contains('delete')) {
        el.parentElement.parentElement.remove();
       }
     }
  
    static showAlert(message, className) {
      const div = document.createElement('div');
      div.className = `alert alert-${className}`;
      div.appendChild(document.createTextNode(message));
      const container = document.querySelector('.container');
      const form = document.querySelector('#tarea-form');
      
  
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
    static getTarea() {
      let tarea;
      // if (localStorage.getItem('books') === null) {
        // books = [];
      // } else {
        // books = JSON.parse(localStorage.getItem('books'));
      }
  
      // return books;
    // }
  
    static addTarea(tarea) {
      const tarea = Store.getTarea();
      tarea.push(tarea);
      localStorage.setItem('tarea', JSON.stringify(tarea));
    }
  
    static removetarea(descripcion) {
      const tarea = Store.getTarea();
  
      tarea.forEach((tarea, index) => {
        if (tarea.descripcion === descripcion) {
          tarea.splice(index, 1);
        }
      });
  
      localStorage.setItem('tarea', JSON.stringify(tarea));
    }
  }
  
  
 
  document.addEventListener('DOMContentLoaded', UI.displayTarea);

  document.querySelector('#tarea-form').addEventListener('submit', (e) => {
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
    
      const tarea = new Tarea(nombre, categoria, descripcion, fecha);
  
      UI.addTareaToList(tarea);
  
      Store.addtarea(tarea);
  
      UI.showAlert('tarea Added', 'success');
  
      UI.clearFields();
    }
  });
  
 
  document.querySelector('#tarea-list').addEventListener('click', (e) => {
   
    UI.deleteTarea(e.target);
  

    Store.removeTarea(e.target.parentElement.previousElementSibling.textContent);
  
    UI.showAlert('Tarea Removed', 'success');
  });
  

// Funcionalidad mostrar listado de tareas
// Funcionalidad mostrar listado de tareas

// Funcionalidad crear una tarea

// Funcionalidad de borrar una tarea

// Funcionalidad de marcar una tarea como completada o pendiente

// Funcionalidad de cargar las categorias en el formulario de crear la tarea
