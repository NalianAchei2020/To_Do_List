import './style.css';
import {
  addTask, renderTasks, saveTasks,
} from './JSFile/addRmove.js';

// Retrieve tasks from local storage if available, or initialize with an empty array
const tasks = JSON.parse(localStorage.getItem('tasks')) ?? [];

// Event listeners for adding new tasks
const todoInput = document.getElementById('todo');
todoInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    const todoDesc = todoInput.value;
    if (todoDesc) {
      const tasks = addTask(todoDesc);
      saveTasks(tasks);
      renderTasks();
      todoInput.value = '';
      console.log('click');
    }
  }
});

window.addEventListener('load', renderTasks(tasks));