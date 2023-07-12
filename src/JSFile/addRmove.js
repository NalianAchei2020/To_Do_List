export const saveTasks = (tasks) => {
  // save tasks to localstorage
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

export const addTask = (description, tasks) => {
  const newTask = {
    id: Math.floor(Math.random() * 1000),
    description,
    completed: false,
  };
  tasks.push(newTask);
};

export const removeTask = (id, tasks) => {
  // Remove the task from the tasks array
  const index = tasks.findIndex((task) => task.id === id);
  if (index !== -1) {
    // Remove the task from the tasks array
    tasks.splice(index, 1);
    // Update the index of the remaining task
  }
};

export const editTask = (id, newDesc, tasks) => {
  // Find the task with the given ID
  const task = tasks.find((task) => task.id === id);
  if (task) {
    task.description = newDesc;
  }
};

export const renderTasks = (tasks) => {
  const taskList = document.getElementById('list');
  taskList.innerHTML = '';
  // sort tasks by index
  tasks.sort((a, b) => a.id - b.id);

  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.classList = 'listItmes';
    const check = document.createElement('input');
    check.type = 'checkbox';
    check.checked = task.completed;
    check.addEventListener('change', () => {
      task.completed = !task.completed;
      saveTasks(tasks);
    });
    const span = document.createElement('span');
    span.textContent = task.description;
    li.appendChild(check);
    li.appendChild(span);
    const deleteBtn = document.createElement('i');
    deleteBtn.classList.add('fa', 'fa-trash');
    deleteBtn.setAttribute('aria-hidden', 'true');
    deleteBtn.addEventListener('click', () => {
      removeTask(task.id, tasks);
      renderTasks(tasks);
      saveTasks(tasks);
    });
    const ellipsis = document.createElement('i');
    ellipsis.classList.add('fa', 'fa-ellipsis-v');
    ellipsis.setAttribute('aria-hidden', 'true');
    ellipsis.addEventListener('click', () => {
      const input = document.createElement('input');
      input.type = 'text';
      input.value = task.description;
      input.classList = 'inputEdit';
      input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          // Update the task description and render the tasks
          editTask(task.id, input.value, tasks);
          renderTasks(tasks);
          saveTasks(tasks);
        } else if (event.key === 'Escape') {
          // Cancel editing and render the tasks
          renderTasks(tasks);
        }
      });
      li.replaceChild(input, span);
      input.focus();
    });
    li.appendChild(deleteBtn);
    li.appendChild(ellipsis);
    taskList.appendChild(li);
  });
};
