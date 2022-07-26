import { storageNames } from './const';
import { Tasks } from './types';

interface FilteredTasks {
  [key: string]: (tasks: Tasks[]) => Tasks[],
}

export const filteredTasks: FilteredTasks = {
  'All': (tasks) => tasks,
  'Active': (tasks) => tasks.filter((el) => el.isDone === false),
  'Completed': (tasks) => tasks.filter((el) => el.isDone === true),
};

export const addToStorage = (tasks: Tasks[], text: string) => {
  const taskToAdd = { task: text, isDone: false, date: Date.now() };
  localStorage.setItem(
    storageNames.tasks,
    tasks.length > 0
      ? JSON.stringify([...tasks, taskToAdd])
      : JSON.stringify([taskToAdd]),
  );
};

export const updateStorage = (tasks: Tasks[], setIsNeedToUpdate: (arg: boolean) => void, date: string, isNeedToUpdate: boolean) => {
  const updatedTasks = tasks.map((el: Tasks) => {
    if (el.date === date) {
      el.isDone = !el.isDone;
      return el;
    } else {
      return el;
    }
  });
  localStorage.setItem(
    storageNames.tasks,
    JSON.stringify(updatedTasks),
  );
  setIsNeedToUpdate(!isNeedToUpdate);
};

export const deleteFromStorage = (tasks: Tasks[], setIsNeedToUpdate: (arg: boolean) => void, date: string, isNeedToUpdate: boolean) => {
  const findedTask = tasks.findIndex(
    (el: Tasks) => el.date === date,
  );
  tasks.splice(findedTask, 1);
  localStorage.setItem(
    storageNames.tasks,
    JSON.stringify(tasks),
  );
  setIsNeedToUpdate(!isNeedToUpdate);
};

export const clearCompleted = (tasks: Tasks[], setIsNeedToUpdate: (arg: boolean) => void, isNeedToUpdate: boolean) => {
  const filtredCompleted = tasks.filter((el) => !el.isDone);
  localStorage.setItem(storageNames.tasks, JSON.stringify(filtredCompleted));
  setIsNeedToUpdate(!isNeedToUpdate);
};
