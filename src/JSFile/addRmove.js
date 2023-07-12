export const saveTasks = (tasks) => {
  // save tasks to localstorage
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

export const addTask = (description, tasks) => {
  const newTask = {
    description,
    completed: false,
    index: tasks.length,
  };
  tasks.push(newTask);
};

export const removeTask = (index, tasks) => {
  // Remove the task from the tasks array
  tasks.splice(index, 1);
  // Update the index of the remaining tasks
  for (let i = index; i <= tasks.length; i + 1) {
    tasks[i].index -= 1;
  }
};

export const editTask = (index, newDesc, tasks) => {
  tasks[index].description = newDesc;
};

export const renderTasks = (tasks) => {
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
      saveTasks(tasks);
    });
    const span = document.createElement('span');
    span.textContent = task.description;
    li.appendChild(check);
    li.appendChild(span);
    const ellipsis = document.createElement('i');
    ellipsis.classList.add('fa', 'fa-ellipsis-v');
    ellipsis.setAttribute('aria-hidden', 'true');
    ellipsis.addEventListener('click', () => {
      // Prompt the user to edit the task description
      const newDesc = prompt('Edit task description:', task.description);
      if (newDesc) {
        editTask(task.index, newDesc, tasks);
        renderTasks(tasks);
        saveTasks(tasks);
      }
    });
    li.appendChild(ellipsis);
    taskList.appendChild(li);
  });
};