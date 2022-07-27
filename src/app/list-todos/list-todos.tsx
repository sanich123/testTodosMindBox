import React from 'react';
import { storageActions } from '../../utils/const';
import { Tasks } from '../../utils/types';
import { actionsWithStorage, filteredTasks } from '../../utils/utils';

interface ListTodosProps {
  filter: string,
  tasks: Tasks[],
  setIsNeedToUpdate: (arg: boolean) => void,
  isNeedToUpdate: boolean,
}

export default function ListTodos({filter, tasks, setIsNeedToUpdate, isNeedToUpdate}: ListTodosProps) {

  return (
    <>
      {filteredTasks[filter](tasks).map(({ task, isDone, date }) => (
        <React.Fragment key={date}>
          <label className={`${isDone ? 'active' : ''} label-input-checkbox`}>
            <input
              className="input-checkbox"
              type="checkbox"
              onChange={() =>
                actionsWithStorage({
                  action: storageActions.update,
                  tasks,
                  setIsNeedToUpdate,
                  date,
                  isNeedToUpdate,
                })}
              checked={isDone}
            />
            {task}
            <button
              className="delete-btn"
              type="button"
              onClick={() =>
                actionsWithStorage({
                  action: storageActions.delete,
                  tasks,
                  setIsNeedToUpdate,
                  date,
                  isNeedToUpdate,
                })}
            >
              X
            </button>
          </label>
        </React.Fragment>
      ))}
    </>
  );
}
