import { addTask } from './src/JSFile/addRmove.js';
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
});
