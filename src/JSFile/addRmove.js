export const saveTasks = (tasks) => {
  // save tasks to localstorage
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

export const addTask = (description) => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) ?? [];
  const newTask = {
    id: Math.floor(Math.random() * 1000),
    description,
    completed: false,
    index: tasks.length,
  };
  tasks.push(newTask);
  return tasks;
};

export const removeTask = (id, tasks) => tasks.filter((task) => task.id !== id);

export const editTask = (id, newDesc) => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) ?? [];
  tasks.map((task) => {
    if (task.id === id) {
      task.description = newDesc;
    }
    return task;
  });
  return tasks;
};

export const renderTasks = () => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) ?? [];
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
      taskList.innerHTML = '';
      saveTasks(tasks);
      renderTasks(tasks);
    });
    const span = document.createElement('span');
    span.textContent = task.description;
    li.appendChild(check);
    li.appendChild(span);
    const deleteBtn = document.createElement('i');
    deleteBtn.classList.add('fa', 'fa-trash');
    deleteBtn.setAttribute('aria-hidden', 'true');
    deleteBtn.addEventListener('click', () => {
      saveTasks(removeTask(task.id, tasks));
      renderTasks(removeTask(task.id, tasks));
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
          taskList.innerHTML = '';
          renderTasks(editTask(task.id, input.value));
          saveTasks(editTask(task.id, input.value));
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
