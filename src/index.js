import './style.css';
import {
  addTask, removeTask, editTask, renderTasks, saveTasks,
} from './JSFile/addRmove';

// Retrieve tasks from local storage if available, or initialize with an empty array
const tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];

// Event listeners for adding new tasks
const todoInput = document.getElementById('todo');
todoInput.addEventListener('keydown', (e) => {
  if (e.keyCode === 13) {
    const todoDesc = todoInput.value;
    if (todoDesc) {
      addTask(todoDesc, tasks);
      renderTasks(tasks);
      saveTasks(tasks);
      todoInput.value = '';
    }
  }
});

window.addEventListener('load', renderTasks(tasks));