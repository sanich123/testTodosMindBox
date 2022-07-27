export interface Tasks {
  task: string,
  isDone: boolean,
  date: number,
}

export interface ChangeStorage {
  tasks: Tasks[];
  setIsNeedToUpdate: (arg: boolean) => void;
  date?: number;
  isNeedToUpdate: boolean;
}
