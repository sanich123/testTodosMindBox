import { storageActions, storageNames } from './const';
import { ChangeStorage, Tasks } from './types';

export const filteredTasks: {
  [key: string]: (tasks: Tasks[]) => Tasks[];
} = {
  All: (tasks) => tasks,
  Active: (tasks) => tasks.filter((el) => el.isDone === false),
  Completed: (tasks) => tasks.filter((el) => el.isDone === true),
};

export const addToStorage = (tasks: Tasks[], text: string) => {
  const taskToAdd = { task: text, isDone: false, date: Date.now()};
  localStorage.setItem(
    storageNames.tasks,
    tasks.length > 0
      ? JSON.stringify([...tasks, taskToAdd])
      : JSON.stringify([taskToAdd]),
  );
};

export const actionsWithStorage = ({action, tasks, setIsNeedToUpdate, date, isNeedToUpdate}: ChangeStorage & {action: string}) => {
  if (action === storageActions.update) {
    tasks = tasks.map((task) => task.date === date ? { ...task, isDone: !task.isDone } : task);
  }
  if (action === storageActions.delete) {
    tasks.splice(tasks.findIndex((task) => task.date === date), 1);
  }
  if (action === storageActions.clearCompleted) {
    tasks = tasks.filter((task) => !task.isDone);
  }
  localStorage.setItem(storageNames.tasks, JSON.stringify(tasks));
  setIsNeedToUpdate(!isNeedToUpdate);
};
