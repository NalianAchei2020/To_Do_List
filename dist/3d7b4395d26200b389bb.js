import './style.css';
import {
  addTask, renderTasks, saveTasks, clrCompletedTasks,
} from './JSFile/addRmove.js';

// Retrieve tasks from local storage if available, or initialize with an empty array
let tasks;

try {
  tasks = JSON.parse(localStorage.getItem('tasks')) ?? [];
} catch (error) {
  tasks = [];
}

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
    }
  }
});

const completeBtn = document.querySelector('.complete');
completeBtn.addEventListener('click', () => {
  const taskList = document.getElementById('list');
  tasks = clrCompletedTasks(tasks);
  taskList.innerHTML = '';
  saveTasks(tasks);
  renderTasks(tasks);
});

window.addEventListener('load', renderTasks(tasks));