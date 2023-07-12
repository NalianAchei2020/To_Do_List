export const saveTasks = (tasks) => {
  // save tasks to localstorage
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

export const addTask = (description) => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) ?? [];
  const newTask = {
    description,
    completed: false,
    index: tasks.length,
  };
  tasks.push(newTask);
  return tasks;
};

export const removeTask = (index, tasks) => tasks.filter((task) => task.index !== index);

export const editTask = (index, newDesc) => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) ?? [];
  tasks.map((task) => {
    if (task.index === index) {
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
  tasks.sort((a, b) => a.index - b.index);

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
      saveTasks(removeTask(task.index, tasks));
      renderTasks(removeTask(task.index, tasks));
    });
    const ellipsis = document.createElement('i');
    ellipsis.classList.add('fa', 'fa-ellipsis-v');
    ellipsis.id = 'edit';
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
          renderTasks(editTask(task.index, input.value));
          saveTasks(editTask(task.index, input.value));
        } else if (event.key === 'Escape') {
          // Cancel editing and render the tasks
          renderTasks(tasks);
        }
      });
      li.replaceChild(input, span);
      input.focus();
      document.getElementById('edit').style.display = 'none';
    });
    li.appendChild(deleteBtn);
    li.appendChild(ellipsis);
    taskList.appendChild(li);
  });
};
