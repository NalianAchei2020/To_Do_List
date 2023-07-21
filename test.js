import {
  addTask,
  removeTask,
  editTask,
  updateTaskStatus,
  clrCompletedTasks,
} from './src/JSFile/addRmove.js';
// Mock localStorage

describe('Task manager', () => {
  let tasks = [];
  beforeEach(() => {
    tasks = [
      {
        index: 0,
        description: 'Task 1',
        completed: false,
      },
      {
        index: 1,
        description: 'Task 2',
        completed: false,
      },
      {
        index: 2,
        description: 'Task 3',
        completed: false,
      },
    ];
  });
  test('addTask should add a new task', () => {
    const task = {
      index: 0,
      description: 'This is Task 1',
      completed: false,
    };
    tasks = addTask(task.description);
    expect(tasks).toHaveLength(1);
    expect(task.description).toBe('This is Task 1');
    expect(task.index).toBe(0);
    expect(task.completed).toBeFalsy();
  });

  test('removeTask should remove a task', () => {
    const task = {
      index: 1,
      description: 'This is Task 2',
      completed: false,
    };
    tasks = addTask(task.description);
    tasks = removeTask(1, tasks);
    tasks.forEach((task, index) => {
      expect(task.index).toBe(index);
    });
    expect(tasks).toHaveLength(1);
    expect(tasks).not.toContain(task);
  });
  test('editTask should edit a task', () => {
    const task = {
      index: 2,
      description: 'This is Task 2',
      completed: false,
    };
    tasks = addTask(task.description);
    const str = 'This task is edited';
    task.description = str;
    tasks = editTask(2, str);
    expect(task.description).toBe('This task is edited');
  });
  test('updateTaskStatus should update the status of a task', () => {
    updateTaskStatus(0, true, tasks);
    expect(tasks[0].completed).toBeTruthy();
  });

  test('clrCompletedTasks should clear completed tasks', () => {
    const task = {
      index: 2,
      description: 'This is Task 2',
      completed: true,
    };
    tasks = addTask(task.description);
    clrCompletedTasks(tasks);
    expect(tasks).toHaveLength(1);
    expect(tasks).not.toContain(tasks[2]);
  });
});
