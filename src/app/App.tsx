import { useState } from 'react';
import './app-styles.css';
import { Tasks } from '../utils/types';
import InputText from './input-text/input-text';
import ControlsBtns from './controls/controls';
import ListTodos from './list-todos/list-todos';
import { INITIAL_VALUE, storageNames } from '../utils/const';

export default function App() {
  const [filter, setFilter] = useState('All');
  const [text, setText] = useState('');
  const [isNeedToUpdate, setIsNeedToUpdate] = useState(false);
  const tasks = JSON.parse(localStorage.getItem(storageNames.tasks) || INITIAL_VALUE);
  const nonCompletedTodos = `${tasks.filter(({ isDone }: Tasks) => !isDone).length} items left`;

  return (
    <div className="layout">
      <InputText text={text} setText={setText} tasks={tasks} />

      <ul className="todo-list">
        {tasks.length === 0 && <span>There are no tasks here! If you want to, add some tasks</span>}

        {tasks && (
          <ListTodos
            filter={filter}
            tasks={tasks}
            setIsNeedToUpdate={setIsNeedToUpdate}
            isNeedToUpdate={isNeedToUpdate}
          />
        )}
      </ul>
      <div className="header">
        <span>{tasks.length > 0 && nonCompletedTodos}</span>
        <div className="controls">
          <ControlsBtns
            setFilter={setFilter}
            tasks={tasks}
            setIsNeedToUpdate={setIsNeedToUpdate}
            isNeedToUpdate={isNeedToUpdate}
          />
        </div>
      </div>
    </div>
  );
}
