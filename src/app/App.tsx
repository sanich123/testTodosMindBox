import React, { useState } from 'react';
import './app-styles.css';
import { Tasks } from '../utils/types';
import InputText from './input-text';
import ControlsBtns from './controls';
import ListTodos from './list-todos';

export default function App() {
  const [filter, setFilter] = useState('All');
  const [text, setText] = useState('');
  const [isNeedToUpdate, setIsNeedToUpdate] = useState(false);
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  const nonCompletedTodos = `${tasks.filter(({ isDone }: Tasks) => !isDone).length} items left`;

  return (
    <>
      <div>
        <InputText text={text} setText={setText} tasks={tasks} />
        <ul>
          {tasks.length === 0 && <span>There are no tasks here! If you want to, add some tasks</span>}
          {tasks && (
            <ListTodos
              filter={filter}
              tasks={tasks}
              setIsNeedToUpdate={setIsNeedToUpdate}
              isNeedToUpdate={isNeedToUpdate}
            />)}
        </ul>
      </div>
      <span>
        {tasks.length > 0 && nonCompletedTodos}
      </span>
      <div className="controls">
        <ControlsBtns
          setFilter={setFilter}
          tasks={tasks}
          setIsNeedToUpdate={setIsNeedToUpdate}
          isNeedToUpdate={isNeedToUpdate}
        />
      </div>
    </>
  );
}
