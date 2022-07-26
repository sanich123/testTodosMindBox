export interface Tasks {
  task: string,
  isDone: boolean,
  date: string,
}

export interface ChangeStorage {
  tasks: Tasks[];
  setIsNeedToUpdate: (arg: boolean) => void;
  date?: string;
  isNeedToUpdate: boolean;
}
